// Builds the component pages of the Hope DS docs site.
//
//   npm run docs:components
//
// Inputs (read, never edited), all in docs/data/:
//   components-content.json     Figma-derived content: usage, properties, state tokens,
//                               accessibility, known gaps (v0.1)
//   components-code-notes.json  CSS findings and the Figma vs code differences, with the
//                               Icon Button section
//   components-map.json         which CSS selector implements each Figma variant (or null)
//
// Writes docs/components/index.html and one page per component in components-content.json
// (button, badge, link, separator).
// Live demos use ONLY real classes from css/*.css, no inline styles, and exist only for
// variants that components-map.json maps to a selector. Hover and focus are never faked.
//
// Exit code: non-zero only on malformed or missing input data.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage, esc } from './docs-layout.mjs';
import { sources as cssSourceList } from './build-css.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'docs', 'data');
const OUT = path.join(ROOT, 'docs', 'components');
const FIGMA_FILE_KEY = 'U6ThTndTKYSJKkd0XqaSdV';
const BASE = '../';

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

function validate() {
  const errors = [];
  if (!Array.isArray(content.components)) errors.push('components-content.json: "components" must be an array');
  for (const c of content.components || []) {
    for (const k of ['slug', 'name', 'figma', 'summary', 'whenToUse', 'whenNotToUse', 'properties', 'stateTokens', 'accessibility', 'knownGaps', 'unverified']) {
      if (c[k] === undefined) errors.push(`components-content.json: ${c.slug || '?'} lacks "${k}"`);
    }
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
  if (errors.length) throw new MalformedData(errors.join('\n  '));
}

/* ---------------------------------------------------------------------------
   CSS lookup (which file defines a rule). Used for the code reference only;
   scripts/check-docs.mjs is the one that fails on a missing selector.
   ------------------------------------------------------------------------ */

// The CSS source files (not the generated css/hope.css), so the code reference names the file a rule lives in.
const cssFiles = [...cssSourceList(), 'css/auth.css']
  .map((rel) => ({ name: rel, text: fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ') }));

function findRuleFile(rule) {
  const re = new RegExp('(?:^|[\\s,}{])' + rule.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=\\s*[,{])');
  const hit = cssFiles.find((f) => re.test(f.text));
  return hit ? hit.name : null;
}

/* ---------------------------------------------------------------------------
   HTML helpers
   ------------------------------------------------------------------------ */

const head = (cols) => `<thead><tr>${cols.map((c) => `<th scope="col">${c}</th>`).join('')}</tr></thead>`;
const wrap = (inner, compact = true) => `<div class="docs-table-wrap"><table class="docs-table${compact ? ' docs-table--compact' : ''}">${inner}</table></div>`;
const table = (cols, rows, compact = true) => wrap(`${head(cols)}<tbody>${rows.map((r) => `<tr>${r}</tr>`).join('')}</tbody>`, compact);
const td = (v) => `<td>${v}</td>`;
const th = (v) => `<th scope="row">${v}</th>`;
const code = (v) => `<code>${esc(v)}</code>`;
const list = (items) => `<ul class="docs-list">${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
const figmaUrl = (id) => `https://www.figma.com/design/${FIGMA_FILE_KEY}?node-id=${String(id).replace(/:/g, '-')}`;

const CLASS_BADGE = {
  Atencao: '<span class="badge badge--solar">Atencao</span>',
  Informativo: '<span class="badge badge--neutral">Informativo</span>',
  Bloqueia: '<span class="badge docs-status--mismatch">Bloqueia</span>',
};
const classBadge = (c) => CLASS_BADGE[c] || `<span class="badge badge--neutral">${esc(c)}</span>`;

const STATUS_BADGE = {
  documented: '<span class="badge badge--anchor">documented</span>',
  measured: '<span class="badge badge--neutral">measured</span>',
  inference: '<span class="badge badge--solar">inference</span>',
  unverified: '<span class="badge badge--neutral">unverified</span>',
};
const statusBadge = (s) => STATUS_BADGE[s] || `<span class="badge badge--neutral">${esc(s)}</span>`;

function contrastBadge(value, threshold, exempt) {
  if (exempt) return '<span class="badge badge--neutral">exempt</span>';
  return value >= threshold ? '<span class="badge badge--success">pass</span>' : '<span class="badge docs-status--mismatch">fail</span>';
}

const fmtTokens = (v) => {
  if (v === undefined || v === null) return '<span class="docs-muted">not specified</span>';
  if (typeof v === 'string') return esc(v);
  return Object.entries(v)
    .map(([k, val]) => `<span class="docs-fig"><span class="docs-value__tag">${esc(k)}</span> ${esc(val)}</span>`)
    .join('');
};

function section(id, title, inner, desc) {
  return `
          <section class="docs-section" id="${id}" aria-labelledby="${id}-title">
            <h2 class="text-h2" id="${id}-title">${esc(title)}</h2>${desc ? `\n            <p class="docs-section__desc">${desc}</p>` : ''}
${inner}
          </section>`;
}

/* ---------------------------------------------------------------------------
   Sections
   ------------------------------------------------------------------------ */

const mapKey = (comp) => ({ button: 'Button', badge: 'Badge', link: 'Link', separator: 'Separator' })[comp.slug];
const defaultLabel = (comp) => {
  const p = comp.properties.find((x) => x.type === 'text');
  return p && p.default ? p.default : comp.name;
};

function summarySection(comp) {
  const m = map.components[mapKey(comp)];
  const im = comp.slug === 'button' ? map.components.IconButton : null;
  const gaps = comp.knownGaps.length;
  const diffs = notes.differences.filter((d) => d.component === comp.name);
  const atencao = diffs.filter((d) => d.class === 'Atencao').length;
  const info = diffs.filter((d) => d.class === 'Informativo').length;
  const badges = [
    `<span class="badge badge--anchor">${m.figmaVariants} Figma variants${im ? ` (+ ${im.figmaVariants} Icon Button)` : ''}</span>`,
    `<span class="badge ${m.implemented ? 'badge--success' : 'badge--neutral'}">${m.implemented} in code${im ? ` (Icon Button ${im.implemented})` : ''}</span>`,
    `<span class="badge badge--solar">${atencao} Atencao</span>`,
    `<span class="badge badge--neutral">${info} Informativo</span>`,
    `<span class="badge badge--neutral">${gaps} known gaps</span>`,
  ].join(' ');
  return section('summary', 'Summary', `            <p class="docs-lead text-body text-secondary">${esc(comp.summary)}</p>\n            <p class="docs-badges">${badges}</p>`);
}

function usageSection(comp) {
  const inner = `            <div class="docs-cols">
              <div><h3 class="text-h3">When to use</h3>${list(comp.whenToUse)}</div>
              <div><h3 class="text-h3">When not to use</h3>${list(comp.whenNotToUse)}</div>
            </div>`;
  return section('usage', 'When to use and when not to use', inner);
}

function anatomySection(comp) {
  const parts = [];
  const layoutEntries = Object.entries(comp.layout || {});
  for (const [key, l] of layoutEntries) {
    if (key === 'IconButton') continue;
    const bits = Object.entries(l).map(([k, v]) => `${k} ${v}`);
    parts.push(`Container (${key}): ${bits.join(', ')}.`);
  }
  for (const p of comp.properties) {
    if (p.type === 'text') parts.push(`Label: text property "${p.name}", default "${p.default}".`);
    else if (/icon/i.test(p.name)) parts.push(`Optional icon: property "${p.name}" (${p.type}), default ${p.default}.`);
  }
  if (comp.slug === 'button') parts.push('Icon Button (separate component): a single icon in a 44 by 44 pill, see the Icon Button section.');
  const inner = `            ${list(parts)}\n            <p class="docs-section__desc">Parts are read from the Figma properties and layout only. Nothing here is inferred.</p>`;
  return section('anatomy', 'Anatomy', inner);
}

function variantsSection(comp) {
  const m = map.components[mapKey(comp)];
  const props = !comp.properties.length ? '<p class="docs-section__desc">No properties: the component has a single variant.</p>' : table(
    ['Property', 'Type', 'Options', 'Default', 'Note'],
    comp.properties.map((p) => [th(esc(p.name)), td(esc(p.type)), td(p.options ? esc(p.options.join(', ')) : '<span class="docs-muted">free text</span>'), td(esc(p.default ?? '')), td(esc(p.note || ''))].join(''))
  );
  let matrix = '';
  if (comp.slug === 'button') {
    const rows = [];
    const keys = [...new Set(m.variants.map((v) => `${v.style}|${v.size}`))];
    for (const k of keys) {
      const [style, size] = k.split('|');
      const cells = ['Default', 'Hover', 'Focus', 'Disabled'].map((st) => {
        const v = m.variants.find((x) => x.style === style && x.size === size && x.state === st);
        return td(v && v.rule ? `${code(v.rule)}` : '<span class="docs-muted">none</span>');
      });
      rows.push([th(`${esc(style)}, ${esc(size)}`), ...cells].join(''));
    }
    matrix = table(['Style, size', 'Default', 'Hover', 'Focus', 'Disabled'], rows);
  } else if (comp.slug === 'badge') {
    matrix = table(['Style', 'CSS class'], m.variants.map((v) => [th(esc(v.style)), td(v.rule ? code(v.rule) : '<span class="docs-muted">none</span>')].join('')));
  } else if (comp.slug === 'separator') {
    matrix = table(['Variant', 'CSS class'], m.variants.map((v) => [th('Default'), td(v.rule ? code(v.rule) : '<span class="docs-muted">none</span>')].join('')));
  } else {
    const rows = ['Medium', 'Small'].map((sz) => [th(sz), ...['Default', 'Hover', 'Focus', 'Disabled'].map((st) => {
      const v = m.variants.find((x) => x.size === sz && x.state === st);
      return td(v && v.rule ? code(v.rule) : '<span class="docs-muted">none</span>');
    })].join(''));
    matrix = table(['Size', 'Default', 'Hover', 'Focus', 'Disabled'], rows);
  }
  const mech = Object.entries(m.stateMechanisms || {})
    .map(([k, v]) => `<li><strong>${esc(k)}:</strong> ${esc(v)}</li>`)
    .join('');
  const inner = `            <h3 class="text-h3">Figma properties</h3>
            ${props}
            <h3 class="text-h3">Coverage in code (${m.implemented} of ${m.figmaVariants} Figma variants)</h3>
            ${matrix}
            <h3 class="text-h3">How states are implemented</h3>
            <ul class="docs-list">${mech}</ul>`;
  return section('variants', 'Properties and variants', inner);
}

function demo(label, html, caption) {
  return `              <div class="docs-demo">
                <p class="docs-demo__label">${esc(label)}</p>
                <div class="docs-demo__stage">
                  <!-- demo:start -->${html}<!-- demo:end -->
                </div>
                <p class="docs-demo__caption">${esc(caption)}</p>
              </div>`;
}

function examplesSection(comp) {
  const m = map.components[mapKey(comp)];
  const label = defaultLabel(comp);
  const items = [];
  let intro = 'Real markup with the real classes from <code>css/hope.css</code> (sources in <code>css/components/</code>). Hover and focus are not simulated: interact with each element (hover it, tab to it).';
  if (comp.slug === 'button') {
    for (const style of ['Primary', 'Secondary', 'Ghost']) {
      const v = m.variants.find((x) => x.style === style && x.size === 'Medium' && x.state === 'Default' && x.selector);
      if (!v) continue;
      const cls = v.selector.replace(/\./g, ' ').trim();
      items.push(demo(`${style}, Medium, Default`, `<button type="button" class="${cls}">${esc(label)}</button>`, 'Interact with it for hover and focus.'));
      items.push(demo(`${style}, Medium, Disabled`, `<button type="button" class="${cls}" disabled>${esc(label)}</button>`, 'Native disabled attribute. The CSS also accepts aria-disabled="true".'));
    }
    intro += ' Under 768px the CSS makes every .btn full width, so the demos stack.';
  } else if (comp.slug === 'badge') {
    intro = 'Real markup with the real classes from <code>css/hope.css</code> (sources in <code>css/components/</code>). Badges are static and non-interactive, so there are no states to try.';
    for (const v of m.variants.filter((x) => x.selector)) {
      const cls = v.selector.replace(/\./g, ' ').trim();
      items.push(demo(`${v.style}`, `<span class="${cls}">${esc(label)}</span>`, `Class ${v.selector.replace('.badge', '')}. Static, no states.`));
    }
  } else if (comp.slug === 'link') {
    intro += ' Hover widens the text by about 1px because the weight goes from 400 to 700: that small layout shift is as specified in Figma. The disabled link is an anchor without href plus aria-disabled="true", so it is not focusable.';
    for (const size of ['Medium', 'Small']) {
      const v = m.variants.find((x) => x.size === size && x.state === 'Default' && x.selector);
      if (!v) continue;
      const cls = v.selector.replace(/\./g, ' ').trim();
      items.push(demo(`${size}, Default`, `<a href="#examples" class="${cls}">${esc(label)}</a>`, 'Interact with it for hover and focus (Tab to it for the ring).'));
      items.push(demo(`${size}, Disabled`, `<a class="${cls}" aria-disabled="true">${esc(label)}</a>`, 'No href, aria-disabled="true". Regular weight at both sizes.'));
    }
  } else if (comp.slug === 'separator') {
    intro = 'Real markup with the real class from <code>css/hope.css</code> (sources in <code>css/components/</code>). The line is decorative, so the markup is an <code>hr</code> hidden from assistive technology with <code>aria-hidden="true"</code>: it carries no meaning and has no navigation function. A native <code>hr</code> keeps its thematic-break meaning when the CSS is missing, and the hiding is what makes it decorative. It is full width of its container; the 100 px width in Figma is only the specimen.';
    items.push(demo('Default', '<hr class="separator" aria-hidden="true">', 'Class .separator. 1px, Border/Default/Default.'));
  } else {
    return section('examples', 'Live examples', '            <p class="docs-note">No live demo for this component.</p>');
  }
  return section('examples', 'Live examples', `            <div class="docs-demo-grid">\n${items.join('\n')}\n            </div>`, intro);
}

function statesSection(comp) {
  const st = comp.stateTokens;
  const keys = Object.keys(st);
  let inner;
  let title = 'States';
  let desc = 'Figma tokens per state, as read from the component. Token values are on the <a href="../tokens.html">Tokens</a> page.';
  const first = st[keys[0]];
  if (first && first.default !== undefined) {
    inner = table(['Style', 'Default', 'Hover', 'Focus', 'Disabled'], keys.map((k) => [th(esc(k)), td(fmtTokens(st[k].default)), td(fmtTokens(st[k].hover)), td(fmtTokens(st[k].focus)), td(fmtTokens(st[k].disabled))].join('')));
  } else if (first && (first.fill !== undefined || first.text !== undefined) && comp.slug === 'badge') {
    title = 'Colour roles';
    desc = 'Badge is static, so there are no states: one set of Figma tokens per style.';
    inner = table(['Style', 'Fill', 'Stroke', 'Text'], keys.map((k) => [th(esc(k)), td(fmtTokens(st[k].fill)), td(fmtTokens(st[k].stroke)), td(fmtTokens(st[k].text))].join('')));
  } else {
    inner = table(['State', 'Text', 'Note'], keys.map((k) => [th(esc(k)), td(fmtTokens(st[k].text)), td(esc(st[k].note || ''))].join('')));
  }
  return section('states', title, `            ${inner}`, desc);
}

function iconButtonSection() {
  const ib = notes.iconButton;
  const m = map.components.IconButton;
  const props = table(
    ['Property', 'Options', 'Default'],
    ib.properties.map((p) => [th(esc(p.name)), td(p.options ? esc(p.options.join(', ')) : esc(p.type || '')), td(esc(p.default ?? ''))].join(''))
  );
  const states = table(
    ['Style', 'Default', 'Hover', 'Focus', 'Disabled'],
    Object.keys(ib.stateTokens).map((k) => [th(esc(k)), td(fmtTokens(ib.stateTokens[k].default)), td(fmtTokens(ib.stateTokens[k].hover)), td(fmtTokens(ib.stateTokens[k].focus)), td(fmtTokens(ib.stateTokens[k].disabled))].join(''))
  );
  const variants = table(
    ['Style', 'State', 'In code'],
    m.variants.map((v) => [th(esc(v.style)), td(esc(v.state)), td('<span class="badge badge--neutral">none</span>')].join(''))
  );
  const inner = `            <p class="docs-section__desc">A separate Figma component (set ${code(ib.figmaSet)}) for icon-only actions: ${esc(ib.layout.size)}, ${esc(ib.layout.radius)}. ${m.variants.length} variants, ${m.implemented} implemented in CSS. There is no live demo.</p>
            <h3 class="text-h3">Properties</h3>
            ${props}
            <h3 class="text-h3">State tokens</h3>
            ${states}
            <h3 class="text-h3">All ${ib.variantCount} variants</h3>
            ${variants}
            <p class="docs-note">${esc(ib.note)}</p>`;
  return section('icon-button', 'Icon Button', inner);
}

function accessibilitySection(comp) {
  const a = comp.accessibility;
  const text = !a.contrastText.length ? '<p class="docs-section__desc">No text: nothing to measure for text contrast.</p>' : table(
    ['Case', 'Light', 'Dark', 'Result (4.5:1)'],
    a.contrastText.map((r) => {
      const exempt = /exempt/i.test(r.case);
      const ok = r.light >= 4.5 && r.dark >= 4.5;
      return [th(esc(r.case)), td(r.light.toFixed(2)), td(r.dark.toFixed(2)), td(`${contrastBadge(r.light, 4.5, exempt)} Light ${contrastBadge(r.dark, 4.5, exempt)} Dark${!exempt && !ok ? '' : ''}`)].join('');
    })
  );
  let nonText = '';
  if (a.contrastNonText && a.contrastNonText.length) {
    nonText = `<h3 class="text-h3">Non-text contrast</h3>${table(
      ['Case', 'Light', 'Dark', 'Result (3:1)'],
      a.contrastNonText.map((r) => [th(esc(r.case)), td(r.light.toFixed(2)), td(r.dark.toFixed(2)), td(`${contrastBadge(r.light, 3, false)} Light ${contrastBadge(r.dark, 3, false)} Dark`)].join(''))
    )}`;
  }
  const labels = { distinguishable: 'Distinguishable from text', targetSize: 'Target size', focus: 'Focus', naming: 'Naming', disabled: 'Disabled state', note: 'Note', meaning: 'Meaning' };
  const rows = Object.keys(labels)
    .filter((k) => a[k])
    .map((k) => `<li><strong>${esc(labels[k])}:</strong> ${esc(a[k])}</li>`)
    .join('');
  const inner = `            <h3 class="text-h3">Text contrast</h3>
            ${text}
            ${nonText}
            <ul class="docs-list">${rows}</ul>`;
  return section('accessibility', 'Accessibility', inner, esc(content.meta.sources.contrast));
}

function figmaVsCodeSection(comp) {
  const diffs = notes.differences.filter((d) => d.component === comp.name);
  const order = { Bloqueia: 0, Atencao: 1, Informativo: 2 };
  diffs.sort((a, b) => (order[a.class] ?? 9) - (order[b.class] ?? 9));
  const rows = diffs.map((d) => {
    const extra = [d.measured ? `<span class="docs-fig"><span class="docs-value__tag">Measured</span> ${esc(d.measured)}</span>` : '', d.inference ? `<span class="docs-fig"><span class="docs-value__tag">Inference</span> ${esc(d.inference)}</span>` : ''].join('');
    return [td(classBadge(d.class)), th(code(d.id)), td(esc(d.figma)), td(esc(d.code)), td(extra || '<span class="docs-muted">none</span>')].join('');
  });
  const matches = (notes.matches || []).filter((t) => (comp.slug === 'button' ? /^(Focus ring|Button)/.test(t) : t.startsWith(comp.name)));
  const body = `            ${diffs.length ? table(['Class', 'Difference', 'Figma', 'Code', 'Measured or inference'], rows) : '<p class="docs-section__desc">No differences recorded.</p>'}
            ${matches.length ? `<h3 class="text-h3">Matches</h3>${list(matches)}` : ''}`;
  return section('figma-vs-code', 'Figma vs code', body, `${esc(notes.meta.policy)} Classification is Claude's opinion; the owner decides.`);
}

function noCodeSection(comp) {
  const groups = [];
  const add = (key, comp2, states, note) => groups.push([key, comp2, states, note]);
  const collect = (mk, labelFn) => {
    const m = map.components[mk];
    const byKey = new Map();
    for (const v of m.variants.filter((x) => !x.selector)) {
      const k = labelFn(v);
      if (!byKey.has(k)) byKey.set(k, []);
      byKey.get(k).push(v.state || 'static');
    }
    for (const [k, st] of byKey) add(k, mk, st);
  };
  if (comp.slug === 'button') {
    collect('Button', (v) => `${v.style}, ${v.size}`);
    collect('IconButton', (v) => `Icon Button, ${v.style}`);
  } else if (comp.slug === 'badge') collect('Badge', (v) => v.style);
  else if (comp.slug === 'separator') collect('Separator', () => 'Separator');
  else collect('Link', (v) => v.size);
  const notesFor = notes.coverage.missingInCss.filter((x) => x.component === comp.name || (comp.slug === 'button' && x.component === 'Icon Button'));
  const rows = groups.map(([k, , st]) => [th(esc(k)), td(esc(st.join(', '))), td('<span class="badge badge--neutral">no CSS class</span>')].join(''));
  const extra = notesFor.filter((x) => x.note).map((x) => `${x.variant}: ${x.note}`);
  const inner = `            ${rows.length ? table(['Figma variant', 'States', 'Status'], rows) : '<p class="docs-section__desc">None.</p>'}
            ${extra.length ? `<h3 class="text-h3">Notes from the code review</h3>${list(extra)}` : ''}`;
  return section('no-code', 'In Figma, no code yet', inner, 'Variants that components-map.json maps to no selector. No demo is rendered for them.');
}

function codeOnlySection(comp) {
  const mine = (map.codeOnly || []).filter((c) => c.component === comp.name);
  const rows = mine.map((c) => {
    const n = (notes.codeOnly || []).find((x) => x.selector === c.selector);
    return [th(code(c.selector)), td(esc(n ? n.note : '')), td(esc(c.assignment || ''))].join('');
  });
  return section('code-only', 'In code, no Figma', rows.length ? `            ${table(['Selector', 'Note', 'Assignment'], rows)}` : '            <p class="docs-section__desc">None.</p>');
}

function gapsSection(comp) {
  const rows = comp.knownGaps.map((g) => [td(statusBadge(g.status)), th(code(g.id)), td(esc(g.text))].join(''));
  return section('gaps', 'Known gaps', `            ${table(['Status', 'Id', 'Gap'], rows)}`, 'Status key: ' + Object.entries(content.meta.statusKey).map(([k, v]) => `${esc(k)} (${esc(v)})`).join('; ') + '.');
}

function unverifiedSection(comp) {
  return section('unverified', 'Not yet verified', `            ${list(comp.unverified)}`);
}

function figmaRefSection(comp) {
  const rows = [
    [th('Page'), td(code(comp.figma.pageId)), td(`<a href="${figmaUrl(comp.figma.pageId)}" rel="noopener noreferrer">Open in Figma</a>`)].join(''),
    ...comp.figma.sets.map((s) => [th(`Set: ${esc(s.name)}`), td(code(s.id)), td(`<a href="${figmaUrl(s.id)}" rel="noopener noreferrer">Open in Figma</a>`)].join('')),
  ];
  return section('figma-ref', 'Figma reference', `            ${table(['Item', 'Id', 'Link'], rows)}`, `Hope DS | Core Components, file key ${code(FIGMA_FILE_KEY)}.`);
}

function codeRefSection(comp) {
  const m = map.components[mapKey(comp)];
  const seen = new Map();
  for (const v of m.variants.filter((x) => x.rule)) if (!seen.has(v.rule)) seen.set(v.rule, v);
  for (const g of m.globalRules || []) if (!seen.has(g)) seen.set(g, { rule: g, mechanism: 'global rule' });
  const rows = [...seen.keys()].map((r) => {
    const v = seen.get(r);
    const file = findRuleFile(r);
    return [th(code(r)), td(file ? esc(file) : '<span class="badge docs-status--mismatch">not found in css/*.css</span>'), td(esc(v.mechanism || ''))].join('');
  });
  const base = m.base ? `<p class="docs-section__desc">Base class ${code(m.base)}.</p>` : `<p class="docs-section__desc">${esc(m.globalRulesDescription || 'No component class.')}</p>`;
  return section('code-ref', 'Code reference', `            ${base}\n            ${rows.length ? table(['Selector', 'File', 'Used for'], rows) : ''}`);
}

/* ---------------------------------------------------------------------------
   Component page and index
   ------------------------------------------------------------------------ */

function componentPage(comp) {
  const sections = [
    ['summary', 'Summary', summarySection(comp)],
    ['usage', 'When to use', usageSection(comp)],
    ['anatomy', 'Anatomy', anatomySection(comp)],
    ['variants', 'Properties and variants', variantsSection(comp)],
    ['examples', 'Live examples', examplesSection(comp)],
    ['states', comp.slug === 'badge' ? 'Colour roles' : 'States', statesSection(comp)],
  ];
  if (comp.slug === 'button') sections.push(['icon-button', 'Icon Button', iconButtonSection()]);
  sections.push(
    ['accessibility', 'Accessibility', accessibilitySection(comp)],
    ['figma-vs-code', 'Figma vs code', figmaVsCodeSection(comp)],
    ['no-code', 'In Figma, no code yet', noCodeSection(comp)],
    ['code-only', 'In code, no Figma', codeOnlySection(comp)],
    ['gaps', 'Known gaps', gapsSection(comp)],
    // The section is left out when the component has nothing unverified.
    ...(Array.isArray(comp.unverified) && comp.unverified.length ? [['unverified', 'Not yet verified', unverifiedSection(comp)]] : []),
    ['figma-ref', 'Figma reference', figmaRefSection(comp)],
    ['code-ref', 'Code reference', codeRefSection(comp)]
  );
  const body = `          <header class="docs-pagehead">
            <p class="text-label text-tertiary">Component</p>
            <h1 class="text-h1">${esc(comp.name)}</h1>
            <p class="text-body text-secondary docs-lead">Figma content from ${esc(content.meta.readAt)} (v${esc(content.meta.version)}), code notes from ${esc(notes.meta.readAt || content.meta.readAt)}. Generated by <code>npm run docs:components</code>; the data files in <code>docs/data/</code> are the source.</p>
          </header>
${sections.map((s) => s[2]).join('\n')}`;
  return renderPage({
    title: comp.name,
    activeHref: `components/${comp.slug}.html`,
    base: BASE,
    onThisPage: sections.map(([id, label]) => ({ id, label })),
    body,
  });
}

const GROUP_EN = { 'Formulários': 'Forms', Feedback: 'Feedback', 'Navegação': 'Navigation', 'Overlays e dados': 'Overlays and data' };

function figmaOnlyComponents() {
  const file = path.join(ROOT, 'design-organization', 'DESIGN.md');
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const i = text.indexOf('### Componentes novos no Figma (sem CSS ainda)');
  if (i === -1) return null;
  const para = text
    .slice(i)
    .split('\n')
    .slice(1)
    .find((l) => l.trim());
  if (!para) return null;
  const groups = [];
  for (const chunk of para.split(/\.\s+(?=[A-ZÀ-Ú])/)) {
    const m = chunk.replace(/\.$/, '').match(/^([^:]+):\s*(.+)$/);
    if (!m) continue;
    const items = m[2].split(/,\s*/).map((s) => s.replace(/\(gatilho fechado\)/, '(closed trigger)').trim());
    groups.push({ group: GROUP_EN[m[1].trim()] || m[1].trim(), items });
  }
  return groups.length ? groups : null;
}

function indexPage(components) {
  const rows = [];
  const add = (name, href, mk, comp, extraLabel) => {
    const m = map.components[mk];
    const diffs = notes.differences.filter((d) => d.component === (comp ? comp.name : name));
    const a = diffs.filter((d) => d.class === 'Atencao').length;
    const inf = diffs.filter((d) => d.class === 'Informativo').length;
    const gaps = comp ? comp.knownGaps.length : null;
    rows.push(
      [
        th(href ? `<a href="${href}">${esc(name)}</a>${extraLabel ? ` <span class="docs-muted">${esc(extraLabel)}</span>` : ''}` : esc(name)),
        td(`<span class="badge badge--anchor">${m.figmaVariants}</span>`),
        td(`<span class="badge ${m.implemented ? 'badge--success' : 'badge--neutral'}">${m.implemented} of ${m.figmaVariants}</span>`),
        td(`<span class="badge badge--solar">${a} Atencao</span> <span class="badge badge--neutral">${inf} Informativo</span>`),
        td(gaps === null ? '<span class="docs-muted">in the Button page</span>' : `<span class="badge badge--neutral">${gaps}</span>`),
      ].join('')
    );
  };
  for (const comp of components) {
    add(comp.name, `${comp.slug}.html`, mapKey(comp), comp);
    if (comp.slug === 'button') add('Icon Button', 'button.html#icon-button', 'IconButton', null, 'section of the Button page');
  }
  const documented = ['Button', 'IconButton', 'Badge', 'Link', 'Separator'].map((k) => map.components[k]);
  const total = documented.reduce((n, c) => n + c.figmaVariants, 0);
  const impl = documented.reduce((n, c) => n + c.implemented, 0);
  const figmaOnly = figmaOnlyComponents();
  const foRows = figmaOnly ? figmaOnly.flatMap((g) => g.items.map((it) => [th(esc(it)), td(esc(g.group)), td('<span class="badge badge--neutral">no CSS</span>')].join(''))) : [];
  const body = `          <header class="docs-pagehead">
            <p class="text-label text-tertiary">Components</p>
            <h1 class="text-h1">Components</h1>
            <p class="text-body text-secondary docs-lead">Button (with Icon Button), Badge, Link and Separator, documented as they are in Figma and in code today. ${impl} of ${total} Figma variants have a CSS class. Where Figma and the CSS disagree, each page lists the difference with its class (Bloqueia, Atencao, Informativo) and leaves the decision to the owner.</p>
          </header>

          <section class="docs-section" id="components" aria-labelledby="components-title">
            <h2 class="text-h2" id="components-title">Documented components</h2>
            ${table(['Component', 'Variants in Figma', 'Variants in code', 'Differences', 'Known gaps'], rows)}
          </section>

          <section class="docs-section" id="figma-only" aria-labelledby="figma-only-title">
            <h2 class="text-h2" id="figma-only-title">In Figma, no code yet</h2>
            <p class="docs-section__desc">Components that exist in Figma and have no CSS. From <code>design-organization/DESIGN.md</code>. They enter the docs when they are implemented (GOVERNANCE test 4). No pages.</p>
            ${foRows.length ? table(['Component', 'Group', 'Status'], foRows) : '<p class="docs-note">The Figma-only list was not found in DESIGN.md.</p>'}
          </section>`;
  return renderPage({
    title: 'Components',
    activeHref: 'components/index.html',
    base: BASE,
    onThisPage: [
      { id: 'components', label: 'Documented components' },
      { id: 'figma-only', label: 'In Figma, no code yet' },
    ],
    body,
  });
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
  const notesMap = { Button: 'Button', IconButton: 'IconButton', Badge: 'Badge', Link: 'Link', Separator: 'Separator' };
  for (const [k, nk] of Object.entries(notesMap)) {
    if (notesImpl[nk] !== map.components[k].implemented) console.warn(`coverage differs for ${k}: components-code-notes.json says ${notesImpl[nk]}, components-map.json says ${map.components[k].implemented} (map used)`);
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
