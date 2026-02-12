export function renderFaq(faq, demoUrl) {
  const items = faq
    .map(
      (entry) => `
      <details class="faq-item reveal">
        <summary>${entry.q}</summary>
        <p>${entry.a}</p>
      </details>
    `
    )
    .join('');

  return `
    <section class="section" aria-labelledby="faq-title">
      <div class="container narrow">
        <div class="section-head reveal">
          <p class="eyebrow">FAQ</p>
          <h2 id="faq-title">Questions owners ask before they switch systems</h2>
        </div>
        <div class="faq-list">${items}</div>
        <div class="faq-cta reveal">
          <p>Want to validate fit quickly? We can map this to your current workflow in one call.</p>
          <a class="btn btn-primary" href="${demoUrl}">Request demo</a>
        </div>
      </div>
    </section>
  `;
}
