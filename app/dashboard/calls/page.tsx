'use client'
import { useEffect, useState } from 'react'

interface Call {
  id: number
  caller_name: string
  caller_phone: string
  service_needed: string
  urgency: string
  duration_seconds: number
  created_at: string
}

function ago(iso: string) {
  const s = (Date.now() - new Date(iso).getTime()) / 1000
  if (s < 60) return Math.floor(s) + 's ago'
  if (s < 3600) return Math.floor(s / 60) + 'm ago'
  if (s < 86400) return Math.floor(s / 3600) + 'h ago'
  return Math.floor(s / 86400) + 'd ago'
}

function duration(seconds: number) {
  if (!seconds) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m + ':' + (s < 10 ? '0' : '') + s
}

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([])
  const [stats, setStats] = useState({ total_calls: 0, total_minutes: 0, avg_duration: 0 })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const email = localStorage.getItem('user_email') || ''
    const p = email ? '?email=' + encodeURIComponent(email) + '&limit=100' : '?limit=100'
    fetch('/api/calls' + p)
      .then(r => r.json())
      .then(d => {
        if (d.calls) setCalls(d.calls)
        if (d.stats) setStats(d.stats)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = calls.filter(c =>
    !search ||
    (c.caller_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (c.caller_phone || '').includes(search) ||
    (c.service_needed || '').toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div style={{ color: '#333', textAlign: 'center', paddingTop: 60 }}>Loading...</div>

  return (
    <div style={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
      <div>
        <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.25em', marginBottom: 4 }}>CALLS</div>
        <div style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>Call History</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        {[
          { label: 'TOTAL CALLS', val: stats.total_calls },
          { label: 'TOTAL MINUTES', val: stats.total_minutes + 'm' },
          { label: 'AVG DURATION', val: stats.avg_duration + 'm' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', padding: 16 }}>
            <div style={{ color: '#444', fontSize: 8, letterSpacing: '0.2em', marginBottom: 6 }}>{c.label}</div>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>{c.val}</div>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search calls..."
          style={{ width: '100%', background: '#0f0f0f', border: '1px solid #1e1e1e', color: '#ccc', padding: '12px 14px', fontSize: 12, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' as const }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
        {filtered.length === 0 ? (
          <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: 40, textAlign: 'center' as const, color: '#222', fontSize: 11 }}>
            {calls.length === 0 ? 'No calls yet. Your AI is live and ready.' : 'No calls match your search.'}
          </div>
        ) : (
          filtered.map(call => (
            <div key={call.id} style={{ background: '#111', border: '1px solid #1e1e1e', padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{call.caller_name}</div>
                  <div style={{ color: '#555', fontSize: 10 }}>{call.caller_phone || 'No number'}</div>
                </div>
                <span style={{
                  background: call.urgency === 'high' ? 'rgba(220,38,38,0.15)' : call.urgency === 'medium' ? 'rgba(220,165,0,0.15)' : 'rgba(74,222,128,0.1)',
                  border: '1px solid ' + (call.urgency === 'high' ? 'rgba(220,38,38,0.5)' : call.urgency === 'medium' ? 'rgba(220,165,0,0.5)' : 'rgba(74,222,128,0.3)'),
                  color: call.urgency === 'high' ? '#f87171' : call.urgency === 'medium' ? '#fbbf24' : '#4ade80',
                  fontSize: 8, padding: '3px 8px', fontWeight: 700, letterSpacing: '0.1em',
                }}>
                  {call.urgency === 'high' ? 'ESCALATED' : call.urgency === 'medium' ? 'PRIORITY' : 'ANSWERED'}
                </span>
              </div>
              <div style={{ color: '#666', fontSize: 11, marginBottom: 8 }}>{call.service_needed}</div>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ color: '#333', fontSize: 9 }}>Duration: {duration(call.duration_seconds)}</span>
                <span style={{ color: '#333', fontSize: 9 }}>{ago(call.created_at)}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
