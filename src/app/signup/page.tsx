'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PRICING_PLANS, INDUSTRIES } from '@/lib/utils/constants'

export default function SignupPage() {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'professional' | 'enterprise'>(
    'professional'
  )
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    industry: '',
    agreeToTerms: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const plan = PRICING_PLANS[selectedPlan]

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          email: formData.email,
          customerData: {
            email: formData.email,
            metadata: {
              business_name: formData.businessName,
              phone: formData.phone,
              industry: formData.industry,
            },
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await (await import('@stripe/stripe-js')).loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      )

      if (!stripe) {
        throw new Error('Failed to load Stripe')
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })

      if (error) {
        throw new Error(error.message)
      }
    } catch (error) {
      console.error('Signup error:', error)
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const selectedPlanData = PRICING_PLANS[selectedPlan]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 hover:text-blue-700 mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-2">Get Started with FCP Digital</h1>
          <p className="text-gray-600 mb-8">
            Join hundreds of service businesses using AI to answer their calls
          </p>

          {/* Plan Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Select Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {Object.entries(PRICING_PLANS).map(([key, plan]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPlan(key as typeof selectedPlan)}
                  className={`p-4 rounded-lg border-2 text-left transition ${
                    selectedPlan === key
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-2xl font-bold">${plan.price}</p>
                  <p className="text-sm text-gray-600">{plan.minutes} min/month</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Business Name *</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Business Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select your industry...</option>
                {INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="rounded"
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.agreeToTerms}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Subscribe to ${selectedPlanData.name} - $${selectedPlanData.price}/month`}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
