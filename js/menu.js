/* Hope DS: js/menu.js
   Progressive behavior for css/components/menu.css. A trigger with aria-haspopup="menu" and aria-controls points at a
   panel with role="menu". Up and Down move the focus (skipping aria-disabled items), Home and End jump, Escape closes
   and returns the focus to the trigger, Tab closes, a click outside closes. A menuitemradio or menuitemcheckbox updates
   aria-checked. Typeahead and positioning against the trigger are out of scope. */
(function () {
  'use strict';

  function init(trigger) {
    var panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;

    function items() {
      return Array.prototype.slice.call(panel.querySelectorAll('[role^="menuitem"]')).filter(function (el) {
        return el.getAttribute('aria-disabled') !== 'true';
      });
    }

    function isOpen() { return !panel.hasAttribute('hidden'); }

    function open(focusIndex) {
      panel.removeAttribute('hidden');
      trigger.setAttribute('aria-expanded', 'true');
      var list = items();
      if (list.length) (focusIndex === 'last' ? list[list.length - 1] : list[0]).focus();
    }

    function close(returnFocus) {
      panel.setAttribute('hidden', '');
      trigger.setAttribute('aria-expanded', 'false');
      if (returnFocus) trigger.focus();
    }

    trigger.addEventListener('click', function () { if (isOpen()) close(false); else open('first'); });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); open('first'); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); open('last'); }
    });

    panel.addEventListener('keydown', function (e) {
      var list = items();
      var i = list.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); list[(i + 1) % list.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); list[(i - 1 + list.length) % list.length].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); list[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); list[list.length - 1].focus(); }
      else if (e.key === 'Escape') { e.preventDefault(); close(true); }
      else if (e.key === 'Tab') { close(false); }
    });

    panel.addEventListener('click', function (e) {
      var item = e.target.closest('[role^="menuitem"]');
      if (!item || item.getAttribute('aria-disabled') === 'true') return;
      var role = item.getAttribute('role');
      if (role === 'menuitemradio') {
        var group = item.closest('[role="group"]') || panel;
        Array.prototype.forEach.call(group.querySelectorAll('[role="menuitemradio"]'), function (r) { r.setAttribute('aria-checked', r === item ? 'true' : 'false'); });
      } else if (role === 'menuitemcheckbox') {
        item.setAttribute('aria-checked', item.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
      }
      close(true);
    });

    document.addEventListener('click', function (e) {
      if (isOpen() && !panel.contains(e.target) && !trigger.contains(e.target)) close(false);
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[aria-haspopup="menu"][aria-controls]'), init);
})();
