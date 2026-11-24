/* Hope DS: js/tabs.js
   Progressive behavior for css/components/tabs.css. The markup already carries the no-JavaScript state (first tab
   selected, first panel visible, the others hidden); this script adds selection by click, roving tabindex, arrow keys
   (automatic activation), Home and End, and skips disabled tabs (aria-disabled="true"). */
(function () {
  'use strict';

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function init(root) {
    var list = root.querySelector('[role="tablist"]');
    if (!list) return;
    var tabs = Array.prototype.slice.call(list.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function panelOf(tab) {
      var id = tab.getAttribute('aria-controls');
      return id ? document.getElementById(id) : null;
    }

    function enabled() {
      return tabs.filter(function (t) { return t.getAttribute('aria-disabled') !== 'true'; });
    }

    // The panel is a tab stop only when it has no focusable content of its own.
    function updatePanelTabindex(panel) {
      if (!panel) return;
      if (panel.querySelector(FOCUSABLE)) panel.removeAttribute('tabindex');
      else panel.setAttribute('tabindex', '0');
    }

    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
        var p = panelOf(t);
        if (p) {
          if (on) { p.removeAttribute('hidden'); updatePanelTabindex(p); }
          else p.setAttribute('hidden', '');
        }
      });
      if (focus) tab.focus();
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        if (tab.getAttribute('aria-disabled') === 'true') return;
        select(tab, false);
      });
      tab.addEventListener('keydown', function (e) {
        var list = enabled();
        var i = list.indexOf(tab);
        var next = null;
        if (e.key === 'ArrowRight') next = list[(i + 1) % list.length];
        else if (e.key === 'ArrowLeft') next = list[(i - 1 + list.length) % list.length];
        else if (e.key === 'Home') next = list[0];
        else if (e.key === 'End') next = list[list.length - 1];
        if (next) { e.preventDefault(); select(next, true); }
      });
    });

    var current = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || enabled()[0];
    if (current) select(current, false);
  }

  Array.prototype.forEach.call(document.querySelectorAll('.tabs'), init);
})();
