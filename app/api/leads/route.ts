import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { data, error } = await supabase
      .from('businesses')
      .insert({
        name: body.name || 'New Lead',
        owner_email: body.owner_email,
        owner_phone: body.owner_phone,
        status: 'lead',
        timezone: body.timezone || 'America/Detroit',
      })
      .select()
      .single()

    if (error) {
      console.error('Lead insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log the plan selection separately
    console.log('New lead:', body.owner_email, '| Plan:', body.plan, '| Service:', body.service_type)

    return NextResponse.json({ success: true, id: data?.id, plan: body.plan })
  } catch (err) {
    console.error('Leads route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
