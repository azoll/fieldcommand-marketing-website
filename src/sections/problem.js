export function renderProblem(problem) {
  return `
    <section id="who-its-for" class="section" aria-labelledby="problem-title">
      <div class="container narrow reveal">
        <p class="eyebrow">${problem.eyebrow}</p>
        <h2 id="problem-title">${problem.title}</h2>
        <p class="section-copy">${problem.body}</p>
      </div>
    </section>
  `;
}
