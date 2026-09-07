# Maintaining the GitHub edition

This repository powers https://github.com/SleepyLe0.

## Edit and rebuild

Edit `artwork-source/README.template.md`, then run:

```sh
bun install --frozen-lockfile
bun run build:island
```

`README.md` is generated. The build inserts the miniature island at the single
`ISLAND_STL` marker and writes `assets/sleepy-island.stl` for GitHub's standalone
viewer. Commit the template, generated README, and model together. The build
checks the model parses, contains finite coordinates, and keeps the complete
README below 450 KB. Dependencies are pinned in `package.json` and `bun.lock`.

`artwork-source/island-model.mjs` is a standalone, faceted adaptation of the
portfolio's procedural Three.js model. It preserves the studio, stepping stones,
portal, matcha garden, sleeping cat, mailbox, and floating terrain. Cloud particles,
textures, lighting, and application behavior stay in the full portfolio. STL is
geometry only; GitHub supplies the material and viewer controls. The export uses
Z as the up axis and rounds coordinates to keep the inline model small.

## Interactions

- The banner links to the inline 3D model.
- The three illustrated doors link to the work, about, and contact chapters.
- The STL viewer provides rotate, zoom, pan, auto-rotation, and display modes.
- A nested disclosure quest lets visitors find the cat, mailbox, and studio.
- Each project opens separately; technical notes have their own disclosures.
- Day/night artwork, a silent island GIF, and personal notes remain expandable.
- The standalone STL link is available if the inline viewer cannot load.

The chapter links point directly to GitHub's rendered heading IDs using the
`user-content-` prefix. Update the links when changing headings, and verify them
on GitHub after publication.

## Artwork

- `assets/island-day.png` and `assets/island-night.png`: captures of the portfolio,
  selected by the reader's color scheme.
- `assets/island-orbit.gif`: silent animation behind a disclosure.
- `assets/door-*.svg`: editable vector navigation cards.
- `assets/portrait.webp`: the portrait already used in the portfolio.

`artwork-source/page.tsx` and `capture.tsx` preserve the banner export route. Copy
those two files to `app/readme-capture/` in a local website checkout and capture
1280 × 720 views at `/readme-capture`, `/readme-capture?night=1`, and
`/readme-capture?motion=1`. Wait until the loading message disappears and lighting
settles. Remove the temporary route after capture. The GIF was encoded as a short
forward-and-back loop from captured PNG frames.

## Content sources

Project descriptions were adapted from public repositories on 7 September 2026:

- [Sleepy World](https://github.com/SleepyLe0/sleepyleo-website)
- [SaByeJai](https://github.com/SleepyLe0/sa-bye-jai)
- [KMUTT backend](https://github.com/SleepyLe0/kmutt-proj-be)
- [SRE capstone](https://github.com/SleepyLe0/SRE-Ansible)

The SRE project is team work. Contact identity and the portrait come from the
existing portfolio. Keep personal claims grounded in public project information.

## GitHub compatibility and validation

The README uses GitHub's supported Markdown features, including an ASCII STL
code fence that GitHub enriches into its own interactive viewer. It does not
include application scripts or a custom iframe. The profile's artwork is served
from committed assets; the full-color website is a separate experience.

Before publishing, run the build, check local image references and fragment
links, and preview the candidate branch on GitHub. Verify that the STL viewer
loads, that no raw geometry is visible in rendered mode, and that project and
quest disclosures work. Repeat the check on the profile after merging to `main`.

- [Interactive STL in Markdown](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams#creating-stl-3d-models)
- [3D viewer controls](https://docs.github.com/en/repositories/working-with-files/using-files/working-with-non-code-files#3d-file-viewer)
- [Expandable sections](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections)
- [Pictures and theme variants](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github)
