---
title: Painted on the lane
section: features
subject: Kade Cargo, a fictional Rotterdam maker of urban cargo e-bikes, presenting the systems of its new front-loader, the Kade L2, and taking test-ride bookings.
aesthetic: The Dutch street. A slab of red bike-lane asphalt on warm concrete paving, with the bike laid down on it in round-capped white thermoplastic, one marking-cart pass per system, and SAE pedal-reflector amber kept for the dimension lines and the headlamp.
mode: light
fonts:
  - Wix Madefor Display 600-800 (Google Fonts). Headline 800 at -0.02em, chapter and section titles 700, bay names 700, button labels 600
  - Wix Madefor Text 400-500 (Google Fonts). Body, chapter facts, chapter links, spec rows (figures 500), form, SVG dimension labels 500. Same Dalton Maag superfamily as the display cut
js: Runs the sticky chapter stage, where one scrubbed timeline paints the bike onto the lane while the drawn headlamp aims at a fine pointer or parks on the chapter's system, plus the setup toggles and the test-ride booking dialog.
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

**The one bold idea: the bike paints itself onto the bike lane as you scroll.** One rounded slab of red lane asphalt holds a side elevation of the Kade L2, drawn the way Dutch lanes are marked: thick white thermoplastic, one stroke width (one marking-cart width) everywhere, round caps. During page load the slab opens left to right, the marking cart's direction of travel, and the lane edge's chalk layout line (the faint *voormarkering* crews snap before they paint), both wheels, the lamp's stay (the top of the box front) and the headlamp on it are laid down; then the headlamp switches on and throws its beam down the lane. Each of four chapters paints one system (the box; the drive, with the seatpost and saddle you pedal from; steering and brakes; size and parking, with the rear rack and the centre stand) with clip-path wipes that run the way a line-marking cart would travel: tubes from the bottom up, horizontals left to right, wheels, the motor and the rotors around their hub from the contact patch. Every wipe carries a wet head, a brighter copy clipped to the leading 10% of the stroke, so the paint visibly goes down rather than being uncovered. While a chapter paints, its quarter of the lane edge is repainted over the layout line, so the lane edge is the progress line and there is no separate progress bar.

The light comes from the bike. The beam is anchored at the drawn headlamp and feathered: three co-centred wedges (24, 36 and 50 degrees) fade its sides, and a radial falloff fades its reach. Inside it the painted lines glow warm white, the way glass beads in road paint do under a headlight. On a fine pointer the lamp turns on its mount toward the pointer, all the way round, so whatever is under the pointer is lit: the saddle and bars of the drive, the rear rack and the rear wheel included; without one (touch, keyboard, a pointer elsewhere) it swings onto the system each chapter paints. When the last stroke of chapter 4 lands, it turns back down the lane: the bike's own light again. It is a source-anchored, directional beam, not a lens that follows the pointer, and strokes that are not painted yet never light up.

- **The page is made of street materials.** Concrete paving (`--ground` #D3D0C8, warm and visibly darker than a paper white) is the page, red lane asphalt (`--lane` #782A23) is the one coloured surface and the action colour, white thermoplastic (`--paint`) is the drawing, SAE pedal-reflector amber (`--reflector` #F2A21B) appears only on the slab, for the dimension lines and the headlamp. Round bicycle-sign blue appears once, inside the brand mark, because the mark is that sign. Buttons are lane-red pills with white labels: they read as lane paint, and they are round like the sign.
- **Radius encodes type.** The slab has 20px corners, buttons and chips are pills, everything else (bays, rows, rules) is square.
- **The reader moves with the bike.** Everything is left-aligned, the drawing faces right with the box leading, and the text sits on the left. From 960px the sticky slab takes eight of twelve columns and runs off the right edge of the page, the direction of travel, capped at 74svh tall so short laptops still fit. From 960px the header lies over the top of the runway while the stage runs, so the stage is centred in the viewport from the first frame. On short laptops (560 to 760px tall) the stage starts below that header, the chapter links run in a row and the type and slab tighten to fit. Below 960px the stage is aligned to the top, just under the header, and reads slab, chapter text, chapter links, "Skip the drawing". At every width the headline or chapter text comes first and the chapter links share the bottom band with Skip. In the last 10svh of the runway the Setups heading slides up into the stage's empty lower band (not on short laptops, where the stage has none), so the end of the stage is not a page break; "Skip the drawing" fades out once the last stroke lands, so it never reads as a label over the Setups heading.
- **Text never scrubs.** Chapter text changes only when the chapter index changes, with a short timed crossfade, and each chapter holds its finished drawing for the last 30% of its run so it can be read at rest.
- **Chapter navigation is four plain text links.** The box, The drive, Steering and brakes, Size and parking. They sit under the chapter text, on the column's left edge. The current one is marked with `aria-current="step"` and a short painted lane-red dash, not a bar: from 960px the dash hangs in the gutter in front of the link, below 960px (16px gutter) it is painted under the link. "Skip the drawing" sits under the links at every width, as the exit from a bounded sticky section. In the DOM the links follow the chapters, so after a chapter link moves focus to its heading, Tab returns to the links.
- **Setups are bays, not cards.** Four unboxed bays sit between painted white stall lines on the concrete. Each bay is one toggle (`aria-pressed`): hover or keyboard focus previews the box loaded (HV6, a pulled-focus swap in a fixed frame), click or tap commits it, so nothing is hover-only.
- **The spec table repeats the signature.** Each spec row links back into the stage at the chapter that draws that part, so the table is not a dead end. Keys, values and destinations each share one column, so every value starts on one left edge.
- **The copy is the rider's.** Every claim is a number a parent can use: 100 kg in the box, 32 cm off the road, a 4.6 m turning circle, an 80 cm doorway. The test-ride confirmation is built from the chosen Saturday and time, the workshop, the child option when ticked, and a generated K2-#### reference. A finished booking clears the form when the dialog closes; a half-filled form is kept as a draft.

Reasoned exceptions and departures:

- The lane red #782A23 is a dark oxide used as a surface on a warm grey concrete page with a sans display, tied to the Dutch fietspad. It is not the cream, serif and terracotta default. It is darker than a dry lane on purpose: the reflector amber needs 4.5:1 on it for the dimension labels.
- Wheels, the motor and the rotors paint as a sweep around the hub, not as a growing circle from the hub: a growing circle makes a ring appear all at once, a sweep reads as a cart going round.
- The headlamp and its stay (the top 52 units of the box's front edge) are laid down with the wheels on load, before the rest of the box, because the lamp is the light the rest of the bike is painted under. Chapter 1 paints the box front only up to the stay, so nothing is drawn twice.
- The header is not fixed (from 960px it lies over the top of the runway and scrolls away with it), so the planned section spy on Setups and Specs was dropped: the header is never on screen when those sections are. Below 600px the header keeps one row and drops its Setups and Specs links: Skip the drawing leads to Setups, and Specs follows it.
- The setup toggle keeps one visible label, "Show it loaded", with `aria-pressed`. A label that flips between two actions on a pressed-state button contradicts the state; the pressed state shows as a filled pill and a tick that wipes in. A visually hidden bay name, "(Kids bench)", makes each accessible name unique.
- Chapter links land at 75% of their chapter, where that system is fully painted, instead of at the chapter's first pixel.
- The page has no `h1`. It is a section meant to compose into a page, so the host page supplies the `h1`; the section starts at `h2`. The `h2` is static from the first paint: the slab carries the load sequence.
- While a chapter is shown, the intro lede is `aria-hidden`; the intro `h2` stays exposed on purpose, because it is the section's `aria-labelledby` name.
- Under reduced motion the setup toggles keep a 0.2s opacity crossfade between the empty and loaded drawings, with no scale. It answers a press and moves nothing.
- The brand link has no underline: the wordmark is not body-text link chrome. It answers with the wheel spin and the focus ring.
- Wix Madefor has no tabular figures ("1111" sets 23% narrower than "0000"). No figures are compared down a column (the spec values have different units), so values simply start on one left edge, and the two SVG dimension labels stand alone, centred on their own dimension lines.
- From 960px the slab's top edge and the chapter heading's cap height share one line (`text-box` trims the heading to its cap height), in the intro and every chapter.

## Do not touch

- One stroke width (`--stroke-paint`) for every painted line, wheels included. Thin and thick strokes turn the marking into an illustration.
- The cart-direction rule for each group's wipe (`data-paint`: `x` left to right, `y` bottom up, `a` around the hub), and the slab opening left to right. A wipe against the direction of travel reads as a reveal, not as paint.
- One scroll trigger and one paused, scrubbed timeline for all chapters. Separate triggers per chapter drift apart.
- Text that only changes on chapter change, never scrubbed, and the 70% paint / 30% hold split inside each chapter. The lane-edge quarter of each chapter runs over the same 70%.
- The bounded runway, the chapter links and "Skip the drawing". Below 560px tall (phone landscape), with reduced motion and without JavaScript, the stage is static: the full drawing with the headlamp on and its beam down the lane, and the four chapters as stacked articles that carry `#ch-box`, `#ch-drive`, `#ch-steer` and `#ch-size`, so every link works.
- The fallbacks. Without the CDN libraries the toggles, anchors and dialog still work, without motion. Without JavaScript the anchors and the static stage still work, but the dialog and the toggles do not.
- Amber stays on the slab. It is 4.6:1 on the lane and unreadable on concrete.
- The beam starts at the headlamp and only turns about it. A free-floating circle or lens that follows the pointer is a different, much more common effect. The aim is not clamped: a clamp leaves parts the pointer can never light.
- The beam's sides are feathered with co-centred wedges, never with a blur filter.
- The native cursor stays visible; the beam is an addition, never a cursor replacement.
- The lit copy only brightens what is already painted: each glow clone takes its source group's clip-path in `paint()`. The layout line and the dimension lines have no glow clone. The drawing is fully legible without the beam.
- The lit copy lives in its own absolutely positioned `<svg class="bike bike-lit">` over the drawing, under a `<mask>` (the wedge, fading with distance). Its halo is geometry, not a filter: every lit group has two warm-white (`--paint-glow`) copies underneath, 2 times the marking width at 18% and 3.2 times at 8%, so the light falls off instead of outlining the stroke. The clones' clip-paths change on every scrub frame, so any filter on that layer is re-rasterised each frame and the scrub janks (measured: 24 to 87 of about 320 frames over 20ms with a drop-shadow, 0 with the halo underlay, 1440x900 wheel scroll).
- `.toggle` is never transformed: its `::after` makes the whole bay the hit area, and a transform would make the button the containing block and shrink that area mid-click. The press scale lives on `.pill`.
- Buttons fill left to right and leave by fading; the fill never retracts.
- The backdrop closes the dialog only when the press also started on the backdrop, so a text selection dragged out of a field does not lose the form. `html:has(dialog.ride[open])` locks the page even when Lenis is not running.
- `.slab` uses `overflow: clip` and a fixed `aspect-ratio`. With `overflow: hidden` the grid can shrink its row on short screens and the slab overlaps the text.

## Motion

All motion is GSAP 3.15 (ScrollTrigger) on Lenis 1.3.26, inside `gsap.matchMedia` with `motion`, `reduce`, `fine: (hover: hover) and (pointer: fine)`, `wide: (min-width: 768px)` and `tall: (min-height: 560px)`. One ease family: `expo.out` (`--ease-out`, cubic-bezier(.16,1,.3,1)) for entrances and responses, `expo.inOut` for the slab and lane-edge wipes, `none` for anything scrubbed. Leaving a hover takes about 70% of entering. Hidden starting states exist only once the script has added `html.motion` or `html.stage`. Reduced motion: no Lenis, no sticky stage, final states only (full drawing, headlamp on with its beam down the lane, stacked chapters, stall lines and spec rules drawn, dialog opens and closes without a fade). When the context rebuilds (the motion setting changes, or the viewport crosses 768px wide or 560px tall), the reader keeps their place: the current chapter maps to the same chapter in the other layout, and anywhere else to the same landmark and offset.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Slab opens left to right | LD7 (clip-path window, in the direction of travel) | Load, sticky stage only | 0s, 0.9s expo.inOut; hidden until 0.06s so the closed slab never shows as a hairline | Present |
| Header settles: brand, Setups, Specs rise 6px and fade in; Book a test ride rises only | LD8 (quiet chrome) | Load | 0.3s, 0.4s expo.out, stagger 0.08; the CTA is never hidden | Static |
| Lane-edge layout line, with wet head | SC12 prelude | Load | 0.45s, 0.8s expo.inOut | Drawn |
| Rear wheel, front wheel paint around their hubs; the lamp stay paints bottom up; the headlamp paints around its centre | SC12 prelude | Load | 0.6s, 0.75s (1.0s expo.out); stay 0.95s (0.35s); lamp 1.1s (0.4s) | Drawn |
| Headlamp switches on and throws its beam down the lane | Signature prelude | Load | 1.3s: lamp 0.3s, beam length 0.7s expo.out | On |
| Chapter links, then Skip the drawing, fade in | LD8 | Load | 0.6s stagger 0.06; skip at 0.9s; 0.6s | Static |
| Headline and lede | none | | Static at first paint | Static |
| 24 bike stroke groups (7 box, 9 drive, 6 steering and brakes, 2 size), plus 2 dimension groups and 4 lane-edge quarters, paint in four chapters (34 groups in all with the 4 laid down on load) | SC3 sticky chapters + SC12 scrubbed drawn sequence | One ScrollTrigger, `scrub: true`, top top to bottom bottom of the runway | Runway 100svh + 40svh intro + 4 x 100svh (90svh under 768px), last chapter +15%; each chapter paints over 70% and holds 30% | Static full drawing |
| Lane edge repainted one quarter per chapter (the progress line) | SC12 | Same timeline | Over each chapter's 70%, left to right | Fully painted |
| Wet paint head on every wipe | SC12 detail | Same progress as its group | Band 10% of the wipe, hidden at completion | None |
| Chapter text change; chapter-link dash moves | SC3, heading laid like a marking | Chapter index change only, time-based, never scrubbed | Old text fades out 0.3s; after 0.16s the new heading wipes in left to right (clip-path inset, 0.5s expo.out), and its paragraph and facts fade in 0.08s later (0.45s, no offset); dash scaleX 0.45s in, 0.3s out | Stacked articles, no dash |
| Skip the drawing fades out | Exit no longer needed | Last stroke of chapter 4 lands (back in when scrolling up) | autoAlpha 0.3s expo.out, inert while hidden | Always shown |
| Beam swings onto the chapter's system (box, drive, steering rod, stand), then down the lane after the last stroke | CU4 reworked as a source-anchored headlamp (touch, keyboard and pointer-away equivalent) | Chapter change, last stroke crossed, pointer leaves the slab | quickTo on the aim angle, 0.6s expo.out, the short way round | Down the lane, static |
| Beam aims at the pointer; painted lines inside the wedge glow warm white | CU4 headlamp (signature, fine pointers) | Pointer moves over the slab | quickTo on the aim angle, 0.5s expo.out, the short way round, all the way round the lamp | Off |
| Stall lines paint | SC16 | Bays at top 80%, once | 0.9s expo.out stagger 0.08 (scaleY from the bottom; scaleX from the left on narrow) | Static |
| Spec rules paint | SC16 | Spec list at top 85%, once | scaleX from the left, 0.9s expo.out, stagger 0.04 | Static |
| Brand link | Wheel spin + MI1 | Hover, focus, press | Front wheel of the mark turns once, 0.8s expo.out; no underline, focus ring on focus | Focus ring only |
| Header links, chapter links, Skip the drawing, Email the workshop, Change details | HV2 directional underline (ink) | Hover (only where `hover: hover`, as for every hover effect, so a tap never leaves one stuck), focus | 0.45s in from the left, out to the right; persistent at 30% on touch | Static underline |
| Header links, chapter links, spec rows, skip, brand | NV6 eased anchors | Click | Lenis, min(1.3, 0.65 + distance / 4000) s, then focus on the target heading | Immediate jump, focus moves |
| Book a test ride (x2), Book my ride, Done | HV4, always left to right + MI1 | Hover, focus, press | Ink fill scaleX from the left, 0.45s; leaves by fading, 0.3s; press scale 0.975 in 0.12s, release 0.45s | Colour change only |
| Setup bays | HV6 + MI1 | Hover or focus previews, click or tap commits | Empty drawing to 0.95, loaded drawing in from 1.05 with opacity, 0.5s in, 0.35s out; tick wipes in 0.25s | Crossfade only |
| Spec rows | Marking line | Hover, focus, `:active` on touch | A 4px lane-red line paints over the row's top rule, scaleX from the left 0.45s, leaves right 0.3s; the destination ("See the drive", "See the size") rises 0.35s; on touch it is always shown | Instant |
| Test-ride dialog | CD7 | Open, close (button, Escape, backdrop) | Panel opacity, y 12 to 0, scale 0.98 to 1, 0.45s; close 0.3s; Lenis stopped while open; focus returns to the opener | Instant |
| Close button | Bespoke + MI1 | Hover, focus, press | X rotates 90 degrees, 0.4s | Instant |
| Name and email fields | MI4 | Hover, focus, invalid submit | Bar thickens 0.2s; lane bar draws from the left 0.35s; the error line has reserved space and is revealed with clip-path inset 0.25s; focus to the first invalid field | Instant |
| Workshop chips | MI3 + MI1 | Hover, check, press | Dot scales to 0.6 on hover; on check the chip fills lane red, the dot pops to 1 in 0.35s and the tick wipes left to right in 0.25s | Instant |
| Date select, child checkbox | Bespoke | Hover, check | Border to lane 0.2s; tick wipe 0.25s | Instant |
| Form to confirmation | CD9-style crossfade | Valid submit, Change details | 0.4s expo.out, y 8 to 0; focus to the heading or the name field | Instant |

## Adapting

- **Host page.** The section has no `h1` and starts at `h2`; the page it is composed into must supply the `h1`.
- **Brand.** Change the street tokens first. Keep one surface colour for the slab that also works as the button colour, one marking colour that reads on it at 7:1 or better, and one annotation colour that reads on the slab at 4.5:1 (darken the slab before you lighten the annotation). Recheck every pair; the current ones are in the table.
- **Drawing.** Redraw the inline SVG (`viewBox 0 0 1000 570`) as strokes of one width. Group strokes by system as `<g data-ch="1-4" data-paint="x|y|a">`, add `data-hub="x y"` to `a` groups, and keep `data-ch="0"` for what is laid down on load (layout line, wheels, lamp stay, headlamp, in that order). Order groups inside a chapter in the order they should paint. Dimension groups take `class="dim"` and the layout line `class="primer"` (neither is lit). Each chapter's lane-edge quarter is a `class="edge"` group split in a dash gap. If the headlamp moves, move `LAMP`, the lamp circles and the `beam-g` and `lit-g` gradient centres together, and redraw the three wedges in both `#cone` and `#cone-path` from the new lamp point. The resting aim points are `AIM` (one per chapter) and `AHEAD`.
- **Chapters.** Each chapter needs an article with an id, an `h3` with `tabindex="-1"`, one claim, two or three facts and a chapter link. More chapters lengthen the runway by one viewport each; three to five is the useful range.
- **Retiming.** Chapter length is `C` in `buildStage` (100 or 90 svh) and the intro is `LEN[0]`; the paint/hold split is the `.7` in the timeline loop and `LAMP_T`; the wet band is `BAND`; the beam's spread is the three wedge paths (12, 18 and 25 degrees either side, with their opacities as the feather) and its reach the 950 radius of the paths and both gradients. The aim follow is the two quickTo durations (0.6 parked, 0.5 on the pointer). Durations and the ease live in `--d-fast`, `--d-mid`, `--d-slow` and `--ease-out`.
- **Removing effects.** Without the pointer aim, delete the `fine` block in `buildStage`; the beam still parks per chapter. Without the beam, delete `#cone`, `#cone-path`, the `.bike-lit` layer, the `glowEl` and `halos` clones, `setCone`, `park` and the lamp tweens in the load timeline. Without the wet head, set `BAND = 0`. Without the lane-edge progress, delete the four `.edge` groups and the `primer` class. Without the sticky stage, drop the `tall` condition from `buildStage` and the page stays in its static layout, which is complete on its own.
- **Copy.** Keep claims as numbers a user can act on. Long chapter titles wrap to three lines on phones; on phones the stage tightens type below 860px and 700px tall, on wide screens below 760px, and it turns static below 560px.

Contrast ratios are measured in Chromium on the resolved `color-mix()` values.

| Token | Role |
|---|---|
| `--ground` | Concrete paving: the page (ink on it 10.2:1) |
| `--ink` | All text on the ground, link underlines, button fill on hover, the dialog backdrop (55%) |
| `--focus` | Focus ring (ink, 10.2:1 on the ground); nothing focusable sits on the slab |
| `--ink-soft` | Secondary text, fact keys, lede, inactive chapter links (6.2:1 on ground, 9.3:1 on the sheet, 7.8:1 on the input fill); also the border of the chips, the date select and the checkbox |
| `--lane` | The slab, buttons, chips when checked, errors, the chapter-link dash, box paint in the bay drawings, the spec-row destination labels and hover line (6.3:1 on ground, 9.4:1 on the sheet) |
| `--paint` | Marking white: stroke base, button labels (9.4:1 on lane), dialog sheet, stall lines, the brand mark's bike |
| `--paint-dry` | Dried marking on the slab (derived from paint and lane) |
| `--paint-wet` / `--reflector-wet` | The brighter wet head of a white stroke / of a dimension line |
| `--paint-glow` | Glass-bead marking lit by the headlamp (the bright lit stroke and its two halos) |
| `--beam` | The headlamp's light on the asphalt (beam gradient stops) |
| `--reflector` | Dimension lines, labels and the headlamp, on the slab only (4.6:1 on lane) |
| `--sign` | Brand mark only |
| `--rule` | Decorative spec rules and the floor line only (2.3:1 on ground, not a control boundary) |
| `--field` / `--sheet` | Input fill (ink 12.7:1) / dialog background |
| `--font-display` | Wix Madefor Display: headline, chapter and section titles, bay names, buttons, the wordmark, dialog titles |
| `--font-text` | Wix Madefor Text: everything else, including the SVG dimension labels |
| `--t-xs` … `--t-2xl` | Type scale: 13, 15, 17, 21, 26px, then fluid 26-40px (chapter and section titles) and 36-56px (the headline) |
| `--label-px` | Rendered size of the SVG dimension labels, kept constant by the script's `--u` |
| `--s-1` … `--s-10`, `--gutter` | Spacing 4 to 128px; page gutter 16 to 48px |
| `--measure` | Chapter body line length, 52ch |
| `--r-slab` / `--r-pill` | 20px slab corners / pill buttons and chips |
| `--stroke-paint` / `--stroke-dim` | Marking width and dimension-line width, in SVG units |
| `--ease-out`, `--d-fast`, `--d-mid`, `--d-slow` | The one ease and the three durations (0.2, 0.45, 0.9s) |
