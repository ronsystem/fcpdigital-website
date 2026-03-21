'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://ai.fcpdigital.net/reset-password',
      })
    } catch (err) {
      console.error(err)
    }
    setSent(true)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#060606', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>

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
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 24, color: '#4ade80' }}>✓</div>
              <div style={{ color: '#4ade80', fontSize: 9, letterSpacing: '0.25em', marginBottom: 12 }}>CHECK YOUR EMAIL</div>
              <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Reset link sent.</div>
              <div style={{ color: '#555', fontSize: 12, lineHeight: 1.8, marginBottom: 8 }}>If an account exists for</div>
              <div style={{ color: '#ccc', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>{email}</div>
              <div style={{ color: '#555', fontSize: 12, lineHeight: 1.8, marginBottom: 32 }}>
                you will receive a password reset link shortly. Check your spam folder if you don't see it within a few minutes.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                <a href="/login" style={{ color: '#dc2626', fontSize: 9, letterSpacing: '0.15em', textDecoration: 'none' }}>← BACK TO SIGN IN</a>
                <button
                  onClick={() => { setSent(false); setEmail('') }}
                  style={{ background: 'transparent', border: 'none', color: '#333', fontSize: 9, cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '0.1em' }}
                >
                  TRY A DIFFERENT EMAIL
                </button>
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 32 }}>
                <div style={{ color: '#333', fontSize: 8, letterSpacing: '0.25em', marginBottom: 8 }}>ACCOUNT RECOVERY</div>
                <div style={{ color: '#fff', fontSize: 24, fontWeight: 700, marginBottom: 12 }}>RESET PASSWORD</div>
                <div style={{ color: '#555', fontSize: 11, lineHeight: 1.7 }}>
                  Enter the email address on your account. We'll send you a secure link to set a new password.
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
                    autoFocus
                    style={{ width: '100%', background: '#0f0f0f', border: '1px solid #1e1e1e', color: '#ccc', padding: '12px 14px', fontSize: 12, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' as const }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ width: '100%', background: loading ? '#1a1a1a' : '#dc2626', border: 'none', color: loading ? '#444' : '#fff', padding: 14, fontSize: 10, letterSpacing: '0.2em', fontFamily: 'monospace', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700 }}
                >
                  {loading ? 'SENDING...' : 'SEND RESET LINK →'}
                </button>
              </form>

              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <a href="/login" style={{ color: '#333', fontSize: 9, letterSpacing: '0.1em', textDecoration: 'none' }}>← Back to sign in</a>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #0f0f0f', padding: '24px' }}>
        <div style={{ marginBottom: 12, textAlign: 'center' as const }}>
          <div style={{ color: '#333', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>DELONTI HENRY DBA FCP DIGITAL</div>
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/privacy" style={{ color: '#1e1e1e', fontSize: 9, textDecoration: 'none', letterSpacing: '0.1em' }}>PRIVACY POLICY</a>
          <span style={{ color: '#0a0a0a' }}>|</span>
          <a href="/terms" style={{ color: '#1e1e1e', fontSize: 9, textDecoration: 'none', letterSpacing: '0.1em' }}>TERMS & CONDITIONS</a>
          <span style={{ color: '#0a0a0a' }}>|</span>
          <a href="/sms-terms" style={{ color: '#1e1e1e', fontSize: 9, textDecoration: 'none', letterSpacing: '0.1em' }}>SMS TERMS</a>
        </div>
      </div>
    </div>
  )
}
