// Database type definitions matching Supabase schema

export type Client = {
  id: number
  business_name: string
  contact_email: string
  contact_phone: string
  plan: 'launch' | 'scale' | 'dominate'
  monthly_fee: number
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  twilio_number: string | null
  vapi_assistant_id: string | null
  status: 'active' | 'paused' | 'cancelled' | 'trial'
  call_minutes_used: number
  call_minutes_limit: number
  created_at: string
  updated_at: string
  user_id: string
}

export type Call = {
  id: number
  client_id: number
  caller_name: string | null
  caller_phone: string | null
  service_needed: string | null
  urgency: 'low' | 'medium' | 'high' | 'urgent' | null
  duration_seconds: number
  recording_url: string | null
  transcript: string | null
  created_at: string
  metadata: Record<string, any> | null
}

export type UsageTracking = {
  id: number
  client_id: number
  date: string
  calls_count: number
  call_minutes: number
  emails_sent: number
  created_at: string
}

export type Lead = {
  id: number
  business_name: string
  website: string | null
  phone: string | null
  email: string | null
  industry: string | null
  address: string | null
  city: string | null
  state: string | null
  zip: string | null
  score: number
  status: 'new' | 'researched' | 'contacted' | 'converted' | 'rejected'
  research_data: Record<string, any> | null
  created_at: string
  updated_at: string
  created_by: string | null
}

export type AuditLog = {
  id: number
  user_id: string | null
  user_type: 'admin' | 'client' | 'system'
  action: string
  resource_type: string
  resource_id: string | null
  ip_address: string | null
  user_agent: string | null
  success: boolean
  error_message: string | null
  metadata: Record<string, any> | null
  created_at: string
}

export type CallStats = {
  total_calls: number
  total_minutes: number
  avg_duration: number
}

export type UsageStats = {
  today_calls: number
  today_minutes: number
  this_month_calls: number
  this_month_minutes: number
  percentage_used: number
}
