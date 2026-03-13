'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const FOUNDING_FILLED = 2
const FOUNDING_TOTAL = 15

const PLANS = {
  launch: { name: 'LAUNCH', price: 249, minutes: 500 },
  scale: { name: 'SCALE', price: 499, minutes: 1500 },
  dominate: { name: 'DOMINATE', price: 899, minutes: 3000 },
}

type PlanKey = keyof typeof PLANS

function getFoundingOffer(filled: number): { label: string; firstMonth: number; badge: string } {
  if (filled < 5) return { label: 'Founding Tier 1', firstMonth: 1, badge: 'FIRST MONTH $1' }
  if (filled < 15) return { label: 'Founding Tier 2', firstMonth: -50, badge: '50% OFF FIRST MONTH' }
  return { label: 'Standard', firstMonth: 0, badge: '' }
}

const services = ['Plumbing', 'HVAC', 'Electrical', 'Landscaping', 'Roofing', 'Cleaning', 'General Contracting']

function SignupForm() {
  const searchParams = useSearchParams()
  const planParam = (searchParams.get('plan') || 'scale') as PlanKey
  const selectedPlan = PLANS[planParam] || PLANS.scale

  const [form, setForm] = useState({
    business: '',
    name: '',
    email: '',
    phone: '',
    service: '',
    plan: selectedPlan.name,
  })
  const [smsConsent, setSmsConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setForm(f => ({ ...f, plan: selectedPlan.name }))
  }, [planParam, selectedPlan.name])

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const offer = getFoundingOffer(FOUNDING_FILLED)
  const spotsLeft = FOUNDING_TOTAL - FOUNDING_FILLED
  const firstMonthPrice = offer.firstMonth === 1
    ? 1
    : offer.firstMonth === -50
    ? Math.round(selectedPlan.price * 0.5)
    : selectedPlan.price

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.business,
          owner_name: form.name,
          owner_email: form.email,
          owner_phone: form.phone,
          service_type: form.service,
          plan: form.plan.toLowerCase(),
          status: 'lead',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      })
    } catch (err) {
      console.error('Signup error:', err)
    } finally {
      setSubmitted(true)
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
        <div style={{ maxWidth: 460, textAlign: 'center' as const }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ color: '#4ade80', fontSize: 28 }}>✓</div>
          </div>
          <div style={{ color: '#4ade80', fontSize: 9, letterSpacing: '0.25em', marginBottom: 12 }}>CONFIRMED</div>
          <div style={{ color: '#fff', fontSize: 26, fontWeight: 700, marginBottom: 16 }}>You're all set</div>
          <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', padding: 16, marginBottom: 24 }}>
            <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.15em', marginBottom: 6 }}>SELECTED PLAN</div>
            <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{form.plan}</div>
            {offer.badge && (
              <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', marginTop: 6 }}>
                {offer.badge}
              </div>
            )}
          </div>
          <div style={{ color: '#555', fontSize: 12, lineHeight: 1.8, marginBottom: 32 }}>
            We'll reach out to <span style={{ color: '#ccc' }}>{form.email}</span> within 24 hours to get your AI receptionist live.
          </div>
          <div style={{ color: '#333', fontSize: 10, lineHeight: 1.8 }}>
            Questions? Call or text us at<br />
            <span style={{ color: '#555' }}>+1 313 327 3170</span>
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
        <a href="/login" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>SIGN IN</a>
      </nav>
      <div style={{ flex: 1, display: 'flex', padding: '40px 24px', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, maxWidth: 1100, width: '100%' }}>
          {/* Left: Plan Summary */}
          <div style={{ width: '100%', maxWidth: 320 }}>
            <div style={{ marginBottom: 24 }}>
              <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.25em', marginBottom: 4 }}>YOUR PLAN</div>
              <div style={{ color: '#fff', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{selectedPlan.name}</div>
            </div>
            {offer.badge && (
              <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', padding: 16, marginBottom: 20 }}>
                <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.15em', marginBottom: 6 }}>FOUNDING MEMBER OFFER</div>
                <div style={{ color: '#dc2626', fontSize: 11, fontWeight: 700 }}>{offer.label}</div>
                <div style={{ color: '#555', fontSize: 9, marginTop: 4 }}>Then ${selectedPlan.price}/mo</div>
              </div>
            )}
            <div style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#555', fontSize: 11 }}>First month</span>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>${firstMonthPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ color: '#555', fontSize: 11 }}>After that</span>
                <span style={{ color: '#ccc', fontSize: 13 }}>${selectedPlan.price}/mo</span>
              </div>
              {[
                selectedPlan.minutes.toLocaleString() + ' minutes/month',
                '24/7 AI answering',
                'SMS + email alerts',
                'Full dashboard',
                '14-day money back',
              ].map((f, i) => (
                <div key={i} style={{ color: '#444', fontSize: 11, marginBottom: 8, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#dc2626' }}>✓</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            {spotsLeft > 0 && (
              <div style={{ marginTop: 16, color: '#333', fontSize: 9, textAlign: 'center' as const }}>
                {spotsLeft} founding spots remaining
              </div>
            )}
            {/* Plan switcher */}
            <div style={{ marginTop: 20 }}>
              <div style={{ color: '#2a2a2a', fontSize: 8, letterSpacing: '0.15em', marginBottom: 8 }}>SWITCH PLAN</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {(Object.keys(PLANS) as PlanKey[]).map(key => (
                  <a key={key} href={'/signup?plan=' + key} style={{
                    flex: 1,
                    textAlign: 'center' as const,
                    padding: '8px 4px',
                    background: planParam === key ? 'rgba(220,38,38,0.1)' : 'transparent',
                    border: '1px solid ' + (planParam === key ? '#dc2626' : '#1a1a1a'),
                    color: planParam === key ? '#dc2626' : '#333',
                    fontSize: 8,
                    letterSpacing: '0.1em',
                    textDecoration: 'none',
                  }}>
                    {PLANS[key].name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ width: '100%', maxWidth: 400 }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Get Started</div>
              <div style={{ color: '#333', fontSize: 11, lineHeight: 1.6 }}>
                Fill in your details and we'll have your AI answering calls within 24 hours.
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

              {/* SMS Consent Checkbox */}
              <div style={{ marginBottom: 20, padding: 14, background: '#0f0f0f', border: '1px solid #1e1e1e' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', color: '#ccc', fontSize: 11, lineHeight: 1.6 }}>
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={e => setSmsConsent(e.target.checked)}
                    style={{ marginTop: 3, cursor: 'pointer', minWidth: 18, width: 18, height: 18 }}
                  />
                  <span>
                    I agree to receive SMS notifications from FCP Digital regarding inbound call alerts and lead activity from the AI receptionist system. Message frequency depends on your account activity. You may receive multiple messages per day during active call periods. Message and data rates may apply. Reply STOP to opt out at any time. Reply HELP for assistance.
                  </span>
                </label>
              </div>

              {/* Links to policy pages */}
              <div style={{ marginBottom: 16, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' as const }}>
                <a href="/privacy" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>PRIVACY POLICY</a>
                <span style={{ color: '#2a2a2a' }}>|</span>
                <a href="/terms" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>TERMS</a>
                <span style={{ color: '#2a2a2a' }}>|</span>
                <a href="/sms-terms" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>SMS TERMS</a>
              </div>

              <label style={labelStyle}>TYPE OF BUSINESS *</label>
              <select required value={form.service} onChange={e => update('service', e.target.value)} style={{ ...inputStyle, color: form.service ? '#ccc' : '#555' }}>
                <option value="">Select your industry...</option>
                {services.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <input type="hidden" value={form.plan} />

              <button type="submit" disabled={loading} style={{
                width: '100%',
                background: loading ? '#1a1a1a' : '#dc2626',
                border: 'none',
                color: loading ? '#444' : '#fff',
                padding: 16,
                fontSize: 10,
                letterSpacing: '0.2em',
                fontFamily: 'monospace',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 700,
                marginTop: 8,
              }}>
                {loading ? 'SUBMITTING...' : 'CLAIM YOUR SPOT →'}
              </button>
            </form>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 20 }}>
              {['No contracts', '14-day guarantee', 'Live in 24hrs'].map((t, i) => (
                <span key={i} style={{ color: '#2a2a2a', fontSize: 9 }}>✓ {t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #0f0f0f', padding: '24px' }}>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/privacy" style={{ color: '#1e1e1e', fontSize: 9, textDecoration: 'none', letterSpacing: '0.1em' }}>PRIVACY POLICY</a>
          <span style={{ color: '#0a0a0a' }}>|</span>
          <a href="/terms" style={{ color: '#1e1e1e', fontSize: 9, textDecoration: 'none', letterSpacing: '0.1em' }}>TERMS & CONDITIONS</a>
          <span style={{ color: '#0a0a0a' }}>|</span>
          <a href="/sms-terms" style={{ color: '#1e1e1e', fontSize: 9, textDecoration: 'none', letterSpacing: '0.1em' }}>SMS TERMS</a>
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#060606', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontFamily: 'monospace' }}>Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}
