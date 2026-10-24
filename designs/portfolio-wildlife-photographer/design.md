---
title: Wildlife photographer portfolio with a 41-night contact sheet
section: portfolio
subject: Personal portfolio of Rayén Aliaga, a fictional night-wildlife photographer in Arica, Chile, who works with camera traps and hides, with frames, field notes and expedition stats.
aesthetic: The monochrome of an infrared camera trap on a violet Puna night, with the trap's condensed data stamp as the type voice; colour only inside the frames shot by eye at dusk.
mode: dark
fonts:
  - Radio Canada (Google Fonts, variable wdth 75-100, wght 300-700), for the name, headings, nav, buttons, numbers, chart labels and the camera data strip (wdth 75 is the trap's stamp)
  - Faustina (Google Fonts, variable wght 300-800 with italic), for the lede, intros, captions, field notes and form help; italic only for Latin binomials
js: Builds everything from one CONTACT object and one DATA array (a 296-trigger contact sheet that fills night by night and opens into the cat's frame, the gallery with a Flip region filter and an Eye-AF hover, the field-note dialog, the expedition log with drawn bars, the 24-hour chart with a keyboard cursor and hidden tables, the contact shortcuts with a copy button, and a form that drafts a mailto or WhatsApp message), runs Lenis smooth scroll and the page choreography, and asserts its data at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Flip), Lenis 1.3.26]
tags: [portfolio, photography, wildlife, charts, svg, dark, monochrome, gsap, lenis, scrollytelling, pin, dialog, filter, form]
use_when:
  - A personal portfolio where the numbers behind the work are the story (field researchers, photographers, surveyors, anyone whose output is one result out of many attempts).
  - The work can be drawn or shown as frames, and one frame deserves a slow reveal.
  - You want a detailed-tier page with one scroll-driven signature and quiet, considered responses everywhere else.
avoid_when:
  - The portfolio has dozens of images to browse. This shows seven frames and spends its boldness on one.
  - The audience needs to scan quickly on a phone with no patience for a sequence. The narrow path drops the pin but the page is still long.
  - A bright, colourful brand. The chrome is deliberately monochrome.
---

## Why it works

**The one bold idea: 41 nights, 296 triggers, one frame.** The 2025 Salar de Surire survey is drawn as the trap's own contact sheet. Each trigger is a tiny 4:3 frame stacked in its night's column, so the chart is literally the SD card: hollow outlines for wind in the bunch grass, three grey tints for vizcacha, culpeo fox and "vicuña and suri", and one white frame with two eye dots on night 41. On wide screens the section pins for 220% of the viewport. The first 75% fills the columns night by night while a readout counts "Night 17 of 41" and "Triggers so far 118". In the last 25% every other frame dims to .25 and the white cell opens into the full camera-trap frame: a clip-path that starts as that cell's rectangle and ends at inset(0), a counter-scale from 1.35 and an exposure lift from brightness .2. The hero shows the same frame underexposed, with only the eyes visible, and its caption promises the full exposure at the end of the wait. The page's truth (most of the work is waiting) is the thing you scroll through.

- **Monochrome trap chrome, colour only where an eye saw colour.** An infrared trap records eyeshine as a white bloom, not amber, so there is no accent colour at all. The page is a chosen violet night (#201B29, not a tinted black), raised surfaces a step lighter, text in moon and frost greys. Pure white (`--bloom`) means only "eye" or "kept": the eyeshine, the cat's cell, the kept-frame flags on the hour chart, the selected expedition's thumbnail and the Eye-AF box on arrival. It always comes with a glow and a shape cue (filled cell with eyes, flag, outline), never colour alone. The only colour on the page is the lavender dusk inside the four frames shot by eye from a hide. That is not default 2: there is no bright accent, and the one hue belongs to the photographs.
- **Every frame is an SVG drawing standing in for a photograph.** Seven scenes are drawn once as `<symbol>`s (infrared trap frames with a grain filter and vignette, and blue-hour silhouettes) and reused with `<use>` in the hero, the signature, the gallery, the dialog and the 64px row thumbnails. No external images. In a real portfolio, swap each symbol for a photograph and keep the eye coordinates.
- **The type is the trap's stamp.** Radio Canada at wdth 75 sets the camera data strip, chart ticks and legend counts in a condensed, mixed-case stamp, which replaces the monospace a generic page would use. The same family at wdth 100 sets the name and headings, and at wdth 87.5 / 300 the readout figures. Faustina, a warm text serif from Buenos Aires, carries everything you read. Figures are tabular everywhere (Radio Canada `1111`, `0000` and `7777` all measure 240px at 100px with tabular-nums, and 200px at wdth 75).
- **Charts are real and accessible.** The contact sheet, the expedition bars and the 24-hour chart all come from `DATA`. The hour chart is a focusable slider: arrows, Home and End move an hour cursor, and the readout ("03:00 to 04:00: 21 frames, 1 kept") is live. The sheet and the hour chart each carry a hidden table with every value. The legend chips preview a cause on hover or focus and lock it on click, and when the frame has already opened over the sheet a legend choice lifts it off so the chips always show something.
- **Interactions come from the craft.** Hovering a gallery frame runs the camera's eye-detection: four corner brackets travel from the frame's corners to a 12% box on the animal's eye and turn bloom white when they lock. The dialog draws the same box statically on the eye. There is no hover lift and no shadow anywhere.
- **Layout.** Left-aligned with a ragged right, frames in asymmetric 7+5 then 5+7 spans that are recomputed after filtering, captions flush left under each frame, numbers right-aligned in tabular figures. Rules exist only between real records in the expedition log. Radii follow role: frames 0, controls 6px, chips 999px.
- **No dead ends.** Nav and in-page links scroll through Lenis and move focus to the section heading. Contact shortcuts open in a new tab. The form never sends: it drafts the message and offers "Send by email" (mailto with subject and body), "Send on WhatsApp" (wa.me with the text) and "Edit message", which keeps the values. Copy falls back to selecting the address when the clipboard is blocked.

## Do not touch

- **The hero and the signature show the same frame.** The hero is `sc-cat` at brightness .24 with its eyes; the signature opens it at full exposure. Change the scene in one place and the promise in the caption breaks.
- **The pin is bounded and skippable.** `+=220%`, wide screens only (992px and up, not on touch, and only when the text column fits the viewport height), with "Skip the 41 nights" before it. The 75/25 split between filling and opening lives in `MOTION.fillShare`.
- **The cat is the last trigger of the last night.** `stacks()` pushes it last in column 41, so the reveal starts at the top of the final column. The self-test asserts it.
- **Bloom white is never decoration.** Adding white to buttons or focus states would erase what it means. The focus ring is frost, 2px, offset 3-4px.
- **Hidden states exist only while the script holds them.** The hero hides under `html.pre`, which the script adds only with GSAP loaded and motion allowed, and removes once the timeline owns those states. Everything else is hidden by GSAP inside the motion branch. If the CDN fails the page is static and fully usable.
- **Accessibility.** Rows are buttons with `aria-pressed` and a full spoken label. The hour plot is `role="slider"` with `aria-valuetext`. Filter, legend and row changes are announced in polite live regions. The dialog is a native `showModal()`; the menu makes `main` and the footer inert and returns focus to its button.
- **One shortcut.** The night-by-night distribution of the 296 triggers is generated by a seeded shuffle (`mulberry32`, seed 1), not logged. Replace `stacks()` with a real `perNight` array when the data exists.

## Motion

House eases: `expo.out` for every entrance and settle, `power3.inOut` for every move between two states (Flip, chart morphs, the menu, the indicator), `none` for anything scrubbed. Everything runs inside `gsap.matchMedia` with `motion`, `reduce`, `coarse` (touch), `wide` (992px) and `tall` (620px) conditions. Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, and stops while the menu or the dialog is open. Under reduced motion there is no Lenis, no pin and no tween: every state is final and every change is instant.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Name rises line by line | TX1 | Load, after fonts (1.2s cap) | yPercent 110 to 0, 1s expo.out, stagger .08, at 0s | Static |
| Hero frame opens with its data strip | MD1 (centre) | Load | inset(22%) to 0, inner scale 1.2 to 1, 1.6s expo.out, at .15s | Visible |
| Wordmark and nav arrive | LD8 | Load | y 6 to 0 with autoAlpha, .4s expo.out, stagger .06, at .4s | Visible |
| Eyeshine ignites, blinks once | Bloom ignite | Load | scale and opacity 0 to 1, .5s expo.out at 1.1s; one scaleY .1 blink at 2.4s | Shown, no blink |
| Contact sheet fills, readout counts, cat frame opens | SC3 pin + SC16 + SC13-style readout + MD1 | Scroll, wide and not touch | Pin top top to +=220%, scrub; cells scale 0 to 1 from the bottom over 75%; others to .25, clip from the cell rect to inset(0), scale 1.35 to 1, brightness .2 to 1 over 25% | Full sheet, frame below |
| Same, narrow or touch | SC16 + MD1 | Sheet at top 70%, frame at top 85%, once | Columns fill over about 2.4s (1s expo.out per cell, .03s per column); frame opens 1.2s expo.out | Full sheet, frame below |
| Gallery frames open from alternating sides | MD1 | top 90%, once | inset from one side to 0, scale 1.2 to 1, 1.2s expo.out | Visible |
| Expedition bars draw, figures count up | SC16 + SC13 | List at top 85%, once | scaleX 0 to 1, 1s expo.out, stagger .06; counts from 92%, 1.1s power3.out | Final |
| Hour chart bars rise, flags pop | SC16 + MI3 | Plot at top 85%, once | scaleY 0 to 1, .9s expo.out, stagger .02; flags back.out(2) .3s | Final |
| Section spy and indicator | NV6 + NV4 | Section crosses the middle band | 2px frost line slides .5s power3.inOut | Jumps |
| Eased anchors, focus to heading | NV6 | Nav, CTAs, skip link, back to top | lenis.scrollTo, min(1.3, .65 + distance/4000)s | Instant |
| Nav and inline link underline | HV2 | Hover, focus-visible | In from the left, out to the right, .45s | Static |
| Button and chip fill from the entry edge | HV4 | Hover, focus-visible | scaleX from the side the pointer crossed, .45s expo.out | Colour only |
| Press | MI1 | :active | scale .97 in .12s, back in .45s power3.out | None |
| Menu label swap and full-screen menu | MI2 + NV1 | Menu button under 768px | Label .35s; clip wipe .7s power3.inOut, links rise stagger .06; close reverses at 1.6x | Instant |
| Legend preview and lock | HV7 | Hover, focus, click | Other causes to .25 in .35s; a choice lifts the opened frame | Same (opacity only) |
| Region filter | CD5 + MI3 | Chip click | Flip .8s power3.inOut, stagger .02, enter .4s, leave .3s; dot pop .3s back.out(2) | Instant |
| Eye-AF box | Subject hover | Hover, focus-visible on a frame | Brackets travel .5s expo.out, turn bloom white on arrival; scene brightness .9 to 1.05 | Box appears without travel |
| Field-note dialog | CD7 | Frame click | autoAlpha, y 12, scale .98 to rest, .5s expo.out; closes .3s | Fade only |
| Note swap | TR1 | Previous, Next, arrow keys | Lines out yPercent -100, in from 100, .4s power3.inOut; scene crossfade .4s | Instant |
| Expedition row | HV7 + MI1 | Hover, focus-visible, click | Siblings to .45; focus left rule scaleY .3s; chart bars morph .6s power3.inOut | Instant |
| Hour cursor | Chart cursor | Arrows, Home, End, pointer, tap | x .25s power3.out | Jumps |
| Contact handle roll | HV1 | Hover, focus-visible (hover devices) | Handle rolls to its action, .45s expo.out | Both lines static |
| Copy email | CD10 | Copy button | "Copied" y 6 to 0 in .25s, leaves after about 1.2s | Fade only |
| Form fields | MI4 + MI3 | Focus, submit, radio change | Rule draws .3s; error opens via grid rows .25s; dot pop .3s | Instant |
| Draft result | CD9 | Valid submit, Edit message | Crossfade .45s in a fixed-height cell | Instant |

## Adapting

1. **Tokens first.** Map the brand onto the colour tokens but keep the roles: one chosen dark (`--night`), a raised step (`--raised`), a structural hairline (`--rule`), two text greys (`--moon`, `--frost`) and one signal (`--bloom`) reserved for the single thing that matters in your data. Keep `--moon` at 4.5:1 or better on `--night`. The cell tints (`--c-viz`, `--c-fox`, `--c-other`) are a light-to-dark ramp; keep the steps distinct.
2. **Content.** Replace `DATA` (one entry per project or expedition) and `CONTACT`. Each entry needs `hours[24]` summing to `frames`, `keptHours` with one hour per kept frame, a scene symbol and an `eye` target in % of the 400x300 scene. The signature needs one entry with `causes` summing to its `frames`. Open the page with `#selftest` to check the sums in the console. Adding a network is one line in `NETWORKS`; removing a `CONTACT` key hides its row and its draft button.
3. **Images.** To use photographs, replace the `<symbol>` scenes with `<img>` or `<picture>` inside the same frame wrappers, keep `aspect-ratio`, and keep the hero and the signature on the same image.
4. **Retime or remove motion.** Every GSAP timing is written next to its effect in the motion branch, and CSS timings are `--d-*` and `--ease-*` tokens. To lengthen or shorten the wait, change `MOTION.pin` (`+=220%`) and `MOTION.fillShare` (.75). To drop the pin entirely, set `fits` to `false` and the fill-on-enter path runs everywhere. Each other effect is one block that can be deleted on its own; the `fx` hooks it fills fall back to instant changes when absent.
5. **Copy length.** The pinned text column must fit the viewport height or the pin turns off; keep the H2 to three lines and the intro to about 40 words. Captions sit under frames at any length.

| Token | Role |
|---|---|
| `--night` | Page ground, a violet Puna night |
| `--raised` | Dialog, menu, chart plot area, filled chips |
| `--rule` | Hairlines between log rows and chip borders; never a meaningful mark |
| `--moon` | Secondary text, captions, axis labels (7.3:1) |
| `--frost` | Primary text, focus ring, button fill (13.9:1) |
| `--bloom` | Only eyeshine, the cat cell, kept flags, the selected expedition and the Eye-AF lock; always with `--glow` |
| `--c-viz`, `--c-fox`, `--c-other` | Contact-sheet cause tints, light to dark; wind cells are hollow in `--c-other` |
| `--ir-0` to `--ir-5` | Neutral infrared greys inside trap frames |
| `--dusk*`, `--snow*`, `--sea*` | Colours inside the frames shot by eye, never in the chrome |
| `--font-ui`, `--font-read` | Radio Canada for UI and numbers, Faustina for reading |
| `--t-0` to `--t-6`, `--t-display`, `--t-h2` | Major-third scale from 16px; display clamp(4rem, 12vw, 11rem) |
| `--s-1` to `--s-10`, `--gutter`, `--max` | 4px spacing base, page gutter clamp(16px, 4vw, 64px), 1360px max |
| `--r-frame`, `--r-control`, `--r-chip` | 0 for frames, 6px for controls, 999px for chips |
| `--d-*`, `--ease-*` | CSS-side durations and the house eases |
