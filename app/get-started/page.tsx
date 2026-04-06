'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const TIERS = [
  {
    id: 'pulse',
    name: 'PULSE',
    price: '$697/mo',
    setup: '$750',
    setupNum: 750,
    term: '3-month minimum',
    desc: 'Guest list, weekly reports, basic campaigns.'
  },
  {
    id: 'intelligence',
    name: 'INTELLIGENCE',
    price: '$2,500/mo',
    setup: '$1,500',
    setupNum: 1500,
    term: '6-month minimum',
    desc: 'AI receptionist, POS integration, full automation layer.',
    popular: true
  },
  {
    id: 'command',
    name: 'COMMAND CENTER',
    price: '$5,500/mo',
    setup: '$3,000',
    setupNum: 3000,
    term: '12-month minimum',
    desc: 'Autonomous intelligence, revenue attribution, custom automation.'
  }
]

export default function GetStarted() {
  const params = useSearchParams()
  const defaultTier = params.get('tier') || 'intelligence'

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    venueType: '',
    tier: defaultTier
  })
  const router = useRouter()

  const selectedTier = TIERS.find(t => t.id === form.tier)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (err) {
      console.error(err)
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    background: '#f9f9f9',
    border: '1px solid #e5e5e5',
    color: '#0a0a0a',
    padding: '12px 14px',
    fontSize: 13,
    fontFamily: 'monospace',
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: 12
  }

  const labelStyle = {
    color: '#888888',
    fontSize: 8,
    letterSpacing: '0.2em',
    fontFamily: 'monospace',
    display: 'block',
    marginBottom: 4
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'monospace' }}>

      {/* Header */}
      <div style={{ padding: '16px 40px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#0a0a0a', fontWeight: 700, fontSize: 14 }}>FCP</span>
          <span style={{ color: '#dc2626', fontWeight: 700, fontSize: 14 }}>DIGITAL</span>
        </div>
        <div style={{ color: '#aaaaaa', fontSize: 9, letterSpacing: '0.2em' }}>
          SECURE ONBOARDING
        </div>
      </div>

      <div style={{ maxWidth: 580, margin: '0 auto', padding: '48px 24px' }}>

        {/* Progress */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 40 }}>
          {['Your Info', 'Select Package', 'Review & Pay'].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: 3,
                background: i < step ? '#dc2626' : '#f0f0f0',
                marginBottom: 6,
                transition: 'background 0.3s'
              }} />
              <div style={{ fontSize: 8, color: i < step ? '#dc2626' : '#cccccc', letterSpacing: '0.15em' }}>
                {s.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* STEP 1 — Business Info */}
        {step === 1 && (
          <div>
            <div style={{ color: '#0a0a0a', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Tell us about your venue.
            </div>
            <div style={{ color: '#888888', fontSize: 11, marginBottom: 32 }}>
              We'll customize the system specifically for your business.
            </div>

            <label style={labelStyle}>BUSINESS NAME</label>
            <input
              style={inputStyle}
              placeholder="Ora Detroit"
              value={form.businessName}
              onChange={e => setForm({ ...form, businessName: e.target.value })}
            />

            <label style={labelStyle}>YOUR NAME</label>
            <input
              style={inputStyle}
              placeholder="First & Last Name"
              value={form.contactName}
              onChange={e => setForm({ ...form, contactName: e.target.value })}
            />

            <label style={labelStyle}>EMAIL ADDRESS</label>
            <input
              style={inputStyle}
              placeholder="your@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <label style={labelStyle}>PHONE NUMBER</label>
            <input
              style={inputStyle}
              placeholder="+1 (313) 000-0000"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />

            <label style={labelStyle}>VENUE TYPE</label>
            <input
              style={inputStyle}
              placeholder="Nightclub, Restaurant, Lounge..."
              value={form.venueType}
              onChange={e => setForm({ ...form, venueType: e.target.value })}
            />

            <button
              onClick={() => form.businessName && form.contactName && form.email && form.phone ? setStep(2) : null}
              style={{
                width: '100%', padding: '14px',
                background: '#dc2626', color: '#ffffff',
                border: 'none', fontSize: 10,
                letterSpacing: '0.25em', fontFamily: 'monospace',
                fontWeight: 700, cursor: 'pointer', marginTop: 8
              }}
            >
              CONTINUE →
            </button>
          </div>
        )}

        {/* STEP 2 — Tier Selection */}
        {step === 2 && (
          <div>
            <div style={{ color: '#0a0a0a', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Select your package.
            </div>
            <div style={{ color: '#888888', fontSize: 11, marginBottom: 32 }}>
              You can upgrade anytime. Start where it makes sense.
            </div>

            {TIERS.map(tier => (
              <div
                key={tier.id}
                onClick={() => setForm({ ...form, tier: tier.id })}
                style={{
                  border: form.tier === tier.id ? '2px solid #dc2626' : '1px solid #e5e5e5',
                  background: form.tier === tier.id ? '#fff8f8' : '#f9f9f9',
                  padding: '20px 24px',
                  marginBottom: 12,
                  cursor: 'pointer',
                  position: 'relative' as const
                }}
              >
                {tier.popular && (
                  <div style={{
                    position: 'absolute' as const, top: -10, right: 20,
                    background: '#dc2626', color: '#fff',
                    fontSize: 7, letterSpacing: '0.2em',
                    padding: '3px 10px', fontWeight: 700
                  }}>
                    RECOMMENDED
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ color: form.tier === tier.id ? '#dc2626' : '#888888', fontSize: 8, letterSpacing: '0.2em', marginBottom: 4 }}>
                      {tier.name}
                    </div>
                    <div style={{ color: '#0a0a0a', fontSize: 16, fontWeight: 700 }}>{tier.price}</div>
                    <div style={{ color: '#aaaaaa', fontSize: 9, marginTop: 2 }}>{tier.term}</div>
                    <div style={{ color: '#888888', fontSize: 10, marginTop: 8 }}>{tier.desc}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#888888', fontSize: 8, letterSpacing: '0.1em' }}>SETUP FEE</div>
                    <div style={{ color: '#0a0a0a', fontSize: 18, fontWeight: 700 }}>{tier.setup}</div>
                    <div style={{ color: '#aaaaaa', fontSize: 8 }}>due today</div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  flex: 1, padding: '14px',
                  background: 'transparent', color: '#888888',
                  border: '1px solid #e5e5e5', fontSize: 10,
                  letterSpacing: '0.2em', fontFamily: 'monospace',
                  cursor: 'pointer'
                }}
              >
                ← BACK
              </button>
              <button
                onClick={() => setStep(3)}
                style={{
                  flex: 2, padding: '14px',
                  background: '#dc2626', color: '#ffffff',
                  border: 'none', fontSize: 10,
                  letterSpacing: '0.25em', fontFamily: 'monospace',
                  fontWeight: 700, cursor: 'pointer'
                }}
              >
                CONTINUE →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Review & Pay */}
        {step === 3 && selectedTier && (
          <div>
            <div style={{ color: '#0a0a0a', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
              Review & complete.
            </div>
            <div style={{ color: '#888888', fontSize: 11, marginBottom: 32 }}>
              Your setup fee is collected today. Monthly billing begins on your go-live date.
            </div>

            {/* Summary box */}
            <div style={{ background: '#f9f9f9', border: '1px solid #e5e5e5', padding: 24, marginBottom: 24 }}>
              <div style={{ color: '#888888', fontSize: 8, letterSpacing: '0.2em', marginBottom: 16 }}>ORDER SUMMARY</div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ color: '#0a0a0a', fontSize: 11 }}>{selectedTier.name} — Setup Fee</div>
                <div style={{ color: '#0a0a0a', fontSize: 11, fontWeight: 700 }}>{selectedTier.setup}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ color: '#888888', fontSize: 10 }}>Monthly (starting go-live)</div>
                <div style={{ color: '#888888', fontSize: 10 }}>{selectedTier.price}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ color: '#888888', fontSize: 10 }}>Minimum term</div>
                <div style={{ color: '#888888', fontSize: 10 }}>{selectedTier.term}</div>
              </div>

              <div style={{ borderTop: '1px solid #e5e5e5', marginTop: 12, paddingTop: 12 }}>
                <div style={{ color: '#888888', fontSize: 8, letterSpacing: '0.2em', marginBottom: 10 }}>YOUR INFO</div>
                <div style={{ color: '#555555', fontSize: 10, lineHeight: 1.8 }}>
                  {form.businessName}<br />
                  {form.contactName}<br />
                  {form.email}<br />
                  {form.phone}
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div style={{ background: '#fff8f8', border: '1px solid #fecaca', padding: 20, marginBottom: 24 }}>
              <div style={{ color: '#dc2626', fontSize: 8, letterSpacing: '0.2em', marginBottom: 12 }}>WHAT HAPPENS NEXT</div>
              {[
                'Setup fee collected securely via Stripe',
                'Service agreement sent to your email within minutes',
                'Once signed — we begin building immediately',
                'Your system goes live within 7 days'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span style={{ color: '#dc2626', fontSize: 10, minWidth: 16 }}>{i + 1}.</span>
                  <span style={{ color: '#555555', fontSize: 10 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  flex: 1, padding: '14px',
                  background: 'transparent', color: '#888888',
                  border: '1px solid #e5e5e5', fontSize: 10,
                  letterSpacing: '0.2em', fontFamily: 'monospace',
                  cursor: 'pointer'
                }}
              >
                ← BACK
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  flex: 2, padding: '14px',
                  background: loading ? '#888888' : '#dc2626',
                  color: '#ffffff', border: 'none',
                  fontSize: 10, letterSpacing: '0.25em',
                  fontFamily: 'monospace', fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'REDIRECTING...' : `PAY ${selectedTier.setup} & GET STARTED →`}
              </button>
            </div>

            <div style={{ color: '#cccccc', fontSize: 8, textAlign: 'center', marginTop: 16, lineHeight: 1.8 }}>
              Secured by Stripe. Setup fee is non-refundable.<br />
              Service agreement will be emailed after payment.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
