---
title: Magnetic keyboard features over a sheet of iron filings
section: features
subject: Nordpol Keyworks, a two-person workshop on Skansen quay in Tromsø that hand-builds Hall-effect (magnetic-switch) keyboards for retro computers and arcade play, forty at a time. The Needle 64 (NOK 2,890) and the Lodestone Pad (NOK 1,640), six features, a spec sheet and a reservation for batch 7.
aesthetic: Iron filings combed on a sheet of fjord-cyan card. Thousands of 7px pixel needles that can point only in eight directions, barely visible at rest; a north-pole coral and a south-pole lilac that appear only on needles a magnet is holding; six feature cards that are bar magnets bending the field around themselves.
mode: dark
fonts:
  - Handjet (Google Fonts, variable). Display only, at ELSH 2 and ELGR 1 so its modules are square. The H2 at 700, the card figures, the spec sheet title and the dialog titles.
  - Host Grotesk (Google Fonts, variable 300-800). Everything else, body at 400, h3 at 650, buttons, labels and table headers at 600; tabular figures in the figures, table and prices.
js: Draws a canvas field of eight-direction needles combed by curl noise and bent by six card dipoles, turns them one 45° step per tick toward the pointer, touch or focused control (a monopole whose face flips on click), the hovered or focused card (three times stronger) and the scroll's direction of travel, and sleeps when nothing turns; runs the reservation dialog, its form and the north-up success.
libraries: [GSAP 3.15, Lenis 1.3.26]
tags: [features, hardware, keyboard, hall-effect, magnet, iron-filings, flow-field, canvas, pointer, dialog, form, dark, gsap, lenis]
use_when:
  - A hardware or physical product whose working principle is a field, force or flow (magnets, wind, current, light), so the background can be that principle answering the visitor.
  - A features section of four to eight short, concrete claims, each with one figure, and a spec sheet the cards can point into.
  - Brands that want a calm page at rest and a vivid one only where the visitor is.
avoid_when:
  - Pages that already run a pointer or canvas effect nearby; two fields fight.
  - Long-form reading next to the field. The needles are masked under text blocks, but a page of prose wants a quiet ground.
  - "More than about eight cards in view: each card is a magnet, and too many dipoles turn the comb into noise."
---

## Why it works

**The one bold idea: the page is a sheet of iron filings, and every key on a Nordpol board is a magnet.** Behind the section lies a field of short pixel needles, one per 16px cell (12px on phones). A needle can only point in eight directions, 45° apart, and it has a 2x2 north tip so its direction reads. At rest the sheet is combed: a seeded curl-noise flow, biased left to right, gives every needle a resting direction, and the six feature cards are bar magnets (north pole near their top edge, south near their bottom) whose dipole fields bend the comb into loops around them. Nothing moves until something disturbs the sheet: the pointer, a finger, the scroll, keyboard focus, or a sent form. Then the needles turn one 45° step per 40 ms tick, the short way round, toward what the new field says, and turn back the same way when it is gone. The loop exists only while a needle is turning.

- **Colour is the pole, not the pointer's position.** Resting needles are two fjord tones at 1.5:1 and 2.0:1, barely there. A needle takes a hue only when a live magnet (the pointer, a focused control or the active card) dominates its field by more than 0.8 times the comb, and only once it has finished turning: coral if the pole holding it is a north pole, lilac if it is a south pole, in two quantized steps (weak, strong at 2.5 times the comb). The coloured patch is therefore shaped by competition with the comb and the cards, ragged and bent, never a disc around the cursor. It is a field you read, not a light that follows you, and the legend in the page says so.
- **The pointer is a fridge magnet with two faces.** South face out by default: needle tips turn toward the pointer and go lilac. Click or tap the sheet (or press **Turn the magnet over**) and the north face is out: every held needle swings 180° in four visible steps and goes coral. A status line says which face is out. The magnet's field falls off as 1/d² and is cut at 420 px, so needles far away stay exactly still and the loop sleeps.
- **Cards are fixed magnets; the active one pulls harder.** Hovering, focusing a card's link, or tapping a card makes its dipole three times stronger: the loops around it widen, the needles near its top go coral and near its bottom go lilac, and the card's own north and south edges thicken to 6px in those hues. Keyboard focus on a card is that card's magnet; focus on any other control in the section puts a pointer-strength magnet at its centre.
- **Scroll jolts the sheet.** The scroll speed tilts every needle's field toward the direction of travel (down while scrolling down), so the comb visibly leans and then settles back, one step per tick, as the speed decays (x0.72 per tick). It reads like tapping the edge of a sheet of filings.
- **The ground.** `#08566A` fjord cyan, hue 192°, saturation and lightness well above `contact-privacy-helpdesk`'s deep teal `#073B3A` (178°, much darker) and greener than `process-convoy-night`'s petrol blue `#0B3350` (205°). It is the sound outside the workshop under the polar night.
- **Hue jobs.** `--fjord` ground; `--deep` card, table and dialog faces and the ink on light faces; `--rim` rules; `--needle`, `--needle-hi` resting needles; `--ice` text, the main button and focus; `--frost` secondary text and outlines; `--north` and `--south` only for poles (held needles, the button's pole caps, card edges, the legend, the compass in the field); `--warn` only errors. Coral north and lilac south follow the old convention of painting a magnet's north end red.
- **Words.** The copy is the workshop's: "Keys that ride on magnets", "Nothing inside to wear out", "Reserve from batch 7", "Email for the bench note". Every card has one figure in Handjet and a link to its own row of the spec sheet (`:target` marks the row), so the claims are checkable.
- **Different from its neighbours.** `cta-indie-game` is the inspiration: a field that answers only where disturbed, flat, quantized, sleeping when idle. Its field is light (cells that brighten and decay in a wake); this one is direction (needles that rotate and hold, with no decay and no trail). `features-cyberdeck-kit` is the other features section: there, pulses travel along PCB traces and blocks fall with scroll; here nothing travels, and its keycap button is deliberately not repeated (the button here is a horseshoe magnet).

Deviations from the brief, and why:

- **Needles under text blocks are not drawn.** The lede, the action row, the control row, the cards, the spec sheet and the footer line mask their cells (4px margin), so coloured needles never sit under body text. The H2 keeps the field behind it: Handjet at 100px stays far above AA against a 2px needle.
- **Click to flip only on the sheet itself.** Clicks on links, buttons, fields and cards keep their own meaning; a click anywhere else in the section flips the face. The button is the keyboard and screen-reader equivalent.
- **The touch magnet lingers 0.5 s after lifting**, so a tap shows the needles turning before they go back.

## Do not touch

- **Eight directions and one step per tick.** `quant` snaps every field vector to 45°, and `step` turns each needle one step the short way per `--d-tick`. Smooth angles or a lerp turn this into a generic flow-field animation.
- **Hue only when held and aligned.** In `step`, a needle shows `tone[i]` only when `cur === tgt`; while it turns it is a resting needle. In `aim`, a tone needs the live field to beat 0.8 times the comb. Lowering that threshold, or colouring by distance, turns the field into a glow that follows the pointer, which the collection never uses.
- **Cards are dipoles, not repellers.** North pole 12px inside the top edge, south 12px inside the bottom, 1/d² each, `L = min(150, width x 0.4)`. The loops around the cards are the picture; a radial push would just clear a hole.
- **The loop sleeps.** `tick` returns false once no needle is turning, nothing is leaning and no wave is running; the IntersectionObserver cancels the frame off screen. Pointer moves only set `need` and wake it; `aim` runs at most once per tick.
- **Masking.** Every `[data-calm]` and `[data-card]` element masks its cells. New text blocks inside the section need `data-calm`.
- **Stepped corners live on `.btn-face` and the card**, never on the `<button>`, so focus rings are never clipped.
- **Hidden states exist only under `html.js:not(.go)`** (cards before the load), and `js` is added only when GSAP and Lenis loaded and motion is allowed. With the CDN blocked the field still runs in plain JavaScript, every card is visible and the dialog and form work.

## Motion

House stepping: hard cuts on a visible clock (40 to 120 ms), `steps()` and `visibility` in CSS, `gsap.timeline().call()` frames for sequences. The field runs on its own `requestAnimationFrame` loop that ticks every `--d-tick` and stops when nothing turns, so it works without the CDN. Lenis runs on `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`) and is stopped while the dialog is open. The load waits for the fonts (raced with 1.5 s) and a visible page.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Comb settles (load) | Every needle set to a random direction, then the loop turns each one step per tick toward the comb | Load, after fonts and a visible page | At most four ticks (0.16 s) | Combed from the start |
| Cards switch on (load) | Each card cut in (`visibility`) and its dipole added to the field | After 0.2 s | One card every `--d-card` 0.12 s; the field bends around each as it arrives | All on from the start |
| Pointer magnet | Monopole at the pointer, 1/d², cut at 420 px; needles turn one 45° step per tick the short way; hue once aligned | Pointer move (mouse, pen) over the section; touch: touchstart and touchmove, lingering `--d-release` 0.5 s; keyboard: a focused control's centre | `--d-tick` 0.04 s per step; a full reversal is four steps | Off; the sheet is still |
| Turn the magnet over | Polarity sign flipped; every held needle reverses in four steps and changes hue | Click or tap on the sheet (not a control or card); the button; status text updated | Four ticks | Button hidden; the legend stays |
| Active card | Its dipole x3; card edges 2px to 6px in north and south hues (CSS) | Hover (mouse), focus inside the card, tap on the card | Field: one step per tick; edges: instant | Edges only, instant |
| Scroll jolt | A global vector toward the direction of travel, scaled by speed (cap 1.6), decaying x0.72 per tick | Scroll | Leans while scrolling, settles in about ten ticks | Off |
| Button pole caps | Two 10px caps (north left, south right) revealed by `clip-path: inset()` from the bottom, `steps(2, end)` | Hover (fine pointers), focus-visible, press | `--d-cap` 0.1 s | Instant |
| Button keeper | Class `is-down` held at least `--d-hold` 0.14 s: a 6px keeper bar across the bottom joins the caps, the face drops 2px | Pointer down, Space or Enter | Instant on, released after the hold | Bar only, no drop |
| Link filings | `::after` masked with three 6x4 SVG tiles: 45° slashes, flat dashes, solid; keyframes swap them `steps(1, end)` | Hover (fine), focus-visible, press (touch) | Slashes, flat at 40% of `--d-link` 0.1 s, then solid | Solid at once |
| Field compass | An SVG needle in the field turned `--turn x 45°`, no transition | Every input: one step per character added (back one per character removed); points north, tip coral, tail lilac, when the address is valid | Instant per keystroke | Same (a state) |
| Dialog domains | Twelve domains (4x3) cover the panel, each with an arrow at a random direction; arrows step toward north; the domains vanish | Reserve from batch 7 | Four frames `--d-domain` 0.07 s apart, then the content (0.35 s); closing: one scattered frame, then gone (0.14 s) | Instant |
| Success: north up | Rows of the visible sheet forced north (tone strong north), from the bottom of the view up; then released to the comb | Valid submit | Rises over `--d-wave` 0.5 s, holds `--d-north` 1.2 s, then needles step back | Confirmation text only |
| Error | Text in a reserved line, warn outline on the field | Blur with an invalid address, submit | Instant; cleared as soon as it is valid | Instant |

## Adapting

1. **Find the field in the product.** The needles must stand for something real: magnetic, wind, current, attention. Keep the eight directions, the comb, the hue-only-when-held rule and the sleeping loop; change what the poles mean and rename the two pole hues.
2. **Map the palette, keeping the jobs.** Ground plus a deeper face tone and a rim; two resting needle tones at about 1.5:1 and 2:1; text and secondary text; two pole hues (at least 3:1 on the ground, used only on poles); one error hue. `makeSprites` reads the tokens, so no script change is needed.
3. **Cards.** Four to eight. Each `[data-card]` is a magnet automatically; each needs one figure, a short claim and a link to its row in the spec sheet (`#spec-*`).
4. **Tune the field** in the script: `sc` (noise scale, 1/260), the comb bias `(.75, .15)`, `Q_MAG`, `L_MAG`, `R_MAG`, and the card multiplier (`2 *` extra, so x3 total). Larger pitch (`--pitch`) means fewer, calmer needles.
5. **In a framework,** keep `field` as a module with `build`, `aim`, `step`; rebuild on resize (ResizeObserver), call `aim` on input, and run the tick loop in one effect that returns its cleanup.

| Token | Role |
|---|---|
| `--fjord`, `--deep`, `--rim` | Ground; card, table and dialog faces and ink on light faces; rules (ice on fjord 7.7:1, on deep 11.6:1) |
| `--needle`, `--needle-hi` | A resting needle's body and north tip (1.5:1, 2.0:1; decorative canvas) |
| `--ice`, `--frost` | Text, main button face, focus ring (7.7:1); secondary text and outlines (5.5:1) |
| `--north`, `--north-lo`, `--north-hi` | North pole only: strong and weak held needles, tips, N cap, card north edge, compass tip (3.9:1 non-text; 5.8:1 on deep) |
| `--south`, `--south-lo`, `--south-hi` | South pole only, the same jobs (5.2:1; 7.8:1 on deep) |
| `--warn` | Errors only (6.4:1; 9.5:1 on deep) |
| `--scrim` | Dialog backdrop; light enough that the success wave shows behind it |
| `--font-display`, `--font-text`, `--modules` | Handjet (ELSH 2, ELGR 1) and Host Grotesk |
| `--t-tiny` ... `--t-h2`, `--t-fig`, `--lh-body` | Type scale: 13, 14.5, 16.5, 19, 21, figures clamp(34px, 3vw, 44px), H2 clamp(46px, min(6.4vw, 11vh), 100px) |
| `--s1` ... `--s7`, `--gut`, `--max-w` | Spacing on an 8px step (half the pitch), side gutter, content width 1280px |
| `--pitch` | One needle per cell: 16px, 12px under 600px; the script reads it |
| `--notch`, `--cap`, `--tap`, `--hit` | Stepped corner (4px), pole cap width (10px), button and field height (48px), minimum target (44px) |
| `--d-tick` ... `--d-release` | Every duration CSS and the script use |
