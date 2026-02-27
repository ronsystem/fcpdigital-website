'use client'
import { useEffect, useState } from 'react'

interface Business {
  id: string
  name: string
  status: string
  owner_email?: string
  owner_phone?: string
  phone_number?: string
  twilio_number?: string
  plan?: string
  monthly_fee?: number
}

function ComingSoon() {
  return (
    <span style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#dc2626', fontSize: 8, padding: '2px 6px', borderRadius: 2, whiteSpace: 'nowrap' as const }}>
      COMING SOON
    </span>
  )
}

export default function SettingsPage() {
  const [biz, setBiz] = useState<Business | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const email = localStorage.getItem('user_email') || ''
    const p = email ? '?email=' + encodeURIComponent(email) : ''
    fetch('/api/clients' + p)
      .then(r => r.json())
      .then(d => setBiz(d))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ color: '#333', textAlign: 'center', paddingTop: 60 }}>Loading...</div>

  const sections = [
    {
      title: 'ACCOUNT INFO',
      items: [
        { label: 'BUSINESS NAME', value: biz?.name || '—' },
        { label: 'CONTACT EMAIL', value: biz?.owner_email || '—' },
        { label: 'CONTACT PHONE', value: biz?.owner_phone || '—' },
        { label: 'ACCOUNT STATUS', value: (biz?.status || 'active').toUpperCase() },
      ],
      comingSoon: false,
    },
    {
      title: 'AI PHONE NUMBER',
      items: [
        { label: 'YOUR AI NUMBER', value: biz?.twilio_number || biz?.phone_number || 'Configuring...' },
        { label: 'STATUS', value: 'ACTIVE — ANSWERING 24/7' },
        { label: 'FORWARDING', value: 'Forward your business line to your AI number' },
      ],
      comingSoon: false,
    },
    {
      title: 'PLAN & BILLING',
      items: [
        { label: 'CURRENT PLAN', value: (biz?.plan || 'SCALE').toUpperCase() },
        { label: 'MONTHLY FEE', value: '$' + (biz?.monthly_fee || 499) + '/month' },
        { label: 'MINUTES INCLUDED', value: '1,500 min / month' },
        { label: 'NEXT BILLING', value: 'Managed via Stripe' },
      ],
      comingSoon: false,
    },
    {
      title: 'AI SCRIPT',
      items: [
        { label: 'GREETING', value: 'Custom greeting for your business' },
        { label: 'ESCALATION RULES', value: 'Define what triggers urgent alerts' },
        { label: 'SERVICES LIST', value: 'What services your AI knows about' },
        { label: 'AFTER HOURS', value: 'Custom after-hours messaging' },
      ],
      comingSoon: true,
    },
    {
      title: 'NOTIFICATIONS',
      items: [
        { label: 'CALL ALERTS', value: 'SMS + Email on every call' },
        { label: 'ESCALATION ALERTS', value: 'Immediate SMS for urgent calls' },
        { label: 'WEEKLY REPORT', value: 'Summary every Monday morning' },
      ],
      comingSoon: true,
    },
  ]

  return (
    <div style={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
      <div>
        <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.25em', marginBottom: 4 }}>SETTINGS</div>
        <div style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>Account Settings</div>
      </div>

      {sections.map((section, si) => (
        <div key={si} style={{ background: '#111', border: '1px solid #1e1e1e' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#444', fontSize: 9, letterSpacing: '0.2em' }}>{section.title}</span>
            {section.comingSoon && <ComingSoon />}
          </div>
          <div style={{ padding: '4px 0' }}>
            {section.items.map((item, ii) => (
              <div key={ii} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: ii < section.items.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                <div style={{ color: '#444', fontSize: 9, letterSpacing: '0.1em', flex: 1 }}>{item.label}</div>
                <div style={{ color: section.comingSoon ? '#2a2a2a' : '#ccc', fontSize: 11, textAlign: 'right' as const }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ background: '#0a0a0a', border: '1px solid #1a1a1a', padding: '20px' }}>
        <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', marginBottom: 8 }}>SUPPORT</div>
        <div style={{ color: '#555', fontSize: 11, marginBottom: 4 }}>services@fcpdigital.net</div>
        <div style={{ color: '#555', fontSize: 11 }}>+1 313 327 3170</div>
      </div>
    </div>
  )
}
