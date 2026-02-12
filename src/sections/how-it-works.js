export function renderHowItWorks(process) {
  return `
    <section class="section section-slate" aria-labelledby="how-title">
      <div class="container">
        <div class="section-head reveal">
          <p class="eyebrow" id="how-title">How it works</p>
        </div>
        <div class="how-grid">
          ${process.steps
            .map(
              (step, index) => `
            <article class="how-step reveal" aria-label="Step ${index + 1}: ${step.title}">
              <p class="how-step-number">0${index + 1}</p>
              <h3>${step.title}</h3>
              <p>${step.body}</p>
            </article>
          `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;
}
