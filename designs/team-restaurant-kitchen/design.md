---
title: The nine people behind tonight's tickets
section: team
subject: The kitchen brigade of Sotobosque, a fictional seasonal restaurant in Valdivia, Chile, that rewrites its menu four times a year; spring service runs Wednesday to Sunday.
aesthetic: The ticket rail over the pass at the start of service. Dot-matrix kitchen tickets on cream bond hang from the steel balls of an aluminium ticket grabber, over a flat stainless-steel ground, printed with a red-and-black impact ribbon.
mode: light
fonts:
  - Bitcount Grid Double, ELSH 100 (round pins), wght 700 to 800 (Google Fonts, variable ELSH and wght)
  - Rosario 400, 500, 600, 700 (Google Fonts, variable wght 300..700 with italic; Omnibus-Type, South America)
js: Prints nine tickets onto a ticket rail and swings each one as a pendulum from drag, rail scroll, page scroll and pointer velocity. Plays a station glyph loop on hover, focus or when a ticket is centred on touch. Opens a cook dialog with Previous and Next, scrubs a Friday clock through the shift chart, and validates a stage request that becomes a mailto. runSelfTest() runs at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Observer), Lenis 1.3.26]
tags: [team, detailed, gsap, lenis, observer, splittext, dot-matrix, kitchen, restaurant, tickets, pendulum, drag, scroll-snap, dialog, form, chart, light]
use_when:
  - A team whose work leaves a physical trace people recognise (tickets, dockets, tags, labels), so each person can be shown as that object rather than a photo.
  - About 6 to 12 people, each with one specific thing they own and one rule they hold to.
  - The page can afford one tactile set piece, and visitors are likely to drag, swipe or tab through it.
avoid_when:
  - Portrait photography is the point, or people expect headshots.
  - More than about 15 people. The rail becomes a long sideways scroll and the print sequence stops reading as one gesture.
  - The page must have no motion at all. The reduced-motion branch is complete, but the swinging paper is the idea.
---

## Why it works

**The bold idea: tickets fired onto the rail.** The brigade hangs as nine dot-matrix kitchen tickets, each pinched by the steel ball of a real ticket grabber. On load, each visible ticket prints downward from its ball in 14 jerky line feeds (a `steps(14)` clip-path), the way an impact printer feeds paper. Then it is torn off and swings once. From then on the tickets act like hanging paper. Dragging the rail, scrolling it, scrolling the page or brushing a ticket with the pointer swings each one around its ball. The tilt comes from velocity and is capped at 7deg. Each ticket settles with `elastic.out(1, .3)` over 1.2s times `sqrt(height / 20rem)`, so long tickets swing slower than short ones, like a real pendulum. The rest of the page is quiet and only supports this.

- **One model drives every input.** A single GSAP ticker callback reads the rail's `scrollLeft` delta and the page's `scrollY` delta every frame. Mouse drag (Observer), momentum, touch swipe, trackpad, Tab and the arrow keys all move `scrollLeft`, so they all swing the paper through the same code. While something pushes, each ticket's angle eases toward its target. When the push has stopped for 90ms, the elastic settle takes over from the current angle. Page scroll adds a smaller sway, capped at 4deg, with a fixed per-ticket `LEAN` so neighbouring tickets flutter differently instead of skewing as one block.
- **The rail is finite and native.** It is a `scroll-snap` row (`x mandatory`, centred) at every width, with no clones, wrap or auto-drift. On a fine pointer, an Observer drag scrolls it, throws it with momentum and lands exactly on a snap point, so snapping never jumps. A click after a drag is swallowed. Touch, Tab, Left and Right arrows, Shift-wheel and horizontal trackpad gestures (`data-lenis-prevent-horizontal`) all work without it.
- **Red means a modifier, as on a real docket.** The ribbon is two-colour. Black prints the station, the cook, their role and what they are cooking. Red prints only the modifier line ("- fire lit at 15:00, not later") and the same rule in the dialog. On the chart, red is the clock line and the outline of a lit shift, because those are the "right now" marks.
- **Printed parts are pins and hand marks are ink.** The 96px station glyphs are drawn with `stroke-dasharray: 0 5` and round caps, so every printed line is a row of pin dots. Marks a person would make, like the ticks on Tomás's prep list, the knife handle and the whisk handle, are solid strokes. Each glyph has a looping GSAP timeline whose time 0 is the static drawing: the bell rings, the ticks are signed off, bubbles rise in the ferment jar, the knife runs along the fillet, the whisk stirs, the flames flicker, the pin rolls, the beans pop out of the pod and the plates stack.
- **Typography.** Bitcount Grid Double at ELSH 100 reads as 9-pin impact print with round dots. It is used only for printed matter: the h1, everything on a ticket, the cook's name and rule in the dialog, and the "1 ×" badge on a chosen chip. Rosario, from South American foundry Omnibus-Type, is the restaurant's own voice: lede, headings, bios, the chart, the form and every button. Its old-style figures sit well in running text. The clock readout switches to lining figures and puts each digit in a fixed `1ch` slot, because Rosario's tabular figures did not measure equal widths in Chrome.
- **Palette from the pass at the start of service.** `--pass-steel` #B9C1C5 is a flat stainless ground with no brushed gradient. `--docket` #F6F2E6 is bond paper, used for tickets, the dialog and the fields. `--ribbon-black` #2A2730 is used for all text and focus rings (8.0:1 on steel, 13:1 on docket). `--steel-deep` #3A4046 is used for secondary text (5.7:1). `--ribbon-red` #B8322A is 5.3:1 on docket for modifier text and 3.3:1 on steel for the clock line and bar outlines (non-text). `--heat-lamp` #F0A43A is never text. It is the lamp glow behind a hovered glyph, the cursor disc and the primary button's hover fill (ink on amber is 7.0:1).
- **The rail is the only gradient.** It is a hard-stopped aluminium channel with a lip, faces and a dark slot. A flat steel plate above it hides any paper that swings above the grabber, so the tickets always look pinched.
- **"A Friday on the line" supports, it does not compete.** It is not pinned. An unpinned scrub from `top 70%` to `bottom 60%` moves a clock from 07:00 to 01:00 in 15-minute steps. A sticky readout leads with the service event ("Family meal, everyone eats together." or "Next: first ticket at 18:30.") and puts "9 of 9 on the line" second. Lit shifts are docket-filled with a red outline. Unlit shifts are an outline only. Names and hours never dim. The slider is the keyboard, touch and reduced-motion equivalent, and its thumb centre lines up with the red clock line because the bars and the line live in a track inset by half a thumb on each side. Small red marks on the hour axis show when each event happens.
- **Choices against the collection's defaults.** The first plan used dark blued steel with amber, which is close to features-mixing-plugin and to the collection's habit of amber on dark. It is now light stainless. A mono face for labels became a dot-matrix face that is only used where a printer would print. The ticket numbers 01 to 09 were dropped because the tickets are not a sequence. They are in pass order and say station and "Since". Tickets do not lift on hover. Paper on a ball rotates, so hover nudges the ticket 1.5deg toward the pointer instead. There are no shadows. Tickets have square tops, torn zig-zag bottoms (a conic-gradient mask, 12px teeth) and lengths that follow their content plus a 0, 1.5 or 3rem tail. TX2 is used only on the h1.

### Notes for adapters

- **No ambient loop.** Nothing moves unless the page loads, the person scrolls, drags, hovers, focuses or taps. The infinite drifting strip in the plan was cut, because surf-school and skate-archive already have one. With no drift there is nothing to pause, so there is no Pause control.
- **Touch.** The most-centred ticket in the scroller (picked 120ms after scrolling stops) lights its lamp and plays its loop. Tapping opens the dialog, and the dialog plays the loop too. Swiping the rail swings the paper through the same ticker.
- **Cursor follower (fine pointers only).** A 10px heat-lamp disc trails 18px below and to the right of the native cursor, so it never covers what you point at. It reads "Open" over a ticket and "Drag" over the rail gaps. It becomes a ring over other links, buttons and chips. It hides over text inputs, the slider, the rail's native scrollbar, outside the window and while the dialog is open. The same words are in the visible hint, "Drag the rail, or tab to a ticket and press Enter."
- **Removed as the last accessory:** a printed "1 ×" before each dish in the dialog. It echoed the tickets, but read wrong on lines like "Knife sharpening, Mondays at 16:00".
- **If the CDN is blocked** (or GSAP, a plugin or Lenis fails), the `js` class is never added. Nothing is hidden, the rail scrolls natively, and the plain script still runs the dialog with Previous and Next, focus return, the slider-driven clock, the section spy, the form and its result. Only the motion is missing.

## Do not touch

- The single sway ticker and the `want`, `drive` and `settle` handoff. Do not add per-input rotation tweens: inputs only change `scrollLeft`, `scrollY` or `nudge`. Keep the ±7deg cap, the ±4deg cap on page scroll and the `sqrt(height / 20rem)` settle scaling.
- `transform-origin: 50% calc(var(--channel-h) / 2)` on `.ticket`. The pivot is the ball. Also the `.channel::before` plate, the z-order (paper 1, channel 2, ball 3) and the rule that the rail must not create a stacking context.
- The snap-point momentum: `snapTo` lands on a `centreOf(i)` value before `is-dragging` (which sets `scroll-snap-type: none`) is removed. Landing anywhere else makes the browser re-snap with a jump.
- Red only for modifier lines, the clock line and lit outlines. Amber never as text.
- Time 0 of every glyph loop is the static drawing, because reduced motion and the no-library path show that frame.
- Focus and keyboard: tickets are real `<button>`s labelled "Open <name>, <role>". Left and Right arrows move between them. Closing the dialog returns focus to the cook it last showed and scrolls that ticket into view. Nav links land focus on the section h2. Errors focus the first invalid field.
- Hidden start states (h1, chrome, channel, balls, clip-paths, hint) are set in JS inside the motion branch only. Do not move them into CSS.
- The h1's SplitText masks get `.wm` padding so Bitcount's descenders are not clipped at rest.
- `form.parentElement.style.minHeight` before the result panel replaces the form, so the page does not jump.

## Adapting

Start with the colour tokens and the nine tickets. A ticket is one `<li class="slot">` with its `--tail` (0, 1.5 or 3rem), a ball, and a button whose `.paper` holds the head (station and since), a glyph, the name, the role and the dish lines (black) with one modifier (`.t-mod`, red). Add the matching entry to `COOKS` in the same order (bio, two menu lines and the rule) and its shift row (`data-s`, `data-e` in minutes from midnight, with `--s` and `--e` as fractions of 07:00 to 01:00). Keep the dish lines short: about 22 characters fit one printed line at 17px, and longer lines wrap with a hanging indent. Names wrap freely, and the paper grows.

For another subject, keep the object and the physics and change the vernacular: luggage tags on a carousel, bag tags on a coat rail, work orders on a garage board. A new glyph needs a `data-g` key and a `LOOPS` entry that starts and ends on its static drawing.

Retiming and removing motion:

- **Load:** offsets live in the `tl` built after fonts load. Chrome is at 0.1, h1 at 0.15, the channel at 0.5, balls at 0.6, the print from 0.9 with a 0.12 stagger, and the hint at 1.6. To drop the print, delete the `vis` clip-path set and the loop that prints. The tickets then hang static and still swing.
- **Physics:** `0.004` (rail velocity to degrees), `0.0016` (page velocity), `LEAN`, the 90ms stillness before settling and `1.2 * t.k` in `settle`. For a stiffer rail, lower the multipliers. To remove the swing, delete `gsap.ticker.add(sway)`.
- **Hover, press, sweep and lamp timings** are the `--d-*` and `--ease-*` tokens. Dialog, TR1 and form-swap timings are in the script next to each `fx` hook.
- **Clock range:** `start: 'top 70%', end: 'bottom 60%'` on `#shifts`. The 72 steps are 18 hours in 15-minute increments.
- **Reduced motion** is its own matchMedia branch: no Lenis, no print, no swing, no loops (poster frames only), a static lamp tint on hover and focus, instant buttons and a fade-only dialog. The clock rests at 18:30, first ticket, and only the slider moves it.

| Token | Role |
|---|---|
| `--pass-steel` | Page ground: flat stainless steel; also the plate above the channel |
| `--docket` | Ticket paper, dialog, input fields, chosen chip, focus halo |
| `--ribbon-black` | All text, focus rings, button fills, the clock thumb and the elapsed track |
| `--steel-deep` | Secondary text, hint, unlit shift outlines, chip borders at rest |
| `--ribbon-red` | Modifier lines, dialog rule, clock line, lit shift outline, event marks, error marks |
| `--heat-lamp` | Non-text fill only: lamp glow, cursor disc, primary button hover |
| `--channel-hi`, `--channel-mid`, `--channel-lo` | The grabber channel's lip, faces and slot (the only gradient) |
| `--ball`, `--ball-rim` | Steel balls |
| `--rule` | Hairlines between shift rows and under the header |
| `--veil` | Dialog backdrop (ink at 55%, with a 4px blur) |
| `--font-print` | Bitcount Grid Double: h1, tickets, dialog name and rule, chip badge |
| `--font-voice` | Rosario: everything the restaurant says |
| `--t-xs` | 13px: hour axis, chip badge |
| `--t-s` | 15px: ticket head and role, secondary lines, hint, errors |
| `--t-m` | 17px: body, ticket dish lines (leading 1.35 on tickets, 1.55 in text) |
| `--t-l` | 22.7px: lede, readout event, dialog role and rule, result summary |
| `--t-xl` | 30px: ticket names, h2 |
| `--t-2xl` | 40px: clock readout, dialog name at width |
| `--t-display` | 37 to 96px fluid: the h1 |
| `--s-1` to `--s-9` | Spacing: 4, 8, 12, 16, 24, 32, 48, 72, 112px |
| `--gutter` | Side padding, 16 to 48px |
| `--col-gap` | 12-column gap |
| `--ticket-w`, `--ticket-gap` | 16.5rem and 2rem from 768px; 78vw (max 18rem) and 1.5rem below |
| `--channel-h`, `--ball-d`, `--rail-pt` | Channel height, ball size, headroom above the channel |
| `--tooth` | Torn-edge tooth width (depth is half) |
| `--thumb` | Slider thumb; also the inset that aligns bars and the clock line with it |
| `--header-h` | Sticky header height from 768px (0 below, where the header scrolls away) |
| `--r-btn` | 2px on buttons, chips and fields. Tickets and the dialog are square. The thumb is round. |
| `--d-press`, `--d-quick`, `--d-lamp`, `--d-fill-out`, `--d-ui`, `--d-fill-in`, `--d-release`, `--d-sweep` | 0.12, 0.2, 0.3, 0.3, 0.35, 0.4, 0.45, 0.45s |
| `--ease-out`, `--ease-release`, `--ease-pop` | expo.out, power3.out, back.out(2) as cubic-beziers |

## Motion

Technique ids refer to `research/motion-techniques.md`.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Brand line and nav links rise in | LD8 | Load, t=0.1 | y 6 to 0, 0.5s expo.out, stagger 0.08 | Shown |
| h1 words rise and straighten | TX2 | Load, t=0.15, after fonts (1.5s cap) | yPercent 100 to 0, -2deg to 0, 0.7s back.out(1.2), stagger amount 0.45 | Shown |
| Grabber channel draws from the left, balls pop in | SC16 | Load, t=0.5 and 0.6 | scaleX 0.9s expo.out; balls 0.4s back.out(2), stagger 0.05 | Static |
| Visible tickets print down from their balls, then swing once | Signature | Load, from t=0.9 | clip-path 0.7s steps(14), stagger 0.12; kick to ±6deg in 0.16s, then elastic.out(1,.3) for 1.2s × sqrt(h/20rem) | Static, visible |
| Hint line | LD8 | Load, t=1.6 | 0.4s fade | Shown |
| Paper swings from rail and page velocity | Signature + SC10 | Any change in the rail's scrollLeft or the page's scrollY while the rail is in view | Eased per frame (0.15 at 60fps), capped at ±7deg (page part ±4deg); settles 90ms after input stops | Off |
| Clock moves through the day | SC11 (progress to data) | Scroll through `#shifts`, top 70% to bottom 60% | Scrub, 15-minute steps, no easing | Rests at 18:30; slider only |
| Lit shift fill | Opacity layer | Clock time inside a shift | 0.2s | Instant |
| Nav marks the section in view | NV6 | IntersectionObserver, rootMargin -40% 0 -55% 0 | Underline sweep 0.45s | Static underline |
| Nav and skip links glide and land focus on the h2 | NV6 | Click | Lenis, min(1.3, 0.65 + distance / 4000)s | Native jump |
| Skip the rail | Translate reveal | Focus | 0.35s expo.out | Instant |
| Rail drag with momentum, landing on a ticket (fine pointers) | CD3, finite and clamped, plus CD1 | Mouse drag on the rail | Follows the pointer; throw 0.9s expo.out to the nearest snap point | Native scroll only |
| Station loop plays and the heat lamp comes on | HV10 (generated) | Hover or keyboard focus; on touch, the most-centred ticket | Lamp 0.3s; loops 1.2 to 2s, repeat with a 0.25s gap; leave rewinds to time 0 in 0.25s | Poster frame, static lamp tint |
| Ticket nudges toward the pointer | Signature (pointer input) | Pointer move over a ticket | Up to ±1.5deg; elastic settle on leave | Off |
| Ticket press | MI1 | Press | scale .975 in 0.12s, release 0.45s power3.out | Instant |
| Cook dialog opens and closes | CD7 | Ticket click, Enter or Space; Close, Escape, backdrop | In: 0.45s expo.out from y 12 and .98; out: 0.3s power2.in; backdrop 0.3s; Lenis stopped while open | Fade only |
| Previous and next cook | TR1 | Button click | Out 0.25s power2.in, stagger 0.03; in 0.55s expo.out, stagger 0.07; killed on rapid input | Instant swap |
| Buttons (Request, Email it, Previous, Next) | HV4 + MI1 | Hover fill from the entry edge; focus; press | Fill in 0.4s, out 0.3s toward the exit edge; press 0.12s | Colour swap |
| Text links and buttons (nav, Close, Change the request, footer) | HV2 + MI1 | Hover, focus | Underline in from the left, out to the right, 0.45s | Static underline |
| Field focus rule draws from the left | MI4 | Focus | 0.35s expo.out | Instant |
| Error reveals | MI4 (grid-template-rows) | Invalid submit, then live | 0.25s | Instant |
| Chip chosen: docket fill and printed "1 ×" badge | MI3 | Radio change | Badge 0.25s back.out(2) from .6 | No pop |
| Slider thumb grows | Hover and focus | Hover or focus | 0.2s expo.out to 1.25 | Instant |
| Form out, result in (and back) | Crossfade and rise | Valid submit; Change the request | Out 0.25s power2.in; in 0.5s expo.out from y 16 | Instant swap |
| Cursor follower with "Open" and "Drag" labels | CU1 | Pointer move (fine pointers) | quickTo 0.4s power3; state changes 0.3s | None |
