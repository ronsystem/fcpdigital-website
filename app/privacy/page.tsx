'use client'

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#060606', color: '#fff', fontFamily: 'monospace' }}>
      <nav style={{ padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f0f0f', position: 'sticky', top: 0, background: '#060606', zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span><span style={{ color: '#dc2626' }}>DIGITAL</span>
        </a>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="/contact" style={{ color: '#999', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>CONTACT</a>
          <a href="/" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>← BACK</a>
        </div>
      </nav>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.25em', marginBottom: 12 }}>LEGAL</div>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Privacy Policy</h1>
        <div style={{ color: '#333', fontSize: 10, marginBottom: 48 }}>Last updated: March 2026</div>

        <div style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', padding: 20, marginBottom: 48, borderRadius: 4 }}>
          <div style={{ color: '#dc2626', fontSize: 11, lineHeight: 1.8 }}>
            <strong>IMPORTANT NOTICE:</strong> FCP Digital ("we," "us," or "our") DOES NOT share customer opt-in information, including phone numbers and consent records, with any affiliates or third parties for marketing, promotional, or any other purposes unrelated to providing our direct services. All text messaging originator opt-in data is kept strictly confidential.
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>01</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Information We Collect</h2>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>We collect the following types of information:</p>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: '12px 0 0 0' }}>
            <strong style={{ color: '#999' }}>Personal Information:</strong><br />Name, email address, phone number, physical address. Payment information when you make a purchase or request a quote. Opt-in records and timestamps for all communication channels (SMS, email, etc.)
          </p>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: '12px 0 0 0' }}>
            <strong style={{ color: '#999' }}>Non-Personal Information:</strong><br />IP address, browser type, device information. Website usage patterns and analytics. Cookies and similar technologies.
          </p>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: '12px 0 0 0' }}>
            <strong style={{ color: '#999' }}>Customer Communication:</strong><br />Records of inquiries and service requests. Appointment details and preferences. Service history and feedback.
          </p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>02</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>How We Use Your Information</h2>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>We use collected data for: Providing and improving our services. Processing transactions and payments. Communicating with you about your inquiries, appointments, and account notifications. Enhancing website functionality and user experience. Ensuring security and fraud prevention. Maintaining records of your communication preferences and consent.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>03</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>SMS Messaging & Compliance</h2>
          <div style={{ color: '#555', fontSize: 12, lineHeight: 1.9 }}>
            <p style={{ margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Text Message Program Terms & Conditions</strong></p>
            <p style={{ margin: '0 0 12px 0' }}>By opting into our SMS messaging services, you agree to receive text messages related to our services, including inbound call alerts, lead notifications, account updates, and customer support.</p>
            <p style={{ margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Opt-In & Consent:</strong> You will only receive messages if you have explicitly opted in. We maintain timestamped records of all opt-in actions. We comply with the Telephone Consumer Protection Act (TCPA) and all applicable laws.</p>
            <p style={{ margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Opt-Out Instructions:</strong> You can cancel SMS notifications at any time by replying "STOP". You will receive a final confirmation message, and no further messages will be sent unless you re-opt in. All opt-out requests are processed immediately.</p>
            <p style={{ margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Message Frequency & Content:</strong> Message frequency varies based on your interactions with our business. Messages will be directly related to the services you have requested. We do not send promotional content without specific consent.</p>
            <p style={{ margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Help & Support:</strong> Reply "HELP" for assistance or contact us at services@fcpdigital.net. Customer support is available during regular business hours.</p>
            <p style={{ margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Age Restriction:</strong> You must be 18 years or older to participate in our SMS program.</p>
            <p style={{ margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Carrier Information:</strong> Standard message and data rates may apply. Carriers are not liable for delayed or undelivered messages. Supported carriers include AT&T, Verizon, T-Mobile, Sprint, and most regional carriers.</p>
            <p style={{ margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>SMS Data Protection Statement:</strong> No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. Information sharing to subcontractors in support services, such as customer service, is permitted. All other use case categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. We implement strict data protection measures to safeguard your SMS opt-in information and consent records.</p>
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>04</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Information Sharing & Disclosure</h2>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: '0 0 12px 0' }}>We do not sell, rent, or trade personal information. We may share information with:</p>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Service Providers:</strong> Third-party vendors who assist in our operations (e.g., payment processing). SMS aggregators and providers solely for the purpose of delivering messages you've consented to receive. All service providers are contractually obligated to maintain confidentiality and security.</p>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Legal Compliance:</strong> If required by law, legal process, or to protect our rights. In response to valid law enforcement requests or court orders.</p>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: '0 0 12px 0' }}><strong style={{ color: '#999' }}>Business Transfers:</strong> In case of mergers, acquisitions, or sale of assets. In such cases, your data remains protected under the terms of this policy.</p>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: '0 0 0 0' }}>All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, excluding aggregators and providers of the Text Message services.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>05</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Data Security</h2>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>We implement and maintain reasonable security measures to protect your personal information: Encryption of sensitive data in transit and at rest. Secure access controls and authentication mechanisms. Regular security assessments and updates. Employee training on data protection. Breach notification protocols in accordance with applicable laws. Secure backup systems and disaster recovery procedures. Despite these measures, no method of transmission over the Internet or electronic storage is 100% secure. We strive to use commercially acceptable means to protect your personal information but cannot guarantee absolute security.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>06</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Cookies & Tracking Technologies</h2>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>We use cookies and similar technologies to: Analyze site traffic and user behavior. Remember your preferences. Improve website functionality and user experience. Measure the effectiveness of our services. You may control cookies through your browser settings. Disabling cookies may limit your ability to use certain features of our website.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>07</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Your Rights & Choices</h2>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>You have the right to: Access, update, or delete your personal information. Opt-out of marketing emails by clicking "unsubscribe" in our emails. Opt-out of SMS messages by replying "STOP". Request information on how we process your data. Withdraw consent at any time for future communications. Lodge a complaint with a supervisory authority if you believe your rights have been violated. To exercise these rights, please contact us using the information in Section 10.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>08</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Third-Party Links</h2>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage you to review their policies. This privacy policy applies only to information collected by FCP Digital.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>09</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Changes to This Privacy Policy</h2>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>We may update this policy periodically. The latest version will always be available on our website with the effective date. For significant changes, we will notify you by email or through a notice on our website.</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>10</div>
          <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Contact Us</h2>
          <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>FCP Digital (Full Clip Productions LLC)<br />Phone: +1 313 327 3170<br />Email: services@fcpdigital.net<br />Website: ai.fcpdigital.net<br /><br />By using our website and services, you consent to this Privacy Policy.</p>
        </div>

        <div style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid #0f0f0f' }}>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <a href="/privacy" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>PRIVACY POLICY</a>
            <span style={{ color: '#2a2a2a' }}>|</span>
            <a href="/terms" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>TERMS OF SERVICE</a>
            <span style={{ color: '#2a2a2a' }}>|</span>
            <a href="/sms-terms" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>SMS TERMS</a>
            <span style={{ color: '#2a2a2a' }}>|</span>
            <a href="/contact" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>CONTACT</a>
          </div>
        </div>
      </div>
    </div>
  )
}
