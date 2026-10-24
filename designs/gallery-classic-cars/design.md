---
title: The cars roll
section: gallery
subject: Teme Valley Coachworks, a fictional six-person classic-car restorer in Bromfield near Ludlow, showing the register of twelve cars it has restored (hours logged, paint, a record for each) and taking enquiries from owners.
aesthetic: The body shop. High-build primer grey for the page, bare steel for the record, preview card and form, guide-coat black for text and red-oxide primer for state only. The only saturated colour on the page is each car's own factory paint.
mode: light
fonts:
  - Hubot Sans, variable, width 125, weights 500-600 (Google Fonts). The H2, car names, record titles, form and result headings. Sentence case, never below 1.1rem, tracking -0.01em to -0.02em
  - Hanken Grotesk, variable 400-600 (Google Fonts). Everything else, with tabular lining figures for jobs, years and hours
js: Builds the register, its in-row records and every car drawing (inline-SVG side elevations) from one CARS array; filters rows with a live count and one sliding indicator; opens one record at a time under its row; validates the enquiry and shows an in-page result. The motion layer adds one roll() helper that turns each car's wheels by exactly the distance it moves and leans the body with weight transfer, used for the load arrival, the scrubbed drive-off, the cursor preview card and the record arrival. Without the libraries everything works, without motion.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [gallery, media-index, cursor-preview, svg, drawing, cars, restoration, workshop, filter, accordion, form]
use_when:
  - An index of physical things that can be drawn in side elevation from a few templates (cars, bikes, boats, trains, aircraft, machines), where each item has a colour, a few numbers and a short record.
  - The reader is choosing whether to trust a maker or restorer, so the register needs real numbers (hours, years, job numbers) and a record behind every row.
  - Between 6 and 20 items. The list is the navigation; filters cover three to five honest categories.
avoid_when:
  - The items are photographs that do not share a side view or a common scale. The rolling only works when every image is the same object seen the same way.
  - More than about 25 items, or items with no meaningful numbers. A grid of images serves that better.
  - A page that already has a cursor follower or a scroll-scrubbed hero nearby.
---

## Why it works

**The one bold idea: the cars roll.** Every car is drawn as a side elevation in its own factory paint. Whenever a drawing moves sideways, its wheels turn by exactly the distance travelled (degrees = dx / (2π r) × 360, with r the wheel radius as rendered), and the body leans up to 3 degrees with weight transfer: back when it speeds up, forward when it brakes. One `roll()` helper does four jobs. On load, the just-delivered E-Type rolls in from behind the stage's left edge and settles on its springs. On scroll, it drives off to the right, scrubbed. On fine pointers, a preview card with the hovered car follows the pointer over the index, and moving sideways rolls the car under your hand. When a record opens, its car rolls into the plate. Everything else on the page stays quiet (dimming, rules, underlines), so the rolling car is the only thing people remember.

- **Body-shop materials, not a palette.** The page is high-build primer (`--primer`), the panels are bare steel (`--metal`), text is guide coat (`--guidecoat`), and red-oxide primer (`--oxide`) is used only for state: the active filter bar, focus rings, primary buttons and the focused field rule. A car in the workshop sits in exactly these colours before its paint goes on, so the factory paints in the drawings and chips are the only saturated colour on the page.
- **All twelve drawings share one scale** (62 units a metre in a 400 × 150 viewBox, tyres on the floor line at y = 128), so a Mini is visibly smaller than a Mk 2 and a Land Rover is visibly taller. Ten shape templates cover twelve cars; each drawing is paint, an optional two-tone roof or lower body, a sheen, glass, shut lines, chrome brightwork, a lamp, dark wheel wells and separate wheel groups. Each wheel style (wire, steel, Fuchs, disc) carries an asymmetric mark (a knock-off, a crest, a lettered sidewall arc) so the turn is legible at any speed.
- **The register is a table you can act on.** Job, year, car, colour, hours and status are real columns: tabular hours are right-aligned, and status is bold only for the two cars still on the ramps. Rows are 72px tall and car names are set in a wide grotesque, so the list reads like stamped plates rather than a dense broadsheet.
- **Records open where you are.** Each row is a button with `aria-expanded` that opens its record directly beneath it (when it arrived, what was done, paint, hours, delivery). Only one is open at a time; opening another closes the first instantly and keeps the clicked row still on screen. The list is the navigation, so there is no previous/next.
- **The paint chip slides out of the book.** At rest each colour is a narrow tab; on hover, focus or an open record it slides out to a full chip and pushes its label along.
- **Copy is the owner's.** Every record says what state the car arrived in and what the workshop did in plain sentences, and the enquiry promises a reply "within three working days with a time to come and see it". The confirmation names Mark, the email given, a date three working days on and the car described.

Reasoned departures from the brief and the defaults:

- **Not default 1.** The ground is cool primer grey (#C8CBC6), not cream; the display face is a wide grotesque, not a serif; the accent is red-oxide primer (#86401C), not terracotta. It sits 13.9 Delta-E from features-ebike's lane red #8E3229 and 21 from #D97757.
- **Fonts.** The art direction named Krona One and Red Hat Text as unused. By build time Krona One was pricing-ski-pass's heading face and Red Hat Text was in hero-doc-festival and nav-concert-hall, so this design uses Hubot Sans at width 125 (squared, extended forms close to Eurostile Extended on 1960s dashboards and rally plates) and Hanken Grotesk (a plain workshop-manual voice). Hanken's tabular figures were measured: '1111' and '0000' render at the same width.
- **The toolbar is sticky from 1024px, not 768px.** Between 768 and 1023 the filters wrap to two lines and a sticky bar would take about a fifth of the screen (the same reasoning as for phones).
- **No floor reflection.** The planned mirrored reflection was removed in the final pass: at thumbnail size it read as a grey smudge, and the floor line already grounds every car.
- **The record is in-row, not a dialog,** and the filter is an instant toggle, not a Flip reflow. Both keep the page to one layout and leave the rolling car as the only bold motion.

## Do not touch

- The roll formula and its inputs. `roll()` reads the wheel radius from the SVG (`data-r`) scaled by the cached rendered width (`c.k`, updated by a ResizeObserver), never a per-frame measurement. Wheels follow the **summed** x of every wrapper that moves a car (`follow()`), so the load tween and the scrub never fight, and each tween syncs `c.last` to its start position before playing. If you skip that, the first frame counts the jump to the start as travel.
- One floor line at 85.333% of every stage (y = 128 of 150). Tyres stand on it in every template.
- The stage's `clip-path: inset(-30% -300vw -30% 0)`. The left edge is the workshop door that cars roll in from; the right side stays open so the E-Type can drive off the viewport. The intro and the section both use `overflow-x: clip`. With these in place there was no horizontal scroll at 360, 390, 768, 1024, 1280 or 1600px at any point in the drive-off.
- Hidden starting states only under `html.js`, and `js` is added only when GSAP, ScrollTrigger and Lenis all loaded. Row text is never hidden: only the rules and the chip clip draw in.
- The native cursor. The preview card is an extra label, shown only for fine pointers at 768px and up with motion allowed, and it hides over an open record, on window leave and on blur. Touch, narrow screens, reduced motion and a blocked CDN all get the inline 96px thumbnails instead (`html:not(.cu2)`), so nothing is hover-only.
- One saturated colour source: the CARS paints. Oxide is state, never decoration; `--rule` is never text.
- Radius by hierarchy: chips 3px, preview card 10px, record and form panels 14px, buttons and the filter indicator as pills.

## Motion

GSAP 3.15 (ScrollTrigger) on Lenis 1.3.26 (`autoRaf: false`, driven by `gsap.ticker`, `lagSmoothing(0)`, `anchors: true`), all inside `gsap.matchMedia` with `motion`, `reduce`, `fine: (hover: hover) and (pointer: fine)` and `wide: (min-width: 768px)`. Handlers that create tweens later are wrapped with `ctx.add(null, fn)` so they revert with the context. Reduced motion: no Lenis, cars parked, rules and chips drawn, thumbnails inline, every transition instant.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| E-Type rolls in from behind the stage edge, wheels turning, body leaning back then forward | Signature (roll) | Load | 0.25s, x from -85% of the stage, 1.4s power3.out | Parked |
| E-Type settles on its springs | Signature | End of the roll-in | y 0 to 1.5 in 0.1s, back to 0 in 0.45s back.out(3) | None |
| Lede fades in | Opacity only | Load | 0.1s, 0.6s power2.out | Visible |
| Caption and "Read its record" rise | LD8 | Load | 0.55s, y 6 to 0, opacity .4 to 1, 0.4s expo.out, stagger 0.08 | Static |
| Filter buttons rise; oxide indicator draws from the left | LD8 + NV4 | Load, after fonts | 0.7s, y 4, opacity .5 to 1, 0.3s, stagger 0.05; indicator scaleX 0 to 1, 0.5s expo.out | Static |
| Row rules draw, then paint chips wipe in | SC16 | `ScrollTrigger.batch`, top 95%, once; first rows wait until 0.85s | Rule scaleX 0.9s expo.out, stagger 0.05; chip clip-path 0.5s expo.out, 0.15s after its rule | Drawn |
| E-Type drives off to the right | Signature, scrubbed; lean from scroll speed | Scroll from the top until the stage's bottom reaches the viewport top | `scrub: true`, `ease: 'none'`, x to the viewport edge + 10%, `invalidateOnRefresh` | Parked |
| Toolbar background when stuck | CSS + IntersectionObserver sentinel | 1024px and up | Opacity 0.2s | Instant |
| Preview card follows the pointer; the car rolls with the card's real movement | CU2 + signature | Pointer over the index (fine pointer, 768px+) | quickTo x/y 0.6s power3, 24px right of the pointer (flips left near the edge); show scale .6 to 1, 0.35s expo.out; hide 0.25s power2.in | Thumbnails inline |
| Car swaps vertically in the direction of travel | CU2 | Pointer onto another row (also re-checked on scroll) | Old car out yPercent ∓100, new in from ±100, 0.5s power2.inOut; none on first enter | None |
| Other rows dim | HV7 | Hover; mirrored for `:focus-visible` | Opacity .45, 0.35s | Instant |
| Paint chip slides out of the book | Bespoke | Hover, focus, open record | Chip scaleX .4 to 1, label 24px, 0.35s `--ease-out` | Instant |
| Record opens under its row | CD6 | Click or Enter on a row; Escape or "Close record" closes | grid-template-rows 0fr to 1fr, 0.5s (close 0.35s); then `lenis.resize()` and `ScrollTrigger.refresh()` | Instant |
| Record car rolls into its plate and settles | Signature | Record opens | 0.2s, x from -40%, 1s power3.out, then the spring | Parked |
| Filters | NV4, instant `[hidden]` toggle | Click | Indicator x and scaleX, 0.5s power3.inOut; aria-live "Showing 6 of 12 cars" | Indicator jumps |
| Filter, text-button and link underlines | HV2 | Hover, focus-visible | 0.4s cubic-bezier(.35,0,0,1), in from the left, out to the right; persistent on touch | Static |
| Primary buttons | Fill + MI1 | Hover, focus, press | Oxide outline to solid oxide, 0.2s; press scale .97 in 0.12s, release 0.4s | Colour only |
| Rows, filters, text buttons | MI1 | Press | .985 (rows) or .97, 0.12s; release 0.4s | None |
| "Read its record" | NV6 + CD6 | Click | Glide to row 0141 below the toolbar, min(1.3, 0.65 + distance / 4000) s, then open it and focus its row | Immediate |
| "Ask about a car like this" | NV6 | Click | Same glide to the form; notes prefilled with the job; focus moves to the first empty field | Immediate |
| Form fields | MI4 | Hover, focus, invalid submit | Rule to `--flat` 0.2s; oxide rule scaleX 0.35s; label to oxide 0.2s; error rows 0fr to 1fr 0.25s; focus to the first invalid field; never shakes | Instant |
| Form to result and back | CD9 | Valid submit, "Edit what I sent" | Out 0.15s y -4; in 0.25s y 4 to 0 power2.out; focus to the result heading, then back to the name field | Instant |

## Adapting

- **Brand.** Change the body-shop tokens first. Keep one neutral ground, one lighter panel, one ink, one secondary grey at 4.5:1 or better on both grounds, and one state colour that passes AA as text on both, with the panel colour as its label colour. Keep the subject's own colours in the data, not on `:root`.
- **Items.** Edit `CARS`: `job`, `year`, `make`, `model`, `work` (filter key), `status` and `state` (row status), `hours`, `paint {name, hex}`, optional `roof` or `lower` second tone, `shape`, `wheels`, `arrived`, `done` (3 or 4 sentences), `paintNote`, `delivered`. Update the filter buttons and their counts to match. Use paint names, not invented factory codes.
- **Drawings.** Add a template to `SHAPES` in the same 400 × 150 box: `top` runs from the rear bottom over the roof to the front bottom at `sill`; `wheels` lists `[hub x, tyre radius, optional arch drop]`; `glass`, `lines`, `chrome` and `lamp` are paths; `roofY`/`lowY` set two-tone splits; `dark` and `ash` are optional extras. Keep one scale for every template.
- **Photographs.** Set `img` to a URL cropped to a fixed 8:3 side view. The drawing is used only when `img` is empty, and `roll()` then moves and leans the whole image (there are no wheels to turn).
- **Retiming.** Load roll-in: the `gsap.to(arrive, …)` in the motion layer (start offset `.85`, 1.4s). Drive-off length: the ScrollTrigger `end` (`'bottom top'` of the stage). Record roll-in: `recordIn` (offset `.4`, 1s). Lean strength: the `a * 18` gain in `roll()` and the ±3 degree clamp. Preview follow: the two `quickTo` durations. CSS durations and eases live in `--dur-*` and `--ease-*`.
- **Removing effects.** Without the cursor preview, delete the `if (fine && wide)` block: `cu2` is never set and every row keeps its thumbnail. Without the drive-off, delete the `gsap.to(drive, …)` block. Without the row draw-in, delete the batch and the two `html.js .rule` / `.chip` rules. The signature itself is `roll()` plus `follow()`; keep both or replace the drawings with a static gallery.
- **Copy.** Car names wrap to two lines in the row at 1280 and three on phones; rows grow, and nothing is truncated. Keep status short ("On the ramps: in paint").

| Token | Role |
|---|---|
| `--primer` | High-build primer grey: the page (guide coat on it 10.1:1) |
| `--metal` | Bare steel: record, preview card, form panel, stuck toolbar |
| `--guidecoat` | All text, tyres and dark wheel wells |
| `--flat` | Secondary text: job numbers, column labels, delivered status, hints (5.2:1 on primer, 7.2:1 on metal) |
| `--oxide` | State only: active filter bar, focus rings, primary buttons, focused or invalid field rule, focused label (4.6:1 on primer, 6.2:1 on metal; metal label on it 6.2:1) |
| `--rule` | The one rule grey: row separators, floor lines, field rules (never text) |
| `--art-*` | Drawing materials: chrome, chrome edge, spokes, sidewall lettering, glass, shut lines, lamps, steel rims, Fuchs centres, ash frame |
| `--font-display`, `--wide` | Hubot Sans at width 125 |
| `--font-text` | Hanken Grotesk |
| `--step--1` … `--step-3` | Type scale on a 1.25 ratio from 17px; the H2 is fluid from 2rem to 3.6rem |
| `--space-1` … `--space-10`, `--gutter`, `--max` | 4px spacing scale; gutter 16 to 56px; 1280px content |
| `--r-chip`, `--r-plate`, `--r-panel`, `--r-pill` | 3px chips, 10px preview card, 14px panels, pill buttons |
| `--ease-out`, `--ease-inout`, `--ease-sweep`, `--ease-release` | Entrances, two-way moves, underline sweeps, press release |
| `--dur-fast`, `--dur`, `--dur-open`, `--dur-slow` | 0.2s, 0.35s, 0.5s, 0.6s |
