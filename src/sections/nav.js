export function renderNav({ brand, nav, cta }) {
  const links = nav.links
    .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join('');

  return `
    <header class="site-nav" id="top">
      <div class="container nav-inner">
        <a class="brand" href="#top" aria-label="${brand.name} home">
          <img class="brand-logo" src="./public/brand/FC SQ V2 2056.png" alt="FieldCommand logo" />
          <span class="brand-text">${brand.name}</span>
        </a>

        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu">
          <span class="sr-only">Toggle navigation</span>
          <span></span><span></span><span></span>
        </button>

        <nav aria-label="Primary">
          <ul id="nav-menu" class="nav-menu">
            ${links}
            <li class="nav-cta-item">
              <a class="btn btn-primary" href="${cta.requestDemo}">Request demo</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  `;
}
