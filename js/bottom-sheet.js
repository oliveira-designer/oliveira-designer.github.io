/* Hope DS: js/bottom-sheet.js
   Progressive behavior for css/components/bottom-sheet.css. Load js/overlay.js first: it holds what the Bottom Sheet shares with the
   Modal and the Lightbox (inert page, scroll lock, focus trap, Escape, focus return). This file owns only what is specific to the sheet:
   the open and close wiring, the initial focus and the swipe down.

   A trigger with data-bottom-sheet-open="<id>" opens the dialog with that id (class "bottom-sheet", role="dialog", aria-modal="true").
   Elements with data-bottom-sheet-close close it. The hidden attribute shows and hides it. The focus moves in on open (to the element
   with data-bottom-sheet-initial-focus, else the first focusable) and returns to the trigger on close. A click on the scrim does NOT
   close it (a sheet is for decisions). The dialog is moved to the end of <body> at start, so making the other children of <body> inert
   does not make the dialog inert. When the body of the dialog scrolls it gets tabindex="0" so a keyboard user can scroll it.

   Swipe down (a reinforcement of the Cancel button, never the only way to close): pointer events with setPointerCapture on the grabber
   row and the title, never on the scrollable body. While dragging, the panel follows the pointer down (never above its resting place).
   On release it closes when it moved more than CLOSE_RATIO of its height, or when the release speed passed FLICK_SPEED with the panel
   moved at least MIN_FLICK px; otherwise it goes back to rest at once. pointercancel also returns it to rest. Closing by gesture runs the
   same close path as the Cancel button and Escape. */
(function () {
  'use strict';

  var overlay = window.HopeOverlay;
  if (!overlay) { if (window.console) console.error('js/bottom-sheet.js needs js/overlay.js loaded before it.'); return; }

  var CLOSE_RATIO = 0.3;   // close when dragged past 30% of the panel height
  var FLICK_SPEED = 0.5;   // px per ms (500 px/s) measured over the last 100 ms
  var MIN_FLICK = 24;      // px: a flick needs at least this much travel, so a twitch does not close it
  var SAMPLE_MS = 100;

  var scrim = null;
  var current = null;

  function getScrim() {
    if (!scrim) {
      scrim = document.createElement('div');
      scrim.className = 'modal-scrim';  // the same scrim as the Modal (css/components/modal.css)
      scrim.setAttribute('aria-hidden', 'true');
      scrim.setAttribute('data-overlay-keep', '');  // not made inert (it is part of the overlay)
      scrim.hidden = true;
      document.body.appendChild(scrim);
    }
    return scrim;
  }

  function syncScroll() {
    if (!current) return;
    var body = current.querySelector('.bottom-sheet__body');
    if (!body) return;
    if (body.scrollHeight > body.clientHeight + 1) body.setAttribute('tabindex', '0');
    else body.removeAttribute('tabindex');
  }

  function open(dialog, trigger) {
    if (!dialog || !overlay.activate(dialog, { trigger: trigger, onEscape: close })) return;
    current = dialog;
    dialog.style.transform = '';
    getScrim().hidden = false;
    dialog.hidden = false;
    syncScroll();
    var target = dialog.querySelector('[data-bottom-sheet-initial-focus]') || overlay.focusables(dialog)[0];
    if (!target) {
      dialog.setAttribute('tabindex', '-1');
      target = dialog;
    }
    target.focus();
  }

  function close() {
    if (!current) return;
    current.hidden = true;
    current.style.transform = '';
    getScrim().hidden = true;
    current = null;
    overlay.deactivate();
  }

  /* ---- swipe down ---- */
  function wireDrag(dialog) {
    var regions = dialog.querySelectorAll('.bottom-sheet__handle, .bottom-sheet__header');
    var drag = null;

    function rest() {
      dialog.style.transform = '';
      drag = null;
    }

    function onDown(e) {
      if (drag || (e.pointerType === 'mouse' && e.button !== 0)) return;
      drag = { id: e.pointerId, startY: e.clientY, height: dialog.getBoundingClientRect().height, dy: 0, samples: [[e.timeStamp, 0]], region: e.currentTarget };
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (x) { /* not capturable: the events still arrive while it is over the region */ }
    }

    function onMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var dy = Math.max(0, e.clientY - drag.startY);  // never above the resting place
      drag.dy = dy;
      drag.samples.push([e.timeStamp, dy]);
      while (drag.samples.length > 2 && e.timeStamp - drag.samples[0][0] > SAMPLE_MS) drag.samples.shift();
      dialog.style.transform = 'translateY(' + dy + 'px)';
    }

    function onUp(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var s = drag.samples;
      var span = s[s.length - 1][0] - s[0][0];
      var speed = span > 0 ? (s[s.length - 1][1] - s[0][1]) / span : 0;
      var shouldClose = drag.dy > drag.height * CLOSE_RATIO || (speed > FLICK_SPEED && drag.dy >= MIN_FLICK);
      try { drag.region.releasePointerCapture(drag.id); } catch (x) { /* already released */ }
      if (shouldClose) { drag = null; close(); } else rest();
    }

    function onCancel(e) {
      if (!drag || e.pointerId !== drag.id) return;
      rest();
    }

    Array.prototype.forEach.call(regions, function (region) {
      region.addEventListener('pointerdown', onDown);
      region.addEventListener('pointermove', onMove);
      region.addEventListener('pointerup', onUp);
      region.addEventListener('pointercancel', onCancel);
    });
  }

  document.addEventListener('click', function (e) {
    var opener = e.target.closest('[data-bottom-sheet-open]');
    if (opener) {
      e.preventDefault();
      open(document.getElementById(opener.getAttribute('data-bottom-sheet-open')), opener);
      return;
    }
    if (current && e.target.closest('[data-bottom-sheet-close]') && current.contains(e.target)) close();
  });

  window.addEventListener('resize', syncScroll);

  Array.prototype.forEach.call(document.querySelectorAll('.bottom-sheet[role="dialog"]'), function (dialog) {
    dialog.hidden = true;
    document.body.appendChild(dialog);
    wireDrag(dialog);
  });

  window.HopeBottomSheet = { open: open, close: close };
})();
