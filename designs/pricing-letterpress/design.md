---
title: Card in cross-section
section: pricing
subject: An interactive quote builder for wedding invitations and business cards at Quarry Lane Press, a fictional letterpress print shop.
aesthetic: Letterpress job shop. Press-bed grey ground, warm rubber-base black for text and checked controls, Pantone Reflex Blue only on the total and the button, a Fell-type display and an engineering drawing of the card cut edge-on.
mode: light
fonts:
  - IM Fell English (Google Fonts), H2 and the quote total only
  - Work Sans 400 and 600 (Google Fonts), everything else, tabular numerals in the docket
js: Reads the form, recalculates the itemised quote, and redraws an inline SVG of the card cut edge-on (the printed line in outline above, sheet thickness, bite depth, ink, edge paint, show-through) with a tween that reads --dur.
tags: [pricing, quote-builder, configurator, interactive, svg, print, letterpress, stationery, itemised, form]
use_when:
  - The price is built from a few physical choices (material, thickness, finish, colour count) and the buyer cannot see what they are paying for in a flat mock-up.
  - Craft or manufacturing businesses that quote per job, such as letterpress, foil, bookbinding, screen print, laser cutting, signage, packaging, bespoke paper goods.
  - You want an itemised quote, so people can see what each choice costs, rather than a headline price.
avoid_when:
  - Fixed plans or subscription tiers with no configuration. Use a plan table.
  - The product has no meaningful physical section, or more than about six choices. The drawing stops explaining.
  - A checkout flow that needs payment, addresses or files. This is a quote step only.
---

## Why it works

**The bold idea: the card drawn edge-on at a stated magnification.** A full-width SVG strip shows the sheet cut through the printed line "Ada & Tom", at 80x on desktop and tablet and 40x on phones (the caption states which). 300gsm is 0.45 mm, 600gsm is 0.9 mm (72px at 80x), duplex is 1.8 mm (144px) as two pasted layers with the back in its own colour. The impression appears as trapezoid bites in the top surface, kiss 0.02 mm, standard 0.12 mm, deep 0.3 mm (24px at 80x), with the chosen ink lying on the floor of each bite. Edge paint colours the two cut ends. Deep on 300gsm pushes bumps out of the underside (`bump = max(0, bite - 0.4 x caliper)`). A face-on mock-up cannot show weight, bite depth or show-through, and those are exactly what the shop charges for. The drawing is the largest thing in the section; the H2 is set at `--t-xl` so it does not compete.

- **The bites come from real type.** The printed line is set above the strip in Work Sans 600, in outline, at the same magnification (a 2.5 mm em, about 7pt, so 200px at 80x). The script draws that line to a one-pixel canvas at the cut height (0.12em above the baseline, under the A's bar and through the bowls) and reads the stems straight off the scanline, so every bite sits exactly under the stem that made it. A dashed line marks the cut. Only whole words that fit are shown (never a dangling "&"). Phones show the first word and crop the letters at the x-height to keep the sticky bar short. Ink is assigned per word, cycling through the chosen plates. Blind plates leave an empty bite.
- **Show-through is taught where it is seen.** When deep meets 300gsm, the caption under the strip changes to the fix ("Deep impression on 300gsm pushes through to the back. Choose 600gsm or duplex to keep the back flat.") in `--ink`, and a 1px leader drops from the first bump to it. The Impression fieldset keeps a short pointer to the drawing.
- **The sheet rests on the bed.** Its bottom edge is fixed and it grows upward, with the letters riding on its top. On desktop the SVG reserves the duplex height so the form never jumps. On phones the sticky bar follows the sheet.
- **Price is a job ticket, not a hero.** The docket on `--paper` lists only lines that cost money, one line each ("Plates, 2 colours", "Paper and printing ×100", "Deep impression", "Gold edges"). One `--furniture` rule above the total marks the sum. The total is in IM Fell at `--t-xl` with the per-card price under it. Amounts use Work Sans `tabular-nums`. Cents appear only when some line has cents, so a column is never mixed. On desktop the docket is sticky beside the controls.
- **Every option shows its cost in one right-hand column.** Paper "$2.40 a card", impression "Included" or "$0.35 a card", inks "$95", edges "$40 + $0.60 a card" or "Included". Paper names lead with weight ("600gsm Lettra"), the number the drawing turns into thickness.
- **Controls stay quiet.** Native radios and checkboxes, restyled as plain rows: control, optional colour swatch, name, price, description. Checked radios and the quantity segment are rubber black with a bed-coloured inner ring; checked checkboxes carry a tick, so the one multi-select (inks) does not look like single-select. No cards, tiles or shadows, 2px radius.
- **The palette comes from the press room, and avoids the cream default.** A cool press-bed grey ground rather than the cream, serif and terracotta default; Lettra white only for the paper and the docket; a warm rubber-base black (not blue-black, not #111); and Reflex Blue, a letterpress staple, used only for the total and the button, so the accent is never confused with the customer's navy ink.
- **Type from the shop's lineage.** IM Fell English keeps the ink spread of Fell type, used only for the H2 and the total. Work Sans draws on early Stephenson Blake and Miller & Richard grotesques, the job-shop faces.
- **Phones keep the effect in view.** Below 760px the strip plus "$565 for 100" and "0.9 mm, 600gsm, 40×" is `position: sticky`. The script writes the bar height into `--sticky-h` and `html { scroll-padding-top }` uses it. Verified by focusing every control forwards and backwards at 390x844 and 360x640, in the default, duplex, 300gsm-deep and business-card states: no control was hidden under the bar.
- **Motion only answers a choice.** Thickness, bite, bumps and the letters' position tween in JS over `--dur`. Ink, back, edge and glue colours and opacities use CSS transitions. `prefers-reduced-motion` makes both instant.

## Do not touch

- **The stated scale.** Thickness, bite, edge and the letters are in millimetres times one scale factor. Never exaggerate one option to make it read better. The single deliberate exaggeration is the ink film (3px at any scale, clamped so it never rises above the surface). The width of the strip is not to scale and the copy never claims it is. If you change the factor, the caption changes with it (it is generated).
- **Bites derived from the type.** Do not hand-place bites. If you change the face or weight of the printed line, the scanline re-derives them.
- **The show-through rule** and its sentence under the strip. It is a direction, not a block: the combination is still allowed.
- **One accent.** Reflex Blue is the total and the button only. Checked controls and focus rings are `--ink`. Ink, edge and paper colours are content data in the script (`INK`, `EDGE`, `BACK`, `PAPER`), not theme tokens; keep the navy ink (#2B3550) greyer than Reflex.
- **IM Fell for two things only:** the H2 and the total (and the phone bar's total, which repeats it). Its old-style figures make quantities and prices ambiguous (100 reads as "Ioo").
- **One rule in the docket**, above the total. No rules between lines and no border round the docket.
- **Accessibility wiring:** the section and the form are labelled by the H2. Every group is a fieldset with a legend. The SVG has `role="img"` and an `aria-label` rebuilt on each change. The docket total is `aria-live="polite"` and atomic. The caption (including the show-through sentence), the measurement and the ink note are polite live regions. The phone bar's total is `aria-hidden` because it duplicates the docket. Control outlines and the drawing's lines use `--graphite` (about 4.6:1). Under `forced-colors` checked controls switch to `Highlight`.
- **The 760px breakpoint** is shared by the CSS and by the script's `matchMedia` (scale 80x or 40x). Change both together.
- **The default job** (100 invitations, 600gsm, navy and sage, deep, gold edges) must total $565 ($5.65 a card). A `console.assert` checks the price model, and the static HTML shows the same numbers.

## Adapting

1. Change the `:root` tokens. Keep the ground a mid-light neutral that the paper colour stands out against, and keep `--graphite` at 4.5:1 or better on it.
2. Replace the content tables in the script: `JOB` (quantities, prices in cents, the printed `line` and its caption `cap`), `PAPER` (caliper in mm, face colour, label), `BITE` (depths in mm), `INK`, `EDGE`, `BACK`, `PLATE` and `EDGE_SETUP`. `TYPE_MM` sets the size of the printed line; `CUT_EM` sets the cut height. The static HTML shows the default quote so the page reads correctly before the script runs; update those numbers too.
3. For another craft, keep the idea of one physical section drawn to a stated scale and swap what it shows. For foil, draw the foil as a raised layer. For screen print, show ink deposit height. For laser cutting, show kerf and material thickness. Write a new `draw()`, but keep the rest of the structure: tween numbers, CSS for colours, the caption stating the scale.
4. Copy length: option names should stay short (weight or name only) with detail in the description line, because the price column takes the right edge. Docket labels should fit one line at about 300px.
5. Layout: at 1180px and wider the form has four tracks: product and quantity (`--col-a`, 12.5rem) | paper and impression | inks and edges | the sticky docket (1.15fr). Below that it is two columns with the docket beside inks and edges. On phones it is one column (`.col` becomes `display: contents`, so one `--s-6` gap governs every fieldset) with the sticky bar. Cut options, not columns: paper sizes, foil, envelope liners and a printed back are real upsells, but they would dilute the drawing. Add them as further fieldsets only if each one changes the drawing.
6. Wire the form's `submit` handler (it currently calls `preventDefault`) to the shop's proof-request endpoint, and keep the button label "Request a proof".
7. Fonts load with `display=swap` and no metric-matched fallback. The H2 reflows once on swap; the drawing re-reads its stems when Work Sans arrives (`document.fonts.load`).

| Token | Role |
|---|---|
| `--bed` | Page ground, press-bed grey; also the sticky bar, the inset ring inside checked radios, and the fill of the outline letters |
| `--paper` | Docket surface, button text, checked quantity text |
| `--ink` | Body text, checked controls, focus ring, the show-through sentence and leader, button hover; warm rubber-base black |
| `--graphite` | Secondary text, option prices, descriptions, control outlines, sheet outline, letter outlines, cut line |
| `--reflex` | The one accent: the total (docket and phone bar) and the button |
| `--furniture` | The docket's sum rule and swatch rings |
| `--f-display` | IM Fell English with an old-style serif fallback stack, used for the H2 and total only |
| `--f-text` | Work Sans with a grotesque fallback stack; the script also reads it to set the printed line |
| `--t-sm` … `--t-xl` | Type scale, ratio 1.25 on 16px; `--t-xl` is the H2 and the total |
| `--lh-tight`, `--lh-snug`, `--lh-body` | 1.1 for Fell, 1.35 for legends, descriptions and the button, 1.55 for body (also used to centre controls on the first text line) |
| `--track-display` | -0.01em on the H2 |
| `--measure` | Intro measure, 60ch |
| `--s-1` … `--s-9` | Spacing 4, 8, 12, 16, 24, 32, 48, 72, 112px; section padding `--s-9` (phones `--s-7`); `--s-8` separates the drawing from the form |
| `--max` | Content width, 1200px; the strip spans it exactly |
| `--col-a` | Width of the product and quantity track on desktop |
| `--radius` | 2px, on controls, quantity segments and the button |
| `--control`, `--swatch` | Radio and checkbox size; colour swatch size |
| `--stroke`, `--hair` | Control outline width; 1px lines (drawing, rules, segments) |
| `--tick` | Checkbox tick as a data URI (its stroke repeats `--paper`, since a data URI cannot read tokens) |
| `--dur` | 240ms, CSS transitions in the drawing and the JS tween (the script reads this token) |
| `--sticky-h` | Set by the script to the phone bar's height and used for `scroll-padding-top` |
