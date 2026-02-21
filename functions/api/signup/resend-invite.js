function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export async function onRequestPost(context) {
  const base44BackendUrl = context.env.BASE44_BACKEND_URL;

  if (!base44BackendUrl) {
    return json({ error: 'Server is missing BASE44_BACKEND_URL.' }, 500);
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ error: 'Invalid JSON payload.' }, 400);
  }

  const email = body?.email?.trim();
  if (!isValidEmail(email)) {
    return json({ error: 'A valid email is required.' }, 400);
  }

  const backendUrl = `${base44BackendUrl.replace(/\/$/, '')}/resendInvite`;
  const headers = { 'Content-Type': 'application/json' };

  if (context.env.BASE44_API_KEY) {
    headers.Authorization = `Bearer ${context.env.BASE44_API_KEY}`;
  }

  try {
    const upstreamResponse = await fetch(backendUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email })
    });

    const rawText = await upstreamResponse.text();
    let parsed;
    try {
      parsed = rawText ? JSON.parse(rawText) : {};
    } catch {
      parsed = { raw: rawText };
    }

    return json(parsed, upstreamResponse.status);
  } catch {
    return json({ error: 'Failed to call Base44 resendInvite.' }, 502);
  }
}
