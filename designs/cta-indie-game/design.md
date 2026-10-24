---
title: Indie game wishlist and demo call to action
section: cta
subject: Noctiluca, a night-harbour puzzle game by Lowwater, a two-person studio in Hobart, asking players to wishlist it on Steam and play the free demo (Bay One) tonight, with a launch-day email as the fallback.
aesthetic: A harbour at night drawn as the game's own tile grid. Deep harbour-navy water, plankton-blue light that exists only where something moves, one boat-lamp yellow for the wishlist button, and a display face whose letters are built from square modules, like the board's cells.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, set at ELSH 2 and ELGR 1 so the modules are square. Used for the H2 at 700 and as the source for the cell wordmark at 800.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything else: 400 for body, 600 for buttons, h3 and dl terms, tabular-nums for the demo facts and store sizes.
js: Draws a canvas field of 12px cells that lights in a decaying square wake under the pointer, a finger, scrolling and keyboard focus. It builds the NOCTILUCA wordmark from the same cells and sweeps light across it once. It also runs the load sequence, the button, link and row micro-interactions and the demo dialog, and it turns the launch-email form into an in-place confirmation with a way back. Nothing is sent anywhere.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [cta, game, indie, wishlist, demo, canvas, grid, pointer, dialog, form, dark, gsap, lenis]
use_when:
  - A game, app or tool whose core mechanic can be shown as a field that responds to the visitor (light, ink, sound, growth), and the page has one or two concrete asks.
  - Asking for a wishlist, pre-order or waitlist, with a free trial or demo as the second step and an email as the fallback.
  - The brand has a grid or pixel world (tiles, boards, cells, LEDs) that can carry both the layout and the type.
avoid_when:
  - The product has no interaction to stand in for. Then the cell field is decoration and should go.
  - Light, warm or editorial brands. The navy ground and pixel display face are loud by design.
  - Pages that already run a cursor or canvas effect nearby. Two pointer fields fight each other.
---

## Why it works

**The one bold idea: the page is the game.** In Noctiluca the harbour lights only where something moves, because *Noctiluca scintillans* glows when it is disturbed. The section does the same thing. A field of 12px cells (8px on phones) sits behind everything, and it lights in a square, Chebyshev-distance wake wherever the water is disturbed: by the pointer, by a finger, by scrolling, by keyboard focus and by submitting the form. The light decays in four colour steps with a half-life of 0.15s. At the bottom, the name NOCTILUCA is drawn in the same cells. It rests at a dim glow and holds the light three times longer than open water, so the name appears behind your hand. Everything else on the page supports this.

- **The load teaches the mechanic.** A virtual boat crosses the first screen as the copy arrives and leaves a wake. Before reading anything, the visitor has seen what the hint says: move through the water to light it.
- **The name is hidden in the water until something moves.** The wordmark does not rise or bleed at the sides (footer-architecture-biennale owns that move). It sits still inside the side gutters, and the section edge crops its bottom stroke. When the band is 60% in view, one sweep crosses it once, so every visitor sees the name lit at least once. After that, only the visitor lights it.
- **Colour has a meaning.** The ground is a chosen harbour navy (#0A1C26), not a tinted black, and it is never a black with one accent (default 2). Plankton blue (`--spark`) appears only as light the visitor causes: lit cells, focus rings, hover fills and the ticked box. Lamp yellow (`--lamp`) is the boats' lamps, the thing you bring home, and it appears only on the Wishlist button. The two never mix: the Wishlist hover is lamp light (#FFE3A8), not spark. Bloom red is for errors only.
- **The structure is the board.** Every spacing step is a whole or half cell, the side edge and the tray start on cell lines, and the CSS grid lines (visible without JavaScript) have their origin at the section origin, so the canvas cells sit exactly inside them. Buttons are tiles with stepped pixel corners. Hover fills grow as squares from the entry point, the board's own geometry, and focus lights a square halo of cells around the control.
- **Type built from modules.** Handjet's letters are made of modules. At ELSH 2 and ELGR 1 the modules are square, so the H2 reads as tiles on the same board (round modules would read as the Doto dot-matrix already used in faq-esports-arena and team-restaurant-kitchen). The wordmark is sampled from Handjet 800 into cells letter by letter. Each letter's ink is snapped to whole cells, with at least one empty column between letters, and the cap height falls on whole rows. On phones the name stacks as NOCTI / LUCA (night / light, the word's Latin roots), so it stays legible at 8px cells. Host Grotesk is a calm grotesque for everything you read, and its tabular figures are true (1111 and 0000 both measure 44.2px at 17px).
- **Two asks, in order.** Wishlist is the yellow button. The demo is the outline button, and it opens a dialog with the two stores, their platforms and their download sizes. The launch email is the fallback, in the tray beside the demo facts. The facts are a plain definition list in body size, not a stat block (default 6).
- **No dead ends.** All three external links open in a new tab with `rel="noopener"` and a visually hidden "(opens in a new tab)". The form validates in place, explains the fix, and moves focus to the field. The confirmation names the address and the playtest choice, and "Use a different email" brings the form back with the address kept and focus in the field. The dialog closes with Close, Escape or a backdrop click, and focus returns to the button that opened it.

Deviations from the approved plan, and why:

- **The wordmark crop is about 5%, not 15%.** The section edge cuts through the letters' bottom stroke. A 15% crop removed the feet of I, L and U, and the name read NOCTIIIICA. The crop rule is `Math.max(.5, round(cap / 12) - 1)` rows, because Handjet caps are 12 modules tall.
- **The tray has no opaque ground.** The opaque ground only existed to keep the grain off the form, and the grain is gone. Without it, the grid runs through the tray, and the success burst lights the water around the confirmation.
- **The keyboard burst is a halo around the control, not a square at its centre.** A centre burst hid behind opaque buttons and showed only as slivers. Text fields get their cell strip instead.
- **Removed accessory: the magnetic pull on the Wishlist button.** The pointer wake already follows the hand. A second pointer-following effect on the same spot competed with the signature and said nothing new.

## Do not touch

- **One cell for everything.** `--cell` drives the CSS grid lines, the canvas cells, the spacing scale and the gutter rounding. The canvas reads it at build time. If you change it in one place only, the light no longer sits inside the lines.
- **The grid origin is the section origin.** The `repeating-linear-gradient` starts at the section's top-left, and the canvas covers the section exactly. Do not add padding or borders to `.cta` that would shift either one.
- **`--glow-1` to `--glow-4` are `rgba()` strings**, because the canvas sets them as `fillStyle`. Keep four steps, and keep `--spark` at their core.
- **Pixel corners live on `.face` and `.inner`, never on the `<a>` or `<button>`,** so focus outlines are never clipped. The outline buttons use a kelp `.face` with a 2px padding and a night `.inner`, with the same notch, so the stepped border stays 2px all round.
- **Light only where something moved.** The loop is added to `gsap.ticker` only while some cell is above its floor, and it sleeps off screen (IntersectionObserver). There is no ambient loop. Do not add one.
- **Hidden states exist only under `html.js:not(.go)`,** and the script replaces them with inline states in the same task, before it adds `.go`. If the CDN is blocked, the `js` class is never added and everything shows, and the form and dialog still work in plain JavaScript.
- **Accessibility.** The canvas is `aria-hidden`, and the wordmark has an `aria-hidden` text fallback in `--pool` that turns transparent once the cells are drawn. The form uses `novalidate` with its own messages, `aria-invalid` and `aria-describedby`, and focus moves to the field. The error line is reserved, so nothing shifts. The confirmation heading takes focus (`tabindex="-1"`). The dialog is a native `showModal()`, and Lenis is stopped while it is open. Every target is at least 44px, and nothing is hover-only.

## Motion

House easing: `expo.out` for entrances, `expo.inOut` for rules, `power3.out` / `power3.in` for fills, `power1.inOut` for virtual pointers. Everything is built inside `gsap.matchMedia` (reduce, motion, fine pointer, width 992). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, and `lenis.on('scroll', ScrollTrigger.update)`. The fonts wait is `document.fonts.ready` plus a Handjet load, with a 1.5s hard timeout. If the timeout wins, the cell wordmark is rebuilt once the font arrives. Only transform, opacity, clip-path and canvas pixels animate.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Opening wake: a virtual boat crosses the first screen | CU5 (driven by script) | Load, t0.15 | 1.4s power1.inOut, x -10% to 110%, y 72% to 58% of the first viewport, 2-cell sine sway, radius 3 | No wake |
| H2 lines rise | TX1 | Load, t0.30 | yPercent 110 to 0 in masked lines, 0.9s expo.out, stagger 0.09 | No split |
| Lede, note, hint, studio line | LD8 | Load, t0.65 | Opacity 0 to 1, y 12 to 0, 0.7s expo.out, stagger 0.06 | Visible |
| Wishlist and demo buttons | LD7 (clip variant) | Load, t0.80 | clip-path inset(0 100% 0 0) to inset(0), 0.6s expo.out, stagger 0.08, then cleared | Visible |
| Tray rules and contents | SC16 | t0.95 if in view at load; otherwise on entering view (top 85%, once) | Top, left and middle rules scale from 0, 0.8s expo.inOut; contents fade in over 0.5s, stagger 0.04 | Drawn |
| Pointer wake | CU5 | pointermove (fine pointers) | Square halo radius 2, up to 4 with speed, interpolated every half cell; half-life 0.15s in water, 0.45s on letter cells (floor 0.16); four steps at alpha 0.18, 0.38, 0.62, 0.9 | Static grid |
| Touch wake | CU5 | touchstart (burst radius 0 to 4 in 0.3s), touchmove (trail) | As above | Static grid |
| Scroll sparkles | SC10 | Every frame with a scroll delta (Lenis or native touch) | min(round(dy x 0.6), 36) random visible cells at heat 0.35 to 0.65; stops when scrolling stops | Off |
| Keyboard focus halo | CU5 (keyboard equivalent) | focusin with :focus-visible, except the email field | Halo of cells around the control's rectangle, radius 0 to 3 in 0.3s power2.out | Off |
| The name lights once | TX11 + CU5 | Wordmark band 60% in view, once, not before t1.5 | A vertical band of light (radius 3) crosses the content width from -10% to 110%, 1.2s power1.inOut; the letter cells hold it about 1.5s | Name drawn statically at the 0.38 step |
| Button fill | HV4 | pointerenter and pointerleave (mouse and pen), focus-visible from the left | A square grows from the entry point, 0.45s power3.out, and shrinks toward the exit point, 0.35s power3.in. Wishlist: lamp light #FFE3A8. Demo and submit: pool, with the label from foam to spark | Instant colour change |
| Press | MI1 | pointerdown, pointerup | Scale 0.96 (buttons, Close, Use a different email), 0.985 (store rows), 0.98 (Discord) in 0.12s power2.out; release 0.45s power3.out | None |
| Underline sweep | HV2 | Hover, focus-visible | A 2px spark line over the 1px kelp underline, in from the entry side and out toward the exit side, 0.4s cubic-bezier(.65,0,.35,1) | Kelp underline always; colour change |
| Demo dialog | CD7 | Play the free demo; Close, Escape or backdrop to close | Opens out of the button: translate plus clip-path from a button-sized window to inset(0), 0.55s expo.out; rows y 10 to 0, 0.4s, stagger 0.05; backdrop 0.3s. Closes in reverse, 0.35s expo.in, then focus returns to the button. Lenis is stopped while it is open | Instant |
| Store rows | HV7 + cell strip | Hover, focus-visible | The other row dims to 0.45 in 0.25s; a strip of spark cells lights along the row with clip-path steps(10) in 0.3s. Touch: the strip rests at 30% and lights on :active | Instant |
| Email field | MI4 | Hover, focus | Border kelp to foam on hover, to spark on focus (0.2s); a strip of cells lights left to right, clip-path steps(16) in 0.32s | Instant |
| Error line | MI4 | Invalid submit | Reserved line revealed with clip-path inset(0 100% 0 0) to inset(0) plus opacity, 0.25s; focus moves to the field | Instant |
| Checkbox | MI3 | change | Box scale 0.9 to 1, back.out(2), 0.25s; tick stroke-dashoffset 1 to 0, 0.3s power2.out | Instant tick |
| Confirmation | TX1 + CU5 | Valid submit | Burst radius 0 to 5 from the submit button; form fades out in 0.2s; lines rise in masks, 0.6s expo.out, stagger 0.06; focus moves to "You're on the list." | Instant swap |
| Back to the form | Swap | Use a different email | Confirmation fades out in 0.2s, form fades in over 0.3s, address kept, focus in the field | Instant |

## Adapting

1. **Find your subject's disturbance.** The field is only right if your product has a mechanic it can stand for: light, ink, sound, growth. Rename the hint to match ("Move through the water to light it."). If there is no such mechanic, take the field out rather than keeping it as decoration.
2. **Map the colours onto the tokens, keeping their roles.** `--night` is the ground, `--spark` is light the visitor causes (and only that), and `--lamp` is the single primary action. Keep `--pool` decorative, and use `--kelp` for any outline that must be seen (3:1 or better). Rebuild `--glow-1` to `--glow-4` from the new `--spark` as `rgba()` at 0.18, 0.38, 0.62 and 0.9.
3. **Replace the name.** Set `WORD` in the script, and the two-line split for phones in `lines` (choose a break that means something, or keep one line if the word is short). The fit loop sizes the cap height to whole rows inside the gutters. A longer name gets shorter letters. Above about 12 letters, use the two-line form everywhere. Change the `.mark` fallback text and its `font-size` divisor (content width divided by the word's ink width per em: 3.32 for NOCTILUCA, 1.79 for NOCTI).
4. **Copy.** The H2 is three lines at 108px in a 7/12 column. Keep it to about 50 characters. The definition list takes four to six short rows. The dialog takes one row per store, platform or download.
5. **Retime or remove motion.** All CSS transitions and the main GSAP durations read the `--d-*` tokens (row staggers and the form swap's short fades are literals), and the light's memory is `--half-water` and `--half-mark`. The wake radii (2 to 4 for the pointer, 3 for the focus halo, 4 for a tap, 5 for the success burst) and the sparkle cap (36) are literals in the script. To remove scroll sparkles, delete the `scroll` listener. To remove the sweep across the name, delete `markTrigger`. To remove the opening wake, delete the `crossing(T.wake, ...)` line. The field still answers people. To drop the field entirely, delete the canvas and the water module. The grid lines and the `.mark` text fallback remain and still read as a designed page.
6. **Fonts.** If Handjet fails, the H2 falls back to Arial Narrow, and the wordmark is sampled from whatever face loaded, which still reads as cells. Any display face built from modules on a grid works. Keep its modules square to match the cells.
7. **In a framework,** render the markup statically and port the script as one effect that returns the `gsap.matchMedia` cleanup (it removes ticker functions, destroys Lenis, removes listeners, disconnects observers and clears the canvas).

| Token | Role |
|---|---|
| `--night` | Page ground, button grounds, input fields, the tick |
| `--pool` | Grid lines (`--grid-line`), tray rules, dialog surface, the dormant wordmark fallback, the outline-button hover fill |
| `--foam` | Text (14.8:1 on night) |
| `--kelp` | Secondary text, input and outline-button borders, the resting underline (7.3:1) |
| `--spark` | Lit cells, focus rings, hover label and underline, the ticked box, cell strips |
| `--glow-1` ... `--glow-4` | The four light steps the canvas paints (`rgba()` of `--spark`) |
| `--lamp`, `--lamp-glow` | Wishlist button and its hover light |
| `--bloom` | Error text only (8.6:1) |
| `--scrim` | Dialog backdrop |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2` | Type scale, a perfect fourth on 17px: 13, 17, 22.5, 30, clamp(48px, 7.4vw, 108px) |
| `--cell` | The board: 12px, 8px under 600px |
| `--s1` ... `--s8` | Spacing, 6 to 144, in half and whole cells |
| `--notch`, `--tap` | Pixel-corner step (4px) and button or field height (48px) |
| `--d-*` | Durations for CSS transitions and the main GSAP timings in the script |
| `--half-water`, `--half-mark` | Light half-life in open water (0.15s) and on letter cells (0.45s) |
| `--ease-out`, `--ease-line`, `--ease-tick` | CSS curves: expo.out, the underline sweep, power2.out for the tick |
