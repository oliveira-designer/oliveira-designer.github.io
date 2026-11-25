/* Hope DS: js/position.js
   One small positioner shared by the Menu, the Popover, the Breadcrumb Ellipsis panel and (in the docs demos) the Tooltip. It places an
   absolutely positioned panel next to its trigger, flips it to the opposite side when the preferred side does not fit in the viewport,
   and keeps it inside the viewport on the cross axis. It does not use CSS anchor positioning or the Popover API: the panel stays in the
   normal layering, so the --z-* scale holds (a panel never covers a Toast). It adds no animation.

   API (window.HopePosition):
     HopePosition.compute(panelSize, triggerRect, opts, viewport)  pure: { left, top, placement, align } in viewport coordinates
     HopePosition.place(panel, trigger, defaults)                  measures and sets left and top once; returns the placement used
     HopePosition.watch(panel, trigger, defaults)                  place() now, again on resize and on a scroll of any ancestor; returns stop()
   The placement comes from the panel: data-placement="top|bottom|left|right" and data-align="start|center|end" (the names of the Figma
   Tooltip placements). "defaults" ({ placement, align }) fills in what the panel does not say: Popover, Menu and the Breadcrumb panel
   use bottom + start; the Tooltip uses top + center. The Tooltip classes tooltip--top|bottom|left|right follow the side in use, so
   the arrow keeps pointing at the trigger after a flip.

   Rules (the same on every component):
     - the offset between trigger and panel is --space-2 and the margin kept from the viewport edge is --space-4 (read from the tokens);
     - if the preferred side does not fit and the opposite side does, flip; if neither fits, keep the side with more room;
     - on the cross axis the alignment flips (start to end) when that makes it fit, otherwise the panel is shifted to stay inside;
     - the panel is placed relative to its offset parent, so it scrolls with the page like any in-flow panel;
     - the focus is never moved here.
   The panel needs position: absolute (or fixed) in CSS and must not be hidden when place() runs. Declarative use: a visible panel with
   data-anchor="<trigger id>" and data-placement is placed and watched on load (the Tooltip demos). */
(function () {
  'use strict';

  var OPPOSITE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
  var SIDES = ['top', 'bottom', 'left', 'right'];
  var ALIGNS = ['start', 'center', 'end'];

  function token(name) {
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
    return isNaN(v) ? 0 : v;
  }

  // The main-axis side and the cross-axis alignment, without touching the DOM.
  function compute(size, t, opts, vp) {
    var w = size.width;
    var h = size.height;
    var offset = opts.offset;
    var margin = opts.margin;
    var side = opts.placement;

    // Free room beyond the trigger on a side, after the offset and the viewport margin.
    function room(s) {
      if (s === 'bottom') return vp.height - t.bottom - margin - offset;
      if (s === 'top') return t.top - margin - offset;
      if (s === 'right') return vp.width - t.right - margin - offset;
      return t.left - margin - offset;
    }
    function need(s) { return s === 'top' || s === 'bottom' ? h : w; }
    function fits(s) { return room(s) >= need(s); }

    if (!fits(side)) {
      var opp = OPPOSITE[side];
      if (fits(opp) || room(opp) > room(side)) side = opp;
    }

    var left;
    var top;
    var vertical = side === 'top' || side === 'bottom';
    // Cross axis: x for top and bottom, y for left and right.
    var size2 = vertical ? w : h;
    var a0 = vertical ? t.left : t.top;
    var a1 = vertical ? t.right : t.bottom;
    var min = margin;
    var max = (vertical ? vp.width : vp.height) - margin;
    function pos(al) {
      if (al === 'end') return a1 - size2;
      if (al === 'center') return a0 + (a1 - a0 - size2) / 2;
      return a0;
    }
    function inside(p) { return p >= min && p + size2 <= max; }
    var align = opts.align;
    var p = pos(align);
    if (!inside(p)) {
      var other = align === 'start' ? 'end' : align === 'end' ? 'start' : null;
      if (other && inside(pos(other))) { align = other; p = pos(align); }
      else p = Math.max(min, Math.min(p, max - size2));
    }
    if (vertical) {
      left = p;
      top = side === 'bottom' ? t.bottom + offset : t.top - offset - h;
    } else {
      top = p;
      left = side === 'right' ? t.right + offset : t.left - offset - w;
    }
    return { left: left, top: top, placement: side, align: align };
  }

  // Where the offset parent's padding box starts, in viewport coordinates (the panel's left and top are relative to it).
  function originOf(panel) {
    if (getComputedStyle(panel).position === 'fixed') return { x: 0, y: 0 };
    var op = panel.offsetParent;
    if (!op || op === document.documentElement || (op === document.body && getComputedStyle(op).position === 'static')) {
      return { x: -window.pageXOffset, y: -window.pageYOffset };
    }
    var r = op.getBoundingClientRect();
    return { x: r.left + op.clientLeft - op.scrollLeft, y: r.top + op.clientTop - op.scrollTop };
  }

  function pick(value, list, fallback) {
    return list.indexOf(value) >= 0 ? value : fallback;
  }

  function place(panel, trigger, defaults) {
    defaults = defaults || {};
    var placement = pick(panel.getAttribute('data-placement'), SIDES, pick(defaults.placement, SIDES, 'bottom'));
    var align = pick(panel.getAttribute('data-align'), ALIGNS, pick(defaults.align, ALIGNS, 'start'));
    // Measure at the corner of the offset parent so the width does not depend on the room left to the right of the old position.
    panel.style.left = '0px';
    panel.style.top = '0px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
    var pr = panel.getBoundingClientRect();
    var res = compute(
      { width: pr.width, height: pr.height },
      trigger.getBoundingClientRect(),
      { placement: placement, align: align, offset: token('--space-2'), margin: token('--space-4') },
      { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight }
    );
    var o = originOf(panel);
    panel.style.left = (res.left - o.x) + 'px';
    panel.style.top = (res.top - o.y) + 'px';
    panel.setAttribute('data-placement-actual', res.placement);
    if (panel.classList.contains('tooltip')) {
      SIDES.forEach(function (s) { panel.classList.toggle('tooltip--' + s, s === res.placement); });
    }
    return res;
  }

  function watch(panel, trigger, defaults) {
    var frame = 0;
    function again() {
      if (frame) return;
      frame = window.requestAnimationFrame(function () {
        frame = 0;
        if (!panel.hasAttribute('hidden')) place(panel, trigger, defaults);
      });
    }
    place(panel, trigger, defaults);
    window.addEventListener('resize', again);
    window.addEventListener('scroll', again, true);  // capture: a scroll of any ancestor, not only of the window
    return function stop() {
      window.removeEventListener('resize', again);
      window.removeEventListener('scroll', again, true);
      if (frame) { window.cancelAnimationFrame(frame); frame = 0; }
      panel.style.left = '';
      panel.style.top = '';
      panel.style.right = '';
      panel.style.bottom = '';
      panel.removeAttribute('data-placement-actual');
    };
  }

  window.HopePosition = { compute: compute, place: place, watch: watch };

  // Declarative panels that are always visible (the Tooltip demos): data-anchor names the trigger.
  var TOOLTIP_DEFAULTS = { placement: 'top', align: 'center' };
  function anchored(fn) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-anchor][data-placement]'), function (panel) {
      var trigger = document.getElementById(panel.getAttribute('data-anchor'));
      if (trigger && !panel.hasAttribute('hidden')) fn(panel, trigger);
    });
  }
  anchored(function (panel, trigger) { watch(panel, trigger, TOOLTIP_DEFAULTS); });
  // The fonts change the size of the trigger and of the panel: measure once more when they are ready (watch() already listens to resize).
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { anchored(function (panel, trigger) { place(panel, trigger, TOOLTIP_DEFAULTS); }); });
  }
})();
