---
title: Specimen back cover
section: footer
subject: The site footer of Smalt Type, a fictional independent type foundry in Porto, opening with a live tester for its newest variable family, Moraine Grotesk.
aesthetic: The back cover of a printed type specimen. One saturated spot ink (smalt blue) with everything reversed out to paper, and no accent colour.
mode: dark
fonts:
  - Anybody, variable wdth 50-150 and wght 100-900 (Google Fonts), stand-in for the release face "Moraine Grotesk"; tester line, axis captions and headings
  - Newsreader, variable opsz 6-72 and wght 300-500 (Google Fonts), stand-in for the text face "Pell Text"; links, body, form, imprint
js: Binds the Width and Weight range inputs to the tester's font-stretch and font-weight (readouts and slider fill included); opens one native <dialog> sheet for every footer link, the Buy and trial buttons (Buy keeps a session-only cart with a mailto order link, trial confirms in place); handles the newsletter submit with a confirmation line.
tags: [footer, type-foundry, variable-font, type-tester, interactive, spot-colour, print, specimen, newsletter, dark, blue]
use_when:
  - The product is typography or has a variable font (or a similar live parameter) that visitors can try in place, such as foundries, font marketplaces, type-design studios, variable-font launches.
  - You want the footer to sell the newest product one last time instead of showing a giant wordmark.
  - The brand can carry one strong, saturated colour as its whole palette.
  - There are about four link groups plus a newsletter.
avoid_when:
  - There is nothing interactive or tangible to show. Without the tester, this is just a blue footer with link columns.
  - The site already has a type tester just above the footer. Two testers in a row is one too many.
  - The brand needs several colours, or an accent for promotions, badges or sale states.
  - Large sitemaps (more than about 25 links). The quiet index will turn into a wall of text.
---

## Why it works

**The bold idea: the footer opens with a working type tester.** One editable line of the newest family ("Glaciers push gravel into long quiet ridges") is set at display size, up to 156px, and has Width and Weight sliders that drive the variable font live. Every foundry site has a tester, so buyers recognise it at once. Putting it in the footer gives the last screen of every page a job: it lets people use the product. The biggest thing in the footer is a font you can type in, not a logo.

- **It rests on a distinctive instance.** The tester starts at Width 72 and Weight 680, a condensed heavy cut, not the neutral 100/500 middle. Even in a static screenshot it reads as a variable font being set, not as a big headline. The axis captions ("Width 72", "Weight 680") are set in the release face at 21px, so the control row reads as part of the specimen. The hint "Type over the line to try your own words." sits directly above the line it describes and names the action, not the device.
- **The buying path is the loudest control.** "Buy Moraine from €60" is the only filled control in the footer (paper on smalt) and sits right after the sliders, with "Download trial fonts" as a plain link beside it. The newsletter's Subscribe is an outlined text button, so the CTA hierarchy points at the product.
- **No eyebrow.** The section's h2 ("Try Moraine Grotesk") is visually hidden and only names the landmark. The visible lead is one 21px sentence pair that names the family, the date and the true axis ranges.

- **One spot ink, reversed out.** A printed specimen's back cover is often printed in a single ink with the type knocked out to paper. The ground is smalt (`#1F2E8F`), a historic blue pigment and the foundry's name. It is saturated and clearly blue, not navy and not near-black. Every other colour is paper (`#F1F3EF`, 10.2:1) or a tint of the same ink (`#B3BCEB`, 6.1:1). There is no accent. Focus outlines, `::selection` and the Buy button use paper on smalt, which is a reversal, the print-native way to highlight.
- **Why a saturated blue rather than the pigment's real tone.** Historical smalt is a cooler, slightly greyed, violet-leaning blue. We take the pigment's name, not its faded museum colour: a spot ink on a specimen cover is printed fresh and dense, and a greyed blue would slide toward navy, which reads as corporate and would sit too close to the deep-water ground of `cta-tide-forecast`. The cost is closeness to the current "Klein blue" agency look; what keeps this footer apart from that trend is that the blue carries a working product, not a slogan.
- **Two faces, two jobs.** Anybody stands in for the release face and is the one thing that moves. Headings use it at 17px, the same size as the links, fixed at wdth 88 and wght 560 in sentence case; weight and family alone set them apart, with no ALL CAPS or tracking. Newsreader is the calm house reading face. Body and links use its text optical size, and the 21px lead uses its display optical size (`opsz` 60).
- **Structure by space alone.** There are three bands (tester, index, imprint) separated by 96px and 64px of ink. There are no rules, cards, pills or dividers. The only drawn lines are the slider tracks, and they are controls.
- **One shared 12-column grid across all bands.** The two sliders take equal spans (cols 1-4 and 5-8) with a fixed label column, so both tracks are the same length and start at the same x. The Buy button, the newsletter and the legal/colophon block all start at col 9. The four link groups sit in pairs of columns. So the quiet parts line up with each other while the tester line runs ragged right over the whole width.
- **Plain buyer language.** Links say what you get: "PDF specimens", "Free for students", "Licence agreement", "Buy Moraine from €60". The release date is in a sentence ("out 29 September"), not on a NEW badge.
- **Link lists have their own rhythm.** List items are set at 1.3 leading with 8px between items, so a wrapped link stays visibly one item.
- **Honest specimen.** The tester line has no letter-spacing or other tweaks, so it shows the font's own spacing at every width and weight. The axis readouts use tabular figures so they do not jitter while you drag.

## Do not touch

- **The tester comes first and is the only loud element.** Do not add a wordmark, glyph tiles, "Aa" cards or hover effects to the index. They compete with the tester.
- **One ink plus paper.** Do not add an accent colour for focus, hover, badges or the button. Emphasis comes from size, width and weight. Keep smalt saturated and blue; if you move it toward navy or near-black, it stops looking like printed ink.
- **The tester is real text.** It is a `<p contenteditable="plaintext-only" role="textbox" aria-multiline="true">` with an `aria-label`, and it uses `overflow-wrap: anywhere` so pasted long words wrap instead of scrolling sideways. Keep `spellcheck="false"`, because red squiggles under display type ruin the specimen.
- **The tester size is `clamp(44px, 12vw, 156px)`.** "Glaciers" at Width 150 and Weight 900 is about 7.35 times the font size wide. At 360px (328px of measure) it fits at 44px and would break inside the word at 45px or more; 12vw keeps it inside the measure at every width above that, while 13vw would overflow at 390px. Verified by screenshot at 360px with both sliders at maximum. The 156px cap keeps the sample at two lines at the default Width 72 and three lines at Width 100 in the 1240px container; at 168px Width 100 goes to four lines and the descenders crowd the next line. If you change the sample text, the axes or the container, check both extremes again.
- **Leading of 1.02 on the tester.** Anybody has long ascenders and descenders. Below about 0.98, the "g" and "p" descenders touch the next line's ascenders at large sizes.
- **Real controls.** The sliders are `<input type="range">` with `<label>` and `<output for>`, so they work with a keyboard. The paper thumb is the part that must stay visible (10:1); the filled part of the track is smalt-tint (6.1:1), so the value side reads as the stronger one. The email field is a transparent write-in line with a 1px paper bottom rule (10.2:1), like a printed reply card, not a dark form well.
- **No ambient motion.** Slider changes apply at once because they are direct manipulation. Do not add transitions on `font-stretch` or `font-weight`; they make the tester feel slow.
- **No dead ends: every link opens the one `<dialog id="sheet">`.** Footer links are `<a href="#sheet" data-sheet="key">`; the script intercepts the click, fills the dialog and calls `showModal()`, so focus is trapped, Escape and the Close button (and a click on the backdrop) close it, and focus returns to the link that opened it. The heading takes focus on open. "Moraine Grotesk" in the index is `href="#sample"` and focuses the tester. The sheet is paper on smalt, the same reversal as the Buy button, with a smalt focus ring (the paper ring would vanish on paper). External exits are only `mailto:` links with `target="_blank" rel="noopener"`. Nothing submits to a server: Buy adds to an in-memory cart (Remove, total, and "Send the order by email"), the trial form confirms in the sheet.
- **No-JS fallback.** Without the script, the tester still shows at Width 72 and Weight 680 and stays editable. The links then point to `#sheet`, a closed dialog, so they do nothing visible; the sheets need the script. The slider fills are set per input in CSS (`#wdth` 22%, `#wght` 72.5%) to match those defaults; change them together with the `value` attributes and the `.sample` font-stretch and font-weight.

## Adapting

1. **Swap the release face.** Change `--font-release` and the Google Fonts URL to the client's variable font. Set each `<input type="range">` `min`, `max` and `value` to the font's real axis ranges. The JS maps Width to `font-stretch` (as %) and Weight to `font-weight`. For a font with another axis (optical size, slant, a custom axis), add a third `.axis` row and set `font-variation-settings` in the same loop. With three controls, give `.controls` three spans of 4 columns, or stack them.
2. **Write the sample line for the subject.** It should be a short sentence (35-50 characters) in the font's world that shows round, straight and descending letters. "Glaciers push gravel into long quiet ridges" is about moraines, which is where the family name comes from. Then check the 360px stress case.
3. **Swap the ink.** Change `--smalt` and derive the others from it: `--smalt-deep` darker, `--smalt-rule` lighter, `--smalt-tint` a pale tint at 4.5:1 or more on the ground, and `--paper` at 7:1 or more. The design only works with one saturated, mid-dark hue. A pale ground would need the whole thing inverted, which is a different design.
4. **Index content.** Four link groups of four to six links fit cols 1-8 at desktop. The newsletter fills cols 9-12. With five groups, put the fifth under the first, or use five 2-column groups and move the newsletter to the imprint row. Link text can wrap to two lines; headings should stay short (three words at most).
5. **Breakpoints.** Above 1180px: sliders, Buy and trial link on one row; four groups and the newsletter on one row. 901-1180px: Buy and the trial link drop under the sliders, the groups go two by two in cols 1-8, and the newsletter keeps cols 9-12. At 900px and below: the sliders stack, groups and newsletter span the width, and the imprint stacks. At 560px and below: the lead drops to 17px and its second sentence and "our newest family" are hidden (`.lead-more`), leaving "Moraine Grotesk, out 29 September." on one line so the sample dominates the first screen.
6. **Sheets.** Page copy lives in the `pages` object in the script (title plus HTML body per key). Add a link by giving it `data-sheet="key"` and `href="#sheet"`, then add the key to `pages`. To go live, point a link at the real URL (and drop `data-sheet`); keep the sheet for anything that has no page yet. Licence names and prices in `licences` feed the Buy form and cart.
7. **Copy tone.** Name what the buyer gets. Keep the imprint factual: address, currency and VAT, legal links, and a colophon naming the faces the site is set in.
8. **Headings and landmarks.** Visible headings are an h2 for the newsletter and h3 for each link group, under a visually hidden h2 "Site links" inside `<nav aria-label="Footer">`. The tester's h2 is visually hidden. If the footer is embedded under a page whose sections use h2, keep these levels; if not, shift them. The nav is a real grid item (cols 1-8 with its own 4-, then 2-column grid whose tracks match the parent's), not `display: contents`, so its landmark role survives in every browser.

**Stand-in disclosure.** Smalt Type, Moraine Grotesk, Pell Text, Tarrant Serif, Wharf Display and Tamsin Script are fictional. Anybody and Newsreader are open-source Google Fonts used as stand-ins. When you port this, replace `--font-release` with the client's own variable release and update the slider ranges to its real axes.

| Token | Role |
|---|---|
| `--smalt` | The ground and only ink. Also the text colour on the paper button and selection. |
| `--smalt-deep` | Hover fill on the outlined Subscribe button. |
| `--smalt-rule` | Unfilled slider track. |
| `--smalt-tint` | Secondary text (hint, axis labels, newsletter blurb, imprint), filled slider track, Buy hover (6.1:1). |
| `--paper` | Primary text, lead, links, tester line, slider thumb, Buy fill, Subscribe outline, email rule, focus outline, `::selection` (10.2:1). |
| `--font-release` | The variable release face: tester line, axis captions and headings. |
| `--font-text` | Reading face for everything else. |
| `--opsz-text` / `--opsz-display` | Newsreader optical size for body (14) and the 21px lead (60). Remove them if the text face has no `opsz` axis. |
| `--step--1` | 14px: tester hint, form label, imprint. |
| `--step-0` | 17px: links, body and headings (release face, wdth 88, wght 560). |
| `--step-1` | 21px: the lead, and the Width/Weight captions and readouts in the release face. |
| `--step-tester` | `clamp(44px, 12vw, 156px)`: the tester line. See "Do not touch" before changing it. |
| `--leading-text` / `--leading-tight` | 1.55 for serif body; 1.3 for headings, link lists and axis captions. |
| `--track` / `--thumb` | Slider track height (4px) and thumb diameter (20px). The thumb is centred on the track from these two. |
| `--s-1` ... `--s-10` | Spacing scale, 4 to 128px. Bands are separated by `--s-9` (tester to index) and `--s-8` (index to imprint). |
| `--gutter` | Side padding, `clamp(16px, 4vw, 48px)`. |
| `--max` | Content width, 1240px. |
| `--smalt` / `--paper` (sheet) | The sheet reverses them: paper ground, smalt text, buttons and focus ring. `--smalt-tint` is its button hover. |
| `--focus` / `--focus-offset` | 2px paper outline at 3px offset; the tester line adds `--s-1` to the offset. |
