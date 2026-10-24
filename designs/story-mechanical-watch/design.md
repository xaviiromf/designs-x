---
title: One movement, taken apart
section: story
subject: Atelier Ravoire, a fictional two-person workshop in Sainte-Croix that makes 24 watches a year around one hand-wound movement, Calibre R.30, giving the watchmaker's own product tour. The tour takes the movement apart in the order its power travels, shows how each piece is regulated, lists the specification and ends with a form that holds the next numbered watch.
aesthetic: Heat-blued steel. An exploded technical drawing in German-silver linework on a temper-blue ground, where the only colours are the movement's own materials, ruby jewels and gold chatons. Headings are set in a neoclassical roman from Breguet's decades, and everything else in a Swiss humanist sans with tabular figures.
mode: dark
fonts:
  - Ibarra Real Nova (Google Fonts, variable 400-700). Used for the display line, every h2 and the confirmation h3. It has no tabular figures, so it never carries readouts or aligned numbers.
  - Ysabeau Office (Google Fonts, variable 400-700). Used for body text, controls, the SVG callouts and the timegrapher readouts. Its figures are tabular and lining by default ('1111' and '0000' both measure 207px at 100px in the served build).
js: Builds the exploded-view stage from one scroll value (60 snapped frames, chapter index, ruby redraw of the active layer, caption swap, rail progress) and runs the 2.5 Hz balance that stops when the stack opens and restarts when it closes. It also drives pointer parallax between the layers and eases in-page anchors through Lenis with a section spy. The Index sheet, the timegrapher position switcher and the reserve form all work without the libraries. The form validates in place and confirms with a hold date computed as today plus 14 days.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, DrawSVGPlugin), Lenis 1.3.26]
tags: [story, product-tour, watchmaking, exploded-view, svg, scroll-driven, pinned, timegrapher, form, dark, gsap, lenis, detailed]
use_when:
  - A precision product made of real stacked parts (a movement, a camera lens, a pump, a synthesiser module, a bicycle hub), where taking it apart in a true order explains it better than a feature grid.
  - The parts can be drawn as a handful of flat layers (four to seven), each worth one short chapter.
  - The section should end in something the reader can act on without leaving the page, such as a reservation, a waiting list or an enquiry.
avoid_when:
  - The product has no meaningful inner structure, or the order of the chapters would be arbitrary. The rail's "n of 5" only works for a real sequence.
  - Photography is the selling point. The drawing is schematic linework, not a render.
  - The page cannot load scripts from a CDN and still needs the pinned tour. Without the libraries, everything still works as a static exploded drawing beside stacked chapters, but the scroll story is gone.
---

## Why it works

**The one bold idea: the movement comes apart under your scroll and goes back together.** Calibre R.30 is drawn once, in inline SVG, as six flat plan layers: main plate, barrel, gear train, escapement, three-quarter plate, and balance with cock. Each layer goes through the same isometric matrix (`matrix(.866 .5 -.866 .5 0 0)`), so the plates read as one stacked object. At the top of the sticky stage the movement is closed, and its balance beats at 2.5 Hz (five ticks a second, true to 18,000 vibrations an hour). Scrolling lifts the layers apart along the arbor axis in 60 snapped frames, and the balance runs down and stops. Five chapters then follow the power path, from the crown to the barrel, train, escapement and balance. In each chapter one layer redraws itself in ruby while the others dim. At the end of the pin the stack closes again, and once the last frame seats the balance restarts with an amplitude ramp under the line "Back together, it runs." Everything else on the page is quiet so that this reads.

- **The order is the content.** The chapters follow the real power path, so the numbering ("1 of 5" on the rail) encodes a true sequence. Winding lights the top plate's ratchet and crown wheel, because that is where your thumb's work enters the movement.
- **One value drives the stage.** A single ScrollTrigger gives progress `p`. Every state is derived from `p`: the frame, the chapter, the lit layer, the rail fill, and whether the balance runs. Chapter changes are time-based transitions, never scrubbed opacity, so the stage is always readable at rest. The last chapter is about 15% longer than the others.
- **Hidden-line drawing.** Every plate has an outline (drawn) and a fill (in the stage colour), each on its own element. Upper plates therefore hide the parts beneath them, as in a printed exploded view. On load the outlines draw from the bottom layer up, and each fill fades in halfway through its outline, so the movement visibly assembles.
- **Colour comes from materials.** The ground is heat-blued steel (`--steel-night`, `--steel-plate`) and the linework is German silver. Ruby is the jewel colour and gilt the chaton colour, the only two accents a real movement has. Ruby means "the part we are talking about" everywhere: the lit layer, the focus ring, the primary button, the chosen position. Gilt appears only on chatons and on the timegrapher's tolerance fan.
- **Instrument data, not hero numbers.** The rate, amplitude and beat error are readouts under a timegrapher trace, set in Ysabeau Office 600 at h3 size with tabular figures, so they never jitter while they tween. The trace is computed from the same data: slope comes from the rate, separation from the beat error, and the gilt fan shows the 0 to +6 s/day tolerance.
- **Contrast, checked (WCAG relative luminance):** silver on night 11.7:1, on plate 9.7:1. Rhodium on night 7.2:1, on plate 6.0:1. Ruby text on night 5.3:1, and ruby is never used as text on plate, where it is 4.4:1; errors sit on night. Night label on ruby 5.3:1, night on silver 11.7:1. Inactive callouts switch to rhodium instead of fading, so dimmed layers never take their labels below AA.
- **Subject truth.** 7.5 barrel turns at 8 hours each give the 60-hour reserve. The fourth wheel turns once a minute and carries the small seconds at six. The escape wheel has 15 teeth. The initials field allows 4 letters, which is the real space on a cock engraving. There is no slipping bridle, because that part belongs to automatic movements. The atelier is fictional, so the only contact is a mailto to an `.example` address, with no street address and no telephone number. The hold date is computed when the form is sent, so the confirmation stays true whatever day it is opened.
- **No dead ends.** Every link points to an existing id (`#top`, `#tour`, `#rate`, `#specs`, `#reserve`, `#ch-1` to `#ch-5`) or to a mailto that opens in a new tab with `rel="noopener"`. The form is `novalidate` and handled in JS. It confirms in place, and "Change details" returns to the filled form. `check-flows.mjs` passes.
- **Accessory removed.** The chapter captions carried a "2 of 5 Mainspring and barrel" line above each heading. On desktop the rail directly below says the same thing, so that line is now hidden while the stage is pinned at 992px and up. It stays on phones, where the rail is bars only, and in the stacked reduced-motion layout.

## Do not touch

- **The stage geometry.** The six layers must share one iso matrix. Pointer parallax moves the inner `g.par`, and the explode moves the outer `g.layer`; keep them on separate groups or they will fight. The SVG ships exploded (`translate` on each layer) so that no-JS and reduced-motion readers get the informative view. Only the motion branch closes it.
- **Time-based state on a scrubbed value.** Frames are snapped (`Math.round` over 59). Chapter light, caption swap and callouts react to index changes. Never scrub caption opacity or the ruby redraw.
- **Ruby means active, gilt means gold.** Do not use gilt as a second accent, and do not set ruby text on plate.
- **Readouts in Ysabeau Office.** Ibarra Real Nova has proportional figures. Moving the readouts to it would make them jitter while they tween.
- **Figures in the copy.** 18,000 vph, 2.5 Hz, 15 teeth, 60 h, 7.5 turns and 8 h each must keep agreeing with each other and with `POS` and the specification. Fix the copy if you change the movement.
- **Hidden starting states only under `html.js` and `prefers-reduced-motion: no-preference`.** The script removes `js` if any library failed to load.
- **The Index sheet stops Lenis and is not modal.** Escape returns focus to the button, a link sends focus to its target, and focus leaving the sheet closes it.

## Motion

Tier: detailed. GSAP 3.15.0 (core, ScrollTrigger, SplitText, DrawSVGPlugin) and Lenis 1.3.26 load from jsDelivr, pinned as in `research/motion-techniques.md` section 3. The `lenis.css` rules are inlined. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`), and `lenis.on('scroll', ScrollTrigger.update)` keeps the two in sync. Everything sits in one `gsap.matchMedia` with these conditions: `motion`, `reduce`, `fine` (`(hover: hover) and (pointer: fine)`), `wide` (992px) and `roomy` (1280px, room for callouts). Cleanup aborts every listener the branch added, removes the ticker callback, destroys Lenis, removes the ruby layer copies and the `staged` class, and resets the balance. Only transform, opacity, clip-path and stroke-dashoffset animate. The native cursor is never hidden.

| # | What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| L1 | Wordmark, bar links, Reserve pill, Index button | LD8 | load, t=0 | opacity 0 to 1, y -8 to 0, .6s power2.out, stagger .05 | shown |
| L2 | Drawing assembles bottom layer first | SC16 on the drawing (DrawSVG) | load, from t=.10 | outlines 0 to 100%, .9s power2.inOut, layer stagger .11. Fills, teeth (dasharray circles), chatons and jewels fade in 0 to 1 over .4s at half-draw | fully drawn and exploded |
| L3 | "One movement, taken apart." | TX1 | load, t=.35 after `document.fonts.ready` | SplitText lines in masks, yPercent 110 to 0, 1s expo.out, stagger .08, `autoSplit` (plays once) | plain text, no split |
| L4 | Lede, hero actions, static scroll cue | LD8 (opacity only) | load, t=.85 | 0 to 1, .6s power1.out | shown |
| L5 | Balance beats, the one ambient loop | ambient loop | load, t=1.3 | angle = amplitude x 160 deg x sin(2 pi phase), phase period .4s (2.5 Hz). Amplitude 0 to 1 over .8s power2.out on start, 1 to 0 over .4s on stop. Pauses off screen and whenever the stack is open | still |
| S1 | **Signature**: pinned stage, explode, power path, reassembly | SC3 + SC12 (frames computed in SVG) | one ScrollTrigger, `top <bar height>` to `bottom bottom` | wrapper `100svh - bar + 7 x 85svh` (70svh below 992px). p .12 to .24: frames 0 to 59, snapped. Chapters .24/.36/.48/.60/.72/.86. p .86 to .96: frames 59 to 0. At p of .96 and above: the end caption. The stack scales 1.45 (1.15 without callouts) closed to 1 open. Callouts fade in at frame 59 (.4s, stagger .04) and out when it closes (.2s) | not pinned; the drawing stays exploded with every callout, chapters stack as blocks (the drawing is CSS-sticky in its column on desktop) |
| S1b | Active layer redraws in ruby, others dim | DrawSVG redraw | chapter change | ruby copy: outlines 0 to 100% .7s power1.inOut, fades .45s after .2s; other layers to opacity .35, .45s power1.out; inactive callouts switch to rhodium | none (no light) |
| S2 | Chapter caption swap | TR1 | index change | out: yPercent 0 to 100 and fade, .25s power2.in, stagger capped at .12s total; in: yPercent 100 to 0, .6s expo.out, stagger capped at .35s. A swap that arrives while another is running skips the exit. `aria-live="polite"` | instant (stacked) |
| S3 | Rail progress, five segments | SC3 rail | same onUpdate | scaleX: done 1, current local progress, future 0, origin left | rail shown as a plain anchor list |
| S4 | First timegrapher trace prints | SC16 (scrubbed DrawSVG) | `top 70%` to `center 55%`, scrub, ease none | band lines and both dotted traces 0 to 100%, fan opacity 0 to 1. The trigger is released once complete | drawn |
| S5 | Specification row rules | SC16 | `top 88%`, once | scaleX 0 to 1 from the left (CSS variable `--s`), .9s expo.out, stagger .05 | static |
| I1 | "Skip the tour" | HV2 + clip-path reveal | focus | `inset(0 0 100% 0)` to `inset(0)`, .3s expo.out; underline sweep .45s | instant; on phones it sits visibly beside the rail |
| I2 | Wordmark | HV2 | hover, focus-visible | underline enters from the left and leaves to the right, .45s cubic-bezier(.35,0,0,1), .07em | static underline on hover; `:active` on touch |
| I3 | Bar links | HV2 + NV6 | hover, focus-visible, scroll | IntersectionObserver `-40% 0px -55% 0px` sets `aria-current` (persistent underline). Click: `lenis.scrollTo`, `min(1.3, .65 + d/4000)`s, offset for the bar, then focus the target | immediate jump, focus moves |
| I4 | Bar "Reserve no. 14" pill | HV4 + MI1 | pointer entry edge, focus | ruby fill scaleX from the entry side .4s in, .3s out toward the exit side, cubic-bezier(.65,0,.35,1); label silver to night; press .97 over .12s, release .4s cubic-bezier(.34,1.56,.64,1) | colour change only |
| I5 | Index button and sheet (below 992px) | MI2 + NV1 | click, Escape, link, focus leaving | label swap .35s cubic-bezier(.65,0,0,1); sheet clip-path `inset(0 0 100% 0)` to `inset(0)` .5s expo.out; links yPercent 100 to 0, .6s expo.out, stagger .05; closes at 1.6x timeScale; `lenis.stop()` while open | instant open and close |
| I6 | "Take it apart" | HV4 + MI1 | click | silver fill from the entry edge over the ruby button; scrolls to p .25 (start of chapter 1) and focuses the chapter | native jump to `#ch-1` |
| I7 | "Reserve no. 14 of 24" | HV2 + NV6 | hover, focus, click | as I2/I3 | as I2/I3 |
| I8 | Rail chapter links | HV7 (preview by dimming) + HV2 | hover and focus (fine pointers), click | lit layer's ruby copy at .6, others at .6 opacity, .3s power1.out, reverting on leave or blur; click scrolls to the chapter's middle | plain anchors to the stacked chapters |
| I9 | Pointer parallax between the plates | CU3 | pointer over the stage (fine + motion) | per-layer `quickTo` x/y, 1s power3.out, x = nx(4 + 5i)px, y = ny(2 + 3i)px, converted to SVG units; settles to 0 on leave | off |
| I10 | Timegrapher position (native radios) | NV4 + DrawSVG redraw + value tween | change, arrow keys | one ruby pill translates to the checked option, .4s power3.out (CSS); traces redraw 0 to 100%, .9s linear; readouts tween .6s power2.out, snapped to 1 s, 1 deg, 0.1 ms; label colour .2s on hover; summary in `aria-live` | indicator jumps; values and trace change instantly |
| I11 | Text fields | MI4 | hover, focus, submit | bottom rule .6 to 1 opacity (.2s); ruby rule scaleX from the left, .35s expo.out; label rhodium to silver; errors in reserved space, clip-path reveal .25s, `aria-invalid`, `aria-describedby`, focus on the first invalid field. No shake | instant |
| I12 | Case chips | MI3 | change | ruby jewel dot scale 0 to 1, .35s, overshoot close to back.out(2.5); outline rhodium to silver | no pop |
| I13 | "Hold no. 14 for me" | HV4 + MI1, then TX1 | submit | form fades .25s and the confirmation replaces it in place (panel height locked so the page does not jump); its h3 rises line by line (1s expo.out); focus moves to the h3; the bar pill and sheet link read "No. 14 held" | instant swap |
| I14 | "Change details" | HV4 + MI1 | click | reverses to the filled form, focus on the name field | instant |
| I15, I16 | "Email the atelier", colophon email, "Back to the start of the tour" | HV2 | hover, focus | as I2 | underline always shown on touch |

Differences from the approved plan: L6 (the scroll-cue nudge loop) and S6 (TX1 on the lower section headings) were cut at art direction, so the balance is the only ambient loop and masked lines appear only on the display line, the stage captions and the confirmation heading. Callouts show only from 1280px. Below that they would be under 12px, so the drawing switches to a tighter viewBox and grows. On phones "Skip the tour" sits beside the rail rather than under it, to keep the caption room on 548px-tall screens.

## Adapting

1. **Your object's layers.** Each `g.layer` holds `g.par > g.iso > plan geometry`, drawn as flat circles and paths around a plate of radius 100. Class `ln` marks an outline that draws, `fill` a plate fill in `--steel-plate`, `teeth` a circle with `pathLength` = 2 x teeth (fades, because DrawSVG cannot draw dashes), and `jewel`, `chaton` and `stone` the coloured details. The rotating part is `g.bal`; its timing lives in `osc` and `drawBal`. Keep four to seven layers, and set `DEPTH` (exploded y per layer, bottom to top) to match the markup's `translate`.
2. **Chapters.** Edit the five `article.chapter` blocks, the five rail links, `LIT` (chapter to layer) and `CH` (progress ranges, with the last one about 15% longer). With more or fewer chapters, change `--stage-chapters` and the ranges together. The chapter copy should fit 4 to 6 lines at 390px wide.
3. **Timegrapher.** `POS` holds `[rate, amplitude, beat error]` per position, and `trace()` turns rate into slope and beat error into line separation. For another instrument (a dyno sheet, a frequency sweep), keep the paper-feed draw and the readouts, and rewrite the trace function.
4. **Tokens.** Map your brand onto the six colours by role: one chosen dark ground, one stage surface, linework and text, secondary, one state colour (the "active part"), and one material accent used only in the drawing. Recheck the ratios listed above. Swap fonts through `--font-display` and `--font-text`. If the new text face lacks default tabular figures, add `font-variant-numeric: tabular-nums` to `.readouts dd`.
5. **Retiming or removing motion.** Load timing is in the `load` timeline. The explode window is set by `frameAt`, and its speed by `--chapter` (scroll length per step). Light and caption durations are in `lightTo` and `swap`, and CSS-driven micro-interactions use the `--ease-*` and `--dur-*` tokens. To drop the parallax, delete the `if (fine)` CU3 block. To drop the beating balance, never call `setRunning`. To drop the libraries entirely, remove the five CDN tags: the page then renders like the reduced-motion version, and the sheet, timegrapher and form keep working.

| Token | Role |
|---|---|
| `--steel-night` | Page ground, bar, Index sheet, labels on ruby and silver fills |
| `--steel-plate` | Drawing stage, plate fills (hidden lines), timegrapher paper, text fields |
| `--silver` | Text, drawing linework, secondary button fill |
| `--rhodium` | Secondary text, inner rims, inactive callouts, outlines of controls |
| `--ruby` | Active part, jewels, focus ring, primary button, chosen position, errors |
| `--gilt` | Gold chatons and the tolerance fan only |
| `--rule` | 1px rules, rail tracks, position outlines |
| `--font-display`, `--font-text` | Ibarra Real Nova for headings, Ysabeau Office for everything else |
| `--fs-cap` to `--fs-display` | Perfect-fourth scale from 17px; display clamps to 4.875rem so "One movement," fits five columns at 1440px |
| `--lh-body`, `--measure` | Body leading and measure |
| `--sp-1` to `--sp-10` | Spacing, 4px base |
| `--gutter`, `--col-gap`, `--max` | 12-column grid: clamp(16px, 4vw, 56px), 24px, 1440px |
| `--bar-h` | Tour bar height (56px, 52px below 992px), also the sticky offset and scroll padding |
| `--chapter`, `--stage-chapters` | Scroll length per step (85svh, 70svh below 992px) and steps in the pin (7) |
| `--r-ctl` | 999px for controls and chips; the stage and paper keep square corners |
| `--dur-fast`, `--dur`, `--dur-slow` | .25s, .45s, 1s |
| `--ease-out`, `--ease-sweep`, `--ease-fill`, `--ease-swap`, `--ease-spring`, `--ease-pop`, `--ease-ind` | expo.out, underline sweep, button fill, label swap, press release, jewel pop, indicator (power3.out) |
