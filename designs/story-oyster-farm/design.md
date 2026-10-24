---
title: The oyster to scale
section: story
subject: A scroll story for Tidewell Oysters (fictional), a farm growing Pacific rock oysters in mesh bags on trestles on the Merrow estuary flats, following one oyster from bag C-214 over three years, from 4 mm seed to the plate.
aesthetic: The inside and outside of an oyster shell. A grey-mauve outer-shell ground, a pearl-pink nacre stage, a chosen blue-green slate ink and the purple-black mantle stain as the one accent, with the shell drawn in millimetres on a millimetre ruler.
mode: light
fonts:
  - Petrona (Google Fonts), variable weight 300 to 640 plus italic 400, the only family; tabular figures for the rail, readout, measure lines and ruler
js: none
libraries: []
tags: [story, scroll-driven, animation-timeline, view-timeline, css-only, inline-svg, to-scale, food, aquaculture, light, serif, sticky, simple]
use_when:
  - A product grows, ages or is made in measurable stages over time (oysters, cheese, timber, wine in barrel, a tree, a child's shoe sizes), and one drawing can show every stage at once.
  - You want a multi-screen scroll story with no JavaScript at all, that still reads correctly where scroll timelines are missing.
  - The numbers are real and belong to the drawing, so the drawing can replace a chart.
avoid_when:
  - The stages do not share one physical object or one measurable dimension. The growth bands become decoration.
  - More than about eight chapters. The rail stops fitting on one row on phones and the story becomes a trap.
  - The page needs forms or in-page results. This section has no script; ordering is mailto and tel.
---

## Why it works

**The bold idea: the oyster to scale.** A sticky stage holds an inline SVG whose viewBox units are millimetres (`0 0 100 69`), with a millimetre ruler in the same SVG. The SVG is `width: calc(100 * var(--mm))` with `max-width: 100%`, so where it shrinks the ruler shrinks with it and stays true to the shell. The page says "to scale", not "actual size": CSS millimetres are not physical millimetres on phones or HiDPI screens. At the start the reader sees only a 4 mm seed alone in a nacre field. Each dated chapter has its own view timeline, and as each one crosses the reading line the shell lays down one nested growth band: 4, 9, 28, 31, 62 and 88 mm. Each band scales from the size of the band before it (`scale(prev/curr)` to `scale(1)`, `transform-box: view-box`, origin at the hinge 6, 31), so it comes out from under the previous band the way a shell grows at its lip. The winter band, 28 to 31 mm, is visibly thin and darker. The drawing is the growth curve; no chart is needed.

- **One outline, six bands.** The 88 mm frilled outline is one generated path in `<defs>`; each band is a `<use>` of it scaled about the hinge with a small rotation (-5 to 3 degrees), so the bands look grown rather than copied. Strokes are `non-scaling-stroke`, so the seed keeps a visible edge.
- **Dates are the headings.** The content is a dated sequence, so the H3s are the dates ("April, year one" through "The week it reaches you") and there are no numbered markers or eyebrows. Each chapter ends with a measure line ("28 mm long, about 4 g") that repeats the readout in text.
- **One index that also shows progress.** The rail in the stage is the only chapter list: seven links with a 1px track and a mantle bar that fills with that chapter's timeline. Done chapters stay full, the current one is partly filled, future ones are empty. On phones the rail is one row of 44px segments and "Year 2" shows as "Yr 2" (the full heading is the `aria-label`).
- **The readout is quiet.** Under the ruler a one-line mask (`overflow: clip`, height 1.2em) holds seven stacked values at weight 300 with tabular figures; the old value rises out as the new one rises in. It is `aria-hidden` because every value is printed in its chapter.
- **The fallback is honest.** Everything scroll-driven is inside `@supports (timeline-scope: --a) and (animation-range: cover 0%)`. Without it (Firefox today) the stage is not sticky, sits above the chapters and shows the full-grown shell with all six bands, the readout "88 mm 92 g, Size 2" and the caption "Six bands, one for each stage below." Hidden states exist only inside the supported branch.
- **No dead ends without script.** "Skip to ordering" and "Back to April, year one" keep the seven-viewport story from being a trap. Ordering is a `mailto:` with a prefilled subject and a `tel:` in the Ofcom drama range, both `target="_blank" rel="noopener"`. Farm walks are a native `<details>`.
- **Palette from the shell.** The ground `--silt` #E2D6DC is the grey-mauve of a Pacific oyster's outer shell, the stage `--nacre` #F6F1F2 its pearly inside, `--mantle` #5A3D66 the purple-black mantle stain. Contrast on silt: slate 10.3:1, mud 5.1:1, mantle 6.5:1. Band fills are `color-mix` derivations of mantle and nacre, not new hex values.
- **Serif on a light ground, reasoned.** This is a read-through narrative, so a text serif carries it; the ground is mauve, not cream, and the accent is mantle purple, not terracotta. Petrona is used nowhere else in the collection, has lining figures by default and working `tnum`.
- **Cut at critique:** a seasonal colour handoff on the stage, a bag-mesh texture behind the drawing, a bouncing scroll arrow, a chapter list in the header (the rail is the index), an order form and popover (no script to handle them), and finally the underline on the walks summary (the plus mark already says it opens).

## Motion

Simple tier: HTML and CSS only, no script. Scroll scrubs are `linear` (the scroll is the easing); every user-triggered transition uses `cubic-bezier(.16,1,.3,1)` (expo.out), leave faster than enter. The story wrapper declares `timeline-scope` for `--seed`, `--bags`, `--turning`, `--winter`, `--grading`, `--harvest`, `--plate`; each chapter sets `view-timeline: --<id> block` with `view-timeline-inset: 50% 50%` on desktop and `76% 24%` below 900px, a zero-height reading line. On phones the line sits at 76% of the viewport, in the text area under the 50svh stage, so a band starts growing only once its date heading is already visible under the stage (checked on the 390x844 and 360x640 scroll sheets).

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Sticky stage | SC3 (CSS sticky) | native scroll | desktop `top: 0; height: 100svh`; below 900px full-bleed, 50svh, opaque; chapters 90svh (80svh phones), the last 15% longer | still sticky |
| Band growth (bags, turning, winter, grading, harvest) | SC11 (native `animation-timeline`) | chapter timeline, `cover 0%` to `cover 45%` | `scale(var(--from))` and opacity 0 to `scale(1)`, opacity 1 by 15%; `--from` .44, .32, .90, .50, .70; linear, fill both | `steps(1, jump-start)`: band appears whole |
| Readout swap | TR1 adapted to scroll | chapter timeline, `cover 0%` to `100%` | rise in 0 to 6%, hold, rise out 94 to 100%; first value has no entry, last has no exit | `steps(1, jump-start)`: instant swap |
| Rail fill | SC3 rail | chapter timeline, `cover 0%` to `100%` | `scaleX` 0 to 1 from the left, linear, fill both | `steps(1, jump-start)` |
| Seed pulse (the one ambient motion) | custom | page load, 1.2s delay | 1px mantle ring around the seed, scale 1 to 2.6, opacity .8 to 0, 1.4s expo.out, twice only | none |
| Anchor glides | NV6 (CSS-only) | any in-page link | `scroll-behavior: smooth` | instant jump |
| Skip, rail labels, back link | HV2 | hover (fine pointer), focus-visible | underline enters from the left .45s, leaves to the right .3s | underline always shown, no transition |
| Order and call buttons | HV4 (CSS) + MI1 | hover, focus-visible, press | mantle fill from the left .4s, out to the right .28s; press `scale(.97)` .12s, release .4s `cubic-bezier(.34,1.56,.64,1)` | colour change only |
| Walks details | CD6 | open / close | `::details-content` block-size with `interpolate-size: allow-keywords`, open .5s, close .32s; plus bar rotates 90deg to 0 into a minus | instant |

Verified in Chromium: bands appear in order with the thin dark winter band; the 360x640 stage fits rail, shell, ruler and readout (the SVG has `preserveAspectRatio="xMinYMid meet"` and a `max-height` on phones, so it shrinks as a whole and stays flush left); the fallback was checked by disabling the `@supports` branch. Hover states could not be captured headless (it reports `hover: none`).

## Do not touch

- **Millimetres in the SVG.** The viewBox is in mm, the shell and the ruler share it, and the ruler's 0 is at the hinge. Never scale the drawing separately from the ruler, and never claim actual size.
- **Band data and order.** 4, 9, 28, 31, 62, 88 mm, drawn outermost first so inner bands sit on top. `--from` on each band is the previous size over its own. The winter band stays thin and in `--band-winter`.
- **The `@supports` gate.** Hidden initial states (bands at opacity 0, stacked readout values, empty rail bars) must stay inside it, and the fallback must stay unstuck with the full shell and its caption.
- **The reading line.** `--line` and the mobile `scroll-margin-top: 52svh` work together: an anchor lands its chapter below the stage and past the line, so the right chapter is current after any rail jump.
- **One ambient motion**, run twice. Do not loop it.
- **Accessibility wiring:** the section is labelled by the H2; each article by its date H3; the SVG has `role="img"` and an `aria-label`; rail links carry the full heading as `aria-label`; the readout is `aria-hidden` because every value is in the text; focus is a 3px mantle outline with 3px offset.
- **No cards, shadows or radius**, apart from the 2px radius on the two buttons.

## Adapting

1. Change the `:root` colour tokens. Keep `--mud` at 4.5:1 or better on `--silt`, and let the band colours stay `color-mix` derivations of the accent and the stage field.
2. For another product, replace the outline path in `<defs>` (`#o`, drawn at full size with the hinge or origin at 0,0) and the band list: one `<g class="band grow">` per stage with its `scale()` (size over full size), `--from` (previous size over its own) and a `b-<chapter>` class mapped to a timeline. If the unit is not millimetres, change the ruler labels and the copy, not the method.
3. Chapters: one `<article id>` per band, each with a date H3, a short paragraph and a measure line. Add its timeline name to `timeline-scope`, a `#id { --tl: --id }` rule, a rail link and a readout span, and the `nth-child` mapping. Keep seven or fewer so the rail fits one row at 360px.
4. Retiming: band growth length is `animation-range: cover 0% cover 45%`; chapter length is the article `min-height`. All user-triggered transitions are in the `prefers-reduced-motion: no-preference` block at the end; delete it to remove them. Delete the `@supports` block to ship only the static story.
5. Replace `orders@tidewelloysters.example` and the `tel:` number with the real ones, and the walk dates.

| Token | Role |
|---|---|
| `--silt` | Page ground, the outer shell's grey-mauve |
| `--nacre` | Stage field, button text on fills, base of the band mixes |
| `--slate` | Ink, headings, primary button fill and secondary button outline |
| `--mud` | Secondary text, readout weights, ruler ticks and labels, rail track |
| `--mantle` | Accent: band edges, rail fill, seed pulse, focus ring, button hover fill, plus mark |
| `--band-summer`, `--band-winter`, `--band-seed` | Band fills, mixed from mantle and nacre (22%, 62%, 80%) |
| `--font` | Petrona with Georgia fallback |
| `--fs--1` … `--fs-4` | Major third on 18px: rail and captions, body, lede and measure lines, date H3s, readout, H2 (clamped) |
| `--lh-body`, `--lh-head` | 1.65 body, 1.1 headings |
| `--sp-1` … `--sp-7` | Spacing 4, 8, 16, 24, 40, 64, 104px |
| `--gutter` | Side gutter, 16px to 48px |
| `--mm` | The drawing unit, 1mm |
| `--stage-h` | Stage height: 100svh desktop, 50svh below 900px |
| `--line` | View-timeline inset (reading line): `50% 50%` desktop, `76% 24%` below 900px |
| `--stage-pad` | Stage inset shared by rail, drawing and readout |
| `--ease`, `--spring` | expo.out for transitions; overshoot curve for the button release only |
