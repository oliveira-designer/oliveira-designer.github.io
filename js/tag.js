/* Hope DS: js/tag.js
   Progressive behavior for css/components/tag.css. A Tag with data-tag-removable is removed by a click or, when it has the
   focus, by Delete or Backspace. Before it leaves the page it fires a cancelable "hope:tag-remove" event (bubbles, detail.tag),
   so the application can drop the value from its own state or call preventDefault to keep the Tag. The focus then goes to the
   next removable Tag, else the previous one, else the parent element (which gets tabindex="-1"), so it is never lost. */
(function () {
  'use strict';

  function remove(tag) {
    var evt = new CustomEvent('hope:tag-remove', { bubbles: true, cancelable: true, detail: { tag: tag } });
    if (!tag.dispatchEvent(evt)) return;
    var parent = tag.parentElement;
    var target = [tag.nextElementSibling, tag.previousElementSibling].filter(function (el) {
      return el && el.matches('[data-tag-removable]:not(:disabled)');
    })[0];
    if (!target && parent) {
      if (!parent.hasAttribute('tabindex')) parent.setAttribute('tabindex', '-1');
      target = parent;
    }
    tag.remove();
    if (target) target.focus();
  }

  document.addEventListener('click', function (e) {
    var tag = e.target.closest('[data-tag-removable]');
    if (tag && !tag.disabled) remove(tag);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Delete' && e.key !== 'Backspace') return;
    var tag = e.target.closest && e.target.closest('[data-tag-removable]');
    if (tag && !tag.disabled) { e.preventDefault(); remove(tag); }
  });
})();
