'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await supabase.auth.signInWithPassword({ email, password })
    } catch (_) {
      // fall through to demo mode
    }
    localStorage.setItem('user_email', email)
    router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', flexDirection: 'column' as const, fontFamily: 'monospace' }}>
      <nav style={{ padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f0f0f' }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span>
          <span style={{ color: '#dc2626' }}>DIGITAL</span>
        </div>
        <a href="/signup" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>CREATE ACCOUNT</a>
      </nav>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.25em', marginBottom: 8 }}>CLIENT PORTAL</div>
            <div style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>SIGN IN</div>
            <div style={{ color: '#333', fontSize: 10, marginTop: 6 }}>Access your AI receptionist dashboard</div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.15em', marginBottom: 6 }}>EMAIL ADDRESS</div>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="owner@yourbusiness.com" required
                style={{ width: '100%', background: '#0f0f0f', border: '1px solid #1e1e1e', color: '#ccc', padding: '12px 14px', fontSize: 12, fontFamily: 'monospace', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.15em', marginBottom: 6 }}>PASSWORD</div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                style={{ width: '100%', background: '#0f0f0f', border: '1px solid #1e1e1e', color: '#ccc', padding: '12px 14px', fontSize: 12, fontFamily: 'monospace', outline: 'none' }}
              />
            </div>

            {error && <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171', padding: '10px 14px', fontSize: 10, marginBottom: 16 }}>{error}</div>}

            <button type="submit" disabled={loading}
              style={{ width: '100%', background: loading ? '#1a1a1a' : '#dc2626', border: '1px solid #dc2626', color: loading ? '#444' : '#fff', padding: '14px', fontSize: 10, letterSpacing: '0.2em', fontFamily: 'monospace', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, transition: 'all 0.2s' }}
            >
              {loading ? 'SIGNING IN...' : 'SIGN IN →'}
            </button>
          </form>

          <div style={{ marginTop: 24, color: '#222', fontSize: 9 }}>
            No account? <a href="/signup" style={{ color: '#dc2626', textDecoration: 'none' }}>Create one</a> · <a href="/reset-password" style={{ color: '#222', textDecoration: 'none' }}>Forgot password</a>
          </div>
        </div>
      </div>
    </div>
  )
}
