import { createClient } from '@/lib/supabase/server'
import type { Client } from '@/types/database'

export async function getClientByUserId(userId: string): Promise<Client | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching client:', error)
    return null
  }

  return data
}

export async function getClientById(clientId: number): Promise<Client | null> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', clientId)
    .single()

  if (error) {
    console.error('Error fetching client by ID:', error)
    return null
  }

  return data
}

export async function getAllClients(limit = 50): Promise<Client[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching clients:', error)
    return []
  }

  return data || []
}

export async function getActiveClients(): Promise<Client[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching active clients:', error)
    return []
  }

  return data || []
}
