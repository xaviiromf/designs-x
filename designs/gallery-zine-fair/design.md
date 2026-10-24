---
title: The covers on the tables this year
section: gallery
subject: The exhibitors' cover gallery for the Saddle Stitch Zine Fair 2026, a fictional zine fair at the Old Wash House, Partick, Glasgow, where 24 of the 64 tables sent in their covers.
aesthetic: A Riso print run. Two-ink covers on whiter cover stock, laid out at their real relative sizes on a pink copier-bond ground, with the second ink plate printed slightly off register until you point at it.
mode: light
fonts:
  - Darker Grotesque 500, 600, 650, 700, 750, 800, 900 (Google Fonts, variable wght 300-900)
js: Draws each cover as two-ink Riso art from the COVERS array at the top of the script, fills the topic filter counts, filters the grid, and runs a native dialog lightbox with Previous and Next buttons and arrow, Home and End keys within the current filter. Nothing navigates away.
libraries: []
tags: [gallery, zine, riso, print, lightbox, dialog, filter, inline-svg, generative, light, variable-font]
use_when:
  - A gallery of printed or physical objects whose real sizes differ and are worth comparing (zines, posters, records, books, packaging).
  - Visitors browse before an event and need one or two facts per item (where it is, what it costs) without opening anything.
  - There is no photography yet, or you want a consistent drawn placeholder per item driven by data.
avoid_when:
  - The items are photographs that must be seen at the largest possible size. Real-size slots shrink the small ones on purpose.
  - The collection has hundreds of items. Instant filtering and a flat grid suit about 10 to 60.
  - The brand cannot carry fluorescent pink and yellow, or the print metaphor means nothing to its audience.
---

## Why it works

**The bold idea: off register to in register.** Each cover is drawn as two Riso ink plates multiplied onto white stock. The second plate sits off register by an offset seeded from the title (1.5 to 3.5 viewBox units, in a seeded direction), so no two covers drift the same way, as in a real print run. The title is printed on both plates, so the drift shows as a coloured fringe on the type. Hovering or keyboard-focusing a cover pulls the plate into register over 0.32s and the fringe closes into one overprinted colour. Opening the lightbox shows the cover large, off register, and it slides into register over 0.45s after a 0.1s delay. Every Previous or Next brings the new cover in the same way. This is the design's only motion idea. Everything else changes colour or changes instantly.

- **Real sizes are quiet structure.** Every slot has aspect-ratio 160/210 and each cover's width is (format width in mm / 160) of the column, sitting bottom-left. A6 and DL read as smaller and slimmer, as they would on a table. Saddle-stitched covers carry two steel staple marks on the spine; folded DL leaflets carry none. Both are true to the data.
- **One family, set at different weights.** Darker Grotesque (no width axis) does everything: the H2 at 900, leading .88, tracking -0.01em; the dialog H3 at 800; caption titles at 700; table numbers and prices at 700; body at 500, 1.25rem/1.5 (its x-height is small, so 500 at 1.125rem read thin in the screenshot and the body went up to 20px). The covers' own titles use the same face at seeded weights 300 to 900, sizes and occasional tilts, so the covers vary without loading another font.
- **No tabular figures.** Measured at build: '1111' sets at 151px against '0000' at 218px at 100px size with `tabular-nums`, so the feature does nothing in this face. Prices are right-aligned in each caption row, every table number has one letter and one digit, and the dialog counter ("3 of 24") sits in a fixed 7ch centred cell so it does not jump.
- **Palette from the fair's world.** `--ground` #F6E0E5 is a pink copier bond, the coloured stock a fair programme is copied on, so the whiter `--sheet` #FAFAF6 covers read as cover stock laid on it. `--blue` #2B3D7A, a darkened Riso Federal Blue, is the only text colour: 8.15:1 on the ground, 9.78:1 on sheet, 8.19:1 on yellow. Fluorescent pink never carries text (2.46:1 on the ground); it is only the H2's off-register plate and cover ink. Hierarchy comes from size and weight in one blue, as in a one-ink programme.
- **The H2's pink plate is static.** It is an `aria-hidden` duplicate of the heading text, offset (.045em, .035em) and multiplied behind it. It never snaps on hover: if it moved, the page would have a second motion idea.
- **Controls are not paper.** Covers have square corners and a 1px steel edge (3.04:1 on the ground, 3.65:1 on sheet). Chips and buttons have a 0.25rem radius and a 2px blue border. The two radii separate the object from the control. No shadows.
- **The checked chip does not rely on yellow.** Yellow is 1.0:1 against the pink ground, so each chip shows its radio: a blue ring, filled blue when checked (8.15:1), plus the weight change to 750.
- **Instant filter, said out loud.** Choosing a topic hides the others at once (CD5's reduced state, chosen on purpose) and a polite live region says "Showing 5 of 24 covers: Comics".
- **Nothing hides until JS.** Captions always show title, maker, table and price. Without JS a noscript line explains the covers are drawn by script and the filter fieldset stays `hidden`.

### Choices against the collection's defaults

- R1 Not cream: the ground is a coloured pink bond, the type a grotesque, the accents Riso pink and yellow. R2 The hairline rule under the filters was cut; it encoded nothing. R3 No card shadow (a hard offset shadow was cut), no container, no padding: covers differ by real format. R4 The fair line is a full sentence at step-1 with date, time, venue and entry, not an eyebrow; no middle dots, no monospace, no arrow glyphs, no caps labels. R5 "24 of 64" stays inside a sentence. R6 The whole H2 gets the plate, never one word. R7 No entrances and no lift. R8 The View Transition reflow and sibling dimming were cut. R9 Nothing starts at opacity 0. R10 No hover-only content. R11 Zoom is never disabled and there is no ambient loop (MD4 grain rejected: the covers already carry print texture). R12 No faded secondary blue.
- **Revision (art direction):** the font moved from Bricolage Grotesque to Darker Grotesque, because Bricolage is already used by hero-doc-festival, process-brewery, footer-record-label, crud-vet-clinic and gallery-street-food-market (with the same H2 setting). Every width role was removed. The ground moved from #EDEFEA copier white to #F6E0E5 pink bond, because about 13 designs already sit on pale green-grey grounds; the plan's #F4DCE2 was lightened to #F6E0E5 so the steel paper edge clears 3:1.
- **Revisions at build:** the register offset range went from 0.8-2.4 to 1.5-3.5 units, and the title was printed on both plates, because at grid size the original snap moved 1-3px with nothing to register against and could not be seen. Bigtype covers keep their huge type on one plate: overprinted at that size it reads as the darker ink alone. The removed accessory was a seeded letter-spacing variation on cover titles, which nobody could see.

## Motion

Tier: simple. CSS transitions plus class toggles. Only transform and opacity animate.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Cover plate into register | SIG | Hover (fine pointer) or `:focus-visible` on a cover button | in .32s `--ease-snap`; out .5s ease-in-out | Register changes instantly (transition none) |
| Cover press | MI1 | `:active` on a cover | scale .98 in .12s, release .35s `--ease-release` | No scale |
| Chip hover | colour only | Hover, `@media (hover:hover)` | yellow 35% over .15s ease-out | Instant |
| Chip and button press | MI1 | `:active` | scale .96 in .12s, release .35s overshoot | No scale |
| Lightbox open | CD7 | Cover click, `showModal()` | panel opacity 0 to 1 and scale .98 to 1 over .4s `--ease-out` via `@starting-style`; backdrop blue 86% over .3s | Opacity .2s only |
| Lightbox cover arrival | SIG | Open | plate slides into register .45s, .1s delay | Cover drawn in register |
| Previous / Next / arrows / Home / End | TR1 reduced + SIG | Buttons or keys, within the filter, wrapping | text swaps instantly; plate slides in .32s | No slide |
| Lightbox close | CD7 out | Close, Escape, backdrop click | opacity and scale out .25s with `allow-discrete` on display and overlay | Opacity .2s |

No page-load sequence, no scroll effects, no ambient motion, native cursor. While the dialog is open `html:has(dialog[open])` hides page overflow and `scrollbar-gutter: stable` stops the shift. Focus moves to Close on open and returns to the grid button of whichever cover is showing on close, scrolled into view with `block: "nearest"`. Under 640px the dialog is a full-screen sheet with Close sticky at the top right and a sticky bottom bar of 48px buttons padded by `env(safe-area-inset-bottom)` (the page sets `viewport-fit=cover`).

## Do not touch

- One motion idea. Do not animate the H2 plate, the filter reflow or the captions.
- Real relative sizes: `aspect-ratio: 160 / 210` slots, width = format width / 160, bottom-left alignment.
- Titles printed on both plates of drawn covers; without a shared element the register snap is invisible.
- The seeded generator (`mulberry32(hash(title))`): art and offsets must be stable between reloads.
- Staples only for `binding: 'saddle'`.
- The visible radio mark in each chip: yellow alone does not separate checked from unchecked on the pink ground.
- Captions always visible; the cover buttons are named by them, and the grid SVG is `aria-hidden`. The dialog SVG has `role="img"` and names both inks; every ink is also named in text.
- The `console.assert` self-check after the look-up maps.

## Adapting

- **Data.** Edit `COVERS` (title, maker, table, price, format, pages, binding, print, inks, motif, topic, blurb, img, alt). Add formats to `FORMATS` in millimetres, rows to `ROWS`, topics to `TOPICS` (the chips and counts are generated). The self-check warns in the console when a field has no entry in its map.
- **Real scans.** Set `img` to an image URL and `alt` to a description; the renderer outputs `<img loading=lazy>` at the same format size and skips the drawn plates. The register snap only applies to drawn covers.
- **Retime or remove the signature.** `--dur-snap` (hover and Previous/Next), `--dur-arrive` (lightbox arrival) and `--ease-snap`. To remove it, delete the `.plate-b` transform rules; the covers stay as printed. The offset range is `d = 1.5 + r() * 2` in `coverArt`.
- **Longer titles** wrap in captions (balanced); cover art titles wrap at 13 characters (9 for DL) and scale to fit.

| Token | Role |
|---|---|
| `--ground` | Page ground, a coloured copier stock |
| `--sheet` | Cover stock and dialog surface |
| `--blue` | All text, borders, focus rings, radio marks |
| `--pink` | H2 off-register plate only |
| `--yellow` | Checked chip and button hover fill, always under blue text |
| `--steel` | Paper edges and staples (3:1 non-text) |
| `--backdrop` | Dialog backdrop, blue at 86% |
| `--riso-*` | Cover ink set; data only, named in text in the dialog |
| `--font` | Darker Grotesque with Arial Narrow and system fallbacks |
| `--step--1` to `--step-4` | Type scale: captions, body, dateline, by-line, dialog H3, H2 |
| `--space-1` to `--space-8`, `--gutter`, `--max` | Spacing scale, side gutter, max width |
| `--radius-control` | Chips and buttons only; covers stay square |
| `--dur-snap`, `--dur-arrive`, `--ease-snap`, `--dur-press`, `--ease-release`, `--ease-out` | Motion timings |
