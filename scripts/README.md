# scripts/

Build and check scripts of the Hope design system. Run them from the repository root with npm.

| Command | What it does |
|---|---|
| `npm run css:build` | Builds `css/hope.css` (generated, never edited by hand) from the CSS sources. |
| `npm run docs:tokens` | Generates `docs/tokens.html`, `docs/index.html` and `docs/data/tokens.json`. |
| `npm run docs:components` | Generates the component pages in `docs/components/` from `docs/data/*.json`. |
| `npm run docs:review` | Generates `docs/components/review.html` (the variant inventory). |
| `npm run docs:check` | Checks the docs against the real CSS, including the all caps rule (D-46) and the typography literals (D-52). Fails on errors. |
| `npm run snapshots:open` | Open-state snapshots of the Modal, Lightbox and Popover demos (below). Not part of `docs:check`. |

## Open-state snapshots (`snapshot-open-states.mjs`)

A closed Modal or Lightbox is invisible to a full-page snapshot, so this suite opens each demo with a click on its real trigger
and captures it: Modal, destructive Modal, Lightbox and Popover, at 375, 768 and 1280 wide, in Light and Dark. That is 24 PNGs.
Since 2.18.0 it also captures the Bottom Sheet and the destructive Bottom Sheet at 375 and 390 wide (a narrow-screen component), in Light and
Dark: 8 more PNGs, 32 in all. A checkout whose page does not exist (a baseline from before 2.18.0) skips those cases and prints which ones, so
`--control` against an older `main` still compares the 24 cases both have and lists the new ones as "only in the candidate".
Nothing that ships changes: the demos, the CSS and the JavaScript are the real ones. It uses Playwright, which is already a
devDependency (`npm install`; if a browser is missing, `npx playwright install chromium`).

```
npm run snapshots:open                                   # captures the working tree into .snapshots/open/<timestamp>/
node scripts/snapshot-open-states.mjs --out <dir>        # captures into <dir>
node scripts/snapshot-open-states.mjs --root <checkout>  # captures another checkout, for example a git worktree of main
node scripts/snapshot-open-states.mjs --compare <dirA> <dirB> [--threshold N]
```

Typical use: capture `main` (a worktree) and your branch, then compare the two folders. `--compare` prints, for each case, the
number of differing pixels and their bounding box, marks the case `noise` or `REAL`, and exits 1 when any case is `REAL`.

**`--control`: detect the noise instead of guessing it.**

```
node scripts/snapshot-open-states.mjs --control --baseline <checkout> [--root <checkout>] [--threshold N]
```

It captures the baseline twice and the candidate once (`--root`, default this working tree), prints the noise floor (baseline capture 1
against baseline capture 2), then compares the candidate with the baseline. A case that is not identical between the two baseline captures
cannot be judged: it is reported as `INCONCLUSIVE` with its floor and is never `REAL`. Exit code: 1 when a case is `REAL`, 3 when there is
no `REAL` case but a difference landed in a noisy case, 0 otherwise. If the floor says "0 px in all cases", a difference below is a real
difference at that moment. It costs three captures (about two and a half minutes). Repeat a pair that shows a difference before interpreting it.

**Environment fingerprint.** Every capture prints, and saves in `fingerprint.txt` next to the PNGs, one block: browser and version, Playwright
version, the browser flags, OS, CPU and a 400 ms load sample, free memory, device scale factor, the GPU renderer string and the Node version.
It is there so that a change of browser, flags, scaling or load shows in the output. `--compare` warns when the two sets were captured with
a different first line (browser and flags).

**What is known about the noise (25 November 2026, measured on one machine).**

- *What was seen.* Rendering the same commit twice was not always pixel-identical. Between 15:41 and 16:30 about 4 of the 24 cases differed
  in a set of 5 captures (43 noisy cases in 50 captures, 0.86 per capture); from about 16:35 the rate was a few percent of that.
  **The cause of that window was not identified.** The browser (Chrome 158.0.8127.38, installed before the first zero-noise runs of 24
  November), Playwright (1.60.0), the OS build, the GPU drivers and the long-running processes (Figma, Chrome, VS Code) were the same before,
  during and after it. The earlier runs that gave 0 px (Prompts 29 and 30) were not under a recorded fingerprint, so what they had in common
  cannot be proven.
- *Where it was.* Two kinds, each with a few fixed variants (the same pixel counts came back: 313, 602, 605, 611, 776, 778, 801 and so on):
  glyph edges of small semibold text (the 11px section labels, the nav links, the buttons of the docs chrome) in the Modal and Popover pages;
  and single pixels 1 level apart in the Lightbox thumbnail (a 2218 by 2686 PNG shown at most 960 px wide), mostly at 375 wide.
- *Ruled out as the cause (no effect on the noise).* Animations, transitions, the text caret and the screenshot `animations` option; fonts
  (Plus Jakarta Sans was loaded in all 120 logged captures); parallel pages; CPU load (up to 100% with six busy processes, the noise did
  not grow); `deviceScaleFactor` and `--force-device-scale-factor=1`; `--disable-gpu` alone; the bundled Chromium (148) instead of Chrome;
  waiting for two frames and 500 ms, waiting for the network, and decoding the images before the screenshot.
- *Flags the suite now uses: `--font-render-hinting=none` and `--disable-gpu`. They are preventive and were not demonstrated to be a fix.*
  Hinting off gave 0 noisy cases in the captures where it was tested (11 captures at 16:10 to 17:05, five of them inside the noisy window),
  `--disable-lcd-text` also gave 0 (11 captures, not adopted), and with `--disable-gpu` the Lightbox thumbnail was identical in 40 of 40
  captures (1 of 40 differed without it, 8 of 40 with GPU rasterization forced). But the sample is small, the baseline itself became quiet right after the noisy window, so the effect
  was never shown against a baseline that was noisy at the same time, and the mechanism is not proven. With both flags on, 5 consecutive
  pairs of `main` against `main` gave 0 px in all 24 cases, but rare noise was still seen afterwards: a text variant of 776 px in
  `modal-1280-light` and a 2-px, 1-level variant in `lightbox-375-light`, in 3 of the 24 captures taken with both flags. Treat the suite as "much less noisy",
  not "deterministic", and use `--control`.

**What "quiet machine" means now.** Nothing measured says a quiet machine is more deterministic: the noise did not grow with CPU load or
with parallel pages, and it changed over time with the load unchanged. Do not rely on it. Rely on the control and on repeating a pair that
shows a difference.

**The threshold.** The default threshold is 500 px: a Dark case at or under it is `noise`; anything above it, any size difference, and any
difference at all in a Light case is `REAL`. These numbers were set from the first measurements, before the noise was understood. The noise
seen later includes Light cases of up to 801 px, so on a noisy moment the rule can report a `REAL` that is only noise; `--control` avoids
that by marking such cases `INCONCLUSIVE`. The smallest real difference seen (the 2.14.0 translated demo strings) was 2,323 px. Use
`--threshold 0` to see every pixel.

Outputs go to `.snapshots/` (listed in `.gitignore`) and are never committed.

## Firefox screenshots do not show `backdrop-filter`

Firefox screenshots, both Playwright's and Firefox's own `--screenshot`, do not include `backdrop-filter`. Measured in Prompt 39 on the
Lightbox (Firefox 150, headed): the Playwright screenshot changed 0 pixels between the real 6px blur and no filter, while an OS capture of
the same window changed 124,773 (Chromium's screenshot: 125,907). The blur is drawn on screen. For Firefox, verify these effects by the
computed value or by an OS capture. The explanation, a capture path that bypasses WebRender (Mozilla bug 1657997, as cited by the
[BrowserStack Percy note](https://www.browserstack.com/docs/percy/common-issue/firefox-backdrop-filter-effects)), is a supported
hypothesis, not proven here.
