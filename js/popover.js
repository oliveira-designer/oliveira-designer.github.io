/* Hope DS: js/popover.js
   Progressive behavior for css/components/popover.css. A trigger with data-popover-trigger, aria-expanded and aria-controls
   points at the panel. A click toggles it, Escape closes it and returns the focus to the trigger, a click outside closes it
   without moving the focus, and the focus leaving the panel for somewhere else closes it. It does not block the page and does
   not trap the focus (the Modal does). The panel sits right after the trigger in the DOM, so Tab goes into it.
   Placement is CSS (below, aligned to the start, 8px away); when the panel would leave the viewport this script adds
   .popover--above (flip up, only if there is room above) and .popover--end (align to the end). Escape calls
   preventDefault, so a Modal that contains the Popover stays open. */
(function () {
  'use strict';

  var OFFSET = 8;  // same as --space-2, the gap in popover.css

  function init(trigger) {
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;

    function isOpen() { return !panel.hasAttribute('hidden'); }

    function place() {
      panel.classList.remove('popover--above', 'popover--end');
      var p = panel.getBoundingClientRect();
      var t = trigger.getBoundingClientRect();
      var vw = document.documentElement.clientWidth;
      if (p.bottom > window.innerHeight && t.top >= p.height + OFFSET) panel.classList.add('popover--above');
      if (p.right > vw && t.right - p.width >= 0) panel.classList.add('popover--end');
    }

    function open() {
      panel.removeAttribute('hidden');
      trigger.setAttribute('aria-expanded', 'true');
      place();
    }

    function close(returnFocus) {
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
