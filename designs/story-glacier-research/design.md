---
title: Forty-one front lines
section: story
subject: Tarrant Glacier Station, a fictional research station in the Southern Alps of Canterbury, New Zealand (43°S), whose two-person team has surveyed the glacier front from one rock cairn, T3, every March since 1986, laying down forty years of retreat on one map and opening the record to researchers.
aesthetic: A glaciologist's retreat-line map. Dated front positions on survey paper, ice-contour blue linework, flagging-tape pink for the newest line, and a ground that turns from snow to glacial-flour silt to moraine till as the years pass. Set in Radio Canada, narrowed on its width axis for map labels and figures.
mode: light
fonts:
  - Radio Canada (Google Fonts), variable wdth 75-100, wght 300-700, roman and italic
js: Lays down the 41 dated front lines from one scroll value and runs the page's controls (year jumps, contents sheet, request dialog, copy citation, 1986 toggle, table); the Motion table lists each behaviour.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [story, scroll-story, sticky, pin, map, cartography, annotation, glacier, climate, research, long-term-monitoring, open-data, dialog, form, gsap, lenis, drawsvg, light, detailed]
use_when:
  - A long-term monitoring record (glacier fronts, coastline, treeline, river channel, shoreline erosion, a dune) whose story is the same measurement repeated over many years from one fixed point.
  - The data fits one drawing that can carry every year at once, so the scroll can build the classic summary diagram line by line and stop on it.
  - "The section has to end in something a researcher can use: request the data, cite it, write to the team."
avoid_when:
  - The series has fewer than about ten points, or the points do not share a place on one drawing; the line-by-line build becomes decoration.
  - Readers need exact values while scrolling. The pin is a narrative; the table under "Show all 41 front positions" is the reference.
  - Pages that cannot afford an 800svh pin (560svh on phones), even with the skip link and the year-scale jumps.
---

## Why it works

**The one bold idea: one scroll value lays down the retreat-line map.** Inside a sticky stage, scroll moves a year from March 1986 to March 2026. Each survey's front line draws across the valley, north to south, in flagging pink, and the line before it cools to ice blue (a pink copy fades out over it). The ice fill is clipped by one SVG circle centred on the cirque, off the west edge of the map; its scale shrinks with the front, so the glacier withdraws up-valley behind the newest line. Stakes go out as the front passes them, Tarrant Lake fades in in 1999, bergs appear in 2016, and the whole page ground (SC9) turns from snow to glacial-flour silt to till, so the land around the ice changes colour with it. The scroll ends on the glaciology diagram: 41 dated fronts on one map. The load sequence tells the same story in reverse: the clip circle grows from the 2026 extent to the 1986 front, its leading edge inked by a copy of the noisy 2026 front scaled about the cirque (so the ice arrives ragged, like every other edge on the map), then the first line is drawn and the cairn appears. Scrolling then takes it back.

- **The map is the whole stage.** On desktop the plate spans the full width at 2:1 with its neatline (the 1600 × 900 drawing cropped by its viewBox to the valley walls, so it fills a 1440 × 900 laptop under the header and scale; on shorter windows the plate and scale are centred). Each chapter is an unboxed note set on the map like a cartographic annotation, haloed in what lies under it (the ground, or paper over the ice), with a leader line to where its event happened: 1986 at cairn T3, 1993 at stake S2, 1999 at the new lake, 2008 and 2016 at that year's front, 2026 at the newest line. Notes swap on chapter change and their leaders draw in; only the legend keeps a neatline. Under the map, a 1986-2026 year scale fills with the scroll, and its six chapter years are 44px-tall jump buttons. The H1 and lede sit above the pin in normal flow, so the pin holds only the map. On phones the map is cropped to a 4:3 view of the valley, the legend sits under it, and the note becomes the caption below the scale.
- **The fronts are arcs about the cirque.** Every front is a noisy arc (±2 px) of a circle centred on the cirque, so the ice retreats through a scaled clipPath circle (a transform) instead of a morphing path. The map is static inline SVG generated once, so without the script, with the CDN blocked or under reduced motion, readers get the finished map with all 41 lines, labels on 1986, every fifth year and 2026, hollow rings where stakes S1 to S5 melted out, the lake with its gully fans and the bergs.
- **The finished map answers a mouse.** After the map reaches 2026 (and always in the static map), a fine pointer within 8 px of any dated line raises an ink copy of it, puts its year at the line's north end, sets a ghost tick on the year scale and the legend names it: "March 2003 / 642 m behind cairn T3". The radial distance from the cirque finds the line, so it costs one subtraction per survey. The 41-row table is the keyboard and touch path to the same values.
- **The readout is a map legend, not a hero number.** "March 2003 / 840 m behind cairn T3" sits in a neatlined box inside the map frame on tablets and desktops and under the map on phones, as two lines with no middle dot; the hero is the sentence. This is the reasoned exception to default 6. Its size follows the map (container query units on the plate), so it keeps its corner at every map size. Figures update in place, rounded to 10 m while the lines move, with no scramble. The 2020 entry reads "February 2020": that survey was made on 28 February.
- **Italic only for hydrography.** Tarrant Glacier, Tarrant Lake and Tarrant River are italic on the map, the cartographic convention for ice and water names. Italic never appears in headings or body, so the H1 does not accent "Tarrant Glacier" (default 7 avoided).
- **One family, used on its width axis.** Radio Canada at wdth 87.5 for headings and the H1, 100 for reading, 75 for every label and figure. The condensed cut does the work a monospace would do in template chrome; there are no eyebrows, no all-caps, no arrows on links.
- **Structure is information.** The only rules are the map neatline, the leaders, the photo frame, the year scale with one tick per survey, the citation rule and the table rows. Radii follow hierarchy: frames and notes 0 (a neatline is real structure), controls 6px, dialog 10px. Years on the scale stay because the content is a real chronology.
- **The data agrees with itself.** One series of 41 values keeps the anchors exact (1986 0 m, 1993 180, 1999 470, 2008 930, 2016 1,420, 2026 1,870). The retreat speeds up to 2008, when the floating front loses 93 m, the largest change in the record; it stays high through calving (88 m in 2016), then slows after the front grounds on rock at the head of the lake in 2023. On every load `console.assert` checks that the series rises every year, that 93 m happens once and only in 2008, that the anchors are exact, that 1,870 m matches the statement's "1.9 km", that the map has 41 lines, and that every table row (year, metres, change) matches the series. The table notes for stakes S1 to S5 fall on the years the drawn front passes them (checked by the generator).
- **The repeat photograph speaks the map's language.** 1px ink form lines contour the valley walls and stop at a dashed trimline (the 1986 ice surface), the ice is paper with ice-blue crevasses, the lake is flat water, the moraine underfoot is a uniform stipple. "Show the 1986 ice" advances the old tongue from the 2026 terminus toward the camera, the load gesture again.
- **The statement is the quiet beat after the pin.** It stands at full opacity; its lines rise once (the H1's mask reveal), time-based, never scrubbed, so nobody reads half a sentence at 20%.
- **Copy corrected for physics.** The plan had stake S2 "drilled 8 m into the ice" and "14 m clear of the surface", which would have melted it out. It reads "drilled 12 m into the ice in 1991, now stands 9 m clear of the surface".
- **No dead ends.** In-page anchors go through Lenis and move focus to the target heading. Year-scale buttons jump to the scroll position of their survey and focus its note. The request dialog validates in JS and confirms in place ("Request LG-26-0417 logged. We will email the files to you@… within 10 working days.") with "Back to the story" and "Make another request". Copy citation falls back to selecting the citation with a "Press Ctrl+C to copy" note. The only external link is `mailto:fieldteam@tarrant-station.example` (a reserved domain), with `target="_blank" rel="noopener"`.

### Contrast, checked (WCAG relative luminance) in every ground state

| Pair | neve #EEF3F4 | flour #CFE4E0 | till #D9D4CC |
|---|---|---|---|
| `--ink` #1A2A33 text | 13.2 | 11.1 | 10.0 |
| `--ink-2` #43525B secondary text | 7.2 | 6.1 | 5.5 |
| Inactive year buttons (ink at 72%) | 5.6 | 5.1 | 4.8 |
| `--ice` #255C82 river label, links, linework | 6.4 | 5.4 | 4.9 |
| `--flag` #C21F5B lines, cairn, rules (graphics only) | 5.2 | 4.3 | 3.9 |

Also: ink on the map's ice and the dialog paper 14.8; ink on the lake 8.2 (the lake label is ink, not blue); white on the flag-filled button 5.8; error text in flag on the dialog paper 5.8; ink on the tinted secondary-button fill 8.4 or better.

### Reasoned changes to the approved plan

- **Typeface: Radio Canada**, as the art director asked. On build day no `designs/*/index.html` loads it (the four earlier uses have been replaced; it is only named in other designs' notes as taken). Measured in Chromium: "Glacier" at 100px is 321.5px at wdth 100 / 400 and 278.8px at wdth 75 / 600; "1111" and "0000" are both 200.0px at wdth 75 / 600, with and without `tabular-nums`, so figures line up in the legend, the scale and the table.
- **Subject moved to Canterbury, New Zealand.** March is still the end of the southern ablation season, and every number stays. Glacier, station, lake and river are all "Tarrant", which is not among the roughly 370 named glaciers of the New Zealand Geographic Board list and returns no glacier in a web search; the cairn became T3. The 2020 note still fits: New Zealand's lockdown began on 25 March 2020, and the 28 February survey was two weeks ahead of the usual date. The photograph faces west up the valley, as the map does.
- **Load wipe:** the ice clip circle grows from the 2026 extent to the 1986 radius (1.1s power2.inOut) instead of the MD7 ragged-edge wipe, so load and scroll are one gesture played in opposite directions.
- **Layout:** full-width map with notes on the map and a year scale, instead of the two-column stage with a step list and caption box. Notes sit on the map from 992px; below that the note is the caption under the scale, and the stage is top-aligned so the map sits right under the header. The map plate is 2:1 (the drawing's outer contour rows trimmed by the viewBox, walls and north arrow kept); on wide but short windows it is sized by height and centred with the year scale, and the notes and legend scale with the plate, not the window.
- **Request buttons:** the page's "Request the data" (and Send request, Back to the story) is filled flag pink at rest with an ink wipe on hover, so the main action leads; the header copy stays outlined to keep the chrome quiet.
- **Cut after review:** the scrubbed word-by-word reveal on the statement (a stock trope, a second scrubbed motion right after the signature, and half-lit text mid-scroll). It became a one-shot TX1 line rise.
- **Cut:** the CU4 lens and the SC2 parallax on the repeat photograph. The "Show the 1986 ice" toggle with its clip-circle reveal is the only control there. The fine-pointer response moved to the signature (the front-line hover above).
- **matchMedia conditions are motion, reduce and fine.** The width changes (pin length, layout, phone crop) are pure CSS or a plain `matchMedia` listener, and ScrollTrigger re-measures on resize, so width conditions would only rebuild the timeline for nothing. `fine` gates the pointer-only previews; keyboard focus triggers them anyway.
- **Hidden layers use `visibility` (GSAP autoAlpha), not `display: none`,** so the stacked notes keep one stable box and the year scale never jumps.
- **Accessory removed:** the bergs no longer drift 18px with the scroll after 2016. The drift said nothing true at map scale and was a third scrubbed motion on the map. They fade in once and stay.

## Do not touch

- One scroll value drives the map. `render(p)` derives `yearFloat = 1986 + 40 × clamp((p − .07) / .8)`; p 0 to .07 reads the 1986 note and 2026 holds the last 13%. Never scrub note opacity; chapter switches are time-based (TR4).
- The fronts must stay arcs about the cirque (`MAP.ox`, `MAP.oy`, `MAP.r0`, `MAP.k`, `MAP.iceR` in the script match the generator). If you redraw the map, keep that geometry or the clip circle and the hover no longer meet the lines.
- The static map is the final state and the text alternative is the table. Do not hide map elements in CSS; hidden start states are set by the script only when the motion stack loaded (`html.js`).
- Note anchors (`--x`, `--y`, `data-c`) and the leader paths come from the same generator run; `--y` is a percentage of the 2:1 crop (viewBox y 55 to 855, set in `fitMap`). Move them together, and keep the notes inside the neatline at 1366 × 680.
- 2008's 93 m must stay the largest annual change, and the anchors exact. The asserts will tell you when an edit breaks the story.
- Flag pink is a graphic colour (lines, cairn, rules, fills). On till it is 3.9:1; never set small text in it on the ground.
- Italic only for map hydrography; no eyebrows, no monospace, no middle-dot meta strings.
- The pin stays bounded (800svh, 560svh on phones) with the skip link and the year-scale jumps. Space, Page Down, find-in-page and anchors keep working because the stage is CSS sticky over native scroll.

## Motion

Tier: detailed. House curves: expo.out for settles and draws, power1 for crossfades, power2.inOut for the ground and the load advance. Only transform, opacity, clip-path and stroke-dash (DrawSVG) animate; the ground colour is a registered `@property --bg` tweened on the root. Everything runs inside one `gsap.matchMedia` (`motion`, `reduce`, `fine`). Lenis 1.3.26 (lerp .1, `autoRaf: false`) runs on `gsap.ticker` with `lagSmoothing(0)` and feeds `ScrollTrigger.update`; touch keeps native scroll (`syncTouch` off). Lenis stops while the contents sheet or the dialog is open. Cleanup destroys Lenis, removes the tick, restores `lagSmoothing(500, 33)` and the static map (ice clip, current line, legend). If the CDN is blocked, the `js` class is never added and the page shows the static final state with every control still working.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Map neatline | SC16 | Load, t 0 | DrawSVG 0 to 100%, .9s expo.out | Static |
| Ice advances to its 1986 front | Clip circle scale (replaces MD7) with an inked ragged edge | Load, t .1 | scale from the 2026 radius to the 1986 radius, 1.1s power2.inOut; a copy of the 2026 front, clipped to the valley and scaled about the cirque by the same value, rides the edge and fades .3s as it lands on the 1986 line, then is removed | Final map |
| H1 | TX1 | Load, after `document.fonts.ready` (1.2s fallback), t .2 | SplitText lines in padded masks, yPercent 110 to 0, 1s expo.out, stagger .08 | No split |
| Wordmark, nav, button | LD8 | Load, t .3 | y 6 to 0, opacity .35 to 1, .4s expo.out, stagger .08 (never invisible) | Shown |
| Lede and skip link | Fade | Load, t .55 | opacity .6s power1.out | Shown |
| 1986 front, cairn T3, legend | DrawSVG, back.out | Load, t .9 | line .7s power2.out; T3 scale 0 to 1 .4s back.out(2); legend and 1986 label .3s at 1.0 | Static |
| 1986 note and leader | TR4 + DrawSVG | Load, t 1.2 | note .45s power1.out; leader 0 to 100% .4s power2.out; ring scale .4 to 1 back.out(2) | Notes listed under the map |
| Retreat-line map (signature) | SC3 sticky stage + DrawSVG scrub | Scroll, p .07 to .87 | 40 sequential DrawSVG tweens (1987 to 2026, ease none) in a paused timeline set by progress; ice clip scale and legend per frame; a pink overlay follows the line being drawn | Final map, unpinned |
| Previous line cools to blue | Opacity | Forward year change | pink copy 1 to 0, .6s power1.out | n/a |
| Stakes, year labels, lake, bergs | State tweens | Scroll thresholds (drilled 1991, front passes, 1999, 2016) | stakes and labels .3s; lake .6s power1.out; bergs .45s | Final map |
| Chapter note switch | TR4 + DrawSVG | yearFloat crosses 1993, 1999, 2008, 2016, 2026 | old note and leader out .2s power1.in; new note in .33s from .12s while its leader draws .33s power2.out and its ring pops back.out(2); killed and restarted on rapid change | Static note list, each on its own ground |
| Ground colour | SC9 | Chapter change (snow 1986-1993, silt 1999-2008, till 2016-2026); `#summary` top at 60% | `--bg`, `--fg`, `--line` .6s power2.inOut, overwrite auto | No handoff |
| Year scale | SC3 rail | Per frame | flag fill scaleX = (yearFloat − 1986) / 40; current chapter year at full strength with a flag tick | Hidden with the pin |
| Statement | TX1, once | ScrollTrigger enter, top 85%, `once` | SplitText lines in padded masks, yPercent 110 to 0, 1s expo.out, stagger .08; full opacity throughout | No split |
| Front-line hover | Pointer proximity (this design's own) | Mouse within 8px of a line, map at 2026 | ink copy of that line and its year label at the north end .2s; ghost ink tick on the year scale .2s; legend names year and metres; all clear in .2s on leave | Works, instant |
| Section spy | NV6 + NV4 | IntersectionObserver, rootMargin -40% 0 -55% 0 | `aria-current`; flag indicator x and scaleX .5s expo.out | Jumps |
| In-page links | NV6 | Click | Lenis glide `min(1.3, .65 + distance / 4000)` s, expo.out, then focus the target heading | Instant, focus moves |
| Year-scale buttons | Preview + jump + MI1 | Hover (fine pointer), focus-visible, click, tap, Enter | thick ink copy of that year's line and label .25s; ice rule under the year scaleX .4s expo.out; glide to the survey (yearFloat Y + .02), finish the note switch, focus its note; press .97 | Hidden |
| Wordmark | DrawSVG | Mouse hover, focus | outer 1986 arc retreats to its middle and returns, .25s + .25s; press .97 | Press only |
| Links (nav, skip, mailto, table summary) | HV2 | Hover, focus-visible | underline in from the left, out to the right, .45s cubic-bezier(.35,0,0,1), .07em | Static underline; touch keeps it |
| Buttons | HV4 + MI1 | Pointer side, focus-visible, press | primary filled flag at rest with an ink wipe, header copy outlined with a flag wipe, secondary an ice tint wipe; from the entry edge .4s in, .3s out toward the exit edge; press .97 .12s, release .4s | Colour only |
| Contents sheet (below 768px) | NV1 | Contents button | clip-path inset(0 0 100% 0) to inset(0) .5s expo.out; items masked rise yPercent 100 to 0, stagger .06; close is the same timeline reversed at 1.4x; Escape closes; page inert; focus returns | Instant |
| Close buttons | Rotation | Hover, focus-visible | × rotates 90° .35s | None |
| Show the 1986 ice | Clip-path inset + HV4 | Toggle (`aria-pressed`) | on: inset(53% 0 47% 0) to inset(0), the ice advancing from the 2026 terminus toward the camera, .9s power2.inOut; off the same in reverse, .5s | Instant |
| Show all 41 front positions | CD6 variant | `<details>` toggle | height opens at once; cells clip-path inset reveal .35s power2.out, row stagger amount .4; chevron 180° .3s; then `lenis.resize()` and `ScrollTrigger.refresh()` | Instant |
| Request dialog | CD7 | Request the data (three places) | native `showModal`; panel y 12, scale .98, opacity 0 to rest .45s expo.out (opacity only, never `visibility`, so focus lands on Close from every opener); backdrop .3s; close .25s power2.in; full-screen sheet under 600px | Fade only |
| Form fields | MI4 | Hover, focus, value, invalid submit | floating label translateY(-1.2em) scale(.8) .2s; ice rule scaleX on hover .3s, flag on focus; checkbox ring .2s, tick stroke-dashoffset .3s; errors in reserved slots, opacity and 4px .25s, focus to the first invalid field | Instant |
| Confirmation | TR4 | Valid submit | form out, confirmation in, .45s, opacity only; focus moves to the confirmation | Instant |
| Copy citation | CD10 + MI2 | Click | masked roll "Copy citation" up, "Copied" in, .35s; reverts after 2.4s; status announced | Instant swap |

## Adapting

1. **Data first.** Replace `D` (one value per survey, from the first year), `CH` (chapter years), `DRILLED`, `LAKE_FROM` and `BERGS_FROM` in the script, then regenerate the map with the same arc-about-a-centre geometry and paste it in, together with the table rows, the note anchors and the leaders. Keep the asserts and change their expected values to your anchors; they fail loudly in the console if the prose, table and series drift apart.
2. **Copy.** Six notes of one or two sentences, each under about 25 words, so a note never covers more of the map than its corner. The H1 should be a sentence about the act of measuring, not a number.
3. **Tokens.** Map the three grounds to the three states of your landscape (before, during, after), keeping ink at 10:1 or better and the line and accent colours at 3:1 or better on all three. Keep the accent for the newest line, the primary button, the year-scale fill and the cairn only.
4. **Retiming or removing motion.** Durations and curves for CSS states are the `--dur-*` and `--ease-*` tokens. In the script: the pin length is the `.pin` height (800svh, 560svh on phones) with `INTRO` and `SPAN`; the note crossfade and leader draw are in `setChapter`; the load sequence is `loadTl`; the hover distance is the `8` in the map `pointermove` handler. To drop an effect, delete its tween; each state function already falls back to instant changes. Delete the five CDN tags and the page becomes the static version, fully usable.
5. **Stack translation.** Keep one scroll value and one `render(p)`; keep the map static markup with the final state; keep the notes as real headings and text (they are the chapter list when the pin is off); keep the dialog native and the jumps as real buttons.

| Token | Role |
|---|---|
| `--neve`, `--flour`, `--till` | The three grounds (themes ice, lake, till) the page hands between |
| `--bg`, `--fg`, `--line` | Registered `<color>` properties the handoff tweens; the header, the notes and the map land read `--bg` |
| `--ink` | Text, rock contours, neatline, leaders, focus ring |
| `--ink-2` | Secondary text |
| `--ice` | Ice contours, past front lines, water lines and labels, the mail link |
| `--flag` | Newest front line, primary fill, year-scale fill, cairn, error text on paper |
| `--paper` | Ice on the map, the drawing's ice and snow, dialog paper, label on flag, note halo over the ice |
| `--lake` | Lake water on the map and in the drawing |
| `--tint`, `--scrim` | Secondary button fill, dialog backdrop |
| `--font-sans` | Radio Canada with sans fallbacks |
| `--t-label` ... `--t-h1`, `--t-menu` | Type scale: .8125, .875, 1.0625, 1.25rem, H2 clamp(1.75rem, 1.3rem + 1.8vw, 3rem), statement clamp(1.75rem, 1.2rem + 2.4vw, 3.25rem), H1 clamp(2.5rem, 1.6rem + 3.6vw, 4.75rem) |
| `--t-readout`, `--t-legend` | The map legend, in container units of the plate: clamp(1.375rem, .4rem + 2.9cqi, 3.5rem) and clamp(.75rem, .55rem + .45cqi, .875rem) |
| `--s-1` ... `--s-10` | Spacing 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px |
| `--gutter`, `--gap`, `--max`, `--measure` | 16 / 32 / 48px gutter, 24px grid gap, 1440px, 62ch |
| `--hh` | Header height (56px, 64px from 768px); the stage sticks under it |
| `--r-ctl`, `--r-dlg` | 6px controls, 10px dialog (frames and notes stay square) |
| `--ease-out`, `--ease-sweep`, `--ease-in`, `--ease-press` | expo.out, the HV2 sweep, power2.in, the MI1 release |
| `--dur-fast`, `--dur`, `--dur-slow` | .2s, .45s, .9s |
