---
title: Net cafe pricing on CRT panels
section: pricing
subject: Afterimage, a 24-hour net cafe (PC bang) with 96 seats in Seomyeon, Busan, showing three ways to pay (by the hour, the night pack, the 30-hour card) across three booth types, with a dialog that holds a seat.
aesthetic: A smoked room full of tubes. A brown-black ground, three plan panels drawn as monitors with stepped corners and a faint scanline mask, amber phosphor prices in a square-module pixel face, and pink and cyan colour ghosts that separate from the text only while something moves.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, set at ELSH 2 and ELGR 1 so the modules are square. Used for the H2 at 700, the plan names at 600, the prices at 700 and the seat code on the receipt at 700.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything you read, at 400 for body and 600 for buttons, segments, units and terms, with tabular figures.
js: Updates the 3x3 price table from the booth control, runs the hold-a-seat dialog with validation and a receipt (nothing is sent), and adds the motion layer (pointer-driven RGB split, tube power-on, hum bar, degauss, beam re-scan, glitch buttons, link afterimage, vertical-hold dialog, receipt feed).
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [pricing, net cafe, pc bang, arcade series, crt, rgb split, glitch, scanlines, segmented control, dialog, receipt, dark, gsap, lenis]
use_when:
  - A venue or service priced by time, where one choice (room, seat or tier) changes every price and the table must stay small, such as net cafes, karaoke rooms, studios or arcades.
  - A brand whose world is screens, tubes or late-night rooms, so that scanlines and colour fringing describe the place and are not a filter laid over it.
  - Three plans or fewer, each with one price, a short list and one action that opens the same booking step.
avoid_when:
  - More than three plans or more than three options on the control. The monitors and the segments stop fitting, and the re-scan becomes noise.
  - Light, quiet or premium brands. The fringing, the static and the pixel face are loud by design.
  - Pages that already run a pointer effect or a glitch effect nearby. Two of them read as a fault.
  - Audiences that need a long comparison table. This shows one booth's prices at a time.
---

## Why it works

**The one bold idea: every price is on a CRT, and the cafe is called Afterimage.** The three plans are three monitors. Their text is clean at rest, but each price and plan name carries a pink and a cyan copy under it, and those ghosts pull apart, in whole pixels, when the pointer comes near and moves (0 to 5px, away from the pointer). They snap back to 0 when the hand stops, because the split is driven by a pointer energy that halves every 0.14s. Everything else on the page is the same tube behaving like a tube: it degausses on load, each panel switches on when it scrolls into view, and changing the booth makes the beam re-scan each price from the top. Scrolling is the tube's time base: a refresh line in each monitor travels down the glass as the page scrolls and back up when it reverses, a hum bar rolls down the screen, and each line of fine print tunes in with a short tracking tear as it arrives. All three stand still when the page does. Phosphor persistence is the theme, so the things that linger (a link's green afterimage, the chosen segment burning in) are the small motions.

This design belongs to the **arcade series**. The series shares Handjet and Host Grotesk with cta-indie-game on purpose, at the owner's request, together with its flat pixel geometry (a cell-based spacing scale, stepped corners, zero radius) and its stepped, frame-rate motion. It differs from cta-indie-game in subject, palette and every effect. That page is a cold harbour with one lattice that lights under the pointer and two accents. This page is a warm brown room with seven hues that each have a job, no lattice and no canvas scene, and the pointer acts on the type itself.

- **A 3x3 table shown as three numbers.** Three ways to pay by three booths is nine prices. The booth is chosen once, on a radio group styled as three hard segments, and the three monitors show that booth's prices as real text. The table is consistent: the night pack is five hours' price for ten hours, and the card works out at a round price per hour (1,300, 1,700 and 2,200 won). Each panel says what the price works out to, so the plans can be compared without a calculator. A visually hidden `aria-live` line reads the three new prices after a change.
- **Colour has jobs.** Smoked brown-black (`--smoke` #221810) is the ground and tube glass (`--glass`) is the panel, a chosen dark and not a tinted black. Warm white is text and the lit booth segment. Amber is phosphor: prices and the primary action, and the by-the-hour tag. Green is the good news and the afterglow: free seats, the confirmation, lit links and focused fields. Pink and cyan are the two colour ghosts; pink is also the night pack's tag, and cyan is every focus ring. Violet is the 30-hour card's tag. Red is errors only. No hue is used for decoration.
- **The tags carry facts.** Each monitor's tag says when the plan applies ("Any time of day", "22:00 to 08:00", "Valid for 60 days"), in that plan's colour, and the list bullets repeat the colour. There are no eyebrow labels.
- **The booking step is the same for all three plans.** Every "Hold a seat" opens one native dialog with that plan and the current booth already selected, a live price line, two text fields with a hint each, and a receipt at the end with a seat code. "Hold another seat" returns to the form with the name and contact kept.
- **Fine print that is true to the place.** Under-18s cannot be in a PC room after 22:00, cards are per person, the night pack ends at 08:00 whenever it started, food is ordered from the seat. Each panel links to its own line, and the line it points at is marked in green.
- **Semantics.** This is a section, so the host page supplies the `h1`. The section's `h2` is the first heading, the plan names are `h3`, and the dialog's `h2` is outside the section because the dialog lives in the top layer.

**Effects that are new to the collection** (none has a catalogue code): the pointer-driven RGB split on type; the tube power-on (a line that grows across, opens vertically and flashes); the scroll-placed hum bar; the scroll-scrubbed refresh line with stepped afterglow; the tracking tear that tunes a text row in; the degauss shake on load; the beam re-scan that replaces a value line by line with two clipped copies; the burn-in flash on a segmented control; glitch slices on buttons; a two-frame static dropout on press; the link afterimage; the scanline sweep on field focus and the two-frame label mistrack on error; the vertical-hold dialog roll; and the receipt that feeds out of a slot.

Deviations from the brief, and why:

- **The headline also carries the ghosts.** The brief names prices and plan names. The H2 has them too, so the degauss on load has something to converge on before the tubes are on, and so the signature is visible on the first screen.
- **Pink is #FF6BAA, not #FF4F9A, and red is #FF7B6C.** The night pack's tag sets dark text on pink under both the scanline mask and the hum bar. The brighter pink keeps that worst case at 5.0:1 (the brief's value fell to 4.3:1). Red was raised for 6.2:1 on the dialog surface.
- **The scanline mask is 8%, one pixel in four.** The brief allows 10%. At 8% the tags (dark text on pink) stay at 5.0:1 on a mask row under the hum bar.
- **Secondary text is #D6C2A8, not #CBB59A.** It is 10.1:1 on the ground and 9.0:1 on glass. The lighter value keeps it at 4.8:1 in the worst pixel row (over the refresh line, with the hum bar's edge on the same row).
- **The hum bar wraps on the screen, not on the section, and it is flat with a leading edge.** Its place in the viewport is a function of the scroll position, so it is always somewhere on screen. Wrapping over the section's full height left it off screen for long stretches on phones. It is a flat 8% (the brief's limit) with a 1px edge of 10% warm white on the side it travels toward, so the eye can follow it; soft steps at 3% and 6% could not be seen.
- **Two scroll effects were added after review: the refresh line and the fine print tuning in.** With the tubes already on, a desktop visitor saw almost nothing change while scrolling. Both stay inside the tube's vocabulary. The refresh line runs under the text at 18% amber, with bright caps only in the tube's side padding where there is no text, so it is easy to see and costs the text nothing.
- **The opening flash is 40% warm white, not full white.** On a wide screen all three tubes switch on within a second. Three large full-white flashes in a second is the limit for flashing content, so the open tube is lit at 40%, then 20%, then 8%.
- **The tube's content is hidden with opacity, not visibility, before it switches on.** A button in a tube that is still off stays in the tab order, and focusing it scrolls the tube into view, which switches it on.
- **Each text field has a hint line, and the error takes its place.** The line is reserved, so the dialog does not change height when an error appears.

## Do not touch

- **The ghosts are 0px apart and not painted at rest.** `.rgb::before` and `.rgb::after` are `visibility: hidden` until the script adds `is-split`. If they are left visible at 0px, their antialiased edges tint the text. Offsets are whole pixels only.
- **`data-text` must equal the text.** The ghosts are `content: attr(data-text) / ""` (the empty alternative text keeps screen readers from reading the price three times). The booth control writes the new price into both the text node and `data-text`. The links' afterimage uses the same attribute.
- **The split comes from energy, not from position.** The pointer part of the offset is proximity times an energy that speed raises and time halves (`--half-split`). Do not make it depend on proximity alone, or resting text near the pointer stays fringed and the prices become hard to read.
- **Text contrast under the overlays.** The scanline mask (`--mask-a`, 8%), the hum bar (`--hum-a`, 8%) and its edge (`--hum-edge`, 10% warm white) sit over text, and the refresh line (`--line-4`, 18% amber) sits under it. The worst pixel rows are in the token comments: 4.6:1 for an amber price over the refresh line with the hum bar's edge on the same row, 5.0:1 for a tag on a mask row under the hum bar. Raising any of the four means recomputing those ratios.
- **The refresh line stays on the raster and under the content.** Its rows are multiples of 4px from the tube's top, and the mask darkens the fourth row of every four, so the two never share a row. It is painted between the glass and `.tube-in`, so buttons and tags cover it. Its bright caps (`--cap-*`, 12px wide) must stay narrower than the tube's side padding (16px on phones).
- **Stepped corners live on wrappers, never on a focusable element.** `.bezel` and `.screen` clip the monitor; `.face` and `.inner` clip the button. The `<button>` itself is unclipped, so its cyan focus ring is never cut. The tube's own `clip-path` is free for the power-on.
- **The booth control is a native radio group.** Three `input[type=radio]` in a `fieldset` with a `legend`; arrow keys move between them. There is no sliding indicator by design: the chosen segment changes state in one cut and burns in.
- **One dialog, three openers.** The dialog remembers which button opened it and returns focus there after Close, Escape or a backdrop press. Lenis is stopped while it is open. A second Escape during the roll-out is not cancelable, so the `close` handler resets every inline style.
- **Hidden states exist only under `html.js:not(.go)`,** and the script sets the same states inline before it adds `.go`. If the CDN is blocked the `js` class is never added: everything is visible, the booth control updates the prices and the dialog flow works in plain JavaScript.
- **No loops.** The split loop is on `gsap.ticker` only while some offset is not zero, and it stops when the section is off screen. The hum bar and the refresh lines are written on scroll and resize only, so they are still when the page is still. Do not add an idle flicker to the tubes.
- **Sizes.** Buttons, fields and segments are 48px high; text links have a 44px target. The price is sized from its own panel (`28cqw`, clamped), so it fits six characters in a 300px column and in a 700px single monitor.

## Motion

House easing: almost everything is `steps(n)` or a list of discrete frames set by delayed calls, so it reads as a machine with a frame rate; there are no eased slides. Everything is built inside `gsap.matchMedia` (reduce, motion, fine pointer). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, with `lenis.on('scroll', ScrollTrigger.update)` and `anchors: true`. The load sequence waits for the fonts (`document.fonts.ready` plus two Handjet loads, 1.5s hard timeout) and for a visible page. Only transform, opacity, clip-path, visibility and one fixed filter (the tear's hard ghosts) are involved; colour changes are instant cuts. The field scanline, the label mistrack, the segment burn-in and the link afterimage are CSS keyframes, so the first two also run without the libraries.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Degauss | Stepped shake of the whole content block, with the colour ghosts converging | Load (fonts ready, page visible), once | 9 frames over 0.6s. `skewX` 2deg and `x` 6px, alternating sign and decaying (1, -0.8, 0.65, -0.5, 0.38, -0.27, 0.17, -0.08, 0). Ghost spread 8px down to 0, one pixel per frame | None; clean text |
| Tube power-on | A bright line grows across the dark screen, opens vertically to the full panel, flashes, and the content cuts in | Each panel entering view (ScrollTrigger, top 88%, once). Panels that enter together are 0.12s apart; at load the first waits 0.2s | Line: `clip-path` inset from the centre, 0.18s `steps(6)`. Opening: 0.2s `steps(5)` at 40% warm white. Content cuts in under two frames of afterglow (20%, 8%) over 0.12s | Panels on |
| Hum bar | A 120px band of flat 8% black with a 1px leading edge of 10% warm white, placed from the scroll position | Scroll and resize (Lenis or native touch scrolling) | Moves down the screen 0.5px per scrolled pixel, in 4px steps, and re-enters at the top | Not shown |
| Refresh line | In each tube, a 2px amber line under the content with three afterglow rows behind it (18%, then 10%, 6%, 3%) and bright caps in the side padding (90%, then 50%, 30%, 15%), placed from the scroll position | Scroll and resize; still at rest | Travels down the glass 2px per scrolled pixel in 4px raster steps, wraps at the bottom, and reverses with the scroll (the afterglow flips to trail it). The three tubes are a third of a pass apart | Not shown |
| Fine print tunes in | The line is shown as three slices of itself, cut at two random heights and offset sideways, each with a pink and a cyan ghost (`drop-shadow` with no blur), then locks clean | Each fine-print line entering view (ScrollTrigger, top 92%, once), also when a panel link scrolls to it. Lines that enter together are 0.07s apart | 3 frames over 0.2s, offsets up to 8px, 6px, then 3px; then the copies are removed | Lines shown |
| RGB split (signature) | Pink and cyan copies of the text (`::before`, `::after` from `data-text`) offset in opposite directions along the line from the pointer to the text | `pointermove` on the section (fine pointers) | Offset = round(5px x proximity x energy). Proximity falls to 0 at 360px from the text box. Energy = pointer speed / 0.9px per ms, clamped 0.25 to 1, halving every 0.14s, so the text is clean at rest. Pointer on the text itself: horizontal split | No split |
| RGB split, touch | The same, from the touch point | `touchstart` (energy 1 at once), `touchmove` | Follows the finger and decays with the same half-life | No split |
| RGB split, keyboard | One pulse on that plan's name and price | `focusin` on a plan's button with `:focus-visible` | 4px, 2px, 1px, then 0, one frame of 0.06s each | No split |
| Beam re-scan | Two stacked copies of the price with `clip-path`, and a 2px warm-white beam between them: the new price above the beam, the old one below | Booth change (click, tap or arrow keys) | The beam crosses the price box in 0.3s `steps(10)`; the three panels start 0.05s apart | Instant price change |
| Segment burn-in | A white block 5px larger than the chosen segment | Booth change | 2 frames over 0.12s (opacity 1, then 0.45), then gone. No sliding indicator | Instant |
| Button glitch slices | The lit face as four horizontal strips, each with a pink edge on the left and a cyan edge on the right | `pointerenter` (mouse, pen); `focus` with `:focus-visible` | 4 frames over 0.24s, each strip at a random whole offset of 2 to 4px left or right, then the lit face locks in. Leaving cuts back | Instant colour change |
| Button signal dropout | A 24x12 noise tile, made once from the page's own tokens and scaled up with `image-rendering: pixelated`, over the face | `pointerdown` (mouse, pen and touch); Enter or Space | 2 frames over 0.1s, the tile shifted between them | None |
| Button, touch | The lit face | `:active` | Instant | Instant |
| Link afterimage | The link turns green in one cut; on leaving, a green copy of its text stays and decays | Hover and `:focus-visible` light it; `pointerleave`, `blur` (after keyboard focus) or the end of a tap start the decay | 4 opacity steps (0.8, 0.6, 0.4, 0.2) over 0.6s, `steps(4)` | Green while lit; no afterimage |
| Field focus | A 2px green scanline sweeps down the field; the border turns green and the cyan ring shows for keyboard focus | `:focus-within` on inputs and selects | 0.2s `steps(6)`, once per focus | Border colour only |
| Field error | Red border, the hint replaced by a specific message, and the label mistracks | Invalid submit; focus moves to the first invalid field; the hint returns as soon as the value is valid | Label `x` -4px, then 3px, then 0: 2 frames over 0.12s | Instant |
| Dialog: vertical hold | The dialog rolls up into place while a dark bar crosses it once; it leaves the same way, downward | "Hold a seat"; Close, Escape or a backdrop press | In: `y` 160px to 0 in 0.32s `steps(4)`, bar from bottom to top in 0.4s `steps(6)`. Out: 0.24s `steps(4)`, bar `steps(5)`. The backdrop is a cut. Lenis is stopped while it is open; focus returns to the button that opened it | Instant |
| Receipt feed | The paper strip slides out of the slot one line at a time | Valid submit; focus moves to "Your seat is held." | One 26px line per 0.06s, `steps(n)`; about 1.1s for the full strip | Instant |
| Fine-print target | The line a panel link points at turns warm white with a green marker | `:target` | Instant cut; Lenis scrolls to it | Instant, native jump |

## Adapting

1. **Check that screens belong to the subject.** The fringing, the scanlines and the static only make sense for a place or product that is about displays or late hours. If yours is not, use another pricing design.
2. **Put your table in the script.** `PRICE` holds the nine numbers by option and plan, `PLAN` the plan names, units and the "works out to" line, `BOOTH` the option names, the note under the control, and the seat-code letter and count. Keep the markup's first-option prices in step with `PRICE`, because they are what shows without JavaScript. Keep `data-text` equal to each price and plan name.
3. **Map the colours onto the tokens, keeping their jobs.** The refresh line and the hum edge are `color-mix()` of `--amber` and `--ink`, so they follow. `--amber` is prices and the primary action; `--green` is success, free seats and afterglow; `--pink` and `--cyan` are the ghosts; one tag hue per plan (`--tag` on each `.plan`). If you change a tag hue, recompute dark text on it at 84.6% brightness (mask plus hum bar) and keep it above 4.5:1.
4. **Copy.** The H2 is two lines at 104px; keep it under about 36 characters. A plan name fits about 14 characters at 40px. Prices fit six characters. Each panel takes three or four short list items; keep the three lists within a line of each other so the buttons align. The fine print takes four to six short paragraphs.
5. **Two plans or two options.** Remove a `.plan` or a `.seg` and change the grid's column count (`.plans`, `.segs`). Do not go above three of either.
6. **Retime or remove motion.** Durations are the `--d-*` tokens, read by both the CSS and the script. The split's strength and reach are `--split-max` and `--split-reach`, its decay `--half-split`. To remove the hum bar, delete `.hum` and `humAt`. To remove the refresh lines, delete the `.refresh` spans and `linesAt`; their speed is `--refresh-rate`. To show the fine print at once, delete `tuneIn`, its ScrollTriggers and the line that sets the items' opacity to 0. To remove the degauss, delete the `degauss()` call. To keep the tubes always on, delete the block that sets their off state and the ScrollTriggers. To remove the split, delete the `rgb` module; the `.rgb` rules can stay and do nothing.
7. **In a framework,** render the markup statically, keep the plain-JS flows (booth control, dialog, validation, receipt) as ordinary handlers, and port the motion layer as one effect that returns the `gsap.matchMedia` cleanup. The cleanup removes listeners, ticker callbacks and the built slices, destroys Lenis and clears every inline style.

| Token | Role |
|---|---|
| `--smoke` | Page ground; the dark ink on amber, warm-white, pink and violet fills |
| `--glass`, `--glass-hi` | Tube glass (panels, dialog surface); the lit face of an outline button |
| `--off` | A tube that is switched off; the printer slot |
| `--bezel` | Monitor bezel, dialog rim, fine-print markers (3.7:1 on smoke; not text) |
| `--ink` | Text (15.6:1 on smoke, 14.0:1 on glass); the chosen booth segment; the re-scan beam |
| `--dim` | Secondary text, field and segment outlines (10.1:1 on smoke, 9.0:1 on glass) |
| `--amber`, `--amber-hot` | Prices and the primary action (dark text 9.7:1); its lit state (12.8:1) |
| `--green` | Free seats, the confirmation, lit links and their afterimage, focused fields, the targeted fine-print marker |
| `--pink` | Colour ghost A; the night pack's tag (dark text 6.6:1) |
| `--cyan` | Colour ghost B; every focus ring |
| `--violet` | The 30-hour card's tag (dark text 6.8:1) |
| `--red` | Error text and error borders (6.2:1 on glass) |
| `--paper`, `--paper-dim` | Receipt paper and its secondary text (7.9:1) |
| `--burn` | The two-frame white block when a segment burns in |
| `--scrim` | Dialog backdrop and the roll bar |
| `--mask-a` | Scanline mask strength on the tubes (0.08, one pixel in four) |
| `--hum-a`, `--hum-edge`, `--hum-h`, `--hum-rate` | Hum bar darkness (0.08), its 1px leading edge (10% of `--ink`), height (120px) and travel per scrolled pixel (0.5) |
| `--line-1` ... `--line-4` | Refresh line under the text: three afterglow rows and the line, 3% to 18% of `--amber` |
| `--cap-1` ... `--cap-4`, `--cap-w` | The refresh line's bright ends in the tube's side padding, 15% to 90% of `--amber`, 12px wide |
| `--refresh-rate` | Refresh line travel down the tube per scrolled pixel (2) |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2` | Type scale: 14, 17, 21, 24, plan name 40, price clamp(72px, 28cqw, 124px), seat code 88, H2 clamp(46px, 7.2vw, 104px) |
| `--lh-body`, `--lh-lede` | Line heights: 1.55 for body, 1.45 for the lede |
| `--cell`, `--s1` ... `--s8` | The 8px cell and the spacing scale, 4 to 96 |
| `--notch`, `--step`, `--bz` | Button corner step (4px), monitor corner step (6px, two steps), bezel thickness (3px) |
| `--tap`, `--hit`, `--max-w` | Control height (48px), minimum link target (44px), content width (1296px) |
| `--d-*` | Durations for every effect (see the Motion table) |
| `--half-split`, `--split-max`, `--split-reach` | The split's decay half-life (0.14s), maximum offset (5px) and reach (360px) |
