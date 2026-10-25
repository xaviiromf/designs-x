---
title: Immersion course questions, glossed
section: faq
subject: Questions and answers for Escuela Ascensor, a fictional Spanish immersion school with homestays on Cerro Concepción, Valparaíso, Chile.
aesthetic: A linguist's interlinear gloss on the lilac lime-wash of Valparaíso's hills. SIL's own typefaces (Gentium for the Spanish and its glosses, Andika for the school's English), blue-black ink, the ultramarine of a linguist's pen for glosses, and painted-house aqua only where you act.
mode: light
fonts:
  - Gentium Book Plus 400 and 400 italic (Google Fonts)
  - Andika 400 and 700 (Google Fonts)
js: Collapses the shipped-open answers into an accordion whose rows spread their Spanish words apart and unfold a word-by-word gloss, probes a Spanish word's gloss on hover or tap and every gloss carrying a grammatical term from the key, opens and closes all 14 rows, routes in-page links to the right row or heading with focus moved, checks the question form inline and swaps in an in-page confirmation, and runs the GSAP and Lenis choreography (load build, rotating phrase with a Pause button, scrubbed reverse build of the hero, heading reveals, edge-aware fills) with final states under reduced motion; nothing is sent anywhere.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [faq, accordion, open-all, language-school, education, travel, interlinear-gloss, typography, rotating-phrase, pointer, form, light, gsap, lenis, scrolltrigger, splittext, detailed]
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

**The one bold idea: the student's worry, glossed like a linguist would.** Every immersion student asks some version of "¿Y si no le entiendo a nadie?". The section opens with that sentence set very large in Gentium Book Plus, the typeface SIL drew for linguists, and treats it as an interlinear example. Each Spanish word sits in its own column over a hairline tick and a Leipzig gloss (and, if, NEG, 3SG.DAT, understand.1SG, to, nobody), with the free translation in quotes below. The opening ¿ hangs in the margin, because interlinear alignment ignores punctuation: the tick and "and" sit under the Y. On load the example builds in layers: the words rise out of their baselines, the ticks draw down, the glosses rise, then the translation. The last phrase then turns over as a whole interlinear phrase, word by word (a | nadie over to | nobody, a | mi | familia over to | my | family, al | chofer over to.the | driver, a | la | profe over to | the | teacher), with the translation changing to match: the actual people a student fears not understanding. Each turn replays the build at small scale. As the hero scrolls away, the build runs backwards and leaves only the English. The answer to the worry is one link away ("Read how the first week works" opens the first-Monday row).

Everything else repeats that idea at a small scale or stays quiet:

- **Every row carries its own gloss.** Under each English question is how you would ask it in Valparaíso. Closed, it reads as an ordinary Spanish sentence. Open, the words slide apart to make room and each gloss rises under its word (¿Cuánto sale? / how.much come.out.3SG). Glossing is the page's only idea; Valparaíso lives in the palette and the copy, not in drawings.
- **The pointer effect is the gloss itself.** On a fine pointer, hovering a Spanish word probes its column: the word and its gloss turn ink over a 2px calamina underline drawn from the left, the tick thickens, the hero column lifts 0.05em, and every other Spanish word and gloss on the page steps back to slate. The same single marker is used everywhere, in the hero and in the rows. On touch, a tapped hero word stays probed until the next tap. The visual sentence is not focusable, so the keyboard way in is the gloss key: each term (1SG, 3SG, DAT...) is a toggle button that, on focus, hover or press, lights every gloss on the page that carries it, in the hero and in every row. The rotating phrase holds still while the hero is probed.
- **Two SIL faces with two jobs.** Gentium Book Plus is used for Spanish, its glosses and the free translation (hero, row lines, glosses, inline words such as *la once* in answers, the gloss key terms). Andika, SIL's face for learners with single-storey a and g and a distinct I and l, is the school speaking English: questions, answers, form, buttons. The split is a rule a reader learns in seconds.
- **Leipzig conventions, done properly and explained once.** The Spanish is written unsegmented, so every gloss uses periods for meanings carried by one word (understand.1SG, how.much, to.the, speak.INF, change.INF), never hyphens. Grammatical categories are capitals at 0.78em with +0.04em tracking (0.72em and no tracking in the hero, so 3SG.DAT is barely wider than *le*). The *que* of *tengo que* is glossed COMP, not "that". The Google builds of Gentium, Charis and Andika strip `smcp`, so true small caps were not possible; reduced capitals are the honest substitute. The gloss key under the lede explains every abbreviation, which is why the only capitals on the page are not template chrome.
- **Palette from the hill, kept off the collection's defaults.** `--whitewash` #F6EFFC is lime-wash with a lilac cast, moved away from the cool off-whites other designs use and away from cream (Gentium on cream would be default 1). `--ink` #1A2236 is blue-black, chosen rather than a tinted #111. `--calamina` #2443A0 is the linguist's ultramarine pen: every gloss, link and focus ring. `--aqua` #8FDCC4 is the turquoise house paint of the cerros and appears only as a fill when someone acts: buttons and pressed key terms, with `--aqua-tint` #D0F1E6 behind a hovered or focused row. There is no yellow, so the page does not repeat the collection's ultramarine-and-ochre pairing. `--red-pen` #A3192F is the teacher's correction ink and is used only for form errors.
- **Structure is information.** A 1.5px ink rule opens each topic and draws in when the topic arrives; 1px rules separate questions. The first-Monday answer is a real timetable (8:30, 9:00, 15:00), so it is an ordered list with times. Prices are a definition list. There are no eyebrows, no middle dots, no arrows, no shadows, no cards and no sticky rail: the five topics are one wrapping row of links beside the lede. Topic headings are a display step (2.4rem) above the 1.33rem questions, with extra space before each rule, so a topic opens like a chapter. From 1100px everything below the hero uses two columns: headings and the lede on the left, content in a 52rem column that starts near the hero's "entiendo" and ends at the frame's right edge, where "Open all" sits. Radii follow role: buttons and key terms 6px; rows and inputs square.
- **Several rows open at once, plus Open all.** People compare the cost and cancellation answers, so the accordion does not close other rows, and "Open all 14" / "Close all 14" opens the lot with a short stagger.
- **No dead ends.** "Ask your own question" in the header jumps to the form and focuses its heading. Four answers cross-link to the row they depend on and open it. The form validates in place and swaps to "Your question is with Carolina", with "Ask another question" (keeps name and email) and "Back to the questions". The only external link is a `mailto:` on the reserved `.example` domain, with `target="_blank" rel="noopener"`.

## Do not touch

- **The word-column structure of the gloss.** Each Spanish word, its tick and its gloss live in one inline-grid column, so alignment survives wrapping on a phone. Do not set the gloss as a separate line of text.
- **Periods, not hyphens.** The Spanish is not segmented into morphemes, so a hyphen in a gloss would be wrong under Leipzig rules 2 and 4. If you segment a word (entiend-o), segment the gloss the same way.
- **The slot rotates whole interlinear phrases.** Each `.slot > .opt` is its own run of word columns (Spanish, tick, gloss per word), all stacked in one grid cell, so the slot is as wide as its longest option and never jitters; the free translation is a matching `.stack`. Only the shown option (`.cur`) takes pointer events. One timeline drives both. Keep the Pause button, the pause once the hero starts to scroll away, the pause under the pointer and while the hero is probed, the 2.4s hold and the rule that a pause waits for the current turn to finish (WCAG 2.2.2).
- **Hanging punctuation.** An opening ¿ is wrapped in `span.p` and hangs outside its word (`right: 100%`), so ticks and glosses align with the letter. Below 640px the gutter is too narrow, so the first hero column is indented by the ¿'s width instead.
- **The accessible heading.** The h2's accessible name is only its visually hidden text: a `lang="es"` span with the Spanish and a `lang="en"` span with the English ("¿Y si no le entiendo a nadie? And what if I can't understand anyone?"). The whole visual gloss, including every slot option, is `aria-hidden`, so the rotating copies never reach the name. Each row's Spanish line is also aria-hidden and repeated as a visually hidden `p lang="es"`.
- **The key is the keyboard path to the probe.** The hero stays unfocusable; the nine key terms are real `button`s with `aria-pressed`, described by the key note, 32px tall (40px on coarse pointers) so the touch path to the probe is easy to hit. Removing them leaves keyboard and touch users without the pairing.
- **Gentium for Spanish, its glosses and the free translation; Andika for the school's own voice.** Anything in Spanish gets Gentium through `:lang(es)`; questions, answers, form and buttons stay in Andika.
- **Aqua only on action.** No aqua text, borders or decorative bands. Red pen only on errors.
- **Panels ship open.** Every row is `is-open` with `aria-expanded="true"` in the markup; the script collapses them and sets `inert` on closed panels. If the CDN fails, the plain-JS core still runs the accordion, probe, links and form; if JavaScript is off, every answer is readable.
- **Closed rows reserve no gloss width.** `.gw` is `width: 0` when closed so the Spanish reads as a sentence; the FLIP on toggle covers the jump. Removing it brings back uneven word gaps.
- **Contrast.** On the ground: ink 14.1:1, slate 6.3:1, calamina 7.8:1, red pen 6.8:1. On the aqua tint: ink 13.1:1, calamina 7.3:1, slate 5.9:1. Ink on aqua 10.0:1; whitewash on ink 14.1:1.

## Adapting

Start with the tokens, then the copy.

1. **Another language pair.** Replace the hero sentence with the worry your students actually have, gloss it word by word in Leipzig style, and pick three to four slot phrases that are real people or situations. Write each row's Spanish line as how a student would ask it locally (Chilean *¿cuánto sale?*, not textbook *¿cuánto cuesta?*). Change `:lang(es)` and every `lang="es"` to the target language. If the script is not Latin, choose a family that covers it and keep a separate one for the school's voice.
2. **Gloss key.** List every abbreviation your glosses use, one `button.k` per term; the probe matches a term against the `<small>` parts of each gloss, split on periods, so `3SG.DAT` answers to both 3SG and DAT.
3. **Fonts.** Any pair of a text serif for the target language and a very legible sans works; keep them clearly distinct. Gentium and Andika were chosen because SIL made them for linguists and learners.
4. **Hero size.** `--step-hero` runs from 3rem (the phone sentence breaks over three lines: ¿Y si no le / entiendo / a nadie?) to 5.25rem, so the whole sentence fits one line in the 1320px frame from about 1024px wide. A longer sentence needs a lower cap, or accept the designed wrap (word columns keep their glosses).
5. **Rows.** Each row is `li.q > h4 > button` containing the question, the icon and an `il-row` line of `.w` columns (`.es` plus `.gw` holding `.tick` and `.gl`). Mark grammatical categories with `<small>`, and wrap an opening ¿ in `<span class="p">`. Answers sit in `.panel > .panel-in > .ans`, max 64ch.
6. **Topics and counts.** Update the five topic links, the "14 questions in 5 topics" line and the "Open all 14" labels together.
7. **Facts.** The visa rules, bus route, prices and refund terms are plausible for 2026 but fictional or approximate, and the school, director and address are invented. Verify before real use. The only contact is an email on the reserved `.example` domain; there is no phone or WhatsApp link, since Chile has no reserved fictional number range and an invented one could reach a real person.

| Token | Role |
|---|---|
| `--whitewash` | Page ground; label colour on the ink-filled Send button |
| `--ink` | Hero Spanish, questions, answers, probed columns, Send hover fill |
| `--slate` | Secondary text, free translation, field base underline, resting ticks, glosses that step back during a probe |
| `--calamina` | Glosses, row Spanish lines, links, key terms, focus rings, focus underline |
| `--aqua` | Button fills (hover, focus, press), the Send button, pressed key terms |
| `--aqua-tint` | Row fill on hover and focus; key term hover and focus |
| `--red-pen` | Form errors and the invalid underline only |
| `--rule` | Question separators, key term outlines and the resting link hairline (non-text) |
| `--font-es` / `--font-en` | Spanish and glosses / the school's English |
| `--step--1` to `--step-2` | 1.25 scale from 17px: key and errors, body, questions and lede, translation and the confirmation heading |
| `--step-3` | Display step for topic and form headings (2rem to 2.4rem) |
| `--step-sc`, `--step-sc-hero`, `--step-es-inline` | Reduced capitals in glosses (0.78em, 0.72em in the hero) and inline Spanish in answers (1.08em) |
| `--step-hero` / `--step-gloss` | Fluid hero sentence and hero glosses |
| `--space-1` to `--space-10`, `--gutter`, `--measure`, `--page-max` | Spacing scale, side gutter, answer measure, frame width |
| `--radius` | Buttons, key terms (rows and inputs are square) |
| `--ease-*`, `--dur-*` | CSS-driven motion: accordion open and close, fills, label swaps, probe, underlines, icon, press and release, errors |

## Motion

Everything runs inside one `gsap.matchMedia` (motion, reduce, fine, wide). Lenis runs on GSAP's ticker (`autoRaf: false`, `lagSmoothing(0)`) and feeds `ScrollTrigger.update`; the cleanup removes the tick, restores `lagSmoothing(500, 33)`, destroys Lenis, removes listeners, clears inline fills, hides the Pause button and hands anchors back to native scrolling. Hidden starting states exist only under `html.js:not(.played)` with motion allowed, and only for what the load timeline animates. There are no menus or dialogs; Lenis is stopped only during the 0.25s form crossfade, then resized and, if the shorter block's clamped scroll left it in a stuck native state, reset. Only transform, opacity and clip-path animate, plus the catalogue's `grid-template-rows` accordion and error reveals and the probe's colour change. There is no cursor follower and no magnetic button; the native cursor is never hidden. Technique ids refer to `research/motion-techniques.md`.

| Moment | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| School line and header link rise 8px and fade in | LD8 | Load, fonts ready (1.5s cap), 0s | 0.5s power2.out, stagger .08 | Static |
| **Hero words rise out of their own baselines** | TX1 (hand-built word masks, padded .14em for ¿ and descenders) | Load, 0.1s | 1.0s expo.out, stagger .06 | Visible |
| Ticks draw down from each word | SC16 | Load, 0.6s | 0.45s power3.out, stagger .05 | Static |
| Glosses rise under their ticks | TX1 | Load, 0.8s | 0.7s expo.out, stagger .05 | Visible |
| Free translation rises as one block | TX1 | Load, 1.25s | 0.9s expo.out | Visible |
| Lede, gloss key and Pause button fade in | LD8 | Load, 1.5s | 0.5s power2.out | Static, no Pause button |
| Topic links slide 12px in | LD8 | Load, 1.6s | 0.5s power3.out, stagger .04 | Static |
| **Last phrase turns over as a replay of the build** | TX6 | First turn at 3.2s, then every 4.0s | At t: Spanish out (0.45s power3.in), glosses out t+.1, ticks retract t+.15, translation out t+.2; next Spanish in t+.4 (1.0s expo.out), ticks draw t+.55, glosses rise t+.65, translation rises t+.8; turn ends t+1.6, hold 2.4s | Fixed on "a nadie / to nobody / anyone" |
| Phrase pauses once the hero starts to leave, under the pointer, while the hero is probed, and on Pause | TX6 with ScrollTrigger | Scroll, pointer, probe, button | Waits for the current turn to end; on scroll a turn in progress jumps to its end | n/a |
| Tab during the load | Keyboard guard | First Tab while the intro runs | Intro plays at 4x | n/a |
| **Reverse build as the hero leaves: Spanish sinks back into its masks word by word, ticks retract, glosses drop, the English translation stays** | TX1 reversed, scrubbed (y and clip-path, so it never fights the slot) | Hero top at 15% to hero bottom at 12% of the viewport | `scrub: .6`, stagger 0.06 per column | None |
| Topic and form headings rise line by line | TX1 (SplitText lines, mask) | Group top at 95% of the viewport, once | 0.7s expo.out, stagger .06, 0.08s behind the rule | Visible, not split |
| Topic rule draws from the left, leading its heading | SC16 | Same trigger | 0.7s expo.out | Static |
| Probe: the word and gloss turn ink over a 2px calamina underline drawn from the left, the tick thickens, the hero column lifts 0.05em, every other word and gloss on the page steps back to slate | HV7-style pairing | Pointer on a Spanish word (fine); tap a hero word (touch, holds until the next tap); hover, focus or press a key term | 0.25s power2.out | Instant colour change |
| Row opens: panel and gloss rows unfold | CD6 | Click, Enter, Space | Open 0.6s cubic-bezier(.625,.05,0,1), close 0.38s cubic-bezier(.4,0,.2,1) | Instant |
| Spanish words slide apart for their glosses (and back on close) | CD5-style FLIP, hand-rolled | Toggle | Open 0.6s expo.out, close 0.38s power3.out | Instant jump |
| Ticks draw, gloss words rise, then the answer rises (the row repeats the hero's order) | TX1, SC16 | Row opens | Ticks 0.35s, glosses 0.5s expo.out, stagger .035 from 0.12s; answer 8px and opacity, 0.45s, from 0.45s or after the last gloss starts | Instant |
| Plus turns to minus; icon grows on hover and focus | Icon morph | Toggle; hover, focus | 0.4s power3.inOut; scale 1.15 in 0.25s | Instant |
| Row fill enters from the nearest edge and leaves through the edge crossed | HV4 (clip-path) | Pointer enter and leave (fine); from the left on keyboard focus | 0.35s power3.out in, 0.3s power3.in out | Instant fill |
| Open all / Close all, Pause / Play labels swap in a masked slot | MI2 | Click | 0.4s | Instant |
| Pause icon morphs between bars and triangle | Clip-path morph | Click | 0.3s | Instant |
| Buttons fill from the entry edge (aqua; ink on Send, with the label turning whitewash) | HV4 | Pointer, keyboard focus, `:active` | 0.35s in, 0.3s out | Instant |
| Buttons press and release | MI1 | `:active` | 0.1s to scale .96 (.97 on Send), 0.4s release | No scale |
| Open all staggers the rows | CD6 | Click | 0.04s per row, refresh after 0.8s | All at once |
| Link underline sweeps in from the left and out to the right; topic links also nudge 4px | HV2 | Hover, focus, `:active` | 0.35s cubic-bezier(.35,0,0,1); nudge 0.3s power3.out | Instant, no nudge |
| Anchors glide, open the target row, move focus | NV6 | Any in-page link | Lenis 1.2s expo-out | Native jump, focus moved |
| Field underline thickens; focus underline draws from the left; label turns calamina | MI4 | Hover, focus | 0.2s, 0.4s | Instant |
| Error line unfolds in red pen; first invalid field focused | MI4 | Submit | 0.3s | Instant |
| Form fades, confirmation heading rises | Crossfade with TX1 | Valid submit; "Ask another question" reverses | 0.25s out, 0.8s expo.out heading, 0.4s body | Instant swap, focus moved |

Touch keeps native scrolling (Lenis `syncTouch` stays off). Every hover has a touch and keyboard equivalent: `:active` fills on buttons and rows, tap probing on hero words, the key terms for the probe, and fills from the left on keyboard focus.

**Retiming or removing.** CSS-driven timings are the `--dur-*` and `--ease-*` tokens. The GSAP timings live in the script: the load timeline (`intro`) positions, the slot constants in `T` (`hold`, `turn`, `slotStart`) and the offsets inside the slot loop, the reverse build inside `ctx.add('build')` (its start and end, or delete that timeline), and the row tweens in `env.onOpen` and `env.flip`. To drop the rotating phrase, delete the extra `.slot > .opt` options, the extra translation options in `.free .stack` and the Pause button; the slot code then has nothing to turn. To drop the FLIP, delete `env.flip` (rows then jump to their glossed spacing). To drop all GSAP motion, remove the four CDN tags: the plain-JS core keeps the accordion, probe, links and form working with CSS transitions.
