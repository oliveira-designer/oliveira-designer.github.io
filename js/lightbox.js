/**
 * Lightbox — opens case-study images in a full-screen modal.
 * Targets every <img> inside .case-section (excludes nav, hero, avatars).
 * Motion uses the Hope DS duration / easing tokens via CSS.
 */
(function () {
  'use strict';

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
      <button class="lightbox__close" aria-label="Close image preview">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <img class="lightbox__img" src="" alt="" />
      <p class="lightbox__caption"></p>
    </div>
  `;
  document.body.appendChild(modal);

  const imgEl     = modal.querySelector('.lightbox__img');
  const captionEl = modal.querySelector('.lightbox__caption');
  const closeBtn  = modal.querySelector('.lightbox__close');
  const backdrop  = modal.querySelector('.lightbox__backdrop');
  let   prevFocus = null;

  // ── Open / close ──────────────────────────────────────────────────────
  function open(src, alt, caption) {
    imgEl.src = src;
    imgEl.alt = alt;
    captionEl.textContent = caption;
    captionEl.hidden = !caption;

    prevFocus = document.activeElement;
    document.body.style.overflow = 'hidden';

    // Render in hidden state first so the browser paints, then trigger transition
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => modal.classList.add('is-open'));
    });

    closeBtn.focus();
  }

  function close() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';

    // Wait for the CSS fade-out to finish before hiding from the a11y tree
    modal.addEventListener('transitionend', function onEnd(e) {
      if (e.target !== modal) return;
      modal.setAttribute('hidden', '');
      modal.removeEventListener('transitionend', onEnd);
      if (prevFocus) prevFocus.focus();
    });
  }

  // ── Wire source images ────────────────────────────────────────────────
  document.querySelectorAll('.case-section img').forEach(img => {
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
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });

  // Start hidden
  modal.setAttribute('hidden', '');
})();
