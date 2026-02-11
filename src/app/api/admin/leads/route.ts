import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, isAdmin } from '@/lib/auth/server'
import { getLeads, getLeadStats } from '@/lib/queries/leads'

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

    const status = req.nextUrl.searchParams.get('status') || undefined
    const limit = req.nextUrl.searchParams.get('limit')
      ? parseInt(req.nextUrl.searchParams.get('limit')!)
      : 100
    const offset = req.nextUrl.searchParams.get('offset')
      ? parseInt(req.nextUrl.searchParams.get('offset')!)
      : 0

    const leads = await getLeads(status, limit, offset)
    const stats = await getLeadStats()

    return NextResponse.json({
      leads,
      stats,
      total: leads.length,
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
