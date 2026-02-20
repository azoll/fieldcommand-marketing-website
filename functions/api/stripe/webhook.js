const STRIPE_TOLERANCE_SECONDS = 300;

function parseStripeSignature(headerValue = '') {
  return headerValue.split(',').reduce(
    (acc, part) => {
      const [key, value] = part.split('=');
      if (key === 't') acc.timestamp = Number(value);
      if (key === 'v1') acc.signatures.push(value);
      return acc;
    },
    { timestamp: NaN, signatures: [] }
  );
}

function timingSafeEqualHex(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

async function hmacSha256Hex(secret, payload) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyStripeSignature(rawBody, signatureHeader, secret) {
  const parsed = parseStripeSignature(signatureHeader);

  if (!parsed.timestamp || parsed.signatures.length === 0) {
    return { ok: false, reason: 'Missing timestamp or v1 signature.' };
  }

  const age = Math.abs(Math.floor(Date.now() / 1000) - parsed.timestamp);
  if (age > STRIPE_TOLERANCE_SECONDS) {
    return { ok: false, reason: 'Signature timestamp outside tolerance.' };
  }

  const signedPayload = `${parsed.timestamp}.${rawBody}`;
  const expected = await hmacSha256Hex(secret, signedPayload);
  const matched = parsed.signatures.some((candidate) => timingSafeEqualHex(candidate, expected));

  return matched ? { ok: true } : { ok: false, reason: 'No matching signature found.' };
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function onRequestGet() {
  return new Response('ok', { status: 200, headers: { 'Content-Type': 'text/plain' } });
}

export async function onRequestPost(context) {
  const signatureHeader = context.request.headers.get('stripe-signature') || '';
  const rawBody = await context.request.text();
  const webhookSecret = context.env.STRIPE_WEBHOOK_SECRET;

  if (webhookSecret) {
    const verification = await verifyStripeSignature(rawBody, signatureHeader, webhookSecret);
    if (!verification.ok) {
      console.error('stripe webhook signature verification failed', { reason: verification.reason });
      return json({ error: 'Invalid signature' }, 400);
    }
  } else {
    console.warn('stripe webhook secret not configured; accepting webhook without verification');
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return json({ error: 'Invalid JSON payload' }, 400);
  }

  console.log('stripe webhook received', { eventId: event.id, eventType: event.type });

  switch (event.type) {
    case 'checkout.session.completed': {
      console.log('checkout.session.completed handled', { eventId: event.id });
      break;
    }
    case 'customer.subscription.updated': {
      console.log('customer.subscription.updated handled', { eventId: event.id });
      break;
    }
    case 'customer.subscription.deleted': {
      console.log('customer.subscription.deleted handled', { eventId: event.id });
      break;
    }
    default: {
      console.log('stripe webhook unhandled type (acknowledged)', {
        eventId: event.id,
        eventType: event.type
      });
    }
  }

  return json({ received: true }, 200);
}
