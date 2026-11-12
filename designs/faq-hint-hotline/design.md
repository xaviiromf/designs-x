---
title: Hint line FAQ dialled on a telephone keypad
section: faq
subject: The FAQ of Hintline, a volunteer-run telephone line and text chat in Utrecht that gives spoiler-free hints for point-and-click and text adventures from 1985 to 1999, every evening from 18:00 to 23:00 CET, organised like the line's own telephone menu.
aesthetic: An old bakelite desk telephone drawn in flat pixel geometry on its own red-brown. A handset lifted off its cradle, a coiled cord, a display window with line-green digits, and a 3 x 4 keypad framed by the four row tones and three column tones of touch-tone dialling. Four branch hues mark the four menu branches.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, at ELSH 2 and ELGR 1 so the modules are square tiles. The H2 at 700, the display digits, key legends, question numbers and branch numbers.
  - "Host Grotesk (Google Fonts, variable wght 300-800). Everything else: body at 400, buttons, questions and labels at 600, the display title at 500, with tabular-nums on frequencies, slots and numbers."
js: Plain JavaScript dials the FAQ (keypad, keyboard digits, display, accordion, scroll-following display, line lamp, form, dialog); GSAP and Lenis add the handset lift, the coiled cord that pays out with the scroll, and the stepped dialog frames.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [faq, accordion, telephone, keypad, dtmf, pixel, sticky, canvas, dialog, form, dark, gsap, lenis]
use_when:
  - A help line, support desk or service whose questions can be numbered like a phone menu (branches and items), so that a short code is a real way in.
  - An FAQ long enough (a dozen questions or more) that a sticky navigator beside it earns its place.
  - A brand with a physical object worth drawing large (a telephone, a radio, a till) whose controls can do the page's work.
avoid_when:
  - Fewer than six questions. The keypad is then bigger than the content it navigates.
  - "Questions that have no stable order or change often: the two-digit numbers become wrong addresses."
  - Pages that already have a large sticky element on the left, or a bottom bar on phones.
---

## Why it works

**The one bold idea: you dial a question.** The FAQ is the line's telephone menu. Four branches (1 Calling the line, 2 How hints work, 3 Games we know, 4 Volunteering) each hold three or four questions numbered 11 to 43, and the telephone on the left is a working keypad. Every key is the crossing of two tones, as in touch-tone dialling, and the page shows it: a press lights the key, the tone bar of its row on the left (697, 770, 852 or 941 Hz) and the tone bar of its column on top (1209, 1336 or 1477 Hz) for at least 180 ms. A lit bar is cut by stripes whose period follows its frequency (10 px for 697 down to 4 px for 941 and 1477), so lower tones read as longer waves. The first digit shows the branch ("2", "How hints work. Now dial 21 to 24."); the second opens the question, scrolls it to a fifth of the way down and moves focus to it. Star clears, hash closes every answer, 0 goes to "Ask for a call back", and an unassigned number answers "No question 27. Try 21 to 24." under a hatched bar. The same works from the keyboard's digit, star and hash keys whenever focus is not in a text field, and ordinary clicks on a question make the keypad dial its number by itself.

- **The telephone is drawn large and with care.** The handset is an 82 x 16 drawing of 4 px rects (mouthpiece and earpiece cups with their holes, an arched handle with a highlight and an underside shadow), above a cradle with two forks and two hook-switch plungers. The body is a 330 px bakelite plate with an 8 px stepped corner, a display window, the line lamp and the keypad. On phones the drawing scales down by `--u` and the keys narrow with the viewport.
- **The cord ties the scroll to the telephone.** The handset stays with the headline; the keypad body is sticky at exactly the height where it starts, so from the first pixel of scroll it stays put while the handset leaves. Between them the coiled cord pays out: a canvas draws a helix seen from slightly above, snapped to 2 px cells (radius 7 cells, pitch 6 cells, 12 px a loop), near arcs in `--cord`, far arcs in `--cord-back`. The loops are laid from the handset down and the straight lead into the socket stretches until it is long enough for one more loop, which cuts in whole. Scrolling back winds it in loop by loop. The cord only redraws on scroll and resize, never in a loop.
- **The display follows the reading.** When a question's heading crosses the upper third of the viewport, the display cuts to its number and title, and to "0 Ask for a call back" at the form (or to the booked call back after success). After a dial it waits 1.6 s (`--d-wait`) so the scroll it caused does not overwrite it, and under a hover preview the new reading waits underneath. On phones a pinned bar at the bottom carries the same two-digit display and a Keypad link.
- **Colour has jobs from the telephone.** The ground is bakelite (#5A2C24), lighter and pinker than rust, with darker tones for the body, display and scrim and a lighter tone for key faces. `--dial` is everything you read and every key legend. `--cord` is secondary text, rules and the cord itself. `--line` means the line is open or connected: the lamp, the tone bars, the display digits, focus rings and the plug patched into a focused field. The four branch hues appear only on their branch: a tick on its key, the tick of its heading, its question numbers. Errors use no hue: a hatched `--dial` bar and the message.
- **The lamp is computed.** The visitor's clock is read in Europe/Amsterdam time: "The line is open now" (solid lamp) from 18:00 to 23:00, otherwise "The line opens at 18:00 CET" (the lamp as a line-green ring), and "The line is closed today" on 24, 25 and 31 December.
- **Semantics.** A `section` with `aria-labelledby` on the H2. Branches are `h3`, questions are `h4` buttons with `aria-expanded` and `aria-controls` on `role="region"` panels. The keypad is a `role="group"` of twelve real buttons whose captions carry visually hidden branch names. The display is `aria-hidden`; every dial result is announced once in a polite live region. The handset, cradle and cord are `aria-hidden` drawings. The form has labels, hints in `aria-describedby`, a reserved error line per field and a `fieldset` of five half-hour radio slots. The dialog is a native `showModal()` with an `h2` title.
- **Nearest designs in the ledger.** faq-handheld-clinic is the other FAQ: its signature is dithering as the way things appear; here nothing dithers, and the FAQ is navigated rather than revealed. nav-game-museum makes a map the menu; here the menu is a phone code. crud-cartridge-stall and features-cyberdeck-kit press keycaps with travel; here the key press is about the two tone bars it lights, and the buttons use hook switches instead.

## Do not touch

- **Row and column bars are derived from `data-r` and `data-c` on each key.** If you move keys, move those attributes, or a key lights the wrong tones. Bars light by set membership, so two quick keys in the same row keep the bar lit until both release.
- **The sticky offset is computed, not a constant.** `stick()` sets `--stick` to the body's natural position below the handset (capped so the body fits the viewport). With a smaller value the body first scrolls away and the cord pays out late; with a larger one it jumps down at load.
- **The cord anchor is the handset drawing's unit grid.** The script reads the handset's rect and assumes 82 units across, the cord leaving at unit (1, 11.5). If you redraw the handset, keep the viewBox width at 82 or change `/ 82` in the script.
- **Whole loops only.** `n = floor(room / P)`; do not interpolate the pitch, or the cord stretches like a spring instead of paying out.
- **Pre-load states live only under `html.js:not(.go)`** (handset seated, plungers pressed, lamp off, display hidden) and are undone for reduced motion. With the CDN blocked the `js` class is never added, so the handset is lifted and everything dials.
- **Stepped corners are on inner spans and plates** (`.btn-r`, `.btn-f`, `.key-f`, `.plate`, `.dsp`, `.dlg`), never on the `<button>` or `<a>`, so focus outlines are never clipped.
- **The dialog animates the inner `.dlg`, not the `<dialog>`,** and content hides with opacity, not visibility, so Close keeps focus during the frames. `settle()` clears everything when the browser forces a close mid-animation.

## Motion

House cadence: hard cuts and whole-pixel steps, timed by the `--d-*` tokens. Only transform, opacity, clip-path, visibility and canvas pixels change; colour changes are instant. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`, lerp 0.1); touch keeps native scrolling. The opening waits for the fonts (raced with 1.5 s) and a visible page. Everything is built in `gsap.matchMedia` (motion, reduce, width 900, fine pointer) and cleaned up there.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Two-tone press (signature) | Classes on key, row bar, column bar and their Hz labels | pointerdown, a keyboard digit/star/hash, Enter or Space on a focused key | Lit from press until max(180 ms, release); key face to `--line`, 2 px down; bars striped by frequency | Same (a state change) |
| Display collects digits | DOM | Each dial | Instant cut; first digit names the branch, second opens, scrolls (Lenis, 0.9 s, 20% offset) and focuses | Instant scroll |
| Keypad dials a clicked question | setTimeout sequence | Click on a question | Its two keys, 220 ms apart (`--d-dial`), each with its bars | Display set at once, no sequence |
| Key preview (pointer) | Outline classes | pointerenter (mouse, pen) and focus | Row and column bars as 2 px `--line` outlines, key rim in `--cord`, display shows what the key would do in `--cord`. Touch: no hover, the 180 ms press is the feedback | Same |
| Cord pays out (scroll) | Canvas, 2 px cells | scroll, resize, handset lift | Loops of 12 px laid from the handset; one whole loop cuts in per 12 px of distance, wound back on return. Phones: the body is not sticky, so the cord stays at rest | Drawn the same (scroll state, no animation) |
| Display follows the reading (scroll) | getBoundingClientRect on scroll (rAF) | A question heading crosses 1/3 of the viewport | Instant cut to number and title; held 1.6 s after a dial; waits under a hover preview. Phones: the pinned mini display | Same |
| Off the hook (load) | GSAP timeline of sets | Fonts and visible page | Handset seated (7 units down), up to 3 units at 0.35 s, lifted at 0.51 s (`--d-lift` 0.16 s), plungers rise with it, the cord pays out two steps, lamp on at 0.75 s, display cuts to "Dial 1 to 4" at 0.99 s. Headline visible from the first frame | Lifted, lamp on, display shown |
| Hook switches (button hover) | CSS keyframes, steps(1) | hover (fine pointers), focus-visible | Two plunger heads rise 2 px, then 3 px, over 80 ms (`--d-hook`), showing their dark slots | Raised 3 px at once |
| Hung up (button press) | Class `.is-down` | pointerdown, or a keyboard click | Plungers 3 px below the edge, face and rim inverted to `--dial`, held at least 140 ms (`--d-press`) | Same |
| Double ring (text actions) | CSS keyframes, steps(1) | hover, focus-visible; touch: pointerdown adds `.is-ring` | Underline off, on, off, on, 80 ms each (`--d-ring`), then holds at 2 px in `--dial` | Holds at 2 px at once |
| Patched through (fields) | CSS keyframes, steps(1) | :focus-within | A `--line` plug on a `--cord` lead appears 8 px out for 70 ms (`--d-plug`), then seated in the jack, held while focused | Seated at once |
| Error | Classes | Invalid submit | Hatched `--dial` bar under the field and the message on the reserved line; focus to the first bad field; cleared when valid | Same |
| The line opens (dialog) | GSAP sets on clip-path | Hours and numbers | A 2 px `--line` wire across the middle, then a third, two thirds, full, 60 ms per frame (`--d-frame`); content cuts in on the last frame. Closes back to the line in three frames | Instant |
| Dialled back (success) | setTimeout sequence | Valid submit | The four-digit call-back number dialled one key every 220 ms with its bars; display "Call back 19:30, number 4071"; the confirmation echoes name, contact, game, place and slot; focus on its heading; "Change this" restores the form | Display set at once |

## Adapting

1. **Number your questions like a menu.** Up to 9 branches with up to 9 questions each; give each `.branch` a `data-b` and `data-name`, each `.q` a `data-n` (branch digit + question digit), and matching `id`s. The script reads branches and ranges from the page.
2. **Map the colours, keeping their jobs.** Swap the bakelite tones for your object's material (ground, `--deep`, `--deepest`, `--lift`, `--shine`). Keep one hue for "connected" (`--line`) and one per branch. Re-check contrast for `--cord` on `--lift`, the tightest pair (4.6:1).
3. **Change the keys' captions** (Calls, Hints, Games, Join, Clear, Call me, Close) and their hidden branch names. Keep 0, star and hash as the three actions.
4. **The handset is a drawing on an 82 x 16 unit grid** at `--u` px a unit; redraw it as rects in the same grid (see Do not touch for the anchor).
5. **Retime** with the `--d-*` tokens. To remove the cord, delete the canvas and the cord module; the sticky keypad still works. To remove the self-dial on click, call `show()` instead of `autoDial()`.
6. **Copy:** questions under about 50 characters fit the display's three lines.
7. **In a framework,** keep the keypad, display and accordion as plain state (they work without the libraries) and port the matchMedia block as one effect with its cleanup.

| Token | Role |
|---|---|
| `--bakelite` | Page ground |
| `--deep`, `--deepest`, `--lift`, `--shine` | Bakelite tones: body, display and scrim, key faces and handset, handset highlight (surfaces only) |
| `--dial` | Text and key legends (10.5:1 on ground, 7.5:1 on lift) |
| `--cord`, `--cord-back` | Secondary text, rules and the cord (6.5:1 on ground); the far side of each coil loop |
| `--b1` ... `--b4` | Branch hues: cyan, yellow, mint, lilac (8.0, 8.9, 8.5, 7.0:1) |
| `--line` | Line open or connected: lamp, tone bars, display digits, focus, plug (10.3:1) |
| `--scrim` | Dialog backdrop, `--deepest` at 0.86 |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk |
| `--t-tiny` ... `--t-h2`, `--t-num`, `--t-key`, `--t-dsp`, `--lh-*` | Type scale: 12, 14, 17, 22, 28, clamp(46px, 5.4vw, 84px); numbers 30, legends 32, display 54 |
| `--cell`, `--s1` ... `--s8` | 8 px cell; spacing 4 to 112 |
| `--notch`, `--notch-l`, `--tap`, `--hit` | Stepped corners 4 and 8 px; 48 px buttons and fields; 44 px text actions |
| `--max-w`, `--u`, `--gutter`, `--bar`, `--key-w`, `--key`, `--sock`, `--dsp-h`, `--mini-h` | Content width, handset unit (4 px), cord lane (40 px), tone bar (12 px), key width (76 px) and height (48 to 72 px from the viewport height), socket height, display height, phone bar height |
| `--d-hold`, `--d-press`, `--d-hook`, `--d-ring`, `--d-plug`, `--d-frame`, `--d-dial`, `--d-lift`, `--d-wait` | 0.18, 0.14, 0.08, 0.08, 0.07, 0.06, 0.22, 0.16 s and 1.6 s, as in the Motion table |
