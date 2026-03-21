'use client'

export default function SmsTermsPage() {
  const items = [
    { title: 'PROGRAM NAME', body: 'FCP Digital Operational Notifications', isHtml: false },
    { title: 'SENDER', body: 'DELONTI HENRY DBA FCP DIGITAL', isHtml: false },
    { title: 'MESSAGE TYPES', body: 'Inbound call alerts, lead notifications, call summaries', isHtml: false },
    { title: 'MESSAGE FREQUENCY', body: 'Depends on your account activity. You may receive multiple messages per day during active call periods.', isHtml: false },
    { title: 'COST', body: 'Message and data rates may apply depending on your carrier', isHtml: false },
    { title: 'TO OPT OUT', body: 'Reply <strong>STOP</strong> — one final confirmation sent, then no further messages', isHtml: true },
    { title: 'FOR HELP', body: 'Reply <strong>HELP</strong> or contact services@fcpdigital.net / +1 313 327 3170', isHtml: true },
    { title: 'CARRIER LIABILITY', body: 'Carriers are not liable for delayed or undelivered messages', isHtml: false },
    { title: 'DATA SHARING', body: 'Mobile opt-in data will not be shared with third parties for marketing', isHtml: false },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#060606', color: '#fff', fontFamily: 'monospace' }}>
      <nav style={{ padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f0f0f', position: 'sticky', top: 0, background: '#060606', zIndex: 100 }}>
        <a href="/" style={{ textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span><span style={{ color: '#dc2626' }}>DIGITAL</span>
        </a>
        <a href="/" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>← BACK</a>
      </nav>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.25em', marginBottom: 12 }}>SMS PROGRAM</div>
        <h1 style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>SMS Terms</h1>
        <div style={{ color: '#333', fontSize: 10, marginBottom: 48 }}>FCP Digital Operational Notifications</div>

        {items.map((item, i) => (
          <div key={i} style={{ marginBottom: 40 }}>
            <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 10 }}>{'0' + (i + 1)}</div>
            <h2 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>{item.title}</h2>
            {item.isHtml ? (
              <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }} dangerouslySetInnerHTML={{ __html: item.body }} />
            ) : (
              <p style={{ color: '#555', fontSize: 12, lineHeight: 1.9, margin: 0 }}>{item.body}</p>
            )}
          </div>
        ))}

        <div style={{ marginTop: 60, paddingTop: 40, borderTop: '1px solid #0f0f0f' }}>
          <div style={{ marginBottom: 12, textAlign: 'center' as const }}>
            <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>DELONTI HENRY DBA FCP DIGITAL</div>
          </div>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <a href="/privacy" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>PRIVACY POLICY</a>
            <span style={{ color: '#2a2a2a' }}>|</span>
            <a href="/terms" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>TERMS & CONDITIONS</a>
            <span style={{ color: '#2a2a2a' }}>|</span>
            <a href="/sms-terms" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>SMS TERMS</a>
          </div>
        </div>
      </div>
    </div>
  )
}
