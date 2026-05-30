/* ============================================================
   HOPE DESIGN SYSTEM — auth.js
   NDA password gate for protected case study pages.

   SECURITY NOTE: passwords are visible in this source file.
   This is an obscurity gate — a social/NDA deterrent, not
   real access control. For true security, use server-side
   auth (Netlify Identity, Vercel middleware, etc.).

   HOW TO USE — add to any protected page's <head> after CSS:
     <link rel="stylesheet" href="css/auth.css" />
     <script src="js/auth.js"></script>
   ============================================================ */

(function () {
  'use strict';

  /* ── Configuration ──────────────────────────────────────── */

  var ALLOWED       = ['renan.design32', 'RENAN.DESIGN32'];
  var SESSION_KEY   = 'rm-auth';
  var RETURN_URL    = window.AUTH_RETURN || 'index.html';
  var CONTACT_EMAIL = 'rmouraolivdesigner@gmail.com';

  /* ── Dev helper: ?reset-auth clears the session to re-trigger the gate ── */

  if (window.location.search.indexOf('reset-auth') !== -1) {
    sessionStorage.removeItem(SESSION_KEY);
  }

  /* ── Early exit if already authenticated ────────────────── */

  if (sessionStorage.getItem(SESSION_KEY) === 'granted') return;

  /* ── Lock all page content before first paint ───────────── */
  /* Runs synchronously in <head> so the browser never renders
     unprotected content. The modal overlay is injected on
     DOMContentLoaded and sits above the locked content.       */

  document.documentElement.classList.add('auth-gated');

  /* ── Mount modal once body is ready ─────────────────────── */

  document.addEventListener('DOMContentLoaded', function () {
    var gate = buildGate();
    document.body.appendChild(gate);
    gate.querySelector('.auth-gate__input').focus();
  });

  /* ── Gate UI ─────────────────────────────────────────────── */

  function buildGate() {
    var el = document.createElement('div');
    el.className = 'auth-gate';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Password protected content');

    el.innerHTML = [
      '<div class="auth-gate__card">',
        '<button type="button" class="auth-gate__close" id="auth-close" aria-label="Close and return to portfolio">',
          icon('x', 20),
        '</button>',
        '<div class="auth-gate__header">',
          '<div class="auth-gate__icon" aria-hidden="true">' + icon('lock', 20) + '</div>',
          '<div>',
            '<h1 class="auth-gate__title">Private content</h1>',
            '<p class="auth-gate__subtitle">',
              'This project is protected by NDA. Enter the passcode below or reach out at ',
              '<a href="mailto:' + CONTACT_EMAIL + '" class="auth-gate__email">' + CONTACT_EMAIL + '</a>',
              ' to request access.',
            '</p>',
          '</div>',
        '</div>',
        '<div class="auth-gate__divider"></div>',
        '<form class="auth-gate__form" id="auth-form" novalidate>',
          '<div class="auth-gate__field">',
            '<label for="auth-input" class="auth-gate__label">Passcode</label>',
            '<div class="auth-gate__input-wrap">',
              '<input',
                ' type="password"',
                ' id="auth-input"',
                ' name="password"',
                ' class="auth-gate__input"',
                ' placeholder="Enter your passcode"',
                ' autocomplete="new-password"',
              ' />',
              '<button type="button" class="auth-gate__eye" id="auth-eye" aria-label="Show password">',
                icon('eye', 18),
              '</button>',
            '</div>',
            '<p class="auth-gate__error" id="auth-error" role="alert" aria-live="assertive"></p>',
          '</div>',
          '<div class="auth-gate__actions">',
            '<button type="submit" class="btn btn--primary auth-gate__submit" id="auth-submit">',
              icon('lock', 18) + 'Unlock',
            '</button>',
            '<button type="button" class="btn btn--secondary auth-gate__dismiss" id="auth-cancel">Close</button>',
          '</div>',
        '</form>',
      '</div>',
    ].join('');

    wireGate(el);
    return el;
  }

  function wireGate(el) {
    var form      = el.querySelector('#auth-form');
    var input     = el.querySelector('#auth-input');
    var errorEl   = el.querySelector('#auth-error');
    var eyeBtn    = el.querySelector('#auth-eye');
    var submitBtn = el.querySelector('#auth-submit');
    var closeBtn  = el.querySelector('#auth-close');
    var cancelBtn = el.querySelector('#auth-cancel');
    var showPw    = false;

    /* Dismiss — content stays locked (auth-gated active), fade modal
       then redirect. Never removes auth-gated, so content never leaks. */
    function dismiss() {
      el.classList.add('auth-gate--exiting');
      setTimeout(function () { window.location.href = RETURN_URL; }, 280);
    }

    closeBtn.addEventListener('click', dismiss);
    cancelBtn.addEventListener('click', dismiss);

    /* Show / hide password toggle */
    eyeBtn.addEventListener('click', function () {
      showPw = !showPw;
      input.type = showPw ? 'text' : 'password';
      eyeBtn.setAttribute('aria-label', showPw ? 'Hide password' : 'Show password');
      eyeBtn.innerHTML = icon(showPw ? 'eye-off' : 'eye', 18);
    });

    /* Lock → lock-open icon swap on submit hover */
    submitBtn.addEventListener('mouseenter', function () {
      submitBtn.innerHTML = icon('lock-open', 18) + 'Unlock';
    });
    submitBtn.addEventListener('mouseleave', function () {
      submitBtn.innerHTML = icon('lock', 18) + 'Unlock';
    });

    /* Clear error on typing */
    input.addEventListener('input', function () {
      errorEl.textContent = '';
      input.classList.remove('auth-gate__input--error');
    });

    /* Form submission */
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (ALLOWED.indexOf(input.value) !== -1) {
        sessionStorage.setItem(SESSION_KEY, 'granted');

        // Remove content lock, then fade modal out simultaneously
        document.documentElement.classList.remove('auth-gated');
        el.classList.add('auth-gate--exiting');
        setTimeout(function () { el.remove(); }, 300);

      } else {
        errorEl.textContent = 'Incorrect passcode. Please try again.';
        input.classList.add('auth-gate__input--error');
        input.value = '';
        input.focus();
        submitBtn.innerHTML = icon('lock', 18) + 'Unlock';
      }
    });
  }

  /* ── SVG icon factory — Tabler Icons paths ───────────────── */
  /*
   * Using inline SVG paths from Tabler Icons (MIT licence).
   * These are the same shapes rendered by @tabler/icons-react;
   * no npm dependency needed in a vanilla JS context.
   */

  var ICONS = {
    'lock': [
      '<path d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z"/>',
      '<path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0"/>',
      '<path d="M8 11v-4a4 4 0 1 1 8 0v4"/>',
    ],
    'lock-open': [
      /* shackle open — right leg doesn't re-enter the body */
      '<path d="M5 13a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z"/>',
      '<path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0-2 0"/>',
      '<path d="M8 11v-4a4 4 0 1 1 8 0"/>',
    ],
    'eye': [
      '<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0-4 0"/>',
      '<path d="M21 12c-2.4 4-5.4 6-9 6c-3.6 0-6.6-2-9-6c2.4-4 5.4-6 9-6c3.6 0 6.6 2 9 6"/>',
    ],
    'eye-off': [
      '<path d="M10.585 10.587a2 2 0 0 0 2.829 2.828"/>',
      '<path d="M16.681 16.673a8.717 8.717 0 0 1-4.681 1.327c-3.6 0-6.6-2-9-6c1.272-2.12 2.712-3.678 4.32-4.674m2.86-1.146a9.055 9.055 0 0 1 1.82-.18c3.6 0 6.6 2 9 6c-.666 1.11-1.379 2.067-2.138 2.87"/>',
      '<path d="M3 3l18 18"/>',
    ],
    'back': [
      '<path d="M9 14l-4-4l4-4"/>',
      '<path d="M5 10h11a4 4 0 1 1 0 8h-1"/>',
    ],
    'x': [
      '<path d="M18 6l-12 12"/>',
      '<path d="M6 6l12 12"/>',
    ],
  };

  function icon(name, size) {
    var paths = ICONS[name];
    if (!paths) return '';
    return [
      '<svg',
        ' xmlns="http://www.w3.org/2000/svg"',
        ' width="' + size + '"',
        ' height="' + size + '"',
        ' viewBox="0 0 24 24"',
        ' fill="none"',
        ' stroke="currentColor"',
        ' stroke-width="2"',
        ' stroke-linecap="round"',
        ' stroke-linejoin="round"',
        ' aria-hidden="true"',
        ' focusable="false"',
      '>',
        paths.join(''),
      '</svg>',
    ].join('');
  }
})();
