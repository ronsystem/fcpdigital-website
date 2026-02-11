import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/lib/auth/server'
import { getClientByUserId } from '@/lib/queries/clients'
import { getCallsByClientId, getCallStats } from '@/lib/queries/calls'

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
