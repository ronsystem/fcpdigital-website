import { createClient } from '@/lib/supabase/server'

export interface BusinessClient {
  id: string
  business_name: string
  name: string
  status: string
  owner_email?: string
  owner_phone?: string
  phone_number?: string
  stripe_customer_id?: string
  created_at: string
  timezone?: string
  twilio_number?: string
  plan?: string
  monthly_fee?: number
  call_minutes_limit?: number
  call_minutes_used?: number
  contact_email?: string
  contact_phone?: string
}

export async function getBusinessByEmail(email: string): Promise<BusinessClient | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('owner_email', email)
    .single()

  if (error || !data) {
    const { data: firstBusiness } = await supabase
      .from('businesses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
    if (!firstBusiness) return null
    return await enrichBusinessData(firstBusiness)
  }
  return await enrichBusinessData(data)
}

export async function getBusinessById(id: string): Promise<BusinessClient | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) return null
  return await enrichBusinessData(data)
}

async function enrichBusinessData(business: Record<string, unknown>): Promise<BusinessClient> {
  const supabase = createClient()
  
  const { data: twilioData } = await supabase
    .from('twilio_accounts')
    .select('phone_number')
    .eq('business_id', business.id)
    .eq('status', 'active')
    .single()

  const { data: subData } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('business_id', business.id)
    .eq('status', 'active')
    .single()

  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  const { data: usageData } = await supabase
    .from('usage_tracking')
    .select('call_minutes')
    .eq('business_id', business.id)
    .gte('date', startOfMonth.toISOString().split('T')[0])

  const minutesUsed = (usageData ?? []).reduce(
    (sum: number, row: Record<string, unknown>) => sum + ((row.call_minutes as number) ?? 0),
    0
  )

  const planLimits: Record<string, number> = {
    launch: 500,
    starter: 500,
    scale: 1500,
    professional: 1500,
    dominate: 3000,
    enterprise: 3000,
  }

  const planLimitsFees: Record<string, number> = {
    launch: 249,
    starter: 249,
    scale: 499,
    professional: 499,
    dominate: 899,
    enterprise: 899,
  }

  const planName = (subData?.plan_name ?? subData?.plan ?? 'scale') as string
  const planLower = planName.toLowerCase()

  return {
    id: business.id as string,
    name: business.name as string,
    business_name: business.name as string,
    status: (business.status as string) ?? 'active',
    owner_email: business.owner_email as string | undefined,
    owner_phone: business.owner_phone as string | undefined,
    phone_number: business.phone_number as string | undefined,
    stripe_customer_id: business.stripe_customer_id as string | undefined,
    created_at: business.created_at as string,
    timezone: (business.timezone as string) ?? 'America/Detroit',
    twilio_number: twilioData?.phone_number ?? undefined,
    plan: planLower,
    monthly_fee: planLimitsFees[planLower] ?? 499,
    call_minutes_limit: planLimits[planLower] ?? 1500,
    call_minutes_used: minutesUsed,
    contact_email: business.owner_email as string | undefined,
    contact_phone: business.owner_phone as string | undefined,
  }
}
