import { track } from './analytics.js';

const CHECKOUT_ENDPOINT = '/api/signup/checkout';

export async function startCheckout({ plan, email, source }) {
  track('trial_cta_clicked', { plan, source });

  const response = await fetch(CHECKOUT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, email, source })
  });

  if (!response.ok) {
    throw new Error('Unable to create checkout session.');
  }

  const data = await response.json();
  track('checkout_session_created', { plan, source });

  if (!data.checkout_url) {
    throw new Error('Checkout URL missing from API response.');
  }

  track('checkout_redirected', { plan, source });
  window.location.assign(data.checkout_url);
}
