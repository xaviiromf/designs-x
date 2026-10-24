---
title: Velodrome lap board booking hero
section: hero
subject: Hebble Six, the six-day track race at the fictional Hebble Bridge Velodrome (Tue 10 to Sun 15 November 2026), selling event nights by night, viewing area and seat count.
aesthetic: A plan-view drawing of a 250 m Siberian-pine track with its real painted lines, an infield lap board and arena navy, set in a wide stadium display face.
mode: dark
fonts:
  - Unbounded (Google Fonts, variable wght 200-900), for the H1, H2s, wordmark, menu links and both lap boards
  - Onest (Google Fonts, variable wght 100-900), for body, rows, form, captions and prices
js: Runs a real-progress lap-board preloader that flips into the infield, a Madison pair lapping the track with speed coupled to scroll velocity and a lap board that counts down at the finish line, a scrubbed stage tilt, seats-left bars, line reveals, a pointer metre marker, the menu sheet, two dialogs and a validated booking form with a waiting-list branch.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Flip), Lenis 1.3.26]
tags: [hero, booking, events, sport, cycling, velodrome, svg, dark, gsap, lenis, preloader, dialog, form]
use_when:
  - Selling dated sessions of a live event (race nights, match days, festival days) where the venue's plan and the choice of where to sit matter.
  - The subject has a drawable venue or apparatus with real markings that can carry the hero (a track, a pitch, a pool, a ring).
  - You want a choreographed, detailed-tier hero with one ambient loop that is about the subject, not decoration.
avoid_when:
  - The venue has no recognisable plan, or the seat choice is irrelevant (general admission, online events). The stage would be decoration.
  - Bookings need real payment, seat maps with numbered seats, or account sign-in. This is a hold-and-collect flow.
  - A light, quiet brand. The arena navy, wide display face and live loop are loud by design.
---

## Why it works

**The one bold idea: the track is the stage.** The right half of the hero is a plan of a 250 m velodrome drawn to scale in metres: a stadium with 42 m straights and 26.4 m bends on the measurement line, Siberian-pine boards with lengthwise plank seams, and the real lines in their real order from the inside out (the blue cote d'azur, the black measurement line, the red sprinter's line 0.85 m up, the blue stayer's line 2.45 m up), a finish line on the home straight, the banking rail and the upper tier. A Madison pair laps it: the racing rider holds the sprinter's line while the partner rolls high on the banking, and they swap with a hand-sling on the back straight. The infield lap board reads 200 and ticks down each time the racing rider crosses the finish line. Everything else on the page serves this.

- **The board is honest about time.** At rest the racer laps in 8.4 s, twice the real 16.7 s lap of a 54 km/h Madison, so it reads as racing on screen. A cycle is two racer laps and one partner lap. They meet at the 113 m mark on the back straight at matched speed (both at three quarters of the racer's average as they converge), then swap roles. Scrolling couples to the riders: every 500 px/s of ScrollTrigger velocity adds one lap speed, capped at 5x (a 1.7 s lap), and the boost decays by 10% a frame once you stop. Because it reads ScrollTrigger velocity and not Lenis velocity, it works on native touch scroll too.
- **The pair is drawn to be read, not to scale.** Riders are drawn 2.8x scale on wide screens and 3.5x on phones (`--rider` on `.stage`). The racer is lamp white with a sprinter-red trail that grows from 3 m at rest to 12 m at full speed. The partner rolling high is navy with a lamp outline. At the sling a pine arc draws from the outgoing racer to the incoming one and fades, and every finish-line crossing flashes the white finish band, so faster counting is also a faster flash at the line.
- **The preloader is the same board.** LD1 counts real progress (fonts 0.6, the track sampled into 250 one-metre points 0.2, window load 0.2) from 000 up to 200 laps, then Flip fits that board onto the infield slot while the azur curtain lifts. The caption grows from "laps" to "laps to go" as the riders roll out from the finish line. There is one count only. If everything is ready within 300 ms there is no fake progress: the three columns roll 000 to 200 once (.5s expo.out, stagger .04) to introduce the odometer, and the hand-off starts .1 s after they land, so content arrives in under a second. The page behind the curtain (header, main, skip link) is inert until the curtain lifts. The hard release is at 6 s, and a CSS failsafe hides the loader at 8 s if the script never takes over.
- **The stage moves with the decision.** On wide screens the stage is CSS-sticky (no pin) and one bounded scrub tilts it from a roof-gantry plan to a rail-level view (rotateX 52deg at 760px perspective, with `preserve-3d`) while you read the nights. The lap board counter-rotates on its bottom edge so it stands up in the infield like a real board and stays readable, and the rider layer sits 3px above the boards, then flattens it back to a plan when you reach "Choose where you watch". The area you pick lights up on the plan, so the flat view is the one you choose from. On phones the stage stays flat and sits straight after the H1, so the track and board are in the first viewport; each area row's mini oval lights the same way as the stage zone, so the choice shows on a plan wherever you are looking.
- **The lap board is not default 6.** It is a big numeral with a small caption, but it is a diegetic object: a lap board drawn inside the infield at the scale of the track, counting real laps of a real loop, with no gradient and no supporting stats row. The H1 and the track lead the hero, and the board is about a fifth of the stage width.
- **Colour has track meaning.** Pine belongs to the track boards, the lap-board housing and the lap stroke around buttons. Sprinter red is the sprinter's line, the underline under the section you are in, and errors. Stayer blue is the stayer's line and the focus ring. Primary buttons rest in lamp white with a navy label, and selection is a lamp-white outline on cote d'azur, never gold. The ground is a chosen arena navy (#101830), not a tinted black.
- **Interactions come from the track.** Pills get a 2px pine stroke that runs one anticlockwise lap from the bottom-right "finish line" and leaves forward. Nav links and menu items roll like a lap-board digit column. Inline links lap their underline out to the right and back in from the left. Rows wipe in cote d'azur. Quantity and booking reference digits roll on the same odometer columns as the lap board.
- **Type.** Unbounded's wide, round-shouldered capitals echo the stadium oval and European track livery. Onest is a calm, legible grotesque for everything you read. Hierarchy comes from weight and size only (H1 64px/700, H2 32px/600, night dates 21px/650, body 17px/400, captions 13px/500). Both faces support `tnum`: measured in Chromium at build with `font-feature-settings: "tnum"`, the 1 and the 0 come out the same width (Unbounded 0.78em, Onest 0.673em; without it Unbounded is 0.52 and 0.925em). The odometer columns size to the tabular digit, so nothing jitters.
- **No dead ends.** The sold-out Saturday is selectable. It turns the button into "Join the waiting list" and ends in its own confirmation (place 214). Every dialog has "Back to the nights" or "Choose your night" and a close button. The tel: and mailto: links open with `target="_blank" rel="noopener"`. The confirmation never claims an email was sent; it says the seats are held under your email and to show the reference at the box office.

## Do not touch

- **Track geometry.** `at(s, d)` in the script and the SVG paths share one stadium: half-straight `A = 21`, measurement radius `R = (250 - 4A) / 2pi`, finish line at x = 12 on the bottom straight, viewBox `-71 -50 142 100`. Riders, the metre marker and the board tick all use it. Change one and the others drift.
- **Line order and offsets.** The cote d'azur (inside), measurement line, sprinter's line 0.85 m up and stayer's line 2.45 m up. Riders race anticlockwise, so the bottom straight runs left to right and the button lap runs the same way.
- **The Madison model.** `racer` and `rester` are built so both riders meet at the sling mark at matched speed with continuous position and lane. The self-test (`#selftest`) asserts this, the 250 m lap length, the rolling start at the finish line, prices and the summary line.
- **Hidden states only while covered.** Content is never hidden by CSS alone. The loader covers the first paint (removed by `<noscript>` for no-JS visitors and by CSS under reduced motion), and the script sets initial states underneath it.
- **Accessibility.** Rows are real radios inside labels (arrow keys work). The checked row shows a lamp outline plus the "Your night" plate or the lit mini oval, never colour alone. The night and area errors are `role="alert"`. Focus moves to the H2 after every anchor, and the skip link goes to "Pick a night", the first step of the booking. Dialogs are native `showModal()` with Escape, and return focus to Menu when they were opened from the menu sheet. The menu makes everything behind it inert except the Menu/Close button, Tab wraps between that button and the sheet, and scrolling is locked by CSS (`html.menu-open`, `html:has(dialog[open])`), not only by Lenis. Under reduced motion the sheet and dialogs fade by opacity only, so focus is never dropped by a `visibility` change, and CSS transitions are `none`, not near-zero. The stage SVG and lap board are `aria-hidden`; the figcaption says what they show. The metre tag is a pointer-only enhancement (hover, or tap for 2.4 s on touch); keyboard and screen-reader users get the same information from the figcaption.
- **Loops sleep.** The rider loop is the design's one ambient motion. It pauses when the hero is off screen (on phones, when the stage is) and when the tab is hidden.

## Motion

This section follows the collection's detailed-tier convention (the template's three sections plus a motion score). House easing: `expo.out` for entrances and state changes, `expo.inOut` for wipes, `power3.out` for pointer following, `none` for scrubs. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer, width 992). Lenis runs on `gsap.ticker` with `lagSmoothing(0)` and stops while the loader, the menu or a dialog is open.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Lap-board preloader counts 000 to 200 | LD1 | Real progress: fonts, track sampling, window load | Value eased .4s power2.out, digits .5s expo.out; if ready in 300 ms, one .5s roll 000 to 200 (stagger .04) instead; hand-off .1s after; 6s release | No loader |
| Board flies into the infield | LD5 with Flip.fit | Progress complete, t0 | .9s expo.inOut; fades .3s if the slot is off screen | Board in place |
| Azur curtain lifts | LD3 | t0.10 | clip-path to inset(0 0 100% 0), .8s expo.inOut | None |
| Track lines draw from the finish line | SC16 (pathLength dash) | t0.30 | .9s expo.out, stagger .12: measurement, sprinter, stayer, finish | Drawn |
| H1 lines rise | TX1 | t0.35 | yPercent 110 to 0, 1s expo.out, stagger .08 | No split |
| Lede, CTAs, header chrome | LD8 | t0.60 / .75 / .80 | Lede y 12 .8s; CTAs scale .96 .6s; chrome y -8 .6s, stagger .05 | Visible |
| "to go" rises, riders roll out | Rolling start | t1.00 | Caption .6s expo.out; loop timeScale 0 to 1 over 1.6s power2.in | Riders parked at the finish line |
| Madison loop and lap-board tick | SC10 | Always, paused off screen and when hidden | 8.4s base lap, sling every second racer lap at the 113 m mark, timeScale 1 + velocity/500 up to 5, decay 10% a frame; digit roll .5s expo.out; finish band opacity .4 to 1 in .3s per tick | No loop |
| Racer trail and sling arc | Speed made visible | Every frame of the loop | Red trail 3 to 12 m with speed; pine arc draws in over the last .012 of a cycle and fades over the next .03 | Riders parked, no trail |
| Stage tilt (wide only) | Bounded scrub on a CSS-sticky stage (no pin) | #nights top 80% to #book top 35% | rotateX 0 to 52deg at perspective 760, scale 1.08, yPercent 6, board rotateX 0 to -52deg on its bottom edge, hold, back to flat; ease none | Flat plan |
| Seats-left bars | SC16 | Batch at top 85%, once | scaleX 0 to value, 1s expo.out, stagger .06 | Drawn |
| Section H2 lines | TX1 | clamp(top 85%), once | 1s expo.out, stagger .08 | No split |
| Section spy | NV6 | #nights, #getting-here cross the middle | Red underline sweeps in .45s | Instant |
| Header backdrop | Class toggle | Scroll past 24px | Opacity .3s | Instant |
| Metre marker tag | Pointer label (CU1 without a follower) | Pointer move over the stage; tap on touch (2.4s) | quickTo .35s power3.out, projected through the tilt | Jumps, no easing |
| Pill lap stroke | HV11 (drawn ornament, here one lap) | Hover, focus-visible | Draw .6s power2.out, leave forward .45s power2.in; label navy to azur | Stroke shown statically |
| Press | MI1 | :active | scale .965 in .12s, release .45s power3.out | Same |
| Nav and menu rolls | HV1 | Hover, focus-visible (fine pointer) | .45s expo.out, lamp-2 at rest rolls to a lamp copy; header links also sweep in the red sprinter's line (the aria-current mark) from the left and out to the right | Colour change, static line |
| Inline link underline lap | HV2 variant | Hover, focus-visible | Out right, in left, .7s expo.inOut | Static underline |
| Row wipe | HV3-style clip-path | Hover, focus-visible | In from the left .45s expo.out, out to the right | Instant background |
| "Your night" plate | MI3 | Night radio change | .25s back.out(2) | No pop |
| Mini oval lights | Same draw as the stage zone | Area radio change | Zone outline dash .6s expo.out, fill 0 to lamp in .4s | Instant |
| Seat zone lights on the plan | MI3 on the stage | Area radio change | Lamp outline .6s expo.out, azur fill 0 to 1 in .4s then settles at .85, old zone fades .25s | Instant |
| Seat count odometer | LD1 odometer columns | Stepper | .5s expo.out, up for +, down for - | Instant |
| Submit label swap | MI2 | Label changes (count, waiting list) | .4s expo.inOut | Instant |
| Email field | MI4 | Focus, submit | Label float .25s, measurement line scaleX .45s, error reveal by clip-path, opacity and translate .25s | Instant |
| Menu sheet | NV1 | Menu button | clip-path wipe .6s expo.inOut, links rise .7s stagger .06; close reverses at 1.4x | .2s fade |
| Dialogs | CD7, azur wipe | Buttons, submit | Wipe in from the left .55s expo.out (from the bottom under 600px), out .3s; backdrop .3s; reference digits roll .8s stagger .04 | Opacity fade |

Property exceptions to "transform, opacity, clip-path and filters": the SVG line draws (track lines, seat zones, mini ovals, the pill lap stroke, the sling arc) tween `stroke-dashoffset`, and the seat zones tween `fill-opacity`. Both are paint-only on small SVG elements and are the only way to draw a line along a path without the DrawSVG plugin. CSS colour changes on hover and checked states (`color`, `background-color`, `box-shadow` on rows, dots and buttons) are also paint-only. Nothing animates layout.

## Adapting

1. Map the brand onto the colour tokens. Keep the roles: one material colour for the drawing (`--pine`), one light for text and primary buttons (`--lamp`), and two line colours with meaning (`--red`, `--stayer`). Re-check `--red` at 4.5:1 on `--navy`, because it is used for error text.
2. Replace the venue. The stadium paths are generated from radii (`M12 r H21 A r r 0 0 0 21 -r H-21 A r r 0 0 0 -21 r Z`). For a different track length, change `A` and the 250 in `at()` and regenerate the paths. For a different venue (a pool, a running track), keep the `at(s, d)` idea (a centre line plus a lateral offset) and redraw the marks in its real order.
3. Replace the nights and areas in the markup. Each night row carries `data-date`, `data-collect` (collection deadline) and optionally `data-full` for the waiting list. Each area row carries `data-noun`. The bar value `--v` is tickets left out of capacity. Prices live in `priceOf()`.
4. Retime or remove motion. The lap time is `--lap-time` (seconds per racer lap). Change the velocity divisor (500) and cap (5) in the velocity `ScrollTrigger.create` handler, and the rider size with `--rider` on `.stage`. Delete the tilt by removing the `if (wide)` block. To drop the preloader, delete `.loader` and the progress block. The intro then runs straight from the final states. All CSS transitions use the `--d-*` and `--ease-*` tokens.
5. Fonts: if Unbounded fails to load, the Arial Black fallback is narrower, so the H1 gains a line. The odometer still works, because columns size to the widest digit.
6. In a framework, keep the SVG static, render rows from data, and port the script as one effect that returns the matchMedia cleanup.

| Token | Role |
|---|---|
| `--navy` | Ground, infield ring, the black measurement and finish lines, lap-board face |
| `--navy-2` | Infield floor |
| `--azur` | Cote d'azur band, row wipe and checked row, dialog surface, loader curtain |
| `--pine`, `--pine-seam` | Track boards and plank seams, lap-board housing, the pill lap stroke, the metre tag |
| `--lamp`, `--lamp-2` | Text and digits, primary button fill, checked outline, lit zones; secondary text |
| `--red` | Sprinter's line, current-section underline, errors (4.6:1 on navy) |
| `--stayer` | Stayer's line and the 2px focus ring |
| `--veil` | Dialog backdrop |
| `--font-display`, `--font-text` | Unbounded and Onest with fallbacks |
| `--t-cap` ... `--t-h1` | Type scale: captions 13, small 15, body 17, lede 20, night dates 21, buttons 16, H2 24-32, H1 34-64 |
| `--t-sheet` | Menu sheet links, 28-40 |
| `--t-board`, `--t-loader` | Infield lap board (8.5% of the stage width, 28-64px) and the preloader board |
| `--s-1` ... `--s-9` | Spacing, 4 to 112 |
| `--gutter`, `--max`, `--header`, `--stick`, `--measure` | Side gutter (16, 32 from 768), content max 1440, header height (56, 72 from 992), sticky offset of the stage, body measure |
| `--ease-out`, `--ease-inout`, `--ease-swap`, `--ease-press` | expo.out, expo.inOut, the masked-swap curve and power3.out for CSS transitions |
| `--d-press`, `--d-release`, `--d-quick`, `--d-roll`, `--d-swap`, `--d-lapline` | CSS durations: press, release, field and error, roll, label swap, underline lap |
| `--lap-time` | Seconds per racer lap at rest (8.4) |
| `--rider` (on `.stage`) | Rider drawing scale: 2.8 wide, 3.2 tablet, 3.5 under 600px |
