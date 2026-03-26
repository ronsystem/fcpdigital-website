import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse Twilio's form-encoded webhook payload
    const formData = await request.formData()
    const body = (formData.get('Body') as string || '').trim().toUpperCase()
    const from = formData.get('From') as string

    // Only respond to "VIP ORA" keyword
    if (body !== 'VIP ORA') {
      // Send TwiML empty response for unrecognized messages
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?>
<Response></Response>`,
        { headers: { 'Content-Type': 'text/xml' } }
      )
    }

    const venueSlug = process.env.DEMO_VENUE_NAME || 'Ora Detroit'
    const welcomeMessage = `Welcome to ${venueSlug} VIP! 🎉 You're on the list. Expect early access to events and exclusive offers. Reply STOP to unsubscribe.`

    // Fire Telegram alert to Ron via VPS webhook
    const vpsAlertUrl = process.env.VPS_ALERT_URL
    if (vpsAlertUrl) {
      fetch(vpsAlertUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'demo_qr_optin',
          venue: venueSlug,
          name: 'QR Code Opt-In',
          phone: from,
          email: 'N/A',
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.warn('VPS alert failed:', err))
    }

    // Respond with TwiML welcome message
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${welcomeMessage}</Message>
</Response>`,
      { headers: { 'Content-Type': 'text/xml' } }
    )

  } catch (error) {
    console.error('SMS reply error:', error)
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?>
<Response></Response>`,
      { headers: { 'Content-Type': 'text/xml' } }
    )
  }
}
