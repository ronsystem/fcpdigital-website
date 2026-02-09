'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/admin', label: 'Overview', icon: '📊' },
    { href: '/admin/leads', label: 'Leads', icon: '🎯' },
    { href: '/admin/clients', label: 'Clients', icon: '👥' },
    { href: '/admin/audit', label: 'Audit Log', icon: '📋' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/admin" className="text-2xl font-bold text-blue-600">
            FCP Admin
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-red-600 font-semibold bg-red-50 px-3 py-1 rounded">
              🔐 Admin Only
            </span>
            <button
              onClick={() => {
                localStorage.removeItem('auth_token')
                router.push('/login')
              }}
              className="text-red-600 hover:text-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r min-h-[calc(100vh-70px)] p-6">
          <nav className="space-y-2">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-900">
              <strong>Admin Panel:</strong> View business metrics, manage leads and clients, review audit logs.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
