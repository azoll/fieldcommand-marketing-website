export function renderFooter({ footer, brand }) {
  const links = footer.links
    .map((link) => `<li><a href="${link.href}">${link.label}</a></li>`)
    .join('');

  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <ul class="footer-links">${links}</ul>
        <p>${brand.tagline}<br />${brand.location}</p>
        <p class="muted">All rights reserved &copy; ${new Date().getFullYear()}</p>
      </div>
    </footer>
  `;
}
