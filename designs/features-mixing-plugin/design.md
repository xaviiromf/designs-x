---
title: Channel strip under a peak meter
section: features
subject: Brack Audio, two engineers in Sheffield, presenting Brack 2408, a mixing-console plugin (VST3, AU, AAX) modelled on the Lindqvist B-24, a 1974 broadcast desk they restored, with a 21-day trial.
aesthetic: The desk itself in daylight. Putty broadcast-grey paint, a lighter grey strip face with engraved legends, black knob and key caps, illuminated push-buttons with real lens colours, and a black Nordic peak programme meter.
mode: light
fonts:
  - Hedvig Letters Sans 400 (Google Fonts, Kanon Foundry), wordmark, nav, tabs and button legends, strip legends, meter scale, readouts
  - Hedvig Letters Serif, opsz 12-24, 400 (Google Fonts, Kanon Foundry), the manual voice - h2, statement, headings, lede, panel body, spec values, form help and messages
js: "Synthesises a 92 BPM demo loop with Web Audio and runs it through a working channel strip (WaveShaper preamp, four biquads, compressor, bus and glue compressor) whose controls live in four crossfading tabs. A peak programme meter reads the result with Type I ballistics, the drawn strip's knobs follow the controls, and GSAP and Lenis drive the power-up sequence (lamp test, meter lamp, a line-up snap to Test, a hold and a slow fall), the word illumination, the scrubbed fader rise, the rule draw-in, eased anchors and the meter-glass glare."
libraries: ["GSAP 3.15 (ScrollTrigger, SplitText, CustomEase)", "Lenis 1.3.26"]
tags: [audio, plugin, mixing-console, peak-meter, web-audio, tabs, scroll-driven, gsap, lenis, light, product, hardware-model]
use_when:
  - Software that models a piece of hardware, where the hardware's own instruments (meters, knobs, lamps) can show what the software does.
  - A product whose features are stages in a chain that runs in order (signal chain, pipeline, processing steps), three to five of them.
  - There is an honest live demo that can run in the browser, so the meter and the play button report something real.
avoid_when:
  - There is no real audio or live data. The play button, the equaliser bars and the needle would be decoration.
  - More than five stages. The tabs stop fitting on one row on phones and the strip grows past one screen.
  - Brands without a physical object to draw. The palette, the lamps and the meter all come from the desk; without an object they are costume.
---

## Why it works

**The one bold idea: the desk powers up, and then its meter tells the truth.** On load the page behaves like the Lindqvist B-24 being switched on. The header arrives, the ten knobs on the drawn strip recall to their stored positions, every lamp is tested once in signal order (Preamp, EQ, Dynamics, Bus, then the transformer caps and the play key, 0.06 s each), and only the selected ones stay lit. Then the meter lamp warms up from under the cover, and 0.3 s into the warm-up, while the lamp is still coming up, the needle of the peak programme meter snaps from its stop to the Test mark in one Type I rise. It holds on Test for 0.6 s, as it would on a 1 kHz line-up tone, with the Test legend at full brightness, and only then glides slowly back down, falling 20 dB every 1.7 s. When it lands on its stop pin it taps it once (1.5 degrees and back, 0.45 s, on the inner needle line so the ballistics are untouched), and in the same frame the play key flashes once: the sequence ends by pointing at the one action that brings the meter back. The snap, the hold, the slow glide down and the tap are the signature: lamp and needle land as one event, and the hold is what a desk does when it is lined up. It is driven by the same ballistics code that reads the live audio afterwards: the power-on test is a single 0 dB peak injected into the meter, plus a hold flag the ticker respects. It never reaches the peak-hold mark, which only real audio feeds. A VU that thumps and settles was briefed first and dropped: a broadcast desk carries a PPM, and an overshooting needle is crud-vet-clinic's move. From then on the needle is the page's one live readout. Press "Play the demo loop" and a two-bar loop is synthesised in the browser and run through a real channel-strip graph. Every control in the tabs (transformer, air shelf, ratio, drift) changes what you hear and turns its knob or lights its lamp on the drawn strip, and the meter shows what that does to the peaks.

The desk is shown in daylight on its own putty paint, so the meter is the only dark object on the page. (The plan said dark mode and CU3 pointer parallax; art direction moved it to light, and the only pointer move left is the HV12 glare on the meter glass, fine pointers from 820px.)

- **A Nordic PPM, drawn and driven like one.** A broadcast desk carries a peak programme meter, not a VU. The face is black with a white scale from -36 to +9 dB, linear in dB (100 degrees for 45 dB), with the Test mark at 0 dB, red only from +6 to +9, a "PPM" legend and a peak LED. Ballistics follow IEC 60268-10 Type I on the Nordic (N9) scale: fast rise (5 ms integration, a 0.03 s `quickTo` on the needle) and a slow return of 20 dB in 1.7 s, linear in dB. Test (0 dB) is -18 dBFS, the EBU R68 alignment level. Each `gsap.ticker` frame reads the sample peak of the analyser's last 1024 samples and holds the larger of that peak and the falling level. A thin peak-hold mark (scale ink at 60%), fed only by the analyser, keeps the highest peak of the last two bars (5.2 s) and then falls at the PPM rate, so a control that changes the peaks by 2 or 3 dB moves something that stays still long enough to read. The peak LED fires above +6 dB, holds 150 ms and fires at most about three times a second. Under reduced motion the needle, the peak-hold mark and the "PPM" legend give way to a numeric readout ("Peak −6 dB", "Peak below −36 dB"), updated four times a second.
- **The palette is the desk's own paint and lenses.** The page is the B-24's putty broadcast-grey paint (`--ground` #B4AF9F). The strip face and the fields are a lighter panel grey (`--panel` #CFCBBE). Text and legends are dark engraving ink (`--ink` #1F1E1B, 7.6:1 on the ground, 10.3:1 on the panel), and captions use a worn-legend grey (`--ink-2` #3E3B35, 5.1:1 and 6.9:1). Lit caps use real lens colours. A green lens (`--lens-green` #4C9C66, ink legend at 5.0:1) marks the active stage, both on the tab and on the strip's stage lamp. A warm-white lamp (`--lens-white`) marks selections: transformer, ratio, platform, drift, the playing transport key and the open menu. Black key caps (`--key`) carry panel-grey legends (9.1:1). Red (`--peak`) appears only at the meter's top end and on its peak LED. There is no amber anywhere and no slate ground, so this is not the recording-studio VU or the dark warehouse palette.
- **One control language for the whole page.** Every control is an illuminated push-button cap with a `--lamp` brightness variable. Its value is 0 when off, 1 when lit, and 0.4 for the hover and focus pre-glow on the pale lenses (tabs, radios, drift switches; 18% vanished over pale grey). The black keys are never washed on hover or focus, because a grey wash on a black key reads as disabled; their legend lights to warm white with a 6px bloom instead. The lamp warms on in 0.08 s and cools with a 0.28 s afterglow, and only opacity animates. That covers the tabs, both segmented radios, the platform radios, the drift switches, the play key, "Try it free", "Email me the trial" and the Menu button. A press travels 1px down. A latched cap (selected, checked, pressed, playing, open) sits 2px lower on a shorter skirt, so its state never rests on colour alone. The lit layer is a filament gradient behind the lens plus a bloom thrown onto the panel.
- **Signal order is the structure.** The four tabs run Preamp, EQ, Dynamics, Bus because that is the order the signal passes through. The drawn strip stacks its stages in the same order with printed rules between them, and the lamp test runs in that order too. The tablist is labelled "in signal order". On phones the strip shows only the selected stage, right under the meter, so a changed control turns a knob in view. In every panel the control sits straight under the heading and the explanation follows it, so the control and the meter it moves share one screen.
- **The meter dominates from 1200px.** The strip spans grid columns 6 to 12 (up to 620px wide, so the PPM face is about 588x333). It starts 32px above the h2, so the first screen reads as an instrument with notes beside it rather than as a split hero with a product shot. The four stages pair up beneath the meter in signal order. Between 820 and 1199px the strip is 300px wide. Below 820px it is at most 420px wide and left-aligned, so on a 768px tablet the tabs still sit under the meter, and on phones it is full width.
- **The drawn strip mirrors; it does not compete.** Its knobs are not draggable. The transformer, air and ratio knobs turn when their tab controls change, and the drift lamp follows the drift switch. The other knobs are fixed illustration at a factory preset, and the visually hidden summary says so. The strip is `aria-hidden` with that summary, and the meter is `role="img"` with a label naming the scale and its alignment.
- **Measured, then drawn.** A statement at the h2 size, so the meter stays the only display-scale object ("We measured all 24 channels of the restored desk, one at a time. No two came out the same, so no two strips in Brack 2408 do either.") lights word by word, from 60% to full, and is fully lit by the time its top reaches 60% of the screen, so it never sits in a faint, low-contrast state. Beneath it, 24 faders show the real gain offsets with their values printed under each one, always visible. Offsets are drawn 40 times larger than life, and the caption says so. Each slot carries its channel number, as a desk's scribble strip would, so the phone layout's second row reads as channels 13 to 24. A second drift switch sits under the caption, bound to the same state as the one in the Bus tab, so turning drift off realigns the 24 caps right next to the control that caused it. Screen readers hear the second one as "Channel drift, faders", so the twins can be told apart.
- **One weight, two voices.** Hedvig Letters comes from Kanon Foundry in Sweden, which fits a fictional Swedish broadcast desk. The sans has a single weight, which is how engraved desk legends work: hierarchy comes from size alone, and `font-synthesis: none` forbids faux bold and italic. The serif, at its largest optical size, sets the h2 and the statement, and at text sizes it is the engineers' manual (lede, panels, captions, specs, form). Hedvig Letters Sans has no tabular figures: measured in Chromium at 40px, "1111" is 61.3px and "0000" is 99.5px. So the one live readout (the air shelf's "+3.5 dB") sets each character in a fixed slot (0.62em for digits and signs, 0.24em for the point). There is no monospace, no ALL CAPS and no italic. The meter legends are 13 SVG units (14 between 820 and 991px, where the face is drawn at 0.86), so they render at 12px or more at every width from 360px.
- **Avoiding the defaults on purpose.** Default 1 is cream with a serif display and terracotta. This ground is a mid-value putty grey, darker than any paper, and the only chromatic accent is a lens that is literally lit. Default 3 is a broadsheet with hairline rules. Here the rules separate real rows (spec rows, strip stages), and the layout is a grid with one framed object. Default 5 is template chrome: there are no eyebrows, middle dots or arrow links, and legends are sentence case.
- **Copy from the producer's side.** Each panel's heading names what its control does and gives one hard number. The trial result echoes the email and platform the person entered.
- **Headings start at h2.** This is a section fragment: the host page supplies the h1. Inside it the order is h2, h3, h4.

### Audio, so the needle is honest

**The loop.** Five voices sit on measured channels 1, 2, 4, 5 and 7: a sine kick with a pitch drop, a noise snare, a high-passed noise hat plus an off-step shaker, a sawtooth bass through a lowpass, and a sine-plus-triangle Em9 and Cmaj7 pad.

**The chain, in order:**

1. An input trim, so the kick peaks at 0.12 into the preamp.
2. A WaveShaper preamp: one curve per transformer, 4x oversampling, and a make-up gain (`MAKEUP`) measured so that loudness (RMS at the analyser) stays within 0.7 dB whichever transformer is in.
3. A low shelf, a low-mid peak, a high-mid peak and a 12 kHz high shelf (the air control).
4. A +14 dB line-up gain.
5. A DynamicsCompressor (threshold -24 dB, ratio from the radios), with a trim (`DYN_TRIM`) that offsets its automatic make-up gain so loudness stays within 0.3 dB across ratios.
6. The bus at -12 dB and a 2:1 glue compressor.
7. The AnalyserNode the meter reads.
8. The master at -12 dB with a 2 s fade-in.

**Clock and failure.** A 100 ms lookahead scheduler runs on `gsap.ticker`, so there is one clock. If the tab sleeps, it skips missed steps rather than bursting. The AudioContext is created on the first press inside try/catch. On failure the button reads "Sound isn't available in this browser" and is `aria-disabled`. Stop fades out over 0.15 s and then suspends the context. The audio graph lives outside `gsap.matchMedia`, so a media-query change never stops the sound.

**Measured meter response** (headless Chromium, bus at -12 dB, 5.3 s per setting after 1.5 s to settle, needle sampled every 16 ms):

- **Default setting** (nickel, 2:1, air +2 dB): the needle swings between -5.5 and 0 dB (10th to 90th percentile, about 17 to 30 degrees) and rests around -2.5 dB. The highest peak is +1.5 dB, so programme peaks reach Test the way a lined-up broadcast programme should, and the red zone and LED stay for overload. At -7 dB on the bus the needle sat in the top 15 degrees and hid every change.
- **Ratio:** the peak-hold mark reads +2.8 dB with the compressor off, +1.4 at 2:1, +0.6 at 4:1 and -0.3 at 10:1, about 7 degrees from off to 10:1, at matched loudness (RMS within 0.3 dB).
- **Transformer:** the mark reads +1.8 with nickel, +1.3 with none, +0.9 with steel and +0.2 with iron: the harder transformers round the peaks off at matched loudness (RMS within 0.7 dB).
- **Air shelf:** +8 dB of air lifts the needle's whole swing by about 0.6 dB and the mark from +1.3 to +2.5 dB.
- **Drift:** mostly heard as a stereo effect; the meter moves by a few tenths of a dB.

**No dead ends.** Every anchor targets an existing id (top, strip, drift, specs, trial). Each one is scrolled with Lenis, pushes the hash into history and then moves focus to its heading; modified clicks are left to the browser. The form validates in JS, shows an inline error, and on success crossfades to a result with a "Use a different email" way back that keeps the address. "Email support" is a mailto in a new tab with `rel="noopener"`.

## Do not touch

- **The meter's honesty.** The scale is linear in dB from -36 to +9, Test (0 dB) is -18 dBFS, and red runs only from +6. The rise is a 0.03 s `quickTo` and the fall is 20 dB per 1.7 s, linear in dB. The needle is driven only by `meter.db`, which takes the analyser's peak or the one power-on test peak and its 0.6 s line-up hold, and the peak-hold mark only by `meter.pk`, which only the analyser feeds. Never tween either for decoration. The one stop-pin tap at the end of power-up moves the inner `line`, not the needle group, and runs once.
- **The calibration.** `MAKEUP` and `DYN_TRIM` were measured on this loop so that transformers and ratios change tone and peaks, not loudness. The bus at -12 dB puts the programme's swing between about -6 and Test, the middle of the upper arc, so the peak-hold mark has room to show each control. If you change the voices, the line-up or a compressor, re-measure all three. A setting that reads louder teaches "saturation or compression = louder", which is false.
- **Lens colours are physical.** Green only on the active stage. Warm white only on lit selections. Red only on the meter's top end and LED. Error states use ink, not red. The focus ring is ink, 2px at a 3px offset.
- **One weight.** Hedvig Letters Sans 400 and Serif 400 only, with `font-synthesis: none`. Do not add bold or italic. Hierarchy is size.
- **Fixed figure slots** on the air readout. Without them the value jitters as it changes, because the sans has no tabular figures.
- **Controls change the sound and move their knob or lamp.** A control that only changes text breaks the idea.
- **Nested faders.** The scroll scrub moves `.fader__ride`, and the drift offset lives on `.fader__cap`. Merging them makes the two fight. Checked at 1280 and 390 by switching drift off mid-scrub: the outer rides keep their scrubbed y while the inner caps go to 0.
- **Panels share one grid cell** (CD9), and so do the form and its result, so switching never changes the page height.
- **The peak LED rate limit** (at most about 3 flashes a second, each held 150 ms), to stay under the photosensitivity threshold.
- **Hidden states.** The load-time states (dark lamps, the meter lamp at 12%, the scale and the Test legend at 30%) live under `html.js:not(.lit)` and `html.js:not(.booted)`. The inactive panels and the trial result are hidden under `html.js` by state. The CDN-failure path removes `html.js` and leaves a complete static page: all four panels stacked as plain sections (the tab roles, `tabindex` and labels are added by the script, so they are not left pointing at a hidden tablist), no play button, and the lede's "Play the loop" sentence hidden. The trial form still validates and answers in that state.
- **The menu lock.** While the mobile sheet is open, `html.menu-open` sets `overflow: hidden` (this is what locks scrolling under reduced motion, where there is no Lenis), Lenis is stopped, and `main`, the footer, the skip link and the wordmark are inert.

## Adapting

Change the `:root` tokens first. The colour roles are physical: the paint the object stands on (`--ground`), its panel (`--panel`), its legend ink, a worn secondary ink, two lens colours, a key-cap black, a meter face with its scale ink, and a single warning red. If you change a lens colour, keep `--ink` on the lit lens above 4.5:1. If the subject has a different instrument, redraw the meter rather than recolouring this one.

For another product, replace the stages (tabs, panels and strip modules) one for one, in the order the product processes things. Three to five stages fit. Each panel needs a heading that names an outcome, two or three sentences, one control and one spec line. Replace the demo graph in `audio.build()` and `audio.apply()` with what your product really does. If there is no honest live signal, remove the play button and the needle readout rather than faking them.

To retime motion, change the `--m-*` tokens (CSS transitions: lamps, presses, swaps, underlines, drift realignment, the beat-locked equaliser) and the `--g-*` and `--ge-*` tokens (seconds and GSAP ease names read by the script). The load sequence is one timeline in the `matchMedia` callback. Delete its `.from(chrome…)` line to drop the header entrance, the knob `fromTo` to drop the recall, or the `lamps.forEach` block to drop the lamp test. Keep the `.call` that sets `meter.on`, the test peak, `meter.hold` and `meter.tap`, and the `.set` that lights the Test legend, because that is the signature (the stop-pin tap and the play-key flash run from the ticker when the needle first lands). Each scroll moment (statement, faders, spec rules) is one tween; delete it and its elements render in their final state. To remove the glare, delete the `fine && wide` block. `--m-beat` must equal one beat of the loop's tempo (60 / BPM), and `--g-fall` is seconds per 20 dB of meter fall, and `--g-hold` is the line-up hold on Test.

| Token | Role |
|---|---|
| `--ground` | Page background: the desk's putty paint |
| `--panel` | Strip face, input fields, legends on black keys |
| `--ink` | Text, engraved legends, focus ring, legends on lit caps |
| `--ink-2` | Captions, legend labels, knob scales, fader unity marks |
| `--lens-green` | The lit active-stage lens (tab and strip stage lamp) |
| `--lens-white` | A lit selection lamp (radios, drift, playing key, open menu, meter backlight) |
| `--key` | Black key caps (Try it free, Email me the trial, Menu, play), knob caps, fader caps |
| `--meter`, `--scale` | PPM face, and its scale ink and needle |
| `--peak` | PPM red zone and peak LED only |
| `--white`, `--black` | Highlight and shadow ink for the derived colours |
| `--lens-off`, `--lens-green-off` | Unlit lenses |
| `--rule`, `--cap-edge`, `--skirt`, `--groove`, `--bezel`, `--screw-hi`, `--screw-lo` | Derived: section and row rules, cap edges, the skirt under caps, fader and range slots, meter bezel and cover, screw heads |
| `--glow-white`, `--glow-green`, `--bloom-white`, `--bloom-green` | A lit lamp: the gradient behind the lens and the light it throws round it |
| `--font-legend`, `--font-text` | Hedvig Letters Sans (legends, UI, scale, readouts), Hedvig Letters Serif (h2, statement, headings, manual voice) |
| `--step--2` to `--step-3` | Type scale, perfect fourth on a 17px body (`--step--2` is the 12px floor for strip legends; `--step-0-5` is the wordmark; `--step-3` sets both the h2 and the statement) |
| `--s1` to `--s10`, `--gutter`, `--max`, `--hdr-h` | 4px spacing scale, page gutter, max width, header height |
| `--strip-w`, `--knob` | Width of the drawn strip and knob size |
| `--r-plate`, `--r-cap`, `--r-fader` | Radius by object: plate, push-button cap, fader cap |
| `--m-lamp-on`, `--m-lamp-off` | Lamp warm-up and afterglow |
| `--m-beat` | One beat at 92 BPM, the equaliser bars' period |
| `--m-stage`, `--m-press`, `--m-release`, `--m-swap`, `--m-underline`, `--m-reveal`, `--m-error`, `--m-drift`, `--m-drift-step` and their `--m-ease-*` | Remaining CSS motion: stage backlight, press and release, label swap, underline, skip and label reveal, error reveal, drift realignment |
| `--g-chrome`, `--g-recall`, `--g-test`, `--g-lamp` | Load: header entrance, knob recall, one step of the lamp test, meter lamp warm-up |
| `--g-ppm`, `--g-fall`, `--g-hold` | PPM rise (0.03 s), fall (1.7 s per 20 dB) and the power-on line-up hold on Test (0.6 s) |
| `--g-in`, `--g-out` | CD9 crossfade halves (tabs, bridge note, form and result) |
| `--g-detent`, `--g-air` | Stepped knob detents, air knob follow |
| `--g-sheet`, `--g-links`, `--g-rule`, `--g-glare` | Menu sheet, menu links, spec rule draw-in, meter glare |
| `--ge-*` | The GSAP ease name for each `--g-*` duration |

## Motion

Detailed tier. Technique codes refer to the catalogue in `research/motion-techniques.md`. GSAP 3.15.0 (ScrollTrigger, SplitText, CustomEase) and Lenis 1.3.26 load from jsDelivr, and Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`. Everything that moves on its own sits inside `gsap.matchMedia` with four conditions: `motion`, `reduce`, `fine` and `wide` (min-width 820px). Cleanup removes the ticker callback and window listeners, reverts SplitText and the tweens, destroys Lenis, and leaves every lamp powered and the meter live. Under reduced motion:

- There is no Lenis, and no split.
- Every element is in its final state.
- Swaps and lamps are instant, and the equaliser bars are static.
- The needle is replaced by a numeric readout that updates four times a second.

The native cursor is never hidden.

Load: the desk powers up. Text and controls are usable from first paint.

| When | What | Technique | Timing | Reduced |
|---|---|---|---|---|
| 0.1 s | Wordmark, nav links and "Try it free" (Menu on phones) rise 6px into view | LD8 | 0.5 s `expo.out`, stagger 0.08 | In place |
| 0.15 s | Knob recall: the 10 caps turn 30 degrees into their stored positions, top first | Subject move | 0.6 s `power3.out`, stagger 0.03 | Final positions |
| 0.45 s | Lamp test: each tab with its strip stage lamp, then the four transformer caps, then the play key, light one after another and cool with their afterglow | Lamp cap, `.is-test` | 0.06 s each, 9 steps | Lit at once |
| 1.04 s | Every selected lamp lights in the same frame (Preamp tab and stage, Nickel, 2:1, macOS, drift) | `html.lit` | 0.08 s lamp-on | Lit |
| 1.09 s | Signature, part 1: the meter lamp warms from under the cover (a radial glow, 12% to full) and the scale brightens from 30%, no flicker | CustomEase `lamp` | 0.5 s | Lit |
| 1.39 s | Signature, part 2: 60% into the warm-up the needle snaps from the stop to Test, the Test legend lights to full, and the needle holds there as on a line-up tone | PPM ballistics, `quickTo`, `meter.hold` | 0.03 s rise, 0.6 s hold | Needle hidden, readout shown |
| 1.99 s | Signature, part 3: the needle glides down to the stop, then reads the audio | PPM ballistics | 20 dB per 1.7 s (about 3.1 s) | Readout |
| about 5.1 s | Signature, full stop: the needle taps its stop pin once and the play key flashes once, handing over to "Play the demo loop" (skipped if the loop is already playing) | Inner needle line, `.is-flash` | 0.2 s `power2.out` up 1.5 degrees, 0.25 s `power1.in` back; flash 0.12 s plus afterglow | None |

Scroll:

| What | Technique | Trigger and timing | Reduced |
|---|---|---|---|
| The statement lights word by word from 60% to full; scrolling back dims it | SC5 | SplitText words, `top 85%` to `top 60%`, `scrub: 0.6`, stagger 0.25, `ease: none`; fully lit while still in the lower half of the screen | Full opacity, no split |
| 24 fader rides climb from the bottom of their slots to the mix; the start is raised by the deepest offset, so a cap never covers its printed value | SC5 mechanics on fader caps | `top 85%` to `center 55%`, `scrub: true`, `ease: none`, stagger amount 0.5 left to right | Final positions |
| Spec row rules draw in from the left (they separate real rows) | SC16 | `top 90%`, once, 0.9 s `expo.out`, stagger 0.06 | Static |
| The nav marks the section in the reading band | NV6 spy | IntersectionObserver `-40% 0px -55% 0px` | Same |
| Equaliser bars rest while the meter bridge is off screen (the loop keeps playing) | MI6 pause | ScrollTrigger toggle | Static bars |

Pointer (fine pointer and wide only): the meter-glass glare drifts against the pointer, up to 16px, with `quickTo` at 1.2 s `power3.out`, and settles when the pointer leaves the window (HV12). Lamp caps pre-glow on hover (40% on pale lenses; on black keys the legend lights instead). Nothing else follows the pointer. The glare is static on touch and under reduced motion.

Every interactive item:

| Item | Hover (fine) | Focus | Press / change | Reduced | Touch |
|---|---|---|---|---|---|
| Skip link | - | Wipes down, clip-path 0.2 s `expo.out`, ring | - | Instant | - |
| Wordmark, nav links, sheet links, footer links, "Use a different email" | HV2 underline in from the left, out to the right, 0.45 s | Underline plus ring | Anchors: NV6 eased scroll, `lenis.scrollTo` with duration `min(1.3, 0.65 + d/4000)`, hash pushed, then focus the heading; "Use a different email" presses (MI1) and reverses the crossfade | Static underline, native jump | Persistent 1px underline (not on the wordmark) |
| "Try it free", "Email me the trial" (black keys) | Legend lights warm white with a bloom, 0.08 s | Same plus ring | 1px travel, lamp warms 0.08 s and the legend turns ink, afterglow 0.28 s on release | Instant | Press only |
| Menu button (below 820px, black key) | Legend lights | Legend lights plus ring | Latches lit; MI2 Menu / Close swap 0.35 s; NV1 sheet as one reversible timeline (clip 0.5 s `expo.inOut`, links rise 16px, stagger 0.05), close at timeScale 1.4; Lenis stopped, page inert, Escape closes, focus moves in and back | Instant | Same |
| "Play the demo loop" (black key) | Bars lift from 45% to 70% of their own heights (they rest uneven, so the key never reads as an ellipsis), the legend lights | Same plus ring | Latches lit while playing; MI6 bars at 0.652 s (one beat), out of phase; MI2 swaps glyph and label; a control changed before playing flashes the key once and crossfades a hint into the note; later changes keep the hint's value in step without another flash | Static bars, instant label, audio works | Same |
| Tabs (green lenses) | Pre-glow 40% | Pre-glow plus ring; arrows, Home, End, roving tabindex | Latch, lamp 0.08 s on, 0.28 s afterglow; CD9 crossfade (out 0.15 s y -4, in 0.25 s y 4); strip stage lamp and backlight follow | Instant | Same |
| Transformer and Ratio radios (warm-white lenses) | Pre-glow 40% | Ring on the cap | Latch and lamp; stepped knob turns to its detent, 0.35 s `back.out(1.7)`; sound and meter change | Knob jumps | Same |
| Air shelf range | Fader cap centre line brightens | Ring round the cap | Slot readout updates; air knob follows, `quickTo` 0.25 s; shelf gain follows | Knob jumps | Native drag, 44px hit area |
| Channel drift switches | Pre-glow 40% | Ring | MI2 On / Off, latch and lamp on both; caps realign on the inner element, 0.5 s, 20 ms steps from the centre; labels to 0.0; strip drift lamp | Instant | Same |
| Email field | Bottom rule darkens to ink | 2px ink rule plus ring; MI4 floating label 0.2 s | Error revealed with clip-path 0.25 s into reserved space, `aria-invalid`, `role="alert"` so it is announced even when the field already has focus, focus returns to the field | Instant | Same |
| Platform radios | Pre-glow 40% | Ring | Latch and lamp | Instant | Same |
| Form submit | - | - | Form and result crossfade in one cell; focus to "Trial link sent" | Instant | Same |

Removed during review (the accessory): a static 18% "armed" glow left on the play key after power-up, and the 18% hover wash on every black key. On a black key in daylight both read as disabled rather than ready; the lamp test and the end-of-power-up flash already show the play key.

Non-interactive by design: the drawn strip and the 24 faders do nothing on hover, so no content exists only on hover.
