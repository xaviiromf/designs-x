---
title: Brigade tickets on the pass rail
section: team
subject: The kitchen brigade of Sotobosque, a fictional seasonal restaurant in Valdivia, Chile, that rewrites its menu four times a year; spring service runs Wednesday to Sunday.
aesthetic: The ticket rail over the pass at the start of service. Dot-matrix kitchen tickets on bond paper hang from the steel balls of an aluminium ticket grabber over a mid-tone stainless ground, printed with a red-and-black impact ribbon and lit from above by amber heat lamps.
mode: light
fonts:
  - Doto (Google Fonts, variable wght 100-900 and ROND 0-100). Printed matter only, at 900. ROND 100 (round pins) for the h1 and the dialog name, ROND 45 on tickets so the pins merge into strokes at small sizes, as overlapping impact pins do.
  - Alegreya Sans 400, 500, 700 and italic 400 (Google Fonts; Huerta Tipográfica, Argentina). The restaurant's own voice. Lining tabular figures for the clock, the hour axis and shift hours.
js: Prints nine tickets down from the balls of a double ticket rail on load (the second rail as you reach it) and swings each one as a pendulum from page scroll, the narrow rail's sideways scroll, a mouse drag of the rail, the pointer brushing past and keyboard focus. Plays a station glyph loop and turns up the heat lamp on hover, focus or the centred ticket on touch. Opens a cook dialog with Previous and Next, moves a Friday clock through the shift chart from scroll or a slider, and validates a stage request that becomes a mailto. runSelfTest() runs at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [team, detailed, gsap, lenis, splittext, drag, dot-matrix, kitchen, restaurant, tickets, pendulum, scroll-snap, dialog, form, chart, light]
use_when:
  - A team whose work leaves a physical trace people recognise (tickets, dockets, tags, labels), so each person can be shown as that object rather than a photo.
  - About 6 to 12 people, each with one specific thing they own and one rule they hold to.
  - The page can afford one tactile set piece that answers scrolling, pointing and tabbing.
avoid_when:
  - Portrait photography is the point, or people expect headshots.
  - More than about 15 people. The desktop rail needs a third row and the print run stops reading as one gesture.
  - The page must have no motion at all. The reduced-motion branch is complete, but the swinging paper is the idea.
---

## Why it works

**The bold idea: tickets on a real grabber rail, behaving like hanging paper.** The brigade hangs as nine dot-matrix kitchen tickets, each pinched by the steel ball of an aluminium ticket grabber. On load each visible ticket prints downward out of its ball in 14 jerky line steps, as an impact printer feeds paper (a `clip-path` inset with `steps(14)`, 0.7s), kicks once and settles. Then its heat lamp comes on: printed, then lit. Tickets below the fold (the second rail on a desktop) print as you reach them, like the printer's next batch. The h1 prints the same way, line by line, so the load is one print run. From then on every ticket is a pendulum pivoting on its ball. Page scroll, the narrow rail's sideways scroll, dragging the rail, the pointer brushing past and keyboard focus all push it. The swing is capped at 7deg and settles with `elastic.out(1, .3)` over 1.2s times `sqrt(height / 20rem)`, so long tickets swing slower than short ones. The rest of the page is quiet and only supports this.

- **One model drives every input.** A single GSAP ticker callback reads the rail's `scrollLeft` delta and the page's `scrollY` delta every frame, plus a pointer `nudge` and a virtual drag offset. While something pushes, each ticket's angle eases toward its target. When the push has stopped for 90ms, the elastic settle takes over from the current angle. Page scroll is capped at 4deg and uses a fixed per-ticket `LEAN`, so neighbouring tickets flutter differently instead of skewing as one block. The pointer is an impulse, not a lean: its horizontal velocity over the rail (`-v × 0.006 × k`) pushes the ticket under it and, at half strength, its neighbours on the same rail, so a sweep sets off a ripple; the push decays when the pointer stops and the elastic settle takes over. Keyboard focus gives a single 2deg push in the direction focus travelled, so keyboard users see the paper move too.
- **The rail is real, not a carousel.** From 1200px it is two rails, five tickets over four, each row on its own full-bleed channel (a CSS subgrid, so each channel sits exactly on its row). The four on the second rail hang half a bay over, between the five above, like a double grabber. Below 1200px it is one native `scroll-snap` row (`x mandatory`, centred). There are no clones and no drift. Touch, Tab, Left and Right arrows, Shift-wheel and horizontal trackpad gestures all move it natively, and Tab onto a partly visible ticket centres it. CD3: a mouse can drag the rail (the channel shows a grab cursor). On the scroll row the drag scrolls it, with snap off while dragging and a smooth landing on the nearest ticket; on the fixed desktop rail it shakes a virtual offset, so the paper swings without anything moving. Either way the same ticker reads it as rail velocity, and a drag that moved more than 5px does not open a ticket.
- **Red means a modifier, as on a real docket.** The ribbon is two-colour. Black prints the station, the cook, their role and what they are cooking. Red prints only the modifier line ("- fire lit at 15:00, not later") and the same rule in the dialog. Nothing else on the page is red: errors, event marks and chosen chips are ink.
- **The heat lamp is light, not a UI colour.** Amber appears only as light: a pool anchored at the lamp, brightest on the head of each ticket and the steel just below the rail (an `overlay`-blended radial, so it warms and lifts the steel instead of tinting it brown). It rests at 0.25 and rises to 0.7 while the ticket is hovered, focused or centred on touch, the glow behind the glyph in the dialog, and the clock line on the shift chart, which has an ink edge so it reads on steel and on paper.
- **Printed parts are pins and hand marks are ink.** The 96px station glyphs are drawn with `stroke-dasharray: 0 5` and round caps, so every printed line is a row of pin dots. Marks a person would make, like the ticks on Tomás's prep list, the knife handle and the whisk handle, are solid strokes. Each glyph has a looping GSAP timeline whose time 0 is the static drawing: the bell rings, the ticks are signed off, bubbles rise in the ferment jar, the knife runs along the fillet, the whisk stirs, the flames flicker, the pin rolls, the beans pop out of the pod and the plates stack.
- **Typography.** Doto is a dot-matrix face with a roundness axis. At ROND 100 and 900 the h1 reads as impact print with visible round pins. On tickets ROND 45 lets the pins merge into strokes, which keeps 16 to 18px lines readable, as real 9-pin print does. It is used only for printed matter: the h1, everything on a ticket, the cook's name and rule in the dialog, and the "1 ×" badge on a chosen chip. Alegreya Sans, from Argentine foundry Huerta Tipográfica, is the restaurant's own voice: lede, headings, bios, the chart, the form and every button. Its old-style figures sit well in running text, and the clock, axis and shift hours switch to lining tabular figures ("1111" and "0000" measure the same).
- **Palette from the pass.** `--pass-steel` #AEB5B8 is a flat mid-tone stainless ground. The rail is the only gradient: a deeper steel channel (`--channel-mid` #8C9497) with a lip and a dark slot. `--docket` #F1EDE2 is bond paper, used for tickets, the dialog, fields and lit shifts. `--ribbon-black` #26232B is all text and every focus ring (7.4:1 on steel, 13.2:1 on docket). `--steel-deep` #363C42 is secondary text (5.4:1 on steel). `--ribbon-red` #B8322A is 5.1:1 on docket. Focus is a 3px ink ring with a 2px docket inner ring, so it reads on steel and on paper.
- **"A Friday on the line" supports, it does not compete.** It is never pinned. A scrub from `top 70%` to `bottom 60%` moves a clock from 07:00 to 01:00 in 15-minute steps over natural scroll. A sticky readout leads with the service event ("Family meal, everyone eats together." or "Next: first ticket at 18:30.") and puts "9 of 9 on the line" second. Lit shifts are docket-filled with an ink outline, unlit shifts are an outline only, and names and hours never dim. The slider is an equal control for keyboard, touch and reduced motion, and its thumb centre lines up with the clock line because the bars and the line live in a track inset by half a thumb on each side. Small ink marks on the hour axis show when each event happens.
- **Choices against the collection's defaults.** The first plan was dark blued steel with amber, which is the same dark slate plus amber as features-mixing-plugin and gallery-street-food-market and close to default 2. It is now the light stainless of the pass. Faces were picked against the collection as it stands today: faq-esports-arena uses Bitcount and portfolio-wildlife-photographer uses Rosario, so neither is used here, and no other design loads Doto or Alegreya Sans. A mono face for labels became a dot-matrix face used only where a printer would print. The ticket numbers 01 to 09 were dropped because the tickets are not a sequence. They are in pass order and say station and "Since". Tickets do not lift on hover: paper on a ball rotates, so the pointer brushing past swings it. No decorative shadows; box-shadow is used only for focus rings and the clock line's ink edge. Tickets have square tops, torn zig-zag bottoms (a conic-gradient mask, 12px teeth) and lengths that follow their content plus a 0, 1.5 or 3rem tail. TX2 is used only on the h1, rewritten as print: each line is drawn left to right in 12 steps instead of rising.

### Notes for adapters

- **No ambient loop.** Nothing moves unless the page loads or the person scrolls, points, focuses or taps. Glyph loops stop when the ticket is left or blurred, and the touch loop stops when the rail leaves the screen.
- **Touch.** On the narrow scroll row, the most-centred ticket (picked 120ms after scrolling stops, and only after the tickets have landed) turns up its lamp and plays its loop. Tapping opens the dialog, which plays the loop too. On a wide touch screen the double rail does not scroll, so the dialog is the touch equivalent.
- **The cast** is the kind of brigade a small kitchen in Los Ríos actually has: mostly from the south of Chile (Panguipulli, San Juan de la Costa, Corral, Temuco, Valdivia's German-Chilean families), with a fire cook from Barquisimeto and a kitchen porter from Les Cayes. All names, the restaurant and `cocina@sotobosque.example` are invented. There is no street address.
- **Removed as the last accessory:** the soft amber glow around the clock line. The line already reads as lamp light with its ink edge, and the glow muddied the bars it crosses.
- **If the CDN is blocked** (or GSAP, a plugin or Lenis fails), the `js` class is never added. Nothing is hidden, the rail hangs still (and scrolls natively when narrow), and the plain script still runs the dialog with Previous and Next, focus return, the slider-driven clock, the section spy, the form and its result. Only the motion is missing.

## Do not touch

- The single sway ticker and the `want`, `drive` and `settle` handoff. Inputs only change `scrollLeft`, `scrollY`, `virt` (desktop drag), `nudge`, or call `swing()` once. Do not add per-input rotation tweens. Keep the ±7deg cap, the ±4deg page-scroll cap and the `sqrt(height / 20rem)` settle scaling.
- `transform-origin: 50% calc(var(--channel-h) / 2)` on `.ticket`. The pivot is the ball. Also the `.channel::before` steel plate that hides paper swinging above the grabber, the z-order (lamp pool 0, paper 1, channel 2, ball 3) and the rule that the rail and slots must not create a stacking context. The second rail's half-bay offset uses `left`, not a transform, for that reason.
- `gap: normal` on the desktop `.rail` subgrid. Without it the subgrid keeps the scroll row's 24px row gap and the second channel drifts off its row.
- The print is a `clip-path` on the ticket only, never the ball, and is cleared (`clearProps`) when done so the torn-edge mask and focus ring are not clipped. The drag captures the pointer only after 5px, so a plain click still reaches its ticket.
- Red only for modifier lines and the dialog rule. Amber only as light, never text, fills or borders.
- Time 0 of every glyph loop is the static drawing, because reduced motion and the no-library path show that frame.
- Focus and keyboard: tickets are real `<button>`s labelled "Open <name>, <role>". Left and Right arrows move between them. Closing the dialog returns focus to the cook it last showed and scrolls that ticket into view, on either rail. Nav links land focus on the section h2, except "The rail", which lands on the first ticket because its h2 is visually hidden. Errors focus the first invalid field.
- Hidden start states (h1, chrome, channels, unprinted tickets, lamps, hint) are set in JS inside the motion branch only. Do not move them into CSS.
- The h1's SplitText lines are clipped with negative top and bottom insets so Doto's descenders show while printing, and the split is reverted once printed so lines reflow on resize.
- `form.parentElement.style.minHeight` before the result panel replaces the form, so the page does not jump.

## Adapting

Start with the colour tokens and the nine tickets. A ticket is one `<li class="slot">` with its `--tail` (0, 1.5 or 3rem), a ball, and a button whose `.paper` holds the head (station and since), a glyph, the name, the role and the dish lines (black) with one modifier (`.t-mod`, red). Add the matching entry to `COOKS` in the same order (bio, two menu lines and the rule) and its shift row (`data-s`, `data-e` in minutes from midnight, with `--s` and `--e` as fractions of 07:00 to 01:00). Keep dish lines short: about 15 characters fit one printed line on the narrowest desktop ticket and 22 on the scroll row. Longer lines wrap with a hanging indent. Ticket names scale with `min(var(--t-xl), 16cqi)`, so a ten-letter surname always fits one line.

For a different count, change `repeat(5, ...)` on `.rail-wrap`, the number of `.channel` elements (one per row) and the `.slot:nth-child(n+6)` half-bay offset at the 1200px breakpoint. Drop the offset when the second row is full. For another subject, keep the object and the physics and change the vernacular: luggage tags on a carousel, bag tags on a coat rail, work orders on a garage board. A new glyph needs a `data-g` key and a `LOOPS` entry that starts and ends on its static drawing.

Retiming and removing motion:

- **Load:** offsets live in the `tl` built after fonts load (1.5s cap). Chrome is at 0.1, the h1 lines at 0.15 (0.45s each, 0.18 stagger), the channels at 0.45, the tickets from 0.8 with a 0.12 stagger, and the hint at 1.6. `printTicket()` holds the print, kick, settle and lamp. To drop the print, delete the `inX` sets, the `vis.forEach` and the `later` triggers. The tickets then hang in place and still swing.
- **Physics:** `0.004` (rail velocity to degrees, also the desktop drag), `0.0016` (page velocity), `0.006` (pointer velocity) and its 0.8-per-frame decay, `LEAN`, the 90ms stillness before settling, the ±2deg focus push and `1.2 * t.k` in `settle`. For a stiffer rail, lower the multipliers. To remove the swing, delete `gsap.ticker.add(sway)`.
- **Hover, press, sweep and lamp timings** are the `--d-*` and `--ease-*` tokens. Dialog, TR1 and form-swap timings are in the script next to each `fx` hook.
- **Clock range:** `start: 'top 70%', end: 'bottom 60%'` on `#shifts`. The 72 steps are 18 hours in 15-minute increments.
- **Reduced motion** is its own matchMedia branch: no Lenis, no print, no swing, no loops (poster frames only), the lamp pool brightening instantly on hover and focus, instant buttons and a dialog that appears and closes at once. The clock rests at 18:30, first ticket, and only the slider moves it.

| Token | Role |
|---|---|
| `--pass-steel` | Page ground: flat mid-tone stainless; also the plate above each channel and the sticky readout |
| `--docket` | Ticket paper, dialog, input fields, lit shifts, chosen chip, focus inner ring |
| `--ribbon-black` | All text, focus rings, button fills, the clock thumb, lit shift outlines, event marks, error marks |
| `--steel-deep` | Secondary text, hint, unlit shift outlines, chip and field borders at rest |
| `--ribbon-red` | Modifier lines and the dialog rule only |
| `--heat-lamp`, `--pool`, `--pool-0` | Light only: the clock line, and the radial lamp pool behind tickets and the dialog glyph (`--pool-0` is its transparent end) |
| `--track` | Unfilled slider track, #5A6166 (3:1 on steel) |
| `--channel-hi`, `--channel-mid`, `--channel-lo` | The grabber channel's lip, faces and slot (the only gradient) |
| `--ball`, `--ball-rim` | Steel balls |
| `--rule` | Hairlines between shift rows and under the header |
| `--veil` | Dialog backdrop (ink at 55%, with a 4px blur) |
| `--font-print`, `--pins`, `--pins-small` | Doto, with ROND 100 for display and ROND 45 for ticket sizes |
| `--font-voice` | Alegreya Sans: everything the restaurant says |
| `--t-xs` | 14px: hour axis, chip badge |
| `--t-s` | 16px: ticket head and role, secondary lines, hint, errors |
| `--t-m` | 18px: body, ticket dish lines (leading 1.35 on tickets, 1.55 in text) |
| `--t-l` | 24px: lede, readout event, dialog role and rule, result summary |
| `--t-xl` | 32px: ticket names (capped by 16cqi), h2 |
| `--t-2xl` | 42.7px: clock readout, dialog name at width |
| `--t-display` | 37 to 88px fluid: the h1 |
| `--s-1` to `--s-9` | Spacing: 4, 8, 12, 16, 24, 32, 48, 72, 112px |
| `--gutter` | Side padding, 16 to 48px |
| `--measure` | Bio line length in the dialog, 62ch |
| `--col-gap` | 12-column gap |
| `--ticket-w`, `--ticket-gap` | Scroll row: 78vw (max 18rem) with 1.5rem gaps below 768px, 16.5rem with 2rem gaps to 1199px; from 1200px tickets fill five columns with 1.5rem gaps |
| `--pool-x`, `--pool-y` | How far the lamp light spills past the paper (half a gap on the scroll row, 3rem and 4rem on the desktop rail) |
| `--channel-h`, `--ball-d`, `--rail-pt` | Channel height, ball size, headroom above the channel |
| `--tooth` | Torn-edge tooth width (depth is half) |
| `--thumb` | Slider thumb; also the inset that aligns bars and the clock line with it |
| `--header-h` | Sticky header height from 768px (0 below, where the header scrolls away) |
| `--r-btn` | 2px on buttons, chips and fields. Tickets and the dialog are square. The thumb and balls are round. |
| `--d-press`, `--d-quick`, `--d-lamp`, `--d-fill-out`, `--d-ui`, `--d-fill-in`, `--d-release`, `--d-sweep` | 0.12, 0.2, 0.3, 0.3, 0.35, 0.4, 0.45, 0.45s |
| `--ease-out`, `--ease-release`, `--ease-pop` | expo.out, power3.out, back.out(2) as cubic-beziers |

## Motion

Technique ids refer to `research/motion-techniques.md`.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Brand line and nav links rise in | LD8 | Load, t=0.1 | y 6 to 0, 0.5s expo.out, stagger 0.08 | Shown |
| h1 lines print left to right | TX2 (as print) | Load, t=0.15, after fonts (1.5s cap) | clip-path inset right 100% to 0, steps(12), 0.45s per line, stagger 0.18; split reverted after | Shown |
| Grabber channels draw from the printer end (right) | SC16 | Load, t=0.45 | scaleX 0 to 1, 0.9s expo.out, stagger 0.1 per rail | Static |
| Visible tickets print downward from their balls in 14 line steps, kick once and settle | Signature | Load, from t=0.8 | clip-path inset bottom 100% to 0, steps(14), 0.7s, stagger 0.12; then 4deg × lean in 0.18s power2.out and elastic.out(1,.3) for 1.2s × sqrt(h/20rem) | Fully shown, hanging still |
| Tickets below the fold print as you reach them | Signature + ScrollTrigger | Each slot's top at 85% of the viewport, once | Same print, stagger 0.12 within a rail | Fully shown |
| Each ticket's heat lamp comes on once printed | Signature | When its print ends | Pool opacity 0 to rest, 0.5s power1.out | Lamps on |
| Hint line | LD8 | Load, t=1.6 | 0.4s fade | Shown |
| Paper swings from page scroll and the narrow rail's scroll | Signature + SC10 | Any change in `scrollY`, or the rail's `scrollLeft`, while the rail is in view | Eased per frame (0.15 at 60fps), capped at ±7deg (page part ±4deg); settles 90ms after input stops | Off |
| The pointer brushing the rail swings the paper | Signature (pointer input) | Mouse moving over a ticket, fine pointers | -velocity × 0.006 × k on that ticket, half on its rail neighbours, ±7deg cap; decays when the pointer stops, then the elastic settle | Off |
| Drag the rail | CD3 | Mouse drag on the rail or channel (grab cursor on the channel) | Scroll row: scrolls 1:1, snap off while dragging, smooth landing on the nearest ticket. Desktop: virtual offset read as rail velocity. Touch keeps native scroll | Scroll row drags without swing; desktop drag off |
| Ticket swings when keyboard focus arrives | Signature (keyboard input) | `:focus-visible` on a ticket | ±2deg in 0.18s power2.out, then the elastic settle | Off |
| Clock moves through the day | SC11 (progress to data) | Scroll through `#shifts`, top 70% to bottom 60%, at every width | Scrub, 15-minute steps, no easing | Rests at 18:30; slider only |
| Lit shift fill | Opacity layer | Clock time inside a shift | 0.2s | Instant |
| Nav marks the section in view | NV6 | IntersectionObserver, rootMargin -40% 0 -55% 0 | Underline sweep 0.45s | Static underline |
| Nav and skip links glide and land focus on the h2 (on the first ticket for "The rail", whose h2 is visually hidden) | NV6 | Click | Lenis, min(1.3, 0.65 + distance / 4000)s | Native jump |
| Skip the rail | Translate reveal | Focus | 0.35s expo.out | Instant |
| Station loop plays and the heat lamp brightens | HV10 (generated) | Hover or keyboard focus; on touch, the most-centred ticket of the scroll row | Lamp 0.3s; loops 1.2 to 2s, repeat with a 0.25s gap; leave rewinds to time 0 in 0.25s | Poster frame, lamp brightens instantly |
| Ticket press | MI1 | Press | scale .975 in 0.12s, release 0.45s power3.out | Instant |
| Cook dialog prints open and is torn off | CD7 (as print) | Ticket click, Enter or Space; Close, Escape, backdrop | In: clip-path from the top edge, steps(18), 0.55s; out: y -16, -2deg and fade, 0.25s power2.in; backdrop 0.3s; Lenis stopped while open | Instant |
| Previous and next cook | TR1 | Button click | Content and its two headings out 0.25s power2.in, stagger 0.03; in 0.55s expo.out, stagger 0.07; killed on rapid input | Instant swap |
| Buttons (Request, Email it, Previous, Next) | HV4 + MI1 | Hover fill from the entry edge; focus; press | Fill in 0.4s, out 0.3s toward the exit edge; press 0.12s | Colour swap |
| Text links and buttons (nav, Close, Change the request, footer) | HV2 + MI1 | Hover, focus | Underline in from the left, out to the right, 0.45s | Static underline |
| Field focus rule draws from the left | MI4 | Focus | 0.35s expo.out | Instant |
| Error reveals | MI4 (grid-template-rows) | Invalid submit, then live | 0.25s | Instant |
| Chip chosen: docket fill and printed "1 ×" badge | MI3 | Radio change | Badge 0.25s back.out(2) from .6 | No pop |
| Slider thumb grows | Hover and focus | Hover or focus | 0.2s expo.out to 1.25 | Instant |
| Form out, result in (and back) | Crossfade and rise | Valid submit; Change the request | Out 0.25s power2.in; in 0.5s expo.out from y 16 | Instant swap |
