---
title: Batch 214 sight glass
section: process
subject: Kiln Row Brewing, a fictional 20 hL craft brewery under the railway arches at Arch 9, Kiln Row, showing how one batch of its pale ale goes from grain on Tuesday 6 October 2026 to cans on Thursday 22 October, with a reservation form for four-packs.
aesthetic: The skin of a brewing vessel on the early shift. Brushed stainless ground, a backlit sight glass with a litre scale plate, stencilled vessel codes and wort amber, all taken from the brewer's own instruments.
mode: light
fonts:
  - Radio Canada, variable wdth 75-100 and wght 300-700 (Google Fonts), the only text family
  - Allerta Stencil 400 (Google Fonts), only for the aria-hidden vessel code painted on the stage
js: Drives one paused master timeline from six contiguous chapter triggers, so a single sight glass fills, clouds, clears, boils, takes a krausen, goes bright and drains while the readout follows; runs the load sequence, the stencil code swap, the chapter rail, the level-reading hairline, the can-lid progress, the brew-sheet dialog, the four-pack stepper and the reservation form with its in-page confirmation, plus a #selftest of the batch arithmetic.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [brewery, process, sight-glass, scroll-story, sticky-stage, readout, stencil, form, dialog, detailed-motion]
use_when:
  - A process that happens to one physical thing whose state you can show changing (a liquid, a dough, a glaze, a cure), in four to eight dated steps with real readings.
  - You want one scroll-driven signature that carries the whole section, and quiet text beside it that stays readable at every scroll position.
  - The section ends in a concrete outcome people can act on (reserve, order, book) without leaving the page.
avoid_when:
  - The steps are abstract (onboarding, a sales funnel) with no measurable state to draw. The glass becomes decoration.
  - Dark or glossy brands. The idea depends on brushed steel and light coming through the beer.
  - More than about eight steps, or steps that are not a real sequence in time.
---

## Why it works

**The one bold idea: one sight glass, read the way a brewer reads it.** A single tall glass tube sits in a sticky stage beside the chapters, with a lit panel behind it and a litre scale plate (0 to 2,500 L) printed behind the liquid. As you scroll, strike water turns into opaque mash and the scale disappears. During the vorlauf the cloudy runnings clear to amber and the numbers behind the liquid come back into focus (a CSS blur on the copy of the scale seen through the liquid). The wort transfers to the kettle and boils with rising bubbles, runs through the chiller into fermenter 3 and goes hazy under a krausen head, then turns bright gold, moves to the bright tank and drains to empty as the cans fill. You judge clarity by looking through the glass, which is exactly how a brewer does it.

- **One state, one clock.** A paused GSAP timeline with six one-unit segments tweens a single state object (litres, temperature, gravity, EBC, clock, vessel, layer opacities, blur, krausen, bubbles). Its `onUpdate` writes CSS variables on the glass and writes readout text only when a snapped value changes. The glass, the readout, the stencil code and the level reading can never disagree.
- **Contiguous chapter triggers.** Each chapter has its own ScrollTrigger (`top 60%` to `bottom 60%`). One driver trigger reads their measured start and end and sets `master.progress((i + local) / 6)`, so a fast jump up or down the page still lands on the right state. Chapter text always scrolls normally and stays readable; only the glass is scrubbed.
- **The stainless is the literal material, not a mood.** The ground is `--plate` (#B8C0BC) with a horizontal brush grain at about 3% contrast, the panels are `--plate-lit`, and text is `--ink` (8.6:1). This deliberately avoids default 2 (near-black plus one bright accent) and the dark-ground-plus-amber cluster: the only saturated colour is the beer. `--wort` (#D88F2C) is the liquid, the primary button fill (ink label, 6.0:1), the chapter and rail markers and the collection-day pill. It is never used as text on the plate (1.4:1).
- **Instrument typography without template chrome.** Radio Canada is the only text family: the headings at wdth 75 / 700, chapter titles at wdth 87.5 / 600, body at 100 / 400 and readout values at 87.5 / 500 with tabular figures. Checked in Chromium on 2026-10-22: "1111" and "0000" are both 88.00px at 40px, so values do not jitter while scrubbing. There is no monospace, no eyebrow, no middle dot and no arrow on links. The only uppercase is the stencilled vessel code (MT, KT, FV3, BT1), which is a real tank identifier and `aria-hidden`; the readable vessel name is in the readout.
- **Structure is information.** Chapter numbers exist because brewing is a real sequence. Hairlines exist only as real row boundaries (the batch summary, the brew-sheet tables, the scale ticks). There are three panels in all (the reservation form, the dialog, the tray outline), and radius follows the object: the tube is fully rounded, panels are 6px (folded stainless), controls 4px, the can tray 3px.
- **Arithmetic that holds.** 1,080 L mash water + 1,600 L sparge - 400 L kept by 400 kg of grist - 30 L dead space = 2,250 L in the kettle at 1.043. A 150 L boil-off concentrates it to 2,250 x 43 / 2,100 = 46, so 1.046. 2,100 L - 120 L in the hop bed + 20 L yeast = 2,000 L in fermenter 3. 120 L stays in the cone, so 1,880 L reaches bright tank 1, and 178 trays x 24 = 4,272 cans x 440 ml = 1,880 L. (1.046 - 1.011) x 131.25 = 4.6%. These live in a `DATA` object at the top of the script, and `#selftest` asserts them, the £15-a-four-pack total, the figures printed in the summary, and that the glass readout at the end of every chapter matches that chapter's readings list.
- **Dates checked against the 2026 calendar:** Tuesday 6 October (brew day, Day 0), Day 7 is Tuesday 13 October, Day 16 is Thursday 22 October, and collection is Friday 23, Saturday 24 or Sunday 25 October.

## Motion

Tier: detailed. Easing family: `expo.out` (CSS `--ease-out: cubic-bezier(.16,1,.3,1)`) for anything that arrives, `power2.inOut` (`--ease-swap`) for state swaps, `power2.in` for exits, `none` for every scrub. The tube outline uses `power3.inOut` so the draw is visible rather than finished in the first frames. Everything is built inside one `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide (min-width: 992px)`. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`), with `lenis.on('scroll', ScrollTrigger.update)`. Lenis `anchors` is off on purpose: one click handler eases every in-page link through `lenis.scrollTo` (duration `min(1.3, .65 + distance / 4000)`), offsets chapters by the sticky band on narrow screens, and moves focus to the target heading. Hidden or dimmed load states exist only under `html.js:not(.intro-done)` inside a `no-preference` media query; `html.js` is added only when all five libraries loaded. Cleanup removes the ticker, destroys Lenis and removes the pointer listeners.

| # | What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| L1 | Tube outline draws from its middle outward; the 20 scale ticks draw bottom-up | SC16 (DrawSVG) | load, after `document.fonts.ready` capped at 1 s | outline 1.1 s at t=0; ticks .5 s, stagger .03, from t=.25 | static |
| L2 | Headline lines rise out of padded masks | TX1 (SplitText, `aria: auto`) | load | 1.0 s, stagger .08, from t=.15 | no split |
| L3 | Strike water pours in; the Volume reading counts up to 1,080 L | the master state's `fill` | load | 1.2 s expo.out from t=.3 | full at once |
| L4 | Wordmark, lede and both actions settle (y 8 to 0, opacity .35 to 1; never below .35) | LD8 | load | .5 s, stagger .08, from t=.45 | none |
| L5 | Rail items appear (opacity 0 to 1, scale .6 to 1) | LD8 variant | load | .4 s, stagger .05, from t=.6 | static |
| L6 | Stencil code rises from its mask; readout rows go .35 to 1 | TR1 entry | load | .6 s and .4 s from t=.8 | static |
| S1 | **Signature**: the sight glass fills, clouds, clears, boils, hazes, takes a krausen, goes bright and drains | SC3 pinned chapters (CSS sticky stage) | six contiguous chapter ScrollTriggers feeding `master.progress` | scrubbed, ease none; the last chapter is longer, and on desktop it ends when the stage starts to leave so the cans fill in full view | `master.progress((i + 1) / 6)` on chapter change, native scroll |
| S2 | Active chapter text goes ink, others `--etch` (still 5.0:1); its number gets a wort tab; rail gets `aria-current="step"` | colour swap, not opacity | chapter trigger active | .45 s power2.inOut | instant |
| S2b | Stencilled vessel code swaps when the vessel changes (MT, KT, FV3, BT1) | TR1 | vessel change inside the master state | out .25 s power2.in, in .6 s expo.out, killed on fast scroll | instant text change |
| S3 | Can lids seam on in order across a tray of 24 | SC11 progress variable (`--progress`, one inline style) | tray `top 80%` to `bottom 55%` | scrubbed; each can uses `clamp(0, var(--progress) * 24 - var(--i), 1)` | all seamed |
| S4 | Batch summary row rules draw from the left (text never hidden) | SC16 (CSS variable `--k` per row) | `top 90%`, once | 1.0 s, stagger .06 | static |
| A1 | Bubbles rise in the boil and during fermentation | CSS keyframes, translateY plus opacity | running only while the state's bubble opacity is above zero (chapters 3 and 5) | 2.1 to 3.3 s loops | static bubbles, no animation |
| I1 | Links and text buttons (Read the brew sheet, Skip to the cans, Back to the mill, Call the taproom, Change reservation): faint resting rule, underline sweeps in from the left and leaves to the right | HV2 | hover and focus-visible | .45 s `cubic-bezier(.35,0,0,1)` | underline shown statically; touch shows it always |
| I2 | Primary buttons (Start at the mill, Reserve n four-packs): ink fill enters from the edge the pointer came in by and leaves by the exit edge; label flips to backlight; press scales to .97 | HV4 + MI1 | pointer enter and leave, focus-visible (fills from the left), `:active` | in .4 s, out .3 s, press .12 s, release .4 s | colour change only; touch fills instantly on press |
| I3 | Brew-sheet dialog: backdrop fades, panel rises (y 16, scale .98) or, under 600px, a full-height sheet rises (yPercent 8); section seams draw; Lenis stops | CD7 + SC16 | open; Close, Escape and backdrop click play the exit | in .5 s, seams .8 s stagger .03; out .3 s power2.in; focus returns to the trigger | opacity only |
| I4 | Close button: cross turns 90deg, background lightens, press | MI1 | hover, focus-visible, `:active` | .35 s | no rotation |
| I5 | Chapter rail: siblings switch to `--etch`, the wort marker slides to the hovered or focused segment (transform only) and back to the current one; press scales the number | HV7 (colour, not opacity) + NV4 + MI1 | hover, focus-visible, current chapter | marker .45 s expo.out | marker jumps |
| I6 | Level reading: a 1px ink hairline with a tick follows the pointer up the scale; a label at the plate edge reads the litres at that height against the current volume ("1,240 L of 2,000", "2,140 L, above the level") | CU1-style hairline follower (native cursor kept) | fine pointer and at least 992px wide | `quickTo` .25 s power3.out; fades out .2 s on leave | follows without easing |
| I7 | Four-pack stepper: buttons lighten and their glyph scales to 1.1; at 1 or 6 a button gets `aria-disabled` and a polite message; the total and the submit label roll to the new number | MI1 + MI2 | hover, `:active`, click, typing or arrow keys in the input | glyph .2 s, roll .3 s expo.out | instant |
| I8 | Collection day: one wort pill slides to the checked day; labels get an HV2 underline on hover; focus outlines the label | NV4 (CSS `:has`) + HV2 | change, hover, focus-visible | .4 s expo.out | pill jumps |
| I9 | Name and email: ink rule draws from the left on focus, label goes etch to ink; inline errors open with `grid-template-rows` 0fr to 1fr, with `aria-invalid`, `aria-describedby` and focus on the first invalid field | MI4 (static labels, no floating) | focus, hover, submit | rule .35 s, error .25 s | instant |
| I10 | Submit: form fades out, confirmation fades in, "Reserved" rises line by line, the tick draws; focus moves to the heading; `lenis.resize()` and `ScrollTrigger.refresh()` run; nothing is sent | crossfade + TX1 + SC16 (DrawSVG) | submit | out .25 s power2.in, in .5 s, tick .4 s | instant swap |

Cut on purpose: a scrubbed temperature trace on the rail (another design's signature), the CU4 torch lens and its toggle (five designs use CU4), floating labels, a count-up on the summary, ScrambleText, Flip, `ScrollTrigger.batch` reveals, and a small lift on rail numbers (removed as the last accessory: the marker and the sibling colour already answer the hover).

## Do not touch

- **One state drives the glass.** Change the batch in `DATA` and in `buildMaster()`, never by animating the glass, readout or code separately. Keep every scrubbed tween at `ease: 'none'` and keep tweens on the same property from overlapping in time.
- **The litre scale is shared.** `DATA.scale` (2,500 L) maps to the range from the bottom of the tube to one tube-radius below its top. The ticks SVG, both copies of the scale numerals, the liquid clip (`clip-path: inset()` on `--lvl`), the surface and krausen wrapper and the level reading all use that same range. The level is a clip, not a `scaleY`, so the numerals seen through the beer and the bubbles are not distorted.
- **Layer order follows the process.** Water, mash, cloud, wort, haze and bright are stacked in the order they first appear and only fade in on top of each other. Inserting a layer out of order breaks the reverse scroll.
- **Text stays readable.** Inactive chapters change colour to `--etch` (5.0:1 on the plate), never opacity. Rail siblings do the same. The readout carries everything the glass shows, so touch, keyboard and screen reader users lose nothing; the glass and the level reading are `aria-hidden`.
- **Narrow screens.** Below 992px the stage is a sticky band of 36svh (304px at 390x844), leaving 64svh for chapter text. The Colour and Clock rows are dropped from the band (they stay in every chapter's readings), the rail shows numbers only with the vessel and chapter name in each link's accessible name, and the current chapter name is printed under the rail. On landscape phones shorter than 520px the band stops being sticky.
- **Robustness.** If any library fails to load, `html.js` is never set: the glass shows bright beer at 1,880 L in bright tank 1 with a matching readout, every chapter is ink, all lids are seamed, and the anchors, dialog, stepper and form still work in plain JavaScript. Under reduced motion there is no Lenis, no SplitText and native scroll, and the glass jumps to each chapter's end state.
- **Headings start at h2.** The host page supplies the h1. The dialog title is an h2 in the top layer.

## Adapting

Map the `:root` tokens first, then `DATA` and `buildMaster()`, then the copy.

- **Another liquid or process.** Keep the glass and replace its layers (`.l-*` and their `--o-*` variables) with the stages of your material: a cider press, a kombucha ferment, a dye vat, a sourdough levain in a jar. Write each chapter's segment in `buildMaster()` as a few `to(at, duration, vars)` calls on the state, and keep each chapter's readings list identical to the state at the end of its segment (`#selftest` checks this).
- **Retiming or removing motion.** Hover and press timings are the `--d-*` and `--ease-*` tokens. The load sequence lives in the `intro` timeline (positions 0, .15, .25, .3, .45, .6 and .8). Scrub positions within a chapter are the `at` values in `buildMaster()`. To drop the level reading, delete the `if (fine && wide)` block and the `.probe` element. To drop the bubbles, delete `.bubbles`. To drop the can lids, remove the tray `ScrollTrigger` and the lids show seamed. Never remove the reduced-motion branch.
- **Copy length.** Chapter titles fit on one line at about 22 characters; chapter text works from 45 to 75 words. More than about 90 words makes a chapter taller than a screen on phones and the glass changes before the text is read.
- **Layout.** At 992px and wider the intro and chapters take columns 1 to 5 and the sticky stage columns 6 to 12; from 992 to 1199px the tube and readout shrink. The outro is summary 1 to 4, tray 5 to 7, form 8 to 12, and stacks below 992px.

| Token | Role |
|---|---|
| `--plate` | Brushed stainless ground |
| `--plate-lit` | Form panel, dialog, tube bezel, weld-seam highlights |
| `--ink` | Text, ticks, focus rings, hover fill of primary buttons, level hairline |
| `--etch` | Muted text, inactive chapters and rail items, minor ticks, scale numerals |
| `--wort` | The beer, primary button fill, chapter tab, rail marker, day pill, confirmation disc |
| `--mash`, `--cloud`, `--water`, `--haze`, `--bright`, `--krausen`, `--krausen-shade` | Inside the glass only |
| `--backlight` | The lit panel behind the tube, input fields, the label colour on filled buttons |
| `--alert` | Form errors (6.0:1 on `--plate-lit`) |
| `--rule`, `--paint`, `--grain` | Row rules, the stencilled vessel code, the brush grain |
| `--font`, `--font-stencil` | Radio Canada for all text; Allerta Stencil only for the vessel code |
| `--t-xs` to `--t-display`, `--t-stencil` | Major-third scale from 17px; display headings and the stencil code |
| `--s-1` to `--s-10`, `--side`, `--max` | 4px spacing scale, side gutter, content width |
| `--r-tube`, `--r-panel`, `--r-control`, `--r-tray` | Radius by object |
| `--ease-out`, `--ease-swap`, `--ease-in`, `--ease-sweep`, `--d-*` | Easing family and hover, press, rule and state timings |
