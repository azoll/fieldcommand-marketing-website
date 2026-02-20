function renderHeroBullets(items) {
  return items
    .map(
      (item) => `
        <li>
          <span class="hero-bullet-icon" aria-hidden="true">✓</span>
          <span>${item}</span>
        </li>
      `
    )
    .join('');
}

export function renderHero(hero) {
  const trustNote = hero.trustNote ? `<p class="hero-trust">${hero.trustNote}</p>` : '';

  return `
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-texture" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="hero-layout">
          <div>
            <p class="eyebrow">${hero.eyebrow}</p>
            <h1 id="hero-title">${hero.title}</h1>
            <p class="hero-subtitle">${hero.subtitle}</p>
            <p class="hero-detail">${hero.detail}</p>
            <div class="hero-ctas">
              <a class="btn btn-primary" href="#pricing" data-action="${hero.primaryCta.action}" data-plan="${hero.primaryCta.plan}" data-source="hero-primary">${hero.primaryCta.label}</a>
              <a class="btn btn-secondary" href="${hero.secondaryCta.href || '/walkthrough.html'}" data-action="${hero.secondaryCta.action}">${hero.secondaryCta.label}</a>
            </div>
            ${trustNote}
          </div>
          <figure class="hero-product card-surface">
            <img src="${hero.productVisual.src}" alt="${hero.productVisual.alt}" loading="lazy" />
            <figcaption>${hero.productVisual.note}</figcaption>
          </figure>
        </div>

        <div class="hero-get reveal">
          <p class="eyebrow">What you get</p>
          <ul>${renderHeroBullets(hero.bullets)}</ul>
        </div>
      </div>
    </section>
  `;
}
