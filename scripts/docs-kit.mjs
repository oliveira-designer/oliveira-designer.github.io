// Shared building blocks of the Hope DS docs pages: the Hope Table markup (css/components/table.css), the model
// sections (title, live example card, HTML disclosure, essentials) and small list helpers. Pages are built by
// build-components-doc.mjs, build-tokens-doc.mjs and build-review-page.mjs; nothing here knows a component.

import { esc } from './docs-layout.mjs';

const NL = String.fromCharCode(10);

export const code = (v) => `<code>${esc(v)}</code>`;
export const list = (items, cls = 'docs-ds-list') => `<ul class="${cls}">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
export const firstSentence = (s) => (s.match(/^.*?\.(?=\s|$)/) || [s])[0];
export const indentBlock = (text, pad) => text.split(NL).join(NL + pad);

/* ---------------------------------------------------------------------------
   Hope Table. Markup contract (docs/components/table.html): a focusable region named by its caption,
   th scope col / row, no rowspan or colspan.
   cols: [{ label, end }]. rows: arrays of HTML cells (the first cell is the row header) or
   { attrs, cells } when the row needs attributes. caption: visible text; hidden: true keeps it in the
   accessibility tree but not on screen (data-table__caption--hidden).
   ------------------------------------------------------------------------ */
export function hopeTable({ id, caption, hidden = false, cols, rows }) {
  const L = [];
  L.push(`<div class="data-table" role="region" aria-labelledby="${id}" tabindex="0">`);
  L.push('  <table class="data-table__grid">');
  L.push(`    <caption class="data-table__caption${hidden ? ' data-table__caption--hidden' : ''}" id="${id}">${esc(caption)}</caption>`);
  L.push('    <thead>', '      <tr>');
  for (const c of cols) L.push(`        <th scope="col" class="data-table__head-cell${c.end ? ' data-table__head-cell--end' : ''}">${esc(c.label)}</th>`);
  L.push('      </tr>', '    </thead>', '    <tbody>');
  for (const r of rows) {
    const cells = Array.isArray(r) ? r : r.cells;
    const attrs = Array.isArray(r) || !r.attrs ? '' : ' ' + r.attrs;
    L.push(`      <tr${attrs}>`);
    cells.forEach((cell, i) => {
      if (i === 0) L.push(`        <th scope="row" class="data-table__row-header">${cell}</th>`);
      else L.push(`        <td class="data-table__cell${cols[i].end ? ' data-table__cell--end' : ''}">${cell}</td>`);
    });
    L.push('      </tr>');
  }
  L.push('    </tbody>', '  </table>', '</div>');
  return L.join(NL);
}

/* ---------------------------------------------------------------------------
   Model sections (css: docs/docs.css, .docs-ds-*)
   ------------------------------------------------------------------------ */
export const modelSection = (id, title, inner) => `          <section class="docs-ds-section" id="${id}" aria-labelledby="${id}-title">
            <h2 class="text-body-xs-semibold text-tertiary" id="${id}-title">${title}</h2>
            ${inner}
          </section>`;

// demoHtml: the live markup; codeText: the same markup as raw HTML. The code sits in a native <details>:
// keyboard operable, expanded state exposed by the browser, readable without JavaScript.
export function modelExample(demoHtml, codeText) {
  return modelSection('example', 'Live example', `<div class="docs-ds-card">
              <div class="docs-ds-preview">
                <!-- demo:start -->${demoHtml}<!-- demo:end -->
              </div>
            </div>
            <details class="docs-ds-code">
              <summary>HTML</summary>
<pre class="docs-ds-code__block">${esc(codeText)}</pre>
            </details>`);
}

export const modelHead = (title, description) => `          <header class="docs-ds-head">
            <h1 class="text-h1">${esc(title)}</h1>
            <p class="docs-ds-desc">${description}</p>
          </header>`;
