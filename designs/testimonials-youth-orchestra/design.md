---
title: Why they come back on Saturday mornings
section: testimonials
subject: Testimonials for Kestrel Hill Youth Orchestra, a fictional orchestra of 72 players aged 11 to 19 that has rehearsed every Saturday morning since 1987, in words from three players, two parents and two patrons, ending with a seat booking for the winter concert.
aesthetic: A concert night in miniature. The house lights are at half on seat velvet, then go down to stage blacks where seven music-stand desks fan around the conductor's podium, each lit by its own stand lamp. The lights come up again for the interval. Set in Ibarra Real Nova, the Spanish royal-press roman, like a printed programme and parts.
mode: dark
fonts:
  - Ibarra Real Nova 400 to 700, roman and italic (Google Fonts)
js: Swings an arc carousel of seven testimonials by buttons, keys, swipe and horizontal trackpad, auto-advances with a visible pausable timer, crossfades the backdrop between house and stage lighting on scroll, and holds concert seats in-page. runSelfTest() runs at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Observer), Lenis 1.3.26]
tags: [testimonials, detailed, gsap, lenis, carousel, arc, auto-advance, scroll-colour, form, orchestra, music, youth, charity, serif, dark]
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

**The bold idea is the conductor's arc.** The seven testimonials are music-stand desks fanned on an arc around a podium just below the stage. Any step (a button, an arrow key, a swipe, a horizontal trackpad flick, a tap on a neighbour or a rehearsal letter) swings the whole arc around that one pivot. The next voice reaches the centre upright and at full size. The neighbours recede along the curve: they rotate, shrink to 84% and 68%, their text dims to 28% and the whole desk darkens (`brightness` 0.7, then 0.55), so the lit centre desk is the only bright object on stage. The far desks are at 30% two places out and gone by 2.2, before they reach the stage floor. As the desk lands (within 0.03 of its place, about a third of the way through the swing) its stand lamp warms on over 0.35s: a warm line under the hood and light falling down onto the music, fading toward the name. Below the stage, the boxed rehearsal letter for that voice (A to G, square like the rehearsal marks in a score) runs a rosin rule along its bottom edge, like bars of rest counting down to the next entry.

- **One function places every desk.** `place(d, spread, R, step)` puts a desk at signed distance `d` from the centre on a circle of radius `R` around the pivot: `x = R sin θ`, `y = R (1 − cos θ)`, `rotate = θ`, with `θ = d × step × spread`. The distance is wrapped to −3.5…3.5, so seven desks loop with no clones. Below full spread the desks sit in a stack, each lifted 7px and turned 1.2° per place, so their hood tips peek over the top desk and visibly open into the arc. The desks share one CSS grid cell, so they stretch to the tallest quote and their ledges sit on the same arc. Only transforms, opacity and a brightness filter change. `R` and `step` come from `--arc-r` and `--arc-step`, which are read once per resize.
- **The lights tell the story.** The intro sits under house lights at half, on seat velvet (`--velvet`). As the stage scrolls in, the desks fan out from a stack (a scrubbed value, not a timeline), and at 60% of the viewport the lights go down to stage blacks (`--pit`). The first lamp is the cue that the house is dark: it warms on 0.5s into the 0.7s lights-down, never under house lights. When the stage's bottom passes 75% of the viewport, as the concert heading enters, the lamps go out and the lights come up for the interval and the concert booking. The crossfade is one fixed layer changing opacity over the velvet page, so no colour property is ever tweened. Text tokens pass AA on both grounds, so contrast holds through the whole crossfade.
- **The lamp is the only warm light; the blue pencil is the only accent.** The amber exists as `--lamp` inside the desk glow (`::before`, a radial gradient cast down from the hood onto the top of the desk, with a 60px bloom above it) and as the 2px bulb line under a lit hood. It is never used on text. Everything functional (the active letter box, focus rings, the field focus rule, error text, the confirmation rule and the primary button) is the conductor's blue pencil `--pencil` #82A6F2, the pencil conductors mark scores with.
- **One reasoned exception: the timer rule is rosin.** The 3px rule that replaces the active letter box's bottom edge is lamp amber (about 9:1 on pit as a graphic). It is the one place amber touches a control, because it counts down to the moment the next lamp takes over, so it ties the controls to the stage. The box border itself stays blue pencil.
- **Rehearsal letters are real buttons.** Seven square 44px boxes (40px under 380px), with zero radius and Ibarra 700. Brackets beneath them name the groups: Players (A to C), Parents (D, E) and Patrons (F, G). They are always visible, so the group never depends on colour or on hovering. Each letter's accessible name carries the voice and group ("Voice C: Hana Lindqvist, player"). The letter printed on each desk is `aria-hidden`, so a screen reader does not read a bare "A" before each quote. Pointing at or focusing a letter pre-warms the matching desk's lamp when that desk is the centre or a neighbour, linking control and stage. When the desk is out of view, the letter's group bracket brightens to part white instead, so the response stays on something visible.
- **Structure is information.** Radii encode hierarchy: desks are 3px with a 6px ledge (the stand's lip), letter boxes are square, and buttons are full pills. There are no shadows, because the only light is the lamp. Each desk names where its person sits: a chair in the orchestra for players, a row and seat in the hall for parents, and what they pay for for patrons.
- **Every hover has a reason.** Neighbour desks lean 45% of the way back toward upright under the pointer, their text lifts to 60% and their brightness to 0.9, so the preview is readable, and their lamps glow to a third. A small chip by the native cursor reads "Next: Tomas Reyes" or "Previous: Mira Okafor", which is exactly what a click will do. It always sits on the side toward the centre, so it never runs off screen. Buttons fill from the edge the pointer entered. Links sweep their underline in from the left and out to the right.
- **Auto-advance is honest (WCAG 2.2.2).** Each voice holds the stage for `max(9s, words × 0.35s)`, and the rule shows that time. Hovering the desks pauses it. It sleeps while the stage is off screen. Keyboard focus (`:focus-visible`) entering the stage stops it, and so does Pause; Play restarts it from zero. A stopped timer clears its rule rather than leaving a stale stub. Mouse clicks, taps and swipes do not stop it, even though they focus the stage: each of those steps already restarts the count on the new voice. It stops after one full round of A to G, and under reduced motion it never runs. The Pause/Play button changes its visible label (masked swap) and its accessible name ("Pause the voices" / "Play the voices"). It does not also use `aria-pressed`, because a toggle whose name changes should not announce a pressed state as well.
- **Palette, reasoned against the collection (was R7).** This avoids default 2, near-black with one accent. The stage is theatre blacks, a warm charcoal serge (#22201E), not a tinted black. The desks are matte Manhasset-stand black lifted to #312E2A. The intro and the interval are seat velvet #3D1F24, so the page is never one dark field. Text is the neutral white of printed parts (#ECEAE3, 13.5:1 on pit, 12.3:1 on velvet, 11.2:1 on a desk). Horsehair grey #BDB5A9 is secondary text (8.0, 7.3 and 6.7:1). The blue pencil is 6.7:1 on pit, 6.1:1 on velvet and 5.6:1 on a desk, and pit text on a pencil button is 6.7:1. Warm amber appears only as lamp light, never as a brand colour. That keeps it apart from the collection's amber-on-dark designs and from the indigo-and-cream scheme of nav-concert-hall.
- **Type, reasoned (was R8).** There is no Didone here. Ibarra Real Nova revives the roman Gerónimo Gil cut for Joaquín Ibarra's 1780 Don Quixote, printed in Madrid for the Real Academia: an engraved 18th-century text face that suits printed parts and concert programmes. One family carries everything, with roles set by weight, italic and size: headings 600, quotes italic 450, rehearsal letters 700 in their boxes, names 600, body and form text 400, buttons 600. The design shares no face and no palette with nav-concert-hall or any other design in the registry. Ibarra's default figures are lining, which suits dates and seats. It has no tabular figures, so the seats value sits in a fixed 3ch field.
- **Choices against the defaults.** Seven identical rounded cards was the first instinct (default 4). They became music-stand desks with a ledge, a hood and lamp light. Previous and Next carry no arrows, and there are no all-caps eyebrows, monospace labels or middle-dot meta strings (default 5). The org name sits on its own line as identity. Motion is spent on the arc and the lights; the coda gets no heading rise, because the lights coming up are that moment (default 8).

### Notes for adapters

- **Removed accessory.** A hairline divided each desk's name from its "Sits" and "passage" facts. It was removed in the last pass: the `dt` labels already structure that block, and the desk is quieter without it.
- **Departures from the motion plan.** The SC9 handoff uses one fixed pit layer over the velvet page rather than two layers. Lights-up is the leave half of the same ScrollTrigger, because `#concert` starts exactly where `#voices` ends. `gsap.matchMedia` has no `wide` condition: the arc's width response lives in the `--arc-*` tokens, so a breakpoint never rebuilds Lenis. Lenis runs with `anchors: false`, and the two in-page links go through `goTo()` so focus follows the scroll. The narrow arc radius was tuned from 1050px to 820px so the neighbours actually peek in at 390px. On phones (radius under 1000px) the neighbours' faces are blank, so the gutters show stands rather than slivers of cut words. A review suggested raising the narrow step to 22°; because the pivot is below the stage, the desk tops fan outward, so a bigger step pushed the neighbours off a 390px screen. The step went down to 15° instead, which shows each neighbour's tilted face and ledge in the gutters. Tapping anywhere on the stage beside the centre desk steps toward that side, so the tap target is not limited to the sliver of neighbour that shows.
- **The stage floor.** Desks two places out fade to 30% and are gone by 2.2 places, before they reach the floor. The arc keeps 72px under the desks so the neighbours' ledges end above the controls. The stage band is clipped at its bottom (`clip-path: inset(-120px 0 0 0)`), and that clip line carries a full-width 6px `--ledge` lip, the stage front, so anything still cut ends on a real edge. Lamp light can still rise 120px above the band.
- **Without JavaScript, or with the CDN blocked,** the desks are an ordered list, upright and stacked, and each band paints its own lighting as a hard edge. The controls and hint carry `hidden`. The plain part of the script still runs the booking form, its errors and its confirmation, and the two in-page links.

## Do not touch

- One pivot below the stage. Every desk position comes from `place()` with the wrapped distance. Do not give desks their own animations, and do not read layout per frame. `R` and `step` are cached in `measure()`.
- The lamp is the only warm light: `--lamp` stays in the glow and the hood's bulb line, and touches a control only as the timer rule. The blue pencil is the only accent.
- The first lamp lights only once the house is dark (`S.dark`); lamps go out when the lights come up.
- No wheel capture on vertical scroll. The stage steps only on wheel events whose horizontal delta is dominant and over 12px. Only those call `preventDefault`, and a lock (600ms, held open while trackpad inertia keeps firing) makes one gesture move one voice. Vertical wheel always scrolls the page, and touch keeps `touch-action: pan-y`.
- Keyboard parity: ArrowLeft, ArrowRight, Home and End on the focused stage; Previous, Next and seven letter buttons in tab order. Non-active desks are `aria-hidden` and hold no focusable content. The `aria-live` region announces manual steps only ("Voice C of 7: Hana Lindqvist, principal horn"), never auto-advances.
- The letters stay real buttons with the voice and group in their names, and the brackets stay visible.
- The timer's pause, stop and sleep rules (hover, focus, off screen, the button, one round, reduced motion).
- Hidden start states exist only under `html.js`, which the script adds only after GSAP, ScrollTrigger, SplitText, Observer and Lenis all loaded.
- The 3px desk, square letter boxes and pill buttons. Do not unify the radii, and do not add shadows.

## Adapting

Map the brand onto the colour tokens first, then keep three relationships: text must pass on both backdrops (the crossfade passes through every mix of them), the accent must reach 4.5:1 on both and as a fill under the backdrop colour, and the warm glow token stays out of text and controls.

Content: the arc takes three to nine desks. Add or remove `<li class="desk">` items with `data-name`, `data-short` (used in announcements) and `data-group`, plus matching letter buttons and brackets. Then update `N` and `LETTERS` at the top of the script, the bracket columns in `.letters`, and the letter-to-bracket mapping in the letter hover handler. With fewer than five desks, lower the fade (`(2.2 - a) * 1.5` in `place()`) so the far desks do not wrap into view on both sides. Quotes of 25 to 50 words fit. The desks take the height of the tallest one and names align at the bottom, so keep the lengths within about 1.5 times of each other.

The fixed backdrop assumes the section owns the viewport. To embed it in a longer page, move `.backdrop` inside `.yo`, give `.yo` `position: relative; clip-path: inset(0)` and a velvet background, and the lighting stays inside the section.

Retiming and removing motion:

- **The arc:** `--arc-r` and `--arc-step` per breakpoint (820px/15deg, 1250px/15deg from 768px, 1500px/14deg from 992px). A smaller radius brings neighbours closer, and a bigger step fans them wider (and, with the pivot below, pushes their tops outward). The recession (scale 0.16, text 0.72 and brightness 0.3 per place) is in `place()`. The swing (0.8s expo.out), the gesture lock (600ms) and the timer (`timerFor`, a 9s floor at 0.35s a word) are in the script.
- **Lights:** the crossfade (0.7s expo.inOut) and its trigger points (`top 60%`, `bottom 75%`) and the fan-out scrub (`top 85%` to `top 30%`) are the three ScrollTriggers in the script. To drop the fan-out, delete that tween and set `fan.v = 1`. To drop the lighting change, delete the backdrop trigger. The bands then keep velvet over a transparent stage, so also remove `html.js .band { background: none; }`.
- **Load:** the timeline offsets are org 0, H2 0.1 (after fonts, capped at 1.2s), intro 0.45 and skip link 0.7. The load has no lamp: the first lamp belongs to the lights-down. To drop the sequence, start the script with `let played = true;`: the `else` branch then shows everything at once.
- **Hover, press, focus and form timings** are the `--d-*` and `--ease-*` tokens. The form's fade, wipe and return are in `fx` at the end of the motion branch.
- **Reduced motion** is the `reduce` branch: native scroll, no Lenis, the arc fully fanned, instant steps, the lamp on at once, no timer and no Pause button, instant lighting changes, and no split headings.

| Token | Role |
|---|---|
| `--velvet` | House lights at half: intro and interval ground, page background |
| `--pit` | Stage blacks: the backdrop at lights-down, label colour on pencil and part fills |
| `--stand` | Desk faces; quiet fills (Pause, seat stepper) |
| `--ledge` | The stand's lip along the bottom of each desk; the stage-front lip at the band's clip line |
| `--part` | Printed-part white: all primary text, follower chip, submit hover fill |
| `--horsehair` | Secondary text, lamp hood, letter hover ring, checkbox border |
| `--pencil` | The only accent: active letter, focus, field rule, errors, primary button |
| `--lamp` | Lamp amber as RGB channels: desk glow, the lit hood's bulb line, and the timer rule (the reasoned exception) |
| `--rule-rest` | Field rules, idle letter and button borders, brackets (3.5:1 on velvet) |
| `--rule-faint` | Desk edges (decorative) |
| `--font` | Ibarra Real Nova with old-style serif fallbacks |
| `--t-xl`, `--t-l` | H2 (44 to 92px) and H3 (32 to 52px), 600 |
| `--t-quote` | Quotes, italic 450, 21 to 28px, leading 1.32, 34ch |
| `--t-held` | Confirmation heading |
| `--t-mark` | Rehearsal letters, 700 |
| `--t-m`, `--t-s`, `--t-xs`, `--t-xxs` | Names; body and inputs; roles, labels and buttons; brackets, hint and errors |
| `--sp-1` to `--sp-10` | 4, 8, 12, 16, 24, 32, 48, 72, 112, 168px |
| `--gutter`, `--measure` | Side padding (16 to 64px); body line length |
| `--arc-r`, `--arc-step` | Pivot radius and angle between desks (read by the script) |
| `--desk-w` | Desk width: up to 34rem, leaving 28px each side for neighbours on phones |
| `--lamp-room`, `--bloom` | Headroom above the desks; how far the lamp light spills above the hood (60px) |
| `--r-desk`, `--ledge-h` | 3px desk radius; 6px ledge |
| `--box`, `--mark-box` | 44px touch targets; letter boxes (40px under 380px) |
| `--ease-out`, `--ease-sweep` | expo.out; the underline sweep curve |
| `--d-*` | Press 0.12s, release 0.4s, fill in 0.4s / out 0.3s, sweep 0.45s, ring 0.25s, swap 0.35s, lamp on 0.35s / off 0.2s, field rule 0.35s, hint 0.3s, tint 0.2s, error 0.25s, tick 0.3s |

## Motion

Technique ids refer to `research/motion-techniques.md`. One ease family: expo (expo.out for entrances and steps, expo.inOut for crossfades and wipes, none for scrubs). Lenis runs from `gsap.ticker` (lerp 0.1, autoRaf off).

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Org name settles | LD8 | Load, t=0 | autoAlpha 0 to 1, y 6 to 0, 0.5s expo.out | Static |
| H2 lines rise out of their masks | TX1 | Load, after fonts (capped 1.2s), from t=0.1 | yPercent 110 to 0, 1.0s expo.out, stagger 0.09; mask padded 0.1em | No split |
| Intro paragraph | Opacity only | Load, t=0.45 | 0.8s expo.out | Static |
| Skip link brightens, rest rule draws | LD8 variant | Load, t=0.7 | Opacity 0.35 to 1, rule scaleX 0 to 1, 0.5s expo.out | Static |
| Desks fan out from a stack | SC11-style scrubbed value | `#voices` top 85% to top 30% | scrub, ease none; stack offset 7px and 1.2° per place drops out as it opens | Fully fanned |
| Lights down, lights up | SC9 (one opacity layer) | `#voices` top 60% (enter) and bottom 75% (leave) | 0.7s expo.inOut, overwrite auto | Instant |
| First lamp warms on | Signature | Lights down, +0.5s; out when the lights come up | 0.35s | On at once |
| The arc swings one voice | CD2 (signature) | Buttons, keys, letters, neighbour click, swipe (Observer), horizontal trackpad | 0.8s expo.out, retargets at once; wheel and drag lock 600ms | Instant |
| Lamp hand-over | Signature | Desk lands (within 0.03 of its place) | New lamp 0.35s expo.out; old lamp 0.2s | Instant |
| Rehearsal-letter timer | TR2 | Active voice, stage on screen | Rosin rule on the box's bottom edge, scaleX 0 to 1, ease none, max(9s, words × 0.35s); pauses on desk hover; stops on keyboard focus, Pause, one round, and then clears over 0.3s | None |
| Timer sleeps off screen | Anti-pattern 11 fix | `.stage` top 40% to bottom 60% | Immediate | n/a |
| Neighbour leans back, lamp pre-glows | Signature hover | Fine pointer over a neighbour | Rotation to 55%, text to 0.6, brightness to 0.9, 0.4s expo.out; lamp to 0.35 | Lamp only |
| "Next: name" chip by the cursor | CU1 (native cursor kept) | Fine pointer over a neighbour | quickTo 0.35s; enters scale 0.8 to 1, 0.25s; hides on leave and window leave | Shown without motion |
| Letter ring, desk pre-glow | Inner ring + HV7-style link | Hover or focus on a letter | Ring scale 0.8 to 1 and opacity, 0.25s; desk lamp to 0.35 when that desk is visible, otherwise the group bracket turns part white over 0.25s | Ring without scale |
| Previous, Next, Pause, stepper, submit, Change the booking | HV4 + MI1 | Hover (fill from the entry edge), focus (from the left), press | In 0.4s, out 0.3s; press 0.97 over 0.12s, release 0.4s | Colour only |
| Pause / Play, Hold my seats / Seats held | MI2 | Click, valid submit | 0.35s expo.out, width reserved | Instant |
| Skip, mailto and back links | HV2 | Hover, focus | Sweep in from the left and out to the right, 0.45s; persistent on touch | Static underline |
| Stage focus ring and arrow-key hint | Focus state | Keyboard focus on the stage | Ring and hint fade in, 0.3s | Instant |
| Field focus rule, errors | MI4 (reserved space) | Focus; invalid submit | Rule scaleX 0.35s; message opacity and y 4 to 0, 0.25s; focus to first invalid field | Instant |
| Checkbox tick | MI4 tick | Change | stroke-dashoffset 1 to 0, 0.3s | Instant |
| Booking confirmation | MI2 + clip-path wipe | Valid submit | Label swap, form fades 0.3s at 0.3s, panel wipes in 0.7s expo.inOut, focus to its heading | Instant |
| Back to the form | Reverse wipe | Change the booking | Wipe out 0.5s, form fades in 0.3s, values kept, focus to Name | Instant |
| In-page links | Lenis `scrollTo` | Skip link, Back to the voices | 1.2s, then focus the H3 or the stage | Native jump, then focus |
