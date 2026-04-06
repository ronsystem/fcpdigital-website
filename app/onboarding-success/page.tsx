'use client'

export default function OnboardingSuccess() {
  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 520, padding: '48px 32px', textAlign: 'center' }}>

        <div style={{ color: '#dc2626', fontSize: 48, marginBottom: 24 }}>✦</div>

        <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.3em', marginBottom: 16 }}>
          PAYMENT CONFIRMED
        </div>

        <div style={{ color: '#0a0a0a', fontSize: 26, fontWeight: 700, marginBottom: 16 }}>
          Welcome to FCP Digital.
        </div>

        <div style={{ color: '#888888', fontSize: 11, lineHeight: 1.9, marginBottom: 40 }}>
          Your setup fee has been collected. Check your email —
          your service agreement will arrive within the next few minutes.
          Once signed, we begin building immediately.
        </div>

        <div style={{ background: '#f9f9f9', border: '1px solid #e5e5e5', padding: 28, textAlign: 'left', marginBottom: 32 }}>
          <div style={{ color: '#dc2626', fontSize: 8, letterSpacing: '0.2em', marginBottom: 16 }}>WHAT HAPPENS NEXT</div>
          {[
            ['Within minutes', 'Service agreement sent to your email'],
            ['Sign the agreement', 'We begin building your system immediately'],
            ['Day 3–5', 'Opt-in page, QR codes, and AI receptionist configured'],
            ['Day 7', 'Your system goes live'],
            ['Day 14', 'First campaign sent to early subscribers'],
            ['Day 30', 'First Pulse Report delivered with results'],
          ].map(([time, desc], i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
              <div style={{ color: '#dc2626', fontSize: 9, minWidth: 80, fontWeight: 700 }}>{time}</div>
              <div style={{ color: '#555555', fontSize: 10 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ color: '#aaaaaa', fontSize: 10, lineHeight: 1.8 }}>
          Questions? Reach out directly.<br />
          <strong style={{ color: '#0a0a0a' }}>services@fcpdigital.net</strong><br />
          <strong style={{ color: '#0a0a0a' }}>(313) 571-8627</strong>
        </div>
      </div>
    </div>
  )
}
