# Prompt 26: align Lote 4 code to the Figma decisions + shared overlay helper + snapshot baseline

Work on a new branch `hope-feedback-e`, created from an up to date `main`. First run `git branch --merged main` and confirm `hope-feedback-d` (2.13.0) is merged. If it is not, stop and tell me. Do not push, merge or open PRs. I run all git commands. `docs/case/decisoes-hope.md` is already in the repo at v0.16; I will replace it with v0.17 myself, so do not touch it.

## Ground rules (same as before)

- Figma is canonical for token and component values (Core `U6ThTndTKYSJKkd0XqaSdV`, Foundation `zFWoSVDJDdZwKmuLJMCs8M`). Repo is canonical for prose, rules and changelog. Read Figma yourself when a value is missing here.
- Never invent CSS token names. Map every Figma variable to an existing name in `tokens.css`; list the mapping in the report. Do not hand-edit `figma-tokens.json`.
- Plus Jakarta Sans only. No mono font. No unlinked typography.
- No em dashes in anything you write (docs, comments, CHANGELOG, commits).
- Focus ring: `--focus-ring-width` 2, `--focus-ring-gap` 2, `:focus-visible` only. Repeat the component radius in its own `:focus-visible` rule (the `reset.css` radius bug from Lote 3).
- Report format as before: summary, results per item, deviations, checks run, open items, final `git status` and commits.
- Version: decide the classification yourself using GOVERNANCE section 3 (now v1.7) and cite the clause. My expectation is PATCH (2.13.1): no new component, no new token, only alignment of existing components to Figma, a refactor and docs. If you add a token or find a rule that says otherwise, tell me before bumping. Do not rewrite the 2.13.0 CHANGELOG entry; correct it with notes in the new entry.

## Order of work

Do A1 (baseline) FIRST, before changing any code, because everything else is compared against it.

## A1. Snapshot baseline (main against main)

The Lote 4 report said page sizes were identical across 36 cases but you had no way to separate noise from real change. Before touching anything:

- On a clean checkout of `main`, run the same snapshot suite you used for Lote 4 (same pages, 3 widths, 2 themes) TWICE, two independent runs of the same commit, and diff run 1 against run 2.
- Report the noise: which pages, widths and elements differ between two runs of identical code (scroll-spy, carousel, transitions, font loading). Save the list as the noise baseline.
- From now on, a diff between this branch and `main` counts as a real change only if it is outside the noise baseline. Re-test each noise point individually (as you did in Prompt 15) when it overlaps a change.
- Also re-run the suite on `hope-feedback-d` against `main` once, and tell me whether the Lightbox and other Lote 4 diffs on the case pages fall inside or outside the noise.

## A2. Lightbox blur: `blur(6px)`

- Change the Lightbox scrim backdrop blur from `blur(12px)` to `blur(6px)`.
- Reason (decided): the Figma background blur radius is effectively double the CSS blur radius. Figma value 12 equals CSS `blur(6px)`; Figma's own code export shows `blur(6px)`. Source: Figma forum threads on blur in Dev Mode (a forum answer, not the official docs, so say that in the note).
- Document the distinction in the Lightbox docs page (a short note near the scrim description), in DESIGN-IMPLEMENTATION, and add an entry to `docs/data/accepted-divergences.json` (Figma 12, CSS 6px, reason: equivalent rendering, Figma radius is double the CSS radius, decider Renan, date 2026-11-24).
- If a blur token exists, use it; if not, keep the literal and list it as an open item. Do not create a token in this prompt.

## A3. Lightbox close button: align to the Figma component `Lightbox close`

Figma now has a real component set `Lightbox close` (node `2570:1148` on page "Lightbox"). Read it and align the CSS. Expected values (verify against Figma, Figma wins):

- 36 x 36 circle. Two layers: glass fill white at 12% opacity (primitive `white`), glass edge 1px white at 18%.
- Icon: X 20px, colour is the primitive `white` in BOTH themes (it does not follow `Icon/Color`, because the Lightbox scrim is dark in both themes). Default opacity 80%.
- Hover: glass fill 22%, glass edge 32%, icon 100%.
- Focus (`:focus-visible`): same as Default plus a ring `Border/Accent/Default` (Solar), 2px with 2px gap (ring 44 x 44 around the 36 circle, radius 22). Measure the ring contrast against the scrim and report it.
- Position: top-right corner of the image, 40px above it (Figma x 924, y -40 inside a 960 panel). Keep the narrow-screen rule you already used so it stays inside the viewport and report the rule.
- Disabled: none.
- Remove the old "Figma gap" note for these states from the data, and update the Lightbox docs page and DESIGN-IMPLEMENTATION. The Figma inventory now has 3 more variants (Lightbox close); update the review page and the variant count and tell me the new totals.
- Record in the docs that the white icon is intentional in Dark too, and that it is a dark mode era item (reevaluate when dark mode lands).

## A4. Popover: align the documented text to the Figma Info

Read the Popover Info text in Figma (page "Popover") and make the docs page and DESIGN-IMPLEMENTATION say the same: no arrow (only the Tooltip has one), placed below the trigger, aligned to its start, 8px offset, flips above if it does not fit. Verify the code does exactly that and fix any difference.

## A5. Modal: X behaviour and narrow-screen rule

Read the Modal Info and description in Figma (page "Modal") and align.

- Close X (20px): it follows the Icon Button Ghost behaviour. Hover: background `Background/Default/Secondary` (map to the CSS token). Focus: ring 2px with 2px gap. Accessible name stays. Icon colour `--icon-color-secondary`. Do not turn it into a new component.
- Narrow screens (approved rule): panel width `min(480px, 100% - 32px)` (16px of margin each side), the body scrolls (`overflow: auto`) while header and footer stay fixed in view, panel `max-height` limited to the viewport (`100dvh` minus the margin). In Lote 4 you used a 24px margin; change it to this rule. Test at 320, 390 and 768 widths, with a long body, and at 200% browser zoom. Report screenshots of 320 and 390.
- Footer buttons: Figma hugs the content: Cancel 85, Confirm 91. In Lote 4 you measured about 96 for Cancel. Find the cause (padding, border, letter-spacing, font fallback during measurement, an extra min-width, the label text itself) and report it. If it is a CSS difference, fix it to match Figma. If it is a measurement artefact, show that with a measurement taken after fonts are loaded.

## A6. Shared focus trap and inert helper

`modal.js` and `lightbox.js` duplicate the focus trap, the inert handling and the scroll lock. Extract them into one shared module (for example `js/overlay.js`; choose the name and say why), used by both. Decision: do it now, accept the three case page edits.

- No bundler: it is a plain script. Update the `<script>` tags on the three case pages and any docs page that loads `modal.js` or `lightbox.js`, in the right order.
- Behaviour must stay IDENTICAL. Prove it with a keyboard script for both components: Tab and Shift+Tab loop inside, Esc closes, focus returns to the trigger, the rest of the page is inert while open and restored after, scroll is locked while open and restored after, and the Lightbox close button receives focus on open (the bug you fixed in Lote 4 must not come back).
- Nested case: a Toast opened while a Modal is open must stay above it and still reachable (it is outside the inert region). State how your helper decides what to make inert so the Toast container is not affected, and show it.
- Compare snapshots of the three case pages against the A1 noise baseline.
- Do not change the pattern to native `<dialog>` (decided: keep the current pattern; reevaluate later together with the Toast and the top layer).

## A7. Accordion without JavaScript (decision: keep as is)

I considered content visible by default and decided against it: an open Accordion at first load can push other elements out of view and looks wrong. So no code change. Do record it: add a known gap `accordion-no-js` in the data (visible only in the data, not on the page, like the other gaps): without JavaScript the items stay closed and their content is not readable; accepted by Renan 2026-11-24; reason above.

## A8. Register the measured contrast gaps (data only, no colour changes)

Add these as known gaps in the data (reason, measured value, status `measured`, accepted by Renan, date 2026-11-24, reevaluate when dark mode lands or with real use):

- Modal panel in Dark: panel against scrim 1.16:1, panel border 1.49:1 (Light: 3.64 and 2.82). 
- Tag, Accordion item, Popover and Menu panel borders at 1.29:1 (Light) as already decided; Tag is the first to reevaluate (possible swap: `Border/Utilities/Input`).

## A9. Docs and changelog

- CHANGELOG entry for the new version: what changed (Lightbox blur and close states, Popover text, Modal X and narrow rule, shared helper, gaps registered), plus corrections to the 2.13.0 notes where Lote 4 text is now outdated (for example the Lightbox close gap and the 24px margin).
- DESIGN-IMPLEMENTATION and the component pages: update only what the items above changed.
- `docs:check` must pass, including the review page totals.

## Not in this prompt

- Toast over an open Modal with a screen reader (VoiceOver or NVDA): I cannot test it now. Do not try to; list it as an open item only.
- Bottom sheet, native `<dialog>`, all-caps lote, Tag/Alert/Toast border decision, dark mode, Neutral surface, `figma-tokens.json` refresh, duplicate `header-height` id: all later.

## Report

Summary; A1 noise baseline (table of noise points); results A2 to A9 with the token mapping for every change; measurements (Cancel width, close ring contrast, 320 and 390 screenshots); checks run and results; open items; final `git status` and commits; the version classification with the GOVERNANCE clause cited.
