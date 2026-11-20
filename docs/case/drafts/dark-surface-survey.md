# Dark-surface survey (read only, 2026-11-20)

Input for decision D-24 (surface context, `data-surface="neutral"`). Nothing was implemented. Measured with Playwright at 1366px on `index.html`, light and dark theme, against the live CSS.

## Dark surfaces

| Surface | Selector | Background | Pages | Theme |
|---|---|---|---|---|
| Footer | `.site-footer` (layout.css:905) | `--color-bg-brand-strong` (#1a1a2e, Abyss), 3px top border `--color-border-accent-default` | index, about, dotz, dotz backup, cloud-cost-intelligence, sb-home-redesign | both, same colour |
| Auth gate overlay | `.auth-gate` (auth.css:49) | `rgba(13,13,15,0.52)`, dark theme `0.68` (hex literal) | any gated page, created by js/auth.js | both |
| Lightbox backdrop | `.lightbox__backdrop` (components.css:1862) | `--color-bg-scrim-strong` | design-system.html, case pages through js/lightbox.js | both |
| Mobile menu | `[data-theme="dark"] .nav__mobile-menu` (layout.css:267) | `--color-abyss`, border `rgba(74,74,96,0.35)` | all pages with the nav | dark theme only |
| Case card visual | `[data-theme="dark"] .case-card__visual` (components.css:306) | `--color-abyss` | index, design-system | dark theme only |
| Glass canvas | `[data-theme="dark"] .case-card--glass .case-card__canvas` (components.css:686) | gradient `#2A2A42` to `#1B1B2C` plus Anchor and Solar radials (hex literals) | index, design-system | dark theme only |
| Persona goal card | `[data-theme="dark"] .persona__goal-card` (components.css:1611) | `--color-abyss` | dotz | dark theme only |
| Primary button (as a dark fill) | `.btn--primary` | `--color-bg-neutral-default` (Ink) | everywhere | light theme |

## Elements with local overrides or hard-coded colours

| Surface | Element | Property | Current value | Likely surface token |
|---|---|---|---|---|
| Footer | `.site-footer` | background | `--color-bg-brand-strong` #1a1a2e | none exact: Neutral/Default is Ink #0d0d0f. Decide whether the surface is Brand/Strong or Neutral |
| Footer | `.site-footer` | color | `--color-text-brand-strong-inverse` (#fff) | `--color-text-neutral-default` |
| Footer | `.footer__heading` | color | `--color-cloud` (primitive) | `--color-text-neutral-default` |
| Footer | `.footer__lede` | color | `rgba(255,255,255,0.72)` | `--color-text-neutral-secondary` (Night/300 #b4b4c8) |
| Footer | `.footer__motto` | color | `rgba(255,255,255,0.55)` | `--color-text-neutral-tertiary` (Night/400 #9090a8) |
| Footer | `.footer__copy` | color | `rgba(255,255,255,0.65)` | `--color-text-neutral-secondary` or tertiary (between the two) |
| Footer | `.footer__heart` | color | `--color-celebrate` (#f5a8c0) | keeps its own colour |
| Footer | `.footer__bottom` | border-top-color | `rgba(255,255,255,0.1)` | `--color-border-neutral-default` (Night/700) |
| Footer | `.site-footer` | border-top-color | `--color-border-accent-default` (Solar) | keeps its own colour |
| Footer | `.btn--footer` | color | `--color-cloud` | `--color-text-neutral-default` |
| Footer | `.btn--footer` | border-color | `rgba(255,255,255,0.35)` | `--color-border-neutral-strong` (Night/500, composites to about the same) |
| Footer | `.btn--footer` | background | transparent | transparent |
| Footer | `.btn--footer:hover` | border-color | `rgba(255,255,255,0.65)` | no token (would be `--color-border-neutral-strong` hover, not defined) |
| Footer | `.btn--footer:hover` | background | `rgba(255,255,255,0.08)` | `--color-bg-neutral-tertiary` (Night/700, composites to about the same) |
| Footer | footer links and `.btn` focus | outline-color | `--color-border-focus-ring` = Anchor | needs a surface value (Solar, as in dark theme) |
| Lightbox | `.lightbox__caption` | color | `rgba(255,255,255,0.55)` | `--color-text-neutral-tertiary` |
| Lightbox | `.lightbox__close` | background, border, color | `rgba(255,255,255,0.12)`, `0.18`, `0.80` | `--color-bg-neutral-tertiary`, `--color-border-neutral-default`, `--color-text-neutral-default` |
| Lightbox | `.lightbox__close:focus-visible` | outline-color | `--color-solar` (primitive) | `--color-border-focus-ring` once the surface sets it to Solar |
| Auth gate | `.auth-gate` panel (dark theme) | border | `rgba(255,255,255,0.09)` | `--color-border-neutral-default` |
| Mobile menu | `.nav__mobile-menu` (dark theme) | background, border | `--color-abyss`, `rgba(74,74,96,0.35)` | `--color-bg-alt` or surface background; `--color-border-neutral-default` |
| Case card | `.case-card__tag` (dark theme) | background, border | `rgba(255,255,255,0.08)`, `0.10` | `--color-bg-neutral-tertiary`, `--color-border-neutral-default` |
| Glass canvas | gradient | background | `#2A2A42`, `#1B1B2C`, `rgba(28,95,168,.45)`, `rgba(245,200,66,.2)` | no token; decorative, would stay literal |
| Nav and header | hover backgrounds (layout.css:179 to 297) | background | `rgba(0,0,0,0.07)` light, `rgba(255,255,255,0.10)` dark theme | `--color-bg-neutral-hover` family |

## `.site-footer .btn--footer` (`a.btn.btn--secondary.btn--footer`, surface #1a1a2e in both themes)

| State | Background | Border | Text | Icon | Outline |
|---|---|---|---|---|---|
| Default | transparent | `rgba(255,255,255,0.35)` | #ffffff | #ffffff | none |
| Hover | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.65)` | #ffffff | #ffffff | none |
| Focus, light theme | transparent | `rgba(255,255,255,0.35)` | #ffffff | #ffffff | 2px solid #1c5fa8, offset 2px |
| Focus, dark theme | transparent | `rgba(255,255,255,0.35)` | #ffffff | #ffffff | 2px solid #f5c842, offset 2px |
| Disabled, light theme | transparent | #e2e2e8 | #9090a8 | #9090a8 | none |
| Disabled, dark theme | transparent | #2e2e40 | #69697e | #69697e | none |

The disabled state wins over `.btn--footer` (specificity 0,3,0 against 0,2,0), so a disabled footer button uses the generic Secondary disabled tokens, not the footer colours. In the light theme that gives an #e2e2e8 border (13.2:1 on the surface, bright) with #9090a8 text (5.48:1). In the dark theme the disabled text is #69697e at 3.19:1.

## Flags

Contrast against the footer surface (#1a1a2e):

| Colour | Role | Ratio | Result |
|---|---|---|---|
| Anchor #1c5fa8 | focus ring, light theme | 2.64 | **fails 3:1** (footer links and `.btn--footer`) |
| Solar #f5c842 | focus ring, dark theme | 10.74 | passes |
| Ink #0d0d0f | Primary fill | 1.14 | **invisible on the surface** (Primary needs the Neutral swap) |
| Destructive #b83434 | fill | 2.91 | **fails 3:1** as a boundary against the surface |
| Destructive hover #7a2020 | fill | 1.67 | **fails**, nearly merges with the surface |
| Info #634590 | Info badge and border | 2.26 | **fails 3:1** as a boundary |
| Secondary border Muted #5f5f6e | border, light theme | 2.72 | **fails 3:1** |
| Night/500 #69697e | disabled text, Neutral strong border | 3.19 | passes |
| Success #4a9f6b | Success border, badge | 5.25 | passes |
| Tide #8cb4e0 | Brand/Default, dark theme | 7.90 | passes |
| Sky #e8f0f9 | Accent hover fill | 14.83 | passes |

Components that would keep their own colour on a dark surface: Accent (Brand fill and its Sky hover), Destructive (Error and Error-deep, both low contrast), and the status badges (Success, Info, Solar). They need an explicit decision in D-24, because the surface mode only swaps Default for Neutral and does not cover role colours.
