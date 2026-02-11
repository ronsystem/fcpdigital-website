import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, isAdmin } from '@/lib/auth/server'
import { getAllClientsAdmin, getClientStats } from '@/lib/queries/admin'

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthenticatedUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const adminCheck = await isAdmin(user.id)
    if (!adminCheck) {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    const limit = req.nextUrl.searchParams.get('limit')
      ? parseInt(req.nextUrl.searchParams.get('limit')!)
      : 100
    const offset = req.nextUrl.searchParams.get('offset')
      ? parseInt(req.nextUrl.searchParams.get('offset')!)
      : 0

    const clients = await getAllClientsAdmin(limit, offset)
    const stats = await getClientStats()

    return NextResponse.json({
      clients,
      stats,
      total: clients.length,
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    )
  }
}
