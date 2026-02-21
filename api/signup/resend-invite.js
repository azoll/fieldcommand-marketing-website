function json(response, status, payload) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(payload));
}

function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

module.exports = async function handler(request, response) {
  if (request.method !== 'POST') {
    return json(response, 405, { error: 'Method not allowed' });
  }

  const base44BackendUrl = process.env.BASE44_BACKEND_URL;
  if (!base44BackendUrl) {
    return json(response, 500, { error: 'Missing BASE44_BACKEND_URL' });
  }

  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const body = chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {};
  const email = body?.email?.trim();

  if (!isValidEmail(email)) {
    return json(response, 400, { error: 'A valid email is required' });
  }

  const headers = { 'Content-Type': 'application/json' };
  if (process.env.BASE44_API_KEY) {
    headers.Authorization = `Bearer ${process.env.BASE44_API_KEY}`;
  }

  try {
    const upstreamResponse = await fetch(`${base44BackendUrl.replace(/\/$/, '')}/resendInvite`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email })
    });

    const rawText = await upstreamResponse.text();
    let payload;

    try {
      payload = rawText ? JSON.parse(rawText) : {};
    } catch {
      payload = { raw: rawText };
    }

    return json(response, upstreamResponse.status, payload);
  } catch {
    return json(response, 502, { error: 'Failed to call Base44 resendInvite' });
  }
};
