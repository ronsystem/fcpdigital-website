import Link from 'next/link'
import { Footer } from '@/components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black border-b border-gray-800">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-red-600">FCP Digital</h1>
          <div className="space-x-4">
            <Link href="/login" className="text-gray-300 hover:text-red-600 transition">
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-b from-black to-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 text-white">
            Never Miss a Customer Call Again
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            24/7 AI-powered call answering service for service businesses. Let our AI
            handle your calls while you focus on growing your business.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition text-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose FCP Digital?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📞',
                title: '24/7 Availability',
                description: 'Your AI receptionist never takes a day off',
              },
              {
                icon: '🤖',
                title: 'Advanced AI',
                description: 'Intelligent call routing and lead qualification',
              },
              {
                icon: '⚡',
                title: 'Instant Setup',
                description: 'Get started in minutes, not days',
              },
            ].map((feature, i) => (
              <div key={i} className="border border-gray-800 rounded-lg p-6 text-center bg-gray-900">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Launch',
                price: '$249',
                minutes: '500 min/month',
              },
              {
                name: 'Scale',
                price: '$499',
                minutes: '1,500 min/month',
                popular: true,
              },
              {
                name: 'Dominate',
                price: '$899',
                minutes: '3,000 min/month',
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`rounded-lg p-8 bg-gray-900 ${
                  plan.popular ? 'border-2 border-red-600 shadow-lg' : 'border border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="text-red-600 font-semibold text-sm mb-2">Most Popular</div>
                )}
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2 text-white">{plan.price}</div>
                <div className="text-gray-400 mb-6">{plan.minutes}</div>
                <Link
                  href="/signup"
                  className="block text-center bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg mb-8">Join hundreds of service businesses using FCP Digital</p>
          <Link
            href="/signup"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
