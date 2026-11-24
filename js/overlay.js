/* Hope DS: js/overlay.js
   Shared by js/modal.js and js/lightbox.js (load it BEFORE them: a plain script, no bundler). It owns what every blocking
   overlay needs, so the two components behave the same:
     - the page behind is inert while the overlay is open, and restored after;
     - the page scroll is locked while it is open, and restored after;
     - the focus is trapped (Tab and Shift+Tab loop inside), and a safety net brings it back if it lands outside;
     - Escape calls the overlay's own close function (and is ignored when another handler already used the key, so a Popover or
       Menu inside the overlay closes first);
     - the focus returns to the element that opened it.
   The component keeps its own open and close markup (the hidden attribute, classes, transitions) and its own initial focus.

   API (window.HopeOverlay):
     HopeOverlay.activate(container, { trigger, onEscape })   returns true, or false if an overlay is already active
     HopeOverlay.deactivate({ restoreFocus = true })           returns the element that had the focus before
     HopeOverlay.focusables(container)                         visible focusable elements inside the container
     HopeOverlay.isActive()

   What becomes inert: the walk starts at <body>. A child is made inert as a whole, EXCEPT when it is the overlay itself, when it
   is a keep element, or when it contains one. Keep elements are ".toast", "[data-overlay-keep]" and "[data-modal-keep]" (the
   name used in v2.13.0). A child that contains the overlay or a keep element is not made inert: the walk goes inside it and
   makes inert its other children, so a Toast nested in <main> or in a wrapper stays reachable and above the overlay (z-index 500
   against 200). */
(function () {
  'use strict';

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  var KEEP = '.toast, [data-overlay-keep], [data-modal-keep]';

  var active = null;       // the container of the open overlay
  var onEscape = null;
  var prevFocus = null;
  var prevOverflow = '';
  var inerted = [];

  function focusables(container) {
    return Array.prototype.filter.call(container.querySelectorAll(FOCUSABLE), function (el) {
      return el.getClientRects().length > 0;
    });
  }

  // Makes inert every node of the tree under "root" that neither is nor contains the container or a keep element.
  function inertAround(root, container) {
    Array.prototype.forEach.call(root.children, function (el) {
      if (el === container || el.tagName === 'SCRIPT' || el.inert) return;
      if (el.matches(KEEP)) return;
      if (el.contains(container) || el.querySelector(KEEP)) { inertAround(el, container); return; }
      el.inert = true;
      inerted.push(el);
    });
  }

  function onKeydown(e) {
    if (!active) return;
    if (e.key === 'Escape') {
      if (!e.defaultPrevented && onEscape) { e.preventDefault(); onEscape(); }
      return;
    }
    if (e.key !== 'Tab') return;
    var list = focusables(active);
    if (!list.length) { e.preventDefault(); active.focus(); return; }
    var first = list[0];
    var last = list[list.length - 1];
    var current = document.activeElement;
    if (!active.contains(current)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && (current === first || current === active)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && current === last) { e.preventDefault(); first.focus(); }
  }

  // Safety net: if the focus lands outside (a script, a screen reader), bring it back in.
  function onFocusin(e) {
    if (active && !active.contains(e.target)) {
      var list = focusables(active);
      (list[0] || active).focus();
    }
  }

  function activate(container, opts) {
    if (active || !container) return false;
    opts = opts || {};
    active = container;
    onEscape = opts.onEscape || null;
    prevFocus = opts.trigger || document.activeElement;
    inertAround(document.body, container);
    prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('focusin', onFocusin);
    return true;
  }

  function deactivate(opts) {
    if (!active) return null;
    var restore = !opts || opts.restoreFocus !== false;
    var back = prevFocus;
    active = null;
    onEscape = null;
    prevFocus = null;
    inerted.forEach(function (el) { el.inert = false; });
    inerted = [];
    document.body.style.overflow = prevOverflow;
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('focusin', onFocusin);
    if (restore && back && typeof back.focus === 'function') back.focus();
    return back;
  }

  window.HopeOverlay = {
    activate: activate,
    deactivate: deactivate,
    focusables: focusables,
    isActive: function () { return !!active; }
  };
})();
