---
title: Roast the batch
section: features
subject: Tolva Roasters, a fictional specialty coffee roaster in Bristol, explaining what its £16-a-month two-coffee subscription includes to filter and espresso drinkers deciding whether it is worth it.
aesthetic: The green-coffee warehouse meets roast-logging software. Jute-sack paint stencils, a grey-green unroasted-bean ground, roast-brown ink, and the blue BT and red ET curves roasters read in Artisan.
mode: light
fonts:
  - Stick No Bills 700/800 (Google Fonts), only for the stencil H2 and the sack plate
  - Fira Sans 400/600 (Google Fonts)
  - Fira Sans Condensed 500 (Google Fonts), roast-log readouts and axis labels
js: Plays a one-time roast of the batch along the roast log, then lets people scrub it by drag, tap or keys while the readouts and a roasting bean follow; runs the load sequence, plate parallax, rule draw-ins, bag sheen and tilt, dialogs, form validation and the cupping hold.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [coffee, subscription, roast-log, chart, slider, stencil, packing-slip, dialog, form, detailed-motion]
use_when:
  - A product with a real process curve or instrument reading that customers would find meaningful (a roast, a bake, a firing, a brew, a ferment) and a short list of what a subscription or kit contains.
  - You want one strong interactive data moment that doubles as content, with quieter supporting rows.
  - Six or fewer included items, each one or two sentences, some with a physical object to draw.
avoid_when:
  - There is no true time series behind the product. A made-up curve turns the signature into decoration.
  - Dark mode or a brand that must feel glossy. The idea depends on paper, stencil ink and a muted ground.
  - The features are a long comparison grid or pricing tiers. The packing slip implies one box, one price.
---

## Why it works

**The one bold idea: the roast log is the feature.** Batch 26-10-A of El Mirador is drawn as roasters see it: blue bean temperature (BT), dashed red exhaust (ET), a 0:00 to 10:40 time axis and four marked events (turning point 1:24 at 92 °C, dry end 4:30 at 150 °C, first crack 8:50 at 196 °C, drop 10:40 at 208 °C). A blue crosshair with a time tab is a real slider. When the plot is first half in view, the crosshair roasts the batch once, in 2.4 s: the curves are revealed behind it, events pop as they are crossed, and it parks on the drop. After that, people drag, tap or key through the roast. Beside the plot, a single bean changes from green to yellow, tan, cinnamon and medium brown as BT rises. It swells by 15% as it develops, and its centre crease opens at first crack. Subscribers get exactly this curve on the back of the lot card, so the chart is the product, not an illustration of it.

- **The paths are the data.** The BT and ET `<path>`s hold one point every 2 s, generated from a smooth rate-of-rise model with a declining RoR and no flick. The script reads those same `d` attributes to compute readouts, so the curve and the numbers can never disagree. Event times land on exact sample points.
- **Palette from the subject, with blue and red kept for data.** The ground (`--green-bean`) is the grey-green of unroasted coffee, not cream (default 1 avoided on purpose). Ink and every control use one chosen dark-roast brown (`--roast`): buttons are roast with paper labels, links are roast with an underline, and focus rings are roast. Stencil blue and exhaust red appear only where roasters expect them: the BT and ET curves, the crosshair, the first-crack mark, form errors, and the sack-stencil ink. Copper `--foil` exists only inside the bag sheen.
- **Uppercase has a reason.** Only the H2 and the sack plate are uppercase, because jute sacks are stencilled that way. Stick No Bills is a stencil face with real bridges. Everything else is sentence case Fira Sans, a DIN-like industrial face that suits instrument readouts. Readouts use Fira Sans Condensed with tabular figures (checked in Chromium: "1111" and "0000" are the same width), so the time and temperatures do not jitter while scrubbing. There is no monospace, no eyebrow and no middle dot.
- **A packing slip, not a card grid.** The six things the subscription includes form one ruled list down the page (Two coffees, Roast day, Lot card, Brew card, Cupping, Your terms), with the name, a short paragraph and, where one exists, the real object. Only true paper objects (the two bags, the back of the lot card, the brew card) get the 3px radius and the hard 1px offset shadow. The freshness ruler (days 0 to 42, best from day 7 to day 35) is data, so it is drawn as a scale. The rules draw in from the left as the list arrives.
- **Radius hierarchy instead of one radius:** buttons 2px, bag labels 0, paper 3px, plate frame 4px, dialogs 6px. There is no soft grey shadow anywhere.
- **Copy answers "what do I get for £16?"** with real lot data: farm, producer, altitude, process, harvest and the FOB price paid ($7.40/kg for El Mirador, $8.10/kg for Kebel Aricha). It uses one cutoff rule ("new orders and changes made by the 25th go in the next roast"), and the closing line follows it: order by Sunday 25 October for the Tuesday 3 November roast. Dates were checked against the 2026 calendar: Tue 6 Oct, Sun 25 Oct, Tue 3 Nov, Sat 7 Nov, Tue 1 Dec.

## Motion

Tier: detailed. House easing is `expo.out` (CSS `--ease: cubic-bezier(.16,1,.3,1)`) for every time-based move, and `ease: 'none'` for every scrub. Everything is built inside one `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide (min-width: 992px)` conditions. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`). Hidden states exist only under `html.js`, which is set only when GSAP, ScrollTrigger, SplitText and Lenis all loaded.

| # | What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| L1 | H2 lines rise out of their own masks | TX1 | page load, after `document.fonts.ready` (capped at 1.2 s) | 1.0 s, stagger .08 | no split, text visible |
| L2 | Sack plate opens from an inset window; the print settles from 1.08 | LD7 | load, t = .15 s | 1.4 s | final state |
| L3 | Lede and both actions settle (opacity .4 to 1, y 8 to 0); never invisible | LD8 | load, t = .45 s | .5 s, stagger .08 | none |
| S1 | Sack print drifts inside its frame, yPercent -8 to 8 | SC2 | scroll, `clamp(top bottom)` to `clamp(bottom top)`, scrub | ease none | static (also static on touch and below 992px) |
| S2 | **Signature beat**: crosshair runs 0:00 to drop; curves revealed behind it with `clip-path: inset(0 calc((1 - p) * 100%) 0 0)`; events pop; bean roasts | MD1 one-sided inset reveal, driven by the slider value | once, when half the plot is in view (`center bottom`); on desktop screens taller than about 950px that is at load, .9 s after the intro starts | 2.4 s `power1.inOut` (a replay of the roast clock, the one non-expo curve) | log drawn, parked at drop, bean final |
| S3 | Packing-slip rules draw from the left | SC16 | scroll, batch at `top 92%`, once | .8 s, stagger .08 | static |
| I1 | Primary buttons: roast fill swept away by a paper fill from the edge the pointer entered, leaving by the edge it exits; label flips to roast | HV4 + MI1 | hover / focus-visible / press | in .45 s, out .3 s, press .12 s, release .4 s | colour change only, no press scale |
| I2 | Links and link-buttons: a faint underline is always there; a full underline sweeps in from the left and leaves to the right | HV2 | hover / focus-visible | .4 s | instant |
| I3 | Bags: copper sheen follows the pointer across the label (`screen` blend); tilt capped at 4deg | HV12 + MI1 | fine pointer move; focus-visible centres the sheen | sheen follow .4 s, tilt .5 s, fade .3 s | static centred sheen, no tilt; touch shows a static sheen |
| I4 | Roast slider: grab cursor and a dashed hairline preview with its time on hover; drag, tap, Left/Right 10 s, Page Up/Down between events, Home/End | CU1 (hairline follower, native cursor kept) + CD4 (drag with keyboard alternative) | pointer, touch (horizontal drag only, vertical swipes scroll the page), keys | crosshair follow .25 s; event pop .35 s; crease opens .45 s | crosshair and pops instant |
| I5 | Dialogs: panel y 12 to 0, scale .98 to 1, fade; backdrop fades; Lenis stops | CD7 (CSS `@starting-style` + `allow-discrete`) | open / close (button, Escape, backdrop) | .45 s in, .3 s out | fade only |
| I6 | Lot-card mini curve revealed left to right on open | MD1 | dialog open | .9 s, .1 s delay | drawn |
| I7 | Text inputs: bottom rule draws in roast on focus; errors revealed by clip-path in reserved space | SC16 idea + MI4 | focus / submit | .3 s / .25 s | instant |
| I8 | Grind and first-box radio cards: outline plus a "Chosen" badge that pops | MI3 | change | .25 s | no pop |
| I9 | Form to confirmation and back ("Change details" keeps values) | crossfade | submit / button | out .12 s, in .3 s | instant |
| I10 | Cupping: "Hold a place" slides up and "Place held for Saturday 7 November" with "Release my place" slides in (two buttons, one cell, no width jump) | MI2 | click | .35 s | instant |

Cut on purpose: a pinned horizontal track (it duplicated another design's signature), DrawSVG (stroke-dashoffset is not on the allowed list, so clip-path does the reveal), a cursor follower over the page, a scrambled lot number, a magnetic button, a TX1 on the closing heading, and an exhaust readout plus its crosshair dot (the dashed ET curve already carries that context; subscribers care about bean temperature).

## Do not touch

- **One time value drives everything in the log.** `render(t)` sets `--p` (curve clip, crosshair, thumb), `--by` (BT dot), `--bs` (bean scale) and the bean layer opacities. It writes text only when a rounded value changes. Do not animate the curves, crosshair and readouts separately.
- **The paths are the data.** If you change the roast, regenerate the BT/ET `d` attributes with one point every 2 s, domain 40 to 240 °C (`y = 240 - T`), x in seconds, and update the event marks, the hidden events table, `END` (640) and `FC` (530) in the script, and the static HTML final values (`--p:1`, `--by`, readouts, `aria-valuetext`). The no-JS page shows exactly that final state.
- **Before the turning point the bean stays green** even though the probe reads 200 °C at charge. That is how a BT probe behaves, and the code keeps the bean colour at 92 °C until 1:24.
- **Blue and red are data colours.** Do not use them for buttons or links.
- **Accessibility of the slider.** The thumb is `role="slider"` with `aria-valuetext` such as "6:48, bean 177 °C, browning" and is described by the help line. Plot drawings and labels are `aria-hidden`, and the visually hidden table carries the four events. Touch uses `touch-action: pan-y` and waits for 6px of horizontal travel, so a vertical swipe over the plot still scrolls the page.
- **No horizontal overflow.** The crosshair layer is translated by its own width, so the plot uses `overflow-x: clip` with a 10px `overflow-clip-margin`. Checked at 360 to 1600px.
- **Robustness.** If any library fails to load, `html.js` is never added, every element is already final, and the slider, dialogs, form and hold still work in plain JS. Lenis is stopped while a dialog is open, and `html:has(dialog[open])` also stops native scroll.
- **Section headings start at h2.** The host page supplies the h1. Dialog titles are h2 in the top layer.

## Adapting

Change the `:root` tokens first, then the data, then the copy.

- **Another roaster or process.** Replace the paths, events and bean layer thresholds (`data-from` / `data-span` in °C on each `.bean-layer`). For a bakery or kiln, swap the bean drawing for the object that changes (a loaf crust, a glaze swatch) and keep the stacked-opacity layers.
- **Retiming or removing motion.** Durations live in `--dur-in`, `--dur-out`, `--dur-press` and `--dur-release` (CSS), and as literals in the matchMedia callback: the intro timeline (`.15` / `.45` offsets, `1.4` and `.5` durations), the beat (`duration: 2.4`, `delay` .9 s after the intro starts), and the follow `quickTo` (.25 s). To drop the beat, delete the `if (!beatDone)` block and the log simply shows the finished roast. To drop the plate parallax, delete the `if (fine && wide)` block. To drop the bag tilt, delete the `if (fine)` block (the CSS sheen still works on hover and focus). Never remove the reduced-motion branch.
- **Copy.** Packing-slip rows take a heading of up to about 40 characters and one paragraph of up to 45 words. Rows without an object leave the right column empty on purpose. Keep one cutoff rule and make every date agree with it.
- **Layout.** At 992px and wider: intro copy spans 7 columns and the plate 5; the log is plot plus a 280px bean and readout column; slip rows are heading (4 cols), text (4), object (4). From 701 to 991px everything stacks, and objects sit in columns 8 to 12. At 700px and narrower, event labels switch to TP, DE, FC with a visible key. Below 600px the x-axis labels every 2 minutes, buttons in the intro go full width, and dialogs become full-height sheets.

| Token | Role |
|---|---|
| `--green-bean` | Page ground, the colour of unroasted coffee; also the knock-out behind chart labels |
| `--paper` | Bags, lot card, brew card, dialogs, button hover fill |
| `--roast` | Text, rules, buttons, links, focus rings |
| `--roast-2` | Secondary text (sub-lines, axis labels, captions) |
| `--stencil-blue` | BT curve, crosshair, time tab, sack-stencil ink |
| `--exhaust-red` | ET curve, first-crack mark, form errors |
| `--foil` | Copper of the bag label, used only in the sheen gradient |
| `--jute`, `--jute-light`, `--jute-dark` | Sack weave of the plate |
| `--bean-green` to `--bean-brown`, `--chaff` | Roast colour stages of the bean and the silverskin shown when the crease opens |
| `--rule`, `--rule-strong`, `--grid`, `--ghost` | Dividers, field lines, chart grid, the faint rest-of-roast curve |
| `--font-stencil` | Stick No Bills, H2 and plate only |
| `--font-text` | Fira Sans, everything people read |
| `--font-readout` | Fira Sans Condensed, readouts and axis labels (tabular figures) |
| `--step--1` to `--step-4` | Perfect-fourth type scale from 17px; `--step-4` is the stencil H2 |
| `--space-1` to `--space-9`, `--gutter`, `--max` | Spacing scale, side gutter, content width |
| `--r-btn`, `--r-paper`, `--r-plate`, `--r-dialog`, `--shadow-paper` | Radius hierarchy and the one hard paper shadow |
| `--ease`, `--dur-in`, `--dur-out`, `--dur-press`, `--dur-release` | House easing and hover, press and release timings |
