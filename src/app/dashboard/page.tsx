'use client'

import { useEffect, useState } from 'react'

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
    // Mock client data - in production this would come from Supabase
    const mockClient: ClientData = {
      id: '1',
      business_name: 'Test Plumbing Co',
      plan: 'professional',
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
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>
  }

  if (error) {
    return <div className="text-red-600 py-12">{error}</div>
  }

  const usagePercent = client ? (client.call_minutes_used / client.call_minutes_limit) * 100 : 0

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-blue-600 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {client?.business_name}</h1>
        <p className="text-blue-100">Your AI receptionist is active and ready to answer calls</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: '📞',
            label: 'Total Calls',
            value: stats.total_calls,
            color: 'blue',
          },
          {
            icon: '⏱️',
            label: 'Minutes Used',
            value: `${stats.total_minutes}/${client?.call_minutes_limit || 0}`,
            color: 'green',
          },
          {
            icon: '⏱️',
            label: 'Avg Duration',
            value: `${stats.avg_duration} min`,
            color: 'purple',
          },
          {
            icon: '💵',
            label: 'Plan',
            value: `$${client?.monthly_fee || 0}/mo`,
            color: 'orange',
          },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Usage Bar */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Monthly Usage</h2>
          <span className="text-sm text-gray-600">
            {Math.round(usagePercent)}% used
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${
              usagePercent > 90
                ? 'bg-red-500'
                : usagePercent > 75
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(usagePercent, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">
          {client?.call_minutes_used || 0} of {client?.call_minutes_limit || 0} minutes used this month
        </p>
      </div>

      {/* Your Phone Number */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Your Business Phone</h2>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg">
          <p className="text-sm opacity-90 mb-2">Customers can call this number 24/7</p>
          <p className="text-3xl font-bold">+1 (415) 555-0123</p>
          <p className="text-sm opacity-90 mt-2">Click to copy or configure in Settings</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { time: '2 min ago', action: 'Incoming call from John Doe', status: 'Answered' },
            { time: '15 min ago', action: 'Appointment scheduled by AI', status: 'Completed' },
            { time: '1 hour ago', action: 'Lead qualification call', status: 'Completed' },
            { time: '3 hours ago', action: 'Emergency service request', status: 'Escalated' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-start py-3 border-b last:border-b-0">
              <div>
                <p className="font-medium">{item.action}</p>
                <p className="text-xs text-gray-600">{item.time}</p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded ${
                  item.status === 'Answered'
                    ? 'bg-green-100 text-green-800'
                    : item.status === 'Completed'
                    ? 'bg-blue-100 text-blue-800'
                    : item.status === 'Escalated'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/dashboard/calls"
          className="bg-white p-4 rounded-lg border hover:shadow-md transition text-center"
        >
          <p className="text-2xl mb-2">📞</p>
          <p className="font-semibold">View All Calls</p>
        </a>
        <a
          href="/dashboard/usage"
          className="bg-white p-4 rounded-lg border hover:shadow-md transition text-center"
        >
          <p className="text-2xl mb-2">📈</p>
          <p className="font-semibold">Usage Analytics</p>
        </a>
        <a
          href="/dashboard/settings"
          className="bg-white p-4 rounded-lg border hover:shadow-md transition text-center"
        >
          <p className="text-2xl mb-2">⚙️</p>
          <p className="font-semibold">Manage Settings</p>
        </a>
      </div>
    </div>
  )
}
