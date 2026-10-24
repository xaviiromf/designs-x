---
title: Aisle 14 bins and pallets
section: crud
subject: The night-shift record for Aisle 14 at Sowerby Ridge Distribution, a fictional regional warehouse in West Yorkshire that supplies 38 motor-factor branches; 6 bays by 4 levels of pallet racking plus a 4-slot staging lane at Dock 3.
aesthetic: A rack elevation drawn from the racking itself under high-bay LEDs on the night shift; RAL 5010 blue as the room, orange beams that double as load meters, kraft carton loads, location-label white and RAL 1023 floor-marking yellow.
mode: dark
fonts:
  - Fira Sans 400, 500, 600 (Google Fonts), body, interface and table
  - Fira Sans Extra Condensed 600, 700 (Google Fonts), heading, bin codes, licence plates, level axis
js: "Session-only CRUD for pallets in one racking aisle: typed validation, sortable and searchable list with details, edit and cancel, delete with confirm and stacked undo, reset; pallets move between bins by drag, tap or keyboard with beam-capacity checks; sessionStorage with in-memory fallback; GSAP + Lenis choreography; runSelfTest() on #selftest."
libraries: [GSAP 3.15 (ScrollTrigger, Flip, ScrambleTextPlugin, CustomEase), Lenis 1.3.26]
tags: [crud, warehouse, logistics, racking, pallets, inventory, drag-and-drop, capacity, flip, dialog, undo, session-storage, dark, gsap, lenis]
use_when:
  - Records live in physical places with a capacity, such as bins, shelves, bays, lockers, parking spaces, cold-store slots or berths.
  - Moving a record from one place to another is the main job, and some moves must be refused (weight, size, temperature, hazard class).
  - The team works at night or in a dim control room, and a dark tool fits.
  - The page can carry a scripted, choreographed section (detailed tier).
avoid_when:
  - Records have no location, or the locations do not form a grid you can draw. Use a plain table CRUD.
  - Hundreds of places. The elevation stops being readable after about 40 bins per aisle.
  - The data must persist or be shared between people. Everything stays in one browser tab.
  - A light, editorial page. The ground is a chosen racking blue, and the design depends on it.
---

## Why it works

**The bold idea: you move a pallet onto a beam, and the beam answers.** The section draws Aisle 14 as a front elevation: seven blue uprights, 24 orange beams rated by level (D 800 kg, C and B 1,000 kg, A 1,200 kg), kraft carton loads on timber pallets, and the Dock 3 staging lane behind a yellow floor line. With a mouse or pen you pick up a pallet. It lifts (scale 1.04, a shadow appears), follows the pointer with a velocity tilt, and every bin it passes reads out in a scanner tag and in the visible readout: "14-05-C, empty, takes 1,000 kg, fits" or "14-02-D takes 800 kg, LP-004190 weighs 846.0 kg". The beam under a hovered empty bin fills with a preview of the would-be load and turns red over the rating. On release the pallet is lowered onto the beam with a custom "lower" ease (it decelerates, sinks about 2px, then settles). The beam dips 1.5px and springs back, its meter fills to weight over rating, and the bin's location label decodes to the licence plate. A refused drop slides home, and the beam flashes red once. Tap (touch) and keyboard (Enter, arrows, Enter) reach the same landing through Flip, so everyone sees the same moment. Everything else on the page is quiet and supports it.

- **One rule moves everything.** `canPlace(pallet, bin, list)` checks two things: the bin is empty (or already holds this pallet), and the weight is within the bin's rating. Drag, tap, keyboard, the form's "Put it in" field and undo all call it, so a pallet can never reach a bin by one route that another route would refuse. The seeded LP-004190 (846.0 kg, at the dock) shows the refusal on level D.
- **Orange means load.** Beams are orange steel at 40% with a full-orange meter whose width is weight over rating, so the rack doubles as a load chart: level A's long meters, D's short ones. Orange appears nowhere else. Actions are location-label white (#E9ECE6 on the shed blue, 13.4:1), and the primary button flips to an upright-tinted fill from the side the pointer entered. Yellow (RAL 1023 #F7B500) marks only the two real hazard places: on-hold pallets, which get a striped pallet base plus the word "Hold", and the dock line. Red (#FF7A6B) means overload and errors.
- **The room is racking blue, not slate.** The ground is #13223A and the panels #1B2D47, pushed toward RAL 5010 so the uprights (#5E93D6) read as structure in a blue room. That keeps it apart from the amber-on-slate pages in the collection. The ground is a chosen colour, not a tinted near-black.
- **Numbers are generated, never typed.** The tally ("19 of 24 bins hold a pallet. 3 wait at dock 3 and 2 are on hold. The aisle carries 9,253.2 kg, and 1,800.0 kg waits at dock 3."), the totals row (22 pallets, 1,592 cases, 11,053.2 kg, 19 of 24 bins in use), the filter counts, the per-level kg on the axis title and every readout sentence come from the data. Weights are stored as integer tenths of a kilogram, and sums are integer sums. The self-test asserts these seed sums.
- **Type from postal logistics.** Fira descends from Spiekermann's Meta, drawn for the Deutsche Bundespost: the type of postal logistics, and of things read off a shelf at a distance. Fira Sans Extra Condensed 700 plays the painted aisle-end sign (the H2). Its 600 weight plays the printed location label, used for bin codes, licence plates and the level axis. Fira Sans carries everything else. Tabular figures were checked in Chromium on the served files: at 40px, "1111" and "0000" both measure 89.6px in Fira Sans and 73.6px in Extra Condensed. Codes like 14-04-D keep their capitals because they are real codes, not eyebrow labels.
- **A tool that scrolls like a tool.** The rack is not pinned and nothing hijacks the wheel. Text is never hidden. The load sequence animates only rack structure (uprights rise, beams draw bottom level first, pallets are lowered level A to D), and the tally figures count up from about 96%, so they stay readable throughout.
- **CRUD that respects the floor.** Typed fields with per-type parsers: the licence plate is text (`LP-` plus six digits, upper-cased, unique), product is 3 to 60 characters, cases are an integer from 1 to 500, gross weight is a decimal ("655.5", "655,5" and " 655 " are accepted; "1.25" is refused; 10.0 to 1,200.0 kg), the received date is a date (no future, nothing before 1 Jan 2025, a half-typed date counts as an error), hold is a boolean and "Put it in" is a choice. There is one cross-field rule ("14-02-D takes 800 kg. Choose a lower level or dock 3."). Errors appear inline with `aria-invalid` and `aria-describedby`, and focus goes to the first one. Delete asks first, with "Keep pallet" focused. Undo bars stack (three at most, oldest dropped) and never time out. Undoing into a bin that is now occupied sends the pallet to Dock 3 and says why.
- **Cut at critique.** A high-bay spotlight following the pointer (it competed with the scanner tag), KPI tiles (replaced by the generated tally), section fade-ups and pallet hover lift (lift now only means "you are holding this"), scrambling all 24 labels on load (now one label, only on a drop), monospace codes, and, as the last accessory, the word "Empty" printed under every empty bin (the empty slot already says it, and screen readers still hear it).

## Motion

All JS motion runs inside `gsap.matchMedia` with `motion` (no-preference), `reduce` and `fine` ((hover: hover) and (pointer: fine)) conditions. Lenis runs from `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`). It stops while a dialog is open and is destroyed in the cleanup, which also restores `lagSmoothing(500, 33)`, removes every listener and kills the follower's quickTo tweens. Effects go through an `fx` object whose defaults are instant, so every flow works with the motion layer removed. Durations are `--d-*` tokens. GSAP eases mirror the CSS ones: expo.out = `--ease-out`, power3.out = `--ease-release`, power2.out = `--ease-press`. The custom ease is `CustomEase.create('lower', 'M0,0 C0.25,0.1 0.35,1 0.7,1.1 0.82,1.13 0.9,1 1,1')`. The plan's path had a dangling control pair, so it was fixed to a valid cubic with the same decelerate, sink and settle.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Toolbar links and Reset rise from 40% opacity | LD8 | load (fonts ready, 1.2s fallback) | y 6 to 0, 0.4s expo.out, stagger 0.06, at 0s | none |
| Uprights rise from the floor | SC16 | load | scaleY 0 to 1, 0.6s, stagger 0.05, at 0.1s | static |
| Beams draw, level A first | SC16 | load | scaleX 0 to 1, 0.7s, 0.08s per level plus 0.025s per bay, at 0.35s | static |
| Pallets lowered, A to D, then the dock slides in | custom "lower" | load | y -24 to 0, 0.45s, stagger amount 0.5 at 0.75s; dock x -16 to 0, 0.5s, stagger 0.08 at 1.15s | in place |
| Tally figures count up from 96% | SC13 | load at 1.1s | 0.9s power3.out, snapped to 1 and to 0.1 kg | final values |
| Section spy and sliding bar under Rack, Pallets, Receive | NV6, NV4 | section crosses 50% of the viewport; hover (fine) and focus-visible preview | x and scaleX, 0.4s power3.out (0.35s for hover) | jumps |
| Section links glide and focus the heading | NV6 | click | `lenis.scrollTo`, 1.0s expo-out, offset by the toolbar | native jump |
| Toolbar rule when stuck | SC16 | sentinel passes the top | scaleX 0 to 1, 0.5s expo.out, reverses | static when stuck |
| Table row rules draw | SC16 | table at top 85%, once | scaleX, 0.8s expo.out, stagger at most 0.025 (1s cap) | static |
| Totals count up, then tween on change | SC13 | tfoot at top 85%, once; any CRUD change | 0.9s power3.out from 96%; 0.45s power2.out; filter counts 0.3s | final values |
| Scanner tag follows the pointer over the rack | CU1 | fine pointer over the rack | quickTo x/y 0.35s power3, 16px offset, flips at the rack edge; text rolls in yPercent 100 to 0, 0.25s | none (readout only) |
| Crosshair: level beams, bay uprights, bin code underline | CSS | pallet hover or focus-visible; table row hover or focus | 0.25s | instant |
| Pallet and button press | MI1 | press | scale 0.97 in 0.12s, release 0.45s power3.out (CSS `scale`, composes with GSAP transforms) | none |
| Pick-up and carry | CD4 | mouse or pen moves 6px after press | lift scale 1.04 plus shadow 0.25s; follows with quickTo 0.15s; tilt clamp(-8, 8) from pointer velocity, quickTo 0.2s, settles after 80ms still; bounded to the rack and dock | follows, no lift or tilt |
| Beam preview under the hovered bin | signature | drag over an empty bin | scaleX to weight over rating, 0.3s expo.out, red over rating | instant |
| Landing | signature, Flip, TX4 | drop, tap a target, Enter on a target, Send to dock 3, form save | Flip 0.3s (drag) or 0.7s power3.inOut; lower 0.5s; beam y 0 to 1.5px in 0.1s, back with elastic.out(1, 0.5) in 0.45s; meter 0.4s expo.out; label ScrambleText to the LPN, 0.6s, digits only | instant place |
| Refused drop | signature | drop on an occupied or overweight bin | pallet home 0.45s power3.out; beam flashes over-red once, opacity 1 to 0 in 0.6s | text only |
| Keyboard target marker | NV4 | arrow keys in pick-up mode | dashed frame travels x/y 0.2s power3.out | jumps |
| Empty-bin targets | CSS clip-path draw | hover; always drawn on touch | 0.25s | instant |
| Selection, undo and dialog buttons | HV4, MI1 | pointer enters (fill from that side, leaves by the exit side); focus-visible fills | 0.3s in, 0.2s out | colour change |
| Reset sample aisle, Cancel edit | HV2 | hover, focus-visible | underline sweeps in from the left and out to the right, 0.3s | static underline |
| Filter pill | NV4 | change, hover (fine), focus-visible | clip-path inset, 0.4s power3.out | jumps |
| Row reflow on search, filter and sort | CD5 | debounced input (120ms), filter change, sort | Flip 0.6s power3.inOut, stagger 0.01, leaving rows fade 0.25s. Rows that would cross more than three rows fade in where they land (search and filter only), and rows travel inside a clipped tbody | instant |
| Sort arrow | CSS | direction change | rotate 180deg, 0.3s | instant |
| Changed-row edge bar | state change | add, save, move, undo | yellow bar scaleY 1 to 0, 1.6s | shown 2s, then removed |
| Search and form focus rule | MI4 | focus | bottom rule scaleX 0 to 1, 0.3s | instant |
| Field errors | MI4 | invalid submit | grid-template-rows 0fr to 1fr, 0.25s; no shake | instant |
| Hold checkbox tick | MI4 | check | stroke-dashoffset 1 to 0, 0.3s; 0.12s out | instant |
| Submit label and form heading | MI2 | save; edit or cancel | "Received" or "Saved" for 1.2s, 0.35s; heading 0.3s | instant |
| Received pallet arrives | custom "lower" | rack next in view | y -24 to 0, 0.5s | in place |
| Show it in the rack | NV6 | link | Lenis glide, focus the pallet, pulse scale 1.04 yoyo 0.25s | focus ring only |
| Details and confirm dialogs | CD7 | open, close, Escape, backdrop click | opacity, y 12, scale 0.98, 0.45s expo.out; out 0.25s; bottom sheet (yPercent 100) below 600px; backdrop 0.3s | fade 0.2s |
| Undo bars | D3 | delete, undo, dismiss | yPercent 100 to 0, 0.35s; out 0.25s | instant |

Touch: there is no drag in a scrolling page. Tap a pallet to pick it up, tap "Move here" (or "Too heavy", which explains the refusal), and the same landing plays. There is no follower and no hover preview; buttons fill on `:active`. Load order: the libraries are deferred, and the inline script sets `html.js` and `html.intro` (the hidden rack structure, only with no-preference) before first paint. A 2s timer releases `html.intro` if the libraries are slow. If they fail, `html.js` is removed and every flow keeps working with instant changes.

## Do not touch

- **`canPlace` is the only move rule.** Do not add a check in one route (for example, drag) without moving it into `canPlace`, or the routes drift apart.
- **Integer tenths of a kilogram** for weights and sums. Never store or add decimals.
- **Orange only on beams and meters; yellow only on hold and the dock line; white for actions.** If you add a state, give it a pattern or a word as well as a colour.
- **Text is never hidden.** `html.intro` hides only uprights, beams and pallet bodies, and only with `prefers-reduced-motion: no-preference`. The scramble runs on one label per drop, the label strip is `aria-hidden`, and the pallet button's `aria-label` carries the real licence plate.
- **The readout mirrors the scanner tag.** Every word the tag shows also goes to the visible, polite readout under the rack, so touch, keyboard and screen-reader users get it. Move results go to the readout. Saves, deletes, undo, reset and filter counts go to the separate `#live` region.
- **Dialogs and undo bars animate opacity, not autoAlpha.** `visibility: hidden` on the first frame would stop focus from landing in the dialog or on the Undo button.
- **`#rows { overflow: clip }`** keeps rows that travel during a reflow from flying over the form.
- **Contrast** on the shed blue: label 13.4:1, muted 6.7:1 (5.9:1 on the panels), beam 5.7:1, yellow 8.8:1, red 6.3:1; kraft ink on kraft 5.6:1. Upright blue (5.0:1) is used only for lines and bay numbers.
- **Targets of 44px and up** at 360px: bins are `minmax(0, 1fr)` with the level axis in a 1.25rem column (measured at 360px: bins 52px tall, pallets 44px wide, no horizontal scroll).
- **`TODAY` is fixed** at 2026-10-22, so the seeds, "Days in aisle" and the self-test stay deterministic.

## Adapting

1. **Tokens first.** Change `--shed`, `--deck`, `--deck-2` (the building), `--upright` (the frame colour your racking really uses), `--beam` (the beam colour, also the load meter), `--kraft`, `--kraft-seam` and `--kraft-ink` (the load), `--label` (location labels and actions), `--hold` (your floor-marking colour) and `--over`. Keep text at 4.5:1 or better on `--shed` and `--deck`. Swap `--font` and `--font-code` together; the code face must be narrow and have working `tnum`.
2. **Your aisle.** At the top of the script: `BAYS` (match `--bays` in CSS), `LEVELS` (top to bottom), `RATING` (per bin, in tenths of a kg), `DOCKS` and `DOCK_RATING`, `MIN_T`, `MAX_T` and `MAX_CASES`. Bin codes are built as `14-BB-L`; change the prefix in `RACK` for another aisle. `SEED` rows are `[lpn, product, cases, 'kg', received, hold, bin]`; keep one pallet that a level refuses so the rule shows. Bump the version in `KEY` when the record shape changes.
3. **Another kind of place.** Rename the copy (bins, beams, dock) and keep the model. Capacity can be anything comparable: replace `tenths` and `ratingOf` with volume, temperature class or slot size, and `canPlace` still decides everything.
4. **Retime or remove motion.** Retime with the `--d-*` tokens (load sequence, lift, drag, follow, travel, drop, lower, scramble, return, flash, reflow, count, dialog, undo, edge) and the `--dur-*` tokens for CSS transitions. To drop an effect, delete its override in the motion layer: `fx.land`, `fx.lift`, `fx.refuse`, `fx.reflow`, `fx.count`, `fx.follow`, `fx.arrive`, `fx.pulse`, `fx.flashRow`, `fx.dialogIn` / `dialogOut`, `fx.undoIn` / `undoOut` and `fx.scrollTo` all fall back to instant defaults. Removing GSAP and Lenis entirely leaves a working page with CSS transitions, tap-to-move and native scroll.
5. **Real backend.** All changes pass through `createPallet`, `updatePallet`, `removePallet`, `restorePallet` and the `p.bin = code` line in `tryMove`, each followed by `save()`. Replace `store` with fetches, await the server before `render()`, and repeat `validateRecord` and `canPlace` on the server. Run `#selftest` after any change to a parser, the move rule or the seeds.

| Token | Role |
|---|---|
| `--shed` | Page ground, the cladding under high-bay LEDs; text on white buttons |
| `--deck`, `--deck-2` | Rack back, panels, dialogs, inputs; row hover, filter pill, undo bars |
| `--upright` | Uprights, bay numbers, toolbar rule when stuck |
| `--beam` | Beams (40%) and load meters (100%) only |
| `--kraft`, `--kraft-seam`, `--kraft-ink`, `--timber` | Carton loads, seams, text on cartons, pallet deck boards |
| `--label` | Text, primary buttons, outlines, focus ring, scanner tag |
| `--muted` | Secondary text, field borders |
| `--hold` | On-hold pallet base, Hold tag, dock line, changed-row edge bar |
| `--over` | Overload preview, refused flash, errors, Remove buttons |
| `--fill`, `--scrim`, `--lift`, `--rule` | Primary hover fill, dialog backdrop, pick-up shadow, row rules |
| `--font`, `--font-code` | Fira Sans; Fira Sans Extra Condensed |
| `--fs-xs` to `--fs-xl`, `--fs-2xl`, `--fs-no` | 13, 15, 17, 22, 28px; fluid H2 40 to 68px; pallet number |
| `--w-*`, `--lh-*`, `--tr-code` | Weights, leading, +0.02em tracking on codes |
| `--sp-1` to `--sp-8`, `--gutter`, `--max` | 4 to 72px spacing; 16 to 32px gutter; 1280px measure |
| `--r-pallet`, `--r-control`, `--r-dialog` | 2, 6, 10px radii by hierarchy |
| `--bays`, `--axis`, `--bin-h`, `--beam-h`, `--upright-w`, `--toolbar-h` | Rack geometry (bins 52px tall below 600px) |
| `--dur-*`, `--ease-*` | CSS transition durations and curves |
| `--d-*` | GSAP durations read by the motion layer |
