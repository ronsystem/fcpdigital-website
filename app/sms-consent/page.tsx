'use client'

import { useState } from 'react'

export default function SmsConsentPage() {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    phone: '',
  })
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/sms-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.firstName,
          owner_email: form.email,
          owner_phone: form.phone,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit consent form')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#0f0f0f',
    border: '1px solid #1e1e1e',
    color: '#ccc',
    padding: '12px 14px',
    fontSize: 12,
    fontFamily: 'monospace',
    outline: 'none' as const,
    boxSizing: 'border-box' as const,
    marginBottom: 16,
  }

  const labelStyle = {
    color: '#333',
    fontSize: 8,
    letterSpacing: '0.15em',
    marginBottom: 6,
    display: 'block' as const,
    textTransform: 'uppercase' as const,
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'monospace' }}>
        <div style={{ maxWidth: 460, textAlign: 'center' as const }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#4ade80', fontSize: 28 }}>✓</div>
          </div>
          <div style={{ color: '#4ade80', fontSize: 9, letterSpacing: '0.25em', marginBottom: 12, textTransform: 'uppercase' }}>Confirmed</div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>You're opted in</div>
          <div style={{ color: '#555', fontSize: 12, lineHeight: 1.8, marginBottom: 32 }}>
            You'll receive SMS notifications for inbound calls and lead activity. Reply STOP at any time to opt out.
          </div>
          <div style={{ color: '#333', fontSize: 10, lineHeight: 1.8 }}>
            Questions? Contact us at<br />
            <span style={{ color: '#555' }}>services@fcpdigital.net</span> or <span style={{ color: '#555' }}>+1 313 327 3170</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', flexDirection: 'column' as const, fontFamily: 'monospace' }}>
      <nav style={{ padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f0f0f' }}>
        <a href="/" style={{ textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span>
          <span style={{ color: '#dc2626' }}>DIGITAL</span>
        </a>
        <a href="/" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>← BACK</a>
      </nav>

      <div style={{ flex: 1, display: 'flex', padding: '40px 24px', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: '#dc2626', fontSize: 14, fontWeight: 700, marginBottom: 24 }}>FCP Digital — SMS Notifications</div>
          </div>
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>SMS Notifications</div>
            <div style={{ color: '#333', fontSize: 11, lineHeight: 1.6 }}>
              Opt in to receive SMS alerts for inbound calls and lead activity from your AI receptionist.
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626', padding: 12, marginBottom: 16, fontSize: 11, borderRadius: 4 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>FIRST NAME *</label>
            <input
              type="text"
              required
              value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              placeholder="Your first name"
              style={inputStyle}
            />

            <label style={labelStyle}>EMAIL ADDRESS *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="owner@yourbusiness.com"
              style={inputStyle}
            />

            <label style={labelStyle}>MOBILE PHONE NUMBER *</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="+1 313 327 3170"
              style={inputStyle}
            />

            {/* Consent Checkbox */}
            <div style={{ marginBottom: 20, padding: 14, background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', color: '#ccc', fontSize: 11, lineHeight: 1.6 }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={e => setConsent(e.target.checked)}
                  style={{ marginTop: 3, cursor: 'pointer', minWidth: 18, width: 18, height: 18 }}
                />
                <span>
                  I agree to receive SMS notifications from FCP Digital regarding inbound call alerts and lead activity from the AI receptionist system. Message frequency depends on your account activity. You may receive multiple messages per day during active call periods. Message and data rates may apply. Reply STOP to opt out at any time. Reply HELP for assistance.
                </span>
              </label>
            </div>

            {/* Links to policy pages */}
            <div style={{ marginBottom: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <a href="/privacy" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>PRIVACY POLICY</a>
              <span style={{ color: '#2a2a2a' }}>|</span>
              <a href="/terms" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>TERMS</a>
              <span style={{ color: '#2a2a2a' }}>|</span>
              <a href="/sms-terms" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>SMS TERMS</a>
            </div>

            <button
              type="submit"
              disabled={!consent || loading}
              style={{
                width: '100%',
                background: !consent || loading ? '#1a1a1a' : '#dc2626',
                border: 'none',
                color: !consent || loading ? '#444' : '#fff',
                padding: 14,
                fontSize: 10,
                letterSpacing: '0.2em',
                fontFamily: 'monospace',
                cursor: !consent || loading ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              {loading ? 'SUBMITTING...' : 'OPT IN'}
            </button>
          </form>

          {/* Fine print */}
          <div style={{ color: '#333', fontSize: 9, lineHeight: 1.8, textAlign: 'center' as const }}>
            By submitting this form you confirm you are the mobile account holder or have authorization to opt in this number. FCP Digital will never share or sell your mobile number or SMS opt-in data to third parties or affiliates for marketing or promotional purposes. Standard messaging rates may apply. For support: services@fcpdigital.net or +1 313 327 3170.
          </div>
        </div>
      </div>
    </div>
  )
}
