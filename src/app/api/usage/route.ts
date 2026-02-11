import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedUser } from '@/lib/auth/server'
import { getClientByUserId } from '@/lib/queries/clients'
import { getUsageStats, getMonthlyUsage } from '@/lib/queries/usage'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()

    // Check for business_id parameter (from RonOS Bridge)
    const businessId = req.nextUrl.searchParams.get('business_id')
    if (businessId) {
      // Bridge integration - look up client by business_id
      const { data, error } = await supabase
        .from('clients')
        .select('id, call_minutes_limit, call_minutes_used')
        .eq('business_id', businessId)
        .single()

      if (error || !data) {
        return NextResponse.json({
          stats: { total_calls: 0, total_minutes: 0, avg_duration: 0, remaining: 0, percentage: 0 },
          monthlyData: [],
          limit: 0,
          used: 0,
        })
      }

      const stats = await getUsageStats(data.id, data.call_minutes_limit)
      const monthlyData = await getMonthlyUsage(data.id)

      return NextResponse.json({
        stats,
        monthlyData,
        limit: data.call_minutes_limit,
        used: data.call_minutes_used,
      })
    }

    // Check for demo mode (email passed as query parameter)
    const email = req.nextUrl.searchParams.get('email')
    if (email) {
      // Demo mode - look up client by email
      const { data, error } = await supabase
        .from('clients')
        .select('id, call_minutes_limit, call_minutes_used')
        .eq('contact_email', email)
        .single()

      if (!error && data) {
        const stats = await getUsageStats(data.id, data.call_minutes_limit)
        const monthlyData = await getMonthlyUsage(data.id)

        return NextResponse.json({
          stats,
          monthlyData,
          limit: data.call_minutes_limit,
          used: data.call_minutes_used,
        })
      }

      // If email doesn't match, return first client's data (demo mode fallback)
      const { data: allClients, error: allError } = await supabase
        .from('clients')
        .select('id, call_minutes_limit, call_minutes_used')
        .limit(1)

      if (allError || !allClients || allClients.length === 0) {
        return NextResponse.json({
          stats: { total_calls: 0, total_minutes: 0, avg_duration: 0, remaining: 0, percentage: 0 },
          monthlyData: [],
          limit: 0,
          used: 0,
        })
      }

      const client = allClients[0]
      const stats = await getUsageStats(client.id, client.call_minutes_limit)
      const monthlyData = await getMonthlyUsage(client.id)

      return NextResponse.json({
        stats,
        monthlyData,
        limit: client.call_minutes_limit,
        used: client.call_minutes_used,
      })
    }

    // Production mode - would use real auth (currently not working)
    const user = await getAuthenticatedUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const client = await getClientByUserId(user.id)

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }

    const stats = await getUsageStats(client.id, client.call_minutes_limit)
    const monthlyData = await getMonthlyUsage(client.id)

    return NextResponse.json({
      stats,
      monthlyData,
      limit: client.call_minutes_limit,
      used: client.call_minutes_used,
    })
  } catch (error) {
    console.error('Error fetching usage:', error)
    return NextResponse.json(
      { error: 'Failed to fetch usage' },
      { status: 500 }
    )
  }
}
