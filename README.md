# FCP Digital Customer-Facing Website

AI-powered 24/7 call answering service for service businesses.

## Getting Started

### Prerequisites
- Node.js 18+ (install from https://nodejs.org)
- npm or yarn

### Installation

```bash
# Copy environment template
cp .env.example .env.local

# Fill in .env.local with actual values from:
# - Supabase dashboard (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
# - Stripe dashboard (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET)
# - RonOS backend URL (RONOS_WEBHOOK_URL)

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit http://localhost:3000 to see the application.

## Project Structure

```
src/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   │   ├── webhooks/stripe/      # Stripe webhook (CRITICAL)
│   │   └── checkout/             # Create checkout session
│   ├── signup/                   # Customer signup form
│   ├── login/                    # Authentication
│   ├── pricing/                  # Pricing page
│   ├── dashboard/                # Client dashboard (protected)
│   └── admin/                    # Admin dashboard (protected)
├── components/                   # Reusable React components
├── lib/
│   ├── supabase/                # Supabase client setup
│   ├── stripe/                  # Stripe utilities
│   └── utils/                   # Helper functions
└── types/                        # TypeScript type definitions
```

## Critical Files

### 1. Stripe Webhook Handler
**File:** `src/app/api/webhooks/stripe/route.ts`

This is the integration point between Stripe payments and RonOS backend provisioning:
- Validates Stripe webhook signature
- Creates client record in Supabase
- Triggers RonOS `client_onboarder` skill via HTTP

**IMPORTANT:** Update `RONOS_WEBHOOK_URL` in `.env.local` to point to your RonOS Flask server.

### 2. Pricing Constants
**File:** `src/lib/utils/constants.ts`

**CRITICAL:** Prices MUST match the backend PLAN_CONFIGS in:
`/Users/apple/Desktop/ronos/skills/client_onboarder/client_onboarder.py`

- Starter: $249/month, 500 minutes
- Professional: $499/month, 1500 minutes
- Enterprise: $899/month, 3000 minutes

If you change pricing, update both files!

## Environment Variables

Create `.env.local` with these values:

```env
# Supabase (from https://supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe (from https://stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# App URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000

# RonOS Backend
RONOS_WEBHOOK_URL=http://localhost:5000/webhook/stripe
```

## Development

### Running the development server
```bash
npm run dev
```

### Building for production
```bash
npm run build
npm start
```

### Testing Stripe Webhooks Locally

```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# In another terminal, trigger test event:
stripe trigger customer.subscription.created
```

## Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Configure Environment Variables in Vercel

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add all variables from `.env.local`
3. Redeploy

### Configure Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `customer.subscription.created`, `customer.subscription.deleted`, `invoice.payment_failed`
4. Copy webhook signing secret → Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

## Architecture

### Signup Flow

1. Customer fills form at `/signup`
2. Selects plan (Starter/Professional/Enterprise)
3. Clicks "Subscribe" → Creates Stripe Checkout session
4. Redirected to Stripe payment form
5. Enters card details and completes payment
6. Stripe sends webhook to `POST /api/webhooks/stripe`
7. Webhook handler:
   - Creates client record in Supabase `clients` table
   - Sends HTTP request to RonOS `client_onboarder` skill
8. RonOS provisioning:
   - Assigns Twilio phone number
   - Creates Vapi AI assistant
   - Sends welcome email via SendGrid
   - Updates client record with phone and assistant IDs
9. User redirected to dashboard → sees assigned phone number

### Database Integration

The website reads from Supabase tables populated by RonOS skills:

- **clients** - Paying customers (created by webhook)
- **calls** - Inbound call records (populated by usage_monitor skill)
- **usage_tracking** - Daily usage metrics (populated by usage_monitor skill)
- **leads** - Business prospects (populated by lead_scraper skill)
- **audit_log** - System audit trail (populated by all skills)

## Phase 1: MVP (Week 1)

✅ Landing page
✅ Pricing page
✅ Signup flow
✅ Stripe Checkout integration
✅ Stripe webhook handler
✅ RonOS integration

**Next:** Dashboard pages (Phase 2)

## Troubleshooting

### Webhook not receiving events
- Check Stripe webhook endpoint is public (not localhost)
- Verify webhook signing secret is correct
- Check RonOS server is running

### Stripe checkout not loading
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is correct
- Check browser console for errors

### Client not created in Supabase
- Check Supabase credentials in `.env.local`
- Verify Row-Level Security policies allow inserts

## Contact & Support

For questions about the FCP Digital system:
- Website questions: See this README
- Backend/skill questions: See `/Users/apple/Desktop/ronos` documentation
- Stripe issues: https://stripe.com/docs
- Supabase issues: https://supabase.com/docs
