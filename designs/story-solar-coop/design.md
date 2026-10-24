---
title: The roof is the chart
section: story
subject: Ropery Lane Solar Co-operative, a fictional community energy co-op that owns a 288-panel array on the roof of Ropery Lane Baths, explaining to its 236 members how the roof earned £12,980 in the year to 31 March 2026 and where every pound went, with a calculator for what one member's shares paid.
aesthetic: Standing on a flat roof. A mid-grey membrane ground, navy cell blue, inverter amber and pool-tile teal, taken from the array, the kit and the baths underneath; a sturdy slab serif for headings and Mozilla's Fira Sans for everything with a figure in it.
mode: light
fonts:
  - Bitter, 600 and 700 (Google Fonts), headings and the result total only, always with lining-nums tabular-nums
  - Fira Sans, 400/500/600 (Google Fonts), body, rail, legend, form and every figure, with tabular-nums
js: Builds the 288-cell roof from one DATA object (largest-remainder apportionment per chapter), tracks scroll to set the current chapter, rail progress and aria-current, runs the share calculator with in-page validation and result, and console.asserts that every sum and printed figure matches DATA.
libraries: []
tags: [story, scroll, sticky, unit-chart, solar, cooperative, community-energy, calculator, form, details, light, simple]
use_when:
  - A member-owned or community organisation explaining where money came from and where it went, in four to six steps that are a real sequence.
  - The subject has one physical thing made of countable units (panels, seats, plots, beds, moorings) that can be repainted to mean something new in each step.
  - The section should end in a personal answer ("what did my share do?") without leaving the page.
avoid_when:
  - The figures do not divide sensibly into a few hundred units, or the reader needs exact values more than proportions.
  - Dark or glossy brands; the idea depends on a plain grey roof seen in daylight.
  - Investment promotions that need regulated risk wording; the calculator here describes last year only and says interest is not guaranteed.
---

## Why it works

**The one bold idea: the roof is the chart.** One drawing of the co-op's real array, 288 portrait panels in 24 columns by 12 rows, stays put in a sticky stage while the chapters scroll past, and each chapter repaints the same panels with a new meaning. Raise: every panel an outline, about £410 of members' money. Build: all navy, installed. Generate: each row becomes a month (April at the top, labels appear) and lit amber panels show that month's kWh against June's full row, so the roof turns into a bar chart (June 24 panels, December 4). Sell: 196 teal for the 74,400 kWh the baths used, 92 grey for the 35,000 kWh exported. Pay: the panels sort into the £12,980 split, left to right in panel order: 58 running costs, 20 hatched inverter reserve, 105 interest, 78 capital repaid, 27 community fund. The reader sees one object they own become five different answers.

- **A sweep, not a scrub.** Each repaint is a time-based transition that runs in column order like sunlight crossing the roof (`--c * 14ms + --r * 6ms`, about 680ms in all). It only fires when the chapter changes, so the roof is never caught half-way at rest; quick scrolling just retargets the transitions.
- **Counts are apportioned, not rounded.** Every chapter's cell counts come from one largest-remainder (Hamilton) function over 288. With `Math.round` the Pay split would be 58+20+105+79+27 = 289, because capital is 78.55. The same function sets Sell and the Generate rows (173 lit cells shared across months).
- **One DATA object.** Months, sales, prices, payout and rates live at the top of the script. `runSelfTest()` runs on every load with `console.assert`: months sum to 109,400; used plus exported equals generation; sales at 15p and 5.2p make £12,980; the payout sums to income; interest and capital are 4% and 3% of £118,000; each chapter's groups sum to 288; and every printed figure in the prose (`data-k`) and the month list (`data-m`) matches DATA. Loading `#selftest` logs `SELFTEST PASS`.
- **The prose never moves.** Only the roof, rail and legend are sticky. Chapter text scrolls in normal flow, so it is readable at rest, works with find-in-page and anchors, and carries every figure. Without JS the stage is hidden (`html:not(.js) .stage`) and nothing is lost; the roof is `aria-hidden`, and "Month by month" is the text alternative for the roof-as-chart.
- **Numbers live in sentences.** No hero stat, no readout on the stage (default 6 avoided). Figures sit in the prose, the legend and the payout list, right-aligned with tabular figures.
- **Ground moved off the collection's pale greys.** The page is the roof membrane, `--ground` #B9BEC2, a mid grey no other design uses as a ground. The reader is standing on the roof the panels sit on.
- **Contrast, checked (WCAG relative luminance):** navy ink on ground 8.2:1; `--meter-ink` #3F4A55 on ground 4.8:1; `--pool-ink` #0C4E58 (links, focus ring) 5.0:1; navy on the input field `--unlit` 10.9:1; ground-coloured button label on navy 8.2:1. Amber is never text. Fill pairs: amber next to navy 6.9:1; the Sell pair, teal `--pool` #2A9AA0 against `--meter` #5E6A75, is 1.6:1, so it is separated by hue and position as well and labelled in the legend. Colour is never the only key: every group is named in the legend and in the prose.
- **Type, checked in headless Chromium on 2026-10-23 against the served Google build:** Fira Sans with `tabular-nums` sets "1111" and "0000" both at 224.0px at 100px, and its default figures are lining. Bitter defaults to oldstyle figures ("3456789" measured 393px by default, 441px with lining-nums), and every heading here contains a number (236, 288, 109,400, £12,980), so `h2, h3, .total` set `font-variant-numeric: lining-nums tabular-nums`. This is the Bitter version of the Alegreya lesson: check a serif's default figures before putting numbers in headings.
- **No template chrome.** No eyebrow over the H2, no 01-05 on the rail (the `<ol>` already encodes the sequence), no monospace, no arrows on links, no mailto to a made-up address. Radius follows the object: panels 1px, input and button 8px.
- **No dead ends.** Skip link to `#your-share`, five rail anchors, a `<details>` list, a `novalidate` form handled in JS with in-page errors and an in-page result, "Change the amount" back to the input, and "Back to the start of the story" to `#story-top`. No external links.

## Motion

Tier: simple. No libraries, no load sequence, no ambient motion (the one allowed slot is left empty on purpose: the sweep already answers the reader's scroll, and an idle sheen would compete with it). All transitions sit inside `@media (prefers-reduced-motion: no-preference)`; under reduce every change is instant with the same end state, and the sticky stage stays. Hover styles sit inside `(hover: hover)`; on touch the underlines are drawn permanently.

| # | What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| S1 | Chapter index and local progress from cached chapter positions (one passive scroll listener, rAF-throttled; positions cached on load, resize, `fonts.ready` and a ResizeObserver on the prose; only `scrollY` read per frame). Reading line: 45% of the viewport on desktop, 30% into the uncovered area under the mobile stage | SC11 (vanilla progress) | scroll | per frame, no easing | unchanged (tracks the user's own scroll) |
| S2 | **Signature**: roof repaint as a column sweep | SC3 (CSS sticky stage, no library) | `data-ch` change | `background-color` 280ms `cubic-bezier(.2,.7,.2,1)`, delay `--c * 14ms + --r * 6ms`; the reserve hatch is an `::after` opacity on the same delay | instant |
| S3 | Month labels appear beside the roof in Generate | opacity | chapter 3 in / out | in 200ms ease-out after 250ms; out 120ms | instant |
| S4 | Legend swap, five pre-rendered legends stacked in one grid cell | opacity + visibility | `data-ch` change | in 250ms ease-out after 120ms; out 150ms | instant |
| S5 | Rail fill: done 1, current local progress, future 0 | SC3 rail, `transform: scaleX(var(--p))` | scroll | no transition (scroll-linked) | unchanged |
| S6 | Stage pin: 100svh in the right 7 columns on desktop; about 46svh at the top on mobile (47% at 360x640) with chapters of 80svh | `position: sticky` | always | none | kept (sticky is not animation) |
| I1 | Skip link, back-to-start link, "Month by month" summary, "Change the amount": underline sweeps in from the left, leaves to the right | HV2 | hover, focus-visible | 400ms `cubic-bezier(.35,0,0,1)` | static underline |
| I2 | Rail links: `aria-current="step"` on the current chapter bolds the label (no shift: a hidden bold duplicate reserves the width); hover darkens label and track | NV6 section spy | scroll, hover | 150ms ease-out | instant |
| I3 | Month list opens to its real height; chevron turns 90deg | CD6 (`::details-content`, `interpolate-size: allow-keywords`) | toggle | open 400ms, close 280ms `cubic-bezier(.625,.05,0,1)`; chevron 200ms | instant; browsers without `::details-content` open instantly |
| I4 | Amount field: border to navy on focus; on submit only, error row grows from 0fr to 1fr, `aria-invalid`, focus returns to the input. No shake | MI4 | submit | border 150ms; error 250ms | instant |
| I5 | "Work out my year": navy fill wipes in from the left, label flips to ground; press scales to .97 | HV4 (CSS-only, fixed left edge) + MI1 | hover, focus-visible, `:active` | in 350ms, out 220ms; press 120ms, release 350ms `cubic-bezier(.34,1.56,.64,1)` | colour change only |
| I6 | Result fades in; one panel glyph per panel your money paid for fills from the bottom, the last one to its fraction | opacity + `scaleY` | valid submit | 250ms; fills 450ms, stagger `min(80ms, 600ms / n)` | final state |
| I7 | "Change the amount" hides the result, focuses and selects the input | MI1 press | click | as I5 | no scale |

**Reasoned exceptions.** (R7) The roof repaint animates `background-color` on 288 small elements, which is paint-only (no layout) and runs once per chapter change, never per frame. The transform/opacity-only rule binds Detailed designs; this Simple design takes the exception because a colour change is the meaning of the chart. (R9) SC3's reduced-motion fallback is an unpinned stack; this design keeps the sticky roof and makes every repaint instant instead, because sticky positioning is not motion and an unpinned stack would need five static copies of a 288-cell drawing.

## Do not touch

- One roof, repainted. Do not add a second chart or split chapters into separate drawings.
- The sweep is time-based and triggered by chapter change. Never scrub cell colours with scroll progress; a half-painted roof at rest reads as broken.
- Counts come from `apportion()` and DATA. Never type a cell count by hand or switch to `Math.round` (Pay would total 289).
- Prose in normal flow, stage hidden without JS, roof `aria-hidden`, the month list as its text alternative.
- `lining-nums` on Bitter headings. Without it, 109,400 and £12,980 set in oldstyle figures inside the headings.
- Amber is a fill only. On the grey ground it fails as text.
- The mobile stage must stay at or under half the viewport at 360x640; check after changing the legend or roof tokens.

## Adapting

Swap DATA first: the roof size (`cols`, `rows`, `panels`), the per-period values that become rows, the two-way split for chapter 4 and the payout object. Keep the totals consistent; the self-checks will tell you in the console when they are not, and then update the printed figures (`data-k`, `data-m`) to match. For a unit other than solar panels (seats in a community cinema, plots in an allotment), keep the five verbs as the rail, rewrite the legends, and keep each chapter to one sentence of meaning per colour. Longer chapters are fine; the chapter blocks size themselves and positions are re-cached on resize. More than about six chapters makes the pin too long; cut instead. To retime the sweep change the 14ms and 6ms multipliers in the `.cell` transition-delay; to remove motion entirely, delete the `no-preference` blocks and every state still works.

| Token | Role |
|---|---|
| `--ground` | Page and sticky-stage background, the roof membrane |
| `--navy` | Ink, headings, installed panels, capital repaid, button |
| `--unlit` | Empty panels, rail track, input field, glyph backgrounds |
| `--amber` | Generated kWh and member interest; fill only |
| `--pool` / `--pool-ink` | Teal fill (used by the baths, community fund) / teal for links and the focus ring |
| `--meter` / `--meter-ink` | Grey fill (exported, running costs, reserve hatch) / secondary text |
| `--edge` | Panel outline |
| `--font-head`, `--font-body` | Bitter for headings and the result total; Fira Sans for everything else |
| `--fs-xs` to `--fs-xxl` | Type scale (17px base, about 1.25) |
| `--sp-1` to `--sp-9` | Spacing scale, 4px to 112px |
| `--gutter`, `--max` | Side gutter (16px, 32px from 600px) and content width |
| `--cols`, `--rows`, `--cell-gap`, `--cell-h`, `--cell-radius` | Roof grid; `--cell-h` is 1.7 (portrait) on desktop and 1.2 under 700px |
| `--radius-ctl` | Input and button radius |
| `--ease-out` | Shared ease for the sweep, fills and glyphs |
