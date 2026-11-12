---
title: Privacy helpdesk contact with ticked glyph rain
section: contact
subject: "The contact section of Kerckhoffs Desk, a fictional volunteer digital-security helpdesk in Lisbon for journalists, organisers and small newsrooms: three routes (Signal, encrypted email with a checkable key fingerprint, an open evening in person) and a short first-message form that sends nothing."
aesthetic: A deep teal ground with three darker wells of pale aqua glyph rain behind the three routes. The rain never runs on its own; it is the desk's traffic, moved one cell at a time by scroll, pointing, typing and sealing. Yellow is key material, pink is urgency, and square Handjet modules build every glyph.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, at ELSH 2 and ELGR 1. The H2 at 700, the dialog's step numerals at 700, and the rain atlas, rasterised once in canvas (500 for rain glyphs, 700 for typed plaintext glyphs).
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything else, at 400 for body and 600 to 700 for headings, links, buttons and labels; tabular-nums on the fingerprints, the counter and the hours.
js: Draws three bands of glyph rain on one canvas that advance only on ticks (scroll, a lane's hover or focus burst, every typed character, the load, a sealed message), drops each typed character into the email lane as plaintext that turns to ciphertext, locks the message's sample fingerprint into the rain on submit, and runs the form, the ciphertext strip, the copy button and the key-check dialog in plain JavaScript (nothing is sent).
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [contact, privacy, security, helpdesk, signal, pgp, fingerprint, canvas, glyph-rain, form, dialog, dark, gsap, lenis]
use_when:
  - A privacy, security or support service whose contact routes differ in safety, and the page has to make the safest one obvious.
  - A contact section with a key, code or fingerprint people must check by eye, next to a short first-message form.
  - A brand that can stand for traffic or messages passing through it, so a field that moves only when the visitor acts says something true.
avoid_when:
  - The contact section must be quiet and small; three rain wells need vertical room and the section is long by design.
  - Light or warm brands; the teal wells and pixel display face are loud.
  - Pages that already run a canvas or pointer effect nearby; two moving fields compete.
---

## Why it works

**The one bold idea: the rain is the traffic.** Three wells of glyph rain stand behind the three routes, one band per route. The rain has no idle loop. It moves one 12px cell per tick, and a tick only happens when something passes through the desk: every 12px of page scroll (down falls, up rises, because each cell is a pure function of the band's tick count), a lane being pointed at or focused (20 ticks a second for that lane alone), a typed character (two ticks for every band) and a sealed message (ten quick ticks). At rest the rain is a still picture. That is the meaning: a helpdesk that only sees traffic when someone writes.

- **Typing is visible as encryption, not decoding.** Each character typed in the message field drops into the email band as an inverse tile: a solid `--plain` square two cells wide with the character cut out in the well colour, for its first four cells of fall. Then it is the character in `--plain` on the well for two cells, then atlas glyphs in `--turn-1`, `--turn-2` and finally `--cipher` over the next six, with a cipher tail like any other head. That gives each character about twelve cells of visible life. Characters fall one cell for every two ticks, and each keystroke gives two ticks, so a typed sentence stands as a descending diagonal of bright tiles across two-cell lanes. The tiles enter where the visitor can see them while the message field has focus. That is the open field under the email panels when at least ten rows of it are on screen (1366x650, 1280x600). Otherwise it is the email band's typing gutter, a strip of open rain to the right of its panels (7 cells at 1440 and wider, 5 below), just inside the top of the viewport (1440x900). On tablets and phones the tiles go to the wire. No text on the page is ever animated into or out of readable words; deleting removes nothing from the rain. Under the field, the ciphertext strip shows one cipher block per character in groups of four, up to three lines, then "and 212 more".
- **Sealing locks the rain.** On a valid submit every band gets ten quick ticks, then the bottom rows of the email band (or the bottom of the part of it on screen) lock, one row at a time from the bottom, into ten groups of four characters: a sample fingerprint of the message (five FNV-1a passes, labelled as not cryptographic). The confirmation repeats it as text, echoes topic, urgency and reply route, says nothing was sent, and stands at the bottom of the form column, beside the locked rows. If "I am at risk right now" was chosen, the Signal route comes first in `--urgent`. "Write another message" releases the rows.
- **The wire (tablet and phone).** Below 1200px the email band is far above the form, so a short row of wells, six cells tall (48px on phones, 72px on tablets), sits just above the message field. Typed tiles fall into it, and on submit an identical wire above the confirmation's fingerprint takes the lock row. It sits above the field, not pinned, so it never competes with the on-screen keyboard.
- **Radios are diamonds.** The three urgency options are stepped pixel diamonds drawn with hard 2px box-shadow squares: a hollow ring at rest, a solid inner diamond when chosen. A single choice reads as a single choice. The real input sits transparent on top, so its focus ring is never clipped, and each label row is 44px tall.
- **Text never sits on rain.** Every lane is a text panel on the teal ground standing in its band, with a three-cell strip of open rain to its left, open rain above it, between the email panels and below them, and one empty column between bands so each reads as its own channel. The headline plate covers the top of the first two bands; the third band rains from the top edge beside it, so rain is in the first screen at 1440x900, 1366x650 and 1280x600. On phones the lanes stack and each keeps a five-cell band beside its heading.
- **Colour jobs.** `--teal` is the ground and every panel. `--well` (a darker teal) is only the rain's wells and the scrim. `--plain` is everything you read, the typed glyphs and the locked fingerprint, and the inverted lane plate. `--mist` is secondary text and rules. `--cipher` is ciphertext only: rain heads and the strip, never readable text; `--rain-1..3` are its tail steps and `--turn-1..2` the plain-to-cipher steps, canvas only. `--key` is key material and what opens things: the desk's fingerprint, the primary button, focus rings, the shackle, the deadbolt. `--urgent` is urgency only: the at-risk option, the lines that point to Signal and the confirmation's Signal-first block. `--fault` is errors only.
- **Honest copy.** The form's hint says once, in bold, that the page is a design sample and sends nothing, and what the real desk would do. People in danger are pointed to Signal in three places, all pink. The address uses the reserved `.example` domain.
- **Different from the nearest ledger entries.** `contact-hackerspace` is a radar that pings under the pointer; here nothing follows the pointer, and the field is a tick-driven glyph engine. `cta-indie-game` lights cells in a wake that decays on its own clock; this rain has no clock at all and never decays, it only advances or reverses by ticks. `faq-handheld-clinic` reveals by dither thresholds; nothing here dithers.
- **Semantics.** A `section` with `aria-labelledby` on the `h2`; the routes are an `ol` of lanes with `h3` plates; the fingerprint is a list of ten groups with an `aria-label`; the form uses labels, a `fieldset` and `legend` for urgency, reserved error lines, `aria-invalid` and `aria-describedby` merged with each field's help text; the dialog is a native `showModal()` with its own `h2`.

Deviations from the brief, and why:

- **The bands are full height, but the headline plate covers the top of the first two.** The headline and lede are body-sized text and must sit on solid ground; the third band shows the full height beside them.
- **Typed characters enter where the band is open and on screen, not at the section's top.** The top of the email band is under the headline and its columns are under the panels. They enter the open field below the panels, or the email lane's typing gutter beside them, or the wire on tablets and phones. The two-cell lanes are cycled in order.
- **The fresh tile is two cells square, and typed characters fall at half the rain's speed.** At one cell, at full speed, only two tiles were ever on screen and they could not be told from rain heads. The rain itself still gets two ticks per keystroke.
- **The email lane is wider than the other two** (grid 10 : 13 : 10), so its panel keeps the same text width while it gains the typing gutter.
- **The lock rows sit at the bottom of the email band that is on screen.** After focus moves to the confirmation, the band's true bottom can be below the fold; the lock plans its rows against the viewport bottom (never above the open field) so the visitor sees it happen.

## Do not touch

- **No idle loop.** The runner is added to `gsap.ticker` only while ticks are due or a lane is hot, and removed when idle or off screen (IntersectionObserver). Scroll ticks are applied in one `requestAnimationFrame` per change. Do not add a timer that advances the rain.
- **The rain is a pure function of tick counts.** A cell is lit when `(phase + T - r) mod P < L`, and its glyph is `hash(column, row, drop)`. That is what lets scroll run it backwards exactly. Keep T integer and keep the hash.
- **Panels are opaque and in `[data-cover]`.** The script reads those rectangles to find each column's open field. A transparent panel puts rain behind body text.
- **One `--cell` for canvas and spacing.** The canvas reads `--cell` (12px, 8px under 600px) and `--rain` (full, block, strip) at build time; the media queries change both together.
- **Clip-path only on inner spans.** The notch is on `.face`, `.inner`, panels and the dialog rim, never on `<button>` or `<a>`, so the 2px `--key` focus outline is never clipped. The shackle sits behind `.face` (z-index 0 under 1), which is how it disappears into the body.
- **Hidden states only under `html.js:not(.go)`** (the lane panels during the load). Without the libraries nothing is hidden, the rain is a still frame and typing still ticks it in one redraw per keystroke.
- **`--cipher` never carries readable text.** The "and 212 more" label is `--mist`; the locked fingerprint and the confirmation fingerprint are `--plain`.

## Motion

House stepping: everything moves in whole cells or `steps()`; colour changes are instant; nothing in the file uses a soft easing curve. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`); touch keeps native scrolling. The load waits for Handjet (race with `--d-wait`, 1.5s) and for a visible page. Everything is built inside `gsap.matchMedia` (motion, reduce, fine); its cleanup removes listeners, the runner, the observer, delayed calls and Lenis.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Load rain | Twelve ticks, all bands | Fonts ready and page visible | 12 ticks over `--d-load` 0.8s (one every 67ms), from T = -12 to the resting T = 0 | Drawn at rest, no ticks |
| Lane panels cut in | `visibility` hard cut | After the load ticks | Left to right, `--d-cut` 0.2s apart, both email panels together | Visible |
| Scroll rain | One tick per 12px (`--scroll-tick`) | Page scroll (Lenis or native touch) | Down falls, up rises; one redraw per frame | Off: still picture |
| Lane burst (pointer) | That band alone at 20 ticks/s (`--d-burst` 0.05s) | pointerenter on the lane, until pointerleave | Runs only while hot and on screen | Off |
| Lane burst (keyboard) | Same | focusin with `:focus-visible` inside the lane (its link, Copy, How to check) | Until focus leaves the lane | Off |
| Lane burst (touch) | Same | pointerdown, pointerType touch | `--d-touch` 1s | Off |
| Heading plate inverse | Instant class/`:hover`/`:has(:focus-visible)` | Same as the burst | Plain ground, teal text, held for the burst | Instant (also without the libraries) |
| Typed character | Canvas drop: the open field under the email panels, the typing gutter beside them, or the wire (tablet and phone) | Each inserted character in the message field (paste capped at 24) | Drawn at once as a two-cell inverse tile; two rain ticks per character at `--d-type` 0.025s apart; the character falls one cell per two ticks: tile 4 cells, `--plain` glyph 2, then `--turn-1`, `--turn-2`, `--cipher` over 6, swapping glyph every two cells | Same states, two ticks in one redraw per keystroke |
| Ciphertext strip | DOM blocks from the canvas atlas | input | Instant, groups of four, three lines, then "and N more" | Same |
| Button hover: the shackle closes | `transform` transition, `steps(2, end)` | hover, focus-visible, press | 0 to 12px in `--d-shackle` 0.12s: from 4px proud to seated | Instant |
| Button press: the key turns | Class `.is-down` | pointerdown, Enter or Space | Pip jumps 12 to 3 o'clock and the face inverts; held at least `--d-press` 0.14s | Same, instant |
| Text link: sealed | `clip-path` keyframes, `steps(1, start)` | hover, focus-visible; touch press held `--d-tap` 0.2s | Side walls at 0, top at half of `--d-seal` 0.16s; box drawn outside the text | Box shown at once |
| Field focus | Instant border and outline | focus | `--key`; `--fault` border when invalid | Same |
| Dialog in: the deadbolt | CSS keyframes under `html.fx` | How to check our key | Panel from -16px in `steps(2)` over `--d-dlg-in` 0.16s, then the 12px bolt thrown 26px into the strike plate in `steps(2)` over `--d-bolt` 0.16s | Bolt shown thrown, no motion |
| Dialog out | Same | Close, Escape, backdrop press | Bolt withdrawn in two steps (`--d-bolt`), then the panel steps 16px left (`--d-dlg-out` 0.12s) and closes; a forced close calls `settle()` | Instant close |
| Success lock | Ten ticks, then rows | Valid submit | 10 ticks `--d-quick` 0.04s apart, then rows lock from the bottom every `--d-lock` 0.09s, in the email band (desktop) or in the wire above the confirmation's fingerprint (tablet, phone) | Ticks and lock in one redraw |
| Radio choice | Instant pixel state | change | Hollow stepped diamond to a solid inner diamond, colour cut to `--plain` (or `--urgent`) | Same |
| Release | Redraw | Write another message | Locked rows cleared, rain continues from its tick | Same |
| Copy confirmation | Instant label swap | Copy the fingerprint | "Copied" for `--d-copied` 2.4s, with a polite live line | Same |

## Adapting

1. Keep the meaning: the field must move only when the visitor's traffic moves it. Map your routes onto the three lanes (`.lane`), each with an opaque `[data-cover]` panel. `EMAIL` in the script names the lane that receives typing and the lock, and it is the lane with the `--gutter-r` padding. Keep the two `.wire` rows for tablets and phones.
2. Map the palette by job, not by look: a ground and its well, a readable plaintext, a ciphertext hue that never carries text (recompute `--rain-1..3` as 55%, 32% and 16% of it over the well, and `--turn-1..2` between plain and cipher), one key hue for primary action and focus, one urgency hue, one error hue. Check AA against the ground.
3. Change the atlas in `CH` and `BLOCKS` (4 by 5 module patterns). Keep hex digits in `CH` if you keep the lock.
4. Retune the density with `L` and `P` in `build()`; retime with the `--d-*` tokens; the scroll step is `--scroll-tick`.
5. Replace the copy, the fingerprint list, the Signal number and the address; keep the honest form hint if nothing is sent.
6. In a framework, render the markup statically and port the script as one effect that returns the `gsap.matchMedia` cleanup, plus the plain-JS flows.

| Token | Role |
|---|---|
| `--teal` | Ground, panels, fields, text on bright faces |
| `--well` | Rain wells; the scrim (`--scrim`, 88%) |
| `--plain` | Text, typed glyphs, locked fingerprint, inverted lane plate (11.4:1) |
| `--mist` | Secondary text, rules, field and outline-button borders (6.9:1) |
| `--cipher`, `--rain-1..3` | Ciphertext: rain heads and the strip (8.7:1), and its three tail tones (canvas only) |
| `--turn-1`, `--turn-2` | The plain-to-cipher steps of a typed glyph (canvas only) |
| `--key` | Fingerprint, primary button, focus, shackle, bolt (9.0:1; teal on it 9.0:1) |
| `--urgent` | At-risk option and the lines to Signal (6.3:1) |
| `--fault` | Errors (5.4:1) |
| `--font-display`, `--font-text`, `--modules` | Handjet at ELSH 2, ELGR 1, and Host Grotesk |
| `--t-small` ... `--t-h2`, `--t-fp`, `--lh-body` | Type scale: 13, 16, 18, 20, fingerprint 18, clamp(42px, min(4.6vw, 9svh), 72px) |
| `--cell`, `--s1` ... `--s7`, `--pad` | The 12px rain cell (8px under 600px) and spacing in half and whole cells |
| `--strip`, `--gutter-r`, `--rain-gap`, `--rain-foot`, `--rain` | Open rain left of panels (3 cells, 5 on phones), the email lane's typing gutter (7 cells, 5 below 1440px), above the lanes, below them, and the band layout mode |
| `--blk` | Block size of the ciphertext strip (12px) |
| `--notch`, `--tap`, `--hit` | Stepped corner (4px, 12px on the dialog), button and field height 48px, minimum target 44px |
| `--max-w`, `--form-w`, `--gutter` | Content width 1392px, form column clamp(340px, 27vw, 440px), side gutter |
| `--scroll-tick` | Scroll distance per rain tick (12px) |
| `--d-*` | Every duration the CSS and the script use (shackle, press, tap, seal, dialog, bolt, load, cut, type, burst, touch, quick, lock, copied, wait) |
