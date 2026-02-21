export function track(eventName, payload = {}) {
  const event = { event: eventName, ...payload };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(event);
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);
  }

  window.dispatchEvent(new CustomEvent('fieldcommand:analytics', { detail: event }));
}
