'use client'

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#060606', color: '#fff', fontFamily: 'monospace' }}>
      <nav style={{ padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f0f0f' }}>
        <a href="/" style={{ textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span>
          <span style={{ color: '#dc2626' }}>DIGITAL</span>
        </a>
        <a href="/" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>BACK HOME</a>
      </nav>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.25em', marginBottom: 8 }}>LEGAL</div>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>Terms & Conditions</h1>
        <div style={{ color: '#333', fontSize: 10, marginBottom: 48 }}>Last updated: February 2026</div>
        {[
          {
            title: 'Acceptance of Terms',
            body: 'By accessing or using FCP Digital services, you agree to be bound by these terms and conditions.',
          },
          {
            title: 'Description of Service',
            body: 'FCP Digital provides AI-powered telephone answering and call management services for service businesses. Our AI receptionist answers incoming calls, handles customer inquiries, and provides transcripts of all conversations.',
          },
          {
            title: 'Account Responsibilities',
            body: 'You are responsible for maintaining the confidentiality of your account credentials. You agree to use our services only for lawful purposes. You may not use the service to harass, threaten, or abuse others.',
          },
          {
            title: 'Acceptable Use',
            body: 'You may not reverse-engineer our service, attempt to break security, or use our service to build competing products. You agree not to submit illegal or harmful content through the service.',
          },
          {
            title: 'Call Recording Compliance',
            body: 'You acknowledge that our service records telephone calls. You are solely responsible for ensuring compliance with all state and federal call recording and consent laws applicable to your jurisdiction.',
          },
          {
            title: 'Billing and Payment',
            body: 'Services are billed monthly. Payment is due at the beginning of each billing cycle. Billing will continue automatically until you cancel your subscription.',
          },
          {
            title: '14-Day Money Back Guarantee',
            body: 'New clients may request a full refund within 14 days of their initial payment. After 14 days, refunds are subject to our discretion.',
          },
          {
            title: 'Service Availability',
            body: 'We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We are not liable for downtime caused by third-party providers or force majeure events.',
          },
          {
            title: 'Limitation of Liability',
            body: 'FCP Digital shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our service, even if we have been advised of the possibility of such damages.',
          },
          {
            title: 'Termination',
            body: 'You may cancel your subscription at any time. Cancellations take effect at the end of your current billing period. We may terminate your account if you violate these terms.',
          },
          {
            title: 'Governing Law',
            body: 'These terms are governed by the laws of the State of Michigan without regard to conflicts of law principles.',
          },
          {
            title: 'Contact',
            body: 'Questions about these terms should be directed to services@fcpdigital.net or by calling +1 313 327 3170.',
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 8 }}>{section.title.toUpperCase()}</div>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{section.title}</h2>
            <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9 }}>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
