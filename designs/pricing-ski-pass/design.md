---
title: Break-even lift line
section: pricing
subject: Lift-pass prices (day, week, season, family) for Ferntal, a fictional mid-size ski resort in Vorarlberg, Austria, with a calculator for the cheapest pass and a form that loads it onto a KeyCard.
aesthetic: The resort's printed trail map. Lift lines with tower ticks and end stations on blue-white paper, piste-pole orange, gentian blue and fir-green ink, with wide 1960s ski-poster lettering.
mode: light
fonts:
  - Krona One (Google Fonts), headings and pass names only
  - Signika, variable wght 300-700 (Google Fonts), everything else, including every price
js: Computes the cheapest way to pay for 1 to 20 days from a PRICES object (break-evens asserted at day 13 and day 10), draws it as an SVG lift line whose chair rides the cable as you scroll (pinned on larger screens) and then follows dragging or a range input, preselects the recommended pass in a validated KeyCard form that confirms in a native dialog, and runs the GSAP and Lenis choreography.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [pricing, calculator, break-even, chart, slider, drag, ski, resort, trail-map, form, dialog, gsap, lenis]
use_when:
  - The real question behind the prices is "which option is cheapest for how much I'll use it": lift passes, transit passes, gym visits, coworking days, pool cards, parking.
  - There are two to four options whose costs cross at real thresholds you can compute and state.
  - You want people to leave the section having bought the right option, not only having compared prices.
avoid_when:
  - The options differ by features rather than by usage. Use a feature table instead.
  - Prices depend on many variables, such as dynamic or date-based pricing, so a single break-even day would mislead.
  - The page cannot run JavaScript. The no-JS fallback is a table, and the bold idea is gone.
---

## Why it works

**The bold idea is the break-even lift line.** Under the question "How many days will you ski?", the cheapest cost of skiing 1 to 20 days is drawn the way Ferntal's own trail map draws a lift: a cable with one tower tick for each day skied and a station at each end. A small orange chair hangs from the cable. On screens at least 768px wide and 640px tall the question pins for 1,200px of scroll, and scrolling rides the chair from day 1 to day 20, snapping tower by tower, while the readout, the explanation and the button follow it. All of them flip on the same rule, the whole day the chair has reached, so the readout says 13 at the moment the chair arrives at tower 13 and the station pops. It climbs at EUR 62 a day, nearly levels off at day 6 where one week pass takes over, then climbs again. At day 13 it reaches the flat gentian season line. A station pops there, the label "Day 13: the season pass is cheaper" opens, and the losing day and week lines fade back. After that the chair rides level and each tower it passes is labelled "free" (on boards under 560px, one tag beside the chair counts "3 free days"). On smaller screens, without the pin, the chair rides the whole cable once when the chart comes into view and settles on day 14. Either way the moment happens without any input. Afterwards you drag the chair along the cable (mouse or touch) or move the range slider under the axis, and it snaps to the towers. Turn on "Family of four" and the lines change to two adults and two children: the old station and label retract, the lines crossfade while the chair drops back onto day 1, and then it rides the new cable to the current day at an even pace, so you watch it cross day 10 where the new station pops. The button under the answer then reads "Load the season pass onto a KeyCard" (or whichever pass is cheapest). It preselects that pass in the form and scrolls there. The section answers the question people ask at the ticket window and then sells the answer.

- **Every point is arithmetic.** `PRICES` sits at the top of the script. `single(n, age)` tries every mix of week and day passes against the season pass, and `family(n)` does the same for each family member against the family pass. `console.assert` checks that the season pass wins from day 13 for one adult and the family pass from day 10 for two adults and two children, along with the other figures stated in the copy (EUR 310, 504, 636, 1,512 and EUR 53 a day). The hidden 20-day table, the readout, the slider's `aria-valuetext` and the chart are all generated from the same functions.
- **Structure encodes truth.** Each tower tick is one day skied. The cable is the minimum of all ways to pay. The dashed day-pass line and the whole-week staircase show why the cable bends where it does. Gridlines sit at the same heights in both modes (adult y-max 1,300, family 2,600), so only their numbers change when you switch. The KeyCard is the only raised object, because it is the only physical thing you take away.
- **One trail-map vocabulary.** Pole orange (#D65A00) is the orange of the poles that mark piste edges. It is used only for the cable and its tower ticks (and their legend glyph), the chair, the selection badge, the focus ring, the input focus rule, the invalid-field border and the error marker, and never for text. Gentian blue marks the pass that wins. Fir ink is the dark green of the trees on the map. The ground (#E8EEF4) is the map's blue-white paper, not a neutral off-white.
- **Type from ski posters and wayfinding.** Krona One is a wide grotesque in the spirit of 1950s and 60s Swedish posters. It sets the h2, the h3s, the brand, the readout lead and the pass names, never body text or figures. Signika was designed for wayfinding signage and sets everything else. Font check, 2026-10-22, in the served Google Fonts builds, rendering "1111", "0000" and "7777" at 100px: Krona One measured 233.4, 367.0 and 300.2px whether or not `tabular-nums` was on, so it has no tnum feature. Signika measured 216.0px for all three, with and without the feature, because its figures are tabular by default. So every price, total and axis label is set in Signika (600 for prices).
- **Quiet around the loud thing.** The heading, lede and four price stubs are plain and left-aligned. The stubs are separated by rules rather than boxed as cards. The radio cards are cards only because a radio group is four equal choices, and they use their own 6px radius, distinct from the 4px buttons and the KeyCard's proportional ISO radius.
- **Interaction that teaches.** Scrolling shows the threshold once; direct manipulation lets you test it: drag past 12 and the station pops, drag back and it retracts. A fine pointer also gets a day cursor that previews any day's cheapest price ("14 days: EUR 689") before you commit to it.
- **Revisions made against the collection's defaults.** The accent moved from a terracotta-like #E0480E to piste-pole #D65A00 on a cool ground. There are no eyebrows, no monospace, no arrows on links, no big-number hero and no single accented headline word. The pinned stage is one short ScrollTrigger pin (1,200px, no chapters, no rail and no skip link needed) that only moves the chair, so it does not repeat the collection's chaptered sticky stages; dragging takes over when it ends. The scroll-drawn rules under every form row and "includes" item were cut, so only the stub rule and the chart move unprompted. The heading's masked line rise was cut for a .4s fade, so the stub rule wiping the price row in is the only load gesture. The rotating headline word, a magnetic hero button and an animated ridge of seven lift lines were cut, so the chart stays the only lift line on the page. At the final critique the small lift-line glyph on the KeyCard was removed as the one accessory too many: it was a third echo of the signature.

## Do not touch

- **The arithmetic and its asserts.** Never hardcode the cable, the break-even day, the readout or the table. If you change `PRICES`, keep the asserts and change the copy to match them, never the other way round.
- **EUR 0 sits above the axis.** The y domain starts one hanging chair (31 units at the chair's scale, plus 6px) below EUR 0, so the chair on day 1 never crosses the axis. A labelled 0 gridline marks the real zero. The day labels sit 20px under the axis and the range input 24px under it.
- **The cable notation.** The cable shows the cheapest path, with one tower tick per day and stations at day 0 and day 20. The chair hangs below the cable and moves along it, interpolated between days, never in a straight line across corners. Keep the break-even marker as a station on the cable where it meets the flat line.
- **The scroll ride and the default day.** The pin (start `top top+=16`, end `+=1200`, `scrub: true`, because Lenis already smooths the wheel) snaps to whole days through Lenis: 180ms after the wheel target stops moving, `lenis.scrollTo` retargets it to the nearest tower. ScrollTrigger's own `snap` does not work here, because it calls native scrollTo, which Lenis overrides. The pin only runs when `#compare` fits the viewport; otherwise the in-view tour rides 1 to 20 and settles on day 14. Both must cross the break-even without input. The default day is 14 (in the range markup, `S.day`, the static readout and the button label) only when the pin does not run: unpinned screens, reduced motion and no JavaScript, so a static view already shows the answer. Pinned screens (from 768 x 640) start at day 1 so the scroll ride can reach the break-even. The readout, the explanation, the button, the station and the "free" labels all use `whole(d) = floor(d + .02)` (the .02 absorbs whole-pixel scroll at a snapped tower), asserted at 12.9, 13 and 13.1.
- **The "free" labels.** One per tower after the break-even, 12px above the cable, revealed by clip-path as the chair passes; on boards under 560px a single counting tag beside the chair instead. The break-even label sits 26px above its station so they never touch.
- **The range input is the real control.** Pointer dragging only sets its value. Keep it visible, aligned under the axis (`left = x(1) - 9px`, `width = x(20) - x(1) + 18px` for an 18px thumb), labelled by the question (`aria-labelledby="q"`) and given the readout as `aria-valuetext`. The polite live region announces pointer and family-toggle changes after 600ms, and it stays quiet for slider changes, which the slider's own value text already announces.
- **`touch-action: pan-y` on the board.** On touch, a vertical swipe still scrolls the page and a horizontal drag moves the chair. A touch sets the day only on a tap (under 10px of travel) or once the move is clearly horizontal (more than 6px, and wider than tall), never on touchdown or on the first move, so a vertical swipe that starts on the chart scrolls and leaves the day alone.
- **Pole orange is graphics only** (3.4:1 on snow, 3.8:1 on card). Do not use it for text. The badge glyph on it is Fir (3.6:1, a graphic).
- **Only the KeyCard is raised.** It keeps the ID-1 ratio (85.6 / 54), the 3.7% / 5.87% radius, a 1px Fir hairline and one soft shadow. Nothing else gets a shadow.
- **Hidden starting states only under `html.js`** (added only when GSAP, ScrollTrigger and Lenis loaded) **and inside `prefers-reduced-motion: no-preference`.** Without the CDN, the chart, slider, form and dialog all work instantly from plain JavaScript. Without JavaScript, the board, legend, readout, family switch and buy form are hidden; the 20-day table, all four pass explanations and a line pointing to the pass machines and ticket office are shown (the form would only reload the page). The price stubs link to those explanations (`#why-day` and so on), so they still go somewhere visible; with JavaScript the click preselects that pass in `#buy` instead.
- **Heading level.** The section starts at an h2 (then h3, h4) and should sit under the host page's h1.
- **The hidden table sits inside a wrapper `div.daytable`.** Visually hiding the `<table>` itself would not work: tables ignore `overflow: hidden`, and the table would widen the page to 658px on phones.
- **The native `<dialog>`** with `margin: auto` (the reset removes it), Escape and backdrop click handled through the closing animation, Lenis stopped while it is open, and two ways back. "Back to passes" focuses the chosen pass card, and "Buy another pass" resets the form and focuses the first pass. The form keeps `novalidate` with JavaScript validation and `preventDefault`, because GitHub Pages answers a POST with 405.

## Adapting

1. **Prices and rules first.** Edit `PRICES` (day, week and season by age, plus family, deposit and week length) and `SEASON`. Update the asserts to the new break-evens, then the copy in the stubs, the `#why` articles, the hint lines and the static no-JS table (regenerate it from the script's `how()` output). Set `MODELS.*.yMax` to about twice the flat pass price and keep both grids at the same fractions of their y-max, so gridlines do not move when switching modes.
2. **Another usage-priced product.** The pattern works for any per-use price against bundles and a flat pass: transit (single, 10-trip, monthly), pools, coworking. Rename the units in the readout, keep one tick per unit of use, and redraw the chair as that world's object (a tram, a swimmer, a desk chair). Keep it small and hanging from, or sitting on, the line.
3. **Tokens.** Change the colour tokens to the brand's map or signage colours, keeping the roles: ground, card, ink, secondary, one graphics-only accent for the cheapest path, and one "winner" colour for the flat line. Keep secondary text at 4.5:1 or better on both ground and card, and the accent at 3:1 or better as a graphic.
4. **Fonts.** Any wide display face can replace Krona One for headings and names. Check its figures before using it for prices. The text face must have tabular figures, either by default (as Signika does) or through `font-variant-numeric: tabular-nums`.
5. **Layout.** From 992px the chart takes columns 1 to 8 and the answer 9 to 12; the form takes 1 to 7 and the sticky checkout 9 to 12. Below that everything stacks. The board is 16 / 10 from 600px and 10 / 9 below. The chair scales with the board, `clamp(1.15, width / 420, 1.7)`. From 560px the break-even label stays on one line; below it wraps at 12.5em with `text-wrap: balance`. Labels are clamped inside the plot.
6. **Retiming or removing motion.** Durations and easings are `:root` tokens (the chart-reveal staggers and offsets are literals in `revealChart()`, and control sizes such as 44, 48 and 56px are literal) (`--t-*` in seconds, `--ease-*` for CSS, `--gs-*` for GSAP ease names that the script reads). Change them there. To remove one effect, delete its line in the load timeline or its `gsap.to` call. The vanilla state functions (`swap`, `station`, `showWhy`, `ride`) already fall back to instant changes when `G()` is false. To drop the libraries entirely, remove the three CDN tags: the page then behaves exactly like the reduced-motion version.
7. **Stack translation.** Keep `single`, `family`, `breakEven` and `how` as pure functions. Render the SVG from their output on resize, keep the range input as the source of truth, and keep the dialog native.

| Token | Role |
|---|---|
| `--snow` | Page ground: the trail map's blue-white paper (Fir on it is 12.1:1). |
| `--card` | Chart board, selected pass card, KeyCard, dialog panel, input fill. |
| `--fir` | Ink, buttons, week-pass staircase, rules, stations, chair outline (13.8:1 on card). |
| `--fir-dark` | Hovered buttons (an opacity layer) and range thumb. |
| `--fir-rgb` | Fir as channels, for `--scrim`, `--tint` and `--shadow-card`. |
| `--tint` | Quiet-button hover wash, Fir at 8%. |
| `--shadow-card` | The KeyCard's 1px Fir hairline and its one soft shadow. |
| `--shade` | Secondary text, axis labels, day-pass dashed line (5.4:1 on snow, 6.1:1 on card). |
| `--pole` | Cheapest-path cable and towers, chair seat, selection badge, focus ring, error marker. Graphics only. |
| `--gentian` | Season and family flat lines, break-even station and its label (6.0:1 on snow). |
| `--hair` | Gridlines, stub separators, card borders, range track. |
| `--scrim` | Dialog backdrop, Fir at 55%. |
| `--font-display` | Krona One: h2, h3, pass names, readout lead, brand. |
| `--font-text` | Signika: body, labels, prices, chart labels. |
| `--fs-xs` | 13px chart ticks, KeyCard fine print, segment ages. |
| `--fs-sm` | 15px hints, notes, legends, labels, break-even label. |
| `--fs-md` | 17px body and buttons. |
| `--fs-lg` | 15 to 18px pass names in Krona One. |
| `--fs-price` | 24 to 32px stub prices and the total. |
| `--fs-xl` | 20 to 28px h3 and the "14 days." readout lead. |
| `--fs-xxl` | h2: 6.9vw up to 64px on phones and tablets, 44 to 64px from 992px. "Which Ferntal pass" fits one line from 360px. |
| `--sp-1` ... `--sp-9` | Spacing 4, 8, 12, 16, 24, 32, 48, 72, 112px. |
| `--gutter` | 16px under 600, 32px to 991, 56px from 992. |
| `--col-gap` | 24px gap of the 12-column grid. |
| `--max` | 1240px section width. |
| `--r-btn` | 4px buttons, inputs, segmented control, range thumb. |
| `--r-pass` | 6px pass cards and dialog panel. |
| `--focus` | 2px pole-orange focus outline. |
| `--t-press`, `--t-release` | MI1 press .12s and release .45s. |
| `--t-fast`, `--t-hover`, `--t-dim`, `--t-sweep` | Border .15s, background .2s, HV7 dimming .3s, HV2 underline .45s. |
| `--t-chrome`, `--t-title`, `--t-rule` | Load: chrome .5s, h2 fade .4s, stub rule and price-row wipe .9s. |
| `--t-fill`, `--t-axis` | Chart reveal: board fill .4s, axes .4s. |
| `--t-snap`, `--t-tour` | Pinned day snap through Lenis .25s; unpinned tour 2.4s. |
| `--t-free`, `--t-dim-ref` | "free" labels clip .25s; losing lines fade .4s at the break-even. |
| `--t-line`, `--t-tick` | Chart lines draw 1.1s; towers and stations pop .3s. |
| `--t-pop`, `--t-reveal`, `--t-unpop` | Break-even station pop .35s, label clip .4s, reverse .2s. |
| `--t-ride`, `--t-reride`, `--t-swing` | Chair follow .3s, re-ride on family toggle 1.6s, seat swing 1.2s. |
| `--t-ghost` | Fine-pointer day cursor follow .25s. |
| `--t-swap`, `--t-xfade`, `--t-form-xfade` | MI2 label swap .35s, TR4 crossfade .45s, form cell crossfade .3s. |
| `--t-seg`, `--t-clip`, `--t-clip-in`, `--t-grow`, `--t-badge` | Segmented clip .4s, error and tick clip .25s, KeyCard field clip-in .3s, focus rule .3s, badge pop .25s. |
| `--t-dialog`, `--t-dialog-out`, `--t-backdrop`, `--t-scroll` | Dialog in .45s and out .3s, backdrop .3s, Lenis anchor scroll 1.1s. |
| `--ease-settle`, `--ease-follow`, `--ease-sweep`, `--ease-xfade` | CSS curves: expo.out, power3.out, the HV2 sweep, power1.out. |
| `--gs-settle`, `--gs-follow`, `--gs-xfade`, `--gs-pop`, `--gs-in`, `--gs-close`, `--gs-swing` | GSAP eases: expo.out, power3.out, power1.out, back.out(2), power3.in, power2.in, elastic.out(1, .35). |

## Motion

House easing: expo.out for entrances and settles, power3.out for pointer follows, power1.out for crossfades, none for the scrubbed ride. Only transform, opacity and clip-path animate: hover darkening on buttons and cards is an opacity layer, the HV2 underline is a scaleX pseudo-element, and colour-only state changes (input borders, segment labels, the checkbox fill, the switch track, the range thumb colour) switch instantly. Lines draw with a clip-path inset (no DrawSVG). The only scrubbed motion is the chair's ride in the pin. Everything runs inside `gsap.matchMedia` with `motion`, `reduce`, `fine` and `pin` (`(min-width: 768px) and (min-height: 640px)`) conditions. Lenis (lerp .1, `autoRaf: false`) runs on `gsap.ticker` with `lagSmoothing(0)`. In-page links go through `lenis.scrollTo` with an expo curve and then move focus to the target heading; Lenis's own `anchors` option is off, so this handler owns them. The cleanup removes the ticker callback, destroys Lenis, kills the crossfade and tour timelines (the pin is reverted by the context), disconnects the pointer listeners and observer, and turns the motion flag off, so every later change is instant.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Brand and three nav links | LD8 | Load, t=0 | y 6 to 0, autoAlpha, .5s expo.out, stagger .06 | Shown at once |
| h2 | Fade | Load, t=.05 | autoAlpha 0 to 1, .4s | Static |
| Stub rule wipes the price row in | SC16 | Load, t=.5 | Rule scaleX 0 to 1 from the left and the stub row's clip-path inset(0 100% 0 0) to inset(0), together, .9s expo.out; the lede shows at once | Static |
| Chart draw | SC16 with an MD1 clip-path | ScrollTrigger `top 92%`, once, armed at t=.6 | Board fill scaleY 0 to 1 from the top .4s (so an unrevealed board is never an empty card); axes autoAlpha .4s; day, week and flat lines clip inset(0 100% 0 0) to inset(0), 1.1s expo.out, stagger .12; cable at .4; towers pop back.out(2) .3s, stagger .025; stations pop; chair drops 14px over .4s | Drawn complete, chair parked on day 14 |
| Chair ride (signature) | SC3-style pin with a scrubbed proxy, not a chaptered stage | Pinned: scroll through `#compare` (1,200px, scrub true, snapped to whole days through Lenis, .25s expo.out), from 768 x 640. Unpinned: once, after the chart draw | Pinned: chair follows the scroll from day 1 to 20, readout, explanation and button change per day. Unpinned: ride 1 to 20 in 2.4s power1.inOut, then settle on day 14 in .9s expo.out; any input ends it | Not pinned, no ride; chair on day 14 |
| Chair handle | CD4, adapted: snapped drag with a range-input equivalent | Pointer drag, tap, touch drag, range keys | Proxy day tweened .3s power3.out along the cable; seat swings ±9° back to 0 over 1.2s elastic.out(1, .35) | Chair jumps |
| Break-even station and label (signature) | MI3-style pop plus MD1 clip | The chair crossing day 13 (day 10 for the family), by scroll, tour, drag or slider | Station scale 0 to 1, .35s back.out(2); label clip-path .4s expo.out; day and week lines to opacity .3 over .4s; all reverse in .2s power3.in | Shown or hidden instantly |
| "free" labels | MD1 clip | The chair passing each tower after the break-even | clip-path inset(0 100% 0 0) to inset(0), .25s expo.out; under 560px one tag beside the chair counts the free days with the MI2 swap | Instant |
| Pass explanation | TR4 | Recommended pass changes (day 6, day 13, family toggle) | Running tween killed, `idx !== current` guard, .45s power1.out crossfade in one grid cell | Instant swap |
| Family of four | TR4 crossfade plus re-ride | Switch | In sequence: old station and label retract .2s power3.in while the chair fades; layers crossfade .45s power1.out while the chair drops onto day 1; then it rides to the current day in 1.6s power1.inOut, popping the day-10 station on the way. Legend MI2 swap; knob slides .45s. Any drag or slider input finishes the sequence at once | Instant |
| "Load a … pass onto a KeyCard" | MI2, MI1 | Recommended pass changes; press | Label swap .35s expo.out; press scale .97 .12s, release .45s power3.out; a `--fir-dark` layer fades in .2s | Instant label, colour only |
| Day cursor over the board | CU1, adapted (native cursor kept) | Fine-pointer move | Line and "14 days: EUR 689" tag follow with quickTo .25s power3.out, snapped to whole days, fade .2s | Off (also off on touch) |
| Brand, nav, mailto links (nav links get a 44px `::before` hit area) | HV2 | Hover, focus-visible | Pseudo-element scaleX .45s cubic-bezier(.35, 0, 0, 1), in from the left, out to the right | Instant; touch shows the underline always |
| Price stubs | HV7 plus HV2 | Hover, focus-visible (`:has`) | Others to opacity .5 over .3s; pass name underline | Instant |
| Range thumb | MI1 | Hover, press | Hover darker (instant) and scaleY 1.08; press scale .94 | Colour only |
| Pass radio cards | MI3 | Change | Badge scale .6 to 1 plus autoAlpha, .25s back.out(2); a 2px inset Fir border layer fades in .15s; a card-ground layer fades in .2s; "Selected" text | No pop |
| Age segmented control | NV4, using clip-path | Change, hover | Inverted Fir layer clip-path inset slides .4s expo; hover text to Fir, instant | Instant |
| Who and date cells | CD9 | Pass change (Family disables ages, Season and Family replace the date) | Opacity .3s, visibility switched at the right end, no height change | Instant |
| Date and KeyCard inputs | MI4 | Focus, invalid submit | Border darkens at once; orange rule scaleX .3s expo; error revealed by clip-path from the top .25s in reserved space; focus to first invalid field, no shake | Instant |
| KeyCard checkbox | MI4 | Change | Tick clip-path from the left .25s; box fill switches at once; number field shown at once, its contents clip in .3s; then `lenis.resize()` and `ScrollTrigger.refresh()` | Instant |
| KeyCard preview, summary, pay label | MI2 | Any form change | Masked label swap .35s expo.out | Instant |
| Confirmation dialog | CD7 | Valid submit | Panel autoAlpha, y 12, scale .98 to 1, .45s expo.out; backdrop .3s; close .3s power2.in; `lenis.stop()` while open; full-width bottom sheet under 600px | .2s fade |
