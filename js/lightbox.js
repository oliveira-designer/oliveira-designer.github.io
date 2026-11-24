/**
 * Lightbox: opens case-study images in a full-screen modal.
 * Targets every <img> inside .case-section (excludes nav, hero, avatars) and any <img data-lightbox> (the docs demo).
 * Motion uses the Hope DS duration / easing tokens via CSS. Load js/overlay.js first: the inert page, the scroll lock, the focus
 * trap, Escape and the focus return are shared with js/modal.js (since v2.13.1). Closes with Escape, the close button and a
 * click on the backdrop (unlike the Modal).
 */
(function () {
  'use strict';

  const overlay = window.HopeOverlay;
  if (!overlay) { if (window.console) console.error('js/lightbox.js needs js/overlay.js loaded before it.'); return; }

  // ── Build modal DOM ───────────────────────────────────────────────────
  const modal = document.createElement('div');
  modal.id = 'lightbox';
  modal.className = 'lightbox';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Image preview');
  modal.innerHTML = `
    <div class="lightbox__backdrop" aria-hidden="true"></div>
    <div class="lightbox__panel">
      <div class="lightbox__media">
      <button class="lightbox__close" aria-label="Close image preview">
        <svg class="icon" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
          <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/>
        </svg>
      </button>
      <img class="lightbox__img" src="" alt="" />
      </div>
      <p class="lightbox__caption"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const imgEl     = modal.querySelector('.lightbox__img');
  const captionEl = modal.querySelector('.lightbox__caption');
  const closeBtn  = modal.querySelector('.lightbox__close');
  const backdrop  = modal.querySelector('.lightbox__backdrop');
  let   opened = false;

  // ── Open / close ──────────────────────────────────────────────────────
  function open(src, alt, caption) {
    if (opened || !overlay.activate(modal, { trigger: document.activeElement, onEscape: close })) return;
    opened = true;
    imgEl.src = src;
    imgEl.alt = alt;
    captionEl.textContent = caption;
    captionEl.hidden = !caption;

    // Render in hidden state first so the browser paints, then trigger transition
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        modal.classList.add('is-open');
        // The shell is visibility:hidden until .is-open is set, and a hidden element cannot take focus: focus after it.
        closeBtn.focus();
      });
    });
  }

  function close() {
    if (!opened) return;
    opened = false;
    modal.classList.remove('is-open');
    // Inert, scroll lock and listeners are restored now; the focus goes back after the fade-out.
    const back = overlay.deactivate({ restoreFocus: false });

    // Wait for the CSS fade-out to finish before hiding from the a11y tree
    modal.addEventListener('transitionend', function onEnd(e) {
      if (e.target !== modal) return;
      modal.removeEventListener('transitionend', onEnd);
      if (opened) return;  // reopened during the fade-out: leave it open
      modal.setAttribute('hidden', '');
      if (back && back.focus) back.focus();
    });
  }

  // ── Wire source images ────────────────────────────────────────────────
  document.querySelectorAll('.case-section img, img[data-lightbox]').forEach(img => {
    img.classList.add('is-zoomable');
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');
    img.setAttribute('aria-label', `Zoom in: ${img.alt || 'image'}`);

    function trigger() {
      const fig     = img.closest('figure');
      const figcap  = fig && fig.querySelector('figcaption');
      open(img.src, img.alt, figcap ? figcap.textContent.trim() : '');
    }

    img.addEventListener('click', trigger);
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger(); }
    });
  });

  // ── Close triggers ────────────────────────────────────────────────────
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  // Start hidden
  modal.setAttribute('hidden', '');
})();
