---
title: Scrub the roast
section: features
subject: Tolva Roasters, a fictional specialty coffee roaster in Bristol, explaining what its £16-a-month two-coffee subscription includes to filter and espresso drinkers deciding whether it is worth it.
aesthetic: The green-coffee warehouse meets roast-logging software. Jute-sack paint stencils on a khaki unroasted-bean ground, roast-brown ink, and the blue BT and red ET curves roasters read on their logs.
mode: light
fonts:
  - Stick No Bills 700/800 (Google Fonts), stencil display only. H2, closing H3 and the sack plate at 800 or 700 in capitals; panel H3s at 700 in sentence case
  - Rethink Sans 400-600 variable (Google Fonts). Body 400, buttons, labels, index and readout keys 600, readout values 500 with tabular figures
js: Sprays the stencil H2 and sack plate in on six stepped strokes; on wide windows pins the box and slides its six panels on one scrubbed timeline that roasts batch 26-10-A along the roast log and lets go at the drop; on touch, narrow or short windows lets the page scroll, then the native snap row, roast it; then lets the reader scrub the log by pointer, drag, tap or keys while a bean sample, readouts and event ticks follow one time value; runs the box index with a sliding indicator, Previous/Next and counter, the copper sheen on the bags, the cupping hold, both dialogs and the validated subscription form. Without the CDN libraries everything except the motion still works.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [coffee, subscription, roast-log, chart, scrubber, slider, stencil, pinned-track, snap-row, dialog, form, detailed-motion]
use_when:
  - A product with a real process curve that customers find meaningful (a roast, a bake, a kiln firing, a brew, a ferment) next to a short list of what a box, kit or subscription contains.
  - You want one interactive data moment that is also content, with quieter supporting rows around it.
  - Six or fewer included items, each one or two sentences, some with a physical object worth drawing.
avoid_when:
  - There is no true time series behind the product. An invented curve turns the signature into decoration.
  - A dark or glossy brand. The idea depends on paper, stencil ink and a muted ground.
  - The features are a long comparison grid or pricing tiers. The section implies one box and one price.
  - A page that already has another scrubbed chart or slider near it.
---

## Why it works

**The one bold idea: scrub the roast.** The box contents and the real roast log of batch 26-10-A share one stage. The log is printed on the back of the El Mirador lot card, a paper object. It shows blue bean temperature (BT), dashed red exhaust (ET), a 0:00 to 10:40 axis and five events: charge 0:00 at 200 °C, turning point 1:24 at 92 °C, dry end 4:30 at 150 °C, first crack 8:50 at 196 °C and drop 10:40 at 208 °C. Beside the readouts, a single bean from the trier shows what the beans look like at that moment.

- **Wide windows (992px and up, 600px and up tall, no coarse pointer): the stage pins.** It is one screen tall (`min(100svh, 980px)`), with the index on top, the six panels in the middle and the log along the bottom. One scrubbed timeline slides the panels sideways and roasts the batch: the curve is revealed left to right behind the crosshair, event ticks pop as they are passed, and the bean goes from green to yellow, cinnamon, brown and city, then swells at first crack and opens along its crease. The panels slide linearly, but the roast clock is piecewise, so each panel rests on a roast moment (charge, turning point, dry end, mid-Maillard 6:50, first crack, drop) and the readout under every panel names something worth stopping on. The pin lets go exactly at the drop, 10:40 and 208 °C.
- **While pinned, the scroll owns the log** (`free` is false). Hovering the plot only previews: a faint line and a tab show the minute and temperature under the pointer, the cursor turns to `pointer`, and the title says "Click to scroll to 6:48". A click, tap or arrow key calls `seek()`, which scrolls the page to that minute, so the page and the log never disagree. Once the pin releases, the reader owns the log (`free` is true): a fine pointer moves the crosshair just by passing over it, a finger drags or taps, and the keys step through minutes and events. Scrolling back into the pin hands the log back to the scroll.
- **Touch, narrow or short windows: the row is native.** The six panels are a CSS scroll-snap row with Previous, Next and the "2 of 6" counter right under it, and the log card directly below. The page scroll roasts the batch once as the card passes (top 85% to bottom 60%, clamped so the drop is reached even where the page ends first). After the first sideways scroll the row takes over: each snap is a roast moment and the last snap is the drop. Reduced motion or a blocked CDN leaves native rows with the log parked at the drop.
- **The help line tells the truth per mode.** The script sets `#log-help`, which is the slider's description: pinned, "Scrolling roasts the batch…"; native row, "Swipe the panels or press Next to roast the batch…"; reduced motion or no libraries, "Move along the log, drag or tap it, or use the arrow keys to see any minute."
- **The paths are the data.** The BT, ET and Kebel Aricha `<path>`s hold one point every 2 s. The script reads those same `d` attributes to interpolate the readouts, the crosshair dot and the bean colour, so the curve, the numbers and the events table cannot disagree. `#selftest` checks the five events, the Kebel drop, the panel-rest mapping, the "Probe" label and the colour names against the data. Subscribers get this same curve printed on their card, so the chart is the product, not an illustration of it.
- **One time value drives everything.** `render(t)` writes `--p` (crosshair and curve clip), `--by` (dot height), `--bs` (bean scale), the five bean layer opacities, the tick states and, only when a shown value changes, the readouts and the slider's `aria-valuetext`. Before the turning point the temperature line is labelled "Probe", because at charge the probe reads the hot drum, not the beans; the Charge tick explains the 200 °C.
- **The page is made of the warehouse.** The ground is green coffee (`--green-bean` #CDCEA6, deeper and more saturated than the collection's pale grey-greens, so the paper objects lift off it). The sack plate is woven jute with a sprayed stencil in sack blue, and the H2 carries a lighter version of the same sprayed-ink speckle. Ink is a chosen dark-roast brown, not a tinted black. Blue and red come from roast software: blue is every link, button and focus ring as well as BT; red is the ET line, the first-crack tick and form errors, and it only ever sits on paper as text.
- **Capitals have a reason.** Only the H2, the closing H3 and the plate are uppercase, because sack stencils are cut in capitals. Panel H3s use the same stencil face in sentence case; every label, menu item and readout is sentence case Rethink Sans.
- **Objects get the paper treatment, nothing else does.** The bags, the brew card, the log card and the dialogs are paper with a 3px radius and one hard 1px offset shadow. Panels are open columns divided by rules. Buttons have 2px corners, the plate 4px, dialogs 6px.
- **No dead ends.** Index items and "See October's coffees" go to `#box` and the panels; "See the roast on the back of the card" goes to `#roast-log` (pinned: the scroll position where the pin lets go at the drop; otherwise the batch roasts on the way there); every button opens a dialog or changes state in place with a way back; the only external link is a `mailto:` with `target="_blank" rel="noopener"`.

Reasoned departures from the brief:

- **The pin came back, bounded.** The brief cut the pinned track because two other plans slide a track over a data line. Here the pin carries the log the subscriber actually receives, it is bounded by the track's real overflow, it releases at the drop, and it only runs where it fits (992px+ wide, 600px+ tall, no coarse pointer). Everywhere else the row is native and the log is a block of its own.
- **Clip-path, not DrawSVG.** The curve is a function of time, so a left-to-right `clip-path: inset()` on the live layer is the same reveal as drawing the stroke. It needs no extra plugin and stays within transform, opacity and clip-path. The lot-card mini curve uses the same clip.
- The last bean stage and colour label is **City**, not "full city". A 208 °C drop with 1:50 of development is a city roast; a roaster reading "full city" here would not trust the rest of the card.
- The terms panel says changes made **by the Sunday before roast day** go into that roast, instead of "before the 25th", so it agrees with "Order by Sunday 1 November" in the closing.
- The bag sheen uses `mix-blend-mode: screen` instead of soft-light. Soft-light over the dark label is invisible; screen at 0.6 gives a copper glint and keeps the label text at about 5:1 at the brightest point.
- Rethink Sans has no width axis. Its figures measure the same with and without `tnum` ('1111' and '0000' are both 94px at 40px), and readout values also sit in fixed `ch` slots, right-aligned, so the numbers never jitter.
- The closing H3 opens with a smooth linear wipe, not the six-stroke spray: by then the reader has watched the curve reveal left to right, and the heading repeats that motion once.
- No sticky log on phones. The stage (row, pager, log card) is taller than a phone screen, so a sticky card would cover the pager and the row. The pager now sits directly under the row with the plot right below it, and the page scroll roasts the batch until the row is swiped.
- The crosshair layer is zero-width and moves in `cqw` (the plot is an inline-size container). A plot-wide layer translated by 100% stuck out of the plot at the drop and made mobile Chromium widen the layout viewport.
- Removed accessory: the front of the lot card drawn in the "lot card" panel. It repeated the panel text, and the card's back is the signature.
- The page has no `h1`; the host page supplies it. The section starts at `h2`.

## Do not touch

- One time value and one `render()`. Separate tweens for the curve, the dot and the readouts drift apart.
- The pin's length is the track's real overflow times 1.4 (`end: '+=' + maxX() * 1.4`), with `scrub: .6`. It must let go exactly at the drop: the track's last position and `RESTS_T`'s last entry (640) are the same moment.
- `RESTS_T`, `tAt()` and `fAt()` map panel position to roast time and back. The track, the index, `goPanel()`, `seek()` and the native row all go through them; change one and the others follow.
- `free` and `seek()`: while pinned, clicks and keys on the plot scroll the page and hover only previews. Letting the pointer set the log during the pin makes the scroll and the readout fight.
- The focusin guard: keyboard focus on a control outside the row's visible box brings its panel in (through the pin scroll when pinned). Pinned panels must fit the row; `measureRow()` warns in the console if one overflows, and the short-window rules (`@media (max-height: 759px)`, `--bag-k` zoom, panel 1 with text beside the bags) exist for that.
- The curve reveal is `clip-path: inset()` on the live layer, not DrawSVG or `stroke-dashoffset`. The ghost curve always shows the rest of the roast behind the crosshair.
- Red text only on paper (5.6:1). On the ground it is 3.7:1.
- The slider semantics: `role="slider"` on the plot with `aria-valuetext` ("8:50, bean 196 °C, brown"), readouts `aria-live="off"`, a visually hidden events table (inside a `.sr-only` wrapper, because a table ignores the 1px box and would widen the phone layout), and a polite live region that says only the event name when keyboard stepping lands on one. The help line is set per mode.
- `touch-action: pan-y` on the plot and the 6px horizontal threshold before a touch drags. Vertical swipes must stay page scrolls.
- `data-lenis-prevent-horizontal` on the row and the index scroller, so horizontal trackpad swipes scroll them natively while vertical wheels still go to Lenis.
- `aria-disabled` (not `disabled`) on Previous and Next at the ends, so focus is never dropped when a button reaches the end.
- Hidden starting states are set only by GSAP inside the motion branch (`gsap.set` before the intro timeline is built, so nothing shows and then blinks out). No CSS hides anything, so a blocked CDN leaves the full page.
- The speckle filters live in the zero-size `.fx` SVG, not inside the plate, because the plate is hidden on phones and the H2 still needs `#ink-type`.

## Motion

GSAP 3.15 (ScrollTrigger) on Lenis 1.3.26, all inside `gsap.matchMedia` with five conditions: `motion` (no-preference), `reduce`, `fine` ((hover: hover) and (pointer: fine)), `wide` ((min-width: 992px) and (min-height: 600px)) and `coarse` ((pointer: coarse)). The stage pins when `wide && !coarse`; otherwise the row stays native. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`), stops while a dialog is open, and the cleanup removes the tick, restores lag smoothing, destroys Lenis and unpins. House easing is `expo.out` (`--ease`, cubic-bezier(.16,1,.3,1)) for every timed move and `none` for every scrub; hovers enter in 0.45s and leave in 0.3s; press 0.12s, release 0.4s. Reduced motion: no Lenis, no pin, nothing hidden, the log drawn and parked at the drop, every response instant.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| H2 sprayed through the stencil | Stencil spray pass: one clip-path wipe left to right on `steps(6)`, while the speckle filter's displacement settles 8 to 3 | Load, after fonts (2.5s cap) | t=0, 0.7s; displacement 0.9s | Static, speckled |
| Sack plate sprayed | The same pass on the plate's ink layer | Load | t=0.2s, 0.7s | Static |
| Lede and both actions settle | LD8: the lede rises from y 8 and opacity 0.4; the buttons only rise from y 8, so a call to action never looks disabled | Load | t=0.45s and 0.53s, 0.5s, stagger 0.08 | None |
| Index rule draws, indicator slides under the current item | SC16 + NV4 | Index at top 92%, once (0.6s delay when part of the load) | 0.8s; indicator 0.45s | Static |
| **Signature, pinned: the panels slide and the batch roasts** | Pinned stage; one scrubbed timeline moves the track linearly and drives `render(tAt(progress × 5))` | Stage top at top, length = track overflow × 1.4; releases at the drop | `scrub: .6`, ease none; panels rest on 0:00, 1:24, 4:30, 6:50, 8:50, 10:40 | No pin; parked at the drop |
| Hover preview while pinned | Faint line and tab with minute and °C; cursor pointer; title "Click to scroll to m:ss" | Fine pointer over the plot | Fade 0.45s in, 0.3s out | Not shown (no pin) |
| **Signature, native row: the batch roasts** | Page scroll drives `render()` until the row is scrolled sideways; then the row position drives `render(tAt(panel))` | Log card clamp(top 85%) to clamp(bottom 60%); then row scroll | Scroll-linked | Parked at the drop |
| Event ticks pop | Class toggle from `render()` | Crossing each event, either direction | scale 0.6 to 1, 0.35s | Instant |
| Bean colour, swell and crack | Five stacked fills crossfaded by BT; scale 1 to 1.48, most of it from 8:50 to 9:30; crease clip-path opens | From `render()` | Follows the time value; crease 0.45s | Final state |
| Closing H3 opens | Clip-path wipe left to right, linear | clamp(top 85%), once | 0.9s | Static |
| Index indicator rides the slide or swipe | NV4, scroll-linked | Pin progress or row scroll | Every frame | Same, no tween on hover |
| Crosshair follows a fine pointer | Data crosshair (I6), after the pin lets go or when unpinned | Pointer over the plot | Tween on the time value, 0.25s | Instant |
| Touch drag and tap | Same; while pinned a tap scrolls to that minute | Horizontal drag past 6px; tap | Drag direct; tap 0.35s | Instant |
| Arrow, Page, Home, End keys | Same; while pinned they scroll the page to the minute | Plot focused | 0.35s per step (1s page scroll when pinned); live region names events | Instant |
| Start a subscription (x3), Start my subscription, Back to the page, Hold a place | HV4 fill from the entry edge + MI1 | Hover, focus-visible, press | Ink fill 0.45s in, 0.3s out by the exit side; press 0.97 in 0.12s, release 0.4s | Colour change only |
| Previous, Next, Close, Close lot card | HV4 outline variant + MI1 | Same | Blue fill, label to paper | Colour change only |
| Text links and link-buttons | HV2 directional underline | Hover, focus-visible | 0.4s in from the left, out to the right; quiet underline always shown, full on touch | Static |
| Index items | NV4 | Hover, focus-visible, click | Ink to blue, indicator 0.45s; click scrolls the pin (0.8s) or the row, then focuses the panel H3 | Jump |
| Bags | HV12 copper sheen inside the label, quickTo 0.4s; MI1 | Fine pointer move; focus-visible centres it | Fade 0.3s | Static, no tracking |
| Cupping hold | MI2 masked swap | Hold a place, Release my place | 0.35s, focus follows | Instant |
| Subscribe and lot-card dialogs | CD7 | Open, Escape, Close, backdrop | y 12 to 0, scale 0.98 to 1, 0.45s; close 0.3s; Lenis stopped; focus returns to the opener | Fade 0.2s |
| Lot-card mini curve | Clip-path reveal on open (`@starting-style`) | Dialog opens | 0.9s, 0.1s delay | Drawn |
| Inputs | MI4 + SC16 idea | Focus, hover, invalid submit | Blue rule draws 0.3s, label turns blue; error line uncovered by clip-path 0.25s; focus to the first invalid field | Instant |
| Grind and first-box cards | MI3 | Check, hover | Badge "Chosen" scale 0.6 to 1, 0.25s; border blue 0.2s | No pop |
| Form to confirmation | Crossfade | Valid submit, Change details | 0.15s out, 0.35s in; values kept | Instant |

## Adapting

- **Brand.** Change the colour tokens first. Keep one ground the paper clearly lifts off (1.5:1 here), ink at 10:1 on it, one blue that reaches 4.5:1 on the ground for links and buttons, and a second data colour that is only used as text on paper. Recheck every pair; the current ones are in the table below.
- **Data.** Replace `#bt` and `#et` (`viewBox 0 0 640 200`, one point per 2 s, y = 240 minus °C) with your own log, then update `END`, `FC`, `EVENTS`, `RESTS_T` (one roast moment per panel, first 0, last `END`), the `.ev` elements (`data-t`, `--t`, `--v`), the x-axis spans, the events table and `runSelfTest`. The bean thresholds are the `data-from` and `data-span` attributes on the four upper layers, in °C; the swell is the `--bs` line in `render()`; the "Probe" label switches at the turning point in `render()`.
- **Other processes.** A kiln firing or a bread bake fits the same structure: keep one curve that matters to the customer, three to five named events, and a drawn sample that changes with it.
- **Retiming.** The pin's length is the `end` of the pin ScrollTrigger (`maxX() * 1.4`) and its smoothing `scrub: .6`; the pin threshold is the `wide` condition. The unpinned pass is the `start` and `end` of the log ScrollTrigger in the `else` branch. Link arrival is the `1.6` in the anchor handler; pointer follow and key steps are `.25` and `.35` in the plot handlers; `seek()` scrolls in 1s. The spray is `WIPE_FROM`, `WIPE_TO`, `0.7`, `steps(6)` and the 0.2s plate offset in the `intro` timeline; the closing wipe is the `0.9` in its `onEnter`. Durations and the ease also live in `--dur-in`, `--dur-out`, `--dur-press`, `--dur-release` and `--ease`.
- **Removing effects.** Without the pin, delete the `if (wide && !coarse)` branch and the `.stage.is-pinned` rules; the native-row branch then runs everywhere. Without the sheen, delete the `fine` block and `.bag-label::before`. Without the spray pass, delete the `gsap.set` on `.title, .plate-ink` and the `intro` timeline. Without the closing wipe, delete its `ScrollTrigger.create`. The rest of the page does not depend on any of them.
- **Copy.** Panels hold a stencil H3 of up to about six words and one to three sentences of up to 38 characters a line (46 on short pinned windows). Longer copy can overflow a pinned panel on a 600px-tall window; watch for the `measureRow()` console warning. More than six panels make the index scroll on desktop too, and need one more entry in `RESTS_T`.

| Token | Role |
|---|---|
| `--green-bean` | Page ground (ink 10.2:1, blue 5.5:1, `--roast-2` 5.2:1) |
| `--paper` | Bags, brew card, log card, dialogs (ink 15.3:1, blue 8.2:1, red 5.6:1, `--roast-2` 7.7:1) |
| `--roast` | Ink, button hover fill, bag labels (paper text on it 15.3:1) |
| `--roast-2` | Secondary text, axis labels, readout keys |
| `--stencil-blue` | Links, buttons (paper label 8.2:1), focus ring, BT curve, crosshair, hover preview |
| `--plate-ink` | Sack stencil ink on the plate (5.7:1 on `--jute`) |
| `--exhaust-red` | ET curve, first-crack tick and label, form errors; text only on paper |
| `--foil` | Copper foil band and pointer sheen on the bag labels; never text |
| `--jute`, `--jute-light`, `--jute-dark` | Sack weave behind the plate stencil |
| `--bean-green` to `--bean-city` | The five bean drawings |
| `--chaff`, `--crease` | The bean's crease line and the chaff that opens along it at first crack |
| `--rule`, `--rule-strong`, `--grid` | Panel dividers, field and card rules, plot grid |
| `--font-stencil`, `--font-text` | Stick No Bills and Rethink Sans |
| `--step--1` to `--step-4`, `--step-closing` | Perfect-fourth scale from 17px |
| `--space-1` to `--space-9`, `--gutter`, `--max`, `--panel-w` | Spacing, page edge, panel width (44vw desktop, 62vw tablet, 86vw phone) |
| `--r-btn`, `--r-paper`, `--r-plate`, `--r-dialog`, `--shadow-paper` | Radius per kind of object; one hard shadow for paper |
| `--ease`, `--dur-in`, `--dur-out`, `--dur-press`, `--dur-release` | Motion |
