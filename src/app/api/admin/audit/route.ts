import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser, isAdmin } from '@/lib/auth/server'
import { getAuditLogs, getAuditLogsByResource } from '@/lib/queries/admin'

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

    const resourceType = req.nextUrl.searchParams.get('resourceType')
    const resourceId = req.nextUrl.searchParams.get('resourceId')
    const limit = req.nextUrl.searchParams.get('limit')
      ? parseInt(req.nextUrl.searchParams.get('limit')!)
      : 100
    const offset = req.nextUrl.searchParams.get('offset')
      ? parseInt(req.nextUrl.searchParams.get('offset')!)
      : 0

    let logs
    if (resourceType && resourceId) {
      logs = await getAuditLogsByResource(resourceType, resourceId, limit)
    } else {
      logs = await getAuditLogs(limit, offset)
    }

    return NextResponse.json({
      logs,
      total: logs.length,
    })
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch audit logs' },
      { status: 500 }
    )
  }
}
