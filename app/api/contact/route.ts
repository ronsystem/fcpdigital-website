import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { firstName, lastName, phone, email, smsNonmarketingConsent, smsMarketingConsent } = await req.json()

    if (!phone || !email) {
      return NextResponse.json({ error: 'Phone and email are required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('contact_inquiries')
      .insert({
        first_name: firstName || null,
        last_name: lastName || null,
        phone,
        email,
        sms_nonmarketing_consent: smsNonmarketingConsent || false,
        sms_marketing_consent: smsMarketingConsent || false,
        status: 'contact_inquiry',
      })

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })

  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
