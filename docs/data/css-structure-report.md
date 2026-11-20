# CSS structure report (read-only investigation)

Date: 2026-11-19. Branch `docs-site-phase1`. Nothing under `css/` was created or edited for this report.
Method: line ranges come from the banner comments in each file and from grep. Every statement is a fact unless it is labelled **Inference** or **Proposal**.

## 1. Stylesheets linked by each HTML page

Order is the order of the `<link rel="stylesheet">` tags. Google Fonts links are left out. No HTML file and no CSS file contains an `@import` of a project stylesheet.

| Page | Stylesheets, in order | Inline `<style>` |
|---|---|---|
| `index.html`, `about.html` | `css/output.css`, `tokens.css`, `reset.css`, `components.css`, `layout.css`, `animations.css` | 0 |
| `case-studies/dotz.html`, `sb-home-redesign.html`, `cloud-cost-intelligence.html`, `dotz backup.html` | the same six, with `../css/` | 0 |
| `design-system.html` | `css/tokens.css`, `reset.css`, `components.css`, `layout.css`, `animations.css` (no `output.css`) | 1 (`design-system.html:17`, page chrome `.ds-*`) |
| `docs/index.html`, `docs/tokens.html` | `../css/` tokens, reset, components, layout, animations, then `docs.css` | 0 |
| `docs/components/*.html` (index, button, badge, link, review) | `../../css/` tokens, reset, components, layout, animations, then `../docs.css` | 0 |
| `drafts/sigmamd-*.html` (2 files) | none | 1 each |

Other facts:
- `@import` exists only in `css/tailwind.css:10-12` (Tailwind layers). `css/output.css` is the compiled result and has no `@import`.
- `css/auth.css` is linked by no HTML file. It is mentioned in a comment at `js/auth.js:11` ("add to any protected page's head").
- `css/Untitled` is a tracked 22-byte file in `css/` (stray).
- `design-organization/hope-demo.html` is deleted in the working tree (it appears in `git status` as deleted) and is not counted above.
- The docs pages take their stylesheet list from one constant, `STYLESHEETS` in `scripts/docs-layout.mjs`. The review page takes it from `docs/data/css-sources.json`.
- `css/output.css` (Tailwind) comes first on the six production pages. Tailwind's rules are inside `@layer`; the project CSS is not layered. **Inference:** unlayered rules win over layered rules whatever the file order, so adding `@layer` to the split files would invert that priority.

## 2. Section map

### `css/components.css` (1,982 lines, 59,126 bytes)

"DS" means a generic Hope component that also exists in Figma. "Site" means a portfolio-specific feature.

| Lines | Section | Kind |
|---|---|---|
| 2-8 | file header ("v1.4 · May 2026", stale) | |
| 9-47 | BUTTONS: `.btn` base, focus, active, arrow icon, 768px full width | DS (Button) |
| 48-57 | ICONS: `.icon` base | DS (icon helper) |
| 58-116 | `.btn--primary`, `--secondary`, `--solar`, `--ghost`, `.btn:disabled`, all under the ICONS banner | DS (Button) |
| 117-132 | `.icon--<role>` colour roles and `.icon--title` | DS (icon helper) |
| 133-180 | BADGES: `.badge` and five styles | DS (Badge) |
| 181-434 | CARDS, Case Studies (`.case-card`, `.cases-grid`) | Site |
| 435-771 | `.case-card--glass` | Site |
| 772-881 | CARDS, Skills (`.skill-card`, `--metric`) | Site |
| 882-905 | TEXT HIGHLIGHT (scroll marker, `.is-active` set by `js/animations.js`) | Site |
| 906-988 | CARDS, Testimonials | Site |
| 989-1076 | LOGO STRIP | Site |
| 1077-1197 | CASE STUDY content sections | Site |
| 1198-1358 | CASE STUDY figure (`.cs-figure`) | Site |
| 1359-1593 | CASE STUDY persona card | Site |
| 1594-1645 | HEADER STATUS BADGE | Site (temporary indicator) |
| 1646-1672 | CASE STUDY lead split | Site |
| 1673-1743 | CASE STUDY result cards | Site |
| 1744-1860 | LIGHTBOX (`.lightbox`, `js/lightbox.js`) | DS (Lightbox, in Figma) |
| 1861-1900 | BRAND LIST | Site |
| 1901-1938 | BANNER (`.banner`, `--wip`) | DS (Banner, in Figma) |
| 1939-1982 | FIGURE BALANCED | Site |

### `css/layout.css` (1,644 lines, 48,234 bytes)

| Lines | Section | Kind |
|---|---|---|
| 1-6 | file header ("v1.4 · May 2026", stale) | |
| 7-33 | CONTAINER (`.container`) | Layout primitive |
| 34-40 | SCROLL OFFSET (`html`) | Global |
| 41-303 | HEADER / NAV | Site chrome |
| 304-392 | SECTIONS | Site layout |
| 393-727 | HERO | Site |
| 728-735 | LOGO STRIP spacing overrides | Site |
| 736-864 | CONTENT GRIDS (`.cases-grid`, `.skills-grid`, `.results-grid`, `.layout-1col` to `3col`) | Site layout |
| 865-899 | ABOUT SNIPPET | Site |
| 900-1004 | FOOTER | Site |
| 1005-1103 | ABOUT BRIDGE | Site |
| 1104-1220 | CASE STUDY hero | Site |
| 1221-1249 | CASE STUDY body layout (`.case-layout`) | Site |
| 1250-1277 | Editorial phase break | Site |
| 1278-1306 | Editorial callout quote | Site |
| 1307-1411 | Sidebar TOC | Site |
| 1412-1423 | Content column (`.case-content`) | Site |
| 1424-1488 | Involved teams | Site |
| 1489-1538 | Full-bleed figure breakout | Site |
| 1539-1644 | ABOUT experience list | Site |

Facts that matter for a split:
- Button styles are not under the BUTTONS banner. Lines 58-116 sit under the ICONS banner, and the icon colour roles (117-132) follow them.
- Generic DS component CSS today is only Button, Icon, Badge, Banner and Lightbox: about 330 of the 3,626 lines (`components.css` 9-180, 1744-1860, 1901-1938).
- There is no separator class in any project CSS file (`hr` appears only in `css/preflight-nomono.css:68`). Hairline dividers are border rules inside other components (for example `css/layout.css:422` on `.hero`).
- Input, Textarea, Select, Checkbox, Radio, Switch, Alert, Toast, Tooltip, Progress, Spinner, Skeleton, Empty state, Tab, Breadcrumb, Pagination, Menu, Modal, Popover, Avatar, Tag and Accordion have no class in `components.css`, `layout.css` or `reset.css`. `css/auth.css` has its own auth-gate controls (`.auth-gate__*`), which are site-specific.

## 3. Dependencies

Compound or descendant selectors that name a class owned by another section (found by script, then read):
- Button: `.btn .icon--arrow` and `.btn:hover .icon--arrow` (`components.css:36-41`) need the `.icon` helper (`components.css:51`).
- Skills card: `.skill-card__icon .icon` (807) needs `.icon`.
- Case card: `.cases-grid > .case-card:first-child` (484); `[data-theme="dark"] .case-card--glass .badge--anchor` (726) needs Badge; `.case-card--glass .metric__value` (751).
- `layout.css` reaches into `components.css`:
  - `.hero__actions .btn` (625) and `.site-footer .btn--footer` (944, 950) restyle Button.
  - `.hero .logo-strip` (462) and the LOGO STRIP spacing block (728) override `components.css:989-1076`.
  - `.testimonials-ticker .testimonial-card` (846) refines `components.css:906-988`.
  - `.footer__heart .icon` (992) and `.about-bridge__cta .icon` (1093, 1100) use the shared `.icon`.
  - `.case-section__body .team-section__title` (1431) refines `components.css:1077-1197`.
- The same class is defined in more than one place (the later definition wins): `.btn` (components 12-132 and layout 625), `.logo-strip`, `.testimonial-card`, `.cases-grid`, `.icon`, `.case-section__body` (components 1077 and 1198, layout 1431).

Selector order dependencies:
- `.btn:disabled` (`components.css:106`) has the same specificity as `.btn--primary:hover` (64) and `.btn--ghost:hover` (100). The disabled rule wins only because it comes later. **Inference:** loading it before the variants would let the hover colours override the disabled colours (`pointer-events: none` would still block real hover).
- `.btn { width: 100% }` under 768px (`components.css:44-46`) is overridden by `layout.css` rules that must load after it.
- `layout.css` must load after `components.css` for all the overrides above.
- `:where(.case-section__body) p` (specificity 0) depends on component rules that set their own `p` styles.
- Shared JS state classes on unrelated components: `.is-active` (text highlight, case TOC), `.is-open` (lightbox, mobile nav), `.is-visible` (reveals). They are always scoped by a compound selector today.
- `!important`: 7 in `components.css` (for example `:269-272` light/dark case-card image swap, `:833`), 10 in `layout.css`, 4 in `animations.css`.

Custom properties: no component declares its own. Every `var(--x)` in `components.css`, `layout.css`, `reset.css` and `auth.css` resolves to `tokens.css`. The only `var()` outside it that is undefined is `--demo-overlay` in the deleted `hope-demo.html`.

Dark mode: `[data-theme="dark"]` rules are scattered inside component sections (19 in `components.css`, 13 in `layout.css`, 3 in `auth.css`, 0 in `reset.css`). A per-component file would need to carry its own dark rules.

Markup and JS coupling: `js/lightbox.js` builds the `.lightbox` markup and toggles `.is-open` and `.is-zoomable`; `js/animations.js` toggles `.is-visible` and `.is-active`; `js/case-toc.js` toggles `.is-active`.

## 4. Tokens

- All custom properties are declared in `css/tokens.css` only (164 properties): `:root` (line 8), `[data-theme="dark"]` (294), `@media (prefers-reduced-motion: reduce)` (354) and `@media (prefers-reduced-transparency: reduce)` (371).
- No custom property is declared in any other CSS file or in any HTML.
- `tokens.css` references no other file. It can be loaded alone as a layer. It is already linked first on every page.
- Two blocks are not tokens: the reduced-motion block at 354-367 sets `animation-duration` and similar on `*` (a behaviour rule), and `--resume-url` (a URL string) sits in `:root`. **Inference:** the reduced-motion rule belongs in a base or reset file when `tokens.css` becomes a pure token layer.

## 5. Occurrences of the old rule ("components enter the CSS only when used")

No file states the rule in those exact words. These are the places that express it. Nothing was edited.

| File and lines | What it says |
|---|---|
| `design-organization/GOVERNANCE.md:315-321` | "O teste do projeto real": "estou usando isso em um projeto real, hoje?"; "Se a resposta é 'não, mas vou precisar', adie. YAGNI". |
| `GOVERNANCE.md:323-325` | "Quando expandir": expansion happens when a real project forces it. |
| `GOVERNANCE.md:347-355` | Tests 3 and 4 ("Reuso real", "Projeto real"): "Não → adie. YAGNI (seção 8)". |
| `GOVERNANCE.md:387` | "Componente para um único uso" is a local pattern, not a system component. |
| `GOVERNANCE.md:408` | Principle: "YAGNI vence sofisticação." |
| `design-organization/DESIGN.md:1024-1028` | "Componentes novos no Figma (sem CSS ainda)": they enter this file and `DESIGN-IMPLEMENTATION.md` "quando forem implementados no código (teste 4 do GOVERNANCE.md)". |
| `design-organization/CHANGELOG.md:561` | "Componentes novos do Figma ... ainda sem CSS; entram quando houver uso." |
| `CHANGELOG.md:573` | Effect on test 4 ("projeto real hoje") of the generic UI primitives. |
| `CHANGELOG.md:654` | "Select sem variante aberta e Menu item sem ícone à esquerda: só entram quando houver uso." |
| `docs/components/index.html:91` and `scripts/build-components-doc.mjs:525` | Generated text: "They enter the docs when they are implemented (GOVERNANCE test 4)." (This is docs-site text written in this project, not a Hope document.) |

Not found: `README*` (none exists), `PATTERNS.md`, `DESIGN-IMPLEMENTATION.md`, `docs/case/decisoes-hope.md` (the log; not edited).

## 6. Split plan (proposal, not applied)

### Target files

```
css/tokens.css                  tokens only (move the reduced-motion rule out)
css/reset.css                   base, accessibility, typography utilities, reveal utilities
css/components/icon.css         .icon, .icon--<role>          (components.css 48-57, 117-132)
css/components/button.css       .btn and variants, disabled   (9-47, 58-116)
css/components/badge.css        (133-180)
css/components/banner.css       (1901-1938)
css/components/lightbox.css     (1744-1860)
css/site/*.css                  one file per site feature, not DS components:
                                case-card, case-card-glass, skill-card, text-highlight,
                                testimonial, logo-strip, case-study-*, persona,
                                header-status-badge, result-card, brand-list, figure-balanced
css/layout.css                  container, header, hero, footer, case layout, and the
                                overrides that reach into components (kept after them)
css/animations.css              unchanged
css/hope.css                    GENERATED aggregate of all of the above, fixed order
```

### Load order (also the aggregate order)

tokens, reset, `components/icon`, `components/button`, `components/badge`, `components/banner`, `components/lightbox`, `site/*` in the current file order, layout, animations. This keeps every override that exists today (`layout.css` after `components.css`, `.btn:disabled` after the variants).

### Aggregate

One plain Node script, `scripts/build-css.mjs`, no dependency: read an ordered manifest (a JSON list, the same idea as `docs/data/css-sources.json`), concatenate the files with a one-line comment per file, write `css/hope.css` with a "generated, do not edit" header. A `--check` mode fails if `css/hope.css` differs from a fresh build. No `@import`, so there are no extra requests. No `@layer`.

### Pages that would change

- `docs/data/css-sources.json`: replace the five entries with `css/hope.css` (the review page and its checks follow).
- `scripts/docs-layout.mjs` (`STYLESHEETS`) for the other docs pages. **Inference:** it should read `css-sources.json` too.
- `scripts/check-docs.mjs`, `scripts/build-components-doc.mjs` and `scripts/build-tokens-doc.mjs` list `css/*.css` non-recursively. They would miss `css/components/` and `css/site/` unless they read the manifest.
- Production pages (`index.html`, `about.html`, three case studies, `dotz backup.html`): they could keep linking the aggregate first, then switch to per-component links page by page.
- `design-system.html`: to be replaced later (owner decision), so no work now.

### Risks

1. Override order (section 3). Every split must keep the `layout.css`-after-components order and the disabled-after-hover order.
2. The same class defined in two files (`.btn`, `.logo-strip`, `.icon`, `.cases-grid`, `.testimonial-card`) can silently change which rule wins.
3. Per-page component links make load order a per-page responsibility. Pages that link a subset can lose a shared helper (`.icon`, `.badge`).
4. `@layer` would flip priority against Tailwind's layers.
5. Tooling that reads `css/*.css` non-recursively (above).
6. Dark-mode rules and `!important` pairs must travel with their component.
7. Stale "v1.4 · May 2026" headers in `components.css`/`layout.css` need replacing, and `css/Untitled` needs a decision.

### Safe migration order

1. Add the manifest and make the docs scripts read it (no CSS change).
2. Write `build-css.mjs` and make the aggregate byte-for-byte equal to today's concatenation. Prove it with the computed-style snapshot used earlier (7 pages, 390/1024/1280).
3. Split one component at a time, button first. After each, rebuild and require 0 computed-style differences on the same pages.
4. Switch the docs to the aggregate.
5. Switch production pages, one page at a time, with the same snapshot.
6. Remove `components.css` only when nothing links it.
