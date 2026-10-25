---
title: Why they come back on Saturday mornings
section: testimonials
subject: Testimonials for Fernlea Youth Orchestra, a fictional orchestra of 72 players aged 11 to 19 that has rehearsed every Saturday morning since 1987, in words from three players, two parents and two patrons, ending with a seat booking for the winter concert.
aesthetic: A concert night in miniature. Seat velvet under house lights at half, then the same velvet in shadow, where seven parts of cool white music paper stand on music stands fanned around the conductor's podium and only the lamp-lit part is bright. The conductor's blue pencil marks the score. Bona Nova for the score, Gantari for the hall.
mode: dark
fonts:
  - Bona Nova 400, 400 italic and 700 (Google Fonts), for the H2, H3, the italic quotes, works in the programme, the boxed rehearsal letters (700) and form errors
  - Gantari (Google Fonts, variable wght 100-900; 400, 500, 600 and 650 used), for body, names, roles, labels, buttons and the form
js: Swings an arc carousel of seven testimonials by buttons, keys, swipe and horizontal trackpad, auto-advances with a visible pausable timer, crossfades the backdrop between house and stage lighting on scroll, and holds concert seats in-page. runSelfTest() runs at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Observer), Lenis 1.3.26]
tags: [testimonials, detailed, gsap, lenis, carousel, arc, auto-advance, scroll-colour, form, orchestra, music, youth, charity, paper, dark]
use_when:
  - Five to nine testimonials from a few named groups (players, parents, patrons; staff, students, donors) where one voice at a time deserves the whole stage.
  - The subject has a performance or ceremony with lighting cues (a concert, a play, a match night, a gala) that can carry the section.
  - The section can own the viewport and ends in a real action, like booking seats or sponsoring.
avoid_when:
  - Readers need to compare quotes side by side, or skim all of them at once. Only one desk is fully readable at a time.
  - There are only two or three quotes. Use a still layout.
  - The section sits inside a long light page and cannot take over the backdrop (see Adapting for the scoped version).
---

## Why it works

**The bold idea is the conductor's arc.** The seven testimonials are parts on music stands, each with a hood, a ledge and a shaft running down toward one podium below the stage. Any step (a button, an arrow key, a swipe, a horizontal trackpad flick, a tap on a neighbour or a rehearsal letter) swings the whole arc around that pivot. The next voice reaches the centre upright and at full size, its paper comes up from dim to full white and a warm glow rises above its hood, in one 0.35s fade. Neighbours recede along the curve: they lean, shrink and sink into the dark, and their shafts visibly point at the podium. Under the stage, the conductor's score lies on a paper strip with boxed rehearsal letters A to G. The active letter is ringed in blue pencil, and a multi-measure rest (a thick pencil bar between two serifs, as in a printed part) fills from that letter to the end of the strip while the voice holds the stage.

- **One function places every desk.** `place(d, spread, R, step)` puts a desk at wrapped distance `d` (−3.5 to 3.5, so seven desks loop with no clones) on a circle of radius `R` around the pivot: `x = R sin θ`, `y = R (1 − cos θ)`, `rotate = θ`, `θ = d × step × spread`. Below full spread the desks sit in a stack that opens into the arc as you scroll. Only transforms, opacity and a brightness filter change, and `R` and `step` come from `--arc-r` and `--arc-step`, read once per resize.
- **Light paper in a dark house is the differentiator.** testimonials-piano-workshop sets felt-white type and plate gold on green, and nav-concert-hall sets cream type on an indigo hall: both light their text. Here the testimonials are light objects (parts on stands) in a dark room, and the only light in the room belongs to them. The house is velvet #3D1F24, the stage is the same velvet in shadow #24161A (a plum-brown, not a tinted black, and never one dark field because the intro and interval are velvet), the desks are cool music paper #F2F1EC with score-black #1C1719 type. No indigo, amber or gold. The single accent, the conductor's blue pencil #2945B4, appears only on paper.
- **Type.** No Didone or Modern-class face, so the quotes do not echo piano-workshop's Old Standard TT. Bona Nova, a revival of a 1970s Polish book face, reads like the title page of printed parts; its italic carries the quotes and its 700 makes heavy rehearsal letters. Gantari is the hall: names, roles, form and buttons. Neither family is used elsewhere in the collection. Neither has tabular figures (checked: `tnum` changes no widths), so the seats value sits in a fixed 3ch field.
- **The lights tell the story.** The page opens under the house lights, an overhead tungsten pool that dims from above in 1.2s. The stage holds in a bounded pin, the lights go down as it pins, and the stacked desks fan out in the dark. The first lamp lights once the arc is fully open. When the concert heading reaches 75% of the viewport the lamps go out and the lights come up for the interval and the booking. The crossfade is one fixed layer changing opacity, so no colour property is tweened, and every text token passes AA on both grounds.
- **Structure is information.** Radii encode hierarchy: paper is 3px (desks, score strip, confirmation slip), letter boxes are square like score marks, buttons are pills. There are no shadows. The letters are real buttons whose names carry voice and group ("Voice C: Hana Lindqvist, player"), and the Players / Parents / Patrons brackets are always visible. Each desk names where its person sits: a chair for players, a seat in the hall for parents, what they pay for for patrons.
- **Every hover has a reason.** A neighbour under the pointer leans back toward upright, its paper pre-glows and its words lift, and an ink chip on its outer side reads "Next: Tomas Reyes", which is what a click will do. A letter whose desk is out of view draws its bracket in pencil and leans the whole arc 0.12 of a place toward it. Buttons fill from the edge the pointer entered; links sweep their underline in from the left and out to the right.
- **Auto-advance is honest (WCAG 2.2.2).** Each voice holds for `max(9s, words × 0.35s)`, shown by the rest bar. The count runs only while a lamp is on and the stage is on screen, pauses on desk hover, stops on keyboard focus in the stage and on Pause (the bar wipes forward rather than leaving a stub), stops after one round, and never runs under reduced motion. Pause/Play swaps its visible label and its accessible name, without `aria-pressed`.

### Notes for adapters

- **Departures from the motion plan.** The fan-out runs in a bounded pin (`#voices`, `center center`, or `center 53%` under 768px so the whole lamp glow fits on a tall phone, for `+=55%`) rather than a plain scrub. Lights-down is the pin's `onEnter`. One fixed shade layer over the velvet page replaces two layers. `gsap.matchMedia` has no `wide` condition: width lives in the `--arc-*` tokens. Lenis runs with `anchors: false`, and the two in-page links go through `goTo()` so focus follows the scroll. The swing is the one non-expo ease: a 0.16s expo.out upbeat of 0.08 place, then 0.9s power3.out, because expo.out lands too early to feel a heavy stand travelling; a retarget mid-swing is 0.6s expo.out with no upbeat.
- **Two dims.** Once the lights are down the centre desk waits at `--dim-stage` (0.58, still readable) and every other desk drops to `--dim-side` (0.34), so the lit desk is clearly the only light. Only the paper dims: stand metal (hoods, shafts) stays `--stand`, so the arc's geometry reads in the dark. Non-centre desks are `aria-hidden`, so the 4.5:1 rule applies to the centre desk only.
- **The stage floor.** The stage band is clipped at its bottom (`clip-path: inset(-120px 0 0 0)`) and carries a 6px `--stand` lip there, so shafts and outer desks end on a real edge.
- **Without JavaScript, or with the CDN blocked,** the desks are an ordered list of full-bright paper, upright and stacked; shafts, controls and hint stay hidden; each band paints its own lighting. The booking form, its errors and confirmation, and both in-page links still work.

## Do not touch

- One pivot below the stage. Every desk position comes from `place()`; desks get no animations of their own, and nothing reads layout per frame (`R`, `step` and the rest bar's geometry are cached in `measure()` and `rest()`).
- The lamp is the only light: paper at `--dim-off` until it is the centre (`--dim`), full when lit, `--pre` for a pre-glow. The tungsten stays in the glow and the house-light pool, never on text or controls, and nothing flickers.
- The stand shafts point at the pivot: they hang straight down from each ledge with `transform-origin: 50% 100%`. Do not angle them by hand.
- The pencil stays on paper. On the dark grounds, focus and the primary action are paper.
- The first lamp lights only once the house is dark and the arc fully open; lamps go out when the lights come up.
- No wheel capture on vertical scroll. The stage steps only on wheel events whose horizontal delta is dominant and over 12px, only those call `preventDefault`, and a 600ms lock (held while inertia keeps firing) makes one gesture move one voice. Touch keeps `touch-action: pan-y`.
- Keyboard parity: ArrowLeft, ArrowRight, Home and End on the focused stage; Previous, the seven letter buttons, Next and Pause in tab order. Keyboard focus entering the controls from above or below brings the open arc into view. Non-active desks are `aria-hidden` and hold no focusable content. The live region announces manual steps only ("Voice C of 7: Hana Lindqvist, principal horn").
- The timer's pause, stop and sleep rules (hover, keyboard focus, lamp off, off screen, the button, one round, reduced motion).
- Hidden start states exist only under `html.js`, which the script adds only after GSAP, ScrollTrigger, SplitText, Observer and Lenis all loaded.
- 3px paper, square letter boxes, pill buttons, no shadows.

## Adapting

Map the brand onto the colour tokens first, then keep four relationships: text on dark passes on both backdrops (the crossfade passes through every mix); ink and graphite pass 4.5:1 on paper at `--dim-stage`; the accent reaches 7:1 on full paper and is never used on dark; the glow stays out of text and controls. Current figures: paper on velvet 13.1:1 and on shade 15.4:1; horsehair 7.9:1 and 9.3:1; ink on paper 15.7:1 (5.7:1 at `--dim-stage`); graphite 10.2:1 (4.8:1 dimmed); pencil on paper 7.1:1; velvet on the paper button 13.1:1; `--rule-rest` 3.8:1 on velvet.

Content: the arc takes three to nine desks. Add or remove `<li class="desk">` items (with `data-name`, `data-short` and the `.desk__stand` span) plus matching letter buttons and brackets, then update `N` and `LETTERS`, the bracket columns in `.letters` and the letter-to-bracket mapping in the letter hover handler. With fewer than five desks, lower `reach` in `place()` so far desks do not wrap into view on both sides. Quotes of 25 to 50 words fit; desks take the tallest one's height and spare space falls between the words and the name, so keep lengths within about 1.25 times of each other (the self-test warns above that).

The fixed backdrop assumes the section owns the viewport. To embed it, move `.backdrop` and `.houselights` inside `.yo` and give `.yo` `position: relative; clip-path: inset(0)` and a velvet background.

Retiming: the arc's recession (scale 0.22 and words 0.86 per place) is in `place()`; the swing, gesture lock and timer are in `go()`, `gated()` and `timerFor()`. The crossfade is `light()`; the pin length and fan-out window are in the scroll section. To drop the load sequence, start with `let played = true;`. Reduced motion is the `reduce` branch: native scroll, arc fully fanned, instant steps, lamp on at once, no timer and no Pause, instant lighting, no split heading.

| Token | Role |
|---|---|
| `--velvet` | House lights at half: intro and interval ground, page background, the primary button's label |
| `--shade` | The velvet in shadow: the stage backdrop at lights-down |
| `--paper` | Music paper: desks, score strip, confirmation slip; text, focus, field rules and the primary fill on dark |
| `--ink` | Score black: text and borders on paper, hover fills, the follower chip |
| `--graphite` | Secondary text on paper (roles, fact labels, brackets), the letter hover ring |
| `--pencil` | The conductor's blue pencil, on paper only: active letter, rest bar, out-of-view bracket, focus on the strip and slip |
| `--horsehair` | Secondary text on dark, checkbox border, link rest rules |
| `--stand`, `--stand-lit` | Stand metal (ledges, hoods, shafts, stage-front lip); the hood bar of the lit desk |
| `--lamp` | Tungsten as RGB channels: the lamp glow and the house-light pool only |
| `--rule-rest`, `--rule-ink`, `--wash` | Field rules and idle pill borders on dark; bracket lines on paper; quiet fills on dark |
| `--dim-house`, `--dim-stage`, `--dim-side` | Paper brightness with the lamp off: any desk under house lights (0.82); the centre desk (0.58) and every other desk (0.34) with the lights down. `--dim` and `--dim-off` mix them by `--dark` |
| `--pre` | Pre-glow brightness under the pointer or a letter (0.7) |
| `--font-score`, `--font-hall` | Bona Nova and Gantari, with old-style serif and humanist sans fallbacks |
| `--t-xl`, `--t-l`, `--t-held` | H2 (44 to 92px), H3 (32 to 52px), confirmation heading |
| `--t-quote`, `--t-mark`, `--t-note`, `--t-err` | Quotes (Bona italic, 21 to 28px); rehearsal letters (Bona 700); programme works; form errors |
| `--t-m`, `--t-s`, `--t-xs`, `--t-xxs`, `--t-step` | Names; body and inputs; roles, labels and buttons; brackets, hint and chip; stepper glyphs |
| `--sp-1` to `--sp-10`, `--gutter`, `--measure` | 4 to 168px spacing; side padding (16 to 64px); body line length |
| `--arc-r`, `--arc-step` | Pivot radius and angle between desks: 700px/15deg, 1250px/15deg from 768px, 1500px/14deg from 992px |
| `--desk-w`, `--lamp-room`, `--peek` | Desk width; headroom for hood and glow; how much stage shows under the intro |
| `--shaft-w`, `--shaft-h`, `--hood-w`, `--hood-h`, `--r-desk`, `--ledge-h` | Stand shaft, lamp hood, paper radius, stand ledge |
| `--box`, `--mark-box`, `--mark-gap`, `--grp-gap`, `--strip-pad` | 44px targets; letter boxes (40px under 380px) and their spacing on the strip |
| `--ease-out`, `--ease-sweep`, `--d-*` | expo.out; the underline sweep; press, fill, sweep, ring, swap, lamp, rule, hint, tint, error and tick durations |

## Motion

Technique ids refer to `research/motion-techniques.md`. Ease family: expo (expo.out for entrances and steps, expo.inOut for crossfades and wipes, none for scrubs), with power3.out on the swing only (see Notes). Lenis runs from `gsap.ticker` (lerp 0.1, autoRaf off). Everything is built inside `gsap.matchMedia` (motion, reduce, fine) and cleaned up by its return.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| House lights dim from above | LD8 variant (radial tungsten pool) | Load, t=0 | Opacity 1 to 0, 1.2s expo.inOut | Static, off |
| Org name settles | LD8 | Load, t=0 | autoAlpha 0 to 1, y 6 to 0, 0.5s expo.out | Static |
| H2 lines rise out of their masks | TX1 (SplitText lines, mask) | Load, after fonts (capped 1.2s), from t=0.1 | yPercent 110 to 0, 1.0s expo.out, stagger 0.06; mask padded 0.1em | No split |
| Intro paragraph | Opacity only | Load, t=0.45 | 0.8s expo.out | Static |
| Skip link brightens, rest rule draws | LD8 variant | Load, t=0.7 | Opacity 0.6 to 1, rule scaleX 0 to 1, 0.5s expo.out | Static |
| Stage holds, desks fan out from a stack | SC11-style scrubbed value in a bounded pin | `#voices` centre at centre (53% under 768px), for 55% of the viewport | scrub, ease none; fan from 0.15 to 0.85 of the pin | Fully fanned, no pin |
| Lights down, lights up | SC9 (one opacity layer) | Pin start; `#concert` top at 75% | 0.7s expo.inOut, overwrite auto | Instant |
| First lamp | Signature | Lights down and the arc fully open | Paper `--dim` to full and glow, 0.35s | On at once |
| The arc swings one voice | CD2 (signature) | Buttons, keys, letters, neighbour or stage-side click, swipe (Observer), horizontal trackpad | Upbeat 0.16s expo.out (0.08 place back), then 0.9s power3.out; retarget 0.6s expo.out; wheel and drag lock 600ms | Instant |
| Lamp hand-over | Signature | Desk lands (within 0.02 of its place) | New paper and glow 0.35s; old 0.2s | Instant |
| Multi-measure rest | TR2 | Active voice while its lamp is on and the stage is on screen | Serifs appear, 3px pencil bar scaleX 0 to 1 from the active letter to the strip end, ease none, max(9s, words × 0.35s); pauses on desk hover; stops on keyboard focus, Pause, one round, then wipes forward over 0.3s | None |
| Neighbour leans back, paper pre-glows | Signature hover | Fine pointer over a neighbour | Rotation to 55%, words to 0.75, 0.4s expo.out; brightness 0.7 over 0.25s | Brightness only |
| "Next: name" chip by the cursor | CU1 (native cursor kept) | Fine pointer over a neighbour | Outer side, clamped to the viewport; quickTo 0.35s; enters scale 0.8 to 1, 0.25s; hides on leave and window leave | Shown without motion |
| Letter ring, desk pre-glow, arc looks toward the letter | Inner ring + HV7-style link | Hover or focus on a letter | Ring scale 0.8 to 1, 0.25s; visible desk brightness 0.7; out-of-view desk: bracket line turns 2px pencil and the arc leans 0.12 place toward it, 0.35s expo.out, back on leave | Ring and bracket without motion, no lean |
| Previous, Next, Pause, stepper, submit, Change the booking | HV4 + MI1 | Hover (fill from the entry edge), focus (from the left), press | In 0.4s, out 0.3s; press 0.97 over 0.12s, release 0.4s | Colour only |
| Pause / Play, Hold my seats / Seats held | MI2 | Click, valid submit | 0.35s expo.out, width reserved | Instant |
| Skip, mailto and back links | HV2 | Hover, focus | Sweep in from the left, out to the right, 0.45s; persistent on touch | Static underline |
| Stage focus ring and arrow-key hint | Focus state | Keyboard focus on the stage | Ring and hint fade in, 0.3s | Instant |
| Field focus rule, errors | MI4 (reserved space) | Focus; invalid submit | Rule scaleX 0.35s; message opacity and y 4 to 0, 0.25s; focus to first invalid field | Instant |
| Checkbox tick | MI4 tick | Change | stroke-dashoffset 1 to 0, 0.3s | Instant |
| Booking confirmation and back | MI2 + clip-path wipe | Valid submit; Change the booking | Form fades 0.3s, slip wipes in 0.7s expo.inOut, focus to its heading; back: wipe out 0.5s, form fades in 0.3s, values kept, focus to Name | Instant |
| In-page links | Lenis `scrollTo` | Skip link, Back to the voices | 1.2s, then focus the H3 or the stage | Native jump, then focus |
