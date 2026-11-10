---
title: Demoparty winners gallery
section: gallery
subject: Rasterline, a demoparty held every Easter in Bergen, showing the twelve podium entries of its 2026 competitions (64k intro, 4k intro, Oldschool demo, Pixel graphics, Tracked music, Wild) with a filter by competition, a detail dialog for each entry and the entry rules for 2027.
aesthetic: An 8-bit home-computer display. A thick blue-violet border area around an opaque screen, copper bars that live in the border and show through the letters of the headline, seven bright hues that each mean a competition, a display face built from square modules and stills drawn as indexed pixels.
mode: dark
fonts:
  - Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, set at ELSH 2 and ELGR 1 so the modules are square. The H2 at 800, the greetings scroller and the dialog's entry title at 700, the place numeral on each tile at 700.
  - Host Grotesk (Google Fonts, variable wght 300-800). Everything you read, at 400 for body and 600 for buttons, chips, links, h3, tile titles, tags and dl terms, with tabular-nums for byte sizes, counts and rule figures.
js: Draws twelve procedural stills on small indexed canvases, positions six copper bars from the pointer, touch, scroll or focus and mirrors them into the headline's clipped background, moves a sine scroller from the scroll position, runs the load decrunch and bit-depth builds, and handles the filter and the entry dialog (which also work in plain JavaScript without the libraries).
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [gallery, demoscene, demoparty, retro, 8-bit, pixel, canvas, filter, dialog, copper bars, raster, pointer, scroll, dark, gsap, lenis, arcade series]
use_when:
  - A gallery of a dozen or so works that fall into a handful of categories, where each category can own a colour and the visitor filters by it.
  - The subject comes from home-computer, demoscene, chiptune, pixel-art or retro-game culture, so a border area, raster bars and limited palettes are its own vocabulary.
  - Each item has a small set of facts worth a detail view (platform, size, place) and external destinations to watch or download it.
avoid_when:
  - The works are photographs or real screenshots. The stills here are drawn by code at 96 x 64 pixels, and the bit-depth build only makes sense for indexed pixel images.
  - More than about eight categories. Each one needs a hue that reaches 4.5:1 on the screen colour and stays distinct from the others.
  - Calm, corporate or editorial brands, or a page that already has a pointer-following effect. The bars would fight it.
---

## Why it works

**The one bold idea: the page is the screen of an 8-bit home computer, and the copper bars live where that machine kept them.** On those machines the picture sat in an opaque rectangle and the border around it was the one area a program was not supposed to draw in, which is why demos drew raster bars there. The section is built the same way. `.party` is the border area, `.screen` is an opaque rectangle on top of it, and six horizontal bars (seven hard bands each, shade / mid / hue / light / hue / mid / shade, 35px tall) sit in a layer between the two. They are visible in exactly two places: the border all around the screen, and through the letters of the headline. The headline uses `background-clip: text` with a background made of the same six bars at the same Y values, so a bar seen in the left border at some height continues inside the type at that height and comes out in the right border. Where no bar is, the letters are plain text colour. The bars follow the visitor's Y position (pointer, finger, scroll, keyboard focus) as six springs with phases a sixth of a turn apart, so they weave around the pointer and change stacking order like a turning barrel. They never pass behind body text, because the screen is opaque.

- **Colour means competition.** The palette is wide (seven bright hues on a blue-violet ground) and every hue has one job. Cyan is 64k intro, orange is 4k intro, green is Oldschool demo, pink is Pixel graphics, violet is Tracked music, red is Wild. Each competition's hue is its filter chip, its tile tag, its tile frame on hover, its rule row, its dialog border and shutter, the 1-bit and 2-bit versions of its stills, and one of the six copper bars. Yellow is reserved for the primary action and for focus rings. The only places where the seven hues appear without that coding are diegetic: the letters of the greetings scroller, the cycling bands on the primary button, the decrunch stripes and the pixels of the stills, all of which are the machine showing its whole palette.
- **Contrast is computed.** The ground is a chosen blue-violet (#231C6B), not a tinted black. Every hue reaches 4.5:1 on it as small text (the weakest are red at 4.66:1 and violet at 4.92:1), ink text on a hue is 6.03:1 or better (active chips), and inside the headline even the outer band of the weakest bar stays at 3.05:1 for large display type. The ratios are in the token comments.
- **The stills are the work, not decoration.** Twelve classic effects (tunnel, plasma, metaballs, fire, rotozoomed checkerboard, raster bars, twister, voxel landscape, moire rings, sine dots, starfield, wire cube) are computed once on a 96 x 64 indexed bitmap from colours read from the tokens, and scaled up with `image-rendering: pixelated`. They do not animate on hover. Each canvas has `role="img"` and a label that says what it shows.
- **Bit depth is the reveal.** A still appears first in 1-bit (ink and its competition hue, ordered dither), then 2-bit (four steps of that hue), then its full palette, 120ms apart, staggered by grid column. The same build runs for tiles that a filter brings back and for the dialog's still. It is a change of colour depth at full resolution, so it is not the pixel mosaic used elsewhere in the collection.
- **The load is a decrunch.** For 0.8s the border is stripes of random heights in the seven hues, 14 stepped frames, while the screen is blank. Then one white frame in the border, and the whole screen is there at once. No paragraph fades in and nothing slides.
- **The scroller only moves when the page does.** The greetings line rides a sine wave; its horizontal position and the wave's phase are both functions of the scroll position, so it is not a marquee. It is `aria-hidden`, with the same sentence visually hidden next to it.
- **Content lives in the markup.** Each tile is a `<button>` that carries its entry in the DOM (title, group, competition, place) and in data attributes (platform, bytes, description, the name of its still). The script holds no copy.
- **No dead ends.** The primary button is an in-page anchor to the rules, and focus follows it to the rules heading. "Back to the winners" returns. The three external links (archive, capture, download) open in a new tab with `rel="noopener"` and a hidden "(opens in a new tab)". The dialog is a native `<dialog>` that closes with Close, Escape or a backdrop press and returns focus to the tile that opened it; Previous and Next (and the arrow keys) walk the entries of the current filter, and are disabled when the filter holds one entry.
- **Semantics.** This is a section, so the host page owns the `h1`. The `h2` is the first heading, "Winners by competition" and the rules are `h3`, and the dialog's `h2` sits outside the section because the dialog lives in the top layer. The chips are real buttons with `aria-pressed` in a labelled group, and a `role="status"` line reports the result of a filter.

**Arcade series.** This design belongs to the arcade series, a set of designs that share Handjet and Host Grotesk with cta-indie-game on purpose, at the owner's request, together with its flat pixel geometry and stepped motion. It differs from cta-indie-game in every other respect: that design is a night harbour with a lattice of cells that light under the pointer, one accent and one lamp colour, and a wordmark that rises as the page ends. This one has no lattice, no wordmark, no grain and no fill that grows from the pointer; it has a border-and-screen structure, horizontal bars that follow only the pointer's height, and seven hues with jobs.

**New to the collection:** copper bars that follow the pointer and show through clipped headline type; a sine scroller driven by scroll position; reveal by bit depth; a decrunch load in the border; colour cycling on a button with a label plate; a two-frame bit flip on filter chips; a letter sine ripple on text links; a dialog uncovered by two interlaced scanline shutters.

Deviations and known limits:

- **The headline animates `background-position`.** The series rule is to animate only transform, opacity, clip-path, filter and canvas pixels. The bars in the border follow it (whole-pixel transforms). The headline cannot: text can only be filled with a moving image through `background-clip: text`, so its six background layers are repositioned (and reordered when the stacking order changes) with whole-pixel values, and only when a value changed. The repaint is limited to the headline's box.
- **The white frame is in the border only.** The decrunch ends with one white frame in the border area while the screen stays dark, rather than a full-viewport flash, to keep the flashing area small.
- **The decrunch flashes.** Fourteen frames of saturated stripes in 0.8s is rapid flashing in the border area (about a third of a desktop viewport). It runs once, it is off under reduced motion, and `--d-crunch` and the frame count (14 in the script) slow it down or remove it. If your audience needs a stricter guarantee, cut it.
- **Chips are single-select.** One chip is pressed at a time; pressing the active competition again returns to All.
- **Twelve entries are split 3, 2, 2, 2, 2, 1** (first to third place for 64k intro, first and second for four competitions, first only for Wild), so the counts on the chips say something.

## Do not touch

- **The screen is opaque and above the bars.** `.copper` is `z-index: 0`, `.screen` is `z-index: 1` with a solid `--screen` background. If the screen becomes transparent, or content is placed in the border area, bars run behind text.
- **One set of Y values.** `paintBars(ys, order)` is the only place that positions bars. It sets each border bar's transform and z-index and the headline's `background-position` and layer order from the same numbers. The headline's layers are the border bars' own computed `background-image`, read in `measure()`. Do not style the two separately.
- **The headline's padding.** `.h2` has `padding: .06em 0` with a negative margin, because `background-clip: text` paints only inside the box and Handjet's caps reach the line box edge at this line height. Its `background-size` lists six bar layers and one full layer; keep it in step with the number of bars.
- **Bars are hard bands and whole pixels.** Seven bands of `--band` each, no gradient between them, positions rounded. The outer bands mix towards `--bar-shade` at 67% and 84% hue; going darker drops the bands inside the letters below 3:1 on the screen (red is the limit at 3.05:1).
- **Hue jobs.** Do not use yellow for a competition, and do not give two competitions the same hue. A chip's border, its count, its pressed ground, the tile tag and frame, the dialog border and the 1-bit bake all come from one `[data-comp]` rule that sets `--hue`.
- **Colour tokens are 6-digit hex.** The still renderer parses them (`rgb()` in the script) and mixes ramps from them. Canvas code takes no colour literals.
- **Stills stay still.** They are baked three times at load (1-bit, 2-bit, full) and only swapped. Do not animate them on hover.
- **Hidden states exist only under `html.js:not(.go)`,** and only until the decrunch ends. If the CDN is blocked the `js` class is never added: bars rest in the border and the headline, the greetings line is static, stills are full palette, and the filter and dialog run in the plain script above `if (!lib) return`.
- **Pixel corners are on `.face`, not on the link,** so the focus ring is not clipped. The label plate takes the screen colour on hover and focus; without it the label would sit on moving bands.
- **Accessibility.** The copper layer, the decrunch layer, the shutters and the split letters are `aria-hidden`; every split text has a visually hidden whole copy. Focus rings are 2px yellow on everything. Targets are at least 44px. Lenis is stopped while the dialog is open. Under `forced-colors` the headline drops its clipped background and uses `CanvasText`.

## Motion

House easing: there are almost no curves. Everything that moves in steps uses `steps(n)` or held keyframes (`steps(1, end)`), state changes are hard cuts, and one frame is 80ms unless a token says otherwise. The only continuous motion is the bars' spring (semi-implicit, stiffness 60 to 112, damping 11 to 17, a different pair per bar), and its output is rounded to whole pixels. Everything is built inside `gsap.matchMedia` (motion, reduce, fine pointer). Lenis runs on `gsap.ticker` with `autoRaf: false` and `lagSmoothing(0)`, and `lenis.on('scroll', ScrollTrigger.update)`. The decrunch waits for the fonts (`document.fonts.ready` plus Handjet 700 and 800, 1.5s timeout) and for a visible page. Button, chip, link and tile responses are CSS, so they also run when the CDN is blocked; they are switched off under reduced motion.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Decrunch | Border stripes: a strip of random-height hue stripes drawn once, jumped by a random whole offset per frame (transform only); screen content hidden | Load (fonts ready, page visible) | 0.8s, 14 frames; then one white border frame of 80ms; then a hard cut to the whole screen | None; everything is visible at once |
| Copper bars follow the pointer (signature) | Six springs towards anchor + amplitude x sin(phase), phases 60 degrees apart, stacking order from cos(phase); border bars by `translateY`, the headline by `background-position` of the same bars under `background-clip: text` | `pointermove` over the section (fine pointers); a still pointer over a scrolling page | Amplitude 76px (52px on phones), phase speed 1.7 rad/s, whole pixels | Bars rest: one in the top border, three through the headline, one beside the scroller, one in the bottom border |
| Bars, touch equivalent | Same | `touchstart` and `touchmove` set the anchor to the finger; while scrolling the bars keep the last viewport height | Same | Bars rest |
| Bars, keyboard equivalent | Same, gathered | `focusin` with `:focus-visible`: the anchor is the focused element's centre and the amplitude drops to 30% | Same | Bars rest |
| Bars before any input | Same | After the decrunch | The bars leave their rest places and weave through the headline | Bars rest |
| Idle bob | The same formula without the spring; bars jump to place | 1.4s after the last input, while the section is in view | Five frames a second (`--d-idle` 0.2s), phase speed 0.45 rad/s; stops off screen and while the dialog is open | Off |
| Sine scroller | Line `translate3d` in 2px steps; each letter `translateY(amp x sin(i x 0.42 - scroll x 0.013))` in 2px steps; letters take the seven hues in rotation | ScrollTrigger on the band, `clamp(top bottom)` to `bottom top`, `onUpdate` only (no time-based motion) | Bound to scroll; amplitude 22px (14px on phones) | A static line that wraps, same colours |
| Tiles enter by bit depth | Canvas swap between three baked images: 1-bit, 2-bit (ordered dither in the competition hue), full palette | IntersectionObserver per tile (bottom margin -10%), once | Three hard steps 120ms apart, 70ms later per grid column | Full palette at once |
| Filter chip: bit flip | Held keyframes: frame one inverted (`filter: invert(1)`) and one cell left, frame two one cell right, then rest; pressed chip takes its hue as ground with ink text | Click, on the chip that turns on and the one that turns off | 0.16s, two frames; colours change at once | Colours change at once |
| Filter chip hover and focus | Instant 4px bar of the chip's hue inside the bottom edge | Hover, focus-visible (unpressed chips) | Instant | Same |
| Filtered-out tiles | Frame one the still drops to 1-bit; frame two the tile is an empty frame; then `hidden` and the grid reflows at once (no Flip) | Filter change | Two frames of 70ms | Instant |
| Tiles a filter brings back | The bit-depth build, by column | Filter change, as each tile appears in view | As above | Full palette at once |
| Tile hover and focus | Frame takes the competition hue (border plus a hard 2px ring); the tag blinks twice with held opacity keyframes; no lift, no sibling change | Hover, focus-visible; touch gets the hue frame and an ink ground on `:active` | Blink 0.32s, four frames | Hue frame only |
| Primary button: colour cycling | A strip of seven hue bands translated up one band per frame (`steps(7)`), label on a screen-colour plate | Hover, focus-visible; on touch the bands show while pressed | 0.583s loop, 12 frames a second | Bands shown still, plate shown |
| Primary button press | Bands pause; the face inverts for one frame (`filter: invert(1)`, `steps(1, end)`) | `:active` | 80ms | Bands shown still |
| Outline buttons (Previous, Next) | Instant swap to text-colour ground and ink label; 2px drop on press | Hover, focus-visible, `:active` | Instant | Same |
| Text links: letter sine ripple | Each letter runs one sine cycle of eight held frames, 3px each way, delayed by its index; the 2px underline does not move | Hover, focus-visible; on touch once per tap | 0.24s per letter, the last letter starts 0.28s after the first, so any link takes about 0.5s | None |
| Dialog: interlace weave | Two shutters of alternating 4px scanlines (odd lines in the competition hue, even lines in the border colour) slide out left and right, `xPercent` with `steps(8)`; the still builds by bit depth behind them | Tile click or Enter; Close, Escape or a backdrop press runs it backwards, then focus returns to the tile | 0.35s each way; Lenis stopped while open | Instant open and close |
| Previous / Next entry | Hard cut of all text; bit-depth build on the still | Buttons, Left and Right arrow keys | Three steps of 120ms | Hard cut, full palette |
| Rules link | Lenis scrolls to the anchor; focus moves to the rules heading | Click | Lenis default | Native jump |

## Adapting

1. **Decide what the hues mean before anything else.** Rename the `--c-*` tokens to your categories and point each at one hue. Keep yellow (`--go`, `--focus`) for the action and focus. Update the `[data-comp="..."]` rules, the chips, the six `.bar` elements and the rule rows to the same keys. With fewer than six categories, remove bars (and the matching entries in `.h2.is-live`'s `background-size`, the `STIFF` and `DAMP` arrays and `REST`); the phase spacing is `Math.PI / 3` for six.
2. **Check every hue on the new ground.** Each must reach 4.5:1 on `--screen` as small text and carry `--ink` text at 4.5:1 for pressed chips. Then check the outer bar band (67% hue mixed with `--bar-shade`) against `--screen` for 3:1, since it passes through the headline. Record the ratios in the token comments.
3. **Replace the entries in the markup.** Each tile needs `data-comp`, `data-fx` (a key of `STILL` in the script), `data-place`, `data-platform`, `data-bytes`, `data-desc`, a canvas label, a title, a group and a tag. Update the counts on the chips by hand. The grid is 4 columns from 1024px and 2 below; titles of up to about 26 characters fit two lines on phones.
4. **Stills.** Each `STILL` function returns a palette (colours built from tokens with `mix` and `ramp`) and a 96 x 64 array of palette indices. To use real pixel art instead, decode it into the same shape (at most 16 colours) and keep `bake()`: it derives the 1-bit and 2-bit versions from luminance with a 4 x 4 ordered dither.
5. **Copy.** The H2 is two lines at 128px on desktop and three or four on phones; keep it under about 40 characters. The greetings sentence should stay near 100 characters so that scrolling the band through the viewport shows all of it. The rules block takes six to eight short rows.
6. **Retime or remove motion.** Durations are the `--d-*` tokens; `--bar-amp`, `--sine-amp`, `--band`, `--cyc` and `--scan` size the effects. Spring constants, phase speeds and the 1.4s idle delay are literals in the script. To remove the decrunch, call `go()` directly in the load promise. To keep the bars still, do not call `setMode` in `go()`; they stay at `restYs()`. To drop the scroller's motion, delete the ScrollTrigger in `go()` and the `html.fx .greets` and `html.fx .sine` rules.
7. **Fonts.** If Handjet fails, the H2 falls back to Arial Narrow and the bars still show through it. Any heavy display face works for the clipped headline; thin faces show too little of the bars.
8. **In a framework,** render the markup statically, run the plain flows once on mount, and port the motion layer as one effect that returns the `gsap.matchMedia` cleanup (it removes listeners and observers, kills delayed calls and tweens, destroys Lenis, restores full-palette stills and rests the bars).

| Token | Role |
|---|---|
| `--screen` | The screen: ground under all text, button plate, tile and dialog ground |
| `--frame` | The border area, band and rule dividers, the even-line shutter; decorative (1.47:1) |
| `--ink` | Text on bright fills, canvas black, the scroller band, the first step of every still ramp |
| `--line` | Tile and outline-button edges at rest (3.82:1) |
| `--text`, `--soft` | Text (12.68:1) and secondary text (7.71:1) |
| `--red` ... `--pink` | The seven hues; ratios on `--screen` and with `--ink` text are in the token comments |
| `--c-64k`, `--c-4k`, `--c-old`, `--c-pix`, `--c-mus`, `--c-wild` | Which hue each competition owns: chip, tag, tile frame, rule row, dialog border, low-depth stills, copper bar |
| `--go`, `--focus` | Yellow, reserved: the primary button face, and focus rings |
| `--scrim` | Dialog backdrop |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2`, `--t-title`, `--t-place`, `--t-greets`, `--t-greets-still` | Type scale: 14, 17, 21, 28, clamp(52px, 8.6vw, 128px); dialog title 44, place numeral 30, scroller 64 moving and clamp(26px, 3.2vw, 40px) static |
| `--lh-body`, `--lh-lede` | Line heights 1.55 and 1.45 |
| `--cell`, `--s1` ... `--s8` | The 8px cell and the spacing steps, 4 to 96 |
| `--frame-x`, `--frame-y`, `--pad` | Border thickness at the sides and at top and bottom, and the screen's padding |
| `--notch`, `--tap`, `--hit` | Pixel-corner step (4px), button height (48px), minimum target (44px) |
| `--band`, `--bar-h`, `--bar-shade`, `--bar-amp` | Copper bars: band height (5px, 4px on phones), bar height (7 bands), the colour the outer bands mix towards, the weave amplitude |
| `--greets-h`, `--sine-amp` | Scroller band height while it moves, and the wave height |
| `--cyc`, `--scan` | One colour-cycling band on the primary button (6px); one interlace line on the dialog shutters (4px) |
| `--d-frame`, `--d-crunch`, `--d-depth`, `--d-col`, `--d-drop`, `--d-cycle`, `--d-flip`, `--d-blink`, `--d-ripple`, `--d-ripple-span`, `--d-weave`, `--d-idle` | Durations: one frame, the decrunch, the bit-depth step and column stagger, a filtered-out frame, the button loop, the chip flip, the tag blink, the link ripple and its first-to-last letter delay, the dialog shutters, one idle-bob frame |
