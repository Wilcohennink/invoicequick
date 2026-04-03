# InvoiceQuick — Deploy in 5 Minutes

## Step 1: Deploy to Vercel (2 min)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `Wilcohennink/invoicequick` from GitHub
3. Leave all settings as default — **no environment variables needed**
4. Click **Deploy**

Your URL will be `invoicequick-[hash].vercel.app` (or add a custom domain in Vercel settings).

---

## Step 2: Create Stripe Payment Links (3 min)

Go to [dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links) → **Create link**

**Link 1 — Lifetime Deal**
- Amount: €59 (one-time)
- Name: "InvoiceQuick Lifetime Deal"
- Success URL: `https://your-vercel-url.vercel.app/success.html?plan=ltd`
- Copy the link: `https://buy.stripe.com/...`

**Link 2 — Pro Monthly**
- Amount: €9 (recurring / monthly)
- Name: "InvoiceQuick Pro"
- Success URL: `https://your-vercel-url.vercel.app/success.html?plan=monthly`
- Copy the link: `https://buy.stripe.com/...`

---

## Step 3: Add Links to pricing.html (1 min)

Open `pricing.html`, find lines ~162–163, and fill in your links:

```js
const PAYMENT_LINKS = {
  ltd:     'https://buy.stripe.com/YOUR_LTD_LINK_HERE',
  monthly: 'https://buy.stripe.com/YOUR_MONTHLY_LINK_HERE'
};
```

Commit and push — Vercel auto-deploys from `main`.

---

## Step 4: Launch 🚀

**Hacker News Show HN** (best traffic source for dev tools):
> Show HN: I built an invoice generator that works without signup
> https://your-vercel-url.vercel.app

Post at 9–10am PST on a weekday for maximum visibility.

**Reddit:**
- r/freelance — "Free invoice generator, no signup needed"
- r/smallbusiness
- r/webdev

---

## Revenue targets

| Day | Goal | Revenue |
|-----|------|---------|
| 1   | 20 LTD sales | €1,180 |
| 7   | 100 LTD sales | €5,900 |
| 30  | 300 LTD sales | €17,700 |

LTD capped at 500 units to create urgency.
