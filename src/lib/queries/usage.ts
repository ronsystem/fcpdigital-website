import { createClient } from '@/lib/supabase/server'
import type { UsageTracking, UsageStats } from '@/types/database'

export async function getUsageByDateRange(
  clientId: number,
  fromDate: Date,
  toDate: Date
): Promise<UsageTracking[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('usage_tracking')
    .select('*')
    .eq('client_id', clientId)
    .gte('date', fromDate.toISOString().split('T')[0])
    .lte('date', toDate.toISOString().split('T')[0])
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching usage:', error)
    return []
  }

  return data || []
}

export async function getMonthlyUsage(
  clientId: number,
  month?: Date
): Promise<UsageTracking[]> {
  const supabase = createClient()
  const targetDate = month || new Date()

  const firstDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1)
  const lastDay = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0)

  const { data, error } = await supabase
    .from('usage_tracking')
    .select('*')
    .eq('client_id', clientId)
    .gte('date', firstDay.toISOString().split('T')[0])
    .lte('date', lastDay.toISOString().split('T')[0])
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching monthly usage:', error)
    return []
  }

  return data || []
}

export async function getTodayUsage(clientId: number): Promise<UsageTracking | null> {
  const supabase = createClient()

  const today = new Date().toISOString().split('T')[0]

  const { data, error } = await supabase
    .from('usage_tracking')
    .select('*')
    .eq('client_id', clientId)
    .eq('date', today)
    .single()

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching today usage:', error)
  }

  return data || null
}

export async function getUsageStats(
  clientId: number,
  minutesLimit: number
): Promise<UsageStats> {
  const supabase = createClient()

  // Get today's usage
  const today = new Date().toISOString().split('T')[0]
  const { data: todayData, error: todayError } = await supabase
    .from('usage_tracking')
    .select('calls_count,call_minutes')
    .eq('client_id', clientId)
    .eq('date', today)
    .single()

  if (todayError && todayError.code !== 'PGRST116') {
    console.error('Error fetching today usage:', todayError)
  }

  // Get this month's usage
  const firstDay = new Date()
  firstDay.setDate(1)
  const lastDay = new Date()

  const { data: monthData, error: monthError } = await supabase
    .from('usage_tracking')
    .select('calls_count,call_minutes')
    .eq('client_id', clientId)
    .gte('date', firstDay.toISOString().split('T')[0])
    .lte('date', lastDay.toISOString().split('T')[0])

  if (monthError) {
    console.error('Error fetching monthly usage:', monthError)
  }

  const todayStats = todayData || { calls_count: 0, call_minutes: 0 }
  const monthStats = (monthData || []).reduce(
    (acc, row) => ({
      calls_count: acc.calls_count + (row.calls_count || 0),
      call_minutes: acc.call_minutes + (row.call_minutes || 0),
    }),
    { calls_count: 0, call_minutes: 0 }
  )

  return {
    today_calls: todayStats.calls_count || 0,
    today_minutes: todayStats.call_minutes || 0,
    this_month_calls: monthStats.calls_count,
    this_month_minutes: monthStats.call_minutes,
    percentage_used: Math.round((monthStats.call_minutes / minutesLimit) * 100),
  }
}
