'use client'

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#060606', color: '#fff', fontFamily: 'monospace' }}>
      <nav style={{ padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f0f0f', position: 'sticky', top: 0, background: '#060606', zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span><span style={{ color: '#dc2626' }}>DIGITAL</span>
        </a>
        <a href="/" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>← BACK</a>
      </nav>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.25em', marginBottom: 12 }}>LEGAL</div>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Terms & Conditions</h1>
        <div style={{ color: '#333', fontSize: 10, marginBottom: 48 }}>Last updated: February 2026</div>
        {[
          { title: 'Acceptance of Terms', body: 'By accessing or using FCP Digital services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time with notice to you.' },
          { title: 'Description of Service', body: 'FCP Digital provides AI-powered telephone answering and call management services for service businesses. Our service includes call answering, message taking, appointment scheduling assistance, and call transcription delivered through an automated AI system.' },
          { title: 'Account Responsibilities', body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. You must provide accurate and complete information when creating your account.' },
          { title: 'Acceptable Use', body: 'You agree to use our services only for lawful purposes. You may not use our service to conduct illegal activities, transmit harmful content, impersonate others, or interfere with the operation of our services. We reserve the right to suspend or terminate accounts that violate these terms.' },
          { title: 'Call Recording Compliance', body: 'You acknowledge that our service records telephone calls. You are solely responsible for ensuring compliance with all applicable federal, state, and local laws regarding call recording and disclosure in your jurisdiction. FCP Digital is not responsible for your compliance obligations.' },
          { title: 'Billing and Payment', body: 'Services are billed monthly. Payment is due at the beginning of each billing cycle. We accept major credit cards processed securely through Stripe. Founding member pricing, once locked in, is guaranteed for the life of your account as long as your subscription remains active without lapsing.' },
          { title: '14-Day Money Back Guarantee', body: 'New clients may request a full refund within 14 days of their initial payment if not satisfied with the service. Refund requests must be submitted to services@fcpdigital.net. After 14 days, all payments are non-refundable. This guarantee applies to first-time customers only.' },
          { title: 'Service Availability', body: 'We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance when possible. We are not liable for damages resulting from service interruptions beyond our reasonable control.' },
          { title: 'Limitation of Liability', body: 'FCP Digital shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount you paid for services in the three months preceding the claim.' },
          { title: 'Termination', body: 'You may cancel your subscription at any time. Cancellations take effect at the end of the current billing cycle. We reserve the right to terminate service immediately for violation of these terms. Upon termination, your access to the dashboard and call data will be discontinued after 30 days.' },
          { title: 'Governing Law', body: 'These terms are governed by the laws of the State of Michigan without regard to conflict of law principles. Any disputes shall be resolved in the courts of Wayne County, Michigan.' },
          { title: 'Contact', body: 'Questions about these terms should be directed to services@fcpdigital.net or +1 313 327 3170.' },
        ].map((s, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>{'0' + (i + 1)}</div>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{s.title}</h2>
            <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
