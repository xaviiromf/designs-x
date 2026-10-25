---
title: The line-up rides the swell
section: testimonials
subject: Testimonials for Ola Mansa, a fictional surf school on La Puntilla, the beginner beach in Pichilemu, Chile, collected from beginners, families and surfers coming back after years away.
aesthetic: Boards waiting for a set under the morning camanchaca. Salt-white cards carry heat-press lycra numerals and sit on one drawn swell line over a cool fog ground. Condensed Teko is used for the numbers and Latinotype's Sanchez slab for the voices.
mode: light
fonts:
  - Teko 600, 700 (Google Fonts)
  - Sanchez 400, 400 italic (Google Fonts; Latinotype, Chile)
js: Drifts an endless line-up of notes over a drawn swell (a slow drift with a mouse, one card every 6s on touch) that you can drag, throw or step through, sets each card's height and tilt from that swell, opens full notes in a dialog, adds submitted notes to the line-up, and runs the load, scroll and hover choreography.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [testimonials, detailed, gsap, lenis, infinite-strip, drag, svg, wave, dialog, form, surf, sport, condensed-sans, slab-serif, light]
use_when:
  - Testimonials come from a few distinct groups, and something real and visible tells the groups apart, such as a lesson level, a ticket class, a team colour or a membership tier.
  - The subject has a motion people already know (a swell, wind, a queue) that can carry the cards instead of decorating them.
  - There are 6 to 15 short quotes, each with a longer version worth a dialog, and visitors may add their own.
avoid_when:
  - Quotes are long (over about 240 characters) or must be compared side by side. One row shows three or four at a time on desktop and one on phones.
  - The page already has a horizontal card rail. This one drifts and drags, as do gallery-skate-archive and team-restaurant-kitchen, and two rails on one page compete.
  - There are only two or three testimonials. A still layout serves them better.
---

## Why it works

**The bold idea: the line-up rides a still swell.** A single drawn swell line (neoprene, 1.5px) runs under the row from edge to edge, and it never moves. The nine notes drift slowly left in an endless row (16px/s with a mouse; on touch screens a card rests level on the crest at the gutter for about 6s, then the row glides one step, like boards waiting for a set) and every card reads its height and its tilt from that one sine, under its own corners. So a note climbs onto a crest, levels off and slides down the face into the next trough, and the row moves like boards waiting for a set. Grab it and it follows your hand; the cards lean with your speed (CD3) and settle over about 0.8s once you let go, with a card resting on the crest at the gutter. Point at the row, touch it, or focus into it, and the drift eases to a stop so you can read. A touch holds the row for 6s after the last contact. Focus in the row keeps it still until focus leaves, including after a note closes and focus returns to its Read button, so after keyboard use the line-up rests by design.

- **One travel value, no clones.** The script keeps a single `P.off` (how far the line-up has travelled) and places card *i* at `wrap(i × step − off)`. A card leaves fully past the left edge and comes back fully past the right one, so the loop has no seam, the DOM holds each note once and the focus order is the nine notes as written.
- **Ways to move it.** Drag with a mouse, pen or finger (pointer events with `touch-action: pan-y`, so a vertical swipe still scrolls the page; capture starts only after 6px, so a tap still reaches the Read button and a drag never opens a note; the card's own implicit touch capture ending at that moment is not taken for a release). A throw glides on with the release speed, then snaps to a step. Sideways trackpad swipes and Shift + wheel push it too; vertical wheel is never captured. Previous and Next step one card (repeated clicks add up) and are never disabled, because the row has no ends. The focused row takes the arrow keys, and a card whose Read button gets keyboard focus glides to the gutter.
- **The crest sits at the gutter.** The sine's phase puts a crest where a card's centre rests when its left edge is at the gutter, and every glide, throw and step ends on a whole step. So the card you land on is level and on top, and the tilt shows in between.
- **Cards rest on the water, not in it.** `ride()` takes the water under a card's two bottom corners and its centre. The tilt follows the water between the corners, capped at `--tilt-max` (3deg), and the bottom edge sits on the highest water under it, so in a trough the card rests on its corners and on a crest on its centre. No corner sinks through the line.
- **One function draws the water and places the cards.** `wave(x, x0, lam)` builds the SVG path once per resize in `measure()`. After that only the path group's `scale(1, a)` changes, to carry the amplitude. Each card reads the same function in `layout()`, so the line and the cards cannot disagree. One GSAP ticker function runs the drift, the lean (from the line-up's own speed, so drags, throws and Prev/Next all lean the cards) and the layout. It reads only cached offsets, never a rect, and sleeps while the row is off screen or the tab is hidden.
- **The central fact is the lycra.** Every student at the school wears a numbered lycra so instructors can call them in the water, and its colour is the lesson group. The number ranges encode the group: 1 to 15 yellow for the beginner course, 16 to 28 pink for family mornings, 29 to 40 blue for people coming back after years away. Each card's band is that lycra, with its numeral and a full sentence-case label ("Yellow lycra, beginner course"). The intro and the form's radio options ("Yellow lycra, numbers 1 to 15") teach the system.
- **The numbering rule.** A new note takes the highest number in use in its group plus one. When the top of the range is taken, it takes the lowest free number in the range, and when the group is full the form says so. On this page a beginner gets 13 (after 3, 7 and 12): "Thanks, Ana. You're lycra 13 in the line-up."
- **The card you are reading goes level.** On hover (fine pointers) or keyboard focus, the row's drift eases to a stop over 0.4s and that card's calm factor eases from 1 to 0 over 0.6s, so its tilt and lean go to zero. It stays on the water, so nothing lifts and nothing else dims. Hover adds nothing more. Keyboard focus also draws a 2px outline at once, which is the focus indicator for its Read button, and glides the card to the gutter.
- **The reprise closes the loop.** After someone adds a note, "See my note in the line-up" scrolls back up to a composed frame: the whole section when it fits, otherwise the row centred, and the section top whenever that target is within 140px of it, so the heading is never cut through its first line. During the scroll the row makes room without a jump: it glides to the front (0.5s), the newcomer joins the ring one step left of the gutter, invisible, and the row slides right along the swell (0.8s), opening a gap at the gutter. Their card drops into it at about 0.8s while the words of their quote rise and settle, and focus moves to its Read button. If the card already dropped in (they scrolled up on their own first), the button brings it back to the front and only replays the words, never a second drop.
- **Palette from Pichilemu in the morning.** `--fog` #D5DCD9 is the camanchaca, the marine layer that sits on the point until mid-morning. It is denser than a page grey, so the salt cards separate without leaning on their outlines. `--salt` #FAFBF8 is used for card faces, the dialog and inputs. `--neoprene` #1C2630 is used for every piece of text, every line, outline and focus ring, and every button fill. The three lycra colours are group colour only (card bands, radio swatches, the dialog band). They are a fluoro competition yellow that leans green (#E2EE3C), zinc-stick pink (#FF8FB5) and lycra blue (#5BA8E3). Neoprene contrast is 11.0:1 on fog, 14.8:1 on salt, 12.1:1 on yellow, 7.2:1 on pink and 6.0:1 on blue, so ink sits directly on every band. Under simulated protanopia and deuteranopia the yellow stays at least 73 ΔE from pink and 118 from blue. There is no grey secondary text: hierarchy comes from size, weight and italic.
- **Two clearly distinct families.** Teko 700 and 600 has tall, flat-topped figures that read like heat-press lycra numbers. It is used for the heading, numerals, names, labels and buttons, always in sentence case. Teko has no tabular figures ("1111" sets at 93px and "0000" at 144px at 72px, measured with `tabular-nums` on), so the numeral sits in a fixed two-digit box (`width: 1.02em`), right-aligned, which keeps every band label in the same place and sets a single digit against its label like a printed number. Sanchez, a warm low-contrast slab from the Chilean foundry Latinotype, carries the voices: quotes, body and dialog notes. Its italic is used for meta lines, hints and errors.
- **Structure is information.** Radii are deliberately unequal: cards 4px, radio options 8px, buttons 6px, and inputs 0 with only a baseline. The baselines are the fields, and S3 draws them in when the form arrives. There are no shadows anywhere. The dialog's conditions are written in words ("0.7 m at 9 s, light offshore, low tide 08:10"). Errors carry a neoprene "!" mark as well as their text, so they never look like hints.
- **Choices against the collection's defaults.** The family colour began as high-vis orange and became pink, so it does not read as terracotta next to a slab. The cards avoid the SaaS kit: no shadows, no shared radius, and each card is told apart by its band, its number and its place on the swell. The lycra numerals are big numbers, but they are identifiers people wear, capped at 72px and always paired with a label, never a hero stat. TX2 (words rising out of masks) is the only text effect, used on the heading, the form heading, the name in a note's dialog and the newcomer's quote.
- **Scroll.** S1 builds the swell's amplitude as the row scrolls in. S2 passes a set under it: page-scroll speed (from Lenis) lifts the amplitude by up to 60% and eases back over about 1.2s, so scrolling away from the line-up still moves the signature. The water never translates. Both are skipped under reduced motion, and S2 is zero while a note is open.
- **Tier.** This is a Detailed design. The drift runs for longer than 5s, so a visible "Pause the line-up" button sits next to Previous and Next (WCAG 2.2.2); its label swaps to "Start the line-up" and the accessible name follows the label (no `aria-pressed` on top, which would read as "Start the line-up, pressed"). The fine-pointer moments are the drag with its lean and the card going level under the pointer, together with the button fills that enter from the side the pointer came in. There is no cursor follower: the native cursor shows grab and grabbing over the row.

### Notes for adapters

- **Heading level.** The section heading is an `h2` with `h3` names, as in the other testimonials, because this is a section that composes into a page.
- **The fold.** `--t-display` is capped at 104px (6.6vw) and the heading breaks into two lines from 1024px, so the swell line is in the first view: at y≈713 on 1280x800, 733 on 1440x900 and 752 on 1600x1000. On a 390x844 phone it sits at y≈764, because under 768px the intro keeps only its first two sentences and the lycra-colour sentence moves below the controls (the same sentence, shown in one place at a time), the section's top padding drops to 16px and the swell is shorter and taller (`--swell-len` 1.4, `--swell-amp` 18px), so the peeking neighbour sits clearly on the face. Between 768 and 1024px the heading and intro stack, and the swell arrives with the first scroll. That is where S1 builds it.
- **Card gap.** `--card-gap` is the gutter plus 16px (74px at 1440), so the card resting one step left of the gutter is fully off screen instead of showing a sliver, and a 340px card tilted 3deg, plus up to 6deg of lean on a fast drag, never touches its neighbour. Phones use the gutter plus 32px with one 78vw card in view, because the shorter swell tilts the off-screen card's corner further; the next card still peeks about 40px on the right.
- **The newcomer's drop** starts 56px above its place on the swell. In motion the row is `overflow: visible` (only `.surf` clips, and only sideways), so nothing slices the card on the way down. The card starts at opacity 0, not `visibility: hidden`, so focus can land on its Read button while it fades in. If nobody presses "See my note", the newcomer drops in the next time the row is well in view (row top above 70% of the viewport and its bottom below 30%), but never while the "Thanks" panel is on screen, so the payoff waits for the button.
- **Without JavaScript and under reduced motion** the row scrolls natively with scroll-snap, the line is straight and all nine quotes are visible. The Read buttons carry `commandfor` and `command="show-modal"`, so browsers with invoker commands still open the notes. In browsers without them the notes are an extra, because every quote is readable on its card. The form is disabled with the note "Adding a note needs JavaScript." **If the CDN is blocked**, the plain script still runs (dialogs, Previous and Next, the form and its result) on a flat row. **If the motion branch throws**, it removes `html.js` and clears the start states, so nothing stays hidden.

## Do not touch

- `wave` drives both the line and the cards. Do not give the cards their own wave, and never rewrite the path's `d` per frame. Build it only in `measure()`.
- The water stays still and only the cards travel. A moving line plus moving cards is two motions to follow.
- The crest at the gutter (`x0` is the first card's resting centre) and every glide ending on a whole step. Change either and the card you land on rests tilted.
- `ride()`: tilt from the corners, bottom edge on the highest water. Sampling only the centre lets corners sink through the line in troughs.
- The wrap range `(-gutter - step, total - gutter - step)`. It keeps the seam off screen. It needs `total - step` wider than the viewport, which nine cards give up to 1600px; with fewer cards, add one cloned set.
- No rect reads in `layout()`. Card offsets are cached in `measure()` (on resize, on font load and after a card is added).
- Pointer capture only after 6px, and the click swallowed after a real drag. Capture on press and every Read button stops working.
- The Pause button, and drift stopping under the pointer, with focus in the row, while dragging and while a note is open.
- `data-lenis-prevent-horizontal` on the row and the Shift + wheel pass-through. Without them Lenis swallows sideways scrolling over the row.
- The number ranges and their colours, and the full label in every band. Colour is never the only signal.
- The 3deg tilt cap, the 6deg lean cap, and calm levelling the tilt and lean only, so a card never lifts.
- `data-lenis-prevent` on dialogs, and `lenis.stop()` while one is open.
- Hidden start states exist only under `html.js`, which the script adds only after GSAP, ScrollTrigger, SplitText and Lenis have loaded.
- `--ride` (9px). Cards sitting directly on the line hide it where the swell curves under their corners; much more and they read as hovering above the water.
- The newcomer joins the ring only when card 0 rests at the gutter (`reveal()`), then the row glides one step. Inserting it into a ring whose seam is on screen makes cards jump.
- During L4 only cards at or right of the gutter take the entrance offset, so the card resting off screen left never slides in from the left.
- The TX2 start offset is `yPercent: 135`, not 100, because Teko's ink overflows its .84em line box and the tops of tall letters would peek over the mask.

## Adapting

Start with the colour tokens and the three groups. A group is a `[data-group]` value with a `--band` colour in CSS, an entry in `GROUPS` at the top of the script (number range, band label, lesson name) and a radio option in the form. Keep the band label a full sentence, and keep ink contrast on each band at 4.5:1 or better.

Copy: keep quotes under about 200 characters on the card, and put the rest in the dialog. Names may run to two lines, because the cards stretch to equal height and the names align at the bottom. Meta lines say place and when, not the group, because the band already says that.

Retiming and removing motion:

- **Swell:** `--swell-amp` (28px, 18px under 768px), `--swell-len` (wavelength in card steps, 2.3, 1.4 under 768px) and `--tilt-max` (3deg) are read by the script in `measure()`. For a flat row, set `--swell-amp: 0`. The cards still drift and drag, and the line stays straight.
- **Drift and drag:** `DRIFT` (16px/s) sits next to the travel state in the script. On touch, `drive()` schedules the 6s beat and a 1.4s power2.inOut glide instead. The lean is `-speed × 0.004` deg, capped at 6, and eases toward that target at a rate of 6 per second. A throw adds a quarter of the release speed before it snaps.
- **Load sequence:** the offsets are in the `tl` timeline in the script. The line draws at 0, the heading starts at 0.15 and the intro at 0.55. The track rides in at 0.7 and the amplitude rises from 0.8. Previous, Next and Pause arrive at 1.4, and the drift starts at 1.9. To drop the sequence, start the script with `let played = true;`, and everything is shown at once.
- **Hover and press timings** are CSS custom properties (`--d-*`, `--ease-*`). The dialog, crossfade and reprise timings are in the script next to each `fx` hook.
- **Reduced motion** is a separate `matchMedia` branch. It is the native scroll-snap row, flat, with a straight line, no drift (so no Pause button), final states, no Lenis, and dialogs that open and close at once. Previous and Next jump without smoothing and fade to 60% at the ends of the row.
- **Form announcements.** An invalid submit focuses the first invalid field and writes every error into a polite status line (`#form-status`). A valid one announces "Adding your note."
- **Short notes.** A submitted quote under 90 characters gets `data-short` and is set 1.2 times larger, so a one-line note fills its card.

| Token | Role |
|---|---|
| `--fog` | Page ground: the morning marine layer |
| `--salt` | Card faces, dialog, inputs, radio options at rest, button label on fills |
| `--neoprene` | All text, the swell line, borders, outlines, focus ring, button fills, error marks |
| `--lycra-yellow` | Beginner course, lycras 1 to 15 (card band, radio swatch) |
| `--lycra-pink` | Family morning, lycras 16 to 28 |
| `--lycra-blue` | Back in the water, lycras 29 to 40 |
| `--rule-rest` | Input baseline before hover (neoprene at 60%, still over 3:1 on salt) |
| `--veil` | Dialog backdrop (neoprene at 62%) |
| `--f-display` | Teko: heading, numerals, names, labels, buttons |
| `--f-text` | Sanchez: quotes, body, meta, hints, errors |
| `--t-sm` | 15px: meta lines, hints, errors (Sanchez italic) |
| `--t-body` | 18px: body and inputs, leading 1.6; also the dialog's conditions list |
| `--t-label` | 20px: band labels, field labels, dialog terms (Teko runs small, so it sits a step above body) |
| `--t-btn` | 22px: buttons, text buttons, the booking link |
| `--t-quote` | 19 to 22px fluid: card quotes, leading 1.5 |
| `--t-name`, `--t-option` | 26px: names on cards, lesson names in the radio options |
| `--t-result` | 30 to 40px fluid: the "You're lycra 13" result line |
| `--t-note` | 36 to 48px fluid: name in the dialog |
| `--t-h2` | 40 to 60px fluid: "Add your words to the line-up" |
| `--t-display` | 56 to 104px fluid (6.6vw): the section heading, leading .84 |
| `--t-num` | 56 to 72px fluid: lycra numerals, in a fixed two-digit box |
| `--s-1` to `--s-10` | Spacing on a 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 |
| `--gutter` | Side padding, 16px on phones up to 64px; also the snap line |
| `--tap`, `--tap-sm` | 48px button height; 44px hit area for Close and text buttons |
| `--card-w` | Card width: 272 to 340px, 78vw under 768px |
| `--card-gap` | Gap between cards: the gutter plus 16px (the gutter plus 32px on phones), so the previous card rests fully off screen and tilted cards never touch |
| `--row-pt`, `--row-pb` | Room above the cards for crests and focus rings; room below for the line |
| `--ride` | How far the cards ride above the swell line (9px) |
| `--swell-h` | The swell's box (120px); the line sits at half height |
| `--swell-amp`, `--swell-len` | Crest height; wavelength in card steps |
| `--tilt-max` | Tilt at the steepest part of the swell, in degrees |
| `--line` | 1.5px: card borders, the swell line, button and option borders |
| `--r-card`, `--r-option`, `--r-btn` | 4px, 8px, 6px. Unequal on purpose. Inputs are square. |
| `--d-press`, `--d-out`, `--d-in`, `--d-sweep`, `--d-release` | 0.12, 0.25, 0.35, 0.4, 0.4s: press, leave, enter, underline sweep, spring release |
| `--ease-out`, `--ease-sweep`, `--ease-swap`, `--ease-spring`, `--ease-pop` | power3.out, the underline sweep curve, the label-swap curve, the press release overshoot, the badge pop |

## Motion

Technique ids refer to `research/motion-techniques.md`.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| L1. The swell line draws flat from the left | SC16 idea (`pathLength="1"`, stroke-dashoffset, `autoRound: false`) | Load, t=0 | 1.0s power2.inOut | Drawn and straight |
| L2. Heading words rise and straighten | TX2 | Load, t=0.15 | 0.7s back.out(1.2), stagger amount 0.45 | Shown |
| L3. Intro fades in | LD8 (opacity only) | Load, t=0.55 | 0.5s power2.out | Shown |
| L4. The cards ride in from the right through the swell | Signature (`S.ex` on cards at or right of the gutter, read by `layout`) | Load, t=0.7 | 60vw to 0 over 1.4s expo.out; track opacity 0.25s | Static |
| L4. The swell rises under them | Signature (`S.load`) | Load, t=0.8 | 1.2s power2.out | Straight line |
| L5. Previous, Next and Pause arrive | LD8 | Load, t=1.4 | opacity and y 8 to 0, 0.5s power3.out, stagger 0.06 | Shown |
| L6. The line-up starts drifting | Signature (CD3 drift) | Load, t=1.9 | Mouse: timeScale 0 to 1 over 1s, 16px/s. Touch: one step every 6s, 1.4s power2.inOut | No drift |
| Cards rise, fall and tilt as they travel | Signature (one sine, `ride()` under the corners) | Every frame the row is on screen | One ticker function; tilt ≤ 3deg | Flat native row |
| Drag, throw, lean | CD3 (pointer events, wrap, no clones) | Drag on the row (mouse, pen, touch); sideways wheel | Follows the pointer; lean = speed × 0.004, ≤ 6deg; release glides 0.9s power3.out to a step; lean settles in about 0.8s; drift resumes after 1.5s | Native scroll |
| Drift eases to a stop | Signature | Pointer over the row, a touch on it (held 6s after the last), focus in the row, drag, open note, Pause | 0.4s to stop, 1s to start | n/a |
| Pause the line-up / Start the line-up | MI2 label swap + HV4 + MI1 | Click | 0.35s swap | Hidden (no drift) |
| Sleep | ScrollTrigger toggle + `document.hidden` | Row off screen, tab hidden | Ticker work skipped | n/a |
| S2. A passing set: scroll speed lifts the swell | Lenis velocity on the amplitude (water never moves) | Page scroll while the row is on screen | Up to +60% amplitude, eases in fast, back over about 1.2s | None |
| S1. The swell builds as the line-up scrolls in | Scrubbed ScrollTrigger on a JS value (SC11 idea) | Row top from 85% to 35% of the viewport | scrub, ease none | None |
| S3. Form heading words rise, intro fades, field baselines draw | TX2 + SC16 | `#add-words` top 60px above the viewport bottom, once (after the load if already in view) | Heading as L2; intro 0.5s after 0.35s; rules 0.8s expo.out, stagger 0.08, after 0.2s | Static |
| Previous and Next, arrow keys on the row, keyboard focus on a card | Tween of `P.off`, lean from its speed | Click, key, focus | 0.7s power3.inOut to a whole step; repeated clicks add up | Native `scrollTo`, instant |
| Card goes level | Signature (calm factor) | Hover (fine pointer), keyboard focus | Tilt and lean to 0 over 0.6s power3.out, back over 0.6s power2.inOut; 2px outline at once on keyboard focus only | Outline on keyboard focus |
| Read buttons, "Write another note", mailto link | HV2 + MI1 | Hover, focus, press | Sweep in 0.4s from the left, out 0.3s to the right; press 0.12s, release 0.4s with overshoot | Static underline that thickens |
| Previous, Next, Pause, Submit, See, Close | HV4 + MI1 | Hover (fill from the entry edge), focus, press | In 0.35s, out 0.25s toward the exit edge; arrows nudge 4px | Colour swap; no fill at an end of the native row |
| Field focus rule grows from the left | MI4 | Focus | 0.35s power3.out | Instant |
| Error reveals | MI4 (grid-template-rows) | Invalid submit; live after the first try | 0.25s | Instant |
| Lesson swatch fills, check badge pops, tick draws | Swatch fill + MI3 | Hover, focus, choice | Fill 0.3s; badge 0.25s back-out; tick 0.3s after 0.1s | No pop |
| Submit label "Adding your note", then the form and result crossfade | MI2 + crossfade | Valid submit | Label 0.35s, held 0.4s; out 0.25s power2.in, in 0.4s expo.out | Instant swap |
| Note dialog | CD7 + TX2 on the name | Read button | Backdrop 0.3s; panel 0.45s expo.out from 12px and .98; out 0.3s. Bottom sheet under 600px from y 100% | Instant |
| Reprise: back to the line-up, the newcomer drops onto the swell | Signature + TX2 | "See my note in the line-up" | Lenis scroll 1.2s to a composed frame (section top when within 140px); the row glides to the front 0.5s, then one step right 0.8s power3.inOut to open the gap; at about 0.8s the card drops 56px, 0.9s back.out(1.4), fades in 0.3s; quote TX2 after 0.25s; focus on its Read button. Already landed: glides to the front, TX2 only | Jump, card shown, focus moved |
| Skip link reveal | clip-path | Focus | 0.25s | Instant |
