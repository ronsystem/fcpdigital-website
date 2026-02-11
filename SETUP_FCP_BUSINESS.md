# FCP Digital Business Account Setup

One-time setup to connect your real Twilio/Vapi to the dashboard.

## Step 1: Get Your Info

Gather these 3 values:
- **Twilio number:** From Twilio Console (e.g., `+1-415-555-1234`)
- **Vapi assistant ID:** From Vapi Dashboard (e.g., `asst_xxxxx`)
- **Supabase user ID:** Create user in Supabase Auth > Users, copy the UUID

## Step 2: Create Database Tables (One Time Only)

Go to **Supabase Dashboard → SQL Editor → New Query** and paste this to create the required tables:

```sql
-- Create clients table
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL,
  contact_email TEXT,
  contact_phone TEXT,
  plan TEXT NOT NULL,
  monthly_fee DECIMAL(10,2) DEFAULT 0,
  call_minutes_limit INTEGER DEFAULT 500,
  call_minutes_used INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  twilio_number TEXT,
  vapi_assistant_id TEXT,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create calls table
CREATE TABLE IF NOT EXISTS public.calls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  caller_name TEXT,
  caller_phone TEXT,
  service_needed TEXT,
  urgency TEXT,
  duration_seconds INTEGER DEFAULT 0,
  transcript TEXT,
  recording_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create usage_tracking table
CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  calls_count INTEGER DEFAULT 0,
  call_minutes INTEGER DEFAULT 0,
  emails_sent INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(client_id, date)
);

-- Create audit_log table
CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_type TEXT,
  action TEXT,
  resource_type TEXT,
  resource_id TEXT,
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_calls_client_id ON public.calls(client_id);
CREATE INDEX IF NOT EXISTS idx_calls_created_at ON public.calls(created_at);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_client_id ON public.usage_tracking(client_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_date ON public.usage_tracking(date);
```

Click **Run** to execute.

## Step 3: Insert Your Business Account

Go to **Supabase Dashboard → SQL Editor → New Query** (same place, new query) and paste:

```sql
INSERT INTO public.clients (
  business_name,
  contact_email,
  contact_phone,
  plan,
  monthly_fee,
  call_minutes_limit,
  status,
  twilio_number,
  vapi_assistant_id,
  user_id
) VALUES (
  'FCP Digital',
  'your-email@fcpdigital.com',
  '+1-555-0000',
  'professional',
  0,
  999999,
  'active',
  '+1-415-555-XXXX',  -- REPLACE: Your Twilio number (+1 (313) 327 3170)
  'YOUR_VAPI_ID',     -- REPLACE: Your Vapi assistant ID (229888ff-6ed3-4259-8ae5-ad51e114ff71)
  'YOUR_USER_ID'      -- REPLACE: Your Supabase user ID (2b0e91c9-2e78-4088-852c-05fd3a9031bd)
);
```

Replace the 3 values with your credentials and click **Run**.

## Step 4: Configure Vapi Webhook

1. Go to **Vapi Dashboard → Your Assistant** (229888ff-6ed3-4259-8ae5-ad51e114ff71)
2. Find **Webhook Settings**
3. Set **Call End Webhook** to:
   ```
   http://localhost:3000/api/calls/webhook
   ```
   (Use production URL when deployed: `https://fcpdigital.com/api/calls/webhook`)
4. Save

## Done

Now every call flows: Vapi → Webhook → Dashboard

Calls appear automatically in `/dashboard/calls` with transcripts and usage stats.
