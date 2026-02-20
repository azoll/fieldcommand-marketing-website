import { startCheckout } from '../lib/checkout.js';

document.querySelectorAll('[data-action="start-trial"]').forEach((node) => {
  node.addEventListener('click', async (event) => {
    event.preventDefault();
    try {
      await startCheckout({
        plan: node.dataset.plan || 'control',
        source: node.dataset.source || 'support-page'
      });
    } catch (error) {
      window.alert('Unable to start checkout right now. Please try again shortly.');
    }
  });
});
