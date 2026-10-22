---
title: Patched panel
section: features
subject: Halde Instruments, a two-person Eurorack maker, presenting Crease, a 10 HP analogue wavefolding oscillator, on its product page.
aesthetic: A module on a warm case dark. A true-proportion PCB front panel in green soldermask with ENIG gold jack rings and silkscreen legends, patched to the feature list with colour-coded cables that sag under gravity.
mode: dark
fonts:
  - Sofia Sans 400/500 (Google Fonts), body, specs, link
  - Sofia Sans Condensed 600-700 variable range (Google Fonts), feature titles and in-text panel names 600, jack labels 650, panel silkscreen 700
  - Sofia Sans Extra Condensed 800 (Google Fonts), section headline
js: Measures each patched panel jack and each feature socket at every width, then draws an SVG patch cable between them (a hanging cable from 760px up, nested lanes on phones); redraws on resize and after fonts load.
tags: [hardware, synthesizer, eurorack, diagram, svg, cables, dark, product, connections]
use_when:
  - A hardware product whose features map one-to-one onto physical inputs, ports, controls or connectors (synth modules, audio interfaces, pedals, dev boards, network gear).
  - Three to five features, each of which can be named by the exact label printed on the device.
  - The audience already knows the vocabulary (jacks, ports, pins) and wants to see what each one does.
avoid_when:
  - Software or services with nothing physical to point at. Cables to abstract icons would be decoration.
  - More than five features. Cables start to tangle and the lane on phones runs out of room (each cable takes 8px).
  - A light, airy brand. The idea depends on bright cables and gold reading against a dark page and a dark panel.
---

## Why it works

**The one bold idea: the section is patched.** A 10 HP front panel is drawn in SVG at real Eurorack proportions (viewBox 50.5 × 128.5 mm), and four patch cables run from four of its jacks to the four features. Every feature is physically tied to the jack that delivers it, so the reader learns the panel and the features in one look. Cable colour carries meaning, as it does in a real case: blue carries control voltage (FOLD CV, SYM CV, 1V/OCT), pink carries audio (SINE OUT). The colour key under the intro states it once.

- **The panel is laid out for the patch.** Under the FOLD knob sits a 2 × 4 field at 16 mm pitch. The left column holds TUNE, SYMMETRY, SYNC and FOLD OUT. The right column, nearest the features, holds the four patched jacks in feature order: FOLD CV, SYM CV, 1V/OCT, SINE OUT. So every cable leaves the panel's right edge in the same order its feature appears, and no cable crosses another cable, a jack, a legend or the outputs box.
- **Every mark is true.** The panel is `10 * --hp` wide and its height follows from the mm viewBox, so it always has a real 3U:10 HP ratio. The HP ruler under it is exactly the panel's width; its end marks are the ruler's own 1.5px side borders. Seven ticks around the FOLD knob bound its six fold stages, which the first feature talks about. The gold box around FOLD OUT and SINE OUT is the real panel convention for outputs. Rail holes are oval, as on real panels.
- **Materials on the object, a chosen dark around it.** The page is a warm brown-black (`--case` #231A15), chosen instead of #111 so the green panel and gold read warm. The panel is matte green soldermask because small makers have their panels made as PCBs. Text and legends are silkscreen ink. Gold appears only as ENIG, exposed gold-plated copper, and only where there is copper: the panel's jack rings, rail holes and outputs box, and the feature sockets, which act as jacks. The ruler, link underline and focus rings sit on the page, so they use silk, never gold.
- **One superfamily in three widths.** Hardware legends are condensed technical grotesques, so Sofia Sans' width range does the work: Extra Condensed 800 for the headline, Condensed for titles, jack labels and the panel silkscreen, regular width for reading. Panel names quoted in running text (`.legend`) are set in the condensed face at 0.9em in silk, so they look like the silkscreen they quote. Specs use tabular figures, not a monospace face, one spec per line.
- **The panel is the only loud object.** Feature text sits straight on the page with no cards, icons or numbers. Each feature is identified by its printed jack name, centred above a small socket in its left margin exactly as the panel prints names above jacks, because the features are parallel, not a sequence.
- **Cable craft.** Each cable is a 5px round-capped stroke plus a 1.5px white-at-30% stroke offset 1px up as a rubber sheen, with a plug disc at both ends drawn after all cables so plugs always sit on top. From 760px up the cable leaves the jack level (the stiff plug boot) until just past the panel edge, then hangs: the second control point sits `s` below the chord, with `s = clamp(0.12 × length, 24, 110)px`, so slack grows with the cable's length. A cable climbing to a higher socket stays below its chord along its whole length. A steep drop dips below its socket and rises into it, so it never crosses the jack name above the socket.
- **Phones keep the cables.** Below 760px the features get a 28px lane on their left (text indented by the lane). The cables are nested so none cross: each leaves the panel's right edge level, runs down a track beside the panel and specs, turns back left under the specs, and drops down the lane into its socket. The top jack takes the outermost right track, the lowest crossing and the innermost lane track, so it drops straight into the first socket; each later cable sits one 8px track further in on the right and further out in the lane. No cable crosses text, a jack or a legend. The socket sits in the lane on the title's first line, and the jack name follows the title in the condensed face and silk-dim, rather than sitting above the title as an eyebrow.
- **Motion answers the person.** Hovering or focusing a feature (`:has()` with `:hover, :focus-within` on the `li`) thickens its cable from 5 to 7px (3.5 to 5px on phones), brightens its plugs, and dims the other cables to 35% over 160ms. There is no load animation and no ambient motion.
- **Copy from the patching hand.** The headline is an instruction from the player's side. The intro states what the module is; the key states what the cables mean. Each paragraph names the jack or knob as printed and says what happens when you patch it. The manual link names the action and the file type and size instead of an arrow.

Reasoned exceptions to the collection's defaults: uppercase appears only on jack and knob names (Default 5), because that is exactly how they are printed on the hardware; it is tracked only 0.02em and never sits above a heading as a category eyebrow. The page is dark (Default 2), but the accents are two signal colours plus plated gold that stays on the copper, all taken from the object.

Trade-offs, stated: each feature `li` has `tabindex="0"` so keyboard users get the same cable emphasis as a pointer. Focus only changes the drawing, so screen-reader users gain nothing from it and keyboard users get four extra tab stops; drop the tabindex if that costs more than the parity is worth. The section has an `h2` and `h3`s but no `h1`; the host product page supplies the `h1`. The specs list is the figure's `figcaption`.

## Do not touch

- **The panel's proportions.** Keep the SVG viewBox at 50.5 × 128.5 and its width at `calc(10 * var(--hp))`. The ruler must use the same width. If you change HP, change the viewBox width, the `10 *` multiplier and the ruler label together.
- **Colour means signal type.** Never use `--cv` or `--audio` for anything but a cable, plug or swatch of that signal. Keep `--enig` on the panel's copper and the feature sockets: never on text, the ruler, the link or focus rings.
- **The jack field.** The patched jacks must be the panel column nearest the features, top to bottom in feature order. Patch a jack in another column, or reorder the features, and cables cross jacks, legends and each other.
- **`data-jack` and `data-signal` pairing.** Each `li[data-jack]` must have a matching `.plug[data-jack]` in the panel SVG, and both carry the same `data-signal`. The script and the four highlight rules depend on these values.
- **Feature spacing is `3.5 * --hp`.** It scales with the panel so that, with this copy, the panel's bottom rail sits at or just above the last feature's title (checked at 1024, 1440 and 1600px), and the top of the panel lines up with the top of the first feature.
- **Specs are three short lines, `nowrap`.** On phones the cables' right tracks start 16px past whichever is wider, the panel or the specs, so a much longer spec line pushes the tracks right; keep lines short.
- **Phone lane geometry.** `--lane` (28px), `--socket` (12px on phones, near the lane's right edge) and the 8px track step (`TRACK` in the script) are tuned together. Four cables fit; the outermost lane track sits in the 16px page gutter. The panel's left margin equals the lane so the panel lines up with the feature text.
- **Without JS** the cables are absent, but the panel still shows coloured plugs and every socket repeats its plug colour and jack name, so the mapping survives. Keep the CSS-drawn plug colour in `.socket`.
- **Accessibility.** The panel SVG is `role="img"` with an `aria-label` listing every control and what is patched. The cable SVG is `aria-hidden`. Each jack label carries a visually hidden "Blue cable from" or "Pink cable from" so colour is never the only carrier. Panel legends are 2.6 mm in the SVG, about 10px at the phone floor of `--hp` (20px).
- **The manual link points at a stub.** `crease-manual.pdf` (23 KB) is a one-page stand-in shipped in the folder; replace it with the real PDF and correct the size in the link text.

## Adapting

Change the `:root` tokens first, then redraw the device. For another module or device, replace the panel SVG (keep it in real mm units), put a `.plug` group with `data-jack` and `data-signal` on each connector you want patched, and give each feature `li` the same `data-jack`. Put the patched connectors in the panel column nearest the features, in feature order. Add one line per jack to the highlight selector list. Name jacks exactly as the device prints them, on the panel and in the copy.

For two signal types, keep two cable colours and say what they mean in the key. For one type, use one colour and drop the key. Each feature works with a title of up to about five words and 30 to 45 words of body. Longer paragraphs push the last title further below the panel, which is fine; much shorter ones may leave the panel taller than the list, so reduce the feature gap multiplier. On phones, keep to five features or fewer.

Geometry constants are literal on purpose and live next to what they measure: the SVG's mm coordinates, the 5.08 mm HP and 10 HP figures, the h2/h3 line-heights, the 46rem header width, the `3.5 * --hp` gap, and the script's sag factors (0.12, 24, 110), the 6px plug-boot overhang, the 16px track offset, the 10px corner radius and `TRACK` (8px).

| Token | Role |
|---|---|
| `--case` | Page background, the shadow inside the case |
| `--panel` | Front panel fill (PCB soldermask) |
| `--silk` | Headline, titles, panel legends, knob caps, link text |
| `--silk-dim` | Body text, specs, HP ruler, link underline, phone jack names, knob skirts (derived from silk and case) |
| `--sheen` | The rubber highlight stroke along each cable |
| `--panel-edge` | The 1px inner line on the panel edge (derived) |
| `--enig` | Panel jack rings, rail holes, outputs box and feature socket rings. Never text, ruler, link or focus |
| `--cv` | Control voltage cables, plugs and key swatch |
| `--audio` | Audio cables, plugs and key swatch |
| `--font-sans` | Body, specs, key, link |
| `--font-cond` | Feature titles, jack labels, panel silkscreen |
| `--font-xcond` | Section headline |
| `--fs-h2` / `--fs-h3` / `--fs-body` | 72/26/18px desktop down to 44/22/17px at 390px |
| `--fs-small` / `--fs-jack` | 14px specs and key / 13px jack labels |
| `--measure` | Body line length, 58ch |
| `--s1` … `--s9` | Spacing scale: 4, 8, 12, 16, 24, 32, 48, 72, 112px |
| `--gutter` | Inline page gutter, 16px on phones up to 48px |
| `--hp` | One HP in pixels, clamp(20px, 2vw, 25.2px). Sizes the panel, ruler and feature gap |
| `--socket-col` | Desktop margin column holding each socket and jack label (72px, 64px below 1100px) |
| `--socket` / `--ring` | Socket diameter and gold ring width (22/3px desktop, 12/2px phone) |
| `--lane` | Phone cable lane left of the panel and features (28px) |
| `--cable` / `--cable-on` | Cable width at rest and when its feature is hovered or focused |
| `--rule` / `--focus` / `--swatch-w` | Ruler and underline weight (1.5px), focus ring width (2px), key swatch length (28px) |
