---
title: Painted on the lane
section: features
subject: Kade Cargo, a fictional Rotterdam maker of urban cargo e-bikes, presenting the systems of its new front-loader, the Kade L2, and taking test-ride bookings.
aesthetic: The Dutch street. A slab of red bike-lane asphalt on concrete paving, with the bike laid down on it in round-capped white thermoplastic, one marking-cart pass per system, and pedal-reflector amber kept for the dimension lines and the headlamp.
mode: light
fonts:
  - Rubik 400-800 variable (Google Fonts). Headline 800 at -0.02em, chapter and section titles 700, bay names and buttons 600, body 400, facts and spec values 500 with tabular figures, SVG dimension labels 500
js: Runs a CSS-sticky chapter stage whose one scrubbed timeline paints the bike onto the lane system by system with clip-path wipes and a wet paint head, crossfades the chapter text on each chapter change, moves a lamp beam that lights the painted lines (during load it rides behind the lane-edge paint, then it follows a fine pointer or otherwise rides the wipe front of the stroke being painted) until it shrinks into the headlamp after the last stroke, eases every in-page link through Lenis and moves focus to the target, toggles the four box setups, paints the stall lines once, and runs the test-ride dialog with validation and a booking built from the chosen workshop and slot. Without the CDN libraries the toggles, anchors, dialog and form still work, without motion. With no JavaScript at all the anchors and the static stage still work, but the test-ride dialog and the setup toggles need the inline script.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [product, cargo-bike, e-bike, mobility, drawing, svg, scroll-story, sticky, chapters, road-marking, dialog, form]
use_when:
  - A physical product that can be explained as a handful of systems, each one visible in a single side or front elevation (bikes, scooters, prams, trailers, small machines).
  - The audience wants to see what the thing is built from before they book a test, a demo or a fitting.
  - There are 3 to 5 systems with one claim and two or three facts each, plus variants (setups, boxes, kits) and a spec table.
avoid_when:
  - Software or services with nothing to draw. Painting abstract icons would be decoration.
  - More than five chapters. The runway grows by a viewport per chapter and stops feeling bounded.
  - The drawing cannot be made as clean strokes of one width. The marking metaphor depends on one cart width everywhere.
  - A page that already has another sticky or pinned stage nearby.
---

## Why it works

**The one bold idea: the bike paints itself onto the bike lane as you scroll.** One rounded slab of red lane asphalt holds a side elevation of the Kade L2, drawn the way Dutch lanes are marked: thick white thermoplastic, one stroke width (one marking-cart width) everywhere, round caps. During page load the slab opens and the lane edge and both wheels are laid down. Then each of four chapters paints one system (the box; the drive; steering and brakes; size and parking) with clip-path wipes that run the way a line-marking cart would travel: tubes from the bottom up, horizontals left to right, wheels, the motor and the rotors around their hub from the contact patch. Every wipe carries a wet head, a brighter copy clipped to the leading 10% of the stroke, so the paint visibly goes down rather than being uncovered. A lamp beam, a warm pool cut off by a hard flat top (an SVG `clipPath` that moves with it, the horizontal cutoff of a bike lamp), lies on the asphalt, and the painted lines inside it glow amber-white with a soft falloff, the way glass beads in road paint do under a headlight. It carries the load sequence: it enters from the left behind the lane-edge paint, so fresh dashes and the wheels flash amber as it passes, and rests on the painted front wheel. It lifts to the box only when chapter 1 starts painting it, so it never lights empty asphalt. On a fine pointer the pointer is that lamp; without one, the beam rides the marking cart, following the wipe front of the group being painted. Strokes that are not painted yet never light up. When the last stroke of chapter 4 lands, the beam shrinks into the drawn headlamp and the headlamp's own cone opens across the lane ahead: the light you have been holding becomes the bike's.

- **The page is made of street materials.** Concrete paving (`--ground` #D3D5D0) is the page, red lane asphalt (`--lane`) is the one coloured surface, white thermoplastic (`--paint`) is the drawing, pedal-reflector amber (`--reflector`) appears only on the slab, for the dimension lines and the headlamp. Round bicycle-sign blue appears once, in the brand mark, because the mark is that sign. Buttons are pills because the sign is round.
- **Radius encodes type.** The slab has 20px corners, buttons and chips are pills, everything else (bays, rows, rules) is square.
- **The reader moves with the bike.** Everything is left-aligned, the drawing faces right with the box leading, and the text sits on the left. From 960px the sticky slab takes eight of twelve columns and runs off the right edge of the page, the direction of travel, capped at 74svh tall so short laptops still fit. From 960px the header lies over the top of the runway while the stage runs, so the stage is centred in the viewport from the first frame. On short laptops (560 to 760px tall) the stage starts below that header and the type and slab tighten to fit. Below 960px the stage is aligned to the top, just under the header, and spare height falls below the chapter text. In the last 20svh of the runway the Setups heading slides up into the stage's empty lower band, so the end of the stage is not a page break.
- **Text never scrubs.** Chapter text changes only when the chapter index changes, with a short timed crossfade, and each chapter holds its finished drawing for the last 30% of its run so it can be read at rest.
- **The rail is the chapter navigation.** Four segments fill with progress, name their chapter on hover and focus, and link into the stage. "Skip the drawing" sits at the end of the rail at every width, as the exit from a bounded sticky section, so it is on screen from the first frame on phones too. The caption reads "Chapter 2 of 4: The drive": numbering is used because the chapters are a real painting sequence.
- **Setups are bays, not cards.** Four unboxed bays sit between painted white stall lines on the concrete. Each bay is one toggle (`aria-pressed`): hover or keyboard focus previews the box loaded (HV6, a pulled-focus swap in a fixed frame), click or tap commits it, so nothing is hover-only.
- **The spec table repeats the signature.** Each spec row links back into the stage at the chapter that draws that part, so the table is not a dead end.
- **The copy is the rider's.** Every claim is a number a parent can use: 100 kg in the box, 32 cm off the road, a 4.6 m turning circle, an 80 cm doorway. The test-ride confirmation is built from the chosen workshop, day and time, with a generated booking reference.

Reasoned exceptions and departures:

- The lane red #8E3229 is a dark oxide used as a surface on a cool concrete page with a sans display, tied to the Dutch fietspad. It is not the cream, serif and terracotta default.
- Wheels, the motor and the rotors paint as a sweep around the hub, not as a growing circle from the hub: a growing circle makes a ring appear all at once, a sweep reads as a cart going round.
- The header is not fixed (from 960px it lies over the top of the runway and scrolls away with it), so the planned section spy on Setups and Specs was dropped: the header is never on screen when those sections are. Below 600px the header keeps one row and drops its Setups and Specs links: Skip the drawing leads to Setups, and Specs follows it.
- The setup toggle keeps one visible label, "Show it loaded", with `aria-pressed`. A label that flips between two actions on a pressed-state button contradicts the state; the pressed state shows as a filled pill and a tick that wipes in. A visually hidden bay name, "(Kids bench)", makes each accessible name unique.
- Chapter links land at 75% of their chapter, where that system is fully painted, instead of at the chapter's first pixel.
- The page has no `h1`. It is a section meant to compose into a page, so the host page supplies the `h1`; the section starts at `h2`.
- While a chapter is shown, the intro lede is `aria-hidden`; the intro `h2` stays exposed on purpose, because it is the section's `aria-labelledby` name.
- Under reduced motion the setup toggles keep a 0.2s opacity crossfade between the empty and loaded drawings, with no scale. It answers a press and moves nothing, so it is kept as the plan's "crossfade only" rather than an instant swap.
- The brand link has no underline: the wordmark is not body-text link chrome. It answers with the wheel spin and the focus ring.
- Rubik's tabular figures also widen parentheses, so tabular figures are scoped to facts, spec values, prices and the caption, and parentheticals inside them are set back to proportional.

## Do not touch

- One stroke width (`--stroke-paint`) for every painted line, wheels included. Thin and thick strokes turn the marking into an illustration.
- The cart-direction rule for each group's wipe (`data-paint`: `x` left to right, `y` bottom up, `a` around the hub). A wipe against the direction of travel reads as a reveal, not as paint.
- One scroll trigger and one paused, scrubbed timeline for all chapters. Separate triggers per chapter drift apart.
- Text that only changes on chapter change, never scrubbed, and the 70% paint / 30% hold split inside each chapter.
- The bounded runway, the rail and "Skip the drawing". Below 560px tall (phone landscape), with reduced motion and without JavaScript, the stage is static: the full drawing with the beam resting on the box and the headlamp on, and the four chapters as stacked articles that carry `#ch-box`, `#ch-drive`, `#ch-steer` and `#ch-size`, so every link works.
- Amber stays on the slab. It is 5.6:1 on the lane and unreadable on concrete.
- The native cursor stays visible; the beam is an addition, never a cursor replacement.
- The lit copy only brightens what is already painted: each glow clone takes its source group's clip-path in `paint()`. The drawing is fully legible without the beam.
- The lit copy lives in its own absolutely positioned `<svg class="bike bike-lit">` over the drawing, with the amber drop-shadow as a CSS filter on that element (composited) and a feathered `<mask>` (a radial-gradient circle for the beam plus the cone path) instead of a hard clip. Filters on groups inside the drawing would be re-rasterised on every scrub frame. The wet head keeps one small drop-shadow and is hidden once its group is finished.
- One beam at a time: the pointer beam before the finale, the headlamp cone after it. Once the cone is on, the pointer only leans it (at most 10 degrees); touch, keyboard and reduced motion get it straight ahead.
- `.toggle` is never transformed: its `::after` makes the whole bay the hit area, and a transform would make the button the containing block and shrink that area mid-click. The press scale lives on `.pill`.
- The backdrop closes the dialog only when the press also started on the backdrop, so a text selection dragged out of a field does not lose the form. `html:has(dialog.ride[open])` locks the page even when Lenis is not running.
- `.slab` uses `overflow: clip` and a fixed `aspect-ratio`. With `overflow: hidden` the grid can shrink its row on short screens and the slab overlaps the text.

## Motion

All motion is GSAP 3.15 (ScrollTrigger) on Lenis 1.3.26, inside `gsap.matchMedia` with `motion`, `reduce`, `fine: (hover: hover) and (pointer: fine)`, `wide: (min-width: 768px)` and `tall: (min-height: 560px)`. One ease family: `expo.out` (`--ease-out`, cubic-bezier(.16,1,.3,1)) for entrances and responses, `expo.inOut` for the slab and lane-edge wipes, `none` for anything scrubbed. Leaving a hover takes about 70% of entering. Hidden starting states exist only once the script has added `html.motion` or `html.stage`. Reduced motion: no Lenis, no sticky stage, final states only (full drawing, beam resting on the box, lamp on, cone straight ahead, stacked chapters, stall lines drawn, dialog opens and closes without a fade).

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Slab opens | LD7 (clip-path window, from the bottom) | Load, sticky stage only | 0s, 0.9s expo.inOut; hidden until 0.12s so the closed slab never shows as a static line | Present |
| Lane edge paints left to right, with wet head | SC12 prelude | Load | 0.45s, 0.8s expo.inOut | Drawn |
| Rear and front wheels paint around the hub | SC12 prelude | Load | 0.6s and 0.75s, 1.0s expo.out | Drawn |
| Rail tracks extend, then Skip the drawing fades in | LD8 (quiet chrome) | Load | Tracks 0.6s, 0.6s expo.out, stagger 0.06; skip opacity 0.9s, 0.6s | Static |
| Lamp beam carries the load: enters from the left behind the lane-edge head, lights fresh dashes and wheels, rests on the front wheel | CU4 beam | Load | x from off-slab to the front hub 0.45s to 1.25s expo.inOut; stays on the front hub until chapter 1 paints; a pointer move takes over at once | Resting on the box |
| Headline, lede, header | none | | Static at first paint | Static |
| 26 stroke groups paint in four chapters | SC3 sticky chapters + SC12 scrubbed drawn sequence | One ScrollTrigger, `scrub: true`, top top to bottom bottom of the runway | Runway 100svh + 40svh intro + 4 x 100svh (90svh under 768px), last chapter +15%; each chapter paints over 70% and holds 30% | Static full drawing |
| Wet paint head on every wipe | SC12 detail | Same progress as its group | Band 10% of the wipe, fades at completion | None |
| Chapter text and caption crossfade | SC3 | Chapter index change only | Out 0.3s, in 0.45s expo.out, y 8 to 0, 0.16s overlap | Stacked articles |
| Rail fill | SC3 rail | Scrubbed | Done 1, current local progress, future 0 | Rail hidden |
| Beam follows the pointer; painted lines inside it glow amber-white | CU4 lamp (signature, fine pointers) | Pointer over the slab, before the finale | quickTo x/y 0.5s expo.out; brightens 0.3s on enter; on leave eases to the park point in 0.6s | Off |
| Beam rides the wipe front of the group being painted (the hub for wheels, motor and rotors) | CU4 equivalent for touch, keyboard and pointer away | Every scrub update | quickTo 0.6s expo.out, retargeted each update; never before 15% of the stroke | Resting on the box |
| Beam shrinks into the headlamp, cone opens, lit markings glow amber | Signature finale | Forward crossing of chapter 4's last stroke; reversed when scrolled back above | Beam to the lamp and radius 0, cone on, 0.5s expo.out; off 0.3s, beam regrows 0.6s | Cone on, static |
| Cone leans toward the pointer | Pointer aim | Pointer over the slab, fine pointers, cone on | quickTo rotation, 0.6s expo.out, clamped to ±10 degrees; back to 0 on leave | Straight ahead |
| Stall lines paint | SC16 | Bays at top 80%, once | 0.9s expo.out stagger 0.08 (scaleY from the bottom; scaleX from the left on narrow). Bay drawings and spec rules are static, so the stage stays the only painting | Static |
| Brand link | Wheel spin + MI1 | Hover, focus, press | Front wheel of the mark turns once, 0.8s expo.out; no underline, focus ring on focus | Focus ring only |
| Header links, Skip the drawing, Email the workshop, Change details | HV2 directional underline | Hover, focus | 0.45s in from the left, out to the right; persistent at 30% on touch | Static underline |
| Header links, rail, spec rows, skip, brand | NV6 eased anchors | Click | Lenis, min(1.3, 0.65 + distance / 4000) s, then focus on the target heading | Immediate jump, focus moves |
| Book a test ride (x2), Book my ride, Done | HV4 fill from the entry edge + MI1 | Hover, focus, press | Ink fill from the side the pointer entered, 0.45s; leaves by the exit side in 0.3s; press scale 0.975 in 0.12s, release 0.45s | Colour change only |
| Rail segments | Bespoke | Hover, focus | Track thickens scaleY 2.4 and the chapter name rises from a mask, 0.35s | Instant |
| Setup bays | HV6 + MI1 | Hover or focus previews, click or tap commits | Empty drawing to 0.95, loaded drawing in from 1.05 with opacity, 0.5s in, 0.35s out; tick wipes in 0.25s | Crossfade only |
| Spec rows | Marking line | Hover, focus, `:active` on touch | A 4px lane-red line paints over the row's top rule, scaleX from the left 0.45s, leaves right 0.3s; the destination ("See the drive", "See steering and brakes", "See the box", "See the size") rises 0.35s; on touch it is always shown, in ink-soft at the smallest size | Instant |
| Test-ride dialog | CD7 | Open, close (button, Escape, backdrop) | Panel opacity (never visibility, so focus stays on Close), y 12 to 0, scale 0.98 to 1, 0.45s; close 0.3s; Lenis stopped while open; focus returns to the opener; the accessible name follows the visible heading | Instant |
| Close button | Bespoke + MI1 | Hover, focus, press | X rotates 90 degrees, 0.4s | Instant |
| Name and email fields | MI4 | Hover, focus, invalid submit | Bar thickens 0.2s; lane bar draws from the left 0.35s; error line revealed with clip-path 0.25s, focus to the first invalid field | Instant |
| Workshop chips | MI3 + MI1 | Hover, check, press | Dot scales to 0.6 on hover; on check the chip fills, the dot pops to 1 in 0.35s and the tick wipes left to right in 0.25s | Instant |
| Date select, child checkbox | Bespoke | Hover, check | Border to lane 0.2s; tick wipe 0.25s | Instant |
| Form to confirmation | CD9-style crossfade | Valid submit, Change details | 0.4s expo.out, y 8 to 0; focus to the heading or the name field | Instant |

## Adapting

- **Brand.** Change the street tokens first. Keep one surface colour for the slab, one marking colour that reads on it at 7:1 or better, and one annotation colour that reads on the slab only. Recheck every pair; the current ones are listed in the table.
- **Drawing.** Redraw the inline SVG (`viewBox 0 0 1000 570`) as strokes of one width. Group strokes by system as `<g data-ch="1-4" data-paint="x|y|a">`, add `data-hub="x y"` to `a` groups, and keep `data-ch="0"` for what is laid down on load. Order groups inside a chapter in the order they should paint. Dimension groups take `class="dim"` (they are not lit by the beam). Move `LAMP`, `#cone` and `#cone-path` together if the headlamp moves, and `BOX` with the `#spot` and `#spot-clip` markup if the box moves.
- **Chapters.** Each chapter needs an article with an id, an `h3` with `tabindex="-1"`, one claim, two or three facts, a rail link and a caption name (`names` in the script). More chapters lengthen the runway by one viewport each; three to five is the useful range.
- **Retiming.** Chapter length is `C` in `buildStage` (100 or 90 svh) and the intro is `LEN[0]`; the paint/hold split is the `.7` in the timeline loop and `LAMP_T`; the wet band is `BAND`; the beam size is the 170 by 102 ellipse (`#spot`, flat-topped by `#spot-cut`, a quarter of its height above the centre) and the 150 feathered mask circle (`#spot-clip`) in `setSpot`. Durations and the ease live in `--d-fast`, `--d-mid`, `--d-slow` and `--ease-out`.
- **Removing effects.** Without the pointer beam, delete `#spot`, `#spot-clip`, `setSpot`, `head`, `park`, `beamIn` and the `fine` block; the glow then only shows inside the cone. Without the headlamp finale, delete `#cone`, `#cone-path`, `.lamp-lit` and `setLamp`. Without both, also delete the `.bike-lit` layer and the `glowEl` clones. Without the wet head, set `BAND = 0`. Without the sticky stage, drop the `tall` condition from `buildStage` and the page stays in its static layout, which is complete on its own.
- **Copy.** Keep claims as numbers a user can act on. Long chapter titles wrap to three lines on phones; on phones the stage tightens type below 860px and 700px tall, on wide screens below 760px, and it turns static below 560px.

Contrast ratios are measured in Chromium on the resolved `color-mix()` values.

| Token | Role |
|---|---|
| `--ground` | Concrete paving: the page (ink on it 10.6:1) |
| `--ink` | All text on the ground, button fill on hover |
| `--focus` | Focus ring (ink, 10.6:1 on the ground) |
| `--ink-soft` | Secondary text, fact keys, lede (6.4:1 on ground, 9.2:1 on the sheet, 7.9:1 on the input fill); also the border of the chips, the date select and the checkbox (non-text, 7.9:1 on the input fill) |
| `--lane` | The slab, buttons, chips when checked, link underlines, errors, rail fill, box paint in the bay drawings, the spec-row destination labels and hover line (5.4:1 on ground, 7.7:1 on the sheet) |
| `--paint` | Marking white: stroke base, button labels (7.7:1 on lane), dialog sheet, stall lines |
| `--paint-dry` | Dried marking on the slab (derived from paint and lane) |
| `--reflector` | Dimension lines, labels and the headlamp, on the slab only (5.6:1 on lane) |
| `--sign` | Brand mark only |
| `--rule` / `--track` | Decorative spec rules and the floor line only (2.3:1 on ground, not a control boundary) / empty rail track, the visible affordance of the chapter links (3.8:1 on ground) |
| `--field` / `--sheet` | Input fill (ink 12.9:1) / dialog background |
| `--font` | Rubik, the only family |
| `--t-xs` … `--t-2xl` | Type scale: 13, 15, 17, 21, 26px, then fluid 26-40px (chapter and section titles) and 36-56px (the headline) |
| `--label-px` | Rendered size of the SVG dimension labels, kept constant by the script's `--u` |
| `--s-1` … `--s-10`, `--gutter` | Spacing 4 to 128px; page gutter 16 to 48px |
| `--measure` | Chapter body line length, 52ch |
| `--r-slab` / `--r-pill` | 20px slab corners / pill buttons and chips |
| `--stroke-paint` / `--stroke-dim` | Marking width and dimension-line width, in SVG units |
| `--ease-out`, `--d-fast`, `--d-mid`, `--d-slow` | The one ease and the three durations (0.2, 0.45, 0.9s) |
