// Open-state snapshots of the docs demos (Modal, destructive Modal, Lightbox, Popover), 3 widths x 2 themes = 24 PNGs.
// The closed Modal and Lightbox are invisible to a full-page snapshot, so this suite opens each demo the way a person does
// (a click on the real trigger) and captures it. Nothing that ships changes: the demos, the CSS and the JS are the real ones.
//
//   npm run snapshots:open                          captures the working tree into .snapshots/open/<timestamp>/
//   node scripts/snapshot-open-states.mjs --out <dir> [--root <repo checkout>]
//   node scripts/snapshot-open-states.mjs --compare <dirA> <dirB> [--threshold N]
//
// --root lets you capture another checkout (for example a git worktree of main) with this same script.
// --compare writes nothing: it prints, for each case, the number of differing pixels and their bounding box, and marks the
// case as NOISE or REAL (see the threshold below). It exits 1 when any case is REAL, so it can be used in a shell.
//
// Noise (documented): rendering the same commit twice is not always pixel-identical. Measured on one commit, 5 runs, 10 pairs of
// runs (Prompt 29): see the numbers in design-organization/CHANGELOG.md v2.16.0. The default threshold is DEFAULT_THRESHOLD px
// and a difference in a Light case is always REAL; both come from those measurements. The suite is not part of docs:check
// (it needs a browser and takes minutes). Outputs go to .snapshots/ (listed in .gitignore, never committed).
//
// Uses Playwright, which is already in devDependencies (npm install). If a Chromium build is missing, run: npx playwright install chromium

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..');
// Set from the measurements in the report (see the header). Any case above it, or any Light case with a difference, is REAL.
export const DEFAULT_THRESHOLD = 500;

const FREEZE = '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.reveal,.animate-in{opacity:1!important;transform:none!important}';
const WIDTHS = [375, 768, 1280];
const THEMES = ['light', 'dark'];
const CASES = [
  { id: 'modal', page: 'docs/components/modal.html', full: false, open: async (p) => { await p.click('[data-modal-open="modal-demo"]'); await p.waitForSelector('#modal-demo:not([hidden])'); } },
  { id: 'modal-destructive', page: 'docs/components/modal.html', full: false, open: async (p) => { await p.click('[data-modal-open="modal-demo-destructive"]'); await p.waitForSelector('#modal-demo-destructive:not([hidden])'); } },
  { id: 'lightbox', page: 'docs/components/lightbox.html', full: false, open: async (p) => { await p.click('img[data-lightbox]'); await p.waitForSelector('.lightbox.is-open', { timeout: 3000 }); await p.waitForTimeout(150); } },
  { id: 'popover', page: 'docs/components/popover.html', full: true, open: async (p) => { await p.click('#popover-demo-trigger'); await p.waitForSelector('#popover-demo-panel:not([hidden])'); } },
];

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

async function loadPlaywright() {
  try {
    return await import(pathToFileURL(path.join(REPO, 'node_modules', 'playwright', 'index.mjs')).href);
  } catch (e) {
    console.error('Playwright is not installed. Run: npm install   (it is a devDependency), then: npx playwright install chromium');
    process.exit(2);
  }
}

async function launch(chromium) {
  for (const o of [{ channel: 'chrome' }, { channel: 'msedge' }, {}]) {
    try { return await chromium.launch(o); } catch (e) { /* try the next one */ }
  }
  console.error('No browser could be launched. Run: npx playwright install chromium');
  process.exit(2);
}

async function capture(outDir, root) {
  const { chromium } = await loadPlaywright();
  fs.mkdirSync(outDir, { recursive: true });
  const base = pathToFileURL(root + path.sep).href;
  const browser = await launch(chromium);
  for (const c of CASES) for (const w of WIDTHS) for (const theme of THEMES) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.addInitScript((th) => { try { localStorage.setItem('rm-theme', th); localStorage.setItem('hope-theme', th); } catch (e) { /* no storage */ } }, theme);
    await page.goto(new URL(c.page, base).href, { waitUntil: 'load' });
    await page.evaluate((th) => document.documentElement.setAttribute('data-theme', th), theme);
    await page.addStyleTag({ content: FREEZE });
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading=lazy]').forEach((i) => { i.loading = 'eager'; });
      await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
      await document.fonts.ready;
    });
    await page.waitForTimeout(300);
    await c.open(page);
    await page.waitForTimeout(400);
    fs.writeFileSync(path.join(outDir, `open-${c.id}-${w}-${theme}.png`), await page.screenshot({ fullPage: c.full }));
    await ctx.close();
  }
  await browser.close();
  console.log(`captured ${CASES.length * WIDTHS.length * THEMES.length} open-state snapshots in ${outDir}`);
}

async function compare(dirA, dirB, threshold) {
  const { chromium } = await loadPlaywright();
  const browser = await launch(chromium);
  const page = await browser.newPage();
  let real = 0;
  const files = fs.readdirSync(dirA).filter((f) => f.endsWith('.png')).sort();
  for (const f of files) {
    const fb = path.join(dirB, f);
    if (!fs.existsSync(fb)) { console.log(`${f}  MISSING in ${dirB}`); real += 1; continue; }
    const r = await page.evaluate(async ([a, b]) => {
      const load = async (s) => createImageBitmap(await (await fetch('data:image/png;base64,' + s)).blob());
      const x = await load(a); const y = await load(b);
      if (x.width !== y.width || x.height !== y.height) return { size: [x.width, x.height, y.width, y.height] };
      const cv = document.createElement('canvas'); cv.width = x.width; cv.height = x.height;
      const g = cv.getContext('2d', { willReadFrequently: true });
      g.drawImage(x, 0, 0); const d1 = g.getImageData(0, 0, cv.width, cv.height).data;
      g.clearRect(0, 0, cv.width, cv.height); g.drawImage(y, 0, 0); const d2 = g.getImageData(0, 0, cv.width, cv.height).data;
      let n = 0; let x0 = 1e9; let x1 = -1; let y0 = 1e9; let y1 = -1;
      for (let i = 0; i < d1.length; i += 4) {
        if (d1[i] !== d2[i] || d1[i + 1] !== d2[i + 1] || d1[i + 2] !== d2[i + 2]) {
          n += 1; const px = (i / 4) % cv.width; const py = Math.floor(i / 4 / cv.width);
          if (px < x0) x0 = px; if (px > x1) x1 = px; if (py < y0) y0 = py; if (py > y1) y1 = py;
        }
      }
      return { n, box: n ? [x0, y0, x1, y1] : null };
    }, [fs.readFileSync(path.join(dirA, f)).toString('base64'), fs.readFileSync(fb).toString('base64')]);
    let verdict = 'same';
    let text = '0 px';
    if (r.size) { verdict = 'REAL'; text = `size ${r.size[0]}x${r.size[1]} vs ${r.size[2]}x${r.size[3]}`; }
    else if (r.n) {
      text = `${r.n} px, box x${r.box[0]}-${r.box[2]} y${r.box[1]}-${r.box[3]}`;
      verdict = (r.n > threshold || /-light\.png$/.test(f)) ? 'REAL' : 'noise';
    }
    if (verdict === 'REAL') real += 1;
    console.log(`${f.padEnd(40)} ${verdict.padEnd(6)} ${text}`);
  }
  await browser.close();
  console.log(`${real} REAL difference(s) of ${files.length} cases (threshold ${threshold} px; any Light difference counts as REAL)`);
  process.exit(real ? 1 : 0);
}

if (args.includes('--compare')) {
  const i = args.indexOf('--compare');
  const t = opt('--threshold');
  await compare(args[i + 1], args[i + 2], t === undefined ? DEFAULT_THRESHOLD : Number(t));
} else {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  await capture(path.resolve(opt('--out') || path.join(REPO, '.snapshots', 'open', stamp)), path.resolve(opt('--root') || REPO));
}
