---
title: Channel strip under a VU meter
section: features
subject: Brack Audio, two engineers in Sheffield, presenting Brack 2408, a mixing-console plugin (VST3, AU, AAX) modelled on the Lindqvist B-24, a 1974 broadcast desk they restored, with a 21-day trial.
aesthetic: A painted-steel channel strip in a dim control room at night. Desk-paint faceplate with silkscreen legends, a backlit VU meter with a black face and warm-white scale, and illuminated push-button caps that glow a pilot-lamp green.
mode: dark
fonts:
  - Signika, variable wght 300-700 and GRAD -30..0 (Google Fonts), wordmark, headings, tabs and button legends, strip legends, readouts (its figures are tabular by default)
  - PT Serif 400, 400 italic, 700 (Google Fonts), the manual voice - lede, panel body, the drift heading and caption, specs, form help and messages
js: "Synthesises a 92 BPM demo loop with Web Audio and runs it through a working channel strip (WaveShaper preamp, four biquads, compressor, bus and glue compressor) whose controls live in four crossfading tabs. A VU needle reads the result's RMS with 300 ms ballistics, the drawn strip's knobs follow the controls, and GSAP and Lenis drive the load sequence and the meter's power-on thump, the scrubbed fader rise, the rule draw-in, eased anchors and the meter-glass glare."
libraries: ["GSAP 3.15 (ScrollTrigger, CustomEase)", "Lenis 1.3.26"]
tags: [audio, plugin, mixing-console, vu-meter, web-audio, tabs, scroll-driven, gsap, lenis, dark, product, hardware-model]
use_when:
  - Software that models a piece of hardware, where the hardware's own instruments (meters, knobs, lamps) can show what the software does.
  - A product whose features are stages in a chain that runs in order (signal chain, pipeline, processing steps), three to five of them.
  - There is an honest live demo that can run in the browser, so the meter and the play button report something real.
avoid_when:
  - There is no real audio or live data. The play button, the equaliser bars and the needle would be decoration.
  - More than five stages. The tabs stop fitting on one row on phones and the strip grows past one screen.
  - Light, airy brands. The design depends on lamp light reading against a dim room.
---

## Why it works

**The one bold idea: the meter comes alive, and then it tells the truth.** When the page loads, the strip rises out of the desk, its ten knobs recall to their stored positions, the meter's face lamp warms up like a filament, and the needle gives the power-on thump a real desk gives: it kicks off its stop at -20 VU to +1 VU in 0.22 s, then falls back with a damped VU overshoot (about 1.5% past the stop) and settles. From then on the needle is the page's one live readout. Press "Play the demo loop" and a two-bar loop is synthesised in the browser and run through a real channel-strip graph. The controls in the tabs (transformer, air shelf, ratio, drift) change what you hear and turn their knob or light their lamp on the drawn strip, and the transformer and ratio visibly change how the needle moves. Everything else on the page is quiet support for that one object.

- **A VU meter, drawn and driven like one.** The face is a black VU with a warm-white scale from -20 to +3 VU, red from 0 to +3, a "VU" legend and a peak LED. The scale is linear in amplitude, as on a real VU (deflection follows voltage), so -20 to -10 is cramped and the top end is wide. The needle reads RMS: the mean square of the analyser's last 1024 samples, integrated over about 100 ms, converted with `dB = 10·log10(ms) + 18` so that 0 VU = -18 dBFS, then fed per `gsap.ticker` frame to `gsap.quickTo(needle, 'rotation', { duration: 0.3, ease: 'power2.out' })`. That is the 300 ms VU ballistic. -20 VU sits on the stop at -48deg and +1 VU at +6deg. It is not the amber backlit VU cliche: the face is black with warm-white ink under a warm-white face lamp, and red is only the top of the scale.
- **No amber; lamps are green.** Lit push-button caps glow a low-chroma pilot-lamp green (`--pilot`), the colour of an indicator lamp, not an acid accent. Green appears only where a lamp is lit: the selected tab, the chosen transformer, ratio and platform, the drift switches when on, the play button while the loop runs, the active stage's indicator dot, and the focus ring (a focus ring is a lamp that says "you are here"). Red appears only in the VU's red zone, the peak LED and the error dot. The page background is a chosen blue-slate (`--room` #1A232C), the room at night, not a tinted near-black, and the text is silkscreen ivory. This answers Default 2: the dark is a place, and the accent is a physical lamp with rules.
- **The lamp language is one system.** Tabs, segmented radios, the drift switches, the play button and both primary buttons are the same illuminated cap: unlit at rest, a pre-glow at 18% on hover and focus (0.08 s on), lit on press or when selected, with a 0.28 s afterglow when it goes off. Lit legends switch Signika's grade axis from -30 to 0, so they read heavier without changing width. Grade is a state, never tweened; only the lamp's opacity animates.
- **Signal order is the structure.** The four tabs run Preamp, EQ, Dynamics, Bus because that is the order the signal passes through, and the drawn strip stacks its stages in the same order with printed rules between them. The tablist is labelled "in signal order". On phones the strip shows only the selected stage, right under the meter, so a changed control turns a knob in view.
- **The drawn strip mirrors; it does not compete.** The strip's knobs are not draggable. The transformer, air and ratio knobs turn when their tab controls change and the drift lamp follows the drift switch; the other knobs (drive, low, low mid, high mid, threshold, glue, output) are fixed illustration at a factory preset, and the visually hidden summary says so. The strip is `aria-hidden` with that summary, and the meter is `role="img"` with a label.
- **Measured, then drawn.** The drift section's heading makes the claim ("We measured all 24 channels, one at a time.") and the 24 faders show the real gain offsets with their values printed under each one, always visible (no hover-only content). Offsets are drawn 40 times larger than life, and the caption says so. A second drift switch sits under the caption, bound to the same state as the one in the Bus tab, so turning drift off realigns the 24 caps from the centre outwards right next to the control that caused it.
- **Two clearly different voices.** Signika was drawn for signage legibility, which suits silkscreen legends and readouts; its figures are tabular by default (checked in Chromium: '1111' and '0000' measure the same). PT Serif is the manual: the lede, the panel paragraphs, the drift heading and caption and the specs read as the engineers writing. There is no monospace and no ALL CAPS anywhere; legends are sentence case, as Default 5 asks.
- **Distinct from `features-modular-synth`.** That design is warm brown, a green PCB panel, ENIG gold and patch cables tying jacks to features. This one is cool slate desk paint, a live Web Audio demo and a measuring instrument. There is no cable or jack imagery.
- **Copy from the producer's side.** Each panel's heading names what its control does ("Open up the top without the hiss" for the air shelf) and gives one hard number. The Bus panel makes a concrete claim ("the stereo image widens slightly, because no two channels sum quite the same"), and the demo makes it true: drift skews each voice's pan by its measured offset. The trial result echoes the email and platform the person entered.
- **Headings start at h2.** Like the rest of the collection's sections, this is a section fragment: the host page supplies the h1. Inside it the order is h2, h3, h4.

Audio, so MI6 is honest: voices (sine kick with a pitch drop, noise snare, high-passed noise hat plus an off-step shaker, sawtooth bass through a lowpass, sine-plus-triangle Em9 and Cmaj7 pad) sit on measured channels 1, 2, 4, 5 and 7. They run into an input trim (the kick peaks at 0.12 into the preamp), a WaveShaper preamp (a curve per transformer, 4x oversampling, make-up gain that matches peaks), low shelf, low-mid peak, high-mid peak, an 8 kHz high shelf (the air control), a +14 dB line-up gain, a DynamicsCompressor (threshold -24 dB, ratio from the radios) with a trim that offsets its automatic make-up gain, the bus, a 2:1 glue compressor, the AnalyserNode the meter reads, and the master at -12 dB with a 2 s fade-in. A 100 ms lookahead scheduler runs on `gsap.ticker`, so there is one clock; if the tab sleeps it skips missed steps rather than bursting. The AudioContext is created on the first press inside try/catch; on failure the button reads "Sound isn't available in this browser" and is `aria-disabled`. The audio graph lives outside `gsap.matchMedia`, so a media-query change never stops the sound.

Measured needle response over one full loop (5.2 s, headless Chromium): the programme averages about -6 VU with kicks into the red. Ratio Off, 2:1, 4:1 and 10:1 keep the mean within 0.5 dB while the swing narrows from about 50deg to 37deg, which is what compression looks like on a VU. Iron reads about 2.3 dB hotter than nickel on average (+8deg, peaks +13deg), steel about 0.5 dB. The air shelf moves the needle only about 1deg at +8 dB, because a VU reads the kick and bass; you hear it in the hats and shaker rather than see it. Drift is a stereo effect and barely moves a mono meter.

No dead ends: every anchor targets an existing id (top, strip, drift, specs, trial), is scrolled with Lenis, pushes the hash into history (so Back returns to the section) and then moves focus to the heading; modified clicks (ctrl, cmd, shift, middle) are left to the browser. The form validates in JS, shows an inline error, and on success crossfades to a result with a "Use a different email" way back that keeps the address. "Email support" is a mailto in a new tab with `rel="noopener"`.

## Do not touch

- **The meter's honesty.** 0 VU = -18 dBFS, RMS with 300 ms ballistics (`quickTo` 0.3 s `power2.out`), -20 VU at -48deg and +1 VU at +6deg on an amplitude-linear scale, red from 0 VU. The needle is driven only by the analyser and the one power-on kick. Never animate it for decoration.
- **The calibration.** `MAKEUP` matches peaks (a 0.12 sine comes out at 0.12), so saturation shows on the meter as density rather than as a louder peak. `DYN_TRIM` (`{ off: 0, 2: -2.5, 4: -4, 10: -5 }` dB) offsets the compressor's automatic make-up gain so the mean stays within about 1 dB across ratios and only the swing narrows. If you change the voices, the line-up gain or the compressor, re-measure both; a ratio that reads louder teaches "compression = louder", which is false.
- **One lamp colour, one red.** Green only on lit things and focus; red only on the VU's red zone, the peak LED and the error dot. Text on a lit cap is `--room` (9.6:1 on `--pilot`).
- **Grade as state.** GRAD -30 unlit, 0 lit. Do not tween it, and do not swap it for a weight change, which would reflow the caps.
- **Controls change the sound and move their knob or lamp.** Transformer and ratio also change how the needle reads; air and drift are mostly heard. The other strip knobs are fixed illustration. A control that only changes text breaks the idea.
- **Nested faders.** The scroll scrub moves `.fader__ride`; the drift offset lives on `.fader__cap`. Merging them makes the two fight.
- **Panels share one grid cell** (CD9), and so do the form and its result, so switching never changes the page height.
- **The peak LED rate limit** (at most about 3 per second, held 150 ms). It is a flashing element; keep it under the photosensitivity threshold.
- **Hidden states.** The load-time hidden states (the plate below its mask, the dimmed face lamp, the unlit tab) live under `html.js:not(.booted)`. The inactive panels and the trial result are hidden under `html.js` by state, not by load. The CDN-failure path removes `html.js` and leaves a complete static page (all four panels stacked, no play button).
- **The menu lock.** While the mobile sheet is open, `html.menu-open` sets `overflow: hidden` (this is what locks scrolling under reduced motion, where there is no Lenis), Lenis is stopped, and `main`, the footer, the skip link and the wordmark are inert, so only the sheet and the Close button take focus.

## Adapting

Change the `:root` tokens first. The colour roles are physical: the room, the paint on the object, its legend ink, a secondary steel, the lamp colour and a single warning red. Keep the lamp colour light enough that `--room` text on it stays above 4.5:1, and keep `--vu-black` and `--vu-ink` as a real meter face (or redraw the meter for your instrument).

For another product, replace the stages (tabs, panels and strip modules) one for one, in the order the product processes things. Three to five stages fit. Each panel needs a heading that names an outcome, two or three sentences, one control and one spec line. Replace the demo graph in `audio.build()` and `audio.apply()` with what your product really does; if there is no honest live signal, remove the play button and the needle readout rather than faking them.

To retime motion, change the `--m-*` tokens (CSS transitions: lamps, presses, swaps, underlines, drift realignment, the beat-locked equaliser) and the `--g-*` / `--ge-*` tokens (seconds and GSAP ease names read by the script). The load sequence lives in one timeline in the `matchMedia` callback; delete a line to remove that step. To remove the scroll moments, delete the fader `fromTo` and the spec-row `fromTo`; everything renders in its final state without them. To remove the glare, delete the `fine && wide` block. The beat duration `--m-beat` must equal one beat of the loop's tempo (60 / BPM).

| Token | Role |
|---|---|
| `--room` | Page background, text on lit caps |
| `--paint` | Faceplate, unlit caps, input fields |
| `--ivory` | Text, silkscreen legends, knob indicator lines |
| `--steel` | Secondary text, legends on the strip, unlit lamp dots, knob scales |
| `--pilot` | Lit lamps (caps, stage dot, drift lamp) and the focus ring |
| `--peak` | VU red zone, peak LED, error dot and invalid rule |
| `--vu-black`, `--vu-ink`, `--vu-glow`, `--vu-cover` | Meter face, its warm-white legends and needle, the face lamp's light, the movement cover |
| `--edge`, `--rule`, `--slot`, `--skirt` | Derived colours: cap and plate edges, section rules, fader slots, the dark skirt under caps |
| `--knob-hi`, `--knob-lo`, `--screw-hi`, `--screw-lo` | Knob and fader cap shading, screw heads |
| `--shadow`, `--sheen` | RGB channels for shadows and highlights, used as `rgb(var(--shadow) / a)` |
| `--font-legend`, `--font-text` | Signika (legends, UI, readouts), PT Serif (manual voice) |
| `--step--2` to `--step-3` | Type scale, perfect fourth on a 17px body (`--step--2` is the 12px floor for strip legends) |
| `--s1` to `--s10`, `--gutter`, `--max`, `--hdr-h` | 4px spacing scale, page gutter, max width, header height |
| `--strip-w`, `--knob` | Width of the drawn strip (300px; up to 400px from 1200px; 248px on tablets; full width on phones) and knob size (52px, 60px from 1200px) |
| `--r-plate`, `--r-cap`, `--r-fader` | Radius by object: plate, push-button cap, fader cap |
| `--m-lamp-on`, `--m-lamp-off` | Lamp warm-up and afterglow |
| `--m-beat` | One beat at 92 BPM, the equaliser bars' period |
| `--m-stage`, `--m-press`, `--m-release`, `--m-swap`, `--m-underline`, `--m-reveal`, `--m-error`, `--m-drift`, `--m-drift-step` and their `--m-ease-*` | Remaining CSS motion: stage backlight, press and release, label swap, underline, skip and label reveal, error reveal, drift realignment |
| `--g-rise`, `--g-recall`, `--g-lamp`, `--g-kick`, `--g-settle` | Load sequence: strip rise, knob recall, face lamp, needle kick and settle |
| `--g-vu` | VU ballistics (0.3 s) |
| `--g-in`, `--g-out` | CD9 crossfade halves (tabs and form/result) |
| `--g-detent`, `--g-air` | Stepped knob detents, air knob follow |
| `--g-rule`, `--g-sheet`, `--g-links`, `--g-glare` | Spec rule draw-in, menu sheet, menu links, meter glare |
| `--ge-*` | The GSAP ease name for each `--g-*` duration |

## Motion

Detailed tier. GSAP 3.15.0 (ScrollTrigger, CustomEase) and Lenis 1.3.26 from jsDelivr; Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`. Everything that moves on its own is inside `gsap.matchMedia` with `motion`, `reduce`, `fine` and `wide` (min-width 820px) conditions; cleanup removes the ticker callback and window listeners and destroys Lenis. Under reduced motion there is no Lenis, every element is in its final state, swaps and lamps are instant, the equaliser bars are static and the needle is replaced by a numeric "Level −6 VU" readout updated four times a second. The native cursor is never hidden.

Load sequence (text and controls are usable from first paint):

| When | What | Technique | Timing | Reduced |
|---|---|---|---|---|
| 0.35 s | The strip rises out of the desk, masked by its own box | LD7, adapted to a masked rise | 0.9 s `expo.inOut` | In place |
| 0.9 s | Knob recall: the 10 caps turn 30 degrees into their stored positions, top first | Subject move | 0.6 s `power3.out`, stagger 0.03 | Final positions |
| 1.1 s | Signature, part 1: the face lamp warms from 0.12 to 1, no flicker | CustomEase `lamp` | 0.5 s | Lit |
| 1.2 s | The selected tab's lamp lights | Lamp cap | 0.08 s | Lit |
| 1.6 s | Signature, part 2: the needle kicks from the stop (-48deg) to +1 VU (+6deg), then falls back about 1.5% past the stop and settles; then the analyser takes over | Two tweens on the needle, CustomEase `vu-settle` | 0.22 s `power2.out`, then 0.9 s `vu-settle` | Needle hidden, readout shown |

Scroll:

| What | Technique | Trigger and timing | Reduced |
|---|---|---|---|
| 24 fader rides climb from the bottom of their slots to the mix | SC5 mechanics on fader caps | `top 85%` to `center 55%`, `scrub: true`, `ease: none`, stagger amount 0.5 left to right | Final positions |
| Spec row rules draw from the left, one per row | SC16 | `top 90%`, once, 0.9 s `expo.out`, stagger 0.06 | Static |
| The nav marks the section in the reading band | NV6 spy | IntersectionObserver `-40% 0px -55% 0px` | Same |
| Equaliser bars rest while the meter bridge is off screen (the loop keeps playing) | MI6 pause | ScrollTrigger toggle | Static bars |

Pointer (fine pointer and wide only): the meter-glass glare drifts against the pointer, up to 24px, `quickTo` 1.2 s `power3.out`, and settles when the pointer leaves the window (HV12 sheen). Static on touch and under reduced motion.

Every interactive item:

| Item | Hover (fine) | Focus | Press / change | Reduced | Touch |
|---|---|---|---|---|---|
| Skip link | - | Wipes down, clip-path 0.2s expo.out, ring | - | Instant | - |
| Wordmark, nav links, sheet links, footer links, "Use a different email" | HV2 underline in from the left, out to the right, 0.45 s | Underline plus ring | Nav links: NV6 eased anchors, `lenis.scrollTo` with duration `min(1.3, 0.65 + d/4000)`, hash pushed, then focus the heading; "Use a different email" also presses (MI1) | Static underline, native jump | Persistent 1px underline (not on the wordmark) |
| "Try it free", "Email me the trial" | Lamp pre-glow 18% | Pre-glow plus ring | 1px travel, lamp lit, legend to GRAD 0 | Instant lamp | Press only |
| Menu button (below 820px) | Pre-glow | Pre-glow plus ring | MI2 Menu / Close swap 0.35 s; NV1 sheet as one reversible timeline (clip 0.5 s `expo.inOut`, links rise 16px, stagger 0.05), close at timeScale 1.4; scroll locked, main, footer, skip link and wordmark inert, Escape closes, focus moves in and back (to the first nav link if the window widens past 820px) | Instant | Same |
| "Play the demo loop" | Bars lift to 45%, pre-glow | Same plus ring | MI6 bars at 0.652 s (one beat), out of phase; MI2 label swap; lamp lit while playing | Static bars, instant label, audio works | Same |
| Tabs (Preamp, EQ, Dynamics, Bus) | Pre-glow | Pre-glow plus ring; arrows, Home, End, roving tabindex; panels are focusable | Lamp warms 0.08 s, cools 0.28 s; CD9 crossfade (out 0.15 s y -4, in 0.25 s y 4); the strip stage's backlight crossfades 0.3 s (on phones the shown stage switches) | Instant | Same |
| Transformer and Ratio radios | Pre-glow | Ring on the cap | Lamp; stepped knob turns to its detent, 0.35 s `back.out(1.7)`; sound and needle change | Knob jumps | Same |
| Air shelf range | Fader cap centre line brightens | Ring round the cap | Readout updates (+3.5 dB, tabular); air knob follows, `quickTo` 0.25 s; shelf gain follows | Knob jumps | Native drag, 44px hit area |
| Channel drift switches (Bus tab and drift section) | Pre-glow | Ring | MI2 On / Off, lamp on both; caps realign from the centre, 0.5 s, 20 ms steps; labels to 0.0; strip drift lamp | Instant | Same |
| Email field | Bottom rule brightens to ivory | Pilot 2px rule plus ring; MI4 floating label 0.2 s | Error revealed with clip-path 0.25 s, `aria-invalid`, focus returns to the field | Instant | Same |
| Platform radios | Pre-glow | Ring | Lamp | Instant | Same |
| Form submit | - | - | Form and result crossfade in one cell; focus to "Trial link sent" | Instant | Same |

Removed during review (the accessory): a header chrome entrance (LD8) that faded the wordmark, nav and "Try it free" in, and a large statement row that repeated the drift caption; its first sentence became the drift heading. The header is still at first paint, so the load is only the strip, the knobs and the meter.

Non-interactive by design: the drawn strip and the 24 faders do nothing on hover, so no content exists only on hover.
