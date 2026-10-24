---
title: Lofting duck header
section: nav
subject: The site header and section navigation for Tarrant & Hope, a fictional builder of three strip-planked cedar sailing yachts a year on North Quay, Penryn, Cornwall, shown over a one-page site with the boats, the build stages, refit, the yard and a commission form.
aesthetic: The mould-loft floor where a hull is first drawn full size. Primer-grey painted floor, loftsman's pencil, a spruce fairing batten and lead "ducks" that hold it, with one lofting ink for everything you can act on. Set in Spline Sans only.
mode: light
fonts:
  - Spline Sans, variable wght 300-700 (Google Fonts). The only family. H1 500 at -0.03em and 1.02 leading, H2 and H3 600, nav and buttons 500 at 15px with +0.01em, body 400 at 17px/1.55, spec values 500 with tabular figures (the font has tnum).
js: Keeps one current section from an IntersectionObserver and moves a lead duck along the header's spruce batten to that link (or to a hovered or focused one), bending the batten under it with a transform-only affine matrix; scrubs the bar into a centred pill over the first 200px; hides the header on downward scroll below the hero and brings it back on scroll up, focus or a mouse at the top edge; grows the pill into a mobile menu panel with a vertical batten, stopping Lenis while it is open; glides in-page links with Lenis and moves focus to the target heading; validates the commission form in place and shows an honest result with a way back. A self-check runs at #selftest.
libraries: [GSAP 3.15 (ScrollTrigger), Lenis 1.3.26]
tags: [nav, header, sticky, hide-on-scroll, pill, section-spy, sliding-indicator, mobile-menu, boatbuilder, yacht, lofting, light, gsap, lenis, form]
use_when:
  - A one-page or long-scroll site with four to six real sections, where showing which section you are in helps (a maker, a yard, a studio, a venue).
  - The brand has a physical tool that marks a position along a line (a batten and weights, a slide rule cursor, a bookmark ribbon, a tide gauge), so the current-section indicator can be that tool.
  - Headers that must work as a full-width bar at the top, a compact floating pill while reading, and a full menu on phones.
avoid_when:
  - Multi-page sites with deep navigation or mega-menus. There is one level of links and the indicator assumes they map to sections on this page.
  - More than five header links. The pill is capped at 880px and the duck needs room to travel between labels.
  - Dark, high-energy brands. The motion is deliberately stiff and quiet, like a spruce batten, and has no bounce to lean on.
---

## Why it works

**The bold idea: the duck travels along the batten.** A loftsman fairs a hull's lines on the floor with a long spruce batten held in place by lead weights called ducks. Here the header's lower edge is that batten, drawn as one SVG path, and a small lead duck sits on it under the link for the section in view. When the section changes, or a link is hovered or focused, the duck slides to the new link. As it moves, the batten flexes into a fair curve under its weight (up to 4px, in proportion to the distance), a blue "faired" segment resizes to the new link's width, and everything settles straight in 0.55s expo.out with no overshoot, because a spruce batten is stiff and is not a string. At the top of the page the duck parks under the logo, and at the commission form it parks under the "Commission a boat" button.

- **One object, three forms.** The full-width bar scrubs into a centred pill over the first 200px and the batten goes with it, clipped inside the pill. On phones the pill grows into the menu panel, and the batten turns vertical down the panel's left edge, carrying the duck to the current, hovered or focused row. There is no second idea competing with it. The hero's lines plan is static, section headings do not animate, and the only scroll-drawn rules are the five build stages.
- **Bending without changing the path.** The batten path is written once, as a quadratic from (0,0) to (L,0) with its control point at (L/2, 1). Applying `matrix(1, 0, cx - L/2, s, 0, 8)` keeps both ends fixed and moves the control point to (cx, s). That is an exact affine image of the bent curve, so only the group's transform changes per frame, with `vector-effect: non-scaling-stroke` keeping the stroke 3px wide. The control point goes to `2 × duck - L/2` (clamped to the batten) so the deepest point sits under the duck, and the duck rides the curve by solving for the curve's height at its own x. The self-check at `#selftest` verifies both against a sampled quadratic.
- **Colour is the floor.** `--floor` is a primer grey, darker than the rest of the light collection. `--sheet` is a clearly lighter surface for the pill, panel and fields. Pencil graphite carries text, the duck is lead, the batten is spruce, and the only accent is a deep petrol lofting ink (`--ink`). It is used only on things you can act on or that are current: the faired segment, focus rings, the buttons, the chosen boat. No navy-and-white stripes, rope or chart vocabulary.
- **Structure is information.** Boat specs are a labelled `dl` (length overall, beam, draught, displacement, berths, build time, price). Name and role sit on separate lines. The sail plans are drawn to one scale, so the Hope 52 is visibly bigger than the 34. The build stages are an ordered list whose markers are durations ("About 3 weeks", "5 to 9 months"), because they are a real sequence. There are no eyebrows, no 01/02 numbers and no arrows on links.
- **Behaviour does not depend on motion.** The section spy, menu, anchors, hide-on-scroll and form all live outside `gsap.matchMedia`, so under reduced motion or with the CDN blocked everything still works, with instant changes. The motion branch only adds Lenis, tweens and the pointer-side detail on buttons.
- **Copy from the customer's side.** Three real boats with full specs and prices, five strip-planking stages with materials and durations, "shoes come off at the door" because the loft floor is painted, and a result that says nothing was sent.
- **Revisions made while building.**
  - The art director replaced the first palette (a lighter floor and a royal blue ink sat on top of other designs in the collection) with the primer-grey floor and petrol ink, and darkened `--lead` to keep 4.5:1 on the darker floor.
  - The batten first bent by rewriting the path's `d` attribute. It now bends through the affine matrix above, so only transform, opacity and clip-path animate (plus stroke-dashoffset on the sail plans).
  - A pointer-driven bend of the batten was cut. A spruce batten is stiff, and only the duck's weight bends it.
  - The load sequence first used masked rises and tilts on the logo, links and H1, like other nav designs. Now the chrome only comes up from dimmed, and the load belongs to the batten drawing stern to bow and the duck dropping onto it. SplitText was dropped.
  - The logo's text roll, the toggle's masked label swap and the sibling dimming on boat rows were cut. Each one repeated another design and added nothing to the duck.
  - The phone number moved into the Ofcom drama range (01632 960735), and the email uses a reserved `.example` domain.
  - Refit and The yard were first planned side by side. Two sections in the same band cannot both be "current", so they stack, each with its heading on the left and its body on the right, and every section has `min-height: 42svh` so that an anchored section always reaches the spy's band.
  - On narrow screens there are no links in the bar, so the duck walks six evenly spaced stations from the logo to the Menu button and still shows how far down the page you are.
  - A form bug: `form { display: grid }` overrode the `hidden` attribute, so the form stayed on screen under the result. A global `[hidden] { display: none !important }` fixed it.
  - The one accessory removed: the hero text opacity fade on load. It dimmed the H1 and lede for most of a second while the batten drew, and it was a third thing moving at once. The hero text is now there from the first paint.

## Do not touch

- **Two header layers.** The outer `.hdr` takes the hide translate (`translateY(-120%)`, 0.4s expo.out). The inner `.bar` takes the pill: `.bar__bg::before` is clipped with `inset()` plus `round`, the logo and `.bar__end` translate by `--p × --shift`, and the batten is clipped by `--p × (--ins + --batten-pad)`. Putting both on one element makes the scrubbed pill and the hide transition fight.
- **The pill geometry.** `--ins` (side inset, `max(8px, (width - 880px) / 2)` from 992px, 8px below) and `--shift` (how far the logo and buttons travel inward) are measured on resize. The duck's targets are cached in layout space with a sign: `+1` for the logo, `-1` for links and buttons. Its x is `b + g × p × shift`, so it stays under its link while the pill forms. Do not read rects per frame.
- **The batten maths.** The path data is written only on resize. Per frame, only the `transform` of the two `<g>` groups, the ink segment's `clip-path` and the duck's `transform` change. The control sag `s` is twice the visible sag. `matrixFor` never lets `s` reach 0, because a singular matrix stops non-scaling strokes rendering.
- **The settle.** Travel is one proxy tween (expo.out) that interpolates position, segment width and sag. The sag is `from × (1 - e) + max × sin(π e)`, so it is continuous when interrupted and ends exactly at 0. Do not add elastic or back eases.
- **Spy band and section heights.** IntersectionObserver with `rootMargin: -40% 0px -55% 0px`. Any section shorter than about 40% of the viewport needs its `min-height`, or clicking its link will light the next one.
- **Menu rules.** The toggle has `aria-expanded` and `aria-controls`. The panel is `inert` when closed. Focus moves to the first link when it opens. Escape, a click outside, a link click or focus leaving the header closes it, and Escape and outside clicks return focus to the toggle. The keyboard is never trapped. Lenis stops while it is open. The header never hides with the menu open, with focus inside it or with the mouse in the top 72px.
- **Real form controls.** The boat choices are real radios in a fieldset. Errors appear under the field with `aria-describedby` (and `aria-invalid` on the inputs), and focus goes to the first invalid field. The result heading gets focus and is scrolled into view.
- **Contrast.** Graphite on floor is 9.0:1, lead on floor 5.1:1, ink on floor 6.2:1, sheet on ink 8.2:1, fault on floor 5.3:1. Spruce is decorative only (1.7:1) and must never carry text.

## Motion

Ease family: expo.out for travel and arrivals, expo.inOut for draws and morphs, none for anything scrubbed. Leaving runs faster than entering. Everything runs inside one `gsap.matchMedia` (`motion`, `reduce`, `fine`). Lenis (lerp 0.1, `autoRaf: false`, `anchors: false`) runs on `gsap.ticker` with `lagSmoothing(0)`. Cleanup reverts the menu timeline, removes the pointer listeners and the ticker callback, destroys Lenis, straightens both battens, and switches the header to the instant compact state. Technique ids refer to `research/motion-techniques.md`.

| What | Technique | Trigger | Timing | Reduced motion |
|---|---|---|---|---|
| Batten draws stern to bow | SC16 (clip-path wipe) | Load, t=0 | `inset(0 100% 0 0)` to `inset(0)`, 0.9s expo.inOut | Drawn |
| Logo, nav links, CTA, toggle | LD8, opacity only | Load, t=0.3 and 0.4 | 0.25 to 1, 0.4s, stagger 0.06; never hidden, only dimmed | Shown |
| Duck drops onto the batten | Signature | Load, t=0.85 | falls 10px in 0.3s power2.in, then the batten dips 3px and settles in 0.55s expo.out | Placed, no dip |
| Bar to pill | NV2 + SC11 | ScrollTrigger 0 to 200px writes `--p` | clip-path inset with round on the background, logo and buttons translate by the cached shift, batten clip follows; ease none | `--p` jumps to 1 past 80px |
| Section spy moves the duck | NV6 + NV4 + signature | IntersectionObserver, band at 40 to 45% | duck and faired segment 0.55s expo.out, sag `min(4, dx / 60)` px; `aria-current` moves; link colour lead to graphite 0.3s | Jumps, straight batten |
| Hide on scroll | NV5 | Native scroll direction, below the hero | translateY(-120%) 0.4s expo.out; returns on scroll up, focus or mouse in the top 72px (P2) | Instant toggle |
| Build-stage rules | SC16 | Each stage at top 90%, once | rule scaleX 0 to 1 from the left, 1s expo.out; the stage's text opacity 0.4s from 0.15s | Static |
| Anchor glide and focus | NV6 | Any in-page link | `lenis.scrollTo`, duration `min(1.3, 0.65 + distance / 4000)`, expo.out, then focus on the `tabindex="-1"` heading; the spy is locked to the target during the glide | Instant jump, same focus |
| Skip link | Clip reveal | Focus | clip-path from the top, 0.3s expo.out | Instant |
| Logo, nav links, header CTA preview | NV4 signature | pointerenter or focus | duck and segment travel 0.45s expo.out; 150ms after leave or blur they return to the current section | Jump |
| Buttons (header, hero, submit, edit, panel) | HV4 + MI1 | Hover, focus-visible, press | ink fill scaleX from the side the pointer entered (fine pointers), 0.45s in and 0.3s out toward the exit side; label to sheet; press scale 0.97 in 0.12s, release 0.4s power3.out; keyboard focus fills from the left | Colour swap |
| Menu toggle | Label swap + NV2 | Click, Enter, Space | labels share one grid cell and swap instantly; the pill grows into the panel with clip-path, 0.7s expo.inOut | Instant |
| Menu rows and panel CTA | NV1 stagger + vertical NV4 | Open; hover and focus | rows rise from masks, yPercent 125 to 0, 0.5s expo.out, stagger 0.05 from 0.35s; vertical batten duck travels 0.45s with the same sag rule; close is the timeline reversed at 2x (0.5s) | Instant |
| Text links | HV2 | Hover, focus-visible | 0.07em underline enters from the left and leaves to the right, 0.45s cubic-bezier(.35,0,0,1), over a resting 1px rule; press scale 0.97 | Underline shown; persistent on touch |
| Boat rows | HV11 | Row hover or focus-within | ink mainsail and jib outlines draw over the always-visible 35% drawing, stroke-dashoffset 0.6s expo.inOut, jib 0.08s later; undraw 0.3s | Static drawing only |
| Boat choice | MI3 | Radio change | border to ink plus inset line; a small duck badge scales 0.6 to 1 in 0.25s expo.out | No pop |
| Select and text fields | MI4 | Focus; invalid submit | ink line under the field scaleX 0 to 1 from the left, 0.4s expo.out; errors fade in 4px, 0.25s, focus to the first invalid field, no shake | Instant |
| Form and result | Crossfade | Valid submit, "Edit your enquiry" | out 0.15s, in 0.3s, then focus and scroll into view | Instant swap |

## Adapting

1. **Sections and links.** Keep the `ORDER` array, the section ids, the `data-spy` and `data-duck` attributes on the bar links, the panel links and the CTAs, and a `tabindex="-1"` heading in each section in step. `top` parks the duck on the logo and the last id parks it on the CTA. Four links fit the 880px pill comfortably. A fifth needs the 880 in `measure()` raised.
2. **Tokens.** Keep the roles: one painted ground, one lighter surface, a text colour, a secondary text at 4.5:1 or better on both ground and surface, a decorative line colour for the batten, and one accent for action and current state. The accent must pass 4.5:1 against the ground and the surface must pass 4.5:1 on the accent, because button labels flip to it on hover.
3. **Another tool on the line.** The rig takes any small SVG in place of the duck. Keep it 44 × 22 with its base on y=21, or change the `22.5px` top offset and the `pos - 22` / `pos - 11` translations in `render()`. A bookmark ribbon, a slide-rule cursor or a tide-gauge float all work. Keep the stiff settle unless the material really is elastic.
4. **Header geometry.** `--bar-h`, `--row-h`, `--batten-y`, `--pill-top`, `--pill-r` (half of bar height minus top inset), `--pill-pad` and `--batten-pad` are set for narrow screens and again from 992px. Change them together. The duck needs about 18px clear between the row's buttons and the batten.
5. **Retiming or removing motion.** CSS durations and curves are the `--dur-*` and `--ease-*` tokens. The duck's travel is `rig.go(id, seconds)`, with 0.55 for the spy and 0.45 for previews. The sag cap is the `Math.min(4, dx / 60)` in `go()`, and setting it to 0 gives a straight-sliding indicator. To remove the pill, delete the ScrollTrigger in the motion branch and the `if (!M.on)` line in the scroll listener, and set `--p: 0`. To remove hide-on-scroll, delete the `is-hidden` line in the scroll listener. To remove the load, delete the first timeline. To drop the libraries, remove the three CDN tags: the page then behaves like the reduced-motion version, with every state change instant.
6. **Stack translation.** Keep one current-section source (the observer), one rig object per batten, the two header layers, and the menu's inert, focus and Escape rules. In a framework, measure targets in a resize effect and call `render()` from the scroll handler, never from layout reads per frame.

| Token | Role |
|---|---|
| `--floor` | Painted loft floor: page ground. |
| `--sheet` | Lighter surface: pill, menu panel, fields, radio options; button label on hover. |
| `--graphite` | Text, the duck's hook, the sail-plan hulls, station rules. |
| `--lead` | Secondary text, idle links, the duck's body. |
| `--spruce` | The batten. Decorative only. |
| `--ink` | The only accent: faired segment, focus rings, buttons, chosen boat, field focus line. |
| `--fault` | Form errors, always with text. |
| `--rule` | Pencil rules between rows and under the pill. |
| `--font` | Spline Sans with system fallbacks. |
| `--t-xs` ... `--t-hero` | Type scale: 13, 15, 17, 21, 28px, the H2 clamp(2rem, 4vw, 2.75rem) and the H1 clamp(2.75rem, 6.4vw, 5.25rem). |
| `--s-1` ... `--s-10`, `--gutter`, `--max` | 4px spacing scale from 4 to 128px, a 16 to 48px gutter, 1240px content width. |
| `--r-field`, `--r-panel`, `--r-pill` | 6px fields and buttons, 20px open menu, round pill and badge. |
| `--ease-out`, `--ease-io`, `--ease-line`, `--ease-press` | expo.out, expo.inOut, the underline curve and power3.out. |
| `--dur-travel`, `--dur-preview`, `--dur-hide`, `--dur-ui` | 0.55s, 0.45s, 0.4s and 0.3s. |
| `--bar-h`, `--row-h`, `--batten-y` | Header height, button row height and the batten's line. |
| `--pill-top`, `--pill-r`, `--pill-pad`, `--batten-pad` | Pill top inset, radius, content inset, and the batten's clearance from the rounded ends. |
| `--p`, `--ins`, `--shift` | Header progress (0 bar, 1 pill), pill side inset and content travel, written by the script. |
