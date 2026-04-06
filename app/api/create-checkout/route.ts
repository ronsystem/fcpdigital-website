import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const PRICE_IDS: Record<string, string> = {
  pulse: process.env.STRIPE_PRICE_PULSE!,
  intelligence: process.env.STRIPE_PRICE_INTEL!,
  command: process.env.STRIPE_PRICE_COMMAND!
}

export async function POST(request: NextRequest) {
  try {
    const { businessName, contactName, email, phone, venueType, tier } = await request.json()

    if (!businessName || !contactName || !email || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const priceId = PRICE_IDS[tier]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      customer_email: email,
      metadata: {
        businessName,
        contactName,
        email,
        phone,
        venueType,
        tier
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/onboarding-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-started`,
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error('Stripe error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
