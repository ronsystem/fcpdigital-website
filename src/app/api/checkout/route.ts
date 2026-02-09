import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { priceId, email, customerData } = body

    if (!priceId || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create or get Stripe customer
    let customerId: string

    if (customerData) {
      const customer = await stripe.customers.create({
        email,
        metadata: customerData.metadata || {},
      })
      customerId = customer.id
    } else {
      // Search for existing customer
      const customers = await stripe.customers.list({ email, limit: 1 })
      customerId = customers.data[0]?.id || (await stripe.customers.create({ email })).id
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    )
  }
}
