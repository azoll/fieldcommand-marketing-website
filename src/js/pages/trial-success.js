const statusNode = document.querySelector('#resend-status');
const form = document.querySelector('#resend-invite-form');
const setupDelayNote = document.querySelector('#setup-delay-note');
const sessionDebug = document.querySelector('#session-id-debug');

const params = new URLSearchParams(window.location.search);
const sessionId = params.get('session_id');

if (sessionId) {
  setupDelayNote.hidden = false;
  sessionDebug.hidden = false;
  sessionDebug.textContent = `Debug session_id: ${sessionId}`;
}

function setStatus(message, isError = false) {
  statusNode.textContent = message;
  statusNode.classList.toggle('is-error', isError);
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const emailInput = form.querySelector('#invite-email');
  const email = emailInput?.value?.trim();

  if (!emailInput?.checkValidity()) {
    emailInput?.reportValidity();
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  setStatus('Sending invite...');

  try {
    const response = await fetch('/api/signup/resend-invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = data?.error || 'Could not resend invite. Please try again.';
      setStatus(message, true);
      return;
    }

    setStatus(data?.message || 'Invite resent. Check your inbox.');
  } catch {
    setStatus('Could not resend invite. Please try again.', true);
  } finally {
    submitButton.disabled = false;
  }
});
