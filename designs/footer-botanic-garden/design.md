---
title: Botanic garden footer with a year of opening hours
section: footer
subject: The site-wide footer of Merrow Park Botanic Garden (fictional, founded 1871), a free city garden run by Dunmore City Council with the Friends of Merrow Park, answering "can I get in, and until when?" for any day of the year and turning regular visitors into members.
aesthetic: The garden's working materials. A white enamel park-gate sign lettered in Brunswick railing green, a straw daylight band, and one cyclamen accent from what flowers under the cedars in October. Wayfinding sans for everything you use, a book serif for the answer and for botanical names.
mode: light
fonts:
  - Literata (Google Fonts, variable opsz 7-72, wght 400-500 roman and italic 400), for the today line, the h2s, membership prices and the italic plant binomials
  - National Park (Google Fonts, variable wght 400-600), for body, links, chart axis and month labels, readout, form controls and buttons
js: Computes today's opening status from the hours table in the garden's own time zone, draws and drives the year-of-hours chart (scroll draw, pointer crosshair, touch drag, month radios with a live readout), runs the footer uncover and the structural rule draw-ins, opens the join and topic dialogs, and handles the membership and newsletter forms in place.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [footer, opening-hours, chart, svg, membership, newsletter, radio-list, dialog, form, botanic-garden, gsap, lenis, drawsvg, light]
use_when:
  - A place with opening hours that change through the year (gardens, parks, zoos, castles, lidos, ski lifts) and visitors who mostly come to the footer to ask "is it open, and until when?".
  - The hours depend on something drawable (daylight, tides, seasons), so a chart can explain the rule instead of a table of exceptions.
  - A membership or friends scheme with three to five tiers that should feel like a price list, not a SaaS pricing page.
avoid_when:
  - Fixed hours all year. The chart would be twelve identical bars; use a two-line today block instead.
  - Hours that vary by day of the week more than by season. The chart is per month and cannot show a Monday closure.
  - A dark or loud brand. The page is deliberately quiet so the chart is the one thing people remember.
---

## Why it works

**The one bold idea: the year drawn against daylight.** A 12-month chart with time running down the y-axis from 04:00 to 22:00, like a day planner. Sunrise and sunset close into a straw lens, wide in June and pinched in December. Brunswick gate bars hang from the 08:00 line, each with a white slot cut through it for glasshouse hours. The chart explains the opening rule without a sentence: the gates close at or just before dusk. It shows things a table hides. March and October are split into half-width bars because closing moves an hour after the clocks change. The December and January bars start above the lens because the gates open before sunrise. Today's bar is cyclamen, and a cyclamen tick marks the current time in its column. After it has drawn, the chart is an instrument. On a fine pointer, a crosshair snaps to month columns and follows the hour, and the readout says "June at 19:10: gates open, glasshouses closed." A finger dragged sideways moves through the months, and the keyboard uses 12 real month radios. Everything else on the footer is set in type and stays quiet.

- **The answer comes first, and it is live.** "Open today until 18:00. Last entry 17:30." is computed from the `DATA` table in the garden's own clock (Europe/London through `Intl`, so a visitor abroad still gets the right answer). It has five states: opens today at, open until, last entry was, closed now, and closed on 25 December. The clock-change note appears only within 14 days of a change. The last Sundays of March and October, the split bars, the readout dates and the next Garden notes date (first Tuesday of the month) are all computed for the current year, so nothing on the page lies next year. A one-minute clock moves the tick and recomputes the status with instant updates and no ambient motion.
- **Colour has a material.** White is the enamel of a park-gate sign; Brunswick green (#24513A, 9.08:1 on white) is the railing paint and the only ink, with no stand-in black. Lichen (#56655B, 6.16:1) is secondary text, axis labels and the sun curves. Straw (#E4DA8C) fills the daylight lens only and is never text. The lichen curves bound it at 4.31:1, so the shape reads at better than 3:1. Cyclamen (#B0246B, 6.34:1 on white, white on it 6.34:1) marks today, the now tick, the selected tier, the Join button and focus rings. A limewash tint (#EEF1EC) is only a selected surface: the chosen tier row, the chosen month and the dialog sheet.
- **Type has two clear jobs.** National Park was drawn from the routed wooden signs of the US National Park Service, which suits a garden's wayfinding voice for everything you read and use. Literata is a book serif with a real italic and an optical-size axis. It sets the today line at display size, the h2s and the prices, and it sets plant binomials in italic as botanical convention requires (*Cyclamen hederifolium*), never as a headline accent. National Park has no `tnum` feature: at 100px with `tabular-nums` on, "1111", "0000" and "7777" measured 187.6, 251.6 and 205.2px. So every hh:mm the script writes in the sans goes into fixed-width digit cells (`fig()`, `--fig-w: .63em`) that never wrap. Literata does have `tnum` (232.8px for all three), so the today line and the prices use `font-variant-numeric: tabular-nums`. The base is 17px on a 1.25 scale, with 400 for body, 500 for links and labels and 600 only on buttons and headings. There is no all-caps anywhere.
- **Rules only where they are true.** Blocks are separated by space (96 to 128px). The only lines are the chart's hour gridlines on a real time scale, the price-list row rules and one rule above the imprint. That is also why SC16 is honest here: what draws in is structure.
- **Membership is a price list, not a card kit.** It has four native radios in rows: name, who it is for, a right-aligned tabular price and a check badge. The selected row has a cyclamen left rule, a limewash surface and the badge, and its name stays in text, so selection is never colour alone. Joint is pre-selected. The Join button names the tier and price ("Join as Joint members for £64 a year") and keeps its width when the label swaps.
- **No dead ends.** The index links go to anchors in the footer (with focus moved to the target) or open a dialog with two real sentences and Close. The phone and email open with `target="_blank" rel="noopener"` and a hidden "(opens in a new tab)". Join opens a native dialog that collects a name and email only, with no payment details. It ends in "Welcome to Merrow Park. We've emailed a payment link to …" with Close. Garden notes ends in "Signed up. Your first Garden notes arrive on Tuesday 3 November." plus "Use a different email". There is no map link to the fictional address, no social links and no donate flow, because nothing real would back them.
- **Defaults we avoid, reasoned.** The light ground with a serif display is close to default 1, so it is a choice: the ground is enamel white, not cream; Literata is a moderate-contrast book face chosen for its italic; the accent is cyclamen, not terracotta. "Open today until 18:00" is a full sentence with no stat label or gradient, so it is not default 6. Membership rows have no shadows, no hover lifts and one radius (3px, like an aluminium plant label), so they are not default 4. Only the hours block has a load entrance (default 8). There is one text effect on the page (TX1), the readout rolls instead of scrambling, and the chart is the only bold element. The first draft used Signika and Petrona. Both were taken by other designs built in the same batch (features-mixing-plugin, pricing-ski-pass and process-bespoke-tailor), so this pair replaced them; neither is used elsewhere in the collection.

## Do not touch

- **The time scale.** `yOf(t) = (t - 240) / 1080 * H` maps 04:00 to 22:00 onto the plot height. The HTML axis labels use the same scale (`top: calc(var(--h) / 18 * 100%)`), and the crosshair time label and the now tick read it back. Change the range in one place and the labels drift off their gridlines.
- **The pixel viewBox.** The SVG viewBox is rebuilt in pixels at the measured plot size by a ResizeObserver. That keeps strokes at 1.5px, lens edges sharp and DrawSVG dash lengths true. Do not switch to a fixed viewBox with `preserveAspectRatio="none"`, and do not add `vector-effect: non-scaling-stroke` (it breaks DrawSVG).
- **Labels are HTML.** The axis times, month radios and readout are HTML, so text never scales with the SVG.
- **The month radios are the accessible chart.** The SVG is `role="img"` labelled by the caption. All of its data is reachable through the 12 radios (visible label "Jan" or "J", accessible name "January") and the `aria-live="polite"` readout. Pointer previews switch the live region off so they are not announced, and it is restored on leave.
- **`DATA` at the top of the script is the single source.** Hours, glasshouse hours, the clock-change closing times, sunrise and sunset on the 15th, closed days and the dialog summaries all live there. The self-test (`index.html#selftest`, which logs `SELFTEST PASS`) asserts the clock-change Sundays for 2026 and 2027, the today line on five dates (open, before opening, after closing, Christmas Eve evening, Christmas Day), the clock note, the next send date across the new year and the probe sentences.
- **Hidden states only under `html.js`, and never for text that matters.** If a library fails or loads after 2.5s, the `js` class is removed and the finished page shows, with every control still working. SC16 never hides text, and the SC8 shade covers only the empty top padding, never type.
- **Focus.** It is a 2px cyclamen outline everywhere. Every hover has a `:focus-visible` twin, and every hover becomes a persistent or `:active` state on touch. Targets are at least 44px tall.

## Motion

Three eases, named on `:root` and mirrored by name in the script. `expo.out` (`--ease-out`) is for entrances, dialogs, fills, rule draws and label swaps. `power2.inOut` (`--ease-draw`) is for the DrawSVG sun curves and dialog exits. `power3.out` (`--ease-follow`) is for pointer `quickTo`, the press release and the tier rule. `back.out(2)` is kept only for the tier check badge and the today ring and now tick. Scrubs use `none`. Everything runs inside one `gsap.matchMedia` (motion, reduce, fine `(hover: hover) and (pointer: fine)`, wide 992px). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, feeds `ScrollTrigger.update`, and stops while a dialog is open. The cleanup removes the tick, destroys Lenis and removes the crosshair and its listeners. Only transform, opacity and stroke-dashoffset (DrawSVG) animate.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| "Opening hours" h2 | LD8 | Load, t0 after `document.fonts.ready` (capped at 1s) | y 6 to 0 with autoAlpha, .4s expo.out | Visible |
| Today line rises | TX1 | Load, t.1 | SplitText lines with `mask: 'lines'`, yPercent 110 to 0, 1s expo.out, stagger .08; masks padded .25em for descenders; no-break pairs wrapped in a nowrap span first so the split breaks where the text rests; reverted at the end | Plain text, no split |
| Today date and rows | LD8 | Load, t.45 | y 8 to 0 with autoAlpha, .5s expo.out, stagger .08 | Visible |
| Clock-change note | LD8 | Load, t.6 | autoAlpha .4s expo.out | Visible |
| Footer uncover and shade | SC8 | Scrub from `clamp(top bottom)` to `clamp(top top)` | `.ft__inner` y from -0.8 x top padding to 0; shade band (top padding only) opacity .6 to 0 over the first 70%; ease none | Static, no shade |
| Price-list and imprint rules | SC16 | `ScrollTrigger.batch`, top 90%, once | scaleX 0 to 1 from the left, 1s expo.out, stagger .06; text is never hidden | Drawn |
| Signature chart draw | SC16 (gridlines) plus DrawSVG | Chained at t.7 if the chart is in view at load, otherwise top 80%, once | Month column surface .4s at 0; gridlines scaleX 1s stagger .06 at 0; sunrise and sunset drawSVG 0 to 100% 1.1s power2.inOut at .2; lens autoAlpha .4s at .9; gate bars scaleY from the 08:00 line .6s expo.out stagger .05 January to December at 1.0; glasshouse slots .3s stagger .05 at 1.5; today's bar lights cyclamen .4s at 2.0; month ring and now tick scale in .4s back.out(2) at 2.0 | Everything drawn, tick shown |
| Now tick and status | Minute clock | `setInterval` 60s | Instant set, no tween | Same |
| Chart crosshair | Pointer readout (CU1 rules: native cursor kept, fine pointers only) with HV7 | Pointer over the plot | Rect cached on enter and resize; vertical hairline snaps to the month (or half-month) centre, `quickTo` x .25s power3.out; horizontal hairline follows the hour, `quickTo` y .15s; time label rounded to 10 minutes; other bars to .45 opacity in .2s; axis labels to .3; readout rolls at .2s and the probe line says the sentence | Not built on touch; the readout still answers through the radios |
| Touch drag and tap on the plot | Drag select | Pointer down or drag (`touch-action: pan-y`) | Selects the month under the finger, readout rolls .2s | Instant swap |
| Month radios | HV7 plus HV2, MI2, MI1 | Hover, focus-visible, change, press | Other bars dim to .6 in .2s and the label underline sweeps; readout values swap out up and in from below, .35s expo.out; label press scale .96 in .12s | Instant swap, no dim transition |
| Text links and link-buttons | HV2 | Hover, focus-visible | `::after` scaleX underline, enters from the left (origin left) and leaves to the right (origin right), .45s expo.out; buttons add MI1 .97 | Instant underline; touch shows a persistent .06em underline |
| Anchors and Back to top | NV6 | Click | `lenis.scrollTo` with duration `min(1.3, .65 + distance / 4000)`, then focus moves to the target | Native jump and focus |
| Tier rows | HV2, MI3, MI1 | Hover, focus-visible, change, press | 3px left rule scaleY 0 to 1 from the top, .35s power3.out; name underline; check badge scale .6 to 1 with opacity, .25s back.out(2); press .985 | No pop |
| Join button | HV4, MI2, MI1 | Hover, focus-visible, tier change, press | Brunswick fill sweeps in from the entry edge .4s, out .3s, expo.out; label swap .35s with width reserved from the longest label after fonts load; press .975 in .12s, release .45s power3.out | Colour change only |
| Join and topic dialogs | CD7 | Join, index buttons | Backdrop .3s; panel autoAlpha 0, y 16, scale .98 to rest, .45s expo.out (bottom sheet yPercent 100 to 0 under 600px); close .25s power2.inOut; Lenis stopped while open; focus to the first field, back to the opener | Fade .15s |
| Fields and checkbox | Focus rule plus MI4 | Focus, invalid submit | Bottom rule scaleX .35s expo.out, label to Brunswick; tick draws by stroke-dashoffset .3s; error rises y 4 with opacity .25s in a reserved slot, `aria-invalid` and `aria-describedby` set, focus to the first invalid field; nothing shakes | Instant |
| Form results | CD9 | Valid submit, "Use a different email" | Same grid cell: out autoAlpha with y -4 .15s, in y 4 to 0 .25s, expo.out; focus moves to the result | Instant |

## Adapting

1. **Tokens first.** Map the brand onto the colour roles, keeping one ink (`--ink`), one accent used only for "today, selected, act" (`--accent`) and one quiet fill for the daylight shape (`--daylight`). Re-check `--ink-soft` at 4.5:1 on both `--ground` and `--surface`, and the curves at 3:1 on `--daylight`.
2. **Hours.** Edit `DATA` only: `opens`, `glassOpens`, `lastEntry`, `closed`, and per month `gates`, `after` (closing time from the clock change), `glass` and `sun` (sunrise and sunset on the 15th, local clock time). A month with `after` gets a split bar from its last Sunday. For a southern-hemisphere venue, also change the `[2, 9]` clock-change months listed in `clockNote()`.
3. **Time zone.** `gardenNow()` uses `Europe/London`; change it to the venue's zone.
4. **Copy.** Keep the today line as one or two short sentences. The readout sentences follow "<Month> at <hh:mm>: gates open, glasshouses closed." Keep tier names to one or two words; longer "who it is for" lines wrap under the name below 600px.
5. **Fonts.** Any wayfinding sans works for `--font-sans`. If it has `tnum`, set `font-variant-numeric: tabular-nums` and drop `fig()` and `--fig-w`. If it has none, set `--fig-w` to the width of its widest digit. The serif needs a true italic for binomials.
6. **Retiming or removing motion.** Durations live on `:root` (`--dur-*`) for CSS states. The chart choreography is one timeline in `drawChart()`; scale it by changing the position numbers, keeping the order gridlines, curves, lens, bars, slots, today. To remove SC8, delete the `.ft__shade` element and the scrubbed timeline. To remove the crosshair, delete the `if (fine)` block (the radios and readout keep every answer). To drop the libraries entirely, remove the five CDN tags: the script falls back to the finished page with every control and form still working.

| Token | Role |
|---|---|
| `--ground` | Footer ground, slot cut-through in each gate bar, field fill |
| `--ink` | All text and gate bars, Join fill on hover, crosshair hairlines |
| `--ink-soft` | Secondary text, axis labels, sunrise and sunset curves |
| `--accent` | Today's bar, now tick, month ring, selected tier rule and badge, Join button, focus rings, errors |
| `--on-accent` | Label on the cyclamen button and badge tick |
| `--daylight` | The sunrise-to-sunset lens only, never text |
| `--surface` | Selected tier row, selected month column, dialog sheet |
| `--rule` | Hour gridlines and price-list rules |
| `--backdrop` | Dialog backdrop |
| `--font-serif`, `--font-sans` | Literata (answer, headings, prices, binomials); National Park (everything else) |
| `--step--1` to `--step-4`, `--lh-*` | Type scale and leading (17px base, 1.25 ratio; `--step-4` is the today line) |
| `--s-1` to `--s-10` | 4-based spacing |
| `--ft-pad` | Footer top padding, also the SC8 uncover distance and the shade height |
| `--gutter`, `--max`, `--measure`, `--measure-serif` | Page gutter (16px, 24px from 768px), max width, line lengths |
| `--plot-h`, `--axis-w` | Chart plot height (260, 340, 400px) and axis column width |
| `--fig-w` | Width of one digit cell for hh:mm in the sans |
| `--r-label`, `--r-round` | 3px for controls and dialogs; full circle only for the month ring and tier badge |
| `--target` | Minimum interactive height (44px) |
| `--ease-out`, `--ease-draw`, `--ease-follow` | expo.out, power2.inOut, power3.out |
| `--dur-*` | Press, release, underline sweep, fill, rule, dim, roll and tick durations |
