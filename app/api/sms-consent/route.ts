import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, owner_email, owner_phone } = body

    // Validate required fields
    if (!owner_email || !owner_phone) {
      return NextResponse.json(
        { error: 'Email and phone are required' },
        { status: 400 }
      )
    }

    // Create Supabase client with service role key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!serviceRoleKey) {
      console.error('SUPABASE_SERVICE_ROLE_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // Upsert to businesses table on owner_email
    const { data, error } = await supabase
      .from('businesses')
      .upsert(
        {
          name: name || 'SMS Consent Opt-in',
          owner_email,
          owner_phone,
          status: 'sms_opt_in',
        },
        { onConflict: 'owner_email' }
      )
      .select()
      .single()

    if (error) {
      console.error('SMS consent upsert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('SMS consent recorded:', owner_email, owner_phone)

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('SMS consent route error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
