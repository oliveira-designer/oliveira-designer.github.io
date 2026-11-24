/* Hope DS: js/modal.js
   Progressive behavior for css/components/modal.css. Load js/overlay.js first: it holds what the Modal shares with the
   Lightbox (inert page, scroll lock, focus trap, Escape, focus return).
   A trigger with data-modal-open="<id>" opens the dialog with that id (class "modal", role="dialog", aria-modal="true",
   aria-labelledby, aria-describedby). The hidden attribute shows and hides it. The focus moves in on open (to the element with
   data-modal-initial-focus, else the first focusable) and returns to the trigger on close. A click on the scrim does NOT close
   it (a Modal is for decisions). Elements with data-modal-close close it. The dialog is moved to the end of <body> at start, so
   making the other children of <body> inert does not make the dialog inert. When the body of the dialog scrolls (narrow
   screens), it gets tabindex="0" so a keyboard user can scroll it. */
(function () {
  'use strict';

  var overlay = window.HopeOverlay;
  if (!overlay) { if (window.console) console.error('js/modal.js needs js/overlay.js loaded before it.'); return; }

  var scrim = null;
  var current = null;

  function getScrim() {
    if (!scrim) {
      scrim = document.createElement('div');
      scrim.className = 'modal-scrim';
      scrim.setAttribute('aria-hidden', 'true');
      scrim.setAttribute('data-overlay-keep', '');  // not made inert (it is part of the overlay)
      scrim.hidden = true;
      document.body.appendChild(scrim);
    }
    return scrim;
  }

  function syncScroll() {
    if (!current) return;
    var body = current.querySelector('.modal__body');
    if (!body) return;
    if (body.scrollHeight > body.clientHeight + 1) body.setAttribute('tabindex', '0');
    else body.removeAttribute('tabindex');
  }

  function open(dialog, trigger) {
    if (!dialog || !overlay.activate(dialog, { trigger: trigger, onEscape: close })) return;
    current = dialog;
    getScrim().hidden = false;
    dialog.hidden = false;
    syncScroll();
    var target = dialog.querySelector('[data-modal-initial-focus]') || overlay.focusables(dialog)[0];
    if (!target) {
      dialog.setAttribute('tabindex', '-1');
      target = dialog;
    }
    target.focus();
  }

  function close() {
    if (!current) return;
    current.hidden = true;
    getScrim().hidden = true;
    current = null;
    overlay.deactivate();
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-modal-open]');
    if (opener) {
      e.preventDefault();
      open(document.getElementById(opener.getAttribute('data-modal-open')), opener);
      return;
    }
    if (current && e.target.closest('[data-modal-close]') && current.contains(e.target)) close();
  });

  window.addEventListener('resize', syncScroll);

  Array.prototype.forEach.call(document.querySelectorAll('.modal[role="dialog"]'), function (dialog) {
    dialog.hidden = true;
    document.body.appendChild(dialog);
  });

  window.HopeModal = { open: open, close: close };
})();
