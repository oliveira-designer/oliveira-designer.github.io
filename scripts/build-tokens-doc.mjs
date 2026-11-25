// Builds the tokens page of the Hope DS docs site.
//
//   npm run docs:tokens
//
// Reads css/tokens.css for NAMES, GROUP banners and trailing notes. VALUES come
// from the browser: Playwright loads tokens.css and reads getComputedStyle under
// data-theme="light" and "dark", so var() alias chains are already resolved.
//
// Then compares each token with the Figma snapshot in docs/data/figma-tokens.json
// (matched by cssName) and writes:
//   docs/data/tokens.json   data for the divergence report (CSS + Figma + status)
//   docs/tokens.html        grouped tables, summary, mismatches, Figma-only tables
//   docs/index.html         regenerated so it shares the exact same chrome
//
// Accepted divergences: docs/data/accepted-divergences.json is an optional array
// of { cssName, mode (optional), reason, decidedBy, date }. Entries with scope "effect" (a value that is not a token) and scope "rule"
// (a pattern that covers a list of rules, with status accepted or pending) are shown in the same table and never matched to a token. A mismatch (token and
// mode) or a Figma token missing from tokens.css that is listed there gets status
// "accepted": own badge, reason on hover and in the summary, counted separately,
// values always shown. An entry that no longer matches any divergence is "stale":
// warned and shown in the summary, never a build error.
//
// Exit code: non-zero ONLY when data is malformed (tokens.css cannot be parsed,
// figma-tokens.json is invalid, no browser). Mismatches never fail the build.
//
// Figma snapshot shape: { source, collections[], tokens[] } where each token has
// collection, name, type (COLOR | FLOAT | STRING), cssName (or null), modes
// ({ modeName: resolvedValue }) and optional refs. If the file is missing the
// Figma column shows "not synced".

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { renderPage, indexBody, esc } from './docs-layout.mjs';
import { hopeTable } from './docs-kit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS_CSS = path.join(ROOT, 'css', 'tokens.css');
const OUT_DIR = path.join(ROOT, 'docs');
const FIGMA_JSON = path.join(OUT_DIR, 'data', 'figma-tokens.json');
const ACCEPTED_JSON = path.join(OUT_DIR, 'data', 'accepted-divergences.json');
const TEXT_STYLES_JSON = path.join(OUT_DIR, 'data', 'figma-text-styles.json');

/* Short labels for the sidebar and page headings. Keyed by the slug of the raw
   banner text in tokens.css. The raw banner text stays available as a tooltip.
   A banner that is not listed here falls back to its raw text (with a warning). */
const GROUP_LABELS = {
  'colors-solar-family': 'Solar',
  'colors-anchor-family': 'Anchor',
  'colors-neutrals': 'Neutrals',
  'colors-functional': 'Functional',
  'colors-night-family-dark-mode-ramp': 'Night',
  'surfaces-light-mode-default': 'Surfaces',
  'state-status-tokens-light-mode-figma-foundation-v2-2': 'State and status',
  'icon-color-figma-hope-icon-icon-color-10-modes': 'Icon color',
  'component-tokens-light-mode-default': 'Component',
  'material-unified-glassmorphism-recipe': 'Material (glass)',
  'foundation-rename-2026-11-20-new-semantic-tokens': 'Foundation rename (new names)',
  'deprecated-aliases-2026-11-remove-in-a-later-major': 'Deprecated aliases',
  typography: 'Typography',
  'spacing-4px-base-scale': 'Spacing and gaps',
  'content-width-shared-cap-for-section-inner-content': 'Content width',
  'header-height-fixed-height-of-the-sticky-site-header': 'Header height',
  'borders-radius': 'Borders and radius',
  shadows: 'Shadows',
  motion: 'Motion',
  'z-index': 'Z-index',
  'global-urls': 'Global URLs',
  ungrouped: 'Ungrouped',
  'dark-only': 'Dark only',
  'reduced-transparency-only': 'Reduced transparency only',
};

class MalformedData extends Error {}

/* ---------------------------------------------------------------------------
   1. Parsing (names, groups, notes). Strings, comments and nested parentheses
   are handled explicitly; no regex over the whole file.
   ------------------------------------------------------------------------ */

// Splits CSS text into top-level rules: { prelude, body, start, end }.
function splitRules(css) {
  const rules = [];
  let i = 0;
  let start = 0;
  const n = css.length;
  const skipString = (j, q) => {
    for (j++; j < n; j++) {
      if (css[j] === '\\') j++;
      else if (css[j] === q) return j;
    }
    return n - 1;
  };
  while (i < n) {
    const c = css[i];
    if (c === '/' && css[i + 1] === '*') {
      const e = css.indexOf('*/', i + 2);
      i = e === -1 ? n : e + 2;
      continue;
    }
    if (c === '"' || c === "'") {
      i = skipString(i, c) + 1;
      continue;
    }
    if (c === '{') {
      const prelude = css.slice(start, i).replace(/\/\*[\s\S]*?\*\//g, '').trim();
      const bodyStart = i + 1;
      let depth = 1;
      let j = i + 1;
      while (j < n && depth > 0) {
        const d = css[j];
        if (d === '/' && css[j + 1] === '*') {
          const e = css.indexOf('*/', j + 2);
          j = e === -1 ? n : e + 2;
          continue;
        }
        if (d === '"' || d === "'") {
          j = skipString(j, d) + 1;
          continue;
        }
        if (d === '{') depth++;
        else if (d === '}') depth--;
        j++;
      }
      rules.push({ prelude, body: css.slice(bodyStart, j - 1), start, end: j, bodyStart });
      i = j;
      start = j;
      continue;
    }
    i++;
  }
  return rules;
}

// Walks a declaration block and returns banners and custom properties in order.
function scanBody(body) {
  const items = [];
  const n = body.length;
  let i = 0;
  let lastDecl = null;
  let lastDeclEnd = -1;
  while (i < n) {
    const ch = body[i];
    if (ch === '/' && body[i + 1] === '*') {
      const end = body.indexOf('*/', i + 2);
      const text = body.slice(i + 2, end === -1 ? n : end);
      if (/^\s*-{5,}/.test(text)) {
        const lines = text.split('\n').map((l) => l.trim()).filter((l) => l && !/^-+$/.test(l));
        items.push({ type: 'banner', title: lines[0] || '', lines: lines.slice(1) });
        lastDecl = null;
      } else if (lastDecl && !body.slice(lastDeclEnd, i).includes('\n')) {
        lastDecl.note = text.replace(/\s+/g, ' ').trim();
      }
      i = end === -1 ? n : end + 2;
      continue;
    }
    if (ch === '-' && body[i + 1] === '-') {
      const colon = body.indexOf(':', i);
      const name = body.slice(i, colon).trim();
      if (colon === -1 || !/^--[A-Za-z0-9_-]+$/.test(name)) {
        i++;
        continue;
      }
      let j = colon + 1;
      let depth = 0;
      let quote = null;
      for (; j < n; j++) {
        const c = body[j];
        if (quote) {
          if (c === '\\') j++;
          else if (c === quote) quote = null;
          continue;
        }
        if (c === '"' || c === "'") quote = c;
        else if (c === '(') depth++;
        else if (c === ')') depth--;
        else if (c === '/' && body[j + 1] === '*') {
          const e = body.indexOf('*/', j + 2);
          j = e === -1 ? n : e + 1;
        } else if (c === ';' && depth === 0) break;
      }
      const value = body.slice(colon + 1, j).replace(/\/\*[\s\S]*?\*\//g, '').trim();
      lastDecl = { type: 'decl', name, value, note: '' };
      lastDeclEnd = j + 1;
      items.push(lastDecl);
      i = j + 1;
      continue;
    }
    i++;
  }
  return items;
}

const clean = (text) => text.replace(/\s+\u2014\s+/g, ': ').replace(/\u2014/g, ',').replace(/\.$/, '').trim();
const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function parseTokens(css) {
  const rules = splitRules(css);
  const base = rules.find((r) => r.prelude === ':root');
  const dark = rules.find((r) => r.prelude === '[data-theme="dark"]');
  const reduced = rules.find((r) => /prefers-reduced-transparency/.test(r.prelude));
  if (!base || !dark) throw new MalformedData('tokens.css: expected a top-level :root and [data-theme="dark"] block');

  const baseItems = scanBody(base.body);
  const darkItems = scanBody(dark.body);
  const reducedItems = [];
  if (reduced) {
    for (const child of splitRules(reduced.body)) {
      for (const it of scanBody(child.body)) {
        if (it.type === 'decl') reducedItems.push({ ...it, selector: child.prelude });
      }
    }
  }

  const tokens = new Map();
  const groups = [];
  const newGroup = (rawTitle, description) => {
    const rawId = slug(rawTitle);
    const label = GROUP_LABELS[rawId];
    if (!label) console.warn(`No short label for banner "${rawTitle}" (id ${rawId}); using the raw text. Add it to GROUP_LABELS.`);
    const g = { id: slug(label || rawTitle), label: label || rawTitle, raw: rawTitle, description };
    groups.push(g);
    return g;
  };
  let group = newGroup('Ungrouped', '');
  for (const it of baseItems) {
    if (it.type === 'banner') {
      group = newGroup(clean(it.title), clean(it.lines.join(' ')));
    } else {
      tokens.set(it.name, { name: it.name, group: group.id, declared: it.value, note: clean(it.note), darkDeclared: null, reducedDeclared: null });
    }
  }
  let darkOnlyGroup = null;
  for (const it of darkItems) {
    if (it.type !== 'decl') continue;
    if (tokens.has(it.name)) tokens.get(it.name).darkDeclared = it.value;
    else {
      if (!darkOnlyGroup) {
        darkOnlyGroup = { id: 'dark-only', label: GROUP_LABELS['dark-only'], raw: 'Defined only in dark mode', description: 'Not declared in :root; the Light value is the unset default.' };
        groups.push(darkOnlyGroup);
      }
      tokens.set(it.name, { name: it.name, group: darkOnlyGroup.id, declared: null, note: clean(it.note), darkDeclared: it.value, reducedDeclared: null });
    }
  }
  let rtOnlyGroup = null;
  for (const it of reducedItems) {
    if (tokens.has(it.name)) {
      const t = tokens.get(it.name);
      t.reducedDeclared = { ...(t.reducedDeclared || {}), [it.selector]: it.value };
    } else {
      if (!rtOnlyGroup) {
        rtOnlyGroup = { id: 'reduced-transparency-only', label: GROUP_LABELS['reduced-transparency-only'], raw: 'Defined only under reduced transparency', description: '' };
        groups.push(rtOnlyGroup);
      }
      tokens.set(it.name, { name: it.name, group: rtOnlyGroup.id, declared: null, note: '', darkDeclared: null, reducedDeclared: { [it.selector]: it.value } });
    }
  }
  return { rules, base, dark, reduced, tokens, groups };
}

/* ---------------------------------------------------------------------------
   2. Classification
   ------------------------------------------------------------------------ */

function balanced(v) {
  let d = 0;
  for (const c of v) {
    if (c === '(') d++;
    else if (c === ')') d--;
    if (d < 0) return false;
  }
  return d === 0;
}

function isNonDesignToken(t, light) {
  const v = light || t.declared || '';
  return /^["'].*:\/\/.*["']$/.test(v.trim());
}

function kindOf(name, value) {
  const v = (value || '').trim();
  if (!v) return 'empty';
  if (/^(#[0-9a-f]{3,8}|transparent|currentcolor)$/i.test(v)) return 'color';
  if (/^(rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix|color)\(.*\)$/i.test(v) && balanced(v)) return 'color';
  if (/^blur\(|^saturate\(/.test(v) || (/^(none|blur)/.test(v) && /glass/.test(name))) return 'composite';
  if (/^[0-9.]+(px|rem|em)?\s+(solid|dashed|dotted)\s/.test(v)) return 'composite';
  if (/^[-0-9.]+(px)?\s/.test(v) && (/(rgba?|hsla?)\(/.test(v) || /#[0-9a-f]{3,8}/i.test(v))) return 'shadow';
  if (/^cubic-bezier\(/.test(v) || v === 'linear') return 'easing';
  if (/^clamp\(|^min\(|^max\(|^calc\(/.test(v)) return 'fluid';
  if (/['"]/.test(v) || /-apple-system|sans-serif|serif/.test(v)) return 'font';
  if (/^-?[0-9]*\.?[0-9]+(px|rem|em|%|vw|vh)$/.test(v)) return 'length';
  if (/^-?[0-9]*\.?[0-9]+m?s$/.test(v)) return 'time';
  if (/^-?[0-9]*\.?[0-9]+$/.test(v)) return 'number';
  return 'other';
}

/* ---------------------------------------------------------------------------
   3. Resolution in the browser
   ------------------------------------------------------------------------ */

async function launch() {
  for (const opt of [{ channel: 'chrome' }, { channel: 'msedge' }, {}]) {
    try {
      return await chromium.launch(opt);
    } catch {
      /* try the next one */
    }
  }
  throw new MalformedData('No browser available for Playwright (tried Chrome, Edge, bundled Chromium).');
}

async function resolveAll(browser, cssText, names) {
  const page = await browser.newPage();
  await page.setContent('<!doctype html><html><head></head><body></body></html>');
  await page.addStyleTag({ content: cssText });
  const out = {};
  for (const theme of ['light', 'dark']) {
    out[theme] = await page.evaluate(
      ([t, list]) => {
        document.documentElement.setAttribute('data-theme', t);
        const cs = getComputedStyle(document.documentElement);
        return Object.fromEntries(list.map((n) => [n, cs.getPropertyValue(n).trim()]));
      },
      [theme, names]
    );
  }
  await page.close();
  return out;
}

/* ---------------------------------------------------------------------------
   4. Usage scan (unused tokens)
   ------------------------------------------------------------------------ */

function walk(dir, filter, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', 'docs', 'images', 'videos', 'fonts', 'design-organization', 'scripts', 'textos-brutos'].includes(e.name)) continue;
      walk(p, filter, acc);
    } else if (filter(p)) acc.push(p);
  }
  return acc;
}

function usageCorpus() {
  const skipCss = new Set(['tokens.css', 'hope.css', 'output.css', 'preflight-nomono.css', 'tailwind.css']);
  const files = walk(ROOT, (p) => {
    const rel = path.relative(ROOT, p).split(path.sep).join('/');
    if (rel.startsWith('css/')) return rel.endsWith('.css') && !skipCss.has(path.basename(rel));
    if (rel.startsWith('js/')) return rel.endsWith('.js');
    return rel.endsWith('.html');
  });
  return files.map((f) => fs.readFileSync(f, 'utf8')).join('\n');
}

function isUnused(name, corpus, tokensCss) {
  const re = new RegExp(name.replace(/[-]/g, '\\-') + '(?![A-Za-z0-9_-])', 'g');
  if (re.test(corpus)) return false;
  // Alias inside tokens.css counts as a use: var(--name)
  const aliasRe = new RegExp('var\\(\\s*' + name.replace(/[-]/g, '\\-') + '(?![A-Za-z0-9_-])', 'g');
  return !aliasRe.test(tokensCss);
}

/* ---------------------------------------------------------------------------
   5. Value normalization
   ------------------------------------------------------------------------ */

const hex2 = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');

// Returns { r, g, b, a } with a in 0..255, or null.
function parseColor(input) {
  const s = String(input).trim().toLowerCase();
  if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  let m = s.match(/^#([0-9a-f]{3,8})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    if (h.length !== 6 && h.length !== 8) return null;
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
      a: h.length === 8 ? parseInt(h.slice(6, 8), 16) : 255,
    };
  }
  m = s.match(/^rgba?\(\s*([^)]*)\)$/);
  if (m) {
    const parts = m[1].split(/[\s,/]+/).filter(Boolean);
    if (parts.length < 3) return null;
    const ch = (p) => (p.endsWith('%') ? (parseFloat(p) / 100) * 255 : parseFloat(p));
    const [r, g, b] = parts.slice(0, 3).map(ch);
    let a = 255;
    if (parts[3] !== undefined) a = parts[3].endsWith('%') ? (parseFloat(parts[3]) / 100) * 255 : parseFloat(parts[3]) * 255;
    if ([r, g, b, a].some((x) => Number.isNaN(x))) return null;
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b), a: Math.round(a) };
  }
  return null;
}

const colorHex = (c) => '#' + hex2(c.r) + hex2(c.g) + hex2(c.b) + hex2(c.a);
const colorsEqual = (x, y) => x.r === y.r && x.g === y.g && x.b === y.b && Math.abs(x.a - y.a) <= 1;

// Root font size for rem conversion: html or :root font-size in css/*.css, else 16.
function detectRootPx() {
  const dir = path.join(ROOT, 'css');
  for (const f of fs.readdirSync(dir).filter((n) => n.endsWith('.css') && !['output.css', 'tailwind.css', 'preflight-nomono.css'].includes(n))) {
    const text = fs.readFileSync(path.join(dir, f), 'utf8');
    for (const r of splitRules(text)) {
      if (r.prelude !== 'html' && r.prelude !== ':root') continue;
      const body = r.body.replace(/\/\*[\s\S]*?\*\//g, '');
      const m = body.match(/(?:^|[;\s{])font-size\s*:\s*([^;]+);/);
      if (!m) continue;
      const v = m[1].trim();
      const px = v.match(/^([0-9.]+)px$/);
      if (px) return { px: parseFloat(px[1]), source: `${f} (${r.prelude}, ${v})` };
      const pct = v.match(/^([0-9.]+)%$/);
      if (pct) return { px: (parseFloat(pct[1]) / 100) * 16, source: `${f} (${r.prelude}, ${v})` };
    }
  }
  return { px: 16, source: 'browser default: no html or :root font-size in css/*.css' };
}

function parseLength(v, rootPx) {
  const m = String(v).trim().match(/^(-?[0-9]*\.?[0-9]+)(px|rem|em)?$/);
  if (!m) return null;
  const n = parseFloat(m[1]);
  return m[2] === 'rem' || m[2] === 'em' ? n * rootPx : n;
}

function splitTopLevel(args) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const c of args) {
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (c === ',' && depth === 0) {
      out.push(cur.trim());
      cur = '';
    } else cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

const fmt = (n) => String(Math.round(n * 1000) / 1000);

/* ---------------------------------------------------------------------------
   6. Figma snapshot: load, validate, compare
   ------------------------------------------------------------------------ */

const COLLECTIONS = ['Primitives', 'Semantic', 'Typography', 'Icon'];
const TYPES = ['COLOR', 'FLOAT', 'STRING'];

function validateFigma(raw) {
  const errors = [];
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return ['top level must be an object'];
  if (!Array.isArray(raw.tokens)) return ['"tokens" must be an array'];
  const declaredModes = new Map();
  if (Array.isArray(raw.collections)) raw.collections.forEach((c) => declaredModes.set(c.name, c.modes));
  const seen = new Set();
  raw.tokens.forEach((t, i) => {
    const at = `tokens[${i}]${t && t.name ? ` (${t.name})` : ''}`;
    if (!t || typeof t !== 'object') return errors.push(`${at}: not an object`);
    if (!COLLECTIONS.includes(t.collection)) errors.push(`${at}: unknown collection "${t.collection}"`);
    if (typeof t.name !== 'string' || !t.name) errors.push(`${at}: missing name`);
    if (!TYPES.includes(t.type)) errors.push(`${at}: unknown type "${t.type}"`);
    if (t.cssName !== null && !(typeof t.cssName === 'string' && /^--[a-z0-9-]+$/.test(t.cssName))) errors.push(`${at}: cssName must be null or a --custom-property`);
    if (typeof t.cssName === 'string') {
      if (seen.has(t.cssName)) errors.push(`${at}: duplicate cssName ${t.cssName}`);
      seen.add(t.cssName);
    }
    if (!t.modes || typeof t.modes !== 'object' || !Object.keys(t.modes).length) return errors.push(`${at}: modes missing or empty`);
    const allowed = declaredModes.get(t.collection);
    for (const [mode, val] of Object.entries(t.modes)) {
      if (allowed && !allowed.includes(mode)) errors.push(`${at}: mode "${mode}" is not declared for ${t.collection}`);
      if (t.type === 'COLOR' && (typeof val !== 'string' || !parseColor(val))) errors.push(`${at}: ${mode} is not a color: ${JSON.stringify(val)}`);
      if (t.type === 'FLOAT' && !(typeof val === 'number' && Number.isFinite(val))) errors.push(`${at}: ${mode} is not a number: ${JSON.stringify(val)}`);
      if (t.type === 'STRING' && typeof val !== 'string') errors.push(`${at}: ${mode} is not a string`);
    }
  });
  return errors;
}

function loadFigma() {
  if (!fs.existsSync(FIGMA_JSON)) return null;
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(FIGMA_JSON, 'utf8'));
  } catch (err) {
    throw new MalformedData(`docs/data/figma-tokens.json is not valid JSON: ${err.message}`);
  }
  const errors = validateFigma(raw);
  if (errors.length) throw new MalformedData(`docs/data/figma-tokens.json is malformed:\n  ${errors.join('\n  ')}`);
  if (Array.isArray(raw.collections)) {
    for (const c of raw.collections) {
      const n = raw.tokens.filter((t) => t.collection === c.name).length;
      if (typeof c.count === 'number' && c.count !== n) console.warn(`figma-tokens.json: collection ${c.name} declares ${c.count} tokens but contains ${n}.`);
    }
  }
  return raw;
}

// Figma text styles snapshot (docs/data/figma-text-styles.json). Line height and letter spacing are percentages inside the Figma text
// styles (Figma cannot bind a percentage to a variable), so the Figma value of --lh-* and --ls-* is read from here, not from
// figma-tokens.json. Shape: { source, styles[], weights{}, tokens{} }. The file is refreshed by Claude, never by hand.
function loadTextStyles() {
  if (!fs.existsSync(TEXT_STYLES_JSON)) return null;
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(TEXT_STYLES_JSON, 'utf8'));
  } catch (err) {
    throw new MalformedData(`docs/data/figma-text-styles.json is not valid JSON: ${err.message}`);
  }
  const errors = [];
  if (!raw || typeof raw !== 'object' || !raw.source || !raw.source.readAt) errors.push('source.readAt is required');
  if (!Array.isArray(raw && raw.styles) || !raw.styles.length) errors.push('"styles" must be a non-empty array');
  else raw.styles.forEach((st, i) => {
    if (!st || typeof st.name !== 'string' || !Array.isArray(st.weights) || !Number.isFinite(st.lineHeightPct) || !Number.isFinite(st.letterSpacingPct)) errors.push(`styles[${i}]: name, weights, lineHeightPct and letterSpacingPct are required`);
  });
  if (!raw || !raw.tokens || typeof raw.tokens !== 'object') errors.push('"tokens" must be an object');
  else for (const [k, v] of Object.entries(raw.tokens)) if (!/^--(lh|ls)-[a-z0-9]+$/.test(k) || !['line-height', 'letter-spacing'].includes(v.property) || !Number.isFinite(v.percent)) errors.push(`tokens.${k}: needs a --lh-* or --ls-* name, a property and a percent`);
  if (!raw || !raw.weights || typeof raw.weights !== 'object') errors.push('"weights" must be an object');
  if (errors.length) throw new MalformedData(`docs/data/figma-text-styles.json is malformed:\n  ${errors.join('\n  ')}`);
  return raw;
}

// --lh-* and --ls-* have no Figma variable. The Figma value is the percentage of the text styles that use it; units are normalized
// before comparing: percent to a unitless ratio for line height (160% is 1.6), percent to em for letter spacing (12% is 0.12em).
function compareTextStyleToken(ct, ts) {
  const def = ts.tokens[ct.name];
  const prop = def.property;
  const users = ts.styles.filter((st) => (prop === 'line-height' ? st.lineHeightPct : st.letterSpacingPct) === def.percent).map((st) => st.name);
  const v = (ct.light || '').trim();
  const num = parseFloat(v);
  const unitOk = prop === 'line-height' ? /^[0-9]*\.?[0-9]+$/.test(v) : (v === '0' || /em$/.test(v));
  const cssPct = Number.isFinite(num) && unitOk ? Math.round(num * 100 * 1000) / 1000 : null;
  const ok = cssPct !== null && Math.abs(cssPct - def.percent) < 0.001;
  const norm = prop === 'line-height' ? fmt(def.percent / 100) : (def.percent === 0 ? '0' : `${fmt(def.percent / 100)}em`);
  return {
    status: ok ? 'match' : 'mismatch',
    rows: [{ mode: 'Text styles', figma: `${def.percent}%`, css: v, ok, note: `${norm}; ${users.length ? users.join(', ') : 'no text style uses this value'}` }],
    users,
  };
}

// Accepted divergences that are not tokens (an effect value, for example a blur radius): entries with scope "effect", a name
// instead of a cssName, and the two values as text. They are shown in the Accepted divergences table, never matched to a token.
let ACCEPTED_EFFECTS = [];

// Accepted divergences that are about a rule, not a token (D-52): entries with scope "rule", a pattern name, the Figma value and the CSS
// value as text, the list of rules the pattern covers, a status ("accepted", or "pending" for rules that wait for something) and the
// usual reason, decidedBy and date. One entry can cover many rules. They are shown in the Accepted divergences table.
let ACCEPTED_RULES = [];

function loadAccepted() {
  if (!fs.existsSync(ACCEPTED_JSON)) return [];
  let raw;
  try {
    raw = JSON.parse(fs.readFileSync(ACCEPTED_JSON, 'utf8'));
  } catch (err) {
    throw new MalformedData(`docs/data/accepted-divergences.json is not valid JSON: ${err.message}`);
  }
  const errors = [];
  if (Array.isArray(raw)) {
    ACCEPTED_EFFECTS = raw.filter((e) => e && e.scope === 'effect');
    ACCEPTED_EFFECTS.forEach((e, i) => {
      for (const k of ['name', 'figma', 'css', 'reason', 'decidedBy', 'date']) if (!(typeof e[k] === 'string' && e[k].trim())) errors.push(`[effect ${i}]: ${k} is required`);
      if (typeof e.date === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(e.date)) errors.push(`[effect ${i}]: date must be YYYY-MM-DD`);
    });
    raw = raw.filter((e) => !(e && e.scope === 'effect'));
    ACCEPTED_RULES = raw.filter((e) => e && e.scope === 'rule');
    ACCEPTED_RULES.forEach((e, i) => {
      for (const k of ['name', 'figma', 'css', 'reason', 'decidedBy', 'date', 'status']) if (!(typeof e[k] === 'string' && e[k].trim())) errors.push(`[rule ${i}]: ${k} is required`);
      if (typeof e.date === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(e.date)) errors.push(`[rule ${i}]: date must be YYYY-MM-DD`);
      if (e.status && !['accepted', 'pending'].includes(e.status)) errors.push(`[rule ${i}]: status must be accepted or pending`);
      if (!Array.isArray(e.rules) || !e.rules.length) errors.push(`[rule ${i}]: rules must be a non-empty array`);
      else e.rules.forEach((r, j) => { for (const k of ['selector', 'file', 'value']) if (!(r && typeof r[k] === 'string' && r[k].trim())) errors.push(`[rule ${i}].rules[${j}]: ${k} is required`); });
    });
    raw = raw.filter((e) => !(e && e.scope === 'rule'));
  }
  if (!Array.isArray(raw)) errors.push('top level must be an array');
  else {
    const seen = new Set();
    raw.forEach((e, i) => {
      const at = `[${i}]${e && e.cssName ? ` (${e.cssName})` : ''}`;
      if (!e || typeof e !== 'object' || Array.isArray(e)) return errors.push(`${at}: not an object`);
      if (!(typeof e.cssName === 'string' && /^--[a-z0-9-]+$/.test(e.cssName))) errors.push(`${at}: cssName must be a --custom-property`);
      if (e.mode !== undefined && !(typeof e.mode === 'string' && e.mode)) errors.push(`${at}: mode must be a non-empty string when present`);
      for (const k of ['reason', 'decidedBy', 'date']) if (!(typeof e[k] === 'string' && e[k].trim())) errors.push(`${at}: ${k} is required`);
      if (typeof e.date === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(e.date)) errors.push(`${at}: date must be YYYY-MM-DD`);
      const key = `${e.cssName}|${e.mode || ''}`;
      if (seen.has(key)) errors.push(`${at}: duplicate entry for ${e.cssName}${e.mode ? ` / ${e.mode}` : ''}`);
      seen.add(key);
    });
  }
  if (errors.length) throw new MalformedData(`docs/data/accepted-divergences.json is malformed:\n  ${errors.join('\n  ')}`);
  return raw;
}

const acceptedTitle = (a) => `Accepted divergence: ${a.reason} Decided by ${a.decidedBy}, ${a.date}.`;

// First color found in a CSS value (a shadow keeps its first layer's color).
function cssColor(ct, mode) {
  const v = mode === 'dark' ? ct.dark : ct.light;
  if (!v) return null;
  if (ct.kind === 'color') return parseColor(v);
  if (ct.kind === 'shadow') {
    const m = v.match(/(rgba?\([^)]*\)|#[0-9a-fA-F]{3,8})/);
    return m ? parseColor(m[1]) : null;
  }
  return null;
}

// Number of px for a CSS token in a Figma mode. Fluid tokens: Desktop/Value is the
// clamp max, Mobile is the clamp min. Composite borders: the leading width only.
function cssFloat(ct, mode, rootPx) {
  const v = ct.light;
  if (ct.kind === 'fluid') {
    const m = v.match(/^clamp\((.*)\)$/);
    if (!m) return null;
    const args = splitTopLevel(m[1]);
    if (args.length !== 3) return null;
    const min = parseLength(args[0], rootPx);
    const max = parseLength(args[2], rootPx);
    if (min === null || max === null) return null;
    return mode === 'Mobile' ? { n: min, how: 'clamp min' } : { n: max, how: 'clamp max' };
  }
  if (ct.kind === 'length' || ct.kind === 'number') {
    const n = parseLength(v, rootPx);
    return n === null ? null : { n, how: '' };
  }
  if (ct.kind === 'composite') {
    const m = v.match(/^(-?[0-9]*\.?[0-9]+(?:px|rem|em)?)\s/);
    const n = m ? parseLength(m[1], rootPx) : null;
    return n === null ? null : { n, how: 'width part' };
  }
  return null;
}

const firstFamily = (v) => (v || '').split(',')[0].trim().replace(/^['"]|['"]$/g, '');

// rows: [{ mode, figma, css, ok (true | false | null), note }]
function compareToken(ft, ct, rootPx) {
  const rows = [];
  const modeMap = { Primitives: [['Value', 'light']], Semantic: [['Light', 'light'], ['Dark', 'dark']], Typography: [['Desktop', 'light'], ['Mobile', 'light']] }[ft.collection] || [];
  for (const [mode, cssMode] of modeMap) {
    const fv = ft.modes[mode];
    if (fv === undefined) continue;
    if (ft.type === 'COLOR') {
      const f = parseColor(fv);
      const c = cssColor(ct, cssMode);
      if (!c) rows.push({ mode, figma: colorHex(f), css: cssMode === 'dark' ? ct.dark : ct.light, ok: null, note: 'CSS value is not a color' });
      else rows.push({ mode, figma: colorHex(f), css: colorHex(c), ok: colorsEqual(f, c), note: ct.kind === 'shadow' ? 'first shadow layer color' : '' });
    } else if (ft.type === 'FLOAT') {
      const c = cssFloat(ct, mode, rootPx);
      if (!c) rows.push({ mode, figma: fmt(fv), css: ct.light, ok: null, note: 'CSS value has no comparable length' });
      else rows.push({ mode, figma: fmt(fv), css: fmt(c.n), ok: Math.abs(c.n - fv) < 0.01, note: c.how });
    } else if (/^weight\//.test(ft.name)) {
      // weight/regular|medium|semibold|bold: the Figma value is the style name, the CSS value is the number.
      const W = { Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 };
      const want = W[fv];
      const got = Number((ct.light || '').trim());
      rows.push({ mode, figma: want === undefined ? fv : `${fv} (${want})`, css: ct.light, ok: want !== undefined && Number.isFinite(got) ? got === want : null, note: 'style name to number' });
    } else {
      const c = firstFamily(ct.light);
      rows.push({ mode, figma: fv, css: c, ok: c === fv, note: 'first family' });
    }
  }
  if (ft.collection === 'Semantic' && ft.modes.SigmaMD !== undefined) {
    rows.push({ mode: 'SigmaMD', figma: colorHex(parseColor(ft.modes.SigmaMD)), css: '', ok: null, note: 'displayed only, not compared' });
  }
  let status = 'uncompared';
  if (rows.some((r) => r.ok === false)) status = 'mismatch';
  else if (rows.some((r) => r.ok === true)) status = 'match';
  return { status, rows };
}

// Icon/Color has 10 modes and the CSS has one token per mode (--icon-color-<mode>).
// Informational only: it does not change the status of the Figma token.
function iconRows(ft, byName) {
  return Object.entries(ft.modes).map(([mode, fv]) => {
    const cssName = '--icon-color-' + mode.toLowerCase().replace(/\s+/g, '-');
    const ct = byName[cssName];
    const f = parseColor(fv);
    const c = ct ? parseColor(ct.light) : null;
    return { mode, figma: colorHex(f), cssName, css: c ? colorHex(c) : null, ok: c ? colorsEqual(f, c) : null };
  });
}

/* ---------------------------------------------------------------------------
   7. Rendering
   ------------------------------------------------------------------------ */

const STATUS = {
  match: { label: 'match', cls: 'badge badge--success' },
  mismatch: { label: 'mismatch', cls: 'badge docs-status--mismatch' },
  accepted: { label: 'accepted', cls: 'badge docs-status--accepted' },
  'no-css-token': { label: 'no CSS token', cls: 'badge badge--anchor' },
  'no-figma-mapping': { label: 'no Figma mapping', cls: 'badge badge--neutral' },
  'css-only': { label: 'not in Figma', cls: 'badge badge--neutral' },
  uncompared: { label: 'not compared', cls: 'badge badge--neutral' },
};
const statusBadge = (s, title) => `<span class="${STATUS[s].cls}"${title ? ` title="${esc(title)}"` : ''}>${STATUS[s].label}</span>`;

function swatch(color, label) {
  return `<span class="docs-swatchcol"><span class="docs-swatch" title="${esc(label)}: ${esc(color)}"><span class="docs-swatch__fill" style="background-color:${esc(color)}"></span></span><span class="docs-swatch__label">${label}</span></span>`;
}

function valueCell(value, muted) {
  if (!value) return '<span class="docs-muted">unset</span>';
  return `<span class="docs-value${muted ? ' docs-value--muted' : ''}"><code>${esc(value)}</code></span>`;
}

const NUMERIC_KINDS = new Set(['length', 'time', 'number']);

// The swatch is decorative (aria-hidden): the text value next to it carries the information.
function colorCell(value, muted) {
  if (!value) return '<span class="docs-muted">unset</span>';
  return `<span class="docs-colorcell${muted ? ' docs-value--muted' : ''}"><span class="docs-swatch" aria-hidden="true"><span class="docs-swatch__fill" style="background-color:${esc(value)}"></span></span><code>${esc(value)}</code></span>`;
}

// Figma column: one line per compared mode. CSS column: the value the browser computed for the same mode.
function figmaColumn(t) {
  const f = t.figma;
  if (!f) return '<span class="docs-muted">not in Figma</span>';
  return `<span class="docs-value">${f.comparison.map((r) => `<span class="docs-fig"><span class="docs-value__tag text-label">${esc(r.mode)}</span> <code>${esc(r.figma)}</code></span>`).join('')}</span>`;
}

function cssColumn(t) {
  const f = t.figma;
  if (!f) return '<span class="docs-muted">not compared</span>';
  const lines = f.comparison.map((r) => {
    const cls = r.ok === false ? (r.accepted ? ' docs-fig--accepted' : ' docs-fig--diff') : r.ok === null ? ' docs-fig--info' : '';
    const shown = r.css !== undefined && r.css !== null && r.css !== '' ? `<code>${esc(r.css)}</code>` : '<span class="docs-muted">not compared</span>';
    const note = r.note || r.accepted ? ` <span class="docs-muted">${r.note ? esc(r.note) : ''}${r.accepted ? `${r.note ? ', ' : ''}accepted` : ''}</span>` : '';
    return `<span class="docs-fig${cls}"><span class="docs-value__tag text-label">${esc(r.mode)}</span> ${shown}${note}</span>`;
  });
  return `<span class="docs-value">${lines.join('')}</span>`;
}

function tokenRowHeader(t) {
  const unused = t.unused ? '<span class="badge badge--solar">unused</span>' : '';
  const note = t.note ? `<span class="docs-token__note">${esc(t.note)}</span>` : '';
  const rt = t.reducedTransparency
    ? `<span class="docs-token__note">Reduced transparency: Light ${esc(t.reducedTransparency.light)}${t.reducedTransparency.dark !== t.reducedTransparency.light ? `, Dark ${esc(t.reducedTransparency.dark)}` : ''}</span>`
    : '';
  return `<code>${esc(t.name)}</code><span class="docs-token__meta text-label"><span>${t.kind}</span>${unused}</span>${note}${rt}`;
}

// One Hope Table per token group. Color groups get Light and Dark columns (swatch and value together);
// groups with no color and no dark difference collapse them into one Value column.
function groupTable(g, d) {
  const toks = g.tokens.map((name) => d.byName[name]);
  const hasColor = toks.some((t) => t.kind === 'color');
  const valueOnly = !hasColor && toks.every((t) => t.dark === t.light && !t.darkOverride);
  const numeric = valueOnly && toks.every((t) => NUMERIC_KINDS.has(t.kind));
  const cols = valueOnly
    ? [{ label: 'Token' }, { label: 'Value', end: numeric }, { label: 'Figma' }, { label: 'CSS (computed)' }, { label: 'Status' }]
    : [{ label: 'Token' }, { label: 'Light' }, { label: 'Dark' }, { label: 'Figma' }, { label: 'CSS (computed)' }, { label: 'Status' }];
  const rows = toks.map((t) => {
    const cell = (v, muted) => (t.kind === 'color' ? colorCell(v, muted) : valueCell(v, muted));
    const same = t.dark === t.light && !t.darkOverride;
    const cells = valueOnly
      ? [tokenRowHeader(t), valueCell(t.light, false), figmaColumn(t), cssColumn(t), statusBadge(t.status, t.acceptedTitle)]
      : [tokenRowHeader(t), cell(t.light, false), cell(t.dark, same), figmaColumn(t), cssColumn(t), statusBadge(t.status, t.acceptedTitle)];
    return { attrs: `id="${esc(t.name.slice(2))}"${t.status === 'mismatch' ? ' class="docs-row--mismatch"' : ''}`, cells };
  });
  return hopeTable({ id: `tokens-${g.id}-caption`, caption: `${g.label} tokens`, hidden: true, cols, rows });
}

function figmaValuesCell(ft) {
  const parts = Object.entries(ft.modes).map(([mode, v]) => {
    const color = ft.type === 'COLOR' ? parseColor(v) : null;
    const shown = ft.type === 'COLOR' ? colorHex(color) : ft.type === 'FLOAT' ? fmt(v) : v;
    const chip = color ? swatch(colorHex(color), mode) : '';
    return `<span class="docs-fig${mode === 'SigmaMD' ? ' docs-fig--info' : ''}"><span class="docs-value__tag text-label">${esc(mode)}</span> <code>${esc(shown)}</code>${chip ? ` ${chip}` : ''}</span>`;
  });
  return `<span class="docs-value">${parts.join('')}</span>`;
}

function tokensBody(d) {
  const s = d.summary;
  const parts = [];
  parts.push(`          <header class="docs-pagehead">
            <p class="text-label text-tertiary">Tokens</p>
            <h1 class="text-h1">Design tokens</h1>
            <p class="text-body text-secondary docs-lead">${d.tokenCount} custom properties from <code>css/tokens.css</code>, generated by <code>npm run docs:tokens</code>. Light and Dark are the computed values in the browser, so alias chains are already resolved. Figma is canonical for values: the Figma column comes from <code>docs/data/figma-tokens.json</code> (${esc(d.figmaSource)}).</p>
          </header>`);

  if (d.figma) {
    parts.push(`
          <section class="docs-section" id="summary" aria-labelledby="summary-title">
            <h2 class="text-h2" id="summary-title">Figma comparison summary</h2>
            <p class="docs-section__desc">Mismatches are information for the divergence report, not build errors. Colors are compared as lowercase #rrggbbaa with a tolerance of 1/255 on alpha, lengths as px numbers (rem converted with a root of ${d.rootFontPx}px: ${esc(d.rootFontSource)}). Font sizes in <code>clamp()</code> compare the max to Desktop and the min to Mobile. <code>--border-*</code> compare the width part only; shadow colors compare the first layer.</p>
            ${hopeTable({
              id: 'summary-caption', caption: 'Figma comparison summary', hidden: true,
              cols: [{ label: 'Status' }, { label: 'Count', end: true }, { label: 'Meaning' }],
              rows: [
                [statusBadge('match'), String(s.match), 'CSS token found, every compared mode equals Figma'],
                [statusBadge('mismatch'), String(s.mismatch), 'CSS token found, at least one mode differs and is not accepted (listed below)'],
                [statusBadge('accepted'), String(s.accepted), 'A divergence the owner accepted (docs/data/accepted-divergences.json); values stay visible'],
                [statusBadge('no-figma-mapping'), String(s.noFigmaMapping), 'Figma token with cssName null (table "In Figma, no code token yet")'],
                [statusBadge('no-css-token'), String(s.noCssToken), 'Figma cssName that is not defined in tokens.css and is not accepted'],
                [statusBadge('css-only'), String(s.cssOnly), 'CSS token with no Figma token (informational)'],
                [statusBadge('uncompared'), String(s.uncompared), 'Matched by name but no mode could be compared'],
              ],
            })}
          </section>

          <section class="docs-section" id="mismatches" aria-labelledby="mismatches-title">
            <h2 class="text-h2" id="mismatches-title">Mismatches (${d.mismatches.length})</h2>${
      d.mismatches.length
        ? `
            ${hopeTable({
              id: 'mismatches-caption', caption: 'Mismatched tokens', hidden: true,
              cols: [{ label: 'Token' }, { label: 'Figma token' }, { label: 'Mode' }, { label: 'Figma' }, { label: 'CSS' }, { label: 'Note' }],
              rows: d.mismatches.map((m) => [`<a href="#${esc(m.token.slice(2))}"><code>${esc(m.token)}</code></a>`, esc(m.figmaName), esc(m.mode), `<code>${esc(m.figma)}</code>`, `<code>${esc(m.css)}</code>`, esc(m.note)]),
            })}`
        : '\n            <p class="docs-section__desc">None.</p>'
    }
          </section>`);
    if (d.acceptedItems.length || d.staleAccepted.length || ACCEPTED_EFFECTS.length || ACCEPTED_RULES.length) {
      const accRows = d.acceptedItems.map((a) => [
        `<code>${esc(a.cssName)}</code>`,
        esc(a.mode || 'all modes'),
        esc(a.kind === 'no-css-token' ? 'Figma code name not defined in tokens.css' : 'value differs'),
        a.rows.length ? a.rows.map((r) => `<span class="docs-fig"><span class="docs-value__tag text-label">${esc(r.mode)}</span> Figma <code>${esc(r.figma)}</code>, CSS <code>${esc(r.css)}</code></span>`).join('') : '<span class="docs-muted">see the table below</span>',
        esc(a.reason),
        `${esc(a.decidedBy)}, ${esc(a.date)}`,
      ]);
      const effectRows = ACCEPTED_EFFECTS.map((a) => [
        esc(a.name),
        'not a token',
        'effect value differs',
        `<span class="docs-fig">Figma <code>${esc(a.figma)}</code>, CSS <code>${esc(a.css)}</code></span>`,
        esc(a.reason),
        `${esc(a.decidedBy)}, ${esc(a.date)}`,
      ]);
      const ruleRows = ACCEPTED_RULES.map((a) => [
        esc(a.name),
        'not a token',
        a.status === 'pending' ? '<span class="badge badge--solar">pending</span> value differs' : 'rule value differs',
        `<span class="docs-fig">Figma <code>${esc(a.figma)}</code>, CSS <code>${esc(a.css)}</code></span>${a.rules.map((r) => `<span class="docs-fig"><code>${esc(r.selector)}</code> ${esc(r.value)} <span class="docs-muted">${esc(r.file)}</span></span>`).join('')}`,
        esc(a.reason),
        `${esc(a.decidedBy)}, ${esc(a.date)}`,
      ]);
      const staleRows = d.staleAccepted.map((a) => [
        `<code>${esc(a.cssName)}</code>`,
        esc(a.mode || 'all modes'),
        '<span class="badge badge--solar">stale accepted entry</span>',
        esc(a.staleReason),
        esc(a.reason),
        `${esc(a.decidedBy)}, ${esc(a.date)}`,
      ]);
      parts.push(`
          <section class="docs-section" id="accepted" aria-labelledby="accepted-title">
            <h2 class="text-h2" id="accepted-title">Accepted divergences (${d.acceptedItems.length + ACCEPTED_EFFECTS.length + ACCEPTED_RULES.length}${d.staleAccepted.length ? `, ${d.staleAccepted.length} stale` : ''})</h2>
            <p class="docs-section__desc">Listed in <code>docs/data/accepted-divergences.json</code>. Accepting a divergence never hides the values: they stay in the token tables. A stale entry no longer matches any divergence and can be removed.</p>
            ${hopeTable({
              id: 'accepted-caption', caption: 'Accepted divergences', hidden: true,
              cols: [{ label: 'Token' }, { label: 'Mode' }, { label: 'Divergence' }, { label: 'Values' }, { label: 'Reason' }, { label: 'Decided' }],
              rows: [...accRows, ...effectRows, ...ruleRows, ...staleRows],
            })}
          </section>`);
    }
  }

  parts.push(`
          <section class="docs-section" aria-labelledby="notes-title">
            <h2 class="text-h3" id="notes-title">Reading this page</h2>
            <div class="docs-note">
              <p><strong>Dark column:</strong> a muted value means the token has no dark override and simply inherits the Light value.</p>
              <p><strong>Reduced transparency:</strong> four tokens (<code>${d.reducedTokens.map(esc).join('</code>, <code>')}</code>) are redefined under <code>prefers-reduced-transparency: reduce</code>. That is a user setting, not a theme, so the Light and Dark columns show the normal values and the override sits in its own column. It is not compared with Figma.</p>
              <p><strong>Composite values:</strong> <code>--border-*</code> and <code>--blur-glass</code> are shorthands, shown whole and marked composite. Comma and paren values (fonts, <code>clamp()</code>, <code>cubic-bezier()</code>, <code>rgba()</code>) are kept intact.</p>
              <p><strong>Not listed:</strong> ${d.excluded.map((e) => `<code>${esc(e.name)}</code> (${esc(e.reason)})`).join('; ')}.</p>
              <p><strong>Unused:</strong> ${d.unusedCount} tokens below are flagged because nothing outside <code>tokens.css</code> references them and no other token aliases them${d.excluded.some((e) => e.unused) ? '; the excluded URL token is also unused' : ''}.</p>
              <p><strong>SigmaMD:</strong> a Figma mode kept for display only; it is shown, never compared.</p>
            </div>
          </section>`);

  for (const g of d.groups) {
    parts.push(`
          <section class="docs-section" id="${esc(g.id)}" aria-labelledby="${esc(g.id)}-title">
            <h2 class="text-h2" id="${esc(g.id)}-title" title="${esc(g.raw)}">${esc(g.label)}</h2>${g.description ? `\n            <p class="docs-section__desc">${esc(g.description)}</p>` : ''}
            ${groupTable(g, d)}
          </section>`);
  }

  if (d.figma) {
    parts.push(`
          <section class="docs-section" id="figma-no-code" aria-labelledby="figma-no-code-title">
            <h2 class="text-h2" id="figma-no-code-title">In Figma, no code token yet</h2>
            <p class="docs-section__desc">${d.figmaNoCode.length} Figma tokens whose code syntax (cssName) is null. They are not mapped to CSS.</p>
            ${hopeTable({
              id: 'figma-no-code-caption', caption: 'Figma tokens with no code token', hidden: true,
              cols: [{ label: 'Figma token' }, { label: 'Collection' }, { label: 'Type' }, { label: 'Figma value' }],
              rows: d.figmaNoCode.map((ft) => [esc(ft.name), esc(ft.collection), esc(ft.type.toLowerCase()), figmaValuesCell(ft)]),
            })}
          </section>`);
    if (d.figmaNoCssToken.length) {
      parts.push(`
          <section class="docs-section" id="figma-no-css" aria-labelledby="figma-no-css-title">
            <h2 class="text-h2" id="figma-no-css-title">In Figma, code name not in tokens.css</h2>
            <p class="docs-section__desc">Figma tokens with a cssName that tokens.css does not define, including accepted ones (their badge says accepted and the reason is on hover). For Icon/Color the CSS has one token per mode (<code>--icon-color-&lt;mode&gt;</code>); the right-hand values below are informational and do not change the status.</p>
            ${hopeTable({
              id: 'figma-no-css-caption', caption: 'Figma tokens whose code name is not in tokens.css', hidden: true,
              cols: [{ label: 'Figma token' }, { label: 'cssName' }, { label: 'Modes (Figma value, CSS equivalent)' }, { label: 'Status' }],
              rows: d.figmaNoCssToken.map((e) => {
                const lines = (e.icon || []).map(
                  (r) => `<span class="docs-fig${r.ok === false ? ' docs-fig--diff' : ''}"><span class="docs-value__tag text-label">${esc(r.mode)}</span> <code>${esc(r.figma)}</code> ${swatch(r.figma, '')}${r.cssName ? ` <span class="docs-muted"><code>${esc(r.cssName)}</code> ${r.css ? esc(r.css) : 'not defined'}${r.ok === false ? ', differs' : r.ok ? ', same' : ''}</span>` : ''}</span>`
                );
                return [esc(e.name), `<code>${esc(e.cssName)}</code>`, lines.length ? `<span class="docs-value">${lines.join('')}</span>` : figmaValuesCell(e), e.accepted ? statusBadge('accepted', acceptedTitle(e.accepted)) : statusBadge('no-css-token')];
              }),
            })}
          </section>`);
    }
  }
  return parts.join('\n');
}

/* ---------------------------------------------------------------------------
   8. Main
   ------------------------------------------------------------------------ */

async function main() {
  const css = fs.readFileSync(TOKENS_CSS, 'utf8');
  const figmaRaw = loadFigma(); // throws MalformedData before any output is written
  const parsed = parseTokens(css);
  const names = [...parsed.tokens.keys()];

  const browser = await launch();
  let normal;
  let reducedResolved = null;
  try {
    normal = await resolveAll(browser, css, names);
    if (parsed.reduced) {
      // Unwrap the media block so its rules apply unconditionally, then read
      // only the tokens it redefines.
      const unwrapped = css.slice(0, parsed.reduced.start) + parsed.reduced.body + css.slice(parsed.reduced.end);
      const rtNames = names.filter((n) => parsed.tokens.get(n).reducedDeclared);
      reducedResolved = { names: rtNames, ...(await resolveAll(browser, unwrapped, rtNames)) };
    }
  } finally {
    await browser.close();
  }

  const corpus = usageCorpus();
  const root = detectRootPx();
  const excluded = [];
  const byName = {};
  for (const [name, t] of parsed.tokens) {
    const light = normal.light[name];
    const dark = normal.dark[name];
    if (isNonDesignToken(t, light)) {
      excluded.push({ name, reason: 'URL string, not a design token', unused: isUnused(name, corpus, css) });
      continue;
    }
    byName[name] = {
      name,
      group: t.group,
      kind: kindOf(name, light || dark),
      declared: t.declared,
      light,
      dark,
      darkOverride: t.darkDeclared !== null,
      darkDeclared: t.darkDeclared,
      reducedTransparency: reducedResolved && reducedResolved.names.includes(name) ? { light: reducedResolved.light[name], dark: reducedResolved.dark[name] } : null,
      note: t.note,
      unused: isUnused(name, corpus, css),
      figma: null,
      status: 'css-only',
    };
  }

  // Figma comparison
  const accepted = loadAccepted();
  const textStyles = loadTextStyles();
  const usedAccepted = new Set();
  const acceptedItems = [];
  const findAccepted = (cssName, mode) => {
    const idx = accepted.findIndex((a) => a.cssName === cssName && (a.mode === undefined || mode === undefined || a.mode === mode));
    if (idx !== -1) usedAccepted.add(idx);
    return idx === -1 ? null : accepted[idx];
  };
  const summary = { match: 0, mismatch: 0, accepted: 0, noFigmaMapping: 0, noCssToken: 0, cssOnly: 0, uncompared: 0 };
  const mismatches = [];
  const figmaNoCode = [];
  const figmaNoCssToken = [];
  if (figmaRaw) {
    for (const ft of figmaRaw.tokens) {
      if (ft.cssName === null) {
        figmaNoCode.push(ft);
        summary.noFigmaMapping++;
        continue;
      }
      const ct = byName[ft.cssName];
      if (!ct) {
        const entry = { collection: ft.collection, name: ft.name, type: ft.type, cssName: ft.cssName, modes: ft.modes, refs: ft.refs || null };
        if (ft.collection === 'Icon') entry.icon = iconRows(ft, byName);
        const acc = findAccepted(ft.cssName, undefined);
        if (acc) {
          entry.accepted = acc;
          acceptedItems.push({ ...acc, kind: 'no-css-token', figmaName: ft.name, rows: [] });
          summary.accepted++;
        } else summary.noCssToken++;
        figmaNoCssToken.push(entry);
        continue;
      }
      const cmp = compareToken(ft, ct, root.px);
      ct.figma = { collection: ft.collection, name: ft.name, type: ft.type, modes: ft.modes, refs: ft.refs || null, comparison: cmp.rows };
      ct.status = cmp.status;
      if (cmp.status === 'match') summary.match++;
      else if (cmp.status === 'mismatch') {
        const failing = cmp.rows.filter((x) => x.ok === false);
        const open = [];
        const taken = [];
        for (const r of failing) {
          const acc = findAccepted(ct.name, r.mode);
          if (acc) {
            r.accepted = acc;
            taken.push({ r, acc });
          } else open.push(r);
        }
        for (const r of open) mismatches.push({ token: ct.name, figmaName: ft.name, mode: r.mode, figma: r.figma, css: r.css, note: r.note });
        if (taken.length) {
          const first = taken[0].acc;
          for (const acc of new Set(taken.map((x) => x.acc))) {
            acceptedItems.push({ ...acc, kind: 'mismatch', figmaName: ft.name, rows: taken.filter((x) => x.acc === acc).map((x) => ({ mode: x.r.mode, figma: x.r.figma, css: x.r.css })) });
          }
          ct.acceptedTitle = taken.map((x) => acceptedTitle(x.acc)).filter((v, i, a) => a.indexOf(v) === i).join(' ');
          void first;
        }
        if (open.length) summary.mismatch++;
        else {
          ct.status = 'accepted';
          summary.accepted++;
        }
      } else summary.uncompared++;
    }
    // --lh-* and --ls-*: no Figma variable, compared with the text styles snapshot (docs/data/figma-text-styles.json).
    if (textStyles) {
      for (const name of Object.keys(textStyles.tokens)) {
        const ct = byName[name];
        if (!ct || ct.figma) continue;
        const def = textStyles.tokens[name];
        const cmp = compareTextStyleToken(ct, textStyles);
        ct.figma = { collection: 'Text styles', name: `${def.property} ${def.percent}%`, type: 'PERCENT', modes: { 'Text styles': `${def.percent}%` }, refs: null, comparison: cmp.rows, usedBy: cmp.users };
        const acc = findAccepted(name, undefined);
        if (cmp.status === 'mismatch') {
          ct.status = 'mismatch';
          summary.mismatch++;
          mismatches.push({ token: name, figmaName: ct.figma.name, mode: 'Text styles', figma: cmp.rows[0].figma, css: cmp.rows[0].css, note: cmp.rows[0].note });
        } else if (acc) {
          ct.status = 'accepted';
          ct.acceptedTitle = acceptedTitle(acc);
          acceptedItems.push({ ...acc, kind: 'structural', figmaName: ct.figma.name, rows: cmp.rows.map((x) => ({ mode: x.mode, figma: x.figma, css: x.css })) });
          summary.accepted++;
        } else {
          ct.status = 'match';
          summary.match++;
        }
      }
    }
    summary.cssOnly = Object.values(byName).filter((t) => t.status === 'css-only').length;
  }

  // Accepted entries that matched no divergence are stale: warn, show, never fail.
  const staleAccepted = [];
  accepted.forEach((a, i) => {
    if (usedAccepted.has(i)) return;
    const ct = byName[a.cssName];
    const inFigma = figmaRaw ? figmaRaw.tokens.some((t) => t.cssName === a.cssName) : false;
    let staleReason;
    if (!figmaRaw) staleReason = 'cannot be checked: no Figma snapshot';
    else if (ct && ct.figma) staleReason = a.mode ? `no divergence in mode ${a.mode} (values match)` : 'no divergence (values match)';
    else if (ct) staleReason = 'token exists in CSS but not in Figma, so there is nothing to compare';
    else if (inFigma) staleReason = 'Figma token has a CSS token now but it is not compared';
    else staleReason = 'cssName is in neither tokens.css nor the Figma snapshot';
    staleAccepted.push({ ...a, staleReason });
    console.warn(`stale accepted entry: ${a.cssName}${a.mode ? ` / ${a.mode}` : ''} (${staleReason})`);
  });

  const groups = parsed.groups
    .map((g) => ({ ...g, tokens: Object.values(byName).filter((t) => t.group === g.id).map((t) => t.name) }))
    .filter((g) => g.tokens.length);
  const unusedCount = Object.values(byName).filter((t) => t.unused).length;
  const reducedTokens = reducedResolved ? reducedResolved.names : [];
  const figmaSource = figmaRaw ? `Figma Foundation, read ${figmaRaw.source && figmaRaw.source.readAt ? figmaRaw.source.readAt : 'date unknown'}, ${figmaRaw.tokens.length} tokens` : 'not synced';

  const data = {
    source: 'css/tokens.css',
    figmaSource: figmaRaw ? { file: figmaRaw.source && figmaRaw.source.file, readAt: figmaRaw.source && figmaRaw.source.readAt, tokens: figmaRaw.tokens.length } : null,
    rootFontPx: root.px,
    rootFontSource: root.source,
    tokenCount: Object.keys(byName).length,
    unusedCount,
    reducedTokens,
    excluded,
    summary: figmaRaw ? summary : null,
    mismatches,
    acceptedDivergences: acceptedItems,
    staleAccepted,
    figmaNoCode: figmaNoCode.map((t) => ({ collection: t.collection, name: t.name, type: t.type, modes: t.modes, refs: t.refs || null })),
    figmaNoCssToken,
    groups: groups.map((g) => ({ id: g.id, label: g.label, raw: g.raw, description: g.description, tokens: g.tokens })),
    tokens: Object.values(byName),
  };

  fs.mkdirSync(path.join(OUT_DIR, 'data'), { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'data', 'tokens.json'), JSON.stringify(data, null, 2) + '\n');

  const view = { ...data, byName, groups, figma: !!figmaRaw, figmaSource, figmaNoCode, figmaNoCssToken, acceptedItems, staleAccepted };
  fs.writeFileSync(path.join(OUT_DIR, 'tokens.html'), renderPage({ title: 'Tokens', activeHref: 'tokens.html', body: tokensBody(view) }));

  const figmaLine = figmaRaw
    ? `${summary.match} match, ${summary.mismatch} mismatch, ${summary.accepted} accepted, ${summary.noFigmaMapping} no Figma mapping, ${summary.noCssToken} no CSS token`
    : 'not synced';
  fs.writeFileSync(
    path.join(OUT_DIR, 'index.html'),
    renderPage({ title: 'Overview', activeHref: 'index.html', body: indexBody({ tokens: data.tokenCount, unused: unusedCount, figma: figmaLine }) })
  );

  console.log(`tokens: ${data.tokenCount} (+${excluded.length} excluded), groups: ${groups.length}, unused: ${unusedCount}, reduced transparency: ${reducedTokens.length}`);
  console.log(`root font size for rem: ${root.px}px (${root.source})`);
  console.log(`figma: ${figmaLine}${figmaRaw ? `, ${summary.cssOnly} CSS only, ${summary.uncompared} not compared, ${staleAccepted.length} stale accepted` : ''}`);
  console.log('wrote docs/tokens.html, docs/data/tokens.json, docs/index.html');
}

main().catch((err) => {
  if (err instanceof MalformedData) {
    console.error(`MALFORMED DATA: ${err.message}`);
  } else {
    console.error(err);
  }
  process.exit(1);
});
