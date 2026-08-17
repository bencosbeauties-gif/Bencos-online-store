BENCO'S STORE — VERCEL READY

1. Deploy this folder to Vercel.
2. In Vercel Project Settings > Environment Variables, add:
   STRIPE_SECRET_KEY = your Stripe TEST secret key (starts with sk_test_) for sandbox testing.
3. Redeploy.
4. Test checkout.
5. When ready for real payments, replace Stripe product/price IDs with LIVE-mode IDs and use STRIPE_SECRET_KEY=sk_live_...
   Never put the secret key in public/client-side files.

Shipping logic:
- United States only
- $5.99 standard shipping under $50 subtotal
- Free shipping at $50+
- 3–7 business day display estimate

This package uses the existing Stripe Sandbox price IDs created for Benco's.
