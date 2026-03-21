'use client'
import { useState, useEffect } from 'react'

const FOUNDING_FILLED = 2
const FOUNDING_TOTAL = 15

function Counter({ value }: { value: number }) {
  return <span style={{ color: '#dc2626', fontWeight: 700 }}>{value}</span>
}

export default function LandingPage() {
  const [roiCalls, setRoiCalls] = useState(5)
  const [roiValue, setRoiValue] = useState(500)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 100)
  }, [])

  const monthlyLoss = roiCalls * 4 * roiValue
  const spotsLeft = FOUNDING_TOTAL - FOUNDING_FILLED
  const tier = FOUNDING_FILLED < 5 ? 1 : FOUNDING_FILLED < 15 ? 2 : 3

  const plans = [
    { name: 'LAUNCH', price: 249, minutes: 500, desc: 'Perfect for getting started', calls: '~167 calls/mo', featured: false },
    { name: 'SCALE', price: 499, minutes: 1500, desc: 'Most popular for growing businesses', calls: '~500 calls/mo', featured: true },
    { name: 'DOMINATE', price: 899, minutes: 3000, desc: 'High volume operations', calls: '~1000 calls/mo', featured: false },
  ]

  const faqs = [
    { q: 'How fast can you get me set up?', a: 'Within 24 hours of signing up. We configure your AI, you forward your line, and you\'re live.' },
    { q: 'Does it sound like a robot?', a: 'No. We use the latest AI voice technology that sounds like a real person. Natural conversation, handles interruptions.' },
    { q: 'What if a caller has an emergency?', a: 'You define what counts as an emergency. The AI escalates these immediately via SMS to your phone.' },
    { q: 'Do I need to cancel my current answering service?', a: 'Yes, and you\'ll likely save money. Our AI does more at a fraction of the cost.' },
    { q: 'What happens if I go over my minutes?', a: 'We\'ll reach out before you hit the limit and help you upgrade.' },
    { q: 'Can the AI schedule appointments?', a: 'Yes. It can collect information, confirm availability, and save to your calendar or send you details.' },
    { q: 'Is there a contract?', a: 'No contracts. Month-to-month. If you\'re not happy, cancel anytime.' },
    { q: 'What industries do you serve?', a: 'Any service business that receives inbound calls: plumbing, HVAC, electrical, roofing, cleaning, contracting, etc.' },
  ]

  const S = {
    section: { padding: '80px 24px', maxWidth: 1100, margin: '0 auto' } as React.CSSProperties,
    label: { color: '#dc2626', fontSize: 9, letterSpacing: '0.25em', marginBottom: 12, display: 'block' } as React.CSSProperties,
    h2: { color: '#fff', fontSize: 32, fontWeight: 700, lineHeight: 1.15, marginBottom: 32 } as React.CSSProperties,
    sub: { color: '#555', fontSize: 14, lineHeight: 1.7, maxWidth: 540 } as React.CSSProperties,
  }

  return (
    <div style={{ background: '#060606', color: '#fff', fontFamily: 'monospace', opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 52, background: '#060606', borderBottom: '1px solid #0f0f0f', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 200 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span>
          <span style={{ color: '#dc2626' }}>DIGITAL</span>
        </div>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <a href="#pricing" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>PRICING</a>
          <a href="/contact" style={{ color: '#555', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>CONTACT</a>
          <a href="/login" style={{ color: '#555', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>SIGN IN</a>
          <a href="/signup?plan=scale" style={{ background: '#dc2626', color: '#fff', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none', padding: '8px 14px' }}>CLAIM SPOT</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ paddingTop: 52, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', padding: '6px 12px', borderRadius: 4, marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#dc2626' }} />
              <span style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em' }}>
                {spotsLeft} FOUNDING SPOTS REMAINING
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24 }}>
              Never Miss a<br />
              Customer Call <span style={{ color: '#dc2626' }}>Again.</span>
            </h1>
            <p style={{ color: '#555', fontSize: 15, lineHeight: 1.8, marginBottom: 40, maxWidth: 520 }}>
              Your AI receptionist answers every call in 2 rings, captures customer details,
              and sends you HIGH PRIORITY alerts for emergencies — 24/7, for less than $10/day.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/signup?plan=scale" style={{ background: '#dc2626', color: '#fff', padding: '14px 28px', fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, textDecoration: 'none' }}>
                CLAIM YOUR SPOT →
              </a>
              <a href="#how-it-works" style={{ background: 'transparent', color: '#555', border: '1px solid #1e1e1e', padding: '14px 28px', fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, textDecoration: 'none' }}>
                SEE HOW IT WORKS
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PAIN STATS */}
      <div style={{ borderTop: '1px solid #111', borderBottom: '1px solid #111', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40 }}>
          {[
            { stat: '42%', label: 'of calls go to voicemail after hours' },
            { stat: '80%', label: 'of callers don\'t leave a message' },
            { stat: '$900+', label: 'average value of a missed service call' },
            { stat: '24/7', label: 'your AI answers, every single day' },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ color: i < 3 ? '#dc2626' : '#4ade80', fontSize: 40, fontWeight: 700, lineHeight: 1.1, marginBottom: 8 }}>{item.stat}</div>
              <div style={{ color: '#444', fontSize: 11, lineHeight: 1.5 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ROI CALCULATOR */}
      <div style={{ ...S.section }}>
        <span style={S.label}>ROI CALCULATOR</span>
        <h2 style={S.h2}>How Much Are Missed Calls Costing You?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <div style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', padding: 24 }}>
            <div style={{ color: '#444', fontSize: 9, letterSpacing: '0.15em', marginBottom: 12 }}>
              MISSED CALLS PER WEEK: <span style={{ color: '#fff' }}>{roiCalls}</span>
            </div>
            <input type="range" min={1} max={30} value={roiCalls} onChange={e => setRoiCalls(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#dc2626', marginBottom: 24 }} />
            <div style={{ color: '#444', fontSize: 9, letterSpacing: '0.15em', marginBottom: 12 }}>
              AVERAGE JOB VALUE: <span style={{ color: '#fff' }}>${roiValue}</span>
            </div>
            <input type="range" min={100} max={5000} step={100} value={roiValue} onChange={e => setRoiValue(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#dc2626' }} />
          </div>
          <div style={{ background: 'linear-gradient(135deg, #0f0f0f, #1a0000)', border: '1px solid rgba(220,38,38,0.2)', padding: 24 }}>
            <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.15em', marginBottom: 8 }}>MONTHLY COST OF MISSED CALLS</div>
            <div style={{ color: '#dc2626', fontSize: 48, fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
              {'$' + monthlyLoss.toLocaleString()}
            </div>
            <div style={{ color: '#333', fontSize: 10, marginBottom: 24, lineHeight: 1.6 }}>
              vs. $499/mo for your AI receptionist
            </div>
            <a href="/signup?plan=scale" style={{ background: '#dc2626', color: '#fff', padding: '12px 20px', fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
              STOP THE BLEEDING →
            </a>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how-it-works" style={{ ...S.section, background: '#080808', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={S.label}>HOW IT WORKS</span>
          <h2 style={S.h2}>Up and Running in 24 Hours</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {[
              { n: '01', title: 'Sign Up', desc: 'Pick your plan and complete the 2-minute setup.' },
              { n: '02', title: 'We Configure', desc: 'We set up your AI with your services and tone.' },
              { n: '03', title: 'Forward Your Line', desc: 'Simple call forwarding to your AI number.' },
              { n: '04', title: 'Never Miss a Call', desc: 'Your AI answers 24/7. You get SMS updates.' },
            ].map((step, i) => (
              <div key={i} style={{ borderTop: '2px solid ' + (i === 0 ? '#dc2626' : '#111'), paddingTop: 16 }}>
                <div style={{ color: '#2a2a2a', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{step.n}</div>
                <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{step.title}</div>
                <div style={{ color: '#444', fontSize: 11, lineHeight: 1.7 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ ...S.section }}>
        <span style={S.label}>WHAT YOU GET</span>
        <h2 style={S.h2}>Everything Your Receptionist Does.<br />None of the Drama.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {[
            { title: 'Answers in 2 Rings', desc: 'Every call picked up within 2 rings, no voicemail.' },
            { title: 'Instant SMS Recap', desc: 'Get a text after every call with details.' },
            { title: 'Emergency Escalation', desc: 'Burst pipe at 2am? Your AI identifies it, you know immediately.' },
            { title: 'Full Transcripts', desc: 'Every conversation logged and searchable.' },
            { title: 'Sounds Human', desc: 'Natural conversation, handles interruptions, asks clarifying questions.' },
            { title: 'Bilingual Ready', desc: 'English and Spanish support available.' },
          ].map((f, i) => (
            <div key={i} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: 20 }}>
              <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.2em', marginBottom: 8 }}>FEATURE</div>
              <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: '#444', fontSize: 11, lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" style={{ ...S.section, background: '#080808', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={S.label}>PRICING</span>
          <h2 style={S.h2}>Founding Member Pricing</h2>
          <div style={{ color: '#555', fontSize: 12, marginBottom: 12, lineHeight: 1.7 }}>
            First {FOUNDING_TOTAL} clients lock in founding member rates forever. <Counter value={spotsLeft} /> spots remaining.
          </div>
          {tier <= 2 && (
            <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', padding: 12, marginBottom: 20 }}>
              <span style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.15em' }}>
                {tier === 1 ? 'TIER 1: First month $1 — locked rate forever' : 'TIER 2: Founding rate locked in forever'}
              </span>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                background: plan.featured ? 'linear-gradient(135deg, #0f0f0f, #1a0000)' : '#0f0f0f',
                border: '1px solid ' + (plan.featured ? '#dc2626' : '#1a1a1a'),
                padding: 28,
                position: 'relative',
              }}>
                {plan.featured && (
                  <div style={{ position: 'absolute', top: -1, left: 20, background: '#080808', color: '#dc2626', fontSize: 9, letterSpacing: '0.15em', padding: '4px 12px' }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{ color: '#444', fontSize: 9, letterSpacing: '0.2em', marginBottom: 8 }}>{plan.name}</div>
                <div style={{ color: '#fff', fontSize: 36, fontWeight: 700, lineHeight: 1.1, marginBottom: 4 }}>${plan.price}</div>
                <div style={{ color: '#333', fontSize: 10, marginBottom: 20 }}>per month</div>
                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 20, marginBottom: 20 }}>
                  {[
                    plan.minutes.toLocaleString() + ' minutes/month',
                    plan.calls,
                    'Full dashboard access',
                    'SMS + email alerts',
                    '24/7 AI answering',
                    '14-day money back',
                  ].map((f, fi) => (
                    <div key={fi} style={{ color: '#555', fontSize: 11, marginBottom: 8, display: 'flex', gap: 8 }}>
                      <span style={{ color: '#dc2626', flexShrink: 0 }}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <a href={'/signup?plan=' + plan.name.toLowerCase()} style={{
                  display: 'block', textAlign: 'center', background: plan.featured ? '#dc2626' : 'transparent',
                  border: '1px solid ' + (plan.featured ? '#dc2626' : '#1e1e1e'),
                  color: '#fff', padding: '12px', fontSize: 9, letterSpacing: '0.2em',
                  textDecoration: 'none', fontWeight: 700,
                }}>
                  GET STARTED →
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ ...S.section }}>
        <span style={S.label}>FAQ</span>
        <h2 style={S.h2}>Common Questions</h2>
        <div style={{ marginTop: 32, maxWidth: 720 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid #111' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '20px 0', fontSize: 13, fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'monospace' }}
              >
                <span>{faq.q}</span>
                <span style={{ color: '#dc2626', fontSize: 16, flexShrink: 0, marginLeft: 16 }}>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div style={{ color: '#555', fontSize: 12, lineHeight: 1.8, paddingBottom: 20 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ background: '#080808', borderTop: '1px solid #111', padding: '80px 24px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.25em', marginBottom: 12 }}>
            {spotsLeft + ' FOUNDING SPOTS LEFT'}
          </div>
          <h2 style={{ color: '#fff', fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            Stop Losing Jobs<br />to Voicemail.
          </h2>
          <p style={{ color: '#444', fontSize: 13, lineHeight: 1.7, marginBottom: 32 }}>
            Your competitors are still letting calls go to voicemail. Be the business that always answers.
          </p>
          <a href="/signup?plan=scale" style={{ background: '#dc2626', color: '#fff', padding: '14px 28px', fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
            CLAIM YOUR SPOT →
          </a>
          <div style={{ marginTop: 24, color: '#2a2a2a', fontSize: 9 }}>
            No contracts · 14-day money back · Setup in 24 hours
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #0f0f0f', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>
              <span style={{ color: '#fff' }}>FCP</span>
              <span style={{ color: '#dc2626' }}>DIGITAL</span>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              <span style={{ color: '#2a2a2a', fontSize: 9 }}>services@fcpdigital.net</span>
              <span style={{ color: '#2a2a2a', fontSize: 9 }}>+1 313 327 3170</span>
            </div>
            <div style={{ color: '#1a1a1a', fontSize: 9 }}>© 2026 FCP Digital</div>
          </div>
          <div style={{ borderTop: '1px solid #0a0a0a', paddingTop: 16, display: 'flex', gap: 24 }}>
            <a href="/privacy" style={{ color: '#1e1e1e', fontSize: 9, textDecoration: 'none', letterSpacing: '0.1em' }}>PRIVACY POLICY</a>
            <a href="/terms" style={{ color: '#1e1e1e', fontSize: 9, textDecoration: 'none', letterSpacing: '0.1em' }}>TERMS & CONDITIONS</a>
            <a href="/sms-terms" style={{ color: '#1e1e1e', fontSize: 9, textDecoration: 'none', letterSpacing: '0.1em' }}>SMS TERMS</a>
          </div>
        </div>
      </div>
    </div>
  )
}
