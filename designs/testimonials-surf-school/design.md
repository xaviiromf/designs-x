---
title: What people told us on the sand
section: testimonials
subject: Testimonials for Ola Mansa, a fictional surf school on La Puntilla, the beginner beach in Pichilemu, Chile, collected from beginners, families and surfers coming back after years away.
aesthetic: A line-up waiting for a set. Salt-white cards with heat-transfer lycra numerals ride a drawn swell over grey volcanic sand. Condensed Mohave carries the numbers and Latinotype's Sanchez slab carries the voices.
mode: light
fonts:
  - Mohave 600, 700 (Google Fonts)
  - Sanchez 400, 400 italic (Google Fonts; Latinotype, Chile)
js: Rolls sets of swell under a scroll-snap row of testimonial cards, opens full notes in a dialog, adds submitted notes to the front of the row, and runs the load and scroll choreography. runSelfTest() runs at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [testimonials, detailed, gsap, lenis, scroll-snap, svg, wave, dialog, form, surf, sport, condensed-sans, slab-serif, light]
use_when:
  - Testimonials come from a few distinct groups, and something real and visible tells the groups apart (a lesson level, a ticket class, a team colour, a membership tier).
  - The subject has a motion people already know (swell, wind, a queue, traffic) that can carry the cards instead of decorating them.
  - There are 6 to 15 short quotes, each with a longer version worth a dialog, and visitors may add their own.
avoid_when:
  - Quotes are long (over about 240 characters) or must be compared side by side. Cards move while a set passes.
  - The page cannot have ambient motion at all. The stop control and reduced-motion path help, but the sets are the point.
  - There are only two or three testimonials. A still layout serves them better.
---

## Why it works

**The bold idea: sets roll through the line-up.** Surfers waiting for waves sit still on their boards while the swell travels under them. The nine notes sit in one row like that. A single drawn swell line (neoprene, 1.5px) runs under the row from edge to edge. Every so often a set of three crests travels along it from the sea side (left) toward the beach (right), at about 140px/s. Each card rises over a crest, drops into the trough behind it and tilts with the slope. The middle crest of the set is the tallest. Then about 9 seconds of flat water follow, the line lies straight and every card sits level and still. The cards never travel. The water moves under them.

- **The central fact is the lycra.** Every student at the school wears a numbered lycra so instructors can call them in the water, and its colour is the lesson group. The number ranges encode the group: 1 to 15 yellow for the beginner course, 16 to 28 pink for family mornings, 29 to 40 blue for people coming back after years away. Each card's band is that lycra, with its numeral and a full sentence-case label ("Yellow lycra, beginner course"). Readers learn the system in the intro and the form's radio options ("Yellow lycra, numbers 1 to 15"). A new note gets the next free number in its group's range: "Thanks, Camila. You're lycra 13 in the line-up."
- **One function draws the water and moves the cards.** `swellY(s, lam)` gives the height of the set at distance `s` behind its front. The swell is one long SVG path (flat, the set, flat). It is built once per resize and only ever moves by its transform: `translate` carries the set along, and `scale(1, a)` carries the amplitude, so the path's `d` never changes per frame. Each card reads the same function at its own centre, taken from cached `offsetLeft` minus the row's `scrollLeft`, so the line and the cards cannot disagree. Tilt is half the water's slope angle, because a 340px card spans most of a crest and rides flatter than the water under its centre. It is capped at 3deg.
- **The cards ride above the line, not on it.** They float `--ride` (20px) above the swell. If they sat exactly on it, they would cover all of the line except the 24px gaps. With the gap the line reads as the water surface across the whole width, and the cards visibly follow it.
- **The row is native scroll-snap at every width.** There is no drag rail, no clones, no wrap and no auto-drift. Touch, trackpad, arrow keys, Tab and the Previous and Next buttons all just scroll the row. Moving the row carries cards through the swell, which stays in place on screen, so they rise and settle as they pass a crest.
- **The card you are reading holds still.** On hover (fine pointers) or keyboard focus, that card's calm factor eases from 1 to 0 over 0.6s and it goes level and still, while the set keeps passing under the others. A 2px outline appears at once. There is no lift and no dimming of the other cards.
- **The reprise closes the loop.** After someone adds a note, "See my note in the line-up" scrolls back up. Their card drops onto the front of the row, the words of their quote settle into place, and a set is sent at once so the newcomer is the first card it lifts. Focus moves to the new card's Read button.
- **Palette from La Puntilla.** `--sand` #B4B2AA is the grey volcanic sand of Pichilemu: neutral, not cream. `--salt` #FAFBF8 is used for card faces, the dialog and inputs. `--neoprene` #1C2630 is used for every piece of text, every line, outline and focus ring, and every button fill. The three lycra colours are used only as group colour (card bands, radio swatches, the dialog band). They are a fluoro lemon-lime competition yellow (#DDF23A), zinc-stick pink (#FF8FB5) and lycra blue (#5BA8E3). Neoprene is 7.2:1 on sand, 14.8:1 on salt, 12.3:1 on yellow, 7.2:1 on pink and 6.0:1 on blue, so ink sits directly on every band. There is no grey secondary text: hierarchy comes from size, weight and italic.
- **Two clearly distinct families.** Mohave 700 and 600 is a condensed sans that echoes the cut vinyl numbers on a lycra. It is used for the display heading, the tabular numerals (Mohave has `tnum`), names, labels and buttons, always in sentence case. Sanchez, a warm low-contrast slab from Chilean foundry Latinotype, carries the voices: quotes, body and dialog notes. Its italic is used for meta lines, hints and errors.
- **Structure is information.** Radii are deliberately unequal: cards 4px, radio options 8px, buttons 6px, inputs 0 with only a baseline. The baselines are the fields (S3 draws them in when the form arrives). There are no shadows anywhere. The dialog's conditions are written in words ("0.7 m at 9 s, light offshore, low tide 08:10"). Errors carry a neoprene "!" mark as well as their text, so they never look like hints.
- **Choices against the collection's defaults.** The family colour began as high-vis orange and became pink, so it does not read as terracotta next to a slab. The cards avoid the SaaS kit: no shadows, no shared radius, and each card is told apart by its band, its number and its place on the swell. The lycra numerals are big numbers, but they are identifiers people wear, capped at 72px and always paired with a label, never a hero stat. TX2 is the only text effect, used for the heading, the form heading, the dialog name and the new card's quote.

### Notes for adapters

- **Pause.** "Stop the swell" (WCAG 2.2.2) flattens the line and every card over 0.8s and holds the set where it is. "Let the swell run" brings the amplitude back. The button swaps its visible label (MI2) and does not also use `aria-pressed`, because a toggle whose label changes should not announce a pressed state as well.
- **Sleep.** The set clock stops while the line-up is off screen (a ScrollTrigger toggle). Hidden tabs stop GSAP's ticker, and the frame delta is capped so nothing jumps on return.
- **Header breakpoint.** The heading and intro become a 7/5 grid from 1024px. At 768px the intro was taller than the two-line heading and left it floating.
- **The cursor follower was removed** as the accessory that came off last. Its "Read" disc covered the label it repeated. The pointer response is the card going level under the pointer and the button fills that enter from the side the pointer came in.
- **Without JavaScript** the row scrolls natively, the line is straight and all nine quotes are visible. The Read buttons carry `commandfor` and `command="show-modal"`, so browsers with invoker commands still open the notes. The form is disabled with the note "Adding a note needs JavaScript." **If the CDN is blocked**, the plain script still runs (dialogs, Previous and Next, the form and its result) and nothing is hidden. Only the motion is missing.

## Do not touch

- `swellY` drives both the line and the cards. Do not give the cards their own wave, and never rewrite the path's `d` per frame. Rebuild it only in `measure()`.
- Card centres are cached in `measure()` (on resize and after a card is added). The ticker reads only cached numbers and the cached `scrollLeft` from a passive scroll listener. Do not add rect reads to the ticker.
- The number ranges and their colours, and the full label in every band. Colour is never the only signal.
- The stop control, the off-screen sleep and the 3deg tilt cap. Hover and keyboard focus must keep holding a card level.
- The native scroll-snap row. A transform rail would break touch, keyboard and find-in-page, and duplicate the drag rails elsewhere in the collection.
- `data-lenis-prevent-horizontal` on the row, so horizontal trackpad gestures scroll it natively while vertical wheel still smooth-scrolls the page. Also `data-lenis-prevent` on dialogs, and `lenis.stop()` while one is open.
- Hidden start states exist only under `html.js`, which the script adds only after GSAP, ScrollTrigger, SplitText and Lenis have loaded.
- `--ride`. Cards sitting directly on the line hide it.
- The new card's drop stays inside the row's top padding (`--row-pt`), because the scrolling row clips anything above it.

## Adapting

Start with the colour tokens and the three groups. A group is a `[data-group]` value with a `--band` colour in CSS, an entry in `GROUPS` at the top of the script (number range, band label, lesson name) and a radio option in the form. Keep the band label a full sentence, and keep ink contrast on each band at 4.5:1 or better.

Copy: keep quotes under about 200 characters on the card, and put the rest in the dialog. Names may run to two lines (the cards stretch to equal height and the names align at the bottom). Meta lines say place and when, not the group, because the band already says that.

Retiming and removing motion:

- **Sets:** `--swell-speed` (px/s), `--swell-lull` (s), `--swell-amp` (px; 14px under 768px), `--swell-len` (wavelength in card steps) and `--tilt-max` (deg) are read by the script on resize. For a still line with no sets, set `--swell-amp: 0px` and remove the stop button.
- **Load sequence:** the offsets live in the `tl` timeline in the script (line draw at 0, heading at 0.15, intro at 0.55, amplitude from 0.8, set at 0.9, controls at 1.4). To drop the sequence, start the script with `let played = true;`: everything is shown at once and the first set arrives after the lull.
- **Hover and press timings** are CSS custom properties (`--d-*`, `--ease-*`). The dialog, crossfade and reprise timings are in the script next to each `fx` hook.
- **Reduced motion** is a separate `matchMedia` branch: final states, native scroll, a straight line, no sets, the stop button hidden and fade-only dialogs.

| Token | Role |
|---|---|
| `--sand` | Page ground: grey volcanic sand |
| `--salt` | Card faces, dialog, inputs, radio options at rest, button label on fills |
| `--neoprene` | All text, the swell line, borders, outlines, focus ring, button fills, error marks |
| `--lycra-yellow` | Beginner course, lycras 1 to 15 (card band, radio swatch) |
| `--lycra-pink` | Family morning, lycras 16 to 28 |
| `--lycra-blue` | Back in the water, lycras 29 to 40 |
| `--rule-rest` | Input baseline before hover (neoprene at 60%, still over 3:1 on salt) |
| `--veil` | Dialog backdrop (neoprene at 62%) |
| `--f-display` | Mohave: heading, numerals, names, labels, buttons |
| `--f-text` | Sanchez: quotes, body, meta, hints, errors |
| `--t-sm` | 15px: meta lines, hints, errors (Sanchez italic) |
| `--t-label` | 16px: band labels, field labels, dialog terms |
| `--t-body` | 18px: body and inputs, leading 1.6 |
| `--t-btn` | 19px: buttons and text buttons |
| `--t-quote` | 18 to 21px fluid: card quotes, leading 1.5 |
| `--t-name` | 22px: names on cards |
| `--t-note` | 30 to 40px fluid: name in the dialog |
| `--t-h3` | 34 to 52px fluid: "Add your words to the line-up" |
| `--t-display` | 52 to 108px fluid: the section heading, leading .88 |
| `--t-num` | 56 to 72px fluid: lycra numerals, tabular |
| `--s-1` to `--s-10` | Spacing on a 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 |
| `--gutter` | Side padding, 16px on phones up to 64px |
| `--card-w` | Card width: 272 to 340px, 82vw under 768px |
| `--card-gap` | Gap between cards (24px) |
| `--row-pt`, `--row-pb` | Headroom above the cards for crests and focus rings; room below for the line |
| `--ride` | How far the cards float above the swell line |
| `--swell-amp`, `--swell-len`, `--swell-speed`, `--swell-lull`, `--tilt-max` | The sets (read by the script) |
| `--line` | 1.5px: card borders, the swell line, button and option borders |
| `--r-card`, `--r-option`, `--r-btn` | 4px, 8px, 6px. Unequal on purpose. Inputs are square. |
| `--d-press`, `--d-out`, `--d-in`, `--d-sweep`, `--d-release` | 0.12, 0.25, 0.35, 0.4, 0.4s: press, leave, enter, underline sweep, spring release |
| `--ease-out`, `--ease-sweep`, `--ease-swap`, `--ease-spring`, `--ease-pop` | power3.out, the underline sweep curve, the label-swap curve, the press release overshoot, the badge pop |

## Motion

Technique ids refer to `research/motion-techniques.md`.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Swell line draws flat from the left | SC16 (clip-path inset, because the path is three viewports long) | Load, t=0 | 1.0s power2.inOut | Drawn and straight |
| Each card surfaces out of the line as the drawing reaches it | LD7 (clip-path window, from the bottom) | Load, delay from the inverse of power2.inOut at the card's centre | 0.7s expo.out | Visible |
| Heading words rise and straighten | TX2 | Load, t=0.15 | 0.7s back.out(1.2), stagger amount 0.45 | Shown |
| Intro paragraph settles | TX2 block variant | Load, t=0.55 | 0.5s power3.out, from 40px and 2deg | Shown |
| Swell rises, then the first set rolls in (the entrance) | Signature | Load: amplitude from t=0.8, set from t=0.9 | Amplitude 1.2s power2.out; set at 140px/s | No sets |
| Previous, Next and Stop arrive | LD8 | Load, t=1.4 | 0.5s power3.out from 8px, stagger 0.06 | Shown |
| Sets roll, lull, repeat | Signature (one ticker) | Continuous while the line-up is on screen | 140px/s, 9s lull | None |
| Swell builds as the line-up scrolls in | Scrubbed ScrollTrigger on a JS value (the SC11 idea) | Row top from 85% to 35% of the viewport | scrub, ease none | None |
| Sets sleep off screen | Anti-pattern 11 fix | ScrollTrigger toggle on the line-up | Immediate | n/a |
| Card goes level and still | Signature calm factor | Hover (fine pointer) or keyboard focus | 0.6s power3.out; outline instant | Outline only |
| Read buttons, "Write another note", mailto link | HV2 + MI1 | Hover, focus, press | Sweep in 0.4s from the left, out 0.3s to the right; press 0.12s, release 0.4s overshoot | Static underline that thickens |
| Previous, Next, Stop, Submit, See, Close | HV4 + MI1 | Hover (fill from the entry edge), focus, press | In 0.35s, out 0.25s toward the exit edge; arrows nudge 4px | Colour swap |
| Stop toggle label | MI2 | Click | 0.35s cubic-bezier(.65,0,0,1), width reserved | Instant |
| Previous and Next move the row | Native smooth `scrollBy` with snap | Click | Browser smooth scroll | Instant |
| Form heading words, then field baselines draw | TX2 + SC16 | `#add-words` top at 80%, once | 0.7s back.out(1.2); rules 0.8s expo.out, stagger 0.08 | Static |
| Field focus rule grows from the left | MI4 | Focus | 0.35s power3.out | Instant |
| Error reveals | MI4 (grid-template-rows) | Invalid submit; live after the first try | 0.25s | Instant |
| Lesson swatch fills, check badge pops, tick draws | Swatch fill + MI3 | Hover, focus, choice | Fill 0.3s; badge 0.25s back-out; tick 0.3s after 0.1s | No pop |
| Submit label "Adding your note", then the form and result crossfade | MI2 + crossfade | Valid submit | Label 0.35s, held 0.4s; out 0.25s power2.in, in 0.4s expo.out | Instant swap |
| Note dialog | CD7 + TX2 on the name | Read button | Backdrop 0.3s; panel 0.45s expo.out from 12px and .98; out 0.3s. Bottom sheet under 600px from y 100% | Fade only |
| Reprise: back to the line-up, newcomer drops, a set comes for it | Signature | "See my note in the line-up" | Lenis scroll 1.2s; drop 0.9s back.out(1.4); quote TX2; set starts at once | Jump, card shown, focus moved |
| Skip link reveal | clip-path | Focus | 0.25s | Instant |
