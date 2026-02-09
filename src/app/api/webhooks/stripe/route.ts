import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient as createSupabaseClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/server'

/**
 * CRITICAL: This webhook bridges Stripe payments to RonOS client_onboarder skill
 *
 * Flow:
 * 1. Customer pays via Stripe Checkout
 * 2. Stripe sends webhook to this endpoint
 * 3. We create client record in Supabase
 * 4. We trigger RonOS client_onboarder via HTTP
 * 5. RonOS provisions Twilio phone + Vapi AI assistant
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

  try {
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

      // Trigger RonOS client_onboarder skill via HTTP
      try {
        const ronosResponse = await fetch(process.env.RONOS_WEBHOOK_URL!, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event_type: 'customer.subscription.created',
            client_id: client.id,
            business_name: client.business_name,
            contact_email: client.contact_email,
            contact_phone: client.contact_phone,
            plan: client.plan,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscription.id,
          }),
        })

        if (!ronosResponse.ok) {
          console.warn(
            `⚠️  RonOS returned ${ronosResponse.status}: ${await ronosResponse.text()}`
          )
          // Don't fail the webhook - RonOS can retry
        } else {
          console.log(`✅ RonOS client_onboarder triggered for: ${client.business_name}`)
        }
      } catch (error) {
        console.error('❌ Failed to trigger RonOS:', error)
        // Don't fail - mark client as pending and we can retry manually
        await supabase
          .from('clients')
          .update({ status: 'pending_provisioning' })
          .eq('id', client.id)
      }
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
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('❌ Webhook processing error:', error)
    return NextResponse.json({ error: 'Processing error' }, { status: 500 })
  }
}
