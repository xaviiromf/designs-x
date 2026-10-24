---
title: Kelham Tape Rooms booking enquiry
section: contact
subject: The booking enquiry section of Kelham Tape Rooms (fictional), an analogue recording studio with a 24-track 2-inch tape machine in a former cutlery works in Kelham Island, Sheffield, for bands and solo artists who need dates and a quote.
aesthetic: Control room at the end of a session. Olive hessian acoustic walls, console push-button caps with lit LEDs, and one cream tape-box label as the only warm paper surface. The lettering is one grotesque in three widths, like the legends on a tape machine.
mode: dark
fonts:
  - Zalando Sans variable, wdth 75 to 125, wght 400 to 700 (Google Fonts), the only family. Width 125 at 500 for the studio name, the H2 and the label title. Width 100 for body and inputs. Width 85 at 600 for field labels, legends and captions.
js: Validates the enquiry field by field and handles it in place; runs the hold-to-send take-up reel, whose pack grows at constant tape speed while the hub slows, and swaps the form for a tape-box label with the estimate and a reply time worked out from the local clock. The day-rate rows fill in the room. GSAP and Lenis choreograph load, scroll and pointer motion. runSelfTest() runs on #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [contact, form, validation, hold-to-confirm, tape-reel, in-page-result, studio, music, dark, gsap, lenis]
use_when:
  - A booking or quote enquiry for a service sold by the day or session (a studio, a workshop, a hire space, a darkroom), where the person picks a room or package and a start date and you can show an estimate straight away.
  - The subject has a physical object that fills up or winds on (a reel, a spool, a kiln, a tank), so a hold-to-send control can be that object rather than a generic ring.
  - Some people would rather phone. The channels sit before the form on phones so a call is one tap away.
avoid_when:
  - The form is a one-line newsletter or a quick question. A one-second hold is friction there.
  - Anything urgent or safety-related. People in a hurry should not have to hold a button.
  - The brand has no machine or material behind the reel. A tape reel on a dentist's form is costume.
---

## Why it works

**The bold idea: send the enquiry by recording it.** The send key carries a small take-up reel. Press and hold it and tape winds on: an oxide-brown pack grows out from the aluminium hub to the flange while the hub's three slots spin. The tape arrives at constant speed, so the pack's area grows linearly and the reel turns fast while the pack is thin, then visibly slows as it fills, which is what a real take-up reel does. When the reel is full, the red Rec LED lights, the fields fade, and a cream tape-box label is revealed in their place, filled in the way an engineer fills one when a reel is done: name, project, session, room, first day, days, tape, the estimate and when the studio will reply. Release early and the tape rewinds and the hub runs backwards, and the status line says "Released early. Hold until the reel is full."

- **The physics is real and tested.** The pack radius is `r(t) = sqrt(rh² + (rf² − rh²) · t / T)` (area linear in time at constant tape speed `v`), the angular speed is `ω(t) = v / r(t)`, and the hub angle is its closed-form integral `θ(t) = 2vT (r(t) − rh) / (rf² − rh²)`. This is the standard take-up reel relation: the length of tape on a reel is proportional to the pack's annulus area, `L = π(r² − rh²) / thickness`, so constant `dL/dt` gives constant `d(r²)/dt`. With `rh = 9`, `rf = 26` and three turns per fill, the hub starts at 5.8 turns a second and ends at 2. The self-test checks `r(0)`, `r(T)`, linear area at a quarter and half, `ω(0)/ω(T) = rf/rh`, that `θ(T)` matches a numerical integral of `ω`, and that a full reel turns exactly three times.
- **Nothing records an invalid take.** On press, the form is validated first. If anything is wrong the reel does not move, each bad field opens its message, focus goes to the first one, and the status line names them all ("3 fields need fixing: Email, First day, About the songs.").
- **The result is useful, not a thank-you.** Estimate = (room day rate + £60 if recording to tape) × days, so live room, 3 days, tape is £1,440 before VAT. The reply time follows the phone hours: before 17:00 Monday to Saturday it says "by 18:00 today", otherwise "by 12:00 on Monday" (or the next working day). "Edit enquiry" plays the reveal backwards to the filled form; "Start a new enquiry" clears it.
- **Colour means something.** The ground is the olive hessian on the studio walls, not a tinted black. Warm white is the one lit colour: text, focus rings, the armed field rule and the lit LEDs on the push-button caps. Red appears only where something is actually in the red: the Rec LED and field errors. Cream is used only for the tape-box label, so the payoff is the one warm paper surface on the page.
- **One family, three widths.** Zalando Sans at width 125 gives the wide, flat grotesque of 1970s hi-fi and tape-machine panels for the studio name, the heading and the label title. The same family at 100 is for reading and typing, and at 85 and 600 for console-style legends. No monospace anywhere: its tabular figures turn into a monospace-style set, so prices and the estimate use the proportional figures and sit in right-aligned cells.
- **Structure is information.** Field rules mark real field boundaries and draw in from the left as the fields arrive; the rate rules draw before their rows. Room caps carry real facts as separate lines (size, then RT60) rather than a meta string. The channels are a plain definition list on the ground, not cards.
- **Every rate row does something.** Pointing at a row dims the others and swaps its price for "Choose". Clicking it sets the room on the form (the control-room row also picks "Mixing your files"), scrolls to "Which room?" and puts focus on the checked cap, whose LED pops.
- **Channels first on phones.** At 390px the email, phone and address come before the ten fields, so a call is one tap away. From 992px wide and 740px tall, the heading and channels column is sticky (plain CSS) while the form scrolls past.

## Do not touch

- **Validate before recording.** `pointerdown` runs `checkAll()` first and returns before the reel moves if anything is wrong. Keep the 1.0s hold under reduced motion (it is feedback); only the spin goes.
- **The keyboard path.** The send key is `type="submit"`. Pointer clicks (`detail > 0`) are cancelled because the hold handles them; Enter, Space, Enter in a field and a programmatic `.click()` (`detail 0`) go through `submit`, which validates and then fills the reel in 0.35s and sends. check-flows depends on this.
- **Touch guards on the send key only.** `touch-action: manipulation`, `user-select: none`, `-webkit-touch-callout: none` and a cancelled `contextmenu`. Pointer capture keeps the hold if the finger drifts; `pointercancel` rewinds.
- **The reel formulas** (`radius`, `omega`, `angle`) and the order of nested groups in the SVG: `.rock` (pointer, GSAP) > `.cue` (focus, CSS) > `.spin` (scroll velocity and threading) > `.wind` (the hold). Each layer writes only its own transform. The pack's scale starts at `rh / rf`, so an empty reel shows only the hub.
- **Static labels above every field.** Floating labels were removed on purpose: they collide with the date input's format text and hide the hint while typing.
- **Errors never shake.** Messages open with `grid-template-rows: 0fr → 1fr` and `visibility`, carry text, and are linked with `aria-describedby`; `aria-invalid` is set per input, and on every radio of a group.
- **`[hidden] { display: none !important }`.** The form is `display: grid` and would otherwise stay visible under the label.
- **Hidden starting states only under `html.js`** (added only when GSAP, ScrollTrigger, SplitText and Lenis all loaded), only with motion allowed, and each group (`in-load`, `in-rules`, `in-rates`) is released by its own class. Without the CDN the whole form, hold, label and rate rows work, with CSS transitions only.
- **Contrast.** Chalk 11.9:1 on hessian and 9.8:1 on baffle; grille 6.2:1 and 5.1:1; rec 5.9:1 and 4.8:1; ink 11.6:1 and ink-soft 5.5:1 on the label. Tape (3.6:1 on hessian) is graphics only.

## Adapting

1. **Data.** Change `RATES`, `TAPE_DAY`, `ROOMS` and `SESSIONS` at the top of the script and the matching radios and rate rows in the HTML (each row's `data-room` must match a room radio's `value`). `replyText()` holds the opening-hours rule (Monday to Saturday, cut-off 17:00); change it with the phone hours in the channels.
2. **Another object that fills.** Keep the pattern "a physical thing fills while you hold, and the result is the record you would write when it is full". A kiln that comes up to temperature, a cask that fills, a spool of thread. Swap the SVG, keep the validate-first rule, the rewind on early release and the keyboard path. If the object has no physics, drop `angle()` and keep the linear fill.
3. **Copy.** Keep the H2 as what the person gets, the intro as what happens next and what is not yet promised, button text as the action ("Hold to send enquiry"), and errors as how to fix the field. The result title keeps the same verb as the button ("Enquiry sent").
4. **Tokens.** Map the brand by role: a ground, a raised surface, one lit colour that also serves as the focus ring, a secondary text colour at 4.5:1 or better on both darks, an error colour at 4.5:1 or better on both darks, and one paper colour kept for the result only.
5. **Layout.** One column below 992px with channels before the form; from 992px the aside takes columns 1 to 5 and the form well columns 7 to 12, and the aside is sticky when the viewport is at least 740px tall (raise that query if the aside grows). Rate rows stack name and price over the detail below 720px.
6. **Retiming or removing motion.** CSS timing tokens: `--dur-*` and the `--ease-*` curves. The script reads `--t-hold` (pointer fill), `--t-key` (keyboard fill), `--t-rewind`, `--dur-fade` and `--dur-close`, so changing those tokens retimes the hold and the label. To remove an effect, delete its block in the motion layer: the load timeline, the SplitText call, `ScrollTrigger.batch('.ctl')`, the rates trigger, the threading trigger, the velocity `spinTick`, or the `if (fine)` block (rocking and magnetic). Removing the four CDN tags gives the reduced-motion page with CSS-only feedback.
7. **Stack translation.** Keep the form a real form with `novalidate` and a submit handler, the result in the same well as the form, the radios real inputs inside the caps, and the rate rows real buttons.

| Token | Role |
|---|---|
| `--hessian` | Page ground; cap and send-key surface; slots in the reel hub. |
| `--baffle` | The form well. |
| `--chalk` | Text, focus rings, armed field rule, lit selection LEDs, hovered rate rule. |
| `--grille` | Secondary text, labels, idle field rules, reel flange and hub. |
| `--rec` | The Rec LED and field errors only. |
| `--label` | The tape-box label (result) only. |
| `--ink`, `--ink-soft` | Text and captions on the label. |
| `--tape`, `--tape-core`, `--tape-edge` | The tape pack's fill and its light-catching edge. |
| `--rule` | Idle hairlines between rate rows and the resting link underline. |
| `--font-panel`, `--font-text` | Both Zalando Sans; swap `--font-panel` for a separate wide display face if a brand has one. |
| `--w-panel`, `--w-body`, `--w-legend` | Widths 125, 100 and 85. |
| `--fs-xs` ... `--fs-xl` | 13, 15, 17, 20, 22 to 32 and 28 to 48px. |
| `--lh-tight`, `--lh-body` | 1.14 headings, 1.55 body. |
| `--s-1` ... `--s-9` | Spacing 4, 8, 12, 16, 24, 32, 48, 72, 112px. |
| `--gutter`, `--max`, `--well-pad` | Side gutter 16 to 56px, 1328px content width, well padding 16 to 32px. |
| `--reel` | Send reel diameter, 60 to 76px. |
| `--radius-cap`, `--radius-label` | 3px caps and buttons, 2px label; fields and the well are square, the reel round. |
| `--ease-out`, `--ease-in`, `--ease-follow`, `--ease-swap`, `--ease-sweep`, `--ease-pop`, `--ease-release` | expo.out, power3.in, power3.out, the MI2 swap, the HV2 sweep, about back.out(2), the MI1 release overshoot. |
| `--dur-press` ... `--dur-close` | .12s press, .4s release, .2s hover, .3s armed rule, .35s swap, .45s sweep, .25s message, .25s form fade, .7s label open, .45s label close. |
| `--t-hold`, `--t-key`, `--t-rewind` | 1s pointer fill, .35s keyboard fill, .25s rewind. |

## Motion

House easing: expo.out for entrances and reveals, power3 for follows and the label closing, a back-out curve only for LED pops. Everything is built inside `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide` conditions. Lenis (lerp .1, `autoRaf: false`, `anchors: false`) runs on `gsap.ticker` with `lagSmoothing(0)`; the hold's own fill is a short `requestAnimationFrame` loop in the plain layer so it works without the CDN, and nothing runs between holds. The section has no menu or dialog, so Lenis never stops; the hook is commented where an adapter would add `lenis.stop()` and `lenis.start()`. The cleanup removes the ticker callbacks and pointer listeners, destroys Lenis, kills the reel tweens, clears inline styles and releases every hidden state.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Studio name | LD8 | Load, t=0 | opacity 0 to 1, y 6 to 0, .4s expo.out | Static |
| H2, masked lines after the font loads (1s cap) | TX1 | Load, t=.15 | yPercent 110 to 0, 1s expo.out, stagger .08; masks padded .12em for q and y | Not split, visible |
| Intro and the three channels (the only fade-rise) | LD8 block | Load, t=.45 | opacity 0 to 1, y 12 to 0, .6s expo.out, stagger .06 | Static |
| Field rules | SC16 | ScrollTrigger batch `top 94%`, once (not before t=.5) | scaleX 0 to 1 from the left, .7s expo.out, stagger .05 | Static |
| Reel threading | One revolution of the hub | Send key reaches `top 94%`, once (not before t=.9) | 360deg, 1s power4.out | None |
| Reel spin from scrolling | SC10 | Lenis velocity while the key is on screen | target clamp(velocity × .6) deg per frame, interpolated .1 per frame with delta time, decays ×.9 per frame; sleeps off screen | Off |
| Day rates | SC16 plus masked rise | ScrollTrigger `top 85%`, once | Rules scaleX 0 to 1, .9s expo.out, stagger .1; rows y 101% to 0 in their masks, .8s expo.out, .15s after their rule | Static |
| Sticky aside | CSS sticky | 992px wide and 740px tall | top 48px | Same |
| Hold to send (signature) | CD8 as a take-up reel | Press and hold the send key | Pack scale rh/rf to 1 over 1s ease none with area linear in time; hub angle θ(t) (three turns, 5.8 to 2 turns a second); label MI2 to "Keep holding" .35s; full: Rec LED pops .25s, form fades .25s, label clip-path inset(0 0 100% 0) to inset(0) .7s expo.out, its rules draw .6s and rows rise .5s with .05s steps, focus to the label title, Lenis scrolls it into view | Hold and pack kept, no spin, instant label |
| Released early | CD8 rewind | pointerup or pointercancel before full | Pack back to the hub .25s power2.out; the hub runs backwards through the same θ | Pack rewinds, no spin |
| Keyboard and submit path | CD8 keyboard | Enter, Space, Enter in a field, `.click()` | Fill .35s, then the same reveal | Instant |
| Edit enquiry, Start a new enquiry | Reverse reveal plus HV4 and MI1 | Click | Label clip closes .45s power3.in, form fades in .3s, focus to "Your name"; fill from the entry edge .35s in, .25s out; press scale .96 | Instant swap; colour only |
| Reel rocking | Pointer follow (fine pointers) | Pointer moving over the form well | Hub ±25deg from the pointer's x across the well, quickTo .5s power3.out; back to 0 on leave; rect cached on enter; off during a hold. Touch and keyboard need no equivalent because it carries no information | Off |
| Send key | HV5 magnetic, focus cue | Fine-pointer hover; focus-visible | Up to 5px x and 3px y, quickTo .5s power3.out, home on leave and during a hold; focus turns the hub 60deg over .4s power3.out plus the 3px ring | No magnetic; the 60deg cue is instant |
| Email, phone and map links | HV2 | Hover, focus-visible | .07em underline in from the left, out to the right, .45s; resting 1px hairline; 3px ring on focus | Underline always shown; on touch always shown |
| Text, date, number and textarea fields | MI4 (static labels) | Hover, focus, error | Hover brightens the rule .2s; focus draws a 3px chalk rule from the left .3s power3.out and lights the label; errors turn the rules red and open the message .25s | Instant |
| Session and room caps | MI3, MI1 | Hover, press, change, focus-visible | LED previews at 35% on hover; checked LED pops scale .6 to 1 .25s back-out; edge to chalk, label to 600 (width reserved); press .96 | No pop, no press scale |
| Tape checkbox | MI4 tick | Change, hover, focus-visible | Tick stroke-dashoffset 1 to 0, .3s power3.out; box edge to chalk | Instant |
| Rate rows | HV7, MI2, MI1, scroll to the form | Hover, focus-visible, press, click | Others dim to .45 over .35s; chalk rule draws .4s; price swaps to "Choose" .35s; press .985; click scrolls to "Which room?" with Lenis 1.1s expo-out and focuses the checked cap | Dimming kept, instant swap, native jump |
