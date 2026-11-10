---
title: Racing arcade league-night hero
section: hero
subject: "Late Apex, a racing arcade in Turin with eight linked sit-down cabinets, asking visitors to book a seat for Thursday league night (heats of eight every 20 minutes from 19:00 to 23:00, EUR 6 a heat) and letting them see last week's standings."
aesthetic: "Retro arcade racer at dusk. A night-highway blue ground, a low-resolution raster road with tangerine rumble strips and a yellow centre line, a banded magenta and tangerine sun behind a city skyline, cyan roadside lamps, and a display face built from square modules."
mode: dark
fonts:
  - "Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, at ELSH 2 and ELGR 1 so the modules are square: the H2 at 700, the HUD at 500 and 700, the GO call at 800, the position numerals on the pit board."
  - "Host Grotesk (Google Fonts, variable wght 300-800). Everything you read: 400 for body, 600 for buttons, h3, terms and links, tabular-nums for lap times and heat times."
js: "Draws a segment-projected pseudo-3D road on a low-resolution canvas that the pointer steers and scrolling accelerates, pins the stage for one lap of scrolling with checkpoint and finish gantries, runs the start-light load sequence, and handles the booking form (nothing is sent) and the standings dialog; without the libraries it draws one still frame and every flow still works."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [hero, arcade, racing, retro, pixel, canvas, pseudo-3d, scroll, pointer, booking, form, dialog, dark, gsap, lenis]
use_when:
  - "A venue, league or event whose product is driving, riding or running a course (karting, sim racing, a cycling crit, a ski race), with one booking ask and one secondary thing to look at."
  - "The brand can carry a loud retro-game look and the page has room for a full-height hero that plays for one screen of scrolling."
  - "You want scroll and pointer to do something the subject explains (throttle and steering), not decorate."
avoid_when:
  - "Calm, premium or editorial brands. The pixel road, the banded sun and six accent hues are loud by design."
  - "Pages where the hero must be passed quickly. The stage holds for about 120vh of scrolling."
  - "A subject with no course or vehicle. Then the road is a borrowed game, not the product."
---

## Why it works

**The one bold idea: the hero is a drivable road.** Late Apex sells seats in a racing cabinet, so the first screen is the view from one. The lower half of the stage is a pseudo-3D raster road in the classic arcade technique (a loop of segments with curves and hills, projected and filled one pixel row at a time) on a canvas about 320 pixels wide, scaled up with `image-rendering: pixelated`. The pointer steers and scrolling is the throttle. Everything else on the page is quiet and supports that.

This design belongs to the **arcade series**. The series shares Handjet and Host Grotesk with cta-indie-game on purpose, at the owner's request, along with the dark chosen ground, the cell-based spacing and the stepped pixel corners. It differs from cta-indie-game in three ways: the palette is wide (seven hues against that design's two accents), the signature is a 3D scene you drive instead of a flat lattice that lights under the pointer, and all motion is stepped and frame-based with hard cuts instead of eased wakes and fades.

- **An original scene.** A night ring road around a city: a seeded skyline with one spire, light poles with cyan lamps on both sides, a banded sun on the horizon, a small white hatchback seen from behind with three lean frames made from one drawing (the roof and glass shift 2px into the turn, the shoulders 1px). No palms, no beach, no convertible, no existing game's sprites.
- **Scroll is the throttle, and the lap is the scroll.** The stage is pinned for 120vh. The car cruises at 80 km/h; scroll speed adds up to 200 more, shown in the HUD as a gauge (whole numbers, at most ten updates a second). Scroll progress through the pin is distance along the lap: the lap bar fills cell by cell, the sun sinks one slice per eighth of the lap, two checkpoint gantries and a finish gantry are released at fixed points, and the stage lets go to the booking block when the lap ends.
- **The copy stays on clean sky.** The script puts the horizon under the copy block (with room for the tallest building, never above 45% of the stage; it lands between 45% and 51%). Nothing beside the road stands higher than the camera: the poles are 0.92 of the camera height and the gantries 0.95, so only the sun and the skyline ever rise above the horizon, and the sun sits right of the copy column (centre at 76% of the width, radius 8.5%). The gantry beam therefore sweeps down the screen and passes between the camera and the car, which reads as a rush and never crosses the text.
- **Every hue has a job.** Night blue `--night` is the page ground and the sky; the two asphalt blues are the road bands and, on the page, field fills and the pit board. Magenta is sunset: the sun's top bands and the one primary button. Tangerine is the sun's lower bands and every rumble strip (the road's kerbs and the kerb strip that closes the stage). Yellow is the centre line: the road dashes, the marching line of a focused field, the HUD speed and the checkpoints. Cyan is the roadside lamps, the focus ring and the hovered label of links and outline buttons. Mint is GO: the start call and the "Seat held" confirmation. Red is stop: the five start lamps, the car's tail lamps and errors. No hue is used outside its job.
- **The HUD is diegetic and small.** Speed, a 16-cell lap bar with the two checkpoints marked, and "Heat 4 of 12" sit top-right at 20 to 40px. It is `aria-hidden` and it is not a big-number hero. On narrow screens it becomes one line between the copy and the road.
- **Two asks, in order.** "Book a seat for Thursday" is the magenta button and scrolls to the form. "See last week's standings" is the outline button and opens a native dialog with a real table. The facts are a plain definition list.
- **No dead ends.** The form validates in place with a specific message per field and moves focus to the first wrong field. The confirmation names the driver, the heat and the address, and "Book another seat" brings the form back with the driver and address kept and the heat cleared. The dialog closes with Close, Escape or a backdrop click and returns focus to its button. External links open in a new tab with `rel="noopener"` and a visually hidden note.
- **Semantics.** The host page owns `h1`; the section's `h2` is the first heading. The dialog's `h2` is outside the section because the dialog lives in the top layer.

Effects that are new to the collection: the segment-projected raster road steered by the pointer; scroll velocity as a throttle with a gauge HUD; lap progress that releases checkpoint and finish gantries and sinks the sun in slices; the start-light load sequence; the headline's stepped ghost streak; the checker wipe and the launch press on buttons; the tach strip under links; the marching centre line and rumble-strip error on fields; the two-frame checker checkbox; the pit board dialog; the waving pixel flag.

Deviations from the brief, and why:

- **Gantries and poles are lower than the camera.** The brief asks for gantries that rush past and for copy that never sits over busy pixels. A gantry taller than the camera crosses the whole sky as it passes, behind the headline. Keeping everything below camera height solves both: the beam sweeps down across the road instead.
- **Red has a third job, the car's two tail lamps.** They are lamps that mean stop, like the start lamps, and a car seen from behind at night does not read without them.
- **The stage stays pinned on phones.** The brief allows un-pinning. Instead, when the stage is taller than the viewport it sticks by its bottom edge, so the road stays in view while the lap plays.
- **A start line is painted on the road** (one segment of ice and dark checks) so the car has a grid to wait on during the start lights, and the still frame is composed.
- **The horizon is measured, not fixed.** It is 45% of the stage when the copy is short and moves down to clear the copy when it is not.

## Do not touch

- **The canvas is low resolution and every edge is a whole pixel.** One canvas pixel is 2 to 5 CSS pixels (`px` in `build()`), the road is filled with one-row rectangles at rounded coordinates, and the canvas is scaled with `image-rendering: pixelated`. Do not draw the road with paths or raise the resolution: anti-aliased edges turn the look into a blurry 3D render.
- **Nothing beside the road is taller than the camera.** Pole height (0.92) and gantry height (0.95) are fractions of `camH`. Raise either above 1 and sprites cross the copy.
- **The horizon follows the copy.** `build()` reads the bottom of `.copy` and the `ResizeObserver` watches it. If you add copy, the horizon moves down by itself; do not pin it with CSS.
- **The sun stays right of the copy column.** `.copy` is at most 66% wide in the full-stage layout and the sun's left edge is at 67.5% of the width. Change one and check the other.
- **Colours reach the canvas through the tokens.** `build()` reads them with `getComputedStyle`. There are no colour literals in the script.
- **Hue jobs.** Magenta only on the sun and the primary button; yellow only where a centre line or checkpoint is meant; cyan only for lamps, focus and hovered labels; mint only for GO and success; red only for stop lamps and errors; tangerine only for sun bands and rumble strips.
- **Pixel corners live on `.face` and `.inner`, never on the `<a>` or `<button>`,** so focus outlines are not clipped. The press shift is on `.face` for the same reason.
- **Hidden states exist only under `html.js:not(.go)`,** and they are `visibility`, not opacity, because every entrance is a hard cut. If the CDN is blocked the `js` class is never added: everything shows, the canvas draws one still frame, and the form and dialog work in plain JavaScript.
- **The drive loop sleeps.** It runs at 30 frames a second only while the stage intersects the viewport and no dialog is open. The car always cruises, so there is no idle state while it is visible; do not add a second loop.
- **Accessibility.** The scene and the HUD are `aria-hidden`. The native cursor is never hidden. Steering has a touch form (sideways drag, `touch-action: pan-y` so vertical scrolling is untouched) and a keyboard form (focusing the primary button takes the left lane, the secondary the right). Every target is at least 44px. Errors use `aria-invalid` and `aria-describedby`, the error lines are reserved so nothing shifts, and their text is cleared when the error clears. The dialog is a native `showModal()`, Lenis is stopped while it is open, and it scrolls inside itself on short viewports.

## Motion

House rule: stepped, like a machine with a frame rate. CSS uses `steps(n)` and hard cuts; the script uses GSAP only for clocks (timeline calls, `delayedCall`, the ticker), never for eased tweens. The motion layer is built inside `gsap.matchMedia` (no-preference, reduce, fine pointer) and returns a cleanup that removes listeners, the ticker callbacks and observers, kills the timeline and the ScrollTrigger, destroys Lenis and redraws the still frame. Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, with `lenis.on('scroll', ScrollTrigger.update)`. The start lights wait for the fonts (`document.fonts.ready` plus a Handjet load, 1.5s timeout) and a visible tab. Only transform, opacity, clip-path, filter and canvas pixels animate; colour changes are instant.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Start lights | Five DOM lamps turn red one by one, all go out and a mint GO replaces them, then the panel is removed | Load, when the stage is at the top (skipped after a reload part-way down) | First lamp at 0.25s, 0.15s per lamp, 0.25s hold, GO for 0.4s; the car launches on GO (to 160 km/h for 0.7s, then settles to 80) | No lights; everything visible |
| Headline speed streak | Lines found by word offsets; each line cuts through three ghost offsets (15, 7, 2 cells right, with one or two hard `drop-shadow` ghosts trailing) and locks | The frame GO disappears | 0.05s per step, lines 0.1s apart; the plain text is restored afterwards | Visible |
| Lede, buttons, hint, HUD | Hard cut (`visibility`) | The frame GO disappears | Instant | Visible |
| Raster road (signature) | Segment-projected pseudo-3D road on a low-resolution canvas: striped asphalt, rumble strips, dashed centre line, curves, hills, poles, skyline panning with the curve | Always, while the stage is on screen | 30 frames a second; cruise 80 km/h | One still frame: sun mid-sky, car centred on the grid |
| Steering | Pointer X over the stage sets the camera's lateral offset (up to 0.7 of the half road) and the car's lean frame; with no pointer the car weaves slowly about the centre | pointermove (mouse, pen). Touch: a sideways drag steers and releases 1.2s after the finger lifts. Keyboard: focus on the primary button is the left lane, on the secondary the right lane | Offset eases at 4.5 per second; lean frame cuts | Still frame |
| Scroll is the throttle | Scroll speed in either direction adds up to 200 km/h to the cruise; the HUD shows whole numbers, at most ten updates a second | Scrolling (Lenis wheel or native touch) | Up at 3.2 per second, down at 1.1 per second; 0.08 km/h per px/s | 80 km/h, static |
| Lap progress | The stage is sticky for `--lap` (120vh); a ScrollTrigger reads progress. The lap bar fills in 16 cells and the sun sinks in 8 stepped slices | Scroll through the pinned stage | Scrubbed, in whole steps | No pin, native scroll, bar empty |
| Checkpoint and finish gantries | A gantry is released 28 segments ahead; the car surges to at least 190 km/h until it passes; its beam (yellow with ten dark blocks, or two rows of checks) sweeps down the screen and passes over the car; the HUD cuts to yellow for two frames | Progress crossing 0.30, 0.62 (checkpoints) and 0.90 (finish), re-armed when scrolling back | About 0.8s to arrive; HUD flash 0.13s | None |
| Button checker wipe | A strip seven columns wide (six solid, one of 8px checker at the leading edge) steps across the face with `transform`, then the face is the hover colour; outline buttons switch label and rim to cyan at once | Hover, focus-visible; touch and Enter via `.is-tap` | 0.28s `steps(7)`, reversed on leave | Instant colour change |
| Button press: launch | The face sits 3px right while four speed lines cross it above and below the label, and snaps back on release | `:active`, pointerdown, Enter or Space | 0.24s `steps(6)`; shift and release instant | 3px shift only |
| Text link tach strip | Eight segments under the link (3 mint, 3 yellow, 2 red) light left to right over a resting dim strip and go out right to left; the label cuts to cyan | Hover, focus-visible; touch via `.is-tap` | 0.24s `steps(8)` | Lit at once |
| Field: marching centre line | The bottom border becomes a dashed yellow line whose dashes step left to right | While the field has focus (pointer, touch or keyboard) | One dash period in 0.48s `steps(4)`, looping only while focused | Static dashed line |
| Field error | The bottom border becomes a red and ice rumble strip and a specific message fills the reserved line; focus moves to the first wrong field | Invalid submit; cleared when the value becomes valid | Instant | Same |
| Checkbox | The checked state is a 2x2 checker drawn in two frames: one square, then its diagonal partner | change | Second square after 0.09s | Both at once |
| Standings dialog: pit board | The board hangs on two poles and drops from the top in five steps, overshoots 2px, rebounds 1px and rests; it leaves upward. Lenis and the drive loop stop while it is open; focus returns to the button | See last week's standings; Close, Escape or backdrop | In 0.44s (0.3s drop plus two bounce frames); out 0.25s `steps(5)` | Instant |
| Success flag | Eight columns of checks ride a stepped sine, each column a step later and a little higher than the one before, then rest flat | Valid submit | Two periods of 0.6s, `steps(1)` keyframes | Flag at rest |
| Form and confirmation swap | Hard cut; focus moves to the confirmation heading, or back to the first field | Valid submit; Book another seat | Instant | Same |

## Adapting

1. **Check the subject has a course.** The road is right for anything driven, ridden or raced. Keep the mechanic and redraw the scene for your world in the script: the skyline (`city`), the roadside sprite (`pole`), the vehicle (`CAR`, a 32 by 17 character map: `i` body, `d` shade, `k` glass and tyres, `r` tail lamps) and the track (`segs`: rows of segments, curve, height at the end).
2. **Map the colours onto the tokens and keep the jobs.** One ground, two road bands, one text and one secondary text, then one hue per job: primary action and sun top, kerbs and sun foot, centre line and checkpoints, lamps and focus, go and success, stop and errors. Recompute the contrast ratios in the comments; the primary button's text must reach 4.5:1 on both `--magenta` and `--magenta-hot`.
3. **Copy.** The H2 is two lines at 72px in a 66% column: keep it near 50 characters. The lede is two lines; a longer lede pushes the horizon down. The hint is written by the script for mouse and touch. The HUD's third line and the 12 heats in the select must agree.
4. **Lap length and events.** `--lap` is the pinned scroll distance. `POINTS` in the script holds the progress of the two checkpoints and the finish; the lap bar marks the checkpoints with `.cp` on its sixth and eleventh cells, so move them together. `CRUISE`, `TOP` and the throttle gain (0.08) set the speed range.
5. **Retime or remove motion.** CSS timings and the load sequence read the `--d-*` tokens. To drop the start lights, delete the lamp timeline in the load block and set `go = true`. To drop the pin, remove the two `.fx` rules; the road still cruises and steers. To drop steering, delete the pointer and touch listeners; the car weaves. To make the hero static, remove the three CDN scripts: the page falls back to the still frame.
6. **Fonts.** If Handjet fails, the H2 and HUD fall back to Arial Narrow and the layout still holds, because the horizon is measured from the copy. Any display face built from square modules fits.
7. **In a framework,** render the markup statically, keep the plain-JavaScript block (form, dialog, press classes, road module and its `ResizeObserver`) as one effect, and the `gsap.matchMedia` block as a second effect that returns its cleanup.

| Token | Role |
|---|---|
| `--night` | Page ground, sky, text on bright faces, outline-button ground |
| `--asphalt-1`, `--asphalt-2` | Road bands; field fill and pit board; unlit lamps, bar cells, outline-button hover, table rules |
| `--verge-1`, `--verge-2` | Land beside the road (canvas only) |
| `--city-far`, `--city-near`, `--pole` | Skyline layers; car glass, tyres and the start-light housing; poles, gantry posts and lit windows |
| `--ice` | Text (14.4:1 on night), car body, flag and grid checks, hovered field line |
| `--dim` | Secondary text (8.1:1), field lines, outline-button rim, resting tach strip, car shading |
| `--magenta`, `--magenta-hot` | The sun's top bands and the primary button (night text 5.1:1); its hover face (8.2:1) |
| `--tangerine` | The sun's lower bands, the road's rumble strips, the kerb strip under the stage |
| `--yellow` | Road dashes, focused field line, HUD speed and flash, checkpoint beam and bar marks |
| `--cyan` | Roadside lamps, focus ring, hovered labels of links and outline buttons, selection |
| `--mint` | GO, "Seat held", the first three tach segments |
| `--red` | Start lamps, tail lamps, error text (5.2:1) and error strip, the last two tach segments |
| `--ghost-1`, `--ghost-2` | The two ghost copies of a headline line as it streaks in |
| `--scrim` | Dialog backdrop |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2`, `--t-hud`, `--t-speed` | Type scale: 13, 17, 19, 28, clamp(40px, 5vw, 72px); HUD text 20 and speed 40 |
| `--cell` | 8px, one checker square; the spacing steps and pattern sizes derive from it |
| `--s1` ... `--s8` | Spacing, 4 to 96, in half and whole cells |
| `--notch`, `--tap`, `--hit` | Pixel-corner step (4px), button and field height (48px), minimum target (44px) |
| `--max-w`, `--gutter` | Content width (1296px) and the side gutter derived from it |
| `--lap` | Scroll distance the stage stays pinned for (120vh) |
| `--d-*` | Durations for the CSS effects and the load sequence |
