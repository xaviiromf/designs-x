---
title: Cyberdeck kit features that assemble on scroll
section: features
subject: Moth-1, an open-hardware cyberdeck kit (a pocket Linux computer you solder yourself) by Dusklight Labs, a two-person workshop in Tallinn, sold as six modules for EUR 289 with a reservation form.
aesthetic: A solder-masked circuit board seen through a falling-block game. Solder-mask green ground, a seeded network of copper traces, silkscreen-white text, gold for everything you touch, and five module hues that appear only as pixel blocks, chips and LEDs.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, set at ELSH 2 and ELGR 1 so the modules are square. Used for the H2 at 700, the well's status line and the deck's display at 600, and the build numbers in the chips at 700.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything you read, at 400 for body, 600 for buttons, h3, chips and dl terms, tabular-nums for specs, facts and the bill of materials.
js: Draws a seeded PCB trace tile and a 12 by 16 block well on canvas, drops one module block per feature into the well as the page scrolls, sends gold pulses along the traces away from the pointer, touch or keyboard focus, and runs the LED self-test, keycap and switch states, the unfolding bill-of-materials dialog and the in-place reservation (nothing is sent).
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [features, hardware, kit, open-hardware, canvas, scroll, pinned, falling-blocks, pcb, pointer, dialog, form, dark, arcade-series, gsap, lenis]
use_when:
  - A product made of a small number of physical or logical modules (four to eight) that go together in a fixed order, where the order is itself worth showing.
  - Hardware, kits, electronics, modular tools or developer products whose audience enjoys a retro game or circuit-board vernacular.
  - A features section that must end in one concrete ask (reserve, pre-order, join a batch) with a short form.
avoid_when:
  - The features have no order and no parts. The well would then stack blocks that mean nothing.
  - More than eight features, or features that need a paragraph each. The pinned well holds attention for about six short steps.
  - Light, calm or editorial brands, and pages that already run a canvas or pointer effect nearby.
---

## Why it works

**The one bold idea: the deck assembles itself as you read.** A well of 12 by 16 square cells is pinned beside the features. Each of the six modules is a coloured pixel block. During its feature's share of the scroll, the block falls from the top of the well in whole-cell steps, shifts or turns once on the way, and locks with a 2-frame flash; its status LED turns on. When the sixth block locks, every complete row flashes once and the screen block shows "moth-1 ready". Scrolling back lifts the blocks out again. The finished stack is the deck's own silhouette: battery sled at the bottom, carrier board and the hollow expansion bay above it, the keyboard slab, the wide screen, and the radio's antenna standing above the top edge.

- **The order is true.** The six features are listed in build order, from the battery sled up to the antenna, because blocks in a well can only land on what is already there. The page says so in one line under the buttons, and the chips carry the build numbers. Numbered markers are allowed here because the content is a real sequence.
- **The well is a circuit board too.** Before a block arrives, its place is marked by a thin outline, the way a board's silkscreen marks where each part goes. So the empty well already shows what will be built, and each block lands in a drawn footprint.
- **Six original shapes, sized to their modules.** The screen is a 10 by 3 bar with one stepped corner (close to the panel's 1280 by 400 proportion), the keyboard a 10 by 4 slab with a notch, the battery a low sled with a raised charge board, the carrier a block with a tab, the bay an L, the radio a base with a three-cell mast. None is a piece from an existing game; all are larger than four cells. The bay is drawn hollow, in silkscreen white, because it is empty space.
- **Colour has jobs.** Solder-mask green (`--mask`) is the ground, a chosen dark and not a tinted black. Trace green (`--trace`, 1.5:1) is only the copper network and is decorative. Silkscreen white is text. **Gold is what you touch**: the primary keycap, the slide-switch knob, the pads of a focused field, the focus ring and the pulses a visitor causes. The five module hues (amber battery, cyan carrier, lime keyboard, violet screen, magenta radio) appear only on that module's block, chip and LED. Lime doubles as "on": a DIP switch at ON, a closed jumper, and all six LEDs after a reservation. Coral is for errors only.
- **The background answers the visitor without lighting under the pointer.** The board behind everything is a seeded network of traces on the 12px grid (orthogonal and 45-degree runs, T junctions, a square via at each end). Moving the pointer injects a gold pulse at a nearby via, and the pulse travels along the wires, away from the pointer and toward the well at junctions. Nothing glows at the pointer itself. Tapping or dragging on a touch screen and focusing a control with the keyboard do the same.
- **Every control is a part from the kit.** Buttons are keycaps with a skirt and real travel. Text actions carry a DIP switch. The email field has four corner pads that tin clockwise. The checkbox is a jumper cap that moves onto its two pins. The switch-type radios are the three positions of one slide switch. The bill of materials unfolds like a ribbon cable.
- **The ask stays next to the deck.** On desktop the well stays pinned through the facts and the form, so the finished deck sits beside the price. On a valid reservation the deck's display shows "kit #0412 reserved" and all six LEDs turn lime; the same fact is real text in the confirmation.
- **No dead ends.** "Reserve a kit" is an anchor to the form. Both bill-of-materials controls open the same native dialog, which closes with Close, Escape or a backdrop click and returns focus to the control that opened it. The form validates in place with a specific message, and the confirmation has "Change this reservation", which brings the form back with its values and focus in the email field. There are no external links.
- **Semantics.** The section's `h2` is the first heading (the host page owns `h1`). The features are an ordered list of `h3` items; the well and its status line are `aria-hidden` because the list is their text alternative. The bill of materials is a real table with row and column headers.

**Arcade series.** This design belongs to the arcade series, which shares Handjet and Host Grotesk with cta-indie-game on purpose, at the owner's request, along with the dark chosen ground, the cell-driven spacing, stepped pixel corners and stepped motion. It differs from cta-indie-game in every effect and in palette: cta-indie-game has a navy ground with two accents and a cell lattice that lights under the pointer; this one has a green board, seven hues with stated jobs, a trace graph where light only travels along wires, and a scroll-built object in place of a rising wordmark. None of cta-indie-game's effects is reused.

New to the collection: the scrubbed falling-block assembly; pulses that walk a trace graph away from the pointer; the LED self-test with a word-by-word key press of the headline; keycap buttons with skirt LEDs, key travel and a one-frame overshoot; the DIP-switch link marker; corner pads that tin clockwise; the jumper checkbox; the slide-switch radio group; the dialog that unfolds in five stepped folds.

Deviations from the brief, and why:

- **The features run bottom-up (battery first, radio last),** not in the order the modules were listed. A falling block has to land on something, and the screen cannot hang in mid-air until the keyboard arrives.
- **The well is a CSS-sticky element, not a ScrollTrigger pin.** Sticky needs no spacer, cannot jump on refresh, and gives phones the same behaviour as desktop. ScrollTrigger only reads progress.
- **The static board is a repeating tile set as a CSS background,** painted once on a canvas (1152px square, 768px on phones), and a separate viewport-sized canvas draws only the pulses. One canvas the height of the section would be about 7000px tall, and redrawing a viewport canvas on every scroll frame lags behind native touch scrolling.
- **The dialog's ribbon is a separate layer.** The stepped `scaleY` is applied to the panel behind the text, and each row cuts in when its fold has opened, so the text is never squashed.

## Do not touch

- **`MAP` is the deck.** The sixteen strings in the script define every block's cells and the silhouette. If you change a shape, check that each block can still fall to its place past the blocks before it, and adjust its `move` entry. Rows with no "." are the complete rows that flash.
- **Blocks move in whole cells and change state in hard cuts.** No easing between cells, no fade on the lock flash, no fade on the chip. The stepped motion is what makes the page read as a machine with a frame rate.
- **Only the current feature's chip is filled** while the assembly runs. Do not dim the other features; they stay fully readable.
- **Nothing lights under the pointer.** Pulses start at a via at least a cell and a half away and are steered away from the pointer. Do not add a glow, a halo or lit cells at the cursor: that is the reference design's effect, and the collection already has several.
- **Trace green stays decorative (1.5:1).** Do not raise its contrast; body text sits on top of the network.
- **Gold means "you can touch this" and lime means "on".** Do not use gold for decoration or lime for a second accent.
- **One cell for the board.** `--cell` sets the trace grid, and the tile and the pulse canvas both read it, so pulses sit exactly on the painted traces. The section must keep `background-position: 0 0` and no border.
- **Stepped corners live on `.key-face` and `.key-skirt`, never on the `<a>` or `<button>`,** so the focus outline is not clipped. The skirt starts 6px down, so a pressed face uncovers board above it.
- **Hidden states exist only under `html.js:not(.go)`** and cover only the lede, the buttons and the hint. The headline is never hidden. If the CDN is blocked, the `js` class is never added, everything shows, the well draws the finished deck, and the form and dialog work in plain JavaScript.
- **The plain-JS part of the script comes first** (board tile, well, form, dialog), then `if (!lib) return`, then the motion layer inside `gsap.matchMedia`.
- **Accessibility.** The canvases, LEDs, status line and deck display are `aria-hidden`. The form uses `novalidate` with its own messages, `aria-invalid` and `aria-describedby`; the error line is reserved so nothing shifts; focus moves to the field on error and to the confirmation heading on success. Radios and the checkbox are native inputs laid invisibly over their drawn switches, so they keep keyboard behaviour (arrow keys move the slide switch, Space sets the jumper). Every target is at least 44px. Lenis is stopped while the dialog is open.

## Motion

House easing: there is almost none. Movement is `steps(n)` or a hard cut; a "frame" is about 33ms on screen, and the well's own frame (`--d-frame`) is 50ms. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer, width 900). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, with `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling. The load sequence waits for the fonts (`document.fonts.ready` plus a Handjet load, 1.5s timeout) and for a visible tab. Only transform, opacity, clip-path and canvas pixels animate; colour changes are instant.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Self-test | Six status LEDs switch on in sequence, then blink twice together, then show what the well really holds (class toggles from a timeline, no tween) | Load (fonts ready, tab visible) | One LED per 90ms; two off/on blinks at 90ms each; about 1.0s in all | LEDs show the finished deck |
| Key roll | Each headline word is wrapped in a span and pressed like a key: down 3px, back 2 frames later. The text is visible throughout; nothing is typed or revealed | After the self-test | Words 40ms apart, each down for 66ms | None |
| The rest cuts in | Lede, buttons and hint switch from `visibility: hidden` to visible in one cut | As the last word comes back up | Instant | Visible from the start |
| Falling-block assembly (signature) | ScrollTrigger scrub over the features list, read as progress only; the well is CSS sticky. For feature i, the first 70% of its height maps to the block's path states (enter with one row showing, one whole cell per state, one shift or quarter turn, land); the last 30% holds it locked. Drawn as flat cells on a canvas | Scroll: a feature's top crossing 72% of the viewport height (84% on phones, under the bar) | 6 to 17 states per block, so 25 to 60px of scroll per cell step | No pin; finished deck; features in a plain grid |
| Lock flash | The landed block is drawn silkscreen white for one frame and half white for one frame, then its hue; its LED turns on and the status line counts up | A block reaching its lock point while scrolling forward | 2 frames of 50ms | None |
| Current feature | The chip of the feature in play fills with its module hue; the others are outlines | Same progress | Hard cut | All chips filled |
| Rows and prompt | Every complete row of the well flashes once (white, half white), then the screen block's display cuts in with "moth-1 ready" | The sixth block locking; again on a valid reservation | 2 frames of 50ms, then a cut | Display on from the start |
| Lifting out | The same mapping in reverse: blocks rise out of the well, LEDs go off, the display goes dark | Scrolling back | Scrubbed | None |
| Trace pulses | A pulse is injected at a via near the pointer (at least 1.5 cells away, on a trace that leads away) and walks the trace graph one cell per step, choosing the branch nearer the well at T junctions, for 20 to 40 cells or to the trace's end. Six cells are lit in four hard gold levels with a square head; a via it reaches turns gold. Drawn on a viewport-sized sticky canvas over the painted board | pointermove (fine pointers), one pulse per two cells of travel and at most one per 40ms | 20 cells a second; at most 24 alive; the canvas sleeps when none is alive or the section is off screen | Static board only |
| Touch pulses | The same injection | touchstart (always), touchmove (throttled as above) | As above | Static board only |
| Keyboard pulses | One pulse from the via nearest the control's left edge, heading away from the control | focusin with `:focus-visible` | As above | Off |
| Keycap LED chase | Eight LEDs along the skirt; a lit copy of the row is shown one LED at a time with `clip-path` in `steps(8, jump-none)` | Hover, `:focus-visible`; on touch one pass from pointerdown | 0.48s per pass, looping while hovered or focused | All eight lit, no chase |
| Key travel | The face moves 4px down over the skirt, `transform` in `steps(2)` | `:active`; pointerdown on touch (class `is-down`) | 50ms | Instant |
| Key release | The face returns with a one-frame overshoot: 1px above rest, then rest (keyframes with a hard cut) | pointerup, pointerleave, pointercancel | 70ms | Instant |
| DIP switch | A 12 by 20px switch before the text; its slider jumps to ON in `steps(2)` and turns lime, and returns on leave | Hover, `:focus-visible`; `:active` or pointerdown on touch | 60ms | Instant |
| Pad tinning | Four corner pads turn gold one after another clockwise (opacity cuts with stepped delays) and the border turns gold | Field focus | 4 pads at 50ms, 0.2s in all | All four at once |
| Cold joint | Border and pads turn coral, a specific message appears on the reserved line, focus returns to the field; cleared as soon as the address is valid | Invalid submit | Instant | Same |
| Jumper | The cap, parked on one pin, moves 14px to bridge both pins in `steps(2)` and turns lime | Checkbox change (click, tap, Space) | 60ms | Instant |
| Slide switch | The gold knob jumps to the chosen third of the track; no transition | Radio change (click, tap, arrow keys) | Instant | Same |
| Ribbon unfold | The dialog's panel layer scales from its top edge, `scaleY` 0 to 1 in `steps(5)`; each row cuts in when the fold that holds it has opened. Lenis is stopped | "See what's in the box", "See the full bill of materials" | 0.3s, one fold per 60ms | Instant |
| Ribbon fold | The reverse: rows cut out fold by fold, the panel scales back to 0, then the dialog closes and focus returns to the opener | Close, Escape, backdrop click | 0.3s | Instant |
| Reservation | The form is replaced by the confirmation in one cut; the rows flash, the deck's display shows "kit #0412 reserved", six LEDs and the status line turn lime; focus moves to the confirmation heading | Valid submit | Cut, then 2 frames of 50ms | Cut, no flash |
| Back to the form | The confirmation is replaced by the form, values kept, focus in the email field; display and LEDs return | "Change this reservation" | Instant | Same |

## Adapting

1. **Decide the modules and their order first.** You need four to eight parts that stack. Draw the finished object in `MAP`, one letter per part, 12 columns by 16 rows, with the first part at the bottom. Keep at least a few rows complete across the well so the final flash has something to show.
2. **List the parts in `P` in stacking order.** Each entry has its letter, its hue token, its status-line name, and a `move`: `['shift', columns, row]` (starts that many columns off and shifts at that row) or `['turn', column, row, rowAfter]` (enters lying on its side at that column, turns at that row, continues from `rowAfter`). A part that fills the well's full width cannot shift; keep parts to 11 columns or fewer. Add `hollow: true` for a part that is empty space.
3. **Match the markup to `P`.** One `li.feat` per part, in the same order, with `--hue` set to the same token, and one `.led` per part. The feature text is an `h3`, two sentences and one spec line; longer copy needs a taller `min-height` on `html.fx .feat` so each block still has room to fall.
4. **Map the colours onto the tokens, keeping their jobs.** `--mask` is the ground and `--trace` must stay near 1.5:1 against it. `--gold` is the single interactive colour. Give each part one hue with at least 4.5:1 on `--mask` (the chip's outline state sets text in the hue) and at least 4.5:1 for `--mask` text on the hue (the filled chip). Rebuild `--pulse-1` to `--pulse-4` from the new `--gold` at alpha 0.95, 0.6, 0.34 and 0.16.
5. **Change the board.** The seed (`0x4D4F5448`) fixes the network; any other integer gives another board. Density is the trace count (150) in the generator loop, and the tile is 96 cells square. The trace cell is `--cell` (12px, 8px on phones).
6. **Change the display text.** The prompt and the confirmation strings are in `paint()` (long form for desktop, short form for the phone bar), and the kit number is also in the confirmation markup.
7. **Retime or remove motion.** Durations are the `--d-*` tokens. `LOCK` (0.7) is the share of a feature's scroll spent falling. The reading line is the `72` / `84` in the ScrollTrigger `start` and `end`. To drop the pulses, delete the "Pointer" block and the `.pulses` canvas; the painted board stays. To drop the assembly, do not add the `fx` class: the page then uses the reduced-motion layout with the finished deck.
8. **In a framework,** render the markup statically, run the plain-JS part (board tile, well, form, dialog) in one effect, and the motion layer in a second effect that returns the `gsap.matchMedia` revert. The cleanup removes listeners and observers, kills the timeline and delayed calls, destroys Lenis, removes the `fx` class and redraws the finished deck.

| Token | Role |
|---|---|
| `--mask` | Page ground (solder mask); text on gold, pale and hue fills |
| `--well` | The well, field grounds, the deck's display, switch housings |
| `--panel` | The dialog's ribbon (silk on it 12.4:1) |
| `--trace` | The PCB trace network and the ribbon's stripes; decorative, 1.50:1 |
| `--land` | Footprint outlines in the well, well walls, resting pads, unlit status LEDs, table rules; decorative, 2.35:1 |
| `--silk` | Text (13.9:1), the hollow expansion bay block and its LED |
| `--mute` | Secondary text (9.0:1), field and switch borders, the pale keycap face |
| `--mute-deep`, `--mute-led` | The pale keycap's skirt and its unlit LEDs |
| `--gold` | What you touch: primary keycap (mask text 8.3:1), slide knob, focused pads and border, focus ring, pulses, jumper pins |
| `--gold-deep`, `--gold-led` | The gold keycap's skirt and its unlit LEDs |
| `--amber`, `--cyan`, `--lime`, `--violet`, `--magenta` | One module each: battery (7.3:1), carrier (9.8:1), keyboard (12.6:1), screen (5.6:1), radio (5.0:1). Lime is also every "on" state and the success LEDs |
| `--coral` | Errors only (5.4:1) |
| `--pulse-1` ... `--pulse-4` | The four hard levels of a pulse, head to tail (`rgb()` of gold with alpha) |
| `--flash` | Second frame of a lock or row flash |
| `--scrim` | Dialog backdrop |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2`, `--t-stat` | Type scale: 13, 17, 22.5, 30, clamp(48px, 6.6vw, 96px), and the 22px status line. Under 600px: body 16, lede 18, h3 22.5, status 20 |
| `--lh-body`, `--lh-lede` | Line heights: 1.55 and 1.45 |
| `--cell` | The board grid: 12px, 8px under 600px |
| `--wc` | One cell of the well, set per layout: up to 34px on desktop (limited by viewport height), 12px or 9px in the phone bar, up to 22px in the static narrow layout |
| `--s1` ... `--s8` | Spacing, 6 to 144, in half and whole cells |
| `--notch`, `--skirt`, `--travel` | Keycap geometry: 4px stepped corner, 6px skirt, 4px travel |
| `--tap`, `--hit`, `--max-w` | Keycap and field height (48px), minimum target (44px), content width (1296px) |
| `--d-key`, `--d-up`, `--d-chase` | Key travel (50ms), release overshoot (70ms), LED chase (0.48s) |
| `--d-dip`, `--d-pad`, `--d-fold` | DIP slider and jumper (60ms), one corner pad (50ms), ribbon unfold (0.3s) |
| `--d-led`, `--d-word`, `--d-press`, `--d-frame` | Self-test LED (90ms), gap between pressed words (40ms), how long a word stays down (66ms), one well frame and one pulse step (50ms) |
