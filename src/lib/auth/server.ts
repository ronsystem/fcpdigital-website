import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function getAuthenticatedUser() {
  const supabase = createClient()

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single()

    if (error || !data) {
      return false
    }

    return data.is_admin === true
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

export function getUserIdFromHeaders() {
  const headersList = headers()
  const authHeader = headersList.get('authorization')

  if (!authHeader) {
    return null
  }

  // Extract user ID from Authorization header (e.g., "Bearer userId")
  const token = authHeader.replace('Bearer ', '')
  return token
}
