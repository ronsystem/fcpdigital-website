'use client'
import { useEffect, useState } from 'react'

interface Business {
  id: string
  name: string
  status: string
  phone_number?: string
  twilio_number?: string
  plan?: string
  monthly_fee?: number
  call_minutes_limit?: number
  call_minutes_used?: number
}

interface Stats {
  total_calls: number
  total_minutes: number
  avg_duration: number
}

interface Call {
  id: number
  caller_name: string
  service_needed: string
  urgency: string
  created_at: string
}

function ago(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 60) return Math.floor(s) + 's ago'
  if (s < 3600) return Math.floor(s / 60) + 'm ago'
  if (s < 86400) return Math.floor(s / 3600) + 'h ago'
  return Math.floor(s / 86400) + 'd ago'
}

export default function DashboardPage() {
  const [biz, setBiz] = useState<Business | null>(null)
  const [stats, setStats] = useState<Stats>({ total_calls: 0, total_minutes: 0, avg_duration: 0 })
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const email = typeof window !== 'undefined' ? localStorage.getItem('user_email') || '' : ''
    const p = email ? '?email=' + encodeURIComponent(email) : ''
    const p2 = email ? '?email=' + encodeURIComponent(email) + '&limit=5' : '?limit=5'

    Promise.all([fetch('/api/clients' + p), fetch('/api/calls' + p2)])
      .then(async ([cr, ar]) => {
        if (cr.ok) setBiz(await cr.json())
        if (ar.ok) {
          const d = await ar.json()
          if (d.stats) setStats(d.stats)
          if (d.calls) setCalls(d.calls)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const used = biz?.call_minutes_used || 0
  const limit = biz?.call_minutes_limit || 1500
  const pct = Math.min(Math.round((used / limit) * 100), 100)
  const num = biz?.twilio_number || biz?.phone_number || 'Configuring...'
  const plan = (biz?.plan || 'SCALE').toUpperCase()
  const fee = biz?.monthly_fee || 499

  if (loading) return <div style={{ color: '#333', textAlign: 'center', paddingTop: 60 }}>Loading...</div>

  return (
    <div style={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column' as const, gap: 28 }}>
      <div>
        <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.25em', marginBottom: 4 }}>BUSINESS</div>
        <div style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>{biz?.name || 'Your Business'}</div>
        <div style={{ color: '#666', fontSize: 11, marginTop: 4 }}>{num} · {plan} · ${fee}/mo</div>
      </div>

      <div style={{ background: 'linear-gradient(135deg,#0f0f0f,#1a0000)', border: '1px solid #2a0000', padding: 20 }}>
        <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', marginBottom: 4 }}>STATUS</div>
        <div style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
          AI RECEPTIONIST — <span style={{ color: '#4ade80' }}>ACTIVE</span>
        </div>
        <div style={{ color: '#555', fontSize: 10, marginBottom: 16 }}>Answering calls 24/7 · Responding in 2 rings</div>
        <div style={{ borderTop: '1px solid #2a0000', paddingTop: 12 }}>
          <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.15em', marginBottom: 4 }}>YOUR AI NUMBER</div>
          <div style={{ color: '#dc2626', fontSize: 20, fontWeight: 700 }}>{num}</div>
          <div style={{ color: '#333', fontSize: 9, marginTop: 2 }}>Forward your line here</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'TOTAL CALLS', val: stats.total_calls, sub: 'all time', accent: true },
          { label: 'CALL TIME', val: stats.total_minutes + 'm', sub: 'total' },
          { label: 'AVG DURATION', val: stats.avg_duration + 'm', sub: 'per call' },
          { label: 'PLAN USAGE', val: pct + '%', sub: used + '/' + limit + ' min' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', padding: 16, position: 'relative' as const }}>
            {c.accent && <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: '#dc2626' }} />}
            <div style={{ color: '#444', fontSize: 9, letterSpacing: '0.2em', marginBottom: 6 }}>{c.label}</div>
            <div style={{ color: '#fff', fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{c.val}</div>
            <div style={{ color: '#555', fontSize: 10, marginTop: 4 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#444', fontSize: 9, letterSpacing: '0.15em' }}>{plan} PLAN — ${fee}/mo</span>
          <span style={{ color: pct > 80 ? '#f87171' : '#555', fontSize: 9 }}>{pct}%</span>
        </div>
        <div style={{ background: '#1a1a1a', height: 3 }}>
          <div style={{ width: pct + '%', height: '100%', background: pct > 80 ? '#ef4444' : '#dc2626', transition: 'width 1s ease' }} />
        </div>
        <div style={{ color: '#333', fontSize: 9, marginTop: 6 }}>{limit - used} minutes remaining</div>
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '16px 20px' }}>
        <div style={{ color: '#444', fontSize: 9, letterSpacing: '0.2em', marginBottom: 12 }}>RECENT CALLS</div>
        {calls.length === 0 ? (
          <div style={{ color: '#222', fontSize: 11, textAlign: 'center', padding: '20px 0' }}>No calls yet</div>
        ) : calls.map((call, i) => (
          <div key={call.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: i < calls.length - 1 ? '1px solid #1e1e1e' : 'none', gap: 8 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#ccc', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{call.caller_name}</div>
              <div style={{ color: '#444', fontSize: 10, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis' }}>{call.service_needed}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-end', gap: 2 }}>
              <span style={{ background: call.urgency === 'high' ? 'rgba(220,38,38,0.15)' : 'rgba(34,197,94,0.1)', border: call.urgency === 'high' ? '1px solid rgba(220,38,38,0.5)' : '1px solid rgba(34,197,94,0.3)', color: call.urgency === 'high' ? '#f87171' : '#4ade80', fontSize: 8, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '2px 6px', borderRadius: 2, whiteSpace: 'nowrap' as const }}>
                {call.urgency === 'high' ? 'ESCALATED' : 'ANSWERED'}
              </span>
              <div style={{ color: '#333', fontSize: 9 }}>{ago(call.created_at)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
