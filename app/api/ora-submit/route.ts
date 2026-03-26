import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email } = await request.json()

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER
    const venueSlug = process.env.DEMO_VENUE_NAME || 'Ora Detroit'

    if (!accountSid || !authToken || !twilioNumber) {
      console.warn('Twilio credentials not configured.')
      return NextResponse.json(
        { success: true, message: 'Form submitted (SMS disabled)' },
        { status: 200 }
      )
    }

    // Send welcome SMS to guest only — no data saved, no DB writes
    const firstName = name.split(' ')[0]
    const welcomeMessage = `Welcome to ${venueSlug} VIP, ${firstName}! 🎉 You're on the list. Expect early access to events and exclusive offers. Reply STOP to unsubscribe.`

    await sendTwilioSMS(accountSid, authToken, twilioNumber, phone, welcomeMessage)

    // Fire Telegram alert to Ron via OpenClaw webhook
    // This is handled by the VPS notification endpoint
    const vpsAlertUrl = process.env.VPS_ALERT_URL
    if (vpsAlertUrl) {
      fetch(vpsAlertUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'demo_optin',
          venue: venueSlug,
          name,
          phone,
          email,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.warn('VPS alert failed:', err))
    }

    // NOTE: No Supabase writes. No data persistence.
    // This is a demo only. Submissions are ephemeral.

    return NextResponse.json(
      { success: true, message: 'Form submitted and SMS sent' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing form submission:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: 'Failed to process submission', details: errorMessage },
      { status: 500 }
    )
  }
}

async function sendTwilioSMS(
  accountSid: string,
  authToken: string,
  fromNumber: string,
  toNumber: string,
  message: string
): Promise<void> {
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: toNumber,
        Body: message,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Twilio API error: ${error}`)
  }
}
