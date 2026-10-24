---
title: Scroll down is sailing south
section: story
subject: A scroll story for Halyard & Hold (fictional), a sail cargo line, following Voyage 14 of its 72-metre schooner Alizé from Le Havre to Santa Marta (6 to 30 March) through the loading, eight noon reports plotted on a chart as the reader scrolls south, the arrival, and a request for space on Voyage 15.
aesthetic: A navigator's plotting sheet in daylight, with white paper, atlantic-blue chart lettering, a dashed track, pencil fixes and the yellow Q flag kept for state, all taken from the ship's own manifest, stowage plan and noon reports.
mode: light
fonts:
  - Special Gothic (Google Fonts), variable wdth 75-125 and wght 400-700. Display and wordmark at wdth 125 / 700, UI at 100 / 500, and data, positions and chart lettering at 87.5 / 500 with tabular figures
  - Crimson Pro (Google Fonts), variable wght 400-600 plus italic 400. Body in roman. Italic is used only for the mate's own words in the noon reports
js: Runs the load sequence that hoists the ship's sails, links the manifest rows to the stowage plan, keeps a ship marker at the reading line of a tall plotting sheet while moving and turning it along the track as the page scrolls south, plots each noon fix and turns the wind barb when the ship reaches that latitude, hoists the arrival Q flag, grows the diesel bars, drives the chapter bar, day links and chapters menu, and handles the space request form in the page.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, CustomEase), Lenis 1.3.26]
tags: [story, scroll-story, chart, plotting-sheet, sticky, shipping, logistics, manifest, form, light, detailed-motion]
use_when:
  - A journey or process that moves along one real axis (latitude, altitude, depth, a kilometre post), with four to ten dated reports along it.
  - The facts already live in documents the subject keeps (a log, a manifest, a plan), and the page can show them as they are.
  - The section ends with a concrete request people can make without leaving the page.
avoid_when:
  - The route doubles back on its axis (an out-and-back trip, a loop, a climb with descents). The marker maps the axis to a single position, so it would jump.
  - Reports that fall closer together than one report's height, even with the axis stretched. The layout needs the tightest gap to hold one report at 360 px.
  - Dark or glossy brands. The idea depends on daylight paper and pencil marks.
---

## Why it works

**The bold idea: scroll down is sailing south.** The crossing is one tall plotting sheet, about 600svh: 41 degrees of latitude from 50° N at the top to 9° N at the bottom, and longitude from 4° E on the right to 80° W on the left. Le Havre sits top right and Santa Marta bottom left. The grid is a stretched inline SVG with `vector-effect: non-scaling-stroke`, so the lines stay hairlines at any size. The latitude scale runs down the left margin. The meridian labels (5° W to 75° W) stay pinned under the day row while the sheet scrolls. A top-down ship marker is `position: sticky` at the reading line, half way down the viewport. It never moves up or down: the sea scrolls up under it. Its x follows the dashed planned track at the latitude under the line, and its rotation follows the track's tangent, eased round each waypoint. When the ship reaches a noon latitude, that fix is plotted in time rather than scrubbed: a pencil circle draws, the dot lands, `1200 9 Mar` and `171 nm` are written in, and a leader draws across to the report. The wind barb on the marker then turns to that day's wind, with its feathers set by the Beaufort force. Scroll back up and the fix is erased. There is no inked travelled line and no trip meter. The fixes are the record.

- **Each report sits at its true latitude, in normal flow.** Each report's `min-height` is the gap to the next noon, `(lat - next) × --deg`, so its top rule lies exactly on its own parallel. If a report were ever taller than its gap, it would push the next one down instead of overlapping it. At 360×640, `--deg` is clamped to at least 92 px, so the tightest gap (Day 20 to Day 24, 3.2°) still holds the longest report with 31 px to spare. This was checked at 360, 390, 768, 1440 and 1600: every report lands on its latitude.
- **The note on the sheet is honest.** It says latitude is drawn many times larger than longitude. The vertical stretch is roughly 16× on desktop and 50× on phones, and the page does not claim a scale.
- **The sheet belongs to the light page.** The voyage is told through daylight documents, so the whole page is plotting-sheet white. Q-flag yellow (`#F4C21B`) is the signal a ship flies on arrival to ask for free pratique. Here it marks only state: the current fix, the active day, the selected lot, hover fills and the focus rule on fields. It appears only as a fill behind ink, never as text on white.
- **The manifest is wired to the stowage plan.** Each square in the profile plan is four pallet positions: 144 squares, 88 of them loaded, heavy goods low and central. Hovering or focusing a lot row lights its squares in stowage order (8 ms stagger), wipes a highlighter under its name, and dims the other rows to a still-AA grey. Hovering a square previews its lot from the other side. A click, tap, Enter or Space pins the lot (`aria-pressed`, left bar), and a polite live caption states pallets, squares and where the lot rides.
- **The numbers add up, and the script checks them.** A `DATA` object holds the lots and the noon fixes. `console.assert` checks that positions total 352, tonnes 304 and squares 88, that every square is four positions, that latitudes fall monotonically (the "sail south" mapping depends on it), that the straight-line legs between fixes are shorter than the 5,040 nm sailed, and that the DOM squares and report latitudes match the data. A failed assert is a console error, so `check-flows` would catch it.
- **The load sequence introduces the ship.** The waterline draws, the headline lines rise, the hull comes up out of the waterline clip and the masts step. Then the four sails hoist on a CustomEase called `hoist`: three hand-over-hand surges with holds, the way a gaff sail goes up. The arrival Q flag goes up its halyard on the same ease.
- **Template chrome avoided.** There are no eyebrows: the place and date are in the H2s. There are no middle dots, no monospace (data uses Special Gothic at wdth 87.5 with tabular figures), no arrows on links, no cards, shadows or gradient washes, and only two radii (3 px for cells, 6 px for controls).
- **Cut on the way:** a pinned horizontal track and a scrubbed route line (both signatures of other designs), the pixel-cell hold cover, the scroll-velocity wake, the hero heel driven by the pointer or by scroll, magnetic buttons, an atlantic chapter with a header colour switch, a trip-meter readout, and, as the last accessory, a flick of the wordmark's pennant on hover. The underline already answers that hover.

## Motion

Tier: detailed. Everything is built in one `gsap.matchMedia` with `motion` and `reduce`; fine-pointer effects need no branch, because hover previews check `pointerType === 'mouse'` and CSS hover sits in `(hover: hover)`. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`), with `lenis.on('scroll', ScrollTrigger.update)`. Under reduced motion there is no Lenis and scroll is native. Every in-page link goes through one handler: `lenis.scrollTo(target, {duration: min(1.3, .65 + distance / 4000)})`, which honours each target's `scroll-margin-top`, the same offset native jumps use. Focus then moves to the target heading. `html.js` is added only when all four libraries loaded. `html.intro` hides only the H1, the ship drawing, the waterline and the bar items, and only under `no-preference`; a 4 s timer removes it whatever happens. Fixes, the flag and the bars get their start states from JS, so a blocked CDN leaves everything visible and the marker hidden. Cleanup removes the ticker, destroys Lenis and clears `intro`. Only transform, opacity, clip-path and stroke-dashoffset are animated; colour changes are CSS transitions on hover and state.

| # | What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| L1 | Waterline draws from the left | SC16 | load, after `document.fonts.ready` capped at 1.2 s | scaleX 0 to 1, .9 s expo.out, t=0 | static |
| L2 | H1 lines rise out of padded masks | TX1 (SplitText) | load | yPercent 110 to 0, 1 s expo.out, stagger .08, t=.15 | no split |
| L3 | Hull, wheelhouse and hatches rise out of the waterline clip | custom | load | y 70 to 0, .9 s power3.out, t=.35 | static |
| L4 | Masts, booms and rigging step up from the deck | custom | load | scaleY 0 to 1, .6 s power2.out, t=.6 | static |
| L5 | Mainsail, foresail, staysail, jib hoist | custom (CustomEase `hoist`) | load | clip-path inset(100% 0 0 0) to inset(-2% 0 0 0), .9 s each, stagger .14, t=.9 | static |
| L6 | Masthead pennant streams out from the mast | custom | load | scaleX 0 to 1, .5 s power3.out, t=1.6 | static |
| L7 | Wordmark, chapter links and menu button settle | LD8 | load | y 4 to 0, opacity 0 to 1, .25 s expo.out, stagger .06, t=1.7 (hero CTAs and body are never hidden) | none |
| S1 | **Signature**: ship marker sticky at the reading line; x follows the track at that latitude, rotation follows the tangent | CSS sticky + ScrollTrigger progress on the lane (`top 50%` to `bottom 50%`) | scroll | x set directly each update (cached widths and headings, refreshed on resize); rotation through `quickTo` .5 s power3.out | x and rotation set directly |
| S2 | Each noon fix is plotted: circle draws, dot lands, time and run written in, leader draws to the report | SC16 (stroke-dashoffset with `pathLength=1`, clip-path write-in) | report top crosses the reading line; reverses at 2.2× on scroll back | ring .6 s power2.inOut; dot .3 s back.out(3) at .35; labels .45 s, stagger .15 at .3; leader .7 s expo.out at .4 | all fixes drawn from the start |
| S3 | Current report: Q-flag rule over its top rule, Q-flag disc behind its fix, `aria-current` on its day link, barb turns to that day's wind and feathers change with the force | TR1-style state swap | same trigger as S2 | rule .5 s expo.out; disc .45 s; barb rotation .6 s power3.out (shortest way) | instant |
| S4 | Arrival Q flag goes up its halyard | custom (same `hoist` ease) | `#arrival` at `top 75%`, once | y 64 to 0, 1.1 s | flag already up |
| S5 | Diesel bars grow to their values; the values are always printed | SC16 (scrub) | `.fuel` `top 80%` to `top 40%` | scaleX 0 to value, ease none | full length |
| S6 | Chapter bar section spy | NV6 | IntersectionObserver, rootMargin `-40% 0 -55% 0` | see I2 | same |
| I1 | Wordmark "Halyard & Hold" | HV2 | hover, focus-visible | underline in from the left .45 s, out to the right | underline static; touch shows it on press |
| I2 | Chapter links: one 2 px bar travels to the hovered or focused link and returns to the current chapter | NV4 + NV6 | hover, focus, current chapter | transform .4 s power3.out; first appearance jumps | jumps |
| I3 | "Chapters" button (below 760 px): label rolls to "Close"; press | MI2 + MI1 + HV4 | click | .3 s power3.out; press .12 s, release .4 s overshoot | instant swap |
| I4 | Chapters menu: panel wipes down, items rise; Lenis stopped, `main` inert, focus on the first item; Escape or Close reverses and returns focus | NV1 | open, close, Escape, item click | panel .7 s expo.inOut, items .55 s power3.out stagger .06 overlapping .3; close at 1.4× | instant show and hide |
| I5 | "Follow the voyage" (ink): Q-flag fill from the entry edge, label flips to ink; press | HV4 + MI1 | hover, focus-visible, `:active` | in .45 s, out .3 s `cubic-bezier(.35,0,0,1)`; press .12 s | colour only |
| I6 | "Reserve space on Voyage 15" and "Change request" (outline): atlantic fill from the entry edge, label flips to white; press | HV4 + MI1 | hover, focus-visible, `:active` | as I5 | colour only |
| I7 | Manifest rows: siblings dim (colour, 4.6:1), highlighter wipes under the name, lot's squares light in stowage order; click pins with a left bar; live caption | HV7 (colour, not opacity) + HV3 + MI1-style bar | hover, focus-visible, click, tap | dim .35 s; wipe .4 s in from the left, out to the right; squares .25 s, 8 ms stagger; bar .3 s power3.out | no stagger, no movement |
| I8 | Stowage squares: hovering a square previews its lot; clicking or tapping pins it (fine-pointer effect) | HV7 mirror | pointer over, click | as I7 | as I7 |
| I9 | "Skip to arrival", mailto, "Back to Le Havre" | HV2 + NV6 | hover, focus-visible | as I1 | static underline; "Skip to arrival" always underlined |
| I10 | Day links (8): Q-flag fill from the entry edge; press; click glides to the report, which lands just past the reading line, so its fix is plotted; focus to the report heading | HV4 + MI1 + NV6 | hover, focus-visible, click | fill .35 s; scroll .65 to 1.3 s | colour; instant jump |
| I11 | Fields: bottom rule darkens on hover; on focus a Q-flag-on-ink rule draws from the left; the select chevron nudges 2 px; errors reveal in reserved space with `aria-invalid`, focus on the first invalid field | MI4 (no floating labels) | hover, focus, submit | rule .35 s expo.out; error opacity and y 4 to 0, .25 s | instant |
| I12 | Pallet stepper: − and + fill from the entry edge and press; each change rolls the count in the submit label (up when more, down when fewer) | HV4 + MI1 + MI2 | click, typing | roll .35 s power3.out | instant text |
| I13 | Submit "Request space for 10 pallets": the form rolls up (clip-path to inset(0 0 100% 0)), the result rolls in from the bottom, focus to its heading; "Change request" reverses and focuses the name field | custom wipe | valid submit | .5 s + .5 s expo.inOut | instant swap |

Hover is checked only in `(hover: hover)`. Every hover effect has the same visual on `:focus-visible`, and fills also show on `:active` for touch. The native cursor is never hidden. Verified in Chromium: load, scroll and hover contact sheets at 1440×900 and 390×844, the reduced-motion branch, the page with the CDN scripts removed, keyboard focus, the mobile menu, day-link jumps, the form errors and result, and `check-flows` (24 clicks, 1 form, 1 external link). Headless Chromium reports `hover: none`, so CSS hover fills were checked through their identical focus states.

## Do not touch

- **The latitude mapping.** Report tops, fix positions, the lane and the sticky marker all use `(50 - lat) × --deg` from one `--deg`. The marker's reading line is `top: 50%`, the ScrollTriggers use `top 50%`, and report jumps land through `scroll-margin-top: calc(50dvh - 3.5rem)`. Change one and you must change all three.
- **Monotonic latitudes.** The marker finds its x by latitude. A route that turns back north breaks it (the assert will say so).
- **Report heights in normal flow.** Never position reports absolutely. `min-height` from the gap keeps the reports aligned and lets them push rather than overlap.
- **No travelled line and no trip meter.** The record is the eight plotted fixes. The dashed planned track stays static.
- **The DATA asserts** and the copy they guard: 352 of 576 positions, 304 t, 88 squares, 5,040 nm sailed against 4,897 nm of straight legs between the fixes.
- **Q flag for state only**, and only behind ink: never yellow text, never decoration, never a headline word.
- **Accessibility wiring:** the chart's text equivalent is the visually hidden figcaption plus the sheet note. The marker, fixes and scales are `aria-hidden`, because every value is printed in the reports. The ship and the Q flag are `role="img"` with titles. Lot rows are buttons with `aria-pressed` and a live caption. Day links carry the full date in `aria-label`. Headings run h1 > h2 > h3.

## Adapting

1. **Tokens first.** Change `--paper`, `--ink`, `--atlantic`, `--slate`, `--dim` and `--qflag`. Keep `--slate` and `--dim` at 4.5:1 or better on the paper, and keep the state colour behind ink only. `--tint`, `--rule` and `--grid` are `color-mix` derivations of the main hue, not new values.
2. **Another journey.** Replace `DATA.noon` (and `depart`, `channel` for the waypoints between reports), the route `points` in the grid SVG (x = 80 − longitude W, y = 50 − latitude), the `--lat` / `--next` / `--lon` inline values on reports, fixes and places, and the scale labels. For an axis other than latitude, keep the method: one `--deg`-style unit, a top value, and positions as `(top − value) × unit`. Keep the asserts.
3. **Sheet height.** `--deg: max(14.5svh, 92px)` sets the whole crossing. Make sure the tightest gap still holds the tallest report at 360×640. The check is: every `.report` top equals `(50 − lat) × --deg` from the chart top.
4. **Retiming or removing motion.** The load sequence is the one timeline under "Load" (delete it, and the `html.intro` rules, to start on the final state). Fix plotting is the per-report `tl` (delete it and fixes stay drawn; the current-state swap keeps working). The flag and the bars are two `fromTo` calls. Hover and focus timings are the `--t-*` and `--e-*` tokens. Deleting the `@media (prefers-reduced-motion: no-preference)` block and the `motion` branch leaves a working static page.
5. **Copy.** Keep reports short (about 100 characters of entry) or raise `--deg`. Replace `freight@halyardandhold.example` with a real address, and the voyage dates and space in the form copy and `DATA.voyage15Open`.

| Token | Role |
|---|---|
| `--paper` | Page ground, the plotting sheet |
| `--ink` | Body text, primary button, fix pencil, focus ring |
| `--atlantic` | Headings, route, chart lettering, marker, outline button, pallet squares |
| `--slate` | Secondary text, place labels |
| `--dim` | Dimmed manifest rows (4.6:1) |
| `--qflag` | State: current fix and report, active day, selected lot, hover fills, field focus rule |
| `--tint`, `--rule`, `--grid`, `--grid-strong` | Field and sail fill, table and report rules, chart grid |
| `--font-sans`, `--font-serif` | Special Gothic, Crimson Pro |
| `--wd-display`, `--wd-ui`, `--wd-data` | Special Gothic width presets: 125, 100 and 87.5 |
| `--fs-xs` … `--fs-hero` | Type scale |
| `--sp-1` … `--sp-9`, `--gutter`, `--maxw` | Spacing scale and page frame |
| `--bar-h`, `--days-h` | Heights of the sticky chapter bar and day row (the meridian labels stick under both) |
| `--deg`, `--scale-w` | One degree of latitude on the sheet; the width of the latitude scale |
| `--r-cell`, `--r-control` | Radius of squares and day cells; radius of buttons and fields |
| `--t-*`, `--e-*` | Interaction durations and easings |
