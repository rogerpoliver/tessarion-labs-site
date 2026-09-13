## Context

Tessarion Labs is not a company. It is the name Roger Oliveira and Alice Ribeiro — a couple in Porto Alegre, Brazil — put on the software they build together, after the day job. It has a finished brand system (direction R5 "Slipped Band", palette Kiln, hand-authored tokens, eight logo masters, a design system document and a brand architecture document) and two products in flight, Taimu and Mascada. It has no public site.

The brand documents are unusually prescriptive: they specify not just colours but measured contrast ratios, which step of the accent ramp may carry a label, what a pressed button may fade to, the type scale with tracking, three motion durations with one curve, and a banned-word list. This is an advantage — almost every question this site would otherwise argue about is already answered upstream. The job here is to consume that system faithfully, not to reinterpret it.

Current state: an empty repository at `/Users/roliveirr/www/tessarion-labs/site` with OpenSpec initialised, the brand's `tokens.css` and logo SVGs already vendored under `src/styles/` and `public/brand/`, two GitHub profile photos under `public/people/`, and three cat photos under `public/crew/`.

Constraints that come from outside this repo:
- The brand repository is the source of truth for tokens and marks. It is private.
- The lockup SVGs contain live text and render correctly only where Inter Tight and JetBrains Mono are available.
- The site must work for a skimming technical reader who is looking for a reason to disqualify the studio. Specificity is the product.

## Goals / Non-Goals

**Goals:**
- One page that answers four questions in under a minute: what the studio builds, who builds it, what it has shipped, how to reach it.
- A visible demonstration of the brand system — if the site does not look like the brand documents describe, the brand documents are worth less.
- Accessibility as a gate: AA contrast in both themes, full keyboard operation, correct behaviour under `prefers-reduced-motion` and `forced-colors`.
- A build that fails loudly when someone writes a literal colour or a literal duration in CSS.
- Zero third-party runtime dependencies on the shipped page. No analytics, no fonts CDN at runtime, no embeds, no cookies.

**Non-Goals:**
- A CMS, a blog, a case-study system or a careers page. One page, hand-edited.
- A framework. There is no state worth a framework on this page.
- Internationalisation. The audience is technical buyers reading English. Portuguese is a later change if it is ever justified.
- A contact form. A `mailto:` link with no backend is more honest than a form that emails us anyway.
- Any attempt to detect brand-asset drift automatically. See Risks.

## Decisions

### Vite + TypeScript, vanilla DOM — not React, not Astro, not a raw HTML file

The page has exactly one piece of behaviour: a three-state theme control. React would ship a runtime measured in tens of kilobytes to manage one attribute on `<html>`. Astro would be a reasonable fit but adds a component model and an island runtime for a page with no islands.

Vite is chosen over a hand-written HTML file because it gives asset hashing, CSS bundling, a dev server with HMR, and a typechecked entry point, for a shipped JavaScript payload that stays under a couple of kilobytes. TypeScript is chosen because everything else in the studio is typed and a `.js` file here would be the odd one out.

*Alternatives considered.* React + Vite — rejected, the runtime cost buys nothing. Astro — rejected, a second mental model for zero islands. Plain `index.html` with no build — rejected, loses asset hashing and typechecking, and the studio's other repos all have a toolchain.

### Content lives in the HTML, not in a data file

Every string is written directly in `index.html`. A `content.ts` that a script renders into the DOM would mean the page is blank without JavaScript and would make copy review a diff of string literals rather than a diff of the page.

*Trade-off.* Repeated structure (two person cards, three crew cards, two product cards) is hand-repeated rather than mapped. For seven cards that is cheaper than the abstraction.

### Styling: plain CSS, one file per concern, tokens enforced by stylelint

No preprocessor, no CSS-in-JS, no utility framework. The brand ships CSS custom properties; a utility framework would add a second naming system on top of them and invite the literal values the brand forbids.

Files:
- `src/styles/tokens.css` — vendored, never edited, the only file where literal hex values are legal.
- `src/styles/base.css` — reset, document defaults, type scale, focus ring, motion defaults, `prefers-reduced-motion` and `forced-colors` handling.
- `src/styles/layout.css` — the content column, section rhythm, the responsive grid used by the card sections.
- `src/styles/components.css` — header, buttons, cards, badges, footer.
- `src/styles/sections.css` — the per-section rules that do not generalise.

`stylelint-declaration-strict-value` is configured for `color`, `background-color`, `border-color`, `fill`, `font-size`, `transition-duration` and `animation-duration`, with `src/styles/tokens.css` ignored. This turns the brand's "no literal values" rule from a review convention into a build failure.

*Alternatives considered.* Tailwind — rejected, it would duplicate the token layer and its default scale contradicts the brand's. Sass — rejected, nesting is native now and there are no variables to compute that tokens do not already express.

### Theme: an inline blocking script, `data-theme`, and one icon button

The token file already implements dark two ways: `@media (prefers-color-scheme: dark)` guarded by `:root:not([data-theme="light"])`, and an explicit `:root[data-theme="dark"]`. Absent attribute means follow the system; `light` and `dark` are explicit overrides. The site adopts that structure rather than inventing a parallel mechanism.

A small blocking script in `<head>` reads `localStorage` and sets the attribute before first paint. It is inline because an external module would load after first paint and produce a flash. It is the only inline script on the page.

The control is **one square button** carrying a sun on light and a moon on dark. Which glyph is visible is a CSS decision, mirroring the lockup rules, so the icon is right on the first painted frame and follows a live OS change with no JavaScript. `main.ts` owns only the button's accessible name, which reads `Switch to dark theme` or `Switch to light theme` — it names the destination, not the current state, because that is the thing a press changes.

**Following the system survives the first press.** A two-state toggle normally makes "follow the system" unreachable the moment a visitor touches it. Here, pressing the toggle onto the theme the OS already reports **clears** the stored override instead of rewriting it. A visitor on a light OS who goes dark and then back to light is following the system again, and never had to find a third control to do it. The state machine is still three-valued; the UI is not.

*Alternatives considered.* A three-radio segmented control — this was the first implementation, and it is the more literal answer, but it puts three mono labels in a sticky header for a preference most visitors never touch. A button that cycles system → light → dark — rejected, a cycling control cannot tell you where the next press lands, and the clear-on-match rule already recovers the state it was there to expose.

*The cost.* A visitor who wants to explicitly return to "follow the system" while the OS is on the *other* theme has no way to say so. They would have to switch their OS theme, toggle, and switch back. That is a real gap, and it is the price of one button instead of three.

### Logo builds are swapped by CSS, not by JavaScript

The lockup has a light build and an inverted build. Both are rendered as `<img>` elements and one is hidden per theme with a CSS rule, so the correct mark is right on the first frame and stays right when the system theme changes, with no JavaScript involved. The hidden one is `aria-hidden` and the visible one carries the alt text, so a screen reader hears the studio name once.

*Alternative considered.* Inlining the SVG and driving it with `currentColor` — this would be cleaner, but the coloured builds use four distinct ramp steps that `currentColor` cannot express, and flattening them to the mono build everywhere would throw away the ramp that is the identity.

### Product accent scoping

Each product card sets `--tl-accent`, `--tl-fg-accent` and `--tl-bg-accent` on its own element, overriding the inherited Kiln values inside that subtree only. This is exactly the mechanism `brand-architecture.md` describes for a product's `tokens.css`, applied at the element level instead of the document level, so the two products can sit on one page without either becoming the page's accent.

The text step is the product's 700 value, not its 500: Taimu `#0A5F75`, Mascada `#08603F`. Those are the only product literals in this repo's CSS, they live in `components.css` next to a comment naming their source, and they are the one documented exception to the strict-value rule — declared as custom properties, which the linter does not police, rather than as direct declarations.

The page's single Kiln element is the hero's primary button. Neither product accent is a Kiln fill, so the "one Kiln element per view" rule holds.

### Motion: one animation, and it is the mark

The brand permits one logo animation — four bands level, then the fourth rises out of line — once per session, on the marketing site only. That is implemented as a CSS keyframe on the header mark, gated by a `sessionStorage` flag, using `transform` only, at `--tl-motion-slow`.

Section reveals on scroll are deliberately not implemented. They are the default choice for a page like this, they animate `opacity` on content, and they make the page worse for anyone who scrolls fast. Hover and focus transitions use `--tl-motion-instant`.

`prefers-reduced-motion` is already wired in the token file: the three duration tokens collapse to `0ms`. No component re-implements it. The one thing the token file cannot cover is the keyframe animation, which is disabled by its own media query.

### Fonts: self-hosted, subset, `font-display: swap`

Inter, Inter Tight and JetBrains Mono are self-hosted as woff2 in `public/fonts/`, declared with `@font-face`, latin subset, `font-display: swap`, and preloaded for the two faces used above the fold. A CDN would be one line less work and would add a third-party request, a privacy question and a failure mode on a page whose entire premise is that it has none of those.

The fallback stack in the token file already names `system-ui` and `ui-monospace`, so a font failure degrades to a legible page rather than an invisible one.

### Deployment: GitHub Actions to GitHub Pages, `base: './'`

Two workflows: `ci.yml` runs lint, format check, typecheck and build on pull requests; `deploy.yml` builds and publishes `dist/` to Pages on push to `main` using `actions/configure-pages`, `actions/upload-pages-artifact` and `actions/deploy-pages` with the repository `GITHUB_TOKEN`.

`base` is set to `'./'` so every asset reference is relative. The site then works identically at `rogerpoliver.github.io/tessarion-labs-site/`, at a custom domain root, and from a local `dist/` opened over a file server — without the base path becoming a thing anyone has to remember.

### Repo conventions mirror Taimu

`mise.toml` for the toolchain, bun as the package manager, oxlint + oxfmt, stylelint, husky + lint-staged + commitlint. Two repos in the same studio with two different toolchains is a tax paid on every context switch.

## Risks / Trade-offs

- **Vendored brand assets drift from the brand repo, silently.** → The README documents the exact copy command, and `brand-compliance` forbids editing the copies. A git submodule was considered and rejected: it would make a public site repo depend on a private brand repo, breaking clones and CI for anyone without access. Accepted as a manual step, because the assets change rarely and the alternative breaks the build for outsiders.

- **Lockup SVGs contain live text and depend on Inter Tight and JetBrains Mono.** → The site self-hosts both faces, so the dependency is satisfied on every surface this repo controls. The residual risk is a font load failure producing a lockup in a fallback face for one frame; `font-display: swap` makes that a brief substitution rather than invisible text. Converting the lockups to outlines is the real fix and belongs in the brand repo, not here.

- **Hand-written copy drifts out of the brand voice over time.** → The banned-word list is in `brand-compliance`, and the task list quotes the exact strings so voice is reviewable in a diff. Not automated: a grep for banned words would catch the word list and miss the actual failure mode, which is a sentence with three clauses and no number in it.

- **Two product accents plus Kiln on one page risks reading as three brands.** → The accents are scoped to their cards and applied only to the mark and a thin rule; the page's only fill accent is the hero button. If the products section still reads as loud in review, the fallback is to drop the product accents to the mono marks and keep the hue only in a 3px rule.

- **The site contradicts the brand's own positioning document.** → `brand-guidelines.md` section 1 positions Tessarion Labs as "a software product studio" that "designs and engineers systems" for "founders, CTOs, product and platform teams" — a company selling engagements. That is not what this is. This site describes what is actually true: a name two people put on their own work, with no office, no payroll and nothing to sell. The site wins, because the site is the thing a reader will believe. The brand document is now wrong and owes a correction upstream; see Open Questions.

- **Bios describe real people and can become wrong.** → Bios state role, stack and shipped outcomes rather than current employer status wherever possible, so they age slowly. Anything time-sensitive is phrased with the year attached.

- **GitHub Pages serves from a project subpath by default, and relative bases break on any page that is not the root.** → There is exactly one HTML document, so relative resolution has one context. If a second page is ever added, `base` becomes a real decision and this note is the warning.

- **The cat section can read as unserious next to the rest of the page.** → It is placed after products, uses a smaller card, carries no accent, and states the joke once, deadpan, with no exclamation mark. Each role is also a true description of that specific cat rather than a generic gag, which is what keeps it from reading as filler. It is there because this is two people and a house with three cats in it, and pretending otherwise would be the less honest page. The cost is accepted and named here rather than discovered in review.

## Migration Plan

Not applicable — new repository, no existing site, no traffic to migrate and no URLs to preserve.

Deploy sequence: push `main` → CI gates run → Pages workflow publishes → GitHub Pages is enabled once, manually, with source set to GitHub Actions. Rollback is `git revert` on `main`, which republishes the previous build; the previously published site stays up whenever a build fails.

## Corrections implementation forced

Two numbers did not survive being measured.

- **Taimu's accent on a card surface.** `brand-architecture.md` names Cyan 500 `#00A6C4` as Taimu's accent and its focus ring. That is a **fill** step, measured under a label. On this page the accent is a 3px rule and a focus ring sitting on `--tl-bg-surface`, where the governing floor is 3:1 for non-text — and 500 measures **2.82:1** there. It fails. The Taimu card uses Cyan 600 `#008FAB` (**3.71:1**) in light mode and returns to 500 in dark, where it measures 6.20:1 on the dark surface. No Taimu fill on this page carries a label, so the label pairing is untouched.
- **The theme control was a second Kiln element.** The control started as a segmented set of radios whose checked chip was a Kiln 50 tint. The header is sticky, so anything accented in it is present in *every* viewport, which makes the "one Kiln element per view" rule unsatisfiable the moment the hero button scrolls into view. The control is now a single neutral icon button, and its hover fill is a neutral surface for the same reason. Neither of these was a taste question.

- **`[hidden]` did not hide the control.** The theme control is `hidden` in the markup so a visitor without JavaScript never sees an affordance that does nothing, and `main.ts` unhides it. But an author `display` declaration beats the user agent's `[hidden] { display: none }`, so the control was visible and inert with scripting off. Restated explicitly as `.theme-toggle[hidden] { display: none }`. This was latent in the original segmented control too, and was only found when the control was rebuilt.

- **Controls are 48px, not the design system's 36px.** 36px is an app-density number and it sits below the 44px target size WCAG 2.5.8 asks for at AAA. This is a marketing page read on phones. `--tl-space-8` is 48px, so the value is still a token, and the deviation is recorded here rather than left as an unexplained mismatch with `design-system.md` section 7.

One thing was measured and accepted rather than fixed: the studio callout's 3px Kiln rule sits 517px below the hero button, so both are visible at once only on a viewport taller than about 1150px. The callout *is* the brand's Kiln component — design-system.md §7 defines it as a Kiln left rule — so removing the hue would be a different component. Named here rather than discovered in review.

## Open Questions

- **Custom domain.** The site ships on `github.io` first. A custom domain needs a `CNAME` file and DNS, and is a follow-up change.
- **~~Share image.~~** Resolved during implementation. `public/brand/share.png` is rendered at 1200×630 from `scripts/share-card.html` by `scripts/make-share-image.sh`, so the wordmark is set in the real Inter Tight instead of a rasteriser's substitute.
- **~~Alice's LinkedIn.~~** Resolved. `linkedin.com/in/aliceribeeiro`, tracking parameters stripped. Both cards now carry GitHub and LinkedIn.

- **`brand-guidelines.md` section 1 is wrong and this repo cannot fix it.** The positioning paragraph describes a product studio selling to technical buyers. The truth is a two-person side project. The correction belongs in the brand repository, not here — but until it lands, the brand document and this site disagree about what Tessarion Labs is, and anyone reading both will notice. Whoever edits the brand repo next should rewrite section 1 and re-run the sync.
