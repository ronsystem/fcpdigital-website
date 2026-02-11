import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedUser } from '@/lib/auth/server'
import { getClientByUserId } from '@/lib/queries/clients'
import { getCallsByClientId, getCallStats } from '@/lib/queries/calls'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Check for demo mode (email passed as query parameter)
    const email = req.nextUrl.searchParams.get('email')

    if (email) {
      // Demo mode - look up client by email
      const supabase = createClient()
      const { data, error } = await supabase
        .from('clients')
        .select('id')
        .eq('contact_email', email)
        .single()

      if (!error && data) {
        const limit = req.nextUrl.searchParams.get('limit')
          ? parseInt(req.nextUrl.searchParams.get('limit')!)
          : 50

        const calls = await getCallsByClientId(data.id, limit)
        const stats = await getCallStats(data.id)

        return NextResponse.json({
          calls,
          stats,
          total: calls.length,
        })
      }

      // If email doesn't match, return first client's data (demo mode fallback)
      const { data: allClients, error: allError } = await supabase
        .from('clients')
        .select('id')
        .limit(1)

      if (allError || !allClients || allClients.length === 0) {
        return NextResponse.json(
          { calls: [], stats: { total_calls: 0, total_minutes: 0, avg_duration: 0 }, total: 0 }
        )
      }

      const limit = req.nextUrl.searchParams.get('limit')
        ? parseInt(req.nextUrl.searchParams.get('limit')!)
        : 50

      const calls = await getCallsByClientId(allClients[0].id, limit)
      const stats = await getCallStats(allClients[0].id)

      return NextResponse.json({
        calls,
        stats,
        total: calls.length,
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

    const limit = req.nextUrl.searchParams.get('limit')
      ? parseInt(req.nextUrl.searchParams.get('limit')!)
      : 50

    const calls = await getCallsByClientId(client.id, limit)
    const stats = await getCallStats(client.id)

    return NextResponse.json({
      calls,
      stats,
      total: calls.length,
    })
  } catch (error) {
    console.error('Error fetching calls:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calls' },
      { status: 500 }
    )
  }
}
