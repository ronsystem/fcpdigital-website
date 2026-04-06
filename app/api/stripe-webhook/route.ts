import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const MONTHLY_PRICE_IDS: Record<string, string> = {
  pulse: process.env.STRIPE_PRICE_PULSE_MONTHLY!,
  intelligence: process.env.STRIPE_PRICE_INTEL_MONTHLY!,
  command: process.env.STRIPE_PRICE_COMMAND_MONTHLY!
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body, sig, process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature failed' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata!

    // 1. Create Stripe customer if not exists
    let customerId = session.customer as string
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: meta.email,
        name: meta.contactName,
        metadata: {
          businessName: meta.businessName,
          phone: meta.phone,
          tier: meta.tier
        }
      })
      customerId = customer.id
    }

    // 2. Create subscription with 7-day trial
    // Billing starts on Day 7 — when system goes live
    const trialEnd = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)
    const monthlyPriceId = MONTHLY_PRICE_IDS[meta.tier]

    if (monthlyPriceId) {
      await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: monthlyPriceId }],
        trial_end: trialEnd,
        metadata: {
          businessName: meta.businessName,
          tier: meta.tier
        }
      })
      console.log(`Subscription created for ${meta.businessName} — starts Day 7`)
    }

    // 3. Send PandaDoc contract
    await sendPandaDocContract(meta)

    // 4. Alert Henry via VPS webhook
    await fetch(process.env.VPS_ALERT_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'new_client_signed',
        businessName: meta.businessName,
        contactName: meta.contactName,
        email: meta.email,
        phone: meta.phone,
        tier: meta.tier,
        setupFee: session.amount_total ? session.amount_total / 100 : 0,
        subscriptionStarts: 'Day 7 (7-day trial period)',
        timestamp: new Date().toISOString()
      })
    }).catch(console.warn)
  }

  return NextResponse.json({ received: true })
}

async function sendPandaDocContract(meta: Record<string, string>) {
  const tierNames: Record<string, string> = {
    pulse: 'Pulse — $697/month',
    intelligence: 'Intelligence — $2,500/month',
    command: 'Command Center — $5,500/month'
  }

  const setupFees: Record<string, string> = {
    pulse: '$750',
    intelligence: '$1,500',
    command: '$3,000'
  }

  const terms: Record<string, string> = {
    pulse: '3 months',
    intelligence: '6 months',
    command: '12 months'
  }

  try {
    const res = await fetch('https://api.pandadoc.com/public/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `API-Key ${process.env.PANDADOC_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `FCP Digital Service Agreement — ${meta.businessName}`,
        template_uuid: process.env.PANDADOC_TEMPLATE_ID,
        recipients: [
          {
            email: meta.email,
            first_name: meta.contactName.split(' ')[0],
            last_name: meta.contactName.split(' ').slice(1).join(' ') || '',
            role: 'Client'
          }
        ],
        fields: {
          business_name: { value: meta.businessName },
          contact_name: { value: meta.contactName },
          contact_email: { value: meta.email },
          contact_phone: { value: meta.phone },
          selected_tier: { value: tierNames[meta.tier] || meta.tier },
          setup_fee: { value: setupFees[meta.tier] || '' },
          minimum_term: { value: terms[meta.tier] || '' },
          agreement_date: { value: new Date().toLocaleDateString('en-US') },
          monthly_start: { value: 'Go-live date (Day 7 after signing)' }
        },
        send_when_finished: true
      })
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('PandaDoc error:', err)
    } else {
      console.log('PandaDoc contract sent to:', meta.email)
    }
  } catch (err) {
    console.error('PandaDoc failed:', err)
  }
}
