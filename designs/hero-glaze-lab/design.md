---
title: Glaze lab triaxial
section: hero
subject: Witness Cone, an independent ceramics studio that sells cone 6 glaze recipes, each with its fired test tile.
aesthetic: Quiet raw-porcelain studio chrome around a real triaxial glaze blend drawn as 21 fired test tiles.
mode: light
fonts:
  - Alegreya Sans 400, 500, 800 (Fontsource via jsDelivr; the Google build drops lining figures)
js: A short script turns tile buttons into in-place picks, computing the picked tile's colourant additions from the triaxial formula and rewriting the recipe beside the triangle, and runs an in-page cart (add, remove, place demo order) plus dialogs for the cart, recipe list and test notes; nothing navigates away or posts to a server.
tags: [hero, ceramics, craft, shop, colour-blend, data-as-visual, progressive-enhancement]
use_when:
  - The product is a set of variants that come from mixing two or three ingredients (glazes, paints, dyes, inks, coffee blends, alloys) and the result is visual.
  - Visitors choose by result, not by name, and every variant can be bought on its own.
  - A craft or maker shop that wants a hero showing the work's real test record instead of lifestyle photography.
avoid_when:
  - The catalogue has no natural three-way mix. A triangle of arbitrary swatches is a colour picker in costume.
  - The variants are not visual, or there are only a handful of them.
  - The brand needs a photo-led or dark, high-drama hero.
---

## Why it works

**The bold idea is the triaxial blend.** Potters test colourant combinations by laying out tiles in a triangle: one corner per colourant addition, every tile in between a weighted mix. The hero draws exactly that, with the real maths, and lets the visitor pick a tile and see its full recipe beside it, ready to add to the cart. Rows A to F run top to bottom, positions 1 to n run left to right, and for row `r` (0..5) and position `k` (0..r) the weights are copper `(5-r)/5`, cobalt `(r-k)/5` and rutile `k/5`. Corner amounts are copper carbonate 3%, cobalt carbonate 1% and rutile 6%, so tile D2 is copper 1.2, cobalt 0.4 and rutile 1.2. The structure is the information: the triangle shape tells a potter what they are looking at before they read anything.

- **The triangle leads.** At 1200px and up it takes five of twelve columns and tiles grow to 76px, while the headline is capped at 3.75rem, so the eye lands on the blend first and the headline supports it.
- **Tiles drawn as tiles, not swatches.** Each is a 3:4 standing rectangle with a 3px slab radius. The bare foot is warm buff (`--body`, the colour B-Mix 5 fires to), not the page grey. The glaze layer stops at an uneven dip line that varies from tile to tile, thins to a lighter break over the top and side edges, and darkens where it pools above the dip line. The small hanging hole shows the page through a 1px ring of pooled glaze. The tile code sits on the foot, where a potter writes it in underglaze pencil.
- **Saturated corners, honest middle.** 1% cobalt is a deep blue and 3% copper a vivid green in a glossy cone 6 base; the centre tiles (E3, F3, F4) go grey and brown in oklab, the way a real blend muddies. That contrast is what a potter recognises.
- **Colour is computed in CSS.** Each tile carries `--a` (copper's share of the copper+cobalt mix) and `--c` (rutile share). The glaze is `color-mix(in oklab, color-mix(in oklab, copper var(--a), cobalt), rutile var(--c))`; pool and break are that glaze mixed toward `--tenmoku` and `--body`.
- **Pick in place.** Each tile is a real button, so no pick can lead to a missing page. The script derives `r` and `k` from the tile's visible code, computes the additions from the formula, and rewrites the title, surface note, additions (zero rows dropped), hidden cart value and button label. The picked tile gets the tenmoku ring and `aria-current="true"`; the readout is `aria-live="polite"`.
- **The cart is the strongest action, and it works in place.** "Add tile D2 to cart, $6" is the one filled button on desktop, with the price in the label. Adding updates "Cart (n)" in the nav and shows "Tile D2 added. 1 in cart. View cart" under the button. The cart opens in a native `<dialog>` (focus trapped, Escape and Close return focus to the opener) with Remove, "Place order" and "Keep browsing"; placing an order clears the cart and confirms in the same dialog, stating that the demo charged nothing. The form never posts: it handles `submit` in JS, so it cannot return a 405 on static hosting. "Browse 140 recipes" is the quiet outline style there, and becomes filled on phones, where the recipe sits far below.
- **Recipe in potter notation.** The 20×5 base totalling 100, then "+" additions on top, with a one-line surface description, because a flat CSS tile cannot show gloss or breaking. No card, no shadow: plain text on porcelain with two slip rules, the table capped at 20rem so names and amounts stay paired.
- **Quiet chrome.** Porcelain #ECEEEA (cool grey-green, deliberately not cream) and tenmoku #2E2420 (a brown iron black, not #111). The glazes are the only saturated colour on the page; actions are tenmoku, not blue or terracotta.
- **One humanist family.** Alegreya Sans is calligraphic enough to feel made by hand and plain enough for a recipe table. Prose keeps its oldstyle figures; tile codes, corner labels, amounts and the price use lining tabular figures.
- **Copy from the potter's side.** The headline is about the real cost of an untested recipe: mixing a bucket. The lede adds facts the headline does not: cone, atmosphere, three clay bodies, and that the tile ships with the card.
- **Removed accessory:** the corner labels had glaze-colour chips. They repeated the corner tiles sitting right next to them, so they were cut.

- **No dead ends.** "Recipes" and "Browse 140 recipes" open a dialog listing the 21 tiles of blend 14 (picking one fills the recipe and focuses that tile). "Firing notes" and "Read how we test" open a four-step test note. "Test tiles" is an anchor to the triangle (`#blend`). The same dialog styling serves all three panels, so the extra UI stays one small, quiet system.

## Do not touch

- The weight formula and the corner amounts. If you change a corner amount, update the script's three amounts and recompute every tile's `aria-label` and the default readout from the formula. Never edit numbers by eye.
- The `--a`/`--c` values per tile. `--a` = `(5-r)/(5-k)` as a percentage (50% on F6, where it does not matter because rutile is 100%), `--c` = `k/5`.
- Every control keeps its in-page result. Do not turn a button back into a link to `recipes`, `cart` and the like unless that route exists. Dialogs must keep a visible Close button and the opener focus return.
- Tile codes: the script reads row and position from the visible code (letter A–F, digit 1–6). Keep that format or the picks compute the wrong recipe.
- Tile anatomy: 3:4 ratio, glaze to `--foot` (78%) with an uneven dip line, a break over the top and side edges, pooling above the dip line, a small hole ringed in pool colour, a buff foot. Do not add drop shadows, gloss highlights, hover lift or scale.
- Glaze tokens colour only the tiles. Do not use them in buttons, links or text.
- The triangle is the only centred thing. All prose is left aligned and ragged right.
- The shared top line: `text-box: trim-start cap alphabetic` on the h1, apex label and readout h2, with every column aligned to the start, so all three first lines start at one height.
- Tile targets stay at least 40×53px, and row F must fit its column at every width (`--tile-w` is clamped from the `.blend` container width with `cqi`).
- Accessibility: each tile's `aria-label` starts with its visible code ("D2 recipe: copper carbonate 1.2%, cobalt carbonate 0.4%, rutile 1.2%"), so label-in-name holds. Zero colourants are left out, as on a recipe card. The focus ring is a 3px tenmoku outline offset 6px, and the picked ring is a box-shadow so the two never fight.
- Figures: `lining-nums tabular-nums` on tile codes and table amounts, so the decimals line up. This needs the Fontsource build; Google's build of Alegreya Sans ignores `lnum` and leaves 1 looking like ı. Do not swap in a monospace font to "fix" figures.

## Adapting

1. Change the three `--glaze-*` tokens to your three corner ingredients, then rewrite the corner labels, the script's amounts, every tile's `aria-label` and `data-note`, and the default readout from the weight formula. The generator logic is short: loop `r` 0..5 and `k` 0..r and print one `<a class="tile">` per tile.
2. For a 4-row blend (10 tiles), use weights over 3 instead of 5 and change the `6` and `5` in `--tile-w` to 4 and 3. Keep the triangle: it is the point.
3. Keep the chrome neutral. If your page colour changes, pick the subject's own neutral (paper, raw cotton, bare metal) and keep text a chosen dark, not #000 or #111. Set `--body` to the fired colour of your clay.
4. Copy: the headline names the buyer's pain in the trade's own words, the lede gives the test conditions, the caption states the blend as a plain sentence, and each tile's note describes the fired surface. Keep them about this length. The headline has `text-wrap: balance` and a 12ch max-width; a much longer one needs it raised.
5. Layout: three columns at 1200px and above (copy 4, triangle 5, recipe 3). From 760 to 1199 the copy and recipe stack in the left half and the triangle sits on the right. Under 760 everything stacks, and "Test tiles" and "Firing notes" drop out of the nav.
6. The cart, recipe list and test notes are in-page demos. To connect a real shop, replace the `submit` handler and `Place order` step with your checkout, and keep a visible fallback result for failures. Prices live in the `PRICE` constant and the button label.

| Token | Role |
|---|---|
| `--porcelain` | Page background, tile hanging hole, ring gap around the picked tile |
| `--slip` | Recipe table rules |
| `--body` | Fired clay colour of each tile's bare foot, and the mix target for the glaze break |
| `--tenmoku` | Text, buttons, focus ring, picked-tile ring, pooling mix target |
| `--oxide` | Secondary text: corner labels, caption, firing date, totals, hover |
| `--glaze-copper` | Apex corner glaze (copper carbonate 3%) |
| `--glaze-cobalt` | Bottom-left corner glaze (cobalt carbonate 1%) |
| `--glaze-rutile` | Bottom-right corner glaze (rutile 6%) |
| `--font` | Alegreya Sans with humanist sans fallbacks |
| `--fs-display` | Headline, fluid 2.5rem to 3.75rem |
| `--fs-wordmark` | Wordmark in the nav |
| `--fs-lede` / `--fs-body` | Lede 22px (19px on phones), body 18px |
| `--fs-readout-title` | Picked tile title |
| `--fs-small` | Nav and recipe rows |
| `--fs-caption` | Corner labels, caption, firing date, "Fired tile and recipe card" |
| `--fs-tile-code` | Code written on each tile's foot |
| `--s-1` … `--s-9` | Spacing scale, 4px to 112px |
| `--gutter` | Page gutter and grid gap (32px, 16px on phones) |
| `--measure-max` | Content width (1240px) |
| `--tile-w` / `--tile-h` / `--tile-gap` | Tile size (3:4, fitted to the triangle's column, max 76px) and spacing |
| `--foot` | Dip line: how far down the tile the glaze reaches |
| `--tile-radius` | Soft edge of a cut slab (3px) |
| `--button-radius` | Button corners (2px) |
