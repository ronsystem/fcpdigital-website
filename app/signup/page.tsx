'use client'
import { useState } from 'react'

const services = ['Plumbing', 'HVAC', 'Electrical', 'Landscaping', 'Roofing', 'Cleaning', 'General Contracting']

export default function SignupPage() {
  const [form, setForm] = useState({ business: '', name: '', email: '', phone: '', service: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSubmitted(true)
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    background: '#0f0f0f',
    border: '1px solid #1e1e1e',
    color: '#ccc',
    padding: '12px 14px',
    fontSize: 12,
    fontFamily: 'monospace',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: 16,
  }

  const labelStyle = {
    color: '#333',
    fontSize: 8,
    letterSpacing: '0.15em',
    marginBottom: 6,
    display: 'block' as const,
  }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', fontFamily: 'monospace' }}>
        <div style={{ maxWidth: 420, textAlign: 'center' as const }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#4ade80', fontSize: 22 }}>✓</div>
          </div>
          <div style={{ color: '#4ade80', fontSize: 9, letterSpacing: '0.25em', marginBottom: 8 }}>SUCCESS</div>
          <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>You're on the list</div>
          <div style={{ color: '#555', fontSize: 12, lineHeight: 1.7, marginBottom: 32 }}>
            We'll reach out to {form.email} within 24 hours to get your AI receptionist set up.
          </div>
          <a href="/" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>Back to home →</a>
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
        <a href="/login" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>SIGN IN</a>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 8 }}>
              FOUNDING MEMBER PRICING AVAILABLE
            </div>
            <div style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Get AI Phone</div>
            <div style={{ color: '#333', fontSize: 11, lineHeight: 1.6 }}>
              Your AI receptionist answers every call, 24/7. Setup takes less than 24 hours.
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>BUSINESS NAME *</label>
            <input type="text" required value={form.business} onChange={e => update('business', e.target.value)} placeholder="Your business name" style={inputStyle} />

            <label style={labelStyle}>YOUR NAME *</label>
            <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" style={inputStyle} />

            <label style={labelStyle}>EMAIL ADDRESS *</label>
            <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="owner@yourbusiness.com" style={inputStyle} />

            <label style={labelStyle}>PHONE NUMBER *</label>
            <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 313 327 3170" style={inputStyle} />

            <label style={labelStyle}>TYPE OF BUSINESS *</label>
            <select required value={form.service} onChange={e => update('service', e.target.value)} style={{ ...inputStyle, color: form.service ? '#ccc' : '#555' }}>
              <option value="">Select your industry...</option>
              {services.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <button type="submit" disabled={loading}
              style={{ width: '100%', background: loading ? '#1a1a1a' : '#dc2626', border: '1px solid #dc2626', color: loading ? '#444' : '#fff', padding: '14px', fontSize: 10, letterSpacing: '0.2em', fontFamily: 'monospace', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, transition: 'all 0.2s' }}>
              {loading ? 'SUBMITTING...' : 'CLAIM YOUR SPOT →'}
            </button>
          </form>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: 24 }}>
            {['14-day guarantee', 'Setup in 24hrs', 'No contracts'].map((t, i) => (
              <div key={i} style={{ color: '#2a2a2a', fontSize: 9, letterSpacing: '0.1em', textAlign: 'center' as const }}>
                {t}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, textAlign: 'center' as const, color: '#222', fontSize: 9 }}>
            Already have an account? <a href="/login" style={{ color: '#dc2626', textDecoration: 'none' }}>Sign in</a>
          </div>
        </div>
      </div>
    </div>
  )
}
