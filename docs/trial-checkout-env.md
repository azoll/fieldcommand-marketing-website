# Trial checkout environment variables

Set these variables in your hosting provider for both the static site and API runtime.

## Required variables

- `APP_ORIGIN`
  - **Prod:** `https://app.fieldcommand.io`
  - **Dev:** `http://localhost:3000`
- `API_BASE_URL`
  - **Prod:** marketing site origin (for example `https://www.fieldcommand.io`)
  - **Dev:** `http://localhost:8080` (or your local static server)
- `STRIPE_PRICE_IDS`
  - JSON map for plan key to Stripe price IDs.
  - **Prod example:** `{"core":"price_live_core","control":"price_live_control","command":"price_live_command"}`
  - **Dev example:** `{"core":"price_test_core","control":"price_test_control","command":"price_test_command"}`
- `STRIPE_SECRET_KEY`
  - Stripe secret key used by `api/signup/checkout.js`.

## Runtime injection

`index.html`, `walkthrough.html`, and `who-its-for.html` expose a `window.FIELD_COMMAND_CONFIG` object.
Replace hardcoded placeholder values at deploy-time to use the environment-specific values above.
