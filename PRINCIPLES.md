# Principles

designs-x is a collection of front-end **sections** (hero, features, pricing, testimonials, process, call to action, footer, portfolio, CRUD, navigation, scroll story, gallery, FAQ, contact, team) built to be read and reused by AI agents. Every design is original, self-contained HTML and CSS, and ships with a note that explains why it works.

This document is the taste behind the collection. Read it before using a design, and before making a new one.

## What a design in this collection is

- **A section, not a page or a component.** It has enough content to carry a point of view, and it composes with other sections.
- **Grounded in a real subject.** Each design is made for a specific, concrete product or organisation. Its palette, typography and layout come from that subject's world: its materials, its vernacular, its tools. A design for a climbing gym looks nothing like a design for a seed bank.
- **One file that runs on its own.** `index.html` opens in a browser with no build step. CSS lives in a `<style>` block. JavaScript, if any, lives in one `<script>` block at the end. External fonts are allowed and declared.
- **Tokenised.** Every colour, font family, type size and the spacing scale is a CSS custom property on `:root`. Porting a design to another brand starts by changing those variables, not by hunting through rules.
- **Portfolio and CRUD sections** are larger, app-like sections. Portfolio designs carry interactive charts and editable contact/social links. CRUD designs create, read, update and delete typed records (text, integer, decimal, date, boolean, choice) kept only for the browser session.
- **Explained.** `design.md` says what the design is for, why it works, what must not be changed, and how to adapt it.

## Taste

### Spend boldness in one place
Each design has one memorable element: a type treatment, a drawn diagram, an interaction, a layout move. Everything around it is quiet and disciplined. If a design has three clever ideas, it has two too many.

### Typography carries personality
- One family, or two clearly distinct ones. Chosen for the subject, never by habit.
- A deliberate type scale with intentional weights, widths, tracking and leading.
- Body line length under about 75 characters. Serif body text gets slightly more leading than sans.
- When type is the visual, treat it as material: size, overlap, rhythm, cropping.

### Structure is information
Borders, rules, numbers, labels and dividers must encode something true about the content. Numbered markers only when the content is a real sequence. No eyebrow label above a heading unless it tells the reader something they need.

### Motion answers people
Motion that responds to a person's action is welcome when it shows what changed. Every animation respects `prefers-reduced-motion`.

The collection has two tiers, declared in `design.md`:

- **Simple** designs use HTML and CSS, with plain JavaScript only where an interaction needs it. Ambient motion is used once at most, to draw attention to the one thing that matters.
- **Detailed** designs use GSAP and Lenis (pinned versions, listed in `libraries`) and are choreographed end to end: page-load sequence, scroll-driven moments, and a considered response on every interactive item (buttons, links, menus, cards, form controls, cursor). The techniques and recipes live in `research/motion-techniques.md`. Choreography still has one signature moment; everything else supports it. Detailed designs must also: show final states under reduced motion with native scroll; give every hover effect a touch and keyboard equivalent; never hide the native cursor or trap the keyboard; animate only transform, opacity, clip-path and filters; stop Lenis while a menu or dialog is open.

### Words are design
Copy is specific to the subject and written from the end user's side. Plain verbs, sentence case, no filler, no hype. Buttons say exactly what happens. No lorem ipsum: placeholder copy is real enough to judge the design by.

## Defaults we avoid

These are the current tells of generated design. They are legitimate for some briefs, but in this collection they must be a reasoned choice written into `design.md`, never a reflex.

1. Warm cream background (around `#F4F1EA`) with a high-contrast serif display and a terracotta accent (around `#D97757`).
2. Near-black background with a single acid-green or vermilion accent.
3. Broadsheet layout with hairline rules, zero radius and dense newspaper columns.
4. The SaaS card kit: identical rounded cards, one radius everywhere, the same soft grey shadow, gradient washes as decoration.
5. Template chrome: tracked-out ALL-CAPS eyebrows above every heading, meta strings joined with middle dots, "WORD — fragment" labels, tinted near-black (`#0B0B0B`, `#111`) instead of a chosen dark, monospace for small data labels, `→` appended to every link.
6. A big number with a small label plus a gradient accent as the default hero.
7. Accenting a single word of a headline in italic, bold or another colour.
8. Fade-and-slide-up on every section, hover lift on every card.

## Quality floor

Every design meets this without announcing it:

- Responsive from 360px to 1600px wide, no horizontal scroll.
- Semantic HTML: landmarks, real headings in order, real buttons and links.
- Visible keyboard focus on every interactive element.
- Text contrast at WCAG AA or better.
- `prefers-reduced-motion` respected.
- Images and drawings have text alternatives, or are marked decorative.
- No console errors.
- No dead ends. Every link, button and form leads somewhere that works, in the same file: an anchor to an element that exists, or a visible in-page result (a confirmation, a panel, a dialog) with a way back. Forms never submit to a server; they handle `submit` in JavaScript and show the outcome. No `href="#"` placeholders and no relative paths to pages that do not exist. External destinations (mailto:, tel:, wa.me, social profiles) are allowed and open with `target="_blank" rel="noopener"`.

## How an AI should use a design

1. Pick by `section`, `use_when` and `avoid_when` in `design.md`, not by the screenshot alone.
2. Read **Why it works** and **Do not touch** before changing anything.
3. Map the target project's brand onto the `:root` tokens first. Follow **Adapting**.
4. Replace the copy with the target project's real content. Keep its length and tone roughly the same, or revisit the layout.
5. Translate to the target stack (React, Vue, Svelte, Tailwind, etc.) only after the tokens and copy are right. Keep the structure and the one bold idea intact.
