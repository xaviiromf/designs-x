---
title: The plate inks itself on the easel
section: gallery
subject: The archive of nine watercolour plates by Amalia Ferrán, a fictional Chilean botanical illustrator, drawn from living specimens along the Chilean coastal range between 2017 and 2025.
aesthetic: A herbarium cabinet rather than a coffee-table botanical book. Cabinet-sage steel, bright mounting sheets, Prussian ink line work, printed specimen labels and folder tabs, with Manuale lettering the flora and Onest doing the archive's working text.
mode: light
fonts:
  - Manuale 400 to 500, roman and italic (Google Fonts, variable)
  - Onest 400 to 600 (Google Fonts, variable)
js: Draws nine plates as SVG from one data array, runs a stepped carousel whose centre plate inks and paints itself, shows each part's graphite underdrawing under the pointer (or all of it with a toggle), filters a drawer of sheets with a Flip reflow, and opens a plate dialog with a print-price form handled in the page. runSelfTest() runs at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Observer, Flip, DrawSVGPlugin), Lenis 1.3.26]
tags: [gallery, detailed, botanical, illustration, archive, herbarium, watercolour, generated-art, svg, carousel, line-draw, filter, flip, dialog, form, light, gsap, lenis]
use_when:
  - A small numbered set of drawn or painted works (plates, prints, drawings, maps) where how a piece is made is part of what people want to see.
  - Each item has real catalogue data worth a label (date, place, medium, size, scale) and deserves a larger view with an enquiry.
  - The subject has a material vernacular (herbarium sheets, archive boxes, plan chests) that can carry the identity.
avoid_when:
  - The collection is photographs or has more than about 20 items. The easel shows one item at a time; a grid or index serves large sets better.
  - The work is not made in layers. The signature (line first, then paint) only makes sense for drawn and painted pieces.
  - The page must stay still. The load and every step play a two-second inking sequence. Reduced motion removes it, but the motion is the point.
---

## Why it works

**The bold idea: the plate inks itself on the easel.** When a plate arrives in the centre of the stepped carousel (at load, on every step, and when a sheet is picked from the drawer), its line work draws in the order an illustrator works: stem, then leaves, then flowers, then the dissection roundel and scale bar (DrawSVG, 0.9s per layer, 0.22s apart, power3.inOut). The lettering ("5 cm", "A. Ferrán del.", "Plate 4") fades in after the line. From 0.7s the watercolour wash rises from the stem base behind a slightly ragged edge at an even pace (1.4s power2.inOut), so its front reaches each part only after that part is inked, while the wash layer settles from scale 1.04 to 1 (the bottom-edge variant of MD1, 1.0s expo.out). The roundel sits low on the sheet, so its colour waits for its line and fades in at the end (0.5s). Picking the sheet already on the easel washes it out (0.35s) and repaints it, with no jump cut. The plate that leaves the centre drains back to graphite in 0.35s. Neighbours on the easel are graphite line drawings at 0.55 opacity, so only the plate on the easel is ever painted, and arriving always changes something. Everything else on the page is quieter and supports this one moment.

- **The pointer lifts the paint part by part.** On a mouse, invisible hit areas follow the four groups of the centre plate in draw order (stem, leaf, flower, detail; later groups win where they overlap). Pointing at a part lifts that part's wash to a 15% trace and shows the graphite beneath it: its pencil line, its construction (axis lines, ellipses round the flowers, the roundel's cross-hair) and its pencilled measurement, such as "tepal 72 mm" (0.3s expo.out in, 0.2s out). Paint over pencil is the signature read backwards. The native cursor stays. The underdrawing is the same order the signature draws in, so the pointer retells the signature instead of adding a second device. "Show underdrawing" lifts the paint and reveals all four groups with a 0.08s stagger for touch and keyboard users, and the dialog repeats every measurement as text. Pencilled figures carry a thin sheet-white halo (`paint-order: stroke`) so they stay readable where they cross the paint.
- **One generator, three layers.** `draw(p)` builds each plate's geometry once from the `art` block in `PLATES` (habit, leaf shape and count, flower form, dissection kind). Ink (grouped stem, leaf, flower, detail for the draw order), wash (pan fills under one shared feTurbulence and feDisplacementMap filter for a ragged watercolour edge, with flecks and highlights lifted out in sheet white) and under (graphite line, plus construction and notes per part) come from the same pass, so they always register. The drawer sheets and the dialog reuse it. Each plate has a dissection roundel with its magnification, a scale bar computed from the sheet size and scale, its plate number lettered in Manuale italic, and "A. Ferrán del." as on a published plate.
- **Specific, checked facts.** Nine real species of the Chilean coastal range, with real localities. Every name and authority was checked on 2026-10-24 against IPNI and the GBIF backbone: *Lapageria rosea* Ruiz & Pav. (IPNI 537288-1), *Alstroemeria pelegrina* L. (62581-1), *Puya chilensis* Molina (124406-1), *Calceolaria integrifolia* L. (41427-2, Kongl. Vetensk. Acad. Handl. 31: 289, 1770; accepted in POWO and GBIF; the "Murray" form is a later, doubtful usage and *C. integrifolia* J.F.Gmel. is a synonym of *C. viscosissima*, so "L." is correct), *Nothofagus obliqua* (Mirb.) Oerst. (359100-1), *Leucocoryne ixioides* (Sims) Lindl. (537400-1; basionym *Brodiaea ixioides* Sims, 1823, so the planned "(Hook.)" was wrong), *Jubaea chilensis* (Molina) Baill. (131713-2), *Fuchsia magellanica* Lam. (612572-1) and *Eucryphia cordifolia* Cav. (724849-1). Binomials are italic in full with the authority roman, as the botanical convention requires. The lede names the true span of the localities ("from Fray Jorge to Oncol") rather than the planned "between Nahuelbuta and La Campana", which the data contradicted.
- **The herbarium supplies the structure.** On desktop the plate fills the first view (its height is the viewport less the masthead and heading) and Previous and Next sit under the caption, level with the plate's foot. The caption is a printed specimen label: field names pre-printed in graphite, the data in ink, rules between rows. Drawer sheets are square 29:42 mounting sheets with a 1px edge and a label in the bottom-right corner ("Plate 4 / *Calceolaria integrifolia* / Ravine, El Tabo, 2018"). Under 600px the art is shorter and the label drops the place ("Ravine, 2018"), so the label sits below the drawing, not over it. Filters are folder tabs whose one mounting-sheet tab shape slides to the active habitat (NV4). Plate numbers are shown because the archive's plates are a true numbered sequence.
- **Two families with separate jobs.** Manuale (Omnibus-Type, Argentina; fitting for a Chilean flora) letters everything that belongs to the published flora: the heading, binomials, the masthead name, sheet titles and the lettering on the plates, at 400 to 500. Onest does the archive's working text: body, labels, buttons, tabs and the form. Onest has true tabular figures (at 13px with `tabular-nums`, "1111" and "0000" both measure 34.95px; proportional "1111" is 19.36px), so dates and sizes use `tabular-nums`.
- **Radius by role, no shadows.** Paper is square, controls are 3px, folder tabs have 6px top corners only. Sheets lie on the cabinet steel with a 1px edge, like sheets in a drawer.
- **One accent for one job.** Copihue crimson (Chile's national flower) is only the focus ring and the active tab's top edge. Errors, confirmations and selections are ink, carried by weight, rules and the drawn tick. Sap green is only the hand-drawn ellipse around "Write to Amalia".
- **The carousel never hijacks the page.** Vertical wheel always scrolls the page. Only horizontal wheel deltas (more horizontal than vertical, over 10px), swipe and drag (Observer, `touch-action: pan-y`) and the arrow keys, Home and End while the stage has focus step it, with a 600ms lock so trackpad inertia moves one plate. Previous and Next give a full button path, disabled at the ends, and a polite live region announces "Plate 4 of 9, Calceolaria integrifolia, capachito".
- **Contrast.** Ink on ground 11.2:1, graphite on ground 5.3:1, crimson on ground 5.6:1, sap on ground 4.9:1, crimson on sheet 7.1:1, sheet on ink 14.1:1, graphite on sheet 6.6:1, field borders on sheet 3.7:1 (non-text, needs 3:1).

### Revisions against the collection's defaults

- **R1 (default 1).** The first idea was a Curtis's Botanical Magazine page: cream paper, a Didone and a terracotta accent. It became the herbarium cabinet: a cool sage ground, mounting-sheet white only on the plates, Prussian ink instead of black, and a cool copihue crimson for focus only.
- **R2 (fonts, art direction).** Castoro was footer-botanic-garden's binomial face and Hanken Grotesk was already in three designs. Art direction named Manuale and Wix Madefor Text; Wix Madefor Text has since shipped in features-ebike, so the text face is Onest, which no other design uses.
- **R3 (one bold idea).** A cursor-follow index, a pinned "how a plate is made" story, a circular hand lens (lenses already appear in five designs; the CU4 lens the plan named is replaced by the part-by-part paint lift, which shows the same pencil under the paint without a sixth lens), 3D cover-flow neighbours, MD1 clip reveals and SC2 parallax on every drawer sheet, TX1 line reveals on the headings, a masthead rule draw-in, an HV4 directional fill on the buttons and sibling dimming in the drawer were all cut. The load is two beats: the easel deal, then Plate 1 inking itself as its caption rises.
- **R4 (anti-pattern 1).** The CD2 recipe prevents default on all wheel input. Here only horizontal deltas step the easel.
- **R5 (default 5).** No eyebrow, no middle-dot meta line, no arrow on "Open plate", no monospace accession numbers. "Plate 4 of 9" is sentence-case Onest 600 and the facts are a labelled `dl`.
- **R6 (cover-flow).** No `perspective`, no `rotateY`. Neighbours lie flat, scaled 0.88, in graphite at 0.55 opacity, partly under the easel plate, like sheets laid either side on a plan chest; anything further fades out before the stage edge.
- **R7 (section, not page).** The heading is an H2 and the drawer heading an H3; the masthead name is plain text. The masthead is the section's own header and is sticky from 600px.
- **R8 (meaning of the signature).** Neighbours were painted at first, so arriving changed nothing. Now only the centre plate is painted on the easel (the drawer sheets and the dialog show finished plates).
- **R9 (anti-pattern 13).** Everything the pointer reveals is also behind the toggle and repeated as text in the dialog.
- **R10 (LD8, anti-pattern 7).** All chrome is visible from first paint and does not move at load (a 4px chrome settle was cut as noise). There is no preloader.
- **R11 (CD7).** A native `<dialog>` with `showModal()`, Escape, backdrop click, Lenis stopped while open, and focus returned to "Open plate" (explicitly, because Safari does not focus buttons on click).
- **R12 (anti-patterns 4 and 11).** No width or height tweens: the tab indicator moves by clip-path, error messages open by `grid-template-rows`, the drawer reflows with Flip. No ambient loops.
- **R13 (facts).** The mailto uses a reserved `.example` domain. The colophon says pressed specimens of all nine species are kept at the Herbario SGO, a true general statement, instead of claiming a fictional illustrator's vouchers sit in a real institution.
- **Accessory removed last:** the construction lines and pencilled measurements on the neighbour plates. They put pencil text either side of the easel and competed with the centre plate. Neighbours are now plain graphite line drawings, so the underdrawing only ever appears where the pointer or the toggle asks for it.

## Do not touch

- On the easel, only the centre plate is painted. Neighbours are ink-free graphite at 0.55 opacity (reduced motion shows every plate painted).
- The draw order is stem, leaf, flower, detail. The wash rises from the stem base (bottom edge). The underdrawing groups and the hit areas use the same four groups in the same order.
- The 29:42 sheet ratio, on the easel, in the drawer and in the dialog.
- Vertical wheel stays with the page. Do not add `preventDefault` to vertical deltas or to touch.
- Binomials are italic in full with the authority roman. Never italicise a single word of the heading.
- Copihue crimson is only for focus and the active tab.
- The toggle carries its state in its visible label (MI2 swap between "Show underdrawing" and "Hide underdrawing", the hidden label `aria-hidden`), so it does not also set `aria-pressed`, which would read as "Hide underdrawing, pressed".
- Off-centre plates are `inert` and `aria-hidden`; the centre plate's art has `role="img"` and an `aria-label` such as "Plate 1, Lapageria rosea, watercolour of a twining stem with two hanging crimson flowers, and a cross-section of the ovary".
- Hidden start states exist only under `html.js`, which is added only when GSAP, ScrollTrigger, SplitText, Observer, Flip, DrawSVGPlugin and Lenis all loaded. Without the libraries the buttons, keys and horizontal wheel step the easel instantly, filters toggle sheets with the live count, the dialog and form work, and the centre plate is shown painted.
- In the dialog, every layer scales from one origin (`50% 50%`) while it opens; the easel's wash keeps its own bottom-edge origin. Mixing them makes ink and wash slide out of register.

## Adapting

Replace `PLATES` at the top of the script. Each plate needs `no`, `binomial`, `authority`, `common`, `family`, `habitat` (a key of `HABITAT`; `COUNT` holds the live-count wording), `place`, `locality`, `collected`, `year`, the sheet size `w` and `h` in cm, `scale` (1 for life size, 4 for 1:4), `note` (may contain `<i>`), `measures` (text plus the part it belongs to: flower, flower2, leaf, axis, detail), `alt`, and an `art` block. `art.habit` picks the composition (vine, erect, rosette, shrub, branch, scape, infructescence, arching, upright). `leaf.shape` is ovate, lanceolate, linear, strap, obovate, cordate or none; `flower.form` is bell, lily, tube, slipper, cupule, star, drupe, fuchsia or cup4; `detail.kind` is ovary, tepal, flower, pouch, nut, star, coquito, below or capsule. Sizes are in plate units (290 by 420) and colours are pan names (`--pan-*`).

To use real scans, set `img` to an image URL and write `alt`. The generated drawing is then skipped, the arrival animation becomes an MD1 bottom-edge clip reveal of the image, and neighbours show it in greyscale. Keep scans at a 29:42 ratio.

For another subject, keep the idea of the piece completing itself in its own order of making: a map whose roads draw before the colour fills, a print whose plates register one by one. Change the pans for the medium, the label rows for the catalogue's fields, and the four groups for the work's own stages.

Copy: binomials with their authority up to about 27 characters ("Calceolaria integrifolia L.") fit one caption line at 1440px. Notes of two or three lines keep the caption beside the plate; longer notes push the buttons down. Open `#selftest` after changing the data: it checks the habitat counts, that every plate has its ink groups, a pencilled note per measurement, underdrawing and a hit area for every drawn part, and that the form confirms with the person, email, plate and size.

Retiming or removing effects:
- Timings are in `MOTION` at the top of the script (`step`, `drawerStep`, `lock`, `ink`, `layer`, `washAt`, `wash` for the scale settle, `rise` for the wash level, `deal`, `flip`); CSS transitions use the `--dur-*` and `--ease-*` tokens.
- **The signature:** replace the body of `sign(k)` with `rest(k)`; steps then land painted.
- **The load deal:** delete the `fromTo(st, { pos: -3 } ...)` line in `intro()` and the `st.pos = -3` start state.
- **Caption swap:** in `step()`, call `fillCaption(i)` instead of `swapCaption(i)`.
- **Pointer underdrawing:** delete the two `pointerover` and `pointerleave` stage listeners and `hitSVG()`; the toggle still works.
- **Drawer reflow:** make `fx.reflow` call `apply()` only; filters then switch instantly.

| Token | Role |
|---|---|
| `--ground` | Page ground, the cabinet's painted steel (ink 11.2:1, graphite 5.3:1) |
| `--sheet` | Plates, drawer sheets, specimen label, dialog, active tab, pencil halo |
| `--ink` | Text, line work, filled button, borders and rules that draw (14.1:1 on sheet) |
| `--graphite` | Secondary text, underdrawing, label field names (6.6:1 on sheet) |
| `--accent` | Focus rings and the active tab's top edge only (5.6:1 on ground, 7.1:1 on sheet) |
| `--sap` | The hand-drawn ellipse round "Write to Amalia" |
| `--edge`, `--rule` | A sheet's 1px edge on the ground; label, masthead and colophon rules |
| `--field` | Field and size-card borders at rest (3.7:1 on sheet) |
| `--scrim` | Dialog backdrop, ink at 55% |
| `--pan-*` | Watercolour pans, read only by the plate art and named in `PLATES` |
| `--font-serif`, `--font-sans` | Manuale and Onest |
| `--fs-label` to `--fs-h2` | Type scale on a 17px body (label 13px, small 15px, masthead name 22px, H3 and H2 fluid) |
| `--fs-plate` | The binomial of the plate on the easel, 26 to 36px fluid |
| `--sp-1` to `--sp-9`, `--gutter`, `--max`, `--measure` | Spacing 4 to 112px, side gutter, 1440px width, line length |
| `--mast-h` | Sticky masthead height, so anchors land below it (0 under 600px) |
| `--radius-sheet`, `--radius-control`, `--radius-tab` | 0 for paper, 3px for controls, 6px top corners for folder tabs |
| `--sheet-ratio`, `--plate-w` | 29:42 and the easel plate width (bounded by viewport width and height) |
| `--ease-out`, `--ease-follow`, `--ease-sweep`, `--ease-pop` | expo.out, power3.out, the HV2 sweep, the MI3 overshoot |
| `--dur-fast`, `--dur-mid`, `--dur-slow` | 0.2s, 0.35s, 1s |

## Motion

Ease family: expo.out for entrances and the wash, power3.out for carousel steps and indicators, power3.inOut for the line draw and Flip, power2.in for exits, none for nothing scrubbed (there are no scrubs). Technique ids refer to `research/motion-techniques.md`. Everything runs in one `gsap.matchMedia` with only `motion` and `reduce` conditions (pointer and width are handled in CSS, so a resize never rebuilds Lenis or kills a signature); Lenis runs from `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`), stops while the dialog is open, and is destroyed on cleanup. Under `reduce` there is no Lenis, no hidden state, and every plate is painted.

| Animation | Technique | Trigger | Timing | Reduced motion / touch |
|---|---|---|---|---|
| Easel deal: plates glide in from the right and land on Plate 1 | CD2 (`st.pos` from -3) | Load (stage top reaches 85% of the viewport, once), t=0.2 | 1.4s expo.out | Plate 1 centred and painted / same |
| Caption rises with Plate 1 | TR1 in half | Load, t=0.9 | 0.6s expo.out, stagger 0.07 | Shown at once / same |
| Plate inks itself, then the wash rises and settles (signature) | DrawSVG + MD1 bottom-edge variant | Load t=1.1; every step (0.3s after it starts); a sheet picked from the drawer (the plate already on the easel drains first, then repaints 0.4s later) | Layers 0.9s power3.inOut, 0.22s apart (stagger 0.15 inside a layer); lettering fades at 0.96s; wash level from 0.7s, 1.4s power2.inOut; wash scale 1.04 to 1, 1.0s expo.out from 0.7s; roundel colour fades in 0.5s once its line ends (1.71s). Deviation from the brief's 0.12s layer gap and 1.0s expo.out fill: at those values the paint covered the flowers and roundel before their ink and the four layers read as one scribble | Painted at once / same |
| Leaving plate drains back to graphite | Signature support | Step | 0.35s power2.in | Instant / same |
| Caption lines drop out and rise in | TR1 (SplitText lines with masks) | Every step | Out 0.25s power2.in, stagger 0.03; in 0.6s expo.out, stagger 0.07; killed on rapid input | Instant text change / same |
| Stepped carousel | CD2 (flat: scale 0.88, opacity 0.55 for neighbours) | Previous, Next, horizontal wheel, swipe or drag (Observer, tolerance 10, dragMinimum 6), arrow keys, Home, End on the focused stage; click on a neighbour | 0.8s power3.out, 600ms gesture lock | Instant / swipe, vertical scroll stays native |
| Paint lifts off the part under the pointer | Signature read backwards (hit areas per group; replaces CU4) | Mouse over stem, leaf, flower or detail of the centre plate | That part's wash to 0.15 and its pencil line, construction and measurement to 1, 0.3s expo.out in, 0.2s out | Instant / use the toggle |
| Show and hide underdrawing | Same lift on all four parts + MI2 label swap | Click | Four groups, 0.3s each, 0.08s stagger; label 0.35s expo.out | Instant / this is the touch path |
| Stage focus | Ring + hint colour | Focus-visible | Hint graphite to ink, 0.2s | Instant / none |
| Buttons (Previous, Next, Show underdrawing, Open plate, Ask for a price, Close plate) | HV2 rule under the label + MI1 | Hover draws a 2px ink rule from the left and it leaves to the right; focus-visible draws it plus the ring; press scales 0.96; disabled at 45% with no rule | Rule 0.35s expo.out; press 0.12s, release 0.4s power3.out | Instant rule, no scale / press |
| Masthead links Easel and Drawer | HV2 + NV6 | Hover and focus-visible sweep; click scrolls with Lenis and focuses the section; the current section keeps its underline (IntersectionObserver, rootMargin -40% 0 -55% 0) | Sweep 0.45s; scroll min(1.3s, 0.65s + distance/4000) expo-out | Static underline, immediate scroll / persistent underline on the current section |
| "Write to Amalia" (masthead and colophon) | HV11 sap-green ellipse | Hover and focus-visible | Draw 0.45s, undraw 0.2s | Shown drawn, no transition / drawn on focus or press |
| Herbario SGO link | HV2 (the underline gives way to a sweep) | Hover, focus-visible ring | 0.45s | Static / underlined |
| Drawer tab rail rule draws | SC16 | Scroll, `clamp(top 90%)`, once | 0.9s expo.out | Static / same |
| Drawer sheets open from the bottom edge | MD1 bottom-edge (the easel wash's direction and ease), ScrollTrigger.batch | Scroll, each sheet's art at `top 88%`, once | clip inset(100% 0 0 0) to 0, scale 1.04 to 1, 1.0s expo.out, stagger 0.08 | Shown / same |
| Folder-tab indicator slides | NV4 (clip-path, not width) | Click, follows keyboard focus inside the rail, returns on blur | 0.4s power3.out | Jumps / same |
| Tab hover | HV2 + colour | Hover; focus-visible ring | 0.45s sweep | Static / none |
| Drawer reflow | CD5 Flip | Filter change, with a polite live count ("4 plates from the forest") | 0.8s power3.inOut, stagger 0.015, absolute on leave; leaving sheets opacity 0 and scale 0.96 in 0.35s power2.in; entering sheets fade in 0.3s and their art opens with the same MD1 bottom-edge reveal after 0.25s | Instant / same |
| Sheet label rolls from habitat to "Show on the easel" | HV1 | Hover (fine pointer) and focus-visible | 0.45s expo.out | Instant / rolls while pressed |
| Sheet press | MI1 | Press | 0.97 in 0.12s, release 0.4s | No scale / same |
| Sheet puts its plate on the easel | Lenis `scrollTo` + CD2 + signature | Click | Scroll min(1.3s, 0.65s + distance/4000); then a 0.9s power3.out step whatever the distance, the signature, and focus on the stage | Immediate scroll, instant step / same |
| Skip to the drawer | Slide in + Lenis `scrollTo` | Focus; click | translateY 0.3s expo.out; then the scroll and focus on the drawer | Appears instantly, native jump / keyboard only |
| Plate dialog opens and closes | CD7 + MD1 centre variant | Open plate; Escape, Close, backdrop click, Close plate | Panel autoAlpha 0 and y 12 to rest, 0.45s expo.out; plate clip inset(22%) to 0 with every layer scale 1.08 to 1, 1.2s expo.out; backdrop fade 0.45s; close 0.3s power2.in; Lenis stopped while open | Instant / full-screen sheet under 600px |
| Close button | Icon rotation + MI1 | Hover and focus-visible rotate 90deg; press | 0.35s power3.out; press 0.94 | No rotation / press |
| Size cards | MI3 + HV2 on the dimensions | Choose (badge pops, tick draws, border to ink); hover darkens the border and underlines the size | Badge 0.25s overshoot; tick 0.3s; underline 0.45s | Instant / press |
| Name and email fields | Ink rule draws on focus (MI4 rule; labels stay above the field); errors open by `grid-template-rows` | Focus; submit (focus goes to the first invalid field) | Rule 0.35s expo.out; error 0.25s | Instant / same |
| Form result | CD9 crossfade in a fixed cell | Valid submit; "Ask about another size" | Out 0.15s, in 0.25s | Instant / same |
