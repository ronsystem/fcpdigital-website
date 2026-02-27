import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')
    const businessId = request.nextUrl.searchParams.get('business_id')

    let query = supabase.from('businesses').select(`
      id,
      name,
      status,
      owner_email,
      owner_phone,
      phone_number,
      stripe_customer_id,
      created_at,
      timezone
    `)

    // Filter by email or business_id
    if (email) {
      query = query.eq('owner_email', email)
    } else if (businessId) {
      query = query.eq('id', businessId)
    }

    const { data: business, error: businessError } = await query.single()

    if (businessError || !business) {
      // Fallback: return first business in DB
      const { data: firstBusiness, error: fallbackError } = await supabase
        .from('businesses')
        .select('id, name, status, owner_email, owner_phone, phone_number, stripe_customer_id, created_at, timezone')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (fallbackError || !firstBusiness) {
        return NextResponse.json({ error: 'No business found' }, { status: 404 })
      }

      return NextResponse.json(await enrichBusinessData(firstBusiness))
    }

    return NextResponse.json(await enrichBusinessData(business))
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function enrichBusinessData(business: any) {
  // Get Twilio number
  const { data: twilio } = await supabase
    .from('twilio_accounts')
    .select('phone_number')
    .eq('business_id', business.id)
    .eq('status', 'active')
    .single()

  // Get subscription/plan
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan_name, plan, status')
    .eq('business_id', business.id)
    .eq('status', 'active')
    .single()

  // Get usage for current month
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  const dateString = startOfMonth.toISOString().split('T')[0]

  const { data: usage } = await supabase
    .from('usage_tracking')
    .select('call_minutes')
    .eq('business_id', business.id)
    .gte('date', dateString)

  const totalMinutes = (usage || []).reduce((sum: number, row: any) => sum + (row.call_minutes || 0), 0)

  const planLimits: Record<string, number> = {
    launch: 500, starter: 500, scale: 1500, professional: 1500,
    dominate: 3000, enterprise: 3000,
  }
  const planFees: Record<string, number> = {
    launch: 249, starter: 249, scale: 499, professional: 499,
    dominate: 899, enterprise: 899,
  }

  const plan = (subscription?.plan_name || subscription?.plan || 'scale').toLowerCase()

  return {
    id: business.id,
    name: business.name,
    status: business.status,
    owner_email: business.owner_email,
    owner_phone: business.owner_phone,
    phone_number: business.phone_number,
    stripe_customer_id: business.stripe_customer_id,
    created_at: business.created_at,
    timezone: business.timezone,
    twilio_number: twilio?.phone_number,
    plan,
    monthly_fee: planFees[plan] || 499,
    call_minutes_limit: planLimits[plan] || 1500,
    call_minutes_used: totalMinutes,
  }
}
