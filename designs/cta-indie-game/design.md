---
title: Indie game wishlist and demo call to action
section: cta
subject: Noctiluca, a night-harbour puzzle game by Lowwater, a two-person studio in Hobart, asking players to wishlist it on Steam and play the free demo (Bay One) tonight, with a launch-day email as the fallback.
aesthetic: A harbour at night drawn on the game's own board. Deep harbour-navy water dotted with a 12px lattice of dormant plankton, blue sparks that exist only where something moves, one boat-lamp yellow for the wishlist button, and a display face whose letters are built from square modules.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, set at ELSH 2 and ELGR 1 so the modules are square tiles. Used for the H2 at 700 and as the source for the dormant NOCTILUCA wordmark at 800.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything else, at 400 for body, 600 for buttons, h3 and dl terms, tabular-nums so the figures in the demo facts and store sizes line up.
js: Lights a canvas cell field in a decaying square wake behind the pointer, touch, scrolling, focus and a sent form, raises the cropped NOCTILUCA wordmark in the same cells as the page ends, and runs the load sequence, micro-interactions, demo dialog and in-place email confirmation (nothing is sent).
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [cta, game, indie, wishlist, demo, canvas, lattice, pointer, dialog, form, dark, gsap, lenis]
use_when:
  - A game, app or tool whose core mechanic can be shown as a field that responds to the visitor (light, ink, sound, growth), and the page has one or two concrete asks.
  - Asking for a wishlist, pre-order or waitlist, with a free trial or demo as the second step and an email as the fallback.
  - The brand has a grid or pixel world (tiles, boards, cells) that can carry both the layout and the type.
avoid_when:
  - The product has no interaction to stand in for. Then the lattice is decoration and should go.
  - Light, warm or editorial brands. The navy ground and pixel display face are loud by design.
  - Pages that already run a cursor or canvas effect nearby. Two pointer fields fight each other.
---

## Why it works

**The one bold idea: the page is the game.** In Noctiluca the harbour lights only where something moves, because *Noctiluca scintillans* glows when it is disturbed. The section does the same thing. A field of 12px cells (8px on phones) sits behind everything as barely visible dots. Wherever the water is disturbed, by the pointer, a finger, scrolling, keyboard focus or a sent form, the cells light as flat squares in a square, Chebyshev-distance wake (radius 3, up to 5 with speed), stamped every half cell along the path. The light decays through four colour steps with a half-life of 0.15s. Everything else on the page supports this.

- **Not another lit-cell grid.** process-smallsat and faq-esports-arena also light square cells under the cursor. This one differs in three ways. The cell is fine (12px, 8px on phones), so the wake reads as a stepped pixel shape, not a tile wall. It decays fast through four colour steps (0.15s half-life), so it looks like a wake behind the hand, not a spotlight. And the wordmark cells have a longer memory, three times the water's. The wake is square on purpose. It belongs to the same board as the stepped pixel corners and the square Handjet modules, and a soft round glow fought both (see Deviations).
- **The load teaches the mechanic.** A virtual boat crosses the first screen, and the headline is uncovered behind it in whole cells, exactly where the water lights. Before reading anything, the visitor has seen what the hint says: move through the water to light it.
- **The payoff: the name rises out of the water (TX11 in cells).** At the bottom, NOCTILUCA is drawn in the same cells as the wake, not laid over them as text. It is laid out from two cells beyond the left edge to two cells beyond the right, so the N and the A are cut by the section edges, and the feet of the letters run off the bottom edge. As the page ends, a scrubbed ScrollTrigger raises the word one whole cell row at a time, and its climbing top edge lights up (brighter on a fast flick). At rest the letter cells keep a dim glow (`--mark-rest`, about 1.8:1), so the name stays plainly visible. When the wake crosses the letters they hold the light three times longer than open water (half-life 0.45s), so the name lights up behind your hand. When the word has fully surfaced, one slanted wave front writes it once, left to right, so touch and keyboard visitors see it lit too. This differs from footer-architecture-biennale, where a light Titillium wordmark is scrubbed against a section drawing. Here, plankton cells climb row by row and answer the pointer.
- **Colour has a meaning.** The ground is a chosen harbour navy (#0A1C26), not a tinted black, and there is no black with one accent (default 2). Plankton blue (`--spark`) appears only as light the visitor causes: sparks, focus rings, hover labels, cell strips and the ticked box. Lamp yellow (`--lamp`) is the boats' lamps, the thing you bring home, and it appears only on the Wishlist button. Its hover is the lamp turned up (`--lamp-glow` #FFEFCC, visibly paler than #FFC86B; night text on it is 15.3:1), never spark. Bloom red is for errors only.
- **The structure is the board.** Every spacing step is a whole or half cell, the side edge and the tray start on cell lines, and the CSS lattice dots (visible without JavaScript) have their origin at the section origin, so the canvas cells sit exactly on them. Buttons are tiles with stepped pixel corners. Focus and the sent form disturb the water around the control, and the field and store rows light a strip of sparks.
- **Type built from modules.** Handjet's letters are made of modules. At ELSH 2 and ELGR 1 the modules are square tiles (round modules would read as the Doto and Bitcount dot-matrix already in faq-esports-arena and team-restaurant-kitchen). The wordmark is sampled from Handjet 800 into cells letter by letter. Each letter's ink is snapped to whole cells with at least two empty columns between letters, and the cap height falls on whole rows. On phones the name stacks as NOCTI / LUCA (night / light, the word's Latin roots). Each line is sized to the full width on its own, so LUCA comes out taller, and both lines still crop at the edges by one cell. Host Grotesk is a calm grotesque for everything you read, with true tabular figures.
- **The studio is in Hobart** because the Derwent estuary is one of the places where Noctiluca blooms light the water at night. The game's world and its makers come from the same harbour.
- **Two asks, in order.** Wishlist is the yellow button. The demo is the outline button, and it opens a dialog with the two stores, their platforms and their download sizes. The launch email is the fallback, in the tray beside the demo facts. The facts are a plain definition list in body size, not a stat block (default 6).
- **No dead ends.** Every external link (four anchors: Wishlist on Steam, the Steam and itch.io demo rows, and Discord) opens in a new tab with `rel="noopener"` and a visually hidden "(opens in a new tab)". The form validates in place, explains the fix, and moves focus to the field. The confirmation names the address and the playtest choice, and "Use a different email" brings the form back with the address kept and focus in the field. The dialog closes with Close, Escape or a backdrop click, and focus returns to the button that opened it. On short viewports (a landscape phone) the dialog caps its height and scrolls inside itself.
- **Semantics.** This is a section, so the host page supplies the `h1` and the `main` landmark. The section's `h2` is the first heading here, and the demo dialog's `h2` sits outside the section because the dialog lives in the top layer.

Deviations from the approved plan, and why:

- **The headline is uncovered by the opening wake, not raised in masked lines.** Each line is clipped to whole cells up to the boat's position, so the H2 appears exactly where the water lights. One text motion, and it belongs to the signature.
- **The grain sits under the content, not over it.** It textures the water and the lattice only, so it never lowers the contrast of text or touches a form field, and the tray needs no opaque ground.
- **The keyboard burst is a halo around the control, not a burst at its centre.** A centre burst hid behind opaque buttons and showed only as slivers. Text fields get their spark strip instead.
- **The letter feet bleed off by about half the bottom stroke, not 25% of the cap.** At 25% the feet of L and U were cut away, and the name read as NOCTIIIICA. At 8% of the cap on desktop (one row on phones), the feet still visibly run off the edge.
- **The wake is square again.** An earlier art-direction pass asked for round sparks with Euclidean falloff to set this apart from other cell grids. In practice it read as a soft cursor glow and fought the stepped geometry, so the brief's square Chebyshev wake is back, and the difference is carried by cell size, decay and the wordmark's memory.
- **Removed accessories:** the magnetic pull on the Wishlist button (a second pointer-following effect on the spot the wake already follows), and a one-off acknowledgement that dimmed the hint after the first disturbance (it said nothing new and took the hint's kelp text below AA).

## Do not touch

- **One cell for everything.** `--cell` drives the CSS lattice dots, the canvas cells, the spacing scale and the gutter rounding. The canvas reads it at build time. If you change it in one place only, the lit cells no longer sit on the dots.
- **The lattice origin is the section origin.** The dot background starts at the section's top-left, and the canvas covers the section exactly. Do not add borders to `.cta` that would shift either one.
- **Lit cells are flat squares with a Chebyshev falloff,** drawn `cell - 2` px wide with no halo and no additive blending. Do not blur them into round glows: the fine cell, the four-step 0.15s decay and the wordmark's 0.45s memory are what set this page apart from process-smallsat and faq-esports-arena.
- **`--glow-1` to `--glow-4` are `rgba()` strings** that the canvas uses as fill styles. Keep four steps, and keep `--spark` at their core. `--mark-rest` is a solid colour drawn under the letter cells before the light pass.
- **The wordmark is counted up from the section's bottom edge.** The script sets the `.mark` height in whole cells (band rows minus the cropped feet), and `.cta` has no bottom padding. Adding padding there lifts the feet back into view.
- **Pixel corners live on `.face` and `.inner`, never on the `<a>` or `<button>`,** so focus outlines are never clipped. The outline buttons use a kelp `.face` with a 2px padding and a night `.inner`, with the same notch, so the stepped border stays 2px all round.
- **Light only where something moved.** The light loop is added to `gsap.ticker` only while some point is above its floor, and it sleeps off screen (IntersectionObserver). The grain is the only loop, and it pauses off screen. Do not add another.
- **Hidden states exist only under `html.js:not(.go)`,** and the script replaces them with inline states in the same task, before it adds `.go`. If the CDN is blocked, the `js` class is never added and everything shows, and the form and dialog still work in plain JavaScript.
- **Accessibility.** The canvas and grain are `aria-hidden`, and the wordmark has an `aria-hidden` text fallback in `--pool` that turns transparent once the lattice is drawn. The form uses `novalidate` with its own messages, `aria-invalid` and `aria-describedby`, and focus moves to the field. The error line is reserved, so nothing shifts. The confirmation heading takes focus (`tabindex="-1"`). The dialog is a native `showModal()`, and Lenis is stopped while it is open. Every target is at least 44px, and nothing is hover-only. The error line's text is cleared whenever the error clears. The email field keeps the spark outline on keyboard focus, as well as its spark border and cell strip.

## Motion

House easing: `expo.out` for entrances, `expo.inOut` for rules, `power3.out` / `power3.in` for fills, `power1.inOut` for virtual boats. Everything is built inside `gsap.matchMedia` (reduce, motion, fine pointer, width 992). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, and `lenis.on('scroll', ScrollTrigger.update)`. The opening waits for the fonts and for a visible page (`visibilitychange`), so a background tab cannot jump past it. The fonts wait is `document.fonts.ready` plus a Handjet load, with a 1.5s hard timeout. If the timeout wins, the cell wordmark is rebuilt once the font arrives. Only transform, opacity, clip-path and canvas pixels animate. Colour changes (button labels and fills without the motion layer, field and checkbox borders, the checked box) are instant, with no transition.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Opening wake: a virtual boat crosses the headline | CU5 (driven by script) | Load (fonts ready, page visible), t0.15 | 1.4s power1.inOut, x -10% to 110% of the section, along line 1 dipping to the last line, 2-cell sine sway, radius 3 | No wake |
| Headline uncovered behind the boat | CU5-coupled line clip | Same crossing | Each SplitText line is clipped to whole cells up to the boat's x | Visible |
| Lede, note, hint, studio line | LD8 (stepped) | As the boat leaves the headline | Opacity 0 to 1, 0.45s steps(3), stagger 0.06 | Visible |
| Wishlist and demo buttons | LD7 (clip variant) | As the boat leaves the headline | clip-path inset(0 100% 0 0) to inset(0), 0.6s expo.out, stagger 0.08, then cleared | Visible |
| Tray rules and rows | SC16 + CU5 | t0.95 if in view at load; otherwise on entering view (top 85%, once) | Top, left and middle rules scale from 0, 0.8s expo.inOut. A boat (radius 3) runs down the left rule over 1.1s, and each row is uncovered as the wake passes it: clip-path inset(0 100% 0 0) to inset(0), 0.4s steps(8) | Drawn |
| Pointer wake | CU5 (square cells) | pointermove (fine pointers) | Chebyshev radius 3, up to 5 with speed, stamped every half cell along the path. Half-life 0.15s in water, 0.45s on letter cells. Four colour steps at alpha 0.18, 0.38, 0.62, 0.9, flat `cell - 2` squares | Still lattice |
| Touch wake | CU5 | touchstart (burst radius 0 to 4 in 0.3s), touchmove (trail, radius 3) | As above | Still lattice |
| Bow wave | SC10 (structured) | Every frame with a scroll delta above 2px (Lenis or native touch) | Every row the viewport's leading edge swept since the last frame (the bottom edge when scrolling down) lights across the full width at heat clamp(abs(dy)/40, 0.2, 0.9), with a half-lit row either side; a still mouse also leaves a trail | Off |
| Keyboard focus halo | CU5 (keyboard equivalent) | focusin with :focus-visible, except the email field and the confirmation heading | Square ring of cells around the control's rectangle, radius 0 to 3 in 0.3s power2.out | Off |
| The name rises | TX11 in cells (signature) | ScrollTrigger on `.mark`, start top bottom, end bottom bottom, scrub | Row offset round((1 - progress) x band rows), so the word climbs one whole row at a time; each new row lights the top ink cell of every column at clamp(0.62 x (0.7 + velocity/2500), 0.4, 0.95) | Fully risen at `--mark-rest` |
| The name is written once | CU5 (driven by script) | Rise progress above 0.97, once, after the opening | A slanted wave front (radius 2) crosses each line of the name, 1.2s power1.inOut, 0.3s apart; letter cells hold it about 1.5s, then rest at `--mark-rest` | Off |
| Film grain over the water | MD4 | Always, paused off screen | 128px noise tile made once in a canvas, opacity 0.06, translate jumps, 0.8s steps(4), under the content | Static grain |
| Button fill | HV4 | pointerenter and pointerleave (mouse and pen), focus-visible from the left | A square grows from the entry point, 0.45s power3.out, and shrinks toward the exit point, 0.35s power3.in. Wishlist: lamp light #FFEFCC. Demo and submit: pool, with the label switching from foam to spark | Instant colour change |
| Press | MI1 | pointerdown, pointerup | Scale 0.96 (buttons, Close, Use a different email), 0.985 (store rows), 0.98 (Discord) in 0.12s power2.out; release 0.45s power3.out | None |
| Underline sweep | HV2 | Hover, focus-visible | A 2px spark line (`::after`) scales from 0 to 1 over the 1px kelp underline, from the entry side, and back toward the exit side, 0.4s cubic-bezier(.65,0,.35,1); the label switches to spark | Line shown and colour changed, instantly |
| Demo dialog | CD7 | Play the free demo; Close, Escape or backdrop to close | Opens out of the button: translate plus clip-path from a button-sized window to inset(0), 0.55s expo.out; rows y 10 to 0, 0.4s, stagger 0.05; backdrop 0.3s. Closes in reverse, 0.35s expo.in, then focus returns to the button. Lenis is stopped while it is open; it scrolls inside itself on short viewports | Instant |
| Store rows | HV7 + spark strip | Hover, focus-visible | The other row dims to 0.45 in 0.25s; a strip of sparks lights along the row with clip-path steps(10) in 0.3s. Touch: the strip rests at 30% and lights on :active | Instant |
| Email field | MI4 | Hover, focus | Border switches to foam on hover and to spark on focus (instant); a strip of sparks lights left to right, clip-path steps(16) in 0.32s | Instant |
| Error line | MI4 | Invalid submit | Reserved line revealed with clip-path inset(0 100% 0 0) to inset(0) plus opacity, 0.25s; focus moves to the field; the text is cleared when the address becomes valid | Instant |
| Checkbox | MI3 | change | Box scale 0.9 to 1, back.out(2), 0.25s; the tick is uncovered left to right with clip-path, 0.3s power2.out | Instant tick |
| Confirmation | TX1 + CU5 (signature) | Valid submit | Form fades out in 0.2s; a burst (radius 0 to 5) from "You're on the list."; lines rise in masks, 0.6s expo.out, stagger 0.06; after 0.15s a boat (radius 3) runs 0.9s from the heading down to the wordmark, then the name is written again left to right; focus moves to the heading | Instant swap |
| Back to the form | Swap | Use a different email | Confirmation fades out in 0.2s, form fades in over 0.3s, address kept, focus in the field | Instant |

## Adapting

1. **Find your subject's disturbance.** The lattice is only right if your product has a mechanic it can stand for: light, ink, sound, growth. Rename the hint to match ("Move through the water to light it."). If there is no such mechanic, take the lattice out rather than keeping it as decoration.
2. **Map the colours onto the tokens, keeping their roles.** `--night` is the ground, `--spark` is light the visitor causes (and only that), and `--lamp` is the single primary action. Keep `--pool` decorative, and use `--kelp` for any outline that must be seen (3:1 or better). Rebuild `--glow-1` to `--glow-4` from the new `--spark` as `rgba()` at 0.18, 0.38, 0.62 and 0.9.
3. **Replace the name.** Set `WORD` in the script, and the two-line split for phones in `lines` (choose a break that means something, or keep one line if the word is short). The fit loop sizes each line's cap height to whole rows across the full section plus `BLEED` cells each side, so a longer name gets shorter letters. Above about 12 letters, use the two-line form everywhere. Change the `.mark` fallback text and its `font-size` divisor (110vw divided by the word's ink width per em: 3.32 for NOCTILUCA, 1.79 for NOCTI). The bottom crop is `crop` in `build()`. Keep it below the thickness of the bottom stroke.
4. **Copy.** The H2 is three lines at 108px in a 7/12 column. Keep it to about 50 characters. The definition list takes four to six short rows. The dialog takes one row per store, platform or download.
5. **Retime or remove motion.** All CSS transitions and the main GSAP durations read the `--d-*` tokens (row staggers, the tray row reveal and the form swap's short fades are literals), and the light's memory is `--half-water` and `--half-mark`. The wake radii (3 to 5 for the pointer, 3 for the focus halo and the boats, 4 for a tap, 5 for the success burst, 2 for the name's wave front) and the bow-wave heat (abs(dy)/40) are literals in the script. To remove the bow wave, delete the `water.sweep` call. To keep the name still, delete the `st` ScrollTrigger and call `water.build(1)`. To remove the wave over the name, delete the `lightName` calls. To remove the opening wake, delete the `crossing(T.wake, ...)` line and show the H2 directly. To remove the grain, delete `.grain` and its tile code. The lattice still answers people. To drop the lattice entirely, delete the canvas and the water module. The dot background and the `.mark` text fallback remain and still read as a designed page.
6. **Fonts.** If Handjet fails, the H2 falls back to Arial Narrow, and the wordmark is sampled from whatever face loaded, which still reads as a lattice. Any display face built from modules on a grid works. Keep its modules square to match the board.
7. **In a framework,** render the markup statically and port the script as one effect that returns the `gsap.matchMedia` cleanup (it removes ticker functions, destroys Lenis, removes listeners, disconnects observers and clears the canvas).

| Token | Role |
|---|---|
| `--night` | Page ground, button grounds, input fields, the tick |
| `--pool` | Dialog surface, the no-JS wordmark fallback, the outline-button hover fill |
| `--grid-line` | The CSS lattice dots on the section (set to `--pool`) |
| `--mark-rest` | The wordmark's resting cells, #1E4A5C (about 1.8:1 on night; aria-hidden decoration) |
| `--grid-raised` | Lattice dots on the dialog's pool ground |
| `--foam` | Text (14.8:1 on night) |
| `--kelp` | Secondary text, tray rules, input and outline-button borders, the resting underline (7.3:1) |
| `--spark` | Sparks, focus rings, hover label and underline, the ticked box, spark strips |
| `--glow-1` ... `--glow-4` | The four light steps the canvas fills cells with (`rgba()` of `--spark`) |
| `--lamp`, `--lamp-glow` | Wishlist button (night text 11.4:1) and its hover light (15.3:1) |
| `--bloom` | Error text only (8.6:1) |
| `--scrim` | Dialog backdrop |
| `--grain-a`, `--d-grain` | Grain opacity (0.06) and its stepped loop (0.8s) |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2` | Type scale, a perfect fourth on 17px: 13, 17, 22.5, 30, clamp(48px, 7.4vw, 108px). Body is 16px under 600px |
| `--lh-body`, `--lh-lede` | Line heights: 1.55 for body, 1.45 for the lede |
| `--max-w` | Content width, 1296px (108 cells) |
| `--cell` | The board: 12px, 8px under 600px |
| `--s1` ... `--s8` | Spacing, 6 to 144, in half and whole cells |
| `--notch`, `--tap`, `--hit` | Pixel-corner step (4px), button or field height (48px), minimum text-action target (44px) |
| `--d-*` | Durations for CSS transitions and the main GSAP timings in the script |
| `--half-water`, `--half-mark` | Light half-life in open water (0.15s) and on letter points (0.45s) |
| `--ease-out`, `--ease-line`, `--ease-tick` | CSS curves: expo.out, the underline sweep, power2.out for the tick |
