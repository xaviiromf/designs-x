---
title: The covers on the tables this year
section: gallery
subject: The exhibitors' cover gallery for the Saddle Stitch Zine Fair 2026, a fictional zine fair at the Old Wash House, Partick, Glasgow, where 24 of the 64 tables sent in their covers.
aesthetic: A Riso print run. Two-ink covers on whiter cover stock, laid out at their real relative sizes on an orchid copier-bond ground, with the second ink plate printed slightly off register until a cover is hovered or focused.
mode: light
fonts:
  - Darker Grotesque 300-900 (Google Fonts, variable wght)
js: Draws each cover as two-ink Riso art from the COVERS array at the top of the script, fills the topic filter counts, filters the grid, and runs a native dialog lightbox with Previous and Next buttons and arrow, Home and End keys within the current filter, without navigating away.
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

**The bold idea: off register to in register.** Each cover is drawn as two Riso ink plates multiplied onto white stock. The second plate sits off register by an offset seeded from the title (0.8 to 2.4 viewBox units, in a seeded direction), so no two covers drift the same way, as in a real print run. The title is printed on both plates, so the drift shows as a coloured fringe on the type. Hovering or keyboard-focusing a cover pulls the plate into register over 0.32s and the fringe closes into one overprinted colour. Opening the lightbox shows the cover large, off register, and it slides into register over 0.45s after a 0.1s delay. Every Previous or Next brings the new cover in the same way. This is the design's only motion idea. Everything else changes colour or changes instantly.

- **Real sizes are quiet structure.** Each cover's width is (format width in mm / 160) of the column, sitting bottom-left. Each grid item spans two subgrid rows (cover, caption), so a row is as tall as its tallest cover, no taller, and captions line up across the row. A6 and DL read as smaller and slimmer, as they would on a table. The caption's table and price sit side by side from the left, under the cover, never pushed past it. Saddle-stitched covers carry two steel staples on the spine fold in the lightbox (at grid size they are about 1px, so the grid hides them); folded DL leaflets carry none.
- **One family, set at different weights.** Darker Grotesque (no width axis) does everything: the H2 at 900, leading .9, tracking -0.02em; the dialog H3 at 800; caption titles at 700; table numbers and prices at 700; body at 550, 1.25rem/1.3 (its x-height is small, so 1.5 leading read double-spaced and 500 read grey); the lede at 1.5rem/600 so it holds against the 900 H2. The covers' own titles use the same face at seeded weights 500 to 900 (300 was dropped: with the drift its hairlines read as outline type), sizes and occasional tilts, so the covers vary without loading another font.
- **No tabular figures.** Measured at build: '1111' sets at 151px against '0000' at 218px at 100px size with `tabular-nums`, so the feature does nothing in this face. Every table number has one letter and one digit, and the dialog counter ("3 of 24") sits in a fixed 7ch centred cell so it does not jump.
- **Palette from the fair's world, and the answer to the cool off-white tell.** Around 35 light designs in the collection now sit on a cool grey-green off-white (#E3E8E5 to #F1F2EE). Zine fairs do not print on that: programmes, maps and flyers are copied on coloured bond. `--ground` #DCD5E8 is an orchid copier bond, the only lavender ground in the collection, so the whiter `--sheet` #FAFAF6 covers read as cover stock laid on coloured paper (1.36:1 apart, enough to separate object from table). `--blue` #2B3D7A, a darkened Riso Federal Blue, is the only text colour, never a navy-black: 7.18:1 on the ground, 9.78:1 on sheet, 8.19:1 on yellow. Fluorescent pink never carries text (2.16:1 on the ground); it is only the H2's off-register plate and cover ink. Hierarchy comes from size and weight in one blue, as in a one-ink programme.
- **The H2's pink plate is static.** It is an `aria-hidden` duplicate of the heading text, offset (-.03em, .02em), up and left so it fringes the leading edges like a plate and never reads as a drop shadow, and multiplied behind it. It never snaps on hover: if it moved, the page would have a second motion idea.
- **Controls are not paper.** Covers have square corners and a 1px steel edge. `--steel` was darkened from the plan's #7D838C (2.68:1 on orchid) to #70767F: 3.21:1 on the ground, 4.38:1 on sheet. Chips and buttons have a 0.25rem radius and a 2px blue border. The two radii separate the object from the control. No shadows.
- **The checked chip does not rely on yellow.** Yellow is 1.14:1 against the orchid ground, so each chip shows its radio: a 1.125rem blue ring (larger than the cap height so it never reads as a letter O), filled blue with a yellow inner ring when checked (8.19:1 on yellow), plus the weight change to 750. Topic labels are one word (History, Food, Photos, How-to) and the 'Show' legend is screen-reader only, so on a 390px phone the chips take three rows and the first covers start above the fold.
- **Instant filter, said out loud.** Choosing a topic hides the others at once (CD5's reduced state, chosen on purpose) and a polite live region says "Showing 5 of 24 covers: Comics".
- **Section, not page.** The heading is an H2; the host page supplies the H1, as everywhere in the collection.
- **Cover art is decorative.** Drawn cover titles (pink on white, yellow-green on white and so on) are below text contrast on purpose: they are printed ink, the grid SVG is `aria-hidden`, and the caption always carries the title, maker, table and price in `--blue`.
- **Nothing hides until JS.** Captions always show title, maker, table and price. Without JS a noscript line explains the covers are drawn by script and the filter fieldset stays `hidden`.

### Choices against the collection's defaults

- R1 Not cream: the ground is a coloured orchid bond, the type a grotesque, the accents Riso pink and yellow. R2 The hairline rule under the filters was cut; it encoded nothing. R3 No card shadow (a hard offset shadow was cut), no container, no padding: covers differ by real format. R4 The fair line is a full sentence with date, time, venue and entry, set in the right column above the lede so the H2 starts the section, not an eyebrow; no middle dots, no monospace, no arrow glyphs, no caps labels. R5 "24 of 64" stays inside a sentence. R6 The whole H2 gets the plate, never one word. R7 No entrances and no lift. R8 The View Transition reflow and sibling dimming were cut. R9 Nothing starts at opacity 0. R10 No hover-only content. R11 Zoom is never disabled and there is no ambient loop (MD4 grain rejected: the covers already carry print texture). R12 No faded secondary blue.
- **Revision (art direction):** the font moved from Bricolage Grotesque to Darker Grotesque, because Bricolage is already used by hero-doc-festival, process-brewery, footer-record-label, crud-vet-clinic and gallery-street-food-market (with the same H2 setting). Every width role was removed. The ground moved from #EDEFEA copier white to #DCD5E8 orchid bond, because about 35 light plans sit on cool grey-green off-whites; a coloured ground also keeps the pink/yellow/blue trio clear of testimonials-surf-school. No lilac light enough to keep steel above 3:1 still read as lilac, so the steel token was darkened instead.
- **Revisions at build:** the title is printed on both plates, because at grid size the snap moved 1-3px with nothing to register against and could not be seen. A trial range of 1.5-3.5 units was reverted to the brief's 0.8-2.4: the larger drift turned light titles into double vision, and the real cause was hairline weights, now dropped. Bigtype covers keep their type on one plate, sized to fit the longest word inside the trim; the second ink is a solid band plus a halftone field below the last line, never across it, so nothing reads as a redaction bar. The removed accessory was a seeded letter-spacing variation on cover titles, which nobody could see.

## Motion

Tier: simple. CSS transitions plus class toggles. Only transform and opacity animate.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Cover plate into register | SIG | Hover inside `@media (hover: hover)` or `:focus-visible` on a cover button (touch taps leave no sticky in-register cover) | in .32s `--ease-snap`; out .5s ease-in-out | Register changes instantly (transition none) |
| Cover press | MI1 | `:active` on a cover | scale .98 in .12s, release .35s `--ease-release` | No scale |
| Chip hover | colour only | Hover, `@media (hover:hover)` | yellow 35% over .15s ease-out | Instant |
| Chip and button press | MI1 | `:active` | scale .96 in .12s, release .35s overshoot | No scale |
| Lightbox open | CD7 | Cover click, `showModal()` | panel opacity 0 to 1 and scale .98 to 1 over .4s `--ease-out` via `@starting-style`; backdrop blue 86% over .3s | Opacity .2s only |
| Lightbox cover arrival | SIG | Open | plate slides into register .45s, .1s delay | Cover drawn in register |
| Previous / Next / arrows / Home / End | TR1 reduced + SIG | Buttons or keys, within the filter, wrapping | text swaps instantly; plate slides in .32s | No slide |
| Lightbox close | CD7 out | Close, Escape, backdrop click | opacity and scale out .25s with `allow-discrete` on display and overlay | Opacity .2s |

No page-load sequence, no scroll effects, no ambient motion, native cursor. While the dialog is open `html:has(dialog[open])` hides page overflow and `scrollbar-gutter: stable` stops the shift. Keyboard focus on a cover draws a 3px blue ring around the cover itself (the object that snaps), plus the caption underline. Under reduced motion grid covers stay at their printed offset until hovered or focused, while the lightbox cover is drawn in register; this is deliberate (the lightbox is where the cover is read). Focus moves to Close on open and returns to the grid button of whichever cover is showing on close, scrolled into view with `block: "nearest"`. Under 640px the dialog is a full-screen sheet with Close sticky at the top right and a sticky bottom bar of 48px buttons padded by `env(safe-area-inset-bottom)` (the page sets `viewport-fit=cover`).

## Do not touch

- One motion idea. Do not animate the H2 plate, the filter reflow or the captions.
- Real relative sizes: width = format width / 160, bottom-left alignment in two-row subgrid items.
- Titles printed on both plates of drawn covers; without a shared element the register snap is invisible.
- The seeded generator (`mulberry32(hash(title))`): art and offsets must be stable between reloads.
- Staples only for `binding: 'saddle'`, on the spine fold, lightbox only.
- The visible radio mark in each chip: yellow alone does not separate checked from unchecked on the orchid ground.
- Captions always visible; the cover buttons are named by them, and the grid SVG is `aria-hidden`. The dialog SVG has `role="img"` and names both inks; every ink is also named in text.
- The `console.assert` self-check after the look-up maps.

## Adapting

- **Data.** Edit `COVERS` (title, maker, table, price, format, pages, binding, print, inks, motif, topic, blurb, img, alt). Add formats to `FORMATS` in millimetres, rows to `ROWS`, topics to `TOPICS` (the chips and counts are generated). The self-check warns in the console when a field has no entry in its map.
- **Real scans.** Set `img` to an image URL and `alt` to a description; the renderer outputs `<img loading=lazy>` at the same format size and skips the drawn plates. The register snap only applies to drawn covers.
- **Retime or remove the signature.** `--dur-snap` (hover and Previous/Next), `--dur-arrive` (lightbox arrival) and `--ease-snap`. To remove it, delete the `.plate-b` transform rules; the covers stay as printed. The offset range is `d = .8 + r() * 1.6` in `coverArt` (0.8 to 2.4 units).
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
| `--step--1` to `--step-4` | Type scale: captions, body and dateline, lede, by-line, dialog H3, H2 |
| `--space-1` to `--space-8`, `--gutter`, `--max` | Spacing scale, side gutter, max width |
| `--radius-control` | Chips and buttons only; covers stay square |
| `--dur-snap`, `--dur-arrive`, `--ease-snap`, `--dur-press`, `--ease-release`, `--ease-out` | Motion timings |
