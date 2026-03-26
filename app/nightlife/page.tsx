'use client'

export default function NightlifePricing() {
  return (
    <div style={{ background: '#0a0a0a', color: '#fff', fontFamily: 'Georgia, serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link { color: #999; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #C9A96E; }
      `}} />

      {/* Navigation */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
        <a href="/" style={{ fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace' }} className="nav-link">FCP DIGITAL</a>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="/ora-demo" style={{ fontSize: 9, letterSpacing: '0.15em', fontFamily: 'monospace' }} className="nav-link">ORA DEMO</a>
          <a href="/ora-demo/dashboard" style={{ fontSize: 9, letterSpacing: '0.15em', fontFamily: 'monospace' }} className="nav-link">DASHBOARD</a>
          <a href="/clubs" style={{ fontSize: 9, letterSpacing: '0.15em', fontFamily: 'monospace' }} className="nav-link">CLUB INTEL</a>
        </div>
      </div>

      {/* Header */}
      <div style={{ padding: '32px 24px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 16 }}>FCP DIGITAL</div>
          <h1 style={{ fontSize: 42, fontWeight: 400, marginBottom: 12, letterSpacing: '0.02em' }}>Club Intelligence Platform</h1>
          <p style={{ fontSize: 14, color: '#999', lineHeight: 1.8 }}>Complete guest management system for nightlife venues. Capture, analyze, and automate guest engagement.</p>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 400, marginBottom: 64, textAlign: 'center', letterSpacing: '0.05em' }}>Service Tiers</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {/* PULSE */}
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: 32, borderRadius: 4 }}>
              <div style={{ fontSize: 14, letterSpacing: '0.2em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 24 }}>PULSE</div>
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 42, fontWeight: 700 }}>$497</span>
                <span style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>/month</span>
              </div>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 32 }}>Setup: $500 | Contract: 3 months</div>

              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 24, marginBottom: 24 }}>
                <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 16, fontWeight: 700 }}>INCLUDES:</div>
                {[
                  'Guest list capture via opt-in page',
                  'QR code & table displays',
                  'Weekly pulse reports',
                  'Guest frequency tracking',
                  'Cold guest flagging (30+ days)',
                  'Basic SMS campaigns (2/mo)',
                  'Instagram read-only monitoring',
                  'FCP Digital branding visible'
                ].map((feature, idx) => (
                  <div key={idx} style={{ fontSize: 11, color: '#ccc', marginBottom: 12, lineHeight: 1.6 }}>
                    ✓ {feature}
                  </div>
                ))}
              </div>

              <button style={{ width: '100%', padding: '12px', background: '#1a1a1a', color: '#C9A96E', border: 'none', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>
                GET STARTED →
              </button>
            </div>

            {/* INTELLIGENCE */}
            <div style={{ background: '#111', border: '1px solid #C9A96E', padding: 32, borderRadius: 4, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '8px 16px', background: '#C9A96E', color: '#0a0a0a', fontSize: 8, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, textAlign: 'center' }}>
                MOST POPULAR
              </div>
              <div style={{ marginTop: 24, fontSize: 14, letterSpacing: '0.2em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 24 }}>INTELLIGENCE</div>
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 42, fontWeight: 700 }}>$1,750</span>
                <span style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>/month</span>
              </div>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 32 }}>Setup: $1,000 | Contract: 6 months</div>

              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 24, marginBottom: 24 }}>
                <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 16, fontWeight: 700 }}>EVERYTHING IN PULSE, PLUS:</div>
                {[
                  'AI Receptionist (Vapi) - 24/7 calls',
                  'POS integration & spend tracking',
                  'Spend intelligence & VIP auto-tagging',
                  'Re-engagement automation',
                  'Guest segmentation (6 segments)',
                  'Campaign automation (event-triggered)',
                  'Basic AI dashboard chat',
                  'Vapi recovery calls (1-3 ratings)',
                  'Fully white-labeled dashboard',
                  'Monthly intelligence reports'
                ].map((feature, idx) => (
                  <div key={idx} style={{ fontSize: 11, color: '#ccc', marginBottom: 12, lineHeight: 1.6 }}>
                    ✓ {feature}
                  </div>
                ))}
              </div>

              <button style={{ width: '100%', padding: '12px', background: '#C9A96E', color: '#0a0a0a', border: 'none', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>
                GET STARTED →
              </button>
            </div>

            {/* COMMAND CENTER */}
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: 32, borderRadius: 4 }}>
              <div style={{ fontSize: 14, letterSpacing: '0.2em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 24 }}>COMMAND CENTER</div>
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: 42, fontWeight: 700 }}>$4,500</span>
                <span style={{ fontSize: 12, color: '#666', marginLeft: 4 }}>/month</span>
              </div>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 32 }}>Setup: $2,500 | Contract: 12 months</div>

              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 24, marginBottom: 24 }}>
                <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 16, fontWeight: 700 }}>EVERYTHING IN INTELLIGENCE, PLUS:</div>
                {[
                  'Custom AI voice identity',
                  'Advanced AI dashboard chat',
                  'Advanced guest segmentation',
                  'Multi-revenue stream campaigns',
                  'Fully custom automation flows',
                  'Weekly intelligence reports',
                  'Priority build requests',
                  'Dedicated success manager',
                  'First access to new features'
                ].map((feature, idx) => (
                  <div key={idx} style={{ fontSize: 11, color: '#ccc', marginBottom: 12, lineHeight: 1.6 }}>
                    ✓ {feature}
                  </div>
                ))}
              </div>

              <button style={{ width: '100%', padding: '12px', background: '#1a1a1a', color: '#C9A96E', border: 'none', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}>
                GET STARTED →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '80px 24px', background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 400, marginBottom: 48, textAlign: 'center', letterSpacing: '0.05em' }}>Frequently Asked Questions</h2>

          {[
            {
              q: 'What if I don\'t have a guest list yet?',
              a: 'That\'s the whole point — we build it. We set up opt-in pages, QR codes, and integrations with your existing systems. The list starts growing from day one.'
            },
            {
              q: 'How does POS integration work?',
              a: 'We integrate with Toast, Square, Clover, Lightspeed, or SpotOn. We pull transaction data to track spend per guest, identify VIPs, and trigger automated campaigns based on purchase behavior.'
            },
            {
              q: 'Can I customize the SMS messages?',
              a: 'Yes. Every template is customizable. We provide smart defaults based on tone preference (refined, conversational, or hype), and you can modify any campaign before it sends.'
            },
            {
              q: 'What about compliance and legal?',
              a: 'Full TCPA compliance. Every opt-in is timestamped, IP logged, and consent-recorded. Unsubscribe requests are processed immediately. We handle the legal heavy lifting.'
            },
            {
              q: 'Is the dashboard white-labeled?',
              a: 'Tier 1 shows "Powered by FCP Digital." Tier 2+ is fully white-labeled — zero FCP branding. Clients can even use their own custom domain.'
            },
          ].map((item, idx) => (
            <div key={idx} style={{ marginBottom: 32, borderBottom: '1px solid #1a1a1a', paddingBottom: 32 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{item.q}</h3>
              <p style={{ fontSize: 12, color: '#999', lineHeight: 1.8 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 28, fontWeight: 400, marginBottom: 24, letterSpacing: '0.05em' }}>Ready to Transform Your Venue?</h2>
        <p style={{ fontSize: 14, color: '#999', marginBottom: 32, lineHeight: 1.8 }}>
          Schedule a 20-minute demo to see Club Intelligence in action. We'll show you exactly how your guest data turns into revenue.
        </p>
        <a href="https://calendly.com/fcpdigital/demo" style={{ padding: '14px 32px', background: '#C9A96E', color: '#0a0a0a', border: 'none', fontSize: 11, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}>
          BOOK A DEMO →
        </a>

        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid #1a1a1a', color: '#666', fontSize: 11 }}>
          <p>FCP Digital | services@fcpdigital.net | +1 313 327 3170</p>
          <p style={{ marginTop: 8, fontSize: 9 }}>© 2026 FCP Digital. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
