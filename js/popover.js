/* Hope DS: js/popover.js
   Progressive behavior for css/components/popover.css. A trigger with data-popover-trigger, aria-expanded and aria-controls
   points at the panel. A click toggles it, Escape closes it and returns the focus to the trigger, a click outside closes it
   without moving the focus, and the focus leaving the panel for somewhere else closes it. It does not block the page and does
   not trap the focus (the Modal does). The panel sits right after the trigger in the DOM, so Tab goes into it.
   Placement is js/position.js (load it before this file): below the trigger, aligned to its start, --space-2 away, flipped above
   when it does not fit, kept inside the viewport on the cross axis, recalculated on resize and on scroll while open. The panel
   may say otherwise with data-placement and data-align. Without position.js the CSS default (below, start, 8px) applies.
   Escape calls preventDefault, so a Modal that contains the Popover stays open. */
(function () {
  'use strict';

  function init(trigger) {
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;

    function isOpen() { return !panel.hasAttribute('hidden'); }

    var stop = null;

    function open() {
      panel.removeAttribute('hidden');
      trigger.setAttribute('aria-expanded', 'true');
      if (window.HopePosition) stop = window.HopePosition.watch(panel, trigger, { placement: 'bottom', align: 'start' });
    }

    function close(returnFocus) {
      if (stop) { stop(); stop = null; }
      panel.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
      if (returnFocus) trigger.focus();
    }

    trigger.addEventListener('click', function () { if (isOpen()) close(false); else open(); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        close(panel.contains(document.activeElement) || document.activeElement === trigger);
      }
    }, true);

    document.addEventListener('click', function (e) {
      if (isOpen() && !panel.contains(e.target) && !trigger.contains(e.target)) close(false);
    });

    panel.addEventListener('focusout', function (e) {
      if (isOpen() && e.relatedTarget && !panel.contains(e.relatedTarget) && e.relatedTarget !== trigger) close(false);
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-popover-trigger][aria-controls]'), init);
})();
