'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
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
    <div className="min-h-screen flex flex-col bg-black">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600">
            FCP Digital
          </Link>
          <Link href="/login" className="text-gray-300 hover:text-red-600 transition">
            Already have an account?
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 rounded-lg shadow-sm p-8 border border-gray-800">
          <h1 className="text-3xl font-bold mb-2 text-white">Get Started with FCP Digital</h1>
          <p className="text-gray-400 mb-8">
            Join hundreds of service businesses using AI to answer their calls
          </p>

          {/* Plan Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Select Your Plan</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {Object.entries(PRICING_PLANS).map(([key, plan]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPlan(key as typeof selectedPlan)}
                  className={`p-4 rounded-lg border-2 text-left transition ${
                    selectedPlan === key
                      ? 'border-red-600 bg-gray-800'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <h3 className="font-semibold text-white">{plan.name}</h3>
                  <p className="text-2xl font-bold text-white">${plan.price}</p>
                  <p className="text-sm text-gray-400">{plan.minutes} min/month</p>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-white">Business Name *</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Your Business Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-white">Industry *</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                <span className="ml-2 text-sm text-gray-400">
                  I agree to the{' '}
                  <Link href="/terms" className="text-red-600 hover:text-red-500">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-red-600 hover:text-red-500">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !formData.agreeToTerms}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Subscribe to ${selectedPlanData.name} - $${selectedPlanData.price}/month`}
            </button>
          </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
