---
title: Read the sugar, then pick
section: cta
subject: Viña Herrera (fictional), a family vineyard in Guarilihue, Itata Valley, Chile, asking volunteers to pick 4.2 ha of dry-farmed old bush vines on Saturday 13 and Sunday 14 March 2027.
aesthetic: A picker's refractometer over a bush-vine planting plan. Pale rose-grey granite dust, must-stained ink, one Cinsault accent and the instrument's blue field and scale; no grapes, leaves or wood.
mode: light
fonts:
  - Faustina (Google Fonts, variable wght 300-800, roman and italic), the only family
js: Builds the planting plan, the eyepiece scale and the six block rows from one BLOCKS table; choosing a block runs the reading ritual (drop, plate, shadow line, rolling figure, dot ripple) and rewrites a live caption; validates the sign-up form in JS, names the outcome on its button, swaps to an in-page confirmation that decrements the places left, and runs the GSAP and Lenis choreography.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [cta, sign-up, volunteer, harvest, vineyard, refractometer, instrument, planting-plan, form, dialog, gsap, lenis]
use_when:
  - The ask is to show up somewhere physical on a given day (a harvest, a planting, a beach clean, a count) and the reason for the day is a measurement people can be shown.
  - The organisation has a small set of places (fields, blocks, beds, sections) each with one reading that decides when it is worked.
  - You want the reader to understand "where will I be, and why that day" before the form asks anything.
avoid_when:
  - There is no real reading behind the schedule. An instrument with invented numbers is costume.
  - The sign-up is a plain mailing list or donation. The plan and eyepiece would be a detour.
  - More than about eight places, or places that are not spatial. The plan stops reading and the rows become a table.
---

## Why it works

**The bold idea is the reading ritual.** Beside the plan sits one fixed eyepiece, drawn as what a picker sees when squinting into a hand refractometer: a circle in a must-coloured eyecup, a vertical 0 to 30 °Brix scale, a fixed tick labelled "Ready at 22", a prism-blue field above a lit field, and the Brix figure. Choosing a block (its row, a click or tap on it in the plan, or ArrowUp and ArrowDown through the rows) runs the three real steps. A drop of must lands on the prism (a must circle grows from the centre). The daylight plate closes on its hinge (a frosted cover folds down from the top edge). The blue/white shadow line then glides along the scale to the block's reading, from wherever the last reading left it, and the figure rolls to the same number in step. At the same moment that block's vines answer on the plan: they fill with Cinsault in a ripple from the block's row-end post if the block reads 22 °Brix or more, or pulse as leaf outlines if it does not. The caption under (or beside) the eyepiece then rewrites. Nothing follows the pointer. The section answers the volunteer's real question, "where will I be working, and why that day", with the instrument the family actually uses to decide.

- **One table, no drift.** `BLOCKS` holds each block's name, variety, planting year, hectares, Brix, picking time, caption note, outline and row-end post. The plan, the rows, the captions and the ritual all read from it. A self-test (`#selftest`) checks that the blocks add up to 4.2 ha, that each outline's area matches its hectares within 2%, that 13 and 14 March 2027 are a Saturday and a Sunday, that every block has vines, the La Cruz and Los Quillayes captions, and the whole form flow.
- **The plan is drawn the way head-trained vines are planted.** 217 dots on a square 22-unit grid, with a lane left wherever a dot would sit within 7 units of a block boundary, so tracks appear between blocks without being drawn as decoration. Block outlines are proportional to their hectares. Names are painted at the row ends in Faustina 600, in the gaps between dot rows, each with a short post bar that turns Cinsault on the selected block.
- **Structure encodes truth.** A Cinsault dot means a ripe vine and nothing else. The "Ready at 22" tick is the threshold the dots use. El Bajo reads 21.6 and is still picked on Sunday, so its caption says so ("It should pass 22 by Sunday; we pick it from 11:30.") instead of hiding the gap. Schedule rules mark the start of each time slot and draw before their text. The places left in the chips and the intro are live counts.
- **Everything repeats the eyepiece circle and stays quiet.** The "What to bring" dialog opens as a circle from its button, and the confirmation opens as a circle from the submit button. Those are the only other circles; the rest is rules, rows and two pill shapes.
- **The submit button names the outcome and follows the form.** "Save my place", "Save my place on Saturday", "Save 2 places on Sunday", "Save 3 places for both days", swapped with a masked label. The confirmation keeps the same verb: "Your 2 places are saved, Ana".
- **Faustina, alone.** A sturdy Argentine text serif with tabular figures (checked at build: "1111" and "0000" both measure 238.0px at 100px with `tabular-nums`, 160.8 and 238.8 without). H2 800 at -0.01em, block names 600 at 15px (14px on phones), H3 600, body 400 at leading 1.6, readings, times and counts 500 with lining tabular figures, italic only for hints, units and "Ready at 22".
- **The second volunteer CTA in the collection, and a different one.** `cta-bird-count` is a slot-picking map: you claim a square. This one is a reading instrument followed by an ordinary form: you learn why the weekend is the weekend, then you sign up.
- **Revisions made against the collection's defaults.**
  1. Default 1 (cream, serif, terracotta). The ground is a cool rose-grey granite dust (#E8E0E3), the soil Itata dry farming sits on, not cream; an earlier lime-wash (#EEF0EA) was dropped because three other sections already use that wall. The accent is must purple, and the type is a sturdy text serif rather than a high-contrast display face.
  2. Default 5 (template chrome). The draft eyebrow "Harvest weekend, 13 and 14 March" was removed and the dates moved into the headline. Captions use a colon and commas, never middle dots. No arrows on links, no monospace and no all-caps.
  3. Template chrome. The in-section nav was dropped: a CTA is not a page. Two hero actions and a sticky "Save my place" pill, hidden while the form is in view, do its job.
  4. Default 8. No batch fade-ups. The schedule's motion is a rule draw-in because the rules mark time slots, and the only text effect is the H2 line rise. A scrubbed words-converge paragraph was cut: it put a 160vh pin between the reader and the form, and flying words belong to `hero-doc-festival`. The paragraph is static.
  5. Default 4 (card kit). Blocks are list rows with rules, not cards. No shadows, no gradient washes, and each radius means one thing.
  6. The signature changed from a pointer-following lens (too close to `hero-perfumery`, and CU4 is used in four other sections) to the fixed eyepiece and its ritual. A hold-to-confirm button was dropped (it is `contact-recording-studio`'s signature) for a submit button that names the outcome.
  7. The native cursor is kept. Fine pointers get a 1px Cinsault outline drawn around the block under the pointer, and the same outline follows keyboard focus through the rows; it never shows a reading on its own.
  8. Only transform, opacity, clip-path and stroke-dashoffset animate. Errors reveal with a clip in a reserved line, never by changing height. No ambient loops.
  9. Library weight. DrawSVG, Flip and CustomEase are not loaded; CSS dashoffset and crossfades cover them.
  10. Floating labels were rejected as generic: static labels sit above the fields, with a focus rule and an inline error.
  11. Sibling dimming on the rows was rejected; a row's response is the plan outline and its own drawn rule.
  12. At the final critique the Cinsault bullets in the "What to bring" lists were removed as the one accessory too many: a Cinsault dot means a ripe vine, so it should not also mean "list item".

## Do not touch

- **Cinsault dots mean 22 °Brix or more.** Keep `READY` as the single threshold for the dots, the eyepiece tick and its label. Keep the base layer in leaf outlines so the reading is the only thing that fills them.
- **The ritual order and its honesty.** Drop, plate, then the line and the figure together, then the caption. The line always starts from the previous reading. Rapid changes skip the drop and plate and glide straight on; never queue rituals. The eyepiece is `aria-hidden` because the rows and the live caption carry every reading as text.
- **The rows are the keyboard path.** Six buttons with `aria-pressed`; ArrowUp, ArrowDown, Home and End move and select. Plan blocks are pointer-only aliases, so focus never lands inside the SVG, whose `role="img"` label summarises the plan. The plan uses `touch-action: manipulation` (the brief asked for `pan-y`; `manipulation` keeps vertical scrolling over the plan and also keeps pinch zoom, which the collection never disables).
- **Plan geometry.** Outline areas proportional to hectares (asserted), dots on the 22-unit grid with the 7-unit lane, names in the gaps between dot rows. The plan keeps its 4:3 ratio, so ScrollTrigger never needs a refresh for it.
- **Contrast.** Must on granite 11.8:1, Cinsault on granite 6.8:1 (and granite on Cinsault for the buttons), ink-soft 5.5:1, prism-ink on prism 6.6:1 and on the lit field 8.7:1. Leaf is graphics only (3.4:1 on granite, 3.8:1 on paper). Field borders use `--edge` at 3.5:1.
- **Forms never post.** `novalidate`, `preventDefault`, and the `required` attributes on name, email, the day radios and the select (check-flows' sample fill lands on "Both days" and "Just me" and must reach the confirmation). Every field keeps its reserved message line.
- **Hidden starting states only under `html.js`** (added only when GSAP, ScrollTrigger, SplitText and Lenis loaded) and only with `prefers-reduced-motion: no-preference`. Without the CDN, the plan, rows, ritual (instant), dialog, form and confirmation all work; the anchors jump natively.
- **`[hidden] { display: none !important }`.** The form has `display: grid`, which would otherwise beat the UA rule and leave the form visible under the confirmation.
- **Lenis stops while the dialog is open**, and the dialog closes through its circle animation for Close, Escape and a backdrop click, then returns focus to its button.

## Adapting

1. **Data first.** Replace `BLOCKS`: names, varieties, planting years, hectares, readings, `when` labels and caption notes. Redraw each `poly` so its area matches its hectares (the self-test tells you which one is off) and put each `post` in a gap between dot rows near the block's west end. Change `READY` to your threshold and the eyepiece range (`Y()` maps 0 to 30 onto units 26 to 194) if your instrument reads differently.
2. **Another instrument.** The pattern is "take a reading, then decide where to send people". A soil-moisture probe for a tree planting, a tide gauge for a beach clean, a thermometer for a cold-water swim: keep one fixed dial, a fixed threshold tick, a needle or line that glides from the previous reading, and one physical preparation step in place of the drop and plate.
3. **Copy.** Keep the headline as an invitation with the dates in it, the lead as who, where and why now, captions as "Name: facts. When we work it.", and errors that say how to fix the field. The submit label is built in `label()`; keep it naming the outcome.
4. **Tokens.** Map the brand onto the colour tokens by role: ground, ink, one accent that also means "ready", a graphics-only secondary for "not yet", and the instrument's field and scale ink. Keep the accent at 4.5:1 on the ground and the field ink at 4.5:1 on the field.
5. **Layout.** From 992px the plan takes 7 of 12 columns and stays sticky while the right column holds the heading, eyepiece and rows; the caption sits beside the eyepiece when there are at least 10rem beside it and wraps under it otherwise. From 1200px the weekend paragraph sits beside the schedule. Under 640px the eyepiece is 160px, block names 14px and the scale numbers keep about 13px. The submit is full width under 480px.
6. **Retiming or removing motion.** CSS durations and curves are `--dur-*` and `--ease-*`; the script reads the `--t-*` tokens (seconds) for the drop, plate, glide, ripple, eyepiece opening, dialog, confirmation and label swap. To remove an effect, delete its line in the load timeline, its block in `ritual()`, or the `ScrollTrigger.batch` call. The vanilla functions (`setEye`, `showDots`, `setCaption`, `swap`) already fall back to instant changes when `G()` is false. Removing the four CDN tags gives exactly the reduced-motion page.
7. **Stack translation.** Keep `BLOCKS` as data, render the plan and rows from it, keep the rows as real buttons and the form as a real form, and keep the confirmation in the same grid cell as the form.

| Token | Role |
|---|---|
| `--granite` | Page ground: pale rose-grey granite dust. |
| `--paper` | Plan sheet, field and chip fills, name plates on the plan. |
| `--must` | Ink, eyecup ring, the drop, block post bars, field hover fill on buttons. |
| `--cinsault` | The one accent: ripe dots, primary fills, selected row bar, focus ring, errors, hover outline. |
| `--leaf` | Unripe vine outlines, chip borders, field hover rule. Graphics only. |
| `--prism` | The eyepiece's blue field, dialog and confirmation panels. |
| `--prism-ink` | Eyepiece scale, shadow line, Brix figure. |
| `--daylight` | The lit field below the shadow line, and the frosted plate. |
| `--ink-soft` | Labels, hints, row details, units. |
| `--rule` | Hairlines between rows and slots. |
| `--edge` | Field borders (3.5:1 on paper). |
| `--track` | Lanes between blocks on the plan (opaque, so shared edges do not double). |
| `--tint` | Checked chip fill. |
| `--scrim` | Dialog backdrop. |
| `--font-text` | Faustina, with Georgia as the fallback. |
| `--fs-xs` ... `--fs-xxl` | 14, 16, 18, 24, 24-36 and 44-72px. |
| `--fs-plan` | Block names on the plan: 15px, 14px under 640px. |
| `--fs-fig` | Brix figure: `--fs-xl`, `--fs-l` under 640px. |
| `--fs-eye` | Scale numbers in eyepiece SVG units: 14 at 220px, 18 at 160px (about 13-14px rendered). |
| `--s1` ... `--s9` | Spacing 4, 8, 12, 16, 24, 32, 48, 72, 112px. |
| `--gutter`, `--max`, `--col-gap` | clamp(16px, 5vw, 72px) side gutter, 1280px width, 24px column gap. |
| `--r-field`, `--r-pill` | 4px inputs and chips; 999px actions and the pill. The eyepiece and its echoes are circles; the plan and panels are square. |
| `--eye` | Eyepiece diameter: 220px, 160px under 640px. |
| `--ease-out`, `--ease-follow`, `--ease-sweep`, `--ease-swap`, `--ease-pop` | expo.out, power3.out, the HV2 sweep, the MI2 swap, about back.out(2). |
| `--dur-xs` ... `--dur-l` | .12, .25, .45, .7s. |
| `--t-drop`, `--t-plate`, `--t-glide`, `--t-ripple`, `--t-open` | Ritual: drop .35s, plate .3s, line and figure .7s, ripple spread .45s, eyepiece opening .7s. |
| `--t-dialog`, `--t-dialog-out`, `--t-done`, `--t-done-out`, `--t-swap` | Dialog circle .6s in and .35s out, confirmation circle .7s in and .35s out, label swap .3s. |

## Motion

House easing: expo.out for entrances, glides and settles, power3.out for closing circles and the plate, nothing is scrubbed, and a back-out curve only for the radio dot. Everything runs inside `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide` conditions: `fine` binds the plan and row hover outline, `wide` sets the planting ripple's spread. Lenis (lerp .1, `autoRaf: false`, `anchors: false`) runs on `gsap.ticker` with `lagSmoothing(0)`; in-page links go through `lenis.scrollTo` with a distance-scaled expo glide and then focus the target heading. The cleanup removes the ticker callback, destroys Lenis, kills the ritual and caption timelines and the pending eyepiece trigger, reverts the H2 split and settles every state instantly.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| H2, split into masked lines after fonts load (1.2s cap) | TX1 | Load, t=0 | yPercent 110 to 0, 1s expo.out, stagger .08; split reverted after | Static |
| Lead and the two hero actions | LD8 | Load, t=.25 | opacity 0 to 1, y 16 to 0, .8s expo.out, stagger .06 | Static |
| Vine dots plant themselves | TR3 (by distance from the south-west corner) | Load, t=.2 | scale 0 to 1, .5s expo.out, delays spread over .9s (.7s narrow) | Planted |
| Block names | LD8 | Load, t=1 | opacity, .4s, stagger .05 | Static |
| Eyepiece opens, scale draws | MD1-style circle clip plus SC16 draw | Load t=1.1 if in view, else ScrollTrigger `top 85%` once (phones) | clip circle 0 to 50%, .7s expo.out; spine, ticks and ready tick stroke-dashoffset 1 to 0, .6s, stagger .12; numbers fade .3s | Open, reading shown |
| Reading ritual (signature) | Custom: drop, plate, glide; figure roll; TR3 ripple from the row-end post | End of the eyepiece intro; a row click, Enter or Space; arrows in the rows; a click or tap on a block | Drop clip circle 0 to 30%, .35s expo.out; plate rotationX -90 to 0 at perspective 420, .3s power3.out; both fade .3s; shadow yPercent and figure .7s expo.out from the previous reading; ripe dots scale 0 to 1 (.5s) or unripe outlines pulse to 1.45 and back (.2s yoyo), delays by distance up to .45s; caption crossfade .12s out, .25s in | Line, figure, dots and caption change at once |
| Block and row rules | SC16 | ScrollTrigger batch `top 88%`, once | `--d` scaleX 0 to 1 from the left, .9s expo.out, stagger .06; schedule text opacity .4s, .15s after its rule | Static |
| Sticky "Save my place" pill | S3 (show/hide on IntersectionObserver) | The reading band's bottom passes the top; hidden while `#signup` is between 80% and the top | translateY 140% to 0, .5s expo-out in, .3s power3-out out | Instant |
| Hero "Save my place", pill, submit | HV4 plus MI1 | Hover, focus-visible, press | Fill scaleX from the entry edge, .45s in, .35s out to the exit edge; label to granite .2s; press scale .97 over .12s, release .4s power3.out | Colour only |
| "See the weekend", "What to bring", "Close", "Change my booking", confirmation links | HV2 plus MI1 | Hover, focus-visible, press | .07em underline in from the left, out to the right, .45s; resting 1px hairline | Underline shown; on touch always shown |
| Anchors | NV6 | Click | `lenis.scrollTo`, min(1.3, .65 + distance/4000)s expo, then focus the heading | Immediate jump |
| Plan outline | HV11-style draw around the block | Fine-pointer hover over a block or row; keyboard focus on a row | stroke-dashoffset 1 to 0, .45s expo.out; fade out .2s | Shown at once |
| Block rows | HV2 marker variant, MI1 | Hover, focus-visible, press; selection | 2px Cinsault rule draws from the left .4s; selected bar scaleY .3s expo; press .985 | Instant |
| Text inputs and select | MI4 (static labels) | Hover, focus, invalid submit | Hover 1px leaf rule; focus 2px Cinsault rule scaleX .25s expo; label to must .2s; error clip-path inset from the left plus opacity .25s in a reserved line | Instant |
| Day chips | MI3 | Hover, change | Border leaf to Cinsault .2s; tint wipes in by clip-path inset .35s expo; dot pops .35s back-out | Instant |
| Cot checkbox | MI4 tick | Change | Tick stroke-dashoffset 1 to 0, .3s; box fill .2s | Instant |
| Submit label | MI2 | Any change to day or party | Old label up, new label in from below, .3s expo.out | Instant swap |
| "What to bring" dialog | CD7 with a circle | Click; Close, Escape, backdrop | Panel clip circle from the button centre, .6s expo.out, content fades in at .2s; closes back to the button, .35s power3.out, then `close()`; Lenis stopped while open | Instant |
| Confirmation | CD7-style circle swap | Valid submit; "Change my booking" | Form fades .25s; panel clip circle from the submit centre, .7s expo.out; reverse .35s power3.in while the form fades back; scrolls the panel into view if needed | Instant swap |
