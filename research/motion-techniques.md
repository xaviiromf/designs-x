# Motion techniques for designs-x

A deduplicated catalogue of motion techniques, distilled from a structured analysis of 60 award-level websites (October 2026). It is written for two readers: AI agents choosing or adapting a design, and the people and agents building the next designs. Every recipe is original: it describes the behaviour in GSAP 3 + Lenis (or CSS when CSS is better), not any site's code.

Read `PRINCIPLES.md` first. Two rules from it govern everything here:

- **Motion answers people.** Motion that responds to an action is welcome when it shows what changed. Ambient motion is used once per design at most.
- **Default 8 is a tell.** "Fade-and-slide-up on every section, hover lift on every card" is what generated design looks like. A design uses one motion idea as its bold element and keeps the rest quiet.

How to read an entry: **Sees** is what the user perceives. **Recipe** is a precise build. **Timing** gives easing and duration ranges. **Fits** lists designs-x section types (including the proposed new ones in section 5). **Polished / cheap** is the quality bar. **Reduced motion** and **Touch** are mandatory fallbacks. **Seen on** names sites from the sample (short names, see section 1).

Labels in the collection: a design that ships plain JavaScript gets the orange "uses JavaScript" underline. A design that loads GSAP, Lenis or any other runtime library gets the red underline and lists the library in `design.md` frontmatter (`libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]`). Where a technique works in plain CSS or vanilla JS, the entry says so, so a builder can stay orange when the library adds nothing.

---

## 1. The sample

### Sites analysed (60 sites)

Numbers are the order of analysis. 61 to 63 were added last, replacing three repeat captures of the same domains (Lusion, Funtech, Locomotive), so 15, 37 and 40 are unused. Two sites could not be inspected properly (Podium, Bryony Wong). Where the capture tool could not render a WebGL site, the analysis came from the shipped HTML, CSS and bundles; those findings are marked "inferred" in the entries.

**Agencies and studios**

- 6 https://obys.agency (Obys): wheel-driven vertical filmstrip of thumbnails on a WebGL canvas, focus brackets, synced index.
- 7 https://lusion.co/ (Lusion): odometer preloader, tunnel title, overscroll-to-next-page bar. Inferred from source.
- 9 https://emotion-agency.com/ (Emotion): 2000vh sticky WebGL story with idle-snap chapters, decoding mono text.
- 12 https://dardo.studio/ (Dardo): chapter-snapped scroll, WebGPU dart flight, shared-element card-to-cover route transition.
- 14 https://dirtverse.co/ (Dirt): Framer studio, circular video orbs drifting, pill nav highlighter, scroll-stepped services list.
- 17 https://www.bigdirty.agency/ (Big Dirty): Webflow, vertical scroll pans a horizontal track of framed panels, running-rabbit mascot.
- 20 https://cuberto.com/ (Cuberto): word-mask rise, clip-path window card, exclusion-blend cursor with states, scrubbed services accordion.
- 23 https://auge-xp.com/ (AUGE): scramble preloader, colour-inverting curtain, directional clip reveals, hover fills.
- 24 https://archiste.framer.website/ (Archiste): architecture template, hero scale-settle, sticky split titles.
- 25 https://lisa.locomotive.ca/en (Locomotive Lisa): scramble preloader, pointer parallax 3D character, chat-style brief intake.
- 26 https://pda.archi/ (PDA): architecture practice, pinned hero clip shrink, masked line reveals, curtain page transition.
- 28 https://activetheory.net (Active Theory): WebGL studio, only the fallback screen rendered. Inferred.
- 31 https://unseen.co (Unseen): eyes loader, squeeze cursor, per-char text roll, DOM-synced WebGL planes. Inferred.
- 33 https://locomotive.ca/en (Locomotive): text-shuffle hover and page transition, depixelate thumbnails, CSS progress variables.
- 36 https://grandecharte.co (Grande Charte): glass 3D scroll iframe, word-mask rise with rotation, lens-bulge images.
- 45 https://www.merci-michel.com/ (Merci Michel): WebGL chapter rail, masked wordmark loader. Inferred.
- 51 https://podium.global/ (Podium): sports production studio. Unverified (shell failed); text-only evidence.
- 52 https://www.immersive-g.com (Immersive Garden): velocity-triggered zoom-out "fast mode", dotted trail cursor. Inferred.
- 56 https://resn.co.nz (Resn): glyph and hairline loader into a grainy WebGL stage.
- 57 https://www.14islands.com/ (14islands): tilted tile settle, scroll-velocity image warp, Lenis as shared clock.

**Personal portfolios**

- 2 https://alexvanholtz.com/ (Alex Van Holtz): vanilla JS, concentric-circle intro, hand-built pinned career timeline, highlighter sweeps.
- 3 https://jackiezhang.co.za/ (Jackie Zhang): Framer scrapbook, rotating word, tilted card parallax, doodle hovers.
- 10 https://www.arcmarumo.com/ (Arc Marumo): VHS tape-shelf carousel on wheel, CRT overlays, channel-change glitch.
- 43 https://www.CreativeOcean.com/ (Creative Ocean): canvas fly-through hero, cursor parallax, curtain page transition.
- 48 https://www.leeholmes.uk/ (Lee Holmes): DLA spotlight canvas, banded blur headline, scramble reveals, CSS `:has()` follower.
- 55 https://www.jesperlandberg.com (Jesper Landberg): curved WebGL ribbon of sheets, rolling digits, shared-element flight.
- 60 https://metic.studio/en (metic.): x-ray magnifier lens, pinned "the build" sequence with skip link.
- 61 https://www.raviklaassens.com/ (Ravi Klaassens, R—K): Webflow + GSAP 3.15 + Lenis + Barba, framed hero that expands, awards list with sliding poster, optional hover sound.
- 62 https://www.davidlubofsky.com (David Lubofsky): Nuxt + GSAP 3.11, ring-and-logo loader, drifting geometric shapes, case images that fall away on click, marker underlines with random tilt.

**Product and SaaS**

- 1 https://omarchy.org/ (Omarchy): pixel-etch wordmark, cursor pixel ripple, count-up stats, no animation library.
- 11 https://sintra.ai/ (Sintra): pinned phone step switcher, sticky CTA bar, stacked feature cards.
- 18 https://illoca.unseen.co/ (Illoca): custom "joe" easing everywhere, four-panel clip-path shutter, drawbridge button.
- 30 https://consensys.io/ (Consensys): scrubbed word illumination, stacked shrinking cards, mega-menu height tween.
- 39 https://nothing-to-watch.port80.ch/ (Nothing to Watch): Voronoi poster canvas, typewriter ellipsis, gated configuration.
- 42 https://www.browserbase.com/ (Browserbase): dithered video hero, highlighter headline, looping micro-UI vignettes.
- 53 https://velt.dev/ (Velt): CSS-only hero product story, marching-ants connectors, preview/code tabs.
- 58 https://www.butter.video/ (Butter): text-effect picker, velocity marquee, pinned horizontal gallery, progress-pill testimonials.

**E-commerce and brand product**

- 8 https://santionispirits.com/ (Santioni): WebGL comic-book story; refused headless browsers. Inferred.
- 13 https://grids03.obys.agency/ (Obys Grids 03): module preloader becomes the logo, inset window reveals, WebGL grid hover. (Course launch microsite; listed here because it sells a product.)
- 16 https://www.analogue.co/ (Analogue): restrained one-viewport product stages, draggable reviews, almost no JS.
- 27 https://www.becaneparis.com/ (Becane): chroma-keyed video models in a wheel-driven focus carousel.
- 29 https://nothing.tech/ (Nothing): pinned title marquee, scroll-scrubbed canvas sequence, dot grid with difference blend.
- 32 https://landonorris.com (Lando Norris): lime-bar line reveal, ellipse clip text, scroll colour handoff, card fan.
- 34 https://sobha-privy-collection.com/ (Sobha): luxury real estate, pinned curtain handover, polygon wipe reveals.
- 38 https://deltacafes.com/en (Delta Cafes): logo-mask loader, palette cross-fade by chapter, artefact collage.
- 41 https://cowboy.com/ (Cowboy): 500vh sticky chapters with segmented rail, no animation library.
- 44 https://matcha-cartel.com/index (Matcha Cartel): numbered grid load, pinned production chain, flashlight reveal.
- 50 https://bryonywong.com/collections/all (Bryony Wong): jewellery shop. Not inspected (disk quota error); no claims made.
- 54 https://singerreimagined.com/ (Singer): watches (not cars), tilted rise reveal, two-layer link swap, card image crossfade.

**Editorial, events, exhibitions, community**

- 4 https://www.thedesignsociety.fr/ (The Design Society): pixel-grid transitions, scramble hovers, draggable stickers, scattered-word manifesto.
- 5 https://a24.raviklaassens.com/ (A24 concept): WebGL disc carousel with wheel steps, masked metadata lines, grain overlay.
- 19 https://gehry.getty.edu (Gehry, Getty): sketch preloader with sound gate, per-letter width title, chapter colour blocks.
- 21 https://format.obys.agency/ (Format, Obys): curtain plus letter climb, filmstrip hand-off, scrubbed clock and shape morphs.
- 22 https://experience2026.funtech.inc/ (Funtech): terminal boot loader, CRT stack, station engine.
- 46 https://www.offforum.com/ (OFFF Forum): rapid photo-flash hero, curtain route transition, bleeding footer wordmark.
- 47 https://junkyardking.io/ (Junkyard King): browser brawler, impact frames, skewed glass HUD.
- 49 https://palaraiffeisen.ch/ (Palaraiffeisen): sports venue, odometer preloader, tiled clip page transition, 3D building tour.
- 35 https://inherited.band/ (Inherited): band site, SVG-filter glitch letters, clip curtain contact overlay.
- 59 https://ohlalaride.com/ (Oh La La Ride): browser game, magnetic tilt buttons, results stamp sequence.
- 63 https://www.SeeWhatEyeSee.org (See What Eye See): vision-loss simulator on three.js, scrambled intro lines, ragged noise wipes, eyelid-blink page transition, faded ambient sound.

### Stack observed

Counts are sites out of 60 (bundled libraries were confirmed from source where the capture tool missed them; sites 61 to 63 are included).

| Library | Entries | Notes |
|---|---|---|
| GSAP (any version) | 34 | 32 on GSAP 3.x (3.15 the most common pinned version; Lubofsky is on 3.11.4), 2 on legacy 1.x (Merci Michel, Resn). |
| ScrollTrigger | 26 | Usually for scrub and pin; several sites pin with CSS `position: sticky` and only read progress. |
| Lenis (or a Lenis wrapper) | 30 | Includes Locomotive Scroll v5 and Framer's built-in Lenis. Versions seen 1.3.1 to 1.3.26. |
| GSAP + Lenis together | 25 | Almost always wired through `gsap.ticker` with `lagSmoothing(0)`. |
| SplitText | 16 | Plus custom splitters (Palaraiffeisen, Splitting.js at Grande Charte, the legacy SplitText 3.0 build at Lubofsky). Most use `mask: 'lines'`. |
| ScrambleTextPlugin | 3 | Plus 5 hand-rolled scramble or shuffle effects. |
| Observer / Flip / CustomEase | 12 / 7 / 11 | Observer for wheel-stepped carousels, Flip for reflow, CustomEase for a house curve. |
| Barba.js | 7 | Plus Astro/Nuxt/Next routers and the View Transitions API for page transitions. |
| three.js | 23 | 34 sites use some WebGL or WebGPU (three, OGL, custom engines). |
| Framer / Framer Motion | 4 / 3 | Framer sites still ship Lenis. |
| Webflow | 5 | IX2 for basic interactions, GSAP for the rest. |
| Matter.js / Howler | 1 / 1 | Ravi Klaassens only: physics-driven award badges (inferred from config) and a hover sound layer. |
| No animation library at all | 8 | Omarchy, Alex Van Holtz, Arc Marumo, Analogue, Cowboy, Singer, Velt, 14islands' own UI. Several of the best-judged sites are in this group. |

What this means for designs-x: GSAP + Lenis is the dominant award stack, but it is spent on two things: scroll choreography (pins, scrub, chapters) and text splitting. Hover, menus and micro-interactions are mostly CSS transitions even on GSAP sites. WebGL is out of scope for a single-file section; every WebGL technique below has a DOM or canvas 2D translation.

---

## 2. Technique catalogue

House easing names used below: `expo.out` (= cubic-bezier(.16,1,.3,1), the most used curve in the sample), `power3.out`, `power4.inOut` / `expo.inOut` for wipes, `none` for anything scrubbed by scroll. Pick one ease family per design and reuse it; inconsistent easing was the most common cheap tell.

### 2.1 Page load

#### LD1. Real-progress counter preloader
- **Sees:** a large numeral (often an odometer of stacked digit columns) climbing to 100, sometimes with a 1px hairline filling underneath, then the loader leaves and the hero is already composed.
- **Recipe:** keep a proxy `p = {v:0}`. Feed it real progress (`img.decode()`, `document.fonts.ready`, video `canplay`), never a timer alone: `gsap.to(p, {v: target, duration: .4, ease: 'power2.out', overwrite: true, onUpdate: render})`. Odometer: each digit is a 1ch-wide `overflow:hidden` column of ten stacked spans; `gsap.to(col, {yPercent: -10 * digit, duration: .5, ease: 'expo.out', overwrite: 'auto'})`. Hairline: `transform: scaleX(var(--p))`, `transform-origin: left`. Hold a minimum of about 1s so fast loads still read, and a hard release after 5 to 8s. `lenis.stop()` while it shows, `lenis.start()` on exit.
- **Timing:** 1.2 to 2.2s total, exit overlaps the hero entrance by 0.3 to 0.5s.
- **Fits:** hero, portfolio, gallery, story.
- **Polished / cheap:** polished uses `font-variant-numeric: tabular-nums`, eases the displayed value, skips on repeat visits (sessionStorage flag in try/catch) and never blocks content that is already ready. Cheap is a linear fake count, a counter that sits at 99, or a 3s wait on every route.
- **Reduced motion:** no loader; show the page immediately.
- **Touch:** same.
- **Seen on:** Lusion, Emotion, Obys, A24, Palaraiffeisen, Immersive Garden, Arc Marumo, Funtech, Jesper Landberg, Resn.

#### LD2. Diegetic boot (the loader is brand content)
- **Sees:** the wait is a scene from the subject's world: a terminal printing boot logs with dotted leaders and ASCII bars, hand-drawn sketch strokes drawing in, a pixel wordmark etching itself.
- **Recipe:** terminal: rows of `label · leader · n/N · [##   ] · size`, `textContent` updated from the loader, new rows revealed with `gsap.set(row, {autoAlpha: 1})` at 0.08 to 0.12s steps (steps, not fades), older rows dimmed to 0.55. Sketch: SVG paths with `pathLength="1"`, `stroke-dasharray: 1`, `gsap.to(paths, {strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', stagger: {each: .25, from: 'random'}})`. Pixel etch: canvas cells with random delays, alpha quantised with `ease: 'steps(3)'`. End on one clear action (Enter, click) only if the action has a purpose (unlocking audio).
- **Timing:** under 3s on a fast connection; row step 80 to 120ms; caret blink `1s steps(2) infinite`.
- **Fits:** hero, story, product.
- **Polished / cheap:** polished shows true numbers and lands on the moment content is interactive. Cheap is random log lines or a gate with no timeout.
- **Reduced motion:** print the final state, no blink.
- **Touch:** gate action is a real button.
- **Seen on:** Funtech, Omarchy, Gehry, Arc Marumo, Unseen (eyes).

#### LD3. Curtain hand-off
- **Sees:** a solid panel lifts or wipes away (often in a contrasting colour) and the hero is revealed underneath, the two moves overlapping.
- **Recipe:** fixed overlay; `tl.to(curtain, {yPercent: -100, duration: 1, ease: 'expo.inOut'})` or `clipPath: 'inset(0 0 100% 0)'`, then `.from(heroLines, {yPercent: 110, stagger: .08, duration: 1, ease: 'expo.out'}, '-=.4')`; `display: none` in `onComplete`. Colour-flip variant: animate `--bg`/`--fg` custom properties on `:root` with the same duration.
- **Timing:** 0.9 to 1.2s, `expo.inOut` or `power4.inOut`.
- **Fits:** hero, story.
- **Polished / cheap:** the overlay colour equals the page's first paint so nothing flashes; one shared ease. Cheap is a fade to white then a pop.
- **Reduced motion:** remove the overlay without animation.
- **Touch:** same.
- **Seen on:** The Design Society, Format, AUGE, PDA, Creative Ocean.

#### LD4. Logo-mask zoom reveal
- **Sees:** the brand mark is a hole in a solid screen; it grows until it swallows the viewport and the page is behind it.
- **Recipe:** overlay with `clip-path: url(#mask)`, `<clipPath clipPathUnits="objectBoundingBox">` holding an evenodd path (outer rect plus the logo as a hole). `gsap.to(wrapper, {scale: 40, transformOrigin: '50% 55%', duration: 1.6, ease: 'power4.inOut'})` with the hero `fromTo({opacity: .15, scale: 1.08}, {opacity: 1, scale: 1})` at `'<.2'`. Circle variant: three or four concentric discs `scale .15 -> 12`, `expo.inOut`, stagger .08.
- **Timing:** 1.2 to 1.8s.
- **Fits:** hero.
- **Polished / cheap:** vector mark so it stays sharp at scale 40; gated on readiness. Cheap is a raster logo that blurs.
- **Reduced motion:** skip.
- **Touch:** same.
- **Seen on:** Delta Cafes, Alex Van Holtz.

#### LD5. Loader that becomes the logo or nav
- **Sees:** the loading element does not disappear; it shrinks and moves to become the header logo or the nav pill, so the wait is continuous with the page.
- **Recipe:** keep one element. `Flip.getState(el)`, move it into the header slot (or toggle a class), `Flip.from(state, {duration: 1.2, ease: 'power3.inOut'})`. Pill-to-nav: tween the pill width to the measured nav width (`getBoundingClientRect`) and stagger links in from `yPercent: 100`.
- **Timing:** 0.7 to 1.2s.
- **Fits:** hero, nav.
- **Polished / cheap:** same DOM element before and after. Cheap is fading one logo out and another in at a different size.
- **Reduced motion:** place it in the header directly.
- **Touch:** same.
- **Seen on:** Obys Grids 03, A24, Dirt, Resn (glyph becomes the 3D hero), Lubofsky (logo mark inside a progress ring, then in the header).

#### LD6. Hero media scale-settle
- **Sees:** the hero photo starts slightly zoomed and settles over two seconds while the type stays still.
- **Recipe:** `gsap.fromTo(img, {scale: 1.25}, {scale: 1, duration: 2.2, ease: 'expo.out'})` inside an `overflow:hidden` wrapper. CSS alternative: a transition triggered by a `.is-loaded` class added on `img.decode()`.
- **Timing:** 1.6 to 2.4s, `expo.out` or `power4.out`, start scale 1.1 to 1.4.
- **Fits:** hero, gallery.
- **Polished / cheap:** only the image moves. Cheap scales the text with it or bounces.
- **Reduced motion:** scale 1.
- **Touch:** same.
- **Seen on:** Archiste, Singer, Analogue (static variant), Cuberto.

#### LD7. Clip-path window card
- **Sees:** a big rounded media card opens from an inset crop to its full frame while keeping its corner radius.
- **Recipe:** `gsap.fromTo(card, {clipPath: 'inset(5% 10% round 2rem)', scale: .9}, {clipPath: 'inset(0% 0% round 2rem)', scale: 1, duration: 2.5, ease: 'expo.out'})`.
- **Timing:** 1.5 to 2.5s, `expo.out`.
- **Fits:** hero, features, portfolio, story.
- **Polished / cheap:** `round` keeps the radius constant. Cheap animates width and height.
- **Reduced motion:** final state.
- **Touch:** same.
- **Seen on:** Cuberto, Lusion (reel), Cowboy.

#### LD8. Quiet chrome entrance
- **Sees:** after the hero is in place, small header and footer items arrive with a 4 to 12px rise in a short stagger; nothing important ever waits on them.
- **Recipe:** `gsap.from('.hud > *', {y: 4, autoAlpha: 0, duration: .2, ease: 'expo.out', stagger: .12, delay: .3})`. Logo letters can pop with `scale: 0 -> 1, stagger: .06`. Nav labels can rise from under a mask with a 6deg tilt that straightens.
- **Timing:** 0.2 to 0.8s each, stagger 0.06 to 0.12s.
- **Fits:** nav, hero, footer.
- **Polished / cheap:** text and CTAs are visible (or only dimmed) from first paint, so LCP and keyboard use are not delayed. Cheap hides the CTA for 2s.
- **Reduced motion:** no entrance.
- **Touch:** same.
- **Seen on:** Funtech, Omarchy, Cuberto, Big Dirty, Delta.

### 2.2 Scroll

#### SC1. Batched enter reveal (use sparingly)
- **Sees:** a group of cards or rows arrives as one wave when it enters.
- **Recipe:** set the initial state only when JS runs (`html.js [data-rv]`). `ScrollTrigger.batch('[data-rv]', {start: 'top 88%', once: true, onEnter: els => gsap.timeline().to(els, {opacity: 1, duration: 1, stagger: .1}).to(els, {y: 0, duration: 2, ease: 'expo.out', stagger: .1}, 0)})` from `{opacity: 0, y: 40}`. Opacity short, transform long: text is readable early and settles slowly.
- **Timing:** opacity 0.6 to 1s, transform 1 to 2s, stagger 0.06 to 0.12, travel 16 to 40px.
- **Fits:** features, pricing, testimonials, faq, team, gallery.
- **Polished / cheap:** one distance and ease site-wide, `once: true`, batch so six cards are one wave. Cheap is the same fade-up on every section (default 8), 100px travel, or content invisible without JS.
- **Reduced motion:** no transform, content visible.
- **Touch:** same.
- **Seen on:** Cuberto, Alex Van Holtz, Unseen, AUGE, Nothing, Dirt, Archiste.

#### SC2. Scrubbed image parallax inside a frame
- **Sees:** a photo drifts slower than its frame while the frame scrolls past.
- **Recipe:** frame `overflow:hidden`; image oversized by 2 x travel. `gsap.fromTo(img, {yPercent: -10}, {yPercent: 10, ease: 'none', scrollTrigger: {trigger: frame, start: 'clamp(top bottom)', end: 'clamp(bottom top)', scrub: true, invalidateOnRefresh: true}})`. Travel proportional to frame height (7 to 14%).
- **Timing:** `ease: 'none'`, `scrub: true` (Lenis already smooths).
- **Fits:** hero, gallery, portfolio, features, story.
- **Polished / cheap:** `clamp()` so top-of-page images do not start offset; oversize so no edge shows. Cheap is an eased scrub (rubbery), fixed 200px offsets that expose gaps, or parallax on phones.
- **Reduced motion:** no parallax.
- **Touch:** keep or disable under 768px; never on top of native momentum issues.
- **Seen on:** A24, Obys Grids 03, Cuberto, Format, Palaraiffeisen, PDA, Delta, Gehry, Archiste, Consensys.

#### SC3. Pinned storytelling stage with chapters
- **Sees:** one stage holds still while scroll advances through numbered chapters; the headline, image and a progress rail change per chapter, then the page continues.
- **Recipe:** CSS sticky: wrapper `height: calc(100svh + N * 100svh)`, child `position: sticky; top: 0; height: 100svh`. One trigger: `ScrollTrigger.create({trigger: wrap, start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: s => render(s.progress)})`. `render` derives `idx = floor(p * N)` and a local progress; when `idx` changes, play a short time-based crossfade (`gsap.timeline({defaults: {duration: .45, ease: 'power1.out'}})`), do not scrub opacity. Give the last chapter about 15% extra length. Rail segments: `scaleX` 1 for done, local for current, 0 for future. Add a "Skip" link (`lenis.scrollTo(after)`).
- **Timing:** 1 to 1.5 viewports per chapter; crossfade 0.4 to 0.6s.
- **Fits:** story, process, features, product hero.
- **Polished / cheap:** one progress value drives everything; sticky avoids pin-spacer jumps; visible rail; skip link; each chapter readable at rest. Cheap is five stacked pins, equal chapter lengths that flash the last one by, or scrubbed half-visible text.
- **Reduced motion:** unpinned stack of chapter blocks.
- **Touch:** sticky works with native scroll; shorten chapters.
- **Seen on:** Sintra, Cowboy, Emotion, Illoca, Matcha Cartel, metic., Gehry, Santioni.

#### SC4. Vertical scroll drives a horizontal track
- **Sees:** a section pins and its panels slide sideways as the user scrolls down; images inside drift against the track.
- **Recipe:** `const tween = gsap.to(track, {x: () => -(track.scrollWidth - innerWidth), ease: 'none', scrollTrigger: {trigger: section, start: 'top top', end: () => '+=' + (track.scrollWidth - innerWidth), pin: true, scrub: .6, invalidateOnRefresh: true}})`. Inner triggers use `containerAnimation: tween` with `start: 'left right'`. A progress ruler can `scaleX` on the same timeline. Wrap in `gsap.matchMedia('(min-width: 992px)')`.
- **Timing:** scroll distance equals content width; scrub 0.5 to 1.
- **Fits:** portfolio, process, gallery, story.
- **Polished / cheap:** distance tied to real width so speed feels constant; tall panels can get their own vertical phase; a stacked or scroll-snap fallback below the breakpoint. Cheap is a fixed 400vh, no fallback, or a trap with no way out.
- **Reduced motion:** horizontal `overflow-x: auto` with scroll-snap.
- **Touch:** native horizontal scroll-snap row.
- **Seen on:** Big Dirty, Alex Van Holtz, Lando Norris, Butter, Nothing.

#### SC5. Scrubbed word illumination
- **Sees:** a large statement sits at 20% opacity and lights up word by word as it crosses the viewport; scrolling back dims it.
- **Recipe:** `SplitText.create(el, {type: 'words'})`; `gsap.set(words, {opacity: .2})`; `gsap.to(words, {opacity: 1, stagger: .25, ease: 'none', scrollTrigger: {trigger: el, start: 'top 80%', end: 'top 40%', scrub: 1}})`.
- **Timing:** scroll range about 40% of the viewport; `scrub: .6` to `1`.
- **Fits:** story, features, testimonials, cta.
- **Polished / cheap:** short range so it completes while readable; start opacity no lower than 0.2. Cheap leaves the end of the sentence dim as it leaves, or starts invisible.
- **Reduced motion:** full opacity.
- **Touch:** same scrub (native scroll).
- **Seen on:** Consensys, Gehry, metic. (blur variant), Emotion.

#### SC6. Stacked sticky cards
- **Sees:** each card sticks; the next one slides over it and the covered card scales down and dims, leaving a small edge visible.
- **Recipe:** cards `position: sticky; top: calc(6rem + var(--i) * 1rem)`. For each but the last: `gsap.to(card, {scale: .94, filter: 'brightness(.7)', ease: 'none', scrollTrigger: {trigger: next, start: 'top bottom', end: 'top top+=96', scrub: true}})`.
- **Timing:** scrubbed; scale 0.92 to 0.96.
- **Fits:** features, portfolio, process, pricing.
- **Polished / cheap:** small consistent offsets, depth cue on the covered card. Cheap uses `pin: true` per card or no depth cue.
- **Reduced motion:** cards stack normally.
- **Touch:** sticky works; keep.
- **Seen on:** Sintra, Consensys, metic., 14islands, Cuberto.

#### SC7. Section curtain handover
- **Sees:** a section holds and the next slides up over it like a sheet; the held one drifts up a little and darkens.
- **Recipe:** held section `position: sticky; top: 0`, next section higher `z-index` and opaque. `gsap.to(held.firstElementChild, {yPercent: -15, ease: 'none', scrollTrigger: {trigger: next, start: 'top bottom', end: 'top top', scrub: true}})` plus an overlay `opacity 0 -> .3`. Optional top radius on the incoming sheet.
- **Timing:** scrubbed; drift 10 to 25%.
- **Fits:** hero, features, cta, footer.
- **Polished / cheap:** the next sheet is opaque and the drift is small. Cheap exposes blank gaps.
- **Reduced motion:** plain flow.
- **Touch:** keep (CSS sticky).
- **Seen on:** Sobha, Locomotive, Palaraiffeisen, OFFF, 14islands.

#### SC8. Footer uncover
- **Sees:** the footer seems to be underneath the page; as the last section scrolls away the footer content slides into place and a dark veil lifts.
- **Recipe:** `gsap.timeline({scrollTrigger: {trigger: footer, start: 'clamp(top bottom)', end: 'clamp(top top)', scrub: true}}).fromTo(inner, {yPercent: -40}, {yPercent: 0, ease: 'none'}).fromTo(veil, {opacity: .5}, {opacity: 0, duration: .7}, 0)`.
- **Timing:** scrubbed; veil fades faster than the move so type is legible before it stops.
- **Fits:** footer, cta, contact.
- **Polished / cheap:** `clamp()` keeps it valid at page end. Cheap uses fixed backgrounds that jitter.
- **Reduced motion:** static footer.
- **Touch:** keep.
- **Seen on:** PDA, The Design Society, Delta, Browserbase, Becane.

#### SC9. Scroll-driven colour handoff
- **Sees:** background and text colours change as the reader crosses into a new chapter; the fixed header adapts to stay legible.
- **Recipe:** sections carry `data-theme`; register colour custom properties with `@property --bg {syntax: '<color>'; inherits: true; initial-value: #fff}`. `ScrollTrigger.create({trigger: s, start: 'top 60%', end: 'bottom 60%', onToggle: t => t.isActive && gsap.to(root, {'--bg': c.bg, '--fg': c.fg, duration: .6, ease: 'power2.inOut', overwrite: 'auto'})})`. Scrubbed variant: `gsap.utils.interpolate(fromColor, toColor, progress)`.
- **Timing:** 0.4 to 0.8s, or scrubbed.
- **Fits:** story, features, footer, nav.
- **Polished / cheap:** 3 or 4 tokens; contrast checked in every state; switch at 60% viewport, not on the edge. Cheap flips mid-paragraph or leaves the header unreadable.
- **Reduced motion:** switch instantly.
- **Touch:** same.
- **Seen on:** Lando Norris, Gehry, Delta, Obys, Illoca, Analogue (hard cuts).

#### SC10. Velocity coupling
- **Sees:** an ambient element (marquee, reel, image warp, skew) speeds up while the user scrolls fast and relaxes when they stop.
- **Recipe:** `lenis.on('scroll', ({velocity}) => target = 1 + Math.min(Math.abs(velocity) * .02, 2.5))`; in `gsap.ticker`: `loop.timeScale(gsap.utils.interpolate(loop.timeScale(), target, .1))`, and decay `target` toward 1. Skew variant: `gsap.quickTo(el, 'skewY', {duration: .5})` fed `clamp(-5, 5, velocity * .02)`. Use delta time for anything frame-based.
- **Timing:** interpolation 0.08 to 0.12 per frame; caps always.
- **Fits:** gallery, footer, testimonials, portfolio.
- **Polished / cheap:** smoothed and capped. Cheap sets `timeScale` from raw velocity (judder).
- **Reduced motion:** no ambient loop at all.
- **Touch:** velocity is 0 without smooth touch; fine.
- **Seen on:** Butter, Format, Lando Norris, 14islands, Immersive Garden.

#### SC11. CSS progress variable
- **Sees:** nothing by itself; it lets designers write scroll effects in CSS (`calc(var(--progress) ...)`).
- **Recipe:** `ScrollTrigger.create({trigger: el, start: 'top bottom', end: 'bottom top', onUpdate: s => el.style.setProperty('--progress', s.progress.toFixed(4))})`. Remap in CSS: `--mapped: max(0, (var(--progress) - .5) / .5)`. Native alternative where supported: `animation-timeline: view()`.
- **Timing:** n/a.
- **Fits:** any.
- **Polished / cheap:** one variable per element, transform and opacity only. Cheap writes many inline styles per frame.
- **Reduced motion:** stop updating, set final values.
- **Touch:** same.
- **Seen on:** Locomotive, Lando Norris (data attributes), Delta.

#### SC12. Scroll-scrubbed image sequence
- **Sees:** a product turns or opens frame by frame as the user scrolls through a pinned stage.
- **Recipe:** `const seq = {f: 0}; gsap.to(seq, {f: frames - 1, snap: 'f', ease: 'none', scrollTrigger: {trigger: wrap, start: 'top top', end: 'bottom bottom', scrub: .3}, onUpdate: () => draw(seq.f)})`. `draw` contain-fits on a canvas with DPR capped at 2 and falls back to the nearest loaded frame. Preload with `decode()` when within 400px of the viewport; a static `<img>` of the last frame sits underneath.
- **Timing:** about 2/3 of a viewport per 30 frames.
- **Fits:** story, product hero, features.
- **Polished / cheap:** never blank, preloaded early. Cheap scrubs `video.currentTime` (stutters) or loads 120 frames on page load.
- **Reduced motion:** static last frame.
- **Touch:** separate portrait frame set.
- **Seen on:** Nothing, Matcha Cartel, Santioni (inferred).

#### SC13. Count-up on enter
- **Sees:** figures roll up to their real value once when they come into view.
- **Recipe:** server-render the final number. `ScrollTrigger.create({trigger: el, start: 'top 75%', once: true, onEnter: () => gsap.from(o, {v: start, duration: 1.1, ease: 'power3.out', snap: {v: 1}, onUpdate: () => el.textContent = fmt.format(o.v)})})` with `Intl.NumberFormat`; start near the target (final minus a few percent), not from zero.
- **Timing:** 0.65 to 1.6s, `power2.out` or `power3.out`.
- **Fits:** features, testimonials, pricing, team, cta.
- **Polished / cheap:** tabular numerals, once, real numbers. Cheap counts from 0 every pass or animates invented stats (default 6).
- **Reduced motion:** final value.
- **Touch:** same.
- **Seen on:** Omarchy, Sintra, Consensys, Oh La La Ride, Browserbase.

#### SC14. Overscroll to the next page
- **Sees:** at the end of a page a "keep scrolling" block fills a bar or ring as the user keeps scrolling; when full, it navigates.
- **Recipe:** pin the last block for `+=100%`; `onUpdate: s => bar.style.transform = 'scaleX(' + s.progress + ')'`; fire only after progress has been 1 for about 250ms; always render a normal link to the same target.
- **Timing:** scrubbed; transition after fill 0.4 to 0.8s.
- **Fits:** footer, portfolio, blog (in a single-file section: link to the next in-page section or panel).
- **Polished / cheap:** reversible, visible feedback, link fallback. Cheap auto-navigates with no warning.
- **Reduced motion:** plain link.
- **Touch:** same.
- **Seen on:** Lusion, Emotion, A24, Locomotive.

#### SC15. Stepped snap chapters (handle with care)
- **Sees:** one scroll gesture moves exactly one chapter, with an eased glide.
- **Recipe:** `Observer.create({type: 'wheel,touch', tolerance: 12, preventDefault: true, onDown: () => go(i + 1), onUp: () => go(i - 1)})` gated by an `animating` flag; `go` uses `lenis.scrollTo(target, {duration: 1, lock: true})`. Release control after the last chapter. Velocity-matched easing (cubic Hermite with start slope from Lenis velocity) avoids a gear change.
- **Timing:** 0.9 to 1.2s per step; input locked only for that long.
- **Fits:** story only.
- **Polished / cheap:** keyboard, links and reduced motion all bypass it. Cheap fights trackpad inertia or traps the page.
- **Reduced motion:** plain scroll.
- **Touch:** native scroll with CSS `scroll-snap-type: y proximity`.
- **Seen on:** Emotion, Dardo, Sintra (uneven bounds).

#### SC16. Rule and mark draw-in
- **Sees:** hairlines between rows draw from the left; registration crosses scale in at corners.
- **Recipe:** `gsap.from(rule, {scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'expo.out', scrollTrigger: {trigger: rule, start: 'top 90%', once: true}})`. Crosses: `scale: 0, rotation: 90 -> 0, ease: 'back.out(2)', stagger: .05`.
- **Timing:** 0.6 to 1.2s.
- **Fits:** features, faq, footer, pricing, process.
- **Polished / cheap:** lines encode real structure and draw before their text. Cheap adds decorative lines for motion's sake.
- **Reduced motion:** static.
- **Touch:** same.
- **Seen on:** Dirt, Lusion, Obys Grids 03, PDA, Cuberto, metic.

#### SC17. Pixel-cell cover between sections
- **Sees:** a grid of square cells switches on in a ragged wave until the next colour covers the screen.
- **Recipe:** build columns of cells sized from the viewport (fewer on mobile); priority `50 * (rows - 1 - row) + 300 * Math.random()`, sorted; `gsap.timeline({scrollTrigger: {trigger: section, start: 'clamp(bottom bottom)', end: 'clamp(bottom top)', scrub: .3}}).to(sorted, {autoAlpha: 1, duration: .1, stagger: {amount: 1.5}, ease: 'none'})`.
- **Timing:** scrubbed; opacity only.
- **Fits:** story, footer, cta (only when the subject has a pixel or grid identity).
- **Polished / cheap:** row bias plus noise reads as a wave; cell count adapts. Cheap uses uniform random static or hundreds of extra DOM nodes.
- **Reduced motion:** colour change without the wave.
- **Touch:** fewer cells.
- **Seen on:** The Design Society.

#### SC18. Scroll-popped badge cluster (inferred)
- **Sees:** a cluster of award or logo badges pops in one by one as the user scrolls through the block, then keeps drifting slightly and springs back to its place when nudged.
- **Recipe:** the source config (Matter.js 0.20, `scrollPerAward 30`, `popGap .18`, `popEase back.out(3.5)`, `popFrom .7`, air friction .07, weak home spring) suggests bodies with a spring to a home slot. Translation without a physics library: absolutely placed badges; a scrubbed timeline `fromTo(badge, {scale: .7, autoAlpha: 0}, {scale: 1, autoAlpha: 1, duration: .2, ease: 'back.out(3.5)'}, i * .18)` with `scrollTrigger: {start: 'top 35%', end: 'bottom bottom', scrub: true}`; ambient drift in `gsap.ticker`: `v += (home - pos) * .00004 * dt; v *= 1 - .07; pos += v`, with a small impulse from pointer speed.
- **Timing:** pop 0.2s; stagger 0.18 of timeline length.
- **Fits:** portfolio, testimonials, about.
- **Polished / cheap:** badges link to their source and sit in a real list for screen readers; the drift stays under 12px. Cheap lets them tumble out of the layout or never settle.
- **Reduced motion:** all badges shown, no drift.
- **Touch:** pop on scroll only; no pointer impulse.
- **Seen on:** Ravi Klaassens (inferred from source config; the capture did not reach it).

### 2.3 Hover

#### HV1. Two-copy text roll
- **Sees:** the label slides up out of its line and an identical copy rolls in from below.
- **Recipe:** CSS only. `a {overflow: hidden; display: inline-grid}`; label and a `::after {content: attr(data-text)}` both in `grid-area: 1/1`; copy starts `translate: 0 100%`. Under `@media (hover: hover) and (pointer: fine)`: on `:hover, :focus-visible`, label `translate: 0 -100%`, copy `translate: 0`. `transition: translate .4s cubic-bezier(.4,0,.1,1)`. Per-character wave: split chars and add `transition-delay: calc(var(--i) * 14ms)`.
- **Timing:** 0.35 to 0.6s; per-char step 14 to 20ms.
- **Fits:** nav, cta, footer, pricing, contact.
- **Polished / cheap:** pixel-aligned copy, `aria-hidden` duplicate (or the pseudo-element), focus parity, gated by `hover: hover`. Cheap duplicates text in the DOM so screen readers read it twice, or lets the copy show unclipped.
- **Reduced motion:** colour change only.
- **Touch:** no roll.
- **Seen on:** Lusion, A24, Unseen, Lando Norris, Singer, Illoca, Consensys, Locomotive.

#### HV2. Directional underline sweep
- **Sees:** the underline enters from the left and leaves to the right, as if the pointer passed through.
- **Recipe:** `a {background: linear-gradient(currentColor, currentColor) 100% 100% / 0 .07em no-repeat; transition: background-size .5s cubic-bezier(.35,0,0,1)} a:hover {background-position: 0 100%; background-size: 100% .07em}`. Marker variant: height 40%, sitting behind the text in an accent tint.
- **Timing:** 0.3 to 0.5s.
- **Fits:** nav, footer, blog, contact, cta, faq.
- **Polished / cheap:** thickness in em; exit direction differs from entry. Cheap pops `text-decoration` or animates width.
- **Reduced motion:** underline shown statically.
- **Touch:** persistent underline.
- **Seen on:** Alex Van Holtz, Obys, Obys Grids 03, 14islands, Singer, Palaraiffeisen, Analogue.

#### HV3. Highlighter wipe on a link
- **Sees:** an inverted copy (light box, dark text) wipes in from the left, and wipes out to the right on leave.
- **Recipe:** absolutely positioned copy with `clip-path: inset(0 100% 0 0)`; `[data-state=in] {clip-path: inset(0)}`, `[data-state=out] {clip-path: inset(0 0 0 100%)}`, `transition: clip-path .4s cubic-bezier(.4,0,.2,1)`; on `transitionend` in the out state, set a `reset` state with `transition: none` so it snaps back invisibly.
- **Timing:** 0.3 to 0.45s.
- **Fits:** nav, footer, contact.
- **Polished / cheap:** no visible rewind. Cheap fades.
- **Reduced motion:** instant colour swap.
- **Touch:** none.
- **Seen on:** Lee Holmes, Dirt, Big Dirty.

#### HV4. Button fill from the entry edge
- **Sees:** a fill layer sweeps across the button from the side or edge the pointer entered, the label colour flips, an icon turns.
- **Recipe:** `::before` fill `transform: scaleX(0); transform-origin: var(--from, left)`; on `pointerenter`, set `--from` from `e.clientX < rect.left + rect.width / 2`; hover `scaleX(1)`. Text and icon `z-index: 1`. Scale-background variant: the background layer scales to 1.05 and changes colour while the label stays still. Inset variant: background `inset: 0 -> .125em`.
- **Timing:** 0.25 to 0.6s; leave slightly faster than enter.
- **Fits:** cta, hero, pricing, contact, crud.
- **Polished / cheap:** transform-only, one curve, press state distinct. Cheap animates width or uses a bounce.
- **Reduced motion:** colour change.
- **Touch:** `:active` state only.
- **Seen on:** Big Dirty, Singer, Lee Holmes, Illoca, Unseen, AUGE.

#### HV5. Magnetic button
- **Sees:** the button leans a few pixels toward the cursor, sometimes with a slight 3D tilt and a soft highlight following the pointer inside it, then eases home.
- **Recipe:** cache `rect` on enter. `const x = gsap.quickTo(btn, 'x', {duration: .5, ease: 'power3.out'})` (and `y`, `rotationX`, `rotationY`). On move: `nx = (e.clientX - rect.left) / rect.width * 2 - 1`; `x(nx * 5); y(-2 + ny * 3); rotationY(nx * 3)`. Leave: `gsap.to(btn, {x: 0, y: 0, rotationX: 0, rotationY: 0, duration: .55, ease: 'power3.out', overwrite: true, clearProps: 'transform'})`. Optional shine: a gradient child moved with its own `quickTo`.
- **Timing:** follow 0.4 to 0.6s; offsets 3 to 6px; tilt at most 3deg.
- **Fits:** cta, hero, pricing, nav.
- **Polished / cheap:** tiny magnitudes, rect cached, inline transforms cleared. Cheap uses 20px pulls or re-measures every frame.
- **Reduced motion:** off.
- **Touch:** off (`pointer: fine` only).
- **Seen on:** Oh La La Ride, Grande Charte, The Design Society, Analogue.

#### HV6. Image swap inside a fixed frame
- **Sees:** a card's image scales slightly inside its frame; a second photo crossfades in with an opposite scale, like a lens pulling focus.
- **Recipe:** both images stacked, same aspect ratio; primary `scale 1 -> .95`, secondary `opacity 0 -> 1, scale 1.05 -> 1`; `transition: .4s cubic-bezier(.25,.46,.45,.94)`.
- **Timing:** 0.4 to 0.8s.
- **Fits:** portfolio, gallery, team, blog.
- **Polished / cheap:** same crop, preloaded second image. Cheap scales the whole card or blurs neighbours.
- **Reduced motion:** crossfade only.
- **Touch:** first tap does nothing different; show primary.
- **Seen on:** Singer, Dirt, Lusion, Cuberto.

#### HV7. Sibling dimming
- **Sees:** hovering one item in a list or grid dims the others, so focus is obvious.
- **Recipe:** `@media (hover: hover) {.list:has(.item:hover) .item:not(:hover) {opacity: .4}}`, `transition: opacity .35s`. Mirror with `:focus-within`.
- **Timing:** 0.3 to 0.45s.
- **Fits:** gallery, portfolio, team, faq, nav, blog.
- **Polished / cheap:** neighbours stay readable (0.3 to 0.6). Cheap dims to near-invisible or fires in gaps between items.
- **Reduced motion:** keep (no movement).
- **Touch:** none.
- **Seen on:** Emotion, Butter, Lee Holmes, Locomotive, 14islands, Obys Grids 03.

#### HV8. Pixel mosaic swap and depixelate
- **Sees:** an image breaks into blocks that flip to a second image, or resolves from coarse pixels to sharp.
- **Recipe:** depixelate: draw the image into a small canvas at widths 8, 16, 32, 48, 96, 128 with `imageSmoothingEnabled = false` and `image-rendering: pixelated`, about 100ms per step, then remove the canvas. Mosaic: an 8 x 8 cell grid; `gsap.to(cells, {display: 'block', duration: 0, stagger: {each: .4 / 64, from: 'random'}})`.
- **Timing:** 0.4 to 0.8s, stepped (`steps(6)`).
- **Fits:** gallery, portfolio (subjects with a pixel or digital identity).
- **Polished / cheap:** stepped, once, small canvas. Cheap is a blur that pretends to be pixels.
- **Reduced motion:** plain image.
- **Touch:** on tap.
- **Seen on:** The Design Society, Locomotive.

#### HV9. Expanding row or column
- **Sees:** in a row of narrow panels, the hovered or focused one widens to show its content and the others narrow.
- **Recipe:** `grid-template-columns` from a variable per active index, `transition: grid-template-columns .7s cubic-bezier(.16,1,.3,1)`; or `Flip.getState(panels)`, toggle class, `Flip.from(state, {duration: .7, ease: 'expo.out'})`. Content fades in after width settles (delay 0.2s).
- **Timing:** 0.6 to 0.8s.
- **Fits:** features, gallery, team, pricing.
- **Polished / cheap:** focus opens it too; images use `object-fit`. Cheap reflows text every frame.
- **Reduced motion:** instant.
- **Touch:** stacked list.
- **Seen on:** Dardo, metic.

#### HV10. Hover-to-play video
- **Sees:** a still card starts its video when hovered and resets when left.
- **Recipe:** `<video muted loop playsinline preload="none" poster>`; enter: `v.currentTime = 0; v.play()`; leave: `v.pause()`; video `pointer-events: none`.
- **Timing:** fade the video layer 0.3s.
- **Fits:** portfolio, gallery, team.
- **Polished / cheap:** poster equals frame 0, lazy source. Cheap autoplays every video.
- **Reduced motion:** poster only.
- **Touch:** play when in view or on tap.
- **Seen on:** Inherited, Cuberto, Dirt.

#### HV11. Drawn ornament on hover
- **Sees:** a hand-drawn ellipse or underline draws around a link, a small doodle pops.
- **Recipe:** SVG path `pathLength="1"`, `stroke-dasharray: 1; stroke-dashoffset: 1`; hover `stroke-dashoffset: 0`, `transition: .45s cubic-bezier(.4,0,.2,1)`. Doodle `scale(.6) rotate(-8deg) -> none` with `back.out(2)`.
- **Timing:** 0.35 to 0.5s in, 0.2s out.
- **Fits:** nav, footer, portfolio.
- **Polished / cheap:** each link has its own drawing; focus works. Cheap is the same emoji everywhere.
- **Reduced motion:** show drawn state.
- **Touch:** show on focus/tap.
- **Seen on:** Jackie Zhang, Alex Van Holtz.

#### HV12. Pointer-driven sheen
- **Sees:** an iridescent gradient or glare moves across a card under the pointer.
- **Recipe:** set `--x`, `--y` (percent in the card) through `gsap.quickTo` on a proxy; layers use `radial-gradient(circle at var(--x) var(--y), ...)` with `mix-blend-mode: soft-light`; optional tilt capped at 8deg.
- **Timing:** follow 0.3 to 0.5s; fade layers 0.3s.
- **Fits:** pricing, portfolio, product.
- **Polished / cheap:** colour tied to the brand, tilt capped. Cheap is a fixed rainbow.
- **Reduced motion:** static.
- **Touch:** static.
- **Seen on:** Dardo, Oh La La Ride (shine).

### 2.4 Cursor

#### CU1. Follower with states (keep the native cursor)
- **Sees:** a small disc trails the pointer; over links it grows; over media it shows a label ("Play", "View") or an icon.
- **Recipe:** fixed element, `pointer-events: none`, `mix-blend-mode: difference` (or `exclusion`). `gsap.quickTo(el, 'x', {duration: .4, ease: 'power3'})` and `y`. State from data attributes on `mouseover` delegation (`data-cursor="view"`, `data-cursor-text`). Size change: scale a fixed-size circle (`scale .1 -> .6`), not width. Label: inner span from `yPercent: 110` through an `overflow:hidden` mask. Velocity squash optional: `scaleX = 1 + min(v / 200, .3)`, rotated to the travel angle. CSS-only states are possible: `body:has([data-follower]:hover) .cursor {transform: scale(1)}`.
- **Timing:** lag 0.3 to 0.6s; state changes 0.3s.
- **Fits:** portfolio, gallery, hero.
- **Polished / cheap:** the label says what a click will do; hidden on touch and when leaving the window; native cursor stays visible (or is hidden only over the element that carries the meaning, with focus rings intact). Cheap hides the cursor site-wide or follows 1:1 with no lag.
- **Reduced motion:** no follower.
- **Touch:** none; label text belongs in the visible UI.
- **Seen on:** Cuberto, Unseen, AUGE, Arc Marumo, Lee Holmes, Obys Grids 03, Creative Ocean, Santioni.

#### CU2. List preview that follows the cursor
- **Sees:** moving over list rows shows a small image next to the pointer; moving to the next row slides the old image out and the new one in, in the direction of travel.
- **Recipe:** fixed preview with `xPercent: -50, yPercent: -50` and `quickTo` x/y. On row enter: `dir = index > last`; old visual `yPercent: dir ? -100 : 100`, new from the opposite side, `duration: .5, ease: 'power2.inOut'`; skip the tween on the first enter.
- **Timing:** follow 0.6s; swap 0.5s.
- **Fits:** portfolio, blog, team, gallery.
- **Polished / cheap:** direction follows travel; clones removed. Cheap hard-cuts or shows on touch.
- **Reduced motion:** static thumbnails in the row.
- **Touch:** thumbnails inline.
- **Seen on:** The Design Society, Lee Holmes, Locomotive (team).

#### CU3. Pointer parallax layers
- **Sees:** layered artwork shifts a few pixels against the cursor at different depths, with a soft lag.
- **Recipe:** per layer `gsap.quickTo(l, 'x', {duration: 1.2, ease: 'power3.out'})`; on move `x(nx * depth * 30)`; depth 0.2 (back) to 1 (front); layers oversized slightly so edges never show.
- **Timing:** lag 0.8 to 1.2s; range under 30px.
- **Fits:** hero, cta, team.
- **Polished / cheap:** depth-ordered, small, settles at rest. Cheap moves everything equally.
- **Reduced motion:** off.
- **Touch:** off (device motion only with permission, not recommended).
- **Seen on:** Creative Ocean, Locomotive Lisa, Gehry, Analogue, Active Theory (inferred), See What Eye See (a depth map shifts pixels against the pointer in a shader; in the DOM use two or three cut-out layers).

#### CU4. Spotlight or lens reveal
- **Sees:** a circle under the pointer reveals a second layer: a lit area in a dark section, a blueprint view under a magnifier.
- **Recipe:** second layer clipped with `clip-path: circle(var(--r) at var(--x) var(--y))` or a radial `mask-image`; `--x`/`--y` set from `quickTo` on a proxy (duration 0.4 to 0.5); `--r` tweened 0 to 180px on enter. Content inside the lens must be meaningful (construction, annotations, the answer).
- **Timing:** follow 0.4s; radius 0.6s `expo.out`.
- **Fits:** hero, features, story, faq.
- **Polished / cheap:** a visible hint, and the hidden content is also reachable without a pointer. Cheap hides essential content behind hover.
- **Reduced motion:** show both layers side by side or the revealed layer statically.
- **Touch:** press and hold to show the lens, or show the layer statically.
- **Seen on:** metic., Matcha Cartel, Lee Holmes, Browserbase (inferred).

#### CU5. Grid field ripple
- **Sees:** cells of a background grid brighten in a square halo around the pointer and decay.
- **Recipe:** canvas; `Float32Array` heat per cell; Chebyshev distance to the pointer in cells; `heat = max(heat, 1 - d / R)`; decay `heat *= .92` per frame normalised to dt; stepped colours. Pause the loop with an IntersectionObserver.
- **Timing:** decay half-life about 0.15s.
- **Fits:** hero, footer, cta (subjects with a grid or pixel world). Counts as the design's one ambient motion.
- **Polished / cheap:** sleeps off screen, grid matches the layout grid. Cheap uses a round glow on everything and runs forever.
- **Reduced motion:** static grid.
- **Touch:** responds to tap.
- **Seen on:** Omarchy, Lee Holmes (spotlight), Santioni (inferred).

#### CU6. Elastic string divider
- **Sees:** a thin line bends toward the pointer like a plucked string and wobbles back.
- **Recipe:** SVG `M0,100 Q{w/2},100 {w},100`; on move `gsap.to(path, {attr: {d: 'M0,100 Q' + x + ',' + (y * 2 - 100) + ' ' + w + ',100'}, duration: .2, overwrite: true})`; on leave `duration: 2, ease: 'elastic.out(1, .2)'`; rebuild on resize.
- **Timing:** 0.2s follow, 2s release.
- **Fits:** footer, features, faq.
- **Polished / cheap:** low amplitude. Cheap is a big long bounce.
- **Reduced motion:** straight line.
- **Touch:** straight line.
- **Seen on:** Cuberto.

### 2.5 Menus and navigation

#### NV1. Full-screen menu as one reversible timeline
- **Sees:** the menu panel wipes in (clip-path from the top, or a circle from the button), links rise in a quick stagger, the toggle label swaps from Menu to Close, scroll stops.
- **Recipe:** `const tl = gsap.timeline({paused: true}).set(panel, {visibility: 'visible'}).fromTo(panel, {clipPath: 'inset(0 0 100% 0)'}, {clipPath: 'inset(0 0 0% 0)', duration: .75, ease: 'expo.inOut'}).from(links, {yPercent: 100, autoAlpha: 0, stagger: .06, duration: .6, ease: 'power3.out'}, '-=.3')`. Open: `tl.timeScale(1).play(); lenis.stop()`; close: `tl.timeScale(1.4).reverse(); lenis.start()` in `onReverseComplete`. Circle variant: `clip-path: circle(0 at <button centre>) -> circle(150vmax at ...)`. Toggle: `aria-expanded`, focus moves into the panel, Escape closes and returns focus, panel `inert` when closed.
- **Timing:** 0.6 to 0.9s open; close 1.3 to 1.5x faster.
- **Fits:** nav.
- **Polished / cheap:** one timeline killed or reversed on rapid toggles; origin anchored on the button; scroll locked; focus handled. Cheap is a display toggle, or a menu that lets the page scroll behind it.
- **Reduced motion:** instant show/hide.
- **Touch:** same (it is the mobile menu).
- **Seen on:** Archiste, Lando Norris (ellipse), Palaraiffeisen, Lee Holmes, Unseen, Locomotive, Lusion, Alex Van Holtz (circle), Singer, PDA.

#### NV2. Pill nav that morphs
- **Sees:** a small floating pill scales into the menu panel, or a full-width bar shrinks into a centred pill after the first scroll.
- **Recipe:** state on an attribute (`data-nav="open"`), CSS transitions on width, height and radius with `cubic-bezier(.625,.05,0,1)`. Scrubbed bar-to-pill: `--header-progress` from `ScrollTrigger.create({start: 0, end: '+=200', scrub: true, onUpdate: ...})`, blur and tint layers separate from the text so text never blurs, CSS transitions disabled inside the header so scrub and transition do not fight.
- **Timing:** 0.6 to 0.8s, or scrubbed.
- **Fits:** nav.
- **Polished / cheap:** one source of truth; closes on route change and Escape. Cheap animates height in JS on every click.
- **Reduced motion:** instant.
- **Touch:** same.
- **Seen on:** The Design Society, AUGE, A24, Dardo, Delta.

#### NV3. Mega-menu with hover intent
- **Sees:** hovering a top item opens a panel below; rows highlight as the pointer moves through; the panel stays open across the gap.
- **Recipe:** open on `pointerenter` of trigger or panel; close after a 120ms delayed call that is killed if the pointer returns; `gsap.fromTo(panel, {autoAlpha: 0, y: -6}, {autoAlpha: 1, y: 0, duration: .25, ease: 'power2.out'})`; height between panels `gsap.to(panel, {height: content.scrollHeight, duration: .6, ease: 'expo.out', onComplete: () => panel.style.height = 'auto'})`. Opens on focus too; Escape closes.
- **Timing:** 0.2 to 0.3s open, 0.15 to 0.25s close.
- **Fits:** nav.
- **Polished / cheap:** hover intent, invisible bridge, keyboard access. Cheap flickers when crossing the gap.
- **Reduced motion:** fade only.
- **Touch:** click to open.
- **Seen on:** Sintra, Velt, Browserbase, Consensys, Delta.

#### NV4. Sliding indicator
- **Sees:** one highlight (pill, underline, background) travels and resizes between options instead of each option lighting up on its own.
- **Recipe:** one absolutely positioned element; `gsap.to(ind, {x: el.offsetLeft, width: el.offsetWidth, duration: .4, ease: 'power3.out'})`; or `Flip`. Driven by hover, `:focus-visible` and the active state.
- **Timing:** 0.3 to 0.45s.
- **Fits:** nav, pricing (billing toggle), faq (tabs), crud (filters).
- **Polished / cheap:** follows keyboard focus too. Cheap pops per-item backgrounds.
- **Reduced motion:** jump without travel.
- **Touch:** follows the selected item.
- **Seen on:** Oh La La Ride, Nothing, Dirt, Cowboy, Butter.

#### NV5. Hide-on-scroll header
- **Sees:** the header slides away while reading down and returns on the first scroll up; at the top it is transparent over the hero.
- **Recipe:** `lenis.on('scroll', ({scroll, direction}) => {header.classList.toggle('is-hidden', direction === 1 && scroll > 120); header.classList.toggle('is-top', scroll < 10)})`; CSS `transform: translateY(-100%)`, `transition: transform .4s cubic-bezier(.16,1,.3,1)`. Never hide while a menu is open or focus is inside.
- **Timing:** 0.3 to 0.5s.
- **Fits:** nav.
- **Polished / cheap:** threshold and direction from smoothed scroll. Cheap flickers on jitter.
- **Reduced motion:** keep the toggle, no slide (instant).
- **Touch:** same, using native scroll direction.
- **Seen on:** Alex Van Holtz, Emotion, Cuberto, Locomotive, Singer, Palaraiffeisen, Dirt, Format.

#### NV6. Section spy and eased anchors
- **Sees:** the nav marks the section in view; clicking a nav link glides there and the duration scales with distance.
- **Recipe:** IntersectionObserver with `rootMargin: '-40% 0px -55% 0px'` toggles `aria-current`. Anchor: `lenis.scrollTo(target, {offset: -headerH, duration: Math.min(1.3, .65 + dist / 4000)})`, then move focus to the target (`tabindex="-1"`, `preventScroll`).
- **Timing:** 0.65 to 1.3s.
- **Fits:** nav, faq, features.
- **Polished / cheap:** focus moves for keyboard users. Cheap jumps or loses focus.
- **Reduced motion:** `immediate: true`.
- **Touch:** same.
- **Seen on:** Alex Van Holtz, Santioni, Big Dirty, Emotion.

#### NV7. Page and panel transitions (adapted to one file)
- **Sees:** content is covered (tiles, a curtain, a pixel grid) and uncovered with the new content, or a card grows into the detail view it opens.
- **Recipe:** a single-file section has no routes, so use this for in-page panels and dialogs. Curtain: `fromTo(overlay, {clipPath: 'inset(100% 0 0 0)'}, {clipPath: 'inset(0)', duration: .6, ease: 'expo.inOut'})`, swap content while covered, then `clipPath: 'inset(0 0 100% 0)'`. Shared element: `Flip.getState(card)`, render the detail with the same element, `Flip.from(state, {duration: .8, ease: 'expo.inOut', absolute: true})`. Same-document View Transitions: `document.startViewTransition(update)` with `view-transition-name` on the morphing element.
- **Timing:** 0.6 to 1.2s total.
- **Fits:** portfolio, gallery, crud (detail panels), team.
- **Polished / cheap:** content swaps only while fully covered; focus moves to the new heading; scroll is reset when it should be. Cheap flashes the old content or leaves listeners alive.
- **Reduced motion:** crossfade 150ms or instant.
- **Touch:** same.
- **Seen on:** The Design Society, Palaraiffeisen, Dardo, Locomotive, Lusion, PDA, Creative Ocean, OFFF, Jesper Landberg.

### 2.6 Click and drag

#### CD1. Native scroll-snap carousel, enhanced
- **Sees:** a row of cards that swipes on touch, scrolls with arrows and drags with the mouse, settling on a card.
- **Recipe:** `overflow-x: auto; scroll-snap-type: x mandatory`; slides `scroll-snap-align: start`. Mouse drag: on `pointerdown` (mouse only) store start, set `scroll-snap-type: none`, set `scrollLeft` on move, on release `gsap.to(track, {scrollLeft: nearest, duration: .6, ease: 'power3.out', onComplete: () => track.style.scrollSnapType = ''})`. Suppress click if moved more than 4px. Arrow buttons tween `scrollLeft` the same way. Active index from IntersectionObserver rooted in the track. Add `data-lenis-prevent` (or `touch-action: pan-y` on the track) so Lenis does not fight it.
- **Timing:** 0.5 to 0.7s.
- **Fits:** gallery, testimonials, portfolio, team, blog.
- **Polished / cheap:** touch and keyboard work with no JS. Cheap is a transform slider with no keyboard and click-through after drag.
- **Reduced motion:** `scroll-behavior: auto`; instant jumps.
- **Touch:** native swipe.
- **Seen on:** Omarchy, Analogue, Singer, Cowboy, Delta, Grande Charte.

#### CD2. Stepped focus carousel (one gesture, one item)
- **Sees:** wheel, drag or arrow keys move exactly one item; the centre item is large and sharp, neighbours shrink, tilt and dim; the caption swaps in sync.
- **Recipe:** `state = {pos: 0}`. `Observer.create({target: stage, type: 'wheel,touch,pointer', tolerance: 10, preventDefault: true, onUp: () => step(1), onDown: () => step(-1)})` with a 600ms lock. `step` tweens `gsap.to(state, {pos: target, duration: .8, ease: 'power3.out', onUpdate: layout})`. `layout`: for each item `d = i - state.pos`; `x = d * spacing; scale = 1 - abs(d) * .12; rotateY = clamp(-2, 2, d) * -30; opacity = 1 - clamp(0, 1, abs(d) - 1)`. Keys: ArrowLeft/Right, Home, End. An `aria-live` region announces the item.
- **Timing:** 0.6 to 0.9s per step.
- **Fits:** portfolio, gallery, product hero, team.
- **Polished / cheap:** trackpad inertia cannot skip five items; keyboard parity; off-centre items `pointer-events: none`. Cheap maps raw delta to translate or hijacks the whole page.
- **Reduced motion:** instant step.
- **Touch:** swipe through Observer; or native scroll-snap.
- **Seen on:** A24, Arc Marumo, Becane, Obys, Merci Michel (inferred).

#### CD3. Infinite strip with drag and velocity tilt
- **Sees:** a row drifts slowly and loops; dragging pushes it and the cards tilt slightly with speed, then settle.
- **Recipe:** duplicate the list; `const wrap = gsap.utils.wrap(-half, 0)`; `setX = gsap.quickTo(track, 'x', {duration: .5, ease: 'power3', modifiers: {x: gsap.utils.unitize(wrap)}})`; ticker drift `pos -= dt / 10`; `Observer.create({target: track, type: 'pointer,touch', onDrag: e => {pos += e.deltaX; setRot(e.velocityX * .002)}, onRelease: () => setRot(0)})`. Pause drift while dragging and when off screen.
- **Timing:** tilt return 0.8s.
- **Fits:** team, logos, testimonials, gallery.
- **Polished / cheap:** no jump at the loop point. Cheap rebuilds tweens on every move.
- **Reduced motion:** no drift; static scrollable row.
- **Touch:** native horizontal scroll.
- **Seen on:** The Design Society, Analogue.

#### CD4. Draggable objects
- **Sees:** stickers or cards can be picked up, tilt as they move, lift with a shadow, and settle on release; the last one moved stays on top.
- **Recipe:** `Draggable.create(item, {bounds: wrap, minimumMovement: 8, onPress () {item.style.zIndex = ++z; gsap.to(item, {scale: 1.05, duration: .25})}, onDrag () {gsap.to(item, {rotation: gsap.utils.clamp(-14, 14, this.deltaX * .08), duration: .2, overwrite: true})}, onRelease () {gsap.to(item, {scale: 1, rotation: 0, duration: .25, ease: 'power3.out'})}})`. A tap without movement passes through to the link underneath.
- **Timing:** 0.2 to 0.3s.
- **Fits:** hero, team, cta (playful subjects).
- **Polished / cheap:** bounded, taps preserved, keyboard alternative (arrow keys move the focused item). Cheap loses items off screen.
- **Reduced motion:** still draggable, no tilt.
- **Touch:** works with pointer events; avoid in scroll areas.
- **Seen on:** The Design Society.

#### CD5. Flip reflow on filter or view change
- **Sees:** choosing a filter or switching grid/list moves every item to its new place in one sweep; removed items fade.
- **Recipe:** `const s = Flip.getState(items); toggle(); Flip.from(s, {duration: .8, ease: 'power3.inOut', stagger: .01, absolute: true, onEnter: el => gsap.fromTo(el, {opacity: 0}, {opacity: 1}), onLeave: el => gsap.to(el, {opacity: 0})})`.
- **Timing:** 0.6 to 1.2s; stagger 0.01 to 0.03.
- **Fits:** gallery, portfolio, crud, blog.
- **Polished / cheap:** tiny stagger reads as one move; input locked only for the duration. Cheap snaps or queues.
- **Reduced motion:** instant.
- **Touch:** same.
- **Seen on:** Merci Michel, Podium (inferred), Dardo, Locomotive.

#### CD6. Accordion with real height
- **Sees:** a row opens smoothly to its content height; the icon turns; other rows close.
- **Recipe:** CSS: panel wrapper `display: grid; grid-template-rows: 0fr; transition: grid-template-rows .5s cubic-bezier(.625,.05,0,1)`, open `1fr`; child `min-height: 0; overflow: hidden`. Or `<details>` plus `interpolate-size: allow-keywords` where supported. After it settles call `lenis.resize()` and `ScrollTrigger.refresh()`. Close faster than open.
- **Timing:** open 0.4 to 0.8s, close 0.3 to 0.5s.
- **Fits:** faq, pricing, features, process, crud.
- **Polished / cheap:** `aria-expanded`, `inert` on closed panels, no measuring. Cheap uses `max-height` guesses that clip or lag.
- **Reduced motion:** instant.
- **Touch:** same.
- **Seen on:** Cuberto, Lee Holmes, Illoca, Dardo, Velt, Sintra, Locomotive.

#### CD7. Dialog and lightbox open
- **Sees:** a stage opens from a scaled card or a wipe; the page behind dims and stops scrolling; Escape or Back closes it.
- **Recipe:** native `<dialog>` with `showModal()`; `dialog::backdrop {background: rgb(0 0 0 / .6); backdrop-filter: blur(4px)}`; `gsap.fromTo(panel, {autoAlpha: 0, y: 12, scale: .98}, {autoAlpha: 1, y: 0, scale: 1, duration: .45, ease: 'expo.out'})`; `lenis.stop()` on open, `lenis.start()` on close; videos load on open.
- **Timing:** 0.35 to 0.6s in, 0.25 to 0.4s out.
- **Fits:** portfolio, gallery, pricing, contact, crud.
- **Polished / cheap:** native focus trap and Escape. Cheap uses a div modal with scroll leaking.
- **Reduced motion:** fade only.
- **Touch:** full-screen sheet.
- **Seen on:** A24, Obys Grids 03, Creative Ocean, Funtech, Locomotive, Cowboy.

#### CD8. Hold to confirm
- **Sees:** pressing and holding fills a ring; releasing early drains it.
- **Recipe:** SVG circle with `stroke-dasharray` = circumference; `pointerdown`: `gsap.to(c, {strokeDashoffset: 0, duration: .9, ease: 'none', onComplete: act})`; `pointerup`: `gsap.to(c, {strokeDashoffset: circ, duration: .25, ease: 'power2.out'})`. Enter and Space trigger the action immediately.
- **Timing:** 0.8 to 1.2s.
- **Fits:** crud (destructive actions), cta.
- **Polished / cheap:** keyboard path, visible progress. Cheap hides the affordance.
- **Reduced motion:** keep (it is feedback), no idle pulse.
- **Touch:** works with pointer events.
- **Seen on:** Funtech.

#### CD9. Tabs with a fixed-height crossfade
- **Sees:** switching tabs crossfades the content without the layout jumping.
- **Recipe:** both panels in the same grid cell (`grid-area: 1/1`) so height is the max; `gsap.timeline().to(old, {autoAlpha: 0, y: -4, duration: .15}).fromTo(next, {autoAlpha: 0, y: 4}, {autoAlpha: 1, y: 0, duration: .25, ease: 'power2.out'})`; `role="tablist"`, arrow keys.
- **Timing:** 0.3 to 0.4s total.
- **Fits:** features, pricing, faq, product.
- **Polished / cheap:** no height jump. Cheap slides for more than 0.4s.
- **Reduced motion:** instant.
- **Touch:** same.
- **Seen on:** Velt, Cowboy.

#### CD10. Copy with in-place confirmation
- **Sees:** clicking an email copies it and a short "Copied" label replaces or joins it for a moment.
- **Recipe:** `navigator.clipboard.writeText(v)`; `gsap.timeline().fromTo(label, {autoAlpha: 0, y: 6}, {autoAlpha: 1, y: 0, duration: .25}).to(label, {autoAlpha: 0, duration: .3}, '+=1.2')`; announce through `aria-live="polite"`; fall back to the `mailto:` link.
- **Timing:** 1.5 to 2s visible.
- **Fits:** contact, footer, team.
- **Polished / cheap:** reserved slot, no shift. Cheap uses `alert()`.
- **Reduced motion:** label appears without movement.
- **Touch:** same.
- **Seen on:** Podium, Inherited, Cuberto.

### 2.7 Micro-interactions on buttons and form controls

#### MI1. Press and release
- **Sees:** the control compresses slightly on press and springs back.
- **Recipe:** `:active {transform: scale(.96)}` with `transition: transform .12s`; release with an overshoot curve `cubic-bezier(.34,1.56,.64,1)` over 0.35s, or GSAP `scale: .975, duration: .12` then `scale: 1, duration: .45, ease: 'power3.out'`.
- **Timing:** press 0.1 to 0.15s; release 0.35 to 0.45s.
- **Fits:** every section with buttons.
- **Polished / cheap:** distinct from hover; no layout shift. Cheap bounces on hover.
- **Reduced motion:** colour change only.
- **Touch:** this is the main touch feedback.
- **Seen on:** Alex Van Holtz, A24, Big Dirty, Oh La La Ride, Palaraiffeisen.

#### MI2. Masked label swap
- **Sees:** a toggle's word slides up and the new word slides in (Menu / Close, Sound off / on, Copy / Copied); the button keeps its width.
- **Recipe:** both labels in one grid cell inside `overflow: hidden`; state class translates them `0 -> -100%` and `100% -> 0`, `transition: transform .3s cubic-bezier(.65,0,0,1)`. Reserve width with `min-width` or by measuring the longer label.
- **Timing:** 0.3 to 0.45s.
- **Fits:** nav, crud, pricing.
- **Polished / cheap:** width does not jump; `aria-pressed` or `aria-expanded` updates. Cheap swaps text with a reflow.
- **Reduced motion:** instant swap.
- **Touch:** same.
- **Seen on:** Dardo, Lusion, Locomotive Lisa, Palaraiffeisen, Lee Holmes.

#### MI3. Selection badge pop
- **Sees:** choosing an option card outlines it and a small check badge pops at its corner; a warning colour marks a costly option.
- **Recipe:** radio group of cards; badge `gsap.fromTo(b, {scale: .6, opacity: 0}, {scale: 1, opacity: 1, duration: .25, ease: 'back.out(2)'})`; border via CSS transition 0.2s. State shown by outline plus badge plus text, never colour alone.
- **Timing:** 0.2 to 0.3s.
- **Fits:** pricing, crud, contact.
- **Polished / cheap:** real radio inputs. Cheap uses divs with click handlers.
- **Reduced motion:** no pop.
- **Touch:** same.
- **Seen on:** Nothing to Watch, Oh La La Ride, Cowboy.

#### MI4. Form feedback
- **Sees:** labels float above the field when it has focus or a value; a checkbox tick draws; errors appear inline under the field.
- **Recipe:** `label {transition: transform .2s} .field:focus-within label, input:not(:placeholder-shown) + label {transform: translateY(-1.2em) scale(.8)}`. Tick: SVG path `stroke-dashoffset 1 -> 0`, 0.3s. Error: `aria-invalid`, `aria-describedby`, message reveal `grid-template-rows 0fr -> 1fr`, 0.25s.
- **Timing:** 0.2 to 0.3s.
- **Fits:** contact, crud, cta (newsletter).
- **Polished / cheap:** errors never alert; focus returns to the first invalid field. Cheap shakes the whole form.
- **Reduced motion:** instant.
- **Touch:** same.
- **Seen on:** Locomotive Lisa, Jackie Zhang, OFFF, Lee Holmes.

#### MI5. Skeleton and loaded-aware reveal
- **Sees:** a grey block with a passing sheen while an image loads; once loaded and in view, a cover collapses to reveal it.
- **Recipe:** `.skeleton {background: linear-gradient(90deg, transparent, var(--sheen) 15%, transparent 30%) var(--base); background-size: 120% 100%; animation: shimmer 1.4s cubic-bezier(.785,.135,.15,.86) infinite}`; overlay `transform: scaleY(1) -> scaleY(0)`, `transform-origin: bottom`, duration scaled by element height (0.65 to 1.2s), triggered when `seen && loaded`.
- **Timing:** sheen 1.4s loop; reveal 0.65 to 1.2s.
- **Fits:** crud, gallery, portfolio, blog.
- **Polished / cheap:** placeholder shapes match the final layout; never reveals an empty box. Cheap uses a spinner or a timer.
- **Reduced motion:** static grey.
- **Touch:** same.
- **Seen on:** Singer, Palaraiffeisen.

#### MI6. Sound toggle equalizer
- **Sees:** four tiny bars rest low when sound is off and bounce out of phase when it is on.
- **Recipe:** bars `transform-origin: bottom; transform: scaleY(.3)`; on `.is-sound`: `animation: eq .69s cubic-bezier(.7,0,.2,1) infinite alternate` with negative delays `-.17s` steps. Audio starts only after a gesture and is off by default.
- **Timing:** 0.6 to 1s loop.
- **Fits:** nav (only when the section has real audio).
- **Polished / cheap:** scaleY, not height; tempo from the content if any. Cheap animates height.
- **Reduced motion:** static bars.
- **Touch:** same.
- **Seen on:** Funtech, Emotion, Gehry, Unseen, See What Eye See, Ravi Klaassens. See MI9 for the audio behind it.

#### MI7. Theme toggle without a flash
- **Sees:** light and dark switch together across every token; the choice persists without a wrong-theme flash on reload.
- **Recipe:** inline `<head>` script reads storage (try/catch) and sets `data-theme` before paint; tokens redefined under `[data-theme=dark]`; transition only `background-color, color` at 150 to 300ms on key surfaces, never `transition: all`.
- **Timing:** 0.15 to 0.3s.
- **Fits:** nav, footer.
- **Polished / cheap:** pre-paint; `aria-pressed`. Cheap toggles after load.
- **Reduced motion:** instant.
- **Touch:** same.
- **Seen on:** Omarchy, Emotion, Dardo.

#### MI8. Scroll cue with a long idle pause
- **Sees:** a small arrow nudges down twice, then rests for a few seconds; it leaves as soon as the user scrolls.
- **Recipe:** `gsap.to(arrow, {y: '1em', duration: 1, ease: 'expo.out', repeat: -1, repeatDelay: 2, stagger: .3})` inside an `overflow: hidden` 1em box; kill on first scroll.
- **Timing:** 1s move, 2s rest.
- **Fits:** hero, story.
- **Polished / cheap:** clipped and calm; disappears. Cheap bounces forever.
- **Reduced motion:** static arrow.
- **Touch:** same.
- **Seen on:** Lusion, Dardo, Consensys.

#### MI9. Sound layer with a remembered preference
- **Sees:** a labelled Sound toggle starts a quiet ambient bed that fades in over a second or two; small clicks, whooshes and hover ticks accompany interactions. The choice is remembered, and the sound stops when the tab is hidden.
- **Recipe:** off by default. One `AudioContext` created on the first user gesture, `HTMLAudioElement` (loop) into a `GainNode`. On: `ctx.resume()`, `audio.play()`, `gain.gain.cancelScheduledValues(t)`, `setValueAtTime(current, t)`, `linearRampToValueAtTime(1, t + 1.5)`. Off: ramp to 0, then `audio.pause()` after 1.6s. `localStorage` stores the choice (try/catch) but playback resumes only on the next `pointerdown` or `keydown`, because autoplay is blocked. `visibilitychange` calls `ctx.suspend()` / `resume()`. UI effects are short files with a cooldown (80 to 250ms), volume 0.35 to 0.7, overlap allowed for hovers and not for transitions.
- **Timing:** fade 1.5s; effect cooldown 80 to 250ms.
- **Fits:** nav (toggle), hero, story.
- **Polished / cheap:** one control with `aria-pressed`, off by default, effects mirror real state changes. Cheap tries to autoplay, has no mute, keeps playing in a background tab or plays a sound on every hover.
- **Reduced motion:** sound stays off until chosen; no effect on hover ticks.
- **Touch:** same toggle; replace hover ticks with tap effects or none.
- **Seen on:** Ravi Klaassens (howler effects with cooldowns and a music bed), See What Eye See (gain ramp, remembered choice, suspend on hide), Gehry (sound gate), Funtech.

### 2.8 Text and typography motion

#### TX1. Masked line rise
- **Sees:** each line of a heading slides up out of its own baseline, top line first.
- **Recipe:** `SplitText.create(h, {type: 'lines', mask: 'lines', autoSplit: true, onSplit: self => gsap.from(self.lines, {yPercent: 110, duration: 1, ease: 'expo.out', stagger: .08, scrollTrigger: {trigger: h, start: 'clamp(top 85%)', once: true}})})`. Returning the tween from `onSplit` lets autoSplit re-split on resize and font load. Pad the mask (`padding-bottom: .1em; margin-bottom: -.1em`) so descenders are not clipped. SplitText's default `aria: 'auto'` keeps the heading read as one string.
- **Timing:** 0.8 to 1.2s, `expo.out` or `power4.out`, stagger 0.05 to 0.1, offset 102 to 120%.
- **Fits:** hero, features, cta, story, footer, faq.
- **Polished / cheap:** wait for fonts; mask per line; stagger capped with `amount` for long text. Cheap fades whole blocks, splits by char on paragraphs, or breaks lines on resize.
- **Reduced motion:** text visible, no split.
- **Touch:** same.
- **Seen on:** Obys, PDA, Cuberto, A24, Format, Illoca, Obys Grids 03, Palaraiffeisen, Lando Norris, Arc Marumo, Grande Charte, Analogue (manifesto).

#### TX2. Word rise with a small tilt
- **Sees:** words rise from below while a 2deg tilt straightens, anchored at the left baseline, as if each word settles into place.
- **Recipe:** `gsap.fromTo(words, {yPercent: 100, rotation: -2, transformOrigin: '0% 50%'}, {yPercent: 0, rotation: 0, duration: .7, ease: 'back.out(1.2)', stagger: {amount: Math.min(n * .05, .8)}})` inside word masks. Section-wide variant (no split): `translateY(2.5rem) rotate(2deg) -> none` on whole blocks, 0.5s.
- **Timing:** 0.5 to 0.8s.
- **Fits:** hero, features, testimonials, cta.
- **Polished / cheap:** angles under 3deg, stagger capped. Cheap uses 8deg+ or long staggers.
- **Reduced motion:** no transform.
- **Touch:** same.
- **Seen on:** Grande Charte, Singer, Big Dirty, Matcha Cartel.

#### TX3. Blur-in words
- **Sees:** words sharpen from blur while rising slightly.
- **Recipe:** `gsap.from(words, {opacity: 0, y: '0.3em', filter: 'blur(6px)', duration: 1.1, ease: 'expo.out', stagger: .09})`; clear `filter` on complete.
- **Timing:** 0.9 to 1.2s; blur at most 8px.
- **Fits:** hero, footer, cta.
- **Polished / cheap:** filter cleared after; used on one headline. Cheap blurs large blocks (repaint cost) or leaves filters on.
- **Reduced motion:** visible.
- **Touch:** same.
- **Seen on:** Alex Van Holtz, metic., Emotion.

#### TX4. Scramble or decode
- **Sees:** a few letters flicker through random glyphs and resolve to the word; on hover a label re-scrambles briefly.
- **Recipe:** `gsap.to(el, {duration: .8, ease: 'none', scrambleText: {text: el.textContent, chars: 'aceorsuvxz', speed: .85}})`. Scramble only a few characters per line (3 to 10), use a monospace or tabular face, keep the real string in `aria-label` and the animated copy `aria-hidden`, and revert the split on complete. Shuffle variant (no new glyphs): Fisher-Yates over the word's own letters, 4 steps in 0.25s, restore exactly.
- **Timing:** 0.25 to 1.2s; never on body copy.
- **Fits:** nav, hero, footer (subjects with a digital, terminal or code voice).
- **Polished / cheap:** short, width-stable, accessible. Cheap scrambles whole paragraphs in a proportional font.
- **Reduced motion:** no scramble.
- **Touch:** on load only.
- **Seen on:** The Design Society, Locomotive Lisa, Locomotive, Lee Holmes, Emotion, AUGE, Becane.

#### TX5. Highlighter sweep behind words
- **Sees:** a solid marker band wipes behind a phrase (or covers a line and wipes away), leaving the text emphasised.
- **Recipe:** phrase `position: relative; isolation: isolate`; `::before {background: var(--mark); inset: -8% -.1em -12%; z-index: -1; transform: scaleX(0); transform-origin: left}`; `gsap.to(markEl, {scaleX: 1, duration: .65, ease: 'power2.inOut'})`. Per-line cover variant: SplitText lines, each with a bar `scaleX 1 -> 0` from the right, stagger 0.1. `box-decoration-break: clone` for multi-line inline marks. Hand-drawn variant: tilt the mark `rotate(±3.3deg)`, pick the sign and `transform-origin` (left or right) at random per phrase, trigger once at `top bottom-=25%`, `transition: transform 1.25s cubic-bezier(.77,0,.175,1)`.
- **Timing:** 0.5 to 0.9s.
- **Fits:** hero, features, testimonials.
- **Polished / cheap:** the mark carries meaning (the phrase that answers the question). Default 7 warns against accenting a single headline word: use this only when the phrase is the content's point, and say why in `design.md`.
- **Reduced motion:** mark shown.
- **Touch:** same.
- **Seen on:** Alex Van Holtz, The Design Society, Lando Norris, Browserbase, Lubofsky (random-tilt marker underlines).

#### TX6. Rotating word slot
- **Sees:** the last word of a line cycles through options inside a fixed-width slot.
- **Recipe:** stacked words in an `overflow: hidden` inline-block sized to the longest word; `gsap.timeline({repeat: -1})` with each word `yPercent: 100 -> 0` (0.6s `power3.out`) and the previous `0 -> -100` (0.5s `power3.in`), 1.2s hold. Full sentence in a visually hidden span; the slot `aria-hidden`.
- **Timing:** 0.5 to 0.6s swap, 1.2 to 2s hold.
- **Fits:** hero.
- **Polished / cheap:** no width jitter; counts as the ambient motion. Cheap swaps faster than it can be read.
- **Reduced motion:** one word.
- **Touch:** same.
- **Seen on:** Jackie Zhang, AUGE.

#### TX7. Type as material (per-letter scaling)
- **Sees:** letters of a giant wordmark stretch and squash independently while the word keeps filling the width.
- **Recipe:** letters as flex items; animate `flexGrow` and `scaleY` per letter (`stagger: {each: .04, from: 'random'}`, `expo.out`), or scrub with `ease: 'none'`. The sum of widths stays the container width.
- **Timing:** 1 to 1.6s, or scrubbed.
- **Fits:** hero, footer, story.
- **Polished / cheap:** edges never break the margins. Cheap scales the whole heading uniformly.
- **Reduced motion:** static lockup.
- **Touch:** same.
- **Seen on:** Gehry, Inherited (filtered glyphs), Obys Grids 03 (letter physics).

#### TX8. Fly-through title
- **Sees:** inside a pinned section, words grow toward the viewer and the block zooms past them into the next scene.
- **Recipe:** `gsap.timeline({scrollTrigger: {trigger: sec, start: 'top top', end: '+=250%', pin: true, scrub: .6}}).fromTo(words, {scale: .25, opacity: 0}, {scale: 1, opacity: 1, ease: 'power2.out', stagger: .15}).to(title, {scale: 12, ease: 'power3.in'}, .5).to(title, {autoAlpha: 0, duration: .1}, .9)`.
- **Timing:** scrubbed over about 2.5 viewports.
- **Fits:** story, cta.
- **Polished / cheap:** readable at the hold point; scale under 12 to avoid blur. Cheap is a linear zoom that is never readable.
- **Reduced motion:** static title.
- **Touch:** shorter pin.
- **Seen on:** Lusion.

#### TX9. Words converge into a paragraph
- **Sees:** scattered words drift into place and form a readable paragraph by the end of a pinned scroll.
- **Recipe:** split words; give each a random `x` offset (0 to 60vw); `gsap.to(words, {x: 0, stagger: .02, ease: 'power4.inOut', scrollTrigger: {trigger: pinWrap, start: 'top top', end: 'bottom bottom', scrub: true, pin: inner}})`. Split after fonts load.
- **Timing:** scrubbed; final state holds for at least 20% of the pin.
- **Fits:** story, features.
- **Polished / cheap:** words land exactly on the final layout. Cheap leaves text unreadable for most of the scroll.
- **Reduced motion:** the paragraph.
- **Touch:** the paragraph (skip on narrow screens).
- **Seen on:** The Design Society, Palaraiffeisen.

#### TX10. Typing and terminal text
- **Sees:** a code or terminal block types character by character with a caret; it pauses at line ends and only runs in view.
- **Recipe:** reserve height by rendering the full text invisibly first; IntersectionObserver starts and stops a timeout chain (25 to 60ms per character with jitter, 400 to 900ms after a line); caret `animation: blink 1s steps(1) infinite` when idle, solid while typing.
- **Timing:** as above.
- **Fits:** hero, features, product (developer tools).
- **Polished / cheap:** no layout shift, sleeps off screen. Cheap re-types on every pass.
- **Reduced motion:** full text printed.
- **Touch:** same.
- **Seen on:** Omarchy, Nothing to Watch (ellipsis), Funtech.

#### TX11. Bleeding wordmark
- **Sees:** an oversized brand word spans and crops off the footer's edge, sliding into place as the page ends.
- **Recipe:** SVG or text at `width: 105-120vw`, parent `overflow: hidden`, `line-height: .8`; `gsap.from(mark, {yPercent: 30, ease: 'none', scrollTrigger: {trigger: footer, start: 'top bottom', end: 'bottom bottom', scrub: true}})`.
- **Timing:** scrubbed.
- **Fits:** footer, cta.
- **Polished / cheap:** cropped on purpose, never causes horizontal page scroll (clip on the section). Cheap overflows the page.
- **Reduced motion:** static.
- **Touch:** same, cropped.
- **Seen on:** OFFF, Dirt, Grande Charte, Archiste.

### 2.9 Image and media reveals

#### MD1. Clip-path inset reveal with counter-scale
- **Sees:** an image opens from a smaller window (or from one side) while the picture inside settles from slightly zoomed; neighbours alternate direction.
- **Recipe:** `gsap.timeline({scrollTrigger: {trigger: frame, start: 'top 90%', once: true}}).fromTo(frame, {clipPath: i % 2 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)'}, {clipPath: 'inset(0 0% 0 0%)', duration: 1.2, ease: 'expo.out'}).fromTo(img, {scale: 1.2}, {scale: 1, duration: 1.2, ease: 'expo.out'}, 0)`. Centre variant: `inset(22%) -> inset(0)` over 2.2s. Polygon variant: keep vertex counts equal, overshoot to -15%/115% for a diagonal edge. `clearProps: 'clipPath'` on complete.
- **Timing:** 1 to 2.2s, `expo.out` or `expo.inOut`.
- **Fits:** gallery, portfolio, features, team, blog.
- **Polished / cheap:** clip and scale share ease and duration. Cheap is opacity-only.
- **Reduced motion:** visible.
- **Touch:** same.
- **Seen on:** AUGE, Obys Grids 03, Sobha, Inherited, PDA, Cuberto.

#### MD2. Frame expands to full bleed
- **Sees:** a framed video or image grows from an inset card to the full viewport as the section reaches the centre; corner radius shrinks to zero.
- **Recipe:** `gsap.fromTo(media, {clipPath: 'inset(15% 25% round 16px)'}, {clipPath: 'inset(0% 0% round 0px)', ease: 'none', scrollTrigger: {trigger: sec, start: 'top 80%', end: 'center center', scrub: true}})` with the inner media `scale 1.2 -> 1`.
- **Timing:** scrubbed.
- **Fits:** hero, story, gallery, product.
- **Polished / cheap:** clip-path, not width; inverse scale keeps the aspect. Cheap animates width/height.
- **Reduced motion:** full frame.
- **Touch:** simple fade-up.
- **Seen on:** Lusion, Cowboy, Matcha Cartel, Cuberto, Ravi Klaassens (framed hero image opens to full bleed as the page starts).

#### MD3. Poster-first video in view
- **Sees:** videos show their first frame instantly and only play while visible.
- **Recipe:** `<video muted loop playsinline preload="none" poster>`; IntersectionObserver (`rootMargin: '200px'`) sets `src` from `data-src` and calls `play()`, pauses on exit; smaller mobile source; no autoplay with sound.
- **Timing:** poster-to-video fade 0.3s.
- **Fits:** hero, gallery, portfolio, features.
- **Polished / cheap:** poster equals frame 0; pause control for anything longer than 5s. Cheap autoplays ten videos at load.
- **Reduced motion:** poster only, with a play button.
- **Touch:** same.
- **Seen on:** Dardo, Dirt, Sintra, Cowboy, Locomotive.

#### MD4. Grain and screen texture
- **Sees:** a faint stepping film grain or scanline layer over the page.
- **Recipe:** fixed layer, `pointer-events: none`, tiled noise at opacity 0.04 to 0.2, `animation: grain .6s steps(4) infinite` jumping `translate` a few tenths of an em; scanlines `repeating-linear-gradient(0deg, rgb(0 0 0 / .04) 0 1px, transparent 1px 3px)`.
- **Timing:** stepped, 0.6 to 1s loop.
- **Fits:** hero, gallery (film, music, retro subjects). This is the design's one ambient motion.
- **Polished / cheap:** subtle, stepped, not on form inputs. Cheap is strong noise that lowers contrast.
- **Reduced motion:** static grain.
- **Touch:** same.
- **Seen on:** A24, The Design Society, Arc Marumo, Funtech, Inherited, Resn.

#### MD5. List-synced media swap
- **Sees:** as an active item steps down a list (on scroll or hover), a single image beside it crossfades to match.
- **Recipe:** stacked images `autoAlpha: 0` except current; on index change: `gsap.to(prev, {autoAlpha: 0, scale: 1.04, duration: .4})` and `gsap.fromTo(next, {autoAlpha: 0, scale: 1.08}, {autoAlpha: 1, scale: 1, duration: .6, ease: 'power2.out'})`; list items toggle an active colour. Counter `(02/05)` updated in the same handler.
- **Timing:** 0.4 to 0.6s.
- **Fits:** features, gallery, portfolio, process.
- **Polished / cheap:** one source of truth for the index. Cheap lets the image lag the text.
- **Reduced motion:** instant swap.
- **Touch:** tap the list item.
- **Seen on:** Dirt, Obys, Matcha Cartel, Sintra, Ravi Klaassens (awards list poster slides with an `inset` clip, 0.6s `expo.inOut`).

#### MD6. Rapid photo flash (high risk)
- **Sees:** a full-bleed hero cycles through photos every half second to a second behind fixed text.
- **Recipe:** stacked layers, `transition: opacity .2s linear`, swap every 600 to 1400ms with preloading, never repeat the last index; pause on `visibilitychange`.
- **Timing:** as above.
- **Fits:** hero for events only.
- **Polished / cheap:** dark overlay holds contrast. This is a photosensitivity risk: never faster than 3 changes per second, always a visible pause control, and a single still under reduced motion.
- **Reduced motion:** one still.
- **Touch:** same.
- **Seen on:** OFFF.

#### MD7. Ragged-edge wipe
- **Sees:** an image or text block is revealed (or erased) left to right by an edge that tears: some parts lead, others lag, with fine fragments at the front, instead of a clean vertical line.
- **Recipe:** the original runs a shader where the edge is offset by value noise sampled in element pixels, so the tear size is the same at any element size (it must be `highp` on phones). DOM translation: `clip-path: polygon()` with about 14 points on the moving edge and fixed vertex count; each point has a seeded offset in pixels (`jitter[i] = seed(i) * 90`). Tween `p` from 0 to 1 and set `x_i = p * (W + 90) - jitter[i]` on update, with corners at `0 0` and `0 100%`. Erase by the same travel with the polygon on the right side. Text variant: SplitText lines, same polygon per line with stagger 0.08.
- **Timing:** 0.8 to 1.2s, `power2.inOut`.
- **Fits:** hero, story, gallery.
- **Polished / cheap:** noise in px, not %; the final frame is `clip-path: none`. Cheap is a clean gradient mask, or per-frame random jitter, which shimmers.
- **Reduced motion:** crossfade.
- **Touch:** same.
- **Seen on:** See What Eye See (WebGL planes and intro lines; the wipe can run as a cross-wipe between two planes).

### 2.10 Transitions within a section

#### TR1. Caption swap on index change
- **Sees:** when the active item changes, the old caption drops out of its mask and the new one rises in, lines staggered.
- **Recipe:** `tl?.kill(); tl = gsap.timeline().to(lines, {yPercent: 100, autoAlpha: 0, duration: .25, ease: 'power2.in', stagger: .03}).add(setText).fromTo(lines, {yPercent: 100, autoAlpha: 0}, {yPercent: 0, autoAlpha: 1, duration: .6, ease: 'expo.out', stagger: .07})`; announce with `aria-live`.
- **Timing:** out 0.25s, in 0.5 to 0.6s.
- **Fits:** gallery, portfolio, testimonials, product.
- **Polished / cheap:** out faster than in, killed on rapid input. Cheap crossfades two overlapping strings.
- **Reduced motion:** instant text change.
- **Touch:** same.
- **Seen on:** Arc Marumo, Obys, A24, Lee Holmes, Santioni.

#### TR2. Auto-advance with a visible timer
- **Sees:** a testimonial or slide advances on its own; the active dot widens into a pill that fills like a progress bar.
- **Recipe:** active dot width `12px -> 90px` (CSS transition .3s); inner fill `--offset: -100% -> 0%` over 6 to 8s `ease: 'none'`; `onComplete` advances; kill and rebuild on index change; pause when out of view (IntersectionObserver), on hover and on focus; a pause button.
- **Timing:** 6 to 8s per item.
- **Fits:** testimonials, hero, features.
- **Polished / cheap:** visible timer, pauses. Cheap is a hidden `setInterval` that never stops.
- **Reduced motion:** no auto-advance.
- **Touch:** swipe and buttons.
- **Seen on:** Butter, PDA, Cowboy.

#### TR3. Ripple by distance
- **Sees:** when one item is chosen, neighbours react in order of distance, like a ripple (fan cards re-sort, list items shift).
- **Recipe:** sort items by `abs(i - active)`; tween each with `delay: rank * .03` to target slots from a data table (`{scale, rotation, x, y, zIndex}` per slot); one paused timeline per interaction, reversed on leave.
- **Timing:** 0.5 to 0.7s; step 0.03 to 0.05s.
- **Fits:** testimonials, team, gallery, portfolio.
- **Polished / cheap:** slot table symmetrical and tapering. Cheap changes only scale with no z-order.
- **Reduced motion:** instant.
- **Touch:** tap to select.
- **Seen on:** Lando Norris, Emotion.

#### TR4. Threshold step switcher
- **Sees:** inside a pinned area, a screenshot in a device and a step list change together; image changes are short crossfades, not scrubbed.
- **Recipe:** see SC3; `bounds` from cumulative step widths; on `idx !== current`: kill the running tween, show next, `gsap.timeline({defaults: {duration: .45, ease: 'power1.out'}}).set(next, {opacity: 0}).to(next, {opacity: 1}, 0).to(prev, {opacity: 0}, 0)`; list `.active` animates its description open with CSS grid rows.
- **Timing:** 0.45s crossfade.
- **Fits:** process, features, story.
- **Polished / cheap:** guard `idx !== current`; `display: none` on hidden layers. Cheap scrubs opacity into half-visible mush.
- **Reduced motion:** steps as a static list with images.
- **Touch:** same pin, shorter.
- **Seen on:** Sintra, Dirt.

#### TR5. Channel-change glitch (rare)
- **Sees:** a meaningful state change flashes a few stepped frames of tinted, banded, skewed picture, then settles.
- **Recipe:** one keyframe animation with `steps(1)` between stops over 0.6 to 0.9s: grayscale/contrast frame, hue-rotated frame with `skew(4deg)` and a stripe `mask-image`, then `filter: none; transform: none`. GSAP: `timeline().set(el, {...}, '+=.05')` chain ending with `clearProps`.
- **Timing:** under 1s, only on meaningful changes.
- **Fits:** gallery, portfolio (retro or broadcast subjects).
- **Polished / cheap:** rare and short. Cheap glitches continuously. Avoid flashes brighter than the page.
- **Reduced motion:** plain crossfade.
- **Touch:** same.
- **Seen on:** Arc Marumo, Junkyard King (impact frames, more extreme).

#### TR6. Eyelid blink transition
- **Sees:** two curved, softly feathered lids close from top and bottom, hold black for an instant, and open on the new view, which settles from slightly zoomed.
- **Recipe:** the original draws the lids in a shader (curve amplitudes 0.12 and 0.08, feather 0.07 and 0.055). DOM: two fixed elements `height: 55vh; left: -10%; width: 120%; background: var(--ink); box-shadow: 0 0 40px 24px var(--ink)` with `border-radius: 0 0 50% 50% / 0 0 18vh 18vh` (top) and mirrored (bottom). Timeline: lids `yPercent` from -100 / 100 to 0 over 0.35s `power2.in`, swap the content while closed, lids back over 0.55s `power2.out` with the new view `scale 1.2 -> 1` over the same time.
- **Timing:** about 0.9s total, content swapped at the midpoint.
- **Fits:** story, gallery, portfolio, crud (detail panels).
- **Polished / cheap:** only when the subject is sight, attention or a camera. The lid colour is the page ink. Cheap is a black fade under a page that has nothing to do with eyes.
- **Reduced motion:** 150ms crossfade.
- **Touch:** same.
- **Seen on:** See What Eye See.

#### TR7. Image-fall exit
- **Sees:** after a click, the chosen card's image drops off the bottom of the screen, tilting as it falls, while the other items fade; the next view then appears.
- **Recipe:** `gsap.timeline().to(others, {autoAlpha: 0, duration: .27, ease: 'power1'}).to(img, {y: () => innerHeight - rect.top + rect.height, rotation: '+=' + gsap.utils.random(-92, -40), duration: .7, ease: 'power3.in'}, '<-.2')`, then open the detail panel (NV7) or navigate. Measure `rect` on click, not on load. On touch, the tapped item plays the same sequence.
- **Timing:** 0.27s fade, 0.7s fall.
- **Fits:** portfolio, gallery, team.
- **Polished / cheap:** the exit sequence is cancellable by Escape and never traps focus; the destination shows its own entrance so the fall reads as a hand-off. Cheap leaves a blank page while the next view loads.
- **Reduced motion:** the chosen image fades; no fall.
- **Touch:** same.
- **Seen on:** Lubofsky.

---

## 3. Standard setup

### Pinned versions (verified 2026-10-22, all return HTTP 200)

| File | URL |
|---|---|
| GSAP core 3.15.0 (released 2026-04-13) | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js` |
| ScrollTrigger | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js` |
| SplitText | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js` |
| Observer | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Observer.min.js` |
| Flip | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/Flip.min.js` |
| ScrambleTextPlugin | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrambleTextPlugin.min.js` |
| CustomEase | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/CustomEase.min.js` |
| DrawSVGPlugin | `https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/DrawSVGPlugin.min.js` |
| Lenis 1.3.26 (released 2026-08-05) | `https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js` (UMD, exposes `globalThis.Lenis`) |
| Lenis CSS | `https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.css` |

Why these: GSAP 3.15.0 is the latest stable, six months old, and the version most sites in the sample run; since 3.13 every plugin (SplitText, ScrambleText, DrawSVG) is free under the standard GSAP license. Lenis 1.3.27 exists but is only a week old; 1.3.26 is the newest release past the two-week rule. Never load an unpinned URL (`gsap@3`, `lenis@latest`). The Lenis stylesheet is small; designs may inline its rules instead of linking it, since the collection only allows Google Fonts as an external stylesheet.

### Snippet

Load only the plugins the design uses. Library `<script>` tags go before the single inline `<script>` block at the end of `<body>`.

```html
<style>
  /* Lenis rules, inlined from lenis@1.3.26/dist/lenis.css */
  html.lenis, html.lenis body { height: auto; }
  .lenis:not(.lenis-autoToggle).lenis-stopped { overflow: clip; }
  .lenis [data-lenis-prevent] { overscroll-behavior: contain; }
  .lenis.lenis-smooth iframe { pointer-events: none; }
  /* Hide animated-in content only when JS runs, so no-JS users see everything. */
  html.js [data-rv] { opacity: 0; }
  @media (prefers-reduced-motion: reduce) { html.js [data-rv] { opacity: 1; } }
</style>

<!-- end of <body> -->
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/SplitText.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.26/dist/lenis.min.js"></script>
<script>
(() => {
  document.documentElement.classList.add('js');
  if (!window.gsap || !window.Lenis) {            // CDN blocked: show everything, stay usable
    document.documentElement.classList.remove('js');
    return;
  }
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const mm = gsap.matchMedia();
  mm.add({
    motion: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
    fine: '(hover: hover) and (pointer: fine)',
    wide: '(min-width: 992px)'
  }, (ctx) => {
    const { motion, fine, wide } = ctx.conditions;

    if (!motion) {
      // Reduced motion: final states only, native scroll, no Lenis.
      gsap.set('[data-rv]', { opacity: 1, clearProps: 'transform' });
      return;
    }

    // Lenis on one clock with GSAP. Touch keeps native scrolling (syncTouch defaults to false).
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false, anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Build effects here. Examples:
    document.fonts.ready.then(() => {
      document.querySelectorAll('[data-lines]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines', mask: 'lines', autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, {
            yPercent: 110, duration: 1, ease: 'expo.out', stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'clamp(top 85%)', once: true }
          })
        });
      });
    });

    ScrollTrigger.batch('[data-rv]', {
      start: 'top 88%', once: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, overwrite: true })
    });

    if (fine) { /* cursor, magnetic and hover-only effects */ }
    if (wide) { /* pins, horizontal tracks, heavy scrubs */ }

    // Cleanup runs when a media query flips (e.g. the user turns on reduced motion).
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  });
})();
</script>
```

Rules that go with the snippet:

- **One clock.** Lenis runs from `gsap.ticker` with `autoRaf: false`. Never a second `requestAnimationFrame` loop for Lenis. Other loops (canvas) also use `gsap.ticker.add` and sleep when off screen.
- **Scrubbed tweens use `ease: 'none'`**, and usually `scrub: true`; Lenis already smooths. Add a number (`scrub: .6`) only for a deliberate catch-up.
- **Everything inside `gsap.matchMedia`** so it reverts automatically: ScrollTriggers, SplitText instances and tweens created in the callback are cleaned up when a query changes.
- **Overlays stop Lenis.** `lenis.stop()` when a menu or dialog opens, `lenis.start()` when it closes; nested scrollers get `data-lenis-prevent`.
- **After layout changes** (accordion opened, images loaded without fixed ratio) call `lenis.resize()` and `ScrollTrigger.refresh()`. Fixed `aspect-ratio` on media avoids most of this.
- **Anchors** go through Lenis (`anchors: true` or `lenis.scrollTo`) and move focus to the target.
- **Feature checks** for anything that needs them: `CSS.supports('clip-path', 'circle(1px at 1px 1px)')`, `'IntersectionObserver' in window`.
- **`design.md`** for a design using this stack: `js:` describes what the script does, `libraries: [GSAP 3.15 (ScrollTrigger, SplitText), Lenis 1.3.26]`.

---

## 4. Anti-patterns observed

1. **Scroll hijacking that breaks the keyboard.** Wheel captured with `preventDefault`, a page that never scrolls (`overflow: hidden` on body), or long pins with no exit. Seen on Obys, Arc Marumo, Becane, Funtech, Inherited (mobile), Emotion. Space, Page Down, arrow keys, find-in-page and anchors stop working. Fix: native scroll (Lenis is fine), pins of bounded length with a skip link, keyboard and button equivalents for every wheel-stepped control.
2. **Content hidden until JS runs.** Initial `opacity: 0` in plain CSS (Dirt in headless capture, Creative Ocean, Grande Charte) means a failed script leaves a blank page. Fix: set hidden states only under `html.js` or in JS.
3. **Motion for its own sake.** Fade-and-slide-up on every block, three different text effects on one page, idle bobbing everywhere. This is default 8. Fix: one motion idea per design; everything else either quiet or tied to an action.
4. **Layout-thrashing animation.** Animating `width`, `height`, `top`, `left`, `max-height`, or reading `getBoundingClientRect` on every frame for dozens of elements (Creative Ocean curtain on `top`, Becane per-frame layout). Fix: transform, opacity, clip-path; cache rects on enter and resize; Flip or `grid-template-rows` for size changes.
5. **Cursor followers that replace the real cursor.** `cursor: none` site-wide (Jackie Zhang Framer rules, Creative Ocean over video) leaves keyboard and low-vision users without orientation and lags behind the hand. Fix: keep the native cursor, use the follower as an additional label, show it only on `(hover: hover) and (pointer: fine)`, hide it on window leave.
6. **Unreadable text during reveals.** Scattered words for most of a pin (The Design Society), long blur-ins, statements left at 15% opacity, scrambles on paragraphs, scrambled strings read aloud by screen readers. Fix: text readable at the resting point of every scrub, scrambles on short labels only with the real string in `aria-label`.
7. **Preloaders that block ready content.** Fake timers, 3 to 8 second gates, no timeout (Illoca stayed on its loader indefinitely in software rendering; Funtech stalled at 70%). Fix: real progress, minimum about 1s, hard release at 5 to 8s (Ravi Klaassens ships an inline 8s timer that removes the loading class whatever happens), skip on repeat visits.
8. **Two animation loops.** Lenis on its own `requestAnimationFrame` next to GSAP's ticker causes pins to jitter. Fix: the snippet in section 3.
9. **Zoom disabled.** `maximum-scale=1, user-scalable=no` (Lusion, Active Theory, Santioni, Resn, Junkyard King). Never in this collection.
10. **No reduced-motion path.** Most WebGL and scroll-story sites had none (Illoca, Unseen, Locomotive, Immersive Garden, 14islands). Fix: `gsap.matchMedia` branch that shows final states and skips Lenis.
11. **Ambient loops running off screen.** Marquees, canvases and videos playing when invisible cost battery. Fix: pause with IntersectionObserver or ScrollTrigger `toggleActions: 'play pause resume pause'`.
12. **Flashing.** Rapid photo cycling (OFFF), impact frames (Junkyard King), glitch strobes. Fix: under 3 flashes per second, a pause control, and nothing at all under reduced motion.
13. **Hover-only content.** Information shown only on hover (Matcha flashlight, card titles that only appear on hover at Creative Ocean). Fix: `:focus-visible` parity and a visible touch state.
14. **Timed modals over the hero.** Lead-capture modals and full-screen cookie sheets that cover the first screen within seconds (Cowboy, Delta, Nothing). Not motion as such, but they destroyed the motion the page paid for.

---

## 5. Market gaps

designs-x today has: hero, features, pricing, testimonials, process, cta, footer, portfolio, crud.

Section types that appear on the sample sites and are missing from the collection:

| Section type | How often in the sample | Notes |
|---|---|---|
| Navigation (header + menu) | Every site | The richest motion surface after scroll: full-screen menus, morphing pills, mega-menus, hide-on-scroll, section spy. |
| Gallery / media index | About 25 | Project lists with cursor previews, focus carousels, filmstrips, filterable grids. Different from `portfolio`, which is an app-like personal page with charts. |
| Scroll story / product tour | About 20 | Pinned chapters, step switchers, image sequences. The section GSAP + Lenis exists for. |
| FAQ | About 12 | Accordion with real heights; simple, high utility. |
| Team / about | About 12 | Member strips, cards with hover video, people lists with previews. |
| Contact (form + channels) | About 15 | Brief intake, copyable emails, newsletter; designs-x has `cta` but no working form section. |
| Logos / partners / press | About 15 | Marquees and review rails. Usually a supporting strip. |
| Stats / metrics | About 10 | Count-ups and stat tiles; risks default 6. |
| Blog / journal list | About 10 | Lists with hairline rows and dates. |
| Comparison table | 3 | Sintra, Velt, Cowboy. |
| Preloader / intro | About 25 | Better as a technique inside a hero than as a section. |

### Recommended new sections (in priority order)

1. **`nav`.** Every page needs one, every site in the sample has a considered one, and it composes with every existing section. It covers the biggest share of the catalogue's hover, menu and micro-interaction techniques (NV1 to NV6, HV1 to HV3, MI2). A simple design can be pure CSS (orange or no label); a detailed one shows a full-screen menu timeline with Lenis stop/start (red label).
2. **`story`** (scroll story / product tour). The market's signature award pattern and the clearest reason to use GSAP + Lenis at all. Nothing in designs-x currently pins or scrubs. Simple versions can use CSS sticky with vanilla progress (SC3 without libraries); detailed ones use ScrollTrigger, SplitText and an image sequence or step switcher.
3. **`gallery`** (media index). Image-led browsing is in about half the sample and is distinct from `portfolio`. It is where cursor previews (CU2), focus carousels (CD2), Flip filters (CD5) and media reveals (MD1 to MD3) belong.
4. **`faq`.** Cheap to build, needed by almost every product, and the reference place for an accessible accordion (CD6) and section spy. Ideal for the two "simple" slots.
5. **`team`.** Common across agencies, studios, bands and venues, and a natural home for drag strips (CD3), hover-to-play portraits (HV10) and distance ripples (TR3). It also gives agents something real to adapt for "about us".
6. **`contact`.** A working form with validation and an in-page result fills a real gap (the quality floor already demands forms handled in JS), and it is where form micro-interactions (MI4, CD10, MI3) live.

If only four can be built, take nav, story, gallery and faq: together they cover more of this catalogue than any other four, and they span both ends of the label range (CSS-only FAQ and nav variants, GSAP + Lenis story and gallery variants). `logos` and `stats` are better as supporting rows inside `testimonials` and `features` than as sections of their own.
