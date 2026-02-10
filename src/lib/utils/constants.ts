/**
 * CRITICAL: Pricing plans MUST match PLAN_CONFIGS in:
 * /Users/apple/Desktop/ronos/skills/client_onboarder/client_onboarder.py
 *
 * Changes here require updates to RonOS backend!
 */

export const PRICING_PLANS = {
  launch: {
    id: 'launch',
    name: 'Launch',
    price: 249,
    priceMonthly: 249.00,
    minutes: 500,
    stripePriceId: 'price_1SuJIDKAtfPK3Yyr9K24POD2',
    features: [
      '24/7 AI Call Answering',
      'Up to 500 minutes/month',
      'Basic Lead Capture',
      'Call Recordings',
      'Email Support',
    ],
  },
  scale: {
    id: 'scale',
    name: 'Scale',
    price: 499,
    priceMonthly: 499.00,
    minutes: 1500,
    stripePriceId: 'price_1SuJIsKAtfPK3Yyrs9nSrHYv',
    featured: true,
    features: [
      'Everything in Launch',
      'Up to 1,500 minutes/month',
      'Advanced Lead Qualification',
      'AI Appointment Scheduling',
      'Priority Support',
      'Analytics Dashboard',
    ],
  },
  dominate: {
    id: 'dominate',
    name: 'Dominate',
    price: 899,
    priceMonthly: 899.00,
    minutes: 3000,
    stripePriceId: 'price_1SzQQxKAtfPK3Yyr4LDxrf8U',
    features: [
      'Everything in Scale',
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
