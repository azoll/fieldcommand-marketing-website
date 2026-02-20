import { content } from '../data/content.js';
import { renderNav } from '../sections/nav.js';
import { renderHero } from '../sections/hero.js';
import { renderProblem } from '../sections/problem.js';
import { renderCapabilities } from '../sections/capabilities.js';
import { renderHowItWorks } from '../sections/how-it-works.js';
import { renderPricing } from '../sections/pricing.js';
import { renderFaq } from '../sections/faq.js';
import { renderContact } from '../sections/contact.js';
import { renderFooter } from '../sections/footer.js';
import { startCheckout } from './lib/checkout.js';
import { config } from './lib/config.js';

function renderApp() {
  const app = document.querySelector('#app');

  app.innerHTML = `
    ${renderNav(content)}
    <main id="main-content">
      ${renderHero(content.hero)}
      ${renderProblem(content.problem)}
      ${renderCapabilities(content.capabilities)}
      ${renderHowItWorks(content.process)}
      ${renderPricing(content.pricing)}
      ${renderFaq(content.faq, content.cta.requestDemo)}
      ${renderContact(content.contact)}
    </main>
    ${renderFooter(content)}
    <dialog class="walkthrough-modal" id="walkthrough-modal" aria-label="Product walkthrough">
      <button class="walkthrough-close" type="button" data-close-walkthrough aria-label="Close walkthrough">×</button>
      <div class="walkthrough-content"></div>
    </dialog>
  `;
}

function setupNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('is-open', !expanded);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    });
  });
}

function setupBillingToggle() {
  const buttons = document.querySelectorAll('.toggle-btn');
  const prices = document.querySelectorAll('.price');
  const notes = document.querySelectorAll('.price-note');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const billing = button.dataset.billing;

      buttons.forEach((btn) => {
        const active = btn === button;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });

      prices.forEach((node) => {
        node.textContent = billing === 'annual' ? node.dataset.annual : node.dataset.monthly;
      });

      notes.forEach((node) => {
        node.textContent = billing === 'annual' ? node.dataset.annual : node.dataset.monthly;
      });
    });
  });
}

function setupContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const success = form.querySelector('.form-success');
    if (success) success.hidden = false;
    form.reset();
  });
}

function setupRevealAnimation() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
  );

  targets.forEach((target) => observer.observe(target));
}

function setupTrialCtas() {
  document.querySelectorAll('[data-action="start-trial"]').forEach((node) => {
    node.addEventListener('click', async (event) => {
      event.preventDefault();
      const plan = node.dataset.plan || 'control';
      const source = node.dataset.source || 'unknown';

      try {
        await startCheckout({ plan, source });
      } catch (error) {
        window.alert('Unable to start checkout right now. Please try again or request a demo.');
      }
    });
  });
}

function setupWalkthrough() {
  const modal = document.querySelector('#walkthrough-modal');
  const contentNode = modal?.querySelector('.walkthrough-content');
  if (!modal || !contentNode) return;

  const close = () => {
    if (modal.open) modal.close();
  };

  modal.querySelector('[data-close-walkthrough]')?.addEventListener('click', close);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });

  document.querySelectorAll('[data-action="watch-walkthrough"]').forEach((node) => {
    node.addEventListener('click', (event) => {
      if (!config.walkthroughVideoUrl) {
        return;
      }

      event.preventDefault();
      contentNode.innerHTML = `<iframe src="${config.walkthroughVideoUrl}" title="FieldCommand walkthrough video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
      modal.showModal();
    });
  });
}

renderApp();
setupNavToggle();
setupBillingToggle();
setupContactForm();
setupRevealAnimation();
setupTrialCtas();
setupWalkthrough();
