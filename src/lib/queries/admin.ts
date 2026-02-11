import { createClient } from '@/lib/supabase/server'
import type { Client, AuditLog } from '@/types/database'

export async function getAllClientsAdmin(limit = 100, offset = 0): Promise<Client[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }

  return data || []
}

export async function getClientStats() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('status,monthly_fee')

  if (error) {
    console.error('Error fetching client stats:', error)
    return {
      total_clients: 0,
      active_clients: 0,
      mrr: 0,
      avg_plan_value: 0,
    }
  }

  const clients = data || []
  const activeClients = clients.filter(c => c.status === 'active')
  const mrr = activeClients.reduce((sum, c) => sum + (c.monthly_fee || 0), 0)
  const avgPlanValue = clients.length > 0 ? mrr / activeClients.length : 0

  return {
    total_clients: clients.length,
    active_clients: activeClients.length,
    mrr,
    avg_plan_value: Math.round(avgPlanValue * 100) / 100,
  }
}

export async function searchClientsAdmin(
  query: string,
  limit = 50
): Promise<Client[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .or(
      `business_name.ilike.%${query}%,contact_email.ilike.%${query}%,contact_phone.ilike.%${query}%`
    )
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error searching clients:', error)
    return []
  }

  return data || []
}

export async function getAuditLogs(limit = 100, offset = 0): Promise<AuditLog[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('audit_log')
    .select('*')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching audit logs:', error)
    return []
  }

  return data || []
}

export async function getAuditLogsByResource(
  resourceType: string,
  resourceId: string,
  limit = 50
): Promise<AuditLog[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('audit_log')
    .select('*')
    .eq('resource_type', resourceType)
    .eq('resource_id', resourceId)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching resource audit logs:', error)
    return []
  }

  return data || []
}
