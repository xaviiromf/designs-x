---
title: House lights down FAQ
section: faq
subject: Questions and answers for the Kiln Street Open Autumn Finals (Friday 13 to Sunday 15 November 2026) at Kiln Street Arena, a fictional 2,400-seat esports arena in Sheffield, with the Rift Protocol 5v5 pro finals and the Iron Circuit 1v1 open bracket (both fictional titles).
aesthetic: The walk into an arena. A lit concourse in painted blockwork with blackout ink, then a wall of LED cells that switches the house lights off and stays on as the dark bowl's pointer-lit LED wall. An amber LED ribbon board runs along the top.
mode: dark
fonts:
  - Bitcount Prop Single (Google Fonts, variable wght 100-900 with ELSH, ELXP and CRSV), set at 400 with ELSH 0 so every element is a round LED dot. Used only on the ribbon board, the jump menu, the group signs and the group index, never below 20px
  - Signika (Google Fonts, variable wght 300-700 and GRAD -30 to 0), everything else. H2 700, questions 600, answers 400. GRAD -30 in the bowl
js: Scrubs an LED-cell cover that turns the lit concourse into the dark bowl and keeps the same grid as a pointer-lit LED wall, opens and closes answers and runs each opened answer's one-line fact across a sticky LED ribbon board, tracks the current group with a progress bar and a non-modal Jump to menu, and routes in-page links and URL hashes to the right answer with focus moved.
libraries: [GSAP 3.15 (ScrollTrigger, ScrambleTextPlugin), Lenis 1.3.26]
tags: [faq, accordion, disclosure, esports, arena, events, venue, led, dot-matrix, ribbon-board, canvas, led-wall, scroll-cover, section-spy, jump-menu, dark, gsap, lenis, detailed]
use_when:
  - A venue, event or tournament FAQ whose questions follow the visitor's day (before you travel, at the doors, inside, taking part).
  - Every answer has a short version that fits on a sign (a time, a price, a gate, a limit), so a board can carry it.
  - The page can lend the top of the section to one sticky band.
avoid_when:
  - Help centres with dozens of questions, or answers with no short version. A board line that cannot stand alone is noise.
  - Calm, clinical or formal brands (healthcare, legal, finance). A lit amber board reads as a live event.
  - Pages that already have a sticky header or sub-nav at the top of this section; two sticky bands compete.
---

## Why it works

**The bold idea: house lights down.** Between the Doors group and the Watching group sits an 80svh interlude: "Lights go down at 17:00 on Friday." near its top and "Everything below happens inside the bowl." near its bottom. As it crosses the viewport, a grid of LED cells (40px, 32px under 600px) switches on in a ragged wave from the bottom row up and eats the lit concourse ground until the page is the dark bowl (SC17, scrubbed to scroll). The second line is chalk, so it appears as its rows go dark; the first line turns from ink to chalk as the last rows go out. The same grid then carries on under the bowl as an LED wall: cells around the pointer warm up in three amber steps and cool down in about .15s (CU5). The cover and the cursor effect are one idea: you walked from the concourse into the arena, and the wall around you is lit. Everything is drawn on one canvas, opacity per cell only, with no DOM cells.

- **The ribbon board answers, quietly.** A 56px band (64px from 992px) sits sticky at the top of the section, drawn as the arena's LED fascia: a lattice of unlit amber dots with text in Bitcount Prop Single at ELSH 0, so each glyph is made of the same round dots. The font size is a whole number of pixels with a dot pitch of 0.1em (2, 3 or 4px), and the lattice is phased to start where the message starts. Opening a question scans that answer's one-line fact onto the board (16 steps in .6s) and it stays there: "Re-entry until 19:00, Gate 4", "Curfew 23:00, last tram 23:40". Everything else on the board is an instant swap: a 45% preview of a question's fact while a still mouse rests on it or the keyboard reaches it, the current group's name while nothing is open, and the event name above the first group. Only a click earns movement, so the board never competes with the LED wall.
- **One grid, three scales.** The cell grid is phased to the content edge, which is also where the board's dot lattice starts, so a 40px cell is exactly 10 board pitches on desktop. The cells, the board's dots and the Bitcount letters are the same LED module at three sizes.
- **The order is the weekend.** Groups follow the attendee's real sequence: tickets before you travel, the doors, watching in the bowl, playing on the side stage. The change of ground between Doors and Watching is true to the order of the weekend: the house lights go down when the first match starts, and the rest of the questions happen inside the bowl. That is what makes the cover a story rather than decoration.
- **Two grounds, one ink.** The concourse (`#E4DCDA`, painted blockwork under house lights) is lit. Its ink is the bowl's own black (`#0E1A1A`). In the bowl the text is the house-light colour. Amber (`#FFB23E`) appears only where an arena would have amber LEDs: board dots, the progress bar, the jump menu, the warm cells of the LED wall (mixed into the bowl at 5, 9 and 14%), and the focus ring on dark grounds. On the concourse the focus ring and the cross-reference tick are ink. This avoids default 2 (near-black with one acid accent): the dark half is earned by the story, and the accent is LED amber used only on LEDs.
- **Signage type, same weight in the dark.** Signika was drawn for wayfinding and signage, which is what an arena concourse runs on. Light text on a dark ground looks heavier, so in the bowl Signika runs at GRAD -30, which thins the strokes without changing widths, so questions keep the same apparent weight and no line reflows when you cross the line.
- **Accessible disclosures with independent rows.** Each question is an `h4` wrapping a `button` with `aria-expanded` and `aria-controls`. Closed panels are `inert`. Several answers can be open at once, so people can compare re-entry with wristbands. "Open all answers" makes find-in-page work across all fourteen. It is a label-swap button rather than `aria-pressed`, because its accessible name changes to "Close all answers".
- **Plain-JS core.** Disclosures, the board text, the spy, the progress bar, the jump menu, anchors and hashes all run whether or not the CDN loads. A blocked CDN adds `html.static`. The board then swaps instantly, anchors use native smooth scrolling, nothing is hidden, and the interlude is simply bowl-coloured: a hard change of ground, as under reduced motion and without JavaScript.
- **Defaults avoided, with reasons.** There are no eyebrows, no middle-dot meta lines (times are written as sentences), no arrows on links, no accent word in the H2, no fade-up on groups, and no search (search is faq-moving-company's idea). Bitcount is never a small data label.

## Do not touch

- The lattice maths. `--fs-board` must be whole pixels at 10x the dot pitch, `.msg` must keep `line-height: 1.2` (12 pitches, so two-line messages under 600px stay on the lattice), and `.board-dots` must keep its `background-position` formula. Change any of these and the lit dots sit between the unlit ones.
- `fact()` reads `.fact`. Every answer must start with a `<strong class="fact">` sentence of 34 characters or fewer (`runSelfTest` checks this). It must fit two lines of about 20 characters under 600px and one line above.
- The grid maths. One canvas, sticky inside `.cells-track` (absolute over `.house`), so it is only ever viewport-sized. Rows count from the top of `.interlude`; columns are phased to the content edge (`.wrap` left plus its padding), the same phase as `.board-dots`, so 40px = 10 board pitches. Cells are drawn in whole device pixels (DPR capped at 2) so lit cells have no seams. Wave priority is `50 * (rows - 1 - row) + 300 * random`, sorted; the pattern is kept across answer opens and rebuilt only when the grid changes.
- The interlude's two states. Its default CSS is the bowl colour with chalk text, which is what reduced motion, `html.static` and no-JS get. Only `.house.wave`, set by the motion branch, turns it into concourse and shows the canvas. Line 1 has an `aria-hidden` chalk twin for the crossfade; line 2 is chalk on purpose.
- `aria-hidden` on `.msg` and the canvas track; the real `h3` group headings; the sr-only plus `aria-hidden` split on the index labels, which scramble on load.
- `h4 > button[aria-expanded][aria-controls]`, `inert` on closed panels, and the plain-JS core outside the motion branch.
- The collapsed panel state lives in `@media (scripting: enabled)`. Panels start closed from first paint when scripting is on (no flash of fourteen open answers) and stay open when it is off. Do not move it under `html.js`, which is set at the end of the body.
- `scroll-margin-top` on `.group`, `.qa` and `.desk`. Lenis reads it, so anchors clear the sticky board with no offset in JS. `scroll-padding-top` on `html` keeps keyboard focus from landing under the board (WCAG 2.4.11); the native path adds both, so its jumps sit 16px lower.
- Contrast (WCAG): ink on concourse 13.16:1, ink-soft on concourse 5.61:1 (4.89:1 on the hover tint), chalk on bowl 13.16:1, haze on bowl 7.70:1 (5.78:1 on the pressed tint), amber on the board face 10.72:1, face on an amber fill 10.72:1, amber on bowl 9.90:1, haze on the warmest LED-wall step 5.86:1 and chalk 10.0:1 (the reason the top step is 14%), concourse on an ink button fill and bowl on a chalk fill 13.16:1. Amber on concourse is 1.33:1, which is why amber never appears there. The 45% preview (2.97:1) is decorative and duplicated in the answer. Rules are decorative at about 1.9:1.

## Motion

Detailed tier. Everything runs inside one `gsap.matchMedia` (motion, reduce, fine, wide). Lenis runs on GSAP's ticker (`autoRaf: false`, `lagSmoothing(0)`, `anchors: false`). In-page links go through `lenis.scrollTo` and move focus. Lenis feeds `ScrollTrigger.update` and stops while the jump menu is open. The cleanup removes the tick, the LED-wall loop and its listeners, drops `.wave` (back to the hard change), restores `lagSmoothing(500, 33)` and destroys Lenis. One ease family: expo.out for entries and opens, expo.in for closes, `steps()` only for LED moves, none for scrubs and scrambles. CSS durations live in `--d-*` tokens, which drop to 0 under reduced motion and which the script reads. Only the H2, the intro, the index links, Open all and the board text start hidden (opacity only, so the controls stay clickable), and only under `@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`. A 4s CSS failsafe reveals them if the script never runs, and `html.static` cancels them. Nothing interactive is hidden. Technique ids refer to `research/motion-techniques.md`.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Board warms up | LD2 (diegetic boot) | Load, after `document.fonts.ready` or 1.2s, t0 | Unlit lattice opacity 0 to 1, .3s steps(3) | Lattice shown |
| Event name scans onto the board | LD2 pixel etch | t0.10 | clip-path inset(0 100% 0 0) to inset(0), .6s steps(16) | Text shown |
| H2 | Plain fade | t0.45 | Opacity 0 to 1, .6s expo.out | Visible |
| Intro | Plain fade | t0.60 | Opacity 0 to 1, .6s expo.out | Visible |
| Index links, Open all | LD8 | t0.70 | y 6 to 0, opacity 0 to 1, .3s expo.out, stagger .06 | Visible |
| Index labels decode | TX4, the page's only scramble | t0.70 | ScrambleText .6s, ease none, chars abcdeghknoprstuvxz, speed .85, stagger .1, box width locked during the scramble | No scramble |
| Row rules draw | SC16 | First group at t0.90 if in view; each other group at top 88%, once | scaleX 0 to 1 from the left, .9s expo.out, stagger .06. Text is never hidden | Drawn |
| Progress under the board | SC11 (plain scroll listener) | Scroll through the section | scaleX = progress, no easing (Lenis already smooths) | Still tracks, because it is state |
| House lights down | SC17, the signature | Scroll: `.interlude` from top 70% to bottom 35%, scrub .3, ease none | One canvas, cells 40px (32px under 600px). Priority `50 * (rows - 1 - row) + 300 * random`, sorted; each cell's opacity runs 0 to 1 over 6% of the wave. Line 1 crossfades ink to chalk over progress .8 to 1. Rebuilt on ScrollTrigger refresh | No canvas: the interlude is bowl-coloured, a hard change |
| LED wall | CU5 | Mouse `pointermove` over the house (fine pointer); `pointerdown` for touch and pen; keyboard focus on a bowl question lights its left edge | Heat per cell, Chebyshev R 3, `heat = max(heat, 1 - d / R)`, decay `.92` per frame normalised to dt (half-life about .15s), three stepped levels as inset 2px squares. Runs on `gsap.ticker` only while the house is on screen and a cell is warm, then sleeps | None |
| Board shows the group | NV6 spy | A group crosses the 40-45% band (rootMargin -40% 0 -55% 0) while no answer is open | Instant swap | Instant swap |
| Fact on open | LD2 pixel etch | Click, Enter, Space, cross-reference, URL hash | Clear, then scan .6s steps(16), and hold. The only movement the board makes after load | Instant |
| Fact preview | Pointer-driven state | A real mouse move onto a question (not a row sliding under a still cursor, and not within 150ms of a scroll), or keyboard focus, after 90ms intent; leaving restores after 140ms | Instant swap at 45% opacity | Same |
| Answer opens and closes | CD6 | Question button | grid-template-rows 0fr to 1fr .6s expo.out, close .35s expo.in. Answer opacity 0 to 1 and y 6 to 0, .35s, delay .12. The vertical bar folds (scaleX 0) into a minus. Then `lenis.resize()` and `ScrollTrigger.refresh()` | Instant (answer transitions off too) |
| Open all / Close all | CD6 stagger + MI2 + HV2 + MI1 | Toggle | .03s per row; label swap .35s expo.out; underline sweep .45s; press .97 | Instant |
| Question row | HV4 (row variant) | Hover, focus-visible | Fill (text colour at 7%) scaleX from the entry edge .45s expo.out, leave .3s; plus turns 90deg (minus turns 180deg) .45s. Touch: `:active` fill at 12% | Fill appears, no turn |
| Index links | HV2 | Hover, focus-visible | Underline in from the left, out to the right, .45s. Touch: persistent underline | Static underline |
| Cross-references | HV2 + NV6 | Hover, focus-visible; click | Underline .45s; eased scroll, duration min(1.3, .65 + distance/4000), expo.out; focus moves to the target's button; 4px tick scaleY 0 to 1 by .3s, then one fade by 1.5s | Immediate scroll; tick shown for 1.5s with no animation |
| Jump to | MI2 + HV4 + MI1 | Click | Label swap and chevron 180deg .35s; list clip-path inset(0 0 100% 0) to inset(0) .45s expo.out, items y 8 and autoAlpha, stagger .04; close .25s expo.in. Escape, an outside click or focus leaving closes it; Lenis stopped while open | Instant |
| Jump menu items | HV3 | Hover, focus-visible | Amber wipe in from the left .35s, out to the right .3s expo.in, invisible reset on transitionend. Touch: `:active` fill | Colour swap |
| Info desk buttons, Jump to | HV4 + MI1 | Hover, focus-visible; press | Fill from the entry edge .35s, leave .3s; press scale .97 in .12s, release .4s expo.out. Touch: `:active` fill | Colour change, no scale |

Property exceptions to "transform, opacity, clip-path and filters": `grid-template-rows` for the accordion (the catalogue's CD6 recipe, no measuring), `background-size` for the HV2 underlines, and `color` on button labels. All are paint-only or a single grid track. The load scramble changes `textContent` on short, `aria-hidden` labels. The cover and the wall are canvas pixels, not layout. Nothing else animates layout.

## Adapting

1. Map the brand onto the colour tokens. Keep the roles: a lit ground and a dark ground that the cell cover joins, one ink shared by the concourse text and the dark ground, and one LED colour used only on the board. If your LED colour is lighter or darker, re-check it on `--face` and on `--bowl` (it is the focus ring there). Keep it off the light ground.
2. Write the facts first. Every answer starts with `<strong class="fact">`, a sign-length sentence of 34 characters or fewer, written the way a board would say it ("Doors Fri 16:00, Sat/Sun 10:30"). The board reads it, so there is nothing to keep in sync. If the copy is longer, lower `--fs-board` at that breakpoint, keeping it a multiple of 10px or another size where 0.1em is a whole pixel.
3. Groups are `section.group` elements in the order of the visitor's day. The spy, the jump menu (`#jump-list`) and the index read them by position, so add a link to both lists when you add a group. Move `.house` (the interlude plus the bowl) to wherever the real change of place happens, or remove the interlude and use one ground if there is none. The wave's length is the interlude's height (80svh) plus the trigger window.
4. Retime or remove motion. All CSS durations are `--d-*` tokens. The board scan is `--d-scan` (16 steps, on open only; see `scan`). The load sequence is the `tl` timeline. Delete a line to drop that step, and the `indexLabels` call to drop the load scramble. The cell size, the wave window and the wall's radius and decay are in the signature block of the script; keep the cell a whole multiple of the board pitch. To make the board static, set `--d-scan` and `--d-scramble` to 0s. The content still changes.
5. Fonts: if Bitcount fails, the Courier New fallback has no dots, but the board stays readable. Without Signika the system sans has different metrics, so long questions may gain or lose a line.
6. In a framework, render groups and answers from data (question, fact, answer HTML), keep the board as a single text node that a store writes to, and port the motion as one effect that returns the matchMedia cleanup.

| Token | Role |
|---|---|
| `--concourse` | Lit ground above the interlude (same value as `--chalk`: the house lights) |
| `--ink` | Text, rules, button fills and the focus ring on the concourse |
| `--ink-soft` | Group notes on the concourse |
| `--bowl` | Dark ground of the bowl and the colour of the lit cover cells |
| `--chalk`, `--haze` | Text and secondary text in the bowl |
| `--face` | LED module black: the board, the jump menu, the Jump to button's cut-out (spread `(board height - 44px) / 2`, so it never passes the board's edge) |
| `--ribbon` | Amber LED: board text and dots, progress, jump menu, LED-wall warmth (mixed into `--bowl`), focus ring on dark |
| `--led-off` | Unlit LED dots (amber at 13% on the face) |
| `--font-led`, `--led-axes` | Bitcount Prop Single and its axes (ELSH 0 for round dots) |
| `--font-text`, `--grad-dark` | Signika and its grade in the bowl (-30) |
| `--fs-small` ... `--fs-interlude` | Type scale: notes 15, body 17, lede 20, questions 18-24, H2 48-120, interlude 24-48 |
| `--fs-led-sign`, `--fs-led-index`, `--fs-led-menu` | Bitcount sizes: group signs 28-44, index 24, jump menu 24 |
| `--fs-board` | Board text: 20px under 768, 30px to 991, 40px from 992; the dot pitch is a tenth of it |
| `--sp-1` ... `--sp-10` | Spacing, 4 to 160 |
| `--gutter`, `--gap`, `--max`, `--measure`, `--radius` | Side gutter, column gap, content max 1240, answer measure 62ch, 2px LED-module corner |
| `--board-h` | Board height (56, 64 from 992); also the anchor offset through `scroll-margin-top` |
| `--ease-out`, `--ease-in` | expo.out and expo.in for CSS transitions |
| `--d-open` ... `--d-tick` | Durations: open, close, hover, leave, press, release, label swap, open-all stagger, board scan, scramble, cross-reference tick |
