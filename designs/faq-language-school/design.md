---
title: Immersion course questions, glossed
section: faq
subject: Questions and answers for Escuela Ascensor, a fictional Spanish immersion school with homestays on Cerro Concepción, Valparaíso, Chile.
aesthetic: A linguist's interlinear gloss on the blued lime-wash walls of Valparaíso. SIL's own typefaces (Gentium for the Spanish and its glosses, Andika for the school's English), blue-black ink, the ultramarine of painted corrugated iron, and ochre house paint only where you act.
mode: light
fonts:
  - Gentium Book Plus 400 and 400 italic (Google Fonts)
  - Andika 400 and 700 (Google Fonts)
js: Collapses the shipped-open answers into an accordion whose rows spread their Spanish words apart and unfold a word-by-word gloss, pairs each Spanish word with its gloss on hover, tap or a one-off walk, opens and closes all 14 rows, routes in-page links to the right row or heading with focus moved, checks the question form inline and swaps in an in-page confirmation, and runs the GSAP and Lenis choreography (load build, rotating phrase with a Pause button, heading reveals, edge-aware fills) with final states under reduced motion; nothing is sent anywhere.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [faq, accordion, open-all, language-school, education, travel, interlinear-gloss, typography, rotating-phrase, pointer, form, light, gsap, lenis, detailed]
use_when:
  - An FAQ for anything taught or translated (language schools, translation services, interpreters, travel courses), where showing the second language is the product.
  - The section has one shared worry that can be put as a single sentence, and 8 to 20 real questions in 3 to 6 topics.
  - Readers compare answers side by side (prices and cancellation, levels and placement), so several rows must stay open and "Open all" earns its place.
  - A light, calm page for an anxious audience that still needs a memorable first screen.
avoid_when:
  - There is no second language, notation or code to gloss. Without it the ticks and glosses are decoration.
  - Answers are long documents with headings and tables; one 64ch column of short paragraphs is the scale this is built for.
  - The brand needs a dark or loud look, or the audience reads right-to-left (the word columns and Leipzig glosses assume a left-to-right gloss).
  - The page must show every answer in a print or static capture with no script. It does without JavaScript, but only open.
---

## Why it works

**The one bold idea: the student's worry, glossed like a linguist would.** Every immersion student asks some version of "¿Y si no le entiendo a nadie?". The section opens with that sentence set very large in Gentium Book Plus, the typeface SIL drew for linguists, and treats it as an interlinear example. Each Spanish word sits in its own column over a hairline tick and a Leipzig gloss (and, if, NEG, 3SG.DAT, understand-1SG, to nobody), with the free translation in quotes below. The last phrase turns over in three synchronised slots, Spanish, gloss and translation together: *a nadie / a mi familia / al chofer / a la profe*, the actual people a student fears not understanding. The answer to the worry is one link away ("Read how the first week works" opens the first-Monday row).

Everything else repeats that idea at a small scale or stays quiet:

- **Every row carries its own gloss.** Under each English question is how you would ask it in Valparaíso. Closed, it reads as an ordinary Spanish sentence. Open, the words slide apart to make room and each gloss rises under its word (¿Cuánto sale? / how.much come.out-3SG). Glossing is the page's only idea; Valparaíso lives in the palette and the copy, not in drawings.
- **The pointer effect is the gloss itself.** On a fine pointer, hovering a Spanish word (in the hero or in an open row) draws its tick in calamina and brings its gloss to full ink while the other glosses step back to slate. Touch gets it by tapping a hero word. Keyboard and reduced-motion users are not left out: the same pairing walks once through every word, 0.12s each, at the end of the hero load and whenever a row opens, so nothing depends on hover.
- **Two SIL faces with two jobs.** Gentium Book Plus is used for every word of Spanish (hero, row lines, glosses, inline words such as *la once* in answers) and nowhere else. Andika, SIL's face for learners with single-storey a and g and a distinct I and l, is the school speaking English: questions, answers, form, buttons. The split is a rule a reader learns in seconds.
- **Leipzig conventions, explained once.** Grammatical categories are capitals at 0.78em with +0.04em tracking, morpheme breaks are hyphens, multi-word glosses use periods (how.much, to.the). The Google builds of Gentium, Charis and Andika strip `smcp`, so true small caps were not possible; reduced capitals are the honest substitute. A gloss key under the lede explains every abbreviation, which is why the only capitals on the page are not template chrome.
- **Palette from the hill.** `--whitewash` #E9EEF6 is lime-wash with bluing, as Valparaíso painters mix it. `--ink` #1A2236 is blue-black, chosen rather than a tinted #111. `--calamina` #2443A0 is the ultramarine of painted corrugated iron and carries every gloss, link and focus ring. `--ochre` #F0BC42 is house paint and appears only as a fill when someone acts: buttons, and `--ochre-tint` #F5DFA6 behind a hovered row. `--red-pen` #AD2C14 is the teacher's correction ink and is used only for form errors. This is not default 1 (the ground is cool, not cream; Gentium is a low-contrast text serif, not a display; there is no terracotta) and not default 3 (one 64ch column with generous leading; the rules mark real question and topic boundaries).
- **Structure is information.** A 1.5px ink rule opens each topic and draws in when the topic arrives; 1px rules separate questions. The first-Monday answer is a real timetable (8:30, 9:00, 15:00), so it is an ordered list with times. Prices are a definition list. There are no eyebrows, no middle dots, no arrows, no shadows, no cards. Radii follow role: rows none, buttons and inputs 6px.
- **Several rows open at once, plus Open all.** People compare the cost and cancellation answers, so the accordion does not close other rows, and "Open all 14" / "Close all 14" opens the lot with a short stagger.
- **No dead ends.** "Ask your own question" in the header jumps to the form and focuses its heading. Four answers cross-link to the row they depend on and open it. The form validates in place and swaps to "Your question is with Carolina", with "Ask another question" (keeps name and email) and "Back to the questions". The only external link is a `mailto:` on a reserved `.example` domain, with `target="_blank" rel="noopener"`.

## Do not touch

- **The word-column structure of the gloss.** Each Spanish word, its tick and its gloss live in one inline-grid column, so alignment survives wrapping on a phone. Do not set the gloss as a separate line of text.
- **One slot timeline for three stacks.** The Spanish, gloss and translation options share one timeline index and one cell per stack (every option in `grid-area: 1 / 1`), so the slot is as wide as its longest option and never jitters. Keep the Pause button, the off-screen pause, the pause while the pointer is on the sentence, the 2.4s hold and the rule that a pause waits for the current turn to finish (WCAG 2.2.2).
- **The accessible heading.** The h2's accessible text is a visually hidden Spanish sentence (`lang="es"`) plus its English; the whole visual gloss, including the slot, is `aria-hidden`. Each row's Spanish line is also aria-hidden and repeated as a visually hidden `p lang="es"`.
- **Gentium for Spanish only.** Anything in Spanish gets Gentium through `:lang(es)`; nothing English does.
- **Ochre only on action.** No ochre text, borders or decorative bands. Red pen only on errors.
- **Panels ship open.** Every row is `is-open` with `aria-expanded="true"` in the markup; the script collapses them and sets `inert` on closed panels. If the CDN fails, the plain-JS core still runs the accordion, links and form; if JavaScript is off, every answer is readable.
- **Closed rows reserve no gloss width.** `.gw` is `width: 0` when closed so the Spanish reads as a sentence; the FLIP on toggle covers the jump. Removing it brings back uneven word gaps.
- **Contrast.** Ink 13.6:1, slate 6.1:1, calamina 7.6:1 and red pen 5.7:1 on the ground; ink 12.1:1, calamina 6.7:1 and slate 5.4:1 on the ochre tint; ink 9.0:1 on ochre; whitewash 13.6:1 on ink.

## Adapting

Start with the tokens, then the copy.

1. **Another language pair.** Replace the hero sentence with the worry your students actually have, gloss it word by word in Leipzig style, and pick three to four slot phrases that are real people or situations. Write each row's Spanish line as how a student would ask it locally (Chilean *¿cuánto sale?*, not textbook *¿cuánto cuesta?*). Change `:lang(es)` and every `lang="es"` to the target language. If the script is not Latin, choose a family that covers it and keep a separate one for the school's voice.
2. **Fonts.** Any pair of a text serif for the target language and a very legible sans works; keep them clearly distinct. Gentium and Andika were chosen because SIL made them for linguists and learners.
3. **Hero size.** `--step-hero` is capped at 5.25rem so the whole sentence fits one line in the 1320px frame from about 1024px wide. A longer sentence needs a lower cap, or accept the designed wrap (word columns keep their glosses).
4. **Rows.** Each row is `li.q > h4 > button` containing the question, the icon and an `il-row` line of `.w` columns (`.es` plus `.gw` holding `.tick` and `.gl`). Mark grammatical categories with `<small>`. Answers sit in `.panel > .panel-in > .ans`, max 64ch.
5. **Topics and counts.** Update the five topic links, the "14 questions in 5 topics" line and the "Open all 14" labels together.
6. **Facts.** The visa rules, bus route, prices and refund terms here are plausible for 2026 but fictional or approximate, and the school, director and address are invented. Verify before real use. The email uses the reserved `.example` domain on purpose; Chile has no reserved fictional phone range, so there is no phone or WhatsApp link.

| Token | Role |
|---|---|
| `--whitewash` | Page ground |
| `--ink` | Hero Spanish, questions, answers, primary button hover fill |
| `--slate` | Secondary text, free translation, field base underline, resting ticks, dimmed glosses while pairing |
| `--calamina` | Glosses, row Spanish lines, links, focus rings, focus underline, pairing tick |
| `--ochre` | Button fills (hover, focus, press) and the primary button |
| `--ochre-tint` | Row fill on hover and focus |
| `--red-pen` | Form errors and the invalid underline only |
| `--rule` | Question separators and the resting link hairline (non-text) |
| `--font-es` / `--font-en` | Spanish and glosses / the school's English |
| `--step--1` to `--step-2` | 1.25 scale from 17px: key and errors, body, questions and lede, topic headings and translation |
| `--step-hero` / `--step-gloss` | Fluid hero sentence and hero glosses |
| `--space-1` to `--space-10`, `--gutter`, `--measure`, `--page-max` | Spacing scale, side gutter, answer measure, frame width |
| `--radius` | Buttons |
| `--ease-*`, `--dur-*` | CSS-driven motion: accordion open and close, fills, label swaps, pairing, underlines, press and release, errors |

## Motion

Everything runs inside one `gsap.matchMedia` (motion, reduce, fine, wide). Lenis runs on GSAP's ticker (`autoRaf: false`, `lagSmoothing(0)`) and feeds `ScrollTrigger.update`; the cleanup removes the tick, restores `lagSmoothing(500, 33)`, destroys Lenis, removes listeners, clears inline fills, hides the Pause button and hands anchors back to native scrolling. Hidden starting states exist only under `html.js:not(.played)` with motion allowed, and only for what the load timeline animates. There are no menus or dialogs; Lenis is stopped only during the 0.25s form crossfade. Only transform, opacity and clip-path animate, plus the catalogue's `grid-template-rows` accordion and error reveals and the pairing colour change. The native cursor is never hidden. Technique ids refer to `research/motion-techniques.md`.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| School line and header link rise 8px and fade in | LD8 | Load, fonts ready (1.5s cap), 0s | 0.5s power2.out, stagger .08 | Static |
| **Hero words rise out of their own baselines** | TX1 (hand-built word masks, padded .14em for ¿ and descenders) | Load, 0.1s | 1.0s expo.out, stagger .06 | Visible |
| Ticks draw down from each word | SC16 | Load, 0.6s | 0.45s power3.out, stagger .05 | Static |
| Glosses rise under their ticks | TX1 | Load, 0.8s | 0.7s expo.out, stagger .05 | Visible |
| Free translation rises as one block | TX1 | Load, 1.25s | 0.9s expo.out | Visible |
| Lede, gloss key and Pause button fade in | LD8 | Load, 1.5s | 0.5s power2.out | Static, no Pause button |
| Topic links slide 12px in | LD8 | Load, 1.6s | 0.5s power3.out, stagger .04 | Static |
| Pairs walk once across the hero | HV7-style pairing | Load, 2.1s | 0.12s per word | Same walk, instant colour steps |
| **Last phrase turns over in three slots** | TX6 | First turn at 3.2s, then every 3.4s | Out 0.5s power3.in, in 0.6s power3.out from 0.4s, hold 2.4s | Fixed on "a nadie / to nobody / anyone" |
| Phrase pauses off screen, under the pointer, and on Pause | TX6 with ScrollTrigger | Toggle, pointer, button | Waits for the current turn to end | n/a |
| Tab during the load | Keyboard guard | First Tab while the intro runs | Intro plays at 4x | n/a |
| Topic and form headings rise line by line | TX1 (SplitText lines, mask) | Group top at 85% of the viewport, once | 1.0s expo.out, stagger .08, 0.1s behind the rule | Visible, not split |
| Topic rule draws from the left, leading its heading | SC16 | Same trigger | 1.0s expo.out | Static |
| Hovering a Spanish word lights its tick and gloss, others to slate | HV7-style pairing | Pointer enter (fine), tap on hero words (touch) | 0.2s | Instant |
| Row opens: panel and gloss rows unfold | CD6 | Click, Enter, Space | Open 0.6s cubic-bezier(.625,.05,0,1), close 0.38s cubic-bezier(.4,0,.2,1) | Instant |
| Spanish words slide apart for their glosses (and back on close) | CD5-style FLIP, hand-rolled | Toggle | Open 0.6s expo.out, close 0.38s power3.out | Instant jump |
| Gloss words rise, ticks draw, answer fades up; pairs walk once | TX1, SC16 | Row opens | Ticks 0.35s, glosses 0.5s expo.out, stagger .035 from 0.12s; answer 0.4s from 0.15s; walk from 0.45s | Instant, walk still runs |
| Plus turns to minus | Icon morph | Toggle | 0.4s power3.inOut | Instant |
| Row fill enters from the nearest edge and leaves through the edge crossed | HV4 (clip-path) | Pointer enter and leave (fine); from the left on keyboard focus | 0.35s power3.out in, 0.3s power3.in out | Instant fill |
| Open all / Close all, Pause / Play labels swap in a masked slot | MI2 | Click | 0.4s | Instant |
| Pause icon morphs between bars and triangle | Clip-path morph | Click | 0.3s | Instant |
| Buttons fill from the entry edge (ochre; ink on Send, with the label turning whitewash) | HV4 | Pointer, keyboard focus, `:active` | 0.35s in, 0.3s out | Instant |
| Buttons press and release | MI1 | `:active` | 0.1s to scale .96 (.97 on Send), 0.4s release | No scale |
| Open all staggers the rows | CD6 | Click | 0.04s per row, refresh after 0.8s | All at once |
| Link underline sweeps in from the left and out to the right | HV2 | Hover, focus, `:active` | 0.35s cubic-bezier(.35,0,0,1) | Instant |
| Anchors glide, open the target row, move focus | NV6 | Any in-page link | Lenis 1.2s expo-out | Native jump, focus moved |
| Field underline thickens; focus underline draws from the left; label turns calamina | MI4 | Hover, focus | 0.2s, 0.4s | Instant |
| Error line unfolds in red pen; first invalid field focused | MI4 | Submit | 0.3s | Instant |
| Form fades, confirmation heading rises | Crossfade with TX1 | Valid submit; "Ask another question" reverses | 0.25s out, 0.8s expo.out heading, 0.4s body | Instant swap, focus moved |

Touch keeps native scrolling (Lenis `syncTouch` stays off). Every hover has a touch and keyboard equivalent: `:active` fills on buttons and rows, tap pairing on hero words, the walk when a row opens, and fills from the left on keyboard focus.

**Retiming or removing.** CSS-driven timings are the `--dur-*` and `--ease-*` tokens. The GSAP timings live in the script: the load timeline (`intro`) positions, the slot constants in `T` (`hold`, `out`, `in`, `overlap`, `slotStart`), the row tweens in `env.onOpen` and `env.flip`, and `STEP` for the pairing walk. To drop the rotating phrase, delete the extra options from the three `.stack` elements and the Pause button; the slot code then has nothing to turn. To drop the FLIP, delete `env.flip` (rows then jump to their glossed spacing). To drop all GSAP motion, remove the four CDN tags: the plain-JS core keeps the accordion, pairing, links and form working with CSS transitions.
