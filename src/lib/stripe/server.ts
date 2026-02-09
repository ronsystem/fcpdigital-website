import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function getStripeCustomer(customerId: string) {
  return await stripe.customers.retrieve(customerId)
}

export async function createCheckoutSession(params: {
  priceId: string
  customerId?: string
  email?: string
  customerData?: Stripe.CustomerCreateParams
}) {
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ['card'],
    line_items: [
      {
        price: params.priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
  }

  if (params.customerId) {
    sessionParams.customer = params.customerId
  } else if (params.email) {
    sessionParams.customer_email = params.email
  }

  return await stripe.checkout.sessions.create(sessionParams)
}
