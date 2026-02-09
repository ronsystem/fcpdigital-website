'use client'

import { useState } from 'react'

interface Client {
  id: string
  business_name: string
  contact_email: string
  contact_phone: string
  plan: 'starter' | 'professional' | 'enterprise'
  monthly_fee: number
  status: 'active' | 'paused' | 'cancelled' | 'trial'
  created_at: string
  call_minutes_used: number
  call_minutes_limit: number
}

export default function ClientsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterPlan, setFilterPlan] = useState<string>('')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Mock clients data
  const allClients: Client[] = [
    {
      id: '1',
      business_name: 'Premium Plumbing LLC',
      contact_email: 'owner@premiumplumbing.com',
      contact_phone: '+1-415-555-0123',
      plan: 'professional',
      monthly_fee: 499,
      status: 'active',
      created_at: '2026-01-15T10:30:00Z',
      call_minutes_used: 245,
      call_minutes_limit: 1500,
    },
    {
      id: '2',
      business_name: 'Bay Area HVAC',
      contact_email: 'contact@bayareahvac.com',
      contact_phone: '+1-510-555-0456',
      plan: 'professional',
      monthly_fee: 499,
      status: 'active',
      created_at: '2026-01-20T14:22:00Z',
      call_minutes_used: 1420,
      call_minutes_limit: 1500,
    },
    {
      id: '3',
      business_name: 'Elite Electrical Services',
      contact_email: 'sales@eliteelectrical.com',
      contact_phone: '+1-408-555-0789',
      plan: 'enterprise',
      monthly_fee: 899,
      status: 'active',
      created_at: '2026-02-01T09:45:00Z',
      call_minutes_used: 2800,
      call_minutes_limit: 3000,
    },
    {
      id: '4',
      business_name: 'Sunny Dental Clinic',
      contact_email: 'admin@sunnydentalclinic.com',
      contact_phone: '+1-650-555-0321',
      plan: 'starter',
      monthly_fee: 249,
      status: 'trial',
      created_at: '2026-02-03T11:15:00Z',
      call_minutes_used: 145,
      call_minutes_limit: 500,
    },
    {
      id: '5',
      business_name: 'Green Cleaning Co',
      contact_email: 'hello@greencleaningco.com',
      contact_phone: '+1-925-555-0654',
      plan: 'starter',
      monthly_fee: 249,
      status: 'active',
      created_at: '2025-12-15T16:30:00Z',
      call_minutes_used: 320,
      call_minutes_limit: 500,
    },
    {
      id: '6',
      business_name: 'Past Landscaping',
      contact_email: 'info@pastlandscaping.com',
      contact_phone: '+1-831-555-0987',
      plan: 'starter',
      monthly_fee: 249,
      status: 'cancelled',
      created_at: '2025-11-15T13:45:00Z',
      call_minutes_used: 0,
      call_minutes_limit: 500,
    },
  ]

  const filteredClients = allClients.filter(client => {
    if (filterStatus && client.status !== filterStatus) return false
    if (filterPlan && client.plan !== filterPlan) return false
    return true
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'trial':
        return 'bg-blue-100 text-blue-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'starter':
        return 'text-blue-600'
      case 'professional':
        return 'text-purple-600'
      case 'enterprise':
        return 'text-amber-600'
      default:
        return 'text-gray-600'
    }
  }

  const mrrTotal = filteredClients
    .filter(c => c.status === 'active' || c.status === 'trial')
    .reduce((sum, c) => sum + c.monthly_fee, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Client Management</h1>
        <p className="text-gray-600">Manage paying customers and subscriptions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-600 mb-1">Total Clients</p>
          <p className="text-2xl font-bold">{filteredClients.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-600 mb-1">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {filteredClients.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-600 mb-1">Monthly Revenue</p>
          <p className="text-2xl font-bold text-green-600">${mrrTotal.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-600 mb-1">Avg Client Value</p>
          <p className="text-2xl font-bold">
            ${filteredClients.length > 0 ? Math.round(mrrTotal / filteredClients.filter(c => c.status === 'active').length) : 0}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="paused">Paused</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filterPlan}
          onChange={e => setFilterPlan(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Plans</option>
          <option value="starter">Starter</option>
          <option value="professional">Professional</option>
          <option value="enterprise">Enterprise</option>
        </select>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          📥 Export CSV
        </button>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Business</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Plan</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">MRR</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Usage</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Since</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredClients.map(client => {
              const usagePercent = (client.call_minutes_used / client.call_minutes_limit) * 100
              return (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 cursor-pointer transition"
                  onClick={() => setSelectedClient(client)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium">{client.business_name}</p>
                      <p className="text-sm text-gray-600">{client.contact_email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium capitalize ${getPlanColor(client.plan)}`}>
                      {client.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">${client.monthly_fee}</td>
                  <td className="px-6 py-4">
                    <div className="w-24">
                      <div className="bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className={`h-2 rounded-full ${usagePercent > 90 ? 'bg-red-500' : usagePercent > 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min(usagePercent, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">{Math.round(usagePercent)}%</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(client.status)}`}>
                      {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(client.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setSelectedClient(client)
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-start">
              <h2 className="text-2xl font-bold">{selectedClient.business_name}</h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Contact Email</p>
                  <p className="text-lg font-medium">{selectedClient.contact_email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Contact Phone</p>
                  <p className="text-lg font-medium">{selectedClient.contact_phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Plan</p>
                  <p className={`text-lg font-bold capitalize ${getPlanColor(selectedClient.plan)}`}>
                    {selectedClient.plan}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Monthly Fee</p>
                  <p className="text-lg font-bold">${selectedClient.monthly_fee}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Status</p>
                <select
                  defaultValue={selectedClient.status}
                  className={`px-4 py-2 rounded-lg font-medium text-xs ${getStatusColor(selectedClient.status)} border-0 cursor-pointer`}
                >
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="paused">Paused</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-600 mb-2">USAGE DETAILS</p>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-600">Minutes Used:</span>
                    <span className="float-right font-semibold">
                      {selectedClient.call_minutes_used}/{selectedClient.call_minutes_limit}
                    </span>
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{
                        width: `${Math.min((selectedClient.call_minutes_used / selectedClient.call_minutes_limit) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
                  View Dashboard
                </button>
                <button className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 font-medium">
                  Pause Service
                </button>
                <button className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 font-medium">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
