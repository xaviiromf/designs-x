---
title: Night sled game hero on a live contour map
section: hero
subject: "Rodel, a downhill toboggan game by Hangwind, a three-person studio in a former ski-rental shop in Innsbruck: out Thursday 4 February 2027 on Windows, Linux and Steam Deck for EUR 12, asking players to wishlist it on Steam and watch the 1:32 trailer, with one release-day email as the fallback."
aesthetic: "A contour map printed the wrong way round: the paper is the ochre of contour ink. Stepped 2px isolines in five muted altitude bands, one glacier-cyan line for the run and nothing else, the name standing on a terrace as nested contour rings, and the copy on frozen tarns where no line crosses."
mode: dark
fonts:
  - "Handjet (Google Fonts, variable). Display only, at ELSH 2 and ELGR 1 so its modules are square tiles. The name at 800 (sampled by the canvas into the height field) and the dialog heading at 700."
  - "Host Grotesk (Google Fonts, variable 300-800). Everything else: tagline at 500, body at 400, buttons and labels at 600, h3 at 650, tabular figures in the facts, the readout and the shot list."
js: "Builds a height field (value-noise mountain, a valley bowl, a terrace for the name, flat tarns under the copy), draws it as pixel-stepped contour lines with marching squares into a half-resolution pixel buffer, traces the fall line from the hut, raises hills under the pointer, finger and keyboard focus, drops the snowline with scroll, runs the survey load, the trailer dialog and the release-day email (nothing is sent)."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [hero, game, indie, sled, mountain, topographic, contour, marching-squares, canvas, pointer, scroll, dialog, form, dark, gsap, lenis]
use_when:
  - "A game, sport or place about terrain: descents, trails, climbs, rivers, ski areas, mountain bikes, anything where a map is the honest picture of the product."
  - "A launch hero with one primary ask (wishlist, pre-order, sign-up), one thing to watch, and a fallback email."
  - "The brand can carry one full-bleed drawn background and a display name large enough to be drawn as rings."
avoid_when:
  - "Products with no ground to stand on (finance, SaaS dashboards). The map would be decoration, and the run would mean nothing."
  - "Pages that already have a pointer-reactive background or canvas nearby. Two fields fight."
  - "Long names. The name is drawn as terrain; above about eight letters at hero size the strokes are too thin for nested rings."
---

## Why it works

**The one bold idea: the hero is the game's map, and it only moves where someone disturbs the ground.** Rodel is played on a contour map, so the hero is one. A low-frequency value-noise mountain (a cone, so the lines step down evenly, with spurs and gullies scaled to its size) sits on a valley bowl that drains to the copy. It is drawn by marching squares on a 6px grid as 2px stair-stepped isolines, one every 100 m, written into a pixel buffer at half resolution and scaled up with `image-rendering: pixelated`: no anti-aliasing, no blur, no stroke. The colour of each line is its altitude band. Nothing moves until a person does something; the loop then redraws only while a hill is rising or sinking, the sled is running, or the snowline steps, and sleeps off screen.

- **One vivid hue, one meaning.** Glacier cyan (`--run`) is the run: the fall line a sled with a little momentum takes from the hut on the summit, half a grid step at a time down the steepest slope. It is recomputed on every redraw, so raising a hill in its path reroutes it live. The readout under the facts says where it went in the game's own terms ("to the tarn", "into a hollow", "off the edge of the sheet", "until the slope runs out") with the drop and length. Nothing else on the page is cyan except the readout's swatch and the legend.
- **The copy stands on frozen tarns.** Every block of text is a tarn: the field is pulled to 950 m inside it (between the valley floor and the first line), cells that touch it draw nothing, and one shoreline is drawn where its weight is one half. No line ever crosses a word, so text contrast is the ground's (paper 7.3:1, dust 5.8:1) whatever the pointer does. Hills raised over a tarn are flattened by it, which is what ice would do.
- **The name is terrain, not lettering.** RODEL is Handjet 800 rasterised at grid resolution, blurred into a ramp and added to the height field, so the letters rise as plateaus of four nested contour rings (three on phones). It stands on a terrace between the 2nd and 3rd lines, tilted toward the copy's tarn, so no line crosses the terrace and a run that reaches it slides on rather than pooling. The h2 text stays in the DOM for readers and selection and turns transparent once the canvas draws it. This is not the cta-indie-game wordmark (cells rising row by row) or any other wordmark in the ledger: nothing scrolls, nothing is sampled into cells; the name is an uplift of the same ground and the pointer's hill merges with its rings.
- **A new mountain every night.** Build tries up to eight noise seeds and keeps the first whose line from the hut reaches the tarn, so the default run always tells the game's promise. A click elsewhere can still find a hollow.
- **Altitude bands are muted, with one dark band.** Valley (light ochre, 2.0:1), larch forest (dark olive, 1.5:1 below the ground), scree (sand, 4.1:1), rock (grey-lilac, 3.5:1) and snow (near-white, 7.5:1). The forest band is darker than the ground on purpose: the map reads as light-dark-light rings rather than one wash, and the name's inner rings show as dark outlines.
- **Ground.** Contour ochre `#6E4A0E` (38°, 77%, 24%), the brown-yellow ink cartographers draw height in. It is clearly lighter and yellower than `nav-pirate-radio`'s tarnished brass `#3D2C08` and redder neighbours rust `#4D270B` and smoked brown `#221810`.
- **Two asks and a fallback.** Wishlist on Steam is the paper button; the trailer is the umber button and opens a dialog with the shot list and a YouTube link; the release-day email is in the second tarn below the fold. Facts are a plain definition list.
- **Words.** "A new mountain every night, one sled, and a line down that nobody else has ridden." Buttons say what happens. The hint names every input: point, click, drag, tap and the keyboard.
- **Semantics.** A section labelled by its h2 (the host page supplies the h1). The canvas is `aria-hidden`; the readout is a `role="status"` region updated only when the map goes idle, so a moving pointer does not chatter. The dialog is native `showModal()`; Escape and the backdrop close it and focus returns to the trailer button.

Deviations from the brief, and why:

- **Click drops in instead of carving a crater.** A crater would be a second deformation beside the hill; a start gate and a fresh fall line from the click is the game's own verb and shows what the contours mean.
- **Keyboard knolls rise at the tarn's shore beside the control, not on its edge.** The control sits on a tarn, which stays flat; on narrow screens the knoll rises above the tarn instead.
- **The payoff is the name rising out of the terrace at the end of the load**, and again it merges with every hill the pointer raises over it. Success raises a summit beside the confirmation and re-runs the line from the hut.

## Do not touch

- **Pixel-stepped lines.** The canvas is half the section's size, drawn into an `ImageData` buffer with Bresenham lines and shown with `image-rendering: pixelated`. Do not switch to `ctx.stroke()`, round the canvas to device pixels, or set `imageSmoothing`: anti-aliased contours are a different, softer design.
- **One `--g` for the grid.** Marching squares, the hill radii in grid units and the name's raster all read `--g` (6px). Below 6px the per-frame work grows with the square of the change.
- **Tarns are `[data-tarn]`, the name is `[data-plain]`.** Any new block of text needs `data-tarn`, or contour lines will run under it. The tarn level (`LAKE`, half an interval) must stay below the first line.
- **Altitude is quantised.** Hills rise and sink a whole contour interval at a time (`--d-rise`, `--d-sink`), the snowline moves a whole line at a time, the load plots a whole line at a time. Never fade or ease amplitudes: the stepping is the style.
- **Cyan is only the run.** No hover, focus or decoration in `--run`.
- **The loop sleeps.** `request()` schedules one frame only while a hill is changing or the sled is running; an IntersectionObserver holds it off screen. Do not add an idle animation.
- **The seed search and the self test.** `mountain(seed)` must stay deterministic; `runSelfTest()` (at `#selftest`) checks the marching-squares table and that the run ends lower than it starts, and must log `SELFTEST PASS`.
- **Hidden states live only under `html.js:not(.go)`** (the copy waits for the survey) and are undone for reduced motion. With the CDN blocked the copy shows at once, the finished map is drawn, pointer hills and drop-in still work in plain JavaScript, and so do the dialog and the form.
- **Accessibility.** Canvas `aria-hidden`; every target at least 44px (buttons and the field 48px, text links padded); focus ring 2px paper with a 3px offset; the blaze shows on keyboard focus and on press, never only on hover; the hint has a touch wording; the form uses `novalidate`, a reserved error line, `aria-invalid` and `aria-describedby`, and the confirmation heading takes focus.

## Motion

House stepping: hard cuts on a visible frame rate (45 to 140 ms), `steps(1, end)` keyframes and `visibility` in CSS, `gsap.delayedCall` frames in the script; nothing eases. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`); the load waits for the fonts (raced with 1.5 s) and a visible page. Everything is inside `gsap.matchMedia` (motion / reduce). The map engine itself is plain JavaScript and its own `requestAnimationFrame`, so it works without the CDN.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| The survey | Contour levels drawn only at or above `plot`, stepped down | Load, fonts ready and page visible | One line every `--d-plot` 0.05 s from 2,400 m to the valley (0.75 s); the copy cuts in when the plot reaches 1,200 m | Finished map |
| The name rises | Name uplift in whole intervals | After the survey | Four intervals (three on phones), one every `--d-uplift` 0.08 s | Risen |
| The run | Fall line from the hut, three grid steps a frame | After the name | About 0.5 to 1 s depending on length; readout updates when it stops | Drawn at once |
| Pointer hill | Compact bump `(1 - d²/r²)²`, radius `--knoll` 96 px (70 on phones), up to 5 intervals | `pointermove` (mouse, pen) | Rises one interval per `--d-rise` 0.045 s, follows the pointer live; on `pointerleave` sinks one interval per `--d-sink` 0.085 s | None |
| Touch hill | Same | `pointerdown` on a touch, follows a drag until the browser takes the scroll | Sinks on release or cancel | None |
| Drop in | Start gate and a new fall line from the click | `click` or tap on open ground (a tarn says so instead) | Traced at three grid steps a frame | Drawn at once |
| Keyboard knoll | Same bump, 4 intervals | `focusin` with `:focus-visible` on a link, button or field | At the tarn's shore beside the control (above it on narrow screens); sinks on `focusout` | None |
| Snowline | ScrollTrigger scrub on the section, top top to bottom top | Scroll | Lines at or above the snowline draw in snow; it steps from 2,200 m down to 1,500 m, one line at a time; the legend says where | Fixed at 2,200 m |
| Trail blaze | Three `visibility` keyframes, `steps(1, end)` | Hover (fine pointers), focus-visible, press | Red, white, red, `--d-blaze` 0.05 s apart, at the button's left end | Shown at once |
| Brake claws | Two toothed claws under the button, `scaleY` .5 then 1 | Press (pointer, Enter, Space), held at least `--d-hold` 0.14 s | `--d-brake` 0.09 s, two frames | Shown at once |
| Summit underline | A stepped peak (clip-path) rises from the 2px underline, `scaleY` .5 then 1 | Hover, focus-visible, `:active` on touch | `--d-summit` 0.14 s, two frames | Shown at once |
| Hachures | Slope ticks every 6 px under the field, three lengths | Focus in the email field | `--d-hach` 0.12 s, three frames; a valid address closes them into one 2px paper line | Shown at once |
| Error line | Text in a reserved line | Invalid submit | Instant; focus moves to the field; cleared when the address becomes valid | Instant |
| Dialog: map sheets | 12 covering tiles removed in four altitude groups, summit first, by the height of the map behind each tile | Watch the trailer; Close, Escape or backdrop | `--d-sheet` 0.06 s per group; closing covers the lowest first, then closes | Instant |
| Success | A 6-interval summit at the tarn's shore beside the confirmation, plus the run re-traced from the hut | Valid submit | Rises in steps, holds 2.6 s, sinks in steps | Instant swap |

## Adapting

1. **Your terrain.** Keep the map only if your product is about ground. Change the hint and readout wording to your verbs ("ride", "climb", "paddle"); keep the readout factual (drop and length).
2. **Colours.** `--ochre` is the ground; keep text at AA on it (`--paper`, `--dust`). Keep one band darker than the ground so the rings alternate. `--run` is the only vivid hue: give it to whatever line your product follows.
3. **The name.** Change the h2's `.word`. The raster reads its font size, so `--t-title` decides how thick the strokes are; keep strokes at least about 8 grid cells for four rings. Fewer, wider letters work best.
4. **Mountain shape.** The summit position and radius are in `build()` (`sx`, `sy`, `R`; phones put the summit in the gap above the copy). The valley bowl centres on the first `[data-tarn]`. Altitudes are 900 m plus 1,600 m times height; change `alt()` and the legend together.
5. **Motion.** All durations are `--d-*` tokens. To remove the snowline, delete the ScrollTrigger; to remove the survey, start with `plot = 1` and the name risen.
6. **In a framework,** render the markup statically, run the map engine in an effect, and return the `gsap.matchMedia` cleanup.

| Token | Role |
|---|---|
| `--ochre` | Ground, contour ochre |
| `--umber` | Dialog surface, field, the trailer button, ink on paper faces (paper on it 13.2:1) |
| `--paper` | Text, wishlist face, focus ring (7.3:1) |
| `--dust` | Secondary text, borders, underlines, hachures, brake claws (5.8:1) |
| `--run` | The run, the hut, the start gate, their swatches (6.0:1) |
| `--blaze` | Trail blaze red on controls (5.1:1 on paper) |
| `--fault` | Errors only (4.7:1) |
| `--b-valley` ... `--b-snow` | Contour colours by altitude band; canvas and legend only |
| `--scrim` | Dialog backdrop |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk |
| `--t-small` ... `--t-title` | 14, 16, 18, tagline clamp(22-28), h3 22, name clamp(132px, 17vw, 248px) |
| `--g` | Grid step for marching squares and the name raster (6px) |
| `--s1` ... `--s6`, `--gut`, `--max-w` | Spacing on the 6px step, gutter, content width |
| `--tap`, `--hit` | Button and field height (48px), minimum target (44px) |
| `--knoll` | Radius of the pointer's hill (96px, 70px on phones) |
| `--d-plot` ... `--d-sheet` | Every duration CSS and the script use |
