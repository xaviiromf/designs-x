---
title: Fittings on a week tape
section: process
subject: Okafor & Lind (fictional), bespoke tailors at 14 Bernard Street, Leith, explaining to someone about to commission a first suit what happens between the first measure and collection, five visits over about ten weeks.
aesthetic: The cutting room's materials, used literally. Grey worsted flannel is the page, manila pattern card carries the paper objects, basting thread and white tailor's chalk mark the cloth, and a yellow tape measure graduated in weeks is the timeline.
mode: dark
fonts:
  - Petrona 400-600 with italics (Google Fonts), for everything except the tape
  - Mohave 500-700 (Google Fonts), only for what is printed on the tape, the needle reading and each panel's week line
js: Runs the load sequence (hook, headline lines, pattern pieces, name), keeps a chalk needle reading in half weeks on the vertical tape, bastes each fitting's coat drawing as its week reaches the needle, draws the measure-book and dress-form chalk lines, opens the cloth frame to full bleed, jumps from the tape's week numerals to each visit, and runs the booking dialog with inline validation. Nothing is sent anywhere.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [process, timeline, tailoring, tape-measure, craft, scroll-scrub, svg, dialog, form, dark, detailed-motion]
use_when:
  - A real process measured in time (weeks, days, months) where the gaps between steps matter as much as the steps, such as commissions, builds, fermentation or apprenticeships.
  - A craft or trade with a physical measuring tool that can become the timeline honestly (a rule, a tape, a gauge, a dipstick).
  - Four to six visits or stages, each with a short paragraph and one drawing that changes from stage to stage.
avoid_when:
  - The stages have no meaningful durations, or the whole process takes minutes. A scaled tape with nothing to scale is decoration.
  - More than about six stages, or a process longer than about fifteen units. The scroll gets long, because one unit is a fixed fraction of the viewport.
  - Light, airy brands. The design depends on a mid-grey cloth ground with warm paper objects on it.
---

## Why it works

**The one bold idea: the timeline is a tape measure graduated in weeks, and scrolling moves you along it at true scale.** In `#fittings` a yellow tape hangs down the left of the section (grid column 2 on desktop, a 44px strip flush to the left edge on phones). It runs from 0 "First measure" at the top to 10 "Collection" at the bottom, with a tick every half week. One week is a fixed length (`--week`: `max(44svh, 19rem)` on desktop, `max(34svh, 17.5rem)` below 992px). The four panels hang off the tape at weeks 1, 3, 6 and 9 by a drawn dressmaker's pin, so the empty stretch between the first and second fittings is visibly three weeks long. A white chalk needle with a Mohave reading ("Week 4½") is `position: sticky` at 45% of the viewport inside the ruler, so it travels down the tape as you read. As each panel's week reaches the needle, its coat drawing is basted: white tacking stitches draw along the seams. That is the skeleton baste, the forward fitting and the chalked buttonholes, which are the real stages of a bespoke coat.

- **The tape is also navigation.** The fitting numerals 1, 3, 6 and 9 are real buttons ("Go to week 6, second fitting"). They scroll so that the week mark lands exactly on the needle, then focus the panel's heading. 0 links back to the measure book and 10 to collection. This is the keyboard way through a long scale, and "Skip the fittings timeline" sits beside the heading for anyone who wants out. There is no pin and no horizontal scroll. The page scrolls natively, and Space, Page Down and find-in-page all work.
- **Copy counts correctly.** The H1 promises three fittings. The lead says five visits in total (first measure, three fittings, collection), the H2 says "Three fittings in ten weeks", and week 1 says "No visit." because the cutter drafts the pattern without you.
- **Materials as palette, with each material in its one role.** Flannel `#4F5150` is the ground, with a twill texture under 4% contrast. Basting white `#F8F6EF` is text and every mark on cloth (7.4:1). Manila `#D9C49B` appears only on card objects: the hanging pattern pieces, the measure book, the week-1 pattern card and the dialog. Tailor's black `#232326` is ink on card (9.2:1) and on the tape (9.8:1). Tape yellow `#F0C93A` is the tape and the keyboard focus ring on cloth (5.0:1), and nothing else. The cutter's red pencil `#B0302A` marks the low right shoulder on the forepart ("−½") and form errors. It only reaches 3.7:1 on card, so it is never the text colour: errors are black text beside a red pencil stroke and a red underline.
- **The hero is the object.** Mr R. Ahmadi's paper pattern hangs on a hook in three manila pieces (back, top sleeve, forepart). Each piece carries pencil grain lines, notches and darts, and the forepart carries his name, "Cut 2. Page 211" and the red alteration. The pieces drop onto the hook once and then hang still. "Page 211" is the measure book page you meet next, and the collection copy brings the pattern back ("Your pattern stays on its hook").
- **Measurements are shown where they are taken.** The measure book (eight of twenty-six measurements plus two posture notes) is a list of `aria-pressed` buttons. Values are in Petrona italic, the hand-written-in voice, with tabular lining figures (checked: Petrona has `tnum`, so "1111" and "0000" are equal widths, upright and italic). Choosing a row draws its white chalk line on a grey dress form, and a live caption says where and how it is taken. Chest is chosen by default, so the figure is never blank and nothing depends on hover.
- **Type.** Petrona carries everything: H1 400 at 1.02 leading and -0.012em tracking, H2 and H3 500, body 400 at 1.6, set on a perfect-fourth scale from 1.125rem. Italic is reserved for written-in values (the customer's name, the measure-book values, the measurement date). Mohave, a condensed face, appears only where something is printed on the tape: numerals, labels, the needle reading and each panel's week line. There are no all-caps eyebrows, no middle-dot meta strings, no arrows on links and no monospace.
- **Radii mean objects.** Buttons and card objects are 2px. The measure book and the week-1 card have one clipped corner (clip-path), like a cut card. There are no shadows except the 2px offset edge under the hanging pattern pieces, which separates card from card.

## Motion

Tier: detailed. Every time-based move uses `expo.out` (CSS `--ease-out: cubic-bezier(.16,1,.3,1)`), every scrub uses `ease: 'none'`, and drawn marks use `--ease-draw: cubic-bezier(.4,0,.2,1)` in and out. Everything is built inside one `gsap.matchMedia` with `motion`, `reduce`, `fine (hover: hover) and (pointer: fine)` and `wide (min-width: 992px)`. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, anchors handled by the page), and `lenis.on('scroll', ScrollTrigger.update)`. Hidden first states exist only under `html.js` inside `@media (prefers-reduced-motion: no-preference)`.

| # | What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| L1 | The hook draws over the rail | DrawSVG | load, t = .1 s | .5 s `power3.out` | drawn |
| L2 | H1 lines rise out of padded masks (Petrona descenders) | TX1 | load, after `document.fonts.ready` (capped at 1.2 s), not before t = .2 s | 1.0 s, stagger .08 | plain text, no split |
| L3 | Back, top sleeve and forepart drop onto the hook, then hang still | LD8-style drop | load, t = .35 s | y -40 to 0 and opacity, .6 s, stagger .12 | hanging |
| L4 | Lead and both actions settle (they stay clickable throughout) | LD8 | load, t = .55 s | y 8 to 0 and opacity, .6 s, stagger .06 | visible from first paint |
| L5 | "Mr R. Ahmadi" appears and its pencil underline draws | DrawSVG | load, t = 1.0 s | .6 s `power3.out`, name .4 s | shown |
| S1 | Dress-form outline draws; measure-book rules scale in from the left; the chosen chalk line follows | SC16 + DrawSVG | scroll, figure at `top 75%`, once | 1.2 s outline, .8 s rules stagger .04, chalk line at .55 s | static |
| S2 | **Signature.** The needle reading follows the sticky needle, snapped to half weeks and written only when it changes. Per panel: the pin pushes in, the coat goes from ghosted (.3) to present, and the tacking stitches draw (DrawSVG on a solid mask path over the dashed stitch path; week 1 draws the pencil pattern, week 9 the chalked buttonholes and sleeve length) | custom (vertical tape) + DrawSVG | one ScrollTrigger over the ruler for the reading; per panel `start: 'top 75%'`, `end` = the needle line, `scrub: true` | scrubbed, `ease: 'none'` | everything drawn; reading still updates |
| S3 | The finished chalk-stripe cloth opens from a frame to full bleed, the cloth settling from 1.2; then the H2 rises and the woven label fades in | MD2 + TX1 | wide and fine: scrub `top 80%` to `center center`; H2 once at `top 40%`, label at `top 30%` | scrubbed; H2 1.0 s, label .5 s | full frame, static text |
| S3n | Narrow or touch: the cloth is already full bleed; H2 and label fade up | fade-up | once at `top 70%` | .8 s, stagger .1 | static |
| I1 | Buttons: the fill sweeps in from the side the pointer entered and leaves the way it goes; label flips colour; press 0.97 | HV4 + MI1 | hover, `:focus-visible` (fills from the left), press | in .45 s, out .3 s, press .12 s, release .45 s `power3.out` | colour change only, no scale |
| I2 | Every text link: a hand-drawn chalk underline draws over a faint resting rule | HV11 | hover, `:focus-visible` | .4 s in, .2 s out | shown instantly; static on touch |
| I3 | Measure rows: a pencil tick previews at 35% and the matching chalk line draws on the form; the previous preview erases; click, Enter or tap chooses it (`aria-pressed`), and the caption updates | HV11 tick + DrawSVG-style dash draw (CSS) | hover, keyboard focus, click | line .5 s `power3.out`, erase .2 s, tick .35 s | instant |
| I4 | Pointer over the dress form: the nearest of the ten chalk lines (sampled once, within 16 drawing units) previews; a click or tap chooses it. The native cursor is kept and becomes a pointer near a line | pointer proximity (CU-family, native cursor kept) | mouse move on fine pointers; tap anywhere | same as I3 | same, instant |
| I5 | Tape numerals: black fills the cell from the entry edge, the numeral turns tape yellow, the week tick lengthens 1.6x; press 0.94 | HV4 (vertical) + MI1 | hover, `:focus-visible`, press | .25 s | colour flip only |
| I6 | Tape numeral jump: the week mark lands on the needle, then the H3 takes focus | NV6 | click, Enter | `min(1.3, .65 + distance / 4000)` s via `lenis.scrollTo` | instant jump |
| I7 | "See the fittings", "Skip the fittings timeline", tape 0 and 10, "Back to the top": eased anchors plus focus on the target heading | NV6 | click | same rule as I6 | instant jump |
| I8 | Dialog: panel y 12 and scale .98 to rest; full-screen sheet from below under 600px; backdrop fades; Lenis stops | CD7 | open, Close, Escape, backdrop click | in .45 s (sheet .5 s), out .3 s `power2.in`, backdrop .3 s | .15 s fade |
| I9 | Fields: a black rule draws from the left on focus; hover thickens the resting rule to 2px; errors open with `grid-template-rows` and focus moves to the first invalid field. Labels stay above the fields | MI4 without floating labels | focus, hover, submit | .35 s, .2 s, .25 s | instant |
| I10 | "What would you like made": a pencil ellipse is drawn round the chosen option; hover previews it at 35% | HV11 | change, hover, `:focus-visible` | .45 s in, .2 s out | instant |
| I11 | Success: a pencil tick draws, then the two message lines rise | DrawSVG + TX1 | valid submit | .5 s; lines .6 s, stagger .06 | static |

Cut on purpose: the planned SC4 pinned horizontal track and its `containerAnimation`, which duplicated another design's signature (the tape now hangs vertically and native scroll drives it). Also cut: the site header, nav, menu sheet and section spy (this is a section, not a page); the pointer- and scroll-velocity swing of the pattern pieces; floating labels; and seven of the nine planned chalk glyphs (only the link underline and the radio ellipse remain). The last accessory removed was a tick that lengthened when the needle sat on a week mark, because the needle's own chalk stroke covered it.

## Do not touch

- **The scale is the content.** Panels are absolutely positioned at `top: calc(var(--w) * var(--week))` inside a ruler exactly `10 * --week` tall, and the tape ticks use the same token. Do not let panels push the tape or space them with margins. If you change `--week`, check that each panel is shorter than the gap to the next one (the tightest are weeks 9 to 10 and 1 to 3). Below 992px, panel drawings float beside the text so the week-9 panel fits in one week.
- **The needle reading is geometry.** It is computed from the sticky needle's position relative to the ruler (`(needle.top - ruler.top) / week`, rounded to halves). This makes the number match where the chalk mark visibly sits, at any viewport height. The per-panel scrub ends at the needle line (`end: () => 'top ' + needleTop + 'px'`), so a tape jump always lands on a finished drawing. The needle is hidden when the script never ran (`html.run`).
- **Stitches are dashed paths revealed by a mask.** A dashed path cannot be drawn with its own dash offset. Each stitch path has a twin solid path inside a `<mask>` (ids `m3`, `m6`), and DrawSVG animates the twin. Keep the two `d` attributes identical.
- **CSS-drawn marks use `pathLength="1"` with `stroke-dasharray: 1 2` and a hidden offset of `1.01`.** The long gap stops round caps from leaving a dot at the end of an undrawn line. Do not add `vector-effect: non-scaling-stroke` to these paths: it puts the dash pattern in screen units and breaks the draw.
- **Accessibility.** The tape is a labelled group with six real controls (two links, four buttons with explicit labels). The plain numerals and printed labels are `aria-hidden`. Measure rows are toggle buttons with a polite live caption. Every drawing is `aria-hidden` or `role="img"` with a text alternative (the hanging pattern, the woven label). Focus rings are tape yellow on cloth and black on card, and the dialog returns focus to its opener. Focus also comes back if the browser force-closes the dialog on a repeated Escape, and Lenis restarts.
- **Robustness.** If any library fails to load, `html.js` is removed and everything is visible and drawn. Anchors, tape jumps, the needle reading (a passive scroll listener), the measure book, the dialog and the form all still work in plain JS. Under reduced motion there is no Lenis and no hidden state, and the reading still updates.
- **No horizontal overflow** from 360 to 1600px (checked). The phone tape uses a negative gutter margin to sit flush to the edge, and `body` has `overflow-x: clip`.

## Adapting

Change the `:root` tokens first, then the scale, then the copy.

- **Another process on a tape.** Keep the ruler and change the unit. Set the tape length (the `10` in `grid-template-rows: calc(10 * var(--week))` and in `readNeedle`), the marks (`style="--w:N"`), and each panel's `--w`. Use any unit that fits in about ten to fifteen steps: days for a sourdough course, months for a timber frame. Rename the reading prefix ("Week") in the `.rw` span.
- **Retiming or removing motion.** CSS durations live in `--t-in`, `--t-out`, `--t-press`, `--t-release`, `--t-draw-in`, `--t-draw-out`, `--t-chalk`, `--t-ring`, `--t-field`, `--t-rule`, `--t-err` and `--t-mark`. GSAP timings are literals in the matchMedia callback: the load timeline offsets (.1, .35, .55, 1.0 s), the S1 timeline (1.2 s, .8 s, .55 s), and the per-panel scrub (`start: 'top 75%'`). To drop the basting scrub, delete the `$$('.panel').forEach` block and the drawings show finished. To drop the cloth frame, delete the `if (wide && fine)` branch (the narrow fade-up then runs everywhere). To drop the load sequence, delete the first `gsap.timeline()` and the `fontsReady.then` SplitText block, and remove the matching `html.js` hidden states in CSS. Never remove the reduced-motion branch.
- **Copy.** Panel paragraphs are about 35 to 50 words. Longer text needs a larger `--week` on phones. Week lines are full sentences ("Week 6. About 30 minutes."), not meta strings. Keep the visit count consistent across the H1, the lead and the H2.
- **Headings.** The intro uses an `h1` because the section opens the page. Inside a larger page, demote it to `h2` and the section H2s and the dialog title to `h3`, and keep the order.
- **Layout.** At 992px and wider, the hero text spans 7 columns and the pattern 5. The measure intro and dress form take columns 1 to 5 and the book 7 to 12. The tape sits in column 2 with the needle reading in column 1, and the panels take columns 3 to 12 (text 26em, drawing 16rem). In the collection section, content is held inside the frame's starting inset (24vw each side) so the frame never clips it. Below 992px everything stacks, the tape is a 44px strip, and the reading becomes a white tab on the tape.

| Token | Role |
|---|---|
| `--flannel` | Page ground: the suit cloth |
| `--thread` | Text and every mark on cloth: basting thread, white chalk, the needle |
| `--tape` | The tape measure; also the focus ring on cloth |
| `--card` | Manila pattern card: pattern pieces, measure book, week-1 card, dialog |
| `--black` | Ink on card and tape; the button hover fill on cloth |
| `--red-pencil` | Alteration mark on the forepart and form error marks (never text) |
| `--thread-muted`, `--thread-faint` | Secondary text on cloth (5.1:1); drawn outlines and resting underlines |
| `--ink-muted`, `--ink-rule` | Secondary text on card (6.0:1); ruled lines on card |
| `--shade`, `--cloth-shade` | Cloth in shadow (dress form, coats); the finished, pressed cloth in collection |
| `--twill` | The flannel's woven texture (under 4% contrast) |
| `--font-text`, `--font-tape` | Petrona for everything; Mohave only for what is printed on the tape |
| `--step--1` to `--step-4` | Perfect-fourth type scale from 1.125rem; H1 is a clamp |
| `--s-1` to `--s-10`, `--gutter`, `--gap`, `--measure` | 4px-based spacing, page gutter, grid gap, 34em text measure |
| `--week` | Length of one week on the tape (the scale of the whole timeline) |
| `--needle-at` | Where the sticky needle sits in the viewport (45%) |
| `--tape-w`, `--pin-len` | Tape width (4.25rem, 44px on phones); length of the drawn pin to each panel |
| `--r-card`, `--r-btn` | 2px radii for card objects and buttons |
| `--t-*`, `--ease-*` | Durations and curves for every CSS transition |
