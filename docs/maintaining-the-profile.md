# Maintaining the GitHub edition

This repository powers the profile README at https://github.com/SleepyLe0.

## Content

Edit `README.md`. The chapter menu points directly to GitHub's rendered heading IDs:

- `user-content-00--somewhere-between-dream--code`
- `user-content-01--little-sparks-real-possibilities`
- `user-content-02--powered-by-curiosity-and-matcha`
- `user-content-03--good-things-begin-with-a-hello`

The `user-content-` prefix targets the ID present in GitHub's rendered HTML,
so ordinary browser fragment navigation can resolve the destination directly.
If a chapter heading changes, update its menu link and any return link. Verify
chapter navigation on the live profile after publishing; a local Markdown preview
cannot test GitHub's navigation behavior.

Project descriptions were adapted from public repositories on 7 September 2026:

- [Sleepy World](https://github.com/SleepyLe0/sleepyleo-website)
- [SaByeJai](https://github.com/SleepyLe0/sa-bye-jai)
- [KMUTT backend](https://github.com/SleepyLe0/kmutt-proj-be)
- [SRE capstone](https://github.com/SleepyLe0/SRE-Ansible)

The SRE project is described as team work. The profile makes no claims about
employers, years of experience, awards, user counts, or clinical outcomes.
Contact identity comes from the portfolio's existing public metadata. No private
repositories, credentials, runtime environment values, or admin URLs are included.

## Artwork

- `assets/island-day.png`: daylight banner.
- `assets/island-night.png`: moonlight banner.
- `assets/island-orbit.gif`: silent island animation inside an expandable section.

The still images switch with the reader's GitHub color scheme using `<picture>`.
The animation lives behind a `<details>` disclosure, leaving a still banner as the
default. Readers can collapse the animation; there is no audio.

These are captures of the actual procedural Three.js scene in
`sleepyleo-website/components/sleepy-world-scene.tsx`, rendered with a dedicated
banner composition. `artwork-source/` preserves the small capture route used to
make them. It imports the model from the portfolio instead of maintaining a
second copy. To refresh the artwork, copy that folder to `app/readme-capture/`
in a local website checkout, start the website, and capture these views:

- `/readme-capture` — daylight still.
- `/readme-capture?night=1` — moonlight still.
- `/readme-capture?motion=1` — moving daylight scene.

Capture the full 1280 × 720 artwork viewport after the loading message disappears.
Allow lighting to settle before the night capture. Remove the temporary route
from the website checkout after exporting; it is not part of the deployed site.
The GIF is a short forward-and-back loop encoded from captured PNG frames.

## What GitHub can render

The README uses GitHub-flavored Markdown and supported HTML: links, images,
`picture`, tables, and `details` / `summary`. It has no scripts, iframes, embedded
WebGL, fake controls, third-party statistics widgets, or live-server image
requests. GitHub serves the committed assets even when the portfolio server is
offline. The linked website is needed only for interactive exploration.

References:

- [About profile READMEs](https://docs.github.com/en/account-and-profile/concepts/personal-profile)
- [GitHub formatting and picture support](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github)
- [Section link syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#section-links)

## Validation

Before publishing, verify that all local asset paths exist, all four anchors are
present, every project is public, and the README renders through GitHub's Markdown
API. Avoid adding claims from private repositories or treating sample project
configuration as profile information.
