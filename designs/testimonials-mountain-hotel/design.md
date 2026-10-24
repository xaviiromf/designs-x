---
title: Ask the guest book
section: testimonials
subject: Gasthof Zirmegg (fictional), an eleven-room mountain hotel at 1,780 m at the head of the Lärchtal in Tyrol, run by Marta and Sepp Kofler, showing entries from the guest book on the stove bench in its Stube.
aesthetic: A stack of guest-book pages in five national school handwritings on blue shadowed snow, with the owner's Alpenrose-pink highlighter linking the questions people phone about to the guests who answered them.
mode: light
fonts:
  - Ubuntu Sans (Google Fonts, variable wdth 75-100 and wght 400-700)
  - Playwrite NL, Playwrite GB S, Playwrite US Trad, Playwrite CL, Playwrite DE Grund (Google Fonts, variable wght 100-400, used at 350)
js: Smooth-scrolls the page, stacks the guest-book pages with depth as you scroll, sweeps Marta's highlighter under each question and its answer, follows the pointer across the panorama board, and adds your own handwritten page from the form.
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

**The bold idea: the pink mark finds the answer.** Before people book, they phone with the same five questions. The rail lists those questions; the stack holds five guest-book pages in date order. As each page is laid onto the stack (the first one as part of the page load), Marta's highlighter sweeps under the question in the sticky rail and, 0.15 s later, sweeps in the same direction, on the same `power2.inOut` curve, under the guest's handwritten line that answers it. One stroke in two places links a question the reader has to the guest who answered it. The answer mark stays (it is ink); the rail mark wipes out to the right when the next page lands. Below 1024 px, where the rail has scrolled away, the first half of the stroke lands on the page's own printed note "Marked for: ...", set at the top of the page so the question comes before the answer. The marker pink is used for nothing else on the page.

- **TX5 is justified here, not decoration.** Default 7 warns against accenting a word. The mark never touches the heading: it sits on the one phrase in a guest's entry that answers a question the reader is asking, and on that question in the rail, which is what a hotel owner's highlighter in a real guest book does.
- **Five hands, one family.** Each page is set in the Playwrite school-handwriting model of the country the guest wrote "From": the Dutch family in Playwrite NL, the Kendal couple in GB S, the Minnesotans in US Trad, the translator from Valparaíso in CL, the guest from Freiburg in DE Grund. Guest books are many hands; that is content truth, not mood. The guests also write the date their own way (14-2-2026, 3rd July 2026, Aug 22, 2026, 9/9/2026, 11.10.2026); the house stamp gives every page the same printed date. Playwrite CH does not exist, so the hotel is in Tyrol rather than Graubünden, and no unused variant is loaded.
- **One printed voice.** Everything printed (hotel line, H2, intro, rail, column heads, peak labels, form labels, button, status) is Ubuntu Sans: condensed (wdth 78, 600) for the H2 and the book's column heads, normal width (400 to 500) for reading text.
- **The book's own structure.** Every page carries the same printed column heads (Date, Name, From, Room, Remarks) in a `dl`, the handwriting sits on ruled lines drawn at the baseline (every Playwrite hand puts its baseline at 0.75 of a 1.8 line box, so one ruling fits all five), and the blank last page is the form, with the column heads as its labels.
- **Stacked, not pinned.** Pages are `position: sticky`, offset 1.5 rem (0.75 rem on phones) so covered pages leave edges like a closed book. A covered page scales to 0.955 and falls into the same blue snow shade as the ground, only while the next page is actually over it, so the page being read stays white.
- **A quiet panorama board.** The hotel line sits over a Panoramatafel of the view from the terrace: snow-white land under the blue sky, five fictional peaks, and each name and altitude printed above its summit on a slanted leader line, at every width (on phones "Hinterer Ferner" takes two lines). On a fine pointer a 1 px sighting line follows the pointer; on a peak a small label at its foot names it. On touch, a tap snaps the line to the nearest peak and the label fades after 3 s. Nothing is hover-only (all names are printed and in the drawing's `aria-label`).
- **Your page answers your action.** A valid submit writes a new page dated today (the visitor's clock, `en-GB`, d MMMM yyyy) in the hand of the chosen country, inserts it before the blank page, glides to it, and the green-black house stamp lands on it: the only stamp that moves. It carries no pink mark, because Marta marks a line when she reads it.

**Palette (six core colours, one meaning each).** `--ground` #CBD7EE is snow in the larches' shade at 4 pm: blue, not grey (delta-E 12.8 to 15.3 against the collection's pale cool greys #E3E8E5, #E3E9EB, #EEF3F4). `--paper` #FBFBF9 neutral white. `--slate` #22303A everything printed (13.1:1 on paper, 9.3:1 on ground). `--ink` #3438B8 Pelikan-style violet-leaning school blue for handwriting, focus and the submit fill (8.4:1 on paper). `--stamp` #2E4B3C green-black stamp-pad ink, the house stamp only (9.3:1), kept off the pink and violet families so pink has one meaning. `--marker` #F7B2CF cool Alpenrose pink, the Tyrolean flower, Marta's highlighter only (ink on it 5.1:1, slate 7.9:1).

**Reasoned defaults and collection notes.**
- Default 1: the first instinct was stone-pine panelling and a cream page; it became cool blue snow, neutral paper, school ink, a green-black stamp and an Alpenrose-pink highlighter, with no serif at all.
- Default 5: no eyebrow (the hotel line is real information: name, altitude, valley), commas not middle dots, no arrows, no monospace. The capitals on the stamp are the rubber stamp's own lettering.
- Default 4 and 8: pages have a 2 px radius, a 1 px edge and no blur shadow; depth comes only from the stack. Pages are not interactive, so they get no hover. Sections do not fade up; pages arrive because you scroll them.
- No numbered markers: the dates already order the pages, and the order is truly chronological, as in the book.
- Cut on review: owner margin notes in a sixth hand, a stamp thump on every page, a child's drawing, pointer parallax on layered mountains, a bearing readout on the sighting line, and two glacier strokes in the drawing.
- Collection clashes resolved: Ubuntu Sans instead of Instrument Sans (taken by seven other plans); the marker is a cool, blue-leaning Alpenrose pink (#F7B2CF) rather than hero-perfumery's warmer rhubarb blush (#F1A7B6), and it only ever appears as a highlighter band on text, never as a field or a garment colour like the surf school's; the ground moved off faq-camper-rental's grey; the ink moved off the royal-blue cluster and the stamp off the violets (crud-gradebook) to green-black. Encode Sans was considered as a less branded width-axis grotesque but is taken by portfolio-studio, so Ubuntu Sans stays.

## Do not touch

- **The two places of one stroke.** Rail question first, answer 0.15 s later, same direction and curve; the answer mark stays, the rail mark wipes out right; the "Marked for" note takes the question's half below 1024 px. Pink is used for nothing else, including hover (rail hover is a slate underline).
- **Mark geometry.** `--mk-up` and `--mk-down` (the band's reach above and below the baseline) drive both the static mark (a thick `text-decoration` underline, used without JavaScript and under reduced motion) and the animated per-word bands, so both look the same. The script measures each phrase's baseline, so the bands fit every hand.
- **The ruling.** Handwriting uses line-height 1.8 and the ruling is drawn at 0.75lh. Change one and the lines miss the baselines.
- **Sentinels.** Every page is preceded by a zero-height `.sent` in flow. All ScrollTriggers and anchor targets use the sentinel, never the sticky page, because ScrollTrigger mis-measures stuck elements after a refresh. Inserted pages get one too.
- **Covered pages show only edges.** Each page's `min-height` is the running maximum of the pages before it (`--min`, set by `fitPages`), so a short page, such as the visitor's own, covers a longer one and no ghost bottom or stamp shows below it.
- **Sticky tops that fit.** A page's top is `min(stack offset, 100svh - its height - 1rem)`, with the height in `--h` from a ResizeObserver, so no page is covered before its bottom has been on screen; the rail uses the same rule. Below 640 px of viewport height the pages do not stick at all. An anchor to a page taller than the screen arrives with its head row at the top, not at its (negative) sticky top. Without the script `--h` falls back to 0 and the plain stack offsets apply.
- **Accessibility.** The section is labelled by the H2; the rail is a `nav`; each page is an `article` labelled by its handwritten name (`h3`) with `tabindex="-1"` so anchors move focus to it (ring: 2 px ink, 3 px offset). Marked phrases are split with `aria: 'none'` into plain spans, so each phrase still reads as one string; bands are `aria-hidden`. The stamp and the sighting line are `aria-hidden`; peak names are printed and in the drawing's `aria-label`. Form labels are the printed column heads; errors use `aria-invalid` and `aria-describedby`, appear without apology, and focus moves to the first invalid field. The character counter only speaks at 40 and 0 left.
- **No dead ends.** Rail links and "Read your page" go to existing page ids and move focus (the form link focuses the Name field); the mailto opens with `target="_blank" rel="noopener"`; the form handles `submit` in script and answers with a new page and a status line linking to it. `#selftest` runs `runSelfTest` (validation, insertion, hand, status link).

## Adapting

Map the brand onto the `:root` tokens first. Keep one meaning per colour: a marker colour that appears anywhere else breaks the idea. Check the marker under the handwriting colour (at least 4.5:1) and the ground against the paper edges.

Replace the five pages with real reviews that each answer one phone question, and write the rail questions in the guest's words. Put the marker on the shortest phrase that settles the question (a clause, not a sentence). Keep three to six sentences per page; much longer pages grow taller than a phone screen and stick later. For other countries, pick the matching Playwrite variant (Google Fonts has many) and add it to `--hand-*` and the `HANDS` map; load only the hands you use. With more than about seven pages, the strips at the top crowd; reduce `--stack-step` or split the book.

If the product has no physical book, keep the structure (questions rail, stacked answers, one linking mark) and change the page furniture (column heads, ruling, stamp).

**Retiming or removing motion.** CSS durations and easings are tokens (`--dur-*`, `--ease-*`); GSAP timings sit inline in the script: `expo.out` for every entrance and state change, `power2.inOut` for the two wipes, `none` for the scrub. To drop a moment, delete its block: the load timeline (`loadSequence`), the depth scrub (the `motion && tall` loop in `buildStack`), the answer marks (the `motion` loop), the rail spy (the `wide` loop), or the sighting line (`sighting`). The page stays complete without any of them: marks fall back to static, anchors still move focus. Never remove the reduced-motion branch or the `html.motion` guard (the only class the CSS keys motion states on).

| Token | Role |
|---|---|
| `--ground` | Section field; also the shade a covered page falls into |
| `--paper` | Guest-book page |
| `--slate` | All printed text and the panorama line |
| `--ink` | Handwriting, focus ring, field focus rule, submit fill, the rail's "Write your own page" action |
| `--stamp` | The house stamp only |
| `--marker` | Marta's highlighter only |
| `--slate-soft` | Printed column heads, field rules, peak leader lines (6.5:1 on paper, 4.6:1 on ground) |
| `--rule` | Ruling under handwriting (decorative, never a control boundary) |
| `--shade` / `--shade-max` | Tint and strength of a covered page |
| `--font-print` | Ubuntu Sans with system fallbacks |
| `--hand-nl` `--hand-gb` `--hand-us` `--hand-cl` `--hand-de` | The five Playwrite hands; each page sets `--hand` to one |
| `--wdth-cond` | Condensed width (78%) for the H2, column heads and labels |
| `--t-xs` to `--t-xl` | Printed scale on a 17 px root: 15, 17, 18, 22 px, H2 clamp(47-77 px) |
| `--t-hand` / `--t-hand-sm` / `--lh-hand` / `--hand-wght` | Remarks size clamp(20-24 px), head-row values 18 px, line-height 1.8, weight 350 |
| `--s-1` to `--s-9` | Spacing 4 to 119 px on a 17 px root |
| `--gutter` / `--max` / `--page-pad` | Side padding (16 px to 2.5 rem), max width 76 rem, page padding |
| `--stack-top` / `--stack-step` / `--stack-gap` | Where pages stick, the visible edge per page, space between pages in flow |
| `--stamp-size` / `--board-h` | Stamp diameter (80/104 px), panorama board height, labels included (150/180/210 px at 0/600/1024 px) |
| `--mk-up` / `--mk-down` | Highlighter reach above and below the baseline |
| `--ease-out` / `--ease-under` | expo.out; the underline curve cubic-bezier(.35,0,0,1) |
| `--dur-under` `--dur-hover` `--dur-rule` `--dur-fill-in` `--dur-fill-out` `--dur-press` `--dur-release` `--dur-err` | .45, .2, .3, .35, .25, .12, .4, .25 s |

## Motion

Everything runs inside one `gsap.matchMedia` (motion, fine, wide at 1024 px, tall at 641 px). Lenis runs on the GSAP ticker (`autoRaf: false`, `lagSmoothing(0)`); cleanup removes the tick, restores lag smoothing, destroys Lenis, removes the panorama listeners, reverts every split and clears `aria-current`. Crossing a breakpoint rebuilds the context, and ScrollTrigger's refresh after it would restore scroll 0, so the cleanup saves `scrollY` and the next build puts it back on the first `refresh` event. Hidden start states are set by the script only, in the motion branch; without JavaScript or under reduced motion every element is in its final state, scroll is native and the marks are static. No menu or dialog exists, so Lenis is never stopped; one added later must call `lenis.stop()` and `lenis.start()` around it. Animated properties are transform, opacity and clip-path, plus the catalogue's `grid-template-rows` error reveal; the covered-page shade is an opacity driven through the `--dim` variable. Technique ids refer to `research/motion-techniques.md`.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Hotel line rises 6 px | LD8 | Load, t 0 | 0.4 s expo.out | Static |
| Panorama opens from the left while the drawing settles from 1.12 | MD1 | Load, t 0.1 | 1.6 s expo.out, shared; clip cleared | Visible |
| Peak labels appear | LD8 | Load, t 0.9 | 0.4 s, stagger 0.06 | Visible |
| H2 lines rise from their masks | TX1 | Fonts ready (1.5 s cap), t 0.35 | 1.0 s expo.out, stagger 0.08, autoSplit | Not split |
| Intro fades in | LD8 | Load, t 0.6 | 0.6 s | Visible |
| Rail questions, "Write your own page" and the mail line rise from masks (links stay focusable) | TX1 (per item) | Load, t 0.75 | 0.7 s expo.out, from yPercent 140 (clear of the mask's padding), stagger 0.06 | Static |
| The first page is laid onto the book (if it is on screen) | Page landing | Load, t 0.45 | y 56 and rotation 1.5 deg to rest, 0.9 s expo.out, transform only; the first stroke waits for it (1.35 s) | Static |
| **Signature**: green sweeps under the rail question, then under the guest's answer | TX5 (per-word bands driven by one progress tween) with NV6 spy | As the page lands: its sentinel 120 px above where it sticks (answer `once`); the first page at 60% of the viewport, waiting for its landing | Rail 0.65 s, answer 0.8 s at +0.15 s, power2.inOut | Static marks; current question marked instantly |
| Below 1024 px: "Marked for" question, then the answer | TX5 | Sentinel at 45%, once (note at the page top and the answer both on screen) | 0.65 s, answer at +0.15 s | Static marks |
| Rail mark leaves to the right, resets invisibly | HV3 reset | Next page becomes current | 0.4 s power2.inOut | Instant |
| Covered page scales to 0.955 and falls into the snow shade | SC6 | Scrub from the next page's first overlap to where it sticks | ease none | Pages stack, no scale or shade |
| Rail and mail underline enters left, leaves right | HV2 | Hover, focus-visible; persistent on the current item and the mail link on touch | 0.45 s cubic-bezier(.35,0,0,1) | Instant; mail underline always shown |
| Anchors glide, then focus moves to the page (or the Name field) | NV6 | Click on any in-page link | min(1.3, 0.65 + distance/4000) s | Jump plus focus |
| Sighting line follows the pointer; on a peak its name rises in a masked label | CU1 (state follower, native cursor kept) | Pointer over the board (fine); a tap snaps to the nearest peak (touch) | quickTo 0.35 s power3.out; label 0.25 s expo.out; fade 0.2 s | Off |
| Field rule darkens; an ink rule draws from the left on focus | SC16 as a focus response | Hover (fine pointer), focus | 0.2 s; 0.3 s expo.out | Instant |
| Name, Remarks and Date cross-fade into the chosen country's hand | State change | From select change | 0.1 s out, 0.1 s in | Instant swap |
| Error rows open under the fields | MI4 | Invalid submit | 0.25 s grid-template-rows | Instant |
| Submit fill enters from the edge the pointer crossed, label turns paper | HV4 | Pointer enter and leave; from the left on focus | 0.35 s in, 0.25 s out, expo.out | Colour change |
| Button press and release | MI1 | `:active` | 0.12 s press to 0.97, 0.4 s expo.out release | No scale |
| Your page is inserted, the stack rebuilds, the page glides into place and the house stamp lands | I7 (motion answers an action) | Valid submit | Scroll 1.0 s; stamp 1.18 to 1, -14 deg to its angle, 0.35 s expo.out | Inserted, instant jump, static stamp |

Hover effects apply only on `(hover: hover) and (pointer: fine)`; on touch, `:active`, focus and the persistent underlines carry the response: the mail link fully, the questions as a quiet resting underline (35% opacity) that the current question drops, so it carries only its pink mark.
