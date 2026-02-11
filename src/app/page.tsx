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
            Stop Missing Calls. Start Winning Customers.
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your 24/7 AI receptionist answers every call, qualifies every lead, and books every appointment—while you focus on the work that matters.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition text-lg"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Problem Section - You're Losing Money */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            You're Losing Money Every Day
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Here's what happens when you miss calls
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '40%', label: 'of calls go to voicemail' },
              { stat: '80%', label: "won't call back" },
              { stat: '$2,000', label: 'per missed call' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-8 text-center border border-gray-800">
                <div className="text-6xl font-bold text-red-600 mb-4">{item.stat}</div>
                <p className="text-xl text-gray-300">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xl text-gray-400 text-center mt-12">
            Every missed call = lost revenue to your competitors
          </p>
        </div>
      </section>

      {/* Solution Section - How It Works */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Get started in just 3 minutes
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '1', title: 'Sign Up', desc: 'Pick your plan', subtext: '(2 minutes)' },
              { step: '2', title: 'Forward Calls', desc: 'Set up forwarding', subtext: '(30 seconds)' },
              { step: '3', title: "You're Live", desc: 'Start capturing', subtext: 'every call' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">
                  {item.desc}
                  <br />
                  <span className="text-gray-500 text-sm">{item.subtext}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/signup"
              className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition text-lg"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            What You Get
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📞',
                title: '24/7 Answering',
                description: 'Never miss a call—even at 2 AM',
              },
              {
                icon: '🎤',
                title: 'Sounds Human',
                description: 'Natural conversations, professional tone',
              },
              {
                icon: '⚡',
                title: 'Instant Alerts',
                description: 'Get SMS + email for every call',
              },
              {
                icon: '🚨',
                title: 'Emergency Flagging',
                description: 'Urgent calls marked HIGH PRIORITY',
              },
              {
                icon: '🔗',
                title: 'CRM Integration',
                description: 'Syncs to HubSpot, Salesforce, Zoho',
              },
              {
                icon: '🌐',
                title: 'Bilingual Support',
                description: 'English and Spanish call handling',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-red-600 transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Join 100+ Service Businesses
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            Capturing Every Lead
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'First week, answered 47 calls while I was on jobs. Booked 11 new customers.',
                name: 'Mike Torres',
                company: 'Torres Plumbing, Houston TX',
              },
              {
                quote: "Costs $499 and works 24/7. Better than our old $3,200/month receptionist.",
                name: 'Sarah Chen',
                company: 'Elite HVAC, Phoenix AZ',
              },
              {
                quote: 'Captured 8 leads over the weekend—calls I would have 100% missed.',
                name: 'James Mitchell',
                company: 'Bright Spark Electric, Atlanta GA',
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-8 border border-gray-800 hover:border-red-600 transition">
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-gray-800 pt-4">
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Simple Pricing. Massive ROI.
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16">
            One missed $2,000 job pays for 8 months
          </p>
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

      {/* Final CTA Section */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Stop Losing Customers to Missed Calls
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Every day you wait is another day of lost revenue.<br />
            Get started in 3 minutes. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-10 py-5 rounded-lg font-semibold transition text-lg mb-4"
          >
            Start Free Trial
          </Link>
          <p className="text-gray-400">
            or call: <a href="tel:+15551234567" className="text-red-600 hover:underline font-semibold">(555) 123-4567</a>
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
