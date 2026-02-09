'use client'

import { useState } from 'react'

interface Lead {
  id: string
  business_name: string
  industry: string
  email: string
  phone: string
  city: string
  state: string
  score: number
  status: 'new' | 'researched' | 'contacted' | 'converted'
  created_at: string
}

export default function LeadsPage() {
  const [filterStatus, setFilterStatus] = useState<string>('')
  const [filterIndustry, setFilterIndustry] = useState<string>('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  // Mock leads data
  const allLeads: Lead[] = [
    {
      id: '1',
      business_name: 'Premium Plumbing LLC',
      industry: 'Plumbing',
      email: 'info@premiumplumbing.com',
      phone: '+1-415-555-0123',
      city: 'San Francisco',
      state: 'CA',
      score: 95,
      status: 'converted',
      created_at: '2026-01-15T10:30:00Z',
    },
    {
      id: '2',
      business_name: 'Bay Area HVAC',
      industry: 'HVAC',
      email: 'contact@bayareahvac.com',
      phone: '+1-510-555-0456',
      city: 'Oakland',
      state: 'CA',
      score: 88,
      status: 'contacted',
      created_at: '2026-02-01T14:22:00Z',
    },
    {
      id: '3',
      business_name: 'Elite Electrical Services',
      industry: 'Electrical',
      email: 'sales@eliteelectrical.com',
      phone: '+1-408-555-0789',
      city: 'San Jose',
      state: 'CA',
      score: 76,
      status: 'researched',
      created_at: '2026-02-03T09:45:00Z',
    },
    {
      id: '4',
      business_name: 'Sunny Dental Clinic',
      industry: 'Dental',
      email: 'admin@sunnydentalclinic.com',
      phone: '+1-650-555-0321',
      city: 'Palo Alto',
      state: 'CA',
      score: 82,
      status: 'researched',
      created_at: '2026-02-04T11:15:00Z',
    },
    {
      id: '5',
      business_name: 'Green Cleaning Co',
      industry: 'Cleaning',
      email: 'hello@greencleaningco.com',
      phone: '+1-925-555-0654',
      city: 'Walnut Creek',
      state: 'CA',
      score: 65,
      status: 'new',
      created_at: '2026-02-05T16:30:00Z',
    },
    {
      id: '6',
      business_name: 'LandscapePro Designs',
      industry: 'Landscaping',
      email: 'info@landscapepro.com',
      phone: '+1-831-555-0987',
      city: 'Santa Cruz',
      state: 'CA',
      score: 71,
      status: 'new',
      created_at: '2026-02-05T13:45:00Z',
    },
  ]

  const filteredLeads = allLeads.filter(lead => {
    if (filterStatus && lead.status !== filterStatus) return false
    if (filterIndustry && lead.industry !== filterIndustry) return false
    return true
  })

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-green-100 text-green-800'
    if (score >= 70) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'researched':
        return 'bg-purple-100 text-purple-800'
      case 'contacted':
        return 'bg-orange-100 text-orange-800'
      case 'converted':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const industries = [...new Set(allLeads.map(l => l.industry))]
  const statuses = ['new', 'researched', 'contacted', 'converted']

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Lead Management</h1>
        <p className="text-gray-600">Manage business prospects and track conversion pipeline</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          {statuses.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={filterIndustry}
          onChange={e => setFilterIndustry(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Industries</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>

        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          📥 Export CSV
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Business</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Industry</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Score</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredLeads.map(lead => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50 cursor-pointer transition"
                onClick={() => setSelectedLead(lead)}
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{lead.business_name}</p>
                    <p className="text-sm text-gray-600">{lead.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">{lead.industry}</td>
                <td className="px-6 py-4 text-sm">
                  {lead.city}, {lead.state}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(lead.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      setSelectedLead(lead)
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

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-start">
              <h2 className="text-2xl font-bold">{selectedLead.business_name}</h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-600 hover:text-gray-900 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Business Name</p>
                  <p className="text-lg font-medium">{selectedLead.business_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Industry</p>
                  <p className="text-lg font-medium">{selectedLead.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-lg font-medium">{selectedLead.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-lg font-medium">{selectedLead.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="text-lg font-medium">
                    {selectedLead.city}, {selectedLead.state}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lead Score</p>
                  <p className={`text-lg font-bold ${selectedLead.score >= 85 ? 'text-green-600' : selectedLead.score >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {selectedLead.score}/100
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Status</p>
                <select
                  defaultValue={selectedLead.status}
                  className={`px-4 py-2 rounded-lg font-medium text-xs ${getStatusColor(selectedLead.status)} border-0 cursor-pointer`}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-600 mb-2">RESEARCH SUMMARY</p>
                <p className="text-sm text-gray-700">
                  {selectedLead.score >= 85
                    ? '✅ Excellent prospect - Ready to contact with personalized pitch'
                    : selectedLead.score >= 70
                    ? '🟡 Good prospect - Needs more research before outreach'
                    : '⚠️ Marginal prospect - May need further qualification'}
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium">
                  Send Email
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-medium">
                  Schedule Call
                </button>
                <button className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 font-medium">
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
