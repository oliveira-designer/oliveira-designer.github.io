# Prompt 23b: continue Lote 2B (finish what Prompt 23 left open)

Prompt 23 stopped partway. Continue on branch `hope-feedback-b`. Do not redo finished work. Never push or merge. No em dashes in anything you write. All rules and the spec in Prompt 23 still apply (read it again if you have it; Figma values are in that prompt).

## Step 1: take stock (report in the final report, short)
1. `git status` and `git log main..HEAD --oneline`. Confirm the two committed commits (z-index scale plus Toast and Banner fixes; the five component CSS files plus rebuilt `css/hope.css`) and list the uncommitted files.
2. Run `npm run css:build`, `docs:check`, `docs:components`, `docs:tokens`, `docs:review` on the current tree and report which fail. The uncommitted docs and data edits (Alert and Toast data, docs text) have never been checked against these.
3. If anything fails because of the uncommitted edits, fix it. Then commit the docs and data edits from Prompt 23 Part B as their own commit before starting new work, so nothing is lost.

## Step 2: verify the CSS in a real browser (nothing has been rendered yet)
- Render each of the five components (Tooltip, Progress, Spinner, Skeleton, Icon Button) in Chromium, Firefox and WebKit if all three are available to you; if not, say which you could not test.
- Progress: native `<progress>` pseudo-elements, geometry (8px track, pill radius, 37px total with label and value), and whether the fill width transition works in each engine. If the native element cannot match Figma or cannot animate in an engine, switch to the `<div role="progressbar">` fallback described in Prompt 23 and report which engine forced it.
- Spinner: ring and arc geometry (24px, 2.4px ring, arc about 99 degrees from 12 o'clock), the rotation, and the reduced-motion opacity pulse (emulate `prefers-reduced-motion: reduce`). Capture a frame sequence of one turn and report whether the ease-in-out curve looks right, as an observation for Renan.
- Skeleton pulse and Icon Button states (Default, Hover, Focus ring 52 x 52, Disabled), forced colors for all five.
- Fix defects in the CSS you find, in separate commits, and list them in the report.

## Step 3: the rest of Prompt 23
- `DESIGN-IMPLEMENTATION.md` section 5: rewrite the border exception around Figma's `strokesIncludedInLayout` as specified in Prompt 23 Part B.4. Section 8: the z-index scale. Record the DESIGN.md z-index disagreement exactly: quote the DESIGN.md values and the table in Prompt 23 side by side in the report, and do not choose silently.
- Five docs pages (Tooltip, Progress, Spinner, Skeleton, Icon Button) through the generic builder, with gaps and measured contrast; update the Alert and Toast pages, the map, the review page counts and the tokens page. Add the gaps listed in Prompt 23 Part E. The Icon Button deviation (`.icon-btn` instead of `.btn--icon`, because `.btn` carries padding, a gap and a full width under 768px) and the Skeleton duration inference (two periods of `--duration-deliberate`, since Figma gives none) go in as deviations or gaps.
- Contrast, keyboard and forced-colors measurements from Prompt 23 Part D, report only, no color changes.
- Snapshots (13 pages x 3 widths x 2 themes) against clean `main`: site pages 0 differences excluding added custom properties, and 0 computed z-index changes from the z-index scale.
- Measurement table in the browser against the Figma numbers (Tooltip 84 x 40 and 90 x 34, Progress 37, Spinner 24, Skeleton shapes, Icon Button 44 and ring 52).
- Screenshots to `C:\Users\rmour\Desktop\hope-shots-23`.
- Version 2.11.0 (MINOR), same version strings as before, CHANGELOG without em dashes (record the Part B fixes too). GOVERNANCE only if a rule changes; if so, reread section 3 and state the line you applied.
- Commit in small commits by topic. Final report in the Lote 2A format (inventory, z-index lists, components, measured table, contrast and keyboard, docs and counts, governance, snapshots, screenshots, version, decisions for a D-entry, deviations, open questions, commits). Include the z-index lists from Prompt 23 Part 0 (every `--z-*` token with value, every literal `z-index` left in place, the current sticky and header values), which were not in the partial message.
