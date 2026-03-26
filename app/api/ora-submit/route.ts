import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, phone, email } = await request.json()

    // Validate inputs
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get Twilio credentials from environment
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilioNumber = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !twilioNumber) {
      // Log warning but don't fail the request - form still submits
      console.warn('Twilio credentials not configured. SMS sending disabled.')
      return NextResponse.json(
        { success: true, message: 'Form submitted but SMS disabled' },
        { status: 200 }
      )
    }

    // Send confirmation SMS to guest
    const confirmationMessage = `Welcome to Ora Detroit VIP list! 🎉 You're on the list. Expect early access to events and exclusive offers. Reply STOP to unsubscribe.`

    await sendTwilioSMS(accountSid, authToken, twilioNumber, phone, confirmationMessage)

    // Send alert SMS to Tay's phone
    const taysNumber = process.env.TAY_PHONE_NUMBER || '+1313327317 0'
    const alertMessage = `New Ora Detroit VIP subscriber: ${name} (${phone})`

    await sendTwilioSMS(accountSid, authToken, twilioNumber, taysNumber, alertMessage)

    return NextResponse.json(
      { success: true, message: 'Form submitted and SMS sent' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing form submission:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
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

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
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
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Twilio API error: ${error}`)
  }
}
