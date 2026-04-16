import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')
    const businessId = request.nextUrl.searchParams.get('business_id')

    let data: Record<string, unknown> | null = null

    if (businessId) {
      const res = await supabase.from('businesses').select('*').eq('id', businessId).single()
      data = res.data
    } else if (email) {
      const res = await supabase.from('businesses').select('*').eq('owner_email', email).single()
      if (!res.data) {
        const fallback = await supabase.from('businesses').select('*').order('created_at', { ascending: false }).limit(1).single()
        data = fallback.data
      } else {
        data = res.data
      }
    } else {
      const res = await supabase.from('businesses').select('*').order('created_at', { ascending: false }).limit(1).single()
      data = res.data
    }

    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    // Get Twilio number
    const tw = await supabase.from('twilio_accounts').select('phone_number').eq('business_id', data.id).single()

    // Map to portal-compatible shape
    const client = {
      id: data.id,
      name: data.name,
      business_name: data.name,
      status: data.status,
      owner_email: data.owner_email,
      owner_phone: data.owner_phone,
      phone_number: data.phone_number,
      twilio_number: tw.data?.phone_number || data.phone_number,
      stripe_customer_id: data.stripe_customer_id,
      plan: 'growth',
      monthly_fee: 199,
      call_minutes_limit: 750,
      call_minutes_used: 0,
    }

    return NextResponse.json(client)
  } catch (err) {
    console.error('clients route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
