'use client'

import { useState } from 'react'

interface Call {
  id: string
  caller_name: string
  caller_phone: string
  duration_seconds: number
  service_needed: string
  urgency: string
  created_at: string
  transcript?: string
}

export default function CallsPage() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)
  const [filterUrgency, setFilterUrgency] = useState<string>('')

  // Mock call data
  const allCalls: Call[] = [
    {
      id: '1',
      caller_name: 'John Smith',
      caller_phone: '+1-555-123-4567',
      duration_seconds: 240,
      service_needed: 'Pipe leak repair',
      urgency: 'high',
      created_at: new Date(Date.now() - 30 * 60000).toISOString(),
      transcript: 'Customer reported a pipe leak in the kitchen...',
    },
    {
      id: '2',
      caller_name: 'Sarah Johnson',
      caller_phone: '+1-555-234-5678',
      duration_seconds: 180,
      service_needed: 'Routine maintenance',
      urgency: 'low',
      created_at: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
    },
    {
      id: '3',
      caller_name: 'Mike Davis',
      caller_phone: '+1-555-345-6789',
      duration_seconds: 320,
      service_needed: 'Water heater issue',
      urgency: 'high',
      created_at: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
    },
    {
      id: '4',
      caller_name: 'Emily Brown',
      caller_phone: '+1-555-456-7890',
      duration_seconds: 150,
      service_needed: 'Appointment booking',
      urgency: 'medium',
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
    },
  ]

  const filteredCalls = filterUrgency
    ? allCalls.filter(call => call.urgency === filterUrgency)
    : allCalls

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Call History</h1>
        <p className="text-gray-600">View and manage all incoming calls</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={filterUrgency}
          onChange={e => setFilterUrgency(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Urgency Levels</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Calls Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Caller</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Urgency</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredCalls.map(call => (
              <tr
                key={call.id}
                className="hover:bg-gray-50 cursor-pointer transition"
                onClick={() => setSelectedCall(call)}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{call.caller_name}</p>
                    <p className="text-sm text-gray-600">{call.caller_phone}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{call.service_needed}</td>
                <td className="px-6 py-4">{formatDuration(call.duration_seconds)}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getUrgencyColor(call.urgency)}`}>
                    {call.urgency.charAt(0).toUpperCase() + call.urgency.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{formatTime(call.created_at)}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setSelectedCall(call)
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Call Detail Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-start">
              <h2 className="text-2xl font-bold">Call Details</h2>
              <button
                onClick={() => setSelectedCall(null)}
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Caller Name</p>
                  <p className="text-lg font-medium">{selectedCall.caller_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                  <p className="text-lg font-medium">{selectedCall.caller_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-lg font-medium">{formatDuration(selectedCall.duration_seconds)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Service Needed</p>
                  <p className="text-lg font-medium">{selectedCall.service_needed}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Urgency Level</p>
                <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${getUrgencyColor(selectedCall.urgency)}`}>
                  {selectedCall.urgency.charAt(0).toUpperCase() + selectedCall.urgency.slice(1)}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Call Time</p>
                <p className="text-lg font-medium">{new Date(selectedCall.created_at).toLocaleString()}</p>
              </div>

              {selectedCall.transcript && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Transcript</p>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                    {selectedCall.transcript}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Add Note
                </button>
                <button className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300">
                  Forward
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
