---
title: Pixel type designer, personal front end
section: about
subject: Ansel Okafor, a fictional type designer in Ghent who draws bitmap typefaces for games, handheld devices and small displays; his page lets the visitor edit his letters, test his three typefaces, read how one letter changed over five chapters of his working life, and commission a typeface.
aesthetic: "A drafting table at night: deep navy paper with a darker well and a raised plate, bone text, and ten print colours with one job each: brass for what you press, burgundy for ink, royal green for guides, five muted chapter hues, three chart hues. Everything sits on an 11px character grid."
mode: dark
fonts:
  - "Departure Mono (pinned npm package @proj-airi/font-departure-mono@0.17.0 on jsDelivr, SIL Open Font License). The only family: display at 44, 66 or 88px, h3 at 33px, lede 22px, body 16.5px, small 13.75px, always weight 400. Emphasis is colour, inversion, size and position. Its measured metrics (cap 0.73, x-height 0.55, descender 0.19, ascent 1.0, descent 0.27 em) place every guide line on the page."
js: "Runs a glyph editor that resets Ansel's own bitmap letters and re-sets a specimen with them, three bitmap typefaces drawn from data in canvas, a calendar chart, a type tester with a character map, a commission form with an in-page proof, a colophon dialog, a pushable pixel wordmark and a page-position size scale, plus the proofing load sequence and a pinned five-draft scene."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [about, portfolio, type design, bitmap font, pixel, glyph editor, specimen, type tester, canvas, pinned scroll, chart, form, dialog, departure mono, navy, gsap, lenis]
use_when:
  - A personal site for someone whose work is made on a grid (type, pixel art, embroidery, mosaics, LED signage) and can be handed to the visitor as a small working tool.
  - The person needs a commission form, contact links and a press note on one page, with real work shown rather than described.
  - A muted, print-like palette is wanted, with many colours that each stay in their lane.
avoid_when:
  - The person's work does not live on a grid. Then the editor, the guides and the size scale are decoration.
  - Content-heavy sites with many pages. This is one long page with five interactive systems.
  - Brands that need a proportional or display typeface. Departure Mono is the voice here, not a costume.
---

## Why it works

**The one bold idea: the visitor draws with his pencil, and his type answers.** The first screen holds an 11 by 14 cell glyph editor showing Ansel's lowercase a, with cap height, x-height and baseline guides drawn in royal green. Pressing or dragging toggles pixels (the first cell touched decides whether the stroke sets or clears), and the specimen line under it, "squares decide how a glyph reads", is re-set at two sizes (2px and 1px per font pixel) from his own bitmap alphabet, using the edited letter wherever it occurs and showing those occurrences in ink. Six tabs (a, e, g, s, r, o) choose the letter; "Restore his drawing" puts his version back. Nothing decays: the edit is real output. Everything else on the page repeats that idea at another scale: the headline gets the same guides, the story is one letter redrawn five times, the chart counts glyphs, the toy sets text in his three faces, the wordmark is made of the same pixels.

- **Ten hues, one job each.** Brass (#D9BE6A) is only what you press and focus: the primary buttons, focus rings and the field caret. Burgundy is ink: the readable tint #E79AA9 for set pixels in the editor, the edited letter in the specimen and the wordmark; the block #8A2A3F only for the empty home cell a pushed wordmark pixel leaves. Royal green is guides: the readable tint #8FD1AE for baseline, x-height and cap-height lines (editor, headline, links, fields, the character preview); the block #1F6B4A for guides at rest inside the five draft drawings. Terracotta, mustard, sage, periwinkle and mauve are chapters 1 to 5 and their drafts, and nothing else. Teal, sand and rust are the three bands of the chart; rust also marks what lies beyond the basic alphabet in the tester (a hollow box for a glyph a face lacks). Errors use no hue at all: a hatched bone bar, a dashed bone border and bone text. Text is one neutral, bone, and every large area stays on navy, its darker well or its raised plate, so ten hues never read as confetti.
- **The grid is literal.** The face is drawn on an 11px grid, so the spacing scale is 5.5 to 132px in half and whole 11px cells, sizes are multiples of 11 (display 44, 66 or 88px set by breakpoints, never a free clamp), line heights are multiples of 5.5, and the size scale on the left marks 11, 22, 33, 44 and 55px. Being a monospace, the face also measures: a field's measure is reported in cells, the caret is one cell wide, columns are set in ch.
- **Real metrics, not guesses.** The script measures Departure Mono's cap height, x-height, descender, ascent and descent from canvas and writes them as `--m-*` tokens. Guide lines on the headline, the links and the fields are computed from those, so they sit on the actual baseline and x-height of whatever face loaded, including the system monospace when the CDN is blocked.
- **Scale after the first screen.** Running text is `--t-body` 16.5px everywhere (section intros, chapter cards, rules, the Now list, the readout); 13.75px is only for labels, captions, legends and table cells. Section headings are `--t-h3` 33px. The character map cells are at least 66 by 88px, so the map reads as a specimen.
- **Structure.** The eight parts in order: top (name and role, claim, lede, two buttons, the editor), Now (a `dl`), The story so far (a pinned scene of five drafts of one g), By the numbers (a 36-block calendar), The type tester, Things I believe (six rules with text links), Say hello (contact links built from `CONTACT`, the commission form, the colophon button), and the ANSEL wordmark.
- **Semantics.** The page is one `section` labelled by its `h2`; parts are nested `section`s with `h3`s; the sign-off is a `footer`. The editor is a `role="grid"` with `role="row"` and `role="gridcell"` cells carrying `aria-selected` for set pixels, a roving tabindex and a description of the controls. Each draft canvas is `role="img"` with a description of that draft. The calendar is a group of 36 buttons with `aria-pressed`, an `aria-live` readout and a "Read the figures as a table" disclosure. The tester lists, under each row, the characters that face has not drawn yet, so the canvases are never the only carrier. The colophon is a native `dialog` whose title is an `h2`.
- **Flows.** The form validates in JavaScript (`novalidate`) with messages that say how to fix the problem ("Pick a size from 5 to 32 pixels; 3 is too small to hold a lowercase"), `aria-invalid`, `aria-describedby`, a reserved two-line error area and focus on the first bad field. Errors clear as soon as the value becomes valid. Success is a proof slip that echoes every value, takes focus on "Proof sent." and offers "Change this", which brings the form back with the values kept. Nothing is sent.
- **Nearest designs in the ledger, and how this differs.** portfolio-chiptune-composer and portfolio-disk-archivist are the other app-like portfolios; neither lets the visitor change the person's actual output. footer-cartridge-publisher's wordmark is dust sampled from a face and blown by a breath; this wordmark is 236 hand-placed pixels that each step exactly one cell, and never leave the grid. faq-handheld-clinic and gallery-demoparty build things in by threshold or bit depth; the drafts here are five whole drawings, each replacing the last.

Deviations from the brief, and why:

- **Six letters to edit are a, e, g, s, r, o**, the letters of the specimen line that most change its colour. The whole Schelde alphabet is drawn, so the specimen is set entirely from his bitmaps.
- **The block caret shows whenever a single-line field has focus**, at the end of the text; the native caret is hidden only while it also sits at the end. Moving the native caret to the end on focus (tried first) fought programmatic selection and typed into the wrong place.
- **On short desktop windows (height 760px or less) the editor's two help lines are visually hidden**, kept for assistive tech as the grid's description and the specimen's alternative, so the editor and both buttons fit above the fold at 1280x600 and 1366x650.
- **On phones and tablets the size scale is a strip along the bottom edge**; the "a" is still drawn at the marked size, in a slot of its own at the strip's right end, on a baseline 10px above the bottom edge placed with the measured metrics (a lowercase a at 55px is about 30px tall, which fits the 44px strip).

## Do not touch

- **The 11px grid.** Type sizes, line heights, spacing, the editor cell on desktop (18 to 33px) and the size scale are tied to it. A size that is not a multiple of 11 blurs Departure Mono.
- **`--m-*` metrics come from the script.** The CSS defaults are Departure Mono's values; the script overwrites them from the face that actually loaded. Guide positions in `.tl-t`, `.fld-base` and `.fld-caret` are formulas on those tokens; hard-coding pixel offsets breaks them for the fallback face.
- **The editor's data model.** `ORIG` and `ED` hold each editable letter as an 11 x 14 bitmap. `trim()` cuts it to its drawn columns for setting, so a wider or narrower edit changes the spacing of the specimen too. Do not replace the specimen with live text: the point is that it is set from his bitmaps.
- **Hue jobs.** Ink is never used for anything but set pixels; green never for anything but guides; brass never for decoration. Chapter hues appear only in their chapter and its draft. Errors stay hueless.
- **Pixel corners live on `.btn-rim` and `.btn-face`**, never on the `<a>`/`<button>`, so focus outlines, size marks and anchor points are never clipped.
- **Presses are held.** `.is-down` stays at least `--d-press` (150ms) from `pointerdown` (also on Enter and Space), and `.tl.is-press` holds a touched link's guides `--d-link-hold` (250ms). These work without the libraries.
- **Hidden pre-load states exist only under `html.js:not(.go)`** and are undone under reduced motion. If the CDN is blocked the `js` class is never added and every system (editor, tester, chart, form, dialog, nudge, size scale, story drawings) works in plain JavaScript.
- **One loop.** Only the wordmark uses `gsap.ticker`, and only while a pixel is out of place or the pointer is over it; it sleeps off screen (IntersectionObserver). Everything else redraws on events.

## Motion

House stepping: hard cuts on a visible frame. Nothing eases; every change is a visibility, opacity or canvas-pixel cut timed by the `--d-*` tokens (read by the script with `dur()`). Lenis runs on `gsap.ticker` with `autoRaf: false`, `lagSmoothing(0)` and `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling. The load waits for `document.fonts.load('16px "Departure Mono"')` raced with a 1.5s timeout, and for a visible page. Everything is built inside `gsap.matchMedia` (motion, reduce, fine); the cleanup kills timelines and delayed calls, removes the ticker and listeners, disconnects the observer, destroys Lenis and restores the static page.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Headline lines cut in | Line split from measured line boxes, visibility cuts | Load (font ready, page visible) | One line every `--d-line` 160ms | Visible |
| Headline metrics | Cap height, x-height and baseline lines with their names, full width of each line | With each line | Shown `--d-metrics` 600ms, then cut out; the last line's baseline stays as the `--guide` rule | Rule only |
| Lede, then buttons | Visibility cut | After the last line | +160ms apart | Visible |
| Proofing the editor | The empty grid with guides cuts in, then ink row by row from row 1 to 14 | Load, 120ms | 14 cuts, `--d-ink` 30ms apart | Inked |
| Specimen set word by word | Canvas redraw, whole words | After the ink | `--d-word` 90ms per word | Set |
| Pencil (pointer engine) | DOM cells toggled; a Bresenham run fills every cell a drag crosses; first cell decides set or clear | pointerdown and pointermove (mouse, pen, touch drag; `touch-action: none` on the grid); hovered cell outlined in bone | Instant per cell; specimen redrawn on the next frame | Same |
| Editor, keyboard | Roving tabindex in `role="grid"` | Arrows, Home, End; Space or Enter toggles | Instant | Same |
| Five drafts of the g (pinned scene) | Sticky stage on a 420svh track; ScrollTrigger progress in fifths picks the chapter; each chapter's canvas holds its draft solid over inset outlines of all earlier drafts, with the chapter card beside it; the stage is vertically centred and its cell is up to 44px (44px at 1440x900, 32px at 1366x650) | Scroll | Hard cut between chapters; the year strip fills the current chapter in its hue | No pin: five chapters in a list, each with its own drawing |
| Size scale (scroll-linked marker) | Fixed scale at the left edge (bottom strip under 1100px); marker and an "a" set at 11, 22, 33, 44 or 55px | Scroll, the five fifths of the page | Hard step per fifth | Same (plain JS) |
| Calendar | 36 blocks across the full content width, 88px tall (66px on phones); selected block framed in bone with a bar above it, readout rewritten | Mouse hover, tap or click, focus; arrows move by month and row, Home, End | Instant | Same |
| Type tester | Canvas redraw in three faces, missing glyphs as rust hollow boxes | input, scale chips x1, x2, x3 (3, 6, 9px per pixel; x2 by default) | Instant | Same |
| Character map preview | Glyph drawn on its full cell with grid and baseline, plus cell size and advance | Mouse hover, focus, tap; arrows move in the map | Instant | Same |
| Primary button, emboldened | `::before` and `::after` copies of the label 1px and 2px to the right; a row of size marks above the top edge | Hover (hover devices), focus-visible | 1px at once, then 2px and the marks after `--d-smear` 70ms | Both at once |
| Primary press | Face inverts to well with a brass label; the smear is removed | pointerdown, Enter or Space | Held at least `--d-press` 150ms | Same |
| Secondary button, anchor points | Four hollow square anchors cut in clockwise from top left, a fifth at the top centre | Hover, focus-visible | `--d-anchor` 40ms apart | All at once |
| Secondary press | All five anchors fill solid; face inverts to bone with a navy label | pointerdown, Enter or Space | Held at least 150ms | Same |
| Text link, the guides | x-height line above the lowercase, descender line below, both 6px past each end; the baseline underline goes from 1 to 2px | Hover, focus-visible; touch: on press, held `--d-link-hold` 250ms | x-height line at once, descender line after `--d-guide2` 50ms | Both at once |
| Text field, caret and count | A steady brass caret cell after the text, the measure in cells above the text's right end, the baseline as a green guide across the field | focus, input, selection change | Instant | Same |
| Field error | Hatched bone bar, dashed bone border, message in the reserved line | Invalid submit | Instant; cleared when valid | Same |
| Stepper (choice) | Previous and next buttons cycle four values; pressed button inverts | click, Enter, Space | Instant, press held 150ms | Same |
| Toggle (choice) | Two pixels, one set and one clear, swap | change | Instant | Same |
| Colophon dialog in | The title alone at 11px, then 22px, then 44px in a frame that grows, then the full sheet; Close takes focus | Read the colophon (two openers) | One `--d-frame` 80ms frame each | Instant |
| Colophon dialog out | 44, 22, 11, gone; focus returns to the opener | Close, Escape, backdrop press that started on the backdrop | 80ms each | Instant |
| Success, the proof | Four crop marks cut in one after another, then his three typeface names each set in itself, then "Proof sent." and the echoed details | Valid submit | `--d-crop` 90ms per mark, then `--d-proof` 140ms steps | Instant |
| Wordmark push | Each pixel within two cells of the pointer aims one whole cell directly away (eight directions); every 60ms each pixel steps one cell toward its target; the home cell shows in burgundy block while empty | pointermove (mouse), pointerdown and drag (touch, `touch-action: none` on the wordmark) | `--d-home` 60ms per cell; the loop sleeps when everything is home | Still name |
| Wordmark nudge (keyboard) | The whole word one cell right, then back | "Nudge the name" button | Held `--d-nudge` 240ms | Same (a single hard shift) |

## Lineage

| Effect | Descends from | What changed |
|---|---|---|
| Glyph editor (pointer engine) | faq-handheld-clinic's LCD you press; cta-indie-game's lattice cells; portfolio-disk-archivist's block map | The cells are not a field that reacts and recovers: they are a font's pixels. The pointer is a pencil whose first cell fixes set or clear, nothing decays, and the change is used at once to set real text. |
| Headline metrics | testimonials and other collision-box overlays; the gloss over headline letters | Not boxes around glyphs: three typographic guide lines named at the right edge, measured from the face, held 600ms per line, leaving only the last baseline. |
| Proofing load | portfolio-disk-archivist's outcomes developing class by class; faq-handheld-clinic's LCD powering through levels | Ink arrives row by row from the cap height down in 14 hard cuts, then whole words are set; no levels or classes. |
| Five drafts of one g | gallery-demoparty's tiles built by bit depth; portfolio-isometric-artist's construction floor by floor | Nothing is built up: five complete drawings replace each other, and history stays visible as cell-accurate inset outlines in each chapter's hue. |
| Size scale | nav-pirate-radio's tuner needle; range steps | Not a frequency or a progress bar: a ruler of type sizes, with the marker carrying a real letter at the marked size, stepping in page fifths. |
| Calendar chart | portfolio-disk-archivist's block map; stepped bars | 36 months on a 12 by 3 calendar; each block fills in four steps by total and splits into three glyph kinds. |
| Type tester | portfolio-chiptune-composer's pattern grid with a cursor; gallery-demoparty's filter chips | Text set live in three bitmap faces from data, with honest hollow boxes; the map previews a glyph on its own cell with size and advance. |
| Primary button, emboldened | portfolio-isometric-artist's editor zoom grid; portfolio-chiptune-composer's pulse-width edge | A synthetic bold made by doubling the label 1px then 2px, with size marks above; press removes it on an inverted face. |
| Secondary button, anchor points | team-fighting-game's lock-on brackets; contact-hackerspace's echo rectangles | Vector-editor anchors at the corners, clockwise one at a time, plus one at the top centre; they fill solid on press. |
| Text link, the guides | contact-privacy-helpdesk's box closing around the text; portfolio-security-researcher's endpoints | Two horizontal font guides (x-height and descender) that overshoot both ends, plus a thicker baseline; no box, no nodes. |
| Text field, caret and count | portfolio-chiptune-composer's current-row band; a credits display | A steady caret cell, the text's measure in cells, and the field's baseline as a guide. |
| Choice controls | testimonials-capsule-club's rotary selector; a lever | A three-part stepper that goes round; a toggle that is two pixels swapping state. |
| Colophon dialog | portfolio-disk-archivist's three-step magnification; footer-cartridge-publisher's page laid over | The panel does not scale: its title is reset at three real type sizes in a frame that grows around it. |
| Success, the proof | pricing-net-cafe's receipt printing; nav-game-museum's seal stamp | A printer's proof: crop marks one by one, his three typeface names set in themselves, then the details. |
| Wordmark | footer-cartridge-publisher's dust that walks home; painted cells | 236 hand-placed pixels; each moves exactly one cell straight away from the pointer and steps home one cell per 60ms, always on the grid; keyboard nudge. |

## Adapting

1. **Find the person's grid.** The editor only makes sense if the work is made of cells. Replace `SCHELDE_SRC`, `EDIT_CHARS` and `SPECIMEN` with their own unit (stitches, tiles, LEDs) and keep the rule that an edit changes real output.
2. **Replace the faces.** Each face is `face(name, width, height, capRow, baselineRow, gap, space, boxWidth, source, upperOnly)`; glyphs are `'#'`/`'.'` rows joined by `/`, optionally `[firstRow, rows]`. The tester and character map pick up whatever is defined. Missing characters show as hollow boxes automatically.
3. **Redraw the drafts.** `D` holds five 11 x 14 drawings (rows 5 to 13 given). Change the chapter cards in the HTML to match; keep one hue per chapter.
4. **Data and links.** Edit `DATA` (month triples plus a face index) and `CONTACT` (delete a line to remove a link; known keys email, whatsapp, github, mastodon, instagram, itch; any other key with a full URL becomes a link).
5. **Colours.** Map the hue tokens keeping their jobs. Keep a readable tint for any hue that draws essential pixels or lines (ink, guides) and a block shade only for decorative marks. Recompute contrast on navy and well.
6. **Retime.** Every duration is a `--d-*` token. To drop the pin, remove the `html.fx .story-track` height and the chapters stay a list. To drop the wordmark push, delete the pointer listeners in the motion branch; the name and the nudge remain.
7. **In a framework,** render the markup statically, keep the plain-JS systems as mount effects, and port the motion branch as one effect that returns the `gsap.matchMedia` cleanup.

| Token | Role |
|---|---|
| `--navy`, `--well`, `--plate` | Ground; wells (editor grid, fields, chart blocks, scrim); raised plates (dialog sheet, cell rules) |
| `--bone`, `--fog` | Text and specimen pixels (11.9:1); secondary text, rims (8.5:1) |
| `--brass` | Primary action and focus: buttons, rings, the field caret (7.8:1; navy on it 7.8:1) |
| `--burgundy-ink`, `--burgundy` | Ink: set pixels, edited letters, the wordmark (6.5:1 on navy, 7.7:1 on well); block for empty home cells (1.7:1, decorative) |
| `--guide`, `--royal-green` | Guides: baseline, x-height, cap height and their names (8.0:1); block for guides at rest in the drafts (2.2:1, decorative) |
| `--terracotta`, `--mustard`, `--sage`, `--periwinkle`, `--mauve` | Chapters 1 to 5 and their drafts (5.3, 6.2, 7.1, 6.2, 6.0:1) |
| `--teal`, `--sand` | Chart bands: letters (6.0:1); figures and punctuation (8.7:1) |
| `--rust` | Beyond the basic alphabet: accents and box-drawing in the chart, hollow boxes in the tester (3.8:1 on navy, 4.5:1 on well; non-text only) |
| `--scrim` | Dialog backdrop, the well at 88% |
| `--font` | Departure Mono with ui-monospace, SF Mono, Menlo, Consolas, monospace |
| `--t-small` ... `--t-display` | 13.75, 16.5, 22, 33 and 44/66/88px by breakpoint and height |
| `--lh-small` ... `--lh-h3` | 22, 27.5, 33, 38.5px (multiples of 5.5) |
| `--m-asc`, `--m-des`, `--m-cap`, `--m-x`, `--m-dsc` | Face metrics in em, measured by the script; drive every guide line |
| `--cell`, `--s1` ... `--s8` | The 11px cell and spacing from 5.5 to 132px |
| `--tap`, `--hit`, `--notch` | Button and field height 48px, minimum target 44px, stepped corner 4px |
| `--max-w`, `--gl`, `--gr` | Content width 1232px; gutters (left gutter 132px from 1100px for the size scale) |
| `--ec` | Editor cell: 18 to 33px from the window height on desktop, 22px on tablets, up to 22px on phones (the pinned drafts use their own cell, up to 44px, from the window height) |
| `--d-*` | frame 80, press 150, link-hold 250, guide2 50, anchor 40, smear 70, line 160, metrics 600, ink 30, word 90, home 60, nudge 240, crop 90, proof 140 (ms) |
