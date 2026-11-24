/* Hope DS: js/modal.js
   Progressive behavior for css/components/modal.css. A trigger with data-modal-open="<id>" opens the dialog with that id
   (class "modal", role="dialog", aria-modal="true", aria-labelledby, aria-describedby). Same approach as js/lightbox.js:
   the hidden attribute shows and hides it, the focus moves in and returns to the trigger, the page scroll is locked while it
   is open. On top of that: the focus is trapped inside, the page behind is inert, and Escape closes it. A click on the scrim
   does NOT close it (a Modal is for decisions). Elements with data-modal-close close it. The dialog is moved to the end of
   <body> at start, so making the other children of <body> inert does not make the dialog inert. A Toast (.toast) and any
   element with data-modal-keep stay interactive, so a notification still reaches the user. Esc is ignored when another
   handler already used it (event.defaultPrevented), for example a Popover or Menu inside the dialog. */
(function () {
  'use strict';

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var scrim = null;
  var active = null;
  var prevFocus = null;
  var prevOverflow = '';
  var inerted = [];

  function getScrim() {
    if (!scrim) {
      scrim = document.createElement('div');
      scrim.className = 'modal-scrim';
      scrim.setAttribute('aria-hidden', 'true');
      scrim.hidden = true;
      document.body.appendChild(scrim);
    }
    return scrim;
  }

  function focusables(dialog) {
    return Array.prototype.filter.call(dialog.querySelectorAll(FOCUSABLE), function (el) {
      return el.getClientRects().length > 0;
    });
  }

  function open(dialog, trigger) {
    if (active || !dialog) return;
    active = dialog;
    prevFocus = trigger || document.activeElement;
    var s = getScrim();

    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === dialog || el === s || el.tagName === 'SCRIPT' || el.inert) return;
      if (el.matches('.toast, [data-modal-keep]')) return;
      el.inert = true;
      inerted.push(el);
    });

    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    s.hidden = false;
    dialog.hidden = false;

    var target = dialog.querySelector('[data-modal-initial-focus]') || focusables(dialog)[0];
    if (!target) {
      dialog.setAttribute('tabindex', '-1');
      target = dialog;
    }
    target.focus();
  }

  function close() {
    if (!active) return;
    var dialog = active;
    active = null;
    dialog.hidden = true;
    getScrim().hidden = true;
    inerted.forEach(function (el) { el.inert = false; });
    inerted = [];
    document.body.style.overflow = prevOverflow;
    var back = prevFocus;
    prevFocus = null;
    if (back && typeof back.focus === 'function') back.focus();
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-modal-open]');
    if (opener) {
      e.preventDefault();
      open(document.getElementById(opener.getAttribute('data-modal-open')), opener);
      return;
    }
    if (active && e.target.closest('[data-modal-close]') && active.contains(e.target)) {
      close();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!active) return;
    if (e.key === 'Escape') {
      if (!e.defaultPrevented) { e.preventDefault(); close(); }
      return;
    }
    if (e.key !== 'Tab') return;
    var list = focusables(active);
    if (!list.length) { e.preventDefault(); active.focus(); return; }
    var first = list[0];
    var last = list[list.length - 1];
    if (!active.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && (document.activeElement === first || document.activeElement === active)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  // Safety net: if the focus lands outside the dialog (a script, a screen reader), bring it back in.
  document.addEventListener('focusin', function (e) {
    if (active && !active.contains(e.target)) {
      var list = focusables(active);
      (list[0] || active).focus();
    }
  });

  Array.prototype.forEach.call(document.querySelectorAll('.modal[role="dialog"]'), function (dialog) {
    dialog.hidden = true;
    document.body.appendChild(dialog);
  });

  window.HopeModal = { open: open, close: close };
})();
