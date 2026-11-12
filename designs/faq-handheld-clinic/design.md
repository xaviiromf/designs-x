---
title: Handheld repair FAQ on a four-shade test screen
section: faq
subject: The FAQ of Greyscale, a fictional mail-in repair clinic in Leeds run by two technicians, who diagnose, quote, repair and post back handheld consoles from the 1990s and 2000s. Fourteen questions grouped by fault (screen, buttons, power, sound), a search, fault filters, a packing checklist and an ask-the-bench form.
aesthetic: "An unlit reflective LCD on a workbench: olive-drab ground, four tones of one olive hue for every surface, a 96 x 86 pixel test screen in a plain bezel with a ridged contrast wheel, and one ordered-dither threshold through which everything appears."
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, set at ELSH 2 and ELGR 1 so its modules are square like the screen's pixels. Used for the H2 at 700 and the step numerals of the packing list.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything else, at 400 for body and answers, 600 for questions, keys, labels and headings, with tabular figures in the counts, prices and readout.
js: Draws a 96 x 86 four-shade test screen in canvas that cross-dissolves between fault patterns through a 4x4 Bayer threshold and darkens in a dithered pool under the pointer, filters the questions by text and fault, runs the accordion, packing dialog and ask form in plain JavaScript (nothing is sent), and adds the dithered motion layer.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [faq, accordion, search, filter, repair, handheld, lcd, dither, bayer, canvas, slider, dialog, form, dark, gsap, lenis]
use_when:
  - A support or help page whose questions fall into a few clear groups, where a picture per group (a test card, a part, a diagram) helps people recognise their own problem.
  - Products and services with a screen, a display or a low-resolution world (repair, retro hardware, e-ink, embedded devices) where a pixel test pattern is part of the subject.
  - A long FAQ that needs live search and filters and a "still stuck" form at the end, all usable without the libraries.
avoid_when:
  - Fewer than three groups, or questions that do not group by anything visual. The screen then has nothing true to show.
  - Brands that want soft, warm or photographic help pages. The dither, the olive LCD palette and the pixel display face are loud by design.
  - Pages that already run a sticky visual or a canvas pointer effect beside long text. Two sticky companions fight for the side column.
---

## Why it works

**The one bold idea: everything appears through the LCD's own dither.** A reflective handheld screen has four shades and no opacity, so it fakes in-between tones with an ordered dither. This page does the same. The script builds one 4x4 Bayer matrix (M4 = 4 x M2(x mod 2, y mod 2) + M2(x div 2, y div 2)) and from it mask tiles for coverage 4, 8 and 12 of 16, drawn in a canvas and set as data-URL custom properties (`--dm-4`, `--dm-8`, `--dm-12` with 3px cells; `--um-8`, `--um-12` with 1px cells for the underline). Level 0 hides an element but keeps its space; level 16 removes the mask. Nothing on the page fades with opacity. An answer reserves its height in one cut and then its mask steps 0, 4, 8, 12, 16, 70ms each. The packing dialog's panel steps 4, 8, 12, 16 over a flat scrim. The headline lines step in one after another. The test screen powers on through nine threshold levels and swaps patterns by cross-dissolving through 4, 8, 12, 16, pixel by pixel against the same matrix. One matrix, one vocabulary, everywhere.

- **The diagnostic screen is the companion, not a decoration.** It sits under the filters, sticky on desktop beside the questions, and shows the test pattern of the fault group you are reading: missing lines (dead columns and a dead row through a test card, with cyan arrows at the faults), a button matrix (a scan row with two keys registered, the d-pad up arm and one face key lit pink), a battery level (three bars of four, an amber bolt across the empty bar) and a speaker waveform block (a grille and a waveform with lilac peaks). All are original 96 x 86 drawings made from rectangles, discs and thick lines in the script. A visible readout under the glass says which test is showing and the contrast setting, so the canvas itself is `aria-hidden`.
- **It follows the reading.** When a group heading crosses the middle of the viewport, the screen cross-dissolves to that group's pattern, the contrast wheel turns one notch (30 degrees, a hard cut), and a 2px bar under that group's chip marks it as the one on screen. Opening a question, or switching a chip on, also puts its group on the glass. The page is about 2,400px tall at 1440 x 900, so all four headings cross the middle on an ordinary desktop.
- **Pressing the glass.** Under the pointer the picture darkens by up to two shades (core radius 4.5 screen pixels, falling off to 9), quantised against the Bayer matrix so the edge of the pool is dithered, drawn at the screen's own resolution. Every 90ms each pressed pixel recovers two thirds of a shade, so it comes back in three steps and the pool trails a little behind a moving hand. A finger does the same (`touch-action: pan-y`; a press and a sideways drag both work). The keyboard equivalent is the contrast wheel: a real `role="slider"` with arrow keys, Page Up and Down, Home and End, whose four settings remap the four drawn shades (faint, light, normal, dark), and each change presses a pool at the centre of the glass.
- **Colour has jobs.** The ground is olive drab (#2F3210), an unlit LCD, not a tinted black. The four LCD tones are one hue in four steps and do all the work: ground, mid tone and lit field (`--lcd-1`), secondary text and outlines (`--lcd-2`), text and the lightest pixel (`--lcd-3`); a fifth, darker olive is the well behind the bezel and the scrim. Each fault group owns one hue, used only on its chip, its question markers, its heading swatch and its test pattern's accent: cyan for Screen, pink for Buttons, amber for Power, lilac for Sound. White-hot bench paper is only the focus ring and the one primary button. Light red is errors only.
- **Every button is a rubber key.** On hover and keyboard focus a 2px frame steps inward from the edge, 0, 4, then 8px, one ring at a time 60ms apart, and the innermost stays as an inner border. Pressed, the face bottoms out to solid `--lcd-1` with the label in the palest shade, held at least 140ms from `pointerdown` so a quick tap still shows it; on release the frame steps back out once (to 4px) and returns to 8px if the pointer is still there.
- **Structure from the bench.** Questions are real `<button aria-expanded>` elements inside `h4`s, grouped under four `h3` headings, each with a 2px plus marker in the group hue that becomes a minus when open. Several answers can be open. Each question has an id, and `#q-swollen` style deep links open their question; the packing list links to the swollen battery answer, which closes the dialog, opens the answer and scrolls to it. Answers carry their prices, times and parts as a row of facts in tabular figures.
- **Search and chips are plain, hard filters.** Typing filters live on question and answer text (case and accents ignored); chips are `aria-pressed` toggles that filter by group (any combination). Groups with no matches disappear, an `aria-live` count says how many are showing, "Clear search" resets both, and an empty state says what was searched and suggests part names. All of it works without the libraries.
- **Ask the bench.** Email, which handheld (four generic families as a real radio `fieldset`), and the question. Validation runs on submit with messages that say how to fix it, `aria-invalid`, `aria-describedby`, reserved error lines and focus on the first bad field. Success swaps the form for a confirmation that echoes the email and the family, takes focus, and the screen runs its pass test: four vertical bars of the four shades, then a large outlined pixel tick arriving through the dither. On phones, where the big screen is far above, a small copy of the screen inside the confirmation runs the same test. "Send another question" restores the form with the email and the family kept.
- **Different from its neighbours in the ledger.** story-speedrun-marathon has a dithered dialog backdrop; here the backdrop is a plain flat scrim and the panel itself is what is dithered, and the dither is an exact Bayer threshold used as a mask for every reveal, not a texture. pricing-net-cafe is also a screen, but a CRT with colour ghosts driven by pointer energy; this is a reflective LCD with no light at all, which darkens under pressure. cta-indie-game lights cells under the pointer; here the pointer darkens pixels inside a drawn picture, and the pool's edge is a threshold pattern, not a falloff of brightness.
- **Semantics.** This is a `section` with `aria-labelledby` on its `h2`; the host page owns the `h1`. The dialog is a native `<dialog>` opened with `showModal()`, titled by its own `h2`, closable with Close, Escape or a press that starts and ends on the backdrop, and focus returns to the opener. The screen has a visible text readout; the wheel has `aria-valuetext` ("3 of 4, normal").

Deviations from the brief, and why:

- **The lede sits to the right of the headline on desktop, not under it.** With h2, lede, search, chips and the screen stacked in one column, the screen fell below the fold at 1280 x 600. Moving the lede into the right column's top row keeps the whole bezel visible at 1440 x 900, 1366 x 650 and 1280 x 600. The screen hint moved into the right column too, above the questions.
- **Every key bottoms out to `--lcd-1`.** The brief says "the next darker shade". For the bench-white primary and the `--lcd-2` keys, `--lcd-1` is darker. For the question rows and chips, which sit on the ground, one shade darker is the well (#22240A), only 1.3:1 against the ground and invisible in a frame, so they bottom out to `--lcd-1` as well. The press reads the same on every key.
- **The screen power-on uses nine levels (0, 2, 4 ... 16) over 400ms** instead of five, because a canvas can show every threshold and the brief asks for "the dither levels 0 to 16" in about 400ms. Every step only adds coverage, so it never flashes.

## Do not touch

- **One matrix.** `BAYER` is built once and is the threshold for the mask tiles, the screen's cross-dissolve, the power-on and the press quantisation. Do not swap any of them for opacity, a random dither or a blur: the shared pattern is the design.
- **Mask levels live in `data-dm`.** `[data-dm="0"]` hides but keeps space, 4/8/12 use the tiles, and 16 is no attribute. An answer is unhidden (height reserved in one cut) before the first step and hidden only after the last. Do not tween height.
- **Hues stay in their jobs.** A fault hue appears only on its chip, its chip's live bar, its question markers, its heading swatch and its test pattern's accent. `--bench` is only the focus ring and "Send my question". `--fault` is only errors. Adding a hue for decoration breaks the reading of the groups.
- **The screen stays at whole-pixel scale.** `--px` is 2, 3 or 4 CSS pixels per screen pixel with `image-rendering: pixelated`. A fractional scale smears the dither.
- **The fold.** At 1280 x 600 the bezel ends 20px above the bottom edge (59px at 1366 x 650). Taller headings, a longer lede on the left, or a gap above the screen pushes it below the fold. The `max-height: 700px` rule tightens the gaps.
- **Stepped corners live on `.face` and `.inner`, never on the `<button>`,** so the bench-white focus outline is never clipped. The membrane ring is inside `.inner` and clipped with its own 2px notch.
- **No permanent loop.** The press loop is on `gsap.ticker` only while a pixel is recovering or the pointer is moving on the glass, sleeps when a still finger holds the pool, and stops off screen (IntersectionObserver). Dissolves and reveals are timelines of hard calls, not loops.
- **Hidden states exist only under `html.js:not(.go)`,** and the script sets the same states inline before adding `.go`. If the CDN is blocked the `js` class is never added: everything shows, the screen shows a still pattern (and the pass test after a send), and search, chips, accordion, wheel, dialog and form all work in plain JavaScript.
- **Accessibility.** Targets are 44px or more (questions 60px, keys and fields 48px, text buttons 44px with padding, wheel 40 x full screen height). The radios are 20px squares inside 48px labels, so the label is the target. Text contrast is computed, not guessed (see the token comments). The canvas is `aria-hidden` with a visible readout beside it.

## Motion

House stepping: every change is a list of discrete states applied by delayed calls, 60 to 90ms apart, so the page has a visible frame rate; there is no eased tween anywhere. Colour changes are instant. Everything is built in `gsap.matchMedia` (motion, reduce, fine pointer, wide at 960px). Lenis runs on `gsap.ticker` with `autoRaf: false`, `lagSmoothing(0)` and `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling and Lenis stops while the dialog is open. The load waits for the fonts (Handjet 700, 1.5s hard timeout), a visible page and the window `load` event. Only opacity-free masks, visibility, transforms (the wheel's ridges) and canvas pixels change.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Screen powers on | Canvas threshold: pixel shows the first pattern where Bayer < level, else the flat off screen | Load (fonts, visible page, window load), at 0.3s | Nine levels 0, 2 ... 16 over `--d-power` 0.4s | Pattern shown at once |
| Headline lines | `data-dm` mask on each line span, one line after the other | Load, 0.08s after the power-on | 4, 8, 12, 16 at `--d-line` 0.06s per step, so 0.24s per line | Visible |
| Lede, filters, questions, form cut in | Visibility | Load, after the last headline step | One cut | Visible |
| Answer opens and closes | `data-dm` mask; height reserved in one cut | Click, tap, Enter or Space on a question | Open 0, 4, 8, 12, 16; close 12, 8, 4, 0 then hidden; `--d-dither` 0.07s per step | Instant |
| Screen follows the reading | Canvas cross-dissolve through the Bayer thresholds, plus a one-notch wheel turn and the chip's live bar | Desktop: a group heading crossing 50% of the viewport (ScrollTrigger, both directions); also opening a question or switching on a chip | 4, 8, 12, 16 at `--d-dissolve` 0.07s; wheel 30 degrees in one cut | Pattern swaps in one cut (still follows) |
| Heading swatches fill | `data-dm` on the swatch fill | Phones (under 960px): each heading entering at 88% of the viewport, once | 4, 8, 12, 16 at 0.07s | Full |
| Pressing the glass (pointer) | Per-pixel press value 0 to 2 shades, quantised with the Bayer matrix, so the pool's edge is dithered | `pointermove` over the canvas (mouse) | Core radius 4.5, edge to 9 screen pixels; recovers two thirds of a shade every `--d-recover` 0.09s, three steps | Off |
| Pressing the glass (touch) | The same under the finger | `pointerdown` and drag on the canvas (`touch-action: pan-y`) | As above; lifts on `pointerup` or `pointercancel` | Off |
| Contrast wheel (keyboard equivalent) | Shade remap through four settings, a centre press, the ridges jump one notch | Arrow keys, Page Up/Down, Home, End on the slider; click or drag on its halves | Instant remap; the centre pool recovers in three 0.09s steps | Remap only, no pool |
| Key hover and focus: the membrane | One 2px frame at inset 0, 4, then 8px | `pointerenter` (mouse, pen), `:focus-visible` | `--d-ring` 0.06s per ring; the 8px ring stays | 8px ring at once |
| Key press: bottomed out | Face solid `--lcd-1`, label `--lcd-3` | `pointerdown`, Enter or Space keydown; touch included | Held at least `--d-hold` 0.14s; release steps the ring out to 4px for 0.06s, then 8px (still hovered) or off | Instant `:active` swap |
| Dither underline | 2px underline masked at 50% (1px cells), then 75%, then solid; label to `--lcd-3` | Hover, `:focus-visible`; touch press | Two steps at `--d-link` 0.06s; a tap holds the lit state `--d-link-hold` 0.2s | Solid at once |
| Field contrast up | The field ground (`--lcd-1`) through the 50% mask, then solid; border to `--lcd-3` | Focus | Two steps, `--d-field` 0.07s | Solid at once |
| Field error | A broken 2px line of missing pixels in `--fault` under the field, message on the reserved line | Invalid submit | One cut; cleared when the value becomes valid | Same |
| Packing dialog | `data-dm` on the panel over a flat scrim that cuts in | Open: "How to pack a handheld". Close: Close, Escape, backdrop | In 4, 8, 12, 16; out 12, 8, 4, gone; 0.07s per step. A forced close mid-way is settled by `settle()` | Instant |
| Screen test passes | Cross-dissolve to four shade bars, hold, cross-dissolve to the bars with an outlined pixel tick | Valid submit; big screen and the phone copy in the confirmation | 4 steps of 0.07s, hold `--d-pass` 0.36s, 4 steps of 0.07s | Pass frame at once |

## Adapting

1. **Find your four groups and their pictures.** Rename the groups in the HTML (`data-g`, the chips and the headings), the `GROUPS` list and the four `PAT` drawings. Each drawing is 96 x 86 pixels made with `rect`, `frame`, `disc`, `line` and `tri`, in shades 0 to 3, with `acc(h)` for the group's accent. Keep one accent per pattern and keep the readout labels in `LABEL` truthful.
2. **Map the palette, keeping the jobs.** The four `--lcd-*` tones must stay one hue in four steps, with `--lcd-3` at 4.5:1 or more on `--lcd-1` (a lit field and a bottomed-out key) and `--lcd-0` at 4.5:1 or more on `--lcd-2`. Give each group hue 4.5:1 on the ground and as a fill under `--lcd-0` text. Keep `--bench` for focus and the one primary action, and `--fault` for errors only.
3. **Copy.** Twelve to sixteen questions in three to five groups. Questions are full sentences from the customer's side; answers are two short paragraphs and a row of facts (price, time, part). The lede is about 200 characters, so it stays three lines at 1280 wide.
4. **The dither.** `--dm-cell` sets the mask cell (2 or 3px reads as dither; 1px reads as grey). Durations are the `--d-*` tokens. To drop the screen's pointer pool, delete the canvas pointer listeners; to stop it following the reading, delete `follow()`. The rest still works.
5. **The screen size.** `--px` picks a whole-pixel scale per breakpoint; check the fold at 1280 x 600 after any change above the bezel.
6. **In a framework,** render the questions statically, keep the plain-JS flows (filter, accordion, dialog, form, the still screen) outside the effect, and port the motion branch as one effect that returns the `gsap.matchMedia` cleanup (it kills the step timelines, removes the press loop and listeners, disconnects the observer and destroys Lenis).

| Token | Role |
|---|---|
| `--lcd-w` | The well: bezel, wheel body, scrim base (decorative, 1.3:1 on the ground) |
| `--lcd-0` | Ground, shade 0, text on light faces |
| `--lcd-1` | Shade 1: test-screen mid tone, a focused field's ground, a bottomed-out key, rules |
| `--lcd-2` | Shade 2: secondary text, outlines, the resting underline, the Close key face (6.0:1) |
| `--lcd-3` | Shade 3: text (10.7:1), the lightest pixel, lit links |
| `--screen`, `--buttons`, `--power`, `--sound` | One fault group each: chip, live bar, markers, swatch, test-pattern accent (9.0, 6.9, 7.4, 7.2:1) |
| `--bench` | Focus ring and the primary key only (13.0:1) |
| `--fault` | Error text and the missing-pixel line (6.0:1) |
| `--scrim` | The flat dialog backdrop |
| `--font-display`, `--font-text`, `--modules` | Handjet at ELSH 2 / ELGR 1, and Host Grotesk |
| `--t-small` ... `--t-h2`, `--lh-body`, `--lh-lede` | Type scale: 14, 17, 18 (questions), 19 (lede), 26 (h3), 40 (step numerals), clamp(42px, 6vw, 92px) capped by 8vh and the column; 16/17 on phones |
| `--cell`, `--s1` ... `--s8` | A 4px cell (one screen pixel at full scale) and spacing 4 to 96 |
| `--notch`, `--tap`, `--hit`, `--max-w` | Stepped corner 4px, key and field height 48px, minimum target 44px, content width 1296px |
| `--px`, `--dm-cell`, `--wheel-w` | Screen scale (2, 3, 4), dither cell (3px), wheel width (40px) |
| `--d-*` | Every step duration the CSS and script read: dither 0.07, dissolve 0.07, power 0.4, line 0.06, ring 0.06, hold 0.14, link 0.06, link-hold 0.2, field 0.07, recover 0.09, pass 0.36 |
