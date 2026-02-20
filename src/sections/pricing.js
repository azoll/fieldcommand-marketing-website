function renderFeatureList(tier) {
  const lead = tier.leadIn ? `<li class="lead-in"><strong>${tier.leadIn}</strong></li>` : '';
  const features = tier.features.map((feature) => `<li>${feature}</li>`).join('');
  return `${lead}${features}`;
}

export function renderPricing(pricing) {
  const cards = pricing.tiers
    .map((tier) => {
      const annual = Math.round(tier.monthly * 0.8);
      const popularTag = tier.popular ? '<p class="popular-tag">Most popular</p>' : '';
      const popularClass = tier.popular ? ' pricing-card-popular' : '';

      return `
        <article class="pricing-card${popularClass} reveal" data-tier="${tier.key}">
          ${popularTag}
          <h3>${tier.name} <span>${tier.title}</span></h3>
          <p class="seat-inline"><strong>${tier.seats} seats included</strong></p>
          <p><strong>Who it\'s for:</strong> ${tier.audience}</p>
          <ul>
            ${renderFeatureList(tier)}
          </ul>
          <div class="price-wrap" aria-live="polite">
            <p class="price" data-monthly="$${tier.monthly}/mo" data-annual="$${annual}/mo">$${tier.monthly}/mo</p>
            <p class="price-note" data-monthly="or save 20% annually" data-annual="billed annually (save 20%)">or save 20% annually</p>
          </div>
          <a class="btn ${tier.popular ? 'btn-primary' : 'btn-secondary'}" href="#" data-action="start-trial" data-plan="${tier.stripePriceId}" data-source="pricing-${tier.key}">Start free trial</a>
        </article>
      `;
    })
    .join('');

  return `
    <section id="pricing" class="section section-slate" aria-labelledby="pricing-title">
      <div class="container">
        <div class="section-head center reveal">
          <p class="eyebrow">Clear, contractor-first pricing</p>
          <h2 id="pricing-title">Simple plans. No surprises.</h2>
          <div class="billing-toggle" role="group" aria-label="Billing period toggle">
            <button class="toggle-btn is-active" data-billing="monthly" aria-pressed="true">Monthly</button>
            <button class="toggle-btn" data-billing="annual" aria-pressed="false">Annual <span>save 20%</span></button>
          </div>
        </div>
        <div class="pricing-grid">${cards}</div>
        <p class="pricing-blurb reveal"><strong>${pricing.blurb}</strong></p>
      </div>
    </section>
  `;
}
