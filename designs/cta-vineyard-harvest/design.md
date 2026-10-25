---
title: Your rows
section: cta
subject: Viña Herrera (fictional), a family vineyard in Guarilihue, Itata Valley, Chile, asking volunteers to pick 4.2 ha of dry-farmed old bush vines on Saturday 13 and Sunday 14 March 2027.
aesthetic: A planting plan of head-trained bush vines on a pressing-shed wall. Pale lilac-grey wall stained with must, must-dark ink, leaf-green vine rings and one Cinsault accent that only ever means "your share"; no grapes, leaves or wood.
mode: light
fonts:
  - Faustina (Google Fonts, variable wght 400-700 and italic 400), the only family
js: Builds the planting plan (1,344 dots, one per 20 vines) and the six block rows from one DATA and BLOCKS table; choosing a day and party size in the form walks your share as a serpentine path through that day's first block and states the arithmetic in a live sentence; validates the form in JS, swaps to an in-page confirmation that decrements the places left, and runs the GSAP and Lenis choreography.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [cta, sign-up, volunteer, harvest, vineyard, planting-plan, dot-grid, serpentine-path, form, dialog, gsap, lenis]
use_when:
  - The ask is to give a block of physical work on a given day (a harvest, a planting, a beach clean, a litter pick), and the work divides honestly into a measurable share per person.
  - The organisation can state real constants (units per area, units per person per shift) so the share on the drawing is arithmetic, not decoration.
  - You want the form's own choices (day, party size) to answer back with something concrete before the person types their name.
avoid_when:
  - The sign-up is a mailing list, a donation or an event ticket. There is no share of work to draw.
  - The volunteer chooses a place or slot. Use a slot map like `cta-bird-count` instead; here the visitor never picks a place.
  - The site is spread over many plots that cannot be drawn on one plan at a scale where a person's share is still a visible handful of marks.
---

## Why it works

**The bold idea is "your rows".** The section opens on a planting plan of the Herrera family's six blocks: 1,344 leaf-green rings on a square grid, the way head-trained bush vines are planted, one ring for every 20 vines. The form beside it asks which day and how many of you (Saturday and "Just me" are chosen on load). The plan answers with the work that choice commits you to: from the row end of that day's first block (Los Quillayes on Saturday, El Alto on Sunday, both in turn for both days) a Cinsault line walks a strip four vines-dots wide, back and forth down the rows, and at an even pace led by a small Cinsault head dot, and each dot it passes is cut: the ring fills with Cinsault in a small pop, in path order. A tag above the plan ("Saturday, 7:30") marks where you enter, the other blocks step back, and a live sentence states the sum: "You and 1 other pick about 480 vines in Los Quillayes, Saturday 7:30 to 12:30." Change the day or the party and the walk is redrawn from the row end. The share is a line plus separate dots, never a filled area.

- **The arithmetic is real and asserted.** `DATA` holds the planting square (1.25 m, so 6,400 vines a hectare), 20 vines a dot, 240 vines a picker each morning (about seven 18 kg crates at half a kilo a vine) and the strip width. The plan's lane lines were tuned so each block holds exactly `ha × 6,400 / 20` dots: Los Quillayes 256, La Higuera 192, El Alto 288, Don Lalo 160, El Bajo 224, La Cruz 224, which is 1,344 dots and 26,880 vines for 4.2 ha. The self-test (`#selftest`) checks every one of those sums, that every party size fits its block clear of the painted names, the dates' weekdays, the sentences, both-days validation against both days' places and the whole form flow. The honest scale is also why a share is small: one picker is under 1% of the vineyard, and the design says so instead of inflating it.
- **The second volunteer CTA in the collection, and a different one.** In `cta-bird-count` the visitor claims a square on a map. Here the visitor never picks a place: the family assigns the rows, and the plan answers with the work the visitor's choice of day and party commits them to.
- **The plan is drawn the way the vineyard is.** Dots on a 10-unit grid; one-dot lanes between blocks along slanted lines, so tracks appear without being drawn; block outlines run along the lane centre lines, half a dot clear of the vines; the shed and its yard take the south-east corner, because that is where coffee and secateurs are at 7:00. Block names are painted on paper plates at block ends and knock out the vines under them whole.
- **One meaning per mark.** A leaf ring is 20 vines. Cinsault means your share on the plan, the chosen chip, the primary actions and focus; it never means "ripe". The Brix readings live as text in the six rows ("Six blocks, read this morning"), where La Cruz says plainly it is not ready and the family picks it on 20 March. The rows are buttons: hovering, focusing or tapping one (or hovering or tapping a block on the plan) outlines that block, opens its painted name plate to the same reading ("Los Quillayes 23.8 °Brix, Saturday 7:30"; "La Cruz 20.9 °Brix, not ready, picked 20 March") and draws a rule under its row; a click or tap pins it (`aria-pressed`). On phones, where nothing hovers, a sticky 96px copy of the plan above the rows outlines each block as its row crosses the middle of the screen. Nothing lives only behind hover.
- **Everything else is quiet.** The H2 rises once, the vineyard plants itself once, rules draw under rows as they arrive. On a valid submit the tag over your share becomes yours ("Ana, Saturday 7:30"), the cut vines pulse once in path order, and the confirmation opens as a circle from the last of them; the cut dots stay cut.
- **Faustina, alone.** An Argentine text serif (Omnibus-Type) with tabular figures, checked at build against the served Google Fonts file: "1111" and "0000" both measure 238.0px at 100px with `tabular-nums`, 160.8px and 238.8px without; its default figures are lining, so `lining-nums` is a no-op kept for portability. H2 700 at -0.01em, H3 and block names 600, body 400 at leading 1.6, readings, times and counts 500 with lining tabular figures, italic only for units, tags and the shed.
- **Revisions made against the collection's defaults and the art director's review.**
  1. Default 1 (cream, serif, terracotta). The ground is a pale lilac-grey shed wall (#ECE6EA), stained by must, not cream; three sections already sit near #EEF0EA, so the earlier lime-wash was dropped. The accent is must purple, and the type is a sturdy text serif rather than a high-contrast display face.
  2. Fonts. Literata (used in four sections) became Faustina; the stencil H2 (too close to `features-coffee-roaster` and `process-brewery`) was removed, and the block names are Faustina 600 rather than a stencil.
  3. Signature. A refractometer lens over the plan was dropped: lenses already carry `hero-perfumery`, `contact-brand-agency`, `contact-expedition-outfitter`, `gallery-botanical-illustration` and `footer-architecture-biennale`. Hold-to-confirm was dropped too (it is `contact-recording-studio`'s signature) for a plain "Save my place" submit.
  4. Default 8. The scrubbed words-converge paragraph and its 160vh pin were cut; the family paragraph is static. The only text effect is the H2 line rise.
  5. Template chrome. No eyebrow (the dates are in the headline), no in-section nav, no arrows on links, no monospace, no all-caps, no middle dots. The fixed "Save my place" pill was removed: a fixed element leaves the section and floats over whatever comes next. Under 992px the hero's "Choose your day" link does the job; from 992px the form sits beside the heading. That link was "Save my place" until review: it only scrolled, so it now says where it goes, and only the submit says "Save my place".
  6. Default 4 (card kit). Blocks are list rows with rules, not cards; no shadows or gradient washes; each radius means one thing.
  7. Errors reveal in a reserved line by clip-path and opacity, never by animating height or `grid-template-rows`.
  8. At the final critique the Cinsault bar that marked "your" blocks in the rows was removed as the one accessory too many: the dimmed plan, the tag and the sentence already say where you will be.

## Do not touch

- **The sums.** Change `DATA` or `BLOCKS` and rerun `#selftest`. Each block's dot count must equal `ha × vinesPerHa / vinesPerDot`, and `vinesPerPicker` must be a whole number of dots. If you change areas, retune the lane lines in `LINE` (or the yard) until the self-test passes; never fake a count.
- **The share is a line plus dots.** Keep the cut dots small enough that the line shows between them and at every turn (`r="3.5"` on a 10-unit grid). A bigger dot or a filled polygon turns it into an area flood.
- **The walk always starts at the row end.** Every change redraws from the block's first row; rapid changes finish the previous walk instantly and start again, never queue.
- **One meaning for Cinsault on the plan**: your share. Hover outlines also use it because they point at a block, not at a state. Do not add ripeness colour to the dots.
- **The rows carry the readings as text**, and the SVG's `role="img"` label describes the plan; the tags and names are `aria-hidden`. The live sentence is `aria-live="polite"`.
- **Contrast.** Must on wall 12.5:1 (on paper 14.1:1); Cinsault on wall 7.2:1 and wall on Cinsault 7.2:1 for the buttons; ink-soft 5.8:1 on wall, 6.5:1 on paper, 5.2:1 on the chosen chip; must on the chosen chip 11.2:1. Leaf is graphics only: 3.5:1 on wall, 4.0:1 on paper. Field borders (`--edge`) 3.6:1 on paper. Dimmed blocks (leaf at 38%) are context only, about 1.6:1; their names stay full contrast and the rows hold every fact.
- **Forms never post.** `novalidate`, `preventDefault`, `required` on the day radios, the select, name and email. "Both days" is checked against both Saturday's and Sunday's places, and a confirmation decrements both counts; "Change my booking" restores them. The cot checkbox is disabled (and cleared) for Sunday only, since cots are for Saturday night. Errors sit in reserved lines tied to their field by `aria-describedby`, and focus moves to the first invalid field; there is no `role="alert"`, so nothing is announced twice.
- **Hidden starting states only under `html.js`** (added only when GSAP, ScrollTrigger, SplitText and Lenis loaded) and only with `prefers-reduced-motion: no-preference`. Without the CDN everything works with instant changes and native anchors.
- **`[hidden] { display: none !important }`.** The form is `display: grid`, which would otherwise beat the UA rule and leave it visible under the confirmation.
- **Lenis stops while the dialog is open**, and the dialog closes through its circle for Close, Escape and a backdrop click, then returns focus to its button.

## Motion

House easing: expo.out for entrances, walks and settles; power3.out for closing circles; none is scrubbed; a back-out curve only for the radio dot. Everything runs inside `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide` conditions (`wide` widens the planting spread). Lenis (lerp .1, `autoRaf: false`, `anchors: false`) runs on `gsap.ticker` with `lagSmoothing(0)`; in-page links go through `lenis.scrollTo` with a distance-scaled expo glide, then focus the target heading. Cleanup removes the ticker callback, destroys Lenis, kills the walk, caption and planting triggers, reverts the H2 split and settles every state.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| H2, masked lines after fonts load (1.2s cap) | TX1 | Load, t=0 | yPercent 110 to 0, 1s expo.out, stagger .08; split reverted after | Static |
| Lead and the two hero actions | LD8 | Load, t=.25 | opacity 0 to 1, y 16 to 0, .8s expo.out, stagger .06 | Static |
| The vineyard plants itself | TR3 (by distance from the south-west corner) | Load t=.2 when the plan is in view; on phones ScrollTrigger `top 85%`, once | each dot scale 0 to 1, .5s expo.out, delays spread over .9s (.72s narrow) | Planted |
| Block names | LD8 | End of the planting | opacity .4s, stagger .05 | Static |
| Your rows (signature) | Custom path walk (stroke-dashoffset on `pathLength="1"`) plus TR3 along the path | End of the planting; any change of day or party | tag fades up .5s; path 1 to 0 at an even pace, sine.inOut over clamp(.9s, dots x .055s, 2.4s) (.9s for one picker, 2.4s for four), led by a Cinsault head dot riding the path; each dot scale 0 to 1, .3s back.out(1.6), delayed to the moment the line reaches it (inverse of sine.inOut); both days start the second walk when the first ends; previous share fades .2s; other blocks dim to 38% over .4s; sentence crossfades .12s out, .25s in | Drawn at once |
| Block outline and name plate | HV11-style draw around the block; plate reading revealed by clip-path | Mouse hover over a block or row; focus on a row; click or tap on a row or block (pins) | stroke-dashoffset 1 to 0, .45s expo.out; fade out .2s; plate reading clip-path inset .35s expo.out; the row's 2px rule sweeps in .4s | Shown at once |
| Mini plan (phones) | Scroll-driven block outline | ScrollTrigger per row, `top 55%` to `bottom 45%`, toggle only, under 992px | the sticky 96px plan above the rows outlines the row's block, same .45s draw | Shown at once |
| Row and schedule rules | SC16 | ScrollTrigger batch `top 88%`, once | `--d` scaleX 0 to 1 from the left, .9s expo.out, stagger .06; the text itself never fades | Static |
| Hero "Choose your day" (under 992px only), submit | HV4 plus MI1 | Hover, focus-visible, press | fill scaleX from the entry edge, .45s in, .35s out to the exit edge; press scale .97 over .12s, release .4s power3.out | Colour only |
| "See the weekend", "What to bring", "Close", "Change my booking", confirmation links | HV2 plus MI1 | Hover, focus-visible, press | .07em underline in from the left, out to the right, .45s; resting 1px hairline | Underline shown; always shown on touch |
| Anchors | NV6 | Click | `lenis.scrollTo`, min(1.3, .65 + distance/4000)s expo, then focus the heading | Immediate jump |
| Text inputs and select | MI4 with static labels | Hover, focus, invalid submit | hover 1px leaf rule; focus 2px Cinsault rule scaleX .25s expo; label to must .2s; error clip-path inset plus opacity .25s in a reserved line | Instant |
| Day chips | MI3 | Hover, change | border leaf to Cinsault .2s; tint wipes in by clip-path inset .35s expo; dot pops .35s back-out | Instant |
| Cot checkbox | MI4 tick | Change | tick stroke-dashoffset 1 to 0, .3s; box fill .2s | Instant |
| "What to bring" dialog | CD7 with a circle | Click; Close, Escape, backdrop | panel clip circle from the button centre .6s expo.out, content fades in at .2s; closes back to the button .35s power3.out, then `close()`; Lenis stopped while open | Instant |
| Confirmation | CD7-style circle swap | Valid submit; "Change my booking" | tag crossfades to "Ana, Saturday 7:30" (opacity .2s, then y 4 to 0 .35s expo.out); cut vines pulse scale 1 to 1.35 to 1 over .4s in path order; form fades .25s; panel clip circle from the last cut vine on the plan, .7s expo.out; reverse .35s power3.in while the form fades back and the tag returns to the day | Instant swap |

## Adapting

1. **Data first.** Replace `DATA` (planting square, units per dot, units per person per shift, strip width), `BLOCKS` (names, varieties, years, hectares, readings, `when`, optional `note`, label positions) and `DAYS` (first block and hours for each day). Then adjust the lane centre lines in `LINE` and the `YARD` corner until `#selftest` reports every block's dots add up. A small node loop over the line end points finds exact fits quickly.
2. **Another kind of work.** The pattern is "show the whole site, then walk the person's honest share of it". Trees to plant on a hillside, metres of beach to clean, shelves to sort in a food bank: keep one mark per fixed quantity, a stated rate per person, a start point that exists on site (row end, gate, loading bay) and a boustrophedon path.
3. **Copy.** Keep the headline as an invitation with the dates in it, the lead as who, where and why now, the sentence as "Who pick about N units in Place, Day hours.", and errors that say how to fix the field. Buttons say what happens: "Save my place", "Change my booking".
4. **Tokens.** Map the brand by role: wall (ground), paper (plan and fields), ink, one accent that means "yours" and drives actions, a graphics-only secondary for the units. Keep the accent at 4.5:1 on the ground and the secondary at 3:1.
5. **Layout.** From 992px the plan opens the section in the left 8 of 12 columns with the six rows under it, and the heading (52px), lead and form take the other 4 beside it, so the vineyard plants itself and the first walk happens in the first viewport, next to the words that explain it; the hero "Choose your day" link is hidden there because the form is already beside it. Under 992px the order is heading, plan, form, rows, weekend, and "Choose your day" glides to the form and focuses the chosen day; the day and party fields come first in the form because they drive the plan. Block names are 15px (14px under 640px). The weekend paragraph sits beside the schedule from 1200px.
6. **Retiming or removing motion.** CSS durations and curves are `--dur-*` and `--ease-*`; the script reads `--t-walk`, `--t-walk-dot`, `--t-walk-max`, `--t-cut`, `--t-plant`, `--t-spread`, `--t-dialog`, `--t-dialog-out`, `--t-done` and `--t-done-out` (seconds). To remove the planting, delete the `plant` timeline and call `drawShare(true)` from the intro; to remove the rule draw-in, delete the `ScrollTrigger.batch` call. Every vanilla function (`drawShare`, `setHL`, the dialog and the confirmation) already falls back to instant changes when motion is off, and removing the four CDN tags gives exactly the reduced-motion page.
7. **Stack translation.** Keep `DATA` and `BLOCKS` as data, render the plan and rows from them, keep the form as a real form whose day and party feed the plan, and keep the confirmation in the same grid cell as the form.
8. **The self-test.** `runSelfTest` and the `#selftest` line at the end of the vanilla script are for checking the sums while you adapt; delete both when porting the section to a site.

| Token | Role |
|---|---|
| `--wall` | Page ground: pale lilac-grey pressing-shed wall. |
| `--paper` | Plan sheet, name plates, fields, chips, dialog and confirmation panels. |
| `--must` | Ink, plan frame, shed outline, field hover fill on buttons. |
| `--cinsault` | The one accent: your share on the plan, tags, primary fills, chosen chip, focus ring, errors, hover outline. |
| `--leaf` | Vine rings, chip borders, field hover rule. Graphics only. |
| `--ink-soft` | Labels, hints, row details, the key. |
| `--rule` | Hairlines between rows and slots. |
| `--edge` | Field borders (3.6:1 on paper). |
| `--tint` | Chosen chip fill. |
| `--yard` | The shed's footprint on the plan. |
| `--scrim` | Dialog backdrop. |
| `--font-text` | Faustina, with Georgia as the fallback. |
| `--fs-xs` ... `--fs-xxl` | 14, 16, 18, 24, 24-36 and 44-72px. |
| `--fs-plan` | Block names on the plan: 15px, 14px under 640px. |
| `--s1` ... `--s9` | Spacing 4, 8, 12, 16, 24, 32, 48, 72, 112px. |
| `--gutter`, `--max`, `--col-gap` | clamp(16px, 5vw, 72px) side gutter, 1280px width, 24px column gap. |
| `--r-field`, `--r-pill` | 4px inputs and chips; 999px actions. The plan and panels are square. |
| `--ease-out`, `--ease-follow`, `--ease-sweep`, `--ease-pop` | expo.out, power3.out, the HV2 sweep, about back.out(2). |
| `--dur-xs`, `--dur-s`, `--dur-m` | .12, .25, .45s. |
| `--t-walk`, `--t-cut`, `--t-plant`, `--t-spread` | Signature and planting: walk .9s, cut pop .45s, each dot's planting .5s, planting spread .9s. |
| `--t-dialog`, `--t-dialog-out`, `--t-done`, `--t-done-out` | Dialog circle .6s in and .35s out, confirmation circle .7s in and .35s out. |
