# Prompt 23: Lote 2B (Indicators and hints: Tooltip, Progress, Spinner, Skeleton; Icon Button CSS; z-index scale; carry-over fixes from 2A)

Context: Lote 2A shipped as 2.10.0 (`hope-feedback-a`). This prompt codes four feedback components, the Icon Button, the z-index scale, and a set of fixes decided after the 2A report. Figma is the source of truth for values. Never push or merge; Renan runs git. Do not hand-edit `figma-tokens.json`. No em dashes in anything you write. Plus Jakarta Sans only, no mono font or token. Conventions from Lotes 1 and 2A apply (native elements, no JavaScript in component CSS, no `opacity` for disabled, forced-colors handling, `--icon-color-*` roles, Hope focus ring).

Prerequisite: Renan has merged `hope-feedback-a` into `main`. Create `hope-feedback-b` from updated `main`. If `main` does not contain 2.10.0, stop and tell Renan.

## Part 0: inspection (before writing code)
1. Collisions: `.tooltip`, `.progress`, `.spinner`, `.skeleton`, `.icon-btn`, `.btn--icon`, `role="tooltip"`, `role="progressbar"`, `aria-busy`, and any existing `@keyframes` (name, duration, easing). Report what exists, where it is used, and the existing motion tokens (durations, easings).
2. z-index inventory: list every `--z-*` token in the CSS with its value (Renan knows `--z-sticky` exists; the scale reportedly stops at 200) and every literal `z-index` in `css/`, `docs/` and the site (file, selector, value). Report both lists before changing anything.
3. Map every Figma token below through `figma-tokens.json` to its real CSS name. Report any token with no CSS name.
4. `figma-tokens.json` is stale and has no generator. Do not touch it. After this lote, the tokens page will list new Figma tokens (the z-index variables and anything else) as not in the snapshot; report the count so Renan can refresh the snapshot through the Figma MCP.

## Part A: z-index scale
Figma Foundation now has five variables in `Hope · Primitives`, group `Z-index` (published by Renan before or after this prompt; the snapshot will not have them yet):

| Figma variable | Value | CSS name (code syntax set in Figma) | Use |
|---|---|---|---|
| `Z-index/z-modal-scrim` | 100 | `--z-modal-scrim` | Modal scrim |
| `Z-index/z-modal` | 200 | `--z-modal` | Modal |
| `Z-index/z-popover` | 300 | `--z-popover` | Popover, Menu and Select panels |
| `Z-index/z-tooltip` | 400 | `--z-tooltip` | Tooltip |
| `Z-index/z-notification` | 500 | `--z-notification` | Toast |

Values 100 to 500 come from the Core CHANGELOG ("Modal z-index 100/200, Popover 300, Tooltip 400, Toast 500") and the Figma descriptions of Tooltip and Toast. The Popover-hosts-Menu-and-Select-panels note is my design inference, not documented.
- Add the five tokens to the CSS with exactly those names. Keep every existing `--z-*` token working (alias it to the new one when it means the same layer, otherwise leave it and report).
- Replace the Toast literal 500 with `--z-notification`. Replace other literals only when they clearly are one of these five layers (for example the Modal and Lightbox if they use 100 and 200). Do not change the computed z-index of any element: snapshots must show 0 differences from this part. Report every literal you leave, and the current sticky and header values, so Renan can add those layers to Figma.
- Write the scale (layers, values, rule that a layer only needs a new number when it must sit between two existing ones, leaving gaps of 100) in `DESIGN-IMPLEMENTATION.md` next to the existing z-index text, and add it to the tokens docs. Reconcile with what `DESIGN-IMPLEMENTATION.md` already says about z-index; if it disagrees with the table above, report the disagreement and do not choose silently.

## Part B: carry-over fixes from Lote 2A
1. Toast Default removed in Figma (Types are now Success, Warning, Error, Info; a neutral message uses Info). Remove `.toast--default`, its docs example and the gap `toast-default-info-identical`; update the Toast docs text and the variant counts (the Figma total is one lower).
2. ARIA roles: Error `role="alert"`, Warning, Info and Success `role="status"`, for Alert and Toast. Update markup, docs and the gap `alert-role-by-urgency`. State in the docs that live-region roles announce content inserted dynamically; an Alert already present at page load needs no role to be read, so authors apply the role when injecting the message. Cite the MDN pages already used.
3. Dismiss hit area (Alert and Toast, 16x16 visual): measure the real distance from each dismiss to the nearest other target and report whether the WCAG 2.2 SC 2.5.8 spacing exception already applies. Regardless, add a transparent pseudo-element so the hit area is at least 24x24 without changing layout, unless it would overlap the action target; if it would, report and do not add it.
4. `DESIGN-IMPLEMENTATION.md` section 5, "Borda dentro da caixa": the exception written in 2A was derived from arithmetic. Replace the check with the Figma property that decides it: `strokesIncludedInLayout` on the component's root node (the "Include stroke in layout" option of the Auto layout panel). Verified in the Core file: `false` on Button, Icon Button and Badge (discount the CSS border from the padding); `true` on Alert, Toast, Tab, Tag and Accordion item (do not discount). Input, Textarea, Select, Checkbox, Radio and Switch were not checked because their borders sit on an inner node; note them as "to verify". Rule for any new component: read the property in Figma first.
5. Banner: Figma now styles the emoji with `Body/Medium/body-sm medium` (same as the code). Mark the gap `banner-emoji-style` as resolved and remove it.

## Part C: components
General: border-in-box rule per Part B.4 for each component; native elements; no JavaScript in component CSS; forced colors handled; every state and example in the docs data.

### Tooltip (`.tooltip`, modifiers `.tooltip--top|bottom|left|right`)
Figma (Placement Top, Bottom, Left, Right):
- Bubble: horizontal flex, padding 8 12, radius 8 (`--radius-sm`), fill `Background/Neutral/Default`, no border. Text `Body/Medium/body-xs medium` in `Text/Neutral/Default`. Bubble 84 x 34 for the sample text.
- Arrow: vector 12 x 6 (Top and Bottom) or 6 x 12 (Left and Right), fill `Background/Neutral/Default`, attached to the bubble with 0 gap, so the whole component is 84 x 40 (Top, Bottom) or 90 x 34 (Left, Right). Top: bubble above, arrow below, centered. Bottom: arrow above the bubble. Left: bubble left of the arrow. Right: arrow left of the bubble.
- Layer: `--z-tooltip`. Markup: the tooltip has `role="tooltip"` and the trigger points to it with `aria-describedby`.
- Per the Figma Info panel: text only (links, buttons or long content belong in a Popover); never the only way to reach essential information, since it does not appear on touch.
- Not coded, listed as gaps: positioning against the trigger (anchor logic), show and hide behavior (JS), delay, and WCAG 1.4.13 (Content on Hover or Focus: dismissible with Escape, hoverable, persistent). The docs example shows the four placements as static elements.
- Forced colors: confirm bubble and arrow stay visible; report.

### Progress (`.progress`)
Figma: Value variants 0, 25, 50, 75, 100 (documented values; in code the fill is any value). 320 wide in the sheet (fluid in code), height 37 with label and value.
- Vertical stack, gap 8: header row (label left, value right, space-between, 21 high) then the track.
- Label `Body/Medium/body-sm medium` in `Text/Default/Default`; value (for example "25%") `Body/Medium/body-sm medium` in `Text/Default/Secondary`. Label and value are optional.
- Track: 8 high, radius 999 (`--radius-pill`), fill `Border/Default/Default`. Fill bar: 8 high, radius 999, `Background/Neutral/Default`, width = value percent of the track (0 is a hairline of 0.01 in Figma; use 0 in code).
- Semantics, decided together with the Spinner. Rule for the docs (my inference from a review of Material Web, Apple HIG, Chrome's spinner guidance, eBay, Volvo and Queensland Health, not a standard): if a component reports a value, it is a progressbar; if it only says "busy", it is a status. Progress therefore uses a native `<progress value max>` (implicit progressbar role, no ARIA wiring), with the label as its accessible name (`aria-labelledby` or a wrapping `<label>`). Style it with `appearance: none` and the vendor pseudo-elements (`::-webkit-progress-bar`, `::-webkit-progress-value`, `::-moz-progress-bar`) to match the Figma track and fill exactly. Test the fill width transition in Chromium, Firefox and WebKit. If the native element cannot match the Figma geometry (8px track, pill radius) or cannot animate the width in one of the three engines, fall back to a `<div role="progressbar" aria-valuenow aria-valuemin aria-valuemax>` as the Figma Info panel describes, and report which engine forced it. Either way, report the choice and the evidence in the docs and the report.
- Motion: the fill animates its width with the base duration and ease-in-out (use the existing motion tokens), and does not animate under `prefers-reduced-motion`.
- Not in Figma, not coded: indeterminate state (use Spinner).

### Spinner (`.spinner`)
Figma: one size, 24 x 24 (no Size axis), drawn as a ring: track ellipse `Border/Default/Default`, arc ellipse `Background/Neutral/Default`; ring thickness 2.4 (inner radius 0.8 of a 12 radius); the arc spans about 99 degrees starting at 12 o'clock.
- Animation (Figma Info panel, documented): continuous rotation, one turn per second, "ease-in-out curve Hope defines for loops". Implement as documented, using the existing loop easing token if one exists. Observation to report: an ease-in-out on a 1s continuous rotation makes the spinner accelerate and slow down every turn; measure or screenshot a frame sequence and report whether it looks right, as a note for Renan, without changing the documented curve.
- `prefers-reduced-motion`: replace the rotation with an opacity pulse (documented).
- Semantics (decided, with the Progress rule above: busy only, no value, so a status): `role="status"` with visually hidden text ("Carregando" is the Figma wording; the docs example is in English, so keep the visually hidden text as an author-supplied slot and say so). The ring itself is decorative (`aria-hidden="true"`). Do not use an indeterminate `<progress>` for it. Mention in the docs that the Spinner replaces a Progress only when there is no known percentage.
- Design decision (Renan, 2026-11-23): keep the Figma design (a rotating arc on a ring) with Hope's own CSS; do not copy Material's code (Apache-2.0, and its arc grows and shrinks, which is a different design). If this does not work out, we revisit.
- The Figma Spinner is a plain frame with a "Specimen" background, not a component. Treat it as one visual; record in the docs data that Figma has no component set for it (gap `spinner-not-a-component`). Do not infer variants.
- Forced colors: the ring must stay visible; report.

### Skeleton (`.skeleton`, modifiers `.skeleton--text|title|avatar|block`)
Figma (Shape): all fill `Border/Default/Default`, no stroke.
- Text 240 x 12, radius 8. Title 160 x 20, radius 8. Avatar 40 x 40, radius 999. Block 240 x 120, radius 12 (`--radius-md`). Widths are fluid or set by the author in code; heights and radii are as above.
- Animation (documented in the Figma Info panel, not drawn in Figma): a soft opacity pulse in ease-in-out, disabled with `prefers-reduced-motion`. Use existing motion tokens for duration; if the Figma panel names none, report the gap `skeleton-duration` and use the base duration.
- Semantics: the container is marked `aria-busy="true"`; the skeleton pieces are decorative (`aria-hidden="true"`). Use for loading above about 300ms; below that, nothing (Figma panel).
- Forced colors: skeleton pieces must not disappear; report.

### Icon Button (name consistent with `.btn`; propose it in Part 0 and report, for example `.btn--icon`)
Figma (Icon Button, Style Ghost and Primary, State Default, Hover, Focus, Disabled): 44 x 44 (WCAG 2.5.5 target), fully round (radius 999), icon 24 x 24 (Phosphor, swappable), no padding.
- Primary: Default and Focus fill `Background/Neutral/Default`; Hover `Background/Neutral/Hover`; Disabled fill `Background/Disabled/Default` with a 1px border `Border/Disabled/Default` (the Figma stroke weight was 1.21 and unbound; I bound it to `Stroke/thin` = `--border-width-normal` in Core, so it is 1px). `strokesIncludedInLayout` is false, but the size is fixed at 44, so use `box-sizing: border-box` and no discount is needed.
- Ghost: no fill and no border in Default, Focus and Disabled; Hover fill `Background/Default/Secondary`.
- Icon color follows the `Icon/Color` mode set on each variant root: Primary Default, Hover and Focus "On Neutral" (now named Neutral in Foundation; the Core file still shows the old name, treat as the Neutral mode), Primary Disabled "Disabled", Ghost Default "Secondary", Ghost Hover "Default", Ghost Focus "Secondary", Ghost Disabled "Disabled". Use the `--icon-color-*` roles; map each mode to the existing role.
- Focus: ring 52 x 52 (44 + 2 x 4), radius 26, `Border/Utilities/Focus Ring`, 2px with 2px gap (same ring tokens as Button). `outline` with `outline-offset` as elsewhere.
- Semantics: `<button type="button">` with an accessible name (`aria-label`), as the Figma description requires. Disabled uses the native attribute, no `opacity`.
- Reuse the existing `.icon` mechanism; do not add a new icon system.

## Part D: contrast, accessibility, keyboard (report only, change no colors)
- WCAG contrast, Light and Dark: Tooltip text on its bubble; Progress label and value text, and the fill bar against the track (SC 1.4.11) and against the page; Spinner arc against its track and against the page; Skeleton fill against the page (decorative, report only); Icon Button icon against each fill, and the Focus ring.
- Keyboard: Icon Button tab order, Enter and Space, ring visible, disabled skipped. Tooltip: report what is possible without JS (nothing to tab to).
- Forced colors: screenshot each component.
- Failures become known gaps with the measured number; do not change colors.

## Part E: docs and governance
- Pages through the generic builder: Tooltip, Progress, Spinner, Skeleton, Icon Button (the Icon Button page closes the debt "Icon Button has no page because it has no CSS"). Example markup in the data; essentials; gaps with measurements; token tables listing every variant. Keep the six data sections in data, not rendered. Update the map, the review page counts, the tokens page, and the z-index text.
- Update the Alert and Toast pages for Part B (roles, Default removed, hit area).
- Gaps to add: `tooltip-positioning`, `tooltip-hover-focus-behavior` (WCAG 1.4.13), `progress-indeterminate-not-designed`, `spinner-not-a-component`, `spinner-easing-observation`, `skeleton-duration` (only if no duration is documented), and anything the contrast pass finds.
- GOVERNANCE: only if a rule actually changes; classify with section 3 and explain the classification in the report. Reread section 3 and state which line you applied. If nothing changes, do not touch it.
- The CHANGELOG entry for this version must also record the fixes in Part B.

## Part F: verification and delivery
- Snapshots on 13 pages x 3 widths x 2 themes against clean `main`. Site pages must have 0 differences, excluding custom properties you add. Part A must produce 0 computed z-index changes; explain any difference.
- Measure heights and widths in the browser against the Figma numbers above, in a table (Tooltip 84 x 40 and 90 x 34, Progress 37, Spinner 24, Skeleton shapes, Icon Button 44 and ring 52).
- `css:build`, `docs:check`, `docs:tokens`, `docs:components`, `docs:review` pass; the mono guard passes.
- Screenshots to `C:\Users\rmour\Desktop\hope-shots-23`: collapsed and expanded at 390, 768 and 1280, Light and Dark, a sheet with all states or placements side by side, and a forced-colors shot, per component.
- Version 2.11.0 (MINOR: new components and tokens), bump the same version strings as before, CHANGELOG without em dashes.
- Commit in small commits by topic. Do not push or merge.
- Report format: same sections as the Lote 2A report (inventory, z-index lists, components, measured table, contrast and keyboard, docs and counts, governance before and after, snapshots, screenshots, version, decisions for a D-entry, deviations, open questions, commits).
