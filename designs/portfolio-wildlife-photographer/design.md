---
title: Wildlife photographer portfolio with a 41-night trigger chart
section: portfolio
subject: Personal portfolio of Rayén Aliaga, a fictional night-wildlife photographer in Arica, Chile, who works with camera traps and hides, with frames, field notes and expedition stats.
aesthetic: The monochrome of an infrared camera trap on a high-altitude indigo night, with the trap's data stamp as the type voice and one green-gold used only to annotate.
mode: dark
fonts:
  - Rosario (Google Fonts, variable wght 300-700, Omnibus-Type, Argentina), for the name, headings, nav, buttons, counters, chart labels and the camera data strip, always with lining tabular figures
  - Faustina (Google Fonts, variable wght 300-800 with italic, Omnibus-Type, Argentina), for the lede, intros, captions, field notes and form help; italic only for Latin binomials
js: Builds everything from one CONTACT object and one DATA array (a 296-trigger histogram that fills night by night and opens into the cat's frame, the gallery with a Flip region filter and an Eye-AF hover, the field-note dialog, the expedition list with SVG bars, the 24-hour chart with a keyboard cursor and hidden tables, the contact shortcuts with a copy button, and a form that drafts a mailto or WhatsApp message), runs Lenis smooth scroll and the page choreography, and asserts its data at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, Flip), Lenis 1.3.26]
tags: [portfolio, photography, wildlife, charts, svg, dark, monochrome, gsap, lenis, scrollytelling, pin, dialog, filter, form]
use_when:
  - A personal portfolio where the numbers behind the work are the story (field researchers, photographers, surveyors, anyone whose output is one result out of many attempts).
  - The work can be shown as frames, and one frame deserves a slow reveal.
  - You want a detailed-tier page with one scroll-driven signature and quiet, considered responses everywhere else.
avoid_when:
  - The portfolio has dozens of images to browse. This shows seven frames and spends its boldness on one.
  - The audience needs to scan quickly on a phone. The narrow path drops the pin, but the page is still long.
  - A bright, colourful brand. The chrome is deliberately monochrome.
---

## Why it works

**The one bold idea: 41 nights, 296 triggers, one frame.** The 2025 Salar de Surire survey is drawn as a stacked histogram in which each trigger is one tiny 4:3 frame, because each trigger is a frame; the 4:3 unit replaces the brief's square on purpose, so the cat's unit can open at its own aspect ratio. Each night is a column, stacked bottom to top in trigger order. Wind in the bunch grass is drawn hollow, and vizcacha, culpeo fox and "vicuña and suri" are three infrared greys. One unit is green-gold: the Andean cat, the last trigger of night 41. On wide screens with a fine pointer the section pins for 220% of the viewport. The first 75% fills the columns night by night while a readout above the histogram, set as the trap's data stamp, counts the night ("Night 00" before the first trigger, two digits after), the triggers so far and the coldest night so far. In the last 25% every other unit dims to .25 and the cat's unit opens into the full camera-trap frame. The clip-path starts as that unit's rectangle and ends at inset(0) on a 4:3 frame, with the scene counter-scaled from 1.35 to 1 around the cat's eyes and translated so the eyes start under the unit, and an exposure lift from `brightness(.2)` to `brightness(1)` on the scene (not on the eyeshine), all on one scrubbed timeline. The eyes the hero promised are the first thing revealed, and the underexposed frame visibly becomes the full exposure. The hero shows the same `<symbol>` drawn with underexposed fills (the `--ir-*` tokens redefined on the hero's `<use>`), where only the eyes and a faint edge of the tail read. The hero makes the promise and the wait delivers it. The page's truth, that most of the work is waiting, is what you scroll through.

- **Why green-gold on indigo is a choice and not default 2.** The page is a chosen high-altitude night indigo (`#1A2138`), not a tinted black, and the second colour family is the trap's own neutral-cool infrared grey, used for text, the histogram and every trap frame. An infrared trap records eyeshine as a white bloom, so the eyes in every IR frame, the hero included, glow in Frost. The green-gold `#D4CC5E` is the colour of a cat's tapetum, muted toward olive, and it is annotation only. It marks the cat's unit (one coloured unit out of 296), the Eye-AF box when it locks, the kept-frame flags on the hour chart and the selected expedition's thumbnail. It is never a button, a link, a chip state or the focus ring, all of which are Frost. Each use comes with a shape cue: the unit's position, the brackets, the flag shape and the outline.
- **Every frame is an SVG drawing standing in for a photograph.** Seven scenes are drawn once as `<symbol>`s. The payoff frame is drawn as a trap frame, not a portrait: a small, off-centre cat walking toward the lens behind a foreground tussock, head turned to the flash, its thick ringed tail (the species' diagnostic) motion-blurred, the near grass blown out by the IR flash and out of focus, and the far field dark. Its head is a mid grey with dark eye sockets so the Frost bloom stays the brightest thing in the frame. The scenes are reused with `<use>` in the hero, the signature, the gallery, the dialog and the 64px row thumbnails. Three are infrared trap frames with a grain filter and a vignette, and four are blue-hour silhouettes from a hide. There are no external images. In a real portfolio, swap each symbol for a photograph and keep the eye coordinates.
- **Type from a South American foundry.** Rosario and Faustina both come from Omnibus-Type in Buenos Aires, for a Chilean photographer. Rosario's humanist sans sets the name at 700 (-0.03em), the headings, the UI and every number. Its default figures are old-style, so all UI numbers use `lining-nums tabular-nums`; `1111` and `0000` both measure 240px at 100px. The data strip ("Cam 3  19 Jul 2025  03:12  −14 °C  Moon 38%") uses spaced gaps rather than separators. Faustina carries everything you read.
- **Charts are real and accessible.** The histogram, the expedition bars and the 24-hour chart are inline SVG drawn from `DATA`. The histogram has a `<title>` and a hidden per-night table. The expedition list has a hidden table and labelled row buttons. The hour chart is a focusable slider: arrows, Home and End move an hour cursor, the readout ("03:00 to 04:00: 21 frames, 1 kept") is live, and a hidden table lists all 24 hours. The legend chips preview a cause on hover or focus and lock it on click, with a live region ("Showing 74 vizcacha triggers").
- **Interactions come from the craft.** Hovering or focusing a gallery frame runs the camera's eye detection: four corner brackets travel from the frame's corners to a 12% box on the animal's eye and turn green-gold when they lock. The dialog draws the same box statically on the eye. There is no hover lift and no shadow anywhere, and the only exposure tween is the signature's.
- **Layout.** Left-aligned with a ragged right. Frames sit in asymmetric 7+5 then 5+7 spans, recomputed after filtering, and a frame alone on its row takes 7. Captions sit flush left under each frame, and numbers are right-aligned in tabular figures. Rules appear only between real records. Radii follow role: 0 for frames, 6px for controls and 999px for chips.
- **No dead ends.** Nav and in-page links scroll through Lenis and move focus to the section heading. Contact shortcuts open in a new tab. The form never sends anything. It drafts the message and offers "Send by email" (mailto with subject and body), "Send on WhatsApp" (wa.me with the text) and "Edit message", which keeps the values. The send buttons carry no href in the HTML; they get one from `CONTACT` on submit, and a missing key hides its button. With neither `email` nor `whatsapp`, the panel says to copy the message and send it from your own email. Copy falls back to selecting the address when the clipboard is blocked.

## Do not touch

- **The hero and the signature show the same symbol.** The hero is `sc-cat` drawn with the underexposed `--ir-*` overrides on `.hero-fig .sc` (about 1.1:1 against its ground, with `--ir-flash: none`), and the signature lifts it from `brightness(.2)` to full exposure. The eyes sit at 152/164, 168 in the 400x300 scene; `.shine`, the Eye-AF box and the eye-led opening all depend on them. If you change the scene in one place, the caption's promise breaks.
- **Exactly one coloured unit.** Green-gold means "eye found" or "kept". Adding it to buttons, focus or chips erases that meaning.
- **The pin is bounded and skippable.** It runs `+=220%`, only at 992px and wider with a fine pointer and a viewport at least 620px tall, and only when the text column fits. "Skip the 41 nights" comes before it. The 75/25 split between filling and opening lives in `MOTION.fillShare`.
- **The cat is the last trigger of the last night.** `stacks()` pushes it last into column 41, so the reveal starts at the top of the final column. The self-test asserts this.
- **The readout never reflows.** It is a fixed three-column data stamp above the histogram with reserved digit widths and two-digit nights, so the scrub never moves anything.
- **Hidden states exist only while the script holds them.** The hero hides under `html.pre`, which the script adds only when GSAP has loaded and motion is allowed, and removes once the timeline owns those states. Everything else is hidden by GSAP inside the motion branch. If the CDN fails, the page is static and fully usable.
- **Accessibility.** Rows are buttons with `aria-pressed` and a full spoken label. The hour plot is `role="slider"` with `aria-valuetext`. Filter, legend and row changes are announced in polite live regions. The dialog uses native `showModal()`. The menu makes `main` and the footer inert and returns focus to its button.
- **Two shortcuts.** The night-by-night distribution of the 296 triggers and the night lows are generated by a seeded `mulberry32`, not logged. Replace `stacks()` and `lows` with real per-night arrays when the data exists. The self-test checks that the lows reach the logged −19 °C and that the tallest night fits a 220px histogram on a 390px phone.

## Motion

House eases: `expo.out` for every entrance and settle, `power3.inOut` for every move between two states (Flip, chart morphs, the menu, the indicator, the caption swap), and `none` for anything scrubbed. Everything runs inside `gsap.matchMedia` with `motion`, `reduce`, `fine` ((hover: hover) and (pointer: fine)), `wide` (992px) and `tall` (620px) conditions. Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, and stops while the menu or the dialog is open. Under reduced motion there is no Lenis, no pin, no tween and no CSS cross-fade: every state is final and every change is instant. Every matchMedia revert (a resize across 992px, reduced motion switched on) clears the signature's inline states, so the full histogram and frame show. MD1 happens exactly twice, as bookends: the hero frame on load and the cat frame at the end of the wait.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Hero frame opens with its data strip | MD1 (centre) | Load | inset(22%) to 0, inner scale 1.2 to 1, 1.6s expo.out at .1s | Visible |
| Wordmark and nav arrive | LD8 | Load | y 6 to 0 with autoAlpha, .4s expo.out, stagger .06, at .3s | Visible |
| Eyeshine ignites, blinks once | Eye bloom | Load | scale and opacity 0 to 1, .5s expo.out at .9s; one scaleY .1 blink at 1.7s; whole load ends by 1.9s | Shown, no blink |
| Histogram fills, readout counts, cat frame opens | SC3 pin + SC16 + SC13-style readout + MD1 | Scroll; wide, fine, tall | Pin top top to +=220%, scrub; units scale 0 to 1 from the bottom over 75%; then over 25%: others to .25, clip from the unit's rect to inset(0), scene scale 1.35 to 1 around the eyes with the eyes translated from the unit's centre to rest, brightness(.2) to 1 on the scene | Full histogram, frame below |
| Same, narrow or touch | SC16 + MD1 | Histogram at top 70%, once; frame at top 60%, only after the fill completes | Columns fill over about 2.4s (1s expo.out per unit, .03s per column), then others to .25 in .4s; frame waits underexposed and opens 1.2s expo.out (inset(22%) to 0, scale 1.2 to 1, brightness(.2) to 1) | Full histogram, frame below |
| Expedition bars draw, figures count up | SC16 + SC13 | List at top 85%, once | SVG bars scaleX 0 to 1, 1s expo.out, stagger .06; counts from 92%, 1.1s power3.out | Final |
| Hour chart bars rise, flags pop | SC16 + MI3 | Plot at top 85%, once | scaleY 0 to 1, .9s expo.out, stagger .02; flags back.out(2) .3s | Final |
| Section spy and indicator | NV6 + NV4 | A section crosses the middle band | 2px Frost line slides .5s power3.inOut | Jumps |
| Eased anchors, focus to heading | NV6 | Nav, CTAs, skip link, back to top, form result | lenis.scrollTo, min(1.3, .65 + distance/4000)s | Instant |
| Skip-to-content link | Skip | Focus | Slides from -110%, .3s expo.out | Appears |
| Wordmark eyes blink | Eye blink | Hover, focus-visible | scaleY .1 in .18s | Colour change |
| Nav and inline link underline | HV2 | Hover, focus-visible | In from the left, out to the right, .45s | Static |
| Button and chip fill from the entry edge | HV4 | Hover, focus-visible | scaleX from the side the pointer crossed, .45s expo.out | Colour only |
| Press | MI1 | :active | scale .97 in .12s, back in .45s power3.out | None |
| Menu label swap and full-screen menu | MI2 + NV1 | Menu button under 768px | Label .35s; clip wipe .7s power3.inOut, links rise stagger .06; close reverses at 1.6x | Instant |
| Legend preview and lock | HV7 | Hover, focus, click | Other causes to .25 in .35s; a choice lifts the opened frame | Same (opacity only) |
| Region filter | CD5 + MI3 | Chip click | Flip .8s power3.inOut, stagger .02, enter .4s, leave .3s; dot pop .3s back.out(2). A click during a regroup finishes it and starts its own. The All order alternates regions so every chip visibly regroups | Instant |
| Eye-AF box | Eye-AF (subject device) | Hover, focus-visible on a frame | Brackets travel .5s expo.out and turn green-gold on arrival | Box appears without travel |
| Field-note dialog | CD7 | Frame click | opacity (not autoAlpha, so focus lands on Close), y 12, scale .98 to rest, .5s expo.out; closes .3s | Instant |
| Note swap | TR1 | Previous, Next, arrow keys | Lines out yPercent -100, in from 100, .4s power3.inOut; scene crossfade .4s | Instant |
| Expedition row | HV7 + MI1 | Hover, focus-visible, click | Siblings to .45; focus left rule scaleY .3s; chart bars morph .6s power3.inOut | Instant |
| Hour cursor | Chart cursor | Arrows, Home, End, pointer, tap | x .25s power3.out | Jumps |
| Contact handle roll | HV1 | Hover, focus-visible (hover devices) | Handle rolls to its action, .45s expo.out | Both lines static |
| Copy email | CD10 | Copy button | "Copied" y 6 to 0 in .25s, leaves after about 1.2s | Fade only |
| Form fields | MI4 + MI3 | Focus, submit, radio change | Rule draws .3s; error opens via grid rows .25s; dot pop .3s | Instant |
| Draft result | CD9 | Valid submit, Edit message | Crossfade .45s in a fixed-height cell, then scroll to and focus its heading | Instant |

## Adapting

1. **Tokens first.** Map the brand onto the colour tokens but keep the roles: one chosen dark (`--night`), a raised step (`--raised`), a structural hairline (`--rule`), two text tones (`--silver`, `--frost`) and one annotation colour (`--gold`) reserved for the single thing that matters in your data. Keep `--silver` at 4.5:1 or better on `--night` and every unit tint at 3:1 or better. The unit tints (`--c-viz`, `--c-fox`, `--c-other`) are a light-to-dark ramp, so keep the steps distinct.
2. **Content.** Replace `DATA` (one entry per project or expedition) and `CONTACT`. Each entry needs `hours[24]` summing to `frames`, `keptHours` with one hour per kept frame, a scene symbol and an `eye` target in % of the 400x300 scene. The signature needs one entry with `causes` summing to its `frames`. Open the page with `#selftest` to check the sums in the console. Adding a network is one line in `NETWORKS`, and removing a `CONTACT` key hides its row and its draft button. The minimum config is `email` or `whatsapp`; with neither, the drafted panel tells the visitor to copy the message. The gallery order is each entry's `g`; keep regions alternating so the filter always moves something.
3. **Images.** To use photographs, replace the `<symbol>` scenes with `<img>` or `<picture>` inside the same frame wrappers and keep `aspect-ratio`. Keep the hero and the signature on the same image, and use a darker export for the hero; the signature's `brightness(.2)` start should roughly match it.
4. **Retime or remove motion.** Every GSAP timing is written next to its effect in the motion branch, and CSS timings are the `--d-*` and `--ease-*` tokens. To lengthen or shorten the wait, change `MOTION.pin` (`+=220%`) and `MOTION.fillShare` (.75). To drop the pin entirely, set `fits` to `false` and the fill-on-enter path runs everywhere. Every other effect is one block that can be deleted on its own; the `fx` hooks it fills fall back to instant changes when they are absent.
5. **Copy length.** The pinned text column must fit the viewport height or the pin turns off, so keep the H2 to three lines and the intro to about 40 words. Captions sit under frames at any length.

| Token | Role |
|---|---|
| `--night` | Page ground, a high-altitude night indigo |
| `--raised` | Dialog, menu, chart plot area, filled chips |
| `--rule` | Hairlines between log rows and chip borders; never a meaningful mark |
| `--silver` | Infrared silver: secondary text, captions, axis labels (7.96:1) |
| `--frost` | Primary text, infrared eyeshine, focus ring, button fill (12.6:1) |
| `--gold` | Annotation only: the cat's unit, the Eye-AF lock, kept flags, the selected expedition (9.55:1) |
| `--c-viz`, `--c-fox`, `--c-other` | Histogram cause tints, light to dark (11:1, 7.96:1, 4.67:1); wind units are hollow in `--c-other` |
| `--ir-0` to `--ir-5`, `--ir-bg`, `--grain` | Infrared greys, ground and grain inside trap frames; the hero redefines them to draw the underexposed frame |
| `--dusk*`, `--snow*`, `--sea*` | Colours inside the frames shot by eye, never in the chrome |
| `--glow` | The Frost bloom on infrared eyes, nothing else |
| `--font-ui`, `--font-read` | Rosario for UI and numbers, Faustina for reading |
| `--t-0` to `--t-6`, `--t-display`, `--t-h2` | Major-third scale from 16px; display clamp(4rem, 12vw, 11rem) |
| `--s-1` to `--s-10`, `--gutter`, `--max` | 4px spacing base, page gutter clamp(16px, 4vw, 64px), 1360px max |
| `--r-frame`, `--r-control`, `--r-chip` | 0 for frames, 6px for controls, 999px for chips |
| `--d-*`, `--ease-*` | CSS-side durations and the house eases |
