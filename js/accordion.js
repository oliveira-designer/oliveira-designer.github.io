/* Hope DS: js/accordion.js
   Progressive behavior for css/components/accordion.css. The header is a <button class="accordion__trigger"> with
   aria-expanded and aria-controls; a click, Enter or Space toggles the panel (the native button handles the keys) by setting
   aria-expanded and the hidden attribute. Items open independently. The panel is a region (role="region" plus
   aria-labelledby the trigger) only when the list has 6 items or fewer; with more it loses both, so the landmark list is not
   flooded. There is no height animation (Figma defines none). */
(function () {
  'use strict';

  var MAX_REGIONS = 6;

  function init(root) {
    var triggers = Array.prototype.slice.call(root.querySelectorAll('.accordion__trigger'));
    var regions = triggers.length <= MAX_REGIONS;

    triggers.forEach(function (trigger) {
      var panel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (!panel) return;

      if (regions) {
        panel.setAttribute('role', 'region');
        if (trigger.id) panel.setAttribute('aria-labelledby', trigger.id);
      } else {
        panel.removeAttribute('role');
        panel.removeAttribute('aria-labelledby');
      }

      panel.hidden = trigger.getAttribute('aria-expanded') !== 'true';

      trigger.addEventListener('click', function () {
        var open = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.hidden = open;
      });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('.accordion'), init);
})();
