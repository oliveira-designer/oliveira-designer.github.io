/* Hope DS: js/tooltip.js
   Trigger behavior for css/components/tooltip.css. Load js/position.js before this file. A trigger with data-tooltip-trigger and
   aria-describedby points at its tooltip (role="tooltip"). The tooltip is hidden with the hidden attribute until it is shown.

   Markup:
     <button type="button" class="btn btn--secondary" data-tooltip-trigger aria-describedby="tip-save">Save</button>
     <div class="tooltip tooltip--top" role="tooltip" id="tip-save" data-placement="top" hidden>
       <span class="tooltip__bubble">Save the draft</span>
       <span class="tooltip__arrow" aria-hidden="true"></span>
     </div>

   Behavior (WCAG 1.4.13, hover and keyboard focus only; there is no touch behavior and no Toggletip):
     - Show: after SHOW_DELAY_MS of mouse or pen hover on the trigger, or of keyboard focus (:focus-visible) on it.
     - Hide: at once (HIDE_DELAY_MS) when neither the trigger nor the tooltip has hover or focus. There is no timeout while either keeps it.
     - Hoverable: the pointer can go from the trigger onto the bubble. The 8px gap between them is covered by a pseudo-element of the
       tooltip (css/components/tooltip.css), so the close can stay immediate.
     - Dismissible: Escape hides it without moving the focus. The key is consumed (preventDefault in the capture phase, as in
       js/popover.js), so a Modal or a Bottom Sheet that contains the trigger stays open: the first Escape closes the tooltip, the
       second closes the dialog. After Escape the tooltip stays hidden until hover and focus have both left the trigger and returned.
     - Touch: a tap shows nothing. Pointer events are filtered by pointerType (only "mouse" and "pen" count), and the focus a tap gives
       a button is ignored because it does not match :focus-visible. Where :focus-visible cannot be asked, the focus counts only when the
       last input was not a touch. Nothing essential may live in a tooltip, because it never appears on touch.
     - The placement is js/position.js (data-placement on the tooltip, default top, centered, flipped and shifted to stay in the
       viewport, the arrow following the trigger). No animation is added.
   SHOW_DELAY_MS and HIDE_DELAY_MS are product decisions of the Hope DS, not values from a standard. */
(function () {
  'use strict';

  var SHOW_DELAY_MS = 300;
  var HIDE_DELAY_MS = 0;   // 0: the close is not delayed on purpose, it only waits one task (see update())
  var DEFAULTS = { placement: 'top', align: 'center', clip: true };  // clip: the flip measures against the nearest clipping container (js/position.js)

  var lastWasTouch = false;
  document.addEventListener('pointerdown', function (e) { lastWasTouch = e.pointerType === 'touch'; }, true);
  document.addEventListener('keydown', function () { lastWasTouch = false; }, true);

  function keyboardFocus(trigger) {
    try { return trigger.matches(':focus-visible'); } catch (x) { return !lastWasTouch; }
  }

  function init(trigger) {
    var tip = document.getElementById((trigger.getAttribute('aria-describedby') || '').split(/\s+/)[0]);
    if (!tip) return;
    if (!tip.hasAttribute('data-placement')) tip.setAttribute('data-placement', DEFAULTS.placement);
    tip.hidden = true;

    var hoverTrigger = false;
    var hoverTip = false;
    var focused = false;
    var dismissed = false;   // Escape was pressed: stay hidden until hover and focus have both left
    var showTimer = 0;
    var hideTimer = 0;
    var stop = null;

    function wanted() { return hoverTrigger || hoverTip || focused; }
    function shown() { return !tip.hasAttribute('hidden'); }

    function onEscape(e) {
      if (e.key !== 'Escape' || !shown()) return;
      e.preventDefault();  // consumed here: js/overlay.js ignores a key that is already handled
      dismissed = true;
      hide();
    }

    function show() {
      showTimer = 0;
      if (shown() || dismissed || !wanted()) return;
      tip.removeAttribute('hidden');
      if (window.HopePosition) stop = window.HopePosition.watch(tip, trigger, DEFAULTS);
      document.addEventListener('keydown', onEscape, true);
    }

    function hide() {
      if (showTimer) { window.clearTimeout(showTimer); showTimer = 0; }
      if (hideTimer) { window.clearTimeout(hideTimer); hideTimer = 0; }
      if (stop) { stop(); stop = null; }
      document.removeEventListener('keydown', onEscape, true);
      tip.setAttribute('hidden', '');
    }

    // Called after every change of hover or focus. The close waits one task (setTimeout with HIDE_DELAY_MS = 0), never longer: when the
    // pointer goes from the trigger onto the tooltip, the pointerleave of the trigger arrives before the pointerenter of the tooltip, and
    // a synchronous close would remove the tooltip between the two events.
    function update() {
      if (wanted()) {
        if (hideTimer) { window.clearTimeout(hideTimer); hideTimer = 0; }
        if (!shown() && !dismissed && !showTimer) showTimer = window.setTimeout(show, SHOW_DELAY_MS);
        return;
      }
      dismissed = false;
      if (showTimer) { window.clearTimeout(showTimer); showTimer = 0; }
      if (shown() && !hideTimer) {
        hideTimer = window.setTimeout(function () { hideTimer = 0; if (!wanted()) hide(); }, HIDE_DELAY_MS);
      }
    }

    function mouseLike(e) { return e.pointerType === 'mouse' || e.pointerType === 'pen'; }

    trigger.addEventListener('pointerenter', function (e) { if (mouseLike(e)) { hoverTrigger = true; update(); } });
    trigger.addEventListener('pointerleave', function (e) { if (mouseLike(e)) { hoverTrigger = false; update(); } });
    tip.addEventListener('pointerenter', function (e) { if (mouseLike(e)) { hoverTip = true; update(); } });
    tip.addEventListener('pointerleave', function (e) { if (mouseLike(e)) { hoverTip = false; update(); } });
    trigger.addEventListener('focus', function () { if (keyboardFocus(trigger)) { focused = true; update(); } });
    trigger.addEventListener('blur', function () { focused = false; update(); });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-tooltip-trigger][aria-describedby]'), init);

  window.HopeTooltip = { SHOW_DELAY_MS: SHOW_DELAY_MS, HIDE_DELAY_MS: HIDE_DELAY_MS };
})();
