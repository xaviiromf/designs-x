---
title: Take a square
section: cta
subject: Wenning Vale Ornithological Society (fictional) asking members and local walkers to sign up for one uncovered survey square in its Winter Bird Count, 9 and 10 January 2027.
aesthetic: A marked-up survey map. Cool survey paper, OS-style grid blue, organiser's highlighter yellow and blue-black ink, lettered in one humanist sans with a condensed width for map labels.
mode: light
fonts:
  - Cabin (Google Fonts, variable with ital, wdth 75-100, wght 400-700)
js: Choosing a tetrad fills the detail panel under the map and renames the button "Take tetrad K"; submit is handled in JS (no request is sent) and swaps the form for a "Tetrad K is yours" confirmation, with a "Change my tetrad" button that reopens the map and form with the choice kept.
tags: [cta, sign-up, volunteer, map, grid, radio-group, survey, nature, form]
use_when:
  - The ask is to claim one specific slot from a small, spatial or tabular set (survey squares, allotment plots, stall pitches, litter-pick routes, rota shifts on a grid).
  - Showing which slots are already covered is itself the persuasion ("8 of 25 still need someone").
  - The audience includes beginners who need to see what they are signing up for before they type anything.
avoid_when:
  - The ask is a generic "join the list" with no slots to choose from. The map would be costume.
  - There are more than about 40 or fewer than about 9 options. The grid stops reading as a map or becomes a toy.
  - Dark-mode pages. Highlighter on paper is the whole metaphor.
---

## Why it works

**The one bold idea: the sign-up is the count area.** The 10 km survey square is drawn as a 5 x 5 grid of 2 km tetrads, lettered with the real DINTY atlas scheme: letters run up each column from the south-west and skip O (column one is A-E bottom to top, the last is V-Z). Every square is a radio button. The 17 covered squares are disabled and kept deliberately faint: a thin, pale grid-blue hatch and a weight-500 pencil letter, the way covered squares look on an organiser's paper map. The 8 that still need a counter are filled with highlighter yellow with bold ink letters, so the gaps shout and the eye finds them at once. Choosing one fills it with ink, rings it in highlighter, fills the detail panel directly under the map with that square's habitat and last year's tally, and renames the button "Take tetrad K". The heading, lead, key, detail panel and button all point at this one element.

**Real survey vernacular, not a "nature" theme.** Tetrads, atlas letters, an "SD" 100 km square prefix with eastings 70 to 80 and northings 60 to 70 on the grid lines, a 1:25,000 map and a recording card in the confirmation. There are no birds, leaves or field-notebook textures. The only drawing is the water: the River Wenning as an irregular meander that dips across one grid line, and Hollin Reservoir in a clear blue tint, with italic labels haloed in paper and set close to what they name, like printed map features.

**Yellow means "needs you" and nothing else.** It appears on the 8 open squares, the key swatch and the inset ring of the chosen square. It is the only warm colour on the page.

**Numbers do the persuading.** "Seventeen already have a counter. Pick one of the eight yellow tetrads, walk it for two hours between 8am and 3pm." The number is visible as eight yellow squares, so there is no big-stat block.

**One family, two jobs.** Cabin's lineage is British humanist sign and map lettering. At width 100 it sets the heading, body and form. At `font-stretch: 87.5%` it sets the tetrad letters (700 on open squares, 500 on covered ones) and every tetrad reference in text ("Tetrad K"), so map and copy speak with the same label voice. 87.5% rather than the full 75% condensed, because at 75% the I and J of column two turn into bare tick marks. Italic is used only for map feature names.

**One verb, one noun.** The heading "Take a square for the winter bird count" uses the plain word as the hook; the lead then defines the term once ("the 25 tetrads (2 km squares)") and everything after says tetrad: key "Your tetrad", empty state "Pick a yellow tetrad on the map", button "Take a tetrad" then "Take tetrad K", error "Choose a yellow tetrad on the map first.", confirmation "Tetrad K is yours."

**Beginners are answered in the form.** A checkbox, "I'm new: pair me with an experienced counter", sits above the button, and the fine print explains it: "New to this? Tick the box and a regular will walk your tetrad with you." The lead names the Wenning Vale Ornithological Society, so the section says who is asking.

**Quiet surroundings.** Flat colour, no cards, no shadows, no gradients. The form sits on the paper below a single `--rule` line. On desktop the atlas column (map, key, detail panel) is sticky (`top: 32px`) in columns 6-12, its top grid line sits on the cap height of the h2, and the detail panel sits directly under the square it describes. The left column is only heading, lead and form, so the button is above the fold at 1440x1000 and 1024x900. On phones the atlas follows the lead paragraph, so the choice comes before the fields.

**Accessory removed:** the plan gave the taken squares' letters a paper halo over the hatch. They read clearly without it, so it was cut. The halo is kept only on the two water labels, where map convention needs it.

**Deviations from the plan, on purpose:** event moved to Saturday 9 and Sunday 10 January 2027 (properly winter), confirmation date 2 January. Contact domain is `wenningvale-birds.example`. Tetrad K's copy is "Hollin Moss. Open moor south of the reservoir" because the reservoir is drawn on the M/N line, two squares north of K. Water is drawn opaque in a clear blue tint (`--water-fill`, mixed in oklch to keep its chroma) rather than at low opacity, because translucent blue over highlighter turned olive. The hatch is an SVG tile, not a repeating gradient, because gradients rendered at two densities depending on each square's sub-pixel position. Map letters use 87.5% width, not 75% (see above). The pairing checkbox replaced the plan's "Beginners walk with a regular counter", which contradicted giving a beginner a square of their own. On one-column tablets the map is capped at 520px and stays left-aligned (not centred), to keep the alignment rule and bring the form nearer the fold. Input borders use `--pencil`, not `--rule`, so field edges meet the 3:1 non-text contrast minimum.

## Do not touch

- **DINTY lettering and order.** A-Z without O, up each column from the south-west. Squares are placed with `--c` (column) and `--r` (grid row from the top) inline variables; the DOM order stays alphabetical so screen readers and arrow keys move A, B, C. Do not re-letter row by row.
- **Numbers name lines, not squares.** `.axis.e` and `.axis.n` are centred on grid lines with `calc(var(--i) * 20%)`. Do not centre them in the squares.
- **Radios first.** Each square is a visually hidden `input type=radio name=tetrad` followed by its `label.sq`. Styling relies on `input:checked + .sq` and `input:focus-visible + .sq`. Taken squares are `disabled` and styled by the `.taken` class, not `:disabled`, so locking the fieldset after confirmation does not restyle the map. Each label carries hidden text such as "Tetrad K, Hollin Moss, needs a counter".
- **Three square states only:** faint hatch with a weight-500 pencil letter (taken), yellow with a bold ink letter (open), ink with paper letter and a 3px highlighter inset ring (yours). Keyboard focus is a second ring 10px inside: grid blue, or highlighter on the ink square.
- **The hatch stays faint and identical everywhere.** `.sq.taken` and the key's `.sw.taken` use the same `--hatch-tile` at `--hatch-size`. A louder hatch makes the covered squares outshout the gaps.
- **Map has 0 radius and the grid lines are the 1px gaps** of the grid showing its blue background. Inputs and the button keep a 2px radius.
- **Water stays clear of the letters.** The river runs through the bottom third of row 4 (`--r:4`, the B-G-L-R-W row) and dips once across the line into F in row 5; the reservoir sits on the M/N boundary between the two letters. "River Wenning" sits just under the line in Q's top band. Feature labels must stay on paper or hatch: grid blue on `--water-fill` is about 4:1, below AA for 0.8rem text.
- **The detail panel never changes height.** The script appends an `aria-hidden` ghost copy of every open square's entry into `.detail`, and all children share one grid cell, so the panel is always as tall as its longest entry at the current width and the form below it (on phones) never jumps. The empty state has the same three-line shape (reference, prompt, explanation). The live content is the inner `#detail`, `aria-live="polite"`.
- **No dead ends.** The form has no `action`/`method`; submit is always intercepted. The confirmation keeps its "Change my tetrad" button (re-enables the map fieldset, hides `#done`, shows `#signup`, focuses the chosen square). The contact mailto opens with `target="_blank" rel="noopener"`.
- **Motion:** only the 120ms fill on selection. Reduced motion removes it.
- **No bird illustrations, no tally marks, no eyebrow over the h2.**
- **Heading level:** the section uses an h2 because it is meant to sit inside a page. Make it the h1 when the section is used on its own.

## Adapting

1. **Swap the tokens** below. Keep exactly one warm "needs you" colour against a cool paper, grid and ink.
2. **Re-letter and re-place the squares.** For a different grid, change `repeat(5, ...)` in `.grid`, the `20%` step in the axis rules, the axis numbers and the `.sq100` prefix, and each square's `--c`/`--r`. The corner northing is left out on purpose so it does not crowd the first easting. Open squares carry `data-place`, `data-habitat`, `data-species` and `data-birds`; the script reads only these, so rename the data attributes and the sentence in `show()` for another domain (for example plot size and soil for allotments).
3. **Redraw the water** (or roads, or market aisles) in the 0-100 SVG viewBox over the grid, and position the italic labels in percentages. Keep it to one or two features.
4. **Copy:** keep the lead's structure: when, what, how many are covered, how many need someone, how long it takes. Keep "Take" through heading, button and confirmation, define the slot noun once and then use only that noun. Keep a way for beginners to ask for company, and a contact.
5. **Wire the form:** the form has no `action` on purpose, so it can never navigate to a missing endpoint (a POST returns 405 on static hosts). The script validates that a square is chosen ("Choose a yellow tetrad on the map first."), then runs native validation on name and email, then shows the confirmation. Replace the confirmation swap with your real request (`fetch`, not a native submit), and build it from `new FormData(form)` before the script disables the map fieldset: a disabled fieldset drops the tetrad value.
6. **Longer copy** pushes the left column down; the atlas column stays sticky. Below 900px the layout is one column: heading, lead, map, key, detail, form, with the map capped at `--map-max-tablet`.
7. **Hatch colour:** the stroke inside the `--hatch-tile` data URI is a literal hex (`#C2D2E0`, `--grid` 25% into `--paper`) because CSS variables cannot reach into a data URI. Recompute it when you change `--grid` or `--paper`.

| Token | Role |
|---|---|
| `--paper` | Page and section background, taken-square ground, label halo |
| `--ink` | Text, chosen square, button fill |
| `--grid` | Grid lines, hatch source, links, focus ring, water labels |
| `--highlight` | Squares that need a counter and the chosen-square ring. Nothing else |
| `--pencil` | Secondary text, axis numbers, taken letters, input borders |
| `--rule` | The single divider above the form and confirmation |
| `--hatch-tile` / `--hatch-size` | SVG hatch tile for covered squares and the key swatch (9px) |
| `--water` / `--water-fill` | River line and reservoir fill |
| `--font` | Cabin with Gill Sans, Calibri, Trebuchet fallbacks |
| `--root-size` | Root font size, 106.25% (a 17px base) |
| `--map-width` | `font-stretch` for map lettering and tetrad references (87.5%) |
| `--t-xs` ... `--t-xl` | A hand-set scale on the 17px base (0.8, 0.9, 1, 1.25rem, then two clamps); `--t-lg` is the grid letters, `--t-xl` the h2 |
| `--lh-tight` ... `--lh-body` | Line heights: h2 1.05, place name 1.3, lead 1.5, body 1.55 |
| `--measure` / `--form-max` | Text measure (34em) and form width (26em) |
| `--s-1` ... `--s-9` | Spacing, 4 to 96px |
| `--map-max` / `--map-max-tablet` | Maximum atlas width including axes (600px; 520px below 900px) |
| `--axis` / `--axis-gap` | Gutter for the axis numbers (28px) and their gap from the grid (8px, 4px on phones) |
| `--swatch` / `--button-min` | Key swatch and checkbox size (18px), button minimum width (12em) |
| `--radius` | Inputs and button (2px). The map has none |
| `--fill-time` | Selection fill transition (120ms) |
