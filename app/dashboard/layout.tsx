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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; background: #080808; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-thumb { background: #1e1e1e; }
      ` }} />
      <div style={{
        minHeight: '100vh',
        background: '#080808',
        color: '#fff',
        fontFamily: 'monospace',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.2s',
      }}>
        {/* Top Bar — NOT sticky, just fixed height */}
        <div style={{
          background: '#080808',
          borderBottom: '1px solid #111',
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}>
          <Link href="/dashboard" style={{ textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
            <span style={{ color: '#fff' }}>FCP</span>
            <span style={{ color: '#dc2626' }}>DIGITAL</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ color: '#333', fontSize: 9, letterSpacing: '0.12em' }}>AI ACTIVE</span>
            </div>
            <button
              onClick={handleSignOut}
              style={{ background: 'transparent', border: 'none', color: '#2a2a2a', fontSize: 9, letterSpacing: '0.1em', cursor: 'pointer', fontFamily: 'monospace' }}
            >
              SIGN OUT
            </button>
          </div>
        </div>

        {/* Desktop: sidebar + content */}
        {!isMobile ? (
          <div style={{ display: 'flex', paddingTop: 48 }}>
            <div style={{
              width: 190,
              borderRight: '1px solid #111',
              padding: '28px 0',
              position: 'fixed',
              top: 48,
              left: 0,
              bottom: 0,
              overflowY: 'auto',
              background: '#080808',
              zIndex: 50,
            }}>
              <div style={{ padding: '0 20px', marginBottom: 28 }}>
                <div style={{ color: '#2a2a2a', fontSize: 8, letterSpacing: '0.2em', marginBottom: 4 }}>DASHBOARD</div>
                <div style={{ color: '#555', fontSize: 11, fontWeight: 700 }}>Client Portal</div>
              </div>
              {nav.map(item => (
                <Link key={item.href} href={item.href} style={{
                  display: 'block',
                  padding: '11px 20px',
                  background: isActive(item) ? 'rgba(220,38,38,0.08)' : 'transparent',
                  borderLeft: '2px solid ' + (isActive(item) ? '#dc2626' : 'transparent'),
                  color: isActive(item) ? '#fff' : '#333',
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  textDecoration: 'none',
                  fontFamily: 'monospace',
                }}>
                  {item.label}
                </Link>
              ))}
            </div>
            <main style={{ marginLeft: 190, flex: 1, padding: '32px 28px', minWidth: 0 }}>
              {children}
            </main>
          </div>
        ) : (
          /* Mobile: full width content with bottom padding for nav */
          <div style={{ paddingTop: 48, paddingBottom: 64 }}>
            <main style={{ padding: '20px 16px' }}>
              {children}
            </main>
          </div>
        )}

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
            zIndex: 100,
          }}>
            {nav.map(item => (
              <Link key={item.href} href={item.href} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
                textDecoration: 'none',
                borderTop: '2px solid ' + (isActive(item) ? '#dc2626' : 'transparent'),
              }}>
                <span style={{
                  color: isActive(item) ? '#dc2626' : '#2a2a2a',
                  fontSize: 7,
                  letterSpacing: '0.1em',
                  fontFamily: 'monospace',
                  fontWeight: isActive(item) ? 700 : 400,
                }}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
