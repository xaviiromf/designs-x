# Implementation plan: motion tier and new sections

Source: `research/motion-techniques.md`, built from 60 sampled entries (57 distinct sites; 3 more are added during build to reach 60).

## Scope

- 27 **detailed** designs, three for each existing section (hero, features, pricing, testimonials, process, cta, footer, portfolio, crud).
- 6 **new sections** (nav, story, gallery, faq, contact, team), each with 2 **simple** and 3 **detailed** designs: 30 designs.
- 57 designs in total, taking the collection from 19 to 76.

## Tiers and labels

| Tier | Runtime | Catalogue label |
|---|---|---|
| Simple | HTML and CSS, plain JavaScript only where needed | none, or *uses javascript* underlined orange |
| Detailed | GSAP 3.15 (ScrollTrigger, SplitText and other plugins as needed) + Lenis 1.3.26 from jsDelivr, pinned | *uses javascript* underlined red |

The label is derived from `design.md`: a non-empty `libraries` list means red; `js: none` means no label; anything else means orange.

## Pipeline per design

1. Plan: tokens, layout, the signature moment, and a motion score mapping every interactive item to a technique from the catalogue.
2. Art direction across the whole collection: no repeated typefaces, palettes or signature devices.
3. Build: one self-contained `index.html` and `design.md`.
4. Review by three independent agents: taste, quality audit, motion and function (frame captures with `scripts/motion.mjs`, flows with `scripts/check-flows.mjs`).
5. Fix and verify, up to two rounds, then `preview.png`.
6. Collection QA: flow tests over all 76 designs, site build, requirements critic, deploy.

## Designs

| Slug | Section | Tier | Mode | Subject | Techniques |
|---|---|---|---|---|---|
| `hero-velodrome` | hero | detailed | dark | Event night bookings for an indoor track-cycling velodrome hosting a six-day race. | LD1 lap-counter preloader, TX1, SC10 velocity coupling, HV5 |
| `hero-perfumery` | hero | detailed | light | An independent perfumery launching one new scent with a sample-vial offer. | LD6, TX3, CU4 lens reveal, MD1 |
| `hero-doc-festival` | hero | detailed | dark | A documentary film festival announcing its programme and pass sales. | LD3 curtain hand-off, TX8 fly-through title, CU1 cursor states, MD4 grain |
| `features-ebike` | features | detailed | light | An urban cargo e-bike maker presenting the features of its new model. | SC3 pinned chapters, SC12 scrubbed drawn sequence, HV6 |
| `features-mixing-plugin` | features | detailed | light | A small company selling a mixing-console audio plugin for music producers. | SC5 word illumination, HV12 meter-glass glare, CD9 tabs crossfade, MI6 (signature: a peak meter lines up on Test, holds 0.6 s, then falls) |
| `features-coffee-roaster` | features | detailed | light | A specialty coffee roaster explaining what its subscription includes. | SC4 horizontal track, SC2 framed parallax, HV12 sheen |
| `pricing-coworking` | pricing | detailed | light | Membership plans for a coworking space with desks, studios and meeting rooms. | NV4 sliding indicator billing toggle, CD5 Flip reflow, HV4, SC13 |
| `pricing-ski-pass` | pricing | detailed | any | Lift-pass options for a mid-size ski resort (day, week, season, family). | TR4 threshold switcher, TX6 rotating word slot, MI3, HV5 |
| `pricing-photo-licensing` | pricing | detailed | dark | Licence tiers for a historical photo archive that licenses images to publishers. | CU2 list preview follows cursor, HV9 expanding rows, CD8 hold to confirm |
| `testimonials-surf-school` | testimonials | detailed | light | A surf school collecting words from beginners, families and returning surfers. | CD3 infinite drag strip with velocity tilt, TX2, CU1 |
| `testimonials-mountain-hotel` | testimonials | detailed | light | A small mountain hotel showing entries from its guest book. | SC6 stacked sticky cards, TX5 highlighter (justify it), MD1 |
| `testimonials-youth-orchestra` | testimonials | detailed | dark | A youth orchestra sharing words from players, parents and patrons. | CD2 stepped focus carousel, TR2 auto-advance with timer, SC9 colour handoff |
| `process-brewery` | process | detailed | dark | A craft brewery showing how one beer goes from grain to can. | SC3 pinned chapters, SC16 rule draw-in (DrawSVG), SC11 progress variable |
| `process-bespoke-tailor` | process | detailed | light | A bespoke tailor explaining the fittings from first measure to final suit. | SC4 horizontal track, MD2 frame to full bleed, HV11 drawn ornament |
| `process-smallsat` | process | detailed | dark | A small-satellite integrator explaining the path from booking to launch. | SC15 stepped snap (handle with care), TX4 scramble short labels, SC17 pixel-cell cover |
| `cta-city-marathon` | cta | detailed | light | A city marathon opening registration for next spring's race. | TX7 type as material, SC10, HV5, MI4 |
| `cta-vineyard-harvest` | cta | detailed | light | A family vineyard inviting volunteers to its harvest weekend. | TR3 planting and path walk, SC16 rules, CD7 circles, MI3 (signature: your share walked as a serpentine path through the planting plan; CU4, TX9 and CD8 dropped) |
| `cta-indie-game` | cta | detailed | dark | An indie game studio asking players to wishlist and try the demo. | TX11 bleeding wordmark, CU5 grid ripple, MI1, MD4 |
| `footer-record-label` | footer | detailed | dark | The footer of an independent vinyl record label. | SC8 footer uncover, HV1 text roll, CU6 elastic string divider |
| `footer-botanic-garden` | footer | detailed | light | The footer of a city botanic garden with opening hours and memberships. | SC8, HV2 underline sweep, SC16 |
| `footer-architecture-biennale` | footer | detailed | light | The footer of an architecture biennale with venues, tickets and press. | TX11, HV7 sibling dimming, CD10 copy with confirmation |
| `portfolio-wildlife-photographer` | portfolio | detailed | dark | Personal portfolio of a wildlife photographer with expedition stats. | CU2, MD1, CD5 Flip filter, animated charts |
| `portfolio-motion-designer` | portfolio | detailed | light | Personal portfolio of a 3D and motion designer taking studio work. | HV10 hover-to-play (generated canvas), SC4, TX1, animated charts |
| `portfolio-sports-physio` | portfolio | detailed | any | Professional portfolio of a sports physiotherapy practice with recovery outcomes. | SC13 count-up, NV6 section spy, TR1 caption swap, animated charts |
| `crud-vet-clinic` | crud | detailed | light | Patient and appointment records for a small veterinary clinic. | CD5 Flip reorder, CD7 dialog open, CD8 hold to delete, MI3, MI4 |
| `crud-warehouse-bins` | crud | detailed | dark | Bin and pallet inventory for a regional warehouse. | CD4 draggable items between bins, CD5, MI1, NV4 |
| `crud-gradebook` | crud | detailed | light | A teacher's gradebook for classes, students and assessments. | CD6 accordion, MI4, TR3 ripple, SC13 averages |
| `nav-bakery` | nav | simple | light | Header and menu for a neighbourhood bakery (hours, menu, order ahead). | CSS only: details/summary menu, HV2 in CSS |
| `nav-city-services` | nav | simple | light | Header with a services mega-menu for a city council website. | vanilla: NV3 mega-menu with hover intent and full keyboard support |
| `nav-fashion-label` | nav | detailed | any | Header and full-screen menu for an independent fashion label. | NV1 full-screen reversible timeline, HV1, MI2, lenis.stop |
| `nav-concert-hall` | nav | detailed | light | Header and mega-menu for a concert hall's season site. | NV3 hover intent, MD5 list-synced media swap, NV5 hide-on-scroll |
| `nav-yacht-builder` | nav | detailed | light | Header for a sailing-yacht builder with section navigation. | NV2 morphing pill, NV4 sliding indicator, NV6 section spy |
| `story-solar-coop` | story | simple | light | A community solar cooperative explaining how a shared roof array pays members. | vanilla: CSS sticky stage + JS progress (SC3 without libraries) |
| `story-oyster-farm` | story | simple | light | An oyster farm telling one oyster's three years from seed to plate. | CSS scroll-driven animations (animation-timeline) with a static fallback, no JS |
| `story-mechanical-watch` | story | detailed | dark | A watchmaker's product tour of one hand-wound mechanical movement. | SC3, SC12 exploded-view sequence drawn in SVG/canvas, TX1 |
| `story-glacier-research` | story | detailed | light | A glacier research station showing forty years of retreat. | SC9 colour handoff, SC5, SC2, TR4 |
| `story-cargo-sailing` | story | detailed | any | A wind-powered cargo shipping line following one crossing. | SC4 horizontal track, SC17 pixel-cell cover, SC10 |
| `gallery-zine-fair` | gallery | simple | light | A zine fair's gallery of this year's exhibitors' covers. | vanilla: CSS grid + native dialog lightbox with keyboard nav |
| `gallery-street-food-market` | gallery | simple | any | A street food market's gallery of its stalls, filterable by cuisine. | vanilla: filter chips, no animation library |
| `gallery-classic-cars` | gallery | detailed | dark | A classic-car restorer's index of restored cars. | CU2 list preview follows cursor, CD5 Flip filter, HV7 |
| `gallery-botanical-illustration` | gallery | detailed | light | A botanical illustrator's archive of plates. | CD2 stepped focus carousel, MD1, TR1 |
| `gallery-skate-archive` | gallery | detailed | dark | A skateboarding video archive's index of parts. | CD3 infinite strip with drag, HV10 hover-to-play (generated), MD4 |
| `faq-pharmacy` | faq | simple | light | Questions for a community pharmacy (prescriptions, vaccines, delivery). | CSS only: details/summary, no JS |
| `faq-moving-company` | faq | simple | light | Questions for a home moving company, with a search box. | vanilla: live search filter over questions |
| `faq-camper-rental` | faq | detailed | any | Questions for a camper-van rental company. | CD6 accordion real height, NV6 section spy, MI2 |
| `faq-language-school` | faq | detailed | light | Questions for a language school's immersion courses. | TX1, CD6, CU1, TX6 |
| `faq-esports-arena` | faq | detailed | dark | Questions for an esports arena's tournament weekend. | TX4 scramble labels, CD6, SC17 |
| `contact-plumber` | contact | simple | light | Contact and call-out request for a local plumbing business. | vanilla: form validation and in-page confirmation (signature: an under-sink compression joint drawn in five urgency states, water growing out of the fitting; the boiler pressure gauge was dropped) |
| `contact-wedding-florist` | contact | simple | light | Enquiry form for a wedding florist. | CSS-first with minimal vanilla JS for the in-page result |
| `contact-recording-studio` | contact | detailed | dark | Booking enquiries for a recording studio. | MI4, HV5, CD8 hold to send, MI6 |
| `contact-expedition-outfitter` | contact | detailed | any | Trip-planning enquiry for a polar expedition outfitter. | TR4 multi-step, MI3, CU4 |
| `contact-brand-agency` | contact | detailed | light | New-business contact for a small brand-identity agency. | CD10 copy email, TX6, HV1 |
| `team-community-clinic` | team | simple | light | The team of a community health clinic. | CSS only, no JS |
| `team-rowing-club` | team | simple | light | Coaches and crews of a rowing club, filterable by squad. | vanilla: filter with no library |
| `team-restaurant-kitchen` | team | detailed | dark | The kitchen brigade of a seasonal restaurant. | CD3 drag strip, HV10 hover-to-play (generated), TX2 |
| `team-theatre-company` | team | detailed | any | The ensemble of a touring theatre company. | CU2, TR3 ripple by distance, HV7 |
| `team-research-lab` | team | detailed | light | The members of a university marine-biology research lab. | CD5 Flip filter, SC6, TX3 |

## Arcade series (added after the 76)

Six more detailed designs, built at the owner's request as a family around `cta-indie-game`: the same two typefaces (Handjet for display, Host Grotesk for text), a dark chosen ground, flat pixel geometry and stepped motion, with a retro gamer / cyberpunk subject each. This is the one place where the collection repeats a typeface pair on purpose. Two rules replaced the usual art-direction pass:

- **A wider palette with jobs.** Each design has five to seven hues and every hue has one stated meaning (a competition, a module, a side, a pace).
- **Nothing recycled.** No technique from `research/motion-techniques.md` and no effect already used in the collection, including the reference's own lattice wake, bow wave, rising wordmark, grain, entry-point fill and underline sweep. Each design was given an exclusive set of new effects, listed below, so the six do not share effects with each other either.

| Slug | Section | Mode | Subject | New effects (no catalogue code) |
|---|---|---|---|---|
| `hero-racing-arcade` | hero | dark | League night at a racing-cabinet arcade in Turin. | Pseudo-3D raster road steered by the pointer, scroll as throttle with checkpoint gantries, start-light load, speed-streak headline, checker-wipe button, launch press, tach-strip link, marching centre-line field, pit-board dialog, waving flag |
| `gallery-demoparty` | gallery | dark | The 2026 winners of a demoparty in Bergen. | Copper bars that follow the pointer in the border and through the headline letters, scroll-driven sine scroller, bit-depth tile build, decrunch load, colour-cycling button, bit-flip chips, letter sine ripple link, interlace-weave dialog |
| `team-fighting-game` | team | dark | A fighting-game team from Valparaíso as a character-select screen. | Eye-tracking pixel portraits, player-one cursor with impact slam, scroll-scrubbed versus clash, damage-ghost health bars, round-call load, lock-on bracket buttons with hit-stop, three-hit underline |
| `pricing-net-cafe` | pricing | dark | Hourly, night and 30-hour prices of a 24-hour net café in Busan. | RGB split that follows the pointer, tube power-on, scroll-scrubbed refresh line and hum bar, degauss load, beam re-scan price change, glitch-slice buttons with signal dropout, phosphor afterimage link, vertical-hold dialog, receipt feed |
| `story-speedrun-marathon` | story | dark | One run at a charity speedrun marathon in Gothenburg. | Scroll plays a side-scrolling run with a split timer and a ghost, input display driven by the pointer, lantern beam aimed at the pointer, tile build-in load, brick-bump buttons, gem-trail underline, pause-menu dialog |
| `features-cyberdeck-kit` | features | dark | An open-hardware cyberdeck kit from a workshop in Tallinn. | Scroll-scrubbed falling-block assembly, pulses that travel along PCB traces away from the pointer, LED self-test and key-roll load, keycap buttons with LED chase, DIP-switch link, pad-tinning field, ribbon-unfold dialog |

Built values (palette, type, motion) are in each design's `design.md`.


## Series two, background fields and About me (ported from designs-x-personal-taste)

Twenty-four more designs in the same retro gamer / cyberpunk family, built in [designs-x-personal-taste](https://github.com/xaviiromf/designs-x-personal-taste) and copied here unchanged so that designs-x holds every design. Same rules as the Arcade series (Handjet and Host Grotesk, a chosen dark ground, hues with jobs, nothing recycled), with one exception: the five About me designs add a new section, `about` (a whole personal front end for one fictional person), are set entirely in Departure Mono with ten or more hues, and revisit the family's effects as declared variations (see each design's `## Lineage`).

- Art direction for series two: `research/series-two.md`.
- Every effect, ground and subject in the family, as built: `research/effects-ledger.md`.

| Slug | Section | Group | Mode | Subject | Signature |
|---|---|---|---|---|---|
| `portfolio-isometric-artist` | portfolio | series two | dark | Juno Achterberg, isometric pixel illustrator in Rotterdam | Commissions as an isometric city on a low-resolution canvas: one tower per year, one floor slab per commission in the hue of its kind, read against an axis |
| `crud-memory-card` | crud | series two | dark | The house memory card of Continue?, a retro game bar in Kraków | A 15-block memory card; each save sits in one to three blocks in its game's hue, with a two-frame identicon generated from the player tag and link pips between adjacent blocks |
| `nav-game-museum` | nav | series two | dark | The Coin Door, a museum of arcade and home video games in Lyon | The floor plan is the menu: a visitor marker walks the shortest tile path (breadth-first search) to the door of the room pointed at, leaving footprints, and the room's floor lights in its hue |
| `faq-handheld-clinic` | faq | series two | dark | Greyscale, a mail-in repair clinic for handheld consoles in Leeds | Ordered (4x4 Bayer) dithering as the only way anything appears: answers, headline lines, dialog panel and a four-shade diagnostic screen all step through threshold levels |
| `contact-hackerspace` | contact | series two | dark | Molo 4, a hackerspace at the end of Pier 4 in Trieste | A harbour radar that pings instead of sweeping: stepped rings expand from a point and the blips they cross light in their kind's hue, then decay in three steps |
| `portfolio-security-researcher` | portfolio | series two | dark | Inés Kowalczyk, independent security researcher in Valencia | A trace that follows the visitor along grid lines only: one cell per step, right-angle turns, a solid line that keeps the last 48 cells; content blocks are obstacles, so the line hugs the edge of whatever is pointed at |
| `crud-cartridge-stall` | crud | series two | dark | Lot 14, a second-hand game stall at the Sunday flea market in Bologna | A crate as a grid inventory: each record is a tile whose size depends on its kind, packed first-fit; tidying clears the crate and deals the tiles back one at a time |
| `testimonials-capsule-club` | testimonials | series two | dark | Capsule Club, a monthly capsule-toy subscription from Nagoya | A capsule machine: one full turn of the crank releases a capsule from a staggered pile, which settles in whole steps; the capsule travels down the chute cell by cell, its lid lifts in the tray, and the card cuts to that subscriber's words |
| `process-convoy-night` | process | series two | dark | Halfway Station, a flight club that flies a convoy every Friday | The jump: between steps every star stretches into a stepped streak from the vanishing point, the field cuts to that step's own star system, and the streaks collapse |
| `footer-cartridge-publisher` | footer | series two | dark | Dust Jacket, a publisher of new cartridges for old consoles in Porto | The wordmark as dust: thousands of square specks sampled from the display face; a breath blows them along the pointer's direction and they walk home in whole pixels |
| `portfolio-chiptune-composer` | portfolio | series two | dark | Mirela Dvořák (bitlark), chiptune composer in Brno | A tracker pattern (32 rows by four channels) with a playhead that jumps row to row at the track's tempo; notes under it light in their channel's hue and stepped level meters kick and fall. Optional Web Audio playback, off by default |
| `portfolio-disk-archivist` | portfolio | series two | dark | Odile Brandt, software-preservation archivist in Hamburg | A block map with one square per medium that consolidates by outcome the way a disk optimiser works: a read cursor and a write cursor swap blocks until each outcome is one run and the map reads as a stacked bar |
| `nav-pirate-radio` | nav | series two | dark | Static Harbour 87.9, a community radio station in Marseille | The header is a tuner: a needle moves over an 87 to 108 MHz scale in 0.1 MHz detents and locks onto the station nearest within 0.3 MHz, with a lock lamp, a display plate and a five-bar signal meter |
| `faq-hint-hotline` | faq | series two | dark | Hintline, a volunteer hint line for old adventure games in Utrecht | Two-tone dialling: every key press lights the key, the tone bar of its row and the tone bar of its column; two digits open, scroll to and focus a question |
| `contact-privacy-helpdesk` | contact | series two | dark | Kerckhoffs Desk, a volunteer digital-security helpdesk in Lisbon | Glyph rain with no idle loop: three bands of falling glyphs, one per contact route, that advance one cell per tick only when something drives them |
| `hero-contour-sled` | hero | background fields | dark | A studio launching a night toboggan game | A live topographic map: a value-noise height field drawn by marching squares as 2px pixel-stepped isolines in five altitude bands; the copy sits on flat tarns no line crosses; one cyan line is the fall line from the summit hut, recomputed on every change |
| `features-magnet-keyboards` | features | background fields | dark | A maker of Hall-effect keyboards for retro computers and arcade play | A sheet of iron filings: pixel needles locked to eight 45° directions, combed by a curl-noise flow; the feature cards are bar magnets whose dipole fields bend the comb into loops; needles turn one step per tick and take a pole hue (north coral, south lilac) only when held and aligned |
| `pricing-riso-print-shop` | pricing | background fields | dark | A two-drum risograph print shop for homebrew game zines and manuals | A 45-degree risograph halftone screen of pixel-round dot sprites (radius 0 to 4 px, 8 px lattice); paper-grain value noise sets each dot's resting size; two inks per dot, the bigger dot in its ink and the smaller in flat overprint green; text and plates are knocked out of the screen line by line |
| `gallery-polycount-jam` | gallery | background fields | dark | An online game jam limited to 300 triangles per model | An untextured low-poly scene: a triangle mesh on a noise height field, flat-shaded against one light in exactly four tones per hue, drawn without anti-aliasing at one pixel per 4 CSS px and scaled up pixelated; each card's window is a hole onto the mesh, whose triangles under the card take the entry's genre hue |
| `about-vj-visualist` | about | about me | dark | A live-visuals artist (VJ) | A feedback tunnel of stepped rectangles aimed by the pointer, ringed in the layer hues |
| `about-pinball-technician` | about | about me | dark | A pinball and arcade technician | A small playfield simulation leaned by the pointer, flippers on click; lit bumpers put a fact on a score display |
| `about-level-designer` | about | about me | dark | A freelance level designer | A tile editor painted permanently by the pointer, with auto-tiling |
| `about-game-translator` | about | about me | dark | A game translator, Japanese into German and English | A dialogue box whose width in characters follows the pointer, reflowing the line and spilling what does not fit |
| `about-pixel-type-designer` | about | about me | dark | A designer of bitmap typefaces | A glyph editor whose edits are used at once by a live specimen line |
