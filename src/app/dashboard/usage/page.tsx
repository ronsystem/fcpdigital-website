'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

export default function UsagePage() {
  // Mock usage data for the last 30 days
  const dailyUsage = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      minutes: Math.floor(Math.random() * 100) + 30,
      calls: Math.floor(Math.random() * 20) + 5,
    }
  })

  // Usage by day of week
  const byDayOfWeek = [
    { day: 'Mon', calls: 45, minutes: 320 },
    { day: 'Tue', calls: 52, minutes: 380 },
    { day: 'Wed', calls: 38, minutes: 290 },
    { day: 'Thu', calls: 61, minutes: 420 },
    { day: 'Fri', calls: 55, minutes: 380 },
    { day: 'Sat', calls: 28, minutes: 180 },
    { day: 'Sun', calls: 22, minutes: 140 },
  ]

  // Usage by service type
  const byServiceType = [
    { service: 'Emergency Repairs', calls: 120, percentage: 35 },
    { service: 'Routine Maintenance', calls: 85, percentage: 25 },
    { service: 'Appointments', calls: 95, percentage: 28 },
    { service: 'Consultations', calls: 41, percentage: 12 },
  ]

  const totalCalls = dailyUsage.reduce((sum, day) => sum + day.calls, 0)
  const totalMinutes = dailyUsage.reduce((sum, day) => sum + day.minutes, 0)
  const avgMinutesPerCall = (totalMinutes / totalCalls).toFixed(1)

  // Chart data
  const lineChartData = {
    labels: dailyUsage.map(d => d.date),
    datasets: [
      {
        label: 'Minutes Used',
        data: dailyUsage.map(d => d.minutes),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Minutes',
        data: byDayOfWeek.map(d => d.minutes),
        backgroundColor: '#8b5cf6',
      },
    ],
  }

  const pieChartData = {
    labels: byServiceType.map(s => s.service),
    datasets: [
      {
        data: byServiceType.map(s => s.calls),
        backgroundColor: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
        borderColor: ['#fff'],
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Usage Analytics</h1>
        <p className="text-gray-600">Monitor your call activity and usage trends</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: '📞',
            label: 'Total Calls',
            value: totalCalls,
            unit: 'calls',
            color: 'blue',
          },
          {
            icon: '⏱️',
            label: 'Total Minutes',
            value: totalMinutes,
            unit: 'minutes',
            color: 'green',
          },
          {
            icon: '📊',
            label: 'Avg Duration',
            value: avgMinutesPerCall,
            unit: 'min/call',
            color: 'purple',
          },
          {
            icon: '📈',
            label: 'Days Active',
            value: '28',
            unit: 'days',
            color: 'orange',
          },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-lg border shadow-sm">
            <p className="text-3xl mb-2">{kpi.icon}</p>
            <p className="text-gray-600 text-sm mb-1">{kpi.label}</p>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="text-xs text-gray-500 mt-2">{kpi.unit}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Usage Trend */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Daily Usage (Last 30 Days)</h2>
          <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

        {/* Usage by Day of Week */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Busiest Days</h2>
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>
      </div>

      {/* Calls by Service Type */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Calls by Service Type</h2>
          <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: true }} />
        </div>

        {/* Service Breakdown Table */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Service Breakdown</h2>
          <div className="space-y-4">
            {byServiceType.map((service, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <p className="font-medium text-sm">{service.service}</p>
                  <p className="text-sm text-gray-600">{service.calls} calls ({service.percentage}%)</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Usage Alerts */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-900 mb-3">💡 Usage Tips</h2>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Your peak calling hours are between 9 AM - 5 PM on weekdays</li>
          <li>• You've used 145 of your 1,500 monthly minutes (9.7%)</li>
          <li>• At current usage rate, you have 68 days of service remaining</li>
          <li>• Consider upgrading to Enterprise plan if you exceed 1,500 minutes</li>
        </ul>
      </div>
    </div>
  )
}
