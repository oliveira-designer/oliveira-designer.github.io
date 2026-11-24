# Prompt 24: Lote 3 (Navigation) + carryover fixes

Work on branch `hope-feedback-c`, created from an up to date `main` (Lote 2B, v2.11.0, must already be merged; if `main` does not contain it, stop and tell me). Do not push, merge or open PRs. I run all git commands.

## Ground rules (same as before)

- Figma is canonical for token and component values. Repo is canonical for prose, rules and changelog. Core file key `U6ThTndTKYSJKkd0XqaSdV`, Foundation `zFWoSVDJDdZwKmuLJMCs8M`. Read Figma yourself when a value is missing here; do not guess.
- Never invent CSS token names. Map every Figma variable to an existing name in `tokens.css` and list the mapping in your report. `figma-tokens.json` is a stale manual snapshot (it lacks `Stroke/medium` code syntax, `Border/Utilities/Input` and the z-index variables), so do not trust it over `tokens.css` or Figma.
- Plus Jakarta Sans only. No mono font, no mono token. No unlinked typography.
- No em dashes in any prose, docs, comments or commit text you write.
- Border rule (DESIGN-IMPLEMENTATION section 5): depends on Figma `strokesIncludedInLayout` on the component root. I verified: Tab = true (no discount), Menu panel = true (no discount, panel is 238 = 220 content + 16 padding + 2 border). Breadcrumb and Pagination items have no stroke on the root.
- Component review before public exposure: do not expose anything new on the public site beyond the docs pages.
- Report format as in previous lotes: what changed, deviations from this prompt with reasons, token mapping, checks run, open items.

## Part A: carryover fixes (do first, one commit each when practical)

A1. Header z-index. Figma Foundation now has `z-sticky` = 10 (published). Make the site header use `--z-sticky`. Remove `--z-overlay` (it was 100 and tied with the modal scrim). Remove the `--z-max` 9999 mention from DESIGN.md and any docs text (it does not exist in `tokens.css`). Update the z-index section of the docs so the final scale reads: base 0, raised 1, sticky 10, modal-scrim 100, modal 200, popover 300, tooltip 400, notification 500. Check every use of the removed token with grep and report the list. Leave `lightbox.css` z-index 1 and `sections.css` z-index -1 as they are, but list them in the report.

A2. Spinner rotation is now LINEAR (decided; Figma Core updated and published). Change the rotation keyframes timing to `linear`, 1s per turn, infinite. The reduced-motion opacity pulse and the Skeleton pulse stay `ease-in-out`. Update the Spinner docs text, the DESIGN-IMPLEMENTATION motion notes and the demo so they say linear for rotation and ease-in-out only for pulses.

A3. Progress track token. Figma now binds the Progress track fill to `Border/Utilities/Input` (was `Border/Default/Default`), for 3:1 contrast with the page. Use the existing CSS token for `Border/Utilities/Input` (`--color-border-input`, confirm in `tokens.css`). Then compute and report the contrast of the fill (`Background/Neutral/Default`) against the new track; I need that number. Spinner track (1.29:1) and Skeleton stay as they are, as documented gaps. Update the contrast gap inventory in the docs: Progress track leaves the list, Spinner track and Skeleton stay with the reason "track is a guide, the arc/state is announced via role=status" and "contested in the literature, no normative text".

A4. Icon Button icon colour roles. In Figma the icon colour is the `Icon/Color` variable with a mode set on the component. Verified mapping: Primary Default, Hover and Focus use mode "On Neutral" (Foundation calls it "Neutral" now, Core may still show the old name until the library update is accepted; use the CSS role that matches the Foundation name); Primary Disabled uses Disabled; Ghost Default uses Secondary; Ghost Hover uses Default; Ghost Focus uses Secondary; Ghost Disabled uses Disabled. Verify that the code applies exactly these `--icon-color-*` roles per variant and report any mismatch (fix it if it is a code bug).

A5. First focus stop on `index.html`. In the 23b run a first-focus diff appeared against `main` and you called it noise. Re-verify against `main` with the same method and report either "identical" or the exact difference.

A6. Field inner offsets. Input, Textarea, Select, Checkbox, Radio and Switch have `strokesIncludedInLayout` = true with FIXED outer size in Figma (Input 254x44, padding 12, stroke 1), so the outer size is unaffected, but the inner text and thumb offsets were never verified. For each, read the Figma inner geometry (text x offset from the box edge, checkbox/radio inner mark, switch thumb inset) and compare with the CSS. Report a table (component, Figma value, CSS value, delta). Fix only deltas of 1px or more that are clearly a border-box vs content-box mistake; list anything else as an open item instead of fixing it.

## Part B: Lote 3 components

For all four: add the component CSS file following the existing per-component structure, add the docs page through the data-driven builder (`components-content.json`, `components-code-notes.json`; no hand-made pages, no inline style in demos, `docs:check` must pass), and add Figma-derived values to DESIGN-IMPLEMENTATION. Focus ring everywhere: `--focus-ring-width` 2 and `--focus-ring-gap` 2, colour from `Border/Utilities/Focus Ring`, via `:focus-visible` only.

### B1. Tabs (Figma component `Tab`, set 2412:20)

- Item: height 40 fixed, padding 0 16, horizontal, centred, gap 0. Min visible width follows the label (the 80 in Figma is the specimen "Tab label").
- Text: `Body/Medium/body-sm medium` when not selected; `Body/SemiBold/body-sm semibold` when selected (weight change so selection does not depend on colour alone).
- Not selected: Default text `Text/Default/Secondary`; Hover text `Text/Default/Default` (no background); Disabled text `Text/Disabled/Default`.
- Selected: text `Text/Default/Default`, bottom line 1.5px (`--border-width-medium`), colour `Background/Neutral/Default`. Hover is identical to Default. Disabled selected: text and line both `Text/Disabled/Default`.
- The bottom line is a stroke INCLUDED in layout (Figma: sides 0/0/1.5/0, strokesIncludedInLayout true). The 40px height already contains the 1.5px, so do NOT discount anything and do not make the item taller when selected. Implement with a `box-sizing: border-box` item and a transparent 1.5px bottom border on every tab so unselected and selected tabs have the same height and the label does not jump.
- Focus: ring 2px with 2px gap around the whole item (Figma ring is 88x48 for an 80x40 item, so it sits 4px outside each side). Radius of the ring: square corners as in Figma (no radius set).
- Tablist baseline: a 1px line `Border/Default/Default` under the whole list (documented in the Figma Info text). The selected tab line sits on top of it. Check in the Figma specimen frame "Tabs" how the baseline and the selected line overlap (does the 1.5px line cover the 1px baseline or sit beside it) and copy that.
- Behaviour and ARIA: `role=tablist`, `role=tab` with `aria-selected`, `aria-controls`, `role=tabpanel` with `aria-labelledby`. Roving tabindex (selected tab tabindex 0, others -1). Left/Right arrows move and activate (automatic activation), Home/End jump to first/last, skip disabled tabs. Disabled tabs use `aria-disabled=true`. Only the selected tab is in the tab order; Tab key then moves into the panel (panel gets tabindex 0 only if it has no focusable content).
- Guidance (from Figma): 2 to 6 tabs, short labels; if the items are page destinations use navigation, not Tabs. This must appear in the docs "When to use".
- Does not need JS beyond a small progressive script; place it where the other component scripts live and keep the no-JS state readable (all panels visible is NOT acceptable; first panel visible, others `hidden`).

### B2. Breadcrumb (Figma `Breadcrumb item`, set 2413:51)

- Item: horizontal, gap 8, centred vertically, padding 0. Label `Body/Regular/body-sm`. Separator is a CaretRight icon 14px, after the label, with the default Icon/Color mode.
- Link: Default text `Text/Default/Secondary`; Hover text `Text/Default/Default`; Focus text `Text/Default/Default`.
- Current: text `Text/Default/Default`, `Body/Medium/body-sm medium`, no link, no hover, never focusable. Use `aria-current="page"` on it. In Figma the Current variant still draws a separator; in code the last item must NOT render a separator (documented as optional in Figma). Say so in the docs.
- Focus ring: around the LABEL only, not around label plus separator. In Figma the ring is 40x29 around a 32x21 label, so 4px outside each side (2px gap + 2px ring). D-30 stands: `:focus-visible` on the `<a>` only. Because the separator is a sibling element or a pseudo-element, make sure the ring does not include it (separator must not be inside the `<a>`).
- Markup: `nav` with `aria-label="Breadcrumb"`, `ol`, `li` per item. The separator is decorative: use CSS (pseudo-element or `aria-hidden` icon), never read by screen readers. If you use the real Phosphor CaretRight icon, follow the existing icon pipeline; do not draw a new SVG by hand.
- Narrow screens (documented in Figma): collapse the middle levels. Implement the collapsing as a documented pattern with a demo; if it needs an ellipsis control, use the Pagination Ellipsis look (36x36 is too big here, so just a text-sized "..." button is NOT in Figma: do not invent it, instead document the collapse as a code note and keep the demo to wrapping behaviour, and list the missing Figma piece as an open item).
- Use only for hierarchies with two or more levels.

### B3. Pagination (Figma `Pagination item`, set 2413:261)

- Item: 36x36, radius 12 (`--radius-md`), horizontal, centred. Number text `Body/Medium/body-sm medium`.
- Number: Default text `Text/Default/Default`, no background; Hover background `Background/Default/Secondary`; Current background `Background/Neutral/Default` with text `Text/Neutral/Default`; Disabled text `Text/Disabled/Default`. Current is the only state that is not just colour (dark fill), and the current item gets `aria-current="page"`.
- Prev and Next: same 36x36 r12 box with a 20px CaretLeft/CaretRight icon. Default and Hover (background `Background/Default/Secondary`), Focus, Disabled. Disabled icon uses the Icon/Color Disabled mode (I just fixed this in Figma: before it was missing; Focus variants for Prev and Next were also missing and now exist).
- Ellipsis: 36x36 with a 20px DotsThree icon, Default only, not interactive (a `span` with `aria-hidden` or a `li` without a link; do not make it focusable).
- Focus ring: 44x44 around the 36x36 item, ring radius 16 (`--radius-lg`), 2px + 2px gap.
- Prev is Disabled on the first page and Next on the last: use `aria-disabled="true"` with no `href` (or `disabled` on a button if you build it from buttons; choose one and document it; keep it consistent with how Button disabled is done in the repo).
- Markup: `nav` with `aria-label="Paginação"` (Portuguese, as in Figma), a `ul` of `li`. Icon-only buttons need a descriptive `aria-label` ("Página anterior", "Próxima página"). Number links can use `aria-label="Página 3"`; the current one keeps `aria-current="page"`.
- Use ellipsis to collapse long sequences; document one worked example (for example 1 ... 4 5 6 ... 20) in the demo.
- Tabs, Pagination and Menu mark "current" in three different ways (bottom line, dark fill, light fill with check). Write this comparison in the docs; it is deliberate.

### B4. Menu (Figma `Menu item` set 2413:380 and `Menu` panel 2413:381)

- Menu panel: vertical, padding 8, gap 4, radius 12 (`--radius-md`), background `Background/Default/Default`, border 1px (`--border-width-normal`) `Border/Default/Default`, shadow `Shadow/md`. The border is INCLUDED in layout in Figma (panel 238 wide = 220 item width + 16 padding + 2 border), so do not discount it. Item width fills the panel; the Figma 220 is the specimen. Use `z-index: var(--z-popover)` for the open panel.
- Divider: 1px line `Border/Default/Default` between groups, full inner width of the panel (220 in the specimen). Destructive actions go last, after a divider.
- Menu item: height 36, padding 0 12, gap 8, radius 8 (`--radius-sm`), label `Body/Regular/body-sm`, optional 16px Check icon on the right (only when selected).
- Default tone: Default text `Text/Default/Default`; Hover background `Background/Default/Secondary`; Focus ring (below); Selected background `Background/Default/Secondary`, label `Body/SemiBold/body-sm semibold`, Check visible; Disabled text `Text/Disabled/Default`.
- Danger tone: text `Text/Danger/Default`; Hover background `Background/Default/Secondary`. There is no Danger Focus, Selected or Disabled variant in Figma: Focus ring is the same as Default; do not invent Danger Selected or Danger Disabled, list them as open items only if you think they are needed.
- Focus ring: around the item, 228x44 around a 220x36 item (4px outside), ring radius 12. Inside a panel with 8px padding this ring will be clipped unless the panel allows it: the ring sits inside the 8px padding, so it fits; verify visually that it is not clipped by `overflow`.
- ARIA and keyboard: trigger has `aria-haspopup="menu"`, `aria-expanded`, `aria-controls`. Panel `role="menu"`, items `role="menuitem"` (use `menuitemradio` or `menuitemcheckbox` with `aria-checked` if the item is selectable; Selected in Figma means a chosen option, so document which one the demo uses). Arrows Up/Down move focus, Home/End jump, Esc closes and returns focus to the trigger, Tab closes. Typeahead is out of scope. Disabled items use `aria-disabled="true"` and are skipped by arrow navigation.
- Select already uses this panel visually (documented in Figma). Do NOT refactor Select in this lote; only check that Select's open panel visually matches the Menu panel (radius, border, shadow, padding) and report differences as open items.
- Popover is for free content (Lote 4), not part of this lote.

## Part C: docs, changelog, version

- Add four docs pages (Tabs, Breadcrumb, Pagination, Menu) through the builder. Each with: purpose, when to use and not use, anatomy, states, keyboard and ARIA, tokens used, code notes and a working demo. Portuguese for UI strings in demos (as in Figma), English for technical notes if that is the current convention of the docs; follow whatever the existing pages do.
- Update the contrast gap inventory (A3) and the z-index scale docs (A1).
- Add a "Navigation" group to the docs navigation if it does not exist.
- Bump version to 2.12.0 (MINOR: new components plus token usage changes), update CHANGELOG with Added, Changed (Progress track token, Spinner linear, header z-index), Removed (`--z-overlay`, `--z-max` text), Fixed (anything from A4 to A6). Verify GOVERNANCE section 3 rules for MINOR vs PATCH; and while you are there, tell me how GOVERNANCE 1.6.1 would be classified under section 3 (I flagged a doubt about PATCH vs MINOR).
- Run `docs:check` and the full test/lint scripts used in the previous lotes; report results.
- Do not edit `figma-tokens.json` by hand.

## Part D: decisions to record in the report

List, so I can add them to the case log: header moved to `--z-sticky`; Spinner linear rotation; Progress track token and the fill/track contrast number; Tabs line included in layout; Breadcrumb last item without separator; Pagination Prev/Next Focus and Disabled icon (Figma fixes done by me); Menu panel border included in layout; every deviation you made from this prompt.

## Report format

1. Summary (5 lines max).
2. Part A items A1 to A6 with result.
3. Part B per component: what was built, Figma-to-CSS token mapping table, deviations.
4. Checks run and their output (short).
5. Open items and questions for me.
6. Final `git status` and the commit list. Do not push.
