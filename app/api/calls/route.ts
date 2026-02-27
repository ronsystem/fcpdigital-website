import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50')

    // Find business
    let businessId: string | null = null

    if (email) {
      const { data } = await supabase.from('businesses').select('id').eq('owner_email', email).single()
      if (data) businessId = data.id
    }

    if (!businessId) {
      const { data } = await supabase.from('businesses').select('id').order('created_at', { ascending: false }).limit(1).single()
      if (data) businessId = data.id
    }

    if (!businessId) {
      return NextResponse.json({ calls: [], stats: { total_calls: 0, total_minutes: 0, avg_duration: 0 } })
    }

    // Fetch calls — try client_id (uuid) match with business id
    const { data: calls } = await supabase
      .from('calls')
      .select('*')
      .eq('client_id', businessId)
      .order('created_at', { ascending: false })
      .limit(limit)

    const list = calls || []
    const totalSeconds = list.reduce((s: number, c: Record<string, unknown>) => s + ((c.duration_seconds as number) || 0), 0)
    const totalMinutes = Math.round(totalSeconds / 60)
    const avgDuration = list.length > 0 ? Math.round((totalSeconds / list.length) / 60) : 0

    return NextResponse.json({
      calls: list,
      stats: { total_calls: list.length, total_minutes: totalMinutes, avg_duration: avgDuration },
      total: list.length,
    })
  } catch (err) {
    console.error('calls route error:', err)
    return NextResponse.json({ calls: [], stats: { total_calls: 0, total_minutes: 0, avg_duration: 0 } })
  }
}
