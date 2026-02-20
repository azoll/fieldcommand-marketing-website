const DEFAULT_TRIAL_DAYS = 7;

function json(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(payload));
}

function getOrigin(request) {
  const proto = request.headers['x-forwarded-proto'] || 'https';
  const host = request.headers['x-forwarded-host'] || request.headers.host;
  return `${proto}://${host}`;
}

function resolvePriceId(planOrPriceId, map) {
  if (!planOrPriceId) return '';
  return map[planOrPriceId] || planOrPriceId;
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    return json(response, 405, { error: 'Method not allowed' });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return json(response, 500, { error: 'Missing STRIPE_SECRET_KEY' });
  }

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
  const priceMap = JSON.parse(process.env.STRIPE_PRICE_IDS || '{}');
  const priceId = resolvePriceId(body.priceId || body.plan, priceMap);

  if (!priceId) {
    return json(response, 400, { error: 'A plan or Stripe priceId is required' });
  }

  const appOrigin = body.appOrigin || process.env.APP_ORIGIN || getOrigin(request);
  const successUrl = `${appOrigin.replace(/\/$/, '')}/signup/complete?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${(body.siteOrigin || getOrigin(request)).replace(/\/$/, '')}/#pricing`;

  const payload = new URLSearchParams({
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    'line_items[0][price]': priceId,
    'line_items[0][quantity]': '1',
    'subscription_data[trial_period_days]': String(DEFAULT_TRIAL_DAYS),
    'allow_promotion_codes': 'true'
  });

  if (body.email) {
    payload.set('customer_email', body.email);
  }

  try {
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: payload
    });

    const stripeData = await stripeResponse.json();

    if (!stripeResponse.ok) {
      return json(response, stripeResponse.status, { error: stripeData.error?.message || 'Stripe API error' });
    }

    return json(response, 200, {
      sessionId: stripeData.id,
      checkoutUrl: stripeData.url
    });
  } catch (error) {
    return json(response, 500, { error: 'Failed to create checkout session' });
  }
};
