# designs-x

A curated collection of original front-end sections, written for AI agents to reference and port into any project.

Each design is one self-contained `index.html` (HTML and CSS, JavaScript only when the design needs it) plus a `design.md` that explains what it is for, why it works, what must not change, and how to adapt it.

- Browse: https://xaviiromf.github.io/designs-x/
- Index for agents: https://xaviiromf.github.io/designs-x/llms.txt
- Everything in one file: https://xaviiromf.github.io/designs-x/llms-full.txt

## Using it with an AI agent

Point the agent at `llms.txt`, or clone this repo and tell the agent to read `SKILL.md`. The agent should pick a design by its `use_when` and `avoid_when`, read its notes, map the target brand onto the `:root` tokens, then translate to the target stack.

## Layout

```
designs/<slug>/index.html   the design, opens directly in a browser
designs/<slug>/design.md    metadata and design notes
designs/<slug>/preview.png  1440x900 capture of the top of the section
PRINCIPLES.md               the taste behind the collection
SKILL.md                    instructions for agents using a local clone
site/                       Astro catalogue, deployed to GitHub Pages
scripts/shot.sh             screenshot a design with system Chromium
```

## Contributing a design

Copy `designs/_template/design.md`, read `PRINCIPLES.md`, and build to its quality floor.

## License

MIT
