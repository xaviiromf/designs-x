---
title: Ask the guest book
section: testimonials
subject: Gasthof Zirmegg (fictional), an eleven-room mountain hotel at 1,780 m at the head of the Lärchtal in Tyrol, run by Marta and Sepp Kofler, showing entries from the guest book on the stove bench in its Stube.
aesthetic: A stack of guest-book pages in five national school handwritings, lying on the green glazed tiles of a Tyrolean stove bench, with the owner's Alpenrose-pink highlighter linking the questions people phone about to the guests who answered them.
mode: dark
fonts:
  - Reddit Sans (Google Fonts, variable wght 200-900, loaded 400-600)
  - Reddit Sans Condensed (Google Fonts, variable wght 200-900, loaded 500-700)
  - Playwrite NL (Google Fonts, variable wght 100-400, used at 350)
  - Playwrite GB S (Google Fonts, variable wght 100-400, used at 350)
  - Playwrite US Trad (Google Fonts, variable wght 100-400, used at 350)
  - Playwrite CL (Google Fonts, variable wght 100-400, used at 350)
  - Playwrite DE Grund (Google Fonts, variable wght 100-400, used at 350)
js: Smooth-scrolls the page, stacks the guest-book pages with depth as you scroll, sweeps Marta's highlighter under each question and its answer, glides to a page from its question, and adds your own handwritten page from the form.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [testimonials, hotel, guest-book, handwriting, highlighter, sticky-stack, form, scroll-scrub, detailed]
use_when:
  - Testimonials that answer specific buying questions (getting there, children, weather, food, noise), so each quote can be tied to the question it settles.
  - A small hospitality business (inn, hut, guesthouse, B&B, campsite) whose guests write in a physical book or leave long reviews.
  - The reviewers come from several countries and their own voice matters more than star ratings.
avoid_when:
  - Quotes are short star-rating blurbs; the stacked pages need three to six sentences each to read as a book.
  - The page needs a compact testimonial strip; the section is about five viewports tall by design.
  - There is no real question each quote answers. Without that, the pink mark is a headline accent (default 7).
---

## Why it works

**The bold idea: the pink mark finds the answer.** Before people book, they phone with the same five questions. The rail lists those questions; the stack holds five guest-book pages in date order. As each page lands on the stack, Marta's highlighter sweeps under the question in the sticky rail and, 0.15 s later, sweeps in the same direction, on the same `power2.inOut` curve, under the guest's handwritten line that answers it. One stroke in two places links a question the reader has to the guest who answered it. The answer mark stays (it is ink); the rail mark wipes out to the right when the next page lands. Both halves move at one pen speed (about 700 px/s, clamped to 0.45-1.1 s from the phrase's width), so a long answer takes longer than its short question, as one highlighter would. Below 1024 px, where the rail has scrolled away, the rail's half of the stroke moves onto the page's own printed note "Marked for: ...", set at the top of the page, so the order stays question then answer. The question in that note is set at the rail's size and weight (22 px Reddit Sans 500, its own line under a small "Marked for:"), so the two halves of the stroke weigh the same as on desktop. The pink is used for nothing else on the page, not even hover.

- **TX5 is justified here, not decoration.** Default 7 warns against accenting a word. The mark never touches the heading: it sits on the one phrase in a guest's entry that answers a question the reader is asking, and on that question in the rail, which is what a hotel owner's highlighter in a real guest book does.
- **The book lies on the stove bench.** The section field is the glazed Kachelofen tile of the stove bench in the Stube, a deep green (#2F5446), so the mode is dark. The white pages still read as the subject because they are the only light, large surfaces on the page: everything on the tile (hotel line, heading, intro, rail, panorama) is thin paper-coloured type and line, while the pages are solid paper blocks carrying the colour (blue ink, pink marks, violet stamps). The eye goes to the book, as it does in the room.
- **Five hands, one family.** Each page is set in the Playwrite school-handwriting model of the country the guest wrote "From": the Dutch family in Playwrite NL, the Kendal couple in GB S, the Minnesotans in US Trad, the translator from Puerto Varas in CL, the guest from Freiburg in DE Grund. Guest books are many hands; that is the content's truth, not a mood. The guests also write the date their own way (14-2-2026, 3rd July 2026, Aug 22, 2026, 9/9/2026, 11.10.2026); the house stamp gives every page the same printed date. Playwrite CH does not exist, so the hotel is in Tyrol rather than Graubünden, and no unused variant is loaded.
- **One printed voice.** Everything printed is the Reddit Sans superfamily: Reddit Sans Condensed at 600 for the H2 and the book's column heads (and the stamp's lettering, peak labels, counter), Reddit Sans at 400 to 600 for reading text, rail, button and status. The counter and stamp dates use tabular figures (`tnum`, present in both).
- **The book's own structure.** Every page carries the same printed column heads (Date, Name, From, Room, Remarks) in a `dl`, the handwriting sits on ruled lines drawn at the baseline (every Playwrite hand puts its baseline at 0.75 of a 1.8 line box, so one ruling fits all five), and the blank last page is the form, with the column heads as its labels.
- **Stacked, not pinned.** Pages are `position: sticky`, offset 1.5 rem (0.75 rem on phones) so covered pages leave edges like a closed book; every covering page has a slightly darker top edge so the strips read as page edges. A covered page scales to 0.955 and settles under a faint (8%) slate shade, only while the next page is actually over it, so covered edges stay paper-coloured, the page being read stays white and covered ink stays legible. Depth comes from the edges: each covering page has a hairline top and a paler 1 px line at the foot of the strip it covers.
- **A panorama board, drawn in paper lines on the tile.** Five fictional peaks are named, with altitudes, on leader lines that all slant one way, like the brass panorama table on a hotel terrace. Below 420 px three are named (Zirmkopf, Ruitspitze, Hinterer Ferner) and the other two stay unlabelled ridge, so the labels never crowd; all five stay in the drawing's `aria-label`. It is a quiet, static place-setter: it opens from the left on load and does nothing else. (A pointer-following sighting line was cut on review: a second clever idea, on an ornament that has nothing to do with the testimonials.)
- **Your page answers your action.** A valid submit writes a new page dated today from the visitor's own clock, in the hand of the chosen country, with the date written the way that country's guests write it. The status line gives the date in full (`en-GB`, for example "24 October 2026"). The page is inserted before the blank page, the stack rebuilds, the script glides to the page and the violet house stamp lands on it: the only stamp that moves. It carries no pink mark, because Marta marks a line when she reads it.

**Palette (six core colours, one meaning each).** `--ground` #2F5446 stove-tile green, the section field (delta-E 15.9 from rowing-club #1E6A4E, 21.6 from doc-festival #1B2620). `--paper` #FBFBF9 the page, and every piece of chrome on the tile (8.2:1 on the green). `--slate` #22303A everything printed on paper (13.1:1), and a rail question's text while the pink sits under it (7.9:1 on pink; paper on pink would be 1.7:1). `--ink` #34389C Pelikan royal blue with its violet cast: handwriting, focus inside pages, submit fill (9.3:1 on paper, 5.6:1 on pink). `--stamp` #6B3D88 stamp-pad violet, the house stamp only (7.7:1). `--marker` #F7B2CF Alpenrose pink, Marta's highlighter only. Derived: `--slate-soft` #4E5E68 column heads and field rules on paper (6.5:1), `--mist` #A9BDB3 leader lines and resting link rules on the tile (4.3:1), `--rule` #C4D0D6 the ruling under handwriting (decorative).

**Reasoned defaults and collection notes.**
- Default 1: the first instinct was stone-pine panelling and a cream page; it became green stove tile, neutral paper, school ink, a violet stamp and an Alpenrose-pink highlighter, with no serif at all.
- Default 2 (near-black with one bright accent): the ground is a mid-dark, coloured green, not near-black, and the pink is the owner's real highlighter on content, never a UI accent.
- Default 5: no eyebrow (the hotel line is real information: name, altitude, valley), commas not middle dots, no arrows, no monospace. The capitals on the stamp are the rubber stamp's own lettering.
- Default 4 and 8: pages have a 2 px radius, a 1 px edge and no blur shadow; depth comes only from the stack. Pages are not interactive, so they get no hover. Sections do not fade up; pages arrive because you scroll them.
- No numbered markers: the dates already order the pages, and the order is truly chronological, as in the book.
- Cut on review: owner margin notes in a sixth hand, a stamp thump on every page, a child's drawing, pointer parallax on layered mountains, then the pointer sighting line that replaced it, and the snowfield haze under the ridge (the accessory removed last; the board is lines only).
- Collection clashes resolved: Reddit Sans and Reddit Sans Condensed instead of Instrument Sans (planned in eight other designs); the ground moved off the pale cool greys of testimonials-surf-school and faq-camper-rental to the stove tile; the ink moved off the royal-blue cluster (bespoke-tailor, coffee-roaster) toward violet; Valentina Rojas is from Puerto Varas, since Valparaíso is already used by faq-language-school and testimonials-surf-school.

## Do not touch

- **The two places of one stroke.** Rail question first, answer 0.15 s later, same direction, curve and pen speed (duration from width, never passed by the callers); the answer mark stays, the rail mark wipes out right; the "Marked for" note takes the question's half below 1024 px, first. Pink is used for nothing else, including hover (rail hover is a paper underline).
- **Legible at every frame of the sweep.** Bands open with `clip-path` (left edge to right edge, and out through the right edge), not `scaleX`. On the tile, a rail band sits above its word and carries a slate copy of it, so every glyph is either paper on green or slate on pink at every moment of the sweep; page bands sit behind the ink, which reads on both paper and pink. The rail band reaches higher and lower (`--mk-up` .8em, `--mk-down` .3em on `.qs`) so slate caps and descenders never touch the green.
- **Mark geometry.** `--mk-up` and `--mk-down` drive both the static mark (a thick `text-decoration` underline, used without JavaScript and under reduced motion) and the animated per-word bands, so both look the same. The script measures each phrase's baseline, so the bands fit every hand. The script also marks each line's first and last word (`.ls`, `.le`, recomputed on resize): the stroke stops just past the last glyph instead of bridging into nothing, the ends get a felt-tip's chisel radius, and every other line sits 1 px lower, so it reads as drawn by hand rather than as a text selection. Marks end before the closing full stop.
- **The ruling.** Handwriting uses line-height 1.8 and the ruling is drawn at 0.75lh. Change one and the lines miss the baselines.
- **Sentinels.** Every page is preceded by a zero-height `.sent` in flow. All ScrollTriggers and anchor targets use the sentinel, never the sticky page, because ScrollTrigger mis-measures stuck elements after a refresh. Inserted pages get one too.
- **Stamp at the foot.** Pages are flex columns and `.foot` takes `margin-top: auto`, so the stamp always sits at the bottom of a page. Your own page, stretched to cover the stack, grows its Remarks cell so the ruling runs on to the foot.
- **Head-row grid.** From a 560 px page: `max-content fit-content(45%) minmax(0, 1fr) var(--col-room)` (Date, Name, From, Room). The blank page has its own minimum From and Room columns so "Somewhere else" and "Day visit" show whole. Below 560 px: `fit-content(50%) minmax(0, 1fr)`, Date and Room on the first row, the Date cell `nowrap`.
- **Covered pages show only edges.** Each page's `min-height` is the running maximum of the pages before it (`--min`, set by `fitPages`), so a short page covers a longer one and no ghost bottom shows below it.
- **Sticky tops that fit.** A page's top is `min(stack offset, 100svh - its height - 1rem)`, with the height in `--h` from a ResizeObserver, so no page is covered before its bottom has been on screen; the rail uses the same rule. Below 640 px of viewport height the pages do not stick at all. At 390x844 every page is 756 px (the running maximum), under the 763 px the stack leaves the blank page. Below 1024 px the rail is tighter (17 px questions, line-height 1.25) and the board 96 px tall, so the first page's top and its "Marked for" note sit inside the first phone screen.
- **Accessibility.** The file has no `h1` on purpose: it is a section that composes into a page, and the host page supplies the `h1`. The section is labelled by the H2; the rail is a `nav`; each page is an `article` labelled by its handwritten name (`h3`) with `tabindex="-1"` so anchors move focus to it. Focus ring: 2 px paper on the tile, 2 px ink inside pages, 3 px offset. Marked phrases are split with `aria: 'none'` into plain spans, so each phrase still reads as one string; bands and their copies are `aria-hidden`. The stamp is `aria-hidden`; peak names are printed and in the drawing's `aria-label`. Form labels are the printed column heads; the blank page's Date is a `group` labelled by its column head; errors use `aria-invalid` and `aria-describedby`, sit in the grid cell under their own field as a short instruction ("Add your name", "Pick where you're from", "Pick a room or Day visit"; the Remarks error under the textarea), appear without apology, and focus moves to the first invalid field. The counter only speaks at 40 and 0 left.
- **One pen stroke per glide.** A rail click glides past other pages; while it does (`st.glide`), only `aria-current` moves and no mark sweeps. On landing (`st.settle`) the target question strikes, then its answer 0.15 s later. Answer triggers are live while their page is on top, from either direction, and kill themselves after a real mark, so a page flown past still gets its stroke when the reader scrolls back to it. A timer completes the glide if a wheel or touch cuts it short, and runs the same completion (focus, the new page's stamp) exactly once from either path.
- **No dead ends.** Rail links and "Read your page" go to existing page ids and move focus (the form link focuses the Name field); after a glide the URL carries the page's hash, and a direct link or reload with that hash is placed again once the pages are measured and the fonts settle (`toHash`), so the linked page is the one on top. The mail line follows the stack in the markup, so tab order matches reading order at every width; the mailto opens with `target="_blank" rel="noopener"`; the form handles `submit` in script and answers with a new page and a status line linking to it.

## Adapting

Map the brand onto the `:root` tokens first. Keep one meaning per colour: a marker colour that appears anywhere else breaks the idea. Check the marker under the handwriting colour (at least 4.5:1), the chrome colour on the ground, and the text colour a rail question switches to on the marker. On a light ground, rail text can stay one colour and the band copies are unnecessary (drop the `.qs .band` rules and the copy span in `makeMark`).

Replace the five pages with real reviews that each answer one phone question, and write the rail questions in the guest's words. Put the marker on the shortest phrase that settles the question (a clause, not a sentence). Keep three to six sentences per page; much longer pages grow taller than a phone screen and stick later. For other countries, pick the matching Playwrite variant and add it to `--hand-*` and the `HANDS` map; load only the hands you use. With more than about seven pages, the strips at the top crowd; reduce `--stack-step` or split the book.

If the product has no physical book, keep the structure (questions rail, stacked answers, one linking mark) and change the page furniture (column heads, ruling, stamp) and the ground (what the book lies on).

**Retiming or removing motion.** CSS durations and easings are tokens (`--dur-*`, `--ease-*`); GSAP timings sit inline in the script: `expo.out` for every entrance and state change, `power2.inOut` for the two wipes, `none` for the scrub. To drop a moment, delete its block: the load timeline (`loadSequence`), the depth scrub (the `motion && tall` loop in `buildStack`), the answer marks (the `motion` loop), or the rail spy (the `wide` loop). The page stays complete without any of them: marks fall back to static, anchors still move focus. `loadEnd` (1.35 s) holds the first stroke until the first page has settled; shorten it with the load. Never remove the reduced-motion branch or the `html.motion` guard (the class the CSS keys motion states on).

| Token | Role |
|---|---|
| `--ground` | Section field (the stove tile) |
| `--paper` | Guest-book page; all chrome on the ground; focus ring on the ground |
| `--slate` | All printed text on paper; rail question text on the marker |
| `--ink` | Handwriting, focus ring inside pages, field focus rule, submit fill |
| `--stamp` | The house stamp only |
| `--marker` | Marta's highlighter only |
| `--slate-soft` | Column heads, field rules, counter on paper |
| `--mist` | Leader lines and resting link rules on the ground |
| `--rule` | Ruling under handwriting (decorative, never a control boundary) |
| `--shade` / `--shade-max` | Tint (slate) and strength (.08) of the settle on a covered page |
| `--font-print` / `--font-cond` | Reddit Sans / Reddit Sans Condensed with fallbacks |
| `--hand-nl` `--hand-gb` `--hand-us` `--hand-cl` `--hand-de` | The five Playwrite hands; each page sets `--hand` to one |
| `--t-xs` to `--t-xl` | Printed scale on a 17 px root: 15, 17, 18, 22 px, H2 clamp(47-77 px) |
| `--t-hand` / `--t-hand-sm` / `--lh-hand` / `--hand-wght` | Remarks size clamp(20-24 px), head-row values 18 px, line-height 1.8, weight 350 |
| `--s-1` to `--s-9` | Spacing 4 to 119 px on a 17 px root |
| `--gutter` / `--max` / `--page-pad` | Side padding (16 px to 2.5 rem), max width 76 rem, page padding |
| `--stack-top` / `--stack-step` / `--stack-gap` | Where pages stick, the visible edge per page, space between pages in flow |
| `--stamp-size` / `--board-h` | Stamp diameter (96 px, 104 px from 1024 px), panorama board height (96, 180, 150 px) |
| `--col-room` / `--col-from-form` / `--col-room-form` | Room column on written pages; minimum From and Room columns on the blank page |
| `--btn-pad` / `--focus-margin` | Submit button padding; scroll margin that keeps focus rings inside the viewport |
| `--mk-up` / `--mk-down` | Highlighter reach above and below the baseline (larger on the rail) |
| `--ease-out` / `--ease-under` | expo.out; the underline curve cubic-bezier(.35,0,0,1) |
| `--dur-under` `--dur-hover` `--dur-rule` `--dur-fill-in` `--dur-fill-out` `--dur-press` `--dur-release` `--dur-err` | .45, .2, .3, .35, .25, .12, .4, .25 s |

## Motion

Everything runs inside one `gsap.matchMedia` (motion, fine, wide at 1024 px, tall at 641 px). Lenis runs on the GSAP ticker (`autoRaf: false`, `lagSmoothing(0)`, smooth wheel, touch stays native); cleanup removes the tick, restores lag smoothing (500, 33), destroys Lenis, reverts every split and clears `aria-current`. Crossing a breakpoint rebuilds the context and puts the reader back on the same page, at the same share of the way to the next one (pixel offsets differ per layout); the jump also clears Lenis's scrolling state. Hidden start states are set by the script only, in the motion branch; without JavaScript or under reduced motion every element is in its final state, scroll is native and the marks are static. No menu or dialog exists, so Lenis is never stopped; one added later must call `lenis.stop()` and `lenis.start()` around it. The load is one header gesture (board wipe, H2 lines), then the first page laid on the stack, then the pen: the stroke is the page's consequence. Animated properties are transform, opacity and clip-path, plus the catalogue's `grid-template-rows` error reveal; the covered-page shade is an opacity driven through the `--dim` variable. Dates (new page, status line, the blank page's Date) always come from the visitor's local clock at the moment of submit. Technique ids refer to `research/motion-techniques.md`.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| The panorama board opens from the left, labels and leader lines with it | MD1 | Load, t 0 | clip-path `inset(-3em 100% 0 0)` to `inset(-3em 0% 0 0)` (labels above the frame never clipped), 0.9 s expo.out | Visible |
| H2 lines rise from their masks | TX1 | Fonts ready (1.5 s cap), at t 0.15 | 1.0 s expo.out, stagger 0.08, autoSplit | Not split |
| The first page is laid on the stack: drops 28 px and straightens from a quarter of its stamp's angle | Load's main beat | Load, t 0.45; when the page starts below 85% of the viewport (short phones), once as it scrolls up to 85%, so the drop and the stroke after it are always seen | 0.9 s expo.out, y and rotation only (composes with the depth scrub's scale) | Static |
| **Signature**: pink sweeps under the rail question, then under the guest's answer | TX5 (per-word clip-path bands, one progress tween) with NV6 spy | As the page lands: its sentinel 120 px above where it sticks; the first page at 60% of the viewport, after it settles (1.35 s). Answer trigger live while the page is on top, from either direction; killed after its mark. During an anchor glide no mark sweeps; the target's stroke runs on landing | One pen speed: width / 700 px/s, clamped 0.45-1.1 s; answer at +0.15 s; power2.inOut | Static marks; current question marked instantly |
| Below 1024 px: "Marked for" question, then the answer | TX5 | Sentinel at 45%, same live range and glide rule | Same pen speed, answer at +0.15 s | Static marks |
| Rail mark leaves to the right, then resets invisibly | HV3 reset | Next page becomes current (a question passed during a glide, never marked, is reset silently) | 0.4 s power2.inOut | Instant |
| Covered page scales to 0.955 and settles under an 8% slate shade | SC6 | Scrub from the next page's first overlap to where it sticks | ease none | Pages stack, no scale or shade |
| Rail and mail underline enters left, leaves right, over a 1 px resting rule | HV2 | Hover (fine pointer), focus-visible; `:active` on every pointer (a tap draws it before the glide) | 0.45 s cubic-bezier(.35,0,0,1); 0.12 s on press | Instant; mail underline always shown |
| Anchors glide, then focus moves to the page (or the Name field) | NV6 | Click on any in-page link | min(1.3, 0.65 + distance/4000) s | Jump plus focus |
| Field rule darkens; an ink rule draws from the left on focus | SC16 as a focus response | Hover (fine pointer), focus | 0.2 s; 0.3 s expo.out | Instant |
| Name, Remarks and Date cross-fade into the chosen country's hand | State change | From select change | 0.1 s out, 0.1 s in | Instant swap |
| Error rows open under the fields | MI4 | Invalid submit | 0.25 s grid-template-rows | Instant |
| Submit fill enters from the edge the pointer crossed, label turns paper | HV4 | Pointer enter and leave; from the left on focus | 0.35 s in, 0.25 s out, expo.out | Colour change |
| Button press and release | MI1 | `:active` | 0.12 s press to 0.97, 0.4 s expo.out release | No scale |
| Your page is inserted, the stack rebuilds, the page glides into place and the violet house stamp lands | I7 (motion answers an action) | Valid submit | Scroll 1.0 s; stamp 1.18 to 1, -14 deg to its angle, 0.35 s expo.out | Inserted, instant jump, static stamp |

Hover effects apply only on `(hover: hover) and (pointer: fine)`. On every pointer, rail and mail links carry a 1 px resting rule (`--mist`; paper under "Add your page", the one action) so they read as links at rest; the current question drops it and carries only its pink mark. On touch, `:active`, focus and those resting rules carry the response.
