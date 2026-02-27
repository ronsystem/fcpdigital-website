'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    setTimeout(() => setLoaded(true), 80)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleSignOut = async () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_email')
    router.push('/login')
  }

  const navItems = [
    { href: '/dashboard', label: 'OVERVIEW', exactMatch: true },
    { href: '/dashboard/calls', label: 'CALLS', exactMatch: false },
    { href: '/dashboard/usage', label: 'USAGE', exactMatch: false },
    { href: '/dashboard/settings', label: 'SETTINGS', exactMatch: false },
  ]

  const isActive = (item: typeof navItems[0]) =>
    item.exactMatch ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { background: #080808 !important; margin: 0; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #1e1e1e; }
      `}</style>
      <div style={{
        minHeight: '100vh',
        background: '#080808',
        color: '#fff',
        fontFamily: "'Space Mono', monospace",
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s',
        paddingBottom: isMobile ? 56 : 0,
      }}>
        {/* Top Bar */}
        <div style={{
          borderBottom: '1px solid #111',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 48,
          position: 'sticky',
          top: 0,
          background: '#080808',
          zIndex: 200,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link href="/dashboard" style={{ textDecoration: 'none', fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em' }}>
              <span style={{ color: '#fff' }}>FCP</span><span style={{ color: '#dc2626' }}>DIGITAL</span>
            </Link>
            {!isMobile && (
              <>
                <div style={{ width: 1, height: 14, background: '#1e1e1e' }} />
                <div style={{ color: '#2a2a2a', fontSize: '9px', letterSpacing: '0.2em' }}>CLIENT PORTAL</div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', background: '#4ade80',
                boxShadow: '0 0 6px #4ade80', animation: 'pulse 2s infinite',
              }} />
              <div style={{ color: '#333', fontSize: '9px', letterSpacing: '0.12em' }}>
                {isMobile ? 'LIVE' : 'AI ACTIVE'}
              </div>
            </div>
            <button onClick={handleSignOut} style={{
              background: 'transparent', border: 'none', color: '#1e1e1e',
              fontSize: '9px', letterSpacing: '0.1em', cursor: 'pointer',
              fontFamily: "'Space Mono', monospace",
            }}>SIGN OUT</button>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div style={{
              width: 190,
              borderRight: '1px solid #111',
              padding: '28px 0',
              position: 'sticky',
              top: 48,
              height: 'calc(100vh - 48px)',
              flexShrink: 0,
              overflowY: 'auto',
            }}>
              {navItems.map(item => (
                <Link key={item.href} href={item.href} style={{
                  textDecoration: 'none', display: 'block', padding: '12px 20px',
                  color: isActive(item) ? '#dc2626' : '#555', fontSize: '11px',
                  letterSpacing: '0.1em', borderLeft: `3px solid ${isActive(item) ? '#dc2626' : 'transparent'}`,
                }}>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
          {/* Main Content */}
          <div style={{ flex: 1, padding: isMobile ? '20px' : '40px 36px', overflowY: 'auto', maxHeight: isMobile ? 'auto' : 'calc(100vh - 48px)' }}>
            {children}
          </div>
        </div>
        {/* Mobile Bottom Nav */}
        {isMobile && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: 56,
            background: '#080808',
            borderTop: '1px solid #111',
            display: 'flex',
            justifyContent: 'space-around',
            zIndex: 100,
          }}>
            {navItems.map(item => (
              <Link key={item.href} href={item.href} style={{
                textDecoration: 'none', display: 'flex', alignItems: 'center',
                justifyContent: 'center', width: '25%', color: isActive(item) ? '#dc2626' : '#555',
                fontSize: '9px', borderTop: `2px solid ${isActive(item) ? '#dc2626' : 'transparent'}`,
              }}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
