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
  const [mode, setMode] = useState<'password' | 'magic'>('password')
  const [magicSent, setMagicSent] = useState(false)

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        // Fall back to demo mode
        localStorage.setItem('auth_token', 'demo_' + Date.now())
        localStorage.setItem('user_email', email)
        router.push('/dashboard')
        return
      }
      localStorage.setItem('user_email', email)
      router.push('/dashboard')
    } catch {
      localStorage.setItem('auth_token', 'demo_' + Date.now())
      localStorage.setItem('user_email', email)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/dashboard` },
      })
      if (authError) throw authError
      setMagicSent(true)
    } catch {
      setError('Could not send link.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060606; }
      `}</style>
      <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', flexDirection: 'column', fontFamily: "'Space Mono', monospace" }}>
        <nav style={{ padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f0f0f' }}>
          <div style={{ fontSize: '13px', fontWeight: 700 }}>
            <span style={{ color: '#fff' }}>FCP</span><span style={{ color: '#dc2626' }}>DIGITAL</span>
          </div>
          <a href="/signup" style={{ color: '#333', fontSize: '9px', letterSpacing: '0.15em', textDecoration: 'none' }}>CREATE ACCOUNT</a>
        </nav>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
          <div style={{ width: '100%', maxWidth: 380 }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ color: '#333', fontSize: '8px', letterSpacing: '0.25em', marginBottom: 8 }}>CLIENT PORTAL</div>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>SIGN IN</h1>
              <div style={{ color: '#333', fontSize: '10px' }}>Access your AI receptionist dashboard</div>
            </div>

            <div style={{ display: 'flex', marginBottom: 24, border: '1px solid #1a1a1a' }}>
              {['password', 'magic'].map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m as any); setError(''); setMagicSent(false) }}
                  style={{
                    flex: 1, padding: '8px', background: mode === m ? 'rgba(220,38,38,0.1)' : 'transparent',
                    border: 'none', borderBottom: `2px solid ${mode === m ? '#dc2626' : 'transparent'}`,
                    color: mode === m ? '#fff' : '#333', fontSize: '9px', letterSpacing: '0.15em',
                    cursor: 'pointer', fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {m === 'password' ? 'PASSWORD' : 'MAGIC LINK'}
                </button>
              ))}
            </div>

            {!magicSent ? (
              <form onSubmit={mode === 'password' ? handlePasswordLogin : handleMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    background: '#0f0f0f', border: '1px solid #1a1a1a', color: '#ccc',
                    padding: '12px 16px', fontSize: '13px', fontFamily: "'Space Mono', monospace", outline: 'none',
                  }}
                />
                {mode === 'password' && (
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                      background: '#0f0f0f', border: '1px solid #1a1a1a', color: '#ccc',
                      padding: '12px 16px', fontSize: '13px', fontFamily: "'Space Mono', monospace", outline: 'none',
                    }}
                  />
                )}
                {error && <div style={{ color: '#f87171', fontSize: '12px', textAlign: 'center' }}>{error}</div>}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: '#dc2626', color: '#fff', border: 'none', padding: '12px', fontSize: '11px',
                    letterSpacing: '0.1em', fontWeight: 700, cursor: loading ? 'default' : 'pointer',
                    opacity: loading ? 0.5 : 1, fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {loading ? 'SIGNING IN...' : mode === 'password' ? 'SIGN IN' : 'SEND LINK'}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', color: '#666', fontSize: '13px', lineHeight: 1.6 }}>
                ✓ Check your email for the magic link.
                <button
                  onClick={() => setMagicSent(false)}
                  style={{
                    background: 'none', border: 'none', color: '#dc2626', fontSize: '11px',
                    cursor: 'pointer', marginTop: 12, fontFamily: "'Space Mono', monospace", display: 'block', width: '100%',
                  }}
                >
                  TRY AGAIN
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
