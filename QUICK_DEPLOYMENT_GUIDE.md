# 🚀 FCP Digital - Quick Deployment Guide (9 Steps, ~30 Minutes)

## Current Status
✅ **All 13 pages built and tested**
✅ **Production build verified**
✅ **Ready for Vercel deployment**

---

## STEP 1: Create GitHub Repository (2 min)
```bash
# Go to https://github.com/new
# - Name: fcpdigital-website
# - Visibility: Private
# - Click: Create repository
# Copy your repository URL (you'll need it next)
```

---

## STEP 2: Push Code to GitHub (2 min)
```bash
cd /Users/apple/Desktop/fcpdigital-website

# Replace YOUR_USERNAME below
git remote add origin https://github.com/YOUR_USERNAME/fcpdigital-website.git
git branch -M main
git push -u origin main
```

**Verify:** Visit your GitHub repo URL, confirm all files appear

---

## STEP 3: Create Vercel Project (2 min)
1. Go to https://vercel.com/new
2. Click "Import GitHub Repository"
3. Search for `fcpdigital-website`
4. Click "Import"
5. *(Build will fail - that's expected, we need env vars)*

---

## STEP 4: Get Your API Keys Ready (5 min)

Open these in your browser (don't close yet):
- [ ] RonOS `.env` file: `/Users/apple/Desktop/ronos/.env`
- [ ] Supabase: https://app.supabase.com → Select your project → Settings → API
- [ ] Stripe: https://dashboard.stripe.com → Developers → API keys

**You need to copy:**
```
From RonOS .env:
├─ SUPABASE_SERVICE_ROLE_KEY=eyJ...
├─ STRIPE_SECRET_KEY=sk_live_...
└─ (Find the long base64-encoded values)

From Supabase Dashboard:
├─ NEXT_PUBLIC_SUPABASE_ANON_KEY (under "anon")
└─ (Usually starts with "eyJ...")

From Stripe:
├─ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (starts with pk_live_)
└─ (You'll get STRIPE_WEBHOOK_SECRET later)
```

---

## STEP 5: Add Environment Variables to Vercel (3 min)

In Vercel Dashboard for your fcpdigital-website project:
1. Click → **Settings**
2. Click → **Environment Variables**
3. Click → **Add Environment Variables** (make sure: **Production** is selected)

Add these 8 variables:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://obkqnqlnyszswrkbohny.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(Paste from Supabase)* |
| `SUPABASE_SERVICE_ROLE_KEY` | *(Paste from RonOS .env)* |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | *(Paste from Stripe)* |
| `STRIPE_SECRET_KEY` | *(Paste from RonOS .env or Stripe)* |
| `STRIPE_WEBHOOK_SECRET` | `whsec_placeholder` *(will update in Step 6)* |
| `RONOS_WEBHOOK_URL` | `https://your-ronos-server.com/webhook/stripe` |
| `NEXT_PUBLIC_APP_URL` | `https://fcpdigital-website.vercel.app` |

---

## STEP 6: Configure Stripe Webhook (3 min)

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. **Endpoint URL:** Copy from Vercel → Deployments → Your URL
   ```
   https://fcpdigital-website.vercel.app/api/webhooks/stripe
   ```
   *(Later change to `https://fcpdigital.com/api/webhooks/stripe` after domain setup)*

4. **Select events:**
   - ✅ `customer.subscription.created`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_failed`

5. Click **Add endpoint**
6. Click your endpoint → Click **Reveal** next to "Signing secret"
7. Copy the secret (starts with `whsec_`)
8. Go back to Vercel → Settings → Environment Variables
9. Update `STRIPE_WEBHOOK_SECRET` with the value you just copied

---

## STEP 7: Redeploy on Vercel (2 min)

1. Vercel Dashboard → **Deployments**
2. Click the **failed** deployment
3. Click **Redeploy** button
4. Wait for build to complete (should succeed now)

---

## STEP 8: Test Signup Flow (5 min)

1. **Open:** `https://fcpdigital-website.vercel.app/`
2. **Click:** "Get Started" button
3. **Fill form:**
   - Business Name: "Test Company"
   - Email: your-test-email@gmail.com
   - Phone: +1-555-123-4567
   - Industry: Plumbing
   - Plan: Professional
4. **Click:** "Subscribe"
5. **Stripe Checkout appears** → Enter test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/26`
   - CVC: `123`
6. **Click:** "Pay"
7. **Redirects to dashboard** → Success! ✅

---

## STEP 9: Verify Everything Works (5 min)

### ✅ Check Stripe
- Stripe Dashboard → **Customers**
- Should see "Test Company" as a customer

### ✅ Check Supabase
- Supabase Dashboard → **clients** table
- Should see new row with your test company

### ✅ Check Vercel Logs
```bash
vercel logs fcpdigital-website --follow
```
Should show: `[webhook] Received customer.subscription.created event`

### ✅ Check RonOS Backend
- RonOS Flask server logs
- Should show: `client_onboarder skill triggered`
- Verify: Twilio phone number created
- Verify: Vapi AI assistant created

---

## 🎉 DEPLOYMENT COMPLETE!

Your FCP Digital website is now live in production.

**What your customers can do:**
- ✅ View landing page
- ✅ Sign up with business info
- ✅ Pay via Stripe
- ✅ Access their dashboard
- ✅ View calls and usage

**What you can do:**
- ✅ View admin dashboard
- ✅ Manage leads and clients
- ✅ Monitor revenue (MRR)
- ✅ Review security logs

---

## Optional: Add Custom Domain

Once you're happy with the Vercel deployment:

1. **Buy domain:** fcpdigital.com (GoDaddy, Namecheap, etc.)
2. **Vercel:** Settings → Domains → Add `fcpdigital.com`
3. **Registrar:** Update DNS CNAME to `cname.vercel.app`
4. **Stripe:** Update webhook URL to `https://fcpdigital.com/api/webhooks/stripe`
5. **Vercel:** Update `NEXT_PUBLIC_APP_URL` to `https://fcpdigital.com`

*(Takes 5-60 minutes for DNS propagation)*

---

## Troubleshooting (if needed)

| Problem | Solution |
|---------|----------|
| Build fails | Check all 8 env vars are added in Vercel |
| Webhook errors | Verify `STRIPE_WEBHOOK_SECRET` matches Stripe |
| RonOS not triggered | Check `RONOS_WEBHOOK_URL` is correct and accessible |
| Dashboard empty | Verify Supabase credentials are correct |

See `DEPLOYMENT.md` for detailed troubleshooting.

---

## Key URLs for Reference

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Supabase Dashboard:** https://app.supabase.com
- **Your Website:** https://fcpdigital-website.vercel.app
- **GitHub Repo:** https://github.com/YOUR_USERNAME/fcpdigital-website

---

## Questions?

- Full deployment guide: `DEPLOYMENT.md`
- Phase 4 summary: `PHASE_4_SUMMARY.md`
- Project overview: `README.md`

---

**Time to Deploy:** 30 minutes ⏱️
**Difficulty:** Easy ✅
**Risk Level:** Low (no production data yet) ✅

**You've got this! 🚀**
