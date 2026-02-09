'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'account' | 'subscription' | 'billing'>('account')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
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
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Account Tab */}
      {activeTab === 'account' && (
        <div className="bg-white p-6 rounded-lg border space-y-6">
          <h2 className="text-xl font-semibold">Account Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                type="text"
                defaultValue="Test Plumbing Co"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Email
              </label>
              <input
                type="email"
                defaultValue="owner@testplumbing.com"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1-555-123-4567"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option selected>Plumbing</option>
                <option>HVAC</option>
                <option>Electrical</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Address
            </label>
            <textarea
              defaultValue="123 Main St, San Francisco, CA 94105"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-20"
            />
          </div>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      )}

      {/* Subscription Tab */}
      {activeTab === 'subscription' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Plan Type</p>
                <p className="text-2xl font-bold text-blue-600">Professional</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Monthly Cost</p>
                <p className="text-2xl font-bold text-green-600">$499</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Monthly Minutes</p>
                <p className="text-2xl font-bold text-purple-600">1,500</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold">Plan Features</h3>
              {[
                '24/7 AI Call Answering',
                'Up to 1,500 minutes/month',
                'Advanced Lead Qualification',
                'AI Appointment Scheduling',
                'Priority Support',
                'Analytics Dashboard',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Upgrade to Enterprise
              </button>
              <button className="w-full bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300">
                Downgrade Plan
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Downgrading your plan will reduce your monthly minutes and may affect your service.
            </p>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Subscription Renewal</p>
                  <p className="text-sm text-gray-600">Monthly billing</p>
                </div>
                <p className="text-lg font-bold">Next: Mar 7, 2026</p>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Payment Method</p>
                  <p className="text-sm text-gray-600">Visa ending in 4242</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Update
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-4">Billing History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Description</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { date: 'Feb 7, 2026', desc: 'Professional Plan - Monthly', amount: '$499.00', status: 'Paid' },
                    { date: 'Jan 7, 2026', desc: 'Professional Plan - Monthly', amount: '$499.00', status: 'Paid' },
                    { date: 'Dec 7, 2025', desc: 'Professional Plan - Monthly', amount: '$499.00', status: 'Paid' },
                  ].map((invoice, i) => (
                    <tr key={i}>
                      <td className="py-3">{invoice.date}</td>
                      <td className="py-3">{invoice.desc}</td>
                      <td className="py-3 font-medium">{invoice.amount}</td>
                      <td className="py-3">
                        <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-medium">
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Access Stripe Billing Portal
          </button>
        </div>
      )}
    </div>
  )
}
