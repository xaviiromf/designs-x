---
title: Timber-frame marriage marks
section: process
subject: Wyebank Frame Co. (fictional), a green-oak frame builder in the Welsh Marches, explaining six stages from site survey to raising day to someone thinking about commissioning a house.
aesthetic: Framing-yard material language. A flat green-oak post with a snapped chalk line and race-knife Roman numerals on blued-whitewash ground, set in one sturdy book serif.
mode: light
fonts:
  - Vollkorn (Google Fonts, variable 400-900 with italics)
js: none
tags: [process, timeline, craft, building, oak, roman-numerals, sticky-intro, svg]
use_when:
  - A real, ordered sequence of four to eight stages where the order and the duration of each stage matter.
  - Crafts and trades that have their own counting or marking system (marriage marks, batch numbers, kiln marks) that the numerals can borrow honestly.
  - Pages that need a calm, long-form explanation followed by one booking action.
avoid_when:
  - The steps are not truly sequential, or there are only two or three of them.
  - Fast, playful or tech products where a carved-timber metaphor would be costume.
  - Dark-mode pages. The oak and limewash relationship is the whole design.
---

## Why it works

**The one bold idea: the process is scribed into one oak post.** A flat green-oak column (`--post-w`, 128px on desktop, 64px on phones) runs the full height of the stage list. A narrower tenon stub sits on top of it, and a 3px chalk-blue centreline with feathered edges runs through both, the way a framer snaps a powdery chalk line on a timber. The tenon is one third of the post's width and longer than it is wide (72px, 40px on phones), as a real tenon is. Each stage carries a carpenter's marriage mark cut across that line: I, II, III, IIII, V, VI. These are additive numerals, with IIII and never IV, because that is how framers cut them. Each knife stroke is a narrow groove with short tapered ends, the knife's entry and exit, split along its length into two flat faces. The light comes from the left, so the left wall of the groove, which faces away from it, is in shadow (`--cut-shadow`) and the right wall catches it (`--cut-light`). That is what makes the stroke read as cut into the wood rather than raised from it, with no texture or drop shadow. The faces are pale enough against the oak to separate even at the 40px phone size.

**The numbering belongs to the subject.** Stage V's copy explains that these marks are cut into both halves of every joint so the crew can find each piece on raising day. The ornament is the craft's own sequencing system, and the page says so. That is why numbered markers are justified here.

**The post is one continuous timber.** The oak and chalk line are painted as two no-repeat gradients on the `<ol>`, covering only its first grid column. Stages are spaced with padding, not `gap` or margins between items, so the post never breaks between rows. Its foot is square where the list ends.

**Everything else is quiet.** One family, Vollkorn: 800 for the H2, 700 for stage titles, 400 for body and italic for the durations. Its sturdy, slightly rustic book-face shapes suit carpentry without imitating it. Text is left aligned on limewash, with no cards, rules, shadows or motion. The intro column (H2, lede, total duration, button) is sticky on wide screens, so the booking action stays in view while the reader goes down the post. At 860px and below the button and its note move under the post (flex `order`), so the action is in reach right after raising day. Figures are set as lining numerals (`font-variant-numeric: lining-nums`), because Vollkorn's default old-style 1 looks like a small-cap I and would blur into the marks. The button is the only heavy element under the headline: the total line is regular weight.

**Colour comes from the yard.** Limewash is whitewash blued with laundry blue (#EDF1F0): close to white and chalky, cool but not cream. Iron-stain (#24303A) is the blue-black stain iron leaves on oak tannin. It is used for text, the button fill and the focus ring. The button's hover state is an underline on the label, so it needs no extra colour. Chalk blue (#4A78C6, lighter and softer than a link blue) appears in exactly one place, the snapped centreline.

**Durations lead with the quantity** in pencil-grey italic ("4 to 6 weeks."), not a caps or mono spec strip and not six lines starting "Takes". They add up to the total in the intro (15 to 23 weeks).

**Accessory removed:** the plan had 1px cut-shadow lines on the tenon shoulders. They were removed because the stepped silhouette already reads as a tenon. The H2 keeps "survey pegs" together with a non-breaking space, so the craft term never splits across lines.

## Do not touch

- **Additive numerals, IIII not IV.** IV would be wrong for the craft. Each mark is built from two SVG symbols (`#cut`, one stroke; `#vee`, two strokes rotated ±16° about a shared foot), composed with `<use>` and x offsets. Do not swap them for digits, outline numerals or circles.
- **Two-tone grooves only, lit from the left.** Shadow face on the left, lit face on the right; swapping them turns the cuts into raised ridges. Flat fills only. No wood-grain image, gradients, bevels or drop shadows on the post.
- **Chalk blue is only the centreline.** Do not reuse it for the button, links or focus. Action and focus are iron-stain.
- **The post must be continuous.** Keep the oak painted on the `<ol>` background and stage spacing in `padding-block`. Adding `gap`, `margin` between `<li>`s or per-item backgrounds breaks the timber into blocks.
- **The post stays a full flat column on phones** (64px wide, with its tenon). Never thin it to a line or a dotted timeline at small widths.
- **Lining figures.** Keep `font-variant-numeric: lining-nums` on `body`, so Arabic durations never read as Roman I.
- **Fixed mark height** (`--mark-h`). Only the width changes from mark to mark. The top of each mark lines up with the cap height of its stage title (the small negative `margin-top` on `h3`).
- **Stage V copy** must keep explaining what the marks are. Without it the numerals turn into decoration.
- **Semantics:** `<section aria-labelledby>` with an `<h2>`, then `<ol role="list">` of `<li>` each with an `<h3>`. Mark SVGs are `aria-hidden`; the list order carries the sequence. The button has a 3px iron-stain outline offset 3px on `:focus-visible` and a minimum height of 44px. Below 861px the button is visually after the list but stays in the intro in the DOM; it is the only focusable element, so focus order is not confused.

## Adapting

1. Change the `:root` colour tokens first. Keep the logic of three roles: a material colour for the post (`--green-oak` plus its two cut faces), one layout-line colour used only for the centreline, and a dark ink that does all the writing and action. If you change `--green-oak`, re-derive `--cut-light` (lighter and desaturated, clearly separate from the oak) and `--cut-shadow` (darker, at least 4.5:1 on the page background and 3:1 on `--green-oak`, since the marks are graphics drawn on the oak) from it. `--cut-shadow` is 5.2:1 on limewash and 3.1:1 on the oak.
2. Replace the copy. Each stage has a 2 to 4 word imperative title, one or two sentences of body text (under about 45 words) and one duration that leads with the quantity. Keep the durations summing to the total in the intro. Keep one stage that explains the marking system. If the target trade has no marking system, switch to a different numeral system that it does use, rather than keeping marriage marks as decoration.
3. **More or fewer stages:** compose new marks from `#cut` and `#vee` (VII = V + two strokes, VIII = V + three). Stroke pitch is 21 viewBox units and each stroke is 16 units wide; the viewBox is 60 units tall. Set each SVG's `viewBox` and `width` to fit its strokes, centred on 0. IIII is 82 units, which is about 55px on the 64px phone post; marks much wider than that crowd it, so this pattern is best kept under nine stages.
4. **Layout:** at 861px and above the intro occupies columns 1 to 4 (1 to 5 below 1100px) and stays sticky, and the list fills columns 6 to 12. At 860px and below everything stacks, the sticky positioning is removed and the button and note move under the list. At 640px and below the post narrows to 64px, marks drop to 40px, body text drops to 17px to keep a reasonable measure next to the post, and stage padding tightens. Longer body copy just makes the post taller; the post never needs resizing.
5. In a component framework, render the marks from a small numeral-to-strokes map, and keep the post as a CSS background on the list.
6. The button links to `#book-survey`, a deliberate placeholder with no target on this page. Point it at the real booking route.

| Token | Role |
|---|---|
| `--limewash` | Page and section background, the blued whitewash |
| `--iron-stain` | All text, button fill, link and focus colour |
| `--green-oak` | Face of the post and tenon |
| `--cut-light` | Lit face of each knife stroke |
| `--cut-shadow` | Shadow face of each knife stroke |
| `--chalk-blue` | The snapped centreline, nothing else |
| `--chalk` | The centreline's image: chalk blue feathered to transparent at both edges |
| `--pencil` | Duration facts and the note under the button (5.2:1 on limewash) |
| `--font` | Vollkorn with Palatino and Georgia fallbacks |
| `--fs-display` | H2 size, Vollkorn 800 |
| `--lh-display` | H2 line height (0.98) |
| `--lh-body` | Body line height (1.6; serif body gets extra leading) |
| `--fs-stage` | Stage titles, Vollkorn 700 |
| `--fs-lede` | Intro paragraph |
| `--fs-body` | Stage body and total-duration line (18px, 17px on phones) |
| `--fs-fact` | Duration sentences, italic |
| `--fs-note` | Note under the button |
| `--s-1` to `--s-9` | Spacing scale: 4, 8, 12, 16, 24, 32, 48, 72, 112px |
| `--post-w` | Width of the post (128px, 64px on phones) |
| `--tenon-h` | Height of the tenon stub above the first stage (72px, 40px on phones) |
| `--mark-h` | Fixed height of every marriage mark (76px, 40px on phones) |
| `--chalk-w` | Width of the chalk centreline (3px) |
| `--stage-pad` | Vertical padding of each stage, the gap between them along the post |
| `--gutter` | Side padding of the section (72, 40, 16px) |
| `--container` | Max content width (1240px) |
