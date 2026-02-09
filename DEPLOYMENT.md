# FCP Digital Website - Phase 4 Deployment Guide

Complete guide to deploy FCP Digital website to Vercel production environment.

## Prerequisites

✅ **Before starting deployment, ensure you have:**
1. GitHub account (free account is fine)
2. Vercel account (free account is fine)
3. All API keys from RonOS `.env` file ready to copy
4. Stripe account with Starter, Professional, Enterprise products created
5. Custom domain (optional, can add later)

---

## Step 1: Push Project to GitHub

### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `fcpdigital-website`
3. Description: "FCP Digital - Customer-facing website and admin dashboard"
4. Choose: **Private** (to protect your code and API keys)
5. Click "Create repository"

### 1.2 Add Remote and Push Code

```bash
cd /Users/apple/Desktop/fcpdigital-website

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fcpdigital-website.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

**Verify:** Go to your GitHub repo URL and confirm all files appear.

---

## Step 2: Create Vercel Project

### 2.1 Deploy from GitHub

1. Go to https://vercel.com/new
2. Import GitHub repository: Search for `fcpdigital-website`
3. Click "Import"

### 2.2 Configure Project

**Build & Development Settings:**
- Framework: Next.js (should auto-detect)
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm ci` (default)

Click "Deploy" (this will show an error because env vars are missing - that's expected)

---

## Step 3: Add Environment Variables

### 3.1 In Vercel Dashboard

1. Go to your Vercel project → Settings → Environment Variables
2. Add each variable **for Production environment only**:

```
NEXT_PUBLIC_SUPABASE_URL=https://obkqnqlnyszswrkbohny.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<get_from_RonOS_.env>
SUPABASE_SERVICE_ROLE_KEY=<get_from_RonOS_.env>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_<your_stripe_key>
STRIPE_SECRET_KEY=sk_live_<your_stripe_key>
STRIPE_WEBHOOK_SECRET=<generate_in_next_step>
RONOS_WEBHOOK_URL=https://<your-ronos-server>.com/webhook/stripe
NEXT_PUBLIC_APP_URL=https://fcpdigital.com
```

**Where to find each value:**

| Variable | Source |
|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | RonOS `.env` → `SUPABASE_URL` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Settings → API → `anon` key |
| `SUPABASE_SERVICE_ROLE_KEY` | RonOS `.env` → `SUPABASE_SERVICE_ROLE_KEY` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe dashboard → Developers → API keys → Publishable key |
| `STRIPE_SECRET_KEY` | RonOS `.env` → `STRIPE_SECRET_KEY` |
| `STRIPE_WEBHOOK_SECRET` | Generate in Step 4.2 below |
| `RONOS_WEBHOOK_URL` | Your RonOS Flask server URL (e.g., `https://ronos.yourserver.com/webhook/stripe`) |
| `NEXT_PUBLIC_APP_URL` | Your production domain (e.g., `https://fcpdigital.com`) |

### 3.2 Redeploy After Adding Env Vars

1. Go to Deployments tab
2. Click on the failed deployment
3. Click "Redeploy" button
4. Wait for deployment to complete (should succeed now)

---

## Step 4: Configure Stripe Webhook

### 4.1 Create Webhook Endpoint

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://fcpdigital.com/api/webhooks/stripe` (use your domain once set up)
   - For testing before custom domain: `https://<vercel-project-id>.vercel.app/api/webhooks/stripe`
4. Events to send:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click "Add endpoint"

### 4.2 Get Webhook Signing Secret

1. Stripe Dashboard → Developers → Webhooks → Your endpoint
2. Click "Reveal" next to "Signing secret"
3. Copy the secret (starts with `whsec_`)
4. Add to Vercel env vars as `STRIPE_WEBHOOK_SECRET`

### 4.3 Test Webhook Locally (Optional)

Before going live, test the webhook with Stripe CLI:

```bash
# Install Stripe CLI (if not already installed)
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Start local dev server
cd /Users/apple/Desktop/fcpdigital-website
npm run dev

# In another terminal, forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# In another terminal, trigger test event
stripe trigger customer.subscription.created
```

Check your Supabase dashboard to verify client was created.

---

## Step 5: Configure Custom Domain (Optional)

### 5.1 Add Domain to Vercel

1. Vercel Dashboard → Settings → Domains
2. Enter your domain: `fcpdigital.com`
3. Click "Add"
4. Follow DNS configuration instructions

### 5.2 Update DNS Records

Update your domain registrar (GoDaddy, Namecheap, etc.) with Vercel's CNAME:
- Type: CNAME
- Name: `fcpdigital.com`
- Value: `cname.vercel.app`
- TTL: 3600

Vercel will verify DNS (can take 5-60 minutes).

### 5.3 Add www Subdomain (Optional)

1. Vercel → Settings → Domains
2. Add: `www.fcpdigital.com`
3. Point to main domain or add CNAME separately

---

## Step 6: Verify Deployment

### 6.1 Check Deployment Status

```bash
# View deployment logs
vercel logs fcpdigital-website

# Check build status in Vercel dashboard
# Deployments → Latest deployment → Logs
```

### 6.2 Test Signup Flow End-to-End

1. **Visit website:** https://fcpdigital.com (or your Vercel URL)
2. **Navigate to signup:** Click "Get Started"
3. **Fill form:**
   - Business name: "Test Company"
   - Email: your-test-email@gmail.com
   - Phone: +1-555-123-4567
   - Industry: Plumbing
   - Plan: Professional
4. **Click Subscribe** → Redirects to Stripe Checkout
5. **Enter test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/26)
   - CVC: Any 3 digits
6. **Submit payment**

### 6.3 Verify Webhook Triggered

1. **Check Vercel logs:**
   ```bash
   vercel logs fcpdigital-website --follow
   ```
   Should see: `[webhook] Received customer.subscription.created event`

2. **Check Supabase:**
   - Open Supabase dashboard
   - Query `clients` table
   - Should see new row with your test company

3. **Check Stripe:**
   - Stripe Dashboard → Customers
   - Should see customer created

4. **Check RonOS Backend:**
   - If RonOS Flask server received webhook, check logs
   - Should see `client_onboarder` skill triggered
   - Verify Twilio + Vapi provisioned

### 6.4 Test Dashboard Access

1. **Go to login:** https://fcpdigital.com/login
2. **Enter test email:** your-test-email@gmail.com
3. **Click Sign In** (mock auth - no email needed)
4. **Verify dashboard loads:**
   - See "Test Company" business name
   - See client stats and usage
   - See "Calls" and "Usage" pages work

### 6.5 Test Admin Access (Optional)

1. Grant admin access in Supabase:
   ```sql
   UPDATE auth.users
   SET raw_user_meta_data = jsonb_set(raw_user_meta_data, '{is_admin}', 'true')
   WHERE email = 'your-admin-email@example.com';
   ```

2. **Visit:** https://fcpdigital.com/admin
3. Should load if admin, otherwise redirected to login

---

## Step 7: Production Security Checklist

Before going fully live, verify:

- [ ] `.env.local` NOT committed to GitHub (check .gitignore)
- [ ] All environment variables set in Vercel (not in code)
- [ ] Stripe webhook signature validation enabled
- [ ] Supabase Row-Level Security policies configured
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Rate limiting on API routes (consider Vercel rate limiting)
- [ ] Logging enabled (Vercel logs visible)
- [ ] Error monitoring set up (optional: Sentry integration)

---

## Step 8: Monitor & Maintain

### 8.1 View Deployment Logs

```bash
# Real-time logs
vercel logs fcpdigital-website --follow

# Recent deployments
vercel list --prod
```

### 8.2 Check Application Metrics

Vercel Dashboard → Insights tab shows:
- Page load performance
- Web Vitals
- API response times
- Error rates

### 8.3 Rollback if Needed

```bash
# View previous deployments
vercel list

# Rollback to previous version
vercel rollback <deployment-url>
```

---

## Step 9: Connect RonOS Webhook (Critical for Provisioning)

### 9.1 Ensure RonOS Backend Accessible

Your RonOS Flask server must be accessible from the internet. Options:

**Option A: AWS/DigitalOcean (Recommended)**
- Deploy Flask server to EC2/Droplet
- Get public IP or domain: `https://ronos.yourserver.com`
- Add to Vercel env: `RONOS_WEBHOOK_URL=https://ronos.yourserver.com/webhook/stripe`

**Option B: Ngrok (Development Only)**
```bash
# Terminal in RonOS directory
ngrok http 5000

# Copy forwarding URL: https://xxx-xxx-xxx-xxx.ngrok.io
# Add to Vercel env: RONOS_WEBHOOK_URL=https://xxx-xxx-xxx-xxx.ngrok.io/webhook/stripe
```

### 9.2 Test RonOS Integration

1. Complete test signup (from Step 6.2)
2. Check RonOS logs:
   - Flask should log incoming webhook
   - client_onboarder skill should trigger
   - Twilio phone number + Vapi assistant should be created
3. Verify client record in Supabase has:
   - `twilio_number` populated
   - `vapi_assistant_id` populated

---

## Troubleshooting

### Deployment Failed

```bash
# Check build logs
vercel logs fcpdigital-website

# Common issues:
# - Missing env vars (see step 3)
# - Node version mismatch (Vercel uses Node 18 by default)
# - Missing dependencies (run: npm install locally first)
```

### Stripe Webhook Not Triggering

1. Check webhook URL in Stripe Dashboard
2. Verify `STRIPE_WEBHOOK_SECRET` matches Stripe signing secret
3. Check Vercel logs for webhook errors
4. Test with Stripe CLI locally first

### RonOS Not Receiving Webhook

1. Verify `RONOS_WEBHOOK_URL` is correct and accessible
2. Check RonOS Flask logs
3. Test with curl:
   ```bash
   curl -X POST https://ronos.yourserver.com/webhook/stripe -H "Content-Type: application/json" -d '{"test":"data"}'
   ```

### Dashboard Not Showing Data

1. Verify Supabase `clients` table has records
2. Check `SUPABASE_SERVICE_ROLE_KEY` is correct
3. Verify Row-Level Security policies (if enabled)
4. Check browser console for API errors

---

## Deployment Complete! 🎉

Your FCP Digital website is now live in production. Customers can:
- ✅ Discover your service on landing page
- ✅ View pricing and features
- ✅ Sign up with business information
- ✅ Pay via Stripe Checkout
- ✅ Get auto-provisioned with Twilio + Vapi
- ✅ Access their customer dashboard
- ✅ View call history and usage

Admin team can:
- ✅ View business KPIs and MRR
- ✅ Manage leads and clients
- ✅ Review security audit logs

---

## Next Steps

1. **Monitor Deployments:** Check logs regularly for errors
2. **Gather Feedback:** Share website with early users
3. **Iterate:** Add features based on feedback
4. **Scale:** Once product-market fit achieved, optimize infrastructure

---

## Support

For Vercel issues: https://vercel.com/support
For Stripe issues: https://support.stripe.com
For Supabase issues: https://supabase.com/docs

---

**Deployment Date:** [Your Date]
**Deployed By:** [Your Name]
**Production URL:** https://fcpdigital.com
