import { createClient } from '@/lib/supabase/server'
import type { Lead } from '@/types/database'

export async function getLeads(
  status?: string,
  limit = 100,
  offset = 0
): Promise<Lead[]> {
  const supabase = createClient()

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching leads:', error)
    return []
  }

  return data || []
}

export async function getLeadStats() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('leads')
    .select('status', { count: 'exact' })

  if (error) {
    console.error('Error fetching lead stats:', error)
    return {
      total: 0,
      new: 0,
      researched: 0,
      contacted: 0,
      converted: 0,
      rejected: 0,
    }
  }

  const leads = data || []
  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    researched: leads.filter(l => l.status === 'researched').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
    rejected: leads.filter(l => l.status === 'rejected').length,
  }

  return stats
}

export async function searchLeads(query: string, limit = 50): Promise<Lead[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .or(
      `business_name.ilike.%${query}%,email.ilike.%${query}%,phone.ilike.%${query}%,city.ilike.%${query}%`
    )
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error searching leads:', error)
    return []
  }

  return data || []
}
