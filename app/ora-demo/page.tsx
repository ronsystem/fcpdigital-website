'use client'
import { useState } from 'react'

export default function OraDemoOptIn() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = name.trim() && phone.trim() && email.trim()

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Georgia, serif' }}>

      {/* Subtle FCP Digital nav */}
      <div style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace' }}>POWERED BY FCP DIGITAL</div>
        <a href="/" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none', fontFamily: 'monospace' }}>fcpdigital.net</a>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '60px 24px' }}>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ color: '#C9A96E', fontSize: 48, marginBottom: 24 }}>✦</div>
            <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.3em', fontFamily: 'monospace', marginBottom: 16 }}>YOU'RE ON THE LIST</div>
            <div style={{ color: '#fff', fontSize: 22, marginBottom: 16 }}>Welcome to Ora.</div>
            <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
              Watch for a message from Ora Detroit before our next event.
            </div>
          </div>
        ) : (
          <>
            {/* ORA logo area */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.4em', fontFamily: 'monospace', marginBottom: 16 }}>ORA DETROIT</div>
              <div style={{ color: '#fff', fontSize: 42, fontWeight: 400, letterSpacing: '0.05em', marginBottom: 12 }}>Join the VIP List</div>
              <div style={{ color: '#666', fontSize: 13, lineHeight: 1.8 }}>
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
              onClick={() => canSubmit && setSubmitted(true)}
              style={{
                width: '100%', padding: '16px',
                background: canSubmit ? '#C9A96E' : '#1a1a1a',
                color: canSubmit ? '#0a0a0a' : '#333',
                border: 'none', fontSize: 10, letterSpacing: '0.25em',
                fontFamily: 'monospace', fontWeight: 700,
                cursor: canSubmit ? 'pointer' : 'not-allowed', marginBottom: 20,
              }}
            >
              JOIN THE LIST →
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
