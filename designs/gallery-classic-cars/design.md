---
title: The cars roll
section: gallery
subject: Teme Valley Coachworks, a fictional six-person classic-car restorer in Bromfield near Ludlow, showing twelve cars it has restored (hours logged, paint, a record for each) and taking enquiries from owners.
aesthetic: The paint booth. A neutral N7.5 grey ground, like the surround body shops use to judge colour under daylight lamps, with near-black ink and the blue of fine-line masking tape for state. The only saturated colour on the page is each car's own factory paint.
mode: light
fonts:
  - Lexend Exa 500 (Google Fonts), the wide cut of Lexend, with real lowercase. Used only for the H2, car names and the record title, in sentence case, never below 1.1rem, tracking -0.02em on the H2 and -0.01em on names
  - Gelasio, variable 400-700 with italic (Google Fonts). The owner's-handbook voice for everything else; jobs, years, hours and counts use tabular lining figures
js: Builds the index, its records and every car drawing (inline-SVG side elevations) from one CARS array; filters with a live count; switches between a list and a grid of drawings; opens each record in a dialog with previous and next; validates the enquiry and shows an in-page result. The motion layer adds one roll() helper that turns each car's wheels by exactly the distance it moves and leans the body with weight transfer, used for the load arrival, the scrubbed drive-off, the cursor preview card, the drawing plates and the record. Without the libraries, everything works without motion.
libraries: [GSAP 3.15 (ScrollTrigger, Flip), Lenis 1.3.26]
tags: [gallery, detailed, media-index, cursor-preview, svg, generated-art, cars, restoration, workshop, filter, flip, dialog, form, gsap, lenis]
use_when:
  - An index of physical things that can be drawn in side elevation from a few templates (cars, bikes, boats, trains, aircraft, machines), where each item has a colour, a few numbers and a short record.
  - The reader is deciding whether to trust a maker or restorer, so the index needs real numbers (hours, years, job numbers) and a record behind every row.
  - Between 6 and 20 items. Three to five honest filter categories and a list/drawings switch cover browsing; there is no search.
avoid_when:
  - The items are photographs that do not share a side view or a common scale. The rolling only works when every image shows the same kind of object from the same angle.
  - More than about 25 items, or items with no meaningful numbers. A plain image grid serves that better.
  - A page that already has a cursor follower or a scroll-scrubbed hero nearby.
---

## Why it works

**The one bold idea: the cars roll.** Every car is drawn as a side elevation in its own factory paint. Whenever a drawing moves sideways, its wheels turn by exactly the distance travelled (degrees = dx / (2π r) × 360, where r is the wheel radius as rendered), and the body leans up to 3 degrees with weight transfer: back when it speeds up, forward when it brakes. One `roll()` helper does four jobs. On load, the just-delivered E-Type, in Opalescent Golden Sand (a paint no other car in the register uses), rolls in from off-screen left and settles on its springs. It owns the first screen: the H2 and caption share the top row, and the car stands below them across the grid, up to 880px wide, on a floor line that runs on to the right edge of the screen. On scroll, it drives off along that line, scrubbed while it is in view. On fine pointers, a preview card with the hovered car follows the pointer over the index, and moving sideways rolls the car under your hand. When a record opens, its car rolls into the plate, and previous and next roll one car out and the next one in. Everything else is quiet (dimming, rules, underlines), so the rolling car is what people remember.

- **The paint booth, not a palette.** Body shops judge paint against a neutral N7-N8 grey surround, which is why the page ground (`--booth`, #BDBEBB) is a mid-grey with no warmth or tint: every car's paint reads true against it, from Diamond White to British Racing Green. Panels step lighter (`--panel`, `--plate`) the way a lit booth wall does. State uses one colour, the blue of fine-line masking tape (`--tape`): the active filter bar, focus rings, primary buttons and the focused field rule. It appears nowhere as decoration.
- **All twelve drawings share one scale** (about 62 units a metre in a 400 × 150 viewBox, tyres on the floor line at y = 128), so a Mini is visibly smaller than a Mk 2 and a Land Rover is visibly taller. Ten shape templates cover twelve cars. Each drawing has paint, an optional two-tone roof or lower body, a sheen, glass, shut lines, chrome brightwork, a lamp, dark wheel wells and separate wheel groups. Each wheel style (wire, steel, Fuchs, disc) carries an asymmetric mark (a knock-off, a crest, a lettered sidewall arc), so the turn reads at any speed.
- **The index is a table you can act on.** Job, year, car, colour, hours and status are real columns. Hours are tabular and right-aligned, and status is bold only for the two cars still on the ramps. Rows are 72px tall, each starts with a 96px drawing of its car (on every device, so nobody has to hover to see a car), and car names are set in a wide face, so the list reads like rally plates rather than a dense broadsheet. From 1200px the Car, Colour and Status columns share the width 4.8 : 2.4 : 2.8 so the longest name, paint and status each sit on one line at 1440px. The list name of the E-Type is shortened to 'E-Type Series 1 3.8 coupé' (`short`); the record keeps 'fixed-head coupé'.
- **Two views of the same items.** List and Drawings are one `<ol>` re-laid out with Flip. The drawings view puts each car on a lighter plate with its year, name, colour and hours.
- **Every row has a record.** It says what state the car arrived in, what the workshop did, the paint, the hours and where it went, in plain sentences. "Ask about a car like this" carries that job into the enquiry form.
- **Copy is the owner's.** The enquiry promises a reply "within three working days with a time to come and see it". The confirmation names Mark, the email given, a date three working days on and the car described.

Review notes (the plan checked against "Defaults we avoid" and the catalogue anti-patterns):

- **R1, ground (default 1, default 2).** The first idea was a dark cabin (tobacco hide and headlining cream). It read as the same warm 70s analogue brown as contact-recording-studio, so the page moved to the paint booth: light mode on neutral grey, near-black ink (#1C1D1F, a chosen ink, not #111), and a cool masking-tape blue for state. That avoids both cream-and-terracotta and near-black-with-one-accent.
- **R2 (default 5).** Sentence case everywhere. The display face is never text-transformed. Column labels are plain Gelasio at `--step--1`.
- **R3 (default 5).** No middle dots. On phones, job and year are separate grid cells.
- **R4 (default 5).** No monospace for job numbers. Gelasio's tabular lining figures were measured at build: '1111' and '0000' both render 102px wide at 40px with `tabular-nums lining-nums` (68.8px and 98.2px without). There are no invented chassis numbers or factory paint codes, only colour names.
- **R5 (default 6).** No big total-hours count-up. Hours appear only per car.
- **R6 (default 3).** Rows are 72px tall, names are in a wide face, and radius varies by hierarchy (chip 3px, plate 10px, dialog and panels 14px, pill buttons). The plain rules stay because they are real row separators.
- **R7 (default 4 and default 8).** No fade-and-slide-up on rows, and no rule draw-in: rows, rules and chips are static from first paint. Card hover is a short roll, not a lift, with no shadows.
- **R8 (spend boldness once).** The pointer-driven paint sheen on cards was cut; cards reuse the roll.
- **R9 (anti-patterns 5, 13).** The native cursor is never hidden. The preview repeats row content only, so nothing is hover-only: every row keeps its inline 96px thumbnail. With the preview on, the hovered row's thumbnail fades out over 0.2s (its car has gone into the card) and comes back on leave. Keyboard users get the record, which shows the full drawing.
- **R10 (anti-patterns 1, 4, 8).** No pin and no wheel capture. The drive-off is a plain scrub. Only transform, opacity and clip-path animate; the chip widens with scaleX. The wheel radius is cached and refreshed by a ResizeObserver, never measured per frame. There is one clock (the GSAP ticker), and Lenis stops while the record is open.
- **R11 (anti-pattern 2).** One hidden starting state: the intro car (`data-rv`), only under `html.js`. The `js` class is added only when GSAP, ScrollTrigger, Flip and Lenis all loaded, so a blocked CDN shows the car parked and every control working.
- **R12 (anti-pattern 7).** No preloader. The only load move is the car's arrival from off-screen left (a 1.6s roll after 0.25s, then a 0.55s spring) over ready content.
- **R13 (mobile and tablet).** The toolbar is sticky only from 1200px, where it fits on one 71px line. Narrower, it wraps to two or three lines (126 to 195px) and would cover 13-20% of the screen. It never becomes a horizontal scroller.
- **R14 (no dead ends).** Every row and plate opens a real record; previous and next wrap round; "Ask about a car like this" scrolls to `#enquire` and prefills the notes; the result has "Edit what I sent". No `href="#"`, no external images.

Departures from the plan, made at build:

- **Krona One became Lexend Exa.** The art director named Krona One as unused, but by build time it was pricing-ski-pass's heading face. Lexend Exa (unused in the collection) has the same squared, extended forms of 1960s dashboard and rally-plate lettering, with real lowercase. Because it is so wide, the H2 runs from 1.9rem to 3.3rem rather than 2rem to 4.1rem.
- **The H2 is static** and the load has one move, as the art director asked: no SplitText, no LD8 on the toolbar and caption, and no SC16 rule draw-in on rows.
- **Tablet rows (768-1199px)** put the status under the car name, so names keep room to read (at 768px a six-column row squeezed names to 82px).
- **The view switch moves only the plates.** The Flip runs 0.55s with power3.out on the list items only; each car keeps its stage's 8:3 box inside its plate, so it never squashes onto the text. Plate fills fade in at 0.2s, once the boxes are near their shape (so they never show as stretched bars), the cars start rolling into their plates at 0.2s while the plates are still settling, and the text crossfades back in at 0.3s. The art director asked for the roll at 0.3s; at 0.2s with power3.out the plates are already close to their shape, and the gap with no car on screen is shorter.
- **Second review pass.** The E-Type was repainted from Opalescent Gunmetal (a grey car on a grey ground) to Opalescent Golden Sand. The hero stage moved from a half-width column to the full grid, so the car rolls in from off-screen rather than through an invisible clip edge in mid-page. The drive-off is triggered by the stage itself (`clamp(top 60%)` to `bottom 10%`, `scrub: .6`): the issue's plain `top 60%` would already have been part-way through at scroll 0, because the stage starts above 60% of the viewport. The preview card sits 12px above the hovered row (below it in the top third of the viewport) instead of over it. The "Showing n of 12 cars" line is visually hidden and kept only as the aria-live announcement. Phones get a second "Close record" at the top of the record sheet. The section is wrapped in `<main>` so the standalone preview has a main landmark; when embedding, drop the `<main>` if the host page has one.
- **The filter Flip holds the list's new height** while rows are absolute and glides the form below with a transform, so the form never slides under leaving rows.
- **Removed accessory: the floor reflection.** The 12% mirrored reflection under each car was cut in the final pass. On the grey ground it read as a smudge with a hard lower edge, and the floor line already grounds every car.

## Do not touch

- The roll formula and its inputs. `roll()` reads the wheel radius from the SVG (`data-r`) scaled by the cached rendered width (`c.k`, updated by a ResizeObserver), never a per-frame measurement. Wheels follow the **summed** x of every wrapper that moves a car (`follow()`), so the load tween and the scrub never fight. Each tween calls `sync()` before playing, so the jump to its start position is not counted as travel.
- One floor line at 85.333% of every stage (y = 128 of 150). Tyres stand on it in every template.
- The stage clip. Plates, the preview and the record clip at the stage's left edge (`clip-path: inset(-30% 0 -30% 0)`), so their cars roll in from the plate's edge. The intro stage has no clip (`clip-path: none`): its car rolls in from beyond the viewport and drives off past it, and the section and the intro both use `overflow-x: clip`, so the viewport edge is the only edge.
- The native cursor. The preview card is an extra label, shown only for fine pointers at 768px and up with motion allowed, placed above or below the hovered row so the row stays readable, and it hides when the pointer leaves the list or the window, on blur, in the drawings view and while the record is open. Everyone else gets inline thumbnails (`html:not(.cu2)`).
- One source of saturated colour: the CARS paints. `--tape` is for state only, and `--rule` is never text.
- `--ink-2` at 4.5:1 or better on every ground: it carries job numbers, labels, hints and delivered status.
- Radius by hierarchy: chips 3px, plates and the preview card 10px, record and form panels 14px, buttons and the filter indicator as pills.
- Record semantics: native `<dialog>` with `showModal()`, `aria-labelledby` on the title, focus on the title when it opens and back to the opener when it closes, and an `aria-live` line for previous and next.

## Motion

GSAP 3.15 (ScrollTrigger, Flip) on Lenis 1.3.26 (`autoRaf: false`, driven by `gsap.ticker`, `lagSmoothing(0)`, `anchors: true`), all inside `gsap.matchMedia` with `motion`, `reduce`, `fine: (hover: hover) and (pointer: fine)` and `wide: (min-width: 768px)`. Handlers that create tweens later are wrapped with `ctx.add(null, fn)` so they revert with the context. The cleanup removes the ticker, destroys Lenis, removes listeners and disconnects the ResizeObserver. Reduced motion: no Lenis, native scroll, cars parked, thumbnails inline, no Flip, every CSS transition instant, and the record opens and closes instantly (nothing animates).

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| E-Type rolls in from off-screen left, wheels turning, body leaning back then forward | Signature (roll) | Load | 0.25s delay, x from just past the viewport's left edge (front bumper at x = 0), 1.6s power3.out | Parked |
| E-Type settles on its springs | Signature | End of the roll-in | y to 1.5px in 0.1s power2.out, back in 0.45s back.out(3) | None |
| E-Type drives off to the right along its floor line; lean from scroll speed | Signature, scrubbed | Stage `clamp(top 60%)` to `bottom 10%` | `scrub: .6`, `ease: 'none'`, x to the viewport edge + 10%, `invalidateOnRefresh` | Parked |
| Toolbar background when stuck | CSS + IntersectionObserver sentinel | 1200px and up | Opacity 0.2s | Instant |
| Preview card follows the pointer; the car rolls with the card's real movement | CU2 + signature | Pointer over the list (fine pointer, 768px+) | quickTo x/y 0.6s power3; x 24px right of the pointer (flips left near the edge); y 12px above the hovered row, or below it in the top third of the viewport; the row's own thumbnail fades out 0.2s; show scale .6 to 1, 0.35s expo.out; hide 0.25s power2.in | Thumbnails inline |
| Car swaps vertically in the direction of travel | CU2 | Pointer onto another row (re-checked on scroll) | Old car to yPercent ∓100, new from ±100, 0.5s power2.inOut; none on first enter | None |
| Other rows and plates dim | HV7 | Hover; mirrored for `:focus-visible` | Opacity .45, 0.35s | Instant |
| Paint chip slides out of the book | Bespoke | Hover, focus-visible | scaleX from 14px to 44px, label 30px, 0.35s `--ease-out` | Instant |
| Filters: rows reflow, leavers fade, the form glides | CD5 | Click | Flip 0.7s power3.inOut, stagger 0.015, absolute; enter fade 0.4s after 0.2s; leave fade 0.25s; a new click sends the running Flip to `progress(1)`; then `lenis.resize()` and `ScrollTrigger.refresh()`; visually hidden aria-live "Showing 6 of 12 cars" | Instant |
| Active indicator moves to the pressed button | NV4 | Filter or view click | Flip 0.5s power3.inOut | Jumps |
| List to drawings and back | CD5 | View click | Flip 0.55s power3.out on the items, stagger 0.02; plate fills in 0.2s at 0.2s; text crossfades in 0.25s at 0.3s | Instant |
| Cars roll into their plates | Signature | 0.2s into the switch to drawings, while the plates settle | x from -30%, 0.8s power3.out, stagger 0.04, then the spring | Parked |
| Plate hover or focus: the car rolls forward | Signature (HV, no lift) | Pointer or `:focus-visible` on a plate | 14px, 0.5s power2.out; back 0.4s power2.inOut | Static |
| Record opens | CD7 | Row, plate or "Read its record" | Panel autoAlpha 0, y 12, scale .98 to 1, 0.45s expo.out (under 600px a sheet rises from yPercent 100, with "Close record" at the top and the bottom); backdrop blur 4px; Lenis stops | Instant |
| Record car rolls in and settles | Signature | Record opens | 0.15s delay, x from -40%, 1s power3.out, then the spring | Parked |
| Previous and next | Signature + TR1 | Buttons, ArrowLeft, ArrowRight | Old car rolls off in the direction of travel, 0.35s power2.in; new rolls in from the other side, 0.6s power3.out after 0.15s; title and job leave yPercent 100, 0.25s power2.in, stagger 0.03, return 0.6s expo.out, stagger 0.07; the facts swap in place with one opacity dip (out 0.1s, in 0.2s, no y, no stagger); running timelines are killed on rapid input | Instant swap |
| Record closes | CD7 | "Close record", Escape, backdrop | autoAlpha 0 and y 8, 0.3s power2.in (sheet slides down); focus back to the opener | Instant |
| "Ask about a car like this" | NV6 | Click | Closes the record, glides to `#enquire` in min(1.3, 0.65 + distance / 4000) s, prefills the notes, focuses the first empty field | Immediate |
| Underlines on filters, text buttons and links | HV2 | Hover, focus-visible | 0.4s cubic-bezier(.35,0,0,1), in from the left, out to the right; persistent on touch | Static |
| Primary buttons | HV4 + MI1 | Hover, focus, press | Tape fill sweeps from the side the pointer entered, 0.45s in, 0.3s out; label to `--plate`; press .97 in 0.12s, release 0.4s | Colour only |
| Rows, plates, filters, text buttons | MI1 | Press | .985 (rows and plates) or .97, 0.12s; release 0.4s | None |
| Form fields | MI4 | Hover, focus, invalid submit | Rule to `--ink` 0.2s; tape rule scaleX 0.35s; label to tape 0.2s; error rows 0fr to 1fr 0.25s; focus to the first invalid field; never shakes | Instant |
| Form to result and back | CD9 | Valid submit, "Edit what I sent" | Out 0.15s y -4; in 0.25s y 4 to 0 power2.out; focus to the result heading, then back to the name field | Instant |

## Adapting

- **Brand.** Change the booth tokens first. Keep one neutral ground, a lighter panel and plate, one ink, one secondary grey at 4.5:1 or better on all three grounds, and one state colour at 3:1 or better on the ground (it is drawn as bars, outlines and focus rings) and 4.5:1 on the panel (it colours focused labels), with `--plate` as the label colour on its fill. Keep the subject's own colours in the data, not on `:root`.
- **Items.** Edit `CARS`: `job`, `year`, `make`, `model`, optional `short` (a shorter model name for the list row), `work` (filter key), `status` and `state` (row status), `hours`, `paint {name, hex}`, optional `roof` or `lower` second tone, `shape`, `wheels`, `arrived`, `done` (3 or 4 sentences), `paintNote`, `delivered`. Update the filter buttons and their counts to match. Use paint names, not invented factory codes.
- **Drawings.** Add a template to `SHAPES` in the same 400 × 150 box: `top` runs from the rear bottom over the roof to the front bottom at `sill`; `wheels` lists `[hub x, tyre radius, optional arch drop]`; `glass`, `lines`, `chrome` and `lamp` are paths; `roofY`/`lowY` set two-tone splits; `dark`, `ash` and `rimRoof` are optional extras. Keep one scale for every template.
- **Photographs.** Set `img` to an image URL cropped to a fixed 8:3 side view. The drawing is used only when `img` is empty, and `roll()` then moves and leans the whole image (there are no wheels to turn).
- **Retiming.** Load roll-in: the `rollIn(arrive, [drive], …, { duration: 1.6, delay: .25 })` call (its start is computed so the car begins off-screen). Drive-off length: the ScrollTrigger `end`. Record roll-in: the `rollIn` in `dialogIn` (start `-.4`, 1s). Plates: `rollPlates` (start `-.3`, 0.8s, stagger 0.04), called 0.2s into the view Flip (`mid`). Spring: `settle()`. Lean strength: the `a * 18` gain in `roll()` and the ±3 degree clamp. Preview follow: the two `quickTo` durations. Flip timings: the `duration` and `stagger` passed to `reflow()`. CSS durations and eases live in `--dur-*` and `--ease-*`.
- **Removing effects.** Without the cursor preview, delete the `if (fine && wide)` block: `cu2` is never set, and every row keeps its thumbnail. Without the drive-off, delete the `gsap.to(drive, …)` block. Without the drawings view, delete the View group and its handler; the list still works. The signature itself is `roll()` plus `follow()` and `sync()`; keep all three or replace the drawings with a static gallery.
- **Copy.** Long car names wrap to two lines in the row at 1280px and three on phones; rows grow and nothing is truncated. Keep status short ("On the ramps: in paint").

| Token | Role |
|---|---|
| `--booth` | N7.5 paint-booth grey: the page (ink on it 9.0:1) |
| `--panel` | Lighter booth wall: stuck toolbar, record, form (ink 11.3:1) |
| `--plate` | Drawing plates, preview card, record plate; also the label colour on a tape fill (6.1:1) |
| `--ink` | All text, tyres, dark wheel wells |
| `--ink-2` | Secondary text and field rules: jobs, labels, hints, delivered status (5.0:1 on booth, 6.3:1 on panel, 7.5:1 on plate) |
| `--tape` | State only: active indicator, focus rings, primary buttons, focused field rule and label (4.1:1 on booth as non-text, 5.1:1 on panel) |
| `--rule` | Row separators and floor lines, never text |
| `--scrim` | Record backdrop, with a 4px blur |
| `--art-*` | Drawing materials: chrome, chrome edge, spokes, sidewall lettering, glass, shut lines, lamp, steel rims, Fuchs centres, ash frame |
| `--font-display` | Lexend Exa 500 |
| `--font-text` | Gelasio |
| `--step--1` … `--step-3` | Type scale on a 1.25 ratio from 17px; the H2 is fluid from 1.9rem to 3.3rem |
| `--space-1` … `--space-10`, `--gutter`, `--max` | 4px spacing scale; gutter 16 to 56px; 1280px content |
| `--r-chip`, `--r-plate`, `--r-dialog`, `--r-pill` | 3px chips, 10px plates and preview card, 14px record and form panels, pill buttons |
| `--ease-out`, `--ease-inout`, `--ease-sweep`, `--ease-release` | Entrances, two-way moves, underline sweeps, press release |
| `--dur-press`, `--dur-fast`, `--dur`, `--dur-sweep`, `--dur-fill`, `--dur-slow` | 0.12s, 0.2s, 0.35s, 0.4s, 0.45s, 0.6s |
