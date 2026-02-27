'use client'

export default function PrivacyPage() {
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
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>Privacy Policy</h1>
        <div style={{ color: '#333', fontSize: 10, marginBottom: 48 }}>Last updated: February 2026</div>
        {[
          {
            title: 'Information We Collect',
            body: 'We collect information you provide directly to us when you sign up for FCP Digital, including your business name, email address, phone number, and service type. We also collect call recordings and transcripts from your AI receptionist.',
          },
          {
            title: 'How We Use Your Information',
            body: 'We use the information we collect to provide, maintain, and improve our service. This includes training our AI model, generating call transcripts, and analyzing call patterns to help you manage your business.',
          },
          {
            title: 'Call Recording and Transcripts',
            body: 'Our AI receptionist service records and transcribes calls made to your business. You are responsible for ensuring compliance with all applicable call recording and consent laws in your jurisdiction.',
          },
          {
            title: 'Information Sharing',
            body: 'We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who help us operate our platform, and only under strict confidentiality agreements.',
          },
          {
            title: 'Data Security',
            body: 'We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your data.',
          },
          {
            title: 'Data Retention',
            body: 'We retain your account information for as long as your account is active. You may request deletion of your data at any time by contacting us at services@fcpdigital.net.',
          },
          {
            title: 'Your Rights',
            body: 'You have the right to access, update, or delete your personal information. You may also request a copy of the data we hold about you. Contact us at services@fcpdigital.net to exercise these rights.',
          },
          {
            title: 'Changes to This Policy',
            body: 'We may update this privacy policy from time to time. We will notify you of any significant changes by posting the updated policy on this page.',
          },
          {
            title: 'Contact Us',
            body: 'If you have questions about this privacy policy or our privacy practices, please contact us at services@fcpdigital.net or call +1 313 327 3170.',
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
