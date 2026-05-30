/* ============================================================
   HOPE DESIGN SYSTEM — case-toc.js
   Scroll-spy Table of Contents for case study pages.
   Runs only when .case-toc exists on the page.
   ============================================================ */

(function () {
  'use strict';

  var toc = document.querySelector('.case-toc');
  if (!toc) return;

  var links = Array.from(toc.querySelectorAll('.case-toc__link'));
  var sections = links.map(function (link) {
    return document.getElementById(link.getAttribute('href').slice(1));
  }).filter(Boolean);

  if (!sections.length) return;

  /* ── Active state management ─────────────────────────────── */

  var currentActive = -1;

  function setActive(index) {
    if (index === currentActive) return;
    currentActive = index;
    links.forEach(function (link, i) {
      link.classList.toggle('is-active', i === index);
    });
  }

  /* ── Scroll-spy ──────────────────────────────────────────── */
  /*
   * On every scroll tick, find the last section whose top edge
   * has crossed the activation threshold (top of viewport + offset).
   * This correctly handles both scroll directions and any section height.
   *
   * OFFSET accounts for the sticky header (56px) plus breathing room.
   */

  var OFFSET = 88;
  var ticking = false;

  function findActive() {
    var active = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= OFFSET) {
        active = i;
      }
    }
    return active;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      setActive(findActive());
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Smooth scroll on TOC click ──────────────────────────── */

  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Set initial active section on page load ─────────────── */

  setActive(findActive());

})();
