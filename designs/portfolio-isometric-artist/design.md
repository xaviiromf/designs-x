---
title: Isometric illustrator portfolio with a commission city
section: portfolio
subject: The portfolio of Juno Achterberg, a fictional freelance isometric pixel illustrator in Rotterdam, who since 2019 has drawn 70 commissions of three kinds (key art and tilesets for indie games, editorial illustrations for magazines, wayfinding maps for festivals and campuses) and wants art directors to see the volume and mix at a glance, open six selected projects and write to her.
aesthetic: A sheet of drafting film. A cobalt blueprint ground, paper-white outlines and chalk rules, three flat hues that each mean one kind of commission, one signal orange for whatever is in progress or picked, and every solid on the page (towers, emblems, the hours floor, the confirmation) drawn by one whole-pixel 2:1 isometric box routine on low-resolution canvases scaled up hard.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, always at ELSH 2 and ELGR 1 so its modules are square tiles. Used at 700 for the h2, the readout name and the orange dimension total.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything else, 400 for body, 600 for buttons, keys, links and headings h3 and h4, tabular-nums wherever figures line up (axis labels, readout, tables, facts).
js: "Draws an isometric bar chart of 70 commissions as towers of floor slabs on a pixelated canvas, builds it with a crane as the page scrolls, steps a picked tower apart for counting, regroups it by year or client type, draws the project emblems, the hours floor and the confirmation tower with the same box routine, and runs the project dialog, the enquiry form (nothing is sent) and the links built from a CONTACT constant."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [portfolio, illustrator, isometric, pixel-art, chart, canvas, scroll, dialog, form, dark, gsap, lenis]
use_when:
  - A one-person portfolio whose work comes in a few countable kinds, where the mix over the years is itself an argument (an illustrator, a type designer, a translator, a small studio).
  - The page needs real figures a visitor can check, with a chart that is also the hero picture and a second, smaller chart about process.
  - The brand already lives on a grid (pixel art, tiles, maps, plans), so a blueprint ground and stepped geometry are native to it.
avoid_when:
  - There are fewer than about 20 or more than about 150 items to stack. The towers stop reading as floors.
  - The work has no categories, or more than three. Each kind needs its own hue with nothing else allowed to use it.
  - Photographic or soft, painterly work. Everything here is hard-edged and flat, and the emblems are drawings, not thumbnails.
---

## Why it works

**The one bold idea: the chart is a city, and every commission is a floor.** Juno draws isometric cities, so her figures are one. The first screen is a lot with eight towers, one per year from 2019 to 2026, each a stack of slabs, one slab per commission, coloured by its kind. It is a real bar chart: the towers stand in one row along the lot's anti-diagonal, so they share a baseline, and a y axis with a tick for every commission and a label every second one (every fifth when grouped by kind) reads straight across to each tower's front corner. Everything else on the page is quiet and built from the same box.

- **One routine draws every solid.** `box()` fills a prism column by column in 2:1 isometric projection: top face, wall, a row of window pixels, then the outline pixels. The city, the six project emblems, the confirmation tower and the foundations all come from it, on canvases 44 to about 440 pixels wide that are scaled by a whole number (2 or 3, 4 in the dialog) with `image-rendering: pixelated`. The lot's 16 by 8 pixel tiles are plotted from the same two families of 2:1 lines, so every tower's front corner is a tile corner.
- **Scroll builds it.** On wide windows the first screen is pinned for 70vh while a crane's hook carries each slab down in whole 4-pixel steps and sets it; the scrub position is the number of slabs placed, floor by floor across all towers. Scrolling back takes them off. The page opens with the foundations and the two lowest floors, so nothing hides the chart: the readout and the table always hold the full figures. On narrow windows there is no pin, and the same scrub runs while the plot crosses the viewport.
- **Survey instead of a tooltip.** A picked tower separates into its floors, 3 canvas pixels apart, bottom to top, so each commission can be counted, and an orange dimension line with a tick per floor and the total in Handjet stands beside it. Other towers do not dim. The readout names the tower and its counts by kind.
- **Colour has jobs.** `--blueprint` #0C3F8F is the ground and the lot. `--paper` is text, the primary button slab and tower outlines. `--chalk` is secondary text, the axis and resting rules and edges. `--games` yellow, `--editorial` pink and `--maps` mint each mean one kind of commission and appear only on floors, chips, swatches and emblems of that kind (each has one darker `-side` tone for the shaded wall). `--crane` orange is work in progress or picked by the visitor: the crane, the focus ring, the dimension line, the ruler's marker, the walls of lifted tiles, the picked legend rim, the confirmation's pennant. `--fault` is validation errors only. `--lot-line` is grid lines only (the lot, the guides, the editor grid on buttons). `--deep` and `--scrim` are deeper steps of the same blue; there is no black anywhere.
- **Filters stay in the drawing.** A chip switches the floors of its kind to hollow paper outlines; its own swatch goes hollow too. The grouping toggle regroups the same 70 rows into three towers, and the axis relabels.
- **A second chart with the same grammar.** Where the hours go is a 10 by 10 floor, one tile per hour in a hundred, in four tones from chalk to paper by phase. Picking a phase lifts its tiles 4 canvas pixels in an anti-diagonal sweep, and their walls show in the picking orange.
- **Text alternatives.** Both canvases are `aria-hidden`. Chart A has real buttons under every tower (a roving-tabindex group), a live readout and a table of commissions by year and kind, which also lists the floors of a held tower from the ground up. Chart B has legend buttons with `aria-pressed`, a live readout and a table.
- **Data first.** `DATA.commissions` (70 rows of year, kind, client, title), `DATA.hours`, `DATA.projects` and `CONTACT` sit at the top of the script. Every count, tower, tick, table, option and link is computed from them.
- **Flows.** "Ask for a quote" and "See six selected projects" are anchors; each project opens a native dialog; "Ask for a quote like this" closes it, selects that kind in the form and moves focus there. The form validates on submit with specific messages on reserved lines, moves focus to the first bad field, clears an error when the value becomes valid, and confirms in place with the answers echoed back and a tower one floor tall per answer. "Change this enquiry" brings the form back with its values.
- **Semantics.** The section's `h2` is the first heading; bands use `h3`, projects and the form `h4`; the dialog's title is an `h2` in the top layer. Corner clip-paths sit on inner spans, never on the `a` or `button`, so the orange focus ring is never clipped.

**Nearest designs in the ledger, and the difference.** features-cyberdeck-kit scrubs a falling-block assembly: there the blocks are parts of a product; here every slab is a row of data and the result is a chart that stays readable and pickable. hero-racing-arcade also draws on a low-resolution canvas: that is a perspective road in a permanent loop; this is an isometric still, repainted only when its state changes. story-speedrun-marathon builds tiles in at load: here only the lot's rows are laid, and the headline lands on it line by line.

**Deviations from the brief, and why**

- **A tower's pick area is its footprint extruded up to the jib,** not its exact silhouette. At load the towers are two floors tall, and a silhouette that grows when the floors step apart flickers under a still pointer. The left and right limits and the 2:1 base edges are still the isometric footprint.
- **A regroup removes one floor from every tower every 20 ms,** then adds one floor to every tower every 20 ms, not one slab at a time across the lot (70 slabs twice would take 2.8 s). The whole change takes under 0.8 s.
- **Floors are 8 canvas pixels thick by year and 3 by client type,** so a 12-floor and a 26-floor tower both fit the 196-pixel canvas with room to step apart. The axis relabels (every 2, every 5).
- **The hours floor lifts 4 canvas pixels** (12 CSS pixels at 3x, 8 at 2x), so the lift is a whole pixel step at every scale.
- **The confirmation tower counts the email too:** name, email and kind always, plus the deadline and the words when given (3 to 5 floors).
- **Anchor buttons wait 160 ms before the page moves,** so the pressed slab is seen. Lenis's own anchor handling is off for that reason.
- **Keys, chips and legend buttons** were unspecified: under the pointer they show the 8px editor grid at once, and their rim is orange while pressed. Both are instant.
- **The readout sits under the plot** with the table disclosure in the same row, so the first screen fits a 1280 by 600 window.

## Do not touch

- **Whole pixels.** Canvas sizes are set in canvas pixels and scaled by an integer (`px` is 2 or 3; CSS sizes for the emblems, the hours floor and the confirmation tower are exact multiples of 44, 164 and 44). A fractional scale blurs every edge. Keep `image-rendering: pixelated`.
- **`box()` and the lot share one lattice.** Footprints are multiples of 8 pixels, pitches multiples of 16, tiles 16 by 8, and the lot is anchored on the first tower's front corner. Change one and the base outlines leave the tile lines.
- **The towers share a baseline** (they step along the anti-diagonal). That is what makes the city a chart. Do not arrange them along an isometric axis.
- **The canvas is 196 pixels tall** because a 26-floor tower stepped 3 pixels apart needs it. `gapOf()` shrinks the gap before a tower can leave the canvas; do not shorten the canvas instead.
- **Hues keep their jobs.** Yellow, pink and mint never decorate; orange is never a kind; errors are never orange. Windows are holes in the ground colour, lit ones (the confirmation) are paper.
- **Labels are DOM text over the canvas** (axis numbers, year buttons, the dimension total), positioned from the same geometry, so they stay sharp. Do not draw text into the low-resolution canvas.
- **Hidden states exist only under `html.js:not(.go)`** and are undone for reduced motion. Without the libraries the `js` class is never set, the city is drawn complete, and picks, regrouping, the dialog, the form and both charts work in plain JavaScript.
- **No loops.** `draw()` runs once per state change. Stepped jobs (survey, regroup, sweep, topping out) add one ticker callback while they run and remove it when the last job ends; all of them finish within a second and can only be started from a control that is on screen, so there is nothing to pause off screen.
- **The dialog** is a native `showModal()`: Close, Escape and a backdrop press that started on the backdrop close it, focus returns to the opener, it scrolls inside itself, Lenis stops while it is open, and `settle()` recovers from a close the browser forces mid-animation.
- **Press states are classes** (`.is-down`), held 160 ms on buttons and 200 ms on links from `pointerdown`. `:active` alone would not show on a quick tap.

## Motion

House stepping: nothing eases. Every change is a hard cut, a `steps(1, end)` keyframe set, a zero-duration transition with a delay, or a repaint of canvas pixels in whole-pixel steps. Colours change instantly. Only transform, opacity, visibility cuts and canvas pixels move. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, and `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling. The load sequence waits for the fonts (1.5 s timeout) and for a visible page.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Lot laid in rows | Canvas repaint, `S.lot` rows of 16 by 8 tiles from the back | Load (fonts ready, page visible, scrollY under 40) | One row every 40 ms (`--d-diag`), 6 to 8 rows by year, at most 14 ticks | Lot complete |
| First floors placed | Canvas repaint, `S.cap` slabs | After the lot | One slab every 20 ms (`--d-slab`), 16 slabs | City complete |
| Headline lines land | `gsap.set` on each `.ln`: cut in at -32px, -16px, 0 (`--drop` 16px) | After the lot; bottom line first, top line last | 70 ms a step (`--d-drop`), 140 ms a line; lede, buttons and hint cut in when the top line lands; about 0.8 s in all | All visible |
| Construction (signature scroll) | ScrollTrigger scrub sets `S.q`; the hook carries slab `floor(q)` down in 4-pixel steps and sets it | 1200px and wider: first screen sticky for `--build` 70vh. Narrower: plot top at 80% of the viewport to plot centre at its centre, never under 240px | Scrubbed; two floors stand at progress 0, all 70 at progress 1 | Complete, no pin, native scroll |
| Survey (pointer) | Canvas repaint, `S.sep` floors stepped 3 pixels apart; orange dimension line; DOM total | `pointermove` over a tower's footprint column; hovering a label | One floor every 30 ms (`--d-floor`), bottom to top | Instant |
| Survey, touch | Same | Tap a tower; tap elsewhere on the lot to let go; tap a label | Same | Instant |
| Survey, keyboard | Same | Tab into the labels under the lot (roving tabindex); arrow keys, Home and End move the pick; Enter or Space toggles; Escape lets go | Same | Instant |
| Regroup | Canvas repaint, `S.limit` floors | "By year" / "By client type" | Every tower loses its top floor every 20 ms (`--d-slab`) until the lot is clear, then the new grouping gains one floor every 20 ms | Instant |
| Hollow floors | Canvas repaint | Kind chips | Instant | Instant |
| Hours floor pick | Canvas repaint, tiles on diagonals up to `S.sweep` lifted 4 pixels | Legend button, or a click or tap on a tile; again to set down | One anti-diagonal every 33 ms (`--d-sweep`), 19 diagonals | Instant |
| Button hover, editor zoom | `.g16` shown by a `steps(1, end)` keyframe, then `.g8`, face and label colours by zero-duration transitions delayed 70 ms (`--d-zoom`) | Hover, focus-visible; on touch the press | 16px grid, then at 70 ms the 8px grid and the paired colour | Final state at once |
| Button press, nudge | `.is-down .face` translate 4px, 4px onto the chalk side face | pointerdown, Enter, Space | Held at least 160 ms (`--d-hold`); anchors move the page after that | Same, instant |
| Text link staircase | Eight `i` segments, each `translateY(-1px x index)`, zero-duration transitions delayed 20 ms apart (`--d-stair`); chalk to paper | Hover, focus-visible; press, held 200 ms (`--d-tap`) | 140 ms up, same down | Instant |
| Key, chip, legend hover and press | 8px grid background; orange rim while pressed | Hover, active | Instant | Instant |
| Field ruler | `.ruler` visibility cut; marker `translateX(n x 8px)` from the measured text width | Focus; input and change move the marker | Instant jumps | Same |
| Field error | Ruler ticks and bottom rule switch to `--fault`; message on the reserved line | Invalid submit | Instant | Same |
| Project sheet stands up | `@keyframes stand`, `steps(1, end)`: 2:1 matrix flat on the lot, tilting, nearly upright, upright; content visibility cuts in on the last frame | "Open the project sheet" | 280 ms, four frames (`--d-stand`) | Instant |
| Project sheet lies down | `@keyframes lie`, three frames, content hidden at once | Close, Escape, backdrop, "Ask for a quote like this" | 210 ms (`--d-lie`) | Instant |
| Topping out | Canvas repaint: windows switch to paper floor by floor, then the pennant | Valid submit | 110 ms a floor (`--d-top`), pennant on the step after the last floor | Final tower at once |

## Adapting

1. **Replace the data.** Edit `DATA.commissions` (one row per item, oldest first), `DATA.kinds` (three keys with three labels each), `DATA.current`, `DATA.hours` (shares adding to 100), `DATA.typical`, `DATA.projects` and `CONTACT`. Counts, towers, ticks, tables, form options and links follow. A new kind key needs a `--<key>` and `--<key>-side` token and a `.k-<key>` rule.
2. **Map the brand onto the tokens, keeping the jobs.** One ground, one text colour, one rule colour, one hue per kind, one hue for picked or in progress, one for errors. Check each hue at 4.5:1 on the ground if it ever carries text, 3:1 otherwise. Derive `--deep`, `--scrim` and `--lot-line` from the new ground, never from black.
3. **Retitle the claim.** The `h2` is three `.ln` spans; each lands as one slab. Keep them to about 13 characters at 92px in the 34% column, or lower `--t-h2`.
4. **Redraw the emblems.** `EMBLEMS` lists boxes as `[u, v, du, dv, z, h, palette, windows]` on a 44-pixel canvas, back to front; `k` takes the project's kind hue, `p` paper, `c` chalk.
5. **Tune the chart.** `H`, `BY`, `JIB` and `GAP` in the city module set the canvas height, the baseline, the jib row and the survey gap. Floor thickness is `floor(96 / tallest tower)` clamped to 3 to 8. The first floors shown before scrolling are `minP` (levels 0 and 1).
6. **Retime or remove motion.** Every duration is a `--d-*` token. To drop the pin, delete the two `html.fx` rules; the narrow-window scrub takes over. To drop the construction, delete the ScrollTrigger and leave `S.q` at its default: the city is drawn complete. The survey, regroup, sweep and topping-out jobs are the four `fx` methods; without them every change is instant.
7. **In a framework,** render the markup statically, keep the plain-JS part as one effect and the `gsap.matchMedia` block as another that returns its cleanup (it clears the jobs, kills the ScrollTrigger and timeline, destroys Lenis and redraws the still frames).

| Token | Role |
|---|---|
| `--blueprint` | The ground and the lot, #0C3F8F; ink on paper faces |
| `--deep`, `--scrim` | Deeper steps of the ground: field wells and the sheet (paper 11.2:1, chalk 7.3:1), the dialog backdrop |
| `--lot-line` | Grid lines only: lot tiles, guides, the editor grid, table rules (2.0:1 on blueprint, 4.6:1 on paper) |
| `--paper` | Text (9.1:1), the primary slab, tower outlines, lit windows |
| `--chalk` | Secondary text (6.0:1), the axis, resting rules, button side faces |
| `--tone-1` ... `--tone-4` | The hours floor's four phases, chalk to paper (3.2:1, 4.9:1, 7.0:1, 9.1:1) |
| `--games`, `--games-side` | Game commissions (6.9:1) and their shaded wall |
| `--editorial`, `--editorial-side` | Editorial commissions (4.7:1) and their shaded wall |
| `--maps`, `--maps-side` | Wayfinding map commissions (7.0:1) and their shaded wall |
| `--crane` | In progress or picked: crane, focus ring, dimension line and total, ruler marker, lifted tiles, pennant (4.7:1) |
| `--fault` | Validation errors only (5.4:1 on blueprint, 6.6:1 on deep) |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2`, `--lh-body` | Type scale: 13, 17, 19, 21, 28, 40 (Handjet numerals), clamp(56px, min(6.2vw, 12svh), 92px); body leading 1.5. Phones: 16, 17, 19, 24 |
| `--cell`, `--s1` ... `--s8` | The 8px cell and the spacing scale, 4 to 96 |
| `--notch`, `--nudge`, `--tap`, `--hit` | Stepped corner (4px), slab thickness and press travel (4px), control height (48px), minimum target (44px) |
| `--max-w`, `--gutter` | Content width 1392px and the side gutter (24px, 16px on phones) |
| `--build`, `--drop` | Pinned scroll distance of the construction (70vh); one step of a landing headline line (16px) |
| `--emblem`, `--floor-w` | CSS sizes of the emblem (132px, 88px on phones) and the hours floor (492px, 328px): whole multiples of their canvases |
| `--d-zoom`, `--d-hold`, `--d-stair`, `--d-tap` | Button zoom step 70 ms, press hold 160 ms, staircase segment 20 ms, link tap hold 200 ms |
| `--d-stand`, `--d-lie` | Sheet up in 280 ms, down in 210 ms |
| `--d-diag`, `--d-drop`, `--d-slab`, `--d-floor`, `--d-sweep`, `--d-top` | Lot row 40 ms, headline step 70 ms, slab or floor of a regroup 20 ms, survey floor 30 ms, hours diagonal 33 ms, topping-out floor 110 ms |
