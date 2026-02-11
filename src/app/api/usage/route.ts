import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth/server'
import { getClientByUserId } from '@/lib/queries/clients'
import { getUsageStats, getMonthlyUsage } from '@/lib/queries/usage'

export async function GET(req: NextRequest) {
  try {
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
