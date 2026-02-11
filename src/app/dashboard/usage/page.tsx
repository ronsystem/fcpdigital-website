'use client'

import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

export default function UsagePage() {
  const [stats, setStats] = useState<any>(null)
  const [monthlyData, setMonthlyData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [minutesLimit, setMinutesLimit] = useState(1500)

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        // Get email from localStorage (demo mode)
        const email = localStorage.getItem('user_email')
        const usageUrl = email ? `/api/usage?email=${encodeURIComponent(email)}` : '/api/usage'

        const res = await fetch(usageUrl)
        if (!res.ok) {
          // Fallback to mock data
          setStats({
            today_calls: 5,
            today_minutes: 45,
            this_month_calls: 145,
            this_month_minutes: 1045,
            percentage_used: 70,
          })
          setMinutesLimit(1500)
          setMonthlyData([])
        } else {
          const data = await res.json()
          setStats(data.stats)
          setMonthlyData(data.monthlyData || [])
          setMinutesLimit(data.limit || 1500)
        }
      } catch (err) {
        console.error('Error fetching usage:', err)
        setError('Failed to load usage data')
      } finally {
        setLoading(false)
      }
    }

    fetchUsage()
  }, [])

  // Mock usage data for the last 30 days (for demo)
  const dailyUsage = monthlyData.length > 0
    ? monthlyData.map(d => ({
        date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        minutes: d.call_minutes,
        calls: d.calls_count,
      }))
    : Array.from({ length: 30 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (29 - i))
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          minutes: Math.floor(Math.random() * 100) + 30,
          calls: Math.floor(Math.random() * 20) + 5,
        }
      })

  // Usage by day of week (mock)
  const byDayOfWeek = [
    { day: 'Mon', calls: 45, minutes: 320 },
    { day: 'Tue', calls: 52, minutes: 380 },
    { day: 'Wed', calls: 38, minutes: 290 },
    { day: 'Thu', calls: 61, minutes: 420 },
    { day: 'Fri', calls: 55, minutes: 380 },
    { day: 'Sat', calls: 28, minutes: 180 },
    { day: 'Sun', calls: 22, minutes: 140 },
  ]

  // Usage by service type (mock)
  const byServiceType = [
    { service: 'Emergency Repairs', calls: 120, percentage: 35 },
    { service: 'Routine Maintenance', calls: 85, percentage: 25 },
    { service: 'Appointments', calls: 95, percentage: 28 },
    { service: 'Consultations', calls: 41, percentage: 12 },
  ]

  const totalCalls = stats?.this_month_calls || dailyUsage.reduce((sum, day) => sum + day.calls, 0)
  const totalMinutes = stats?.this_month_minutes || dailyUsage.reduce((sum, day) => sum + day.minutes, 0)
  const percentageUsed = stats?.percentage_used || ((totalMinutes / minutesLimit) * 100)
  const avgMinutesPerCall = totalCalls > 0 ? (totalMinutes / totalCalls).toFixed(1) : 0

  // Chart data with dark theme colors
  const lineChartData = {
    labels: dailyUsage.map(d => d.date),
    datasets: [
      {
        label: 'Minutes Used',
        data: dailyUsage.map(d => d.minutes),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const barChartData = {
    labels: byDayOfWeek.map(d => d.day),
    datasets: [
      {
        label: 'Calls',
        data: byDayOfWeek.map(d => d.calls),
        backgroundColor: '#ef4444',
      },
      {
        label: 'Minutes',
        data: byDayOfWeek.map(d => d.minutes),
        backgroundColor: '#f97316',
      },
    ],
  }

  const pieChartData = {
    labels: byServiceType.map(s => s.service),
    datasets: [
      {
        data: byServiceType.map(s => s.calls),
        backgroundColor: ['#ef4444', '#f97316', '#eab308', '#22c55e'],
        borderColor: ['#fff'],
        borderWidth: 2,
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

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Usage Analytics</h1>
        <div className="text-center py-12 text-gray-400">Loading usage data...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Usage Analytics</h1>
        <p className="text-gray-400">Monitor your call activity and usage trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: '📞',
            label: 'Total Calls',
            value: totalCalls,
            unit: 'calls',
          },
          {
            icon: '⏱️',
            label: 'Total Minutes',
            value: totalMinutes,
            unit: 'minutes',
          },
          {
            icon: '📊',
            label: 'Avg Duration',
            value: avgMinutesPerCall,
            unit: 'min/call',
          },
          {
            icon: '📈',
            label: 'Usage',
            value: `${Math.round(percentageUsed)}%`,
            unit: 'of limit',
          },
        ].map((kpi, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 p-6 rounded-lg hover:border-red-600 transition">
            <p className="text-3xl mb-2">{kpi.icon}</p>
            <p className="text-gray-400 text-sm mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-2">{kpi.unit}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Usage Trend */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Daily Usage (Last 30 Days)</h2>
          <Line data={lineChartData} options={chartOptions} />
        </div>

        {/* Usage by Day of Week */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Busiest Days</h2>
          <Bar data={barChartData} options={chartOptions} />
        </div>
      </div>

      {/* Calls by Service Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Calls by Service Type</h2>
          <Pie data={pieChartData} options={chartOptions} />
        </div>

        {/* Service Breakdown Table */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Service Breakdown</h2>
          <div className="space-y-4">
            {byServiceType.map((service, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <p className="font-medium text-sm text-gray-300">{service.service}</p>
                  <p className="text-sm text-gray-400">{service.calls} calls ({service.percentage}%)</p>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-red-600"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Alerts */}
      <div className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-white mb-3">💡 Usage Tips</h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• Your peak calling hours are between 9 AM - 5 PM on weekdays</li>
          <li>• You've used {totalMinutes} of your {minutesLimit} monthly minutes ({Math.round(percentageUsed)}%)</li>
          <li>• At current usage rate, you have {Math.ceil((minutesLimit - totalMinutes) / (totalMinutes / 30))} days of service remaining</li>
          <li>• Consider upgrading if you exceed your current plan limit</li>
        </ul>
      </div>
    </div>
  )
}
