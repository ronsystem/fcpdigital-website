'use client'
import { useState } from 'react'

export default function OraDemoOptIn() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const canSubmit = name.trim() && phone.trim() && email.trim()

  const handleSubmit = async () => {
    if (!canSubmit) return
    setLoading(true)
    try {
      const response = await fetch('/api/ora-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email }),
      })
      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Georgia, serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .ora-logo-heading { font-size: 28px !important; }
          .ora-subheading { font-size: 12px !important; }
          .ora-nav { padding: 12px 16px !important; }
          .ora-container { padding: 40px 16px !important; }
          .ora-success-icon { font-size: 36px !important; }
          .ora-success-welcome { font-size: 18px !important; }
        }
        @media (max-width: 480px) {
          .ora-logo-heading { font-size: 24px !important; }
          .ora-subheading { font-size: 11px !important; }
          .ora-container { padding: 32px 16px !important; }
          input { font-size: 12px !important; }
          button { font-size: 9px !important; }
        }
        .nav-link { color: #999; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #C9A96E; }
      `}} />

      {/* Subtle Footer */}
      <div style={{ padding: '12px 24px', textAlign: 'center' }}>
        <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.2em', fontFamily: 'monospace' }}>POWERED BY FCP DIGITAL</div>
      </div>

      <div className="ora-container" style={{ maxWidth: 480, margin: '0 auto', padding: '60px 24px' }}>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="ora-success-icon" style={{ color: '#C9A96E', fontSize: 48, marginBottom: 24 }}>✦</div>
            <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.3em', fontFamily: 'monospace', marginBottom: 16 }}>YOU'RE ON THE LIST</div>
            <div className="ora-success-welcome" style={{ color: '#fff', fontSize: 22, marginBottom: 16 }}>Welcome to Ora.</div>
            <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
              Watch for a message from Ora Detroit before our next event.
            </div>
          </div>
        ) : (
          <>
            {/* ORA logo area */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.4em', fontFamily: 'monospace', marginBottom: 16 }}>ORA DETROIT</div>
              <div className="ora-logo-heading" style={{ color: '#fff', fontSize: 42, fontWeight: 400, letterSpacing: '0.05em', marginBottom: 12 }}>Join the VIP List</div>
              <div className="ora-subheading" style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
                Get early access to events, exclusive offers, and priority reservations.
              </div>
            </div>

            {/* Form */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 6 }}>YOUR NAME</div>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="First & Last Name"
                style={{ width: '100%', background: '#111', border: '1px solid #1a1a1a', color: '#ccc', padding: '14px 16px', fontSize: 13, fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' as const }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 6 }}>MOBILE NUMBER</div>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+1 (313) 000-0000"
                style={{ width: '100%', background: '#111', border: '1px solid #1a1a1a', color: '#ccc', padding: '14px 16px', fontSize: 13, fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' as const }}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 6 }}>EMAIL ADDRESS</div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{ width: '100%', background: '#111', border: '1px solid #1a1a1a', color: '#ccc', padding: '14px 16px', fontSize: 13, fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' as const }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!canSubmit || loading}
              style={{
                width: '100%', padding: '16px',
                background: canSubmit && !loading ? '#C9A96E' : '#1a1a1a',
                color: canSubmit && !loading ? '#0a0a0a' : '#333',
                border: 'none', fontSize: 10, letterSpacing: '0.25em',
                fontFamily: 'monospace', fontWeight: 700,
                cursor: canSubmit && !loading ? 'pointer' : 'not-allowed', marginBottom: 20,
              }}
            >
              {loading ? 'SUBMITTING...' : 'JOIN THE LIST →'}
            </button>

            <div style={{ color: '#2a2a2a', fontSize: 10, lineHeight: 1.8, fontFamily: 'monospace', textAlign: 'center' }}>
              By joining you agree to receive text messages from Ora Detroit powered by FCP Digital. Message frequency varies. Reply STOP to unsubscribe. Msg & data rates may apply.
            </div>
          </>
        )}
      </div>
    </div>
  )
}
