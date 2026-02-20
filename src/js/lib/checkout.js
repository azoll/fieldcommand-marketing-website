import { config } from './config.js';
import { track } from './analytics.js';

function getCheckoutEndpoint() {
  const base = config.apiBaseUrl ? config.apiBaseUrl.replace(/\/$/, '') : '';
  return `${base}/api/signup/checkout`;
}

export async function startCheckout({ plan, email, source }) {
  const priceId = config.stripePriceIds[plan] || plan;

  track('trial_cta_clicked', { plan, source });

  const response = await fetch(getCheckoutEndpoint(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId, plan, email, appOrigin: config.appOrigin, source })
  });

  if (!response.ok) {
    throw new Error('Unable to create checkout session.');
  }

  const data = await response.json();
  track('checkout_session_created', { plan, source, sessionId: data.sessionId || null });

  if (!data.checkoutUrl) {
    throw new Error('Checkout URL missing from API response.');
  }

  track('checkout_redirected', { plan, source });
  window.location.assign(data.checkoutUrl);
}
