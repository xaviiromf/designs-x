---
title: Sixpica new-business brief
section: contact
subject: The new-business contact of Sixpica, a fictional four-person brand-identity studio on Cerro Concepción, Valparaíso, run by Ana Riquelme, where a prospective client writes a short brief and can still email, phone or visit.
aesthetic: A construction sheet from an identity-guidelines document, pinned to studio greyboard. A white sheet with non-photo-blue crop marks, cap-height, x-height and baseline guides and a clear-space frame, navy ink, and deep ultramarine for every action. Everything comes from the tools of the trade, such as guides, clear space and Illustrator's outline view.
mode: light
fonts:
  - Funnel Display, variable wght 300-800 (Google Fonts). The H2 at 600 with -0.02em tracking and 1.0 leading, the specimen wordmark at 500, H3s, step titles and the contact row keys at 600, and the brief number stamped on the sheet.
  - Funnel Sans, variable wght 300-800 (Google Fonts). Body at 400; labels, chips, buttons and readouts at 500. Its figures are tabular by default, so the readouts never shift.
js: Validates the brief per field and shows an in-page result, and sets the organisation name on a live construction sheet whose guides, clear-space frame and width readout are measured from the font. It adds an outline lens that follows a fine pointer and an outline-view toggle for everyone else. It also drives the load sequence and the scroll-drawn rules. Nothing is sent anywhere.
libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]
tags: [contact, form, validation, brand, agency, live-preview, typography, guides, outline-lens, gsap, lenis, light]
use_when:
  - Studios and agencies whose craft can be shown on the client's own input, such as identity, naming, signage, type foundries and sign-writers.
  - Lead forms where scope, budget and timing matter more than volume, and where a considered first contact sets the tone of the project.
avoid_when:
  - High-volume support or sales contact. The sheet and the choreography slow down someone who only wants to ask a question.
  - Forms where the typed content is private or isn't a name, such as medical, legal or HR intake. Setting it large on a sheet would be wrong.
  - Brands whose own identity is decorative or illustrative. The page argues for a plain wordmark, set carefully.
---

## Why it works

**The bold idea is the working sheet.** On desktop it holds the right column from the top of the section, beside the headline, and stays there (sticky) while the brief is filled in. On phones it sits directly above "Organisation name". It is a white sheet from an identity-guidelines document, with non-photo-blue crop marks, cap-height, x-height and baseline guides, and a clear-space frame with 1x unit squares at its corners. Typing the organisation name sets it there as a plain wordmark in Funnel Display 500. Everything else on the page is quiet so this one sheet carries it.

- **The letter drop.** Each new letter drops onto the baseline (0.45s `back.out(1.4)`). The size is fitted so that the frame (the name plus 1x each side) fills the sheet's full width, between 18 and 112px, so a twelve-letter name sets at about 64px, larger than the headline. A size change is a transform FLIP anchored at the left of the baseline. The frame, squares and guides glide to the new measured bounds (0.6s `expo.out`, transforms only), and the readout counts to the new width in x-heights ("width 13.7x" for Almacén Rosa). Identity manuals specify clear space this way.
- **The lens, as in Cmd+Y.** Under a fine pointer, a 120px lens follows the cursor across the specimen and shows the wordmark in outline view (transparent fill, 1px ultramarine stroke), ringed in non-photo blue. It is one `clip-path: circle()` on the outline layer, driven by three CSS variables. The "Outline view" button grows the same circle from the button to cover the sheet, so keyboard and touch users see the same layer at full size. The label swaps to "Preview", as Illustrator's View menu does. The native cursor is never hidden.
- **The sheet lines.** Needs, Budget and Launch under the specimen fill in through a masked swap as chips are picked.
- **The received frame.** On send, the guides retract to the right and the readouts fade. The frame closes onto the ink of the letters, measured from canvas `actualBoundingBoxAscent` and `Descent` of the whole name and padded by a quarter x, so accents and descenders sit inside. It is then ruled at 2px in navy. At +0.45s the brief number ("SP-26-014") swaps in under the frame's bottom-right corner, in Funnel Display 600, and the sheet's title becomes "Received 25 Oct".

**The rest is plain on purpose.** The H2 is static and sets in two lines at about 56px, so it never outweighs the sheet. Contact details are three ruled rows, the chips are pills whose checked state is the navy fill alone, and "After you send" is a numbered list because it is a real sequence.

**Colour roles.** Greyboard `#C9CAC3` (R below G, so it never reads as cream) makes the white sheet the brightest thing in the section. Navy ink `#1B1F3B` (9.7:1) is text, checked chips and the reached steps. Deep ultramarine `#2018AC` (7.1:1 both ways on the board, white on it 11.7:1) is reserved for actions: buttons, text buttons, focus rings, ticks and the outline stroke. Non-photo blue `#7CCBE3` is for lines only, never text. Proof red `#9E1C12` is for field errors only (4.8:1).

**The form helps people write a usable brief.** Labels are static above the fields. Errors appear on blur once a field has been typed in, update live while in error, and are all checked on submit. Each sets `aria-invalid`, is linked with `aria-describedby`, and opens through a grid-rows reveal. An invalid submit moves focus to the first problem and a polite live region says "3 fields need attention." "Not sure yet" excludes the other needs. The result names the brief number and the reply date (two working days ahead), lists what was sent, and offers "Edit brief" and "Send another brief". The mailto:, tel: and Google Maps links open with `target="_blank" rel="noopener"`. The Maps link carries a ↗ and visually hidden "opens Google Maps in a new tab".

## Do not touch

- The measured geometry. The frame, guides, readout and received bounds come from `compute()`, which uses canvas widths plus cached ratios. Don't replace it with DOM reads per frame, and don't tween font-size. Keep the pair-kern margins on the inline-block letters, or the frame stops matching the letters.
- The FLIP anchor at the left of the baseline (`transformOrigin: 0 KB*S`). Any other origin makes the baseline jump while the name resizes.
- One outline layer, one circle. The lens and the toggle share `--lx`, `--ly` and `--lr`. The toggle is the keyboard and touch equivalent of the lens, so keep it.
- The art height. On desktop it follows the frame (frame height plus 48px), so the sheet has no dead white. On phones it keeps its CSS height, so the field below never moves while someone types.
- The phone order: sheet lines, then the specimen, then "Organisation name".
- The colour roles above. Ultramarine stays off states that aren't actions.
- Hidden first states exist only under `html.js` and `prefers-reduced-motion: no-preference`, and `.js` is added only when every library has loaded. If a draw trigger hasn't fired 2.5s after the fonts are ready, whatever is on screen is shown drawn, so a frozen capture or print view never shows a blank sheet. Without the CDN the page still works fully.
- `form.noValidate` is set in JS, so native `required` and `minlength` still guard the form if the script never runs. The art is `aria-hidden`; the Needs, Budget and Launch `<dl>` stays readable.

## Motion

Everything is built in one `gsap.matchMedia`, with separate `add()` calls for motion, fine pointer and width (992px). Lenis 1.3.26 runs from `gsap.ticker` (`autoRaf: false`, `lerp: .1`, `lagSmoothing(0)`), feeds `ScrollTrigger.update`, and is destroyed in the cleanup, which also restores `lagSmoothing(500, 33)` and clears the failsafe. There are no menus or dialogs, so `lenis.stop()` and `start()` are unused. Anyone who adds an overlay must call them on open and close. The load score starts when the fonts are ready (capped at 1.2s). Triggers that fire during the load keep their place in the score through `at(t)`.

| Animation | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| H2 lines rise | TX1 | Load t0 | SplitText masked lines, yPercent 110 to 0, 1.0s expo.out, stagger .08 | Static |
| Crop marks cross in | SC16 | Sheet at top 85% (load on desktop), +.30 | scale 0 and rotation 90 to rest, .5s back.out(2), stagger .05 | Static |
| Guides, frame, squares, ghost letters | SC16 + letter drop | Art at bottom 95%, so phones see it play; +.45 on load | guides clip-path inset .9s expo.out; frame edges scaleX/Y .9s; squares .4s back.out(2); letters yPercent -40 .5s back.out(1.4) | Static |
| Field rules draw | SC16 | Load t.85, then batch at top 92% | `--rx` 0 to 1, .7s expo.out | Static |
| New letters drop (signature) | Letter drop | Typing (rAF-throttled) | .45s back.out(1.4), stagger .03 for pasted runs | Instant |
| Wordmark resizes, frame and readout follow | FLIP + measured tween | Typing, resize, send | .5s / .6s expo.out, readout snap .1; desktop art height .6s | Instant |
| Outline lens | CU4 | Fine pointer over the art | position quickTo .25s power3.out; radius 0 to 60px .35s expo.out on enter, back on leave or window blur | Off, toggle only |
| Outline view | Clip-path circle + MI2 label | Click | grows .6s expo.out from the button; shrinks .45s power2.inOut | Instant |
| Sheet lines, counter | MI2 | Chip change, 40 characters | masked swap .3s cubic-bezier(.65,0,0,1) | Instant |
| Received | Clip, fade, measured tween, MI2 | Valid submit | guides clip out .4s power2.in; readouts fade .3s; frame closes .6s expo.out; brief number swaps in at +.45s | Instant |
| Contact rules draw | SC16 | Channels at top 85%, once | `--rx` 0 to 1, 1.0s expo.out, stagger .08 | Static |
| Next-steps rule | SC16 | Steps at top 80%, once | scaleX (desktop) or scaleY (phones) 1.2s expo.out; each numeral fills navy as the line reaches it | Rule full, all filled |
| Inputs, textarea | MI4 | Hover, focus, blur, error | rule darkens .2s; 2px ultramarine rule .35s; error rows .25s; tick draw .3s | Instant |
| Chips | MI3 + MI1 | Hover, focus-visible, check, press | border and guide tint .2s; navy fill; press .97 then spring back | Colour only |
| Send brief, Send another brief | HV4 + MI1 | Pointer enter/leave, focus, press | navy fill from the entry side .45s, out .3s; press .975 | Colour only |
| Outline view, Edit brief | HV2 | Hover, focus-visible | 1px underline enters left, leaves right, .45s | Static underline |
| Contact links | HV1 + HV7 | Hover (fine), focus-visible | per-character roll: the new copy drops from above with a back.out overshoot, matching the letter drop; other rows dim to .45 | Colour only, dimming kept |

**Retiming or removing.** CSS durations and easings live in the `--d-*` and `--ease-*` tokens; GSAP timings are inline, grouped by section. To remove the load choreography, delete the two sheet `ScrollTrigger.create` calls, the failsafe and the field-rule batch, and remove the `html.js` hidden-state block.

## Adapting

Change the `:root` tokens first. Keep three roles apart: a ground that lets the white sheet be the brightest surface, one action colour at 4.5:1 or better on the ground that carries white text, and one line colour light enough to read as a guide and never used as text.

For another studio, swap the specimen face in `--font-display` and the `FONT` string in the script (same weight in both), and update the two `document.fonts.load` calls. Cap height, x-height, ink bounds and kerning are re-measured, but `runSelfTest` (load with `#selftest`) asserts Funnel's 0.68 and 0.50 ratios and the 12.3x ghost width, so update those numbers and the placeholder in `#ro-n`. Edit `GHOST` for the empty-state wordmark, the chips and `RULES` for the questions, `SPEC` for the sheet lines, and the `SP-` prefix and two-working-day promise in the submit handler. `addWorkdays` skips weekends only.

Names longer than about 30 characters reach the 18px floor on phones and are clipped at the sheet's edge (`maxlength` is 60). The channel rows take any number of rows.

| Token | Role |
|---|---|
| `--board` | Greyboard ground, darker than the sheet |
| `--sheet` | The working sheet and field fills |
| `--ink` | Text, checked chips, reached steps, the received frame |
| `--ink-2` | Hints, keys, readout labels (5.4:1 on the board) |
| `--ultra` | Actions and focus rings only, plus the outline stroke |
| `--guide` | Non-photo blue: guides, crop marks, lens ring, clear-space squares |
| `--alert` | Field errors only |
| `--line`, `--tint`, `--square` | Resting rules, chip hover tint, 1x squares |
| `--font-display`, `--font-text` | Funnel Display and Funnel Sans |
| `--t-xs` … `--t-display` | Type scale (major third from 17px); the specimen size is set by JS |
| `--s-1` … `--s-10` | Spacing scale |
| `--ease-*`, `--d-*` | CSS easings and durations; `--ease-land` is the CSS twin of back.out(1.4) |

## Notes

- **Measurements.** Funnel Display 500 measures cap 0.68em and x-height 0.50em with canvas `measureText` after both faces load, so cap height is 1.36x. The baseline depth in a `line-height: 1` box comes from a zero-size probe read once at 100px. If the fonts arrive after the 1.2s cap, the sheet is measured again.
- **Collection.** Funnel Display and Funnel Sans appear nowhere else in the collection (checked 2026-10-24). The board stays clear of the nearest neutral grounds: features-ebike `#D3D0C8` is warmer and lighter, and process-smallsat `#CDCFCB` is lighter and cooler.
- **Fictional on purpose.** +56 32 000 2714 cannot be a Chilean landline (subscriber numbers don't start with 0). Templeman is a real street, but 418 is invented. On 2026-10-23 no studio called Sixpica was found and sixpica.studio did not resolve, but sixpica.com is registered. Recheck before publishing.
- **Cut on review, one line each.**
  - The rotating word in the H2 (TX6): it was a generic agency-hero trope that accented one word.
  - The copy-email button (CD10): contact-expedition-outfitter owns that interaction, and mailto: works.
  - The in-section header, nav and skip link: this is a section, not a page.
  - The magnetic pull on "Send brief": the lens is the page's one pointer effect.
  - The draggable guide: it competed with the lens and read as a stray rule.
  - Chip badges: they repeated the fill like SaaS notification dots.
  - The scrubbed next-steps rule: it was a second scroll set piece, so the rule now draws once.
