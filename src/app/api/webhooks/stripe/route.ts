import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient as createSupabaseClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/server'

/**
 * CRITICAL: This webhook bridges Stripe payments to RonOS client_onboarder skill
 *
 * Design principles:
 * - IDEMPOTENT: Stripe may deliver webhook 2x - we handle duplicates gracefully
 * - RESILIENT: If RonOS is down, we mark client as pending and retry later
 * - AUDITED: All webhook events logged to track provisioning status
 *
 * Flow:
 * 1. Customer pays via Stripe Checkout
 * 2. Stripe sends webhook to this endpoint (may be duplicate)
 * 3. We check if we've already processed this webhook ID (idempotency)
 * 4. Create client record in Supabase with status 'provisioning'
 * 5. Call RonOS client_onboarder (with 3 automatic retries)
 * 6. If RonOS fails, mark client as 'pending_provisioning' for manual retry
 * 7. Log all events to webhook_events table for audit trail
 */

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createSupabaseClient()

  // Helper: Retry function with exponential backoff
  async function callRonosWithRetry(payload: object, maxRetries = 3): Promise<boolean> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(process.env.RONOS_WEBHOOK_URL!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000), // 10s timeout
        })

        if (response.ok) {
          console.log(`✅ RonOS succeeded on attempt ${attempt}`)
          return true
        }

        const errorText = await response.text()
        console.warn(
          `⚠️  RonOS attempt ${attempt}/${maxRetries} failed: ${response.status} - ${errorText}`
        )

        // Exponential backoff: 1s, 2s, 4s
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt - 1) * 1000
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      } catch (error) {
        console.error(`❌ RonOS attempt ${attempt}/${maxRetries} error:`, error)

        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt - 1) * 1000
          await new Promise(resolve => setTimeout(resolve, delay))
        }
      }
    }

    console.error(`❌ RonOS failed after ${maxRetries} attempts`)
    return false
  }

  try {
    // Check idempotency: Have we already processed this webhook event?
    const { data: existingEvent } = await supabase
      .from('webhook_events')
      .select('id')
      .eq('stripe_event_id', event.id)
      .single()

    if (existingEvent) {
      console.log(`⏭️  Webhook already processed: ${event.id}`)
      return NextResponse.json({ received: true })
    }

    if (event.type === 'customer.subscription.created') {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      // Get Stripe customer details
      const customer = await stripe.customers.retrieve(customerId)

      if (customer.deleted) {
        console.error('❌ Customer was deleted')
        return NextResponse.json({ error: 'Customer deleted' }, { status: 400 })
      }

      console.log(`✅ Processing subscription for customer: ${customer.email}`)

      // Determine plan from Stripe price ID
      const priceId = subscription.items.data[0]?.price.id
      let plan = 'professional' // default

      if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER) {
        plan = 'starter'
      } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL) {
        plan = 'professional'
      } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE) {
        plan = 'enterprise'
      }

      const monthlyFee = subscription.items.data[0]?.price.unit_amount
        ? subscription.items.data[0].price.unit_amount / 100
        : 499

      // Create client record in Supabase
      const { data: client, error: dbError } = await supabase
        .from('clients')
        .insert({
          business_name: customer.metadata?.business_name || customer.email,
          contact_email: customer.email,
          contact_phone: customer.metadata?.phone || '',
          plan,
          monthly_fee: monthlyFee,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscription.id,
          status: 'provisioning',
        })
        .select()
        .single()

      if (dbError) {
        console.error('❌ Failed to create client in Supabase:', dbError)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      console.log(`✅ Client created in Supabase: ${client.id}`)

      // Trigger RonOS client_onboarder skill via HTTP (with retry logic)
      const ronosPayload = {
        event_type: 'customer.subscription.created',
        client_id: client.id,
        business_name: client.business_name,
        contact_email: client.contact_email,
        contact_phone: client.contact_phone,
        plan: client.plan,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
      }

      const ronosSuccess = await callRonosWithRetry(ronosPayload)

      if (ronosSuccess) {
        // Update client to active (RonOS will populate twilio_number and vapi_assistant_id)
        await supabase.from('clients').update({ status: 'active' }).eq('id', client.id)
        console.log(`✅ RonOS client_onboarder succeeded for: ${client.business_name}`)
      } else {
        // RonOS failed even after retries - mark as pending for manual retry
        await supabase
          .from('clients')
          .update({
            status: 'pending_provisioning',
            metadata: {
              last_provision_attempt: new Date().toISOString(),
              provision_error: 'RonOS unreachable after 3 retries',
            },
          })
          .eq('id', client.id)

        console.error(
          `❌ Client ${client.id} marked pending - RonOS was unreachable. Manual retry needed.`
        )
      }

      // Log webhook event for audit trail
      await supabase.from('webhook_events').insert({
        stripe_event_id: event.id,
        event_type: event.type,
        customer_id: customerId,
        client_id: client.id,
        status: ronosSuccess ? 'success' : 'pending_retry',
        metadata: {
          subscription_id: subscription.id,
          plan,
          ronosSuccess,
        },
      })
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription
      const customerId = subscription.customer as string

      // Mark client as cancelled
      const { error } = await supabase
        .from('clients')
        .update({ status: 'cancelled' })
        .eq('stripe_customer_id', customerId)

      if (error) {
        console.error('❌ Failed to update client status:', error)
      } else {
        console.log(`✅ Client marked as cancelled: ${customerId}`)
      }

      // Log webhook event
      await supabase.from('webhook_events').insert({
        stripe_event_id: event.id,
        event_type: event.type,
        customer_id: customerId,
        status: error ? 'error' : 'success',
        metadata: {
          subscription_id: subscription.id,
          error: error?.message,
        },
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    return NextResponse.json({ error: 'Processing error' }, { status: 500 })
  }
}
