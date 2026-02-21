# Cloudflare Pages Stripe configuration

Configure all Stripe values in **Cloudflare Pages → Project Settings → Variables and Secrets**.
Do not store real secrets or real Stripe price IDs in this repository.

## Required for checkout function (`POST /api/signup/checkout`)

- `APP_ORIGIN`
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

## Endpoint summary

- Checkout: `POST /api/signup/checkout` (Pages Function)
- Webhook: `POST /api/stripe/webhook` (Pages Function)
- Webhook health check: `GET /api/stripe/webhook` returns `ok`
