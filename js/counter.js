/**
 * counter.js — Animates [data-counter] metric values from 0 → target on scroll.
 * Triggers once via IntersectionObserver. Respects prefers-reduced-motion.
 */
(function () {
  'use strict';

  const DURATION = 1400; // ms — long enough to feel satisfying
  const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function run(el) {
    const target = parseFloat(el.dataset.target);
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';
    const isInt  = Number.isInteger(target);

    if (reduced) {
      el.textContent = prefix + (isInt ? target : target.toFixed(1)) + suffix;
      return;
    }

    const startTime = performance.now();

    function tick(now) {
      const t       = Math.min((now - startTime) / DURATION, 1);
      const current = easeOutExpo(t) * target;
      el.textContent = prefix + (isInt ? Math.round(current) : current.toFixed(1)) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      run(entry.target);
      observer.unobserve(entry.target); // fire once only
    });
  }, { threshold: 0.6 });

  // Initialise: set each element to "prefix + 0 + suffix" before it's visible
  document.querySelectorAll('[data-counter]').forEach((el) => {
    el.textContent = (el.dataset.prefix ?? '') + '0' + (el.dataset.suffix ?? '');
    observer.observe(el);
  });
})();
