---
title: Panels out
section: process
subject: Petrel Orbital, a small-satellite integrator in Glasgow that flies customers' 1U to 12U CubeSats on shared rideshare launches, explaining the seven stages from a booked slot to the satellite's first beacon, with open launches and a form to hold a slot.
aesthetic: Integration-room hardware. Hard-anodised dispenser grey and Kapton-tape amber for the stages, then the indigo of space-grade solar cells, with cropped corners and silver busbars, once the satellite is deployed. Set in B612, the face Airbus drew for cockpit displays.
mode: dark
fonts:
  - B612 (Google Fonts, 400, 400 italic, 700), headings, body, rail, form and buttons
  - B612 Mono (Google Fonts, 700), only the large L-minus countdown readout
js: Keeps one active stage from an IntersectionObserver (readout, rail, mobile strip, gate ticks), steps one stage per wheel gesture on large fine-pointer screens through Lenis's virtualScroll hook, scrubs a fixed layer of solar cells on after stage 7, validates the hold form with pure functions asserted at #selftest, and runs the GSAP and Lenis choreography.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, ScrambleTextPlugin), Lenis 1.3.26]
tags: [process, timeline, space, satellite, rideshare, countdown, solar-cell, scroll-story, gsap, lenis, form, dark]
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

**The bold idea: the countdown ends in a deployed solar array.** A sticky instrument column holds a B612 Mono readout that steps down the real lead times (L-12 mo, L-10 mo, L-9 mo, L-4 mo, L-6 wk, L-4 wk, L-0) as the seven stages pass, over a rail of the same stages. When the reader scrolls past stage 7 ("Launch and deploy"), a fixed layer of solar cells switches on, bottom rows first with a ragged edge, scrubbed by scroll, until the dispenser-grey page has become a deployed array. The closing block, "Panels out, beacon on", is that array: its background is the same cell, at the same pixel size and origin, so the layer hides at the end without a seam and the booking sits on the panels.

- **Everything leads to the deployment.** The countdown builds toward L-0. Each stage closes with a gate row: a rule and a tick that draw in Kapton amber when the stage becomes active, over the always-visible "Passes when:" condition. The launch rows reuse the cell shape as slot counters (12 cells: taken filled, open outlined), and choosing a launch turns your slots solid amber. The page says "deployed" once, and everything else points to it.
- **The cell is real.** Triple-junction space cells are dark indigo with cropped corners and silver busbars. One `--array` token draws one cell as seven gradients: four corner triangles in the ground colour (12% cuts), a 1px grout line, and two faint busbars. The cover cells and `#launches` use the same token, so they are pixel-identical. Cover cells paint their corners instead of using `clip-path`, which keeps the cover and the background exactly equal.
- **Colour is material and state.** `--anodize` (#2A2923) is the olive-grey of hard-anodised dispenser rails, a chosen dark, not a tinted black. `--cell` indigo is the only other ground. `--kapton` amber marks state only: the active stage bar, gate ticks, the focus ring, the primary button, the selected launch and your slots. `--rbf` (remove-before-flight red) appears only in form errors, always as text.
- **Type from the cockpit.** B612 was designed for Airbus cockpit displays: clear at small sizes, with tabular figures by default (all digits 0.65em, measured), so the rail labels and slot counts stay width-stable while they decode. B612 Mono is used once, for the big readout, where a fixed advance keeps "L-12" from shifting while the digits scramble. The unit ("mo", "wk") is set small in B612 Bold beside it.
- **The big readout is not default 6.** It is a large number with a small unit, but it is the countdown spine: it changes with every stage, has no caption or gradient, is `aria-hidden`, and every stage repeats its time in words ("9 months before launch").
- **Copy written from the customer's side.** Each stage says what happens, what you send, what we send and when it passes, with real names (ICD rev B, ISO 8 cleanroom, ITU filing, the 45-minute radio silence after deployment). Validation messages say exactly what is wrong and what to pick instead ("Shared launch 27-2 has 2 open slots and a 12U needs 4. Pick 27-3 or 28-1.").
- **Revisions made while building.**
  - The art director cut the pointer-lit heat ripple on the deployed cells (another section owns that mechanic), so the array rests static. The pointer effect moved to the rail: a graphite cursor bar tracks the pointer along the stages like a slide-rule cursor, while the amber bar stays on the active stage.
  - A one-off sun glint across the array on arrival was built and then removed as the one accessory too many. The array arriving is enough.
  - The cover noise was reduced from 300 to 140 (row step 50). At 8 rows on desktop, 300 read as scattered speckle; 140 reads as a front rising from the hinge, and keeps stage 7's text above it at every rest point.
  - `#launches` stays plain anodize while the cover runs (`.is-bare`) and only shows its own array at the end. Otherwise two cell grids, one fixed and one scrolling, would show misaligned rows during the wave.
  - On narrow screens the panels start below 45svh of open array, so the cover still reads when the panels are full width.
  - The rail was tried at the foot of the instrument column and moved back under the readout: at the foot it fell below the first screen, so its load draw played unseen.
  - Per-stage ScrollTriggers were replaced by one IntersectionObserver that drives everything (readout, rail, strip, sheet, gates). It also works when the libraries fail to load.

## Do not touch

- **Cover-to-background alignment.** Same columns (`--cols-wide` 12 from 992px, `--cols-narrow` 6 below), one whole-pixel cell size `ceil(clientWidth / cols)` written to `--cell-size`, origin at the section's top-left, and `#launches` directly after stage 7 with no margin. The cover trigger ends when `#launches` reaches the viewport top, and only then does the cover hide and the section's own array show.
- **Stage 7's runway.** `#stage-7` is at least 100svh with 45svh of bottom padding, so its text stays above the bottom-first wave. Keep its content short.
- **The SC15 safety gates.** Stepping is wheel-only, and only on fine pointers, at 992px wide or more, at 720px tall or more, with motion allowed, and when every stage fits the viewport (checked on every ScrollTrigger refresh, so text zoom turns it off). Wheel up at stage 1 and wheel down at stage 7 are never intercepted. Input is held only for the 1s glide, and the next step needs 140 ms of wheel quiet (trackpad tails). Keyboard, find-in-page, anchors and the skip link are never intercepted. The hook calls `event.preventDefault()` itself, because returning `false` from Lenis 1.3.26's `virtualScroll` skips Lenis's own `preventDefault`.
- **Kapton is state only.** Do not use it for decoration or text.
- **Hidden start states** exist only under `html.js` (added only when GSAP, ScrollTrigger, SplitText, ScrambleText and Lenis all loaded) and only for the intro chrome, the H2, the lede, the readout and the rail. Stage text is never hidden. The gates are hidden by the script, not by CSS.
- **The form's rules.** `maxMass` (2 kg per U), `slotsNeeded` (one slot per 3U), `latestShipDate` (six weeks before the window opens) and `holdUntil` (14 days) are pure functions asserted at `#selftest`. If you change `LAUNCHES`, keep the asserts and update the row copy to match.
- **Real radios and a native dialog.** The launch rows are `input type=radio` inside labels in a fieldset. The stage sheet is a native `<dialog>` with Close, Escape, backdrop and per-stage links, and Lenis stops while it is open.

## Motion

House easing: expo.out for settles and draws, a quartic in-out for the stage glide, power2.inOut for clip swaps. Only transform, opacity, clip-path and stroke-dashoffset animate. Everything runs inside one `gsap.matchMedia` with `motion`, `reduce`, `fine`, `wide` and `tall` conditions. Lenis (lerp 0.1, `autoRaf: false`, `anchors: false`) runs on `gsap.ticker` with `lagSmoothing(0)`. In-page links go through `lenis.scrollTo` (duration `min(1.3, 0.65 + distance / 4000)`, expo.out, `force: true`) and then focus the target heading or the first radio. Cleanup destroys Lenis, removes the ticker callback, the cover DOM and the resize, refresh and pointer listeners. The context reverts SplitText, tweens and triggers, and every later state change is instant.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Wordmark and top-bar links | LD8 | Load, t=0 | opacity 0 to 1, .5s power2.out | Shown |
| H2 "From booked slot to first contact" | TX1 | Load, after fonts (t ≥ .1) | SplitText lines in masks, yPercent 110 to 0, 1s expo.out, stagger .08 | Static, no split |
| Rail rules and stage names | SC16 | Load, t=.45 / .5 | rules scaleX 0 to 1 from the left, .8s expo.out, stagger .05; names step on (steps(1), .06s) | Static |
| Readout | TX4 | Load, t=.6 | ScrambleText on the digits only, chars 0-9, .9s, ease none | Static |
| Lede | LD8 | Load, t=.9 | opacity .5s | Shown |
| Stage chapters (wide, fine, tall) | SC15 via Lenis `virtualScroll` | One wheel gesture | glide 1s quartic in-out, `lock: true`, 140 ms quiet gate; released at both ends | Native scroll |
| Stage chapters (touch) | CSS snap | Native scroll | `scroll-snap-type: y proximity`, `scroll-margin-top` = strip height | Same |
| Active stage | NV6 spy | IntersectionObserver, rootMargin -40% 0 -55% 0 | sets `aria-current="step"` on rail and sheet | Same, instant |
| Readout digits | TX4 | Stage change | .6s, chars 0-9, ease none; unit swaps instantly | Jumps |
| Rail indicator (amber) | NV4 | Stage change | y to the item, .5s expo.out | Jumps |
| Mobile strip title | TR1 | Stage change | two lines in one masked cell, 0 to -100% and 100% to 0, .4s cubic-bezier(.65,0,0,1) | Instant |
| Gate row | SC16 | Stage first becomes active (earlier stages drawn instantly) | rule scaleX .7s expo.out, then tick stroke-dashoffset 1 to 0 .3s power2.out, "Passes when" graphite to silver .3s | Drawn from the start |
| Solar-cell cover (signature) | SC17 | Scrub from stage 7's bottom at the viewport bottom to its bottom at the top | about 96 cells at 1440x900, 90 at 390x844; priority 50 x row-from-bottom + 140 x random; autoAlpha, stagger amount 1.5, `scrub: true`, ease none; visible only while 0 < progress < 1; rebuilt on width change (200 ms debounce) | No cover; the array is simply the section's background |
| Rail L-labels | TX4 | Hover (fine), keyboard focus | digits re-scramble, .35s, fixed-width box, real string in `aria-label` | Colour only |
| Rail cursor | NV4 driven by the pointer | Pointer over the rail (fine, wide) | graphite bar, `quickTo` y .35s power3.out, fades .2s in, .3s out | Off |
| Links (skip, result links) | HV2 | Hover, focus-visible | background-size .45s cubic-bezier(.35,0,0,1), in from the left, out to the right | Underline always shown |
| Inline external and mailto links | HV2 | Hover, focus-visible | resting .05em underline, sweep thickens to .09em | Static |
| Buttons | HV4 + MI1 | Pointer enter side, press | fill scaleX from the entry edge .4s (leave .3s toward the exit edge); press scale .97 .12s, release .4s cubic-bezier(.34,1.56,.64,1) | Colour swap, no scale |
| Stage sheet (narrow) | CD7 | "All stages" | sheet yPercent 100 to 0 .45s expo.out; backdrop .3s; items opacity + y 8px, stagger .04; close .3s power2.in; item bar scaleY .25s | Fade .2s |
| Launch rows | HV pulse | Hover (mouse), radio focus-visible, selection on touch | open slot cells pulse amber, .25s up and back, stagger .03; row tint .2s | No pulse |
| Launch selection | MI3 | Radio change | badge and your slot cells scale .6 to 1, .25s back.out(2); 2px amber inset outline; "Your slot: 1 of 5 open" | No pop |
| Form fields | MI4 (adapted) | Hover, focus, invalid submit | bottom rule graphite to silver .2s; amber focus rule scaleX .3s; error in a reserved line, opacity + 4px .25s; focus to the first invalid field, no shake | Instant |
| Form factor helper | TR1 | Change | masked line swap .4s | Instant |
| Hold result | CD9 with clip-path | Valid submit | fields clip out to the right .4s, result clips in from the left .4s (offset .15s), reference decodes .8s; "Change details" reverses | Instant swap |

## Adapting

1. **Stages and lead times.** Each `article.stage` carries `data-l` (the readout digits), `data-u` (unit, empty for L-0) and `data-name` (strip title). Keep the rail links and the sheet list in the same order, with the real string in each rail link's `aria-label`. Keep stages to one viewport of content at 1440x900 or the stepper turns itself off (it never traps; it just stops stepping).
2. **Launches and rules.** Edit `LAUNCHES` (window opening date, open and total slots) and `UNITS`, `KG_PER_U`, `U_PER_SLOT`, `HOLD_DAYS`, `SHIP_WEEKS` at the top of the script. Update the row copy and the asserts in `runSelfTest` to match, never the other way round.
3. **Tokens.** Swap the six core colours, keeping their roles: one chosen dark ground, one raised surface, text, secondary text at 4.5:1 or better on every ground (graphite is 5.9:1 on anodize, 4.9:1 on raised, 6.0:1 on cell), one state colour, and the deployed ground. Keep `--rbf` at 4.5:1 or better on the panel colour. `--array` reads `--anodize`, `--cell` and `--busbar`, so the cell follows the palette.
4. **Another end state.** The cover works for any process that ends in a material change: tiles for a roofer, pixels for a display maker, bricks for a builder. Redraw `--array` as that unit, and keep the whole-pixel size and origin rules.
5. **Retiming or removing motion.** Durations are `--d-*` tokens in seconds (the script reads them) and the CSS curves are `--ease-*`. To remove an effect, delete its tween in the load timeline, `activate`, `drawGates` or the hover handlers. All state functions already fall back to instant changes when `M.on` is false. To drop SC15, set `stepOn` to false. To drop the cover, remove `buildCover()`, and the section keeps its array background. To drop the libraries, remove the five CDN tags: the page then behaves like the reduced-motion version.
6. **Stack translation.** Keep `validate` and the four rule functions pure, keep one active-stage source (the observer) and one matchMedia context, and keep the dialog native and the radios real.

| Token | Role |
|---|---|
| `--anodize` | Ground for the intro and stages, panel colour on the array, cell corners and grout. |
| `--anodize-raised` | Instrument column, mobile strip, inputs, stage sheet. |
| `--silver` | Text (11.3:1 on anodize, 9.3:1 on raised). |
| `--graphite` | Secondary text, inactive rail items, unit, taken slot cells, radio rings, field rules. |
| `--kapton` | State only: active bar, gate rule and tick, focus ring, primary button, selected row, your slots. |
| `--cell` | Solar-cell indigo, the deployed ground. |
| `--rbf` | Form errors only, with text (4.6:1 on anodize). |
| `--busbar`, `--rule`, `--tint`, `--scrim` | Busbar lines, 1px structure rules, row hover tint, dialog backdrop. |
| `--array` | One solar cell as gradients, shared by the cover and `#launches`. |
| `--chamfer` | 12% cropped-corner polygon for slot cells and the selection badge. |
| `--cell-size` | Whole-pixel cell size, set by the script from `clientWidth / cols`. |
| `--cols-wide`, `--cols-narrow` | Cell columns at 992px and up (12) and below (6). |
| `--strip-h` | Height of the mobile sticky strip and the stages' scroll margin. |
| `--font-sans`, `--font-readout` | B612 for everything, B612 Mono for the readout only. |
| `--t-xs` ... `--t-xl` | Type scale: .8, .9, 1.0625, 1.33, 1.66rem and the H2 clamp(2.25rem, 4.8vw, 4.25rem). |
| `--t-readout`, `--t-readout-s` | Readout clamp(3.25rem, 10.5vw, 10rem) on the column, 1.75rem in the strip. |
| `--s-1` ... `--s-9`, `--gutter`, `--measure` | Spacing .25 to 7rem, 16px to 56px gutter, 62ch measure. |
| `--radius` | 3px, buttons and inputs only. |
| `--d-*`, `--ease-*` | Motion durations and CSS curves listed in the Motion table. |
