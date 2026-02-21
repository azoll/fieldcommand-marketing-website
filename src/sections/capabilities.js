const seatsByTier = {
  core: 5,
  control: 10,
  command: 20
};

export function renderCapabilities(items) {
  const blocks = items
    .map((item, index) => {
      const reverseClass = index % 2 === 1 ? ' capability-reverse' : '';
      const seats = seatsByTier[item.id];
      const leadSentence = seats ? `Includes ${seats} seats. ` : '';

      return `
        <article class="capability${reverseClass} reveal" aria-labelledby="cap-${item.id}">
          <div class="capability-media card-surface">
            <img src="${item.image.src}" alt="${item.image.alt}" loading="lazy" />
          </div>
          <div class="capability-content card-surface">
            <p class="eyebrow">${item.tier}</p>
            <h3 id="cap-${item.id}">${item.title}</h3>
            <p><strong class="capability-seat-inline">${leadSentence}</strong>${item.body}</p>
            <p class="fit"><em>${item.fit}</em></p>
            <a class="btn btn-secondary" href="#pricing" data-action="start-trial" data-plan="${item.id}" data-source="capability-${item.id}">Start free trial</a>
          </div>
        </article>
      `;
    })
    .join('');

  return `
    <section class="section capabilities" aria-label="Platform capabilities">
      <div class="container stack-lg">${blocks}</div>
    </section>
  `;
}
