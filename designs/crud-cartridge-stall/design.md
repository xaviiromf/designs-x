---
title: Flea-market stall stock book with a packed crate
section: crud
subject: "Lot 14, a two-person second-hand video game stall at the Sunday flea market in Bologna: the stock book where Ilaria and Teo add an item when they buy it, update it when they test or reprice it, and delete it when it sells."
aesthetic: A rust awning in the afternoon. A crate seen from above, ten compartments wide, packed with flat pixel tiles in four kind hues; paper price tags on twine; price-sticker yellow for money and only money; Handjet for the headline and the totals.
mode: dark
fonts:
  - Handjet (Google Fonts, variable). Display only, at ELSH 2 and ELGR 1 so its modules are square tiles. The H2 at 700 and the four totals figures at 700.
  - Host Grotesk (Google Fonts, variable 300-800). Everything else, body at 400, labels and buttons at 600 to 650, tabular figures in the table, tags, badges, readings and the status line.
js: Keeps typed records in sessionStorage (with an in-memory fallback), packs them first-fit into a ten-column crate grid, renders the crate, detail, stock book and totals, runs the add/edit dialog, delete with Undo and the self test, and adds the lamps-on load, the dialog swing and the scroll-stamped tally.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [crud, inventory, grid, packing, flea-market, retro, games, table, dialog, form, tally, dark, gsap, lenis]
use_when:
  - Records have a category that can honestly be turned into a size, so a packed grid shows the stock at a glance (stock, storage bins, shelf space, seats).
  - A small team keeps a session-length list of typed records and needs totals, sorting, filters and an undoable delete.
  - The brand has a physical, hand-made world (tags, string, crates, stickers) that can carry the micro-interactions.
avoid_when:
  - Thousands of records. The crate is a picture of a few dozen things; beyond about 60 tiles it turns into noise.
  - Records with no natural size or kind. Then the crate is decoration and the stock book table alone is the right design.
  - Light, corporate or finance brands. The rust ground and the pixel tiles are loud by design.
---

## Why it works

**The one bold idea: the crate is the record set, and a record's kind decides the space it takes.** Every item in the stock book is a tile in a crate seen from above, ten cells wide. A cartridge takes one cell, a disc one by two (tall), an accessory two by one (wide) and a console two by two. The tiles are packed first-fit in reading order, in the current sort order, so the crate is a true picture of the stock: you can see at a glance that consoles take the room, that the cheap end of the table is all cartridges, and where the gaps are. When the sort changes the crate is cleared and the tiles are dealt back one at a time in the new order (25 ms each, hard cuts, nothing travels). A filter or a delete leaves holes where items were, and the note beside **Tidy the crate** says so ("The crate has gaps or is out of order."); pressing it packs the crate again. The packer is a pure, deterministic function, tested in `runSelfTest()` for every sort key and direction (every item placed, inside ten columns, no overlaps, same input same layout).

- **Colour jobs.** The ground is rust `#4D270B`, an awning in the afternoon, orange-brown and clearly not the smoked brown of `pricing-net-cafe`. Its darker tone `--rust-deep` is the inside of the crate, the ink on paper and the scrim; its lighter tone `--rust-slat` is the slats and compartment lines. `--card` is paper: text, price tags, field tags. `--twine` is string: secondary text, rules, the strings of tags and fields, and the focus ring (a loop of string, 2px, offset 3px). The four kind hues (`--cartridge`, `--disc`, `--console`, `--accessory`) appear only on items of that kind: their tile, their filter chip, their row mark in the table, their legend swatch, their option in the dialog. `--price` yellow is money and only money: prices, the stock value, the price sticker on a tag, the **Add an item** button (it brings money in) and the tally marks. `--fault` is errors and the delete action. Tested is not a hue: a solid paper block on a tile means tested, a hollow square means not yet, and the same marks are used in the table, the detail and the form.
- **Structure.** Top: the H2, a lede in the stall's own words, and **Add an item**. Then the crate beside the detail panel, which shows the selected item's fields with Edit and Delete or, with nothing selected, explains the crate with a legend of the four kinds and their counts. Below the fold, the stock book table (sort by item, kind, price, bought on; kind chips; Untested only; a text filter; stacked rows under 720px), the totals, and the end (reset, storage notice, two lines about the stall). Selecting a row selects the tile and vice versa, so the table is the crate's text alternative and the crate is the table's picture.
- **The crate fits the first screen.** The script measures the crate's top edge and the CSS sizes a cell as `min(width / 10, (100svh - top - 76px) / rows)`, clamped to 30-104px, so the crate and the detail sit above the fold at 1440x900, 1366x650 and 1280x600. On phones the cell is the width / 10 (about 31px) and the row is never shorter than 44px, so every tile is at least 44px in one dimension.
- **Types and parsing.** All six types are present and parsed by one function each: item (text, 2 to 40 characters, spaces collapsed), kind (choice of four), quantity (integer 1 to 99), price (decimal: a point or a comma, up to two places, EUR 0.50 to 999.99, kept as whole cents), bought on (a real calendar date, not in the future) and tested (boolean). Every message says how to fix the value ("Write euros, then cents after a point or a comma, like 12.50 or 12,50."). Stored records are parsed again on load, so a bad copy in sessionStorage is dropped rather than breaking the page.
- **Words.** The copy is the stall-holders' own: "We add an item when we buy it", "We saw it work", "Put it in the crate", "Delete this from the stock book? Do it when it sells." Every button says what happens. The status line (a `role="status"` region) reports with real figures: "Added. The crate holds 23 items worth EUR 399.50."
- **Semantics.** The section is labelled by its H2; the dialog's title is an H2 in the top layer. The crate is `role="grid"` with `role="row"` per crate row (`display: contents`) and `role="gridcell"` per tile, each holding a real `<button>` with `aria-pressed` and a full label ("Black 16-bit console with two pads. Console, 1 in the crate, EUR 65.00 each, tested"). Roving tabindex: one tile is in the tab order, the arrow keys move in reading order, Home/End jump, Enter or Space selects, Escape lets go, and Shift with an arrow moves the tile one cell (the status line says where, or "It does not fit there."). The table has `aria-sort` on the sorted header. The tally is `aria-hidden`; the figure beside it is the text.
- **Different from its neighbours in the ledger.** `crud-memory-card` is the nearest: a block grid where each save takes one to three blocks. Here the grid is a two-dimensional packing of four shapes, the order is the sort order, tidying deals the tiles back one at a time, and the pointer response is a paper tag on a string, not framing and icon frames. Its button is a sticker whose corner peels; here a starburst sticker is stamped on the corner and a till flag pops up on press. `features-cyberdeck-kit` packs blocks too, but by falling, scrubbed by scroll; nothing falls or travels here.

Deviations from the brief, and why:

- **Tidy runs on its own only for sort**, as the brief says; a filter change or a delete leaves holes and changes the note beside the button, so the button has a reason to be pressed. Loosening a filter places the newly shown items in the first gaps that fit.
- **Tiles can be moved by hand.** Drag a tile (mouse or pen after 4 px of travel; touch after a 0.25 s hold, so a swipe still scrolls), or press Shift with an arrow key on a focused tile, and it takes the new space if its whole footprint is inside the crate's rows and on no other tile; otherwise it steps back. A moved tile keeps its space through every re-render, filter, edit (same kind) and Undo, until **Tidy the crate**, a sort or Reset packs again; the note beside the button says the crate is out of order. Hand moves are not kept in sessionStorage: a reload packs the crate afresh.
- **The halves of the lamps are decided per element:** the script marks every element of the section left or right by where its words or box sit (text is measured with a Range, so a full-width headline counts as the half its words are in; a container that spans both halves lets its children decide). This keeps the cut down the middle of the crate exact, tile by tile.
- **The price sticker on the tag is a yellow block with rust ink**, because yellow figures on paper would be about 1.2:1. Yellow is still money.

## Do not touch

- **The packer and its tests.** `pack`, `placeItem`, `unplaceItem`, `firstFit`, `fits` and `moveItem` are pure and deterministic; the crate, the Undo (a deleted tile goes back to its own space when it is free) and the self test depend on that. `runSelfTest()` must keep logging exactly `SELFTEST PASS` at `#selftest`.
- **Size is kind.** Keep the four kinds and their shapes (1x1, 1x2, 2x1, 2x2) in `KINDS`; the emblems' bitmaps are ten pixels per cell wide so they snap to whole pixels at every cell size (`--px` is `round(down, cell x 0.06, 1px)`).
- **One hue, one job.** Kind hues only on items of that kind; yellow only on money; fault only on errors and delete. Tested is a paper mark, never a colour.
- **Hard cuts.** The deal is a 1ms `steps(1)` visibility keyframe delayed by `--d-clear + i x --d-deal`; the tag and the knot are `visibility` with a delay; the sticker is a two-frame `steps(1, end)` scale. Do not soften any of these into fades or slides.
- **Stepped corners live on inner spans** (`.btn-face`, `.btn-label`, `.tile-face`, `.ftag-paper`), never on the button or input, so focus rings are never clipped.
- **Text colour is set, not inherited, inside the section** (`:where(.stall) :where(h2, h3, p, ...)`, zero specificity). Without it the lamps' halves inherit a lit colour from a parent and the headline does not go dark.
- **Hidden states exist only under `html.js:not(.go)`** (the unlit tokens) and are undone for reduced motion. With the CDN blocked nothing is unlit, the tally is complete, and every CRUD flow, the dialog, filters, sorting and the tags work in plain JavaScript.

## Motion

House stepping: hard cuts on a visible frame rate (25 to 80 ms), `steps()` and `visibility` delays in CSS, `gsap.timeline().set()` frames in the script; nothing larger than a few pixels eases. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`); the load waits for the fonts (raced with 1.5 s) and a visible page. Everything is inside `gsap.matchMedia` (motion / reduce); the cleanup removes the ticker, Lenis, the ScrollTrigger, the ResizeObserver and pending calls. Presses and touch chalk are held in plain JavaScript in every mode.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Lamps come on | Tokens swapped to two rust tones (`--unlit-hi`, `--unlit-lo`) per element half | Load, after fonts and a visible page | Whole section unlit, then the left half cuts to colour after `--d-unlit` 0.4 s, the right half `--d-lamp` 0.15 s later; two cuts, no flash | Lit from the start |
| Tidy the crate | CSS `deal` keyframe, `visibility` from hidden, 1 ms steps(1) | Tidy the crate, any sort change, Reset | Empty for `--d-clear` 0.12 s, then one tile every `--d-deal` 0.025 s in sort order (22 tiles in about 0.67 s) | Instant |
| Tile dealt in | Same keyframe on one cell | After add, edit or Undo | Hidden for 0.12 s, then cut in with its tag hung | Instant |
| Price tag | `visibility` with a transition delay | Hover (fine pointers), keyboard focus on a tile, selection (pinned); touch: a tap selects | String 22 px at once, the paper tag `--d-tag` 0.08 s later; hangs from the top-right corner, flipped to the left near the right wall | String and tag at once |
| Tally stamped | ScrollTrigger scrub on the tally, start top bottom, end top center | Scroll | Marks shown = floor(progress x count), one at a time, hard cuts; the figure is always the true number | All marks shown |
| New and struck marks | Re-render of the tally | Add (a new mark), delete (the last mark struck in fault red until Undo or the next change) | Instant | Instant |
| Button sticker | CSS `stamp` keyframe, steps(1, end) | Hover, focus-visible, and on press (touch and keyboard equivalent) | 8-point stepped star at half size for 0.07 s, then full size (`--d-stamp` 0.14 s), overlapping the top-right corner; the face swaps to its pair (yellow to pale yellow, outline to paper, fault outline to fault) | Full size at once |
| Till flag press | Class `is-down` held at least `--d-hold` 0.14 s from pointerdown, Space or Enter | Press | A paper flag on a 6 px stem pops up above the top edge; the face inverts to rust-deep with the hue as ink | Same (a state, not motion) |
| Chalk lines | Two canvas-drawn 3 px images per link, generated once from a seed of its text | Hover, focus-visible; touch: press, held `--d-chalk-hold` 0.2 s | First jagged 2 px line at once, the second 3 px below it `--d-chalk` 0.06 s later; the rest underline hides while chalked | Both at once |
| Field tag tied on | `visibility` with a delay | Focus in a field | Twine string through the hole, then the knot `--d-knot` 0.07 s later; reading beside the field updates on input | Both at once |
| Error line | Text in a reserved line, fault bar under the tag | Blur with an invalid value, submit | Instant; cleared as soon as the value is valid; focus moves to the first bad field | Instant |
| Dialog hung on a peg | `gsap.timeline().set` rotation from the top-left corner | Add an item, Edit; Close, Escape, backdrop, Close without saving | Opens at 4°, 2°, level, `--d-peg` 0.07 s apart; closes at 2°, 4°, then gone. Lenis stopped while open; a forced close is settled | Instant |
| Success | Plain JS, then the tile deal and tag | Valid submit | Dialog closes, tile dealt with its tag hung, tally mark, status line with figures, focus on the detail heading | Instant |
| Tile lifted and held | Class `is-held`: the tile translated 4 px left and 6 px up over a hard `drop-shadow` in `--scrim`, CSS `steps(2, end)`; the face runs a `shiver` keyframe (1 px right, down, left, up, `steps(1, end)`, infinite) | Drag past 4 px (mouse, pen) or a `--d-grab` 0.25 s hold (touch); the cell then follows the pointer in whole pixels | Lift `--d-lift` 0.08 s; one shiver round `--d-shiver` 0.16 s, only while held | Lifts at once, no shiver |
| Landing mark | A `.drop` block on the floor's grid, clamped to the floor | While dragging | Paper 2 px inset outline where it fits; fault outline and hatch where it overlaps or runs out of the crate; hidden when wholly outside | Same (a state, not motion) |
| Dropped | Fits: layout updated and the crate re-rendered (a hard cut, nothing travels); does not fit: class `is-back`, the cell's transform cleared through `steps(4, end)` | Release; pointercancel always goes back | Back in `--d-back` 0.16 s; status line "Moved ... to row 3, column 7." | Instant |
| Delete and Undo | Plain JS | Delete, then Delete it (asks first); Undo | Tile removed leaving a gap, last tally mark struck, status with Undo focused; Undo puts it back in its own space | Instant |

## Adapting

1. **Find the size in your records.** The crate is right only when a category can honestly be a size. Rename `KINDS` (label, plural, `w`, `h`, size text), keep at most four shapes, and redraw the emblems in `BITS` at ten pixels per cell wide.
2. **Map the palette, keeping the jobs.** Ground and its two tones; paper; string (also focus); one hue per kind; one hue for money; one for faults. Recompute the unlit pair so the headline stays at 3:1 or more in the dark state.
3. **Replace the records.** Edit `SEED` (id, item, kind, qty, price in cents, ISO date, tested) and the parser limits; keep a message for every rule. Change `KEY` so old session copies are not read.
4. **Copy.** Keep the stall-holders' voice: plain verbs, real figures, buttons that say what happens. The H2 is one line on desktop at about 30 characters.
5. **Retime.** Every duration is a `--d-*` token on `:root`. To remove the deal, delete the two `deal` animation rules (tidy then repacks instantly). To keep the tally still, delete the ScrollTrigger; the marks are drawn complete.
6. **In a framework,** keep the pure functions as a module, render the crate from `layout.at`, and port the motion branch as one effect returning the `gsap.matchMedia` cleanup.

| Token | Role |
|---|---|
| `--rust`, `--rust-deep`, `--rust-slat` | Ground; crate inside, ink on paper and stickers; slats and compartment lines |
| `--card` | Paper: text, price tags, field tags (11.7:1 on rust) |
| `--twine` | String: secondary text, rules, tag strings, focus ring (7.0:1) |
| `--cartridge`, `--disc`, `--console`, `--accessory` | One per kind, only on items of that kind (6.8 to 9.5:1; rust-deep on them 8.6 to 11.9:1) |
| `--price`, `--price-hi` | Money only, and the money button's paired hover face (9.5:1; rust-deep on them 11.9 and 13.5:1) |
| `--fault` | Errors and delete only (5.7:1) |
| `--unlit-hi`, `--unlit-lo` | The two rust tones of the lamps-off silhouette (3.9:1 and 1.7:1) |
| `--scrim` | Dialog backdrop, the rust at dusk |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk |
| `--t-tiny` ... `--t-h2`, `--t-fig`, `--lh-body` | Type scale: 12.5, 14, 16, 19, 24, totals clamp(40px, 4.4vw, 60px), H2 clamp(44px, min(5.6vw, 10.5vh), 88px) |
| `--s1` ... `--s7`, `--gut`, `--max-w` | Spacing on a 6px step (6 to 96), side gutter, content width 1400px |
| `--wall`, `--cols` | Crate wall thickness (10px, 6px on phones) and its ten columns |
| `--notch`, `--tap`, `--hit` | Stepped corner (4px), button and field height (48px), minimum target and phone row height (44px) |
| `--string`, `--tag-w` | Price tag string (22px) and width (168px, 132px on phones) |
| `--d-unlit` ... `--d-peg` | Every duration CSS and the script use |
