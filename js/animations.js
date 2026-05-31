/**
 * Hope Design System — scroll & load animations
 * Intersection Observer + CSS (no external libraries)
 */
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SCROLL_TARGETS = [
    '.section__header',
    '.case-card',
    '.skill-card',
    '.testimonial-card',
    '.about-snippet__blocks > div',
    '.logo-strip',
    '.about-snippet > div:last-child',
    '.footer__connect',
    '.case-section',
    '.about-bridge__inner',
  ];

  function show(el) {
    el.classList.add('is-visible');
  }

  function initLoadReveals() {
    document.querySelectorAll('[data-reveal-on-load]').forEach((el) => {
      const delay = Number(el.dataset.revealDelay) || 0;
      if (prefersReduced) {
        show(el);
        return;
      }
      setTimeout(() => show(el), delay);
    });
  }

  function initScrollReveals() {
    const elements = [];

    SCROLL_TARGETS.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
        }
        elements.push(el);
      });
    });

    if (prefersReduced) {
      elements.forEach(show);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          show(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12,
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  function initTextHighlights() {
    const highlights = document.querySelectorAll('.text-highlight');
    if (!highlights.length) return;

    if (prefersReduced) {
      highlights.forEach((el) => el.classList.add('is-active'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-active');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2 }
    );

    highlights.forEach((el) => observer.observe(el));
  }

  function initContentProtection() {
    // Block right-click context menu (prevents save-image on hero illustrations)
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    // Block clipboard events at the document level
    ['copy', 'cut', 'paste'].forEach((evt) => {
      document.addEventListener(evt, (e) => e.preventDefault());
    });

    // Block modifier-key shortcuts: Ctrl/Cmd + C, V, X, U, S
    const BLOCKED = new Set(['c', 'v', 'x', 'u', 's']);
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && BLOCKED.has(e.key.toLowerCase())) {
        e.preventDefault();
      }
    });
  }

  function init() {
    initLoadReveals();
    initScrollReveals();
    initTextHighlights();
    initContentProtection();
  }

  // Expose init so external callers (e.g. auth gate) can replay animations
  window.HopeDS = window.HopeDS || {};
  window.HopeDS.initAnimations = init;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
