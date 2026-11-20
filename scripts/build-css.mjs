// Builds css/hope.css, the single stylesheet the pages load, from the CSS source files.
//
// Run: npm run css:build            (writes css/hope.css)
//      node scripts/build-css.mjs --check   (exit 1 when css/hope.css is out of date)
//
// Order (fixed, so the cascade is the one the site had before the split, D-18):
//   1. css/tokens.css                 token layer
//   2. css/reset.css                  base element rules
//   3. css/components/*.css           one file per component, alphabetical. Files do not
//                                     depend on each other, so the order only matters for
//                                     equal-specificity rules between different components;
//                                     the visual diff (0 differences) proved this order safe.
//   4. css/site/*.css                 site layout and page styles, in the ORDER LISTED BELOW,
//                                     which is the original source order of layout.css. The
//                                     site layer must load after the components layer because
//                                     it overrides .btn, .logo-strip, .testimonial-card, .icon
//                                     and .case-section__body.
//   5. css/site/animations.css        last, as before.
// css/auth.css is NOT in the aggregate: js/auth.js loads it only on protected pages.
// css/output.css (Tailwind) is a separate stylesheet loaded before css/hope.css.
// css/hope.css is generated: never edit it by hand.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CSS = path.join(ROOT, 'css');
export const OUTPUT = path.join(CSS, 'hope.css');

const SITE_ORDER = [
  'container', 'header', 'sections', 'hero', 'logo-strip-spacing', 'content-grids', 'about-snippet', 'footer',
  'about-bridge', 'case-hero', 'case-body', 'case-phase-break', 'case-callout', 'case-toc', 'case-content',
  'case-teams', 'case-figure-bleed', 'about-experience', 'animations',
];

export function sources() {
  const comps = fs.readdirSync(path.join(CSS, 'components')).filter((n) => n.endsWith('.css')).sort().map((n) => `css/components/${n}`);
  const siteFiles = fs.readdirSync(path.join(CSS, 'site')).filter((n) => n.endsWith('.css')).map((n) => n.replace(/\.css$/, ''));
  const unlisted = siteFiles.filter((n) => !SITE_ORDER.includes(n));
  const missing = SITE_ORDER.filter((n) => !siteFiles.includes(n));
  if (unlisted.length || missing.length) {
    throw new Error(`css/site/ and SITE_ORDER in scripts/build-css.mjs disagree. Not listed: ${unlisted.join(', ') || 'none'}. Missing files: ${missing.join(', ') || 'none'}.`);
  }
  return ['css/tokens.css', 'css/reset.css', ...comps, ...SITE_ORDER.map((n) => `css/site/${n}.css`)];
}

export function buildCss() {
  const list = sources();
  const parts = list.map((rel) => {
    const text = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n').replace(/\s+$/, '\n');
    return `/* ===== ${rel} ===== */\n${text}`;
  });
  const header = `/* ============================================================
   HOPE DESIGN SYSTEM: hope.css
   GENERATED FILE. Do not edit by hand.
   Built by scripts/build-css.mjs (npm run css:build) from ${list.length} source files:
   tokens, reset, components/*, site/*. Edit the sources, then rebuild.
   css/auth.css (loaded by js/auth.js) and css/output.css (Tailwind) stay separate.
   ============================================================ */

`;
  return header + parts.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const built = buildCss();
  if (process.argv.includes('--check')) {
    const current = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8').replace(/\r\n/g, '\n') : null;
    if (current !== built) {
      console.error('css/hope.css is out of date with its sources. Run: npm run css:build');
      process.exit(1);
    }
    console.log('css/hope.css is up to date');
  } else {
    fs.writeFileSync(OUTPUT, built);
    console.log(`css/hope.css: ${sources().length} sources, ${built.length} bytes`);
  }
}
