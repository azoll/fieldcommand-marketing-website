const TRIAL_DAYS = 7;
const APP_SUCCESS_PATH = '/finalize-signup?session_id={CHECKOUT_SESSION_ID}';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function getPriceIdForPlan(env, plan, billingCycle = 'monthly') {
  const normalizedPlan = String(plan || '').toLowerCase();
  const normalizedCycle = String(billingCycle || 'monthly').toLowerCase();

  const priceVars = {
    core: {
      monthly: env.STRIPE_PRICE_CORE_MONTHLY,
      annual: env.STRIPE_PRICE_CORE_ANNUAL || env.STRIPE_PRICE_CORE_YEARLY
    },
    control: {
      monthly: env.STRIPE_PRICE_CONTROL_MONTHLY,
      annual: env.STRIPE_PRICE_CONTROL_ANNUAL || env.STRIPE_PRICE_CONTROL_YEARLY
    },
    command: {
      monthly: env.STRIPE_PRICE_COMMAND_MONTHLY,
      annual: env.STRIPE_PRICE_COMMAND_ANNUAL || env.STRIPE_PRICE_COMMAND_YEARLY
    }
  };

  const planPrices = priceVars[normalizedPlan];
  if (!planPrices) return '';

  if (normalizedCycle === 'annual' || normalizedCycle === 'yearly') {
    return planPrices.annual || '';
  }

  return planPrices.monthly || '';
}

export async function onRequestPost(context) {
  const stripeApiKey = context.env.STRIPE_API_KEY;
  const appOrigin = context.env.APP_ORIGIN || 'https://app.fieldcommand.io';

  if (!stripeApiKey) {
    return json({ error: 'Server is missing STRIPE_API_KEY.' }, 500);
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'Invalid JSON payload.' }, 400);
  }

  const plan = body?.plan || 'control';
  const billingCycle = body?.billingCycle || 'monthly';
  const customerEmail = body?.email;

  const stripePriceId = getPriceIdForPlan(context.env, plan, billingCycle);
  if (!stripePriceId) {
    return json({ error: 'No Stripe price configured for selected plan.' }, 400);
  }

  const successUrl = `${appOrigin.replace(/\/$/, '')}${APP_SUCCESS_PATH}`;
  const cancelUrl = `${new URL(context.request.url).origin}/#pricing`;

  const payload = new URLSearchParams({
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    'line_items[0][price]': stripePriceId,
    'line_items[0][quantity]': '1',
    'subscription_data[trial_period_days]': String(TRIAL_DAYS),
    allow_promotion_codes: 'true'
  });

  if (customerEmail) {
    payload.set('customer_email', customerEmail);
  }

  try {
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeApiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload
    });

    const data = await stripeRes.json();

    if (!stripeRes.ok) {
      return json({ error: data?.error?.message || 'Stripe API error.' }, stripeRes.status);
    }

    return json({ checkout_url: data.url }, 200);
  } catch {
    return json({ error: 'Failed to create checkout session.' }, 500);
  }
}
