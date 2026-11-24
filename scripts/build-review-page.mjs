// Builds the TEMPORARY review page of the Hope DS docs site.
//
//   npm run docs:review
//
// Writes docs/components/review.html: every unit of the Figma components inventory, in
// inventory order and grouped by "group", with the real CSS variants rendered where the CSS
// exists and a muted "Not created" placeholder where it does not. The last section is a
// "Still to create" table generated from data.
//
// Inputs (read, never edited), all in docs/data/:
//   figma-components-inventory.json  30 units read from Figma (buildAfter is a suggestion)
//   components-map.json              which CSS selector implements each Figma variant
//   css-sources.json                 ordered list of stylesheets the page loads, so the page
//                                    keeps working after the CSS is split
//
// Demos use only real classes from the listed stylesheets, no inline styles, and are wrapped in
// the demo:start / demo:end markers that scripts/check-docs.mjs checks. Hover and focus are never
// faked: they stay as live elements. No CSS is created and no classes are invented.
//
// Exit code: non-zero only on malformed or missing input data.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage, esc } from './docs-layout.mjs';
import { hopeTable } from './docs-kit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'docs', 'data');
const OUT = path.join(ROOT, 'docs', 'components', 'review.html');
const BASE = '../';

class MalformedData extends Error {}

function loadJson(name) {
  const file = path.join(DATA, name);
  if (!fs.existsSync(file)) throw new MalformedData(`docs/data/${name} is missing`);
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new MalformedData(`docs/data/${name} is not valid JSON: ${err.message}`);
  }
}

// Inventory unit name -> key in components-map.json. Units that are not listed here have no
// entry in the map, which means "no CSS".
const MAP_KEY = {
  Button: 'Button',
  'Icon Button': 'IconButton',
  Link: 'Link',
  Badge: 'Badge',
  Separator: 'Separator',
  Banner: 'Banner',
  Lightbox: 'Lightbox',
  Alert: 'Alert',
  Toast: 'Toast',
  'Empty state': 'EmptyState',
  Tooltip: 'Tooltip',
  Progress: 'Progress',
  Spinner: 'Spinner',
  Skeleton: 'Skeleton',
  Tab: 'Tab',
  'Breadcrumb item': 'BreadcrumbItem',
  'Pagination item': 'PaginationItem',
  'Menu item': 'MenuItem',
  Menu: 'Menu',
  Input: 'Input',
  Textarea: 'Textarea',
  Select: 'Select',
  Checkbox: 'Checkbox',
  Radio: 'Radio',
  Switch: 'Switch',
  Table: 'Table',
  'Table Header Cell': 'TableHeaderCell',
  'Table Cell': 'TableCell',
  Modal: 'Modal',
  Popover: 'Popover',
  Avatar: 'Avatar',
  Tag: 'Tag',
  'Accordion item': 'AccordionItem',
};

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const code = (v) => `<code>${esc(v)}</code>`;
const figmaUrl = (fileKey, id) => `https://www.figma.com/design/${fileKey}?node-id=${String(id).replace(/:/g, '-')}`;


function validate(inv, map, sources) {
  const errors = [];
  if (!Array.isArray(inv.components) || !inv.components.length) errors.push('figma-components-inventory.json: "components" must be a non-empty array');
  const seen = new Set();
  for (const u of inv.components || []) {
    for (const k of ['group', 'name', 'id', 'variants', 'props']) if (u[k] === undefined) errors.push(`inventory: ${u.name || '?'} lacks "${k}"`);
    if (seen.has(u.name)) errors.push(`inventory: duplicate unit "${u.name}"`);
    seen.add(u.name);
    if (!(Number.isInteger(u.variants) && u.variants >= 1)) errors.push(`inventory: ${u.name} has an invalid variant count`);
    if (inv.groups && !inv.groups.includes(u.group)) errors.push(`inventory: ${u.name} is in group "${u.group}" which is not in "groups"`);
  }
  if (!map.components) errors.push('components-map.json: "components" is missing');
  if (!inv.source || !inv.source.fileKey) errors.push('inventory: "source.fileKey" is missing');
  if (!sources || !Array.isArray(sources.sources) || !sources.sources.length) errors.push('css-sources.json: "sources" must be a non-empty array');
  for (const s of (sources && sources.sources) || []) {
    if (typeof s !== 'string' || !/\.css$/.test(s)) errors.push(`css-sources.json: "${s}" is not a .css path`);
    else if (!fs.existsSync(path.join(ROOT, s))) errors.push(`css-sources.json: ${s} does not exist`);
  }
  // The map must agree with the inventory on variant counts.
  for (const u of inv.components || []) {
    const mk = MAP_KEY[u.name];
    if (!mk) continue;
    const m = map.components[mk];
    if (!m) errors.push(`components-map.json: missing entry ${mk} for inventory unit ${u.name}`);
    else if (m.figmaVariants !== u.variants) errors.push(`components-map.json: ${mk} says ${m.figmaVariants} Figma variants, the inventory says ${u.variants}`);
  }
  if (errors.length) throw new MalformedData(errors.join('\n  '));
}

/* ---------------------------------------------------------------------------
   Per-unit data
   ------------------------------------------------------------------------ */

const IGNORED_VARIANT_KEYS = new Set(['selector', 'rule', 'mechanism', 'note', 'inference', 'renderable']);
const propsOf = (v) =>
  Object.entries(v)
    .filter(([k]) => !IGNORED_VARIANT_KEYS.has(k))
    .map(([k, val]) => `${k[0].toUpperCase()}${k.slice(1)}: ${val}`)
    .join(', ');

function unitCoverage(u, map) {
  const mk = MAP_KEY[u.name];
  const m = mk ? map.components[mk] : null;
  const css = m ? m.implemented : 0;
  const status = css === 0 ? 'Not created' : css >= u.variants ? 'Complete' : 'Partial';
  return { mk, m, css, status };
}

// Real markup for one covered variant, or null when this page cannot render it statically.
function renderVariant(unit, v) {
  const classes = v.selector ? v.selector.split('.').filter(Boolean) : [];
  const cls = classes.join(' ');
  switch (unit) {
    case 'Button': {
      const disabled = v.state === 'Disabled' ? ' disabled' : '';
      return `<button type="button" class="${cls}"${disabled}>View case study</button>`;
    }
    case 'Badge':
      return `<span class="${cls}">Product Strategy</span>`;
    case 'Link':
      return v.state === 'Disabled' ? `<a class="${cls}" aria-disabled="true">Link</a>` : `<a href="#unit-link" class="${cls}">Link</a>`;
    case 'Separator':
      return `<hr class="${cls}" aria-hidden="true">`;
    case 'Table':
      return `<div class="data-table" role="region" aria-label="Table example" tabindex="0"><table class="data-table__grid"><caption class="data-table__caption">Caption</caption><thead><tr><th scope="col" class="data-table__head-cell">Component</th><th scope="col" class="data-table__head-cell data-table__head-cell--end">Variants</th></tr></thead><tbody><tr><th scope="row" class="data-table__row-header">Badge</th><td class="data-table__cell data-table__cell--end">5</td></tr></tbody></table></div>`;
    case 'Table Header Cell':
      return `<div class="data-table"><table class="data-table__grid"><thead><tr><th scope="col" class="${cls}">Label</th></tr></thead></table></div>`;
    case 'Table Cell':
      return v.type === 'Row header'
        ? `<div class="data-table"><table class="data-table__grid"><tbody><tr><th scope="row" class="${cls}">Label</th></tr></tbody></table></div>`
        : `<div class="data-table"><table class="data-table__grid"><tbody><tr><td class="${cls}">Label</td></tr></tbody></table></div>`;
    case 'Banner':
      return `<div class="${cls}" role="status"><span class="banner__text">This case study is being finalized.</span></div>`;
    default:
      return null;
  }
}

function demoBlock(label, html, caption) {
  return `            <div class="docs-demo">
              <p class="docs-demo__label">${esc(label)}</p>
              <div class="docs-demo__stage">
                <!-- demo:start -->${html}<!-- demo:end -->
              </div>${caption ? `\n              <p class="docs-demo__caption">${esc(caption)}</p>` : ''}
            </div>`;
}

function missingGroups(m) {
  const byKey = new Map();
  for (const v of m.variants.filter((x) => !x.selector)) {
    const key = propsOf(v).replace(/(,\s*)?State: [^,]+$/, '').trim() || 'single variant';
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(v.state || '');
  }
  return [...byKey].map(([k, st]) => `${k}${st.filter(Boolean).length ? `: ${st.filter(Boolean).join(', ')}` : ''}`);
}

function propsSummary(u) {
  return Object.entries(u.props)
    .map(([k, vals]) => `${k === 'other' ? 'other properties' : k}: ${vals.join(', ')}`)
    .join('; ');
}

function unitSection(u, ctx) {
  const { fileKey, map, notStatic, noRenderer } = ctx;
  const cov = unitCoverage(u, map);
  const id = `unit-${slug(u.name)}`;
  const statusBadge = { Complete: 'badge--success', Partial: 'badge--solar', 'Not created': 'badge--neutral' }[cov.status];
  const heading = `<h3 class="text-h3" id="${id}-title">${esc(u.name)}</h3>`;
  const meta = `<p class="docs-badges"><span class="badge badge--anchor">${u.variants} Figma variant${u.variants === 1 ? '' : 's'}</span> <span class="badge ${statusBadge}">CSS ${cov.css} / ${u.variants}</span> <span class="badge ${statusBadge}">${cov.status}</span> <a href="${figmaUrl(fileKey, u.id)}" rel="noopener noreferrer">Figma node ${esc(u.id)}</a></p>`;
  let body = '';
  if (cov.css === 0) {
    const m = cov.m;
    body += `\n            <p class="docs-placeholder">Not created</p>`;
    if (m && m.note) body += `\n            <p class="docs-section__desc">${esc(m.note)}</p>`;
    if (u.name === 'Link') body += `\n            <p class="docs-section__desc">The global <code>a</code> rule styles every anchor, but there is no Link component class, no Small size and no disabled rule.</p>`;
    body += `\n            <h4 class="text-body docs-subhead">Missing variants</h4>`;
    body += m ? `\n            <ul class="docs-list">${missingGroups(m).map((g) => `<li>${esc(g)}</li>`).join('')}</ul>` : `\n            <p class="docs-section__desc">All ${u.variants} variant${u.variants === 1 ? '' : 's'} (${esc(propsSummary(u) || 'no variant properties')}).</p>`;
  } else if (cov.m.renderOnPage) {
    // Components with their own docs page (form controls need real markup with labels and ids): linked, not duplicated here.
    body += `\n            <p class="docs-section__desc">The ${cov.css} covered variants are rendered on <a href="${esc(cov.m.renderOnPage)}.html">the ${esc(u.name)} page</a>.</p>`;
  } else {
    const demos = [];
    const placed = cov.m.variants.filter((v) => v.selector);
    // Button: the review shows Default and Disabled only. Hover and Focus use one shared rule per
    // style and are live on the Button page.
    const shown = u.name === 'Button' || u.name === 'Link' ?  placed.filter((v) => v.state === 'Default' || v.state === 'Disabled') : placed;
    for (const v of shown) {
      const label = propsOf(v) || u.name;
      const html = v.renderable === false ? null : renderVariant(u.name, v);
      if (html === null) {
        noRenderer.push(`${u.name}${propsOf(v) ? ` (${propsOf(v)})` : ''}`);
        demos.push(`            <p class="docs-placeholder docs-placeholder--info">${esc(label)}: the CSS exists (${code(v.selector)}) but this page does not render it. ${esc(cov.m.note || v.mechanism || '')}</p>`);
        continue;
      }
      let caption = '';
      if (v.state === 'Hover') {
        caption = 'Live element: hover it. Hover cannot be shown statically.';
        notStatic.push(`${u.name}: ${propsOf(v)}`);
      } else if (v.state === 'Focus') {
        caption = 'Live element: tab to it. Focus cannot be shown statically.';
        notStatic.push(`${u.name}: ${propsOf(v)}`);
      } else if (v.state === 'Disabled') caption = 'Native disabled attribute.';
      demos.push(demoBlock(label, html, caption));
    }
    const shownNote = shown.length !== placed.length ? `\n            <p class="docs-section__desc">Showing ${shown.length}: Default and Disabled. Hover and Focus are shared rules per style, see the Button page.</p>` : '';
    body += `\n            <h4 class="text-body docs-subhead">Covered variants (${cov.css} of ${u.variants})</h4>${shownNote}\n            <div class="docs-demo-stack">\n${demos.join('\n')}\n            </div>`;
    const missing = cov.m.variants.filter((v) => !v.selector);
    if (missing.length) {
      body += `\n            <h4 class="text-body docs-subhead">Missing variants (${missing.length})</h4>\n            <ul class="docs-list">${missingGroups(cov.m).map((g) => `<li>${esc(g)}</li>`).join('')}</ul>`;
    }
    if (cov.m.variants.some((v) => v.inference)) {
      body += `\n            <p class="docs-section__desc">Inference: ${esc(cov.m.variants.find((v) => v.inference).inference)}</p>`;
    }
  }
  return {
    cov,
    html: `
          <section class="docs-section docs-unit" id="${id}" aria-labelledby="${id}-title">
            ${heading}
            ${meta}${body}
          </section>`,
  };
}

/* ---------------------------------------------------------------------------
   Page
   ------------------------------------------------------------------------ */

function main() {
  const inv = loadJson('figma-components-inventory.json');
  const map = loadJson('components-map.json');
  const sources = loadJson('css-sources.json');
  validate(inv, map, sources);

  const ctx = { fileKey: inv.source.fileKey, map, notStatic: [], noRenderer: [] };
  const groups = inv.groups || [...new Set(inv.components.map((c) => c.group))];
  const rows = [];
  const groupHtml = [];
  for (const g of groups) {
    const units = inv.components.filter((u) => u.group === g);
    if (!units.length) continue;
    const parts = units.map((u) => {
      const r = unitSection(u, ctx);
      rows.push({ u, cov: r.cov });
      return r.html;
    });
    groupHtml.push(`
          <section class="docs-group" id="group-${slug(g)}" aria-labelledby="group-${slug(g)}-title">
            <h2 class="text-h2" id="group-${slug(g)}-title">${esc(g)} <span class="docs-muted">(${units.length} component${units.length === 1 ? '' : 's'})</span></h2>${parts.join('\n')}
          </section>`);
  }

  // Totals
  const tot = rows.reduce(
    (a, { u, cov }) => {
      a.units++;
      a.figma += u.variants;
      a.css += cov.css;
      a[cov.status]++;
      return a;
    },
    { units: 0, figma: 0, css: 0, Complete: 0, Partial: 0, 'Not created': 0 }
  );

  const badgeFor = { Complete: 'badge--success', Partial: 'badge--solar', 'Not created': 'badge--neutral' };
  // Hope Table: the unit is the row header; rows keep the data attributes docs:check counts.
  const tableRows = rows.map(({ u, cov }) => ({
    attrs: `data-unit-row="${esc(u.name)}"`,
    cells: [
      `<a href="#unit-${slug(u.name)}">${esc(u.name)}</a>`,
      esc(u.group),
      String(u.variants),
      String(cov.css),
      `<span class="badge ${badgeFor[cov.status]}">${cov.status}</span>`,
      u.buildAfter && u.buildAfter.length ? esc(u.buildAfter.join(', ')) : '<span class="docs-muted">none</span>',
      `<a href="${figmaUrl(inv.source.fileKey, u.id)}" rel="noopener noreferrer">${esc(u.id)}</a>`,
    ],
  }));
  const totalsRow = {
    attrs: 'class="docs-row--total" data-totals-row',
    cells: ['Total', `${tot.units} components`, String(tot.figma), String(tot.css), `${tot.Complete} Complete, ${tot.Partial} Partial, ${tot['Not created']} Not created`, '<span class="docs-muted">suggestion, not a Figma fact</span>', ''],
  };
  const stillTable = hopeTable({
    id: 'still-to-create-caption',
    caption: 'Every Figma unit with its CSS coverage and status',
    hidden: true,
    cols: [{ label: 'Component' }, { label: 'Group' }, { label: 'Figma variants', end: true }, { label: 'CSS variants', end: true }, { label: 'Status' }, { label: 'Suggested build after' }, { label: 'Figma node id' }],
    rows: [...tableRows, totalsRow],
  });

  const notStaticHtml = ctx.notStatic.length
    ? `<ul class="docs-list">${ctx.notStatic.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>`
    : '<p class="docs-section__desc">None.</p>';
  const noRendererHtml = ctx.noRenderer.length ? `<ul class="docs-list">${ctx.noRenderer.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : '<p class="docs-section__desc">None.</p>';

  const body = `          <header class="docs-pagehead">
            <p class="text-label text-tertiary">Review</p>
            <h1 class="text-h1">Component review</h1>
            <p class="text-body text-secondary docs-lead">Every unit of the Figma components inventory (${esc(inv.source.file)}, read ${esc(inv.source.readAt)}) in inventory order, with the real CSS variants where they exist.</p>
          </header>

          <aside class="docs-note docs-note--banner" role="note">
            <p><strong>Temporary page.</strong> It exists to review what is built and what is missing while the CSS is being restructured. It will be removed once the components are created. Nothing here is a design decision: coverage comes from <code>docs/data/components-map.json</code>, the inventory from <code>docs/data/figma-components-inventory.json</code>, and the stylesheets from <code>docs/data/css-sources.json</code>.</p>
            <p>${tot.units} components, ${tot.figma} Figma variants, ${tot.css} with a CSS class: ${tot.Complete} Complete, ${tot.Partial} Partial, ${tot['Not created']} Not created.</p>
          </aside>
${groupHtml.join('\n')}

          <section class="docs-section" id="not-static" aria-labelledby="not-static-title">
            <h2 class="text-h2" id="not-static-title">States not shown statically</h2>
            <p class="docs-section__desc">These covered variants are hover or focus states. They stay live elements (interact with them): no mirrored state classes were added.</p>
            ${notStaticHtml}
            <p class="docs-section__desc">CSS exists but this page does not render it:</p>
            ${noRendererHtml}
          </section>

          <section class="docs-section" id="still-to-create" aria-labelledby="still-to-create-title">
            <h2 class="text-h2" id="still-to-create-title">Still to create</h2>
            <p class="docs-section__desc">Generated from the inventory and <code>components-map.json</code>. Status is Not created (no CSS variant), Partial (some) or Complete (all Figma variants have a CSS class). "Suggested build after" is the inventory's <code>buildAfter</code>, a suggestion and not a Figma fact.</p>
            ${stillTable}
          </section>`;

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, renderPage({ title: 'Component review', activeHref: 'components/review.html', base: BASE, body, stylesheets: sources.sources }));
  console.log(`review: ${tot.units} units, ${tot.figma} Figma variants, ${tot.css} CSS variants; Complete ${tot.Complete}, Partial ${tot.Partial}, Not created ${tot['Not created']}`);
  console.log(`stylesheets: ${sources.sources.join(', ')}`);
  console.log(`states not shown statically: ${ctx.notStatic.length}; CSS not rendered: ${ctx.noRenderer.length}`);
  console.log('wrote docs/components/review.html');
}

try {
  main();
} catch (err) {
  if (err instanceof MalformedData) console.error(`MALFORMED DATA: ${err.message}`);
  else console.error(err);
  process.exit(1);
}
