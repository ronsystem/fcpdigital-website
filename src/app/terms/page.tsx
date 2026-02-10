'use client'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">
          Terms & Conditions
        </h1>
        <p className="text-gray-400 mb-12">Last updated: February 10, 2026</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Free Trial Terms</h2>
            <p className="mb-4">Your 14-day free trial begins when you sign up. During the trial:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Full access to all features of your selected plan</li>
              <li>No credit card required to start</li>
              <li>Cancel anytime before day 14 with zero charges</li>
              <li>If you don't cancel, billing begins on day 15</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Service Description</h2>
            <p className="mb-4">FCP Digital provides AI-powered call answering services for service-based businesses. The service includes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>24/7 automated call answering via AI</li>
              <li>Instant SMS and email notifications</li>
              <li>Call transcripts and summaries</li>
              <li>CRM integration (Professional and Enterprise plans)</li>
              <li>Customer support during business hours</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Billing & Payment</h2>
            <div className="mb-6">
              <h3 className="font-semibold text-white mb-2">Monthly Subscription:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Billed monthly on the anniversary of your signup date</li>
                <li>Charged automatically to your payment method on file</li>
                <li>Usage overages billed at $0.75/minute above plan limit</li>
                <li>No refunds for partial months if you cancel mid-cycle</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Plan Changes:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Upgrade anytime - prorated billing applies</li>
                <li>Downgrade effective next billing cycle</li>
                <li>No penalties for changing plans</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Cancellation Policy</h2>
            <p className="mb-4">You may cancel your subscription at any time:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>No contracts or long-term commitments</li>
              <li>Cancel via dashboard or email to hello@fcpdigital.net</li>
              <li>Service continues until end of current billing period</li>
              <li>No refunds for unused time in current period</li>
              <li>Data export available for 30 days after cancellation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Service Availability</h2>
            <p className="mb-4">We strive for 99.9% uptime but cannot guarantee uninterrupted service. We are not liable for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Brief service interruptions due to maintenance</li>
              <li>Issues caused by third-party providers (Twilio, Vapi, etc.)</li>
              <li>Force majeure events beyond our control</li>
            </ul>
            <p className="mt-4">In the event of extended outages (24+ hours), we will provide prorated credits.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data & Privacy</h2>
            <p className="mb-4">Your data is yours. We:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Store call recordings for 90-365 days (based on your plan)</li>
              <li>Encrypt all data in transit and at rest</li>
              <li>Never sell or share your customer data</li>
              <li>Comply with GDPR, CCPA, and TCPA regulations</li>
            </ul>
            <p className="mt-4">See our <a href="/privacy" className="text-red-600 hover:text-red-500 underline">Privacy Policy</a> for full details.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Acceptable Use</h2>
            <p className="mb-4">You may not use FCP Digital for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Illegal activities or fraud</li>
              <li>Harassment, spam, or unsolicited telemarketing</li>
              <li>Services that violate TCPA regulations</li>
              <li>Activities that harm our infrastructure or other customers</li>
            </ul>
            <p className="mt-4">Violation of acceptable use may result in immediate account termination without refund.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p className="mb-4">FCP Digital's liability is limited to the amount you paid in the last 12 months. We are not liable for:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Lost revenue from missed calls</li>
              <li>Indirect or consequential damages</li>
              <li>Issues caused by third-party integrations</li>
              <li>Your failure to configure services correctly</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Modifications to Terms</h2>
            <p>We may update these terms with 30 days notice via email. Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
            <p>These terms are governed by the laws of the State of Texas, USA. Disputes will be resolved via binding arbitration.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="mb-4">Questions about these terms? Contact us:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Email: <a href="mailto:legal@fcpdigital.net" className="text-red-600 hover:text-red-500 underline">legal@fcpdigital.net</a></li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: FCP Digital, Austin, TX</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <a href="/" className="text-red-600 hover:text-red-500 underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
