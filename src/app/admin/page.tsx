'use client'

import Link from 'next/link'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function AdminOverviewPage() {
  // Mock KPI data
  const kpis = {
    totalClients: 47,
    activeClients: 42,
    churnRate: 10.6,
    mrrToday: 20933,
    newSignupsThisMonth: 12,
    avgClientValue: 445,
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

  const chartData = {
    labels: mrrTrend.map(d => d.date),
    datasets: [
      {
        label: 'Monthly Recurring Revenue',
        data: mrrTrend.map(d => d.mrr),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Overview</h1>
        <p className="text-gray-600">Business metrics and real-time dashboard</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: '💰',
            label: 'MRR (Today)',
            value: `$${kpis.mrrToday.toLocaleString()}`,
            change: '+3.2%',
            color: 'green',
          },
          {
            icon: '👥',
            label: 'Active Clients',
            value: `${kpis.activeClients}/${kpis.totalClients}`,
            change: '+2 this week',
            color: 'blue',
          },
          {
            icon: '📈',
            label: 'New Signups',
            value: `${kpis.newSignupsThisMonth}`,
            change: 'This month',
            color: 'purple',
          },
          {
            icon: '💵',
            label: 'Avg Client Value',
            value: `$${kpis.avgClientValue}`,
            change: '/month',
            color: 'orange',
          },
          {
            icon: '🔴',
            label: 'Churn Rate',
            value: `${kpis.churnRate}%`,
            change: '-0.5% vs last month',
            color: 'red',
          },
          {
            icon: '🎯',
            label: 'Client Growth',
            value: '+25.5%',
            change: 'YoY',
            color: 'indigo',
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className={`bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition`}
          >
            <p className="text-3xl mb-2">{kpi.icon}</p>
            <p className="text-gray-600 text-sm mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className={`text-xs mt-2 ${
              kpi.color === 'green' ? 'text-green-600' :
              kpi.color === 'blue' ? 'text-blue-600' :
              kpi.color === 'purple' ? 'text-purple-600' :
              kpi.color === 'orange' ? 'text-orange-600' :
              kpi.color === 'red' ? 'text-red-600' :
              'text-indigo-600'
            }`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* MRR Trend Chart */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Monthly Recurring Revenue Trend</h2>
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: true }} />
      </div>

      {/* Grid: Signups & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signups by Week */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Signups This Month</h2>
          <div className="space-y-4">
            {signupTrend.map((week, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <p className="font-medium text-sm">{week.week}</p>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{week.signups} signups</p>
                    <p className="text-xs text-gray-600">${week.revenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${(week.signups / 4) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-b-0">
                <div>
                  {item.type === 'signup' && <span className="text-2xl">🎉</span>}
                  {item.type === 'payment' && <span className="text-2xl">✅</span>}
                  {item.type === 'upgrade' && <span className="text-2xl">📈</span>}
                  {item.type === 'churn' && <span className="text-2xl">📉</span>}
                  {item.type === 'lead' && <span className="text-2xl">🌟</span>}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-gray-600">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { href: '/admin/leads', icon: '🎯', label: 'View Leads', count: '184' },
          { href: '/admin/clients', icon: '👥', label: 'Manage Clients', count: '47' },
          { href: '/admin/audit', icon: '📋', label: 'Audit Log', count: 'Recent' },
          { href: '/dashboard', icon: '📊', label: 'User Dashboard', count: 'Link' },
        ].map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="bg-white p-4 rounded-lg border hover:shadow-md transition"
          >
            <p className="text-3xl mb-2">{action.icon}</p>
            <p className="font-semibold text-sm">{action.label}</p>
            <p className="text-lg font-bold text-blue-600">{action.count}</p>
          </Link>
        ))}
      </div>

      {/* System Health */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-green-900 mb-3">✅ System Health</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-green-800">
          <div>
            <p className="font-medium">Uptime</p>
            <p>99.9% (30 days)</p>
          </div>
          <div>
            <p className="font-medium">API Response</p>
            <p>45ms average</p>
          </div>
          <div>
            <p className="font-medium">Database</p>
            <p>All healthy ✓</p>
          </div>
        </div>
      </div>
    </div>
  )
}
