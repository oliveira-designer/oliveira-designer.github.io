# scripts/

Build and check scripts of the Hope design system. Run them from the repository root with npm.

| Command | What it does |
|---|---|
| `npm run css:build` | Builds `css/hope.css` (generated, never edited by hand) from the CSS sources. |
| `npm run docs:tokens` | Generates `docs/tokens.html`, `docs/index.html` and `docs/data/tokens.json`. |
| `npm run docs:components` | Generates the component pages in `docs/components/` from `docs/data/*.json`. |
| `npm run docs:review` | Generates `docs/components/review.html` (the variant inventory). |
| `npm run docs:check` | Checks the docs against the real CSS, including the all caps rule (D-46). Fails on errors. |
| `npm run snapshots:open` | Open-state snapshots of the Modal, Lightbox and Popover demos (below). Not part of `docs:check`. |

## Open-state snapshots (`snapshot-open-states.mjs`)

A closed Modal or Lightbox is invisible to a full-page snapshot, so this suite opens each demo with a click on its real trigger
and captures it: Modal, destructive Modal, Lightbox and Popover, at 375, 768 and 1280 wide, in Light and Dark. That is 24 PNGs.
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

**Noise and the threshold.** Rendering the same commit twice is pixel-identical on a quiet machine (5 runs, 10 pairs, 24 cases:
0 px everywhere). Under load (other browsers or builds running at the same time) a few scattered pixels can differ, only in Dark,
up to 309 px in the runs seen. The default threshold is 500 px: a Dark case at or under it is `noise`; anything above it, any
size difference, and any difference at all in a Light case is `REAL`. The smallest real difference seen (the 2.14.0 translated
demo strings) was above the threshold by a wide margin, see the CHANGELOG v2.16.0 for the numbers. The limit of the rule: a
change that touches fewer than 500 pixels, in Dark only, is not reported. On a quiet machine use `--threshold 0` to see every
pixel.

Outputs go to `.snapshots/` (listed in `.gitignore`) and are never committed.
