import { createClient } from '@/lib/supabase/server'
import type { Call } from '@/types/database'

export async function getCallsByClientId(
  clientId: number,
  limit = 50
): Promise<Call[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching calls:', error)
    return []
  }

  return data || []
}

export async function getCallStats(clientId: number) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('calls')
    .select('duration_seconds')
    .eq('client_id', clientId)

  if (error) {
    console.error('Error fetching call stats:', error)
    return { total_calls: 0, total_minutes: 0, avg_duration: 0 }
  }

  const calls = data || []
  const totalSeconds = calls.reduce((sum, call) => sum + (call.duration_seconds || 0), 0)
  const totalMinutes = Math.round(totalSeconds / 60)
  const avgDuration = calls.length > 0 ? (totalSeconds / calls.length / 60) : 0

  return {
    total_calls: calls.length,
    total_minutes: totalMinutes,
    avg_duration: Math.round(avgDuration * 10) / 10,
  }
}

export async function getRecentCalls(clientId: number, days = 7): Promise<Call[]> {
  const supabase = createClient()

  const dateFrom = new Date()
  dateFrom.setDate(dateFrom.getDate() - days)

  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .eq('client_id', clientId)
    .gte('created_at', dateFrom.toISOString())
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching recent calls:', error)
    return []
  }

  return data || []
}

export async function searchCalls(
  clientId: number,
  query: string,
  limit = 50
): Promise<Call[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('calls')
    .select('*')
    .eq('client_id', clientId)
    .or(
      `caller_name.ilike.%${query}%,caller_phone.ilike.%${query}%,service_needed.ilike.%${query}%`
    )
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error searching calls:', error)
    return []
  }

  return data || []
}
