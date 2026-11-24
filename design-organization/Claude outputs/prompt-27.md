# Prompt 27: Hope feedback F (Menu Danger states, cleanup of the six Lote 4 pages, open-state snapshots, caps trial)

Context: branch `hope-feedback-e` (2.13.1) is merged into `main` by Renan before you start. Work on a new branch `hope-feedback-f` from an updated `main`. Do not push, merge or run any git command that changes remote state. Renan runs all git. Do not use em dashes in any text you write (docs, comments, changelog, commit messages).

Rules that still apply: Plus Jakarta Sans only; no unlinked typography; Figma is canonical for token and component values, the repo is canonical for prose, rules and changelog; docs content in English (D-15); no new tokens unless stated.

Run the full baseline first: snapshots of `main` against `main` (same suite as Prompt 26), so the noise classes are known before any change.

## A1. Menu item Danger states (CSS)

Figma Core now has 10 Menu item variants (was 7). The three new ones are `Tone=Danger` with `State=Focus`, `State=Selected` and `State=Disabled`. Read them from the Figma Core library (`U6ThTndTKYSJKkd0XqaSdV`, component set `Menu item`, node `2413:380`) through the Figma MCP and take values from there, not from this prompt. What I documented in Figma:

- Danger Focus: same as Default Focus (ring, spacing), text uses `Text/Danger/Default`.
- Danger Selected: text semibold in `Text/Danger/Default`, check icon in the `Danger` mode of `Icon/Color`.
- Danger Disabled: identical to Default Disabled. It exists only so a Tone switch never lands on a missing combination.

Implement them in CSS, update the variant inventory (expected 202 of 202 with CSS, up from 199), the Menu review page, and `figma-tokens.json` if the extraction pipeline needs a refresh. Check contrast of Danger text on the Focus and Selected backgrounds in Light and Dark and record the numbers in the docs, as you did for the Lightbox ring.

## A2. Hide "Code notes" on the six Lote 4 pages

Decision by Renan (D-44): the "Code notes" sections do not show on the six new pages (Modal, Lightbox, Popover, Accordion, Toast, Tooltip, or whichever six Prompt 25 created; list them in your report). Older pages never showed them, which matches D-35 (minimal content on component pages). Add a one-line filter in `build-components-doc.mjs` so the section is not rendered. Keep the data (the gaps inventory stays in the JSON, including `accepted-divergences.json`). Do not delete the generation code, only the rendering. Confirm `docs:check` still passes and that the gaps remain queryable from the data.

## A3. English demo strings

The Modal demo uses "Cancelar" and probably other Portuguese strings. Docs content is English (D-15). Scan the six Lote 4 pages and their demos for Portuguese strings (labels, aria-labels, titles, placeholders, alt text) and translate them. Report the list of strings changed. After the change, re-measure the Cancel and Confirm buttons (expected 84.09 and 90.66 at Figma labels) and confirm nothing else shifted.

## A4. Open-state snapshots

Closed Modal and Lightbox are invisible to the snapshot suite, so it never sees their real visual. Add open-state cases for the Modal demo and the Lightbox demo (Light and Dark, the three existing widths) to the suite. Use whatever mechanism is cleanest (a `?open` query on a snapshot-only fixture, or a script step that opens the demo before capture), but it must not change what ships to users. Run the new cases twice on the same commit to establish their own noise baseline and report it. Add Popover open too if it is cheap.

## A5. Docs: Modal X hover 28px

Record in the Modal docs that the X hover is a 28px circle (`--color-bg-alt`) with the icon moving to `--icon-color-default`, and that the Figma component description and Info now say the same (D-44). The Figma Core library needs a republish by Renan to carry this, so say in the report whether anything in the docs depends on the unpublished state.

## A6. Caps trial (visual only, no migration)

Background (D-39, D-44): the code has 22 `text-transform: uppercase` rules, all with `letter-spacing: 0.12em`, in 18 files of `css/` and 4 of `docs/docs.css`. The Core library uses none of this. Renan wants to choose by eye between two options before anything migrates.

- Option A: sentence case, using the existing `Body/SemiBold/body-xs semibold` text style, no `text-transform`, no 0.12em tracking.
- Option D: keep caps, but consolidated into one style named `Label/label-caps` (12px, the weight and tracking currently used), limited to labels of up to three words.

Do this on a throwaway branch or an uncommitted working tree, three cases only:

1. Eyebrow of the case card.
2. Section number in the case page.
3. Status badge in the header.

For each case produce before, option A and option D screenshots, Light and Dark, at desktop and phone widths, saved side by side in one folder with clear names. Do not migrate the other 19 rules. Do not commit the trial. In the report, list the 22 rules by file with the text they style and its word count, so Renan can see which would violate the three-word limit under D. Also say which of them could only exist in A without losing meaning.

Do not decide. Renan chooses after seeing the screenshots. If A is chosen later, `PATTERNS.md` line 252 (image caption anti-pattern, which cites `label-caps`) needs rewording; flag it, do not edit it now.

## A7. Docs, changelog, version

- Changelog entry for what ships (A1 to A5). The trial (A6) leaves no trace in the changelog.
- Classify the version against GOVERNANCE section 3. Note that section 3 lists "expansion of scale (more sizes, more variants)" under MINOR, and A1 adds three variants to Menu item. State your classification and the clause that supports it. Renan decides if it is not obvious.
- Update the docs inventory pages and counts.
- `docs:check` must pass.

## Report format

Same structure as Prompt 26: one section per item with what changed, files touched, numbers measured, and what you did not do. End with: open items, decisions you need from Renan, and anything that contradicted this prompt. Separate documented facts (with source) from your inference.

## Out of scope (do not touch)

Blur token (no token matches, stays literal; `--blur-glass` is 24px with saturation). Toast over Modal keyboard reach and screen reader testing (pending, to be handled with the native `<dialog>` evaluation). Dark mode work. Sidebar width. Tag, Alert and Toast border reevaluation.
