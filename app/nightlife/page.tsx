'use client'
import { useState } from 'react'

export default function NightlifePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const faqs = [
    {
      q: 'What if I don\'t have a guest list yet?',
      a: 'That\'s the whole point — we build it from scratch. We set up your opt-in page, QR codes, and integrations. The list starts growing from day one.'
    },
    {
      q: 'How does POS integration work?',
      a: 'We connect to your point-of-sale system to pull transaction data. This lets us track spend per guest, identify your top spenders, and trigger campaigns based on purchase behavior.'
    },
    {
      q: 'Can I customize the messages sent to my guests?',
      a: 'Yes. Every message template is customizable. We provide smart defaults based on your tone preference — refined, conversational, or high-energy — and you can modify any campaign before it sends.'
    },
    {
      q: 'What about compliance and legal?',
      a: 'Every opt-in is timestamped, IP logged, and consent-recorded. Unsubscribe requests are processed immediately. We handle all SMS compliance requirements.'
    },
    {
      q: 'How long until I see results?',
      a: 'Most clients see measurable list growth in week one. Re-engagement results typically show within 30-45 days. Spend intelligence data builds over 60-90 days.'
    }
  ]

  return (
    <div style={{ background: '#060606', color: '#fff', fontFamily: 'monospace', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .tier-grid { grid-template-columns: 1fr !important; }
          .hero-section { padding: 40px 20px !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}} />


      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, height: 52, background: '#060606', borderBottom: '1px solid #0f0f0f', display: 'flex', alignItems: 'center', padding: '0 24px', zIndex: 100 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span>
          <span style={{ color: '#dc2626' }}>DIGITAL</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section" style={{ padding: '80px 24px', background: '#060606', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.25em', fontWeight: 700, marginBottom: 16 }}>FCP DIGITAL</div>
          <h1 style={{ fontSize: 42, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '0.02em' }}>Club Intelligence Platform</h1>
          <div style={{ width: 60, height: 2, background: '#dc2626', margin: '20px auto 28px auto' }} />
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.9, maxWidth: 700 }}>
            Complete guest management system for nightlife venues. Capture, analyze, and automate guest engagement.
          </p>
        </div>
      </div>

      {/* Service Tiers Section */}
      <div style={{ padding: '80px 24px', background: '#060606' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.25em', fontWeight: 700, marginBottom: 12 }}>SERVICE TIERS</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '0.02em' }}>Three tiers. Start where it makes sense.</h2>
          </div>

          <div className="tier-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 80 }}>
            {/* PULSE */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', padding: 32, borderRadius: 4 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, color: '#333', marginBottom: 28 }}>PULSE</div>
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 42, fontWeight: 700, color: '#fff' }}>$697</span>
                <span style={{ fontSize: 11, color: '#555', marginLeft: 4 }}>/month</span>
              </div>
              <div style={{ fontSize: 11, color: '#333', marginBottom: 28 }}>$750 setup | 3-month minimum</div>
              <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 8, letterSpacing: '0.2em', fontWeight: 700, color: '#dc2626', marginBottom: 16 }}>INCLUDES:</div>
                {[
                  'Guest list capture (opt-in page + QR codes)',
                  'QR code table displays + bar top cards',
                  'Staff training materials',
                  'Reservation platform integration',
                  'Event Calendar (dashboard)',
                  'Weekly Pulse Report — every Monday',
                  'Basic SMS campaigns (up to 2/month)',
                  'Basic email campaigns (up to 2/month)',
                  'Guest frequency tracking',
                  'Cold guest flagging (30+ days inactive)',
                  'Private event inquiry capture + auto-confirmation',
                  'White-label dashboard (basic)',
                  'Monthly Intelligence Report',
                  'FCP Digital fully managed service'
                ].map((feature, idx) => (
                  <div key={idx} style={{ fontSize: 11, color: '#555', marginBottom: 10, lineHeight: 1.6 }}>✓ {feature}</div>
                ))}
              </div>
              <button style={{ width: '100%', padding: '12px 16px', background: '#111', border: '1px solid #1e1e1e', color: '#fff', fontSize: 10, letterSpacing: '0.15em', fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>
                GET STARTED →
              </button>
            </div>

            {/* INTELLIGENCE - MOST POPULAR */}
            <div style={{ background: '#0f0f0f', border: '2px solid #dc2626', padding: 32, borderRadius: 4, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -10, left: 0, right: 0, textAlign: 'center' }}>
                <div style={{ display: 'inline-block', background: '#dc2626', color: '#fff', padding: '4px 16px', fontSize: 8, letterSpacing: '0.15em', fontWeight: 700 }}>MOST POPULAR</div>
              </div>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, color: '#333', marginBottom: 28, marginTop: 12 }}>INTELLIGENCE</div>
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 42, fontWeight: 700, color: '#fff' }}>$2,500</span>
                <span style={{ fontSize: 11, color: '#555', marginLeft: 4 }}>/month</span>
              </div>
              <div style={{ fontSize: 11, color: '#333', marginBottom: 12 }}>$1,500 setup | 6-month minimum</div>
              <div style={{ fontSize: 10, color: '#555', marginBottom: 28, fontStyle: 'italic' }}>Prefer a shorter commitment? 3-month option available at $2,750/mo.</div>
              <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 8, letterSpacing: '0.2em', fontWeight: 700, color: '#dc2626', marginBottom: 16 }}>EVERYTHING IN PULSE, PLUS:</div>
                {[
                  'AI Call Receptionist — answers calls 24/7, books tables, handles VIP and event inquiries',
                  'POS system integration — spend data, lifetime value tracking',
                  'Spend intelligence — top spenders ranked, churn prediction, VIP auto-tagging',
                  'Re-engagement automation',
                  'Private event follow-up automation',
                  'Guest segmentation (6 segments)',
                  'Campaign automation (event-triggered, birthday, seasonal)',
                  'Basic AI dashboard chat',
                  'Automated recovery calls for negative feedback',
                  'Full white-label — FCP Digital branding removed',
                  'Monthly Intelligence Report'
                ].map((feature, idx) => (
                  <div key={idx} style={{ fontSize: 11, color: '#555', marginBottom: 10, lineHeight: 1.6 }}>✓ {feature}</div>
                ))}
              </div>
              <button style={{ width: '100%', padding: '12px 16px', background: '#dc2626', border: 'none', color: '#fff', fontSize: 10, letterSpacing: '0.15em', fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>
                GET STARTED →
              </button>
            </div>

            {/* COMMAND CENTER */}
            <div style={{ background: '#0f0f0f', border: '1px solid #1e1e1e', padding: 32, borderRadius: 4 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.2em', fontWeight: 700, color: '#333', marginBottom: 28 }}>COMMAND CENTER</div>
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 42, fontWeight: 700, color: '#fff' }}>$5,500</span>
                <span style={{ fontSize: 11, color: '#555', marginLeft: 4 }}>/month</span>
              </div>
              <div style={{ fontSize: 11, color: '#333', marginBottom: 28 }}>$3,000 setup | 12-month minimum</div>
              <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 20, marginBottom: 24 }}>
                <div style={{ fontSize: 8, letterSpacing: '0.2em', fontWeight: 700, color: '#dc2626', marginBottom: 16 }}>EVERYTHING IN INTELLIGENCE, PLUS:</div>
                {[
                  'Autonomous revenue intelligence — system identifies and acts on opportunities without being told',
                  'Revenue attribution — exact dollars tracked per campaign, not estimates',
                  'Predictive analytics — flags guests likely to churn before they disappear',
                  'Multi-revenue stream automation — separate intelligence per revenue line (nightclub, brunch, events, bottle service)',
                  'Custom automation builder — build triggers beyond the standard playbook',
                  'Advanced AI dashboard chat — open-ended queries, execute campaigns directly from chat',
                  'Custom AI voice identity — venue-branded voice and scripting',
                  'Weekly Intelligence Reports (vs monthly)',
                  'Priority infrastructure — first access to all new features and builds'
                ].map((feature, idx) => (
                  <div key={idx} style={{ fontSize: 11, color: '#555', marginBottom: 10, lineHeight: 1.6 }}>✓ {feature}</div>
                ))}
              </div>
              <button style={{ width: '100%', padding: '12px 16px', background: '#111', border: '1px solid #1e1e1e', color: '#fff', fontSize: 10, letterSpacing: '0.15em', fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>
                GET STARTED →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div style={{ padding: '80px 24px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.25em', fontWeight: 700, marginBottom: 12 }}>HOW IT WORKS</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Three steps. No technical skills required.</h2>
          </div>

          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {[
              {
                num: '01',
                title: 'CAPTURE',
                text: 'We build your data capture infrastructure — opt-in pages, QR codes at every touchpoint, reservation integration.'
              },
              {
                num: '02',
                title: 'INTELLIGENCE',
                text: 'Guest frequency tracking, spend data, churn prediction, VIP ranking. Your guests ranked by lifetime value.'
              },
              {
                num: '03',
                title: 'AUTOMATE',
                text: 'Re-engagement campaigns fire automatically. Weekly reports every Monday. You focus on the experience.'
              }
            ].map((step, idx) => (
              <div key={idx}>
                <div style={{ color: '#dc2626', fontSize: 32, fontWeight: 700, marginBottom: 12 }}>{step.num}</div>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 12, letterSpacing: '0.05em' }}>{step.title}</div>
                <div style={{ color: '#555', fontSize: 12, lineHeight: 1.8 }}>{step.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ padding: '80px 24px', background: '#060606' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', letterSpacing: '0.02em' }}>Frequently Asked Questions</h2>
          </div>

          {faqs.map((faq, idx) => (
            <div key={idx} style={{ marginBottom: 24, borderBottom: '1px solid #0f0f0f', paddingBottom: 24 }}>
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '12px 0',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'monospace'
                }}
              >
                <span>{faq.q}</span>
                <span style={{ color: '#dc2626', fontSize: 16, marginLeft: 16 }}>{expandedFaq === idx ? '−' : '+'}</span>
              </button>
              {expandedFaq === idx && (
                <div style={{ color: '#555', fontSize: 12, lineHeight: 1.8, paddingTop: 12 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA Section */}
      <div style={{ padding: '80px 24px', background: '#0a0a0a', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: '0.02em' }}>Ready to activate your guest data?</h2>
          <p style={{ fontSize: 13, color: '#555', marginBottom: 32, lineHeight: 1.8 }}>
            Schedule a 20-minute discovery call.
          </p>
          <button style={{ padding: '14px 32px', background: '#dc2626', color: '#fff', border: 'none', fontSize: 11, letterSpacing: '0.15em', fontWeight: 700, cursor: 'pointer', borderRadius: 4, marginBottom: 32, fontFamily: 'monospace' }}>
            BOOK A CALL →
          </button>
          <div style={{ fontSize: 10, color: '#333', letterSpacing: '0.1em' }}>
            services@fcpdigital.net | (313) 571-8627
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <div style={{ padding: '32px 24px', borderTop: '1px solid #0f0f0f', textAlign: 'center' }}>
        <div style={{ fontSize: 9, color: '#333', marginBottom: 12, letterSpacing: '0.1em' }}>
          © 2026 FCP Digital (Full Clip Productions LLC)
        </div>
        <div style={{ fontSize: 9, color: '#333', letterSpacing: '0.1em' }}>
          PRIVACY POLICY | TERMS OF SERVICE | SMS TERMS
        </div>
      </div>
    </div>
  )
}
