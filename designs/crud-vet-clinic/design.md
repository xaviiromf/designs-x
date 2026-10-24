---
title: Weigh-in
section: crud
subject: Fennick Road Vets (fictional), a two-vet surgery whose nurse and receptionist keep Thursday 22 October 2026's patient list at the front desk, weighing every animal on arrival.
aesthetic: Consult-room safety vinyl and a digital platform scale. A pale pink-grey floor, aubergine-black ink, the indigo of cohesive bandage for everything you press, a green-grey LCD, and the red-bordered "Handle with care" sticker that goes on the files of patients who bite.
mode: light
fonts:
  - Radio Canada (Google Fonts, variable wdth 75-100, wght 300-700), the only family
js: "A session-only patient list (sessionStorage with an in-memory fallback) that creates, sorts, searches, filters, edits and deletes typed patient records with per-type validation. Each patient's weigh-in plays on a drawn platform scale whose animal-hold reading wanders and locks, with a six-visit history line. Deletes go through an inline confirm with an untimed undo, there is a reset to sample data, and an assert self-test runs at #selftest. Nothing posts to a server."
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Flip, CustomEase, DrawSVGPlugin), Lenis 1.3.26]
tags: [crud, records, veterinary, clinic, appointments, weight, platform-scale, lcd, inline-svg, flip, dialog, inline-confirm, undo, session-storage, gsap, lenis, light, variable-font]
use_when:
  - A desk or counter list of people, animals or items where one measured number is read first and its trend matters (weights at a clinic, parcels at a depot, dough at a bakery).
  - Records are short and typed, there are tens rather than thousands, and staff work through them in time order on one day.
  - You want a CRUD screen with one memorable object, an instrument that shows the value of the selected record, and quiet controls around it.
avoid_when:
  - There is no single measured quantity. Without it the scale is decoration.
  - The list runs to hundreds of rows or needs paging, bulk edits or column-level filtering. Use a data table.
  - Dark, dense operations dashboards. The design depends on a pale floor and a white chart card.
---

## Why it works

**The one bold idea: the weigh-in.** Each patient's chart has a drawn walk-on platform scale: a side view of the deck with its rubber mat, two spring posts, the base frame and a cable up to an indicator with an LCD window. When you pick a patient, the last animal steps off (the reading falls to zero and the deck rises). Then the new one steps on. The deck dips with a settle curve that overshoots about 6%, and the spring posts compress. The reading wanders around the true weight the way a moving animal makes a real scale wander: the weight times one plus a damped sine, about 3% across three half-cycles. These are real numbers from the same tween, never random glyphs. When it settles, the value locks exactly, the "Hold" annunciator lights, and only then does the screen-reader text say "Weight held at 8.62 kilograms". Then the last six weights draw as a line with the trend in words ("Down 0.52 kg since 3 March"), because the trend is what the vet reads first. Saving a new weight moves the reading from the old value to the new one and draws only the new segment of the line. It plays once at the end of the page load, on the first patient of the day. Everything else on the page is quieter and supports it.

- **A real resolution switch, not an auto-ranging dial.** UK practices weigh on digital scales. This one reads like a dual-interval platform scale: grams under 1 kg ("40 g" for Ziggy the budgie), 0.01 kg up to 15 kg, and 0.02 kg above that ("34.90 kg" for Otis on the weight clinic). The line under the LCD says which, and the weight field's hint shows how a typed value will read. Because the scale reads grams under 1 kg, the weight validator allows three decimals there and two above (4.255 is still rejected).
- **The scale's memory line is the pointer effect.** Hovering a row with a fine pointer, or focusing it with the keyboard, writes "Next: Mango, 4.20 kg" into a dim second line of the LCD with a masked swap, so you can compare without a second moving object. The native cursor is never touched. On touch a tap simply selects.
- **Structure that encodes something true.** The gutter beside the list is the day: its rule fills as you scroll and the chip on it shows where you are in the current sort order ("09:10", "M", "4.20 kg", "Overdue"). The only heavy rule on the page sits above the totals, because it marks a sum. Red appears only on errors, on delete and on the care sticker, so red always means "take care". The sticker is a white label with a red border and the words on it, never colour alone; vaccination status and species are words too.
- **One family in two widths.** Radio Canada is a public-service humanist with a real width axis. At 75% wide and 700 it is condensed like a printed patient label (the H1 and the LCD figures); at 100% it is the desk's text voice. Its figures are tabular by default; measured in Chromium, '1111', '0000' and '4444' are all 2.4 em at 100 px, so weights line up without a monospace face.
- **No outer sheet.** Rows sit straight on the vinyl, separated by hairlines. Only the selected row and the chart get the white card, so the white means "this one is open". Radii follow hierarchy: 6px fields, 10px buttons and the selected row, 16px chart and dialog, pill chips.
- **Buttons behave like membrane keys.** Hover darkens the fill by 8%, press moves 1px down and shrinks to .98, focus is a 3px indigo ring. There are no sweeping fills or floating labels; labels sit above fields in sentence case.
- **Dates never cause a dead end.** All twelve sample patients are on Thursday. A record moved to another day stays in the list under "Later dates" or "Earlier dates", with its day in the time column ("Fri 23 Oct, 09:10"). Saving announces "Moved Biscuit to Friday 23 October." The totals cover Thursday only and say so ("Thursday totals for the 4 rows shown"). "4 h 50 min" is summed from each seed's slot minutes (15, 20, 10, 20, 30, 10, 20, 40, 15, 30, 60, 20).
- **CRUD that holds up.** Every field type has its own validator and message (text 1 to 30 and 2 to 40 characters, integer age 0 to 30, decimal weight with a comma or a dot, a date in 2026 to 2027, slot length in steps of 5, choices from fixed lists, booleans). An invalid submit moves focus to the first problem and announces "2 fields need attention: Weight, Appointment date". Delete opens an inline strip ("Delete Biscuit and five weights? You can undo this.") with Keep record focused. The undo in the toast has no timer. Storage is sessionStorage with every read and write in try/catch and an in-memory fallback, and stored records are validated on load before they are trusted. `runSelfTest()` covers the validators, create, edit, delete, undo, reset, sorting, search, filter counts, totals, the scale's readings and the storage fallback.
- **Accessible by construction.** Real buttons, radios and checkboxes; a native `<dialog>` opened with `showModal()`. One polite live region announces sorting, search results, saves and deletes. Each row's accessible name is "Open Biscuit's chart, 08:40, dog, 8.62 kilograms", with owner, reason and vaccinations as its description. The LCD is `aria-hidden` (its numbers move) and a hidden line carries the held weight. The history SVG has a title and description plus a hidden list of every weight.

## Do not touch

- **The reading is honest.** The wandering value comes from the weigh-in tween and the true weight, and it locks to the exact value before "Hold" lights and before any text tells a screen reader the weight. Do not add a scramble, a random flicker, or a count-up from zero on scroll.
- **The resolution rules** (`resOf`, `fmtReading`): 1 g under 1 kg, 0.01 kg to 15 kg, 0.02 kg above. Rows, chip, LCD, hint and self-test all read through them.
- **Red only means care.** Errors, delete and the sticker. Indigo is for anything you can press, the selection and focus.
- **The row tint enters from the edge the pointer came in by and leaves by the edge it goes out of.** It reads one cached rect per enter and leave, never per frame. Keyboard focus gets the same tint from the left plus the memory line.
- **The index chip is driven by one ScrollTrigger per row** (`top 40%` to `bottom 40%`, `onToggle`), rebuilt after every Flip. Do not replace it with per-frame rect reads.
- **The chart stops being sticky when the viewport is 820px tall or less,** and below 992px wide it stacks under the list. In both cases, picking a row first scrolls the scale into view and only then weighs, and on load the first weigh-in waits until the scale is on screen. Keep these together or the signature plays where nobody sees it.
- **The CRUD never depends on GSAP.** The motion layer only replaces the `fx` hooks. If the CDN fails, `html.js` is removed, nothing is hidden, and every action works without motion. Hidden first states exist only under `html.js:not(.booted)`.
- Rows have the vinyl as a background so they hide each other while a Flip moves them past one another. Without it, mid-flight text overlaps.

## Adapting

Change the `:root` tokens first. The colour roles are physical: the floor (`--vinyl`), the open record (`--card`), the ink, the colour of the thing you press (`--wrap`), the instrument glass (`--lcd`) and one care colour (`--alert`). Keep `--ink-2` at 4.5:1 or better on `--lcd`, because the memory line sits on the glass.

For another measured record (parcels, flour, livestock), keep one number per record and one instrument that shows it. Replace `SEED`, `SPECIES`, `REASONS`, the `FILTERS` groups and the resolution rules in `resOf` and `fmtReading` with your instrument's real ones. The history keeps the last six readings, and the delta sentence reads them first to last. Long names wrap in the row and the chart heading. Owners and reasons can be about twice as long as the samples before the desktop row needs a third line. Change `CLINIC_DAY` to `new Date()` for real use (see the shortcut comment).

To retime motion, edit the `--g-*` tokens (seconds read by the script: weigh-in, step-off, wobble amplitude, history draw, Flip durations, rule draw, total count, dialog and toast) and the CSS motion tokens. To remove the load sequence, delete the `boot` timeline; `finishBoot` still reveals everything. To remove the scroll moments, delete the gutter fill tween, the footing rule trigger and `buildSpy`; the chip then shows the first row. To make the weigh-in instant everywhere, make `fx.weigh` call `lockScale`, which is what reduced motion does.

| Token | Role |
|---|---|
| `--vinyl` | Page ground (consult-room safety vinyl); row background |
| `--card` | Chart panel, selected row, dialog, fields, deck plate |
| `--ink`, `--ink-2` | Text, outlines, the mat; secondary text and labels |
| `--wrap`, `--wrap-deep` | Primary buttons, selection bar, sort indicator, gutter fill, focus ring; hover fill |
| `--lcd` | Scale display glass |
| `--alert`, `--alert-deep` | Errors, delete buttons and strip, the "Handle with care" sticker |
| `--rule`, `--line`, `--tint`, `--wash`, `--scrim` | Hairlines, field borders, row hover tint, saved or restored row wash, dialog backdrop |
| `--font`, `--w-display`, `--w-name`, `--w-text` | Radio Canada and its three widths (75%, 85%, 100%) |
| `--t-xs` to `--t-xl`, `--t-readout`, `--t-display` | Major-third type scale from 16px, LCD readout, H1 |
| `--s1` to `--s9`, `--pad`, `--max`, `--gutter-w` | 4px spacing scale, page padding, max width, day gutter |
| `--r-field`, `--r-button`, `--r-panel` | Radii by hierarchy |
| `--ease-out`, `--ease-swap`, `--ease-inout`, `--ease-pop`, `--dur-fast`, `--dur`, `--dur-slide` | CSS transitions |
| `--g-weigh`, `--g-step-off`, `--g-wobble`, `--g-draw`, `--g-flip`, `--g-filter`, `--g-search`, `--g-rule`, `--g-count`, `--g-dlg-in`, `--g-dlg-out`, `--g-toast-in`, `--g-toast-out` | GSAP timings read by the script |

## Motion

Detailed tier. GSAP 3.15.0 (ScrollTrigger, SplitText, Flip, CustomEase, DrawSVGPlugin) and Lenis 1.3.26 from jsDelivr, set up as in section 3 of `research/motion-techniques.md`. Lenis runs on `gsap.ticker` with `autoRaf: false`, `lagSmoothing(0)` and `anchors: true`. Everything lives inside `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide` conditions. The cleanup removes the tick, destroys Lenis, kills the row triggers and pending weigh-ins, and restores the plain hooks. The load sequence plays once per visit, so a media-query change never replays it. Only transform, opacity, clip-path and DrawSVG strokes are animated, plus two grid-template-rows reveals (field errors and the delete strip). After any Flip, `lenis.resize()` and `ScrollTrigger.refresh()` run and the row triggers are rebuilt. Lenis stops while the dialog is open, and the form body and chart panel carry `data-lenis-prevent`. Under reduced motion there is no Lenis, everything is in its final state, the reading shows the held weight at once, and the index chip still follows the reading line without the swap. The CustomEase "settle" is `M0,0 C0.18,0 0.24,1.07 0.42,1.06 0.56,1.05 0.62,0.985 0.74,0.995 0.86,1.003 0.93,1 1,1` (the plan's path was missing one control point and did not parse). "swap" is `.65,0,0,1`.

Load sequence (one timeline; any pointerdown, key, wheel or touch jumps it to the end; no preloader):

| When | What | Technique | Timing | Reduced |
|---|---|---|---|---|
| 0 | Wordmark and "Reset sample data" | LD8 | opacity, y -6 to 0, .5s power2.out, stagger .06 | Static |
| .1 | H1 "Thursday's patients", masked lines, after the font loads (1.5s cap) | TX1 | yPercent 110 to 0, 1s expo.out, stagger .08; split reverted after | Static |
| .35 | Lede | LD8 | opacity, .6s power1.out | Static |
| .45 | Toolbar: title, search, Add patient, sort and chips | LD8 | opacity, y 8 to 0, .5s expo.out, stagger .04 | Static |
| .6 | Gutter rule; first 8 rows wipe down, the rest set | SC16-style rule, clip reveal | rule scaleY .9s power2.inOut; rows clip-path inset(0 0 100% 0) to inset(0), .6s expo.out, stagger .035 | Static |
| .7 | Index chip | MI3-style pop | scale .8 to 1, opacity, .4s back.out(2) | Static |
| .8 | Chart panel | LD8 | opacity .4s | Static |
| 1.3 | Signature weigh-in on the first patient (side-by-side layout only; stacked layouts wait until the scale is 75% up the viewport) | Custom, CustomEase "settle" | deck dip and reading 1.2s; Hold lights .2s; history DrawSVG .7s power2.inOut with points popping .2s back.out(2) as the line reaches them; delta fades .3s | Held value, lamp lit, full line |

Scroll:

| What | Technique | Trigger | Timing | Reduced |
|---|---|---|---|---|
| Index chip shows the row on the reading line in the current sort's terms | NV6 spy, MI2 label | One ScrollTrigger per row, `top 40%` to `bottom 40%`, onToggle; back to the first row when scrolling above it | Masked swap .3s "swap" | Instant text |
| Gutter progress fill | SC11 | Rows, `top 40%` to `bottom 40%`, scrub, ease none | Scrubbed | Hidden |
| Rule above the totals draws | SC16 | `top 90%`, once | DrawSVG 0 to 100%, .8s power2.inOut | Static |
| Totals change on data changes only (first view shows final values) | SC13 variant | Sort, filter, search, save, delete, undo, reset | Old to new, .4s power2.out, snap 1 | Final values |

Every interactive item:

| Item | Hover (fine pointer) | Focus | Press, result | Reduced | Touch |
|---|---|---|---|---|---|
| Skip link | - | Wipes down, clip-path .2s | Lenis glide to the list, focus "Thursday's patients" | Instant | - |
| Text buttons (Reset sample data, Clear search, Cancel, Undo, Back to list, empty-state actions) | Printed 1px underline thickens to 2px and turns indigo, .15s | Ring | 1px down; Reset runs a CD5 Flip to the seed list and the toast "Sample data restored." with "Undo reset"; Back to list glides to the selected row and focuses it | Instant | Underline always shown |
| Add patient, Save, Edit details, Delete record, Keep record | Membrane key: fill 8% darker, .15s; the plus turns 90deg | 3px indigo ring | translateY 1px, scale .98, .1s; opens or acts | Instant | Press only |
| Search field | Border to ink | Ring | Debounced 150ms; CD5 Flip .35s, stagger .01, enter fade .25s, leave .2s; "1 patient matches ‘fen’." | Instant | Same |
| Search clear | Glyph turns 90deg | Ring | Appears scale .6 to 1, .2s back-out; clears, refocuses, Flips back | Instant | Press |
| Sort: Time, Name, Weight, Vaccines | Ink text and a 1px preview line | Ring | NV4 indicator slides .45s ease-in-out; same button flips direction, chevron turns 180deg .3s; CD5 Flip .7s power3.inOut, stagger .015, interrupted in flight; "Sorted by weight, heaviest first." | Instant | Press |
| Species chips (radios with live counts) | 8% indigo tint | Ring | MI3: border to ink .2s, check badge pops .25s back-out; Flip .6s, stagger .012 | No pop | Press |
| Patient rows | Edge-entry tint .3s in, .25s out; time turns indigo; LCD memory line "Next: Mango, 4.20 kg" swaps in .25s | Inset 2px ring, tint from the left, memory line | Content scale .99; selection bar scaleY from the top .35s (old one drains down .25s); the weigh-in plays; when the scale is off screen it glides into view first and focus moves to the chart heading | Instant | Tap selects, no memory line |
| Delete strip ("Delete Biscuit's record") | Membrane key | Ring | Strip opens by grid rows .3s and scrolls into view; Keep record focused; Delete record runs a Flip (leave fade .3s, close-up .5s), the next patient weighs in, toast "Biscuit deleted." with Undo | Instant | Same |
| Toast | - | White ring | In: yPercent 100 to 0 with opacity .4s expo.out; out .3s power2.in; replaced, not stacked; untimed. Undo Flips the row back (enter fade .35s) with a 18% indigo wash wiping in .6s and fading after 1.2s | Instant | Same |
| Dialog (Add, Edit) | - | Focus to Patient name, back to the trigger | CD7: scrim fades .35s, panel autoAlpha, y 12, scale .98 to 1 in .45s expo.out, fields follow at stagger .025; closes .3s power2.in; full-screen sheet under 600px, yPercent 100 to 0 | .2s fade | Sheet |
| Text, number and date fields, selects | Border to ink | Ring; select chevron turns 180deg .25s | Error reveals by grid rows .25s with red border; when fixed a check draws .3s; weight hint updates ("Shows as 12.30 kg, read to 0.01 kg") | Instant | Same, with decimal and numeric keypads |
| Species cards | Border to ink, ghost badge at 30% | Ring | MI3 pop | No pop | Press |
| Checkboxes | 6px tint ring | Ring | Box fills .15s, tick draws .3s; "Handle with care" pops its sticker preview | Instant | Same |
| Save | Membrane key | Ring | Invalid: focus to the first problem and an announcement, no shake. Valid: MI2 "Saved" swap .3s, dialog closes, row Flips to its place with the wash, reading moves old to new with the new history segment | Instant | Same |

Removed during review (the accessory): an always-on "Animal" mode legend in the LCD. "Hold" already says the scale is holding a moving animal's weight, and the second legend was the only thing on the glass that never changed.

Not used: a cursor follower or hidden cursor, ScrambleText, batch fade-ups, hold-to-confirm, floating labels, entry-edge button fills, and any ambient loop.
