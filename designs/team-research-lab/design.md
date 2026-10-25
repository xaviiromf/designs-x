---
title: Ochoa Lab sampling quadrat
section: team
subject: The fourteen people of the Ochoa Lab, a fictional kelp forest ecology lab at Sorrel Point Marine Station (School of Ocean Sciences, Halvorsen University) working on bull kelp recovery after the 2014 purple urchin takeover.
aesthetic: The lab's own field kit. A white PVC quadrat strung with teal line into one cell per person, a yellow fiberglass transect tape as the filter, matte dive slates with lanyard holes for the projects, graphite pencil for the ink and bull-kelp olive for species names and links.
mode: light
fonts:
  - Instrument Sans (Google Fonts, variable wdth 75-100, wght 400-700): wordmark, headings, names, initials, nav, tape labels and readout at wdth 80, buttons, labels, tabular figures
  - STIX Two Text (Google Fonts, variable wght 400-700 with italic 400-500): lede, bios, project questions, citations, form help; italic only for binomial species names
js: Draws the quadrat, filters the people by project with a Flip sweep that closes the frame and plucks every string, bends strings under a fine pointer, stacks the project slates, runs the header, menu and profile dialog, and turns the question form into an in-page mailto draft.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText, Flip), Lenis 1.3.26]
tags: [team, people, research, science, university, marine, filter, flip, dialog, form, gsap, lenis, light]
use_when:
  - A research group, field team or small department whose people split across a handful of projects, and visitors want to know who works on what.
  - The team has 8 to 20 people with real roles and one line each worth reading, and a recruiting call (a PhD place, a job, a volunteer slot) that belongs at the end of the page.
  - The subject has field equipment, a grid or a sampling frame that can stand in for the people grid.
avoid_when:
  - The team is larger than about 25 people; the quadrat becomes a long table and the Flip loses its single-sweep feel.
  - Portrait photography is the point (a studio, a salon, a sports team with kit photos).
  - People do not belong to overlapping groups; with nothing to filter, the signature has nothing to do.
---

## Why it works

**The one bold idea: resampling the quadrat.** The lab is shown the way its divers count a reef: a white PVC quadrat, four round tubes and four elbow fittings, strung with teal line into one cell per person. Picking a project on the transect tape does what an ecologist does when they put the frame down somewhere else. A Graphite marker slides along the tape to the chosen option while a Flip moves the people on that project into the first cells in reading order (lifted, on an opaque ground, above the cells they cross), fades everyone else, and closes the tubes and strings up to the new row count with transforms only. When it settles, every string is plucked at its midpoint (4 to 14px, scaled to its length, and briefly thickened), rippling out from the marker, and the readout beside the tape rolls to "5 of 14 people" (polite live region). The same strings bend when a fine pointer crosses them, so the frame feels physical before you click anything.

- **Every structure is field kit, and each one carries information.** The strings divide people, the tape is the filter, the slates are projects and the lanyard holes are the depth cue of the stack. Yellow is only ever tape: the track, the "At sea this week" tabs, the error marker bars and the radio-card check badge. It is never text.
- **Typographic portraits.** Each cell opens with the person's initials, whole, in Instrument Sans 400 at the largest step, then name, role and the study organism in italic STIX Two Text (the real binomial convention). The open place uses "2027" in Kelp where the initials would be. The cells read as sampling cells, not avatar cards.
- **The frame reads as pipe.** Tubes are 18px (12px on phones) of solid PVC white with a 40% Graphite outline, a 6px edge band (`--band`, 4px on phones) and a 1px white highlight on the lit side; elbows are larger rounded squares with the same band. The ground is a slightly darker slate (#DAE2DE) so the white pipe stands off it. No shadow, no gradient.
- **Two families, clearly split.** Instrument Sans carries everything you scan (names, tape, counts, buttons). Its width axis narrows the tape labels and the readout to wdth 80, and its figures are tabular (checked: 1111 and 0000 set at the same width). STIX Two Text is the typeface of scientific journal publishing, so the bios, project questions and "Last paper" citations read like the lab's own literature.
- **Everything else stays quiet.** Alumni rows are a plain static table. The join section has no reveal. The page has no ambient motion and no cursor follower.
- **No dead ends, with or without JavaScript.** Cells are links to profile articles (`#p-ochoa` and so on) that form a visible Profiles list when scripts do not run. With JS they open a native dialog instead. Without JS, the tape still filters through `:has()`. The open-place cell glides to the form, pre-checks the Heatwave tolerance card and focuses Name. The form drafts a real `mailto:` with subject and body and offers "Edit my question".

### Motion

Tier: detailed. One clock: Lenis runs from `gsap.ticker` (`autoRaf: false`, `lagSmoothing(0)`) and feeds `ScrollTrigger.update`. Everything is built inside `gsap.matchMedia`: motion and reduce (Lenis, load, S1, S3), motion and min-height 760px (S2), min-width 992px (NV4 bar), and motion with a fine hover pointer (string bending). Hidden start states are set by GSAP only when the libraries loaded and motion is allowed, so a blocked CDN or reduced motion shows the final page with native scroll. Lenis stops while the menu or the profile dialog is open, and `html:has(dialog[open])` locks the page the same way when Lenis is off. Every CSS transition uses a `--dur-*` token, so reduced motion zeroes all of them. Ease family: `expo.out` for entrances and dialogs, `power3.out` for indicators, `power3.inOut` for the Flip, `power4.inOut` for wipes, `elastic.out` only for strings, `none` for scrubs.

| # | Element | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|---|
| L1 | Wordmark, sub-line, nav links or Menu | LD8 | Load, t0 | opacity 0 and y 6 to rest, .5s expo.out, stagger .06 | Visible |
| L2 | Headline words | TX3 (its only use) | Load, t.1 | SplitText words, opacity 0, y .3em, blur(6px) to clear, 1.1s expo.out, stagger .07; split reverted on complete | Plain text |
| L3 | Lede, "Where to find us" and the "Who is in the lab" heading | Fade and rise | Load, t.55 | opacity 0 and y 10 to rest, .9s expo.out; nothing shows before its turn | Visible |
| L4 | Transect tape | Clip-path wipe | Load, t.75 | inset(0 100% 0 0) to inset(0), .9s power4.inOut; the marker on "Everyone" runs out with the tape | Static |
| S1 | Quadrat draw-in | SC16 + TR3 preview | At load when the frame is on screen (t.9), otherwise ScrollTrigger once at top 75% (top 85% on touch) | The frame and strings land from y -10, .6s expo.out, while the tubes draw clockwise from the top-left elbow, .5s expo.out each, .2s apart; elbows pop from .6; strings scale in .6s, stagger .05, from .3s; cells arrive in reading order, opacity and y 8, .6s, stagger .04, from .45s; when it ends every string plucks once at a third of the signature's amplitude, previewing its physics | Static |
| Sig | Filter change: resampling | CD5 Flip + TR3 | Tape radio change, "Show these N in the quadrat", dialog project buttons | One clock, .8s power3.inOut: the tape marker slides (clip-path) to the chosen option; people Flip (absoluteOnLeave, stagger .015, leavers fade .3s, enterers fade in after .4s; movers on an opaque Slate ground at z-index 3 dip to .98 and .85 opacity and settle); strings and the sections below Flip with `scale: true`; side tubes tween scaleY from old/new height and the bottom tube and elbows tween y, so nothing overshoots. Then every string plucks at its midpoint, amplitude clamp(4, length × .03, 14)px falling off by rank, thickening 1.8× and settling, rank delay .07s by distance from the marker, elastic.out(1,.3) 1.2s; the readout rolls (yPercent -100 out, 100 to 0 in, .35s power3.out) | Instant filter, marker jumps, no pluck |
| I11 | Strings under a fine pointer | CU6, transform-only two-half variant | Pointer crosses a string (sign of the distance flips) | Kink follows to at most 8px in .15s, then elastic.out(1,.25) over 1.4s; one live pluck per string; nothing runs at rest | Straight strings |
| S2 | Project slates | SC6 | Scroll, min-height 760px | Sticky at 5rem + i × 1.25rem; each covered slate scales to .94 (origin top), scrubbed from the next slate's top at the viewport bottom to its sticky top; no brightness change | Slates stack with no scale; below 760px tall they flow |
| S3 | Header | NV5 | Scroll direction past 120px | yPercent -100 / 0, .35s power3.out; returns whenever focus enters it; ignores moves under 4px, refreshes and the filter sweep, so the header never slides in at the pluck | Static |
| I3 | Nav indicator | NV4 + NV6 spy | Hover, focus, section in the -40% / -55% band | One 3px Kelp bar, x and scaleX, .35s power3.out; returns to the current link in .45s | Jumps |
| NV6 | Every in-page link | Eased anchors | Click | `lenis.scrollTo`, duration min(1.3, .65 + distance / 4000), header offset, then focus the target | Instant jump |
| I1 | Skip link | Clip wipe | Focus | inset(0 0 100% 0) to inset(0), .2s (`--dur-fast`) | Instant |
| I2, I6, I12, I18 | Wordmark and text links | HV2 | Hover, focus-visible | .07em underline in from the left, out to the right, .45s cubic-bezier(.35,0,0,1); touch shows it persistently (wordmark on :active) | Shown instantly |
| I4 | Menu / Close | MI2 + MI1 + HV4 | Click | Masked label swap .35s cubic-bezier(.65,0,0,1); press .96 | Instant swap |
| I5 | Menu sheet | NV1 + TX1 | Menu button | Native dialog; clip-path inset(0 0 100% 0) to inset(0) .7s power4.inOut; links rise yPercent 110 to 0, .8s expo.out, stagger .06; closes in reverse at timeScale 1.6; Escape returns focus to Menu | Instant |
| I8, I9 | Person cells and the open place | HV4 four-edge wash + MI1 | Pointer enters (nearest edge sets origin and axis), focus-visible (from the bottom), touch press | Seawater 12% wash scales in .45s expo.out, leaves toward the exit edge in .3s; "+" moves up and right and grows 1.25×; 3px Seawater outline inset 4px on focus; touch presses .985 and plucks the cell's four strings at 3px | Instant colour change |
| I10 | Profile dialog | CD7 + Flip | Cell or slate name | Native dialog dressed as a dive slate (lanyard holes, edge band, no rule above the footer); panel autoAlpha 0, y 12, scale .98 to rest, .45s expo.out (full-screen sheet rising 24px under 600px); initials Flip from the cell, .6s expo.out; Previous / Next and Left / Right arrows crossfade with x ±16, .35s; closes in .3s and returns focus | Fade only, .15s |
| I7 | Tape options | Sliding marker + HV2 | Click, arrow keys, hover | One Graphite marker over the track holds Frame-coloured 650-weight copies of the labels and is clipped to the chosen option, so each label flips colour exactly as the marker covers it; widths are reserved so nothing shifts; hover underline; focus-visible Seawater outline; under 600px the tape scrolls inside itself and brings the chosen option into view | Instant |
| I13, I17, Close, Previous, Next, Edit | Buttons | HV4 + MI1 | Hover (side from the pointer), focus-visible, :active | Fill scaleX in .45s, out .3s; label flips to Frame; press .96 in .12s, release .4s | Colour only |
| I14 | Text fields | MI4 | Focus, value, invalid submit | 2px Seawater outline inside the field (6.3:1 on Frame); label floats translateY(-.62rem) scale(.82), .2s; Seawater line scaleX 0 to 1 (.3 on hover), .35s; error wipes in with clip-path .25s beside a 4px Tape bar; focus moves to the first invalid field | Instant |
| I15 | Project radio cards | MI3 + HV4 | Change, hover | 2px Kelp outline .2s; Tape check badge pops .6 to 1, .25s back-out | No pop |
| I16 | Timeline checkbox | MI4 tick | Change | Tick drawn by clip-path inset(0 100% 0 0) to inset(0), .35s (`--dur-swap`) | Instant |
| I17 | Submit to result | MI2 + crossfade | Valid submit | Label swaps to "Drafted", form fades .25s, result rises from y 10, .45s expo.out, focus moves to it | Instant swap |

Alumni rows are static on purpose: they are not interactive, so they get no hover response.

Deviations from the approved plan, on purpose:

- **Type, and who owns it:** the art director's Radio Canada turned out to be in four designs already (crud-vet-clinic, footer-record-label, portfolio-wildlife-photographer, process-brewery), so it was swapped for Instrument Sans, which keeps the width axis the tape and readout need and has tabular figures. Its lightest weight is 400, so the initials are 400, not 300. Instrument Sans was also in seven other new plans (features-coffee-roaster, pricing-photo-licensing, testimonials-mountain-hotel, nav-concert-hall, story-mechanical-watch, story-glacier-research, contact-recording-studio). The art director's decision: this design keeps Instrument Sans, because it was already built and depends on the wdth axis, and those seven change theirs. STIX Two Text is unique in the collection. This design also owns its palette set (pale slate grey-green, graphite, kelp, tape yellow, sea teal) within the team section.
- **Initials shown whole** (review fix): the first build cropped the initials under the top tube and string, which read as a clipping bug. They now sit whole above the name. Cells take their proportion (4:5 on phones, square from 600px) from a zero-width `::before` strut, so the ratio is a floor and long names grow the row instead of overflowing it.
- **Thicker tubes** (review fix): at 12px with a hairline the frame read as a pale outline at 1440. It is now 18px with an edge band, 12px on phones.
- **Readout on the tape's baseline** (review fix): the people bar aligns on `last baseline`, so "14 of 14 people" sits on the same line as the tape labels.
- **Two Flip passes, and tubes outside Flip.** A single `Flip.from` with `absoluteOnLeave` pins every non-leaving target to its old width and height, which made the side tubes overshoot the frame mid-flight. People and the strings flip separately on the same duration and ease, and the sections below the quadrat ride in the strings pass, so the page closes up with the frame instead of jumping. Flip's `scale: true` still let the side tubes poke 42px above the elbows on phones, so the tubes are tweened directly from the old frame height (side tubes scaleY from H0/H1, bottom tube and elbows y from H0 - H1).
- **TX3 stays on the headline** (review): a review called the blur-in a stock intro and asked to cut it. It is an assigned technique and the art director kept it as the page's single text effect, so it stays; the rest of that note was taken: the people heading joined L3 so nothing shows early, and the load now spends its subject moment on the quadrat landing and a low first pluck.
- **Projects in two columns at 992px and up** (review): the slate stack sat as a narrow centred column. The heading and intro now stick in the left four columns and the slates fill the right seven, on the same 12-column measure as the intro.
- **Labels at 14px**: `--step--1` is .875rem and the tape tabs use `--step--2` (.75rem); the readout is at `--step-0` beside the tape instead of at the far right.
- **Headline split without autoSplit:** words do not reflow on resize, so the split is reverted when the blur-in ends and the headline is plain text again.
- **Cells are square** from 600px up (a quadrat is square), 4:5 on phones.
- **The sticky stack needs 760px of height**, not 640px. The tallest slate is about 580px on a 360px phone and sticks up to 140px down, so 640px would hide the last slate's button under the next one; 760px leaves room for longer copy.
- **Filter input is not locked** during the Flip. A new choice interrupts the running Flip from where the cells are.
- **Removed accessories:** the menu sheet briefly carried the address, email and phone under the links. It repeated the footer and gave the menu a second thing to animate, so it went. In the review pass the counts beside each menu link ("14 people", "4 projects") went too: the tape and the page already say them, and the sheet is cleaner as four words.

## Do not touch

- The cells, the tape options, the slate "Show these N" buttons and the readout all take their counts from each cell's `data-p`. Edit the data, never the numbers.
- Strings are two transform-only halves that meet at a kink (`translate rotate scaleX`). Do not switch to an SVG path or animate width or height; the V shape is what a plucked string really makes.
- Strings and the following sections must stay in their own Flip pass with `scale: true`, leaving cells must stay in the people pass with `absoluteOnLeave`, and the tubes must stay out of Flip (direct scaleY and y tweens). Merging them brings the overshoot back.
- The `[hidden]` reset excludes `.cell` and `.str` from `!important`. Flip shows a leaving element with an inline `display`; an important `display: none` would hide the leavers on frame 0.
- The script inserts an empty, `aria-hidden` block marker before each slate. ScrollTrigger cannot measure a stuck slate, so the scale scrub starts from these markers; keep them.
- `transformOrigin` is cleared after the draw-in. A leftover origin on the side tubes breaks the Flip.
- Tape yellow is never a text colour. Text on tape is Graphite (7.9:1). The Seawater focus ring on tape is 3.9:1, enough for a non-text indicator.
- The covered slates scale only. Dimming them dropped body text below AA.
- Initials stay whole. Do not crop them under the top tube; that reads as a bug. Do not go back to `aspect-ratio` plus a fixed `min-height` on the cell: it caps the height and the species line overflows into the next row on phones.
- The profile articles must keep the ids the cells and slate names link to, and must remain readable as a list when `.js` is absent.
- The alumni table carries explicit table, row, rowheader and cell roles and a real "Now:" span, because the phone layout changes the rows' `display`. Keep both.
- The `html:not(.js)` `:has()` rules are the no-JS filter. Keep them in sync with the radio ids.

## Adapting

1. Map the brand onto the six colours, keeping their roles: a ground (`--slate`), a surface for the frame and slates (`--frame`), one ink (`--graphite`), one accent for links, species and selection (`--kelp`), one fill-only marker colour (`--tape`) and one line colour for the strings and focus (`--sea`). `--wash` and `--edge` are color-mixes and follow automatically. Recheck the accent at 4.5:1 on the ground.
2. Replace the people. Each needs a cell (`li.cell` with `data-p` holding space-separated project keys, a link to `#p-<id>`) and a matching `article.pf` with the same id, `data-ini` and `data-p`, plus `data-sea` for an at-sea tab. Projects are the keys in `PROJ` in the script, one radio per key (`#f-<key>`), one slate per key and one `:has()` rule per key. The open-place cell is optional; remove it and its readout clause disappears by itself.
3. The grid runs 2, 3, 4 and 5 columns at 0, 600, 900 and 1200px (`--cols`). The strings recompute from the grid, so any count works. Change the cell proportion in `.cell::before` (`padding-bottom`). Very long names wrap to two lines; roles up to about 50 characters fit.
4. Retime or remove motion. CSS durations are the `--dur-*` tokens and easing tokens; reduced motion sets them to 0s. The load sequence is the `tl` timeline in the first `mm.add`. The draw-in is `drawTl` (delete the `gsap.set` hidden states and `armDraw` to drop it). The signature is `applyFilter`: change `.8` and `.015` there (and in `placeMark` for the tape marker), or the pluck amplitude (`clamp(4, len × .03, 14)`) and rank delay `.07` in `ripple`. Remove pointer bending by deleting the fine-pointer `mm.add`, and the slate stack by deleting the min-height `mm.add` and the sticky rule.
5. In a framework, render cells, profile articles, radios and slates from one data array, keep `layoutStrings`, `render` and `pluck` as plain functions, and port the script as one effect that returns the `matchMedia` cleanup.

| Token | Role |
|---|---|
| `--slate` | Page ground, lanyard holes |
| `--frame` | Tubes, elbows, slates, dialog panel, fields, text on Graphite fills |
| `--graphite` | All text, outlines, chosen tape option, button fills |
| `--kelp` | Links, species names, nav current and bar, checked card outline, submit fill |
| `--tape` | Tape track, at-sea tabs, error bars, check badge (fill only) |
| `--sea` | Strings, focus rings, field focus line |
| `--wash` | Hover and focus wash on cells and cards (Seawater 12% into Frame) |
| `--edge`, `--line`, `--backdrop` | Slate thickness edge, 30% Graphite outlines, dialog backdrop |
| `--font-sans`, `--font-text`, `--narrow` | Instrument Sans, STIX Two Text, the wdth 80 setting for tape and readout |
| `--step--2` … `--step-5` | Type scale, ratio 1.25 on 17px: tape tabs, labels, body and readout, names and lede, slate questions, h2, initials, headline |
| `--space-1` … `--space-9`, `--gutter`, `--max` | 4px spacing scale, page gutter, 1240px measure |
| `--tube`, `--elbow`, `--string`, `--band` | Quadrat tube thickness (18px, 12px on phones), elbow size (30px, 20px), string thickness, tube edge band (6px, 4px) |
| `--r-tube`, `--r-slate`, `--r-control`, `--stack` | Radii by object, and the visible strip of each covered slate |
| `--dur-*`, `--ease-*` | Motion timing for CSS transitions |
