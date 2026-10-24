---
title: The curtain call
section: team
subject: The touring company of Fellside Fit-Up, a fictional small-scale theatre company from the Cumbrian fells, on its autumn 2026 village-hall tour of The Winter's Tale (41 halls, 9 September to 28 November, one Luton van, 13 people).
aesthetic: Rehearsal-room mark-out. A grey sprung floor, a black dance floor, spike tape in one colour per department, and the company drawn as prompt-book blocking circles, set in a playbill gothic and Baskerville.
mode: light
fonts:
  - League Gothic 400 (Google Fonts), display only. The headline, people's names, the initials in the circles and the name tags.
  - Libre Baskerville 400, 400 italic, 700 (Google Fonts), everything else. Parts are in italic, as in a printed programme, and 700 is used only for "Clear the stage".
js: Lenis smooth scroll on the GSAP ticker. A get-in load sequence builds the stage plan. Selecting a person (circle, arrow keys, or their row in the programme list) draws a move arrow, walks them to down centre, closes the line toward them by distance and lands the follow-spot on them. The surtitle caption swaps, and their programme note opens with Flip. On fine pointers the spot hunts the pointer, and every row lights its person on the plan. The house lights dim on scroll.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Flip), Lenis 1.3.26]
tags: [team, theatre, ensemble, blocking-diagram, ground-plan, spike-tape, ripple, follow-spot, sticky, flip, gsap, lenis, light]
use_when:
  - A company whose people have real places relative to each other, such as a cast and crew, a band on a stage plot, a kitchen brigade, a surgical team, a crew on a boat or a team at a race pit.
  - The group splits into a few departments that a colour can honestly encode.
  - You want one rich interaction rather than a grid of portrait cards, and there are no photographs.
  - 6 to about 16 people. The plan needs a mark for each of them.
  - The page can carry a scripted, choreographed section (detailed tier).
avoid_when:
  - Faces matter, for example a clinic or an agency whose clients choose a person. Use a portrait design.
  - More than about 16 people. The curtain-call line gets too dense for 28px targets on a phone.
  - The people have no spatial relationship, so the plan would be decoration.
  - The page must work fully without JavaScript. The page still reads, and the notes open, but nothing moves.
---

## Why it works

**The bold idea: the curtain call.** The section is a top-down ground plan of the fit-up stage, drawn the way a stage manager draws blocking in the prompt book. Every member of the company is a circle with their initials, and a small notch shows which way they face. The eight actors stand on orange spike marks in the curtain-call line. Stage management are in the prompt corner (on the audience's right, because UK prompt side is stage left) and at the sound and light desk, and the creative team sit in Row A. Pick anyone and three things happen at once. A pencilled move arrow unrolls from where they stand to the down-centre mark, and they walk down it and bow. The rest of the line closes the gap and turns toward them, nearest first (TR3 ripple by distance). The follow-spot slides onto them. The surtitle caption then changes to their name and parts, and their programme note opens in the list. Choosing someone from stage management or the creative team sends the cast back to their marks, rippling outward from the centre, and the spot finds that person where they work. "Clear the stage" (or Escape) plays the same ripple and sends the spot back to centre. Everything else on the page supports this moment: the page load is the get-in that builds the plan, and scrolling to it brings the house lights down so the spot reads.

- **Light, because a rehearsal room is light.** The obvious theatre page is a dark auditorium with red velvet and gold (default 2, and a cliché). This design lives in the rehearsal room in daylight instead: grey sprung-floor vinyl (`#D3D6D0`), white gaffer tape and programme paper (`#F5F6F2`) and blue-black marker ink (`#1E2430`). The only dark area is the literal dance floor, which real fit-up companies lay in black so that spike tape shows up on it.
- **Colour encodes department, everywhere it appears.** Fluorescent orange is the cast, blue is stage management and pink is the creative team. It appears on the spike marks, the facing notches, the hover ring, the group tape strips and each row's tape strip. Colour never carries text on the floor: orange and pink sit next to ink, and the names and jobs are always written out.
- **Type from playbills.** League Gothic revives Alternate Gothic, the condensed wood-type gothic of touring playbills. It sets the headline, the names in the list (in the cast-list convention), the initials and the name tags. Libre Baskerville carries everything else. Baskerville faces were standard on 18th- and 19th-century playbills, and the parts each actor plays are set in italic, as in a printed programme. Baskerville sets wide, so the body is 16px with 1.7 leading, the lead is 19px, and notes are capped at 58ch.
- **Leader dots carry meaning.** Programme rows use name, dotted leader, parts, because the leader pairs a name with its parts. Below 600px the leader drops and the parts sit under the name. Rows are separated by space, not rules.
- **Everyone has a real place.** An earlier plan used a separate dialog for crew notes. Unifying everyone onto the plan (prompt corner, desk, Row A) gave one selection model and removed the dialog.
- **Plain copy.** There are no stat tiles, eyebrows or middle-dot meta strings. The facts (17 parts, 41 halls, the 760 mm door at Garsdale) live in sentences, and meta is written as a sentence: "From Sedbergh; with us since 2012."
- **Cut at critique.** CU2 (cursor-following portrait cards with giant cropped initials), HV7 sibling dimming (ink at 0.5 opacity on the floor fails AA), the NV4 sliding nav indicator, a stat row, a handwritten marker face for the initials, DrawSVG (every tape strip and the arrow are straight `scaleX` strokes), the T-shaped stem of each spike mark (once the line re-spaced, the stems read as clutter), and, as the last accessory removed, the vertical "Wings" label. The masking legs say "wings" without it.

## Motion

Everything runs inside `gsap.matchMedia` with the conditions `motion`, `reduce` and `fine` (`(hover: hover) and (pointer: fine)`). The house eases are expo.out for entrances and follows (`--ease-out`), expo.inOut for wipes and moves (`--ease-move`), and none for the scrub. A leave runs about 30% faster than its enter. Lenis runs from `gsap.ticker` (`autoRaf: false`, lerp 0.1, `lagSmoothing(0)`). Anchors go through `lenis.scrollTo` with duration `min(1.3, .65 + distance / 4000)`, then focus moves to the target. The page has no menu or dialog, so Lenis never needs stopping. The selection state (`active`) lives outside matchMedia, so when a query flips, `paint()` re-applies it with `gsap.set`. Hidden first-frame states exist only under `html.js:not(.played)` with no reduced-motion preference. If the CDN fails, the `js` class is removed and the page shows its final state, and selection still opens notes and moves people (without animation). The callback's cleanup aborts its `AbortController`, removes the ticker and destroys Lenis.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Wordmark and nav arrive | LD8 | load 0.00 | y -12 to 0 and fade, 0.7s, stagger 0.05 | static |
| Headline rises out of line masks | TX1 | load 0.10, after `document.fonts.ready` (1.2s cap) | yPercent 120 to 0 (clear of the mask padding), 1.0s, stagger 0.1 | static, no split |
| Intro fades in | fade | load 0.35 | 0.8s, ease none | static |
| Black dance floor laid | MD1 (no counter-scale) | load 0.40 | clip-path inset(0 50% 0 50%) to inset(0), 0.8s expo.inOut | static |
| Tape unrolled: setting line, centre line, masking legs, Row A edge | SC16 | load 0.70 | scaleX (centre line scaleY) from the start end, 0.7s expo.inOut, stagger 0.06 | static |
| Plan labels written on | fade | load 0.95 | 0.5s, stagger 0.04 | static |
| Spike marks slapped down | SC16 (cross variant) | load 1.00 | scale 0.6 to 1, rotation -8 to 0, 0.4s, stagger 0.03 | static |
| The company walks on from the nearer wing, centre marks first | TR3 | load 1.20 | x from the wing, 0.9s expo.out, stagger 0.05; crew and creatives scale 0.8 to 1, 0.5s | in place |
| Notches turn from the walking direction to the audience | rotation | load 1.80 | 0.4s | facing front |
| Caption rises; follow-spot fades on | TR1, fade | load 1.90 | lines 0.5s, stagger 0.07; spot 0.6s | static |
| **S1 House lights down** | SC9 adapted, scrubbed | `#stage` from `clamp(top 85%)` to `top 15%` | hall dim 0 to 0.25 ink, stage working-light wash 0.14 to 0, spot 0.5 to 1; ease none | end state, static |
| **S2 Department tape laid** | SC16 | each group tape at `top 90%`, once (created at load 1.00) | scaleX 0 to 1 from the left, 0.8s expo.inOut | static |
| **S3 Sticky stage** | CSS `position: sticky` | always | none (no ScrollTrigger pin), so Space, Page Down and find-in-page work | same |
| **Signature: the curtain call** | TR3 + TR1 + CD5/CD6 | click, tap, Enter or Space on a circle or a row | old arrow erased toward its start, 0.25s; previous mover back, 0.5s expo.inOut; new arrow unrolls 0.45s expo.inOut, head pops 0.2s; walk to down centre 0.7s expo.inOut from +0.15s; the line re-spaces by rank (step upstage 10, 6, 3, 0 units; turn 35, 25, 15, 8 degrees), 0.6s expo.out, delay 0.1 + rank x 0.04; bow (scale 0.86) 0.18s and back 0.5s; spot 0.7s expo.out | everything set at once, arrow shown static, note opens instantly |
| Crew or creative chosen, or the stage cleared | TR3 | same, or "Clear the stage", or Escape | cast back to marks rippling out from the centre, 0.5s expo.out, stagger 0.04; spot 0.7s | instant |
| Surtitle caption swap, announced politely | TR1 | each selection | out yPercent 0 to -100, 0.25s expo.in; in 100 to 0, 0.5s expo.out, stagger 0.07 | instant text |
| Programme note opens | CD6 done with CD5 Flip | each selection | Flip of the rows and group heads, 0.5s expo.inOut (close 0.35s); note text fades in over 0.3s after the rows settle; then `lenis.resize()` and `ScrollTrigger.refresh()` | instant |
| Follow-spot hunts the pointer while nobody is chosen | CU4 adapted | fine pointer over the plan | `quickTo` x/y, 0.6s expo.out; back to down centre in 0.8s on leave | off, spot at down centre |
| Plan circle: tape ring and name tag | ring scale, clip wipe | hover, focus-visible, row hover or focus, chosen | ring 0.7 to 1 and fade, 0.3s expo.out; tag clip-path from the left, 0.35s expo.inOut (leave 0.25s) | appear without motion |
| Plan circle press | MI1 | `:active` | disc scale 0.94, 0.12s; release 0.45s expo.out | colour only |
| Programme row | strip scaleY + MI1 | hover, focus-visible, open | department strip scaleY 1 to 2.5, 0.3s expo.out; press 0.98 | strip shown, no motion |
| Wordmark, nav, caption and footer links | HV2 | hover from either side, focus-visible | 0.12em ink underline from the pointer's entry side, 0.4s in; leaves by the other side, 0.28s. Links inside copy keep a resting hairline | static underline |
| "Clear the stage" | HV4 + MI1 | hover, focus-visible, press | ink fill scaleX from the entry edge, 0.4s in, 0.28s out; label turns chalk; press 0.94 | colour swap |
| Skip link | slide | focus | translateY(-110%) to 0, 0.3s expo.out, 2px ink outline | appears instantly |

Touch: the load sequence and scroll moments play the same, on native scroll (Lenis leaves touch alone). Hover effects sit under `@media (hover: hover)`. A tap selects. Name tags show only for the chosen person. Links keep their underline, and buttons answer with the press scale and an `:active` fill. Keyboard: Tab enters the plan at the chosen person (or the first). Arrow keys, Home and End move between people (roving tabindex). Enter and Space choose. Escape clears the stage from the plan, the caption or the list; from the caption, focus moves to the person who was cleared, since the caption buttons disappear. Focus outlines are chalk on the stage and ink in the hall and elsewhere.

## Do not touch

- **One selection model.** A circle, a row and the keyboard all call `select(id)`. Choosing the chosen person again clears the stage. Each call jumps the previous timeline to its end (`progress(1)`) before building its own, so rapid taps never stack, and the load timeline is finished first, so nothing waits on the get-in.
- **Positions are plan units.** Each person's home is `--x`/`--y` in an 800 x 620 plan, placed with `left`/`top` percentages. GSAP moves them by x/y in pixels, computed as units x width / 800 and re-applied by a ResizeObserver. Keep `aspect-ratio: 800 / 620` on `.plan`, or every position drifts.
- **28px targets on phones.** The curtain-call marks are 76 units apart (not 62), and the plan is full-bleed below 600px. That keeps the 28px circles at least 6px apart at 360px wide. Fewer, wider marks are fine. More marks need fewer people or the list as the main touch path.
- **The house never dims below 6:1.** The hall dim stops at 0.25 ink, where ink labels on the dimmed floor are 6.6:1. At 0.30 they fall to 5.95:1.
- **Only transform, opacity and clip-path animate.** The accordion is a Flip of the row buttons and group heads (only transforms), and the tape and arrow are `scaleX` strokes. Do not swap in `height`, `grid-template-rows` or DrawSVG.
- **The caption keeps its height.** `--cap-h` reserves room for a name, a parts line and the two actions, so the sticky stage never changes height and the list never jumps under a finger when someone is chosen.
- **Sticky, not pinned.** The stage uses CSS `position: sticky` (desktop top 24px; below 992px top 0, only when the viewport is at least 700px tall). Anchors into the list use `scroll-margin-top` set from the stage's measured height (`--stick`).
- **Contrast:** ink on floor 10.6:1, on chalk 14.3:1; ink-soft on floor 5.8:1, on chalk 7.9:1; chalk on the dance floor 14.3:1 (9.4:1 under the working-light wash); ink on the fully dimmed hall 6.6:1. Orange (6.6:1 with ink), blue and pink are never text on the floor.

## Adapting

1. **Tokens first.** Map the room onto `--floor`, `--chalk` and `--ink`, and one colour per group onto `--spike-orange`, `--spike-blue` and `--spike-pink` (rename them with your groups, and keep `[data-dept]` in step). Check ink at 0.25 over the new floor for 6:1 or more before keeping the dim.
2. **Your people.** Each person is one plan button (`data-id`, `data-dept`, `--x`/`--y`; cast also get `data-line`; fixed people get `data-face`, their facing in degrees, and `data-zone="hall"` for an ink focus ring) plus one programme row (`#rb-<id>`, `#note-<id>`). The caption reads the name and parts from the row, and the button's `aria-label` is written by hand ("Ama Owusu, Hermione and Dorcas"). For a band, a kitchen or a pit crew, redraw the plan's tape and labels (`.t`, `.mk`, `.lb`) and move "down centre" (`DC`) to the place where the chosen person should stand.
3. **The line.** `X0`, `X1`, `LINE`, `STEP` and `TURN` at the top of the script define the curtain-call line and the ripple table. The seven who stay re-space evenly between `X0` and `X1`.
4. **Copy.** Names under about 18 characters keep the leader row on one line in the 5-column list. Parts and jobs stay short ("Composer and music director" is the longest that fits). Notes are one or two sentences, and meta is one sentence.
5. **Retime or remove motion.** CSS durations and easings are tokens (`--dur-*`, `--ease-out`, `--ease-move`). Script timings are literals in two places: the get-in master timeline (positions 0 to 1.9s) and `select()`. To remove an effect, delete its tween. `select()` and `paint()` still place everything, because a timeline under reduced motion is simply jumped to its end. To drop GSAP and Lenis entirely, remove the five CDN tags: the script falls back to instant selection with CSS `translate`, and the `js` class (and with it every hidden first-frame state) is removed. If you keep GSAP but delete the get-in, also add the `played` class, or the `[data-rv]` elements stay hidden.
6. **Stack translation.** Keep `layout()`, `select()`, `notes()` and `paint()` as plain functions over a people array, and run the matchMedia block in a `useGSAP` hook. The selection state lives in your store, outside the effect.

| Token | Role |
|---|---|
| `--floor` | Page ground and the hall on the plan (grey sprung floor) |
| `--chalk` | Gaffer tape, circles, name tags, caption bar, open notes |
| `--ink` | Text, the dance floor, walls, focus rings in the hall, the hall dim |
| `--ink-soft` | Meta lines, leader dots, the footer's "Doors 7pm" |
| `--spike-orange`, `--spike-blue`, `--spike-pink` | Cast, stage management, creative team |
| `--font-display`, `--font-text` | League Gothic, Libre Baskerville |
| `--fs-label` | Plan labels, 13px italic |
| `--fs-small`, `--fs-body`, `--fs-lead` | Parts, buttons and meta; notes; intro |
| `--fs-tag`, `--fs-group` | Name tags on the plan; group and footer headings |
| `--fs-name`, `--fs-caption`, `--fs-display` | Row names; the caption name (in `cqw` of the caption bar, so long names fit beside its buttons); the headline (line-height 0.86) |
| `--sp-1` to `--sp-9`, `--gutter`, `--max` | 4, 8, 12, 16, 24, 32, 48, 72, 112px; clamp(16px, 4vw, 56px); 1440px |
| `--cap-h` | Reserved caption height (128px desktop, 104px tablet, 84px phone) |
| `--dot`, `--tape` (on `.plan`) | Circle diameter max(28px, 5.4cqw); tape thickness max(3px, 1cqw) |
| `--ease-out`, `--ease-move` | expo.out, expo.inOut |
| `--dur-in`, `--dur-out`, `--dur-ring`, `--dur-tag`, `--dur-tag-out`, `--dur-strip`, `--dur-press`, `--dur-release`, `--dur-skip` | Hover enter and leave, ring, tag wipe in and out, row strip, press and release, skip link |
