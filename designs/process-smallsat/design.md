---
title: Panels out
section: process
subject: Petrel Orbital, a small-satellite integrator in Glasgow that flies customers' 1U to 12U CubeSats on shared rideshare launches, explaining the seven stages from a booked slot to the satellite's first beacon, with open launches and a form to hold a slot.
aesthetic: Clear-anodised integration room to deployed indigo array. Bead-blasted dispenser aluminium and Kapton tape for the stages, then the violet indigo of space-grade solar cells, with cropped corners and silver busbars, once the satellite is deployed. Set in B612, the face Airbus drew for cockpit displays.
mode: light
fonts:
  - B612 (Google Fonts, 400, 400 italic, 700), headings, body, rail, form and buttons
  - B612 Mono (Google Fonts, 700), only the large L-minus countdown readout
js: Keeps one active stage from an IntersectionObserver (readout, rail, mobile strip, sheet, gates), steps one stage per wheel gesture on large fine-pointer screens through Lenis's virtualScroll hook, scrubs a fixed layer of solar cells on after stage 7, moves a sun glint across the deployed array with the pointer, validates the hold form with pure functions asserted at #selftest, and runs the GSAP and Lenis choreography.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, ScrambleTextPlugin), Lenis 1.3.26]
tags: [process, timeline, space, satellite, rideshare, countdown, solar-cell, scroll-story, gsap, lenis, form, light]
use_when:
  - A multi-stage service with real gates and lead times, such as integration, manufacturing slots, certification or a build programme.
  - Each stage has something the customer sends, something you send and a condition that closes it.
  - The process ends in one change of state worth staging (deployed, delivered, certified, open), followed by a way to start.
avoid_when:
  - Fewer than four stages. The countdown and stepped chapters need a real sequence.
  - Audiences that skim on mobile only. The stages are long, single-column blocks.
  - Pages that cannot load scripts from a CDN and still want the cover. Without the libraries everything works, but the array simply sits under the closing block.
---

## Why it works

**The bold idea: the countdown ends in a deployed solar array.** A sticky instrument column holds one B612 Mono readout that steps down the real lead times (L-12 mo, L-10 mo, L-9 mo, L-4 mo, L-6 wk, L-4 wk, L-0) as the seven stages pass, over a rail of the same stages. When the reader scrolls past stage 7 ("Launch and deploy"), a fixed layer of solar cells switches on, bottom rows first with a ragged front, scrubbed by scroll, until the aluminium page has become a deployed array. It is a light-to-dark event: the cleanroom ends and space begins. The closing block, "Panels out, beacon on", is that array: its background is the same cell, at the same pixel size and origin, so the layer hides at the end without a seam and the booking sits on the panels.

- **Everything leads to the deployment.** The countdown builds toward L-0. Each stage closes with a gate row: Kapton tape runs along a stage's rule while it is the active stage (in progress), and its box fills and ticks in ink only once you move on to the next stage (passed), over the always-visible "Passes when:" condition. Stage 7's box ticks on the first frame of the cover, because its condition is "dispenser door opens": the last gate closes as the array starts to light. The launch rows reuse the cell shape as slot counters (12 cells: taken filled, open outlined), and choosing a launch turns your slots to Kapton. The page says "deployed" once, and everything else points to it.
- **The cell is real.** Triple-junction space cells are dark indigo with cropped corners and silver busbars, mounted on a substrate. One `--array` token draws one cell as gradients: four corner triangles and a 1px grout line in `--alu` (the substrate showing through), and two 2px busbars at 35% silver, so the cell reads before the lattice. `#launches` and the glint paint that token. The cover cells cut the same corners and grout with a mask (`--cell-cut`) instead of painting them, so whatever lies under a lit cell shows through its corners (the raised instrument column, the aluminium, and at the end `#launches` over the body's `--alu`), and the hand-off is pixel-identical.
- **Colour is material and state.** `--alu` (#CDCFCB) is bead-blasted clear-anodised aluminium, the dispenser's own finish. `--cell` (#2E2266) is a violet-leaning cell indigo and the only other ground. `--kapton` amber marks state only and is only 1.4:1 on aluminium, so it never stands alone: it is always a fill or a tape strip with an ink edge or ink text (the rail tape behind the active lead time, the gate strip and tick box, the primary button, the selection badge, your slot cells, the focus rule inside an ink ring). `--rbf`, a dark remove-before-flight red, appears only in form errors, always as text.
- **Type from the cockpit.** B612 was designed for Airbus cockpit displays: clear at small sizes, with tabular figures, so the rail labels, slot counts and reference stay width-stable as they change. B612 Mono is used once, for the big readout, where a fixed advance keeps "L-12" from shifting while it counts.
- **The big readout is not default 6.** It is a large number with a small unit, but it is the countdown spine: there is exactly one, in the instrument column (the strip below 992px), it changes with every stage, has no caption or gradient, is `aria-hidden`, and every stage repeats its time in words ("9 months before launch"). Its digits are in the HTML, so no-JS, reduced motion and the first frame all show "L-12". It never shows a random digit: it counts in whole steps from the value shown to the new one (up when you scroll back), and across months and weeks it swaps the unit first and counts from the equivalent (4 mo = 17 wk).
- **Copy written from the customer's side.** Each stage says what happens, what you send, what we send and when it passes, with real names (ICD rev B, ISO 8 cleanroom, ITU filing, the 45-minute radio silence after deployment). Validation messages say exactly what is wrong and what to pick instead ("Shared launch 27-2 has 2 open slots and a 12U needs 4. Pick 27-3 or 28-1.").
- **Revisions made while building.**
  - The art director flipped the stages from a dark olive-grey to the cleanroom (the dark version matched contact-recording-studio within a few RGB steps, and its amber matched three other designs), and moved `--cell` away from story-mechanical-watch's temper blue to a violet indigo.
  - The pointer-lit heat ripple on a canvas was deleted (cta-indie-game owns that mechanic with the same numbers). The pointer is now the sun: its x sets a sun angle, a feathered band three columns wide catches the glint with its brightness set by the cosine, and the closing panel states the cosine loss ("Sun 34° off normal: array at 83%"). The band moves by whole columns while its pattern is counter-shifted every frame, so its grout never doubles the array's. A graphite rail cursor and an odometer readout from earlier drafts were removed with it.
  - The closing copy sits on a plain cell-indigo plate: on the bare array, the light grout lines crossed the silver letters.
  - Cover cells switch on whole (`steps(1)`), never half-lit: a half-transparent indigo over aluminium read as a washed lavender at every rest point. Cover noise is 140, not the catalogue's 300, and each column is then filled from the bottom (a cell's priority is at least the one below it plus one), so the front is ragged but no cell lights above an unlit one: the array grows from the hinge instead of dropping blocks.
  - Stage 7 has no scroll-snap point on touch, so proximity snapping never pulls the reader back while the wave is scrubbed.
  - After review: the readout counts instead of scrambling (a countdown that shows L-14 contradicts itself); the rail hover shows an ink outline of the tape where a click would go instead of re-scrambling the digits; the instrument column gets a one-screen runway so L-0 stays on screen while the array lights and is the last thing covered; the closing plates snap to whole cell rows so every plate edge sits on a grout line; the array went from 12 to 16 columns for a denser field and a smoother scrub; the payoff line is set at the H2 size.
  - The one accessory removed: a Kapton tape strip on the selected launch row's left edge. The ink outline, the badge and your Kapton slot cells already say it.

## Do not touch

- **Cover-to-background alignment.** Same columns (`--cols-wide` 16 from 992px, `--cols-narrow` 6 below), one whole-pixel cell size `ceil(clientWidth / cols)` written to `--cell-size`, origin at the section's top-left, and `#launches` directly after stage 7 with no margin. The cover trigger ends when `#launches` reaches the viewport top, and only then does the cover hide and the section's own array show (`.is-bare` until then, so two grids never show at once). The panels sit above the cover and enter only over rows that are already lit. Both plates are snapped to whole rows (the script sets each one's `min-height` to `ceil(height / cell) × cell` on every resize) and `--rows-top` places the closing plate on a grout line so it ends inside the first screen of the array.
- **The instrument runway.** From 992px, with the cover running, `.instr-col` holds one extra screen of content (`::after`) and gives it back with a negative bottom margin, so the sticky readout stays pinned while stage 7's bottom travels from the viewport bottom to its top. The raised fill stops where the stages end. The cells over the readout get +60 priority, so L-0 is the last thing the array covers. Below 992px the strip is already sticky and gets the same +60.
- **Stage 7's text stays above the wave.** On desktop `#stage-7` is exactly 100svh with its text in the top 55%; below 992px it has 45svh of bottom padding. Keep its content short.
- **The SC15 safety gates.** Stepping is wheel-only, and only on fine pointers, at 992px wide or more, at 720px tall or more, with motion allowed, and when every stage fits the viewport (checked on every ScrollTrigger refresh, so text zoom turns it off). Wheel up at stage 1 and wheel down at stage 7 are never intercepted. Input is held for the 1s glide and then until 140 ms of wheel quiet, so a trackpad's inertia tail neither chains a second step nor leaks past stage 7. Keyboard, find-in-page and anchors are never intercepted. The hook calls `event.preventDefault()` itself, because returning `false` from Lenis 1.3.26's `virtualScroll` skips Lenis's own `preventDefault`.
- **Kapton is state only, and never alone on aluminium.** Pair it with an ink edge or ink text. The focus ring is 2px ink at 3px offset on aluminium and 2px Kapton on cell.
- **Hidden start states** exist only under `html.js` (added only when GSAP, ScrollTrigger, SplitText, ScrambleText and Lenis all loaded) and only for the top bar, the lede, the rail names and the rail tape. The H2, the readout and the stage text are never hidden. The gates are hidden by the script, not by CSS.
- **The form's rules.** `maxMass` (2 kg per U), `slotsNeeded` (one slot per 3U), `latestShipDate` (six weeks before the window opens), `holdUntil` (14 days) and `sunText` (cosine loss) are pure functions asserted at `#selftest`. `validate` rejects ship dates before today (the date input's `min` is today) and holds on a launch whose book-by date has passed, naming the launches still open. If you change `LAUNCHES`, keep the asserts and update the row copy to match.
- **Real radios and a native dialog.** The launch rows are `input type=radio` inside labels in a fieldset. The stage sheet is a native `<dialog>` with Close, Escape, backdrop and per-stage links. While it is open the page holds still with or without Lenis: `html:has(dialog[open])` clips overflow, Lenis stops, and PageUp, PageDown, Home, End and Space are blocked. The active-stage observer also watches `#launches`, so a jump past stage 7 by Tab or find never leaves an earlier stage current.

## Motion

House easing: expo.out for settles and draws, a quartic in-out for the stage glide, power2.inOut for clip swaps. Only transform, opacity, clip-path and stroke-dashoffset animate. Everything runs inside one `gsap.matchMedia` with `motion`, `reduce`, `fine`, `wide` and `tall` conditions. Lenis (lerp 0.1, `autoRaf: false`, `anchors: false`) runs on `gsap.ticker` with `lagSmoothing(0)`. In-page links go through `lenis.scrollTo` (duration `min(1.3, 0.65 + distance / 4000)`, expo.out, `force: true`, CSS snap paused during the glide) and then focus the target heading or the first radio. Cleanup destroys Lenis, removes the ticker callback, the cover DOM and the resize, key, rail and sun listeners, and resets the sun line; the context reverts SplitText, tweens and triggers.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Wordmark and top-bar links | LD8 | Load, t=0 | opacity 0 to 1, .5s power2.out | Shown |
| H2 "From booked slot to first contact" | TX1 | Load, only if the fonts are ready within 300 ms (t ≥ .1) | visible unsplit from frame 0; SplitText lines in masks, yPercent 110 to 0, 1s expo.out, stagger .08; otherwise it stays static | Static, no split |
| Rail rules and stage names | SC16 | Load, t=.45 / .5 | rules scaleX 0 to 1 from the left, .8s expo.out, stagger .05; names and the tape step on (steps(1), .06s) | Static |
| Readout | Count | Load, t=.3 | the instrument settles on your slot: counts L-24 down to L-12 in whole steps, .9s power2.out | Static "L-12" |
| Lede | LD8 | Load, t=.9 (t=.3 below 992px, so a phone's first screen is never blank) | opacity .5s | Shown |
| Current stage's gate | SC16 | Load, t=.9 (last beat) | as the gate row below | Drawn |
| Stage chapters (wide, fine, tall) | SC15 via Lenis `virtualScroll` | One wheel gesture | glide 1s quartic in-out, `lock: true`; input held for 75% of the glide, then until 140 ms of quiet; released at both ends | Native scroll |
| Stage chapters (touch) | CSS snap | Native scroll | `scroll-snap-type: y proximity` on stages 1 to 6, `scroll-margin-top` = strip height | Same |
| Active stage | NV6 spy | IntersectionObserver, rootMargin -40% 0 -55% 0 | sets `aria-current="step"` on rail and sheet | Same, instant |
| Readout digits | Count + TR1 | Stage change | proxy tween with `snap: 1`, .6s power2.out, from the shown value to the new one (counts up going back); a unit change swaps first (masked line swap .4s) and counts from the equivalent; L-0 counts in weeks, then drops the unit | Jumps |
| Rail indicator (Kapton tape, ink edge) | NV4 | Stage change | y to the item, .5s expo.out | Jumps |
| Mobile strip title | TR1 | Stage change | two lines in one masked cell, 0 to -100% and 100% to 0, .4s cubic-bezier(.65,0,0,1) | Instant |
| Gate row | SC16 | Two beats: stage n active, then stage n+1 active (skipped stages drawn instantly); stage 7 on the cover's first frame | in progress: Kapton strip scaleX .7s expo.out after .15s; passed: the box fills .3s and the ink tick draws (stroke-dashoffset 1 to 0, .3s power2.out), "Passes when" ink-2 to ink .3s | Drawn from the start |
| Solar-cell cover (signature) | SC17 | Scrub from stage 7's bottom at the viewport bottom to its bottom at the top | rows = ceil(innerHeight / cell) (+2 spare on touch) times the columns; priority 50 x row-from-bottom + 140 x random, +60 over the readout, then each column filled from the bottom (no lit cell above an unlit one); autoAlpha, steps(1), stagger amount 1.5, `scrub: .3`; visible only while 0 < progress < 1; rebuilt on resize (200 ms debounce; touch rebuilds on width only) | No cover; the array is simply the section's background |
| Sun glint on the array | Pointer-driven (replaces CU5) | Pointer over `#launches` (fine); tap (touch) | a band of `--cell-lit` cells three columns wide, feathered by a mask, x snapped to whole columns with its pattern counter-shifted each frame, `quickTo` .35s power3.out; opacity = cos(angle) (.2s in, .35s while moving, out .4s); text "Sun N° off normal: array at P%" from x across ±70° | Off; text at 0° |
| Rail rows | NV4 ghost | Hover (mouse), focus-visible | an ink outline of the tape moves to the row a click would go to, .5s expo.out, and back to the active row on leave; text ink-2 to ink .2s | Colour only |
| Links ("See open launches", result links) | HV2 | Hover, focus-visible | background-size .45s cubic-bezier(.35,0,0,1), in from the left, out to the right | Underline always shown |
| Inline external and mailto links | HV2 | Hover, focus-visible | resting .05em underline, sweep thickens to .09em | Static |
| Buttons | HV4 + MI1 | Pointer enter side, press | Kapton fill (ink fill on the Kapton button) scaleX from the entry edge .4s, leave .3s; press scale .97 .12s, release .4s cubic-bezier(.34,1.56,.64,1) | Colour swap, no scale |
| Stage sheet (below 992px) | CD7 | "All stages" | sheet yPercent 100 to 0 .45s expo.out; backdrop .3s; items opacity + y 8px, stagger .04; close .3s power2.in; item tape scaleY .25s | Fade .2s |
| Launch rows | Pulse | Hover (mouse), radio focus-visible, selection on touch | open slot cells pulse Kapton inside their outline, .25s up and back, stagger .03; row tint .2s | No pulse |
| Launch selection | MI3 | Radio change | badge and your slot cells scale .6 to 1, .25s back.out(2); 2px ink inset outline; "Your slot: 1 of 5 open" | No pop |
| Form fields | MI4 (adapted) | Hover, focus, invalid submit | bottom rule ink-2 to ink .2s; Kapton focus rule scaleX .3s inside a 2px ink ring; error in a reserved line, opacity + 4px .25s; focus to the first invalid field, no shake | Instant |
| Form factor helper | TR1 | Change | masked line swap .4s | Instant |
| Hold result | CD9 with clip-path + TX4 | Valid submit | fields clip out to the right .4s, result clips in from the left (offset .15s); the reference's digit groups decode .8s, real string in a hidden copy; "Change details" reverses | Instant swap |

## Adapting

1. **Stages and lead times.** Each `article.stage` carries `data-l` (the readout digits), `data-u` (unit, empty for L-0) and `data-name` (strip title). Keep the rail links and the sheet list in the same order. Each link's `aria-label` starts with its visible text ("L-12 mo Book a slot: stage 1, 12 months before launch") so speech input can target it. Keep stages to one viewport of content at 1440x900 or the stepper turns itself off (it never traps; it just stops stepping).
2. **Launches and rules.** Edit `LAUNCHES` (window opening date, open and total slots) and `UNITS`, `KG_PER_U`, `U_PER_SLOT`, `HOLD_DAYS`, `SHIP_WEEKS` at the top of the script. Update the row copy and the asserts in `runSelfTest` to match, never the other way round.
3. **Tokens.** Swap the core colours, keeping their roles: one light ground, one raised surface, ink text, secondary text at 4.5:1 or better on both, one state colour that always travels with an ink edge, and the deployed ground with its text colour. Re-derive `--cell-lit` a step lighter than `--cell`; keep silver text on it at 4.5:1 and Kapton on it above 3:1 (the focus ring). Keep `--rbf` at 4.5:1 or better on both light surfaces. `--array` reads `--alu` and `--busbar`, so the cell follows the palette.
4. **Another end state.** The cover works for any process that ends in a material change: tiles for a roofer, pixels for a display maker, bricks for a builder. Redraw `--array` as that unit, keep the whole-pixel size and origin rules, and change the sun line to whatever that material measures.
5. **Retiming or removing motion.** Durations are `--d-*` tokens in seconds (the script reads them) and the CSS curves are `--ease-*`. To remove an effect, delete its tween in the load timeline, `activate`, `drawGates`, the sun handlers or the hover handlers; all state functions fall back to instant changes when `M.on` is false. To drop SC15, set `stepOn` to false in `measure`. To drop the cover, remove `buildCover()`, and the section keeps its array background. To drop the libraries, remove the five CDN tags: the page then behaves like the reduced-motion version.
6. **Stack translation.** Keep `validate` and the rule functions pure, keep one active-stage source (the observer) and one matchMedia context, and keep the dialog native and the radios real.

| Token | Role |
|---|---|
| `--alu` | Ground for the intro and stages, input fill, cell corners and grout. |
| `--alu-raised` | Instrument column, mobile strip, booking panel, stage sheet. |
| `--ink` | Text (10.6:1 on alu, 12.8:1 on raised, 7.7:1 on Kapton), focus ring on light surfaces, every edge Kapton sits on. |
| `--ink-2` | Secondary text, inactive rail items, unit, taken slot cells, radio rings, field rules (5.0:1 on alu, 6.0:1 on raised). |
| `--kapton` | State only: rail tape, gate strip and tick box, primary button, focus rule, selection badge, your slots, focus ring on cell (6.3:1). |
| `--cell` | Solar-cell indigo, the deployed ground and the closing plate (silver 10.6:1). |
| `--cell-lit` | Derived: the sun glint band (silver 7.5:1; Kapton 4.4:1, above 3:1 for the focus ring). |
| `--silver` | Text on cell. |
| `--rbf` | Form errors only, with text (5.2:1 on alu, 6.3:1 on raised). |
| `--busbar`, `--rule`, `--tint`, `--scrim` | Busbar lines, 1px structure rules, row hover tint, dialog backdrop. |
| `--focus` | Focus ring colour: ink on aluminium, Kapton inside `#launches`, ink again on the booking panel. |
| `--array`, `--busbars`, `--cell-cut` | One solar cell as gradients (`#launches`, the glint), its busbars alone, and the mask that cuts the same corners and grout out of the cover cells. |
| `--chamfer` | 12% cropped-corner polygon for slot cells. |
| `--cell-size` | Whole-pixel cell size, set by the script from `clientWidth / cols`. |
| `--cols-wide`, `--cols-narrow` | Cell columns at 992px and up (16) and below (6). |
| `--rows-top` | Whole cell rows above the closing plate, set by the script so the plate ends inside the first screen. |
| `--hit`, `--mark`, `--cell-sm`, `--rail-w` | Minimum control height (2.75rem), radio, badge and gate box (1.25rem), slot counter cell (.75rem), rail width (30rem). |
| `--strip-h` | Height of the mobile sticky strip and the stages' scroll margin. |
| `--font-sans`, `--font-readout` | B612 for everything, B612 Mono for the readout only. |
| `--t-xs` ... `--t-xl` | Type scale: .8, .9, 1.0625, 1.33, 1.66rem and the H2 and closing-line clamp(2.25rem, 4.8vw, 4.25rem). |
| `--t-readout`, `--t-readout-s` | Readout clamp(3.25rem, 10.5vw, 10rem) in the column, 1.75rem in the strip. |
| `--s-1` ... `--s-9`, `--gutter`, `--measure` | Spacing .25 to 7rem, 16px to 56px gutter, 62ch measure. |
| `--radius` | 3px, buttons and inputs only. |
| `--d-*`, `--ease-*` | Motion durations and CSS curves listed in the Motion table. |
