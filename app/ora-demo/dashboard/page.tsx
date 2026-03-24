'use client'
import { useState } from 'react'

export default function OraDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [chatOpen, setChatOpen] = useState(false)

  const navItems = [
    { label: 'OVERVIEW', id: 'overview' },
    { label: 'GUEST LIST', id: 'guest-list' },
    { label: 'CAMPAIGNS', id: 'campaigns' },
    { label: 'REPORTS', id: 'reports' },
    { label: 'SPEND INTEL', id: 'spend-intel' },
  ]

  const topSpenders = [
    { rank: 1, name: 'Marcus T.', spend: '$650', last: '6 days ago', status: '🟢' },
    { rank: 2, name: 'Jasmine R.', spend: '$520', last: '12 days ago', status: '🟢' },
    { rank: 3, name: 'DeShawn M.', spend: '$490', last: '3 days ago', status: '🟢' },
    { rank: 4, name: 'Brittany K.', spend: '$445', last: '18 days ago', status: '🟢' },
    { rank: 5, name: 'Antoine W.', spend: '$410', last: '8 days ago', status: '🟢' },
    { rank: 6, name: 'Simone L.', spend: '$395', last: '22 days ago', status: '🟡' },
    { rank: 7, name: 'Chris B.', spend: '$370', last: '5 days ago', status: '🟢' },
    { rank: 8, name: 'Naomi F.', spend: '$340', last: '31 days ago', status: '🟡' },
    { rank: 9, name: 'Jordan P.', spend: '$310', last: '28 days ago', status: '🟡' },
    { rank: 10, name: 'Alexis H.', spend: '$285', last: '45 days ago', status: '🔴' },
  ]

  const topNights = [
    { name: 'FRIDAY', value: 312, width: '100%' },
    { name: 'SATURDAY', value: 287, width: '92%' },
    { name: 'THURSDAY', value: 198, width: '63%' },
    { name: 'SUNDAY BRUNCH', value: 143, width: '46%' },
    { name: 'SAT BRUNCH', value: 121, width: '39%' },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Georgia, serif' }}>

      {/* Sidebar */}
      <div style={{ width: 200, background: '#0d0d0d', borderRight: '1px solid #1a1a1a', padding: '24px 16px', position: 'fixed', height: '100vh', overflow: 'auto' }}>
        <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.3em', fontFamily: 'monospace', marginBottom: 4 }}>ORA DETROIT</div>
        <div style={{ color: '#444', fontSize: 7, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 24 }}>GUEST INTELLIGENCE PLATFORM</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: '12px 8px',
                background: activeTab === item.id ? '#1a1a1a' : 'transparent',
                color: activeTab === item.id ? '#C9A96E' : '#666',
                border: 'none',
                fontSize: 8,
                letterSpacing: '0.2em',
                fontFamily: 'monospace',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 8, color: '#222', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
          POWERED BY FCP DIGITAL
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: 200, flex: 1, padding: '32px', overflow: 'auto' }}>

        {activeTab === 'overview' && (
          <>
            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'TOTAL GUESTS', value: '847', sub: '+23 this week' },
                { label: 'REPEAT RATE', value: '31%', sub: 'vs 18% avg ↑' },
                { label: 'LAST CAMPAIGN', value: '64% OPEN', sub: 'Est. 47 in' },
                { label: 'COLD GUESTS', value: '180', sub: 'Re-engage now' },
              ].map((card, idx) => (
                <div key={idx} style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
                  <div style={{ color: '#555', fontSize: 8, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 12 }}>
                    {card.label}
                  </div>
                  <div style={{ color: '#fff', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
                    {card.value}
                  </div>
                  <div style={{ color: '#666', fontSize: 11 }}>
                    {card.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Two Column Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

              {/* Top Nights Chart */}
              <div>
                <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 16 }}>
                  TOP NIGHTS THIS MONTH
                </div>
                <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
                  {topNights.map((night, idx) => (
                    <div key={idx} style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                          {night.name}
                        </div>
                        <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace' }}>
                          {night.value}
                        </div>
                      </div>
                      <div style={{ background: '#1a1a1a', height: 6, borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ background: '#C9A96E', height: '100%', width: night.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Results */}
              <div>
                <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 16 }}>
                  LAST CAMPAIGN RESULTS
                </div>
                <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
                  <div style={{ color: '#fff', fontSize: 11, letterSpacing: '0.1em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 16 }}>
                    FRIDAY NIGHT DROP
                  </div>
                  <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: 16, marginBottom: 16 }} />

                  {[
                    { label: 'Sent', value: '412' },
                    { label: 'Opened', value: '64%', highlight: true },
                    { label: 'Est. came in', value: '47' },
                    { label: 'Est. revenue', value: '$3,760' },
                  ].map((stat, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace' }}>
                        {stat.label}
                      </div>
                      <div style={{ color: stat.highlight ? '#C9A96E' : '#fff', fontSize: 10, fontFamily: 'monospace', fontWeight: 700 }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}

                  <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16, marginTop: 16 }} />
                  <button style={{ width: '100%', padding: '12px', background: '#1a1a1a', color: '#C9A96E', border: 'none', fontSize: 9, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', marginTop: 16 }}>
                    RE-SEND TO NON-OPENERS →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'spend-intel' && (
          <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
            <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 24 }}>
              TOP 10 SPENDERS
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>RANK</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>NAME</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>AVG SPEND</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>LAST VISIT</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'center' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {topSpenders.map((spender, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', padding: '16px 0' }}>{spender.rank}</td>
                    <td style={{ color: '#fff', fontSize: 10, fontFamily: 'Georgia, serif', padding: '16px 0' }}>{spender.name}</td>
                    <td style={{ color: '#fff', fontSize: 10, fontFamily: 'monospace', padding: '16px 0' }}>{spender.spend}</td>
                    <td style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', padding: '16px 0' }}>{spender.last}</td>
                    <td style={{ color: '#fff', fontSize: 12, padding: '16px 0', textAlign: 'center' }}>{spender.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reports' && (
          <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
            <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 12 }}>
              ORA DETROIT — WEEKLY PULSE
            </div>
            <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', marginBottom: 24 }}>
              Week of March 17, 2026
            </div>
            <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: 20, marginBottom: 20 }} />

            {[
              {
                title: 'LIST GROWTH',
                content: 'Total: 847  |  New this week: 23  |  +2.8%'
              },
              {
                title: 'TOP SPENDER THIS WEEK',
                content: 'Marcus T. — $650 avg, visited twice'
              },
              {
                title: 'CAMPAIGN HIGHLIGHT',
                content: 'Friday Night Drop: 64% open rate\nEst. 47 guests | Est. $3,760 revenue'
              },
              {
                title: 'RE-ENGAGEMENT ALERT',
                content: '180 guests inactive 30+ days.\nRecommend: send re-engagement before Friday.'
              },
              {
                title: 'OPPORTUNITY',
                content: '2 private event inquiries — no follow-up sent.\nAutomate: send within 24 hours of inquiry.'
              },
            ].map((section, idx) => (
              <div key={idx} style={{ marginBottom: 20 }}>
                <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 8 }}>
                  {section.title}
                </div>
                <div style={{ color: '#999', fontSize: 10, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {section.content}
                </div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 20, marginTop: 20 }} />
            <button style={{ padding: '12px 16px', background: '#1a1a1a', color: '#C9A96E', border: 'none', fontSize: 9, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', marginTop: 16 }}>
              DOWNLOAD PDF
            </button>
          </div>
        )}

      </div>

      {/* Chat Widget */}
      <div style={{ position: 'fixed', bottom: 24, right: 24 }}>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#C9A96E',
            color: '#0a0a0a',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          ✦
        </button>

        {chatOpen && (
          <div style={{ position: 'absolute', bottom: 72, right: 0, width: 320, background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, maxHeight: 400, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 16, borderBottom: '1px solid #1a1a1a', background: '#0a0a0a' }}>
              <div style={{ color: '#fff', fontSize: 11, fontFamily: 'monospace', fontWeight: 700 }}>Demo Chat</div>
            </div>

            <div style={{ padding: 16, flex: 1 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#C9A96E', fontSize: 10, fontFamily: 'monospace', marginBottom: 8 }}>You:</div>
                <div style={{ color: '#ccc', fontSize: 10, lineHeight: 1.6 }}>Who are my top 10 spenders this month?</div>
              </div>

              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16 }}>
                <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', marginBottom: 8 }}>Agent:</div>
                <div style={{ color: '#ccc', fontSize: 9, lineHeight: 1.6 }}>
                  Here are your top 10 spenders for March:<br/>
                  1. Marcus T. — $650 avg/visit<br/>
                  2. Jasmine R. — $520 avg/visit<br/>
                  ...<br/>
                  <br/>
                  ⚠️ Alexis H. hasn't visited in 45 days — recommend a personal re-engagement message today.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
