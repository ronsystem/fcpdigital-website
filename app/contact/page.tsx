'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '' })
  const [consents, setConsents] = useState({ nonMarketing: false, marketing: false })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          email: form.email,
          smsNonmarketingConsent: consents.nonMarketing,
          smsMarketingConsent: consents.marketing,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to send message' }))
        throw new Error(errorData.error || 'Failed to send message')
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
          <div style={{ color: '#4ade80', fontSize: 9, letterSpacing: '0.25em', marginBottom: 12, textTransform: 'uppercase' }}>Submitted</div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Thank you for submitting.</div>
          <a href="/" style={{ color: '#dc2626', fontSize: 10, letterSpacing: '0.1em', textDecoration: 'none', fontWeight: 700 }}>← BACK HOME</a>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', flexDirection: 'column' as const, fontFamily: 'monospace' }}>
      <nav style={{ padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f0f0f' }}>
        <a href="/" style={{ textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span><span style={{ color: '#dc2626' }}>DIGITAL</span>
        </a>
        <a href="/" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>← BACK</a>
      </nav>

      <div style={{ flex: 1, display: 'flex', padding: '40px 24px', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Contact</div>
            <div style={{ color: '#333', fontSize: 11, lineHeight: 1.6 }}>
              Get in touch with the FCP Digital team.
            </div>
          </div>

          <div style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', padding: 16, marginBottom: 24, borderRadius: 4 }}>
            <div style={{ color: '#555', fontSize: 11, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: '#999' }}>Phone</strong><br />
                +1 313 327 3170
              </div>
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: '#999' }}>Email</strong><br />
                services@fcpdigital.net
              </div>
              <div>
                <strong style={{ color: '#999' }}>Hours</strong><br />
                Mon–Fri: 9AM – 5PM EST
              </div>
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626', padding: 12, marginBottom: 16, fontSize: 11, borderRadius: 4 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>FIRST NAME (optional)</label>
            <input
              type="text"
              value={form.firstName}
              onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
              placeholder="Your first name"
              style={inputStyle}
            />

            <label style={labelStyle}>LAST NAME (optional)</label>
            <input
              type="text"
              value={form.lastName}
              onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
              placeholder="Your last name"
              style={inputStyle}
            />

            <label style={labelStyle}>PHONE *</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="+1 313 327 3170"
              style={inputStyle}
            />

            <label style={labelStyle}>EMAIL *</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@example.com"
              style={inputStyle}
            />

            <div style={{ marginBottom: 16, padding: 14, background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', color: '#ccc', fontSize: 10, lineHeight: 1.6 }}>
                <input
                  type="checkbox"
                  checked={consents.nonMarketing}
                  onChange={e => setConsents(c => ({ ...c, nonMarketing: e.target.checked }))}
                  style={{ marginTop: 3, cursor: 'pointer', minWidth: 18, width: 18, height: 18 }}
                />
                <span>By checking this box, I consent to receive non-marketing text messages from DELONTI HENRY DBA FCP DIGITAL about appointment reminders, order confirmations, and account notifications, among others. Message frequency varies, message & data rates may apply. Text HELP for assistance, reply STOP to opt out.</span>
              </label>
            </div>

            <div style={{ marginBottom: 24, padding: 14, background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', color: '#ccc', fontSize: 10, lineHeight: 1.6 }}>
                <input
                  type="checkbox"
                  checked={consents.marketing}
                  onChange={e => setConsents(c => ({ ...c, marketing: e.target.checked }))}
                  style={{ marginTop: 3, cursor: 'pointer', minWidth: 18, width: 18, height: 18 }}
                />
                <span>By checking this box, I consent to receive marketing and promotional messages including special offers, discounts, and new product updates from DELONTI HENRY DBA FCP DIGITAL at the phone number provided. Frequency may vary. Message & data rates may apply. Text HELP for assistance, reply STOP to opt out.</span>
              </label>
            </div>

            <div style={{ marginBottom: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>DELONTI HENRY DBA FCP DIGITAL</div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
                <a href="/privacy" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>PRIVACY POLICY</a>
                <span style={{ color: '#2a2a2a' }}>|</span>
                <a href="/terms" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>TERMS OF SERVICE</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={!form.phone || !form.email || loading}
              style={{
                width: '100%',
                background: !form.phone || !form.email || loading ? '#1a1a1a' : '#dc2626',
                border: 'none',
                color: !form.phone || !form.email || loading ? '#444' : '#fff',
                padding: 14,
                fontSize: 10,
                letterSpacing: '0.2em',
                fontFamily: 'monospace',
                cursor: !form.phone || !form.email || loading ? 'not-allowed' : 'pointer',
                fontWeight: 700,
              }}
            >
              {loading ? 'SENDING...' : 'SEND MESSAGE →'}
            </button>
          </form>

          <div style={{ color: '#333', fontSize: 9, lineHeight: 1.8, textAlign: 'center' as const, marginTop: 20 }}>
            We'll respond to inquiries within 24 hours during business hours.
          </div>
        </div>
      </div>
    </div>
  )
}
