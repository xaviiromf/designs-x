---
title: Aisle 14 bins and pallets
section: crud
subject: The night-shift record for Aisle 14 at Sowerby Ridge Distribution, a fictional regional warehouse in West Yorkshire that supplies 38 motor-factor branches; 6 bays by 4 levels of pallet racking plus a 4-slot staging lane at Dock 3.
aesthetic: A rack elevation drawn from the racking itself under high-bay LEDs on the night shift; RAL 5010 gentian blue as the room, lit blue uprights, orange beams that double as load meters, kraft carton loads, location-label white and floor-marking yellow.
mode: dark
fonts:
  - Hubot Sans, variable wdth 75-125 and wght 200-900 (Google Fonts), the only family; wdth 75 / 760 for codes and licence plates, wdth 125 / 700 for the heading and level letters, wdth 100 / 620 for interface, wdth 100 / 420 for body
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
- **Orange means load.** Each beam is drawn as orange steel: full-orange top and bottom lips around a dark web (22% orange in the shed blue), and a full-orange meter fills the web to weight over rating, so the rack doubles as a load chart: level A's long meters, D's short ones. The lips keep the beam orange and separate from the brown pallet deck boards (2.6:1 against `--timber`). Orange appears nowhere else: the readout and the scanner tag carry no coloured rule. Actions are location-label white (#E9ECE6 on the shed blue, 12.0:1), and the primary button flips to an upright-tinted fill from the side the pointer entered. Floor-marking yellow (#F2C230) marks the two real hazard places: on-hold pallets, which get a striped pallet base plus the word "Hold", and the dock line; in the table "Hold" is a yellow word, and the same yellow is the one-time edge bar on a changed row. Red (#FF8577) means overload and errors.
- **The room is the racking.** The ground is RAL 5010 gentian blue taken down to the night shift (#0E2B4C), the rack back and panels a step up (#173B63), and the uprights are the lit face of the frame (#7FAEE0). That keeps it apart from the slate darks that recur in the collection (features-mixing-plugin sits at #1A232C). It is the only dark design in the crud section.
- **Numbers are generated, never typed.** "The aisle" means the racking; dock 3 is named on its own, because a pallet on the dock floor loads no beam. The tally ("19 of 24 bins hold a pallet. 3 wait at dock 3 and 2 are on hold. The aisle carries 9,253.2 kg, and 1,800.0 kg waits at dock 3."), the totals row (22 pallets, 1,592 cases, 11,053.2 kg, 19 of 24 bins in use), the filter counts, the per-level kg in each level's accessible name and every readout sentence come from the data. The readout starts with the bin code or licence plate set in the code width, like a scanner printout. Weights are stored as integer tenths of a kilogram, and sums are integer sums. The self-test asserts these seed sums.
- **One machined family, three widths.** Hubot Sans is the mechanical sibling of Mona Sans; its squared, machined forms suit stencilled location labels and painted aisle-end signs. The width axis carries the role: wdth 125 / 700 is the painted sign (the H2 and the level letters), wdth 75 / 760 is the printed location label (bin codes, licence plates, pallet numbers), wdth 100 / 620 is the interface and wdth 100 / 420 is the body. All figures are tabular, except in the H2, where "14" is a sign, not data. Tabular figures were checked in Chromium on the served files: at 40px, "1111" and "0000" both measure 80.0px at wdth 75 / 760, 103.5px at wdth 100 and 115.2px at wdth 125. Hubot draws its zero with an inner bar and has no plain-zero alternate; on a warehouse floor that is a feature, because 0 and O never get confused on a licence plate. Codes like 14-04-D keep their capitals because they are real codes, not eyebrow labels.
- **A tool that scrolls like a tool.** The rack is not pinned and nothing hijacks the wheel. Text is never hidden. The load sequence animates only rack structure (uprights rise, beams draw bottom level first, pallets arrive solid and are lowered level A to D, each beam dipping slightly as its load lands). Figures never count up on load: the tally and totals print their final values, and they only tween when a move, receive, edit or delete changes them.
- **CRUD that respects the floor.** Typed fields with per-type parsers: the licence plate is text (`LP-` plus six digits, upper-cased, unique), product is 3 to 60 characters (counted as characters, not UTF-16 units), cases are an integer from 1 to 500, gross weight is a decimal ("655.5", "655,5", "655.50" and " 655 " are accepted; "1.25" is refused; 10.0 to 1,200.0 kg), the received date is a date (no future, nothing before 1 Jan 2025, a half-typed date counts as an error), hold is a boolean and "Put it in" is a choice. There is one cross-field rule ("14-02-D takes 800 kg. Choose a lower level or dock 3."). Errors appear inline with `aria-invalid` and `aria-describedby`, and focus goes to the first one. Delete asks first, with "Keep pallet" focused. Undo bars stack (three at most, oldest dropped) and never time out. Undoing into a bin that is now occupied sends the pallet to Dock 3 and says why.
- **Cut at critique.** A high-bay spotlight following the pointer (it competed with the scanner tag), KPI tiles (replaced by the generated tally), section fade-ups and pallet hover lift (lift now only means "you are holding this"), scrambling all 24 labels on load (now one label, only on a drop), monospace codes, the word "Empty" printed under every empty bin (the empty slot already says it, and screen readers still hear it), and, as the last accessory, the little hazard swatch in front of "Hold" in the table: the stripe now lives only where it encodes a real place, the pallet base and the dock line.

## Motion

All JS motion runs inside `gsap.matchMedia` with `motion` (no-preference), `reduce` and `fine` ((hover: hover) and (pointer: fine)) conditions. Lenis runs from `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`). It stops while a dialog is open and is destroyed in the cleanup, which also restores `lagSmoothing(500, 33)`, removes every listener and kills the follower's quickTo tweens. Effects go through an `fx` object whose defaults are instant, so every flow works with the motion layer removed. Durations are `--d-*` tokens. GSAP eases mirror the CSS ones: expo.out = `--ease-out`, power3.out = `--ease-release`, power2.out = `--ease-press`. The custom ease is `CustomEase.create('lower', 'M0,0 C0.25,0.1 0.35,1 0.7,1.1 0.82,1.13 0.9,1 1,1')`. The plan's path had a dangling control pair, so it was fixed to a valid cubic with the same decelerate, sink and settle.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Toolbar links and Reset rise from 40% opacity | LD8 | load (fonts ready, 1.2s fallback) | y 6 to 0, 0.4s expo.out, stagger 0.06, at 0s | none |
| Uprights rise from the floor | SC16 | load | scaleY 0 to 1, 0.6s, stagger 0.05, at 0.1s | static |
| Beams draw, level A first | SC16 | load | scaleX 0 to 1, 0.7s, 0.08s per level plus 0.025s per bay, at 0.35s | static |
| Pallets lowered, A to D, then the dock slides in | custom "lower" | load | each load appears solid (opacity set to 1 at its start), then y -40 to 0, 0.5s, 0.5s spread across all loads from 0.75s; its beam dips 0.75px and springs back (half the signature); dock x -16 to 0, 0.5s, stagger 0.08 at 1.15s | in place |
| Section spy and sliding bar under Rack, Pallets, Receive | NV6, NV4 | section crosses 50% of the viewport; hover (fine) and focus-visible preview | x and scaleX, 0.4s power3.out (0.35s for hover) | jumps |
| Section links glide and focus the heading | NV6 | click | `lenis.scrollTo`, 1.0s expo-out, offset by the toolbar | native jump |
| Toolbar rule when stuck | SC16 | sentinel passes the top | scaleX 0 to 1, 0.5s expo.out, reverses | static when stuck |
| Table row rules draw | SC16 | table at top 85%, once | scaleX, 0.8s expo.out, stagger at most 0.025 (1s cap) | static |
| Totals tween on change | SC13 | a move, receive, edit, delete, undo or reset | 0.45s power2.out from the old value; filter counts 0.3s | final values |
| Scanner tag follows the pointer over the rack | CU1 | fine pointer over the rack | quickTo x/y 0.35s power3, 16px offset, flips at the rack edge; text rolls in yPercent 100 to 0, 0.25s | none (readout only) |
| Crosshair: level beams, bay uprights, bin code underline | CSS | pallet hover or focus-visible; table row hover or focus | 0.25s | instant |
| Pallet and button press | MI1 | press | scale 0.97 in 0.12s, release 0.45s power3.out (CSS `scale`, composes with GSAP transforms) | none |
| Pick-up and carry | CD4 | mouse or pen moves 6px after press | lift scale 1.04 plus shadow 0.25s; follows with quickTo 0.15s; tilt clamp(-8, 8) from pointer velocity, quickTo 0.2s, settles after 80ms still; bounded to the rack and dock; Lenis stopped until the drop; Escape, window blur and pointercancel send it home | follows, no lift or tilt |
| Beam preview under the hovered bin | signature | drag over an empty bin | scaleX to weight over rating, 0.3s expo.out; over the rating it turns red and runs past the upright, up to 1.25 times the beam | instant |
| Landing | signature, Flip, TX4 | drop, tap a target, Enter on a target, Send to dock 3, form save | Flip 0.3s (drag) or 0.7s power3.inOut; lower 0.5s; beam y 0 to 1.5px in 0.1s, back with elastic.out(1, 0.5) in 0.45s; meter 0.4s expo.out; label keeps "LP-" fixed and ScrambleText decodes the six digits, 0.6s, chars 0-9 | instant place |
| Refused drop | signature | drop on an occupied or overweight bin | pallet home 0.45s power3.out; beam flashes over-red once, opacity 1 to 0 in 0.6s; the readout says what happened and where it fits ("LP-004190 (846.0 kg) is too heavy for 14-02-D, rated 800 kg. It went back to dock 3. Levels A to C take it.") | text only |
| Keyboard target marker | NV4 | arrow keys in pick-up mode; arrows stay on the same level or bay when there is a free bin there | dashed frame travels x/y 0.2s power3.out | jumps |
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
| Received pallet arrives | custom "lower" | rack next in view | appears solid, y -40 to 0, 0.5s | in place |
| Show it in the rack | NV6 | link | Lenis glide, focus the pallet, pulse scale 1.04 yoyo 0.25s | focus ring only |
| Details and confirm dialogs | CD7 | open, close, Escape, backdrop click | opacity, y 12, scale 0.98, 0.45s expo.out; out 0.25s; bottom sheet (yPercent 100) below 600px; backdrop 0.3s | instant |
| Undo bars | D3 | delete, undo, dismiss | yPercent 100 to 0, 0.35s; out 0.25s | instant |

Touch: there is no drag in a scrolling page. `touch-action: none` is set on pallets only for a fine primary pointer (mouse or pen), so a finger on a pallet still scrolls the page. Tap a pallet to pick it up, tap "Move here" (or "Too heavy", which explains the refusal), and the same landing plays. There is no follower and no hover preview; buttons fill on `:active`. Load order: the libraries are deferred, and the inline script sets `html.js` and `html.intro` (the hidden rack structure, only with no-preference) before first paint. A 2s timer releases `html.intro` if the libraries are slow, and once it has fired the load sequence is skipped, so a late library never blanks and replays the rack. If they fail, `html.js` is removed and every flow keeps working with instant changes.

## Do not touch

- **`canPlace` is the only move rule.** Do not add a check in one route (for example, drag) without moving it into `canPlace`, or the routes drift apart.
- **Integer tenths of a kilogram** for weights and sums. Never store or add decimals.
- **Orange only on beams and meters; yellow only for hold, the dock line and the changed-row bar; white for actions.** If you add a state, give it a pattern or a word as well as a colour.
- **Text is never hidden.** `html.intro` hides only uprights, beams and pallet bodies, and only with `prefers-reduced-motion: no-preference`. The scramble runs on one label per drop, the label strip is `aria-hidden`, and the pallet button's `aria-label` carries the real licence plate.
- **The readout mirrors the scanner tag.** Every word the tag shows also goes to the visible, polite readout under the rack, so touch, keyboard and screen-reader users get it. Move results go to the readout. Saves, deletes, undo, reset and filter counts go to the separate `#live` region.
- **Dialogs and undo bars animate opacity, not autoAlpha.** `visibility: hidden` on the first frame would stop focus from landing in the dialog or on the Undo button.
- **`#rows { overflow: clip }`** keeps rows that travel during a reflow from flying over the form.
- **The list switches to two-line rows below 900px** (LPN, Hold and bin on the first line; product and weight on the second, with weight right-aligned under the bin), and the "Sort by" select replaces the column headers, with both directions for every column so a header sort never leaves it blank. The seven-column grid needs about 816px, so a lower breakpoint brings back horizontal scroll.
- **Contrast** (WCAG, measured): label on shed 12.0:1, on deck 9.6:1, on deck-2 8.1:1; muted on shed 7.7:1, on deck 6.1:1, on deck-2 5.2:1; yellow on shed 8.5:1, on deck-2 5.8:1; red on shed 6.0:1, on deck 4.8:1 (the Remove button in dialogs); kraft ink on kraft 5.6:1; shed text on the label-white buttons 12.0:1, on the hover fill 9.7:1; scanner tag (shed on label) 12.0:1. Beam orange as a meter: 5.1:1 on shed, 4.1:1 on deck. Upright lines: 6.2:1 on shed, 4.9:1 on deck when lit, 3.5:1 on deck at the idle 75% opacity. Upright blue is never used for small body text; the bay numbers are 15px heavy codes at 6.2:1.
- **Targets of 44px and up** at 360px: bins are `minmax(0, 1fr)` with the level axis in a 1.25rem column (measured at 360px: bins 52px tall, pallets 44px wide, no horizontal scroll).
- **`TODAY` is the real date, never earlier than 2026-10-22** (the newest seed), so received dates up to today are accepted and "Days in aisle" is live. The self-test only uses dates that hold on any later day.

## Adapting

1. **Tokens first.** Change `--shed`, `--deck`, `--deck-2` (the building), `--upright` (the frame colour your racking really uses), `--beam` (the beam colour, also the load meter), `--kraft`, `--kraft-seam` and `--kraft-ink` (the load), `--label` (location labels and actions), `--hold` (your floor-marking colour) and `--over`. Keep text at 4.5:1 or better on `--shed`, `--deck` and `--deck-2`, and upright lines at 3:1 on `--deck` at their idle opacity. To swap the family, pick one with a width axis and working `tnum` and keep the `--wd-*` roles; without a width axis, use a separate condensed face for `.code` and its siblings.
2. **Your aisle.** At the top of the script: `BAYS` (match `--bays` in CSS), `LEVELS` (top to bottom), `RATING` (per bin, in tenths of a kg), `DOCKS` and `DOCK_RATING`, `MIN_T`, `MAX_T` and `MAX_CASES`. Bin codes are built as `14-BB-L`; change the prefix in `RACK` for another aisle. `SEED` rows are `[lpn, product, cases, 'kg', received, hold, bin]`; keep one pallet that a level refuses so the rule shows. Bump the version in `KEY` when the record shape changes.
3. **Another kind of place.** Rename the copy (bins, beams, dock) and keep the model. Capacity can be anything comparable: replace `tenths` and `ratingOf` with volume, temperature class or slot size, and `canPlace` still decides everything.
4. **Retime or remove motion.** Retime with the `--d-*` tokens (load sequence, lift, drag, follow, travel, drop, lower, scramble, return, flash, reflow, count, dialog, undo, edge) and the `--dur-*` tokens for CSS transitions. To drop an effect, delete its override in the motion layer: `fx.land`, `fx.lift`, `fx.refuse`, `fx.reflow`, `fx.count`, `fx.follow`, `fx.arrive`, `fx.pulse`, `fx.flashRow`, `fx.dialogIn` / `dialogOut`, `fx.undoIn` / `undoOut` and `fx.scrollTo` all fall back to instant defaults. Removing GSAP and Lenis entirely leaves a working page with CSS transitions, tap-to-move and native scroll.
5. **Real backend.** All changes pass through `createPallet`, `updatePallet`, `removePallet`, `restorePallet` and the `p.bin = code` line in `tryMove`, each followed by `save()`. Replace `store` with fetches, await the server before `render()`, and repeat `validateRecord` and `canPlace` on the server. Run `#selftest` after any change to a parser, the move rule or the seeds.

| Token | Role |
|---|---|
| `--shed` | Page ground, the cladding under high-bay LEDs; text on white buttons |
| `--deck`, `--deck-2` | Rack back, panels, dialogs, inputs; row hover, filter pill, undo bars |
| `--upright` | Uprights, bay numbers, toolbar rule when stuck |
| `--beam` | Beam lips (100%), beam web (22% in `--shed`, 45% on the crosshair) and load meters (100%) only |
| `--kraft`, `--kraft-seam`, `--kraft-ink`, `--timber` | Carton loads, seams, text on cartons, pallet deck boards |
| `--label` | Text, primary buttons, outlines, focus ring, scanner tag |
| `--muted` | Secondary text, field borders |
| `--hold` | On-hold pallet base, Hold tag, dock line, changed-row edge bar |
| `--over` | Overload preview, refused flash, errors, Remove buttons |
| `--fill`, `--scrim`, `--lift`, `--rule` | Primary hover fill, dialog backdrop, pick-up shadow, row rules |
| `--font`, `--wd-code`, `--wd-body`, `--wd-sign` | Hubot Sans; font-stretch 75%, 100%, 125% for codes, body and signs |
| `--fs-xs` to `--fs-xl`, `--fs-2xl`, `--fs-no` | 13, 15, 17, 22, 28px; fluid H2 36 to 60px; pallet number |
| `--w-*`, `--lh-*`, `--tr-code` | Weights, leading, +0.02em tracking on codes |
| `--sp-1` to `--sp-8`, `--gutter`, `--max` | 4 to 72px spacing; 16 to 32px gutter; 1280px measure |
| `--r-pallet`, `--r-control`, `--r-dialog` | 2, 6, 10px radii by hierarchy |
| `--bays`, `--axis`, `--bin-h`, `--beam-h`, `--upright-w`, `--toolbar-h` | Rack geometry (bins 52px tall below 600px) |
| `--dur-*`, `--ease-*` | CSS transition durations and curves |
| `--d-*` | GSAP durations read by the motion layer |
