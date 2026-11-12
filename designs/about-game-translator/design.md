---
title: Game translator's personal front end
section: about
subject: Haruka Lindner, a fictional game translator in Düsseldorf who translates Japanese role-playing and adventure games into German and English and edits other translators' scripts; her daily problem is fitting a sentence into a text box of fixed width.
aesthetic: "Muted and bookish: a burgundy ground with a darker well and a lighter plate, dyed-cloth ink hues (navy, royal green, ochre, dusty rose, slate, sage, plum, brick, teal-grey) and one vermilion seal, all set in a single pixel monospace whose character cells are the layout grid."
mode: dark
fonts:
  - "Departure Mono (the pinned jsDelivr package @proj-airi/font-departure-mono@0.17.0, SIL Open Font License), one weight, for everything: display h2 at 44, 55, 66 or 88px, h3 at 33px, lede 22px, body 16.5px, small 13.75px, sign-off tiles at 66, 88, 110 or 176px. Character width is 0.636em, so 1ch is the unit of the box, the budgets and the tables."
js: Runs a dialogue-box layout engine in character cells (greedy word wrap, overflow cells, three language tabs, a slider), a pinned five-stage string table, a block chart, a choice menu, a gloss on text links, a budgeted enquiry form with a stamped seal, a page-like dialog, a sorted wordmark and a 40-block progress strip, all working without the libraries; GSAP adds the load sequence, scroll scrubbing and Lenis.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [about, portfolio, translator, localisation, monospace, departure-mono, text-box, character-cells, pinned-scroll, chart, form, dialog, muted, burgundy, gsap, lenis]
use_when:
  - A personal site for someone whose work is text under constraints (translators, subtitlers, copywriters, UX writers, game writers).
  - The person wants one strong, operable demonstration of the craft at the top, and a long page that tells the rest in order.
  - A muted, literary palette is wanted, but the page must still feel like software rather than a printed CV.
avoid_when:
  - The person's work is visual and needs images; this page has none and its voice is a monospace.
  - The page must be short or scannable in one screen; the story is a pinned scene several screens long.
  - The brand needs a proportional typeface or bold weights; Departure Mono has one weight and the layout depends on its cells.
---

## Why it works

**The one bold idea: the visitor operates the problem.** At the top sits a game dialogue box drawn in character cells. The pointer's horizontal position sets the box's width in whole characters, from 14 to 34. The line reflows instantly with a greedy word wrap into at most three rows, and anything that does not fit spills below the frame as cells marked in brick, while a counter reads "Fits in three rows." or "14 over." Three tabs switch the same line between its romanised Japanese source, the English and the German, and the frame takes that language's hue. Six sample lines can be stepped through. In five seconds a visitor sees why German needs more room, why a 22-character handheld box is hard, and what Haruka does all day. It is a layout engine you work, not a field of lights.

- **Everything else is the same cell.** Departure Mono's advance is 0.636em, so `1ch` is a cell everywhere: the box's grid columns, the frame cells, the spill well (36ch), the character budgets under the form fields, the field widths (40ch, 60ch, 11ch), the table columns and the 40-character rows of the message budget. The type scale is on the face's 11px grid (13.75, 16.5, 22, 33, and 44 to 110 for display) with line heights in multiples of 5.5px.
- **The page is one line's life.** The story so far is a string table from a fictional game, Hollow Weir. Scroll takes one highlighted string through five drafts (source, rough, edit, fit to box, in the game), which are also her five chapters, 2010 to now. The draft text in the table cuts to the next version, the previous draft stays one row above it struck through in tea, the character count turns brick when it exceeds the box's 66, and at "fit to box" the line is shown in the hero's box frame at 22 characters. A document changing through drafts, never badges changing colour.
- **Colour jobs (ten ink hues and a seal, each one job).** Gold leaf is the primary action and focus. Navy (a filled block, with a readable tint for text and edges) is the English line; royal green (the same pair) is the German line; ochre is the Japanese source. Rose, slate, sage, plum and brick are chapters and stages 1 to 5 (brick also marks overflow, which is what stage five fights). Teal-grey is the glossary and the choice toy. Vermilion appears only in the success seal. Text is paper; tea is secondary; the ground's three tones (ground, well, plate) carry every large area, so ten hues never become confetti. Errors use a hatched paper bar, not a red.
- **Hue surfaces.** Each stage hue owns a surface while its stage is on: its rail segment (22px), an 11px marker column on the current table row and a 4px top rule on its chapter card. The chart blocks are 11px cells with 2px gaps on desktop, so English and German read as colour.
- **Scale after the first screen.** The toy is the same object as the hero's box: lede-size text (22px) in a box 34 characters wide inside its frame, beside its heading on desktop. The wordmark is six square tiles across the full content width, letters at 176px on wide screens.
- **Structure.** Eight parts in order: top (name, claim, lede, two buttons, the engine), now (a `dl` of three), the pinned story, by the numbers (a block chart), a toy (a dialogue choice menu), things I use (six rows with glossed links), say hello (contact links from `CONTACT`, a budgeted form, a dialog with her working terms) and a sign-off wordmark. A 40-block strip along the bottom edge counts "strings done" as you read.
- **Type.** One family, one weight. Emphasis comes from colour, inversion (the current stage label, the picked year, the pressed buttons) and size. `font-synthesis: none` and `font-weight: 400` on every heading-like element keep the browser from faking bold. With the CDN blocked the system monospace takes over and all `ch` maths still holds.
- **Headline gloss.** The h2, "Every line has to fit in its box.", cuts in line by line, and above three words a small German gloss (Zeile, passen, Kasten) cuts in a frame later in the German hue. The glosses are `aria-hidden`; the lede gives the same German to everyone.
- **Flows without dead ends.** Every button does something visible in the page; the three external links built from `CONTACT` (mailto, Mastodon, GitHub) open in new tabs with a hidden "(opens in a new tab)". The form validates in JavaScript with messages that say how to fix each field, moves focus to the first bad field, prevents typing past each budget with "This box holds 40 characters.", and confirms in place with the details echoed back, a reference and "Change this".
- **Nearest designs in the ledger, and what is different.** `crud-cartridge-stall` packs tiles first-fit; here text is wrapped greedily into a box you resize, and the measure is characters, not tiles. `portfolio-security-researcher` steps a lifecycle chip; here the content itself (a string) is rewritten draft by draft in a table. `portfolio-disk-archivist` consolidates a block map with read and write cursors as a scroll fraction; here six letter tiles are selection-sorted from alphabetical order into a name, three frames per swap, with position numbers on pointing and a keyboard replay from a random order.

Deviations from the brief, and why:

- **The overflow has a visible spill well.** The rows below the box must be reserved so nothing jumps while the pointer moves; an empty reserved area read as a layout gap, so it is drawn as a dashed well, 36 characters wide, labelled "Rows that don't fit land here". The overflow cells land in it.
- **The primary button's hover adds a well square under the advance mark.** A 2px bob of a small chevron was too subtle to read in a frame, so on hover and focus the corner cell turns into a well (as in a text box waiting for the player) and the mark, now gold, bobs in it. The bob is as briefed: two positions 2px apart, four changes a second, only while hovered or focused.
- **The chart builds in whole blocks once, on first view,** so the stepped-bars family is present as motion as well as form; picking a year is an instant change.

## Do not touch

- **`1ch` is the cell.** The box grid (`repeat(var(--w), 1ch)`), the spill (36ch), the budgets (each cell `1ch`, starting 13px in, the input's padding plus border) and the field widths assume a monospace. A proportional face breaks the engine and the budgets.
- **The box is drawn by `drawBox()` in a fixed order of grid items:** top row, then three rows of side cell, text row, side cell, then the bottom row, then overflow rows. Each frame cell carries its clockwise index in `data-o`, which the load sequence sorts by. Adding elements inside `.tb` breaks auto-placement.
- **Reserve, do not reflow.** `.tb-hold` reserves `4 + --over-rows` box rows, computed from the worst line at width 14. If you add longer lines, the reserve grows by itself; do not let the counter or steps sit under a moving edge.
- **One job per hue.** Brick is chapter 5 and overflow (they are the same fight); do not use it for errors. Vermilion is only the seal. The navy and green blocks carry paper text; their tints carry text and edges on the ground.
- **Hidden states exist only under `html.js:not(.go)`,** and the load sequence replaces them with inline `visibility` before adding `.go`. With the CDN blocked nothing is hidden; the engine, tabs, chart, toy, form, dialog and shuffle all work in plain JavaScript.
- **The story pin is CSS sticky inside `.pin`,** which the script adds only with motion and a viewport at least 560px tall. Without it, all five chapter cards are listed with their drafts, and the table shows the final stage.
- **Press states are held for `--d-press` (160ms)** from pointerdown or keydown, so a quick tap still shows the inverted face.
- **Accessibility.** The box is a `role="slider"` (arrows, Page Up and Down, Home, End) whose value text says whether the line fits, described by a hidden copy of the current line with its `lang`. The tabs are real tabs with roving focus. The chart is a radiogroup of years with a live readout and a table disclosure. The toy is a list of buttons with arrow keys; the answer takes focus. Decorative drawings (glosses, link tags, strip, wordmark tiles, seal) are `aria-hidden`.

## Motion

House stepping: one frame is 80ms (`--d-frame`); every animation is `steps()`, a `steps(1)` keyframe list or a sequence of hard cuts. Only transform, opacity, clip-path and visibility change; colour changes are instant. GSAP runs inside `gsap.matchMedia` (motion, reduce, tall at 560px); Lenis is on `gsap.ticker` with `autoRaf: false`, `lagSmoothing(0)` and `lenis.on('scroll', ScrollTrigger.update)`, and is stopped while the dialog is open. The load waits for `document.fonts.load('16px "Departure Mono"')` raced with 1.5s and for a visible page; if the timeout wins, the box is redrawn when the font arrives. The only loop is the advance mark's CSS bob, which exists only while the primary button is hovered or focused.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Name line | Hard cut | Load, t0 | One frame | Visible |
| Headline lines | Hard cut per line | Load | Lines at 80ms, 240ms, 400ms (two frames apart) | Visible |
| Headline glosses | Hard cut, one frame after each line | Load | 160ms, 320ms, 480ms | Visible |
| Lede and buttons | Hard cut | Load, after the last line | 560ms | Visible |
| Box frame laid clockwise | Frame cells sorted by `data-o`, cut in ten groups | Load | From 160ms over `--d-lay` 0.4s (40ms a step) | Visible |
| Box rows | Whole rows cut in one at a time, then speaker, overflow, tabs, counter | Load | `--d-row` 0.12s apart after the frame | Visible |
| Box width | Instant reflow (greedy wrap) | Pointer x over the box zone (mouse, pen); touch: drag (`touch-action: pan-y`); keyboard: slider keys | Whole characters, 14 to 34 | Same (a state change) |
| Language and line | Hard cut, frame hue swaps | Tabs (click, arrows), Prev and Next | Instant | Same |
| Primary button hover | Corner well cuts in; the advance mark bobs 2px | Hover (hover: hover), focus-visible | `--d-advance` 0.5s steps(1) infinite (four changes a second), only while hovered or focused | Well shown, no bob |
| Primary button press | Inner border cuts in (the frame doubles), face inverts | pointerdown, Enter or Space | Held at least `--d-press` 0.16s | Same, instant |
| Secondary button hover | Bookmark ribbon lengthens 6 to 10 to 14px, face to plate | Hover, focus-visible | `--d-ribbon` 0.16s, two steps | 14px at once |
| Secondary button press | Ribbon tucked away (0px), face inverts | pointerdown, Enter or Space | Held at least 0.16s | Same, instant |
| Step buttons press | Face inverts | pointerdown, keys | Held at least 0.16s | Same |
| Story stage | Draft text cuts, previous draft struck above, card cuts in, rail marks the stage, from stage 4 the line in a hero-scale box (22px cells, 22 characters wide); the current row's 11px marker column and the card's 4px top rule take the stage hue; the scene is vertically centred | ScrollTrigger on the story (top top to bottom bottom), stage = floor(progress x 5); the scene is sticky for 5 x `--stage-len` (45svh) | Hard cuts | Not pinned: all cards listed with their drafts, final stage in the table |
| Strings-done strip | 40 blocks fill in whole blocks, each in its part's or chapter's hue | ScrollTrigger on the page | floor(progress x 40) | Same (state, not motion) |
| Chart build | clip-path inset steps, one step per block | First view (top 80%, once) | 25ms a block, years 80ms apart | Drawn |
| Picking a year | Plate row, inverted year, readout | Hover (mouse), click or tap, arrow keys | Instant | Same |
| Choice selector | Brackets jump to the choice | pointerenter, focus, arrow keys | Instant, never blinks | Same |
| Choice answer | Box cuts to the answer, rows cut in one at a time | Click, tap, Enter | `--d-row` 0.12s a row | All rows at once |
| Link gloss | Tag outline, then the German word; underline from dotted to solid | Hover, focus-visible; touch: on press, held `--d-gloss-hold` 0.4s after release | `--d-gloss` 0.16s, two steps | Tag and word at once |
| Character budget | Cells fill as you type; last five outlined in brick; over-budget input refused with a note | input, beforeinput | Instant | Same |
| Error | Hatched paper bar and message on the reserved line, thick left border | Invalid submit | Instant | Same |
| Radio tabs | Tab takes its hue block, swatch widens | change | Instant | Same |
| Checkbox stamp | Inner square at half size, then full | change to checked | `--d-stamp` 0.16s, two frames | Full at once |
| Success seal | Hollow frame, then the four strokes and a 4 degree turn | Valid submit | `--d-seal` 0.32s, two frames | Final seal |
| Dialog in | Page cuts in 24px right and 12px down, steps to place in three steps; a 4px page-edge block behind it narrows to nothing | showModal from either terms button | `--d-page` 0.24s, steps(1) keyframes | Instant |
| Dialog out | The same steps reversed, then close and focus back to the opener | Close, Escape, backdrop press | 0.24s (timer fallback 0.28s) | Instant |
| Sign-off sort | Selection sort of six square tiles across the content width (two rows of three on phones), markers at 13.75px: read marker scans, both tiles lift, cross, set down; sorted tiles turn plate | ScrollTrigger from the mark's bottom at the viewport bottom to the page end, scrubbed by whole frames | One frame per state | HARUKA, sorted |
| Position numbers | Number in each tile's corner | Hover a tile; touch: tap shows them 1.2s; keyboard: focus on the Shuffle button | Instant | Same |
| Shuffle and sort again | Replays the sort from a random order (at least three swaps) | Click, Enter, Space | `--d-sort` 0.16s a frame | Final state and the count |

## Lineage

| Effect | Descends from | What changed |
|---|---|---|
| Pointer engine: the text box | `crud-cartridge-stall` first-fit crate packing; glyph cells; `portfolio-isometric-artist` ruler tracking width | Text, not tiles, is packed: a greedy word wrap into a box whose width in characters the pointer sets, with overflow cells and a fits counter, per language. |
| Headline gloss | Ruby-like labels; headlines uncovered line by line (`cta-indie-game`, `portfolio-isometric-artist`) | Whole lines cut, and a second, smaller language arrives above three words a frame later and stays. |
| Load: the box opens | `nav-pirate-radio` frame sides switching on; `process-convoy-night` airlock | The frame is laid cell by cell clockwise from one corner (not side by side), then whole text rows, then the tabs. |
| Pinned scene: one line, five drafts | `portfolio-security-researcher` lifecycle stepping; `features-cyberdeck-kit` falling-block assembly | The content itself is rewritten: a string table row changes draft by draft, its previous draft struck above it, with a chapter card per stage. |
| Scroll-linked marker: strings done | `crud-memory-card` block gauge; `portfolio-disk-archivist` consolidation | 40 blocks fixed along the bottom edge, filled in whole blocks by page progress, each in the hue of the chapter or part it covers. |
| Chart: stacked block rows | `portfolio-isometric-artist` stacked slabs; `portfolio-disk-archivist` block map | Horizontal rows of character-cell blocks (one per 10,000 words), English then German in one row and a hollow row for editing, picked like a radio. |
| Toy: the choice menu | `story-speedrun-marathon` selector triangle; `faq-hint-hotline` dialling; accordions | A pair of brackets that jumps between dialogue choices (never blinks), and the box cuts to the answer row by row. |
| Primary button: the advance mark | `crud-memory-card` two-frame icon; `testimonials-capsule-club` coin drop | A text box's waiting chevron bobs only while hovered; the press doubles the frame and inverts the face. |
| Secondary button: the bookmark | `crud-memory-card` sticker peel; `portfolio-disk-archivist` shutter | A ribbon below the button lengthens in two steps on hover and is tucked away on press. |
| Text link: the gloss | `contact-privacy-helpdesk` box closing around text; `nav-game-museum` pin dropping | A tag cuts in above the link in two steps carrying the German for it, and the dotted underline turns solid. |
| Text field: the character budget | Capacity cells; `portfolio-isometric-artist` drafting ruler | One cell per character of the budget, exactly 1ch wide under the field, the last five in brick, over-budget input refused with a message. |
| Choice control | Tabs; `contact-privacy-helpdesk` radio diamonds | Radios drawn as language tabs with their hue block; a checkbox that is stamped in two frames. |
| Dialog: the next page | `footer-cartridge-publisher` pulled from a sleeve; `portfolio-disk-archivist` magnification | A page laid over the last one: offset 24 by 12px, three steps home while a flat page-edge block narrows to nothing. |
| Success: the seal | `nav-game-museum` date stamp in two frames; `pricing-net-cafe` receipt | A square invented name seal: hollow frame, then four strokes at a hard 4 degree turn, beside an echoed confirmation with a reference. |
| Wordmark: HARUKA sorted | `portfolio-disk-archivist` optimiser consolidation; `crud-cartridge-stall` tiles dealt back | Six letter tiles are selection-sorted from alphabetical order into the name, scrubbed by scroll, with read and write markers, position numbers and a keyboard replay. |

## Adapting

1. **Keep the problem operable.** Replace `LINES` with six real lines from the person's work, each in the languages they handle (`ja`, `en`, `de` keys, and the tab buttons with matching `data-lang`). Keep `WMIN` and `WMAX` around the real box widths of the medium. For a subtitler, a line of 42 characters and two rows: change `3` in `drawBox` and `renderBox` to two rows.
2. **Map the colours onto the tokens, keeping the jobs.** Ground, well and plate stay three tones of one hue. One hue per language, one per chapter (five), one for the toy, one for the success mark, one for the primary action. Recompute every contrast in the comments.
3. **Rewrite the story.** `DRAFTS` holds the five versions of one line; the table rows are static HTML; `LIMIT` is the box's character count. Each `.card` is a chapter with `data-hue` 1 to 5.
4. **Data.** `DATA` is words per year in thousands; a block is 10. `CONTACT` builds the links (delete a line to remove one). `ANSWERS` and the four `.choice` buttons are the toy.
5. **The wordmark.** `TARGET` is the name in capitals, one `.tile` per letter in the same order, and `ALPHA` the starting order as tile indices (alphabetical). Six letters span the content width as square tiles, `--tw` = (100cqw minus gaps) / `--cols` (6, or 3 in two rows under 768px); the letter size is `--t-tile`.
6. **Retime.** Every duration is a `--d-*` token; the pinned length is `--stage-len`. To drop the pin, remove the `.pin` toggle; the static list remains.
7. **In a framework,** render the markup statically, keep the plain-JS flows as one effect and the `gsap.matchMedia` branch as another that returns its cleanup (kills ScrollTriggers, destroys Lenis, removes the ticker and the `.pin` class).

| Token | Role |
|---|---|
| `--ground`, `--well`, `--plate` | Burgundy ground, darker wells (boxes, fields, strip, scrim base), lighter raised plates |
| `--paper`, `--tea` | Text and secondary text |
| `--gold-leaf` | Primary action and focus rings |
| `--navy`, `--navy-ink` | English line: filled block and readable tint |
| `--green`, `--green-ink` | German line: filled block and readable tint |
| `--ochre` | Japanese source line |
| `--rose`, `--slate`, `--sage`, `--plum`, `--brick` | Chapters and stages 1 to 5; brick also overflow |
| `--teal-grey` | Glossary and the choice toy |
| `--seal` | Success seal only |
| `--scrim`, `--hatch` | Dialog backdrop; the hatched error bar |
| `--font` | Departure Mono with system monospace fallbacks |
| `--t-mark` ... `--t-display`, `--t-box`, `--t-tile` | Type scale on the 11px grid (11, 13.75, 16.5, 22, 33; display 44 to 88; box 22 or 13.75; tiles 66, 110 (600px), 88 (768px), 110 (1100px), 176 (1280px)) |
| `--lh-small` ... `--lh-box` | Line heights in multiples of 5.5px |
| `--cell`, `--s1` ... `--s8`, `--gutter`, `--max-w` | 11px cell and spacing scale (5.5 to 132), side gutter, content width |
| `--notch`, `--tap`, `--hit` | Stepped corner (4px), button and field height (48px), minimum text target (44px) |
| `--block`, `--bar-h`, `--stage-len` | One chart block (11px from 768px, 8px from 600px, 6px on phones; 2px gaps), the strip height (33px), pinned length of one stage (45svh) |
| `--d-frame` ... `--d-sort` | Every duration the CSS and the script use |
