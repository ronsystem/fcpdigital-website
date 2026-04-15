export default function SignupSuccess() {
  return (
    <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'monospace' }}>
      <div style={{ maxWidth: 460, textAlign: 'center' as const }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: '#4ade80', fontSize: 28 }}>✓</div>
        </div>
        <div style={{ color: '#4ade80', fontSize: 9, letterSpacing: '0.25em', marginBottom: 12 }}>PAYMENT CONFIRMED</div>
        <div style={{ color: '#fff', fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Welcome to FCP Digital</div>
        <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.15em', marginBottom: 8 }}>WHAT HAPPENS NEXT</div>
          <div style={{ color: '#ccc', fontSize: 12, lineHeight: 1.8, textAlign: 'left' as const }}>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: '#dc2626', marginRight: 8 }}>1.</span>
              We configure your AI receptionist with your business details
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: '#dc2626', marginRight: 8 }}>2.</span>
              You get a dedicated phone number and dashboard login
            </div>
            <div>
              <span style={{ color: '#dc2626', marginRight: 8 }}>3.</span>
              Your AI starts answering calls within 24 hours
            </div>
          </div>
        </div>
        <div style={{ color: '#555', fontSize: 12, lineHeight: 1.8, marginBottom: 32 }}>
          We'll email you setup instructions shortly.<br />
          If you need anything before then:
        </div>
        <div style={{ color: '#333', fontSize: 10, lineHeight: 1.8 }}>
          Call or text us at<br />
          <span style={{ color: '#555' }}>+1 313 327 3170</span>
        </div>
        <a href="/" style={{
          display: 'inline-block',
          marginTop: 32,
          padding: '12px 32px',
          background: '#dc2626',
          color: '#fff',
          fontSize: 9,
          letterSpacing: '0.2em',
          fontFamily: 'monospace',
          fontWeight: 700,
          textDecoration: 'none',
        }}>
          BACK TO HOME
        </a>
      </div>
    </div>
  )
}
