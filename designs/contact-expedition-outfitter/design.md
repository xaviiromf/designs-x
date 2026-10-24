---
title: Hinlopen ice-chart trip planner
section: contact
subject: The trip-planning enquiry of Hinlopen Outfitters, a fictional guiding and rental shop in Longyearbyen, Svalbard, that runs ski crossings, snowmobile trips and sailing circuits from March to September.
aesthetic: The Norwegian Ice Service's morning ice chart spread out on the shop counter. WMO sea-ice concentration colours on a plain topographic outline, the page as pale sea and every field as white land, one Scandinavian grotesk.
mode: light
fonts:
  - Familjen Grotesk, variable wght 400-700, upright only (Google Fonts), the only family
js: Five-step trip planner with per-field validation and an in-page result, a Svalbard sea-ice chart that redraws for the chosen month and route and marks where the ice blocks it, a hover and tap reading of each sea region, copy buttons, and GSAP/Lenis motion. runSelfTest() runs on #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [contact, form, multi-step, validation, map, inline-svg, sea-ice, chart, svalbard, expedition, travel, gsap, lenis, light]
use_when:
  - An outfitter, tour operator or charter whose answer depends on season and conditions (sea ice, snow, river levels, wind, tides) and can be shown on one map.
  - The enquiry has a real sequence (where, when, who, how to reach you) and the answer to the first two questions changes what you can offer.
  - The business has a few fixed routes or products that can be drawn as lines on that map.
avoid_when:
  - The enquiry is one or two fields. A five-step planner is far too much; use a plain contact form.
  - There is no map that carries meaning for the visitor. The chart is the bold idea and would be decoration.
  - The conditions data is live and safety-critical. The ice here is typical and hand-made; a real version must say so or connect to a real service.
---

## Why it works

**The bold idea: the ice moves when you pick a month, and it shows you whether your route gets through.** Step 2 is a strip of month chips from March to September. Picking one redraws the sea ice on the Svalbard chart. The ice layer is 40 named sea regions (Billefjorden, Hinlopenstretet, Storfjorden, the north coast off Verlegenhuken, and so on), and each has a WMO concentration class for each month in one `REGIONS` object. When the month changes, every region that changes steps through each class in between, as an opacity crossfade of about 0.12s a step: very close drift, then close drift, open drift, very open drift, and open water. The regions are staggered by latitude. The change starts in the south when the ice retreats and in the north when it advances, so the direction carries the meaning. As the change passes a class, that class's legend swatch gives one pulse. The whole change takes about 1.1s.

- **The answer is explicit.** The route chosen in step 1 stays drawn on top of the ice. The script samples the route every 3 chart units and checks each point against land and the region shapes. It then marks the stretches the ice blocks with a hatched ink-and-white stroke, and the summary names them: "Hinlopenstretet: very close drift ice, 9–10/10. Blocked for sailing." The rule depends on how you travel. A boat is blocked by fast ice and by close or very close drift. Skis and snowmobiles need fast ice wherever they cross the sea, so the Isfjorden ski crossing is clear in March "because it runs overland except Sassenfjorden and Billefjorden, which are fast ice". In June the same crossing is blocked. The ice-cap route never touches the sea, and the summary says so. `runSelfTest` checks these cases: the sail route is blocked in April and open in August, and the ski route is clear in March for the stated reason.
- **The chart is the only loud thing.** The saturated colour lives only in the six WMO classes, which are used as data and never as UI accents. The UI takes its colours from the chart's own furniture. The page ground `#E0ECF5` is the pale sea, and the fields, rows and chips are white `#FFFFFF`, so the page reads as water and the inputs as land. Ink is a neutral chart black `#22272B`. Fjord blue appears only in water lettering and inline links, upright, after the Norwegian topo convention. The action colour is ink. Fault red is kept for errors and always comes with text and an icon.
- **The chart reads like the real thing.** The coast is traced from about 170 anchor points (Sørkapp, Hornsund, Kapp Linné, Isfjorden's arms, Verlegenhuken, Hinlopenstretet, Nordaustlandet, Edgeøya and the smaller islands) on an equirectangular projection at 78.5°N. Midpoint displacement roughens it. The sea regions form a Voronoi partition, and each border is roughened once and shared by both neighbours, so they tile exactly (the self-test checks this). Each region is stroked in its own colour, so no seams show. The chart also has a graticule, a 50 km bar, a north tick, and labels with land haloes.
- **Nothing is hover-only.** On a fine pointer, hovering a sea region outlines it, writes "Storfjorden, close drift ice, 7–8/10 in April" under the chart and highlights that row of the legend. A tap does the same on touch. Keyboard and screen-reader users get the same facts from the summary in step 2 and the night-by-night itinerary in step 1. The SVG is `role="img"`, and its label names the month, the route and the verdict.
- **The planner is a real sequence, so it has numbers.** It has five fieldsets with legends and real radio and checkbox inputs, restyled but still focusable. Next validates the step it is on. Its label rolls to the next step's name ("Next: month", "Next: your group"). A month outside the route's season gets a dashed chip and a visible line, and picking one opens a note that blocks Next until you change it. The review step has a Change button per row, and on the step it opens, the primary button reads "Back to review". On submit, every step is validated, the planner jumps to the first step that fails, and focus goes to the first error. The result is in-page, with a reference, the email that will be answered and two ways back.
- **The phone layout keeps the keyboard in mind.** Below 992px the chart sits above the planner, with its legend beside the plate so it stays short (about 40% of an 844px screen). It is sticky only on steps 1 and 2, where you look at it while you choose. On steps 3 to 5 it scrolls away, which leaves room for the on-screen keyboard.
- **What was cut, and why.** A pointer magnifier was the first plan's signature. Lenses are already the signature of two other designs in the collection, so it became the region reading above. A scroll-scrubbed arrival of the ice and a daylight-to-polar-night ground shift went too, because story-glacier-research owns both ideas. Picking a month no longer uses a ragged-edge wipe (also the glacier's) and instead steps down the WMO ramp. A dashed preview of each month's ice edge on hover was removed in the last pass. It added a second dashed ink line to the chart (the route ghost is already one), and it gave away the answer before the click.
- **Defaults it avoids.** There is no cream ground, no serif and no terracotta. The dark is a navy band, not the page, and it has no acid accent. The rules only separate real rows. There is no eyebrow, no middle dots and no monospace, and coordinates and the reference use the one family. The route options are plain rows with drawn route glyphs, not a card kit. The radius follows a hierarchy: 0 for the chart plate (it is paper), 6px for rows, fields and the result, 999px for month chips and 4px for buttons. There are no shadows. The only box-shadow is the 2px white gap inside the focus ring.
- **It is fictional on purpose.** Hinlopen Outfitters, Ingrid Solberg and the reference format are invented. The email uses the reserved `.example` domain. Norway has no drama number range, so the phone number `+47 79 00 00 48` uses the Svalbard 79 prefix with an obviously placeholder 00 00 pattern; replace it before use. The map link points at central Longyearbyen, not at a business. The ice shapes are typical, hand-made and illustrative. They are not data, and the chart says "not a forecast".

## Do not touch

- The WMO class colours and their meaning. They are a standard every guide reads, so they are never re-used as UI colour.
- The ramp order `RAMP = 'WLOCVF'` and the rule that a change steps through every class in between. Only opacity is animated, never `fill`.
- The direction rule: retreat starts in the south and advance starts in the north.
- The blocked rule per mode (sea, ice, land) and the run-length threshold of 2 samples, which keeps a route that starts on a quay from being blocked by its own harbour.
- Region borders. Every border is one shared vertex list used by both neighbours. If you redraw a region, keep its shared edges identical. `runSelfTest` fails if a segment is used more than twice.
- The ice layer's `mask` (land is cut out of the ice) and the hit layer under the land, which make a hover over land read nothing.
- The CDN-fail path. Without GSAP, `html.js` is never added, the fieldsets stay stacked, Next and Back are hidden, Send is shown, and submit still validates and answers.
- `novalidate` is set by the script, so the native `required` attributes still guard the form without JS.
- The legend sits beside the plate below 992px, and the chart is sticky only while `data-step` is 1 or 2.

## Motion

Detailed tier. Only transform, opacity and DrawSVG (stroke-dashoffset, which is paint-only) animate. The only `grid-template-rows` changes are the error, note and rail-description reveals. Everything runs inside `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide` conditions. Lenis (lerp .1, `autoRaf: false`) runs on `gsap.ticker` with `lagSmoothing(0)` and feeds `ScrollTrigger.update`. In-page links go through `lenis.scrollTo` and move focus. There is no menu or dialog, so Lenis is never stopped; if one is added, call `lenis.stop()` and `lenis.start()`. Behaviour is vanilla: the core script installs instant effects (`FX0`), and the motion layer swaps in GSAP versions of the same functions. The cleanup kills the ticker callback, destroys Lenis, finishes running timelines, restores `FX0` and repaints the current state.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| H2 lines | TX1 | Load, after `fonts.ready` (1.2s cap) | yPercent 110 to 0, 1s expo.out, stagger .08; lede and both links visible from first paint (LD8) | Static |
| Graticule | SC16 (DrawSVG) | Load t+.2s (≥992px); ScrollTrigger `top 85%` once below | Draws from the centre out, .8s power2.out, stagger .025 | Drawn |
| Coast, then land fill | DrawSVG, fade | Same timeline | Coast 1.3s power2.inOut at +.25s; land opacity .5s at +1.2s | Drawn and filled |
| Names, scale bar, legend | LD8, DrawSVG, SC16 | Same timeline | Names y 4 to 0 plus autoAlpha, .4s expo.out, stagger .02 at +1.3s; scale .5s at +1.4s; swatches scaleX 0 to 1 from the left, .4s, stagger .04 at +1.5s; total about 2.1s | Shown |
| **Ice change (signature)** | WMO ramp crossfade (replaces MD7) | Month chip change | Each region steps through every class in between, .12s a step, opacity only; latitude stagger up to .5s, south first for retreat and north first for advance; legend swatch scaleX pulse 1 to 1.35 and back, .24s; total ≤ 1.1s | Instant class swap |
| Blocked stretches | Fade | Month change | Out .2s, repainted, in .3s after .6s | Instant |
| Ice summary | TR1 | Route or month change, `aria-live` polite | Out yPercent 100 plus autoAlpha .25s power2.in, stagger .03; in .6s expo.out, stagger .07 | Instant text |
| Step switch | TR4 | Next, Back, rail, Change, validation jump | Running timeline finished, then a .45s power1.out crossfade in one grid cell; legend focused; live region "Step 2 of 5: Month"; Lenis scrolls .8s if the planner top is above view | Instant swap |
| Step rail | Segment fill, grid rows | Step change | Fill scaleX .45s power1.out; active description opens .3s; done steps are buttons with HV2 | Static |
| Route rows | MI3, DrawSVG, ghost | Hover or focus-visible (fine pointer); select | Glyph draws .6s power2.out; border to strong rule .2s; ghost route on the chart, opacity .5 in .3s; badge .6 to 1, .25s back.out(2); 2px ink outline | No draw or pop |
| Chosen route | DrawSVG | Route change | Old undraws .35s power2.in; new draws 1.1s power2.inOut after .25s; each stop pops (scale 0 to 1, .25s back.out(2)) when the line reaches it, timed by inverting the ease; blocked stretches fade in afterwards | Drawn at once |
| Month chips | MI3 | Hover or focus; select | Ground to `--tint` .2s; month detail line shows temperature and daylight; badge pop .25s | No pop |
| Next, Send, Start the planner, Edit this plan | HV4, MI1, MI2 | Hover, focus-visible, press, step change | White fill sweeps in from the entry edge .45s in, .3s out; ink label; press scale .975 in .12s, release .45s power3.out; Next label rolls .3s power3.inOut, width reserved for the longest label | Colour only, instant label |
| Back, Change, Start a new plan, rail steps | HV2, MI1 | Hover, focus-visible, press | Underline .07em in from the left, out to the right, .45s; press .975 | Static underline |
| Text fields | MI4 | Hover, focus, blur, Next | Hover rule to ink .2s; focus bar scaleX .3s; valid check draws .3s; error rule and message via grid rows .25s, focus to the first invalid field; nothing shakes | Instant |
| Group stepper | MI1, digit roll | Buttons, arrow keys | Digit rolls in a mask yPercent ±100, .3s power2.out (up for plus, down for minus); press scale .94 | Instant |
| Checkboxes | MI4 | Change | Tick draws .3s; box fills .2s | Instant |
| Chart reading | Outline, legend highlight | Pointer move (fine), tap | Outline 1.5px ink, .2s fade; caption line and legend row update | Same, instant |
| Result | TR4, TX1 | Valid submit | Form fades .3s while the result fades in .45s; heading lines rise 1s expo.out | Instant |
| Opening links | NV6 | Click | `lenis.scrollTo`, duration min(1.3, .65 + distance/4000), offset for the sticky chart on phones; focus moves to the step legend or the channels heading | Immediate |
| Direct band | TX1, SC16 | ScrollTrigger once (`#direct` at `top 85%`, rows at `top 90%`) | Heading lines 1s expo.out; row rules scaleX 0 to 1 from the left, 1s expo.out, stagger .1 | Static |
| Channel rows | HV2, rule recolour | Hover, focus-within, `:active` | Ice-blue rule sweeps from the side the pointer entered, .45s | Instant |
| Copy buttons | CD10, MI2, MI1 | Click | "Copy" rolls to "Copied" (live region), back after 1.6s; if the clipboard is refused it reads "Select and copy" and selects the value | Instant |

## Adapting

Start with the `:root` tokens. `--ground` is the sea and `--land` the land, so keep the ground a pale tint of the chart's water and keep fields and rows on `--land`. `--ink` must hold 4.5:1 on both. Keep the six `--ice-*` colours if the subject is sea ice, because they are a standard. For other conditions (avalanche danger, river levels, wind), swap them for that field's own standard scale, and keep them as data only.

To change the content, edit the data at the top of the script:

- `REGIONS`: one entry per sea region, `[name, classes March..September]`, using `F V C O L W`. Names are written to be used mid-sentence ("the north coast off Raudfjorden").
- `ROUTES`: `pts` are `[lat, lon, 1 for a night stop]`. `mode` is `sea`, `ice`, `land` or `none`, plus `season` (month indexes) and `itin` (the text equivalent shown in step 1).
- `MONTHS`, `STAGE` (one line about each month's ice), `SEASON_MSG` and `ERR`.
- The projection is `x = (lon − 9) · cos 78.5° · 150`, `y = (81.4 − lat) · 150`. For another place, redraw the land and region paths in the same viewBox and keep shared borders identical.

The copy is written for a guide's voice. Keep the verbs consistent: "Send enquiry" leads to "Plan received", and "Change" leads to "Back to review". Longer route names wrap inside the rows. Month chips should stay on two lines at 360px.

To retime motion, change `--t-*` and `--ease-*` for the CSS parts, and in the script change `STEP` (the ramp step), the `.5` latitude spread, the route draw duration `D`, and the timings in `chartIntro`. To remove motion, delete the `mm.add` block. Everything still works through `FX0`. To keep the signature and drop the rest, keep only `fx.ice` in the motion layer.

| Token | Role |
|---|---|
| `--ground` | Page ground, the pale sea; text on the night band |
| `--land` | Chart land, fields, rows, chips, result panel, inner focus gap, button fill sweep |
| `--ink` | Text, coast, primary buttons, outlines, focus ring, route line |
| `--ink-2` | Secondary text, hints, meta |
| `--fjord` | Water names on the chart and inline links |
| `--night` | Direct-channels band |
| `--on-night` | Text on the band |
| `--ice-blue` | Active row rule on the band |
| `--fault` | Errors only |
| `--rule`, `--rule-strong` | Row and rail rules; field, chip and checkbox edges (3:1 or more) |
| `--tint` | Hover and focus ground of chips and stepper buttons |
| `--ice-fast` … `--ice-ow` | WMO ice classes; `--ice-ow` is also the chart sea |
| `--font` | Familjen Grotesk, the only family |
| `--fs-xs` … `--fs-2xl` | 13, 15, 17, 21, 28 and 40–84px |
| `--sp-1` … `--sp-9` | 4–112px spacing |
| `--gutter`, `--max` | 16/24px gutter, 1360px container |
| `--r-plate`, `--r-row`, `--r-chip`, `--r-btn` | 0, 6px, 999px, 4px |
| `--t-fast`, `--t-mid`, `--t-sweep`, `--t-press` | .2s, .3s, .45s, .12s |
| `--ease-sweep`, `--ease-out`, `--ease-step` | Sweep curve, power3.out, power1.out |
