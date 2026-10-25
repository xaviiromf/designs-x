---
title: The oyster to scale
section: story
subject: A scroll story for Tidewell Oysters (fictional), a farm growing Pacific rock oysters in mesh bags on trestles on the Merrow estuary flats, following one oyster from bag C-214 over three years, from 4 mm seed to the plate.
aesthetic: The inside of an oyster shell laid out as a specimen tray. A lilac-grey shell-interior ground, a violet-white nacre tray, a chosen blue-green slate ink and the purple-black mantle stain as the one accent, with the shell drawn in millimetres on a millimetre ruler.
mode: light
fonts:
  - Petrona (Google Fonts), variable weight 100 to 900 plus italic 400, the only family (H2 650, date H3s 500, body 400, readout 300, italic only for Magallana gigas); tabular figures for the rail, readout, measure lines and ruler
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

**The bold idea: the oyster to scale.** A full-width sticky nacre tray at the top of the story, like a specimen tray, holds an inline SVG whose viewBox units are millimetres (`0 0 100 69`), with a millimetre ruler in the same SVG. The drawing is `width: min(calc(100 * var(--mm)), 100%, …)`, so 100 mm on desktop, and where it shrinks the ruler shrinks with it and stays true to the shell. The page says "to scale", not "actual size": CSS millimetres are not physical millimetres on phones or HiDPI screens. At the start the reader sees only a 4 mm seed alone in a nacre field. Each dated chapter has its own view timeline, and as each one crosses the reading line the shell lays down one nested growth band: 4, 9, 28, 31, 62 and 88 mm. Each band scales from the size of the band before it (`scale(prev/curr)` to `scale(1)`, `transform-box: view-box`, origin at the hinge 6, 31), so it comes out from under the previous band the way a shell grows at its lip. The winter band, 28 to 31 mm, is visibly thin and darker. The drawing is the growth curve; no chart is needed.

- **One outline, six bands.** The 88 mm frilled outline is one generated path in `<defs>`; each band is a `<use>` of it scaled about the hinge with a small rotation (-5 to 3 degrees), so the bands look grown rather than copied. Strokes are `non-scaling-stroke`, so the seed keeps a visible edge.
- **Dates are the headings.** The content is a dated sequence, so the H3s are the dates ("April, year one" through "The week it reaches you") and there are no numbered markers or eyebrows. Each chapter ends with a measure line ("28 mm long, about 4 g") that repeats the readout in text, set as a quiet body-size line in mantle so the date stays the only heading in each chapter. Numbers and units are joined with `&nbsp;` so a measurement never wraps.
- **One index that also shows progress.** The rail in the stage is the only chapter list: seven links with a 1px track and a mantle bar that fills with that chapter's timeline. Done chapters stay full, the current one is partly filled, future ones are empty. The labels use one system at every width: Apr, May, Jul, Nov, Yr 2, Yr 3, Plate. Each `aria-label` starts with the visible label or contains it, then names the full heading (for example "Plate: the week it reaches you"). The rail is one row of 44px segments, at `--fs--1` below 900px and `--fs-0` above.
- **One structure at every width.** The tray spans the top and the chapters read below it in a single 62ch column that shares the tray's left inset, so the story is not a split screen and the reading line works the same on desktop and phone. Rail, shell and ruler share one box (`--draw-w`, at most 100 mm and capped by the tray height); the ruler's zero and the hinge sit 6 mm inside it. From 900px the tray is `max-width: 52rem`, sized to the drawing plus the widest readout, so it reads as a specimen tray, not a half-empty banner.
- **The readout is quiet.** A masked box (`overflow: clip`) holds six stacked values with tabular figures and rolls like an odometer: the new value rises in on its own chapter's timeline and the old one rises out on that same timeline and range, so the box is never empty at a chapter hand-off. The Plate chapter does not change the readout, because the shell does not change there. On wide screens it sits right of the ruler at weight 300 and `--fs-3`. Below 900px it moves inside the drawing, sized and placed in container units (`cqi`, so 1cqi is 1 mm of the drawing), sitting on the ruler's zero under the hinge, where the shell never reaches. That keeps rail, shell, ruler and readout inside a 50svh tray at 360x640. It is `aria-hidden` because every value is printed in its chapter.
- **The fallback is honest.** Everything scroll-driven is inside `@supports (timeline-scope: --a) and (animation-range: cover 0%)`. Without it (Firefox today) the stage is not sticky, sits above the chapters and shows the full-grown shell with all six bands, the readout "88 mm 92 g" and the caption "Six bands, one for each stage below." Hidden states exist only inside the supported branch.
- **No dead ends without script.** "Skip to ordering" and "Back to April, year one" keep the seven-viewport story from being a trap. Ordering is a `mailto:` with a prefilled subject and a `tel:` in the Ofcom drama range, both `target="_blank" rel="noopener"`. Farm walks are a native `<details>`.
- **Palette from the shell.** The ground `--silt` #E6E0EA is the lilac-grey of a Pacific oyster's shell interior, the tray `--nacre` #F7F5F8 its violet-white nacre, `--mantle` #5A3D66 the purple-black mantle stain. Contrast on silt: slate 11.3:1, mantle 7.1:1, mud 5.6:1. It keeps clear of the grey-green grounds used by other story and FAQ designs. Band fills are `color-mix` derivations of mantle and nacre, not new hex values.
- **Serif on a light ground, reasoned.** This is a read-through narrative, so a text serif carries it; the ground is lilac-grey, not cream, and the accent is mantle purple, not terracotta. Petrona has lining figures by default and working `tnum` (checked: '1111' and '0000' render at equal width with `tabular-nums`).
- **Cut at critique:** a seasonal colour handoff on the stage, a bag-mesh texture behind the drawing, a bouncing scroll arrow, a chapter list in the header (the rail is the index), an order form and popover (no script to handle them), the underline on the walks summary (the plus mark already says it opens), and finally the "mm" label at the end of the ruler (every readout and measure line names the unit).

## Motion

Simple tier: HTML and CSS only, no script. Scroll scrubs are `linear` (the scroll is the easing); every user-triggered transition uses `cubic-bezier(.16,1,.3,1)` (expo.out), leave faster than enter. The story wrapper declares `timeline-scope` for `--seed`, `--bags`, `--turning`, `--winter`, `--grading`, `--harvest`, `--plate`; each chapter sets `view-timeline: --<id> block` with `view-timeline-inset: calc(50% + var(--stage-h) / 2) calc(50% - var(--stage-h) / 2)`, a zero-height reading line halfway down the space under the tray (75% of the viewport on phones, about 70% on a 900px-tall desktop), so a band starts growing only once its date heading is visible under the tray.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Sticky stage | SC3 (CSS sticky) | native scroll | full-width tray, `top: 0`, height `min(392px, 62svh)`; below 900px full-bleed, 50svh, opaque; chapters 80svh, the last 15% longer; `scroll-margin-top` is the tray height plus 24px | still sticky |
| Band growth (bags, turning, winter, grading, harvest) | SC11 (native `animation-timeline`) | chapter timeline, `cover 0%` to `cover 45%` | `scale(var(--from))` and opacity 0 to `scale(1)`, opacity 1 by 15%; `--from` .44, .32, .90, .50, .70; linear, fill both | `steps(1, jump-start)`: band appears whole |
| Readout swap | TR1 adapted to scroll (odometer) | chapter timeline, `cover 0%` to `cover 48px` | incoming value animates `translate` from 100% to 0 on its own timeline; the outgoing value animates `transform` to -100% on the same (next chapter's) timeline and range, so the two move together; first value has no entry, last has no exit | `steps(1, jump-start)`: both swap at the same scroll position, so exactly one value shows |
| Rail fill | SC3 rail | chapter timeline, `cover 0%` to `100%` | `scaleX` 0 to 1 from the left, linear, fill both | `steps(1, jump-start)` |
| Seed pulse (the one ambient motion) | custom | page load, 1.2s delay | 1.5px mantle ring around the seed, scale 1 to 3.2, opacity 1 to 0, 1.4s expo.out, twice only | none |
| Anchor glides | NV6 (CSS-only) | any in-page link | `scroll-behavior: smooth` | instant jump |
| Skip, rail labels, back link (44px targets) | HV2 | hover (fine pointer), focus-visible | underline enters from the left .45s, leaves to the right .3s | underline always shown, no transition |
| Order and call buttons | HV4 (CSS) + MI1 | hover, focus-visible, press | mantle fill from the left .4s, out to the right .28s; press `scale(.97)` .12s, release .4s `cubic-bezier(.34,1.56,.64,1)` | colour change only |
| Walks details | CD6 | open / close | `::details-content` block-size with `interpolate-size: allow-keywords`, open .5s, close .32s; plus bar rotates 90deg to 0 into a minus | instant |

Reduced motion keeps the scroll gating on purpose (the art director kept `steps(1, jump-start)`): nothing moves smoothly, but each band, readout value and rail bar appears whole, in one step, when its chapter crosses the reading line, so the drawing still matches the text being read. All text, measure lines and the order block are visible at all times. The no-timeline fallback is the place where every element shows in its final state at once.

Verified in Chromium: bands appear in order with the thin dark winter band; the readout never overlaps the shell, and sampling every 10px of scroll at 1440x900 and 390x844, with and without reduced motion, the readout box is always exactly one value full (no empty hand-off); the 360x640 tray (320px) fits rail, shell, ruler and readout with no overflow; no horizontal scroll at 360 and 390; the fallback was checked by disabling the `@supports` branch. Hover was captured with fine-pointer emulation for the skip link and rail labels (underline enters from the left); the button hover rows were not in the captured viewport and are unverified. Ruler numerals are 3.8 mm, about 14px at 100 mm wide and 12px at 360.

## Do not touch

- **Millimetres in the SVG.** The viewBox is in mm, the shell and the ruler share it, and the ruler's 0 is at the hinge. Never scale the drawing separately from the ruler, and never claim actual size.
- **Band data and order.** 4, 9, 28, 31, 62, 88 mm, drawn outermost first so inner bands sit on top. `--from` on each band is the previous size over its own. The winter band stays thin and in `--band-winter`.
- **The `@supports` gate.** Hidden initial states (bands at opacity 0, stacked readout values, empty rail bars) must stay inside it, and the fallback must stay unstuck with the full shell and its caption.
- **The reading line.** The inset formula and `scroll-margin-top: calc(var(--stage-h) + var(--sp-4))` work together from the one `--stage-h`: an anchor lands its chapter under the tray and across the line, so the right chapter is current after any rail jump.
- **The phone readout position.** `left: 6cqi; bottom: 9.6cqi` puts it on the ruler's zero, under the hinge. Moving it up or right puts it under the grown shell.
- **One ambient motion**, run twice. Do not loop it.
- **Accessibility wiring:** the section is labelled by the H2; each article by its date H3; the SVG has `role="img"` and an `aria-label`; each rail link's `aria-label` contains its visible label and then the full heading (WCAG 2.5.3); the readout is `aria-hidden` because every value is in the text; focus is a 3px mantle outline with 3px offset, inset (-3px) on rail links so the ring stays inside the stuck tray.
- **No cards, shadows or radius**, apart from the 2px radius on the two buttons.

## Adapting

1. Change the `:root` colour tokens. Keep `--mud` at 4.5:1 or better on `--silt`, and let the band colours stay `color-mix` derivations of the accent and the stage field.
2. For another product, replace the outline path in `<defs>` (`#o`, drawn at full size with the hinge or origin at 0,0) and the band list: one `<g class="band grow">` per stage with its `scale()` (size over full size), `--from` (previous size over its own) and a `b-<chapter>` class mapped to a timeline. If the unit is not millimetres, change the ruler labels and the copy, not the method.
3. Chapters: one `<article id>` per band, each with a date H3, a short paragraph and a measure line. Add its timeline name to `timeline-scope`, a `#id { --tl: --id }` rule, a rail link and a readout span, and the `nth-child` mappings (a readout span takes its own timeline and the next chapter's, for the swap in and out). Keep seven or fewer so the rail fits one row at 360px.
4. Retiming: band growth length is `animation-range: cover 0% cover 45%`; chapter length is the article `min-height`. All user-triggered transitions are in the `prefers-reduced-motion: no-preference` block at the end; delete it to remove them. Delete the `@supports` block to ship only the static story.
5. Replace `orders@tidewelloysters.example` and the `tel:` number with the real ones, and the walk dates.

| Token | Role |
|---|---|
| `--silt` | Page ground, the shell interior's lilac-grey |
| `--nacre` | Stage field, button text on fills, base of the band mixes |
| `--slate` | Ink, headings, primary button fill and secondary button outline |
| `--mud` | Secondary text, readout weights, ruler ticks and labels, rail track |
| `--mantle` | Accent: band edges, rail fill, seed pulse, focus ring, button hover fill, plus mark |
| `--band-summer`, `--band-winter`, `--band-seed` | Band fills, mixed from mantle and nacre (22%, 62%, 80%) |
| `--font` | Petrona with Georgia fallback |
| `--fs--1` … `--fs-4` | Major third on 18px: phone rail and captions; body, measure lines and desktop rail; lede; date H3s; readout; H2 (clamped) |
| `--lh-body`, `--lh-head` | 1.65 body, 1.1 headings |
| `--sp-1` … `--sp-7` | Spacing 4, 8, 16, 24, 40, 64, 104px |
| `--gutter` | Side gutter, 16px to 48px |
| `--mm` | The drawing unit, 1mm |
| `--stage-h` | Tray height: `min(392px, 62svh)` desktop, 50svh below 900px; also sets the reading line and anchor offset |
| `--stage-chrome` | Space in the tray for the rail and padding; caps the drawing width so it fits the tray |
| `--inset` | The one left edge: tray contents, header, chapters and closing block (0 below 900px) |
| `--ease`, `--spring` | expo.out for transitions; overshoot curve for the button release only |
