---
title: Software-preservation archivist portfolio with a consolidating block map
section: portfolio
subject: "The portfolio of Odile Brandt, a fictional software-preservation archivist in Hamburg-Ottensen who has read 1,480 floppy disks, data cassettes and cartridge saves since 2017 for museums, game studios, schools and families, with recovery figures by collection, format and decade, her method, contact links and an enquiry form for a box of old media."
aesthetic: "An old computer case in the shade of a workshop. A sage-slate ground, off-white label text, pencil-grey rules, four outcome colours that only ever mean what came back from a medium, and one cyan-white for the drive head: the cursors, picks, focus and the primary button. Square blocks everywhere: the map, the chart bars, the pips, the Handjet numerals."
mode: dark
fonts:
  - "Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, at ELSH 2 and ELGR 1 so its modules are square: the H2 at 700, the legend counts and the step numbers at 700."
  - "Host Grotesk (Google Fonts, variable wght 300-800). Everything else: body at 400, labels, chips and buttons at 500 to 600, tabular figures in the readouts, tables, legend and form."
js: "Draws the block map in a canvas and consolidates it by outcome with a disk-optimiser swap plan scrubbed by scroll or run on demand, drives a read head for pointer, touch and keyboard, builds the stepped bar chart, tables and contact links from DATA and CONTACT, validates the enquiry form with checksum pips, and runs the load develop, link head, dialog magnification and parity check (nothing is sent)."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [portfolio, archivist, preservation, floppy, block-map, canvas, chart, scroll-scrub, pin, form, dialog, dark, gsap, lenis]
use_when:
  - A person or small studio whose work is a set of items with outcomes (repairs, cases, tests, deliveries) and who wants visitors to see how often it works.
  - The evidence is a few hundred records that can each be one square, so the whole body of work fits on one screen.
  - The page has to answer a practical question (will mine work, what will it cost) and end in an enquiry.
avoid_when:
  - There are only a handful of items; a map of eight blocks is decoration, not evidence.
  - Outcomes are not ranked or not mutually exclusive; the grouped map reads as a stacked bar only when every block has exactly one of a few outcomes.
  - Light, editorial or luxury brands; the slate ground and the pixel geometry are loud by design.
---

## Why it works

**The one bold idea: the portfolio is a disk optimiser.** Each of the four collections is a map of square blocks, one per medium, in rows of 40, in the order the media came out of the box. That order is a scatter of four outcome colours. Scrolling (or pressing "Grouped by outcome") runs a consolidation exactly as an old defragmenter drew it: a hollow cyan read cursor finds the next block of the outcome being gathered, a solid cyan write cursor marks where it goes, the two swap, and both step on. When it finishes, each outcome is one contiguous run and the map has become a stacked bar of what came back. The same data is shown twice, first as the honest mess of a real box and then as the answer to the visitor's question.

- **Deterministic and reversible.** Each collection's swap plan is computed once from its seeded "as received" order (`planSwaps`, at most one swap per medium; 356 swaps for the 397-medium museum donation). Scroll progress is the fraction of swaps applied. Scrolling forward applies the next swaps, and scrolling back applies the same swaps in reverse (a swap is its own inverse), so the map at a given scroll position is always the same. The order switch runs the same swaps on a linear tween of about 1.6s for the whole map, several swaps per frame, and its two buttons carry `aria-pressed` for the two end states.
- **Visible on an ordinary desktop.** The map is the first thing in the right column, above the fold at 1440x900, 1366x650 and 1280x600 (well top at 148px). At 1100px and wider with a window at least 560px tall, the section's top is pinned from the first pixel of scroll for 75% of the window height (the chart panel alone when the whole top is taller than the window), so the first scrolling consolidates the map while it stays still. On narrower screens nothing is pinned: the map scrubs between its top at 80% of the viewport and its bottom at 35% (clamped to the page), a range the visitor actually passes.
- **Colour has exactly one job per hue.** `--clean`, `--repaired`, `--partial` and `--unreadable` appear only on media with that outcome: map blocks, chart B segments, readout chips, legend swatches and table row marks. `--head` is the drive head and what you point at: the two cursors, the row marker, the picked block or segment, focus rings and the primary button. Errors are never red, because red means an unreadable disk: a form error is a hatched `--label` bar, a dashed border and a message.
- **Structure from the subject.** The read head lives in a left margin and jumps whole rows, as a drive head steps tracks. Underlines carry sector ticks every 6px, the spacing scale is built on the same 6px sector, buttons are disks with a metal shutter over a window and a drive light, and fields read their contents into four checksum pips. The success state checks parity.
- **Two charts with text alternatives.** Chart A has a live readout (label, format, year, outcome, what was recovered), a legend with the four counts in Handjet, a status line that says where the consolidation is, and a table of the collection by format and outcome. Chart B shows all 1,480 media as eight stepped bars of 50 blocks each (2% a block, largest-remainder rounding), one per format and decade; any segment can be picked, the readout says the share in words, and a table gives every count and percentage.
- **The copy answers the visitor's question.** The lede puts the headline figure in words (four in five came back with every file, fewer than one in twelve gave up nothing), and every number on the page comes from `DATA` and adds up: the chart B totals are 832 clean, 363 repaired, 167 partial and 118 unreadable, which is 1,480.
- **Semantics.** The section is a `<section>` labelled by its `h2` (the first heading; the host page owns the `h1`). Charts and blocks are labelled regions, chips are real radios and checkboxes covering the whole chip, the steps are an `ol`, the method is a native `<dialog>` with its own `h2`, and the tables are behind `<details>` disclosures.
- **Different from the nearest designs in the ledger.** `crud-memory-card` also has blocks, but they are a fixed 15-slot card whose saves you inspect; here hundreds of blocks are data that sorts itself. `features-cyberdeck-kit` scrubs a falling-block assembly; here scroll drives swaps between existing blocks, with two cursors and no falling. `portfolio-isometric-artist` builds towers per year; this map stays flat and reorders.

Deviations from the brief, and why:

- **The pinned element depends on the window.** The brief allowed a short pin on desktop. The whole top (headline and map) is held when it fits the window, as at 1440x900. On shorter windows (1366x650, 1280x600) only the chart panel is held, so the map does not move while it consolidates and nothing is cut by a pinned block taller than the window.
- **The load's first cut is an empty well.** Until fonts are ready (at most 1.5s) the 400 slots show as empty cells; then the map cuts to hollow blocks, and the four outcomes fill in 0.3s apart. It is still four colour cuts, and nothing returns to an earlier state, so nothing flashes.
- **The shutter window is a third of the face** (a `2fr 1fr` grid), and the plate leaves through the window's right edge, clipped, rather than sliding over the label.

## Do not touch

- **One block per medium, rows of 40, 400 slots.** The map always draws ten rows, so a small collection shows as empty cells; that is the truth about the box size. Changing `COLS` changes every row in the readout's keyboard model too (Home, End, Up and Down).
- **The swap plan is the animation.** Do not tween block positions. The map only ever shows whole states, after `k` swaps, and the cursors are the last swap's two positions. Scroll and the switch both call `map.setK`; any other way of reordering breaks reversibility.
- **Outcome hues mean outcomes.** Never use them for chips, focus, errors or decoration. Filtered-out formats are drawn hollow in their own hue, the pre-load hollow is `--pencil`, so the two never read the same.
- **`--head` is the only colour that answers the visitor.** Cursors, the row marker, picks, focus and the primary button share it on purpose. Do not add a second accent.
- **Clip-path lives on inner spans** (`.b-face`, `.b-in`, the well's `::before`, the dialog's rim), never on a focusable element, so focus outlines are never clipped.
- **Hidden states.** The only hidden state is the success panel's text during the 0.6s parity check (opacity, so the focused heading still announces). Without the libraries, or with reduced motion, every flow works in plain JavaScript and every state is final at once.
- **Press minimums.** A button stays pushed for at least `--d-hold` (0.14s) from `pointerdown`, Enter or Space; a tapped link holds its parked head for `--d-touch-link` (0.25s).

## Motion

House stepping: hard cuts on a visible clock, `steps()` in CSS and `gsap.set` or `delayedCall` in the script. The only continuous tween is the order switch's swap counter (`ease: 'none'`), and it is drawn in whole swaps. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer, and `pin`: min-width 1100px and min-height 560px). Lenis runs on `gsap.ticker` with `autoRaf: false`, `lagSmoothing(0)` and `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling. The develop waits for fonts (Handjet 700, with a 1.5s timeout) and for a visible page. There are no loops: the canvas is redrawn only when its state changes. Only transform, opacity and canvas pixels animate; colour changes are instant.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Outcomes develop | Canvas state cuts | Load (fonts ready, page visible) | Empty well until then; hollow `--pencil` blocks at 0s, then clean, repaired, partial and unreadable fill in at 0.3s, 0.6s, 0.9s, 1.2s (`--d-develop`) | Filled at once |
| Consolidation by scroll (signature) | Swap plan applied k = progress x swaps; ScrollTrigger scrub | Scroll. Wide and tall enough: pin the top (or the panel) from scroll 0 for 75% of the window height. Otherwise: map well from `clamp(top 80%)` to `clamp(bottom 35%)` | Whole-block hard cuts; read cursor (hollow, 3px on cells of 14px and up) and write cursor (solid) on the last swap; the row marker follows the write cursor | No scroll link; the switch jumps |
| Consolidation on demand | Linear tween of the swap counter | "As received" / "Grouped by outcome" (click, Enter, Space) | 1.6s for the whole map (`--d-consolidate`), scaled by the swaps left; several swaps per frame; scroll takes over again on its next update | Instant |
| Read head | Canvas redraw | Pointer move over the map (mouse, pen) | The row marker in the left margin jumps to the row; a 3px `--head` outline with a well ring surrounds the block; the readout names the medium. Click toggles keep. Touch: a tap keeps or releases. Keyboard: the map is one focusable `role="application"`; arrows move block by block, Home and End along the row, Escape lets go; the readout is `aria-live` | Same, instant |
| Chart B pick | Hard state | Hover previews; click or tap keeps; arrows, Home, End move a roving tabindex | 2px `--head` frame around the segment; readout in words | Same |
| Button hover, the shutter | CSS transform | Hover, focus-visible, and press on touch | The `--pencil` plate slides off the window in three steps, `steps(3, end)` over 0.15s (`--d-shutter`), uncovering the glyph window (primary: a `--head` glyph on the well; outline buttons: a well glyph on `--head`) | Instant |
| Button press, pushed into the drive | Class from pointerdown and keydown | Pointer, Enter, Space | Whole button 4px right (`--push`), the 8px drive light turns `--head`, held at least 0.14s (`--d-hold`) | Same (a state, not motion) |
| Text link, the head parks | `--hx` set by delayed calls | Hover, focus-visible; touch press holds 0.25s | A 6px head block jumps along the 6px ticks, eight jumps or fewer at 0.03s each (`--d-tick`), landing on ticks, and parks at the right end while hovered | Parked at once |
| Field, checksum pips | Plain JS, per keystroke | input, change | Four 8px pips cut to the 4-bit checksum of the value; on blur, a valid value keeps them, an invalid one shows the hatched bar, the dashed border and the message on the reserved two-line row | Same |
| Dialog, magnified | `gsap.set` scale frames | "Read the six checks every medium gets"; Close, Escape, backdrop | 25%, 50%, 100% from the centre, 0.06s each (`--d-zoom`); leaves through 50% and out. Lenis stopped while open; `settle()` handles a forced close | Instant |
| Success, parity | Class toggles | Valid submit | Eight pips: seven checksum bits of name and email, then the parity pip toggles at 0.2s and 0.4s (`--d-parity`) and settles even; at 0.6s "Logged. Checksum OK." and the echo cut in; reference "OB-" plus the byte in hex. "Write another" resets | Final at once |

## Adapting

1. **Find your items and outcomes.** Anything with a few hundred items and three to five ranked, exclusive outcomes works: repairs, tests, shipments, cases. Rename the outcomes in `DATA.outcomes` and the four hue tokens, keeping one hue per outcome and nothing else.
2. **Replace `DATA`.** Each collection lists counts per format as `[clean, repaired, partial, unreadable]`, a year range, label names and a seed. Media, labels, recovered text and the as-received order are generated from the seed, so the page is the same on every visit. Chart B reads `DATA.decades`; the self-test checks that it totals what the lede says.
3. **Replace `CONTACT`.** Delete a line to remove a link. Known keys: `email`, `whatsapp`, `github`, `mastodon` (handle or URL), `instagram`, `itch`. Any other key with a full URL becomes a link named by the key.
4. **Map the colours onto the tokens, keeping their jobs.** `--case` and its two tones are the ground, `--label` is text, `--pencil` is secondary text and rules, `--head` is the only colour that answers the visitor. Keep every outcome hue above 4.5:1 on the ground, because the chips put the well's dark ink on them.
5. **Retime or remove motion.** Every duration is a `--d-*` token. To drop the pin, remove the `pin` condition; the map still scrubs. To drop the scroll link entirely, delete the ScrollTrigger and keep the switch.
6. **In a framework,** keep the map as one canvas component with `setK`, and port the motion branch as one effect that returns the `gsap.matchMedia` cleanup.

| Token | Role |
|---|---|
| `--case`, `--case-deep`, `--case-lift` | Ground; the well, fields, scrim and dark ink; empty cells and unlit drive lights |
| `--label` | Text, lit pips, the hatched error bar (10.73:1 on case) |
| `--pencil` | Secondary text, rules, field borders, hollow pips, the shutter plate (6.44:1) |
| `--clean`, `--repaired`, `--partial`, `--unreadable` | The four outcomes only (8.52, 9.18, 6.18, 5.34:1 on case) |
| `--head` | Cursors, row marker, picks, focus, the primary button (9.91:1) |
| `--scrim` | Dialog backdrop, the well at 90% |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk |
| `--t-small` ... `--t-h2`, `--lh-*` | Type scale 14, 17, 20, 26, 34 (numerals), clamp(44px, 5.4vw, 84px); line heights |
| `--cell`, `--s1` ... `--s8`, `--gutter`, `--max-w` | The 6px sector and the spacing built on it; side gutter; content width 1296px |
| `--notch`, `--tap`, `--hit`, `--led`, `--push`, `--blk` | Stepped corner, control height 48, minimum target 44, drive light 8, press travel 4, one chart B block (set in whole pixels by the script) |
| `--d-*` | develop .3s, consolidate 1.6s, shutter .15s, hold .14s, tick .03s, touch-link .25s, zoom .06s, parity .2s |
