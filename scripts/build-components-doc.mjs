// Builds the component pages of the Hope DS docs site.
//
//   npm run docs:components
//
// Inputs (read, never edited), all in docs/data/:
//   components-content.json     one entry per component: summary, usage, accessibility, the live example spec
//                               ("example"), the essential sections ("essential") and the map keys it covers
//   components-code-notes.json  CSS findings and Figma vs code differences (validated, not rendered)
//   components-map.json         which CSS selector implements each Figma variant (or null)
//
// Writes docs/components/index.html and one page per entry of components-content.json. One generic builder
// makes every page from the data: no component is named in this file. A page shows the title and description,
// a live example (real classes from css/hope.css), the HTML of that same markup behind a native <details>, and
// the essential info. The other sections (Figma vs code, gaps, references) stay in the data and are not rendered.
// Hover and focus are never shown as separate examples. Demos use only classes that exist in css/*.css.
//
// Exit code: non-zero only on malformed or missing input data.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage, esc } from './docs-layout.mjs';
import { sources as cssSourceList } from './build-css.mjs';
import { code, list, firstSentence, indentBlock, hopeTable, modelSection, modelExample, modelHead } from './docs-kit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'docs', 'data');
const OUT = path.join(ROOT, 'docs', 'components');
const BASE = '../';
const NL = String.fromCharCode(10);

class MalformedData extends Error {}

/* ---------------------------------------------------------------------------
   Data loading and validation
   ------------------------------------------------------------------------ */

function loadJson(name) {
  const file = path.join(DATA, name);
  if (!fs.existsSync(file)) throw new MalformedData(`docs/data/${name} is missing`);
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new MalformedData(`docs/data/${name} is not valid JSON: ${err.message}`);
  }
}

let content;
let notes;
let map;

// Map entries a content entry covers: its "mapKeys", else the map key with the same name as its slug.
const keysOf = (comp) => comp.mapKeys || Object.keys(map.components).filter((k) => k.toLowerCase() === comp.slug);

function validate() {
  const errors = [];
  if (!Array.isArray(content.components)) errors.push('components-content.json: "components" must be an array');
  for (const c of content.components || []) {
    for (const k of ['slug', 'name', 'figma', 'summary', 'whenToUse', 'whenNotToUse', 'properties', 'stateTokens', 'accessibility', 'knownGaps', 'unverified', 'example', 'essential']) {
      if (c[k] === undefined) errors.push(`components-content.json: ${c.slug || '?'} lacks "${k}"`);
    }
    if (!keysOf(c).length) errors.push(`components-content.json: ${c.slug} has no entry in components-map.json`);
    for (const k of keysOf(c)) if (!map.components[k]) errors.push(`components-content.json: ${c.slug} names map key "${k}" which is not in components-map.json`);
  }
  if (!Array.isArray(notes.differences)) errors.push('components-code-notes.json: "differences" must be an array');
  if (!notes.coverage || !notes.coverage.figmaVariants || !notes.coverage.implementedInCss) errors.push('components-code-notes.json: "coverage" is incomplete');
  if (!map.components) errors.push('components-map.json: "components" is missing');
  for (const [k, c] of Object.entries(map.components || {})) {
    if (!Array.isArray(c.variants)) errors.push(`components-map.json: ${k} lacks variants`);
    else {
      const n = c.variants.filter((v) => v.selector).length;
      if (n !== c.implemented) errors.push(`components-map.json: ${k} says ${c.implemented} implemented but ${n} variants have a selector`);
      if (c.variants.length !== c.figmaVariants) errors.push(`components-map.json: ${k} says ${c.figmaVariants} Figma variants but lists ${c.variants.length}`);
    }
  }
  if (errors.length) throw new MalformedData(errors.join(NL + '  '));
}

/* ---------------------------------------------------------------------------
   CSS lookup: which file defines a rule, and which tokens a rule uses.
   ------------------------------------------------------------------------ */

// The CSS source files (not the generated css/hope.css).
const cssFiles = [...cssSourceList(), 'css/auth.css'].map((rel) => ({ name: rel, raw: fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') }));
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function findRuleFile(rule) {
  const re = new RegExp('(?:^|[\\s,}{])' + escRe(rule) + '(?=\\s*[,{:\\[])');
  const hit = cssFiles.find((f) => re.test(f.raw));
  return hit ? hit : null;
}

// Custom properties a rule sets, read from the component CSS so the pages cannot drift.
function ruleTokens(rule) {
  const f = findRuleFile(rule);
  if (!f) return [];
  // The rule may sit in a selector list (.input, .textarea { ... }): allow other selectors after it.
  const m = new RegExp('(?:^|[\\s,}])' + escRe(rule) + '\\s*(?:,[^{}]*)?\\{([^}]*)\\}').exec(f.raw);
  const out = [];
  if (m) for (const d of m[1].split(';')) {
    const [prop, val] = d.split(/:(.+)/).map((s) => (s || '').trim());
    for (const v of (val || '').matchAll(/var\((--[a-z0-9-]+)\)/g)) out.push([prop, v[1]]);
  }
  return out;
}

/* ---------------------------------------------------------------------------
   Live example, built from the map and the example spec
   ------------------------------------------------------------------------ */

const PROP_KEY = (name) => name.toLowerCase();
const propDefault = (comp, prop) => {
  const p = comp.properties.find((x) => PROP_KEY(x.name) === prop);
  return p ? p.default : undefined;
};
const attrString = (attrs) => Object.entries(attrs).map(([k, v]) => (v === '' ? ` ${k}` : ` ${k}="${esc(v)}"`)).join('');

function exampleLabel(comp, v) {
  const ex = comp.example;
  const parts = [];
  (ex.labelProps || []).forEach((prop, i) => {
    const val = v[prop];
    if (val === undefined) return;
    const omit = val === propDefault(comp, prop) && (ex.text || i > 0);
    if (!omit) parts.push(val);
  });
  return [ex.text, ...parts].filter(Boolean).join(' ');
}

// Returns the example variants: those with a selector, minus the states the spec skips, once each.
function exampleVariants(comp) {
  const ex = comp.example;
  const seen = new Set();
  const out = [];
  for (const key of keysOf(comp)) {
    for (const v of map.components[key].variants) {
      if (!v.selector || (ex.skipStates || []).includes(v.state)) continue;
      const id = JSON.stringify([v.selector, v.state, v.style, v.size, v.type, v.align]);
      if (seen.has(id)) continue;
      seen.add(id);
      out.push(v);
    }
  }
  return out;
}

function exampleMarkup(comp) {
  const ex = comp.example;
  if (ex.markup) return ex.markup;
  const items = exampleVariants(comp).map((v) => {
    const classes = v.selector.replace(/\./g, ' ').trim();
    let attrs = { ...(ex.attrs || {}) };
    for (const k of (ex.dropAttrs && ex.dropAttrs[v.state]) || []) delete attrs[k];
    attrs = { ...attrs, ...((ex.stateAttrs && ex.stateAttrs[v.state]) || {}) };
    const open = `<${ex.element} class="${classes}"${attrString(attrs)}>`;
    return ex.void ? open : `${open}${esc(exampleLabel(comp, v))}</${ex.element}>`;
  });
  return items.join(NL);
}

/* ---------------------------------------------------------------------------
   Essential info
   ------------------------------------------------------------------------ */

const variantLabel = (comp, v) =>
  Object.entries(v)
    .filter(([k]) => !['selector', 'rule', 'mechanism', 'note', 'inference', 'renderable', 'state'].includes(k))
    .map(([, val]) => val)
    .join(', ') || comp.name;

function variantsSection(comp) {
  const id = `${comp.slug}-variants-caption`;
  if (comp.classRoles) {
    // Classes of the component block, read from its CSS file; "Used for" comes from the data.
    const baseRule = map.components[keysOf(comp)[0]].base;
    const file = findRuleFile(baseRule);
    const block = baseRule.replace(/^\./, '');
    const classes = file ? [...new Set([...file.raw.matchAll(new RegExp('\\.(' + escRe(block) + '[a-z_-]*)', 'g'))].map((x) => '.' + x[1]))] : [];
    const rows = classes.map((c) => {
      const toks = [...new Set(ruleTokens(c).map((x) => x[1]))];
      return [code(c), esc(comp.classRoles[c] || ''), toks.length ? toks.map(code).join(' ') : '<span class="docs-muted">none</span>'];
    });
    return modelSection('variants', 'Classes and tokens', hopeTable({ id, caption: `${comp.name} classes, what each is for and the tokens its rule uses`, cols: [{ label: 'Class' }, { label: 'Used for' }, { label: 'Tokens' }], rows }));
  }
  const seen = new Set();
  const variants = [];
  for (const key of keysOf(comp)) {
    for (const v of map.components[key].variants) {
      if (!v.selector || (v.state && v.state !== 'Default')) continue;
      const k = JSON.stringify([v.selector, variantLabel(comp, v)]);
      if (!seen.has(k)) { seen.add(k); variants.push(v); }
    }
  }
  const firstProp = (v) => Object.entries(v).find(([k]) => !['selector', 'rule', 'mechanism', 'note', 'inference', 'renderable', 'state'].includes(k));
  const withFill = variants.length && variants.every((v) => { const fp = firstProp(v); const st = fp && comp.stateTokens[fp[1]]; return st && (st.fill || st.text); });
  const tokenCell = (tok, name) => (tok ? `${code(tok)}${name ? `<span class="docs-token__note">${esc(name)}</span>` : ''}` : '<span class="docs-muted">none</span>');
  if (withFill) {
    const rows = variants.map((v) => {
      const t = Object.fromEntries(ruleTokens(v.rule).filter(([p]) => p === 'background-color' || p === 'color'));
      const st = comp.stateTokens[firstProp(v)[1]];
      return [esc(variantLabel(comp, v)), code(v.rule), tokenCell(t['background-color'], st.fill), tokenCell(t.color, st.text)];
    });
    return modelSection('variants', 'Variants and tokens', hopeTable({ id, caption: `${comp.name} variants, the CSS class of each and the tokens it uses`, cols: [{ label: 'Variant' }, { label: 'Class' }, { label: 'Fill' }, { label: 'Text' }], rows }));
  }
  const rows = variants.map((v) => {
    const toks = [...new Set(ruleTokens(v.rule).map((x) => x[1]))];
    return [esc(variantLabel(comp, v)), code(v.selector), toks.length ? toks.map(code).join(' ') : '<span class="docs-muted">none</span>'];
  });
  return modelSection('variants', 'Variants and tokens', hopeTable({ id, caption: `${comp.name} variants, the CSS class of each and the tokens its rule uses`, cols: [{ label: 'Variant' }, { label: 'Class' }, { label: 'Tokens' }], rows }));
}

function accessibilityText(comp) {
  const a = comp.accessibility;
  const first = a.note ? firstSentence(a.note) : a.focus || a.naming || a.targetSize || '';
  return [first, a.meaning].filter(Boolean).join(' ');
}

const notesTable = (comp) => hopeTable({
  id: `${comp.slug}-notes-caption`,
  caption: `${comp.name} code notes, the status of each and the detail`,
  cols: [{ label: 'Note' }, { label: 'Status' }, { label: 'Detail' }],
  rows: comp.knownGaps.map((g) => [code(g.id), esc(g.status), esc(g.text + (g.acceptedBy ? ` Accepted by ${g.acceptedBy}, ${g.date}.` : '') + (g.reevaluate ? ` Reevaluate: ${g.reevaluate}.` : ''))]),
});

/* Sections generated but not rendered on the pages (decision D-44: the code notes live in the data, not on the page,
   as on the older component pages, D-35). The data stays in components-content.json (knownGaps) and the render code
   stays above; remove "notes" from this set to show them again. */
const HIDDEN_SECTIONS = new Set(['notes']);

const SECTIONS = {
  when: (comp) => modelSection('when', 'When to use', list(comp.whenToUse)),
  whenNot: (comp) => modelSection('when-not', 'When not to use', list(comp.whenNotToUse)),
  anatomy: (comp) => modelSection('anatomy', 'Anatomy', list(comp.anatomy || [])),
  states: (comp) => modelSection('states', 'States', hopeTable({
    id: `${comp.slug}-states-caption`,
    caption: `${comp.name} states, what changes in each and the tokens involved`,
    cols: [{ label: 'State' }, { label: 'What changes' }, { label: 'Tokens' }],
    rows: (comp.states || []).map((r) => [esc(r[0]), esc(r[1]), r[2] === 'none' ? '<span class="docs-muted">none</span>' : r[2].split(', ').map(code).join(' ')]),
  })),
  keyboard: (comp) => modelSection('keyboard', 'Keyboard and ARIA', hopeTable({
    id: `${comp.slug}-keyboard-caption`,
    caption: `${comp.name} keyboard interaction`,
    cols: [{ label: 'Key' }, { label: 'Action' }],
    rows: (comp.keyboard || []).map((r) => [esc(r[0]), esc(r[1])]),
  }) + NL + '            ' + list(comp.aria || [])),
  notes: (comp) => modelSection('notes', 'Code notes', notesTable(comp)),
  variants: variantsSection,
  contract: (comp) => modelSection('contract', 'Markup contract', list(comp.contract || [])),
  accessibility: (comp) => modelSection('accessibility', 'Accessibility', `<p class="docs-ds-note">${esc(accessibilityText(comp))}</p>`),
};

/* ---------------------------------------------------------------------------
   Pages
   ------------------------------------------------------------------------ */

function componentPage(comp) {
  const markup = exampleMarkup(comp);
  const body = [
    modelHead(comp.name, esc(comp.summary)),
    modelExample(indentBlock(markup, '                  '), markup),
    ...comp.essential.filter((s) => !HIDDEN_SECTIONS.has(s)).map((s) => {
      if (!SECTIONS[s]) throw new MalformedData(`components-content.json: ${comp.slug} lists unknown essential section "${s}"`);
      return SECTIONS[s](comp);
    }),
  ].join(NL + NL);
  return renderPage({ title: comp.name, activeHref: `components/${comp.slug}.html`, base: BASE, body, scripts: comp.scripts || [] });
}

function indexPage(components) {
  const rows = components.map((comp) => {
    const ms = keysOf(comp).map((k) => map.components[k]);
    const figma = ms.reduce((n, m) => n + m.figmaVariants, 0);
    const impl = ms.reduce((n, m) => n + m.implemented, 0);
    return [`<a href="${comp.slug}.html">${esc(comp.name)}</a>`, String(figma), String(impl), impl >= figma ? 'Complete' : impl === 0 ? 'Not in code' : 'Partial'];
  });
  rows.push([`<a href="review.html">Review (temporary)</a>`, '', '', 'Temporary page']);
  const body = [
    modelHead('Components', 'One page per component, generated from the data files in docs/data. Each page shows a live example built with the real CSS, its HTML, and the essential usage info.'),
    modelSection('pages', 'Pages', hopeTable({
      id: 'components-index-caption',
      caption: 'Component pages, Figma variants, variants with CSS and status',
      cols: [{ label: 'Component' }, { label: 'Figma variants', end: true }, { label: 'In code', end: true }, { label: 'Status' }],
      rows,
    })),
  ].join(NL + NL);
  return renderPage({ title: 'Components', activeHref: 'components/index.html', base: BASE, body });
}

/* ---------------------------------------------------------------------------
   Main
   ------------------------------------------------------------------------ */

function main() {
  content = loadJson('components-content.json');
  notes = loadJson('components-code-notes.json');
  map = loadJson('components-map.json');
  validate();
  fs.mkdirSync(OUT, { recursive: true });
  for (const comp of content.components) {
    fs.writeFileSync(path.join(OUT, `${comp.slug}.html`), componentPage(comp));
  }
  fs.writeFileSync(path.join(OUT, 'index.html'), indexPage(content.components));
  const impl = Object.entries(map.components).map(([k, c]) => `${k} ${c.implemented}/${c.figmaVariants}`).join(', ');
  console.log(`components: ${content.components.map((c) => c.slug).join(', ')}; coverage: ${impl}`);
  const notesImpl = notes.coverage.implementedInCss;
  for (const [k, c] of Object.entries(map.components)) {
    if (notesImpl[k] !== undefined && notesImpl[k] !== c.implemented) console.warn(`coverage differs for ${k}: components-code-notes.json says ${notesImpl[k]}, components-map.json says ${c.implemented} (map used)`);
  }
  console.log(`wrote docs/components/index.html, ${content.components.map((c) => `${c.slug}.html`).join(', ')}`);
}

try {
  main();
} catch (err) {
  if (err instanceof MalformedData) console.error(`MALFORMED DATA: ${err.message}`);
  else console.error(err);
  process.exit(1);
}
