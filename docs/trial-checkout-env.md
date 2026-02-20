# Trial checkout + Stripe webhook environment variables

To make **Start free trial** route correctly to Stripe and keep webhook delivery healthy, configure both checkout and webhook variables.

## Checkout API (`/api/signup/checkout`)

### Required

- `STRIPE_SECRET_KEY`
  - Stripe secret key used by `api/signup/checkout.js`.
- `STRIPE_PRICE_IDS`
  - JSON map from plan key to real Stripe Price IDs.
  - Prod example: `{"core":"price_live_core","control":"price_live_control","command":"price_live_command"}`
  - Dev example: `{"core":"price_test_core","control":"price_test_control","command":"price_test_command"}`
- `APP_ORIGIN`
  - Where Stripe redirects users after checkout success.
  - Prod: `https://app.fieldcommand.io`
  - Dev: `http://localhost:3000`

### Frontend runtime value

- `API_BASE_URL`
  - Must point to the host that serves `/api/signup/checkout`.
  - Prod example: `https://www.fieldcommand.io`
  - Dev example: `http://localhost:8080`

## Stripe webhook API (`/api/stripe/webhook`)

### Required

- `STRIPE_WEBHOOK_SECRET`
  - Webhook signing secret from Stripe endpoint configuration.
  - Used by `functions/api/stripe/webhook.js` to verify the `Stripe-Signature` header against the raw body.

### Optional

- `STRIPE_SECRET_KEY`
  - Not required for current webhook handling, but may be needed later if webhook handlers call Stripe APIs.
- `APP_ORIGIN`
  - Not required for current webhook handling.

## Frontend runtime injection

`index.html`, `walkthrough.html`, and `who-its-for.html` expose `window.FIELD_COMMAND_CONFIG`.
Set these at deploy time:

```js
window.FIELD_COMMAND_CONFIG = {
  apiBaseUrl: process.env.API_BASE_URL,
  appOrigin: process.env.APP_ORIGIN,
  stripePriceIds: JSON.parse(process.env.STRIPE_PRICE_IDS || '{}'),
  walkthroughVideoUrl: ''
};
```
