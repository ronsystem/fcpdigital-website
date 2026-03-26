'use client'
import { useState } from 'react'

export default function OraDashboard() {
  // Data arrays (must be before state initialization)
  const events = [
    { id: 1, name: 'Techno Friday', date: 'Mar 28', type: 'nightclub', capacity: 500, vipSent: true },
    { id: 2, name: 'Sunday Brunch Jazz', date: 'Mar 29', type: 'brunch', capacity: 200, vipSent: false },
    { id: 3, name: 'Ladies Night', date: 'Apr 4', type: 'nightclub', capacity: 600, vipSent: false },
  ]

  const topSpenders = [
    { rank: 1, name: 'Marcus T.', spend: '$650', last: '6 days ago', status: '🟢' },
    { rank: 2, name: 'Jasmine R.', spend: '$520', last: '12 days ago', status: '🟢' },
    { rank: 3, name: 'DeShawn M.', spend: '$490', last: '3 days ago', status: '🟢' },
    { rank: 4, name: 'Brittany K.', spend: '$445', last: '18 days ago', status: '🟢' },
    { rank: 5, name: 'Antoine W.', spend: '$410', last: '8 days ago', status: '🟢' },
    { rank: 6, name: 'Simone L.', spend: '$395', last: '22 days ago', status: '🟡' },
    { rank: 7, name: 'Chris B.', spend: '$370', last: '5 days ago', status: '🟢' },
    { rank: 8, name: 'Naomi F.', spend: '$340', last: '31 days ago', status: '🟡' },
    { rank: 9, name: 'Jordan P.', spend: '$310', last: '28 days ago', status: '🟡' },
    { rank: 10, name: 'Alexis H.', spend: '$285', last: '45 days ago', status: '🔴' },
  ]

  const topNights = [
    { name: 'FRIDAY', value: 312, width: '100%' },
    { name: 'SATURDAY', value: 287, width: '92%' },
    { name: 'THURSDAY', value: 198, width: '63%' },
    { name: 'SUNDAY BRUNCH', value: 143, width: '46%' },
    { name: 'SAT BRUNCH', value: 121, width: '39%' },
  ]

  const guests = [
    { id: 1, name: 'Marcus T.', phone: '(313) 555-0142', segment: 'VIP', visits: 8, lastVisit: '6 days ago', status: '🟢' },
    { id: 2, name: 'Jasmine R.', phone: '(313) 555-0156', segment: 'VIP', visits: 7, lastVisit: '12 days ago', status: '🟢' },
    { id: 3, name: 'DeShawn M.', phone: '(313) 555-0187', segment: 'Active', visits: 6, lastVisit: '3 days ago', status: '🟢' },
    { id: 4, name: 'Brittany K.', phone: '(313) 555-0193', segment: 'Active', visits: 5, lastVisit: '18 days ago', status: '🟢' },
    { id: 5, name: 'Antoine W.', phone: '(313) 555-0201', segment: 'VIP', visits: 9, lastVisit: '8 days ago', status: '🟢' },
    { id: 6, name: 'Simone L.', phone: '(313) 555-0218', segment: 'Passive', visits: 3, lastVisit: '22 days ago', status: '🟡' },
    { id: 7, name: 'Chris B.', phone: '(313) 555-0234', segment: 'Active', visits: 4, lastVisit: '5 days ago', status: '🟢' },
    { id: 8, name: 'Naomi F.', phone: '(313) 555-0267', segment: 'Passive', visits: 2, lastVisit: '31 days ago', status: '🟡' },
  ]

  const campaigns = [
    { id: 1, name: 'Friday Night Drop', date: 'Mar 22', audience: 412, type: 'Event', open: '64%', click: '28%', revenue: '$3,760' },
    { id: 2, name: 'Happy Hour Special', date: 'Mar 20', audience: 847, type: 'Promotion', open: '52%', click: '18%', revenue: '$2,140' },
    { id: 3, name: 'VIP Weekend Invite', date: 'Mar 15', audience: 187, type: 'VIP', open: '71%', click: '35%', revenue: '$5,280' },
    { id: 4, name: 'Monday Re-engagement', date: 'Mar 11', audience: 156, type: 'Reengagement', open: '41%', click: '12%', revenue: '$890' },
    { id: 5, name: 'St. Patrick\'s Day Bash', date: 'Mar 8', audience: 847, type: 'Event', open: '68%', click: '31%', revenue: '$4,520' },
  ]

  // State hooks
  const [activeTab, setActiveTab] = useState('overview')
  const [chatOpen, setChatOpen] = useState(false)
  const [vapiCallOpen, setVapiCallOpen] = useState(false)
  const [callState, setCallState] = useState('ready')
  const [addEventOpen, setAddEventOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({ name: '', date: '', type: 'nightclub', capacity: '', ticketLink: '', notes: '' })
  const [eventsList, setEventsList] = useState(events)

  const navItems = [
    { label: 'OVERVIEW', id: 'overview' },
    { label: 'GUEST LIST', id: 'guest-list' },
    { label: 'CAMPAIGNS', id: 'campaigns' },
    { label: 'CALENDAR', id: 'calendar' },
    { label: 'REPORTS', id: 'reports' },
    { label: 'SPEND INTEL', id: 'spend-intel' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Georgia, serif' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 1024px) {
          .dashboard-container { flex-direction: column !important; }
          .dashboard-sidebar { position: static !important; width: 100% !important; height: auto !important; border-right: none !important; border-bottom: 1px solid #1a1a1a !important; padding: 12px 16px !important; }
          .dashboard-sidebar-header { display: flex; justify-content: space-between; align-items: center; }
          .sidebar-menu { display: flex; gap: 8px; flex-wrap: wrap; }
          .sidebar-menu button { padding: 8px 12px !important; font-size: 7px !important; }
          .dashboard-content { margin-left: 0 !important; padding: 16px !important; }
          .sidebar-footer { position: static; padding: 12px 0; margin-top: 12px; border-top: 1px solid #1a1a1a; }
        }
        @media (max-width: 768px) {
          .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .content-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .dashboard-content { padding: 12px 12px 80px 12px !important; }
          .card { padding: 16px !important; }
          table { font-size: 9px !important; }
          table td, table th { padding: 8px 4px !important; }
          .demo-call-widget { bottom: 16px !important; right: 16px !important; }
          .demo-call-button { padding: 8px 12px !important; font-size: 8px !important; }
        }
        @media (max-width: 480px) {
          .dashboard-sidebar { position: static !important; }
          .dashboard-content { margin-left: 0 !important; padding: 8px 8px 80px 8px !important; }
          .stat-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .card { padding: 12px !important; font-size: 12px !important; }
          table { font-size: 8px !important; }
          .demo-call-button { padding: 6px 8px !important; font-size: 7px !important; }
        }
      `}} />
      <div className="dashboard-container" style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div className="dashboard-sidebar" style={{ width: 200, background: '#0d0d0d', borderRight: '1px solid #1a1a1a', padding: '24px 16px', position: 'fixed', height: '100vh', overflow: 'auto' }}>
        <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.3em', fontFamily: 'monospace', marginBottom: 4 }}>ORA DETROIT</div>
        <div style={{ color: '#444', fontSize: 7, letterSpacing: '0.15em', fontFamily: 'monospace', marginBottom: 24 }}>GUEST INTELLIGENCE PLATFORM</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                padding: '12px 8px',
                background: activeTab === item.id ? '#1a1a1a' : 'transparent',
                color: activeTab === item.id ? '#C9A96E' : '#666',
                border: 'none',
                fontSize: 8,
                letterSpacing: '0.2em',
                fontFamily: 'monospace',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #1a1a1a', fontSize: 8, color: '#333', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
          <div style={{ marginBottom: 8 }}>
            <a href="/ora-demo" style={{ color: '#666', textDecoration: 'none', display: 'block' }}>Back to VIP List</a>
          </div>
          <div style={{ marginTop: 8 }}>POWERED BY FCP DIGITAL</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content" style={{ marginLeft: 200, flex: 1, padding: '32px 32px 80px 32px', overflow: 'auto' }}>

        {activeTab === 'overview' && (
          <>
            {/* Stat Cards */}
            <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'TOTAL GUESTS', value: '847', sub: '+23 this week' },
                { label: 'REPEAT RATE', value: '31%', sub: 'vs 18% avg ↑' },
                { label: 'LAST CAMPAIGN', value: '64% OPEN', sub: 'Est. 47 in' },
                { label: 'COLD GUESTS', value: '180', sub: 'Re-engage now' },
              ].map((card, idx) => (
                <div key={idx} className="card" style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
                  <div style={{ color: '#555', fontSize: 8, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 12 }}>
                    {card.label}
                  </div>
                  <div style={{ color: '#fff', fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
                    {card.value}
                  </div>
                  <div style={{ color: '#666', fontSize: 11 }}>
                    {card.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Two Column Section */}
            <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>

              {/* Top Nights Chart */}
              <div>
                <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 16 }}>
                  TOP NIGHTS THIS MONTH
                </div>
                <div className="card" style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
                  {topNights.map((night, idx) => (
                    <div key={idx} style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em' }}>
                          {night.name}
                        </div>
                        <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace' }}>
                          {night.value}
                        </div>
                      </div>
                      <div style={{ background: '#1a1a1a', height: 6, borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ background: '#C9A96E', height: '100%', width: night.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaign Results */}
              <div>
                <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 16 }}>
                  LAST CAMPAIGN RESULTS
                </div>
                <div className="card" style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
                  <div style={{ color: '#fff', fontSize: 11, letterSpacing: '0.1em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 16 }}>
                    FRIDAY NIGHT DROP
                  </div>
                  <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: 16, marginBottom: 16 }} />

                  {[
                    { label: 'Sent', value: '412' },
                    { label: 'Opened', value: '64%', highlight: true },
                    { label: 'Est. came in', value: '47' },
                    { label: 'Est. revenue', value: '$3,760' },
                  ].map((stat, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace' }}>
                        {stat.label}
                      </div>
                      <div style={{ color: stat.highlight ? '#C9A96E' : '#fff', fontSize: 10, fontFamily: 'monospace', fontWeight: 700 }}>
                        {stat.value}
                      </div>
                    </div>
                  ))}

                  <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16, marginTop: 16 }} />
                  <button style={{ width: '100%', padding: '12px', background: '#1a1a1a', color: '#C9A96E', border: 'none', fontSize: 9, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', marginTop: 16 }}>
                    RE-SEND TO NON-OPENERS →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'guest-list' && (
          <div className="card" style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
            <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 24 }}>
              GUEST LIST
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>NAME</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>PHONE</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>SEGMENT</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>VISITS</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>LAST VISIT</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'center' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td style={{ color: '#fff', fontSize: 10, fontFamily: 'Georgia, serif', padding: '16px 0' }}>{guest.name}</td>
                    <td style={{ color: '#999', fontSize: 9, fontFamily: 'monospace', padding: '16px 0' }}>{guest.phone}</td>
                    <td style={{ color: guest.segment === 'VIP' ? '#C9A96E' : '#ccc', fontSize: 10, fontFamily: 'monospace', padding: '16px 0' }}>{guest.segment}</td>
                    <td style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', padding: '16px 0' }}>{guest.visits}</td>
                    <td style={{ color: '#666', fontSize: 9, fontFamily: 'monospace', padding: '16px 0' }}>{guest.lastVisit}</td>
                    <td style={{ color: '#fff', fontSize: 12, padding: '16px 0', textAlign: 'center' }}>{guest.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="card" style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
            <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 24 }}>
              CAMPAIGN HISTORY
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>NAME</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>DATE</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>AUDIENCE</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>TYPE</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>OPEN</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>CLICK</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>REVENUE</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td style={{ color: '#fff', fontSize: 9, fontFamily: 'Georgia, serif', padding: '16px 0' }}>{campaign.name}</td>
                    <td style={{ color: '#999', fontSize: 9, fontFamily: 'monospace', padding: '16px 0' }}>{campaign.date}</td>
                    <td style={{ color: '#999', fontSize: 9, fontFamily: 'monospace', padding: '16px 0' }}>{campaign.audience}</td>
                    <td style={{ color: '#C9A96E', fontSize: 8, fontFamily: 'monospace', padding: '16px 0' }}>{campaign.type}</td>
                    <td style={{ color: '#fff', fontSize: 9, fontFamily: 'monospace', fontWeight: 700, padding: '16px 0' }}>{campaign.open}</td>
                    <td style={{ color: '#fff', fontSize: 9, fontFamily: 'monospace', padding: '16px 0' }}>{campaign.click}</td>
                    <td style={{ color: '#fff', fontSize: 9, fontFamily: 'monospace', fontWeight: 700, padding: '16px 0' }}>{campaign.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="card" style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700 }}>
                EVENT CALENDAR
              </div>
              <button
                onClick={() => setAddEventOpen(!addEventOpen)}
                style={{ background: '#C9A96E', color: '#0a0a0a', border: 'none', padding: '8px 16px', fontSize: 9, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer' }}
              >
                {addEventOpen ? 'CLOSE' : '+ ADD EVENT'}
              </button>
            </div>

            {addEventOpen && (
              <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: 24, marginBottom: 24, borderRadius: 4 }}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 6 }}>EVENT NAME</div>
                  <input
                    type="text"
                    value={newEvent.name}
                    onChange={e => setNewEvent({ ...newEvent, name: e.target.value })}
                    placeholder="e.g. Techno Friday"
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ccc', padding: '12px', fontSize: 11, fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' as const }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 6 }}>DATE</div>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ccc', padding: '12px', fontSize: 11, fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' as const }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 6 }}>EVENT TYPE</div>
                  <select
                    value={newEvent.type}
                    onChange={e => setNewEvent({ ...newEvent, type: e.target.value })}
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ccc', padding: '12px', fontSize: 11, fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' as const }}
                  >
                    <option value="nightclub">Nightclub</option>
                    <option value="brunch">Brunch</option>
                    <option value="live-music">Live Music</option>
                    <option value="private">Private</option>
                    <option value="holiday">Holiday</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 6 }}>EXPECTED CAPACITY</div>
                  <input
                    type="number"
                    value={newEvent.capacity}
                    onChange={e => setNewEvent({ ...newEvent, capacity: e.target.value })}
                    placeholder="e.g. 500"
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ccc', padding: '12px', fontSize: 11, fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' as const }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 6 }}>TICKET LINK (optional)</div>
                  <input
                    type="url"
                    value={newEvent.ticketLink}
                    onChange={e => setNewEvent({ ...newEvent, ticketLink: e.target.value })}
                    placeholder="https://..."
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ccc', padding: '12px', fontSize: 11, fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' as const }}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ color: '#555', fontSize: 9, letterSpacing: '0.2em', fontFamily: 'monospace', marginBottom: 6 }}>NOTES (optional)</div>
                  <textarea
                    value={newEvent.notes}
                    onChange={e => setNewEvent({ ...newEvent, notes: e.target.value })}
                    placeholder="Additional details..."
                    style={{ width: '100%', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#ccc', padding: '12px', fontSize: 11, fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' as const, minHeight: '80px', resize: 'vertical' as const }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => {
                      setAddEventOpen(false)
                      setNewEvent({ name: '', date: '', type: 'nightclub', capacity: '', ticketLink: '', notes: '' })
                    }}
                    style={{ flex: 1, padding: '12px', background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#999', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => {
                      if (newEvent.name.trim() && newEvent.date) {
                        const eventId = eventsList.length + 1
                        const addedEvent = {
                          id: eventId,
                          name: newEvent.name,
                          date: newEvent.date,
                          type: newEvent.type,
                          capacity: parseInt(newEvent.capacity) || 0,
                          vipSent: false,
                          notes: newEvent.notes,
                          ticketLink: newEvent.ticketLink
                        }
                        setEventsList([...eventsList, addedEvent])
                        setAddEventOpen(false)
                        setNewEvent({ name: '', date: '', type: 'nightclub', capacity: '', ticketLink: '', notes: '' })
                      }
                    }}
                    style={{ flex: 1, padding: '12px', background: '#C9A96E', border: 'none', color: '#0a0a0a', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ADD EVENT →
                  </button>
                </div>
              </div>
            )}

            {addEventOpen && eventsList.length > 0 && (
              <div style={{ padding: '12px 16px', background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 4, marginBottom: 24, color: '#C9A96E', fontSize: 10, fontFamily: 'monospace' }}>
                ✓ Event added. Automations will be queued 96 hours before.
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
              {eventsList.map((event, idx) => (
                <div key={idx} style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', padding: 16, borderRadius: 4 }}>
                  <div style={{ color: '#C9A96E', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, marginBottom: 8 }}>
                    {event.date}
                  </div>
                  <div style={{ color: '#fff', fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
                    {event.name}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <span style={{ color: '#666', fontSize: 9, fontFamily: 'monospace' }}>Type: {event.type}</span>
                    <span style={{ color: '#666', fontSize: 9, fontFamily: 'monospace' }}>Cap: {event.capacity}</span>
                  </div>
                  <div style={{ padding: '12px', background: '#1a1a1a', borderRadius: 4, fontSize: 9, color: event.vipSent ? '#C9A96E' : '#999' }}>
                    {event.vipSent ? '✓ VIP invites sent' : '○ Pending VIP send'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'spend-intel' && (
          <div className="card" style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
            <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 24 }}>
              TOP 10 SPENDERS
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>RANK</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>NAME</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>AVG SPEND</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'left' }}>LAST VISIT</th>
                  <th style={{ color: '#555', fontSize: 9, fontFamily: 'monospace', letterSpacing: '0.1em', padding: '12px 0', textAlign: 'center' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {topSpenders.map((spender, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', padding: '16px 0' }}>{spender.rank}</td>
                    <td style={{ color: '#fff', fontSize: 10, fontFamily: 'Georgia, serif', padding: '16px 0' }}>{spender.name}</td>
                    <td style={{ color: '#fff', fontSize: 10, fontFamily: 'monospace', padding: '16px 0' }}>{spender.spend}</td>
                    <td style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', padding: '16px 0' }}>{spender.last}</td>
                    <td style={{ color: '#fff', fontSize: 12, padding: '16px 0', textAlign: 'center' }}>{spender.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="card" style={{ background: '#111', border: '1px solid #1a1a1a', padding: 24 }}>
            <div style={{ color: '#fff', fontSize: 12, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 12 }}>
              ORA DETROIT — WEEKLY PULSE
            </div>
            <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', marginBottom: 24 }}>
              Week of March 17, 2026
            </div>
            <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: 20, marginBottom: 20 }} />

            {[
              {
                title: 'LIST GROWTH',
                content: 'Total: 847  |  New this week: 23  |  +2.8%'
              },
              {
                title: 'TOP SPENDER THIS WEEK',
                content: 'Marcus T. — $650 avg, visited twice'
              },
              {
                title: 'CAMPAIGN HIGHLIGHT',
                content: 'Friday Night Drop: 64% open rate\nEst. 47 guests | Est. $3,760 revenue'
              },
              {
                title: 'RE-ENGAGEMENT ALERT',
                content: '180 guests inactive 30+ days.\nRecommend: send re-engagement before Friday.'
              },
              {
                title: 'OPPORTUNITY',
                content: '2 private event inquiries — no follow-up sent.\nAutomate: send within 24 hours of inquiry.'
              },
            ].map((section, idx) => (
              <div key={idx} style={{ marginBottom: 20 }}>
                <div style={{ color: '#C9A96E', fontSize: 10, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, marginBottom: 8 }}>
                  {section.title}
                </div>
                <div style={{ color: '#999', fontSize: 10, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {section.content}
                </div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 20, marginTop: 20 }} />
            <button style={{ padding: '12px 16px', background: '#1a1a1a', color: '#C9A96E', border: 'none', fontSize: 9, letterSpacing: '0.15em', fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', marginTop: 16 }}>
              DOWNLOAD PDF
            </button>
          </div>
        )}

      </div>
      </div>

      {/* Chat Widget */}
      <div style={{ position: 'fixed', bottom: 24, right: 24 }}>
        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#C9A96E',
            color: '#0a0a0a',
            border: 'none',
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          ✦
        </button>

        {chatOpen && (
          <div style={{ position: 'absolute', bottom: 72, right: 0, width: 320, background: '#111', border: '1px solid #1a1a1a', borderRadius: 8, maxHeight: 400, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 16, borderBottom: '1px solid #1a1a1a', background: '#0a0a0a' }}>
              <div style={{ color: '#fff', fontSize: 11, fontFamily: 'monospace', fontWeight: 700 }}>Demo Chat</div>
            </div>

            <div style={{ padding: 16, flex: 1 }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ color: '#C9A96E', fontSize: 10, fontFamily: 'monospace', marginBottom: 8 }}>You:</div>
                <div style={{ color: '#ccc', fontSize: 10, lineHeight: 1.6 }}>Who are my top 10 spenders this month?</div>
              </div>

              <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: 16 }}>
                <div style={{ color: '#999', fontSize: 10, fontFamily: 'monospace', marginBottom: 8 }}>Agent:</div>
                <div style={{ color: '#ccc', fontSize: 9, lineHeight: 1.6 }}>
                  Here are your top 10 spenders for March:<br/>
                  1. Marcus T. — $650 avg/visit<br/>
                  2. Jasmine R. — $520 avg/visit<br/>
                  ...<br/>
                  <br/>
                  ⚠️ Alexis H. hasn't visited in 45 days — recommend a personal re-engagement message today.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vapi Demo Call Widget */}
      <div style={{ position: 'fixed', bottom: 24, right: 24 }} className="demo-call-widget">
        <button
          onClick={() => setVapiCallOpen(true)}
          className="demo-call-button"
          style={{
            padding: '12px 16px',
            background: '#1a1a1a',
            color: '#C9A96E',
            border: '1px solid #C9A96E',
            fontSize: 10,
            letterSpacing: '0.15em',
            fontFamily: 'monospace',
            fontWeight: 700,
            cursor: 'pointer',
            borderRadius: 4,
          }}
        >
          ☎ DEMO CALL
        </button>

        {vapiCallOpen && (
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, background: '#111', border: '2px solid #C9A96E', borderRadius: 8, padding: 24, zIndex: 1000, boxShadow: '0 20px 60px rgba(201, 169, 110, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ color: '#C9A96E', fontSize: 12, fontFamily: 'monospace', fontWeight: 700 }}>DEMO CALL</div>
              <button
                onClick={() => setVapiCallOpen(false)}
                style={{ background: 'none', border: 'none', color: '#666', fontSize: 16, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: '#0a0a0a', padding: 16, borderRadius: 4, marginBottom: 16, textAlign: 'center' }}>
              <div style={{ color: '#C9A96E', fontSize: 42, marginBottom: 12 }}>☎</div>
              {callState === 'ready' && (
                <>
                  <div style={{ color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Club Intelligence AI</div>
                  <div style={{ color: '#999', fontSize: 11, marginBottom: 16 }}>Experience our AI receptionist handling a guest inquiry</div>
                  <button
                    onClick={() => {
                      setCallState('calling')
                      setTimeout(() => setCallState('connected'), 1500)
                    }}
                    style={{ padding: '12px 24px', background: '#C9A96E', color: '#0a0a0a', border: 'none', fontSize: 11, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}
                  >
                    START DEMO
                  </button>
                </>
              )}
              {callState === 'calling' && (
                <div style={{ color: '#C9A96E' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Connecting...</div>
                  <div style={{ fontSize: 11, color: '#999' }}>AI is ringing...</div>
                </div>
              )}
              {callState === 'connected' && (
                <div>
                  <div style={{ fontSize: 11, color: '#999', marginBottom: 12, fontStyle: 'italic' }}>Guest: "Hi, I'd like to make a reservation for 4 people this Saturday."</div>
                  <div style={{ fontSize: 11, color: '#999', marginBottom: 12, fontStyle: 'italic' }}>AI: "Absolutely! I'd be happy to help. What time works best for your party of 4? We have availability between 8 PM and midnight."</div>
                  <div style={{ fontSize: 11, color: '#999', marginBottom: 16, fontStyle: 'italic' }}>Guest: "10 PM would be perfect. Can we get a booth?"</div>
                  <div style={{ fontSize: 11, color: '#999', marginBottom: 16, fontStyle: 'italic' }}>AI: "Perfect! I've noted your request for a booth for 4 at 10 PM Saturday. One of our team will confirm shortly. Can I get your name and number?"</div>
                  <button
                    onClick={() => {
                      setCallState('ready')
                      setVapiCallOpen(false)
                    }}
                    style={{ padding: '8px 16px', background: '#1a1a1a', color: '#C9A96E', border: '1px solid #C9A96E', fontSize: 10, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}
                  >
                    CLOSE
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for modal */}
      {vapiCallOpen && (
        <div
          onClick={() => setVapiCallOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.8)', zIndex: 999 }}
        />
      )}
    </div>
  )
}
