---
title: Sixpica new-business brief
section: contact
subject: The new-business contact of Sixpica, a fictional four-person brand-identity studio on Cerro Concepción, Valparaíso, run by Ana Riquelme, where a prospective client writes a short brief and can still email, phone or visit.
aesthetic: A construction sheet from an identity-guidelines document, pinned to studio greyboard. A white sheet with non-photo-blue crop marks, cap-height, x-height and baseline guides and a clear-space frame, navy ink, and ultramarine for every action. Everything comes from the tools of the trade, such as guides, clear space and Illustrator's outline view.
mode: light
fonts:
  - Host Grotesk, variable wght 300-800 (Google Fonts), the only family. The specimen is set at 500, the H2 at 600 with -0.02em tracking and 1.0 leading, step titles at 600, body at 400 and labels at 500.
js: Validates the brief per field and shows an in-page result, and sets the organisation name on a live construction sheet whose guides, clear-space frame and width readout are measured from the font. It adds an outline-view toggle and, for fine pointers, a guide you can pull that snaps to the type lines. It also drives the load sequence, the scroll-drawn rules and the scrubbed next-steps rule. Nothing is sent anywhere.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [contact, form, validation, brand, agency, live-preview, typography, guides, gsap, lenis, light]
use_when:
  - Studios and agencies whose craft can be shown on the client's own input, such as identity, naming, signage, type foundries and sign-writers.
  - Lead forms where scope, budget and timing matter more than volume, and where a considered first contact sets the tone of the project.
avoid_when:
  - High-volume support or sales contact. The sheet and the choreography slow down someone who only wants to ask a question.
  - Forms where the typed content is private or isn't a name, such as medical, legal or HR intake. Setting it large on a sheet would be wrong.
  - Brands whose own identity is decorative or illustrative. The page argues for a plain wordmark, set carefully.
---

## Why it works

**The bold idea is the working sheet.** Beside the brief sits a white sheet from an identity-guidelines document. It has non-photo-blue crop marks, cap-height, x-height and baseline guides, and a clear-space frame with 1x unit squares at its corners. Typing the organisation name sets it there as a plain wordmark in Host Grotesk 500:

- Each new letter drops onto the baseline (0.45s, `back.out(1.4)`). Deleted letters are simply removed.
- The size is fitted so that the clear-space frame (the name plus 1x on each side) fills the free width, between 18 and 112px. A size change is a transform FLIP from the old visual size, anchored at the left of the baseline. Font-size is never tweened.
- The frame edges, the corner squares, the three guides and their labels glide to the new measured bounds (0.6s `expo.out`, transforms only).
- The readout under the frame counts to the new width in x-heights ("width 13.1x"), which is how identity manuals specify clear space and minimum sizes.
- The Needs, Budget and Launch lines on the sheet fill in through a masked swap as chips are picked.
- On send, the guides retract to the right, the frame closes in to hug the wordmark from cap height to baseline, and the sheet's title swaps to "Brief SP-26-014, received 23 Oct". The brief number increments within the session.

The rest of the page is deliberately quiet so the sheet carries it: a static H2, plain rules, pill chips and three ruled contact rows.

- **The measurements are real.** Cap height and x-height come from canvas `measureText('H')` and `('x')` (`actualBoundingBoxAscent`), measured after `document.fonts` has loaded the face and then cached. The baseline depth inside a `line-height: 1` box comes from a zero-size probe element, read once at 100px. Letters are inline-blocks so they can move, which drops the font's kerning, so each letter carries its pair kern as a `margin-right` in em, also measured with canvas. The laid-out width therefore equals the canvas width that the frame is drawn from, and `runSelfTest` checks this.
- **Outline view, as in Cmd+Y.** The "Outline view" button switches the whole wordmark to a 1px ultramarine outline. The outline layer grows as a circle from the button (clip-path, 0.6s `expo.out`) and shrinks back toward it. The label swaps between "Outline view" and "Preview" as Illustrator's View menu does, so the button names the action. It has no `aria-pressed`, because a pressed state with a changing label would contradict itself.
- **Pull a guide (fine pointers).** Moving over the sheet pulls a 1px non-photo-blue guide that follows the pointer (`quickTo` 0.25s). Within 6px of the baseline, x-height or cap height it snaps, turns ultramarine and shows a small readout ("x-height, 1.00x", "cap height, 1.40x"). The native cursor stays. Keyboard and touch users need no equivalent, because the guide labels are always printed on the sheet.
- **On phones the sheet sits directly above the first field.** Below 992px the specimen is the last thing on the sheet, just above "Organisation name", so the name being typed stays in view above the keyboard. The Needs, Budget and Launch lines move above the specimen. Below 480px the guide labels collapse into a one-line legend, and the guides keep their meaning through dash patterns (cap height dashed, x-height dotted, baseline solid) as well as position.
- **Colour logic.** Greyboard `#CBCAC3` makes the white sheet the brightest thing in the section. Navy ink `#1B1F3B` is 9.8:1 on the board. Ultramarine `#2A2FC4` marks every action (button, toggles, focus ring, tick, chip badge) at 5.6:1 on the board. Non-photo blue `#7CCBE3` is used only for guide lines, crop marks and clear-space squares, never for text (1.8:1 on white). Proof red `#9E1C12` is used only for field errors (4.9:1 on the board). Hints use a solid `#43476A` (5.4:1), not a mix, because a 70% mix failed on the darker board.
- **Radii follow hierarchy.** The sheet has radius 0 and crop marks. Inputs have no box, only a rule (white fill, 1px rule, 2px ultramarine focus rule). Chips and buttons are full pills. There are no shadows and no cards.
- **The form helps people write a usable brief.** Labels are static above the fields. Errors appear on blur once a field has been typed in, update live while in error, and are all checked on submit. Each error sets `aria-invalid`, is linked with `aria-describedby`, and opens through a grid-rows reveal. An invalid submit moves focus to the first problem and a polite live region says "3 fields need attention." Nothing shakes. "Not sure yet" excludes the other needs. The counter reads "12 / 40 minimum" and swaps to "52 characters, enough to start" once the minimum is met. The result is built with `textContent` only.
- **No dead ends.** The result says "Brief SP-26-014. Ana will reply to {email} by {two working days ahead}". It lists what was sent, and offers "Edit brief" (values kept, focus on the organisation field) and "Send another brief" (reset, ghost specimen drops back in). The mailto:, tel: and Google Maps links open with `target="_blank" rel="noopener"`. The Maps link carries a ↗ and visually hidden "opens Google Maps in a new tab".
- **Structure is information.** The only numbered markers are in "After you send", which is a real sequence. The chip groups and contact rows are unnumbered. Rules mark real field and row boundaries, which is why they are what moves on load.
- **The defaults it avoids, with reasons.** The board is a mid grey, not cream. The dark is a chosen navy, not #111. No word in the headline is accented. There are no all-caps eyebrows, no middle dots and no "→" on links. The ↗ appears only on the one link that leaves for another site. Guide labels are Host Grotesk in sentence case, not monospace caps. There are no section fade-ups and no card hover lifts.
- **What was cut on review.** The rotating word slot in the H2 (TX6) was removed. A rotating word in a headline is the generic agency hero trope, and styling one word as a dashed blank still accents a single word. The H2 is now static and sets up the sheet. Removing it also leaves no auto-playing motion longer than 5 seconds anywhere, so WCAG 2.2.2 has nothing to pause. Also cut: the in-section header, nav and skip link (this is a section, not a page), the cursor lens (lenses already sign hero-perfumery and cta-vineyard-harvest), the copy-email button (another contact design owns that interaction), and finally the free-running height number on the pulled guide, which now speaks only when it snaps.
- **Fictional on purpose.** Chilean landline subscriber numbers do not start with 0, so +56 32 000 2714 cannot reach anyone. Templeman is a real street on Cerro Concepción, but the number 418 is invented and no real business is implied. On 2026-10-23 a web search found no studio called Sixpica, sixpica.studio and sixpica.cl did not resolve, but sixpica.com is registered to an unknown owner. Recheck the name and domain before publishing.
- **Collection notes.** Host Grotesk already appears as a body face in cta-indie-game and portfolio-motion-designer. Here it is the only family and the display face, so the pairing differs. The AD's suggested board, #D4D5D0, was almost exactly the ground of features-ebike (#D3D5D0), so the board moved darker and slightly warm to #CBCAC3.

## Do not touch

- The measured geometry. Frame, guides and readout come from `compute()`, which is canvas widths plus cached ratios. Don't replace it with DOM reads per frame, and don't tween font-size. Keep the pair-kern margins, or the frame will stop matching the letters.
- The FLIP anchor at the left of the baseline (`transformOrigin: 0 KB*S`). Any other origin makes the baseline jump while the name resizes.
- The colour roles. Guide blue is for lines only, ultramarine for actions only, proof red for errors only.
- The phone order. The specimen sits last on the sheet and the sheet sits directly above "Organisation name".
- `form.noValidate` is set in JS, so the native `required` and `minlength` still guard the form if the script never runs.
- Hidden first states exist only under `html.js` and `prefers-reduced-motion: no-preference`, and `.js` is added only when all the libraries loaded. Without the CDN the page is complete and still works: validation, result, sheet geometry (plain transforms), outline toggle, swaps and the link rolls.
- The art is `aria-hidden`. The Needs, Budget and Launch `<dl>` stays readable. The specimen only repeats the field.

## Motion

House easing: `expo.out` for entrances and state changes, `power3.out` for pointer following, `back.out` only for things that land (letters, crop marks, squares, badges), and `none` for the scrub. Everything is built in one `gsap.matchMedia` with separate `add()` calls for motion, width (992px) and fine pointer, so crossing a breakpoint doesn't replay the load. Lenis 1.3.26 runs from `gsap.ticker` (`autoRaf: false`, `lerp: .1`, `lagSmoothing(0)`), feeds `ScrollTrigger.update`, and is destroyed in the cleanup, which also restores `lagSmoothing(500, 33)`. There are no menus or dialogs, so `lenis.stop()` and `lenis.start()` are not called. Anyone who adds an overlay must call them on open and close. The load score starts when the font is ready (capped at 1.2s). Triggers that fire during the load keep their place in the score through `at(t)`, which subtracts the elapsed time.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| H2 lines rise | TX1 | Load, t0 (after fonts) | SplitText lines with mask, yPercent 110 to 0, 1.0s expo.out, stagger .08; mask padded .1em for descenders | Static, no split |
| Crop marks cross in | SC16 | Load t.30 (or sheet enters at top 85%) | scale 0 and rotation 90 to rest, .5s back.out(2), stagger .05 | Static |
| Cap, x-height and baseline guides draw | SC16 | +.15 in the sheet timeline | clip-path inset(0 100% 0 0) to 0, .9s expo.out, stagger .06 (clip, so dashes don't stretch) | Static |
| Clear-space frame draws | SC16 | +.33 / +.39 | top and bottom scaleX from 0, sides scaleY from 0, .9s expo.out, stagger .06; corner squares scale from 0 at +.6, .4s back.out(2) | Static |
| Ghost specimen drops in | Letter drop (not in the catalogue) | +.40 | per letter yPercent -40 to 0 and opacity, .5s back.out(1.4), stagger .02 | Static |
| Field rules draw (only the rules move) | SC16 | Load t.85, then batch at top 92% | `--rx` 0 to 1 on input rules and chip-group rules, .7s expo.out, stagger .04 | Static |
| New letters drop onto the baseline (signature) | Letter drop | Typing (rAF-throttled) | .45s back.out(1.4), stagger .03 for pasted runs | Instant |
| Wordmark resizes to fit | FLIP (CD5 idea, transform only) | Typing | scale old/new to 1 from the baseline-left, .5s expo.out | Instant |
| Frame, squares, guides, labels glide | Measured tween | Typing, resize, send | x, y, scaleX/Y, .6s expo.out, overwrite auto | Instant |
| Width readout counts | Count tween | Typing | .6s expo.out, snap .1 | Instant |
| Sheet lines Needs, Budget, Launch | MI2 | Chip change | Masked translateY, .3s cubic-bezier(.65,0,0,1); exited label emptied after | Instant |
| Outline view | Clip-path circle from the button + MI2 label | Click | Grows 0 to cover, .6s expo.out; shrinks .45s power2.inOut | Instant |
| Pull a guide | CU-style follower (keep the native cursor) | Fine pointer over the art | quickTo y and readout x .25s power3.out; snaps within 6px; readout appears only when snapped (.15s) | Follows instantly |
| Contact rules draw | SC16 | Channels at top 85%, once | `--rx` 0 to 1, 1.0s expo.out, stagger .08; text visible throughout | Static |
| Next-steps rule | SC11 + SC16 scrubbed | ScrollTrigger clamp(top 75%) to clamp(bottom 60%), scrub | scaleX (992px+) or scaleY (phones) 0 to 1, ease none; steps reached at matching progress turn ultramarine with a .35s scale .85 pop | Rule full, all reached |
| Sheet stays beside the form | CSS sticky | 992px+ | top 32px | Same |
| Text inputs and textarea | MI4 | Hover, focus, blur, error | Rule ink-2 to ink .2s; 2px ultramarine rule scaleX .35s; error grid-rows .25s; tick stroke-dashoffset 1 to 0 .3s | Instant |
| Character counter | MI2 | Crossing 40 characters | Masked swap .3s | Instant |
| Chips (checkbox and radio) | MI3 + MI1 | Hover, focus-visible, check, press | Border and 18% guide tint .2s; navy fill; badge scale .6 to 1 .25s overshoot; press scale .97 .12s, release .4s overshoot | Colour only |
| Send brief | HV4 + HV5 + MI1 | Pointer enter and leave, focus-visible, press | Navy fill from the entry side .45s, leaves toward the exit side .3s; magnet x ±5, y ±3, rotateY ±3 via quickTo .5s, home .55s; press scale .975 | Colour only, no magnet |
| Send another brief | HV4 + MI1 | Same | Outline pill, navy fill from the entry side, label turns white | Colour only |
| Outline view, Edit brief | HV2 | Hover, focus-visible | 1px underline enters left, leaves right, .45s cubic-bezier(.35,0,0,1) | Static underline |
| Contact links | HV1 per character + HV7 | Hover (fine), focus-visible | Two-copy roll .4s cubic-bezier(.4,0,.1,1), per-char delay min(14ms, 320ms / length); other rows dim to .45 over .35s; ↗ moves 2px up-right | Colour only, dimming kept |
| Send (valid) | Panel swap + TX1 | Submit | Form fades .3s; Lenis scrolls back to the brief; then result heading rises (.8s expo.out) and the sheet runs its received sequence: guides clip out to the right .4s power2.in, frame hugs the wordmark .6s, title MI2 swap | Instant swap, same focus |
| Edit brief | Panel swap + SC16 | Click | Form returns with values, guides redraw .6s, frame reopens | Instant |

**Retiming or removing.** CSS durations and easings live in the `--d-*` and `--ease-*` tokens. GSAP timings are inline in the script, grouped by section with comments. To remove the load choreography, delete the `ScrollTrigger.create` for the sheet and the `ScrollTrigger.batch` for the field rules, and remove `.sheet:not(.is-drawn)` and `[data-rule]` from the hidden-states block. To remove the pointer guide, delete the fine-pointer `mm.add` block and the `.sheet__hint` line. The sheet keeps working with no GSAP at all.

## Adapting

Change the `:root` tokens first. Keep three roles apart. The ground must let the white sheet be the brightest surface. One action colour must reach 4.5:1 on the ground and carry white text. One line colour must be light enough that it reads as a guide and is never text. Recheck hint and error contrast on the new ground.

For another studio, swap the specimen font by changing `--font` and the `FONT` string in the script (keep the same weight in both). Cap height, x-height and kerning are re-measured automatically. Edit `GHOST` for the empty-state wordmark, the chip values and `RULES` for the questions and errors, and `SPEC` for the sheet lines. Change the brief prefix `SP-` and the two-working-day reply promise in the submit handler. `addWorkdays` skips weekends only, so add public holidays if the promise must be exact.

Names longer than about 30 characters reach the 18px floor on phones and are clipped at the sheet's edge (`maxlength` is 60). Raise `--labels` or lower the floor in `fitSize` if long names are common. The channel rows take any number of rows. Notes over about 50 characters wrap under the value at 720px and up.

| Token | Role |
|---|---|
| `--board` | Greyboard ground, darker than the sheet |
| `--sheet` | The working sheet and field fills |
| `--ink` | Text, checked chips |
| `--ink-2` | Hints, keys, guide labels (solid, 5.4:1 on the board) |
| `--ultra` | Every action and focus ring, snapped guide, outline stroke |
| `--guide` | Non-photo blue: guide lines, crop marks, clear-space squares only |
| `--alert` | Field errors only |
| `--line`, `--tint`, `--square` | Resting rules on the board, chip hover tint, 1x squares |
| `--font` | The only family |
| `--t-xs` … `--t-display` | Type scale (major third from 17px); the specimen size is set by JS |
| `--s-1` … `--s-10` | Spacing scale |
| `--labels` | Width of the guide-label column on the sheet (0 below 480px) |
| `--ease-*`, `--d-*` | CSS easings and durations |
