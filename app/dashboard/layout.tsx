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
    setLoaded(true)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('user_email')
    router.push('/login')
  }

  const nav = [
    { href: '/dashboard', label: 'OVERVIEW', exact: true },
    { href: '/dashboard/calls', label: 'CALLS', exact: false },
    { href: '/dashboard/usage', label: 'USAGE', exact: false },
    { href: '/dashboard/settings', label: 'SETTINGS', exact: false },
  ]

  const isActive = (item: typeof nav[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href)

  const S = {
    wrap: { minHeight: '100vh' as const, background: '#080808', color: '#fff', fontFamily: 'monospace', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' as const, paddingBottom: isMobile ? 56 : 0 },
    topbar: { borderBottom: '1px solid #111', padding: '0 20px', display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'space-between' as const, height: 48, position: 'sticky' as const, top: 0, background: '#080808', zIndex: 200 },
    logo: { textDecoration: 'none' as const, fontSize: 13, fontWeight: 700, fontFamily: 'monospace' },
    sidebar: { width: 190, borderRight: '1px solid #111', padding: '28px 0', position: 'sticky' as const, top: 48, height: 'calc(100vh - 48px)', flexShrink: 0, overflowY: 'auto' as const },
    main: { flex: 1, padding: isMobile ? '20px 16px' : '28px 28px', minWidth: 0, overflowY: 'auto' as const, maxHeight: isMobile ? 'auto' : 'calc(100vh - 48px)' },
    bottomnav: { position: 'fixed' as const, bottom: 0, left: 0, right: 0, height: 56, background: '#080808', borderTop: '1px solid #111', display: 'flex', justifyContent: 'space-around', zIndex: 100 },
  }

  return (
    <div style={S.wrap}>
      <div style={S.topbar}>
        <Link href="/dashboard" style={S.logo}>
          <span style={{ color: '#fff' }}>FCP</span>
          <span style={{ color: '#dc2626' }}>DIGITAL</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ color: '#333', fontSize: 9, letterSpacing: '0.12em' }}>AI ACTIVE</span>
          </div>
          <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', color: '#1e1e1e', fontSize: 9, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'monospace' }}>
            SIGN OUT
          </button>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {!isMobile && (
          <div style={S.sidebar}>
            <div style={{ padding: '0 20px', marginBottom: 28 }}>
              <div style={{ color: '#2a2a2a', fontSize: 8, letterSpacing: '0.2em', marginBottom: 4 }}>DASHBOARD</div>
              <div style={{ color: '#555', fontSize: 11, fontWeight: 700 }}>Client Portal</div>
            </div>
            {nav.map(item => (
              <Link key={item.href} href={item.href} style={{
                display: 'block', padding: '11px 20px',
                background: isActive(item) ? 'rgba(220,38,38,0.08)' : 'transparent',
                borderLeft: '2px solid ' + (isActive(item) ? '#dc2626' : 'transparent'),
                color: isActive(item) ? '#fff' : '#333',
                fontSize: 9, letterSpacing: '0.2em', textDecoration: 'none',
                fontFamily: 'monospace',
              }}>
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <main style={S.main}>{children}</main>
      </div>

      {isMobile && (
        <div style={S.bottomnav}>
          {nav.map(item => (
            <Link key={item.href} href={item.href} style={{
              flex: 1, display: 'flex', flexDirection: 'column' as const, alignItems: 'center' as const,
              justifyContent: 'center', gap: 3, textDecoration: 'none',
              borderTop: '2px solid ' + (isActive(item) ? '#dc2626' : 'transparent'),
            }}>
              <span style={{ color: isActive(item) ? '#dc2626' : '#333', fontSize: 7, letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
