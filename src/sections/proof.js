export function renderProof(proof) {
  return `
    <section class="section" aria-labelledby="proof-title">
      <div class="container">
        <article class="proof-card reveal">
          <p class="eyebrow">Proof</p>
          <h2 id="proof-title">${proof.heading}</h2>
          <blockquote>
            <p>"${proof.quote}"</p>
          </blockquote>
          <p class="proof-meta"><strong>${proof.author}</strong> · ${proof.role}</p>
          <ul class="proof-metrics" aria-label="Outcome highlights">
            ${proof.outcomes.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </article>
      </div>
    </section>
  `;
}
