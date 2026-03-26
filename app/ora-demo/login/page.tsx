'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DemoLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    // Demo credentials — universal across all pitches
    if (username === 'demo@fcpdigital.net' && password === 'ClubIntel2026') {
      // Set session cookie
      document.cookie = 'demo_auth=authenticated; path=/ora-demo; max-age=86400'
      router.push('/ora-demo/dashboard')
    } else {
      setError('Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
      <div style={{ width: 360, padding: '48px 32px', background: '#111', border: '1px solid #1a1a1a' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ color: '#C9A96E', fontSize: 9, letterSpacing: '0.4em', marginBottom: 12 }}>FCP DIGITAL</div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Club Intelligence</div>
          <div style={{ color: '#555', fontSize: 11 }}>Sign in to your dashboard</div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', marginBottom: 6 }}>EMAIL</div>
          <input
            type="email"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="demo@fcpdigital.net"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', background: '#0a0a0a', border: '1px solid #1a1a1a', color: '#ccc', padding: '12px 14px', fontSize: 12, outline: 'none', boxSizing: 'border-box' as const }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', marginBottom: 6 }}>PASSWORD</div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••••••"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={{ width: '100%', background: '#0a0a0a', border: '1px solid #1a1a1a', color: '#ccc', padding: '12px 14px', fontSize: 12, outline: 'none', boxSizing: 'border-box' as const }}
          />
        </div>

        {error && (
          <div style={{ color: '#ef4444', fontSize: 11, marginBottom: 16, textAlign: 'center' }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%', padding: '13px',
            background: '#C9A96E', color: '#0a0a0a',
            border: 'none', fontSize: 10,
            letterSpacing: '0.25em', fontFamily: 'monospace',
            fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'SIGNING IN...' : 'SIGN IN →'}
        </button>

        <div style={{ marginTop: 24, color: '#2a2a2a', fontSize: 9, textAlign: 'center', letterSpacing: '0.1em' }}>
          POWERED BY FCP DIGITAL
        </div>
      </div>
    </div>
  )
}
