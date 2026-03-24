'use client'
import { useState } from 'react'

export default function ClubsPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Do I need to install anything?',
      a: 'No. We build and manage everything.'
    },
    {
      q: 'What if I don\'t have a list yet?',
      a: 'That\'s the point — we build it.'
    },
    {
      q: 'How long until I see results?',
      a: 'Most clients see measurable return within 30 days.'
    },
    {
      q: 'Is my guest data secure?',
      a: 'Yes. Each client has an isolated data environment.'
    },
    {
      q: 'What POS systems do you work with?',
      a: 'Toast, Square, Clover, Lightspeed, and CSV export.'
    },
  ]

  const tiers = [
    {
      name: 'PULSE',
      price: '$497',
      period: '/mo',
      setup: '$750',
      contract: '3 months',
      features: [
        { label: 'Guest List', included: true },
        { label: 'Weekly Report', included: true },
        { label: 'Segmentation', included: false },
        { label: 'POS Integration', included: false },
        { label: 'Spend Intelligence', included: false },
        { label: 'AI Agent', included: false },
      ]
    },
    {
      name: 'INTELLIGENCE',
      price: '$1,750',
      period: '/mo',
      setup: '$1,500',
      contract: '6 months',
      features: [
        { label: 'Guest List', included: true },
        { label: 'Weekly Report', included: true },
        { label: 'Segmentation', included: true },
        { label: 'POS Integration', included: true },
        { label: 'Spend Intelligence', included: true },
        { label: 'AI Agent', included: false },
      ]
    },
    {
      name: 'COMMAND CENTER',
      price: '$4,500',
      period: '/mo',
      setup: '$3,500',
      contract: '12 months',
      features: [
        { label: 'Guest List', included: true },
        { label: 'Weekly Report', included: true },
        { label: 'Segmentation', included: true },
        { label: 'POS Integration', included: true },
        { label: 'Spend Intelligence', included: true },
        { label: 'AI Agent', included: true },
      ],
      highlight: true
    },
  ]

  return (
    <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'Georgia, serif' }}>

      {/* Navigation */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #1a1a1a' }}>
        <a href="/" style={{ color: '#999', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', textDecoration: 'none' }}>FCP DIGITAL</a>
      </div>

      {/* Hero Section */}
      <div style={{ padding: '80px 24px', textAlign: 'center', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 16 }}>
          FCP DIGITAL — CLUB INTELLIGENCE
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 400, marginBottom: 24, letterSpacing: '0.02em' }}>
          The Guest Intelligence System Built for Nightlife.
        </h1>
        <p style={{ fontSize: 16, color: '#999', lineHeight: 1.8, marginBottom: 32 }}>
          Know who your guests are, how often they come, how much they spend — and bring them back automatically.
        </p>
        <button style={{ padding: '14px 32px', background: '#C9A96E', color: '#0a0a0a', border: 'none', fontSize: 11, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>
          VIEW PACKAGES →
        </button>
      </div>

      {/* How It Works */}
      <div style={{ padding: '80px 24px', background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 400, marginBottom: 64, textAlign: 'center', letterSpacing: '0.05em' }}>
            How It Works
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            {[
              {
                step: '01',
                title: 'CAPTURE',
                desc: 'We build your data capture infrastructure — opt-in pages, QR codes, OpenTable integration, POS connections.'
              },
              {
                step: '02',
                title: 'INTELLIGENCE',
                desc: 'Analytics, guest frequency tracking, spend data, churn prediction. Your guests ranked by lifetime value.'
              },
              {
                step: '03',
                title: 'AUTOMATE',
                desc: 'Re-engagement campaigns fire automatically. Weekly pulse reports land every Monday. You watch revenue grow.'
              },
            ].map((item, idx) => (
              <div key={idx}>
                <div style={{ color: '#C9A96E', fontSize: 14, fontFamily: 'monospace', fontWeight: 700, marginBottom: 16 }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: 14, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 13, color: '#999', lineHeight: 1.8 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 400, marginBottom: 64, textAlign: 'center', letterSpacing: '0.05em' }}>
            Service Tiers
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                style={{
                  background: tier.highlight ? '#111' : '#0d0d0d',
                  border: `1px solid ${tier.highlight ? '#C9A96E' : '#1a1a1a'}`,
                  padding: 32,
                  borderRadius: 4,
                  position: 'relative',
                }}
              >
                {tier.highlight && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '8px 16px', background: '#C9A96E', color: '#0a0a0a', fontSize: 8, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center' }}>
                    MOST POPULAR
                  </div>
                )}

                <div style={{ marginTop: tier.highlight ? 24 : 0, marginBottom: 32 }}>
                  <div style={{ fontSize: 14, letterSpacing: '0.2em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 12 }}>
                    {tier.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
                    <span style={{ fontSize: 32, fontWeight: 700 }}>{tier.price}</span>
                    <span style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>{tier.period}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#666', marginBottom: 16 }}>
                    Setup: {tier.setup}
                  </div>
                  <div style={{ fontSize: 11, color: '#666' }}>
                    Contract: {tier.contract}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 24, marginBottom: 24 }}>
                  {tier.features.map((feature, fidx) => (
                    <div key={fidx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 11 }}>
                      <span style={{ color: '#999' }}>{feature.label}</span>
                      <span style={{ color: feature.included ? '#C9A96E' : '#333' }}>
                        {feature.included ? '✓' : '—'}
                      </span>
                    </div>
                  ))}
                </div>

                <button style={{ width: '100%', padding: '12px', background: tier.highlight ? '#C9A96E' : '#1a1a1a', color: tier.highlight ? '#0a0a0a' : '#C9A96E', border: 'none', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>
                  GET STARTED →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '80px 24px', background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 400, marginBottom: 48, textAlign: 'center', letterSpacing: '0.05em' }}>
            Frequently Asked Questions
          </h2>

          <div>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: 24, marginBottom: 24 }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: 0,
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>
                    {faq.q}
                  </h3>
                  <span style={{ color: '#C9A96E', fontSize: 16, fontWeight: 700 }}>
                    {expandedFaq === idx ? '−' : '+'}
                  </span>
                </button>

                {expandedFaq === idx && (
                  <p style={{ marginTop: 16, fontSize: 12, color: '#999', lineHeight: 1.8 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 400, marginBottom: 24, letterSpacing: '0.05em' }}>
          Not ready to start?
        </h2>
        <p style={{ fontSize: 14, color: '#999', marginBottom: 32 }}>
          Schedule a 20-minute call to see how Club Intelligence works for your venue.
        </p>
        <button style={{ padding: '14px 32px', background: '#C9A96E', color: '#0a0a0a', border: 'none', fontSize: 11, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', marginBottom: 48 }}>
          BOOK A CALL
        </button>

        <div style={{ color: '#666', fontSize: 11, borderTop: '1px solid #1a1a1a', paddingTop: 32 }}>
          <a href="mailto:services@fcpdigital.net" style={{ color: '#999', textDecoration: 'none', marginRight: 24 }}>services@fcpdigital.net</a>
          <span>+1 313 327 3170</span>
        </div>
      </div>
    </div>
  )
}
