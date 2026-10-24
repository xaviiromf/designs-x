---
title: Forty-one front lines
section: story
subject: Lenga Glacier Station, a fictional research station in the Aysén Region of Chilean Patagonia (47°S), whose two-person team has surveyed the glacier front from one rock cairn, C3, every March since 1986, laying down forty years of retreat on one map and opening the record to researchers.
aesthetic: A glaciologist's retreat-line map. Dated front positions on survey paper, ice-contour blue linework, flagging-tape pink for the newest line, and a ground that turns from blue firn to milky lake silt to lichen-grey till as the years pass. Set in Asap, by Omnibus-Type of Buenos Aires, narrowed on its width axis for map labels and figures.
mode: light
fonts:
  - Asap (Google Fonts), variable wdth 75-100 and wght 400-700, roman and italic, the only family. H1 and H2 at wdth 87.5 / 600, statement at 100 / 500, body at 100 / 400, map labels, readout, rail and table figures at wdth 75 / 500-600 (Asap's figures are tabular by default), italic only for ice and water names inside the map
js: Lays down 41 dated front lines from one scroll value (a paused DrawSVG timeline, the ice clipPath scale, the legend readout, stakes, lake, bergs, chapter switch and ground colour), plays the load sequence, runs chapter jumps, the section spy, the contents sheet, the request dialog with validation and in-page confirmation, Copy citation, the 1986 ice toggle and the table reveal, and console.asserts that the series, anchors, table and statement agree.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [story, scroll-story, sticky, pin, map, cartography, glacier, climate, research, long-term-monitoring, open-data, dialog, form, gsap, lenis, drawsvg, light, detailed]
use_when:
  - A long-term monitoring record (glacier fronts, coastline, treeline, river channel, shoreline erosion, a dune) whose story is the same measurement repeated over many years from one fixed point.
  - The data fits one drawing that can carry every year at once, so the scroll can build the classic summary diagram line by line and stop on it.
  - The section has to end in something a researcher can use: request the data, cite it, write to the team.
avoid_when:
  - The series has fewer than about ten points, or the points do not share a place on one drawing; the line-by-line build becomes decoration.
  - Readers need exact values while scrolling. The pin is a narrative; the table under "Show all 41 front positions" is the reference.
  - Pages that cannot afford an 800svh pin (560svh on phones), even with the skip link and chapter jumps.
---

## Why it works

**The one bold idea: one scroll value lays down the retreat-line map.** Inside a sticky stage, scroll moves a year from March 1986 to March 2026. Each survey's front line draws across the valley, west to east, in flagging pink, and the line before it cools to ice blue (a pink copy fades out over it). The ice fill is clipped by one SVG circle centred on the cirque; its scale shrinks with the front, so the glacier withdraws up-valley behind the newest line. Stakes go out as the front passes them, the lake fades in in 1999, bergs appear in 2016, and the whole page ground (SC9) turns from firn to lake silt to till, so the land around the ice changes colour with it. The scroll ends on the glaciology diagram: 41 dated fronts on one map. The load sequence tells the same story in reverse: the clip circle grows from the cirque to the 1986 front, the first line is drawn, the cairn appears. Scrolling then takes it back.

- **The fronts are arcs about the cirque.** Every front is a noisy arc (±3 px) of a circle centred on the cirque, so the ice can retreat through a scaled clipPath circle (a transform) instead of a morphing path. The map is static inline SVG generated once, so without JS, with the CDN blocked or under reduced motion, readers get the finished map with all 41 lines, labels on 1986, every fifth year and 2026, hollow rings where stakes S1 to S5 melted out, and Lago Nuevo.
- **The readout is a map legend, not a hero number.** "March 2003 / 840 m behind cairn C3" sits in a neatlined box inside the map frame on tablets and desktops and under the map on phones, as two lines with no middle dot; the hero is the sentence. This is the reasoned exception to default 6. Figures update in place with Asap's tabular digits, no scramble. The 2020 entry reads "February 2020": that survey was made on 28 February, ahead of the lockdown.
- **Italic only for hydrography.** Lenga Glacier, Lago Nuevo and Río Lenga are italic on the map, the cartographic convention for ice and water names. Italic never appears in headings or body, so the H1 does not accent "Lenga Glacier" (default 7 avoided).
- **One family, used on its width axis.** Asap at wdth 87.5 for headings and the H1, 100 for reading, 75 for every label and figure. The condensed cut does the work a monospace would do in template chrome; there are no eyebrows, no all-caps, no arrows on links.
- **Structure is information.** The only rules are the map neatline, the photo frame, the chapter progress rule, the caption divider and the table rows. Radii follow hierarchy: frames 0 (a neatline is real structure), controls 6px, dialog 10px. Year numbers in the step list stay because the content is a real chronology.
- **The data agrees with itself.** One series of 41 values keeps the anchors exact (1986 0 m, 1993 180, 1999 470, 2008 930, 2016 1,420, 2026 1,870). The retreat speeds up to 2008, when the floating front loses 93 m, the largest change in the record; it stays high through calving (88 m in 2016), then slows after the front grounds on rock at the head of the lake in 2023. The plan's word "accelerating" was dropped, because the anchors slow the retreat after 2016. On every load `console.assert` checks that the series rises every year, that the largest annual change is 2008's 93 m, that the anchors are exact, that 1,870 m matches the statement's "1.9 km", that the map has 41 lines, and that every table row (year, metres, change) matches the series. The table notes for stakes S1 to S5 fall on the years the front passes them on the map (checked by the generator).
- **Copy corrected for physics.** The plan had stake S2 "drilled 8 m into the ice" and "14 m clear of the surface", which would have melted it out. It now reads "drilled 12 m into the ice in 1991, now stands 9 m clear of the surface".
- **No dead ends.** In-page anchors go through Lenis and move focus to the target heading. Chapter rows and rail segments jump to the scroll position of their survey year and focus its caption. The request dialog validates in JS and confirms in place ("Request LG-26-0417 logged. We will email the files to you@… within 10 working days.") with "Back to the story" and "Make another request". Copy citation falls back to selecting the citation with a "Press Ctrl+C to copy" note. The only external link is `mailto:fieldteam@lenga-station.example` (a reserved domain), with `target="_blank" rel="noopener"`.

### Contrast, checked (WCAG relative luminance) in every ground state

| Pair | firn #C7EAF0 | flour #B9DCD6 | till #CECCAE |
|---|---|---|---|
| `--ink` #241A12 text | 13.4 | 11.6 | 10.5 |
| `--ink-2` #4F463E secondary text | 7.2 | 6.3 | 5.7 |
| Inactive chapter rows (ink at 72%) | 6.0 | 5.6 | 5.2 |
| Rail year labels (ink at 70%) | 5.7 | 5.2 | 5.0 |
| `--glacier` #0A6C80 linework (graphics only) | 4.7 | 4.1 | 3.7 |
| `--flag` #C21F5B lines, markers, borders (graphics only) | 4.5 | 3.9 | 3.5 |

Also: ink on the map's ice and the dialog paper `--snow` 16.1; glacier lines on ice 5.7 and on the lake 3.5; flag on ice 5.4 and on the lake 3.3; the snow label on a flag-filled button 5.4; error text `--flag-ink` #9E1749 on snow 7.4; ink on the tinted secondary-button fill 8.8 or better. Flag pink is never used for small text.

### Reasoned changes to the approved plan

- **Typeface: Asap, not Radio Canada.** The art director chose Radio Canada as a face "used nowhere else", but by build time it was in three designs (footer-record-label, portfolio-wildlife-photographer, process-brewery). Asap meets every criterion the art director measured: width axis (in Chromium on 2026-10-23, "Glacier" at 100px is 316.9px at wdth 100 and 260.9px at wdth 75), tabular lining figures by default ("1111" and "0000" both 214.0px), roman and italic. It is unused in the collection and comes from a Buenos Aires foundry, which suits a Patagonian station.
- **Grounds and ink re-measured against today's collection.** The art director's till #CFC6B8 now sits 1.8 dE from #C9C3B4 (nav-bakery, nav-fashion-label), so till became lichen-grey #CECCAE (nearest colour 6.9 dE), the lightest moraine tone that keeps flag and glacier graphics at 3.5:1 or better and ink at 10:1 or better. Firn #C7EAF0 (8.5 dE) and flour #B9DCD6 (7.7 dE) stand as proposed. The ink became brown-black #241A12, the topo convention for rock, at 10.5:1 on the darkest ground. Every near-black in the collection lies within about 2 dE of another, so the ink's identity comes from the grounds it sits on. Ice linework is cyan glacier blue #0A6C80, 16 dE from contact-expedition-outfitter's blue.
- **The load grows the clip circle** instead of the MD7 ragged-edge wipe (the signature of contact-expedition-outfitter). **No lens** on the repeat photograph: the "Show the 1986 ice" toggle wipes the 1986 tongue down the valley with a clip-path inset. **No SC2 parallax.**
- **Phones get a taller map.** On phones at least 700px tall the map's viewBox is cropped to the valley (x 120 to 680, a 560:600 plate) and the north arrow, scale bar and neatline move with it, so the map is about 40% larger. The readout sits under the map there, so it covers nothing.
- **matchMedia conditions are motion, reduce and fine.** The width changes (pin length, layout) are pure CSS, and ScrollTrigger re-measures on resize, so width conditions would only rebuild the timeline for nothing. `fine` gates the pointer-only effects (row preview on hover, wordmark retreat on mouse hover); keyboard focus triggers both anyway.
- **Hidden layers use `visibility` (GSAP autoAlpha), not `display: none`,** so the stacked intro, chapter list and captions keep one stable height and the skip link never jumps.
- **Accessory removed:** bergs no longer drift 18px with the scroll after 2016. The drift said nothing true at map scale and was a third scrubbed motion on the map. They fade in once and stay.

## Do not touch

- One scroll value drives the map. `render(p)` derives `yearFloat = 1986 + 40 × clamp((p − .125) / .75)`; the intro holds p 0 to .125 and 2026 holds the last 12.5%. Never scrub caption opacity; chapter switches are time-based (TR4).
- The fronts must stay arcs about the cirque (`MAP.ox`, `MAP.oy`, `MAP.r0`, `MAP.k`, `MAP.iceR` in the script match the generator). If you redraw the map, keep that geometry or the clip circle no longer meets the lines.
- The static map is the final state and the text alternative is the table. Do not hide map elements in CSS; hidden start states are set by the script only when the motion stack loaded (`html.js`).
- 2008's 93 m must stay the largest annual change, and the anchors exact. The asserts will tell you when an edit breaks the story.
- Flag pink is a graphic colour (lines, cairn, rule, fills). On the till ground it is 3.5:1; never set small text in it.
- Italic only for map hydrography; no eyebrows, no monospace, no middle-dot meta strings.
- The pin stays bounded (800svh, 560svh on phones) with the skip link, chapter rows and rail. Space, Page Down, find-in-page and anchors keep working because the stage is CSS sticky over native scroll.

## Motion

Tier: detailed. House curves: expo.out for settles and draws, power1 for crossfades, power2.inOut for the ground. Only transform, opacity, clip-path and stroke-dash (DrawSVG) animate; the ground colour is a registered `@property --bg` tweened on the root. Everything runs inside one `gsap.matchMedia` (`motion`, `reduce`, `fine`). Lenis 1.3.26 (lerp .1, `autoRaf: false`) runs on `gsap.ticker` with `lagSmoothing(0)` and feeds `ScrollTrigger.update`; touch keeps native scroll (`syncTouch` off). Lenis stops while the contents sheet or the dialog is open. Cleanup destroys Lenis, removes the tick, restores `lagSmoothing(500, 33)`, the static map (ice clip, current line, readout) and the full viewBox. If the CDN is blocked, the `js` class is never added and the page shows the static final state with every control still working.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Map neatline | SC16 | Load, t 0 | DrawSVG 0 to 100%, .9s expo.out | Static |
| Ice advances to its 1986 front | Clip circle scale (replaces MD7) | Load, t .1 | scale .15 to 1986 radius, 1.1s power2.out | Final map |
| H1 | TX1 | Load, after `document.fonts.ready` (1.2s fallback), t .2 | SplitText lines in padded masks, yPercent 110 to 0, 1s expo.out, stagger .08 | No split |
| Wordmark, nav, buttons | LD8 | Load, t .3 | y 6 to 0, opacity .35 to 1, .4s expo.out, stagger .08 (never invisible) | Shown |
| Lede and skip link | Fade | Load, t .55 | opacity .6s power1.out | Shown |
| 1986 front, cairn C3, readout | DrawSVG, back.out | Load, t .9 | line .7s power2.out; C3 scale 0 to 1 .4s back.out(2); readout and label .3s | Static |
| Retreat-line map (signature) | SC3 sticky stage + DrawSVG scrub | Scroll, p .125 to .875 | 40 sequential DrawSVG tweens (1987 to 2026, ease none) in a paused timeline set by progress; ice clip scale and readout per frame; pink overlay follows the drawing line | Final map, unpinned |
| Previous line cools to blue | Opacity | Forward year change | pink copy 1 to 0, .6s power1.out | n/a |
| Stakes, year labels, lake, bergs | State tweens | Scroll thresholds (drilled 1991, passed, 1999, 2016) | stakes and labels .3s; lake .6s power1.out; bergs .45s | Final map |
| Chapter switch | TR4 | yearFloat crosses 1993, 1999, 2008, 2016, 2026; intro to 1986 at p .125 | leaving layer .2s power1.in, arriving .33s power1.out from .12s (.45s in all), killed and restarted on rapid change | Static chapter list, each block on its own ground |
| Ground colour | SC9 | Chapter change (ice 0-2, lake 3-4, till 5-6); `#summary` top at 60% | `--bg`, `--fg`, `--line` .6s power2.inOut, overwrite auto | No handoff |
| Progress | SC3 rail | Per frame | desktop flag rule scaleY; phone rail segments scaleX (done 1, current local, future 0) | Hidden with the pin |
| Statement | SC5 | Scroll, top 85% to top 50% (lit before it reaches mid-screen, also on phones) | SplitText words, opacity .2 to 1, stagger .25, ease none, scrub .6 | Full opacity |
| Section spy | NV6 + NV4 | IntersectionObserver, rootMargin -40% 0 -55% 0 | `aria-current`; flag indicator x and scaleX .5s expo.out | Jumps |
| In-page links | NV6 | Click | Lenis glide `min(1.3, .65 + distance / 4000)` s, expo.out, then focus the target heading | Instant, focus moves |
| Chapter rows (desktop) | Rule draw + map preview | Hover (fine pointer), focus-visible | ice rule scaleX 0 to 1 .4s expo.out; thick ink copy of that year's line and label .25s | Hidden (static list) |
| Rows and rail segments | Jump + MI1 | Click, tap, Enter | glide to the survey year (yearFloat Y + .02), focus its caption; press .97 | Hidden |
| Wordmark | DrawSVG | Mouse hover, focus | 1986 arc retreats to its middle and returns, .25s + .25s; press .97 | Press only |
| Links (nav, skip, mailto, table summary) | HV2 | Hover, focus-visible | underline in from the left, out to the right, .45s cubic-bezier(.35,0,0,1), .07em | Static underline; touch keeps it |
| Buttons | HV4 + MI1 | Pointer side, focus-visible, press | flag (primary) or glacier tint (secondary) fill from the entry edge .4s in, .3s out toward the exit edge; press .97 .12s, release .4s cubic-bezier(.34,1.56,.64,1) | Colour only |
| Contents sheet (below 768px) | NV1 | Contents button | clip-path inset(0 0 100% 0) to inset(0) .5s expo.out; items masked rise yPercent 100 to 0, stagger .06; close is the same timeline reversed at 1.4x; Escape closes; page inert; focus returns | Instant |
| Close buttons | Rotation | Hover, focus-visible | × rotates 90° .35s | None |
| Show the 1986 ice | Clip-path inset wipe + HV4 | Toggle (`aria-pressed`) | on: inset(0 0 100% 0) to inset(0) .8s expo.out, down the valley; off .5s power2.in, back up | Instant |
| Show all 41 front positions | CD6 variant | `<details>` toggle | height opens at once; cells clip-path inset reveal .35s power2.out, row stagger amount .4; chevron 180° .3s; then `lenis.resize()` and `ScrollTrigger.refresh()` | Instant |
| Request dialog | CD7 | Request the data (three places) | native `showModal`; panel y 12, scale .98, opacity 0 to rest .45s expo.out; backdrop .3s; close .25s power2.in; full-screen sheet under 600px | Fade only |
| Form fields | MI4 | Hover, focus, value, invalid submit | floating label translateY(-1.2em) scale(.8) .2s; glacier rule scaleX on hover .3s, flag on focus; checkbox ring .2s, tick stroke-dashoffset .3s; errors in reserved slots, opacity and 4px .25s, focus to the first invalid field | Instant |
| Confirmation | TR4 | Valid submit | form out, confirmation in, .45s | Instant |
| Copy citation | CD10 + MI2 | Click | masked roll "Copy citation" up, "Copied" in, .35s; reverts after 2.4s; status announced | Instant swap |

## Adapting

1. **Data first.** Replace `D` (one value per survey, from the first year), `CH` (chapter years), `DRILLED`, `LAKE_FROM` and `BERGS_FROM` in the script, then regenerate the map with the same arc-about-a-centre geometry and paste it in, together with the table rows. Keep the asserts and change their expected values to your anchors; they fail loudly in the console if the prose, table and series drift apart.
2. **Copy.** Six chapters of one or two sentences, each under about 25 words, so the fixed-height caption box never grows. The H1 should be a sentence about the act of measuring, not a number.
3. **Tokens.** Map the three grounds to the three states of your landscape (before, during, after), keeping ink at 10:1 or better and the line and accent colours at 3:1 or better on all three. Keep the accent for the newest line, the primary button, the progress rule and the cairn only.
4. **Retiming or removing motion.** Durations and curves for CSS states are the `--dur-*` and `--ease-*` tokens. In the script: the pin length is the `.fronts` height (800svh, 560svh on phones) and `INTRO`/`SPAN`; the chapter crossfade is in `setChapter`; the load sequence is `loadTl`. To drop an effect, delete its tween; each state function already falls back to instant changes. Delete the five CDN tags and the page becomes the static version, fully usable.
5. **Stack translation.** Keep one scroll value and one `render(p)`; keep the map static markup with the final state; keep the dialog native and the jumps as real buttons.

| Token | Role |
|---|---|
| `--firn`, `--flour`, `--till` | The three grounds (themes ice, lake, till) the page hands between |
| `--bg`, `--fg`, `--line` | Registered `<color>` properties the handoff tweens; the header and the map land read `--bg` |
| `--ink` | Text, rock contours, neatline, focus ring |
| `--ink-2` | Secondary text |
| `--glacier` | Ice contours, past front lines, water lines; graphics only |
| `--flag` | Newest front line, primary fill, progress rule, cairn; graphics only |
| `--flag-ink` | Error text on the dialog paper |
| `--snow` | Ice on the map, paper of the drawing and dialog, label on flag |
| `--lake` | Lake water on the map and in the drawing |
| `--tint`, `--scrim` | Secondary button fill, dialog backdrop |
| `--font-sans` | Asap with narrow fallbacks |
| `--t-label` ... `--t-h1`, `--t-readout`, `--t-menu` | Type scale: .8125, .875, 1.0625, 1.25rem, H2 clamp(1.75rem, 1.3rem + 1.8vw, 3rem), statement clamp(1.75rem, 1.2rem + 2.4vw, 3.25rem), H1 clamp(1.875rem, 1.25rem + 2.7vw, 3.625rem), readout clamp(1.5rem, 1.05rem + 1.7vw, 2.75rem) |
| `--s-1` ... `--s-10` | Spacing 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px |
| `--gutter`, `--gap`, `--max`, `--measure` | 16 / 32 / 48px gutter, 24px grid gap, 1440px, 62ch |
| `--hh` | Header height (56px, 64px from 768px); the stage sticks under it |
| `--r-ctl`, `--r-dlg` | 6px controls, 10px dialog (frames stay square) |
| `--ease-out`, `--ease-sweep`, `--ease-in`, `--ease-press` | expo.out, the HV2 sweep, power2.in, the MI1 release |
| `--dur-fast`, `--dur`, `--dur-slow` | .2s, .45s, .9s |
