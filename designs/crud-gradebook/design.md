---
title: Green pen mark book
section: crud
subject: The mark book of Ms Adaeze Okafor, who teaches science at Northfield Academy, a fictional UK secondary school, across three classes (9X1 Science, 10C Chemistry, 11B Physics), with students, weighted assessments and GCSE 9 to 1 grades.
aesthetic: A classroom whiteboard with aluminium trim, the UK green-pen marking policy and the purple pen of progress, and the angled column titles of a paper mark book.
mode: light
fonts:
  - Inclusive Sans, variable 300 to 700 with italic (Google Fonts), the only family
js: Runs a gradebook CRUD for classes, students, assessments and marks (typed fields with per-type validation from one schema, inline mark entry with keyboard navigation, weighted averages, class means and GCSE grades, search, sort and a below-target filter, details accordions, add and edit dialogs with cancel, delete with confirmation and a persistent undo, sessionStorage with an in-memory fallback, reset, aria-live outcomes and runSelfTest() at #selftest), choreographed with GSAP and smooth-scrolled with Lenis.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Flip), Lenis 1.3.26]
tags: [crud, gradebook, mark-book, school, teacher, grades, weighted-average, table, inline-editing, form, dialog, undo, strip-plot, flip, gsap, lenis]
use_when:
  - People enter many numbers into a grid, and each number changes a few derived figures (marks and averages, timesheets and totals, scores and standings, stock counts and reorder levels).
  - The derived figures matter more than the raw entries, and users need to see which ones a single edit touched.
  - The domain has a paper form with columns too narrow for their titles, so angled headings are honest.
  - The page can afford a scripted, choreographed section (detailed tier).
avoid_when:
  - Records are mostly text, or nothing is computed from them. The signature would have nothing to show.
  - More than about ten numeric columns. The grid then scrolls sideways inside its frame, and a spreadsheet is the better tool.
  - A dark, glanceable monitoring view, or a brand that needs a loud accent everywhere. Purple here means only "just changed".
  - A page that must work without JavaScript. The mark book is built by its script.
---

## Why it works

**The bold idea: mark propagation.** When a teacher commits a mark (Enter, an arrow key, Tab or leaving the cell with a changed, valid value), the numeral settles into the cell in green-pen ink. A faint purple wash then spreads outward along that student's row and that assessment's column, cell by cell in order of distance (TR3, 0.07s per cell). When the wash reaches the row's Average cell, the average rolls from the old value to the new one (SC13), a purple delta chip appears beside it, and the Working at grade updates. When it reaches the column's Class mean cell, the mean rolls too. The class average in the hero sentence, the Class mean row and the app bar rolls last. The chain takes about 1.2s and shows the dependency: this mark changed this student's average and this assessment's mean, and nothing else. At 390px the same wash runs down the student's open marks list and up to the average in the row head, and each line's own "mean" rolls. Under reduced motion every figure updates at once and the chip still appears.

The demo edit is Tolu Adeyemi, Atomic structure test, 21 to 24. Tolu's average goes from 70.0% to 72.7% (up 2.7, grade 7 to grade 8). The Atomic structure test mean goes from 62.5% to 63.8%, and the class average from 63.1% to 63.4%. The live region then reads: "Tolu Adeyemi, Atomic structure test: 24 out of 30. Average now 72.7%, up 2.7. Now working at grade 8. Atomic structure test mean now 63.8%." The self-test asserts every one of these values.

- **The colours are the marking policy.** UK schools mark in green pen, and students answer feedback in the "purple pen of progress". Green (#0B7A4B) is the teacher's ink: the mark just entered, the primary buttons and the focus ring. Purple (#6B3FA0) appears only for what has just changed: the wash, the delta chip and the pulse on a row that has just been added or restored. Correction red (#B42828) is kept for errors, delete and below-target grades, and below target is always written as words ("5 below", "below target 6"), not shown by colour alone. Navy ink (#1E2A4A) sits on cool whiteboard melamine (#F7F9F9). Every rule is aluminium trim (#7A848B), never green, so the grid cannot be mistaken for crud-ledger's green analysis pad.
- **Paper mark book headings.** Assessment titles are written at -60 degrees above narrow mark columns, as teachers write them in a paper mark book, so long titles fit over 6rem columns. The hit target is the upright cell under each title, 44px tall and the full column width, showing "/30" (and "*" when the assessment does not count). The rotated title is only its picture, and it is `pointer-events: none`, so neighbouring titles never steal clicks. The cell opens that assessment in the list below and moves focus to it.
- **One type family, chosen for marks.** Inclusive Sans was drawn so that 1, l and I, and 0 and O, never pass for one another. That matters in a grid of handwritten-style marks and in names from many languages (Mateusz Kowalski, Amara Mensah, Finn O'Sullivan). The class name is set at 700 with -0.02em tracking, headings at 650, marks and averages at 600 and the angled titles at 500, 13px. Italic is used once, for the "* Does not count toward the average" note. The face has no tabular figures: we measured '1111' at 79.05px and '0000' at 104.64px at 40px, with and without `tabular-nums`. So every figure is right-aligned in a fixed-width cell. The rolling figures in the hero sentence and the app bar get a min-width during a roll, so the sentence does not shift.
- **The reading ruler (P1).** On a fine pointer, a translucent aluminium bar one row tall slides behind the hovered row (CSS transform, 0.28s, power3.out), and a faint band marks the hovered column. The row's name and the column's title turn green-pen. The native cursor is untouched. The ruler also follows keyboard focus into any name or cell, parks on a tapped row on touch, and runs on the assessments list too. It teaches the row-and-column reading that the signature then uses.
- **Numbers are computed, never typed.** Every mark is seeded in `seed()`. The hero sentence, averages, means, grades, strip plots and the below-target count all come from it. The weighted average is the sum of (mark / out of x weight) over counted, marked assessments, divided by the sum of their weights. A blank mark means "not handed in" and is left out, while a 0 counts. The class average is the mean of the students' averages. Grades come from the boundary table (9 from 80% down to 1 from 10%, U below), applied to the figure as shown (rounded to one decimal place). So Kwame Boateng's 64.0% is a 7, even though the floating-point value is 63.999.
- **Strip plots instead of stat tiles.** Each assessment row carries a 120px dot strip of that assessment's marks, with a tick at the mean, and the text beside it says the same thing ("lowest 12, median 18.5, highest 26"). The open row shows a larger strip, a caption and the facts. The dots travel out from the mean tick once, on enter (S3). They are never scrubbed, so the plot is never wrong at rest.
- **Fast entry.** Up, Down and Enter always move between rows. Left and Right move between cells only when the caret is at the start or end of the input, or the whole value is selected, so caret movement inside a mark still works. Esc puts the stored mark back, Tab follows document order, and focusing a cell selects its value. An invalid mark turns the cell border red, sets `aria-invalid`, and reveals a message under the row, linked by `aria-describedby`: "Ciara's mark must be a whole number from 0 to 30. Leave it blank if not handed in." A teacher pressing Enter about once a second never queues animations: each commit completes the chain in flight (`progress(1)`) before starting its own, rolls use `overwrite: 'auto'`, the live message is debounced 600ms so only the latest commit is read, and the delta chip shows the change from the last commit, not a running sum. Rows do not re-sort under the teacher's hands. The order refreshes on the next sort, search or filter.
- **CRUD with one schema.** `SCHEMA` lists every field of a student (text name, integer candidate number unique in the class, a choice of target grade 1 to 9, decimal attendance to one place, a joined date no later than today, a boolean for extra time), an assessment (title, kind, date set, out of 1 to 200, weight 0.5 to 5, counts toward the average) and a class (name, year group 7 to 11, room). That one list builds the dialog form, parses each type and supplies its error. Cross-field rules sit beside it: "4102 is already Tolu Adeyemi's number." and "Marks for this assessment go up to 26. Use 26 or more." Delete asks first ("Delete Atomic structure test? Its 8 marks go too. You can undo straight after."), removes the marks with the record, and leaves an untimed toast whose Undo restores both. Data lives in sessionStorage under `gradebook.v1`, with every access in try/catch and an in-memory fallback. Reset is in the class menu and the footer.
- **390px is a list, not a scroller.** Below 900px each student is one row (name, average, target), and the accordion holds that student's mark inputs, each with its assessment title, the class mean and "/30", then the details. Nothing scrolls sideways.
- **Reasoned defaults.** The light ground follows from the whiteboard and from daytime marking. The rules carry meaning only: the grid frame (14px radius, the board's rounded frame), the header rule and a single rule above Class mean, with no rules between student rows. Radii follow hierarchy: 4px chips, 8px buttons and fields, 10px menu, 14px frame and dialog, and fully round only for the switch and the grade pill. The only shadow is on the dialog sheet.
- **Cut at critique.** Three stat tiles in the hero (now one sentence whose figures roll); scroll entrances on the assessments and footer (the only scroll moments left carry data); scrubbed strip plots (wrong mid-scroll); scrambled candidate numbers; a cursor-replacing follower (now the ruler behind the row); hovering rows that lifted; Lexend, which three other designs use for the same reason; the "Add student" and "Add assessment" buttons repeated under the hero (the bar and the Assessments heading already carry them); and, as the last accessory removed, millimetre ticks along the ruler's edge.

## Motion

All library motion lives in `gsap.matchMedia` with the conditions `motion`, `reduce`, `fine` and `wide` (900px). The house ease is expo.out (`--ease-out`) for entrances, power3.out (`--ease-follow`) for rolls and followers, and none for the scrub. Closes run at about 60% of the open duration. Lenis runs from `gsap.ticker` (`autoRaf: false`, lerp 0.1). It is stopped while the class menu or a dialog is open. After every accordion settles and after every Flip, `lenis.resize()` and `ScrollTrigger.refresh()` run. Anchors go through `lenis.scrollTo`, and focus then moves to the target. The first-frame hidden states exist only under `html.js.intro`. GSAP takes them over inline, and the class is removed if the CDN is blocked, after 2.5s, or under reduced motion.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Bar rule draws; bar items drop in | LD8 | load, after `document.fonts.ready` (700ms cap) | rule scaleX 0.6s; items y -8, 0.5s, stagger 0.04 | static |
| Class name rises from its line mask | TX1 | load at 0.15s; class change, reset, new class | yPercent 110 to 0, 0.9s, stagger 0.08 | static |
| Context and summary fade; class average rolls | SC13 | load at 0.35s | fade 0.5s; roll from value minus 4, 1.0s | final values |
| Visible rows ripple in; angled titles clip in along their baseline | TR3 | load at 0.45s | 0.5s, step 0.03 by row and by column | static |
| Averages and Class mean roll | SC13 (S2) | Class mean row reaches top 85%, once per class load (on desktop usually at 0.9s) | 1.1s, stagger 0.04, from value minus 4 | final values |
| Title hand-off: the class name steps back, the bar label "9X1 average 63.1%" clips in | S1 scrub | hero from top to bottom 120px, from 700px wide (the label is hidden below) | scale 0.94, opacity 0; clip-path; ease none | label always visible, title static |
| Strip-plot dots travel from the mean tick | TR3 (S3) | each strip at top 90%, once; again when a row opens | 0.6s, step 0.03 by distance from the mean | dots in place |
| **Mark propagation** | SIG: TR3 wash + SC13 rolls | a committed mark | settle 0.35s; wash 0.14s in, 0.5s out, 0.07s per cell; rolls 0.6s; hero last; about 1.2s in all | instant values, chip shown |
| Reading ruler and column band | P1 (CU-style) | fine-pointer hover; focus; tap | CSS transform 0.28s power3.out | jumps |
| Primary buttons fill from the entry edge, leave by the exit edge | HV4 + MI1 | hover, focus-visible; press | 0.4s in, 0.3s out; press 0.97 at 0.12s, release 0.4s | colour only |
| Wordmark, names, text buttons | HV2 + MI1 | hover, focus-visible, active | 0.35s underline from the entry side | static underline |
| Angled titles: highlighter wipe along the text axis | HV3 | hover, focus-visible | 0.35s in; leaves to the far end, then resets invisibly | instant |
| Class menu: panel clip-reveal, items ripple from the open class, indicator glides | NV4, TR3 | button, arrow keys | panel 0.45s (close 0.25s); items step 0.03; indicator 0.3s | instant |
| Search, sort, filter reflow | CD5 Flip | input (debounced 120ms), change | 0.45s (sort 0.6s, stagger 0.02); leavers fade 0.2s, absolute on leave | instant |
| Student details and assessment rows open | CD6 | name or row button | grid-template-rows 0.55s (close 0.35s); text fades in, step 0.03 | instant |
| Mark error message | MI4 | invalid commit | grid-template-rows 0.25s | instant |
| Dialogs | CD7 | add, edit, rename, delete, reset | backdrop 0.3s (CSS); sheet clip from the top 0.5s; fields ripple, step 0.03; close 0.25s | instant |
| Save label swap, then row Flips in with a purple pulse and focus | MI2 + CD5 | valid submit | 0.35s swap; pulse 0.18s up and down | instant, focus moves |
| Delete collapse | CD6 | confirm | grid-template-rows 0.35s and fade | instant |
| Undo toast | clip + rise | delete | 0.45s | instant |
| Switch knob, ticks, grade pill, select chevron, clear button | MI4, NV4 | change, hover | 0.2 to 0.3s | instant |

Touch: no hover effects (they live under `@media (hover: hover)`), the ruler parks on tap, buttons answer with the press scale and an `:active` underline, Lenis leaves touch scrolling native. The keyboard reaches every control. Only the native modal dialog holds focus, and Esc closes it.

## Do not touch

- **Purple means "just changed".** Do not use it for links, headings, charts or decoration. Green is ink and actions, red is errors, delete and below target, and rules are trim.
- **Figures are computed.** Never type a number into the copy. Keep `round1` before `grade()` so the grade always matches the figure shown, keep blank (not handed in) different from 0, and keep the weighted-average formula in `studentAvg`.
- **The fast-entry contract.** `chain.progress(1)` before each new chain, `overwrite: 'auto'` on rolls, the 600ms live debounce, and the delta measured from the last commit. Without these, a teacher typing at speed gets stacked animations and a stream of announcements.
- **Arrow-key rules in cells.** Left and Right move only from the caret's edge or a full selection, and `nextCell` stays covered by the self-test.
- **Angled titles stay pictures.** The upright cell is the target. Making the rotated text clickable brings back overlapping hit areas.
- **Flip with `absoluteOnLeave`, not `absolute`.** Absolutely positioning every row collapses the list mid-animation and drags the Class mean row over the students. The foot and empty state are Flip targets too.
- **Hidden first frames only under `html.js.intro`.** The rows hidden for the first frame are the same rows the intro animates, so none are left invisible.
- **Contrast:** ink 13.4:1, ink-2 6.8:1, pen 5.1:1, purple 7.0:1, red 6.1:1 on the board; trim 3.6:1 for borders. Tints were set so green text stays above 4.5:1 on them: the ruler at 10% trim (4.6:1) and pen-tint at 8% (4.6:1). Mark inputs turn white on hover, so a green mark under the ruler and the column band stays at 5.4:1. Green on the purple wash (3.6:1) lasts only for the 0.6s pulse.

## Adapting

1. **Tokens first.** Map your brand's ink, ground and its one "done" colour onto `--ink`, `--board` and `--pen`. Keep `--progress` for change only and `--correct` for errors. Check that `--pen` text stays at 4.5:1 or more on `--ruler` and `--pen-tint`. If the new face has tabular figures, the min-width trick in `rollTw` can go.
2. **Your records.** Edit `SCHEMA`: a field's `type` (text, int, dec, date, bool, choice) picks its parser, input and error, and `full`, `hint` and `ui: 'seg'` shape the form. Cross-field checks live in `validateRecord`. Replace `seed()` with your sample data, and keep every derived figure computed.
3. **Your maths.** `studentAvg`, `assessMean`, `figures`, `BOUNDS` and `grade` hold all the arithmetic. For a points race or a budget, swap these and the formatter `pct`. The signature needs only to know which cells depend on which: the row's cells to its total, the column's cells to its mean.
4. **Copy.** Short column titles (under about 30 characters, so they stay inside the angled header) and names in "Given Family" order (`listName` shows "Family, Given"). Messages name the record and the result ("Deleted Tolu Adeyemi and 5 marks.", "Edit cancelled. Nothing changed.").
5. **Retime or remove motion.** Durations are tokens (`--dur-*`, `--step`, `--step-wash`, `--dur-roll`, `--dur-acc`). The script reads `--step`, `--step-wash`, `--dur-roll`, `--dur-acc` and `--dur-acc-close`. Every effect goes through the `fx` object, whose defaults are instant (`roll`, `propagate`, `flip`, `collapse`, `pulse`, `details`, `dialogIn`, `dialogOut`, `menuIn`, `menuOut`, `toastIn`, `saved`, `swapClass`, `replay`, `scrollTo`, `lock`, `relayout`, `armed`, `stripIn`). Deleting an override in `motion()` therefore never breaks a flow. Removing GSAP and Lenis leaves a working page with CSS transitions only.
6. **Stack translation.** Keep the pure parts (schema, parsers, maths, record functions, `nextCell`) apart from rendering, and run the GSAP layer in a `useGSAP` hook with `gsap.matchMedia`. Run `#selftest` after every change: it must log "SELFTEST PASS".

| Token | Role |
|---|---|
| `--board` | Whiteboard ground |
| `--ink` | All text, chevrons, strip dots |
| `--ink-2` | Secondary text: context, labels, help, target |
| `--trim` | Rules, field borders, grid frame; source of `--ruler` |
| `--pen` | Marks just entered, primary buttons, focus ring, hover ink, pill and switch |
| `--progress` | Only what just changed: wash, delta chip, row pulse |
| `--correct` | Errors, delete, below target |
| `--sheet` | Fields, menu, dialog, toast |
| `--pen-tint`, `--wash`, `--chip`, `--ruler`, `--ruler-edge`, `--scrim` | Tints mixed from the colours above |
| `--font-display`, `--font-ui` | Inclusive Sans for both; split them to port to two faces |
| `--fs-xs` to `--fs-xl`, `--fs-display`, `--fs-angled` | Major third from 16px; display clamp(2.25rem, 6.5vw, 5.25rem); 13px angled titles |
| `--s1` to `--s9` | 4, 8, 12, 16, 24, 32, 48, 72, 112px |
| `--gutter`, `--max`, `--bar-h` | 24px gutter (16px under 480px), 1240px board, 56px bar |
| `--row`, `--col-min`, `--head-h`, `--num-pad` | 44px rows, 4rem mark columns, room for the angled titles, the shared right inset of figures |
| `--r-chip`, `--r-btn`, `--r-menu`, `--r-sheet`, `--r-pill` | Radii by hierarchy |
| `--ease-out`, `--ease-follow`, `--ease-acc` | expo.out, power3.out, the accordion curve |
| `--dur-*`, `--step`, `--step-wash` | Durations, ripple step, wash step per cell |
