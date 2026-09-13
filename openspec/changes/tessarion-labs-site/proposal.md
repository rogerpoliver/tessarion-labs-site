## Why

Tessarion Labs has a brand system, two shipping products and two engineers, and no public address. Anyone told about the studio today lands on a personal GitHub profile and has to reconstruct the rest. The brand is finished — direction R5, palette Kiln, tokens and marks approved — so the site is the first surface that can prove it.

The reader is a founder, a CTO or a platform lead, on a first visit, skimming, looking for a reason to disqualify us. After this change they can answer four questions in under a minute: what the studio builds, who builds it, what it has shipped, and how to start a conversation.

## What Changes

- New repository `tessarion-labs-site`: a static single-page site built with Vite 7 + TypeScript, no UI framework.
- A header carrying the horizontal lockup, in-page navigation, and a three-state theme control (system / light / dark).
- A hero that states the studio's positioning in one line and offers exactly one primary action.
- A "Who we are" section with Roger Oliveira and Alice Ribeiro — GitHub profile photo, role, a bio written from each person's real record, and links to GitHub and LinkedIn.
- A "The crew" section listing Char, Joey and Reginaldo as the studio's three assistants. They are cats. The section says so plainly and does not explain the joke twice.
- A "Products" section with one card per product: Taimu (macOS menu-bar time tracking for independent contractors) and Mascada (personal finance — Rust API, TypeScript web client, agent-facing Claude Code skill). Each card carries the product mark, its own accent hue, and the endorsement line.
- A contact section and a footer with the endorsed lockup, an email address, and the studio's location and timezone.
- Brand assets vendored, not re-authored: `src/styles/tokens.css` and the SVGs under `public/brand/` are copies of the brand repo's masters.
- Toolchain: bun, oxlint, oxfmt, stylelint with `stylelint-declaration-strict-value` configured so a literal colour or duration in CSS fails the build. Conventional Commits enforced by commitlint + husky.
- A GitHub Actions workflow that builds the site and deploys it to GitHub Pages on every push to `main`.

**Trade-off.** A hand-written static page with no framework and no CMS means every copy edit is a commit and a deploy. That is accepted: the site is one page with roughly forty strings on it, and a CMS would cost more than it saves for years. The second cost is the vendored brand assets — they can drift from the brand repo, and nothing detects that automatically. The mitigation is a documented re-copy step, not a build-time check, because a submodule would make a five-file site depend on a private repo.

## Capabilities

### New Capabilities
- `site-shell`: the page skeleton every section sits in — document head and metadata, header, navigation, theme control, footer, and the token-driven layout and type scale that all sections inherit.
- `studio-story`: the hero and the studio's own account of itself — positioning, what the studio is and is not, how it works.
- `people`: the two engineers, their bios, their photos and their outbound links.
- `crew`: the three cats, presented as the studio's assistants, with their photos.
- `products`: Taimu and Mascada — what each one is, the stack it runs on, its state, its mark and its accent.
- `contact`: how to reach the studio, and the footer's endorsement and identity block.
- `brand-compliance`: the enforcement layer — token-only styling, contrast rules, focus, motion, reduced-motion and forced-colors behaviour, and the banned-word list applied to copy.
- `deployment`: build, lint and format gates, and the GitHub Pages deploy workflow.
- `localization`: three complete documents — English, Brazilian Portuguese and Latin American Spanish — generated from one template and three content dictionaries, with a language switcher, `hreflang` alternates and the brand voice enforced in each language.

### Modified Capabilities
None. This is the first change in a new repository.

## Impact

- **New repo.** `rogerpoliver/tessarion-labs-site`, public, deployed to GitHub Pages.
- **New files.** `index.html`, `src/main.ts`, `src/styles/*.css`, `public/brand/**`, `public/people/**`, `public/crew/**`, `.github/workflows/deploy.yml`, and the toolchain configs (`package.json`, `vite.config.ts`, `tsconfig.json`, `.oxlintrc.json`, `.oxfmtrc.json`, `.stylelintrc.json`, `commitlint.config.js`, `mise.toml`).
- **Upstream dependency, one-way.** The brand repo is the source of truth for tokens and marks. This repo copies from it and never edits the copies.
- **People data.** Two GitHub profile photos and two bios, plus three cat photos, are committed to the repo. All five images are the owners' own.
- **No backend.** No forms, no analytics, no third-party script, no cookie. Contact is a `mailto:` link. That keeps the site free of a consent banner.
