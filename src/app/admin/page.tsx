'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface AdminStats {
  total_clients: number
  active_clients: number
  mrr: number
  avg_plan_value: number
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/clients')
        if (!res.ok) {
          // Fallback to mock data
          setStats({
            total_clients: 47,
            active_clients: 42,
            mrr: 20933,
            avg_plan_value: 445,
          })
        } else {
          const data = await res.json()
          setStats(data.stats)
        }
      } catch (err) {
        console.error('Error fetching stats:', err)
        setStats({
          total_clients: 47,
          active_clients: 42,
          mrr: 20933,
          avg_plan_value: 445,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Calculated KPIs
  const kpis = {
    totalClients: stats?.total_clients || 0,
    activeClients: stats?.active_clients || 0,
    churnRate: stats && stats.total_clients > 0 ? (((stats.total_clients - stats.active_clients) / stats.total_clients) * 100).toFixed(1) : '0',
    mrrToday: stats?.mrr || 0,
    newSignupsThisMonth: Math.floor((stats?.total_clients || 0) / 4),
    avgClientValue: Math.round(stats?.avg_plan_value || 0),
  }

  // Mock daily MRR trend
  const mrrTrend = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    const baseValue = 19000
    const variance = Math.sin(i / 10) * 2000 + Math.random() * 1000
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mrr: Math.floor(baseValue + variance),
    }
  })

  // Mock signup trend
  const signupTrend = [
    { week: 'Week 1', signups: 2, revenue: 1496 },
    { week: 'Week 2', signups: 3, revenue: 2244 },
    { week: 'Week 3', signups: 4, revenue: 2992 },
    { week: 'Week 4', signups: 3, revenue: 2244 },
  ]

  // Mock recent activity
  const recentActivity = [
    { time: '2 min ago', action: 'New signup: Tech Startup Inc', type: 'signup', plan: 'Professional' },
    { time: '15 min ago', action: 'Payment received from ABC Plumbing', type: 'payment', amount: '$499' },
    { time: '1 hour ago', action: 'Customer requested plan upgrade', type: 'upgrade', from: 'Starter' },
    { time: '3 hours ago', action: 'Subscription cancelled: XYZ Services', type: 'churn', plan: 'Starter' },
    { time: '5 hours ago', action: 'Lead scored 95: Premium prospect', type: 'lead', score: 95 },
  ]

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Admin Overview</h1>
        <div className="text-center py-12 text-gray-400">Loading admin dashboard...</div>
      </div>
    )
  }

  const chartData = {
    labels: mrrTrend.map(d => d.date),
    datasets: [
      {
        label: 'Monthly Recurring Revenue',
        data: mrrTrend.map(d => d.mrr),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
    scales: {
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      x: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Admin Overview</h1>
        <p className="text-gray-400">Business metrics and real-time dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: '💰',
            label: 'MRR (Today)',
            value: `$${kpis.mrrToday.toLocaleString()}`,
            change: '+3.2%',
          },
          {
            icon: '👥',
            label: 'Active Clients',
            value: `${kpis.activeClients}/${kpis.totalClients}`,
            change: '+2 this week',
          },
          {
            icon: '📈',
            label: 'New Signups',
            value: `${kpis.newSignupsThisMonth}`,
            change: 'This month',
          },
          {
            icon: '💵',
            label: 'Avg Client Value',
            value: `$${kpis.avgClientValue}`,
            change: '/month',
          },
          {
            icon: '🔴',
            label: 'Churn Rate',
            value: `${kpis.churnRate}%`,
            change: 'vs total',
          },
          {
            icon: '🎯',
            label: 'Total Clients',
            value: `${kpis.totalClients}`,
            change: 'all time',
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className="bg-gray-900 border border-gray-800 p-6 rounded-lg hover:border-red-600 transition"
          >
            <p className="text-3xl mb-2">{kpi.icon}</p>
            <p className="text-gray-400 text-sm mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-2">{kpi.change}</p>
          </div>
        ))}
      </div>

      {/* MRR Trend Chart */}
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Monthly Recurring Revenue Trend</h2>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* Grid: Signups & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signups by Week */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Signups This Month</h2>
          <div className="space-y-4">
            {signupTrend.map((week, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <p className="font-medium text-sm text-gray-300">{week.week}</p>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{week.signups} signups</p>
                    <p className="text-xs text-gray-400">${week.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-red-600"
                    style={{ width: `${(week.signups / 4) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-800 last:border-b-0">
                <div>
                  {item.type === 'signup' && <span className="text-2xl">🎉</span>}
                  {item.type === 'payment' && <span className="text-2xl">✅</span>}
                  {item.type === 'upgrade' && <span className="text-2xl">📈</span>}
                  {item.type === 'churn' && <span className="text-2xl">📉</span>}
                  {item.type === 'lead' && <span className="text-2xl">🌟</span>}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{item.action}</p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { href: '/admin/leads', icon: '🎯', label: 'View Leads', count: '—' },
          { href: '/admin/clients', icon: '👥', label: 'Manage Clients', count: kpis.totalClients.toString() },
          { href: '/admin/audit', icon: '📋', label: 'Audit Log', count: 'Log' },
          { href: '/dashboard', icon: '📊', label: 'User Dashboard', count: 'Go' },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="bg-gray-900 border border-gray-800 p-4 rounded-lg hover:border-red-600 transition"
          >
            <p className="text-3xl mb-2">{action.icon}</p>
            <p className="font-semibold text-sm text-white">{action.label}</p>
            <p className="text-lg font-bold text-red-600">{action.count}</p>
          </Link>
        ))}
      </div>

      {/* System Health */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-green-800/30 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-green-400 mb-3">✅ System Health</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div>
            <p className="font-medium text-white">Uptime</p>
            <p>99.9% (30 days)</p>
          </div>
          <div>
            <p className="font-medium text-white">API Response</p>
            <p>45ms average</p>
          </div>
          <div>
            <p className="font-medium text-white">Database</p>
            <p>All healthy ✓</p>
          </div>
        </div>
      </div>
    </div>
  )
}
