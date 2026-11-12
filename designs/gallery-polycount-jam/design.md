---
title: Polycount-limited game jam entries gallery
section: gallery
subject: Kolmio Jam 2026, a 72-hour online game jam on the theme Low tide, hosted by Kantti, the game-dev meetup at Metso library in Tampere, where every model had to stay under 300 triangles; the gallery shows its twelve finished entries with a genre filter, three orders, a title or maker search, a detail dialog per entry and a play-later list.
aesthetic: An untextured PS1-era scene drawn at a quarter of the screen's resolution. A chartreuse triangle mesh flat-shaded in exactly four tones, stepped edges with no anti-aliasing, each entry's genre hue tinting the facets under its card, budget yellow for triangle counts and a display face built from square modules.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, at ELSH 2 and ELGR 1 so its modules are square tiles. The H2 at 800, card titles and the dialog title at 700 to 800, the rank chips at 700.
  - Host Grotesk (Google Fonts, variable 300-800). Everything else, body at 400, labels, buttons and genre tags at 600 to 650, tabular figures for triangle counts.
js: Rasterises a flat-shaded triangle mesh into a quarter-resolution canvas (its own edge-function rasteriser, four quantised tones per hue), presses it under the pointer, a tap, a hovered or focused card and the play-later list, folds it as the section scrolls, pops its level of detail at load, and runs the filter, orders, search, entry dialog and play-later list (all of which work in plain JavaScript without the libraries).
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [gallery, game jam, low poly, ps1, triangles, mesh, canvas, flat shading, filter, search, dialog, pointer, scroll, dark, gsap, lenis]
use_when:
  - A gallery of ten to twenty works from a 3D, low-poly, demake or game-jam culture, where a limit (a budget, a palette, a size) is part of what is being shown.
  - The works fall into four or five groups that can each own a hue, and each work has a handful of facts worth a detail view.
  - The page can afford one living background that answers the visitor; nothing else on the page follows the pointer.
avoid_when:
  - The works have real screenshots that must be the image. The card windows show the mesh, not the work.
  - More than about twenty items, or more than five groups. The tinted regions turn into confetti.
  - Light, corporate or editorial brands, or a page that already runs a canvas or pointer effect.
---

## Why it works

**The one bold idea: the page is an untextured low-poly scene, rendered the way the jam's own games had to be.** A mesh of near-equilateral triangles lies under the whole section. Its vertex heights come from a slowly evolving value-noise field plus a fixed relief per vertex, and every facet is flat-shaded against one light from the top left and quantised to exactly four tones per hue. It is rasterised by the script's own edge-function rasteriser into a canvas at one pixel per 4 CSS pixels, with no anti-aliasing, and scaled up with `image-rendering: pixelated`, so every edge is a staircase. A canvas of the whole section contains exactly 20 colours (five hues by four tones), checked headlessly. It never looks like a smooth "3D low-poly background": there is no gradient, no smoothing and no in-between tone anywhere, which is the jam's own rule 3 (320 by 240, no anti-aliasing) applied to the page.

- **The mesh is cloth that only moves when pressed.** The pointer sinks the vertices near it (radius 2.6 cells, deeper while a button is held); the facets on the dent's walls change tone in whole steps, the shaded wall on the upper left, the lit one on the lower right. When the pointer leaves or lets go, each vertex that was pressed more than 2.5 mesh pixels returns in three stepped bounces (45% overshoot, 22% back, 10% over, rest), each held for 75 ms with a hard cut between, never a spring. The noise field breathes only while something is changing it (700 ms after the last change); then the loop sleeps, so a still pointer keeps its dent but nothing moves.
- **Colour means genre, and the mesh carries it.** Each card's window is a hole in the card: the mesh shows through it, and every triangle whose centre lies on the card takes that entry's genre palette (racing orange, platformer sky, horror rose, puzzle lilac). Triangles that cross the card's edge stick out as stepped fringes, so the cards sit in their own coloured patches of the same surface. Budget yellow means the 300-triangle rule and only that: counts and budget bars. Bone is text, focus and the visitor's own marks.
- **Every input presses the same mesh.** Hovering or keyboard-focusing a card presses a bowl under its window (keyboard parity), a tap presses where the finger lands and bounces back on release, scrolling folds the mesh along a diagonal crease that travels from top left to bottom right as the section passes and flattens in the same three bounces when scrolling stops, and putting an entry on the play-later list raises a pyramid in its window, in bone tones, that stamps up through the same bounces and stays.
- **The gallery is a real tool.** Five genre chips, three orders (jury result, fewest triangles, title) and a diacritic-insensitive search by title or maker. A `role="status"` line reports exactly what is shown ("Showing 3 of 12 puzzle entries, by jury result."). Under the search field a strip of triangles, one per matching entry in its genre hue, redraws on every keystroke. No match shows an explanation and a button that brings back all twelve. Every card opens a dialog with the entry's facts, its budget bar and the line that makes the subject: what the team cut to fit. Previous and Next walk the current filtered order without closing.
- **The ground** is chartreuse `#3F5C00` (hue about 79 degrees), a saturated yellow-green the colour of an untextured placeholder mesh: brighter and far more saturated than olive drab `#2F3210`, yellower than moss `#1B3A10` and PCB green `#0E2B1C`, and nothing like sage slate `#2B3A34`. Its four mesh tones run from `#2C4300` to `#4A6B00`, kept dark enough that bone text holds 5.5:1 on the lightest.
- **Different from `gallery-demoparty`.** That design is a home-computer screen with copper bars in its border, following the pointer's height and seen through the letters; its stills are 2D indexed images built by bit depth. Here there is no border, nothing follows the pointer, the background is geometry deformed in place, and the card images are the background itself.
- **Not a glow, not a tilt, not parallax.** Nothing lights up around the pointer: the dent is a change of shape, read through flat tones that already exist in the palette. Cards never move or tilt; the mesh moves under them. The fold is anchored to the section, not to the viewport, and no layer moves at a different speed.

Deviations from the brief, and why:

- **The play-later peak takes its own pale palette.** In a genre window the pyramid was lost among the window's own loud facets. Bone, the colour of the visitor's own marks, makes it unmistakable and keeps every genre hue for genre.
- **The noise freezes 700 ms after the last change, not when the pointer leaves.** A mouse resting on a page that is all mesh would otherwise keep the loop running forever.
- **Touch does not press while dragging.** A drag on a phone is a scroll; it folds the mesh instead. A tap presses and bounces.

## Do not touch

- **Four tones, no smoothing.** `BANDS` quantises the light into four steps, `--mesh-*` holds exactly four colours per hue, the canvas is drawn with `putImageData` at one pixel per `P` = 4 CSS pixels and shown with `image-rendering: pixelated` at an exact multiple of its size. Do not draw triangles with `fill()` (it anti-aliases), add a fifth tone, or blend tones.
- **Deeper is immediate, shallower bounces.** `step()` sets a vertex at once when its target is deeper and plays `BOUNCE` (-0.45, 0.22, -0.1, 0) held for `--d-bounce` each when it is shallower by more than 2.5 mesh pixels. Do not replace this with an eased spring.
- **The loop sleeps.** It runs on `gsap.ticker` only while a vertex is bouncing, a fold is live or a source changed in the last 700 ms, and an IntersectionObserver stops it off screen. Reduced motion draws the still mesh once per layout change.
- **Regions come from the live layout.** `layout()` reads every visible card's rectangle after each render and resize; a triangle takes a card's hue by its rest centroid. The card window is transparent on purpose. Do not paint a background into `.win`.
- **Hue jobs.** Genre hues only on that genre (chip swatch, tag, window facets, match strip, dialog border); yellow only for triangle budgets; bone for text, focus and the play-later peak.
- **Accessibility.** The canvas is `aria-hidden`; every card is a real `<button>` inside its `<h3>`, stretched over the card (44px+ target), with the focus ring drawn on the card. Chips and orders use `aria-pressed`. The status line and the dialog's message are `role="status"`. The dialog is a native `showModal()`, closes with Close, Escape or a backdrop click, returns focus to the card of the entry last shown and stops Lenis while open. Hidden load states exist only under `html.js:not(.go)`; with the CDN blocked the static mesh is drawn and every flow still works.

## Motion

House stepping: hard cuts on a visible frame rate (60 to 120 ms) and per-vertex held frames; nothing eases. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`). Everything is inside `gsap.matchMedia` (motion, fine pointer); the cleanup removes listeners, the ticker, Lenis, the ScrollTrigger and the observer and redraws the still mesh. The load waits for the fonts (raced with 1.5 s) and a visible page.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Level of detail pops in | Mesh rebuilt at 8x, 4x, 2x, then 1x cell size, untinted until the last | Load, fonts ready and page visible | One level every `--d-lod` 0.12 s; the H2 cuts in at 2x, everything else and the genre regions at 1x | Full mesh at once |
| Cloth press | Vertex targets from the pointer, quantised shading | pointermove (mouse, pen), pointerdown (any) | Radius 2.6 cells, 10 mesh px deep, 18 while a button is held; immediate | Still mesh |
| Return | Per-vertex held frames | Pointer leaves, lifts or the target gets shallower | 3 bounces: -45%, +22%, -10%, rest, `--d-bounce` 0.075 s each | Still mesh |
| Breathing | 3D value noise advanced in time | Any change in the last 700 ms, or a bounce in progress | `--breath` 0.35 noise units per second; frozen otherwise | Frozen |
| Card press | Bowl under the window | Hover (fine pointer), keyboard focus on the card | 16 mesh px deep over 0.58 of the window's longer side; returns with the bounces | Still mesh |
| Fold | Diagonal ridge `x + 0.6y` scrubbed by section progress | ScrollTrigger on the section, top bottom to bottom top, velocity above 40 px/s | Height 5 to 11 mesh px from velocity; released 140 ms after scrolling stops, then the bounces | Off |
| Play-later peak | Bone pyramid, 22 mesh px high, 2.2 cells wide | Play later pressed in the dialog | Stamps up 145%, 78%, 110%, 100% through the bounces; stays; removing it bounces it flat | Drawn at once |
| Button facets | Two masked pseudo-elements, upper-left lit and lower-right shaded triangle, `crispEdges` SVG masks | Hover, focus-visible | Lit triangle at once, shaded one `--d-facet` 0.06 s later | Same (visibility only) |
| Button press | The two triangles swap tones (the normal flips) | :active, Space or Enter held | Instant | Same |
| Ribbon link | Triangle strip under the text, lit then shaded triangles | Hover, focus-visible | 1 px underline gives way to the lit triangles at once, the shaded ones `--d-facet` later | Same |
| Match strip | One triangle per matching entry in its genre hue | Every keystroke in the search, every filter change | Instant | Same |
| Entry dialog | Clip-path frames: a corner sliver, the upper-left triangle, the whole panel | Open a card; Close, Escape, backdrop | `--d-facet` 0.06 s per frame; closes in reverse | Instant |

## Adapting

1. **Find the limit in your subject.** The mesh is right when the works come from a 3D or low-poly culture, or any culture where a hard budget is the point. Change the copy of the rules and the budget (`budget()` uses 12 slots of 25 triangles).
2. **Map the hues, keeping the jobs.** `--ground` and `--mesh-ground` are the surface (keep the lightest mesh tone at 4.5:1 or better under `--bone`), one `--mesh-<group>` set of four tones per group darkest to lightest, `--budget` for the limit, `--mesh-mark` for the visitor's own marks. Group keys live in `GENRES` and `REGION` in the script; add a palette name to the list in `palette()` for each.
3. **Replace the entries.** Edit `ENTRIES` (id, title, maker, genre, rank, tris, model, plat, cut). Keep "what they cut" or its equivalent: the gallery's detail is the story of the limit.
4. **Tune the mesh.** `P` (screen pixels per mesh pixel), `S0` (cell size, 12 or 10 on phones), `AMP` and `FREQ` (noise relief), `JIT` (fixed relief per vertex), `K` (how far a raised vertex moves up the screen), `Lv` and `BANDS` (light and tone thresholds). Keep the canvas coarse: at `P` = 4 a 1440 by 2400 section is 360 by 600 mesh pixels and about 4,000 triangles.
5. **Retime or remove motion.** All durations are `--d-*` tokens. To drop the fold, delete the ScrollTrigger. To drop the load, delete the level-of-detail timeline and add `go` at once. Without any motion the still shaded mesh with its genre regions still carries the design.
6. **In a framework,** keep the `mesh` module as one object owning the canvas, render the cards from data, call `layout()` after every render, and port the motion branch as one effect returning the `gsap.matchMedia` cleanup.

| Token | Role |
|---|---|
| `--ground` | Chartreuse page ground, the untextured mesh's base tone |
| `--plate` | Card plates, control bar, rules panel and dialog surface |
| `--bone` | Text, focus rings, the pressed chip face and the play-later mark (6.9:1 on ground, 13.1:1 on plate) |
| `--lichen` | Secondary text, labels and field and button borders on plates (9.2:1) |
| `--seam` | Rules and empty budget slots on plates, decorative |
| `--budget` | Triangle counts and budget bars only (11.2:1 on plate) |
| `--racing`, `--platform`, `--horror`, `--puzzle` | One per genre: swatch, tag, dialog border, match strip (5.9 to 8.4:1 on plate) |
| `--mesh-ground`, `--mesh-<genre>`, `--mesh-mark` | Four flat tones each, darkest to lightest, read by the canvas |
| `--facet-lit`, `--facet-dim`, `--facet-lit-on`, `--facet-dim-on` | The two triangles of a hovered button, on an outline face and on a pressed (bone) face |
| `--scrim` | Dialog backdrop |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk |
| `--t-tiny` ... `--t-h2`, `--lh-body` | Type scale: 13, 14.5, 17, 21, 30, H2 clamp(46px, 7vw, 104px) |
| `--px`, `--s1` ... `--s7`, `--gut`, `--max-w` | Spacing in whole mesh pixels (4 to 96), side gutter, content width 1320px |
| `--tap`, `--hit` | Field height (48px) and minimum target (44px) |
| `--d-lod`, `--d-bounce`, `--d-facet`, `--breath` | Level-of-detail step, bounce hold, second-triangle delay, noise speed |
| `--tri-ul`, `--tri-lr`, `--strip-up`, `--strip-down` | `crispEdges` SVG masks for the button facets and the ribbon link |
