// Shared layout for the Hope DS docs site (docs/*.html).
// One source of truth for the page chrome: header, sidebar, theme toggle.
// Pages link the real css/*.css files; the only docs-specific stylesheet is
// docs/docs.css, which uses Hope tokens only (see scripts/check-docs.mjs).

// hrefs are relative to docs/. Pages in a subfolder pass base '../' to renderPage.
export const NAV = [
  { href: 'index.html', label: 'Overview' },
  { href: 'tokens.html', label: 'Tokens' },
  { href: 'components/index.html', label: 'Components' },
];

export const COMPONENT_PAGES = [
  { href: 'components/button.html', label: 'Button' },
  { href: 'components/badge.html', label: 'Badge' },
  { href: 'components/link.html', label: 'Link' },
  { href: 'components/separator.html', label: 'Separator' },
  { href: 'components/review.html', label: 'Review (temporary)' },
];

const isActive = (n, activeHref) =>
  n.href === activeHref || (n.href === 'components/index.html' && typeof activeHref === 'string' && activeHref.startsWith('components/'));

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ICON_BURGER = '<svg viewBox="0 0 256 256" fill="currentColor" id="iconBurger" aria-hidden="true" focusable="false"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/></svg>';
const ICON_CLOSE = '<svg viewBox="0 0 256 256" fill="currentColor" id="iconClose" aria-hidden="true" focusable="false" style="display:none"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>';

const STYLESHEETS = ['hope'];

// Theme switch: Light, Dark or System. The site CSS hides #themeToggle (css/site/header.css), so the
// docs use their own control. It drives the same mechanism the CSS already uses for dark mode:
// the data-theme attribute on <html> (tokens.css `[data-theme="dark"]`). System resolves with
// matchMedia in JS, because the CSS has no prefers-color-scheme rules.
const THEME_SWITCH = `<div class="docs-theme" role="group" aria-label="Theme">
            <button type="button" class="docs-theme__btn" data-theme-choice="light" aria-pressed="false">Light</button>
            <button type="button" class="docs-theme__btn" data-theme-choice="dark" aria-pressed="false">Dark</button>
            <button type="button" class="docs-theme__btn" data-theme-choice="system" aria-pressed="false">System</button>
          </div>`;

// Runs in <head> so the saved theme is applied before the first paint. Own storage key: the
// portfolio site writes rm-theme on every load, which would overwrite the docs choice.
const THEME_BOOT = `<script>
    (function () {
      var KEY = 'hope-docs-theme';
      var html = document.documentElement;
      var mq = null;
      try { mq = window.matchMedia('(prefers-color-scheme: dark)'); } catch (e) {}
      var current = null; // in-memory choice, used when localStorage is blocked
      function stored() {
        if (current) return current;
        try {
          var v = localStorage.getItem(KEY);
          return v === 'dark' || v === 'system' ? v : 'light';
        } catch (e) { return 'light'; }
      }
      function resolve(choice) { return choice === 'system' ? (mq && mq.matches ? 'dark' : 'light') : choice; }
      function apply(choice) { html.setAttribute('data-theme', resolve(choice)); }
      window.hopeDocsTheme = {
        get: stored,
        set: function (choice) {
          current = choice;
          try { localStorage.setItem(KEY, choice); } catch (e) {}
          apply(choice);
        },
        apply: apply,
        mq: mq
      };
      apply(stored());
    })();
  </script>`;

// Header chrome. Identical on every page: scripts/check-docs.mjs compares it.
export function header(activeHref, base = '') {
  const links = NAV.map(
    (n) => `<a href="${base}${n.href}" class="nav__link${isActive(n, activeHref) ? ' nav__link--active' : ''}"${isActive(n, activeHref) ? ' aria-current="page"' : ''}>${n.label}</a>`
  ).join('\n            ');
  const mobile = NAV.map(
    (n) => `<a href="${base}${n.href}" class="nav__mobile-link${isActive(n, activeHref) ? ' nav__link--active' : ''}">${n.label}</a>`
  ).join('\n        ');
  return `<header class="site-header" id="top" role="banner">
      <nav class="nav" role="navigation" aria-label="Docs navigation">
        <a href="${base}index.html" class="nav__logo" aria-label="Hope DS docs home">
          <img src="${base}../logos/logo-light-mode.svg" alt="Renan Moura" class="nav__logo-light" />
          <img src="${base}../logos/logo-dark-mode.svg" alt="Renan Moura" class="nav__logo-dark" />
        </a>
        <div class="nav__controls">
          <div class="nav__links">
            ${links}
            <a href="${base}../index.html" class="nav__link">Portfolio site</a>
          </div>
          ${THEME_SWITCH}
          <button class="nav__hamburger" id="menuToggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="mobileMenu">
            ${ICON_BURGER}
            ${ICON_CLOSE}
          </button>
        </div>
      </nav>
      <div class="nav__mobile-menu" id="mobileMenu" role="navigation" aria-label="Mobile navigation">
        ${mobile}
        <a href="${base}../index.html" class="nav__mobile-link">Portfolio site</a>
      </div>
    </header>`;
}

function sidebar(activeHref, onThisPage, base = '') {
  const pages = NAV.map(
    (n) => `<li class="case-toc__item"><a class="case-toc__link${n.href === activeHref ? ' is-active' : ''}" href="${base}${n.href}"${n.href === activeHref ? ' aria-current="page"' : ''}>${n.label}</a></li>`
  ).join('\n              ');
  let comps = '';
  if (typeof activeHref === 'string' && activeHref.startsWith('components/')) {
    const items = COMPONENT_PAGES.map(
      (n) => `<li class="case-toc__item"><a class="case-toc__link${n.href === activeHref ? ' is-active' : ''}" href="${base}${n.href}"${n.href === activeHref ? ' aria-current="page"' : ''}>${n.label}</a></li>`
    ).join('\n              ');
    comps = `
            <p class="case-toc__label">Components</p>
            <ol class="case-toc__list">
              ${items}
            </ol>`;
  }
  let more = '';
  if (onThisPage && onThisPage.length) {
    const items = onThisPage
      .map((s) => `<li class="case-toc__item"><a class="case-toc__link" href="#${esc(s.id)}"${s.title ? ` title="${esc(s.title)}"` : ''}>${esc(s.label)}</a></li>`)
      .join('\n              ');
    more = `
            <p class="case-toc__label">On this page</p>
            <ol class="case-toc__list">
              ${items}
            </ol>`;
  }
  return `<aside class="case-sidebar">
          <nav class="case-toc" aria-label="Docs pages">
            <p class="case-toc__label">Pages</p>
            <ol class="case-toc__list">
              ${pages}
            </ol>${comps}${more}
          </nav>
        </aside>`;
}

// Side menu of the model layout (layout: 'ds'): the pattern of design-system.html (grouped links,
// no "On this page" list). Same items as the classic sidebar: Pages and Components.
function sidebarDs(activeHref, base = '') {
  const link = (n) => `<a class="docs-ds-nav__link" href="${base}${n.href}"${n.href === activeHref ? ' aria-current="page"' : ''}>${n.label}</a>`;
  return `<aside class="docs-ds-sidebar">
          <nav aria-label="Docs pages">
            <div class="docs-ds-nav__group">
              <p class="docs-ds-nav__label">Pages</p>
              ${NAV.map(link).join('\n              ')}
            </div>
            <div class="docs-ds-nav__group">
              <p class="docs-ds-nav__label">Components</p>
              ${COMPONENT_PAGES.map(link).join('\n              ')}
            </div>
          </nav>
        </aside>`;
}

// Wires the theme switch (state lives in THEME_BOOT) and the mobile menu.
const SCRIPT = `<script>
    (function () {
      const html = document.documentElement;
      const menuToggle = document.getElementById('menuToggle');
      const mobileMenu = document.getElementById('mobileMenu');
      const iconBurger = document.getElementById('iconBurger');
      const iconClose = document.getElementById('iconClose');

      const theme = window.hopeDocsTheme;
      const choices = document.querySelectorAll('[data-theme-choice]');
      function syncSwitch() {
        const current = theme ? theme.get() : 'light';
        choices.forEach(function (btn) {
          btn.setAttribute('aria-pressed', String(btn.getAttribute('data-theme-choice') === current));
        });
      }
      function setMenu(open) {
        mobileMenu.classList.toggle('is-open', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        iconBurger.style.display = open ? 'none' : 'block';
        iconClose.style.display = open ? 'block' : 'none';
      }

      choices.forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (theme) theme.set(btn.getAttribute('data-theme-choice'));
          syncSwitch();
        });
      });
      if (theme && theme.mq) {
        const onChange = function () { if (theme.get() === 'system') theme.apply('system'); };
        try { theme.mq.addEventListener('change', onChange); } catch (e) { try { theme.mq.addListener(onChange); } catch (e2) {} }
      }
      syncSwitch();

      menuToggle.addEventListener('click', function () {
        setMenu(!mobileMenu.classList.contains('is-open'));
      });
      mobileMenu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
          setMenu(false);
          menuToggle.focus();
        }
      });
    })();
  </script>`;

// stylesheets: optional list of repository-root-relative paths (for example from docs/data/css-sources.json).
// layout: 'classic' (default: container, sidebar with On this page, content) or 'ds' (model layout:
// full width, design-system.html side menu, no On this page).
export function renderPage({ title, activeHref, onThisPage = [], body, base = '', stylesheets = null, layout = 'classic' }) {
  const links = (stylesheets ? stylesheets.map((p) => `<link rel="stylesheet" href="${base}../${p}" />`) : STYLESHEETS.map((s) => `<link rel="stylesheet" href="${base}../css/${s}.css" />`)).join('\n  ');
  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  ${THEME_BOOT}
  <title>${esc(title)} | Hope DS docs</title>
  <link rel="icon" type="image/svg+xml" href="${base}../logos/logo-icon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  ${links}
  <link rel="stylesheet" href="${base}docs.css" />
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  ${header(activeHref, base)}

  ${layout === 'ds'
    ? `<main id="main" class="docs-main docs-main--ds">
    <div class="docs-ds-layout">
        ${sidebarDs(activeHref, base)}
        <div class="docs-ds-content">
${body}
        </div>
    </div>
  </main>`
    : `<main id="main" class="docs-main">
    <div class="container">
      <div class="case-layout">
        ${sidebar(activeHref, onThisPage, base)}
        <div class="docs-content">
${body}
        </div>
      </div>
    </div>
  </main>`}

  ${SCRIPT}
</body>
</html>
`;
}

// Body of docs/index.html. Regenerated by scripts/build-tokens-doc.mjs so the
// chrome stays identical to the other pages.
export function indexBody(stats) {
  return `          <header class="docs-pagehead">
            <p class="text-label text-tertiary">Hope Design System</p>
            <h1 class="text-h1">Documentation</h1>
            <p class="text-body text-secondary docs-lead">Reference for the Hope tokens and components, built from the real files in this repository. Audience for now: the owner and agents.</p>
          </header>

          <section class="docs-section" aria-labelledby="sources-title">
            <h2 class="text-h2" id="sources-title">Sources of truth</h2>
            <ul class="docs-list">
              <li><strong>Figma</strong> is canonical for token and component values.</li>
              <li><strong>This repository</strong> is canonical for prose, rules and the changelog (<code>design-organization/GOVERNANCE.md</code>, section 7).</li>
              <li>These pages create no second source: they link the generated <code>css/hope.css</code> (built from <code>css/tokens.css</code>, <code>css/components/*</code> and <code>css/site/*</code>), and the tokens page is generated from <code>css/tokens.css</code>.</li>
            </ul>
          </section>

          <section class="docs-section" aria-labelledby="pages-title">
            <h2 class="text-h2" id="pages-title">Pages</h2>
            <ul class="docs-list">
              <li><a href="tokens.html">Tokens</a>: ${stats.tokens} tokens with Light and Dark values, ${stats.unused} flagged as unused. Figma sync: ${esc(stats.figma)}.</li>
              <li><a href="components/index.html">Components</a>: Button (with Icon Button), Badge, Link and Separator, documented as they are in Figma and in code today. Run <code>npm run docs:components</code> to regenerate.</li>
            </ul>
          </section>

          <section class="docs-section" aria-labelledby="run-title">
            <h2 class="text-h2" id="run-title">Commands</h2>
            <ul class="docs-list">
              <li><code>npm run docs:tokens</code> regenerates <code>docs/tokens.html</code>, <code>docs/data/tokens.json</code> and this page.</li>
              <li><code>npm run docs:components</code> regenerates <code>docs/components/*.html</code> from <code>docs/data/components-content.json</code>, <code>components-code-notes.json</code> and <code>components-map.json</code>.</li>
              <li><code>npm run docs:check</code> fails if a demo uses a class missing from <code>css/*.css</code>, and lists CSS blocks that have no demo yet.</li>
            </ul>
          </section>`;
}
