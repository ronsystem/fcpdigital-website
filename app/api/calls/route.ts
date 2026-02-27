import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '5')

    // First, find business by owner_email
    let businessId: string | null = null

    if (email) {
      const { data: business } = await supabase
        .from('businesses')
        .select('id')
        .eq('owner_email', email)
        .single()

      if (business) {
        businessId = business.id
      }
    }

    if (!businessId) {
      // Fallback: use first business
      const { data: firstBusiness } = await supabase
        .from('businesses')
        .select('id')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (firstBusiness) {
        businessId = firstBusiness.id
      }
    }

    if (!businessId) {
      return NextResponse.json({
        calls: [],
        stats: { total_calls: 0, total_minutes: 0, avg_duration: 0 },
      })
    }

    // Get recent calls for this business
    const { data: calls, error } = await supabase
      .from('calls')
      .select('id, caller_name, service_needed, urgency, created_at, duration_seconds')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching calls:', error)
      return NextResponse.json({
        calls: [],
        stats: { total_calls: 0, total_minutes: 0, avg_duration: 0 },
      })
    }

    // Calculate stats
    const { data: allCalls } = await supabase
      .from('calls')
      .select('duration_seconds, urgency')
      .eq('business_id', businessId)

    const totalCalls = allCalls?.length || 0
    const totalSeconds = (allCalls || []).reduce((sum: number, call: any) => sum + (call.duration_seconds || 0), 0)
    const totalMinutes = Math.round(totalSeconds / 60)
    const avgDuration = totalCalls > 0 ? Math.round(totalMinutes / totalCalls) : 0

    return NextResponse.json({
      calls: calls || [],
      stats: {
        total_calls: totalCalls,
        total_minutes: totalMinutes,
        avg_duration: avgDuration,
      },
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      calls: [],
      stats: { total_calls: 0, total_minutes: 0, avg_duration: 0 },
    })
  }
}
