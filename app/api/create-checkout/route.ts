import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
}) : null

const PRICE_IDS: Record<string, string> = {
  starter: process.env.STRIPE_PRICE_STARTER || '',
  growth: process.env.STRIPE_PRICE_GROWTH || '',
  scale: process.env.STRIPE_PRICE_SCALE || '',
  dominate: process.env.STRIPE_PRICE_DOMINATE || '',
}

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
    }

    const { businessName, ownerName, email, phone, serviceType, plan } = await request.json()

    if (!businessName || !ownerName || !email || !plan) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const priceId = PRICE_IDS[plan]
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      customer_email: email,
      metadata: {
        businessName,
        ownerName,
        email,
        phone,
        serviceType,
        plan,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ai.fcpdigital.net'}/signup-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://ai.fcpdigital.net'}/signup?plan=${plan}`,
    })

    return NextResponse.json({ url: session.url })

  } catch (error) {
    console.error('Stripe checkout error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
