---
title: Riso print shop rate card on a halftone screen
section: pricing
subject: Doppeltrommel, a two-drum risograph print shop in Leipzig-Plagwitz that prints fanzines, instruction manuals, maps and box inserts for homebrew cartridges, pricing runs by the number of colours (one, two, or three with overprint) and the size of the run (50 to 500 copies), with a dialog that books a run.
aesthetic: A raspberry wall printed over with a 45-degree halftone screen of pixel-round dots. Two riso inks, aqua and yellow, and the flat green they make where one is printed over the other; three dark plates for the runs; Handjet numerals and prices, Host Grotesk for the rest.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, at ELSH 2 and ELGR 1 so the modules are square. The H2 at 700, the run numerals at 800, the prices and the job number at 700.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything else, 400 for body, 600 to 650 for headings, buttons and labels, tabular figures in the price ladders and the total.
js: Draws a canvas halftone screen whose dots ink up a radius step at a time where the pointer, a finger, scrolling, keyboard focus or a booking touches them and dry back in steps, runs the pale-copies load, the booking dialog with validation, a live total and an in-place confirmation (nothing is sent), and prints the booked run across the page once.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [pricing, print shop, risograph, halftone, fanzine, homebrew, canvas, pointer, dialog, form, dark, gsap, lenis]
use_when:
  - A product priced by a small number of physical options (colours, layers, materials) where each option can be shown as a colour, and run size changes the unit price.
  - A craft or making business (printing, screen printing, stickers, pressing) whose material has a texture you can draw as a field.
  - The page has a booking or quote step that can end in a visible "job" the visitor can recognise.
avoid_when:
  - More than three tiers, or tiers that differ by features rather than by a material. The colour of the ink has nothing to stand for.
  - Pages that already run a canvas or pointer effect nearby; two fields fight.
  - Light or corporate brands. The raspberry ground and the inks are loud on purpose.
---

## Why it works

**The one bold idea: the page is a printed sheet, and touching it puts ink on it.** The whole section sits on a 45-degree halftone screen, drawn on a canvas as pixel-round dot sprites with fixed radii of 0 to 4 px (no anti-aliased circles). At rest, value-noise paper grain decides each dot's size, so the wall reads as a printed sheet with an uneven inking. Wherever something touches the sheet, dots grow in ink, one radius step every 50 ms, then dry back one step every 0.45 s, so a stroke stays wet for about two seconds and fades in visible steps. Two inks can sit on one dot: the bigger dot is drawn in its own ink and the smaller one inside it in a flat overprint green, exactly how yellow over aqua prints on a riso. No blur, no alpha, four colours and five sizes.

- **Not the cta-indie-game wake.** That design lights square cells in four alpha steps with a 0.15 s half-life. Here the unit is a round dot that changes size, not brightness; the trace lives ten times longer and dries in whole steps; and the colour of the ink means something (a drum, a run). It is not a glow or spotlight: nothing lights, nothing follows the pointer once it stops, and a still pointer inks nothing.
- **Colours are the price list.** Aqua is drum one and the one-colour run. Yellow is drum two. Green is overprint and appears only for the three-colour run, because it is the third colour you pay for. Pointing at a run (or focusing its button, or tapping it) inks a ring around its plate in that run's inks: aqua alone; aqua and yellow in alternating diagonal bands that never touch; aqua with yellow printed over it, so green cores appear. The hand then stays loaded with that run's drums until another run is pointed at. The load ends by inking the three rings in order, so the colours explain themselves before anyone reads the legend.
- **Knock-outs keep prices legible.** Printers keep the screen out of type; so does the canvas. Every line of loose text (measured with a Range, line by line) and every plate is knocked out of the screen, so no dot is ever drawn under a letter, and the prices sit on solid plates at 12.5:1.
- **The ground is a chosen raspberry**, `#7A1438` (about 339°), lighter and redder than the burgundy, wine and aubergine already in the collection and much darker than the hot magenta of the pinball technician. Aqua and yellow were chosen because they sit opposite it on the wheel: fluorescent pink, the obvious riso ink, would sink into a raspberry ground.
- **A rate card, not three cards.** Each run is a full-width plate read left to right: the number of colours, the headline price for 100 copies, a ladder of four run sizes with the price each, then turnaround, what is included and the booking button. The ladder is a real table. The net café design next door uses three monitor panels and a segmented control; this one has no control at all, because every price is printed.
- **Words.** The shop speaks: "Our machine has two drums", "Riso ink stays soft for a day". Buttons say what they do ("Book a three-colour run"). The total in the dialog is a sentence with the real figure and turnaround.

Deviations from the brief, and why:

- **Three tiers on two drums.** The brief allowed 1-, 2- and 3-ink tiers; the machine has two drums, so the third colour is the planned overprint, which riso shops really do sell as a colour. It gave the overprint green a job instead of decoration.
- **The roller sits at mid-viewport, not at the leading edge**, and its ink depends on direction (down prints aqua, up prints yellow), so scrolling back over the same stretch overprints it. That keeps it apart from cta-indie-game's bow wave.
- **The success run plays when the dialog closes**, not behind the scrim, so it is seen.

## Do not touch

- **Pixel-round sprites, one canvas pixel per CSS pixel.** The canvas backing store is the section size in CSS pixels and is scaled with `image-rendering: pixelated`. Drawing at device pixels, or with `arc()`, brings back soft circles.
- **The lattice is 8 px with dots where (a + b) is even**, so the screen runs at 45 degrees and every dot owns a disjoint 8 x 8 cell. Redrawing one dot is a `clearRect` of its cell; a pitch below 8 makes neighbours overwrite each other.
- **Levels are integers 0 to 4, never alpha.** Growth and drying move one level per step (`--d-grow`, `--d-dry`). The overprint rule (bigger dot in its ink, smaller in `--over`) is what makes two inks read as print.
- **Knock-outs**: `.ko` on plates and `.kt` on loose text. Any new text block on the ground needs one of them, or dots will be drawn under it.
- **Loops sleep.** The ink loop is on `gsap.ticker` only while a dot is wet and only while the section is in view (ScrollTrigger toggle). Idle, no canvas call is made at all.
- **Colour jobs.** Aqua, yellow and green only for their drum or run; jam only for errors; paper for focus rings.
- **Hidden states only under `html.js:not(.go)`.** Without the CDN the section shows a CSS dot screen, everything is visible and the booking works in plain JavaScript.
- **Accessibility.** The canvas is `aria-hidden`; the dialog is a native `showModal()` with Lenis stopped; errors use `aria-invalid` and `aria-describedby` and focus the first bad field; the confirmation takes focus and closing returns focus to the button that opened it. Targets are 44 px or more. Every hover state has a focus-visible and a touch (`.is-tap`) twin.

## Motion

House stepping: hard cuts and integer levels; GSAP `timeline().set()` frames for the dialog; `steps()` in CSS. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`). The load waits for the fonts (raced with 1.5 s) and a visible page. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer).

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| First copies come out pale | Canvas: rest dots capped at radius 0, 1, 2, then 3 | Load (fonts and visible page) | One copy every `--d-copy` 0.14 s; the type and plates cut in with the third copy | Full screen at once |
| Runs ink their colours | Canvas ring around each plate | After the load | Run 1, 2, 3 at +0.25, +0.55, +0.85 s, then dry | Off |
| Pointer ink | Canvas stamp along the path every 4 px, radius 22 px, level 4 at the centre and one less per quarter radius | pointermove (fine pointers) | Grow one level per `--d-grow` 0.05 s; hold, then dry one level per `--d-dry` 0.45 s (about 2 s from full) | Off |
| Press | Stamp radius 40 px | pointerdown on open ground | As above | Off |
| Touch ink | Stamp radius 30 on touchstart, trail radius 22 on touchmove | Touch | As above | Off |
| Loading a run's drums | Ring 32 px around the plate in the run's inks (aqua; aqua and yellow in bands; yellow over aqua) | pointerenter on a plate (tap on touch), keyboard focus inside it | As above; the hand stays loaded with those inks | Off |
| The roller | Full-width band at mid-viewport over the distance scrolled this frame | Scroll (Lenis or native) | Level clamp(1, 3, abs(dy)/10); down aqua, up yellow, so a return pass overprints | Off |
| Button inks up | CSS `inkup` keyframes stepping a pixel dot mask from radius 1 to 4, then solid | Hover, focus-visible, touch tap | `--d-inkup` 0.2 s in five frames; the label cuts to plate on the last | Solid at once |
| Fed into the rollers | Face 2 px down, top 4 px gripped (clip-path) | :active, press | Instant while held | Same |
| Saddle stitched link | Two staple marks punch through a thickened underline | Hover, focus-visible, touch tap | Left staple at once, right after `--d-staple` 0.07 s | Both at once |
| Ink gauge | An 8 px column at the field's left edge in the booked run's ink | Focus in a field | Fills bottom to top, `--d-gauge` 0.2 s steps(4) | Full at once |
| Dialog rolls off the drum | `rotationX` on the top edge, perspective 900 | Book buttons; Close, Escape, backdrop | -70, -40, -14, 0 degrees, `--d-roll` 0.06 s apart; closes in reverse | Instant |
| Error | Text in a reserved line, jam border | Invalid submit | Instant; cleared when the value becomes valid; focus to the first bad field | Instant |
| Success | Form swaps to the job ticket (focus moves to it); on close, the run is printed across the visible page | Valid submit, then close | One `--d-pass` 1 s pass per drum, top to bottom, the second starting at 60%; then it dries | Ticket only |

## Adapting

1. **Find your inks.** Two materials and their combination: two inks, two threads, two vinyl colours. Change `--aqua`, `--yellow` and `--over` (keep `--over` a plausible mix of the two) and keep them opposite the ground on the wheel.
2. **Ground and plates.** `--raspberry`, `--plate` and `--screen` move together; `--screen` stays about 1.6:1 so the rest screen is texture, not pattern.
3. **Tiers.** Edit the three plates and `TIERS` in the script (prices per run size and turnaround). `MODE` maps a tier to its ink mode (`a`, `split`, `ab`). Keep the ladder to four rows.
4. **Retime.** Every duration is a `--d-*` token. To quiet the field, raise `--d-dry` less or lower the stamp radii (22, 30, 32, 40 px, literals in the script). To remove the roller, delete the `dy` block in `frame`. To remove the success run, delete `fx.run`.
5. **In a framework,** render the markup statically and port the script as one effect returning the `gsap.matchMedia` cleanup (it removes listeners, the ticker function and Lenis, and clears the canvas). Rebuild the screen on resize; ink state is dropped on rebuild by design.

| Token | Role |
|---|---|
| `--raspberry` | Page ground (raspberry wall) |
| `--plate` | Run plates, dialog sheet, label ink on inked buttons (paper on it 12.5:1) |
| `--screen` | Resting halftone dots and table rules (1.6:1, decoration) |
| `--paper` | Text and focus rings (9.6:1; 12.5:1 on plate) |
| `--pencil` | Secondary text, field borders, fine-print rule (6.6:1; 8.7:1 on plate) |
| `--aqua` | Drum one, the one-colour run (6.2:1) |
| `--yellow` | Drum two, the two-colour run (8.1:1) |
| `--over` | Overprint green, the three-colour run (5.9:1) |
| `--jam` | Errors only (8.0:1 on plate) |
| `--job` | The ink of the run in hand: set per plate and on the dialog |
| `--scrim` | Dialog backdrop |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk |
| `--t-small` ... `--t-h2`, `--t-price`, `--t-num` | Type scale: 14, 17, 21, 26, prices clamp(56px, 6vw, 84px), numerals clamp(72px, 8vw, 120px), H2 clamp(46px, 6.4vw, 96px) |
| `--s1` ... `--s7` | Spacing in multiples of the 8 px screen step (the step itself is fixed in the script) |
| `--notch`, `--tap`, `--hit`, `--max-w` | Stepped corner 4 px, button and field height 48 px, minimum target 44 px, content width 1312 px |
| `--d-copy` ... `--d-pass` | Every duration CSS and the script use |
