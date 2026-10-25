---
title: Weigh-in
section: crud
subject: Fennick Road Vets (fictional), a two-vet surgery whose nurse and receptionist keep Thursday 22 October 2026's patient list at the front desk and weigh every animal on arrival.
aesthetic: The consult room's materials. Heather safety vinyl for the ground, aubergine-graphite ink, a white 270-degree spring-dial weighing scale with one red needle, cohesive-bandage lime for whatever is selected, and the fluorescent orange "Handle with care" sticker that goes on the files of patients who bite.
mode: light
fonts:
  - Reddit Sans Condensed (Google Fonts, variable wght 200-900), for the H1, the patient name and the lettering on the dial
  - Reddit Sans (Google Fonts, variable wght 200-900), for body text and controls
js: "A session-only patient list (sessionStorage with an in-memory fallback) that creates, sorts, searches, filters, edits and deletes typed patient records with per-type validation, weighs each selected patient on a drawn auto-ranging spring dial whose needle swings, overshoots and settles while the readout follows it, shows a hollow ghost needle for the hovered row, draws a six-visit history line, deletes through an inline confirm with an untimed undo, resets to sample data, and runs an assert self-test at #selftest; nothing posts to a server."
libraries: [GSAP 3.15 (ScrollTrigger, Flip, CustomEase, DrawSVGPlugin), Lenis 1.3.26]
tags: [crud, records, veterinary, clinic, appointments, weight, dial, spring-scale, needle, inline-svg, flip, dialog, inline-confirm, undo, session-storage, gsap, lenis, light, variable-font]
use_when:
  - A desk or counter list of animals, people or items where one measured number is read first and its trend matters (weights at a clinic, parcels at a depot, dough at a bakery).
  - Records are short and typed, there are tens rather than thousands, and staff work through them in time order on one day.
  - You want a CRUD screen with one memorable object, an instrument that shows the value of the selected record, and quiet controls around it.
avoid_when:
  - There is no single measured quantity. Without it the scale is decoration.
  - The list runs to hundreds of rows or needs paging, bulk edits or column filters. Use a data table.
  - Dark, dense operations dashboards. The design depends on a pale floor, a white sheet and a white dial face.
---

## Why it works

**The one bold idea: the weigh-in.** The chart holds a spring-dial weighing scale drawn in inline SVG: a white 270-degree face with 50 divisions and 11 numbered major ticks in Reddit Sans Condensed, a rest pin below zero, and one red needle on an ink pivot cap. When you pick a patient, the last one steps off (the needle drops to rest), the next one steps on, and the needle swings up, overshoots by about 6% and settles on a damped curve (CustomEase "settle", 1.4s). The tabular readout ("8.62 kg") is written from the needle's angle on every frame, so the number moves with the needle and shows only what the needle points at. Then the last six weights draw as a line underneath with the trend since the previous visit in words ("Up 0.4 kg since 14 July"; "Down 0.08 kg since 25 August" for Duchess, the old cat with kidney disease), because the trend is what the vet reads first. Saving an edited weight moves the needle from the old value to the new one and draws only the new segment. On page load the instrument is the sequence: its ticks draw round the dial, the numerals follow, and the first patient of the day steps on.

- **It auto-ranges like a clinic scale.** Full scale is the smallest of 1, 2, 5, 10, 20, 50 and 100 kg that holds the weight, so Ziggy the 41 g budgie reads on the 0 to 1 kg dial and Otis on the weight clinic reads 34.90 kg on the 0 to 50 kg dial. When the next patient needs another range, the needle drops to zero, the numerals crossfade, then the needle swings. The readout keeps the scale's resolution: 1 g steps up to 6 kg, 20 g steps above, grams under 1 kg ("41 g"). The weight field's hint says which dial a value will read on.
- **The pointer effect sits on the focal object.** Hovering a row with a mouse, or focusing it with the keyboard, swings a hollow ghost needle (1.5px ink outline, no fill) to that patient's weight on the current dial, for comparison, and the sentence under the dial says it in words ("Mango 4.20 kg, 4.42 kg lighter than Biscuit"). Running the pointer down the list sweeps the ghost continuously. A weight beyond full scale parks the ghost against the end stop and the sentence says so ("Juniper 27.40 kg, off this 0 to 10 kg dial, 18.78 kg heavier than Biscuit"). On touch there is no ghost: a tap selects and the real needle swings.
- **The weigh-in plays where it can be seen.** From 992px wide the chart is a sticky column beside the masthead, so the dial, the readout and the history are above the fold at 1440 by 900 when the load sequence runs. Below 992px the chart sits above the list (in the DOM too, so tab order matches), with a compact 300px dial on phones; picking a row scrolls up to the dial first. The history area always shows its baseline, so it is never an empty gap while it waits to draw.
- **Colours from the room, each with one job.** Heather vinyl is the floor, white is the sheet, the dial face and the open file, aubergine ink is text, ticks and the primary button. Lime cohesive bandage marks only what is selected (the selection bar, the active sort pill, the chosen chip, the species badge) and is always under ink text, never text itself. Red is the needle, errors and delete, nothing else. The orange sticker always carries its words, "Handle with care"; species, vaccination status and selection are words too, never colour alone.
- **Two widths of one voice.** Reddit Sans Condensed is the lettering on scale dials and file labels: the H1 at 800, the patient name, the dial numerals and readout. Reddit Sans is the desk's text voice. Both serve tabular figures (measured in Chromium: '1111' and '0000' are both 2.434 em at 100 px), so weights line up in a right-aligned column with no monospace.
- **One white sheet.** The list is a single white sheet on the vinyl with roomy 64px rows and hairline rules; the chart is one panel with no shadow, separated by space. Radii follow hierarchy: 6px fields, 10px buttons, 16px sheet, panel and dialog, pills for chips, a circle for the dial. The 56px gutter beside the sheet is the day: its rule fills as you scroll and its chip shows where you are in the current sort ("09:10", "M", "4.20 kg", "Overdue").
- **Structure that encodes something true.** The only heavy rule on the page sits above the totals because it marks a sum. Totals are computed from the records, never typed, and are real from the first paint ("12 patients, 4 h 50 min booked, 2 vaccinations overdue" is summed from each seed's slot minutes: 15, 20, 10, 20, 30, 10, 20, 40, 15, 30, 60, 20).
- **One reasoned exception to default 6.** The only large figure is the dial readout. It is an instrument reading of one patient's weight with its unit and its range, not a hero statistic, and there is no gradient.
- **CRUD that holds up.** Each field type has its own validator and message: text (1 to 30 and 2 to 40 characters, with matching `maxlength`), integer age 0 to 30, decimal weight with a comma or a dot and at most three decimals ("Enter the weight in kilograms, up to 3 decimals, for example 0.041 or 8.62"), a date in 2026 to 2027, slot length in steps of 5, choices from fixed lists, booleans. A record's visit is always its last weigh-in, so an edit cannot move the visit onto or before an earlier weight ("Choose a date after Otis's last weigh-in on 17 September."). An invalid submit moves focus to the first problem and announces "2 fields need attention: Weight, Appointment date". Delete swaps the action row into "Delete Biscuit and 6 weights? [Yes, delete] [Keep record]" with Keep record focused and Escape keeping the record; the toast's Undo has no timer. All twelve seeds are on Thursday; a record saved with another date stays in the list under "Later dates" with its day before the time ("Fri 23 Oct, 09:10"). Storage is sessionStorage with every read and write in try/catch and an in-memory fallback, and stored records are validated before they are trusted. `runSelfTest()` covers validators, create, edit, the visit-date rule, delete, undo, reset, sorting, search, filter counts, totals, resolution, auto-ranging, needle angles, the readout, deltas, comparisons and the storage fallback.
- **Accessible by construction.** Real buttons, radios and checkboxes, a native `<dialog>` opened with `showModal()`. One polite live region announces sorting, search results, saves and deletes; a second, inside the chart, carries the settled weight ("Biscuit, 8.62 kilograms"). The dial is `role="img"` whose title changes only after the needle settles ("Weight 8.62 kilograms on the 0 to 10 kilogram scale"); its moving readout is inside it and not read mid-swing. The history SVG has a title and description and a hidden list of every weight. Focus is a 3px ink ring with a 2px offset, plus a white inner ring on ink-filled buttons. The skip link goes to the list heading, which takes focus even without the script.

Contrast (WCAG 2): ink on floor 12.5:1, on sheet 16.0:1, on lime 9.5:1, on the sticker 7.6:1; secondary ink 6.6:1 on floor, 8.4:1 on sheet; alarm red 5.3:1 on sheet and white on it 5.3:1; the needle (same red) 5.3:1 on the white face; white on ink 16.0:1 and on the hover layer 7.8:1; field and chip outlines 4.3:1 on sheet.

## Do not touch

- **The readout is read off the needle.** One proxy value drives both the needle angle (`needleAngle`) and the text (`readText`) in the same frame, at the precision of the weight it is heading for, clamped at full scale. Do not tween the number separately, scramble it or count it up from zero.
- **The resolution and range rules** (`reading`, `kgParts`, `rangeOf`, `RANGES`): 1 g steps to 6 kg, 20 g above, grams under 1 kg in prose, full scale from 1, 2, 5, 10, 20, 50, 100 kg. Rows, chip, dial, hint, history, comparisons and self-test all read through them. Differences in prose use the coarser resolution of the two weights.
- **Red is the needle, errors and delete only.** Lime is only for what is selected and always sits under ink. The sticker always says "Handle with care".
- **The ghost needle is a comparison aid.** It never replaces the rows or the sentence, and it parks at the end stop rather than leaving the dial.
- **This visit is the last weigh-in.** `ops.update` replaces the last history point with the record's date and weight, and `visitClash` refuses a date on or before the previous one; `isRecord` rejects stored data that breaks this.
- **The index chip is driven by one ScrollTrigger per row** (`top 40%` to `bottom 40%`, `onToggle`), rebuilt after every Flip, plus one on the list that returns it to the first row on a jump back. No per-frame rect reads.
- **The sheet's white is a layer** (`.sheet__bg`) so a Flip can shrink or grow it with clip-path in step with the rows. Rows keep a white background so they hide each other while they pass.
- **The CRUD never depends on GSAP.** The motion layer only replaces the `fx` hooks and tweens plain proxy objects; the needles are drawn by setting their `transform` attribute. If the CDN fails, `html.js` is removed, nothing is hidden, and every action works with the needle jumping to the weight. Hidden first states exist only under `html.js:not(.booted)`.

## Motion

Detailed tier. House easing: `expo.out` for state changes, `expo.inOut` for masked swaps, `power3.inOut` for Flip reflows, `power3.out` for pointer following, the CustomEase `settle` (`M0,0 C0.12,0 0.18,1.09 0.36,1.06 0.52,1.03 0.66,0.985 1,1`) for the needle, `none` for scrubs. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer, width 992). Lenis runs on `gsap.ticker` with `autoRaf: false`, `lagSmoothing(0)` and `anchors: true`, and stops while the dialog is open. Only transform, opacity, clip-path and DrawSVG strokes animate, plus the catalogue's `grid-template-rows` reveal for error messages. The load timeline jumps to its end on any pointer, key, wheel or touch input; nothing waits on fonts for more than 1.2s.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Page | LD8 (opacity only) | Load, t0 | Everything but the instrument: one opacity pass .4s power1.out, no offsets | Visible |
| Dial wakes | DrawSVG | t0.30 (or when the dial reaches 75% of the viewport if it starts below the fold) | 51 ticks draw outside-in .3s power2.out, stagger .008; numerals fade .25s, stagger .035 | Drawn |
| Signature: weigh-in | Needle swing, CustomEase | t0.85 at load; row click; delete or undo selects the next patient | Needle to rest .35s power2.in; if the range changes, numerals crossfade .25s; swing 1.4s "settle" (about 6% overshoot); readout written from the angle each frame; then title and live text | Needle at the weight |
| Edited weight | Same tween | Save with a changed weight | Old value to new, 1.4s "settle"; through rest and a crossfade only if the range changes | Jump |
| History line | SC16 with DrawSVG | .1s before the needle settles | Line .7s power2.inOut, points .2s back.out(2) staggered along the draw, ends and delta .3s; an edited weight redraws only its new segment (.42s); the baseline is always drawn | Drawn |
| Ghost needle | quickTo on rotation | Row hover (fine pointer) or row focus-visible | Swings .45s power3.out from the real needle, then between rows; fades in .15s, out .2s; parks at the end stop off-scale; sentence masked swap .3s | Ghost and sentence set instantly |
| Index chip | NV6 plus MI2 | Per-row ScrollTrigger, top 40% to bottom 40% | Masked swap .3s expo.inOut | Instant swap |
| Gutter progress fill | SC11 | List top 40% to bottom 40% | scaleY 0 to 1, scrub, ease none | Hidden |
| Totals footing | SC16 | Footing at top 90%, once | Rule DrawSVG .8s power2.inOut; figures are real from the first paint and tween old to new in .4s after a create, edit or delete | Final values |
| Compact toolbar title | Class toggle | Toolbar sticks (IntersectionObserver) | opacity .2s | Instant |
| Skip link | Clip reveal | Focus | clip-path .2s; Lenis scroll to the list, focus its heading | Instant |
| Primary and outline buttons | HV4 plus MI1 | Hover from the entry edge, focus-visible from the left; press | Fill scaleX .35s in, .25s out toward the leave edge; plus glyph turns 90deg .3s; press scale .96 in .12s, release .4s overshoot | Colour swap |
| Text buttons (Reset, Cancel, Undo, Clear search, Back to list) | HV2 plus MI1 | Hover, focus-visible; press | 2px underline sweeps in from the left .3s, leaves to the right .25s | Static underline |
| Close and clear buttons | Rotate | Hover | Glyph 90deg .25s; clear button pops in scale .6 to 1 .2s | Instant |
| Search field | MI4 | Focus, value | Label floats .2s, focus bar scaleX .3s expo.out; input debounced 150ms | Instant |
| Sort control | NV4 | Click | Lime pill slides by clip-path .45s (ink and lime layers so the outline holds); active chevron turns 180deg .3s | Jump |
| Reorder on sort, filter, search, reset, save, delete, undo | CD5 | Any list change | .7s / .6s / .35s power3.inOut, stagger .01 to .015, leaving rows fade .2 to .3s, newcomers fade .35s after 40% of the move, the sheet layer clips in step; interrupted from in-flight state | Instant |
| Filter chips | MI3 | Change | Ink outline .2s, check badge pops .25s back.out; hover tint .15s; 44px tall on coarse pointers | No pop |
| List rows | Edge-entry clip wipe plus MI1 | Hover from top or bottom, focus-visible from the left; press | Tint .3s power2.out in, .25s out toward the leave edge; content scale .99 .1s; selection bar scaleY .35s from the top, old bar .25s toward the bottom | Instant tint (hover tint only on hover-capable devices) |
| Delete confirm | MI2 | "Delete Biscuit's record" | Action row slides out, question and buttons slide in, .35s; focus to Keep record; Escape reverses | Instant |
| Toast | Slide | Delete, reset, save, undo | In yPercent 100 to 0 .4s expo.out, out .3s power2.in, replacement nudges 6px | Visible |
| Changed row highlight | Wash wipe | Save, add, undo | Lime wash clip-path wipe .6s power2.out, fades .5s after 1.2s | None |
| Patient dialog | CD7 | Add patient, Edit details | Scrim .35s; panel y 12 scale .98 to rest .45s expo.out, fields stagger .025 capped at .25s; close .3s power2.in; under 600px a full-screen sheet from yPercent 100 | Instant open and close |
| Dialog fields | MI4 | Focus, invalid submit, fix | Label float .2s, focus bar .3s, error reveal grid-template-rows .25s, fixed check draws .3s, select chevron turns .25s | Instant |
| Species cards and checkboxes | MI3, tick draw | Change | Badge pop .25s back.out, tick draws .3s, care sticker preview pops .25s | No pop, instant tick |
| Save button | MI2 | Valid submit | "Save changes" to "Saved" .3s, then the dialog closes | Instant |

Not used on purpose: a cursor follower or hidden native cursor, ScrambleText, SplitText line rises, per-section fade-ups and any ambient loop. CD8 hold-to-delete was planned and replaced by an inline confirm with an untimed undo: it is faster at a busy front desk, it works the same for keyboard and switch users without a timed hold, and hold rings already sign two other designs in the collection.

## Adapting

Change the `:root` tokens first. The colour roles are physical: the floor, the sheet, the ink, the thing that is selected (`--wrap`), the needle, the care sticker and one alarm colour. Keep `--wrap` light enough for ink text on it, and keep `--needle` at 3:1 or better on `--sheet`.

For another measured record (parcels, flour, livestock), keep one number per record and one instrument that shows it. Replace `SEED`, `SPECIES`, `REASONS`, the `FILTERS` groups, `RANGES`, `FINE_MAX` and the resolution rule in `reading` with your instrument's real ones; the dial always has 10 numbered divisions of 5, so pick ranges that divide by 10. The history keeps the last six readings, and the delta sentence compares the last two. Long names wrap in the row and the chart heading; owners and reasons can be about twice as long as the samples before the desktop row needs a third line. Change `CLINIC_DAY` to `new Date()` for real use (see the shortcut comment).

To retime motion, edit the `--g-*` tokens (seconds read by the script: the settle swing, the drop to rest, history draw, Flip durations, rule draw, recount, dialog and toast) and the CSS motion tokens; the overshoot lives in the `settle` CustomEase. To remove the load sequence, delete the `boot` timeline; `finishBoot` still reveals everything. To make the weigh-in instant everywhere, make `fx.weigh` call `lockScale`, which is what reduced motion does. To remove the scroll moments, delete the gutter fill tween, the footing trigger and `buildSpy` (the chip then shows the first row). To drop the pointer effect, make `fx.ghost` a no-op; the comparison sentence still follows hover and focus.

| Token | Role |
|---|---|
| `--floor` | Page ground (heather safety vinyl), toolbar, dial bezel |
| `--sheet` | List sheet, chart panel, dial face, dialog, fields |
| `--ink`, `--ink-2` | Text, outlines, ticks, pivot cap, ghost needle, primary button fill, focus ring; secondary text |
| `--ink-lift` | Hover layer on ink buttons |
| `--needle` | The scale's needle |
| `--wrap` | Selected things: selection bar, active sort pill, chosen chip, species badge, saved-row wash |
| `--alarm`, `--alarm-deep` | Errors and delete; delete hover layer |
| `--sticker` | "Handle with care" file sticker |
| `--rule`, `--line`, `--tint`, `--wash`, `--scrim` | Hairlines and the history baseline; field and chip outlines; row hover; changed-row highlight; dialog backdrop |
| `--font`, `--font-cond` | Reddit Sans for the desk; Reddit Sans Condensed for H1, names and the dial |
| `--wt-*` | Weights: display 800, name 700, dial readout and numerals 600, text 400, strong 600 |
| `--t-xs` to `--t-xl`, `--t-display` | Type scale (major third from 16px) and the display size |
| `--s1` to `--s9`, `--pad`, `--max`, `--gutter-w` | Spacing scale, side padding, max width, list gutter |
| `--r-field`, `--r-button`, `--r-panel` | Radii by hierarchy |
| `--ease-*`, `--dur-*`, `--g-*` | CSS easings and durations; GSAP timings in seconds |
