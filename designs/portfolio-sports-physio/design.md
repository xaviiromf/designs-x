---
title: Back to sport when the numbers say so
section: portfolio
subject: Fieldgate Sports Physiotherapy, a fictional HCPC-registered practice in Kelham Island, Sheffield, showing prospective athletes how long recovery really took for 412 people like them and taking first-assessment requests (60 minutes, £68).
aesthetic: Rehab-gym measuring kit. Couch-roll paper ground, treatment-couch vinyl ink, cyan kinesiology tape for the athlete's injured side and every selection, and lime hop-test floor tape for the 90% return line. Nunito Sans runs wide for the voice and narrow for the measurements.
mode: light
fonts:
  - Nunito Sans, variable wdth 75-125 and wght 200-1000 (Google Fonts). The only family, used at three widths.
js: Builds every chart, table, count, detail panel and contact row from three data objects; runs an ACL recovery replay where one week value (set by autoplay, drag, keys or stage buttons) drives the curve reveal, strength bars, counter, stage rail and caption swaps; plus the load sequence, count-up, injury chart build, section spy with eased anchors, menu, disclosures, booking form with validation, WhatsApp and email hand-off, and copy button.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [portfolio, health, sport, charts, scroll-story, gsap]
use_when:
  - An outcomes-led clinic, coach or rehab service with real cohort data and a staged protocol it can show week by week.
  - The page has to answer "how long will this take for someone like me" before it asks for a booking.
  - You want one interactive data moment that is also the argument, with quieter supporting charts and a plain form.
avoid_when:
  - No measured outcomes exist. Invented cohorts turn the signature into decoration and the page into a claim.
  - The audience needs a booking app with calendars and payments rather than evidence and a request.
  - A dark or glossy brand. The idea depends on couch paper, vinyl ink and two tapes read in daylight.
---

## Why it works

**The one bold idea: the reader sets the week of an ACL recovery and watches the gap close.** Section `#recovery` shows the median quadriceps strength of 64 athletes after ACL reconstruction, operated leg as a share of the other leg, tested every two weeks. One value, `week` (0 to 40), drives everything in the stage through `render(week)`: the curve and its middle-half band are revealed left to right with `clip-path: inset(0 Xpx 0 0)` so the line's leading edge always sits on the current week; a head dot rides the curve from interpolated data; the big tabular week counter updates; the operated-leg bar grows toward a lime tick at 90% while the other leg's ink bar stays at 100%; six rail segments fill; and when the stage changes, the caption swaps. The first time the chart is half in view it plays weeks 0 to 40 once (about 6 s, a 0.4 s hold at each stage boundary). After that the reader owns it: drag or tap the cyan tape tab on the axis, use the arrow keys, Page Up and Page Down by stage, Home and End, or press a stage button. The single beat is the forward crossing of week 32, where the curve meets the lime 90% line: the tape takes one press and a floor-tape note rises, "Week 32: strength back to 90% of the other leg." Going back below 32 hides it instantly.

- **The hero lays the line the replay has to cross.** The hero is typographic, and its only device is the lime floor tape laid across the page on load, labelled "The return line: 90% of your other side". The same tape is the 90% line in the chart, the tick on the strength bar and the ground of the week 32 note. One story, one bold element.
- **Two tapes, two fixed meanings.** Cyan kinesiology tape (`--c-kinesio`) means you: your injured or operated side, our middle-half bars, the current nav section, the selected injury, the week tab and every focus ring. Lime floor-marking tape (`--c-floortape`) means the bar to clear: the return line, the 90% tick, and form errors, which are a bar you have not cleared yet. Lime against the paper is only 1.37:1, so lime tape is always drawn with 1.5px ink edges top and bottom and always carries an ink label (9.5:1 on lime). Cyan is 3.45:1, so it carries graphics, focus and large marks only, never body text. Kinesio strips use 3px tape-cut corners (physios round tape corners so they do not peel) and a faint woven texture from two repeating gradients at 6%.
- **Typography from instruments, one family.** Nunito Sans at 122 to 125% width and 820 to 860 weight is the voice (H1, H2, wordmark, week counter); 100% and 420 is body and form; 87.5% and 520 is the measurement voice (chart ticks, stage names, table heads, labels). Its figures are tabular by default (1111, 0000 and 7777 render at the same width); `tabular-nums` is declared anyway so the counter and labels never jitter. No monospace, no all-caps, no eyebrows.
- **Charts are honest.** The injury chart is linear in weeks (0 to 52) so short injuries look short; every median is printed in a right-hand column so the ankle and hamstring rows still read. Each row compares our middle half (cyan bar) and median (ink dot) with the published range for the same injury (graphite bracket). The ACL curve is straight segments between real two-weekly tests, which is why the head dot can sit exactly on it. Both charts have a table behind a disclosure, and every reading from hover is also reachable by keyboard, tap or the table.
- **The results band is a sentence, not stat tiles.** The four figures (412, 379, 92%, 29) are derived from `OUTCOMES`, count up once inside one plain sentence and get a cyan tape underline because they are athletes. The re-injured number stays in the sentence on purpose. The large week number in the stage is a live readout of the replay, not a stat hero.
- **Defaults avoided on purpose.** The ground is a cool couch-roll grey-green (`#EEF2F0`), not cream; ink is a chosen vinyl blue-slate (`#1B2A31`). The detail and result panels are ruled blocks marked by a left kinesio strip, with no radius and no shadow; buttons and inputs take a 6px radius and tape takes 3px. No word in a headline is accented. Section dividers are couch-roll perforations because each section is a new sheet. The only glyph on a link is the down chevron on "Watch an ACL recovery", which really goes down the page. Stages are numbered because they are a true sequence.

## Motion

Tier: detailed. One easing family: CSS `--ease-out: cubic-bezier(.16,1,.3,1)` (= `expo.out`) and `--ease-wipe: cubic-bezier(.87,0,.13,1)` (= `expo.inOut`); GSAP uses `expo.out` for entrances, swaps and counts, `expo.inOut` for wipes, and `none` for the replay clock. TR1's out phase keeps `power2.in`, per its recipe. Everything runs inside one `gsap.matchMedia` with `motion`, `reduce` and `fine` conditions; each context owns an AbortController, and cleanup aborts it, removes the ticker callback, restores `lagSmoothing(500, 33)`, destroys Lenis and puts the instant effects back. Lenis is `{lerp: .1, smoothWheel: true, autoRaf: false, anchors: false}` on `gsap.ticker`, wired with `lenis.on('scroll', ScrollTrigger.update)`, and stopped while the menu is open. Hidden start states exist only under `html.js`, which is added only when GSAP, ScrollTrigger, SplitText and Lenis all loaded. Charts, tables and contact rows are built in plain JS first, so a blocked CDN leaves a complete page parked at week 38.

| # | What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| L1 | Header chrome rises in | LD8 | load, t = 0 | y 6 to 0, .5 s, stagger .06 | visible, no entrance |
| L2 | H1 lines rise out of their own masks | TX1 | load, after fonts (capped 1 s), t = .1 | yPercent 110 to 0, 1.0 s, stagger .09 | plain text, no split |
| L3 | Lede and both actions | LD8 | load, t = .45 | y 12 to 0, .8 s, stagger .08 | visible |
| L4 | Floor tape laid by hand: clip from the left while it rotates -1.2 to -.35deg; then its label rises | MD1 one-sided inset | load, t = .6 and 1.3 | 1.1 s `expo.inOut`; label .6 s | tape and label at rest |
| S1 | Results figures roll from 90% of their value; tape underlines lay from the left | SC13 + SC16 | `top 75%`, once | 1.2 s, snap 1; underlines .8 s, stagger .12, +.15 s | final values, underlines shown |
| S2 | `#recovery` H2 lines rise (the only other text effect) | TX1 | `top 85%`, once | 1.0 s, stagger .08 | visible |
| S3 | **Signature replay**: weeks 0 to 40 once; curve clip, head dot, bars, counter, rail all from `render(week)`; caption swaps on stage change | animated chart + TR1 | `#plot` `center 75%`, once; "Replay from week 0" button | ~6 s `ease: none`, .4 s holds; TR1 out .25 s `power2.in`, in .6 s, stagger .07 (a swap that interrupts another skips the out phase) | starts at week 38, note visible, no autoplay, every control jumps instantly; replay button hidden |
| S3b | Week 32 forward crossing: chart tape scaleY 1 to 1.8 to 1, note rises through its mask; hidden instantly below 32 | signature beat | week crosses 32 going forward | press .12 s + .5 s; note .6 s | note shown statically |
| S4 | Injury chart builds: row rules and axis draw, brackets fade, bars grow from their left end, medians pop, values fade, guide appears | SC16 + animated chart | `#inj-rows` `top 75%`, once | rules 1.0 s; brackets .5 s; bars .9 s stagger .07 at .2 s; dots and values .4 s stagger .07 at .6 s | drawn |
| S5 | Section spy: `aria-current` on the nav link, kinesio strip moves to it | NV6 + NV4 | IntersectionObserver `-40% 0px -55% 0px` | .45 s | strip jumps |
| I1 | Skip link slides in on focus | CSS | focus | translateY -120% to 0, .25 s | instant |
| I2 | Wordmark, text links, "Replay", "Edit", "Back to top", disclosure labels, Copy: underline enters left, leaves right | HV2 | hover, focus-visible | .45 s, .07em | static underline; touch shows it persistently |
| I3 | Nav: one 12px kinesio strip travels to the hovered or focused link and back to the current one; click glides to the section and moves focus to its H2 | NV4 + NV6 | hover, focus, click | strip .45 s; scroll `min(1.3, .65 + dist/4000)` s | strip jumps, scroll immediate, focus still moves |
| I4 | Button-styled controls: ink fill sweeps in from the edge the pointer entered; label flips to paper; press scale .97 then back | HV4 + MI1 | hover, focus-visible, press | fill .45 s in, .3 s out; press .12 s, release .45 s | colour change only |
| I5 | Header CTA, hero CTA, submit lean toward the pointer, max 5px | HV5 | fine pointer move | quickTo .5 s `power3.out` | off (also off on touch) |
| I6 | Menu button label Menu/Close | MI2 | click | .35 s `--ease-wipe` | instant |
| I7 | Mobile menu: panel wipes down, links rise; one reversible timeline, reversed 1.4x faster; Lenis stopped; Escape returns focus | NV1 | menu button | wipe .7 s, links .6 s stagger .06 | instant show and hide |
| I8 | Menu and contact rows: cyan tape strip lays under the row from the left, leaves right; contact value shifts 4px; siblings dim | CSS + HV7 | hover, focus-visible | .45 s; dim .35 s to .45 | strip static, no shift |
| I9 | Disclosures open to real height; + turns 45deg; then `lenis.resize()` and `ScrollTrigger.refresh()` | CD6 | click | open .5 s, close .35 s | instant |
| I10 | Stage buttons: segment opacity .55 to 1, number underline; click tweens the week to the stage start | rail + HV2 | hover, focus, click | week tween .9 s `expo.inOut` | jump |
| I11 | Chart: ghost tab with "Week n" follows a mouse; drag or tap sets the week; keys step it | CU-style preview (native cursor kept) + CD4 | pointer, touch (horizontal drag only), keys | ghost quickTo .3 s; drag .3 s; keys .4 s | ghost and week jump |
| I12 | Injury rows: other rows dim, median dot scales 1.4, dashed guide grows from the median to the axis; selecting slides the vertical kinesio strip and swaps the detail panel | HV7 + NV4 (vertical) + TR1 | hover, focus, click | dim .35 s; dot .3 s; guide .35 s; strip .45 s; TR1 as S3 | no movement, instant change |
| I13 | Form fields: border darkens on hover; a cyan tape line lays along the bottom on focus; errors open on lime tape, focus goes to the first invalid field | MI4 (static labels) | hover, focus, submit | .45 s; errors .25 s | instant |
| I14 | Reply radios: inner dot scales in; the contact field label swaps Phone for WhatsApp / Email address | MI2 | change | .25 s; .35 s | instant |
| I15 | Form to result and back: the result wipes down over the form, content swaps while covered, focus moves to the result heading (or back to the name field) | NV7 | valid submit, "Edit my request" | .6 s in, .5 s out `expo.inOut` | instant swap |
| I16 | Copy email: label Copy to Copied (or "Press Ctrl+C" with the address selected), announced, reverts | CD10 + MI2 | click | .35 s, 1.8 s visible | instant |

Not used on purpose: a scroll-pinned replay (a scroll-scrubbed time-series with a live readout is already another design's signature, and here the reader should set the week), a sweeping vertical playhead line, a cursor follower, hide-on-scroll header, floating labels, batch fade-ups on sections, a TX1 on every H2, a chart legend (the injuries lede already names the bar, dot and bracket), and Flip, Observer, DrawSVG, ScrambleText and CustomEase. Nothing loops, flashes or runs off screen.

## Do not touch

- **One value drives the stage.** `render(week)` sets the data clip, head dot, tab, operated bar, rail fills, counter, slider value text and stage; it writes text only when the floored week or stage changes. Do not animate those parts separately.
- **The clip-path reveal is tied to weeks,** not path length, so the line's head is always on the current week. The curve is straight segments between two-weekly tests so interpolation matches the drawing.
- **The two-tape meaning system** and its contrast rule: lime always with ink edges and an ink label; cyan never as text colour.
- **The hero return line reused as the replay threshold.** If you change 90%, change `RETURN`, the hero label, the bar tick label and the week 32 copy together. The self-check `console.assert` fails if `OUTCOMES` no longer sums to 412 / 379 / 29 or the LSI curve no longer first reaches 90 at week 32.
- **Controls that never need the autoplay.** The chart is `role="slider"` with `aria-valuetext` such as "Week 18: median 76%, middle half 69 to 81%", described by the visible instruction; the six stage buttons have full names; the ordered list `#stage-1` to `#stage-6` is the text equivalent at every width; tables sit behind "Show the weekly numbers" and "Show the numbers". Touch drags use `touch-action: pan-y` and wait for 6px of horizontal travel, so vertical swipes still scroll.
- **No dead ends.** Every in-page link is an anchor to an existing id handled by NV6 with focus moved; the form handles submit in JS and shows a result with a way back; WhatsApp, email and social links open with `target="_blank" rel="noopener"`.
- **Robustness.** Without the libraries, `html.js` is never added and the page is complete and interactive in plain JS. SVG marks in the injury chart use percentage coordinates, so their build animates CSS variables (`--sx`, `--s`) rather than GSAP's SVG transform math; keep it that way or the dots drift.

## Adapting

Change the `:root` tokens first, then the three data objects at the top of the script, then the copy.

- **Data.** `CONTACT`: one line per network `{label, href, text}`; delete a key to hide its row and its send button (deleting `whatsapp` or `email` also removes that reply option); add a network in one line. `OUTCOMES`: one object per injury, weeks to return to sport, with `lsi` arrays (median, p25, p75 every two weeks) on the injury that gets the replay. `STAGES`: `{name, short, from, to, exit}`; the rail, list, caption, keyboard Page Up/Down and the autoplay holds all follow it. The results sentence numbers are derived; edit the sentence words if the meaning of a figure changes.
- **Another practice or protocol.** A hamstring or Achilles programme works the same way: replace the `lsi` arrays (or any "% of the other side" measure such as hop distance), the stages and the 90% threshold. Keep a real, measured criterion; the design argues "return when the numbers say so".
- **Retiming or removing motion.** CSS durations live in `--d-quick`, `--d-out`, `--d-swap`, `--d-in` and `--d-open`. GSAP literals are in the matchMedia callback: the load timeline offsets (0, .45, .6, 1.3), the autoplay length (`* 4` seconds of movement plus `.4` s holds), `goWeek` durations (.9 rail, .4 keys, .3 drag), the TR1 timings in `swap`, and the beat in `beat`. To drop the autoplay, delete the `ScrollTrigger.create({ trigger: '#plot' ... })` call and the replay button wiring; the stage then waits at week 0 for the reader (or set `setWeek(38)` to start drawn). To drop the magnet or the ghost tab, delete the `if (fine)` block. To drop the count-up or the injury build, delete their blocks; the static values and drawn chart remain. Never remove the reduced-motion branch.
- **Layout.** Above 860px: hero H1 spans 10 columns, lede 6, actions 5; the stage is 4 columns of text and readout against 8 of bars and chart, with the rail and stage list across all 12 in six aligned columns; injury rows take 8 columns and the detail panel 4; the form takes 7 and contacts 4. At 860px and below everything stacks, the counter and caption sit side by side, stage names move from the rail into the list, and the week 32 note moves to the empty lower-right corner of the chart. Below 600px injury rows wrap to two lines and the chart is 300px tall. Injury names up to about 32 characters fit one line on desktop.

| Token | Role |
|---|---|
| `--c-paper` | Couch-roll ground; result panel fill |
| `--c-ink` | Text, the other leg's bar, median dots, button fill, tape edges |
| `--c-graphite` | Secondary text, published-range brackets, axis labels |
| `--c-rule` | Hairlines, chart grid, perforations, empty rail segments (never text) |
| `--c-kinesio` | You and what is selected: operated side, middle-half bars, curve, week tab, nav strip, selection strips, focus rings |
| `--c-floortape` | The bar to clear: hero tape, 90% line and tick, week 32 note, form errors |
| `--font` | Nunito Sans, the only family |
| `--wd-display`, `--wd-counter`, `--wd-text`, `--wd-label` | Width roles: 122%, 125%, 100%, 87.5% |
| `--wt-display`, `--wt-counter`, `--wt-strong`, `--wt-text`, `--wt-label` | Weight roles: 820, 860, 600, 420, 520 |
| `--fs-xs` to `--fs-xxl`, `--fs-counter` | Major-third scale from a 17px body; the counter is a fluid 4.5 to 9rem |
| `--sp-1` to `--sp-9`, `--gutter`, `--gap`, `--maxw`, `--sec`, `--hdr` | 4px spacing scale, side gutter, 12-column gap, content width, section padding, header height |
| `--r-tape`, `--r-control` | 3px tape-cut corners; 6px buttons and inputs |
| `--ease-out`, `--ease-wipe`, `--d-*` | House easing (expo.out, expo.inOut) and CSS durations |
