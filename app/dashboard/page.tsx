'use client'
import { useEffect, useState } from 'react'

interface BusinessData {
  id: string
  name: string
  status: string
  owner_email?: string
  phone_number?: string
  twilio_number?: string
  plan?: string
  monthly_fee?: number
  call_minutes_limit?: number
  call_minutes_used?: number
}

interface CallStats {
  total_calls: number
  total_minutes: number
  avg_duration: number
}

interface RecentCall {
  id: number
  caller_name: string
  service_needed: string
  urgency: string
  created_at: string
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function UrgencyBadge({ level }: { level: string }) {
  const styles: Record<string, { bg: string; border: string; color: string; label: string }> = {
    high: { bg: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.5)', color: '#f87171', label: 'ESCALATED' },
    medium: { bg: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.4)', color: '#fbbf24', label: 'PRIORITY' },
    low: { bg: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', label: 'ANSWERED' },
  }
  const s = styles[level] || styles.low
  return (
    <span style={{
      background: s.bg, border: s.border, color: s.color,
      fontSize: '9px', fontFamily: "'Space Mono', monospace",
      letterSpacing: '0.15em', padding: '2px 8px',
      borderRadius: '2px', fontWeight: 700, whiteSpace: 'nowrap',
    }}>{s.label}</span>
  )
}

export default function DashboardPage() {
  const [business, setBusiness] = useState<BusinessData | null>(null)
  const [stats, setStats] = useState<CallStats>({ total_calls: 0, total_minutes: 0, avg_duration: 0 })
  const [recentCalls, setRecentCalls] = useState<RecentCall[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('user_email')
        const params = email ? `?email=${encodeURIComponent(email)}` : ''
        
        const [clientRes, callsRes] = await Promise.all([
          fetch(`/api/clients${params}`),
          fetch(`/api/calls${params}&limit=5`),
        ])

        if (clientRes.ok) {
          const data = await clientRes.json()
          setBusiness(data)
        }
        if (callsRes.ok) {
          const data = await callsRes.json()
          setStats(data.stats)
          setRecentCalls(data.calls || [])
        }
      } catch (err) {
        console.error('Dashboard error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const minutesUsed = business?.call_minutes_used ?? 0
  const minutesLimit = business?.call_minutes_limit ?? 1500
  const pct = Math.round((minutesUsed / minutesLimit) * 100)
  const plan = business?.plan ?? 'scale'
  const monthlyFee = business?.monthly_fee ?? 499
  const aiNumber = business?.twilio_number || business?.phone_number || 'Configuring...'

  if (loading) {
    return <div style={{ color: '#444', textAlign: 'center', paddingTop: 40 }}>Loading...</div>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: 12, letterSpacing: '-0.01em' }}>
          {business?.name || 'Dashboard'}
        </h2>
        <div style={{ color: '#666', fontSize: '13px' }}>
          {aiNumber} · {plan.toUpperCase()} plan · ${monthlyFee}/mo
        </div>
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: 20 }}>
        <div style={{ color: '#444', fontSize: '9px', letterSpacing: '0.2em', marginBottom: 12 }}>AI RECEPTIONIST</div>
        <div style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
          <span style={{ color: '#4ade80' }}>● ACTIVE</span>
        </div>
        <div style={{ color: '#666', fontSize: '11px' }}>
          Answering calls 24/7 · Responding in 2 rings
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '16px 20px', borderLeft: '3px solid #dc2626' }}>
          <div style={{ color: '#444', fontSize: '9px', letterSpacing: '0.2em', marginBottom: 6 }}>TOTAL CALLS</div>
          <div style={{ color: '#fff', fontSize: '26px', fontWeight: 700 }}>{stats.total_calls}</div>
        </div>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '16px 20px' }}>
          <div style={{ color: '#444', fontSize: '9px', letterSpacing: '0.2em', marginBottom: 6 }}>CALL TIME</div>
          <div style={{ color: '#fff', fontSize: '26px', fontWeight: 700 }}>{stats.total_minutes}m</div>
        </div>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '16px 20px' }}>
          <div style={{ color: '#444', fontSize: '9px', letterSpacing: '0.2em', marginBottom: 6 }}>AVG DURATION</div>
          <div style={{ color: '#fff', fontSize: '26px', fontWeight: 700 }}>{stats.avg_duration}m</div>
        </div>
        <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '16px 20px' }}>
          <div style={{ color: '#444', fontSize: '9px', letterSpacing: '0.2em', marginBottom: 6 }}>PLAN USAGE</div>
          <div style={{ color: '#fff', fontSize: '26px', fontWeight: 700 }}>{pct}%</div>
        </div>
      </div>

      <div style={{ background: '#111', border: '1px solid #1e1e1e', padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#444', fontSize: '9px', letterSpacing: '0.15em' }}>MONTHLY MINUTES</span>
          <span style={{ color: '#666', fontSize: '9px' }}>{minutesUsed} / {minutesLimit}</span>
        </div>
        <div style={{ width: '100%', height: 6, background: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{
            width: `${Math.min(pct, 100)}%`,
            height: '100%',
            background: pct > 80 ? '#dc2626' : '#4ade80',
          }} />
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: 12, letterSpacing: '-0.01em' }}>RECENT CALLS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {recentCalls.length === 0 ? (
            <div style={{ color: '#555', fontSize: '12px', textAlign: 'center', padding: '24px' }}>No calls yet</div>
          ) : (
            recentCalls.map(call => (
              <div key={call.id} style={{
                background: '#111', border: '1px solid #1e1e1e', padding: '12px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontSize: '12px', fontWeight: 500, marginBottom: 2 }}>{call.caller_name}</div>
                  <div style={{ color: '#666', fontSize: '11px' }}>{call.service_needed}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ color: '#666', fontSize: '10px' }}>{timeAgo(call.created_at)}</div>
                  <UrgencyBadge level={call.urgency} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
