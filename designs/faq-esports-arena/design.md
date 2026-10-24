---
title: Finals weekend centre-hung FAQ
section: faq
subject: Questions and answers for the Kiln Street Open Autumn Finals (13 to 15 November 2026) at Kiln Street Arena, a fictional 2,400-seat esports arena in Sheffield, with the Rift Protocol 5v5 pro finals and the Iron Circuit 1v1 open bracket (both fictional titles).
aesthetic: The arena concourse by day. Polished pale concrete, dark wayfinding ink, and one black four-faced centre-hung scoreboard whose red LED dots are the only lit surface on the page.
mode: light
fonts:
  - Bitcount Prop Single variable, wght 100 to 900, ELSH, ELXP, CRSV (Google Fonts), set at 400 with ELSH 0 so the elements are round LED dots. Only on the board, the LED band, the jump menu and the group signage, never below 20px
  - Host Grotesk variable 300 to 800 (Google Fonts), everything else. Questions at 600, body at 400, H2 at 800
js: Opens and closes answers, turns a CSS 3D centre-hung scoreboard to the group you are reading and writes each opened answer's one-line version onto its LED strip, tilts the board toward a fine pointer, flattens it into a sticky LED band under 992px, runs a non-modal Jump to menu, and routes in-page links to the right group or answer with focus moved. runSelfTest() runs on #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, ScrambleTextPlugin), Lenis 1.3.26]
tags: [faq, accordion, disclosure, esports, arena, events, venue, scoreboard, led, css-3d, section-spy, jump-menu, light, gsap, lenis, detailed]
use_when:
  - A venue, event or tournament FAQ whose questions follow the visitor's day (before you travel, at the doors, inside, taking part).
  - The organisation has a real physical object people recognise (a scoreboard, departure board, ticker) that can carry the current position.
  - Answers are factual and short enough that a one-line LED version of each exists.
avoid_when:
  - Long help centres with dozens of questions per group or search as the main way in. Four faces is the limit of the idea.
  - Calm, slow or clinical brands (healthcare, legal). A lit red board reads as a live event.
  - Pages that already carry a sticky header or another sticky sidebar on the right.
---

## Why it works

**The bold idea: the centre-hung turns to your question.** A four-faced scoreboard, drawn in CSS 3D with transforms only, hangs on two cables in columns 10 to 12 and stays sticky as you read. Each face belongs to one group (Tickets, Doors, Watching, Playing) and shows its name in red LED dots, with a lower strip underneath. As the section spy finds a new group, the board turns the shortest way to that face (rotateY of -90deg times the index, 0.9s expo.inOut). Opening a question writes its one-line answer onto the strip with a short scramble: "Re-entry to 19:00, Gate 4", "Last tram 23:40", "Entry £10, 256 players". The board is what an arena already uses to tell 2,400 people where they are, so here it tells you where you are in the answers, and gives you the short version of the one you just opened.

- **The order is the weekend.** Groups follow the attendee's real sequence: tickets before you travel, the doors, watching in the bowl, playing on the side stage. That is why a board that turns face by face as you read feels truthful rather than decorative.
- **Daylight, not esports-dark.** The ground is the concourse in polished concrete (`#C1D4D6`) with dark wayfinding ink (`#022429`). The board's LED faces (`#031919`) are the only dark surface and its red LEDs (`#FF2D1F`) the only saturated colour, so the eye lands on the board. This avoids default 2 (near-black with one acid accent) and the indigo-and-amber pairing already used in testimonials-youth-orchestra.
- **Dot-matrix only where an arena shows dot-matrix.** Bitcount with ELSH 0 renders round LED elements (checked by screenshot at 90px, ELSH 0, 50 and 100). It appears on the board, the band, the jump menu and the group signs, all at 20px or more, and nowhere as a small data label. Everything people read at length is Host Grotesk.
- **Accessible disclosures, independent rows.** Each question is an `h4` wrapping a `button` with `aria-expanded` and `aria-controls`. Closed panels are `inert` under `html.js` only, so without JavaScript every answer is open and readable. Several answers can be open at once, so people can compare re-entry with wristbands, and find-in-page still works once they open.
- **A five-dot LED plus.** The open and closed mark is five round dots in a plus; the two vertical dots go out (0.2s) when the answer opens. On hover and focus the dots light in a deeper red that still holds 4.08:1 on concrete.
- **The board is never the only source.** It is `aria-hidden`. Group names live in real `h3` headings, and each strip line is also written to a polite live region ("Board: Last tram 23:40").
- **Plain-JS core.** Disclosures, the jump menu, anchors and the spy run whether or not the CDN loads. A blocked CDN adds `html.static`: faces swap without turning, anchors use native smooth scrolling, and nothing is hidden.
- **Defaults avoided (reasoned).** No eyebrows, no middle-dot meta, no arrows on links, no accent word in the H2, no search or Open all toggle (those belong to faq-moving-company and faq-language-school), no fade-up on groups. Rules draw in, but text is visible from first paint.

## Do not touch

- The group order (the attendee's weekend) and one board face per group. Adding a fifth group breaks the four-faced board.
- `aria-hidden` on the board and the band, the real `h3` headings, and the `#board-live` region. Scrambles never reach a screen reader.
- Strip lines of 27 characters or fewer (two rows on the face; `runSelfTest` checks it).
- `h4 > button[aria-expanded][aria-controls]`, `inert` only under `html.js`, and the plain-JS core outside the motion branch.
- `scroll-margin-top` on `.group` and `.qa`. Lenis reads it, so anchors clear the sticky band with no extra offset in JS, and the no-library path uses the same values.
- The board's depth: `.tilt` is pushed back by half the board width so the front face sits at the column's true width, and the turned corners stay inside the column gap.
- Contrast: ink on concrete 10.61:1, ink-soft on concrete 5.28:1, ink on the row hover tint 9.37:1 (8.49:1 pressed), concrete on an ink button fill 10.61:1, LED red on a face 4.88:1 (4.59:1 on an unlit dot, the worst case), face on the LED wipe 4.88:1, `--led-deep` dots on concrete 4.08:1 (3.27:1 on the pressed tint). Rules are decorative at 2.18:1.
- Palette distance (CIE76): every hex is at least 3.4 from every other design's `:root` (nearest: concrete 3.40 from testimonials-mountain-hotel `#C4D0D6`) and at least 10.6 from testimonials-youth-orchestra.

## Motion

Detailed tier. Everything runs inside one `gsap.matchMedia` (motion, reduce, fine, wide). Lenis runs on GSAP's ticker (`autoRaf: false`, `lagSmoothing(0)`, `anchors: false`; in-page links go through `lenis.scrollTo` and move focus) and feeds `ScrollTrigger.update`. The cleanup removes the tick and listeners, restores `lagSmoothing(500, 33)` and destroys Lenis. Lenis stops while the jump menu is open. The load has no hidden starting states in CSS: the timeline uses `from()` tweens, so a failed script leaves everything visible. Only transform, opacity and clip-path animate, plus the catalogue's `grid-template-rows` accordion. The native cursor is never hidden. One ease family: expo.out for entries and opens, expo.in for closes, expo.inOut for the board turn, steps(3) for the LED warm-up, none for scrambles. Durations live in `--d-*` tokens that the script reads. Technique ids refer to `research/motion-techniques.md`.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| H2 lines rise out of their masks | TX1 | Load, after fonts (1.2s cap), 0s | 1.0s expo.out, stagger .1 | Visible |
| Cables drop from the roof (992px and up) | SC16 | Load, 0s | scaleY 0.6s expo.out | Static |
| Board text warms up | LED warm-up (opacity, steps) | Load, 0.15s | 0.45s steps(3) | Visible |
| **Board turns once through all four faces and settles on Tickets** | Signature | Load, 0.35s | 4 quarter turns of 0.3s expo.inOut, 0.4s apart, done by 1.85s | Rests on Tickets |
| Strip writes its line | TX4 | Load, 1.95s (0.75s on the band) | 0.5s, ease none | Plain text |
| Intro fades in | opacity only | Load, 0.35s | 0.6s expo.out | Visible |
| Group links settle | LD8 | Load, 0.5s | y 6 to 0, opacity .35 to 1, 0.3s, stagger .06 | Visible |
| First group's rules draw from the left | SC16 | Load, 0.8s | 0.9s expo.out, stagger .06 | Static |
| **Board turns to the group you are reading** | NV6 spy (IntersectionObserver, -40% / -55% root margin) | Scroll | Shortest turn, 0.9s expo.inOut; name and strip scramble 0.5s | Face swaps instantly |
| Later groups' rules draw | SC16 | Group top at 88%, once | 0.9s expo.out, stagger .06 | Static |
| Board tilts toward the pointer | CU3-style tilt on one 3D object | Pointer move, fine pointer, 992px and up | Up to ±6deg, `quickTo` 0.5s expo.out, rect cached; levels on window leave | Off |
| Board leans toward a tap | Touch equivalent | Tap on the board, coarse pointer, 992px and up | Same tilt, levels after 0.6s | Off |
| Question row fill enters from the nearest edge | HV4 (row variant) | Pointer enter, focus-visible | 0.45s in, 0.3s out, expo.out | Instant |
| LED plus lights and swells | Dot light | Hover (fine), focus-visible | Colour 0.2s, scale 1.2 in 0.45s | Instant |
| Answer opens / closes | CD6 | Click, Enter, Space | Open 0.6s expo.out, close 0.35s expo.in; answer fades up 6px in 0.35s after .12s; `lenis.resize()` and `ScrollTrigger.refresh()` on transitionend | Instant |
| Vertical dots go out | Icon state | Toggle | 0.2s linear | Instant |
| Opened answer written onto the strip | TX4 | Toggle open | 0.5s, ease none, chars `abcdeghknoprstuvxz0123456789` | Plain text, still announced |
| Group links underline sweep | HV2 | Hover (fine), focus-visible | 0.45s, in from the left, out to the right | Static; persistent underline on touch |
| Cross-reference links | HV2 over a resting hairline | Hover, focus-visible | 0.45s | Static |
| Cross-reference jump | NV6 eased anchor + tick | Click | Opens the target, `lenis.scrollTo` for min(1.3, .65 + distance / 4000)s expo.out, focuses its button; 4px tick draws then fades once over 1.5s | Instant scroll; tick shown 1.5s, then removed |
| Jump to / Close label swap, chevron turns | MI2 | Click | 0.35s expo.out | Instant |
| Jump menu opens / closes | Clip-path reveal + item rise | Click; Escape, outside click or focus leaving closes | Open 0.45s expo.out, items y 8 stagger .04; close 0.25s expo.in | Instant |
| Jump menu items | HV3 highlighter wipe | Hover (fine), focus-visible; `:active` on touch | In from the left 0.35s, out to the right 0.3s expo.in, invisible reset | Instant |
| Buttons fill from the entry edge | HV4 | Pointer enter / leave, focus-visible, `:active` on touch | 0.35s in, 0.3s out | Instant colour |
| Buttons press | MI1 | `:active` | scale .97 in 0.12s, release 0.4s expo.out | No scale |

The LED text glow (a red `text-shadow` on every lit string) was built and then removed as the one accessory too many: it softened the dots and cost legibility on a 4.88:1 pair, and the dot texture already says "LED".

## Adapting

Change the `:root` tokens first. `--concrete` must keep `--ink` at 4.5:1 or better (in practice far more) and `--ink-soft` at 4.5:1. `--led` must hold 4.5:1 on `--face` and on `--led-off`; `--led-deep` must hold 3:1 on `--concrete` and on the pressed tint, because it marks state. `--frame`, `--led-off`, `--rule` and the tints are `color-mix` values and follow automatically.

Copy: each group needs a short name (8 characters or fewer keeps it on one line of the face), a note and a `data-strip` default; each question needs a `data-strip` line of 27 characters or fewer that really is the short answer. Keep four groups, or change the board to a three- or six-sided prism (`--i` times 120deg or 60deg, with `nearest()` and the load loop updated). Answers can grow freely; the accordion measures nothing.

Retime motion in the `--d-*` tokens (CSS transitions and the script both read them) and `--ease-out` / `--ease-in`. The load timeline is one `tl` in the script; drop the `for` loop to skip the turn-through and the board simply rests on the current face. To remove the tilt, delete the pointer block at the end of the motion branch. To remove all library motion, delete the four CDN `<script>` tags: the page adds `html.static` and everything still works.

| Token | Role |
|---|---|
| `--concrete` | Page ground; text on ink button fills |
| `--ink` | Text, signage, rules base, button borders and fills, focus ring on concrete |
| `--ink-soft` | Group notes, cables |
| `--face` | LED module black: board faces, sticky band, jump menu |
| `--led` | Lit LED text, band button, menu wipe, focus ring on dark |
| `--led-deep` | The red where it marks concrete: lit question dots, cross-reference tick |
| `--led-off`, `--frame`, `--rule`, `--tint`, `--tint-press` | Derived: unlit dots, board frame, row rules, row hover and press |
| `--font-led`, `--font-text`, `--led-axes` | Bitcount Prop Single (ELSH 0 = round dots), Host Grotesk |
| `--fs-small` to `--fs-led-menu` | Type scale; `--fs-h2` and `--fs-led-sign` are fluid |
| `--sp-1` to `--sp-10`, `--gutter`, `--gap`, `--max`, `--measure` | 4px spacing scale, side gutter, column gap, 1240px max, 62ch answers |
| `--cable`, `--strip-h`, `--band-h` | Rigging height, the face's lower strip, sticky band height (also the anchor clearance under 992px) |
| `--ease-out`, `--ease-in`, `--d-*` | Motion curves and durations |
