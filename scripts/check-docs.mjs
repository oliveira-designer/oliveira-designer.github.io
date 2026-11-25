// Checks the Hope DS docs site against the real CSS.
//
//   npm run docs:check
//
// Exits non-zero (errors) if:
//   1. a docs page uses a class that is not defined in css/*.css. Live demos
//      (markup between <!-- demo:start --> and <!-- demo:end -->, on pages under
//      docs/components/) may use ONLY css/*.css classes and no inline style.
//      The rest of every docs page may also use the chrome classes in docs/docs.css.
//   2. a docs page lacks <meta name="robots" content="noindex">.
//   3. a docs page does not link css/hope.css (the generated aggregate).
//   4. the header chrome of docs/*.html differs between pages.
//   5. docs/docs.css contains a hardcoded color (it must use Hope tokens).
//  11. a docs page lacks the layout markers (docs-ds-layout, docs-ds-sidebar, docs-ds-content).
//  10. docs/docs.css, a docs page or a docs generator contains a monospace font stack (Hope is Plus Jakarta Sans only).
//   8. a docs page lacks the theme switch (Light, Dark, System) or its boot script.
//   7. docs/components/review.html (the temporary review page): exists, lists every unit of
//      docs/data/figma-components-inventory.json exactly once, has one "Still to create"
//      row per unit, links the stylesheets listed in docs/data/css-sources.json, and its demo
//      classes exist in THOSE stylesheets.
//   9. docs/data/components-content.json or components-code-notes.json is missing while component
//      pages exist, or a slug in components-content.json has no docs/components/<slug>.html.
//  13. a typography token (--fw-*, --lh-*, --ls-*) is missing from css/tokens.css, differs from docs/data/figma-text-styles.json, or a
//      var(--fw|lh|ls-*) used in the CSS or the page styles is not defined (D-48, D-49).
//  14. an id attribute appears more than once in the same docs page (D housekeeping, 2.18.0).
//  12. text-transform: uppercase appears outside the single Label definition in css/reset.css (D-46), or a string styled with
//      the Label style (the selectors of that rule) has more than three words in the static HTML of the site and the docs.
//   6. docs/data/components-map.json names a CSS rule or class that is not in
//      css/*.css, is internally inconsistent, or disagrees with
//      docs/data/components-code-notes.json (counts differ: error).
//
// Reports only (no failure): CSS component blocks that have no demo yet.
// A demo is any page under docs/components/.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sources as cssSourceList, buildCss, OUTPUT as HOPE_CSS } from './build-css.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
// CSS source files (not the generated css/hope.css, not Tailwind output): the token, reset, component and
// site files listed by scripts/build-css.mjs, plus css/auth.css (loaded by js/auth.js).
const CSS_SOURCES = [...cssSourceList(), 'css/auth.css'];
const readCss = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const REQUIRED_CSS = ['hope.css'];
const isBlockSource = (rel) => rel.startsWith('css/components/') || rel.startsWith('css/site/');

const errors = [];
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

function stripCss(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/url\([^)]*\)/g, '')
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '');
}

function classesIn(cssText) {
  const out = new Set();
  const re = /\.(-?[_a-zA-Z][_a-zA-Z0-9-]*)/g;
  let m;
  const text = stripCss(cssText);
  while ((m = re.exec(text))) out.add(m[1]);
  return out;
}

function walk(dir, filter, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, filter, acc);
    else if (filter(p)) acc.push(p);
  }
  return acc;
}

const lineOf = (text, index) => text.slice(0, index).split('\n').length;

/* ---- CSS class inventory ---- */
const siteClasses = new Set();
const blockSource = new Map(); // block -> file
/* ---- css/hope.css must be up to date with its sources ---- */
if (!fs.existsSync(HOPE_CSS) || fs.readFileSync(HOPE_CSS, 'utf8').replace(/\r\n/g, '\n') !== buildCss()) {
  errors.push('css/hope.css is out of date with its source files (run npm run css:build)');
}

for (const f of CSS_SOURCES) {
  const cls = classesIn(readCss(f));
  cls.forEach((c) => siteClasses.add(c));
  if (isBlockSource(f)) {
    for (const c of cls) {
      if (/^(is|has|js)-/.test(c) || /^reveal/.test(c) || /^animate-/.test(c)) continue;
      const block = c.split('__')[0].split('--')[0];
      if (!blockSource.has(block)) blockSource.set(block, f);
    }
  }
}

/* ---- css-sources.json: the stylesheets the review page loads ---- */
const SOURCES_FILE = path.join(DOCS, 'data', 'css-sources.json');
let cssSources = null;
const sourceClasses = new Set();
if (fs.existsSync(SOURCES_FILE)) {
  try {
    cssSources = JSON.parse(fs.readFileSync(SOURCES_FILE, 'utf8')).sources;
    if (!Array.isArray(cssSources) || !cssSources.length) throw new Error('"sources" must be a non-empty array');
    for (const src of cssSources) {
      const f = path.join(ROOT, src);
      if (!fs.existsSync(f)) errors.push(`docs/data/css-sources.json: ${src} does not exist`);
      else classesIn(fs.readFileSync(f, 'utf8')).forEach((c) => sourceClasses.add(c));
    }
  } catch (err) {
    errors.push(`docs/data/css-sources.json is invalid: ${err.message}`);
    cssSources = null;
  }
}

const docsCssPath = path.join(DOCS, 'docs.css');
const docsCssText = fs.existsSync(docsCssPath) ? fs.readFileSync(docsCssPath, 'utf8') : '';
const docsClasses = classesIn(docsCssText);

/* ---- docs.css lint: no hardcoded colors ---- */
{
  const text = stripCss(docsCssText);
  const bad = text.match(/#[0-9a-fA-F]{3,8}\b|\b(rgb|rgba|hsl|hsla)\(/g);
  if (bad) errors.push(`docs/docs.css: hardcoded color(s) ${[...new Set(bad)].join(', ')}; use Hope tokens`);
}

/* ---- no monospace font stack in docs.css, docs pages or the docs generators (Hope uses Plus Jakarta Sans only) ---- */
{
  const MONO = /font(?:-family)?\s*:[^;{}]*(?:\b(?:monospace|ui-monospace|SFMono-Regular|SF Mono|Menlo|Consolas|Courier(?: New)?|Monaco|Lucida Console)\b|var\(\s*--font-mono)/i;
  const monoFiles = [
    path.join(DOCS, 'docs.css'),
    ...walk(DOCS, (p) => p.endsWith('.html')),
    ...['docs-layout', 'build-tokens-doc', 'build-components-doc', 'build-review-page'].map((n) => path.join(ROOT, 'scripts', n + '.mjs')),
  ];
  for (const f of monoFiles) {
    if (!fs.existsSync(f)) continue;
    const text = fs.readFileSync(f, 'utf8');
    const m = MONO.exec(text);
    if (m) errors.push(`${rel(f)}:${lineOf(text, m.index)}: monospace font stack (${m[0].trim().slice(0, 60)}); Hope uses var(--font-body) only`);
  }
}

/* ---- docs pages ---- */
const pages = walk(DOCS, (p) => p.endsWith('.html'));
const isComponentPage = (p) => rel(p).startsWith('docs/components/');
const DEMO_RE = /<!-- demo:start -->([\s\S]*?)<!-- demo:end -->/g;
let demoCount = 0;
const demoBlocks = new Set();
const headers = new Map();

for (const file of pages) {
  const text = fs.readFileSync(file, 'utf8');
  const name = rel(file);
  const isReview = path.basename(file) === 'review.html' && isComponentPage(file);

  // 1. classes. Demo regions: css/*.css only, no inline style. Everything else: css or docs.css.
  const demoRanges = [];
  let dm;
  DEMO_RE.lastIndex = 0;
  while ((dm = DEMO_RE.exec(text))) {
    demoRanges.push([dm.index, dm.index + dm[0].length]);
    demoCount++;
    if (/\sstyle\s*=/.test(dm[1])) errors.push(`${name}:${lineOf(text, dm.index)}: demo markup has an inline style`);
  }
  const unmatched = (text.match(/<!-- demo:start -->/g) || []).length !== (text.match(/<!-- demo:end -->/g) || []).length;
  if (unmatched) errors.push(`${name}: unbalanced demo:start and demo:end markers`);
  const inDemo = (idx) => demoRanges.some(([a, b]) => idx >= a && idx < b);
  const re = /\bclass\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  let m;
  while ((m = re.exec(text))) {
    const raw = m[1] ?? m[2];
    for (const c of raw.split(/\s+/).filter(Boolean)) {
      const inSite = siteClasses.has(c);
      const inDemoSources = (isReview && cssSources ? sourceClasses : siteClasses).has(c);
      const inDocs = docsClasses.has(c);
      if (inDemo(m.index)) {
        if (!inDemoSources) errors.push(`${name}:${lineOf(text, m.index)}: demo uses class "${c}" which is not defined in ${isReview && cssSources ? 'the stylesheets listed in docs/data/css-sources.json' : 'css/*.css'}`);
        else demoBlocks.add(c.split('__')[0].split('--')[0]);
      } else if (!inSite && !inDocs) {
        errors.push(`${name}:${lineOf(text, m.index)}: class "${c}" is not defined in css/*.css or docs/docs.css`);
      }
    }
  }

  // 2b. theme switch (Light, Dark, System) and its boot script on every docs page
  for (const choice of ['light', 'dark', 'system']) {
    if (!text.includes(`data-theme-choice="${choice}"`)) errors.push(`${name}: theme switch is missing the "${choice}" button`);
  }
  if (!text.includes('class="docs-theme"')) errors.push(`${name}: theme switch container (.docs-theme) is missing`);
  if (!text.includes("'hope-docs-theme'")) errors.push(`${name}: theme boot script (hope-docs-theme) is missing`);

  // 2c. layout markers: every docs page uses the one layout (side menu and content area, scripts/docs-layout.mjs)
  for (const marker of ['docs-ds-layout', 'docs-ds-sidebar', 'docs-ds-content']) {
    if (!text.includes(`class="${marker}`)) errors.push(`${name}: layout marker "${marker}" is missing (regenerate with the docs scripts)`);
  }

  // 2. noindex
  if (!/<meta\s+name="robots"\s+content="noindex"\s*\/?>/i.test(text)) errors.push(`${name}: missing <meta name="robots" content="noindex">`);

  // 3. stylesheets. The review page must link exactly the files listed in css-sources.json.
  if (isReview && cssSources) {
    const linked = [...text.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)].map((x) => x[1]).filter((h) => !/^https?:/.test(h) && !h.endsWith('docs.css'));
    const resolved = linked.map((h) => path.relative(ROOT, path.resolve(path.dirname(file), h)).split(path.sep).join('/'));
    if (JSON.stringify(resolved) !== JSON.stringify(cssSources)) errors.push(`${name}: stylesheets ${JSON.stringify(resolved)} differ from docs/data/css-sources.json ${JSON.stringify(cssSources)}`);
  }
  for (const css of isReview ? [] : REQUIRED_CSS) {
    const hrefRe = new RegExp(`<link[^>]+href="([^"]*css/${css.replace('.', '\\.')})"`, 'i');
    const hm = text.match(hrefRe);
    if (!hm) {
      errors.push(`${name}: does not link css/${css}`);
    } else if (!fs.existsSync(path.resolve(path.dirname(file), hm[1]))) {
      errors.push(`${name}: link to ${hm[1]} does not resolve to a file`);
    }
  }

  // 4. header chrome. Pages one folder down (docs/components/) carry one extra "../"
  //    in every href and src, which is removed before comparing.
  {
    const hm = text.match(/<header class="site-header"[\s\S]*?<\/header>/);
    if (!hm) errors.push(`${name}: no site header found`);
    else {
      let h = hm[0].replace(/ nav__link--active/g, '').replace(/ aria-current="page"/g, '');
      if (isComponentPage(file)) h = h.replace(/(href|src)="\.\.\//g, '$1="');
      headers.set(name, h.replace(/\s+/g, ' '));
    }
  }
}

/* ---- review page checks ---- */
{
  const invFile = path.join(DOCS, 'data', 'figma-components-inventory.json');
  const reviewFile = path.join(DOCS, 'components', 'review.html');
  if (fs.existsSync(invFile)) {
    let inv = null;
    try {
      inv = JSON.parse(fs.readFileSync(invFile, 'utf8'));
    } catch (err) {
      errors.push(`docs/data/figma-components-inventory.json is not valid JSON: ${err.message}`);
    }
    if (inv && !fs.existsSync(reviewFile)) errors.push('docs/components/review.html does not exist (run npm run docs:review)');
    else if (inv) {
      const text = fs.readFileSync(reviewFile, 'utf8');
      const slug = (x) => String(x).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const units = inv.components || [];
      for (const u of units) {
        const n = (text.match(new RegExp(`id="unit-${slug(u.name)}"`, 'g')) || []).length;
        if (n !== 1) errors.push(`docs/components/review.html: unit "${u.name}" appears ${n} times as a section, expected 1`);
        const r = (text.match(new RegExp(`data-unit-row="${u.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g')) || []).length;
        if (r !== 1) errors.push(`docs/components/review.html: unit "${u.name}" has ${r} rows in the Still to create table, expected 1`);
      }
      const unitSections = (text.match(/id="unit-[a-z0-9-]+"/g) || []).filter((x) => !x.endsWith('-title"')).length;
      if (unitSections !== units.length) errors.push(`docs/components/review.html: ${unitSections} unit sections for ${units.length} inventory units`);
      const rows = (text.match(/data-unit-row="/g) || []).length;
      if (rows !== units.length) errors.push(`docs/components/review.html: ${rows} table rows for ${units.length} inventory units`);
      if ((text.match(/data-totals-row/g) || []).length !== 1) errors.push('docs/components/review.html: expected exactly one totals row');
      console.log(`review page: ${units.length} inventory units, ${unitSections} unit sections, ${rows} table rows`);
    }
  }
}

const headerValues = [...headers.values()];
if (new Set(headerValues).size > 1) {
  errors.push(`header chrome differs between pages: ${[...headers.keys()].join(', ')} (regenerate with npm run docs:tokens)`);
}

/* ---- component data files must exist while component pages exist ---- */
{
  const compDir = path.join(DOCS, 'components');
  const pageNames = fs.existsSync(compDir) ? fs.readdirSync(compDir).filter((n) => n.endsWith('.html') && n !== 'index.html' && n !== 'review.html') : [];
  if (pageNames.length) {
    for (const f of ['components-content.json', 'components-code-notes.json']) {
      if (!fs.existsSync(path.join(DOCS, 'data', f))) errors.push(`docs/data/${f} is missing, but component pages exist in docs/components/ (restore the file; npm run docs:components needs it)`);
    }
    const contentFile = path.join(DOCS, 'data', 'components-content.json');
    if (fs.existsSync(contentFile)) {
      try {
        const slugs = (JSON.parse(fs.readFileSync(contentFile, 'utf8')).components || []).map((c) => c.slug);
        for (const slug of slugs) if (!pageNames.includes(`${slug}.html`)) errors.push(`components-content.json lists "${slug}" but docs/components/${slug}.html does not exist (run npm run docs:components)`);
      } catch (err) {
        errors.push(`docs/data/components-content.json is not valid JSON: ${err.message}`);
      }
    }
  }
}

/* ---- components-map.json: every selector must exist in the CSS ---- */
{
  const mapFile = path.join(DOCS, 'data', 'components-map.json');
  const notesFile = path.join(DOCS, 'data', 'components-code-notes.json');
  if (fs.existsSync(mapFile)) {
    let map;
    try {
      map = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
    } catch (err) {
      errors.push(`docs/data/components-map.json is not valid JSON: ${err.message}`);
    }
    if (map) {
      const cssText = CSS_SOURCES.map(readCss)
        .join('\n')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ');
      const ruleExists = (rule) => new RegExp('(?:^|[\\s,}{])' + rule.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=\\s*[,{])').test(cssText);
      let notes = null;
      if (fs.existsSync(notesFile)) {
        try {
          notes = JSON.parse(fs.readFileSync(notesFile, 'utf8'));
        } catch (err) {
          errors.push(`docs/data/components-code-notes.json is not valid JSON: ${err.message}`);
        }
      }
      const total = { figma: 0, impl: 0 };
      for (const [key, comp] of Object.entries(map.components || {})) {
        const variants = comp.variants || [];
        const withSel = variants.filter((v) => v.selector);
        total.figma += variants.length;
        total.impl += withSel.length;
        if (withSel.length !== comp.implemented) errors.push(`components-map.json: ${key} says ${comp.implemented} implemented but ${withSel.length} variants have a selector`);
        if (variants.length !== comp.figmaVariants) errors.push(`components-map.json: ${key} says ${comp.figmaVariants} Figma variants but lists ${variants.length}`);
        const rules = new Set([...(comp.globalRules || []), ...withSel.map((v) => v.rule).filter(Boolean)]);
        if (comp.base) rules.add(comp.base);
        for (const r of rules) if (!ruleExists(r)) errors.push(`components-map.json: ${key} rule "${r}" is not in css/*.css`);
        for (const v of withSel) {
          for (const c of v.selector.split('.').filter(Boolean)) if (!siteClasses.has(c)) errors.push(`components-map.json: ${key} selector "${v.selector}" uses class "${c}" which is not in css/*.css`);
        }
        const notesImpl = notes && notes.coverage && notes.coverage.implementedInCss ? notes.coverage.implementedInCss[key] : undefined;
        const notesFigma = notes && notes.coverage && notes.coverage.figmaVariants ? notes.coverage.figmaVariants[key] : undefined;
        if (notesImpl !== undefined && notesImpl !== withSel.length) errors.push(`components-map.json: ${key} has ${withSel.length} implemented but components-code-notes.json says ${notesImpl}`);
        if (notesFigma !== undefined && notesFigma !== variants.length) errors.push(`components-map.json: ${key} lists ${variants.length} Figma variants but components-code-notes.json says ${notesFigma}`);
      }
      for (const c of map.codeOnly || []) if (!ruleExists(c.selector)) errors.push(`components-map.json: code-only selector "${c.selector}" is not in css/*.css`);
      console.log(`components-map.json: ${total.impl} of ${total.figma} Figma variants have a CSS selector (${Object.entries(map.components || {}).map(([k, c]) => `${k} ${c.implemented}/${c.figmaVariants}`).join(', ')})`);
    }
  }
}

/* ---- 12. all caps (D-46): the Label style is the only place where text-transform: uppercase is allowed, and only for labels of up to three words ---- */
{
  const LABEL_RULE_FILE = 'css/reset.css';
  const listFiles = (dir, ext, skip = () => false) => {
    const out = [];
    const walk = (d) => {
      for (const n of fs.readdirSync(d)) {
        const f = path.join(d, n);
        if (skip(f)) continue;
        if (fs.statSync(f).isDirectory()) walk(f);
        else if (n.endsWith(ext)) out.push(f);
      }
    };
    if (fs.existsSync(dir)) walk(dir);
    return out;
  };
  const noComments = (t) => t.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  const UPPER = /text-transform\s*:\s*uppercase/g;

  // (a) uppercase appears only in the Label definition (css/reset.css, once). Scope: css/ sources, docs/ (css and the style
  // blocks and attributes of the pages), and the pages of the site that carry inline styles. css/hope.css and css/output.css
  // (generated, the Tailwind .uppercase utility) are not scanned.
  const cssFiles = [
    ...listFiles(path.join(ROOT, 'css'), '.css', (f) => ['hope.css', 'output.css'].includes(path.basename(f))),
    ...listFiles(DOCS, '.css'),
  ];
  let labelDefs = 0;
  for (const f of cssFiles) {
    const text = noComments(fs.readFileSync(f, 'utf8'));
    for (const m of text.matchAll(UPPER)) {
      if (rel(f) === LABEL_RULE_FILE) labelDefs += 1;
      else errors.push(`${rel(f)}:${lineOf(text, m.index)}: text-transform: uppercase outside the Label definition in ${LABEL_RULE_FILE} (D-46); use the .text-label class or the Label selector group`);
    }
  }
  if (labelDefs !== 1) errors.push(`${LABEL_RULE_FILE}: expected exactly one text-transform: uppercase (the Label definition), found ${labelDefs}`);

  const htmlFiles = [
    ...fs.readdirSync(ROOT).filter((n) => n.endsWith('.html')).map((n) => path.join(ROOT, n)),
    ...listFiles(path.join(ROOT, 'case-studies'), '.html'),
    ...listFiles(DOCS, '.html', (f) => f.includes(`${path.sep}docs${path.sep}case`)),
  ];
  for (const f of htmlFiles) {
    const text = fs.readFileSync(f, 'utf8');
    const styled = [...text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => ({ body: noComments(m[1]), at: m.index }))
      .concat([...text.matchAll(/\sstyle\s*=\s*"([^"]*)"/g)].map((m) => ({ body: m[1], at: m.index })));
    for (const st of styled) if (UPPER.test(st.body)) { UPPER.lastIndex = 0; errors.push(`${rel(f)}:${lineOf(text, st.at)}: inline text-transform: uppercase (D-46); use the .text-label class`); } else UPPER.lastIndex = 0;
  }

  // (b) a string styled with the Label style has at most three words. The selectors are read from the Label rule in css/reset.css.
  // A word is a token with a letter or a digit, or a standalone "&"; a dash or a colon is not a word. Static HTML only: text added
  // by JavaScript or by CSS content is not seen (documented in DESIGN.md).
  const resetCss = noComments(fs.readFileSync(path.join(ROOT, LABEL_RULE_FILE), 'utf8'));
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let selectorList = '';
  for (const m of resetCss.matchAll(ruleRe)) if (UPPER.test(m[2])) { selectorList = m[1]; UPPER.lastIndex = 0; break; } else UPPER.lastIndex = 0;
  const labelSelectors = selectorList.split(',').map((x) => x.trim()).filter((x) => x && !x.includes('::')).map((sel) => {
    const compounds = sel.split(/\s+/).map((c) => ({ tag: (/^[a-z][a-z0-9]*/i.exec(c) || [''])[0].toLowerCase(), classes: [...c.matchAll(/\.([\w-]+)/g)].map((x) => x[1]) }));
    return { text: sel, target: compounds[compounds.length - 1], ancestors: compounds.slice(0, -1) };
  });
  const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
  const wordCount = (t) => t.replace(/&amp;/g, '&').replace(/&[a-z#0-9]+;/gi, ' ').split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w) || w === '&').length;
  let labelStrings = 0;
  for (const f of htmlFiles) {
    const text = fs.readFileSync(f, 'utf8').replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' ')).replace(/<(script|style)[\s\S]*?<\/\1>/gi, (m) => m.replace(/[^\n]/g, ' '));
    const stack = [];
    const tokenRe = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>|([^<]+)/g;
    let m;
    while ((m = tokenRe.exec(text))) {
      if (m[4] !== undefined) { for (const el of stack) el.text += m[4]; continue; }
      const close = m[1] === '/'; const tag = m[2].toLowerCase();
      if (!close) {
        if (VOID.has(tag) || /\/\s*$/.test(m[3])) continue;
        const cm = /\sclass\s*=\s*"([^"]*)"/.exec(m[3]);
        stack.push({ tag, classes: cm ? cm[1].split(/\s+/) : [], text: '', line: lineOf(text, m.index) });
      } else {
        let i = stack.length - 1;
        while (i >= 0 && stack[i].tag !== tag) i -= 1;
        if (i < 0) continue;
        const el = stack[i];
        const anc = stack.slice(0, i);
        stack.length = i;
        for (const sel of labelSelectors) {
          const t = sel.target;
          if (t.tag && t.tag !== el.tag) continue;
          if (!t.classes.every((c) => el.classes.includes(c))) continue;
          if (!t.tag && !t.classes.length) continue;
          if (!sel.ancestors.every((a) => anc.some((x) => (!a.tag || x.tag === a.tag) && a.classes.every((c) => x.classes.includes(c))))) continue;
          labelStrings += 1;
          const n = wordCount(el.text);
          if (n > 3) errors.push(`${rel(f)}:${el.line}: Label style (${sel.text}) on a string of ${n} words ("${el.text.replace(/\s+/g, ' ').trim().slice(0, 60)}"); the limit is 3, use the sentence case style (.text-body-xs-semibold) (D-46)`);
          break;
        }
      }
    }
  }
  console.log(`all caps (D-46): one Label definition in ${LABEL_RULE_FILE}; ${labelStrings} Label strings checked for the three-word limit`);
}

/* ---- 13. typography tokens (D-48, D-49): --fw-*, --lh-*, --ls-* exist with the values of the Figma text styles snapshot ---- */
{
  const TS_FILE = path.join(DOCS, 'data', 'figma-text-styles.json');
  if (!fs.existsSync(TS_FILE)) {
    errors.push('docs/data/figma-text-styles.json is missing (the typography token check reads it)');
  } else {
    let ts = null;
    try {
      ts = JSON.parse(fs.readFileSync(TS_FILE, 'utf8'));
    } catch (err) {
      errors.push(`docs/data/figma-text-styles.json is not valid JSON: ${err.message}`);
    }
    if (ts) {
      const tokensCss = stripCss(readCss('css/tokens.css'));
      const declared = new Map();
      for (const m of tokensCss.matchAll(/(?:^|[;{\s])(--[a-z0-9-]+)\s*:\s*([^;}]+)/g)) if (!declared.has(m[1])) declared.set(m[1], m[2].trim());
      const ratio = (p) => String(Math.round(p) / 100);
      const em = (p) => (p === 0 ? '0' : `${Math.round(p) / 100}em`);
      const expect = [];
      for (const [name, w] of Object.entries(ts.weights || {})) expect.push([name, String(w.value), `${w.figmaVariable} (${w.style})`]);
      for (const [name, t] of Object.entries(ts.tokens || {})) expect.push([name, t.property === 'line-height' ? ratio(t.percent) : em(t.percent), `${t.percent}% ${t.property}`]);
      for (const [name, want, what] of expect) {
        if (!declared.has(name)) errors.push(`css/tokens.css: ${name} is missing (Figma ${what}, expected ${want})`);
        else if (declared.get(name) !== want) errors.push(`css/tokens.css: ${name} is ${declared.get(name)} but the Figma text styles snapshot says ${what}, which is ${want}`);
      }
      // every line height and letter spacing used by a text style has a token, so a new Figma value cannot slip in without one
      const lhPct = new Set(Object.values(ts.tokens || {}).filter((t) => t.property === 'line-height').map((t) => t.percent));
      const lsPct = new Set(Object.values(ts.tokens || {}).filter((t) => t.property === 'letter-spacing').map((t) => t.percent));
      for (const st of ts.styles || []) {
        if (!lhPct.has(st.lineHeightPct)) errors.push(`docs/data/figma-text-styles.json: ${st.name} has line height ${st.lineHeightPct}% and no --lh-* token for it`);
        if (!lsPct.has(st.letterSpacingPct)) errors.push(`docs/data/figma-text-styles.json: ${st.name} has letter spacing ${st.letterSpacingPct}% and no --ls-* token for it`);
      }
      // every var(--fw-*), var(--lh-*), var(--ls-*) in the CSS sources, docs.css and the page styles resolves to a defined token
      const files = [...CSS_SOURCES.map((f) => path.join(ROOT, f)), path.join(DOCS, 'docs.css')];
      const used = new Set();
      const scanVars = (text, where) => {
        for (const m of text.matchAll(/var\(\s*(--(?:fw|lh|ls)-[a-z0-9-]+)/g)) {
          used.add(m[1]);
          if (!declared.has(m[1])) errors.push(`${where}: var(${m[1]}) is not defined in css/tokens.css`);
        }
      };
      for (const f of files) if (fs.existsSync(f)) scanVars(stripCss(fs.readFileSync(f, 'utf8')), rel(f));
      const pagesToScan = [...fs.readdirSync(ROOT).filter((n) => n.endsWith('.html')).map((n) => path.join(ROOT, n)), ...pages].filter((f) => typeof f === 'string' && fs.existsSync(f));
      for (const f of new Set(pagesToScan)) {
        const text = fs.readFileSync(f, 'utf8');
        for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) scanVars(m[1], rel(f));
        for (const m of text.matchAll(/\sstyle\s*=\s*"([^"]*)"/g)) scanVars(m[1], rel(f));
      }
      console.log(`typography tokens (D-48, D-49): ${expect.length} tokens checked against the text styles snapshot of ${ts.source && ts.source.readAt}; ${used.size} distinct var(--fw|lh|ls-*) used, all defined`);
    }
  }
}

/* ---- report: blocks without a demo ---- */
const blocks = [...blockSource.keys()].sort();
const withDemo = blocks.filter((b) => demoBlocks.has(b));
const without = blocks.filter((b) => !demoBlocks.has(b));

/* ---- 14. duplicate ids: an id attribute appears once per docs page (a repeated id breaks anchors and aria-labelledby) ---- */
{
  for (const file of pages) {
    const text = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '');
    const seen = new Map();
    for (const m of text.matchAll(/<[a-zA-Z][^<>]*?\sid="([^"]+)"/g)) seen.set(m[1], (seen.get(m[1]) || 0) + 1);
    for (const [id, n] of seen) if (n > 1) errors.push(`${rel(file)}: id="${id}" appears ${n} times`);
  }
  console.log(`duplicate ids: ${pages.length} docs pages checked`);
}

console.log(`docs pages checked: ${pages.length} (${pages.filter(isComponentPage).length} component pages, ${demoCount} live demos)`);
console.log(`CSS blocks (css/components + css/site): ${blocks.length}; with a demo: ${withDemo.length}; without: ${without.length}`);
if (without.length) {
  const byFile = {};
  for (const b of without) (byFile[blockSource.get(b)] ||= []).push(b);
  for (const [f, list] of Object.entries(byFile)) console.log(`  no demo, ${f} (${list.length}): ${list.join(', ')}`);
}

if (errors.length) {
  console.error(`\n${errors.length} error(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log('\nOK: no errors.');
