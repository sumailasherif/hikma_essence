import { CONTACT, PRODUCTS, FAQS } from './data.js';
import { bottleSVG, bottleDiagram } from './bottle.js';

document.documentElement.classList.add('js');

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Contact links ---------- */

const whatsappLink = (text = 'Hi Hikma Essence! I would like to order.') =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

function initContactLinks() {
  $$('[data-whatsapp]').forEach((a) => (a.href = whatsappLink()));
  $$('[data-snapchat]').forEach((a) => (a.href = `https://www.snapchat.com/add/${CONTACT.snapchat}`));
  $$('[data-phone-display]').forEach((el) => (el.textContent = CONTACT.phoneDisplay));
  $$('[data-snap-display]').forEach((el) => (el.textContent = CONTACT.snapchat));
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
}

const orderMessage = (product, gift = false) =>
  `Hi Hikma Essence! I'd like to order ${product.name}${product.house ? ` (${product.house})` : ''}.` +
  (gift ? ' Please gift-wrap it 🎁' : '');

/* ---------- Header: solid on scroll, mobile menu, active link ---------- */

function initHeader() {
  const header = $('[data-header]');
  const toggle = $('[data-menu-toggle]');
  const menu = $('[data-menu]');

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

  // Scroll-spy: the last section whose top has passed 40% of the viewport is active.
  const links = $$('[data-nav]');
  const targets = links.map((a) => $(a.getAttribute('href')));
  const spy = () => {
    const line = window.innerHeight * 0.4;
    let active = -1;
    targets.forEach((t, i) => t && t.getBoundingClientRect().top <= line && (active = i));
    links.forEach((a, i) => a.classList.toggle('is-active', i === active));
  };
  spy();
  window.addEventListener('scroll', spy, { passive: true });
}

/* ---------- Reveal on scroll + counters ---------- */

function animateCount(el) {
  const end = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? '';
  if (reduceMotion) return (el.textContent = end + suffix);
  const start = performance.now();
  const duration = 1400;
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(end * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function initReveal() {
  const items = $$('.reveal');
  const counters = $$('[data-count]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    counters.forEach(animateCount);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        $$('[data-count]', entry.target).forEach(animateCount);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- Scent finder ---------- */

const LABELS = {
  romantic: 'Romantic', bold: 'Bold', fresh: 'Fresh', warm: 'Warm', elegant: 'Elegant',
  everyday: 'Everyday', date: 'Date night', work: 'Work', event: 'Special event',
};

function bestMatch(mood, occasion) {
  const scored = PRODUCTS.map((p) => ({
    product: p,
    score: (p.mood.includes(mood) ? 2 : 0) + (p.occasion.includes(occasion) ? 1 : 0),
  }));
  scored.sort((a, b) => b.score - a.score);
  const { product, score } = scored[0];
  return { product, match: Math.round(62 + (score / 3) * 36) };
}

function initFinder() {
  const state = { mood: 'romantic', occasion: 'everyday', gift: false };
  const visual = $('[data-finder-visual]');
  const tiles = $('[data-finder-tiles]');
  const orderBtn = $('[data-finder-order]');
  const gift = $('[data-gift]');

  const render = () => {
    const { product, match } = bestMatch(state.mood, state.occasion);
    visual.innerHTML = `
      <p class="finder-house">${product.house || 'Hikمa Essence'}</p>
      <p class="finder-name">${product.name}</p>
      ${bottleDiagram(product)}`;
    tiles.innerHTML = [
      ['Match', `${match}<small>%</small>`, 'gold'],
      ['Family', product.family, ''],
      ['Mood', product.mood.map((m) => LABELS[m]).join(' · '), 'pink'],
      ['Best for', product.occasion.map((o) => LABELS[o]).join(' · '), ''],
    ]
      .map(([k, v, tone]) => `<div class="tile"><span class="tile-k">${k}</span><span class="tile-v ${tone}">${v}</span></div>`)
      .join('') + `<p class="tile-desc">${product.description}</p>`;
    orderBtn.href = whatsappLink(orderMessage(product, state.gift));
    visual.classList.remove('swap');
    void visual.offsetWidth; // restart the fade animation
    visual.classList.add('swap');
  };

  $$('.pills').forEach((group) => {
    const key = group.dataset.group;
    group.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;
      $$('button', group).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      state[key] = btn.dataset.value;
      render();
    });
  });

  gift.addEventListener('change', () => {
    state.gift = gift.checked;
    render();
  });

  render();
}

/* ---------- Collection ---------- */

function initCollection() {
  const wrap = $('[data-collection]');
  wrap.innerHTML = PRODUCTS.map(
    (p, i) => `
    <article class="product-card reveal">
      <header class="product-head">
        <h3>${p.name}</h3>
        <span class="num-pill">${String(i + 1).padStart(2, '0')}</span>
      </header>
      <div class="product-art">${bottleSVG(p, 'product-bottle')}</div>
      <p class="product-meta">${[p.house, p.family].filter(Boolean).join(' · ')}</p>
      <p class="product-desc">${p.description}</p>
      <ul class="note-chips">${[...p.notes.top, ...p.notes.heart].slice(0, 4).map((n) => `<li>${n}</li>`).join('')}</ul>
      <a class="btn btn-outline btn-sm" href="${whatsappLink(orderMessage(p))}" target="_blank" rel="noopener">
        DM to order <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#icon-arrow" /></svg>
      </a>
    </article>`,
  ).join('');

  const select = $('[data-scent-select]');
  select.insertAdjacentHTML('beforeend', PRODUCTS.map((p) => `<option>${p.name}</option>`).join(''));
}

/* ---------- FAQ accordion ---------- */

function initAccordion() {
  const root = $('[data-accordion]');
  root.innerHTML = FAQS.map(
    ({ q, a }, i) => `
    <div class="acc-item">
      <h3>
        <button class="acc-btn" aria-expanded="false" aria-controls="faq-${i}" id="faq-btn-${i}">
          <span class="acc-num">${String(i + 1).padStart(2, '0')}</span>
          <span class="acc-q">${q}</span>
          <span class="acc-icon" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="acc-panel" id="faq-${i}" role="region" aria-labelledby="faq-btn-${i}">
        <div><p>${a}</p></div>
      </div>
    </div>`,
  ).join('');

  root.addEventListener('click', (e) => {
    const btn = e.target.closest('.acc-btn');
    if (!btn) return;
    const open = btn.getAttribute('aria-expanded') === 'true';
    $$('.acc-btn', root).forEach((b) => b.setAttribute('aria-expanded', 'false'));
    btn.setAttribute('aria-expanded', String(!open));
  });
}

/* ---------- Contact form → WhatsApp ---------- */

function initContactForm() {
  const form = $('[data-contact]');
  const message = $('[data-message]');
  const counter = $('[data-count-chars]');
  const error = $('[data-form-error]');

  message.addEventListener('input', () => (counter.textContent = message.value.length));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name').trim();
    const text = data.get('message').trim();
    const scent = data.get('scent');
    if (!name || !text) {
      error.textContent = 'Please add your name and a message.';
      return;
    }
    error.textContent = '';
    const body = `Hi Hikma Essence, I'm ${name}.${scent ? ` I'm interested in ${scent}.` : ''}\n\n${text}`;
    window.open(whatsappLink(body), '_blank', 'noopener');
  });
}

/* ---------- Boot ---------- */

initContactLinks();
initHeader();
initFinder();
initCollection();
initAccordion();
initContactForm();
initReveal(); // last, so generated cards are observed too
