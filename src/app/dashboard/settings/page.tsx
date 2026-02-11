'use client'

import { useState, useEffect } from 'react'

interface ClientData {
  business_name: string
  contact_email: string
  contact_phone: string
  plan: string
  monthly_fee: number
  call_minutes_limit: number
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'account' | 'subscription' | 'billing'>('account')
  const [client, setClient] = useState<ClientData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch('/api/clients')
        if (!res.ok) {
          // Fallback to mock data
          setClient({
            business_name: 'Test Plumbing Co',
            contact_email: 'owner@testplumbing.com',
            contact_phone: '+1-555-123-4567',
            plan: 'scale',
            monthly_fee: 499,
            call_minutes_limit: 1500,
          })
        } else {
          const data = await res.json()
          setClient(data)
        }
      } catch (err) {
        console.error('Error fetching client:', err)
        setClient({
          business_name: 'Test Plumbing Co',
          contact_email: 'owner@testplumbing.com',
          contact_phone: '+1-555-123-4567',
          plan: 'scale',
          monthly_fee: 499,
          call_minutes_limit: 1500,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <div className="text-center py-12 text-gray-400">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Settings</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-800">
        {[
          { id: 'account', label: 'Account' },
          { id: 'subscription', label: 'Subscription' },
          { id: 'billing', label: 'Billing' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === tab.id
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg space-y-6">
          <h2 className="text-xl font-semibold text-white">Account Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Name
              </label>
              <input
                type="text"
                defaultValue={client?.business_name || ''}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue={client?.contact_email || ''}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue={client?.contact_phone || ''}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Plan
              </label>
              <input
                type="text"
                disabled
                value={client?.plan?.toUpperCase() || 'N/A'}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-gray-400 rounded-lg"
              />
            </div>
          </div>

          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
            Save Changes
          </button>
        </div>
      )}

      {/* Subscription Tab */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Current Plan</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-1">Plan Type</p>
                <p className="text-2xl font-bold text-red-600">{client?.plan ? client.plan.charAt(0).toUpperCase() + client.plan.slice(1) : 'N/A'}</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-1">Monthly Cost</p>
                <p className="text-2xl font-bold text-white">${client?.monthly_fee}</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400 mb-1">Monthly Minutes</p>
                <p className="text-2xl font-bold text-white">{client?.call_minutes_limit?.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold text-white">Plan Features</h3>
              {[
                '24/7 AI Call Answering',
                `Up to ${client?.call_minutes_limit?.toLocaleString()} minutes/month`,
                'Advanced Lead Qualification',
                'AI Appointment Scheduling',
                'Priority Support',
                'Analytics Dashboard',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-500">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                Upgrade to Enterprise
              </button>
              <button className="w-full bg-gray-800 text-gray-300 py-2 rounded-lg hover:bg-gray-700 transition">
                Downgrade Plan
              </button>
            </div>
          </div>

          <div className="bg-gray-800 border border-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-300">
              ⚠️ Downgrading your plan will reduce your monthly minutes and may affect your service.
            </p>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Billing Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div>
                  <p className="font-medium text-white">Subscription Renewal</p>
                  <p className="text-sm text-gray-400">Monthly billing</p>
                </div>
                <p className="text-lg font-bold text-white">Next: Mar 7, 2026</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div>
                  <p className="font-medium text-white">Payment Method</p>
                  <p className="text-sm text-gray-400">Visa ending in 4242</p>
                </div>
                <button className="text-red-600 hover:text-red-500 text-sm font-medium">
                  Update
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Billing History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr>
                    <th className="text-left py-2 text-gray-300">Date</th>
                    <th className="text-left py-2 text-gray-300">Description</th>
                    <th className="text-left py-2 text-gray-300">Amount</th>
                    <th className="text-left py-2 text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {[
                    { date: 'Feb 7, 2026', desc: `${client?.plan ? client.plan.charAt(0).toUpperCase() + client.plan.slice(1) : 'N/A'} Plan - Monthly`, amount: `$${client?.monthly_fee || 0}`, status: 'Paid' },
                    { date: 'Jan 7, 2026', desc: `${client?.plan ? client.plan.charAt(0).toUpperCase() + client.plan.slice(1) : 'N/A'} Plan - Monthly`, amount: `$${client?.monthly_fee || 0}`, status: 'Paid' },
                    { date: 'Dec 7, 2025', desc: `${client?.plan ? client.plan.charAt(0).toUpperCase() + client.plan.slice(1) : 'N/A'} Plan - Monthly`, amount: `$${client?.monthly_fee || 0}`, status: 'Paid' },
                  ].map((invoice, i) => (
                    <tr key={i}>
                      <td className="py-3 text-gray-300">{invoice.date}</td>
                      <td className="py-3 text-gray-300">{invoice.desc}</td>
                      <td className="py-3 font-medium text-gray-300">{invoice.amount}</td>
                      <td className="py-3">
                        <span className="text-green-300 bg-green-900/30 px-2 py-1 rounded text-xs font-medium border border-green-800">
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
            Access Stripe Billing Portal
          </button>
        </div>
      )}
    </div>
  )
}
