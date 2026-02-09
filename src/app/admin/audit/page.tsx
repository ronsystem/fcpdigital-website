'use client'

import { useState } from 'react'

interface AuditEntry {
  id: string
  timestamp: string
  user_id: string
  action: string
  resource_type: string
  resource_id: string
  success: boolean
  ip_address: string
  error_message?: string
}

export default function AuditLogPage() {
  const [filterAction, setFilterAction] = useState<string>('')
  const [filterSuccess, setFilterSuccess] = useState<string>('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Mock audit log data
  const allEntries: AuditEntry[] = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
      user_id: 'user_123',
      action: 'subscription_created',
      resource_type: 'subscription',
      resource_id: 'sub_789',
      success: true,
      ip_address: '192.168.1.100',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      user_id: 'user_123',
      action: 'payment_processed',
      resource_type: 'payment',
      resource_id: 'pay_456',
      success: true,
      ip_address: '192.168.1.100',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
      user_id: 'admin_001',
      action: 'user_created',
      resource_type: 'user',
      resource_id: 'user_123',
      success: true,
      ip_address: '203.0.113.42',
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 1 * 60 * 60000).toISOString(),
      user_id: 'admin_001',
      action: 'lead_updated',
      resource_type: 'lead',
      resource_id: 'lead_555',
      success: true,
      ip_address: '203.0.113.42',
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 2 * 60 * 60000).toISOString(),
      user_id: 'user_456',
      action: 'login_failed',
      resource_type: 'auth',
      resource_id: 'session_xyz',
      success: false,
      ip_address: '198.51.100.89',
      error_message: 'Invalid credentials',
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 3 * 60 * 60000).toISOString(),
      user_id: 'admin_001',
      action: 'client_paused',
      resource_type: 'client',
      resource_id: 'client_890',
      success: true,
      ip_address: '203.0.113.42',
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 5 * 60 * 60000).toISOString(),
      user_id: 'user_789',
      action: 'webhook_received',
      resource_type: 'webhook',
      resource_id: 'hook_123',
      success: true,
      ip_address: '198.18.0.10',
    },
    {
      id: '8',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60000).toISOString(),
      user_id: 'admin_002',
      action: 'database_backup',
      resource_type: 'system',
      resource_id: 'backup_001',
      success: true,
      ip_address: '203.0.113.99',
    },
  ]

  const filteredEntries = allEntries.filter(entry => {
    if (filterAction && entry.action !== filterAction) return false
    if (filterSuccess === 'success' && !entry.success) return false
    if (filterSuccess === 'failed' && entry.success) return false
    return true
  })

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleString()
  }

  const getActionColor = (action: string) => {
    if (action.includes('created')) return 'bg-green-100 text-green-800'
    if (action.includes('updated')) return 'bg-blue-100 text-blue-800'
    if (action.includes('deleted')) return 'bg-red-100 text-red-800'
    if (action.includes('failed')) return 'bg-red-100 text-red-800'
    if (action.includes('paused')) return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-800'
  }

  const actions = [...new Set(allEntries.map(e => e.action))]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Audit Log</h1>
        <p className="text-gray-600">Security and compliance event log</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={filterAction}
          onChange={e => setFilterAction(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Actions</option>
          {actions.map(action => (
            <option key={action} value={action}>
              {action.replace(/_/g, ' ').toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={filterSuccess}
          onChange={e => setFilterSuccess(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Results</option>
          <option value="success">Success Only</option>
          <option value="failed">Failed Only</option>
        </select>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          📥 Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-600 mb-1">Total Events</p>
          <p className="text-2xl font-bold">{filteredEntries.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-600 mb-1">Successful</p>
          <p className="text-2xl font-bold text-green-600">{filteredEntries.filter(e => e.success).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-600 mb-1">Failed</p>
          <p className="text-2xl font-bold text-red-600">{filteredEntries.filter(e => !e.success).length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-600 mb-1">Success Rate</p>
          <p className="text-2xl font-bold">
            {Math.round((filteredEntries.filter(e => e.success).length / filteredEntries.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Resource</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">IP Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Result</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredEntries.map(entry => (
              <tr key={entry.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm">{formatTime(entry.timestamp)}</td>
                <td className="px-6 py-4 text-sm font-medium">{entry.user_id}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getActionColor(entry.action)}`}>
                    {entry.action.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <p className="font-medium">{entry.resource_type}</p>
                  <p className="text-gray-600 text-xs">{entry.resource_id}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{entry.ip_address}</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      entry.success
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {entry.success ? '✓ Success' : '✗ Failed'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    {expandedId === entry.id ? 'Hide' : 'Show'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expanded Details */}
      {expandedId && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Event Details</h3>
            <button
              onClick={() => setExpandedId(null)}
              className="text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>

          {filteredEntries
            .filter(e => e.id === expandedId)
            .map(entry => (
              <div key={entry.id} className="space-y-3">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">TIMESTAMP</p>
                    <p className="text-sm">{new Date(entry.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">USER ID</p>
                    <p className="text-sm">{entry.user_id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">ACTION</p>
                    <p className="text-sm">{entry.action.replace(/_/g, ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">IP ADDRESS</p>
                    <p className="text-sm">{entry.ip_address}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">RESOURCE TYPE</p>
                    <p className="text-sm">{entry.resource_type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">RESOURCE ID</p>
                    <p className="text-sm">{entry.resource_id}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-600 font-medium mb-1">STATUS</p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      entry.success
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {entry.success ? '✓ Success' : '✗ Failed'}
                  </span>
                </div>

                {entry.error_message && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-xs text-red-600 font-medium mb-1">ERROR MESSAGE</p>
                    <p className="text-sm text-red-800">{entry.error_message}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
