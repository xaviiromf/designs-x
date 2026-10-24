---
title: Plates for a flora of the coastal range
section: gallery
subject: The archive of nine watercolour plates by Amalia Ferrán, a fictional Chilean botanical illustrator, drawn from living specimens along the Chilean coastal range between 2017 and 2025.
aesthetic: A herbarium cabinet rather than a coffee-table botanical book. Duck-egg baked-enamel ground, bright mounting-sheet plates, Prussian ink line work, printed specimen labels and folder tabs, with Cardo lettering the flora and Karla doing the archive's working text.
mode: light
fonts:
  - Cardo 400 roman and italic (Google Fonts)
  - Karla 400 to 700 variable (Google Fonts)
js: Draws nine plates as SVG from one data array, runs a stepped carousel whose centre plate inks and paints itself, lets the pointer (or a toggle) lower the paint to show the graphite underdrawing, filters a drawer of sheets, and opens a plate dialog with a print-price form handled in the page. runSelfTest() runs at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Observer, DrawSVGPlugin), Lenis 1.3.26]
tags: [gallery, detailed, botanical, illustration, archive, herbarium, watercolour, generated-art, svg, carousel, line-draw, filter, dialog, form, light, gsap, lenis]
use_when:
  - A small numbered set of drawn or painted works (plates, prints, drawings, maps) where how a piece is made is part of what people want to see.
  - Each item has real catalogue data worth a label (date, place, medium, size, scale) and deserves a larger view with an enquiry.
  - The subject has a material vernacular (herbarium sheets, archive boxes, drawers) that can carry the identity.
avoid_when:
  - The collection is photographs or has more than about 20 items. One easel shows one item at a time; a grid or index serves large sets better.
  - The work is not made in layers. The signature (line first, then paint) only makes sense for drawn and painted pieces.
  - The page must stay still. The load and every step play a 2-second inking sequence. Reduced motion removes it, but motion is the point.
---

## Why it works

**The bold idea: the plate inks itself on the easel.** When a plate arrives in the centre of the stepped carousel (at load, on every step and when a sheet is picked from the drawer), its line work draws in the order an illustrator works: stem, then leaves, then flowers, then the dissection roundel and scale bar (DrawSVG, 0.9s per layer, 0.22s apart, power3.inOut). The watercolour wash then rises from the stem base through a slightly ragged polygon clip while the wash layer settles from scale 1.04 to 1 (the bottom-edge variant of MD1, 1.1s expo.out). The neighbours on the easel stay graphite line drawings at 0.55 opacity, so on the easel only the centre plate is ever painted. Everything else on the page is quieter and supports that one moment.

- **The pointer uses the signature's own mechanism.** On a fine pointer over the centre plate, the paint level follows the pointer's height (gsap.quickTo, 0.5s expo.out). Below the pointer the plate is painted; above it the ink line shows over the graphite underdrawing with its construction ellipses and pencilled measurements ("tepal 72 mm"). On leave the wash refills in 0.6s. "Show underdrawing" drains the wash to the stem base for keyboard and touch users, and the same measurements are repeated as text in the dialog. One idea, paint laid over a drawing, instead of a second device such as a lens.
- **One generator, three layers.** `draw(p)` builds each plate's geometry once from the `art` block in `PLATES` (habit, leaf shape and count, flower form, dissection kind). Ink (grouped stem, leaf, flower, detail for the draw order), wash (pan fills under one shared feTurbulence and feDisplacementMap filter for a ragged watercolour edge, with flecks and highlights lifted out in sheet white) and under (graphite construction and measurements) come from the same pass, so they always register. The drawer sheets and the dialog reuse it. Each plate has a dissection roundel with its magnification, a scale bar computed from the sheet size and scale, its plate number lettered in Cardo italic, and "A. Ferrán del." as on a published plate.
- **Specific, checked facts.** Nine real species of the Chilean coastal range, with localities and dates. Every authority was checked against IPNI and POWO at build: Lapageria rosea Ruiz & Pav., Alstroemeria pelegrina L., Puya chilensis Molina, Calceolaria integrifolia L. (IPNI 41427-2, Kongl. Vetensk. Acad. Handl. 31: 289, 1770; the Murray citation refers to the later Syst. Veg. ed. 13), Nothofagus obliqua (Mirb.) Oerst., Leucocoryne ixioides (Sims) Lindl. (basionym Brodiaea ixioides Sims, 1823), Jubaea chilensis (Molina) Baill., Fuchsia magellanica Lam. and Eucryphia cordifolia Cav. Binomials are italic in full and authorities roman, as the botanical convention requires. The lede names the true range of the localities (Fray Jorge to Oncol) rather than the planned "Nahuelbuta to La Campana", which the data contradicted.
- **The herbarium supplies the structure.** The caption is a printed specimen label: field names pre-printed in graphite, the data in ink, rules between rows that draw in at load (SC16). Drawer sheets are square 29:42 mounting sheets with a 1px edge and a label in the bottom-right corner. Filters are folder tabs whose one mounting-sheet tab shape slides to the active habitat (NV4). Plate numbers are shown because the archive's plates are a true numbered sequence.
- **Two families with separate jobs.** Cardo, an old style built for scholarly editions, letters everything that belongs to the published flora: the heading, binomials, sheet titles and the lettering on the plates. Karla does the archive's working text: body, labels, buttons, tabs and the form. Karla has true tabular figures (`1111` and `0000` both measure 31.2px at 13px), so dates and sizes use `tabular-nums`.
- **Radius by role, no shadows.** Paper is square, controls are 3px, folder tabs have 6px top corners only. Sheets lie on the enamel with a 1px edge, like sheets in a drawer.
- **One accent for one job.** Copihue crimson is only the focus ring and the active tab's top edge. Errors, confirmations and selections are ink, carried by weight, rules and the drawn tick.
- **The carousel never hijacks the page.** Vertical wheel always scrolls the page. Only horizontal wheel deltas (more horizontal than vertical, over 10px), swipe and drag (Observer, `touch-action: pan-y`) and the arrow keys while the stage has focus step it, with a 600ms lock so trackpad inertia moves one plate. Previous and Next give a full button path, disabled at the ends, and a polite live region announces "Plate 4 of 9, Calceolaria integrifolia, capachito".

### Revisions against the collection's defaults

- **R1 (default 1).** The first idea was a Curtis's Botanical Magazine page: cream paper, a Didone and a terracotta accent. It became the herbarium cabinet: a cool enamel ground, mounting-sheet white only on the plates, Prussian ink instead of black, and a cool copihue crimson for focus only.
- **R2 (palette and type clashes, art direction).** A sage ground with sap green and a crimson accent read as footer-botanic-garden, and Castoro with Hanken Grotesk repeated neighbouring designs. The ground moved to duck-egg enamel #9CC2C8. The suggested #B7C1C9 was only ΔE2000 4.8 from faq-pharmacy's #C6D4DE and 5.7 from its #9FB2C1; #9CC2C8 is 10.3 and 9.0. Graphite was darkened to #3F4749 (5.0:1 on the ground). Sap green left the UI and survives only as a watercolour pan. The type became Cardo and Karla, both unused in the collection.
- **R3 (one bold idea).** A cursor-follow index, a pinned "how a plate is made" story, a hand lens, SC2 parallax on the drawer, Flip reflow on the tabs, sibling dimming on the sheets and a TX1 heading reveal were all cut. The lens repeated hero-perfumery and cta-vineyard-harvest; the paint level does the same job with the signature's own mechanism.
- **R4 (anti-pattern 1).** The CD2 recipe prevents default on all wheel input. Here only horizontal deltas step the easel.
- **R5 (default 5).** No eyebrow, no middle-dot meta line, no arrow on "Open plate", no monospace accession numbers. "Plate 4 of 9" is sentence-case Karla 600 and the facts are a labelled `dl`.
- **R6 (coverflow).** rotateY and a 1400px perspective were removed. Neighbours lie flat on the table at scale 0.82, turned about one degree like sheets set down by hand, and partly under the easel plate.
- **R7 (section, not page).** The masthead, nav and section spy were removed. The heading is an H2 and the drawer heading an H3, so the section composes with others. The mailto lives only in the colophon.
- **R8 (the rule's wording).** "Only the centre plate is ever painted" contradicted painted drawer sheets. The rule is now "on the easel, only the centre plate is painted". The dialog shows the plate already painted, with no second reveal.
- **R9 (anti-pattern 13).** Everything the pointer reveals is also behind the toggle and repeated as text in the dialog.
- **R10 (LD8, anti-pattern 7).** All chrome is visible from first paint. The Previous, Next, toggle and Open buttons only rise 4px from 0.6 opacity. There is no preloader.
- **R11 (CD7).** A native `<dialog>` with `showModal()`, Escape, backdrop click, Lenis stopped while open, and focus returned to "Open plate" (explicitly, because Safari does not focus buttons on click).
- **R12 (anti-patterns 4 and 11).** No width or height tweens: the tab indicator moves by clip-path, error messages open by `grid-template-rows`. The pointer rect is cached on enter, resize and step end. No ambient loops.
- **R13 (facts).** The mailto uses an `.example` domain. A sentence saying the specimens are vouchered at a real national herbarium was removed as a false claim about a real institution.
- **Accessory removed last:** the third and fourth sheets that peeked behind each neighbour. They were cut off by the stage edge and added a pile nobody needed. Now one graphite sheet lies either side and anything further fades out before it reaches the edge.

## Do not touch

- On the easel, only the centre plate is painted. Neighbours are ink-free graphite at 0.55 opacity (reduced motion shows every plate painted).
- The draw order is stem, leaf, flower, detail. The wash rises from the bottom edge, and the drawer's MD1 reveal uses the same bottom edge.
- The 29:42 sheet ratio, on the easel, in the drawer and in the dialog.
- Vertical wheel stays with the page. Do not add `preventDefault` to vertical deltas or to touch.
- Binomials are italic in full with the authority roman. Never italicise a single word of the heading.
- Copihue crimson is only for focus and the active tab.
- The toggle carries its state in its visible label (MI2 swap between "Show underdrawing" and "Hide underdrawing"), so it does not also set `aria-pressed`, which would read as "Hide underdrawing, pressed".
- Hidden start states exist only under `html.js`, which is added only when GSAP, ScrollTrigger, SplitText, Observer, DrawSVGPlugin and Lenis all loaded, and only under `prefers-reduced-motion: no-preference`. Without the libraries, the buttons step the easel instantly, filters toggle `[hidden]`, the dialog and form work.

## Adapting

Replace `PLATES` at the top of the script. Each plate needs `no`, `binomial`, `authority`, `common`, `family`, `habitat` (a key of `HABITAT`), `place`, `locality`, `collected`, `year`, the sheet size `w` and `h` in cm, `scale` (1 for life size, 4 for 1:4), `note` (may contain `<i>`), three `measures` (text plus an anchor: flower, flower2, leaf, axis, detail), `alt`, and an `art` block. `art.habit` picks the composition (vine, erect, rosette, shrub, branch, scape, infructescence, arching, upright), and `leaf`, `flower` and `detail` set shapes, counts, sizes in plate units (290 by 420) and pan names.

To use real scans, set `img` to an image URL and write `alt`. The generated drawing is then skipped, the arrival animation becomes an MD1 bottom-edge clip reveal of the image, and neighbours show it in greyscale. Keep scans at a 29:42 ratio.

For another subject, keep the idea of the piece completing itself in its own order of making: a map whose roads draw before the colour fills, a print whose plates register one by one. Change the pans for the medium and the label rows for the catalogue's fields.

Copy: binomials up to about 26 characters fit one caption line at 1440px. Notes of two or three lines keep the caption beside the plate; longer notes push the buttons below the fold at 900px tall.

Retiming and removing motion: timings are in `MOTION` at the top of the script (`step`, `drawerStep`, `lock`, `ink`, `layer`, `washAt`, `wash`, `deal`) and in the `--dur-*` and `--ease-*` tokens for CSS transitions. To drop the load sequence, call `intro()` with the deal removed, or set `introDone = true` before `gsap.matchMedia()` so the easel starts painted. To remove the pointer paint level, delete the `if (fine)` block of listeners. To remove the drawer reveal, delete `ScrollTrigger.batch(sheets, ...)` and the `.sheet:not(.is-in)` hidden state.

| Token | Role |
|---|---|
| `--ground` | Page ground, the cabinet enamel (ink 7.6:1, graphite 5.0:1) |
| `--sheet` | Plates, drawer sheets, specimen label, dialog, active tab |
| `--ink` | Text, line work, filled button, rules that draw, the colophon ellipse (14.1:1 on sheet) |
| `--graphite` | Secondary text, underdrawing, label field names (9.1:1 on sheet) |
| `--accent` | Focus rings and the active tab's top edge only (3.8:1 on ground, 7.1:1 on sheet) |
| `--edge`, `--rule` | A sheet's 1px edge on the enamel; label and colophon rules |
| `--field` | Field and size-card borders at rest (3.3:1 on sheet) |
| `--scrim` | Dialog backdrop, ink at 55% |
| `--pan-*` | Watercolour pans, read only by the plate art and named in `PLATES` |
| `--font-serif`, `--font-sans` | Cardo and Karla |
| `--fs-label` to `--fs-h2` | Type scale on a 17px body (label 13px, small 15px, caption 22px, h3 and h2 fluid) |
| `--sp-1` to `--sp-9`, `--gutter`, `--max`, `--measure` | Spacing scale, side gutter, 1440px width, line length |
| `--radius-sheet`, `--radius-control`, `--radius-tab` | 0 for paper, 3px for controls, 6px top corners for folder tabs |
| `--sheet-ratio`, `--plate-w` | 29:42 and the easel plate width (bounded by viewport width and height) |
| `--ease-out`, `--ease-follow`, `--ease-sweep`, `--ease-pop` | expo.out, power3.out, the HV2 sweep, the MI3 overshoot |
| `--dur-fast`, `--dur-mid`, `--dur-slow` | 0.2s, 0.35s, 1s |

## Motion

Technique ids refer to `research/motion-techniques.md`. Everything runs in one `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide` conditions. Lenis runs from `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`) and is destroyed on cleanup. Under `reduce` there is no Lenis, no hidden state and every plate is painted.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Specimen-label rules draw from the left | SC16 | Load (stage top reaches 85% of the viewport, once), t=0.1 | 1.0s expo.out, stagger 0.06 | Static |
| Easel deal: plates glide in from the right and land on Plate 1 | CD2 (`state.pos` from -3) | Load, t=0.2 | 1.4s expo.out | Plate 1 centred and painted |
| Previous, Next, toggle and Open rise | LD8 | Load, t=0.3 | y 4 to 0, opacity 0.6 to 1, 0.2s, stagger 0.08 | None |
| Plate inks itself, then the wash rises and settles | Signature: DrawSVG, then MD1 bottom-edge variant | Load t=1.1; every step (0.3s after it starts); a sheet picked from the drawer | Layers 0.9s power3.inOut, 0.22s apart; lettering fades at 0.96s; wash from 0.95s, 1.1s expo.out, scale 1.04 to 1 | Painted at once |
| Leaving plate drains back to graphite | Signature support | Step | 0.35s power2.in | Instant |
| Caption lines drop out and rise in | TR1 (SplitText lines with masks) | Load t=1.3 (rise only); every step | Out 0.25s power2.in, stagger 0.03; in 0.6s expo.out, stagger 0.07; killed on rapid input | Instant text change |
| Stepped carousel | CD2 (no rotateY; scale 0.82 and opacity 0.55 for neighbours) | Previous, Next, horizontal wheel, swipe or drag (Observer), arrow keys, Home, End on the focused stage; click on a neighbour | 0.8s power3.out, 600ms gesture lock | Instant |
| Paint level follows the pointer | Signature mechanism, CU-style quickTo | Fine pointer over the centre plate | quickTo 0.5s expo.out; refill 0.6s expo.out on leave | Off (use the toggle) |
| Show and hide underdrawing | Signature mechanism + MI2 label swap | Click | Drain 0.8s expo.out, refill 0.6s expo.out; label 0.35s expo.out | Instant |
| Stage focus | Ring + hint colour | Focus-visible | Hint graphite to ink, 0.2s | Instant |
| Buttons (Previous, Next, Show underdrawing, Open plate, Ask for a price, Close plate) | Pen-stroke underline (scaleX) + MI1 | Hover draws a 2px ink line left to right; focus-visible draws it plus the ring; press scales 0.96 | Line 0.35s expo.out; press 0.12s, release 0.4s power3.out | Instant line, no scale |
| Drawer sheets open from the bottom edge | MD1 bottom-edge variant | Scroll, `top 90%`, batched, once; newly shown sheets after a filter | Clip inset(100% 0 0 0) to 0 and inner scale 1.15 to 1, 1.2s expo.out, stagger 0.08 | Visible |
| Drawer tab rail rule draws | SC16 | Scroll, `clamp(top 90%)`, once | 0.9s expo.out | Static |
| Folder-tab indicator slides | NV4 (clip-path, not width) | Click, and follows keyboard focus inside the rail; returns on blur | 0.4s power3.out | Jumps |
| Filter result | `[hidden]` toggle with a live count ("4 plates from the forest") | Click | Instant | Instant |
| Tab hover | HV2 + colour | Hover, focus-visible ring | 0.45s sweep | Static |
| Sheet label rolls from habitat to "Show on the easel" | HV1 | Hover (fine pointer) and focus-visible | 0.45s expo.out | Instant |
| Sheet press | MI1 | Press | 0.97 in 0.12s, release 0.4s | No scale |
| Sheet puts its plate on the easel | Lenis `scrollTo` + CD2 + signature | Click | Scroll min(1.3s, 0.65s + distance/4000) expo-out; then the step (0.9s power3.out) and the signature; focus moves to the stage | Immediate scroll, instant step |
| Skip to the drawer | Slide in + Lenis `scrollTo` | Focus; click | 0.3s expo.out; then the scroll and focus on the drawer | Appears instantly; native jump |
| Plate dialog opens and closes | CD7 | Open plate; Escape, Close, backdrop click, Close plate | Panel autoAlpha 0 and y 12 to rest, 0.45s expo.out; backdrop fade 0.45s; close 0.3s power2.in; Lenis stopped while open | Instant |
| Close button | Icon rotation + MI1 | Hover and focus-visible rotate 90deg; press | 0.35s power3.out; press 0.94 | No rotation |
| Size cards | MI3 + HV2 on the dimensions | Choose (tick draws, badge pops, border to ink); hover darkens the border and underlines the size | Badge 0.25s overshoot; tick 0.3s; underline 0.45s | Instant |
| Name and email fields | Ink rule draws on focus; errors open by `grid-template-rows` | Focus; submit | Rule 0.35s expo.out; error 0.25s | Instant |
| Form result | CD9 fixed-height crossfade | Valid submit; "Ask about another size" | Out 0.15s, in 0.25s | Instant |
| Colophon "Write to Amalia" | HV11 hand-drawn ellipse in ink | Hover and focus-visible; always drawn on touch | 0.45s in, 0.2s out | Shown drawn, no transition |
