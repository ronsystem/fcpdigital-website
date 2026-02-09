/**
 * CRITICAL: Pricing plans MUST match PLAN_CONFIGS in:
 * /Users/apple/Desktop/ronos/skills/client_onboarder/client_onboarder.py
 *
 * Changes here require updates to RonOS backend!
 */

export const PRICING_PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 249,           // Must match backend: 249.00
    priceMonthly: 249.00,
    minutes: 500,         // Must match backend: 500
    stripePriceId: 'price_starter_monthly',
    features: [
      '24/7 AI Call Answering',
      'Up to 500 minutes/month',
      'Basic Lead Capture',
      'Call Recordings',
      'Email Support',
    ],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 499,           // Must match backend: 499.00
    priceMonthly: 499.00,
    minutes: 1500,        // Must match backend: 1500
    stripePriceId: 'price_professional_monthly',
    features: [
      'Everything in Starter',
      'Up to 1,500 minutes/month',
      'Advanced Lead Qualification',
      'AI Appointment Scheduling',
      'Priority Support',
      'Analytics Dashboard',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 899,           // Must match backend: 899.00
    priceMonthly: 899.00,
    minutes: 3000,        // Must match backend: 3000 (or unlimited)
    stripePriceId: 'price_enterprise_monthly',
    features: [
      'Everything in Professional',
      'Up to 3,000 minutes/month',
      'Custom AI Personality',
      'Advanced Integrations',
      'Dedicated Account Manager',
      'Custom SLA',
    ],
  },
}

export const PRICING_PLANS_ARRAY = Object.values(PRICING_PLANS)

export const INDUSTRIES = [
  'Plumbing',
  'HVAC',
  'Electrical',
  'Dental',
  'Medical',
  'Cleaning',
  'Landscaping',
  'Other',
]

export const SERVICE_NEEDS = [
  'Emergency Repair',
  'Scheduled Maintenance',
  'Inspection',
  'Consultation',
  'Other',
]

export const CALL_URGENCY = ['low', 'medium', 'high', 'critical']
