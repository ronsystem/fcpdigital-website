'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://ai.fcpdigital.net/reset-password',
      })
      if (authError) throw authError
      setSent(true)
    } catch (err) {
      console.error(err)
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', flexDirection: 'column' as const, fontFamily: 'monospace' }}>
      <nav style={{ padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #0f0f0f' }}>
        <a href="/" style={{ textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
          <span style={{ color: '#fff' }}>FCP</span>
          <span style={{ color: '#dc2626' }}>DIGITAL</span>
        </a>
        <a href="/login" style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>SIGN IN</a>
      </nav>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 380 }}>
          {sent ? (
            <div style={{ textAlign: 'center' as const }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(74,222,128,0.15)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: '#4ade80', fontSize: 22 }}>✓</div>
              </div>
              <div style={{ color: '#4ade80', fontSize: 9, letterSpacing: '0.25em', marginBottom: 8 }}>CHECK YOUR EMAIL</div>
              <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Reset link sent</div>
              <div style={{ color: '#555', fontSize: 11, lineHeight: 1.7, marginBottom: 24 }}>
                If an account exists for {email}, you'll receive a password reset link shortly.
              </div>
              <a href="/login" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>← Back to sign in</a>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 32 }}>
                <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.25em', marginBottom: 8 }}>ACCOUNT RECOVERY</div>
                <div style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Reset Your Password</div>
                <div style={{ color: '#333', fontSize: 10, lineHeight: 1.6 }}>
                  Enter your email and we'll send you a reset link.
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.15em', marginBottom: 6 }}>EMAIL ADDRESS</div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="owner@yourbusiness.com"
                    required
                    style={{ width: '100%', background: '#0f0f0f', border: '1px solid #1e1e1e', color: '#ccc', padding: '12px 14px', fontSize: 12, fontFamily: 'monospace', outline: 'none' }}
                  />
                </div>
                {error && (
                  <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171', padding: '10px 14px', fontSize: 10, marginBottom: 16 }}>
                    {error}
                  </div>
                )}
                <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#1a1a1a' : '#dc2626', border: '1px solid #dc2626', color: loading ? '#444' : '#fff', padding: '14px', fontSize: 10, letterSpacing: '0.2em', fontFamily: 'monospace', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, transition: 'all 0.2s' }}>
                  {loading ? 'SENDING...' : 'SEND RESET LINK →'}
                </button>
              </form>
              <div style={{ marginTop: 24, color: '#222', fontSize: 9, textAlign: 'center' as const }}>
                <a href="/login" style={{ color: '#333', textDecoration: 'none' }}>← Back to sign in</a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
