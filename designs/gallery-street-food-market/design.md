---
title: Roller-shutter stall gallery
section: gallery
subject: The stall gallery for Wharf Street Night Market (fictional), 18 street food stalls in the old tram depot yard at 40 Wharf Street, Hull, open Fridays and Saturdays 5 to 11pm, April to October, filterable by cuisine so visitors know which pitches to walk to.
aesthetic: The depot yard after dark. Wet granite setts for the ground, chalk name boards, cool steel roller shutters, and seven painted awnings carrying all the colour. Sign-writer condensed capitals for names and pitch plates.
mode: dark
fonts:
  - Mohave 700 (Google Fonts), condensed sign-writer display for the H2, the stall name boards and the shutter pitch plates
  - Onest 400/600 (Google Fonts), body, chips, aisle and dialog headings, meta, prices (tabular figures, tnum confirmed in the Google build)
js: Builds the stall fronts, cuisine chips, live count and menu dialog from the STALLS array, runs the shutter roll-up once when the stalls first come into view, and pulls shutters down over stalls that do not match the chosen cuisine; nothing is sent anywhere.
libraries: []
tags: [gallery, filter, food, market, street-food, map, wayfinding, inline-svg, dialog, radio-chips, dark, simple]
use_when:
  - A place with fixed physical spots (market pitches, festival stands, fair booths, food hall counters) where filtering should also tell people where to go.
  - A gallery of 8 to 30 vendors or exhibitors with one category to filter on and a short menu or detail each.
  - No photography yet, or mixed-quality photos: the drawn fronts carry the page and real photos drop into the same frame.
avoid_when:
  - The order of items means nothing. Shutters in place only pay off when position is information; use a reflowing filter instead.
  - Several filters at once (diet, price, open now). One radio group is the whole interaction.
  - Light, daytime or premium-retail brands. The night yard and painted awnings are the point.
---

## Why it works

**The one bold idea: choosing a cuisine is closing time for the rest of the market.** A corrugated roller shutter comes down out of its box under the canopy over every stall that does not match, one after another in pitch order. The matching stalls stay lit where they really stand, so the filtered gallery is also a map: "2 Korean stalls, at pitches 1 and 11" and you can see pitch 1 is by the gate and 11 is down the middle. Nothing reflows, because pitch numbers are real wayfinding.

- **Closed stalls still read as a market.** The shutter covers the front from under the canopy, never the canopy itself, so a filtered desktop view is a row of coloured awnings over steel fronts, not a grey grid. Each shutter carries a plate in sentence case: "Pitch 4" and "Khachapuri Club, Georgian".
- **Phones fold, and keep their order.** Under 600px a shut stall folds to a 56px strip that shows the bottom edge of its valance, the shutter box and the plate on one line. The shutter lands first, then the stall folds; going back, it unfolds, then the shutter rolls up. A filtered list stays short and still in pitch order.
- **Colour comes from the awnings.** The ground is wet granite setts at night (#2A2329, a red-violet dark chosen to sit at least Delta-E 8 from every other dark ground in the collection). There is no accent colour. State is shown in chalk: the selected chip is a chalk fill, and focus is a chalk ring with a ground-coloured gap, so it still shows on the chalk chip. The only warm light is the bulb.
- **The lamp replaces the hover lift.** Pointing at or focusing a stall lights its bulb (#FFF1D2 with a drop-shadow glow), throws a faint beam onto the counter and frames the stall. Nothing moves. `:focus-visible` and `:active` give the same state, and no information is shown only on hover.
- **Name boards are fixed chalk plates** with ground-coloured text, so contrast holds on any awning colour.
- **Structure is true.** Two aisles with H3s ("Along the depot wall, pitches 1 to 9", "Down the middle, pitches 10 to 18") because those are the two walks in the yard. Pitch numbers are the only numbering. No eyebrow, no middle dots, no arrows.

Deviations from the approved plan, and why:

- **Fonts and palette changed per the art director**: Mohave and Onest replace Bricolage Grotesque; the sodium amber accent is gone and the blue-grey ground moved to warm granite.
- **Onest has no width axis**, so the aisle and dialog headings are Onest 700 at normal width rather than wdth 87.5.
- **No overshoot on the shutter's bottom bar.** The 360ms gravity curve lands cleanly in the frames, with no clipping through the counter, so the fallback was not needed.
- **"All stalls take cards" lives once, in the info line.** The dialog adds "Takes cards." after the diet note for people who open a stall directly.
- **Removed accessory: the dark shade band across the top of every canopy.** It read as a seam, not shade, and repeated 18 times.

Contrast (WCAG): chalk on setts 12.4:1, chalk on kerb 10.1:1, concrete on setts 6.6:1, concrete on kerb 5.3:1, chalk on shutter 5.0:1, chalk on shutter rib (plate backing) 5.9:1, setts on chalk (name boards, selected chip) 12.4:1.

## Do not touch

- **The shutter starts under the canopy.** `.shut-area` begins at `--canopy` (20cqw, which is 80 of the drawing's 400 units). If you change the canopy depth in `drawStall`, change the token with it, or the shutter will cover the awnings or leave a gap.
- **Transform only for the shutter.** The fold (`grid-template-rows` 1fr to 0fr) is the only layout transition, and it exists only under 600px.
- **Two classes, two jobs.** `.down` lowers the shutter. `.shut` adds the fold and goes with `inert`. The load roll-up uses `.down` alone, so it never folds the phone layout or makes stalls inert. Neither class is ever in the markup, so a script failure never hides content.
- **Shut stalls are `inert`.** The keyboard skips them and the live line names the open pitches. Do not replace `inert` with `aria-hidden` only.
- **The chips are real radio inputs** in a fieldset with a legend, so arrow keys and Space work natively and they never navigate.
- **One native dialog**, opened with `showModal()`. Back to the stalls, Escape and a backdrop click all close it, and focus returns to the stall button.
- **The stall's name button is stretched over the card** with `::after`, so the whole stall is one target with one accessible name. Drawings are `aria-hidden` because the name, cuisine and dish are real text.

## Motion

Simple tier: CSS transitions, and a script that only toggles classes and `inert`. One ambient moment.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Shutters roll up (the one ambient moment) | CD5 adapted (state in place, no reflow) + LD8 | The depot-wall grid first enters the viewport (IntersectionObserver, once, bottom 15% excluded) | translateY 0 to -101%, 480ms cubic-bezier(.2,.7,.2,1), delay pitch index x 22ms, done in about 0.86s; a chip chosen first cancels it | Skipped, stalls render open |
| Shutters come down or go up on a cuisine choice (signature) | CD5 adapted + MI3 | Radio change by click, tap, arrows or Space | Close 360ms cubic-bezier(.5,0,.75,0); open 480ms cubic-bezier(.2,.7,.2,1); stagger 16ms x pitch index; live line updates with no animation | Instant swap |
| Shut stall folds to a 56px strip (under 600px) | CD6 | Same change | Fold 400ms cubic-bezier(.625,.05,0,1) after the shutter lands; unfold 300ms, then the shutter rises 200ms later | Instant |
| Chip hover, press, checked, focus | MI1 + MI3 | Hover (hover devices), press, change, focus-visible | Hover fill 150ms ease-out; press scale .96 in 120ms, release 350ms cubic-bezier(.34,1.56,.64,1); checked chalk fill 150ms | Colour only |
| Stall lamp lights | Own (replaces a hover lift) | Hover, focus-visible, :active | Bulb fill, glow and beam opacity, frame outline, 200ms ease-out; nothing moves | Kept (no movement) |
| Menu dialog | CD7 | Stall button; Back to the stalls, Escape or backdrop to close | Opacity 0 to 1 and scale .98 to 1, 280ms cubic-bezier(.2,.7,.2,1) via @starting-style; backdrop 200ms; close 160ms ease-in with allow-discrete (instant where unsupported); full-screen sheet under 600px | Fade only |
| Back to the stalls | MI1 | Hover, press | Fill kerb to shutter 150ms; press .96 | Colour only |
| Open in maps | HV2 | Hover, focus-visible | Underline grows from the left, leaves to the right, .07em, 400ms cubic-bezier(.35,0,0,1) | Static underline (also on touch) |
| Scroll | none | none | No reveals, no parallax, native scroll | none |

## Adapting

1. **Data.** Edit `STALLS` at the top of the script. Chips, counts, cards, the live line and the dialog are all built from it. `canopy.a` and `canopy.b` name `--awn-*` tokens; `valance` is scallop, zigzag, flat or tassel; `prop` is griddle, pot, wok or tray. To use real photos, set `photo: 'https://.../pitch-07.jpg'`; the stall then shows an `<img alt="">` cropped to the same 4:3 frame, and the name board overlay and shutter still work.
2. **Places.** The two aisles are split at pitch 9 (`s.pitch <= 9` and `aisleOf`). Rename the H3s and the "from the gate" phrasing to your own walks (rows, halls, floors). Nine per aisle makes clean 3x3 blocks; other counts work but leave a ragged last row.
3. **Address.** The address is fictional and the "Open in maps" link searches OpenStreetMap for the street and town. Replace both with a real place, or a pinned map URL.
4. **Colours.** Change `--setts`, `--kerb`, `--chalk` and `--concrete` together and recheck contrast; keep the shutter steel cool against a warm ground (or the reverse) so closed stalls read as metal. Swap the `--awn-*` paints freely; the chalk name boards keep contrast whatever they are.
5. **Copy length.** Stall names up to about 18 characters fit the board on one line at 3 columns; longer names wrap. Plates in the 56px phone strip fit about 32 characters of "Name, Cuisine".
6. **Retime or remove motion.** `--d-open`, `--d-close`, `--stagger` and the `--ease-*` curves drive the shutters; the roll-up stagger (22ms) is set by the script. To remove the roll-up, delete the IntersectionObserver block; the filter still works. To remove the phone fold, delete the `.shut .fold` and `.shut .body` rules; shut stalls then keep full height.

| Token | Role |
|---|---|
| `--setts` | Page ground, name-board and selected-chip text, focus-ring gap |
| `--kerb` | Ground strip under each stall, dialog, chip hover |
| `--chalk` | Text, name boards, selected chip, focus ring |
| `--concrete` | Secondary text, chip borders, the unlit bulb |
| `--shutter`, `--shutter-rib` | Shutter steel, slats, shutter box and plate backing |
| `--lamp` | The lit bulb, its beam and the hover frame |
| `--scrim` | Dialog backdrop |
| `--awn-*` | Awning paints, chosen per stall in `STALLS` |
| `--art-wall`, `--art-iron`, `--art-top`, `--art-food` | Drawing-only colours inside the stall |
| `--font-sign`, `--font-text` | Mohave and Onest with fallbacks |
| `--fs-0` ... `--fs-4`, `--fs-display`, `--fs-board` | Major-third type scale; board drops to `--fs-2` under 600px |
| `--sp-1` ... `--sp-8`, `--gutter`, `--maxw`, `--gap` | 4px-based spacing, page gutter, width, grid gap |
| `--canopy`, `--strip` | Where the shutter starts (20cqw), folded strip height (56px) |
| `--d-open`, `--d-close`, `--stagger`, `--ease-*` | Shutter timings and curves |
