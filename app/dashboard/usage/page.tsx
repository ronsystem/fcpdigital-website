'use client'
import { useEffect, useState } from 'react'

interface Stats {
  total_calls: number
  total_minutes: number
  avg_duration: number
}

interface WeekData {
  label: string
  calls: number
  minutes: number
}

export default function UsagePage() {
  const [stats, setStats] = useState<Stats>({ total_calls: 0, total_minutes: 0, avg_duration: 0 })
  const [minutesLimit] = useState(1500)
  const [loading, setLoading] = useState(true)
  const [weeks] = useState<WeekData[]>([
    { label: 'W1', calls: 0, minutes: 0 },
    { label: 'W2', calls: 0, minutes: 0 },
    { label: 'W3', calls: 0, minutes: 0 },
    { label: 'W4', calls: 0, minutes: 0 },
  ])

  useEffect(() => {
    const email = localStorage.getItem('user_email') || ''
    const p = email ? '?email=' + encodeURIComponent(email) : ''
    fetch('/api/calls' + p)
      .then(r => r.json())
      .then(d => { if (d.stats) setStats(d.stats) })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const pct = Math.min(Math.round((stats.total_minutes / minutesLimit) * 100), 100)
  const remaining = minutesLimit - stats.total_minutes
  const maxCalls = Math.max(...weeks.map(w => w.calls), 1)

  if (loading) return <div style={{ color: '#333', textAlign: 'center', paddingTop: 60 }}>Loading...</div>

  return (
    <div style={{ fontFamily: 'monospace', display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
      <div>
        <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.25em', marginBottom: 4 }}>USAGE</div>
        <div style={{ color: '#fff', fontSize: 17, fontWeight: 700 }}>Analytics</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'TOTAL CALLS', val: stats.total_calls, sub: 'all time' },
          { label: 'MINUTES USED', val: stats.total_minutes + 'm', sub: 'this cycle' },
          { label: 'AVG DURATION', val: stats.avg_duration + 'm', sub: 'per call' },
          { label: 'REMAINING', val: remaining + 'm', sub: 'of ' + minutesLimit + 'm limit' },
        ].map((c, i) => (
          <div key={i} style={{ background: '#111', border: '1px solid #1e1e1e', padding: 16, position: 'relative' as const }}>
            {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: '#dc2626' }} />}
            <div style={{ color: '#444', fontSize: 9, letterSpacing: '0.2em', marginBottom: 6 }}>{c.label}</div>
            <div style={{ color: '#fff', fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{c.val}</div>
            <div style={{ color: '#555', fontSize: 10, marginTop: 4 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ color: '#444', fontSize: 9, letterSpacing: '0.15em' }}>MONTHLY MINUTES</span>
          <span style={{ color: pct > 80 ? '#f87171' : '#555', fontSize: 9 }}>{pct + '%'}</span>
        </div>
        <div style={{ background: '#1a1a1a', height: 6, borderRadius: 2 }}>
          <div style={{ width: pct + '%', height: '100%', background: pct > 80 ? '#ef4444' : '#dc2626', transition: 'width 0.3s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ color: '#333', fontSize: 9 }}>{stats.total_minutes + ' used'}</span>
          <span style={{ color: '#333', fontSize: 9 }}>{minutesLimit + ' limit'}</span>
        </div>
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '20px' }}>
        <div style={{ color: '#444', fontSize: 9, letterSpacing: '0.2em', marginBottom: 12 }}>WEEKLY CALLS</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', height: 80 }}>
          {weeks.map((w, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center' }}>
              <div style={{ color: '#555', fontSize: 9 }}>{w.calls}</div>
              <div style={{ width: '100%', background: '#1a1a1a', borderRadius: 2, overflow: 'hidden', marginTop: 6 }}>
                <div style={{
                  width: '100%',
                  height: Math.max((w.calls / maxCalls) * 48, w.calls > 0 ? 4 : 0) + 'px',
                  background: '#dc2626',
                  marginTop: (48 - Math.max((w.calls / maxCalls) * 48, w.calls > 0 ? 4 : 0)) + 'px',
                }} />
              </div>
              <div style={{ color: '#333', fontSize: 8, marginTop: 6 }}>{w.label}</div>
            </div>
          ))}
        </div>
        {stats.total_calls === 0 && (
          <div style={{ color: '#222', fontSize: 10, textAlign: 'center' as const, marginTop: 12 }}>Your calls will appear here</div>
        )}
      </div>

      <div style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)', padding: '20px' }}>
        <div style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.15em', marginBottom: 6 }}>NEED MORE MINUTES?</div>
        <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Upgrade &gt; 1,500</div>
        <div style={{ color: '#555', fontSize: 10 }}>Need more minutes? Contact us to upgrade your plan.</div>
      </div>
    </div>
  )
}
