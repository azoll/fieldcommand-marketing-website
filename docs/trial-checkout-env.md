# Cloudflare Pages Stripe configuration

Configure all Stripe values in **Cloudflare Pages → Project Settings → Variables and Secrets**.
Do not store real secrets or real Stripe price IDs in this repository.

## Required for checkout function (`POST /api/signup/checkout`)

- `STRIPE_API_KEY`
- `STRIPE_PRICE_CORE_MONTHLY`
- `STRIPE_PRICE_CONTROL_MONTHLY`
- `STRIPE_PRICE_COMMAND_MONTHLY`

## Optional checkout variables (if annual billing is enabled)

- `STRIPE_PRICE_CORE_ANNUAL`
- `STRIPE_PRICE_CONTROL_ANNUAL`
- `STRIPE_PRICE_COMMAND_ANNUAL`

## Required for webhook function (`POST /api/stripe/webhook`)

- `STRIPE_WEBHOOK_SECRET`

## Required for resend invite proxy (`POST /api/signup/resend-invite`)

- `BASE44_BACKEND_URL` (Base44 backend base URL that exposes `/resendInvite`)
- `BASE44_API_KEY` (optional, but recommended)

## Endpoint summary

- Checkout: `POST /api/signup/checkout` (Pages Function)
- Resend invite proxy: `POST /api/signup/resend-invite` (Pages Function)
- Webhook: `POST /api/stripe/webhook` (Pages Function)
- Webhook health check: `GET /api/stripe/webhook` returns `ok`
