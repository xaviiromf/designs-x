---
title: Ruta 7 route card
section: faq
subject: The FAQ for Ripio Campers (fictional; "ripio" is Chilean for road gravel), a camper-van rental desk in Puerto Montt whose customers drive the Carretera Austral (Ruta 7) south to Villa O'Higgins.
aesthetic: The desk's route card for Ruta 7. Overcast fog grey, southern-beech ink, glacial-lake turquoise kept for water and ferries, and wild-fuchsia chilco for you and your van; one map-lettering sans with italic reserved for water.
mode: light
fonts:
  - Asap, variable ital 0-1, wdth 75-125, wght 400-800 (Google Fonts). The only family. H2 at wdth 118 / 780; group headings wdth 112 / 700; questions wdth 100 / 600; body and answers wdth 100 / 400; map labels, place lines and the stage button at wdth 87.5 / 600; italic 500 only for water (ferry legs, Lago General Carrera); trip-meter drums wdth 87.5 / 700 with tabular figures.
js: Runs 22 APG disclosures with independent rows; opening an answer drives a van along a drawn Ruta 7 to the place where that answer matters, inks the travelled road and rolls a five-drum trip meter there with odometer carry, while hovering or focusing a question sends a ghost pin to that place; marks the stage in view, glides rail, sheet and in-answer links to their target and moves focus, opens the phone stage sheet, copies the depot address with a fallback, and plays the GSAP and Lenis choreography with final states under reduced motion.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [faq, accordion, disclosure, map, route, road-trip, camper-van, rental, travel, chile, patagonia, trip-meter, section-spy, sticky-rail, light, gsap, lenis, detailed]
use_when:
  - An FAQ for anything that happens along a route or a sequence of places (road trips, rail passes, ferries, hiking trails, cycling tours, delivery or moving routes), where each answer belongs somewhere on the way.
  - Questions fall into 4 to 8 stages with a natural order, and readers want to know where they are in the trip as well as what the rule is.
  - A light, daylight page that needs one memorable instrument rather than decoration.
avoid_when:
  - The answers have no geography or order. Without real places the road and the meter are decoration.
  - Fewer than about ten questions; the rail outweighs the list.
  - The brand needs a dark or loud look, or a dense support centre with search (see faq-moving-company) or open-all comparison (see faq-language-school).
---

## Why it works

**The one bold idea: every answer has a place on the road.** A sticky rail on the left is a schematic of Ruta 7 drawn as a road, not a transit line: one meandering moss line from the Puerto Montt depot to Villa O'Higgins, lake-coloured dashes where the road is a ferry (La Arena to Puelche, the Hornopirén crossings, Puerto Yungay), a tight zigzag for the Cuesta Queulat switchbacks, Lago General Carrera as a small turquoise shape beside the road, a dotted stub above the depot for "before you leave", and a bar where the road ends. Each question carries a `data-km` and a `data-place` for the point on the road where its answer matters ("Leptepu to Fiordo Largo, km 140", "Partner workshop, Coyhaique, km 630"). Hovering or focusing a question sends a hollow chilco ghost pin there. Opening it drives the chilco van from wherever it stands to that place, the road inks in from Puerto Montt to that point, and the trip meter rolls to the km. Nothing about the van or the meter is tied to scrolling; the map answers what you open.

- **A camper's trip meter, not a scoreboard.** Five drums in a recessed bezel: paper numerals on lenga drums, the last drum in chilco for hundreds of metres, as on a dashboard trip counter. The higher drums only roll while the one below passes 9 (real odometer carry), so 0140.0 to 0630.0 reads as a drive, not a count-up. On load the desk resets it: the drums start on a stranger's trip and roll back to 0000.0, and the van appears at the depot. The meter is `aria-hidden`; the place line under it and the `aria-current` stage link carry the state in text.
- **One mark for "you".** The question indicator is a 20px hollow chilco ring that fills from the centre when its answer is open, and the ghost pin on the map is the same ring. Chilco is only ever you: the van, the current stage, the pin, the indicator, the row sweep, the focus ring.
- **Colour encodes meaning.** Lake turquoise is water only: ferry legs, the lake, italic water labels and in-answer links (the links lead you across to another answer). Untravelled road is moss, travelled road is lenga. Italic is lettered only for water, following the cartographic rule.
- **The rail is the navigation.** The six stage labels on the map are the section nav (`nav[aria-label="Stages of the trip"]`); the stage in view turns chilco. Each group heading prints its place and km range in text ("La Arena to Caleta Gonzalo, km 46 to 205"), so nothing depends on the drawing. On phones the same `.rail` becomes a 56px sticky strip: the meter, a straight road with the same stops, ferry dashes and van, and a stage button that opens the same links as a sheet. There is one nav, not two.
- **Quiet everywhere else.** The H2 is large but unaccented; questions are plain rows on real rules; one 62ch answer column; no cards, no eyebrows, no search bar, no open-all, no pointer follower. An open answer gets a paper band with a 6px radius; buttons are pills; the sheet has a 14px radius. Radius follows hierarchy.
- **Accessible structure.** `section[aria-labelledby]` with an h2; six stage `section`s with h3s (`tabindex="-1"`, ids `stage-booking` to `stage-south`); every question is `h4 > button[aria-expanded][aria-controls]`; panels are `role=region` with `aria-labelledby` and `inert` when closed. Rows are independent so readers can compare answers. The map SVGs are `aria-hidden` with a visually hidden sentence ("Schematic of Ruta 7 from Puerto Montt to Villa O'Higgins, not to scale."), and the rail says "Ruta 7, not to scale".
- **No dead ends.** Stage links, five in-answer cross-links ("the Argentina permit", "the deposit", "return checklist", "message the desk") and `#q-...` hashes all glide to their target, open the question and move focus to it. "Email the desk" is a `mailto:` on the reserved `.example` domain with `target="_blank" rel="noopener"`. "Copy address" writes to the clipboard and says "Copied", or selects the address and says "Press Ctrl+C" (Cmd+C on Apple) where the clipboard is blocked. No phone or WhatsApp link, because a fictional number could reach a real person.
- **Works without the libraries.** If the CDN fails or JavaScript is off, `html.js` is never set: every answer is open, the rings and the van sentence in the lede are hidden, the map and meter do not render, and the stages are a wrapped list of plain anchors.
- **Palette checked.** Fog `#D9DCE2` is a blue overcast Aysén sky, not cream (default 1); the accent is fuchsia-crimson chilco, not terracotta or vermilion; lenga `#232A20` is a chosen green-black ink, and `--bezel #141811` is the same ink pressed darker for the meter housing only. Contrast: lenga 10.7:1, moss 5.26:1, chilco 5.0:1 and lake 4.62:1 on fog; on the paper band lenga 13.6:1, moss 6.7:1, lake 5.85:1; paper on lenga 13.6:1, on chilco 6.3:1, on the bezel 16.6:1. Lake sits close to the AA edge, so it is never set below 17px.
- **Reviewed and revised.** The first draft drew stations on a coloured line (too close to hero-transit-line) and later scrubbed the van and meter with scroll (the same move as story-cargo-sailing's scroll-driven marker and distance readout). Both were replaced: a road, and an answer-driven van. Cut along the way: a site-wide cursor disc and then a labelled pointer pill (repeated the ghost pin), a lens revealing paved and gravel surfaces, a scramble on the meter, a search bar with highlight marks, an open-all toggle, plus-to-minus icons, and finally the half-filled ring on hover, so a filled ring only ever means "open".

## Do not touch

- **Answer-driven, never scroll-driven.** The van, the inked road and the meter move only when an answer opens or closes (and the load reset). The most recently opened row leads; closing it sends the van back to the previous open row's place, or to the depot.
- **One road model.** Places are stored as a stop coordinate (stop index plus fraction) and converted to km, path fraction and strip position. The van and pin read a 240-point lookup table sampled once from `getPointAtLength` (viewBox units do not change with layout); positions and rotation are interpolated from it, never measured per frame. Stop km: depot 0, La Arena 46, Chaitén 205, El Maitén 900, Cochrane 970, Villa O'Higgins 1,240.
- **Odometer carry.** `setKm` rolls the tenths drum continuously and moves each higher drum only by the fraction the drum below spends between 9 and 10. Keep the `#selftest` checks (`runSelfTest`) when you edit it.
- **Water is lake, you are chilco.** Do not use lake for anything that is not water or a cross-link, or chilco for anything that is not the reader, the van, the current stage or focus.
- **Italic only for water labels.** Every other label is upright Asap at wdth 87.5.
- **Disclosure semantics.** `aria-expanded`, `role=region`, `inert` on closed panels, real-height `grid-template-rows` (no measuring), close faster than open, and focus moved by every anchor.
- **Map proportions.** The map box keeps the 240 by 900 viewBox aspect; stop and label positions are percentages of that box, set from the same coordinates the road uses (`data-stops`). Change the road and the stops together.

## Adapting

1. **Another route.** Redraw `#road-map` in the 240 by 900 viewBox, keep `pathLength="1"`, and list the six stop coordinates in `data-stops` (the first is the "before you leave" stub start, the last the end of the road). Update `STOP_KM` in the script, the ferry or water `g.m-ferry` segments, the lake path, the map labels (`--x`, `--y` in viewBox units) and the strip's `data-sx` ferry positions (percent of the strip). Five to seven stages fit; the strip spaces stages evenly, so it needs no real distances.
2. **Questions.** Give each question a `data-km` and a short `data-place` that names a real point. Questions in the first group (before you leave) always sit on the stub. Keep answers at 50 to 110 words; the band and the 62ch column are built for that.
3. **Groups.** Each group needs a `data-km-start`, `data-km-end`, an h3 id that matches its rail and sheet link, and a sentence-case place line.
4. **Palette.** Change the six colour tokens; keep one colour for water, one for "you", and an untravelled/travelled pair with at least 3:1 against the ground.
5. **Facts.** The km positions along Ruta 7 and the ferry durations are approximate and written with "about"; the company, prices, deposit, permit and policies are fictional. Verify before real use. The email uses the reserved `.example` domain on purpose.

| Token | Role |
|---|---|
| `--fog` | Page ground, strip background, gaps behind ferry dashes |
| `--paper` | Open-answer band, sheet, drum numerals, text on dark fills |
| `--lenga` | Text, travelled road, drums, primary button, group rules |
| `--moss` | Secondary text, untravelled road, stop dots, row rules |
| `--lake` | Water only: ferry legs, the lake, italic water labels, in-answer links |
| `--chilco` | You: van, current stage, ghost pin, ring indicator, row sweep, tenths drum, focus ring |
| `--bezel`, `--shade` | Trip-meter housing and drum curvature |
| `--font` | Asap, the only family |
| `--t-xs` to `--t-xl`, `--t-odo` | Major-third scale from 17px; fluid H2; drum size (1.25rem, 2rem from 992px) |
| `--lh-body`, `--lh-q`, `--lh-h2`, `--measure` | Leading for answers, questions and the H2; 62ch answer measure |
| `--s-1` to `--s-9`, `--gutter` | 4-based spacing; gutter 16px, 32px from 768px |
| `--r-pill`, `--r-sheet`, `--r-band`, `--r-drum` | Radii by hierarchy: buttons, phone sheet, open band, drums |
| `--rail-w`, `--map-h`, `--strip-h`, `--dot` | Rail column, map height (clamp 520px to 760px, 70svh), phone strip height, stop dot size |
| `--ease-*`, `--dur-*` | CSS-driven motion: accordion, sweeps, fills, press and release, label swaps |

## Motion

Lenis runs on GSAP's ticker (`autoRaf: false`, `lagSmoothing(0)`) and feeds `ScrollTrigger.update`, inside a `gsap.matchMedia` branch for `prefers-reduced-motion: no-preference` whose cleanup removes the tick, restores `lagSmoothing(500, 33)` and destroys Lenis. A second `matchMedia` branch on the 992px breakpoint drops any sheet state when the nav moves between map and sheet. The disclosures, spy, van, meter, pin and anchors are bound once outside those branches because they work in both motion modes; they read `prefers-reduced-motion` and `(hover: hover) and (pointer: fine)` at event time. Hidden starting states exist only under `html.js` and only for what the load timeline animates; questions are readable from first paint. Lenis is stopped while the phone sheet is open. Technique ids refer to `research/motion-techniques.md`.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| H2 lines rise out of their masks | TX1 (SplitText lines, mask, autoSplit) | Load, fonts ready (1.2s cap), t 0 | 1.0s expo.out, stagger .08 | Visible, not split |
| Lede rises 8px and fades in | LD8 | Load, t .35 | 0.6s expo.out | Static |
| Untravelled road draws from the depot; the stub fades in | SC16, stroke variant (`pathLength="1"`, `strokeDashoffset`) | Load, t .3 | 1.2s power2.inOut | Drawn |
| Ferry dashes, lake and map labels appear as the line passes them; stop dots pop, stop labels rise 6px | SC16 marks | Load, timed by inverting the road's ease | Fades 0.3s; dots 0.45s back.out(2); labels 0.4s expo.out | Static |
| **Trip meter rolls back to 0000.0** | Custom odometer | Load, t 1.1 | 0.9s expo.out, stagger .06 right to left | Shows 0000.0 |
| Van pops in at the desk | Custom | Load, t 1.4 | 0.5s back.out(1.7) | In place |
| Row and group rules in the first viewport draw from the left | SC16 | Load, from t .5 | 0.9s expo.out, stagger .05 | Static |
| Row and group rules draw as they arrive | SC16 (`ScrollTrigger.batch`) | Rule at 88% of the viewport, once | 0.9s expo.out, stagger .05 | Static |
| Stage in view: `aria-current`, dot turns chilco and grows, label turns lenga; phone strip dot grows; stage button label rolls to the new stage | NV6 spy, MI2 | IntersectionObserver `-40% 0px -55% 0px` | Dot 0.3s overshoot, colour 0.25s, label 0.35s cubic-bezier(.65,0,0,1) | Instant |
| Question row: chilco line sweeps in from the left, leaves to the right | HV2 | Hover (fine pointer), focus-visible | In 0.45s cubic-bezier(.35,0,0,1), out 0.3s | Instant |
| Ghost pin glides to the question's place on the road | Custom (ring shared with the indicator) | Hover (fine pointer), focus-visible, open (all inputs) | Glide 0.5s power3.out along the lookup table; pop 0.25s back.out(2); hides 0.2s after leave, 1.2s after a tap | Jumps |
| Answer opens, band fills, text fades in; ring fills from the centre | CD6 | Click, Enter, Space | Open 0.55s cubic-bezier(.625,.05,0,1), close 0.35s; text 0.3s from 0.1s; ring 0.3s | Instant |
| **Van drives to the answer's place, rotated to the road; the road inks in; the meter rolls with carry; the place line swaps** | Custom, MI2 | Open, or close of the leading row | power2.inOut, 0.6s + 0.6s x (km / 1,240), max 1.4s; place line 0.35s | Jumps |
| Ring presses | MI1 | `:active` | Scale .92 in 0.12s, release 0.45s | No scale |
| After a panel settles | CD6 | `transitionend`, debounced 100ms | `lenis.resize()` and `ScrollTrigger.refresh()` | Same |
| Rail stage link: dot grows, label underline sweeps | HV2 | Hover (fine pointer), focus-visible | Dot 0.3s overshoot, underline 0.45s | Instant |
| Stage links, cross-links and hashes glide to the target and move focus | NV6 | Click; `#hash` on load | Lenis `min(1.3, .65 + distance / 4000)` s, expo-out, offset 24px (strip height + 16px on phones) | Immediate jump, focus moved |
| Cross-link target row shows the sweep once to mark where you landed | HV2 | After the glide | 0.45s, held 0.9s | None |
| In-answer links: chilco underline sweeps over the resting lake hairline | HV2 | Hover, focus-visible | 0.45s; hairline always visible (touch) | Instant |
| Phone stage button: masked label swap between stage and "Close", chevron turns | MI2, MI1 | Click, spy | 0.35s cubic-bezier(.65,0,0,1); chevron 0.3s; press .96 | Instant |
| Phone stage sheet opens under the strip; items rise and fade in | NV1 (one reversible timeline) | Stage button | Clip 0.45s expo.out, items 0.35s stagger .04; closes at 1.6x | Appears instantly |
| Sheet items: fog fill sweeps from the left | HV4 | Hover, focus-visible; press .98 | 0.3s expo.out | Instant |
| Email the desk and Copy address fill from the edge the pointer entered | HV4, MI1 | Pointer enter, focus-visible, `:active` on touch | In 0.35s, out 0.25s; press .96 in 0.12s, release 0.45s | Colour only |
| Copy address label rolls to "Copied" (or "Press Ctrl+C") and back | CD10, MI2 | Click | 0.35s; back after 1.8s; announced in `aria-live` | Instant swap |

Touch keeps native scrolling (Lenis `syncTouch` off). Every hover has a keyboard and touch equivalent: focus-visible shows the row sweep and moves the ghost pin, a tap opens the answer (which moves the pin and drives the van), buttons fill on `:active`, and every group heading prints its place and km range in text. The native cursor is never hidden. Only transform, opacity, clip-path, stroke dash offsets and the catalogue's `grid-template-rows` accordion animate.

**Retiming or removing.** CSS-driven timings are the `--dur-*` and `--ease-*` tokens. The load timeline lives in `intro()` (`T0` and `DRAW` for the road, the meter at 1.1, the van at 1.4); the van drive duration is the one line in `driveTo()`; the ghost pin glide is in `pointTo()`; the rule draw-in is the `ScrollTrigger.batch` at the end. To remove the load sequence, delete the `intro(ctx)` call (the page then starts in its final state). To remove the drive animation but keep the feature, make `driveTo()` always take its reduced-motion branch. To drop Lenis and GSAP entirely, the page needs a plain-JS rewrite of the disclosures and spy; without the CDN it falls back to every answer open.
