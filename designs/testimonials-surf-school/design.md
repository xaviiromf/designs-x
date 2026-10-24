---
title: What people told us on the sand
section: testimonials
subject: Testimonials for Ola Mansa, a fictional surf school on La Puntilla, the beginner beach in Pichilemu, Chile, collected from beginners, families and surfers coming back after years away.
aesthetic: A line-up waiting for a set. Salt-white cards with heat-transfer lycra numerals drift over a drawn swell on grey volcanic sand. Condensed Mohave carries the numbers and Latinotype's Sanchez slab carries the voices.
mode: light
fonts:
  - Mohave 600, 700 (Google Fonts)
  - Sanchez 400, 400 italic (Google Fonts; Latinotype, Chile)
js: Drifts an endless rail of testimonial cards over a still SVG swell (drag and throw, horizontal wheel, arrow keys, Previous and Next, a stop control; phones hold each card level and step on), opens full notes in a dialog, adds submitted notes to the front of the row, and runs the load and scroll choreography.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [testimonials, detailed, gsap, lenis, endless, drag, svg, wave, dialog, form, surf, sport, condensed-sans, slab-serif, light]
use_when:
  - Testimonials come from a few distinct groups, and something real and visible tells the groups apart (a lesson level, a ticket class, a team colour, a membership tier).
  - The subject has a motion people already know (swell, wind, a queue, traffic) that can carry the cards instead of decorating them.
  - There are 6 to 15 short quotes, each with a longer version worth a dialog, and visitors may add their own.
avoid_when:
  - Quotes are long (over about 240 characters) or must be compared side by side. The row drifts unless a card is hovered, focused or tapped.
  - The page cannot have ambient motion at all. The stop control and reduced-motion path help, but the drift is the point.
  - The page already has a drifting or draggable card rail (gallery-skate-archive and team-restaurant-kitchen use one). Two on a page compete.
  - There are only two or three testimonials. A still layout serves them better.
---

## Why it works

**The bold idea: the line-up drifts over a still swell, endlessly.** A single drawn swell line (neoprene, 1.5px) runs under the row from edge to edge, and it never moves. The nine notes drift slowly left over it like boards waiting for a set: each card rises over a crest, drops into the trough behind it and tilts with the slope. When a card leaves off the left edge it comes back off the right one, so the row has no end. Hover or focus a card and the whole row glides to a stop while that card goes level, so it can be read.

- **The central fact is the lycra.** Every student at the school wears a numbered lycra so instructors can call them in the water, and its colour is the lesson group. The number ranges encode the group: 1 to 15 yellow for the beginner course, 16 to 28 pink for family mornings, 29 to 40 blue for people coming back after years away. Each card's band is that lycra, with its numeral and a full sentence-case label ("Yellow lycra, beginner course"). Readers learn the system in the intro and the form's radio options ("Yellow lycra, numbers 1 to 15"). A new note gets the next free number in its group's range: "Thanks, Camila. You're lycra 13 in the line-up."
- **One function draws the water and places the cards.** `wave(x, lam)` is a sine across the line-up. The SVG path is built from it once per resize in `measure()`, and afterwards only its transform changes (`translate(0, mid) scale(1, a)` carries the amplitude), so its `d` is never rewritten per frame. Each card reads the same function at its own centre, so the line and the cards cannot disagree. Tilt is half the water's slope angle, because a 340px card spans most of a crest and rides flatter than the water under its centre. It is capped at `--tilt-max` (3deg).
- **The endless rail needs no clones.** The rail is one offset, `R.off`. Every card's x is its cached layout centre plus `R.off`, wrapped by `wrapTo(x, lo, P)` into one set width `P` (cards times the step). Nine cards are always wider than the viewport plus one card, so a card leaves fully off the left before it returns fully off the right. Card centres are cached in `measure()`; the ticker does no rect reads.
- **Every input moves the same offset.** Mouse and touch drag pull `R.off` and a release throws it (the glide decays by 0.94 per frame). Horizontal wheel and trackpad gestures move it (vertical wheel stays with Lenis). Previous and Next tween it one card to the gutter and then hold the row for 2.5s. Left and Right arrows move focus between cards round the loop. Focus, find-in-page and any other native scroll of the row are folded into `R.off`, so the card the browser wanted lands where it expected.
- **Drag leans the cards.** Rail speed drives a `skewX` lean on a damped spring, up to `--lean-max` (3deg), so cards overshoot a little and settle when the row stops. At drift speed the lean is under half a degree; it reads only when the row is dragged or thrown.
- **Phones hold, then step.** Under 768px, or on touch screens, one 82vw card fills the view, so the drift moves in steps instead: the card at the gutter settles level (calm 1 to 0 over 0.6s) and holds for `--step-hold` (6s), then lifts back onto the swell (0.4s) as the rail glides one card on over 1.4s, so each step reads as a board catching the swell and settling. The hold counts plain seconds and starts when the load sequence ends, so the first card gets the full 6s too; phones have no drift surge. A tap holds the tapped card until the next tap or swipe.
- **The card you are reading holds still.** On hover (fine pointers), keyboard focus or a tap, the row's flow eases to 0 over 0.5s, and that card's calm factor eases from 1 to 0 over 0.6s, so it goes level and still. On hover a 2px outline fades in after 0.3s, once the card is level, so the frame never appears skewed. Keyboard focus shows one ring only, the Read button's; the card answers by going level. There is no lift and no dimming of the other cards. A card hovered while more than a quarter of it is cut off slides fully in after a 350ms dwell; a focused card always slides in.
- **The reprise closes the loop.** After someone adds a note, "See my note in the line-up" scrolls back up. The rail swings the short way round to the front, their card drops onto the swell at the gutter, the words of their quote settle into place, focus moves to its Read button, and the row holds for 2.5s before it drifts on.
- **Palette from La Puntilla.** `--sand` #B4B2AA is the grey volcanic sand of Pichilemu: neutral, not cream. `--salt` #FAFBF8 is used for card faces, the dialog and inputs. `--neoprene` #1C2630 is used for every piece of text, every line, outline and focus ring, and every button fill. The three lycra colours are used only as group colour (card bands, radio swatches, the dialog band). They are a fluoro lemon-lime competition yellow (#DDF23A), zinc-stick pink (#FF8FB5) and lycra blue (#5BA8E3). Neoprene is 7.2:1 on sand, 14.8:1 on salt, 12.3:1 on yellow, 7.2:1 on pink and 6.0:1 on blue (WCAG relative luminance, recomputed), so ink sits directly on every band. There is no grey secondary text: hierarchy comes from size, weight and italic.
- **Two clearly distinct families.** Mohave 700 and 600 is a condensed sans that echoes the cut vinyl numbers on a lycra. It is used for the display heading, the tabular numerals (Mohave has `tnum`), names, labels and buttons, always in sentence case. Sanchez, a warm low-contrast slab from Chilean foundry Latinotype, carries the voices: quotes, body and dialog notes. Its italic is used for meta lines, hints and errors.
- **Structure is information.** Radii are deliberately unequal: cards 4px, radio options 8px, buttons 6px, inputs 0 with only a baseline. The baselines are the fields (S3 draws them in when the form arrives). There are no shadows anywhere. The dialog's conditions are written in words ("0.7 m at 9 s, light offshore, low tide 08:10"). Errors carry a neoprene "!" mark as well as their text, so they never look like hints.
- **Choices against the collection's defaults.** The family colour began as high-vis orange and became pink, so it does not read as terracotta next to a slab. The cards avoid the SaaS kit: no shadows, no shared radius, and each card is told apart by its band, its number and its place on the swell. The lycra numerals are big numbers, but they are identifiers people wear, capped at 72px and always paired with a label, never a hero stat. Text rises out of masks (TX2) in three places only: the heading's words on load, the name in a note's dialog and the newcomer's quote in the reprise. The intro and the form heading do not rise; the form's own gesture is its field baselines drawing in.
- **Tier.** This is a Detailed design. The drift is ambient motion that runs longer than 5 seconds, so it carries a visible stop control (WCAG 2.2.2), stops under hover, focus and taps, sleeps off screen, and is absent under reduced motion. Everything else answers a person's action.

### Notes for adapters

- **Stop control.** "Stop the drift" / "Let the row drift" eases the row's `run` factor to 0 or 1 over 0.8s. It stops the phone steps too. The button swaps its visible label (MI2) and does not also use `aria-pressed`, because a toggle whose label changes should not announce a pressed state as well. It sits before the row in the DOM, so a keyboard reaches it before any card.
- **Sleep.** The drift ticker returns early while the line-up is off screen (a ScrollTrigger toggle). Hidden tabs stop GSAP's ticker, and the frame delta is capped so nothing jumps on return.
- **S1 only reads below the fold.** The swell builds from flat as the row top moves from 85% to 35% of the viewport. With the section at the top of a page that range is already passed at first paint. S1b is always visible: the swell calms to 40% while `#add-words` moves from 90% to 50% of the viewport, and builds again on the way back up.
- **Header and the fold.** From 1024px the heading sits in an `auto` column capped at 7.8em, so it always breaks after "told us", and the intro with Previous, Next and Stop under it fills the right column; the controls share a row with the heading's last line. With `--t-display` capped at 92px (6.25vw) and `.surf` padding-top at `--s-6`, the swell midline sits at y=731 on 1280x800, 736 on 1440x900 and 734 on 1600x1000, so the water and a strip of sand show at first paint. Below 1024px everything stacks: heading, intro, controls, row.
- **Card gap.** `--card-gap` is 48px because a 450px card tilted 3deg swings its top corner about 24px; two neighbours tilted toward each other at 24px touched. Keep the gap at least the tilt swing on each side.
- **The cursor follower was removed** as the accessory that came off last. Its "Read" disc covered the label it repeated. The pointer response is the row stopping under the pointer, the card going level and the button fills that enter from the side the pointer came in.
- **Without JavaScript** the row scrolls natively with scroll-snap, the line is straight and all nine quotes are visible. The Read buttons carry `commandfor` and `command="show-modal"`, so browsers with invoker commands still open the notes; in browsers without them the Read buttons do nothing without JavaScript. That is accepted: every quote is readable on its card, and the full notes are an extra. The form is disabled with the note "Adding a note needs JavaScript." **If the CDN is blocked**, the plain script still runs (dialogs, Previous and Next on the native row, mouse drag, the form and its result) and nothing is hidden. **If the motion branch throws**, it removes `html.js` and clears the start states, so nothing stays hidden.

## Do not touch

- `wave` drives both the line and the cards. Do not give the cards their own wave, and never rewrite the path's `d` per frame. Build it only in `measure()`.
- The rail rules: card centres, widths and the step are cached in `measure()` (on resize and after a card is added), and the ticker reads only cached numbers. No rect reads in `tick`. Card x always goes through `wrapTo` with `lo` set half a card plus 2px left of the edge, so a card is never visible at both ends.
- `.row.rail` is `overflow: hidden`, not `clip`, and the scroll listener folds `scrollLeft` into `R.off`. With `clip`, find-in-page highlights matches it cannot scroll to.
- The number ranges and their colours, and the full label in every band. Colour is never the only signal.
- The stop control (before the row in the DOM), the off-screen sleep, the 3deg tilt cap and the 3deg lean cap. Hover, keyboard focus and taps must keep stopping the row and holding a card level.
- The phone and touch step mode. A continuously drifting 82vw card cuts its quote off within seconds.
- `data-lenis-prevent` on dialogs, and `lenis.stop()` while one is open.
- Hidden start states exist only under `html.js`, which the script adds only after GSAP, ScrollTrigger, SplitText and Lenis have loaded.
- `--ride`. Cards sitting directly on the line hide it.
- The new card's drop stays inside the row's top padding (`--row-pt`), because the row clips anything above it. It starts at opacity 0, not `visibility: hidden`, so focus can land on its Read button while it fades in.

## Adapting

Start with the colour tokens and the three groups. A group is a `[data-group]` value with a `--band` colour in CSS, an entry in `GROUPS` at the top of the script (number range, band label, lesson name) and a radio option in the form. Keep the band label a full sentence, and keep ink contrast on each band at 4.5:1 or better.

Copy: keep quotes under about 200 characters on the card, and put the rest in the dialog. Names may run to two lines (the cards stretch to equal height and the names align at the bottom). Meta lines say place and when, not the group, because the band already says that. Keep at least enough cards to be wider than the viewport plus one card (about six at 1600px), or the endless wrap shows a card at both edges.

Retiming and removing motion:

- **Drift and swell:** `--drift-speed` (px/s), `--step-hold` (s, phones and touch), `--swell-amp` (px; 20px under 768px), `--swell-len` (wavelength in card steps; phones compute it from the viewport as the larger of 1.6 steps and 1.1 viewport widths), `--tilt-max` and `--lean-max` (deg) are read by the script in `measure()`. The drift's speed is multiplied by the factors in `S`: `go` (load surge), `flow` (hover, focus, tap and the 2.5s holds), `run` (stop control); the swell height by `load`, `scroll` (S1) and `form` (S1b). For a still row, set `--drift-speed: 0` and remove the stop button.
- **Load sequence:** the offsets live in the `tl` timeline in the script: line draw at 0; each card surfaces as the drawing reaches it; heading at 0.15; the intro, Previous and Next fade in at 0.4; amplitude from 0.8; the stop button and the drift surge at 1.9 (`go` 0 to 4 in 0.6s, then down to 1 over 2.4s, so every card visibly climbs a crest in the first seconds). On phones `go` is set to 1 at 1.9 with no surge, and the gutter card settles level then. To drop the sequence, start the script with `let played = true;`: everything is shown at once and the drift runs at its base speed.
- **Hover and press timings** are CSS custom properties (`--d-*`, `--ease-*`). The dialog, crossfade and reprise timings are in the script next to each `fx` hook.
- **Reduced motion** is a separate `matchMedia` branch: final states, a native scroll-snap row (no rail, no drift), a straight line, the stop button hidden, and dialogs that open and close at once. A focused card is scrolled fully into view (`scrollIntoView` nearest), because the browser alone stops once the Read button shows.
- **Form announcements.** An invalid submit focuses the first invalid field and writes every error into a polite status line (`#form-status`); a valid one announces "Adding your note."
- **Short notes.** A submitted quote under 90 characters gets `data-short` and is set at `--t-name` (22px, leading 1.4), so a one-line note fills its card.

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
| `--t-option` | 20px: lesson names in the radio options |
| `--t-quote` | 18 to 21px fluid: card quotes, leading 1.5 |
| `--t-name` | 22px: names on cards |
| `--t-result` | 26 to 34px fluid: the "You're lycra 13" result line |
| `--t-note` | 30 to 40px fluid: name in the dialog |
| `--t-h3` | 34 to 52px fluid: "Add your words to the line-up" |
| `--t-display` | 52 to 92px fluid (6.25vw): the section heading, leading .88, two lines from 1024px |
| `--t-num` | 56 to 72px fluid: lycra numerals, tabular |
| `--s-1` to `--s-10` | Spacing on a 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 |
| `--gutter` | Side padding, 16px on phones up to 64px |
| `--tap`, `--tap-sm` | 48px button height; 44px hit area for Close and text buttons |
| `--card-w` | Card width: 272 to 340px, 82vw under 768px |
| `--card-gap` | Gap between cards (48px, sized to the 3deg tilt swing) |
| `--row-pt`, `--row-pb` | Headroom above the cards for crests and focus rings; room below for the line |
| `--ride` | How far the cards float above the swell line |
| `--swell-h` | The swell's box (120px); the line sits at half height |
| `--swell-amp`, `--swell-len` | Crest height; wavelength in card steps (desktop only, phones compute it) |
| `--drift-speed`, `--step-hold` | Drift in px/s; seconds a card holds before a phone step |
| `--tilt-max`, `--lean-max` | Caps on the swell tilt and the drag lean, in degrees |
| `--line` | 1.5px: card borders, the swell line, button and option borders |
| `--r-card`, `--r-option`, `--r-btn` | 4px, 8px, 6px. Unequal on purpose. Inputs are square. |
| `--d-press`, `--d-out`, `--d-in`, `--d-sweep`, `--d-release` | 0.12, 0.25, 0.35, 0.4, 0.4s: press, leave, enter, underline sweep, spring release |
| `--ease-out`, `--ease-sweep`, `--ease-swap`, `--ease-spring`, `--ease-pop` | power3.out, the underline sweep curve, the label-swap curve, the press release overshoot, the badge pop |

## Motion

Technique ids refer to `research/motion-techniques.md`.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Swell line draws from the left | SC16 (clip-path inset) | Load, t=0 | 1.0s power2.inOut | Drawn and straight |
| Each card surfaces out of the line as the drawing reaches it | LD7 (clip-path window, from the bottom) | Load, delay from the inverse of power2.inOut at the card's centre | 0.9s expo.out | Visible |
| Heading words rise and straighten | TX2 | Load, t=0.15 | 0.7s back.out(1.2), stagger amount 0.45 | Shown |
| Swell rises under the cards | Signature (`S.load`) | Load, t=0.8 | 1.2s power2.out | Straight line |
| Intro, Previous and Next fade in | LD8 | Load, t=0.4 | 0.5s power3.out, stagger 0.06, no translate | Shown |
| Stop button wipes in with the drift it stops | clip-path | Load, t=1.9 | 0.4s power3.out | Hidden |
| Drift surges, then settles | Signature (`S.go`) | Load, t=1.9, desktop only | 0 to 4 over 0.6s power2.out, 4 to 1 over 2.4s power3.inOut | None |
| Row drifts over the still swell | Signature (one ticker) | Continuous while the line-up is on screen | `--drift-speed` 36px/s; cards rise and tilt from `wave` | None, native scroll-snap row |
| Phone and touch steps | Signature, step mode | Under 768px or `hover: none` | Card settles level 0.6s power3.out, holds `--step-hold` 6s, lifts 0.4s as the rail glides one card 1.4s power2.inOut | None |
| Drag and throw | Rail + CD3 lean (`skewX`) | Pointer drag over 6px (click suppressed) | Follows the pointer; throw glide decays 0.94 per frame; lean on a damped spring, capped 3deg | Native scroll |
| Previous and Next move the rail | Rail step | Click | 0.8s power3.inOut, then the row holds 2.5s | Instant native `scrollTo` |
| Horizontal wheel and trackpad | Rail | Wheel with deltaX (or Shift) | Direct | Native scroll |
| Left and Right arrows | Focus round the loop | Keydown on a card | Focused card slides in 0.7s power3.inOut | Native |
| Swell builds as the line-up scrolls in | Scrubbed ScrollTrigger on a JS value (SC11 idea) | Row top from 85% to 35% (only below the fold) | scrub, ease none | None |
| Swell calms toward the form | Scrubbed ScrollTrigger | `#add-words` top from 90% to 50% | scrub, amplitude 1 to 0.4 | None |
| Drift sleeps off screen | Anti-pattern 11 fix | ScrollTrigger toggle on the line-up | Immediate | n/a |
| Row stops, card goes level and still | Signature (`S.flow`, calm factor) | Hover (fine pointer), keyboard focus, tap (held to the next tap or swipe) | Flow 0.5s power2.out to stop, 0.8s power2.inOut to resume; calm 0.6s power3.out, back 0.4s; hover outline fades in 0.15s after 0.3s | Hover outline, no delay; focus ring on the Read button |
| Cut-off card slides in | Rail | Hover dwell 350ms when over 25% hidden; any focus | 0.7s power3.inOut | Native focus scroll |
| Read buttons, "Write another note", mailto link | HV2 + MI1 | Hover, focus, press | Sweep in 0.4s from the left, out 0.3s to the right; press 0.12s, release 0.4s overshoot | Static underline that thickens |
| Previous, Next, Stop, Submit, See, Close | HV4 + MI1 | Hover (fill from the entry edge), focus, press | In 0.35s, out 0.25s toward the exit edge; arrows nudge 4px | Colour swap |
| Stop toggle label | MI2 | Click | 0.35s cubic-bezier(.65,0,0,1), width reserved; drift eases out or in over 0.8s | Hidden |
| Field baselines draw | SC16 | `#add-words` top at 80%, once | 0.8s expo.out, stagger 0.08, after 0.15s | Static |
| Field focus rule grows from the left | MI4 | Focus | 0.35s power3.out | Instant |
| Error reveals | MI4 (grid-template-rows) | Invalid submit; live after the first try | 0.25s | Instant |
| Lesson swatch fills, check badge pops, tick draws | Swatch fill + MI3 | Hover, focus, choice | Fill 0.3s; badge 0.25s back-out; tick 0.3s after 0.1s | No pop |
| Submit label "Adding your note", then the form and result crossfade | MI2 + crossfade | Valid submit | Label 0.35s, held 0.4s; out 0.25s power2.in, in 0.4s expo.out | Instant swap |
| Note dialog | CD7 + TX2 on the name | Read button | Backdrop 0.3s; panel 0.45s expo.out from 12px and .98; out 0.3s. Bottom sheet under 600px from y 100% | Instant |
| Reprise: back to the line-up, the rail swings to the front, the newcomer drops in | Signature | "See my note in the line-up" | Lenis scroll 1.2s to a composed frame (the whole section when it fits, else the controls on phones or the row top, never a sliced heading); rail 0.6s power3.inOut the short way round; drop 0.9s back.out(1.4); quote TX2; focus on its Read button; row held 2.5s | Jump, card shown, focus moved |
| Skip link reveal | clip-path | Focus | 0.25s | Instant |
