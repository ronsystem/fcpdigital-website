import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAuthenticatedUser } from '@/lib/auth/server'
import { getClientByUserId } from '@/lib/queries/clients'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()

    // Check for business_id parameter (from RonOS Bridge)
    const businessId = req.nextUrl.searchParams.get('business_id')
    if (businessId) {
      // Bridge integration - query by business_id
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('business_id', businessId)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(data)
    }

    // Check for demo mode (email passed as query parameter)
    const email = req.nextUrl.searchParams.get('email')
    if (email) {
      // Demo mode - look up client by email, or return first client if no match
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('contact_email', email)
        .single()

      if (!error && data) {
        return NextResponse.json(data)
      }

      // If email doesn't match, return first client in database (demo mode)
      console.log('Email not found, returning first client')
      const { data: allClients, error: allError } = await supabase
        .from('clients')
        .select('*')
        .limit(1)

      if (allError || !allClients || allClients.length === 0) {
        console.log('No clients found in database')
        return NextResponse.json(
          { error: 'Client not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(allClients[0])
    }

    // Production mode - use Supabase auth
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

    return NextResponse.json(client)
  } catch (error) {
    console.error('Error fetching client:', error)
    return NextResponse.json(
      { error: 'Failed to fetch client' },
      { status: 500 }
    )
  }
}
