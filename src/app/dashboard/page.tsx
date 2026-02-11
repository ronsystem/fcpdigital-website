'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ClientData {
  id: string
  business_name: string
  plan: string
  monthly_fee: number
  call_minutes_used: number
  call_minutes_limit: number
  status: string
}

interface CallStats {
  total_calls: number
  total_minutes: number
  avg_duration: number
}

export default function DashboardPage() {
  const [client, setClient] = useState<ClientData | null>(null)
  const [stats, setStats] = useState<CallStats>({
    total_calls: 0,
    total_minutes: 0,
    avg_duration: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch client data
        const clientRes = await fetch('/api/clients')
        if (!clientRes.ok) {
          if (clientRes.status === 401) {
            // User not authenticated, show demo data
            const mockClient: ClientData = {
              id: '1',
              business_name: 'Test Plumbing Co',
              plan: 'scale',
              monthly_fee: 499,
              call_minutes_used: 145,
              call_minutes_limit: 1500,
              status: 'active',
            }

            const mockStats: CallStats = {
              total_calls: 32,
              total_minutes: 145,
              avg_duration: 4.5,
            }

            setClient(mockClient)
            setStats(mockStats)
          } else {
            setError('Failed to load client data')
          }
        } else {
          const clientData = await clientRes.json()
          setClient(clientData)

          // Fetch call stats
          const callsRes = await fetch('/api/calls')
          if (callsRes.ok) {
            const callsData = await callsRes.json()
            setStats(callsData.stats)
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        // Fall back to demo data on error
        const mockClient: ClientData = {
          id: '1',
          business_name: 'Test Plumbing Co',
          plan: 'scale',
          monthly_fee: 499,
          call_minutes_used: 145,
          call_minutes_limit: 1500,
          status: 'active',
        }

        const mockStats: CallStats = {
          total_calls: 32,
          total_minutes: 145,
          avg_duration: 4.5,
        }

        setClient(mockClient)
        setStats(mockStats)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading dashboard...</div>
  }

  if (error) {
    return <div className="text-red-600 py-12">{error}</div>
  }

  const usagePercent = client ? (client.call_minutes_used / client.call_minutes_limit) * 100 : 0

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 p-6 mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome back, {client?.business_name}</h1>
        <p className="text-gray-400">Your AI receptionist is active and ready to answer calls</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              icon: '📞',
              label: 'Total Calls',
              value: stats.total_calls,
            },
            {
              icon: '⏱️',
              label: 'Minutes Used',
              value: `${stats.total_minutes}/${client?.call_minutes_limit || 0}`,
            },
            {
              icon: '⏱️',
              label: 'Avg Duration',
              value: `${stats.avg_duration} min`,
            },
            {
              icon: '💵',
              label: 'Plan',
              value: `$${client?.monthly_fee || 0}/mo`,
            },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-red-600 transition">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Usage Bar */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Monthly Usage</h2>
            <span className="text-sm text-gray-400">
              {Math.round(usagePercent)}% used
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-4 mb-3">
            <div
              className={`h-4 rounded-full transition-all ${
                usagePercent > 90
                  ? 'bg-red-600'
                  : usagePercent > 75
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(usagePercent, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">
            {client?.call_minutes_used || 0} of {client?.call_minutes_limit || 0} minutes used this month
          </p>
        </div>

        {/* Your Phone Number */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-6">Your Business Phone</h2>
          <div className="bg-black bg-opacity-30 backdrop-blur-sm p-6 rounded-xl">
            <p className="text-gray-200 text-sm mb-3">Customers can call this number 24/7</p>
            <p className="text-4xl font-bold mb-3">+1 (415) 555-0123</p>
            <p className="text-sm text-gray-200">
              <a href="/dashboard/settings" className="hover:underline font-semibold">
                Configure in Settings →
              </a>
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { time: '2 min ago', action: 'Incoming call from John Doe', status: 'Answered' },
              { time: '15 min ago', action: 'Appointment scheduled by AI', status: 'Completed' },
              { time: '1 hour ago', action: 'Lead qualification call', status: 'Completed' },
              { time: '3 hours ago', action: 'Emergency service request', status: 'Escalated' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-start py-4 border-b border-gray-800 last:border-b-0">
                <div>
                  <p className="font-medium text-white">{item.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    item.status === 'Answered'
                      ? 'bg-green-900/30 text-green-300 border border-green-800'
                      : item.status === 'Completed'
                      ? 'bg-blue-900/30 text-blue-300 border border-blue-800'
                      : item.status === 'Escalated'
                      ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-800'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/calls"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-red-600 transition text-center group"
          >
            <p className="text-4xl mb-3 group-hover:scale-110 transition">📞</p>
            <p className="font-semibold text-white">View All Calls</p>
            <p className="text-sm text-gray-500 mt-2">Access your call history</p>
          </Link>
          <Link
            href="/dashboard/usage"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-red-600 transition text-center group"
          >
            <p className="text-4xl mb-3 group-hover:scale-110 transition">📈</p>
            <p className="font-semibold text-white">Usage Analytics</p>
            <p className="text-sm text-gray-500 mt-2">View detailed statistics</p>
          </Link>
          <Link
            href="/dashboard/settings"
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-red-600 transition text-center group"
          >
            <p className="text-4xl mb-3 group-hover:scale-110 transition">⚙️</p>
            <p className="font-semibold text-white">Manage Settings</p>
            <p className="text-sm text-gray-500 mt-2">Configure your account</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
