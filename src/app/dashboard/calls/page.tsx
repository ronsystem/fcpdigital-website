'use client'

import { useState, useEffect } from 'react'

interface Call {
  id: number
  caller_name: string | null
  caller_phone: string | null
  duration_seconds: number
  service_needed: string | null
  urgency: string | null
  created_at: string
  transcript?: string | null
}

export default function CallsPage() {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null)
  const [filterUrgency, setFilterUrgency] = useState<string>('')
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const res = await fetch('/api/calls')
        if (!res.ok) {
          // Fallback to mock data
          setCalls([
            {
              id: 1,
              caller_name: 'John Smith',
              caller_phone: '+1-555-123-4567',
              duration_seconds: 240,
              service_needed: 'Pipe leak repair',
              urgency: 'high',
              created_at: new Date(Date.now() - 30 * 60000).toISOString(),
              transcript: 'Customer reported a pipe leak in the kitchen...',
            },
            {
              id: 2,
              caller_name: 'Sarah Johnson',
              caller_phone: '+1-555-234-5678',
              duration_seconds: 180,
              service_needed: 'Routine maintenance',
              urgency: 'low',
              created_at: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
            },
          ])
        } else {
          const data = await res.json()
          setCalls(data.calls || [])
        }
      } catch (err) {
        console.error('Error fetching calls:', err)
        setError('Failed to load calls')
      } finally {
        setLoading(false)
      }
    }

    fetchCalls()
  }, [])

  const allCalls = calls

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

  const getUrgencyColor = (urgency: string | null) => {
    switch (urgency) {
      case 'urgent':
        return 'bg-red-900/30 text-red-300 border border-red-800'
      case 'high':
        return 'bg-orange-900/30 text-orange-300 border border-orange-800'
      case 'medium':
        return 'bg-yellow-900/30 text-yellow-300 border border-yellow-800'
      case 'low':
        return 'bg-green-900/30 text-green-300 border border-green-800'
      default:
        return 'bg-gray-800 text-gray-300'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Call History</h1>
        <div className="text-center py-12 text-gray-400">Loading calls...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Call History</h1>
        <div className="text-center py-12 text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Call History</h1>
        <p className="text-gray-400">View and manage all incoming calls</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={filterUrgency}
          onChange={e => setFilterUrgency(e.target.value)}
          className="px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
        >
          <option value="">All Urgency Levels</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Calls Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">Caller</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">Duration</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">Urgency</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-white">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredCalls.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  No calls found
                </td>
              </tr>
            ) : (
              filteredCalls.map(call => (
                <tr
                  key={call.id}
                  className="hover:bg-gray-800/50 cursor-pointer transition"
                  onClick={() => setSelectedCall(call)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{call.caller_name || 'Unknown'}</p>
                      <p className="text-sm text-gray-400">{call.caller_phone || 'No number'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{call.service_needed || '-'}</td>
                  <td className="px-6 py-4 text-gray-300">{formatDuration(call.duration_seconds)}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getUrgencyColor(call.urgency)}`}>
                      {call.urgency ? call.urgency.charAt(0).toUpperCase() + call.urgency.slice(1) : 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{formatTime(call.created_at)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setSelectedCall(call)
                      }}
                      className="text-red-600 hover:text-red-500 text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Call Detail Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto border border-gray-800">
            <div className="p-6 border-b border-gray-800 flex justify-between items-start">
              <h2 className="text-2xl font-bold text-white">Call Details</h2>
              <button
                onClick={() => setSelectedCall(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Caller Name</p>
                  <p className="text-lg font-medium text-white">{selectedCall.caller_name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Phone Number</p>
                  <p className="text-lg font-medium text-white">{selectedCall.caller_phone || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Duration</p>
                  <p className="text-lg font-medium text-white">{formatDuration(selectedCall.duration_seconds)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Service Needed</p>
                  <p className="text-lg font-medium text-white">{selectedCall.service_needed || '-'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Urgency Level</p>
                <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${getUrgencyColor(selectedCall.urgency)}`}>
                  {selectedCall.urgency ? selectedCall.urgency.charAt(0).toUpperCase() + selectedCall.urgency.slice(1) : 'Unknown'}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-1">Call Time</p>
                <p className="text-lg font-medium text-white">{new Date(selectedCall.created_at).toLocaleString()}</p>
              </div>

              {selectedCall.transcript && (
                <div>
                  <p className="text-sm text-gray-400 mb-2">Transcript</p>
                  <div className="bg-gray-800 p-4 rounded-lg text-sm text-gray-300">
                    {selectedCall.transcript}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                  Add Note
                </button>
                <button className="flex-1 bg-gray-800 text-gray-300 py-2 rounded-lg hover:bg-gray-700 transition">
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
