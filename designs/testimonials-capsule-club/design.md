---
title: Capsule machine testimonials
section: testimonials
subject: Capsule Club, a fictional monthly subscription from a three-person studio in Nagoya that posts one capsule a month (a small pixel-creature figure by an independent artist, a sticker and the artist's card), in three series named Pond, Attic and Rooftop. Nine subscribers say what they did with the figures, what went wrong and how it was fixed, and who they give it to.
aesthetic: "A generic coin-operated capsule machine drawn in whole pixels on electric violet: a glass dome holding a staggered pile of 24 two-tone capsules, a brass crank with four detents, a chute and a tray. Every quote is a milk paper slip printed in violet ink between the two stepped halves of its capsule, from the card at the top to the list and the form."
mode: dark
fonts:
  - Handjet (Google Fonts, variable). Display only, at ELSH 2 and ELGR 1 so its modules are square tiles. Used for the H2 at weight 700 and nothing else.
  - Host Grotesk (Google Fonts, variable 300-800). Everything else, 17px body, 13px minimum, with tabular figures in the facts, the counter and the meta lines.
js: Draws the machine on a 128 x 184 canvas scaled by whole pixels, turns a crank in quarter-turn detents (drag, tap, keyboard), plays the release, settle, chute and lid steps and cuts the card, scrubs the list's capsules open, and runs the subscription form, the dialog and the confirmation (nothing is sent).
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [testimonials, subscription, capsule, toy, vending machine, canvas, rotary control, pixel, violet, dialog, form, dark, gsap, lenis]
use_when:
  - Testimonials for a subscription box, a blind-box toy line or anything that arrives sealed and is opened by the customer.
  - A set of short quotes (six to twelve) that are worth reading one at a time and also in full.
  - The product comes in a few series, editions or flavours that can each own one hue.
avoid_when:
  - "Quotes longer than about 60 words: the slip reserves the height of the longest one, and the machine only shows one at a time."
  - Serious or regulated subjects (health, finance, legal). A toy machine makes every quote feel like a prize.
  - Pages that already have a playful hero or another large drawing beside the copy. Two machines fight.
---

## Why it works

**The one bold idea: a testimonial is something that comes out of a capsule.** The machine on the right is the reason to read. One full turn of its crank lets one capsule out of the pile: the capsules above the gap settle down in whole steps, the capsule goes down the chute one cell at a time, lands in the tray, and its lid lifts off in three steps. On the first of those steps the card on the left cuts to that subscriber's words, and the card's own top half lifts with the tray lid, step for step. The slip that pokes out from between the tray capsule's halves carries the subscriber's first name and points back at the card. So the visitor sees where the words came from, and the colour of the capsule is always the colour of the series that subscriber started with.

- **One system, top to bottom.** The same component carries every quote: a milk slip (the paper inside every real capsule) between a stepped top half in the light tone of its series and a stepped bottom half in the deep tone, with a 4px violet-deep seam on each rim. It is the card at the top, each of the nine list items, the series tiles in the form (drawn as whole capsules in CSS), and the confirmation (your own capsule in a tray, with your email on the slip). The type scale, the 8px spacing cell and the 4px notch are the same in all four places.
- **The pile is a pile, not a shelf.** Capsules sit on a staggered lattice (even rows six, odd rows five, set in by half a capsule, 14 px apart vertically so they nest). The top is uneven (rows of 6, 5, 6, 4 and 3, with a gap). A release vacates the exit slot, and a pure `settle()` pulls a capsule down from above, alternating left and right, then the gap that leaves pulls the next, all the way up; when nothing is above the exit, the nearest floor capsule rolls to it one place at a time; and anything left with nothing beneath it drops. So every turn visibly reshuffles four or five capsules diagonally and changes the shape of the top. Because `settle()` is deterministic, `refill()` simulates all 24 releases ahead and gives each capsule the series of the subscriber it will deliver. When the dome is empty it refills with a hard cut.
- **The machine reads as parts.** A haze-framed glass dome with a glint, a dark neck, a lighter violet front face with a darker shadow side, a chute with rails and a tick at each cell, a coin slot with a lit slit, a crank plate, and a tray that stands proud of the face with posts and a lip. The tray capsule is drawn at 24 machine pixels against the dome's 16 (the tray sits nearer the eye), so its two halves and its 10-pixel lid lift read at a glance, about 96 CSS px across at 1440 x 900.
- **Whole pixels only.** The script picks one machine pixel of 2 to 5 CSS px so the machine fits the window: 4 at 1440 x 900 (512 x 736), 3 at 1366 x 650 and 1280 x 600 (384 x 552, the whole machine above the fold), 2 on phones, where it sits under the headline. The canvas is drawn at that scale times the device ratio, with integer coordinates, so edges stay hard.
- **Colour jobs.** Violet is the ground and the material of the machine: a darker violet for its shadow side, chute, tray well, seams and the dialog scrim, lighter ones for the front face and the dome glass, and violet is also the ink printed on the milk slips. Milk is text and the paper slips. Haze is secondary text, rules, outlines and resting field walls. Pond aqua, Attic peach and Rooftop lime appear only on their own capsules, chips and tiles, each in two tones. Coin brass is everything you operate: the crank, the coin slot, the primary button and its coin, the ticked box, the focused field's lid and every focus ring. Fault red is errors only.
- **What differs from the nearest designs in the ledger.** `crud-memory-card` also fills slots, but with blocks of saves; here the slots are a hexagonal pile that physically settles. `features-cyberdeck-kit` drops blocks in scroll; here nothing moves on scroll except the list's capsule halves, and the pile moves only when the visitor turns a rotary control. No design in the ledger has a rotary input with detents, a vending sequence, or quotes held between capsule halves.
- **Copy.** Nine short quotes, each with a concrete use, a concrete fault and a concrete fix (a lost foot, a cracked seam, stiff halves, the 20th cut-off, a large-type card, slow post to Canada, an empty capsule, a scratch), plus who it was given to. Series hues match the series each person started with, three each, interleaved so a run of turns shows all three colours. No ratings.
- **Semantics.** The section is labelled by its `h2`. The card is inside an `aria-live="polite"` region, so a turn announces the new quote. The canvas is `aria-hidden`; the crank is a real `<button>` over the drawn crank, with a description, and its label says how many clicks of the current turn have been made. The nine are an `<ol>` of `figure`/`blockquote`/`figcaption`. The facts are a `dl`, the series are a `fieldset` of radios with a `legend`, the dialog's contents are a `table`.

Deviations from the brief, and why:

- **The tray capsule is 24 machine pixels, not 16.** At the dome's size it read as small in the tray, and the art director asked for it to read clearly as two halves. The tray is drawn standing out from the face, so the larger capsule reads as nearer, and it is a hard cut at the bottom of the chute.
- **The crank hint and the capsule counter sit under the two text actions on desktop**, not under the machine, so the machine alone fills the right column and nothing is cut at the bottom of a 650 px window. On phones they stay under the machine.

## Do not touch

- **`settle()` must stay pure and deterministic.** `refill()` plans each capsule's colour by simulating every release with the same function and the same left/right alternation (`flip`). If the live settle and the plan diverge, the capsule that comes down the chute will not match the card.
- **The machine pixel is a whole number.** `fit()` sets `--p` from 2 to 5; the crank button and the slip tag are placed in `calc(var(--p) * n px)` from the same geometry the canvas uses (hub at 90, 128; tray at 44, 147). Change one coordinate in `draw()` and the button no longer sits on the crank.
- **The quote is never covered.** A closed half overlaps the slip only by `--ov`, and the slip's padding is `--ov` plus 16px. The three list states are `data-open` 0 (touching), 1 (6px), 2 (12px), and no attribute (fully apart by `--part`). No attribute is the state without the libraries and with reduced motion.
- **The card slip reserves the height of the longest quote** at the current width (`sizeCard()`), so a cut never moves the page.
- **Pixel corners live on inner elements** (`.btn-face`, `.slip`, `.dlg-rim`), never on a `<button>` or `<a>`, so focus rings are not clipped.
- **No loop runs at rest.** The machine redraws only when its state changes; every step of a turn is a `gsap.delayedCall`, and the matchMedia cleanup runs any pending steps at once (`flush()`), so the machine can never be left half way.
- **Hidden states exist only under `html.js:not(.go)`** (the crank hint while stocking). When the libraries are present and motion is allowed, the plain-JS first draw already shows the empty dome, so there is no flash of a full one before stocking.

## Motion

House stepping: everything moves in whole steps on a visible frame rate, 60 to 120 ms per frame, set by `--d-*` tokens. Nothing eases. Colour changes are instant. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`); touch keeps native scroll. The load waits for the fonts (1.5 s timeout) and a visible page. Without the libraries, and with reduced motion, `sched` is null and every step of a turn runs at once, in order.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Stocking | Canvas rows, hard cuts | Load (fonts ready, page visible) | Empty dome, then rows 1 to 5 appear bottom first, one every 90 ms (`--d-stock`); additive, never alternating | Full dome |
| Crank twitch | Canvas detent | End of stocking | One detent clockwise, back after 120 ms (`--d-click`) | None |
| Crank, pointer and touch drag | Rotary control with four detents | pointerdown and pointermove on the crank (pointer capture, `touch-action: none`) | The angle round the hub is read; past 45 degrees from the current detent the handle jumps a quarter. Forward only past the start of a turn (a ratchet); the fourth click releases a capsule | Same, instant |
| Crank, tap or click | Played full turn | click (tap, mouse, Enter, Space) and "Turn the crank for another" | Four clicks 120 ms apart, then the release | Instant release |
| Crank, keyboard | Quarter clicks | ArrowRight / ArrowDown forward, ArrowLeft / ArrowUp back within a turn | One detent per key press | Same |
| Crank hover and focus | Instant state | pointerenter, focus | The crank plate's ring turns coin | Same |
| Release | Canvas hard cut | Fourth click | The exit capsule cuts into the top of the chute; the tray empties; the card's halves close | Instant |
| Pile settles | Canvas, whole steps | Release | Each capsule pulled into a gap moves in two steps (half way, then in place), 70 ms apart (`--d-settle`), in chain order from the exit up; floor rolls move one place per step | Instant |
| Chute | Canvas, cell by cell | Release | Four cells, 90 ms each (`--d-chute`), then a hard cut into the tray | Instant |
| Lid lifts, card cuts | Canvas + `data-open` on the card | Landing | Three lid steps of 3, 6 and 10 machine pixels, 90 ms apart (`--d-lid`); on the first the card's quote cuts and its top half lifts 6, 12, then fully apart with the tray lid; on the third the slip and name tag appear | Instant, open |
| Refill | Canvas hard cut | The release that empties the dome | Full pile, new colour plan | Same |
| List capsules part | ScrollTrigger scrub, stepped | Each list capsule from top at 94% to top at 36% of the viewport | progress split in four: closed, 6 px, 12 px, fully apart (28 px) | All open |
| Button hover: the coin drops | CSS keyframes, steps(3) | :hover (hover devices), :focus-visible | A 20 px coin appears above the slot at the right end and drops 33 px in three steps of 60 ms (`--d-coin`) behind the face; the slot's slit then stays lit in coin | Slit lit, no coin |
| Button press: the return flap | Class held from pointerdown | pointerdown, held at least 140 ms (`--d-hold`) | The 4 px flap under the face drops 4 px to show the dark opening, and the face inverts (violet with a coin ring and coin text) | Same |
| Text links: the seam opens | CSS transitions, steps | :hover, :focus-visible; touch: `.is-tap` for 200 ms from pointerdown | The 4 px seam (milk over haze) parts into 2 px, a 3 px gap, 2 px, in two 50 ms steps (`--d-seam`) | Instant |
| Field: the lid lifts | CSS transition, steps(2) | :focus-within | The top border, a separate lid, lifts 4 px in two steps (`--d-fieldlid`) and turns coin with the walls; the label chip sits in the gap. Invalid: the lid stays shut and the field takes fault | Instant |
| Dialog tumbles in | gsap.set frames | "What is in a capsule" | Four frames, 70 ms each (`--d-tumble`): from off the left edge at 270 degrees, then 180 and 90 while stepping to the centre, then upright. Leaves in two frames: a quarter turn and out to the right. Lenis stopped while open | Instant |
| Success: your capsule | gsap.set frames | Valid submit | The capsule in the chosen series drops into the tray in three 90 ms steps (`--d-drop`), bounces 3 px then 1 px in 60 ms frames (`--d-bounce`), then the slip with your email appears; focus moves to the heading | Instant |

## Adapting

1. **Map the tokens first.** Keep the ground's family (ground, a darker one for the machine's shadow, chute and scrim, lighter ones for the face and glass), one paper colour for slips and text, one secondary text colour, one operating colour (crank, button, focus) and one error colour. Give each product line, edition or flavour one hue with a light and a deep tone; three works, five is the most the pile reads with.
2. **Replace the quotes in the list only.** The card and the machine read `#list > li`: the `data-series` on `.cap`, the blockquote, `.who` and `.meta`. Keep each quote under about 60 words. Add a series by adding a `[data-series]` rule and the two hue tokens, plus a tile in the form.
3. **Change the machine only through its geometry constants.** `START` (which lattice slots are filled), `EXIT`, `CHUTE`, `HUB`, `TRAY` and `LIDS` in the script, and the crank and tag positions in CSS, all in machine pixels. Keep 24 capsules or fewer so a 16 px capsule still reads at a scale of 3.
4. **Retime from the tokens.** Every step duration is a `--d-*` token read by CSS and the script.
5. **To drop motion pieces:** remove the list ScrollTriggers (the capsules stay open), or the stocking block (the dome starts full; set `willStock` to false). Keep the release sequence: it is the design.
6. **In a framework,** render the markup statically, keep the canvas module plain, and port the matchMedia branch as one effect whose cleanup runs `flush()`.

| Token | Role |
|---|---|
| `--violet` | Ground, the field ground, the inverted button face, ink on milk slips (10.8:1) |
| `--violet-deep` | Machine shadow side, neck, chute, tray well, seams, button slot, the scrim's base |
| `--violet-face`, `--violet-glass`, `--violet-glint` | The machine's front face, the dome glass, the glass reflection (decorative) |
| `--milk` | Text (10.8:1), paper slips, the slip in the tray |
| `--haze` | Secondary text (6.9:1), rules, outlines, the resting seam half, resting field walls |
| `--pond`, `--pond-deep` | Pond capsules, chips and tile (7.9:1; 4.6:1) |
| `--attic`, `--attic-deep` | Attic (6.7:1; 3.9:1, decorative half only) |
| `--rooftop`, `--rooftop-deep` | Rooftop (9.3:1; 5.4:1) |
| `--coin`, `--coin-deep` | Crank, coin slot, primary button, coin, ticked box, focused field, focus rings (8.3:1); the knob's shade, the coin's rim, the return flap |
| `--fault` | Errors only (6.2:1) |
| `--scrim` | Dialog backdrop (violet-deep at 88%) |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk |
| `--t-small` ... `--t-h2` | 13, 15, 17, 21, 22, 30, clamp(46px, 5.1vw, 78px); tighter on phones and on short wide windows |
| `--lh-body`, `--lh-quote` | 1.55 and 1.45 |
| `--cell`, `--s1` ... `--s9` | 8px cell; spacing 4 to 144 |
| `--notch`, `--tap`, `--hit`, `--max-w` | 4px stepped corner, 48px button and field, 44px minimum target, 1296px content |
| `--p` | One machine pixel in CSS px (2 to 5, set by the script) |
| `--hh`, `--ov`, `--part` | Capsule half height, closed overlap into the slip, fully open stand-off |
| `--d-*` | click 120, stock 90, settle 70, chute 90, lid 90, coin 60, hold 140, tap 200, seam 50, fieldlid 50, tumble 70, drop 90, bounce 60 (ms) |
