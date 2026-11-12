---
title: Cartridge publisher site footer with a dust wordmark
section: footer
subject: "The site footer of Dust Jacket, a four-person publisher in Porto that makes and sells new games on cartridge for old consoles: nine titles on three hardware lines (8-bit, 16-bit, handheld), a makers' programme, a shop that ships worldwide, a signup for release emails, socials and the legal row."
aesthetic: "Dust on a shelf at dusk. A dusty-mauve ground, a darker well for the name, the name itself made of about 4,500 flat dust specks that a breath blows away and that walk home in whole pixels, column titles stuck on like paper labels, buttons that are cartridges seated in a slot with gold contact fingers, and three hardware-line hues used only where a line is named."
mode: dark
fonts:
  - "Handjet (Google Fonts, variable wght 100-900, ELSH 0-16, ELGR 1-2). Display only, at ELSH 2 and ELGR 1 so its modules are square: the stub's h2 at 700, and the source the DUST JACKET wordmark is sampled from at 800 (also its text fallback)."
  - "Host Grotesk (Google Fonts, variable wght 300-800). Everything else: body at 400, links and titles at 500, labels, chips, buttons and column plates at 600-700, tabular figures in prices, dates and the shipping table."
js: "Samples the wordmark from Handjet 800 into about 4,500 canvas specks that the pointer, a drag, a tap, a gust button, link focus and a sent form blow away and that walk home, settles the word feet first as the footer scrolls in, sticks the column titles on once, and runs the signup form, the shipping dialog and the press states in plain JavaScript (nothing is sent)."
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [footer, publisher, cartridge, shop, canvas, particles, wordmark, pointer, scroll, dialog, form, dark, gsap, lenis]
use_when:
  - A site footer for a maker, shop or label whose name can carry the page's last moment as a big wordmark, with a catalogue, help links and one signup.
  - The brand has a physical product with a tactile vocabulary (slots, labels, sleeves, contacts) that buttons and states can borrow.
  - The page above is calm and the footer can be the one place with a canvas effect.
avoid_when:
  - The page already runs a pointer or canvas effect nearby. Two fields that answer the pointer fight each other.
  - Very long brand names (above about 14 letters). The specks thin out and the word stops reading at a glance.
  - Light, corporate or editorial brands. The mauve ground and pixel display face are loud by design.
---

## Why it works

**The one bold idea: the name is dust, and you can blow it off.** The footer's top band is a darker well, and DUST JACKET is drawn across its full width in flat square specks (3px on a 6px grid at 1440, 2px on a 3px grid on phones; 4,500, 3,540 and 3,970 specks at 1440, 1024 and 390 wide). Their home positions are sampled from Handjet 800 on an offscreen canvas, one speck per grid cell where the letter has ink, with the grid pitch chosen so the word holds about 4,600 specks at any width. Moving the pointer across the word is a breath: every speck within 70px of the pointer's path is blown along the direction the pointer is moving (with up to 0.55 rad of scatter either side), harder near the path and on faster strokes. A speck slows under drag, hangs for a moment, then walks home one whole-pixel step per frame (a quarter of the way, at least one pixel, on each axis). The word is the publisher's name, and dust on a shelf of cartridges is the publisher's world. Everything else in the footer is quiet.

- **Not another lit-cell or pointer field.** cta-indie-game lights cells in a wake and never moves them; contact-hackerspace pings from a point; gallery-demoparty draws bars that follow the pointer. Here nothing lights and nothing follows: the specks themselves are displaced along the stroke's direction (not pushed radially), leave the word legibly torn, and rebuild it by walking back on the pixel grid. The scroll moment (the dust settling) is also unlike cta-indie-game's rising name: specks fall from above the well, each a whole number of rows above home, lower rows landing first, so the name builds from its feet upward, and scrolling back lifts it again.
- **The loop sleeps.** The dust loop runs on `gsap.ticker` at 30 frames a second only while some speck is away from home or a gust is crossing, and stops when the well leaves the screen (IntersectionObserver). The scroll settle redraws once per scroll update and needs no loop.
- **Equivalents.** Touch: a drag blows along the drag, a tap is one round puff (radius 64px). Keyboard: "Blow the dust off" sends one gust, a front that sweeps the well left to right in 0.9s and blows every speck it passes; focusing any footer link puffs the part of the word above it (radius 48px), so tabbing through the columns visibly disturbs the name over each column. A sent form fires one gust, held until the word is on screen if it is not.
- **Colour has a job, and only one.** The ground is a chosen dusty mauve (#3B2731), its deeper shade is the well and the scrim. Sleeve (#F6ECEF) is the paper: text, and the labels text is printed on (the column plates, the confirmation's end label). Dust (#BFA8B4) is everything dusty: secondary text, rules, resting links and the specks, with one darker tone (#8C7380) for three specks in ten and the dialog spine. The three line hues (teal, orange, periwinkle) appear only beside the line they name: catalogue pips, the line chips, the field's end label and the confirmation's stripe. Gold (#F2C94C) is the edge connector, what you touch: the primary button, the contact fingers and every focus ring. Light red is errors only.
- **Every control is a cartridge part.** Buttons are cartridges seated in a slot: on hover and keyboard focus the face lifts 4px in two steps, showing six gold contact fingers above the slot line; a press seats it 1px past rest, the fingers vanish under it and the face inverts, held at least 140ms. The email field's focus cuts the keyed corner of a cartridge shell into its top-left (4px, then 8px), and its end label (the strip on a cartridge's end) shows the chosen line in that line's hue. The confirmation is that end label filled in: "This one goes to" and the visitor's address on a ruled line, under the line's stripe. The shipping dialog is pulled out of a sleeve.
- **Labels stuck on, once.** There is no load sequence at the top: the stub is simply there. The first time the columns scroll into view, the five column titles are stuck on left to right, 80ms apart, each shown for one frame as a hollow plate and then as the filled paper label.
- **Links shed dust.** At rest links are dust-coloured with a 1px underline. On hover or focus the text cuts to sleeve, the line to 2px, and three 2px specks fly off its right end, up and to the right, in three 60ms frames (about 8px), then vanish. A tap shows it for at least 200ms.
- **Structure and copy.** The page is a short stub (an h2 and two paragraphs about Tidewater Run, the newest 16-bit release; the first heading in the document) taller than the viewport, so the footer has to be scrolled into. The footer is `<footer aria-labelledby>`; its h2 is the wordmark (Handjet text under the canvas, transparent once the dust is drawn, so the name is still the accessible heading). Column titles are h3, line groups h4. Every link goes somewhere real: in-page anchors (#newest, #signup, #about, #top) or real origins and mailto addresses in a new tab with a hidden "(opens in a new tab)". The catalogue lists all nine titles with stock and price; only Tidewater Run has a page here, so only it is a link.
- **Forms and dialog.** The signup is `novalidate` with specific messages ("This address needs an @ and a domain, like rita@example.com.", "Choose a line: 8-bit, 16-bit or handheld."), `aria-invalid`, `aria-describedby`, reserved error lines and focus on the first bad control; each error clears as soon as its value is valid. Success replaces the form with the end label, moves focus to its heading, and "Use a different email" brings the form back with the values kept. "Shipping and returns" is a native `showModal()` dialog with a six-row table of regions, costs and days, closable by Close, Escape or a backdrop press that started on the backdrop; Lenis stops while it is open and it scrolls inside itself on short screens.

Deviations from the brief, and why:

- **The spine carries a row of pips, not vertical text.** At 10px wide, "Dust Jacket" set vertically would be 7px type; the brief allows pips, and they read as the punched spine of a sleeve.
- **The keyed corner is a single square cut.** "A stepped notch ... in two steps (4px, then 8px)" is built as one square bite that grows in two steps, with the border following it (a rim and an inner layer share the same clip), so the corner reads as a keyed shell corner rather than a staircase.
- **The settle scrub ends when the well is fully on screen** (start "top bottom", end "bottom bottom"), so the word is complete wherever the visitor stops with it in view, including 1366x650.
- **Short windows show the stub first.** The brief asks for a stub tall enough that the footer must be scrolled into; at 1366x650 and 1280x600 the first screen is the stub, and the whole well fits in view once scrolled to (checked at both sizes).

## Do not touch

- **Home positions are a whole-pixel grid.** `P` (pitch) and `S` (speck size) are integers and every home sits on the grid; walking home snaps to whole pixels. Soft subpixel positions or round specks turn the dust into a generic particle cloud.
- **Blow along the stroke, not away from the pointer.** `blow()` uses the pointer's direction of travel and speed, measured between events less than 120ms apart. Radial push is reserved for the tap and focus puffs.
- **The loop only runs while something is away from home,** and never off screen. Do not add an idle drift.
- **The settle lifts by whole rows.** `lift = ceil(fall * (1 - (p / land)^2))` with `land` from 0.30 (bottom row) to 0.95 (top row); rows above the well are not drawn. Keep lower rows landing first.
- **The h2 is the accessible name.** The canvas is `aria-hidden`; the Handjet text beneath it goes transparent only once the dust is drawn (`.is-drawn`). Without JavaScript the text is the wordmark.
- **Pixel corners live on `.cart-face` and `.cart-in`, never on the `<a>`/`<button>`,** and the field's cut lives on `.fld`, with the focus ring on `.field` outside it, so no ring is clipped.
- **Line hues stay with their line.** If you add a line, add a hue and use it only for that line's pip, chip, end label and stripe.
- **Hidden states exist only under `html.js:not(.go)`** (the column plates while the fonts load). With the CDN blocked nothing is hidden, the word is drawn at rest, and the form and dialog work in plain JavaScript; the gust button stays hidden because nothing would move.

## Motion

House stepping: everything moves in whole pixels and `steps()`; the dust runs at a visible 30 frames a second; colour changes are instant. Built inside `gsap.matchMedia` (motion, reduce, fine pointer). Lenis runs on `gsap.ticker` with `autoRaf: false`, `lagSmoothing(0)` and `lenis.on('scroll', ScrollTrigger.update)`; touch keeps native scrolling. The labels wait for the fonts (`document.fonts.ready` plus a Handjet load, 1.5s timeout) and a visible page (`visibilitychange`). The cleanup removes listeners, the ticker functions, the IntersectionObserver, the ScrollTrigger and Lenis, and redraws the word at rest.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Dust breath | Canvas specks, blown along the stroke | pointermove over the well (mouse, pen) | Radius 70px around the path segment; impulse min(1700, speed x 0.85) px/s x (1 - d/70) x 0.55-1.15, scatter +-0.55 rad; drag e^(-4.5t); still below 20px/s; hang `--d-rest` 0.3s x 0.5-1.1; walk home a quarter of the gap (at least 1px) per axis per frame; 30fps (`--d-frame`) | Off; word at rest |
| Touch drag | Same breath | touchmove on the well | As above, from the drag's direction and speed | Off |
| Tap puff | Radial puff | touchend within 500ms and 10px of touchstart | Radius 64px, 650px/s, scatter +-0.35 rad | Off |
| Gust | A front sweeps the well | "Blow the dust off" (click, Enter, Space, tap); a sent form | `--d-gust` 0.9s from -70px to the right edge + 70px; each speck it passes gets 420-840px/s, angled up 0.18 rad +-0.4 | Button hidden; no gust |
| Focus puff | Radial puff | focusin with :focus-visible on any footer link | Radius 48px, 460px/s, at the link's x, 30% of the cap height above the word's foot | Off |
| The dust settles | Rows fall into place, scrubbed | ScrollTrigger on the well, top bottom to bottom bottom | Each speck is ceil(fall x (1 - (p/land)^2)) whole rows above home; land 0.30 (bottom row) to 0.95 (top row); scrolling back lifts it | Word at rest |
| Labels stuck on | Class swaps | First time #cols reaches 88% of the viewport, once | Five plates, `--d-plate` 80ms apart: one 80ms frame as a hollow 2px plate, then filled | Labels shown |
| Cartridge lifts | CSS transform | :hover (hover devices), :focus-visible | Face -4px, `--d-lift` 0.12s steps(2, start); six gold fingers show above the slot line | Instant lift |
| Cartridge seated | CSS state, held by script | pointerdown, Enter or Space keydown | Face +1px, fingers hidden, face inverted, no transition; held at least `--d-press` 0.14s after release | Same, instant |
| Link specks | Pseudo-element keyframes | :hover, :focus-visible, `.is-tap` (touch, at least `--d-tap` 0.2s) | Text to sleeve, underline 1px to 2px (instant); three 2px specks in three frames over `--d-specks` 0.18s, steps(1) per frame, about 8px up-right, then gone | Colour and line only |
| Field keyed corner | Registered custom property in clip-path | :focus-within on the email field | Cut 0 to 4px to 8px, `--d-notch` 0.12s steps(2, start); edge to sleeve; end label fills with the chosen line's hue; invalid closes the cut, edge to fault | Instant |
| Line chips | Instant state | change | Checked chip fills with its line's hue; end label text updates | Same |
| Out of its sleeve | CSS keyframes (with the motion layer) | "Shipping and returns"; Close, Escape, backdrop | Panel slides from behind the 10px spine in four 25% steps, `--d-sleeve-out` 0.24s steps(4, start); back in three, `--d-sleeve-in` 0.18s steps(3, start); then focus returns to the opener | Instant |
| Success label | Instant swap + gust | Valid submit | Form replaced by the end label with the line's stripe and the address on a ruled line; focus to the heading; one gust across the word (held until the word is on screen) | Instant swap, no gust |

## Adapting

1. **Find your dust.** The effect is right when the brand's name can plausibly be disturbed: dust, sand, pollen, snow, type in a tray. Rename the button to match ("Blow the dust off"). If nothing about the subject is disturbable, use a still wordmark instead.
2. **Map the colours, keeping their jobs.** `--shelf` is the ground and `--well` its deeper shade (also `--scrim`). `--sleeve` is text and label paper, `--dust` and `--dust-dim` are the specks (and secondary text and rules), `--contact` is only what you touch and focus, `--fault` only errors. Give each product line its own hue and use it only where that line is named.
3. **Replace the name.** Change the h2 text and the `words` in `build()` (one line, and the two-line split used under 640px). Set `--mark-em` to the word's ink width in em at Handjet 800 (3.9 for DUST JACKET, 2.24 for JACKET), so the h2's box and the canvas agree. `TARGET` (4,600) sets the speck count; the pitch follows from the ink area.
4. **Tune the breath.** `R` (70px), `DRAG` (4.5), `GAIN` (0.85), `MAXV` (1700), `SCATTER` (1.1 rad), `WALK` (0.24) and `GUST_V` (700) are constants at the top of the dust module; times are the `--d-*` tokens.
5. **Retime or remove motion.** Every CSS and script duration is a `--d-*` token. To drop the settle, delete the ScrollTrigger and leave `progressOf` at 1. To drop the labels, delete the plates block and the `html.js:not(.go)` rule. The word still blows.
6. **In a framework,** render the markup statically and port the script as one effect that returns the `gsap.matchMedia` cleanup.

| Token | Role |
|---|---|
| `--shelf` | Ground: page, fields, chips, dialog panel, shelf text on paper and on line hues |
| `--well`, `--scrim` | The shelf in shadow: the wordmark's well; the dialog backdrop |
| `--sleeve` | Text (11.95:1 on shelf), column plates, the end label's paper |
| `--dust`, `--dust-dim` | Secondary text, rules, resting links, link specks, the slot line; the specks in two tones (dust 6.23:1 on shelf and 7.41:1 on the well; dust-dim 3.82:1 on the well, decorative) |
| `--line-8`, `--line-16`, `--line-h` | One hardware line each: pips, chips, end label, confirmation stripe (8.61, 7.00, 7.23:1) |
| `--contact` | Primary button, contact fingers, focus rings (8.70:1) |
| `--fault` | Error text and invalid edges (6.30:1) |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk with fallbacks |
| `--t-small` ... `--t-h2`, `--lh-body` | Type scale: 14, 15 (plates), 16, 20, clamp(44px, 6.4vw, 92px) (40px on phones); body line height 1.55 |
| `--mark-em` | The wordmark's ink width in em, used to size its box |
| `--cell`, `--s1` ... `--s8` | An 8px cell; spacing 4 to 96 in half and whole cells |
| `--edge-min`, `--max-w` | Side gutter (24px, 16px on phones) and content width (1344px) |
| `--notch`, `--cut`, `--tap`, `--hit` | Stepped corner (4px), keyed field corner (8px), field height (48px; a cartridge is 50px), minimum target (44px) |
| `--d-*` | Every duration CSS or the script uses: lift, press, tap, specks, notch, plate, sleeve out and in, dust frame, rest, gust |
