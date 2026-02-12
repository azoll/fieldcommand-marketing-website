export function renderContact(contact) {
  return `
    <section id="contact" class="section section-slate" aria-labelledby="contact-title">
      <div class="container contact-grid">
        <div class="contact-intro reveal">
          <p class="eyebrow">Support</p>
          <h2 id="contact-title">${contact.title}</h2>
          <p>${contact.body}</p>
        </div>

        <form class="contact-form reveal" aria-describedby="contact-note" novalidate>
          <div class="form-item">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" autocomplete="name" placeholder="Your name" required />
          </div>
          <div class="form-item">
            <label for="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="email@company.com"
              required
            />
          </div>
          <div class="form-item">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Tell us your team size, job mix, and current tools."></textarea>
          </div>
          <button class="btn btn-primary" type="submit">Send message</button>
          <p id="contact-note" class="form-note">We typically respond within one business day.</p>
          <p class="form-success" role="status" aria-live="polite" hidden>Thank you. We will respond promptly.</p>
        </form>
      </div>
    </section>
  `;
}
