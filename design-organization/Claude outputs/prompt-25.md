# Prompt 25: Lote 4 (Overlays and data) + fixes from the Lote 3 review

Work on a new branch `hope-feedback-d`, created from an up to date `main`. First run `git branch --merged main` and confirm `hope-feedback-c` (2.12.0) is merged. If it is not, stop and tell me. Do not push, merge or open PRs. I run all git commands.

## Ground rules (same as before)

- Figma is canonical for token and component values (Core `U6ThTndTKYSJKkd0XqaSdV`, Foundation `zFWoSVDJDdZwKmuLJMCs8M`). Repo is canonical for prose, rules and changelog. Read Figma yourself when a value is missing here.
- Never invent CSS token names. Map every Figma variable to an existing name in `tokens.css`; list the mapping in the report. Do not hand-edit `figma-tokens.json`.
- Plus Jakarta Sans only. No mono font. No unlinked typography.
- No em dashes in anything you write (docs, comments, CHANGELOG, commits).
- Border rule (DESIGN-IMPLEMENTATION section 5) depends on `strokesIncludedInLayout`. I read it for this lote: Modal, Popover, Tag and Accordion item are all `true` (do NOT discount the border from padding or size). Avatar and Lightbox panel have no root border.
- Focus ring: `--focus-ring-width` 2, `--focus-ring-gap` 2, colour `Border/Utilities/Focus Ring`, `:focus-visible` only. Remember the `reset.css` rule that sets `border-radius: var(--radius-xs)` on `a:focus-visible` and `button:focus-visible`: repeat the component radius in its own `:focus-visible` rule (this bit us in Lote 3).
- Report format as before: summary, Part A results, Part B per component with token mapping and deviations, checks run, open items, final `git status` and commits.
- Version: one release, 2.13.0 (MINOR). Do not rewrite the 2.12.0 CHANGELOG entry (history); correct it with notes in the 2.13.0 entry.

## Part A: fixes from the Lote 3 review

A1. `--z-overlay` comes back as a DEPRECATED alias: `--z-overlay: var(--z-sticky)` (decided: MINOR with a deprecation path, not MAJOR). Add a comment saying it is deprecated and which release may remove it (next MAJOR). Nothing in the repo may use it. Document it in the z-index section of the docs and in the 2.13.0 CHANGELOG under Deprecated. Also update the 2.12.0 note you wrote that said it was removed, by adding a correction line in 2.13.0 (not by editing the old entry).

A2. Tab label width (decided: option A). The selected Tab now uses the SAME text style as the unselected ones: `Body/Medium/body-sm medium` (I changed the four Selected variants in Figma). Remove the SemiBold from `.tab[aria-selected="true"]`. Selection stays marked by the 1.5px bottom line and the text colour change. Measure the label width selected vs unselected and report that it is identical. Update the Tabs docs text, DESIGN-IMPLEMENTATION and any note that mentions the weight change. The "Tabs, Pagination and Menu mark current differently" comparison stays, but the Tabs entry now reads "bottom line and text colour".

A3. GOVERNANCE clause (decided). Add to section 3 a clause for changes to the governance document itself: a rule added or removed is MINOR; an alignment of text with an already decided rule, with no rule change, is PATCH. Bump GOVERNANCE accordingly (it adds a rule, so MINOR, v1.7) and keep 1.6.1 classified as PATCH. Show me the full diff in the report so I can review it before it goes anywhere. Touch nothing else in GOVERNANCE.

A4. Phosphor icon paths. In Lote 3 the paths for CaretLeft, CaretRight and DotsThree were written from memory. Verify against the official package: in a temporary directory OUTSIDE the repo, `npm install @phosphor-icons/core` (do not add it to the repo's dependencies), and compare the Regular-weight SVG path data with what the repo uses. Check these icons: CaretLeft, CaretRight, CaretDown, DotsThree, X, Check (the last three are used in this lote and in Menu). If any differ, replace with the official path data and report which ones changed and by how much (visual diff or bounding box). Also compare against the Figma export geometry (the Figma icons come from the Phosphor Figma library `u1vCsV29DxickSmAYiLquZ`); if the official package and Figma differ from each other, do not pick one: report both and ask me. Record the package version you compared against.

## Part B: Lote 4 components

For every component: CSS file in the existing per-component structure, docs page through the data-driven builder (`components-content.json`, `components-code-notes.json`; no inline style in demos; `docs:check` must pass), notes in DESIGN-IMPLEMENTATION, and the "Overlays and data" group in the docs navigation (create it if it does not exist; Table already belongs there). The repo already has CSS for some of these (Lightbox, probably Accordion and Avatar-like pieces for the site). For each one: first compare the existing CSS with the Figma values below, list the differences, and change the CSS to match Figma (Figma wins, D-01). Where the change is visible on a site page, include before and after screenshots and say which pages are affected. Do not change site markup unless required.

### B1. Modal (Figma `Modal`, component 2413 page "Modal")

- Panel: width 480 (fixed on desktop), padding 24, gap 16 between header, body and footer, radius 16 (`--radius-lg`), background `Background/Default/Default`, border 1px `Border/Default/Default` INCLUDED in layout (480 is the outer width; content width is 430), shadow `Shadow/lg`. On narrow screens the panel must shrink with a margin (Figma does not define it; use `max-width: calc(100% - 2 * the page gutter)` and report the value you chose).
- Header: title `Heading/H3`, `Text/Default/Default`, plus a close button with a 20px X icon at the right, gap 12. The close icon uses the Icon/Color Secondary mode (`--icon-color-secondary`). The close button needs an accessible name and a focus ring (Figma draws no Focus variant for it: follow the Icon Button focus pattern, report as a Figma gap).
- Body: `Body/Regular/body-sm`, `Text/Default/Secondary`.
- Footer (boolean "Show footer"): right-aligned, gap 12, a Secondary Button (Cancel) and a Primary Button (Confirm), Medium size. Figma shows both buttons 184px wide, but that is a fixed width override on the instances, not a Button rule. In code the buttons hug their content; list this as a deviation pending my decision.
- Scrim behind: `Background/Utilities/Scrim` (find the CSS token that matches; the Figma Info text said "Overlay" by mistake, I fixed it). Layers: scrim `--z-modal-scrim` (100), modal `--z-modal` (200). The Toast at `--z-notification` (500) must stay above an open Modal.
- Behaviour: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (title) and `aria-describedby` (body); focus moves into the dialog on open, is trapped inside, Esc closes, focus returns to the trigger; the page behind is inert and scroll is locked while open. Scrim click does NOT close a Modal (it is for decisions; the Figma text says only Esc and the close button) .
- Use the same approach the existing Lightbox uses for open/close, focus trap and scroll lock, so the repo has one pattern. If you want to change that approach (for example native `<dialog>`), do not do it here: write a short comparison in the report (top layer ignores z-index and would cover the Toast unless the Toast is also in the top layer, focus trap, Esc, support) and I will decide.
- Reduced motion: no motion is defined in Figma, so open and close without animation, or with a short opacity fade that is removed under `prefers-reduced-motion`. Report what you did.
- Destructive confirmations use the destructive Button (documented in the Figma Info text).

### B2. Popover (Figma `Popover`)

- Panel: width 280, padding 16, gap 8, radius 12 (`--radius-md`), background `Background/Default/Default`, border 1px `Border/Default/Default` INCLUDED in layout, shadow `Shadow/md`, `z-index: var(--z-popover)`.
- Optional title ("Show title"): `Body/SemiBold/body-sm semibold`, `Text/Default/Default`. Body: `Body/Regular/body-sm`, `Text/Default/Secondary`. Free content, can hold links or a small control.
- No arrow and no placement rules in Figma. Do not invent an arrow. Positioning: keep it simple (below the trigger, aligned to its start, with a 8px offset you choose and report; flip above if it would overflow the viewport only if that is cheap, otherwise list it as an open item).
- Behaviour: opens on click; trigger has `aria-expanded` and `aria-controls`; closes on Esc and on click outside; focus returns to the trigger. It does not block the page and does not trap focus (unlike Modal). Panel `role` is not `menu`: use no special role, or `role="dialog"` without `aria-modal` only if it holds interactive content; choose, justify in one line, and document.
- If a Menu panel and a Popover panel share the same visual shell (radius, border, shadow), say so in the report but do not merge the CSS in this lote.

### B3. Lightbox (Figma `Lightbox`)

- Overlay: full screen, background `Background/Utilities/Scrim Strong` (Figma: Neutral ink at 88%, 0xE0) plus a 12px background blur (the Figma effect is a raw background blur, not a style; map it to an existing blur token if one exists, otherwise report). Padding 24. Layer `--z-modal` (200), same level as Modal.
- Panel: image up to 960px wide, radius 16 (`--radius-lg`), `Shadow/lg`, placeholder fill `Background/Default/Secondary`; optional caption below (gap 16), `Body/Regular/body-sm`, white text (the Figma white variable).
- Close button: 36 x 36 circle, white fill and white 1px stroke (included in layout), X icon 20px at 80% opacity with the Icon/Color Neutral mode, positioned at the top-right corner of the panel and 40px ABOVE the image (Figma absolute position x 924, y -40 inside a 960 panel). On narrow screens make sure it stays inside the viewport (report the rule you used). Figma draws no Focus or Hover state for it: use the same focus ring pattern as other circular buttons on a dark surface (the ring colour must have at least 3:1 against the scrim; measure and report) and list the missing states as a Figma gap.
- Behaviour (existing in the repo, verify it still works): opens from an image click, closes with Esc, background click and the close button; focus trap and return; caption comes from the figure caption; image has meaningful `alt`.
- The Dark value of `Scrim Strong` has a known accepted divergence (D-05: Figma `#000000e0`, CSS `#0d0d0fe0`). Do not change it in this lote.

### B4. Avatar (Figma `Avatar`, 3 sizes)

- Circle (`--radius-pill`), fill `Border/Default/Default`, initials `Text/Default/Default`. Small 32 with `Body/SemiBold/body-xs semibold`; Medium 40 with `Body/SemiBold/body-sm semibold`; Large 56 with `Heading/H3`. Initials centred.
- Photo: the image fills the circle (`object-fit: cover`), initials not rendered. With an image, `alt` is the person's name; if the name is already next to it, `alt=""` (decorative). Initials version is decorative when the name is adjacent, otherwise give it an accessible name (`role="img"` plus `aria-label`, or visually hidden text; choose one, justify in one line).
- Contrast of the initials on the fill: measure and report.
- The Figma initials are a text property (default "RM"); in code they are content.

### B5. Tag (Figma `Tag`, States Default, Hover, Focus, Disabled)

- Height 28 (border INCLUDED, so use `box-sizing: border-box` with padding `0 12px`; the width then equals 12 + content + 12 + 2 border, which is the 67px the Figma shows for the label "Tag" with a dismiss icon). Pill radius, gap 4, border 1px `Border/Default/Default`, label `Body/Medium/body-sm medium` `Text/Default/Default`. Default fill `Background/Default/Secondary`; Hover fill `Border/Default/Default`; Disabled fill `Background/Disabled/Default`, border `Border/Disabled/Default`, text `Text/Disabled/Default`, icon in the Disabled mode.
- Dismiss icon (optional, boolean "Show dismiss"): X 14px, Icon/Color Secondary mode (Disabled in Disabled). The whole Tag is the button; the X is a visual cue inside it, not a second button. Removable Tag is a `<button>` with an accessible name like "Remover filtro Design" (the visible label plus the action); Delete or Backspace removes when focused (Figma Info text). Disabled uses `disabled`.
- Focus: ring around the whole Tag, 75 x 36 for a 67 x 28 tag (4px outside each side), ring radius 18 (the ring follows the pill).
- A Tag without dismiss: the Figma Info text says that if it is not interactive, use Badge. Document that rule; do not build a non-interactive Tag variant.
- Known contrast gap: the Tag border measures about 1.29 / 1.28 (Border/Default/Default on the surface) and the fill against the page is lower. This was already on my open list (Tag, Alert and Toast borders). Implement exactly as Figma; measure the Tag border against both the page and the Tag fill, list it in the contrast gaps with the note that the decision is pending. Do not change any colour.

### B6. Accordion (Figma `Accordion item`, Open true/false, States Default, Hover, Focus; Disabled only closed)

- Item: width fills its container (480 in the specimen), padding 16, gap 8 between header and content, only a bottom border 1px `Border/Default/Default` INCLUDED in layout (closed item height 54 = 16 + 21 + 16 + 1). The list is stacked items; the last item keeps its border (as in Figma).
- Header: title `Body/SemiBold/body-sm semibold` `Text/Default/Default`, chevron CaretDown 20px at the right (gap 12), the Icon/Color Secondary mode. Open: the chevron rotates 180 degrees (verified in Figma). Content: `Body/Regular/body-sm`, `Text/Default/Secondary`, hidden when closed.
- Hover: item background `Background/Default/Secondary`. Disabled (closed only): title `Text/Disabled/Default`, chevron Disabled mode.
- Focus: the ring surrounds the WHOLE item (488 x 62 closed, 488 x 112 open, 4px outside), square corners, even though the focus is on the header button. Implement with `:has(.accordion__trigger:focus-visible)` on the item (the repo already uses `:has()`), and keep a plain `:focus-visible` ring on the button as the fallback if `:has()` is unsupported, so focus is never invisible. Check that the ring is not clipped by the container or the neighbouring items.
- Behaviour: header is a `<button>` with `aria-expanded` and `aria-controls` pointing at the panel; the panel has `role="region"` and `aria-labelledby` only when there are 6 or fewer items (otherwise omit, to avoid landmark noise; document the rule). Enter and Space toggle. Disabled uses `disabled`. Closed content is hidden with `hidden` (not just visually). Height animation is not defined in Figma: no animation by default; if you add one, remove it under `prefers-reduced-motion` and report it.
- Existing site usage: if the site already has an accordion or FAQ pattern, align it to the component and list the affected pages with before and after screenshots.

## Part C: docs, changelog, version

- Six docs pages through the builder, each with: purpose, when to use and not use (copy the "use" guidance from the Figma Info text, in the same language the existing pages use), anatomy, states, keyboard and ARIA, tokens used, code notes, working demo. The Modal and Lightbox demos open from a button on the page; make sure they work without breaking the docs layout and that keyboard focus is handled.
- Update the contrast gaps inventory (Tag border, Lightbox close ring, Modal close, Accordion border 1.29).
- Update the z-index docs for the alias (A1) and add the Modal, Popover and Lightbox layers to the table.
- CHANGELOG 2.13.0: Added (six components), Changed (Tab selected weight, GOVERNANCE v1.7, any Lightbox or Accordion alignment), Deprecated (`--z-overlay`), Fixed (Phosphor paths if any). Update version strings everywhere you did for 2.12.0 (`tokens.css`, DESIGN, DESIGN-IMPLEMENTATION, CHANGELOG).
- Run `css:build`, `docs:tokens`, `docs:components`, `docs:review`, `docs:check`. Update the coverage numbers (variants with CSS over Figma variants).
- Snapshots: 6 site pages x 3 widths x 2 themes against clean `main`, same method as before. Explain every stable difference.

## Report additions

1. Part A results A1 to A4, with the Phosphor comparison table (icon, repo vs official, changed or not).
2. For each Part B component: Figma-to-CSS token mapping table, what already existed in the repo and what changed, screenshots for visible site changes.
3. Deviations from this prompt, each with the reason (including Modal footer button width and the Popover role).
4. Decisions to record for the case log, and open questions for me (placement of Popover, Modal vs native `<dialog>`, Figma gaps found: Modal close and Lightbox close states, Accordion Disabled open, etc.).
5. `git status` clean, commit list. Do not push.
