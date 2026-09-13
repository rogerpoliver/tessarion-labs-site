## 1. Toolchain

- [x] 1.1 Add `mise.toml` pinning `node = "24"` and `bun = "latest"`, mirroring Taimu's toolchain file.
- [x] 1.2 Add `package.json`: name `tessarion-labs-site`, private, `type: module`; scripts `dev`, `build` (`tsc && vite build`), `preview`, `lint` (`oxlint --config .oxlintrc.json src && stylelint "src/**/*.css"`), `lint:css`, `format` (`oxfmt src`), `format:check`, `prepare` (`husky`); devDependencies `vite`, `typescript`, `oxlint`, `oxfmt`, `stylelint`, `stylelint-declaration-strict-value`, `husky`, `lint-staged`, `@commitlint/cli`, `@commitlint/config-conventional`.
- [x] 1.3 Add `tsconfig.json` — strict, `moduleResolution: bundler`, `noEmit`, target ES2022, DOM libs.
- [x] 1.4 Add `vite.config.ts` with `base: './'` and `build.outDir: 'dist'`.
- [x] 1.5 Add `.oxlintrc.json` and `.oxfmtrc.json` copied in spirit from Taimu's.
- [x] 1.6 Add `.stylelintrc.json` with `stylelint-declaration-strict-value` on `color`, `background-color`, `border-color`, `fill`, `font-size`, `transition-duration`, `animation-duration`; `ignoreFiles: ["src/styles/tokens.css"]`; `disableFix: false`.
- [x] 1.7 Add `commitlint.config.js` extending `@commitlint/config-conventional`, plus `.husky/commit-msg` and `.husky/pre-commit` running `lint-staged`.
- [x] 1.8 Add `.gitignore` covering `node_modules`, `dist`, `.DS_Store`, `*.local`.
- [x] 1.9 Run `bun install` and confirm `bun run build` fails only because `index.html` does not exist yet.

## 2. Fonts and vendored brand assets

- [x] 2.1 Confirm the vendored assets are in place and unmodified: `src/styles/tokens.css`, `public/brand/logo/*.svg`, `public/brand/taimu/*.svg`, `public/brand/mascada/*.svg`.
- [x] 2.2 Add self-hosted latin-subset woff2 files for Inter (400, 500), Inter Tight (600) and JetBrains Mono (400, 500) under `public/fonts/`.
- [x] 2.3 Add `src/styles/fonts.css` with the `@font-face` blocks, `font-display: swap`, and `unicode-range` for the latin subset.
- [x] 2.4 Preload the two faces used above the fold (Inter Tight 600, Inter 400) from `index.html`.

## 3. Base styles

- [x] 3.1 Write `src/styles/base.css`: box-sizing reset, margin reset, `html { color-scheme: light dark }`, body set to `--tl-bg` / `--tl-fg` / `--tl-font-body`, `scroll-behavior: smooth` guarded by `prefers-reduced-motion`.
- [x] 3.2 Implement the brand type scale in `base.css` — display, h1, h2, h3, lead, body, small, eyebrow, caption — with the sizes, weights, line heights and tracking from the design system, using `--tl-size-*` and `--tl-font-*` tokens only.
- [x] 3.3 Implement the focus ring once, globally: `:focus-visible { outline: 2px solid var(--tl-focus); outline-offset: 2px }`. Confirm no `outline: none` exists anywhere in the repo.
- [x] 3.4 Add the `forced-colors: active` block: marks fall back to the mono build, the focus ring uses `Highlight`, and borders use `CanvasText`.
- [x] 3.5 Add `img { max-width: 100%; height: auto; display: block }` and a `.visually-hidden` utility that stays focusable.

## 4. Layout

- [x] 4.1 Write `src/styles/layout.css`: a `.shell` content column with a max width and `--tl-space-*` gutters, and a `.prose` class capping measure at `66ch`.
- [x] 4.2 Add section rhythm — vertical padding from `--tl-space-10` / `--tl-space-11`, and a hairline `--tl-border` rule between sections.
- [x] 4.3 Add `.grid-2` and `.grid-3` card grids using `repeat(auto-fit, minmax(...))`, collapsing to one column on narrow viewports with no media query needed.

## 5. Site shell

- [x] 5.1 Create `index.html` with `lang="en"`, charset, viewport, title `Tessarion Labs — software product studio`, meta description, canonical, Open Graph and Twitter card tags, `theme-color` for light and dark, and `<link rel="icon" href="/brand/logo/favicon.svg">`.
- [x] 5.2 Add the inline blocking theme script in `<head>`: read `localStorage.getItem('tl-theme')`, and if it is `light` or `dark`, set `document.documentElement.dataset.theme` before first paint.
- [x] 5.3 Add the skip link as the first focusable element, targeting `#main`.
- [x] 5.4 Build the header: `<header>` with the horizontal lockup linking to `#top` (both builds as `<img>`, one hidden per theme via CSS, the hidden one `aria-hidden`), a `<nav aria-label="Sections">` with links to `#studio`, `#people`, `#products`, `#contact`, and the theme control.
- [x] 5.5 Build the theme control as a `<fieldset>` with a visually hidden `<legend>Theme</legend>` and three radio inputs — system, light, dark — styled as a segmented control with square corners and a 4px radius.
- [x] 5.6 Write `src/main.ts`: read and write `tl-theme` in `localStorage`, reflect it on `document.documentElement`, wire the radio group, and watch `matchMedia('(prefers-color-scheme: dark)')` so the system setting tracks OS changes live.
- [x] 5.7 Add the header mark's one-per-session slip animation: a `transform`-only keyframe at `--tl-motion-slow` gated by a `sessionStorage` flag, disabled under `prefers-reduced-motion`.
- [x] 5.8 Add `<main id="main">` and the six `<section>` elements, each labelled by its own heading via `aria-labelledby`.

## 6. Hero and studio copy

- [x] 6.1 Write the hero. Eyebrow: `Software product studio · Porto Alegre, BR`. H1: `We build software the way a mosaic is built — small precise units, placed on purpose.` Lead: `Tessarion Labs is a two-person studio. We design and engineer systems for teams who will live inside them for years.`
- [x] 6.2 Add the hero actions: primary `Start a conversation` linking to `#contact`, secondary `See what we ship` linking to `#products`. The primary is the page's only Kiln fill.
- [x] 6.3 Write the studio section, H2 `What we are`, with these paragraphs: `A software product studio. Two engineers, one backlog, and nobody between you and the people writing the code.` / `We work with founders, CTOs, product and platform teams — technical buyers who have been sold to badly before. The answer to that is specificity, not enthusiasm.` / `What we are not: an agency renting out hours, a consultancy that leaves slides behind, or an AI startup.`
- [x] 6.4 Add the named trade-off as a callout: `Two people is the constraint and the point. We take one engagement at a time and say no to the second while the first is running. You get the engineers who wrote the code. You do not get a team of ten next month.`
- [x] 6.5 Add the facts strip in mono: `2 engineers` · `Porto Alegre, BR — UTC−3` · `2 products in development` · `Full overlap with US Eastern hours`.

## 7. People

- [x] 7.1 Build the people section, H2 `Who builds it`, with two equal cards in `.grid-2`.
- [x] 7.2 Roger's card: photo `public/people/roger-oliveira.jpg` at 128×128 with explicit dimensions, alt `Roger Oliveira`, name `Roger Oliveira`, role `Engineering · AI systems`.
- [x] 7.3 Roger's bio: `Eleven years in production. Four at ADP, where he led the HR module modernization that grew adoption 634% in a product that went on to rank #1 of 125,912 in the 2025 G2 Best Software Awards, then moved into AI engineering — LLM extraction pipelines, agentic workflows and MCP developer tooling, in production. Ships in TypeScript, Rust, Python and C#. Contracts for a US software company from Brazil.`
- [x] 7.4 Alice's card: photo `public/people/alice-ribeiro.jpg` at 128×128 with explicit dimensions, alt `Alice Ribeiro`, name `Alice Ribeiro`, role `Engineering · Web`.
- [x] 7.5 Alice's bio: `Developer across the web stack — PHP, Go, JavaScript, Node.js and React. Works at Lydia Sistemas and is studying Systems Analysis and Development. On Taimu she takes the interface and the state that feeds it. Her public repositories run from a zsh configuration to a React app that turns audio notes into text.`
- [x] 7.6 Add outbound links with destination in the accessible name: `github.com/rogerpoliver`, `linkedin.com/in/rogerpoliver`, `github.com/aliicezzz`. Every outbound link gets `rel="noopener noreferrer"`.

## 8. Products

- [x] 8.1 Build the products section, H2 `What we ship`, with two cards in `.grid-2`, each scoping `--tl-accent`, `--tl-fg-accent` and `--tl-bg-accent` on its own element.
- [x] 8.2 Taimu card: mark `public/brand/taimu/symbol.svg`, name `Taimu`, one-liner `Time tracking for independent contractors.`
- [x] 8.3 Taimu body: `A macOS menu-bar app. Start the day, pause, resume, end the day — from the menu bar. A monthly calendar shows each day's intervals, a weekly balance per row, and a monthly total against your goal.` / `No server and no third-party account. Everything is written as JSON on your own disk.`
- [x] 8.4 Taimu metadata: stack `Tauri 2 · Rust · React · TypeScript`, state `In development · macOS`, endorsement `A Tessarion Labs product`.
- [x] 8.5 Mascada card: mark `public/brand/mascada/symbol.svg`, name `Mascada`, one-liner `Personal finance.`
- [x] 8.6 Mascada body: `Accounts, cards and statements, transactions, installment plans, subscriptions, fixed expenses and debts, in one ledger that shows what happened to the money.` / `A Rust API, a TypeScript web client, and a skill that lets an agent read and write the same ledger you do.`
- [x] 8.7 Mascada metadata: stack `Rust · TypeScript · Claude Code skill`, state `In development · Private`, endorsement `A Tessarion Labs product`.
- [x] 8.8 Declare the product text steps as custom properties in `components.css` with a comment naming the source: Taimu `#0A5F75`, Mascada `#08603F`. Confirm neither accent is used as body text and neither is a Kiln fill.

## 9. Crew

- [x] 9.1 Build the crew section after products, H2 `The crew`, lead `Three assistants. All three are cats.` — the only place the joke is stated.
- [x] 9.2 Three cards in `.grid-3`, smaller than the people cards, no accent, using `public/crew/char.jpg`, `public/crew/joey.jpg` and `public/crew/reginaldo.jpg` at 96×96 with explicit dimensions.
- [x] 9.3 Roles: Char — `Quality assurance. Sits on the keyboard until the build is green.` Joey — `Junior. Reviews every pull request from inside the blanket.` Reginaldo — `Operations. Decides when the work day ends.`
- [x] 9.4 Alt text names the cat and describes the photo, e.g. `Char, a black and white cat, lying on a grey couch.`

## 10. Contact and footer

- [x] 10.1 Build the contact section, H2 `Start a conversation`, body `Tell us what you are building and what is in the way. We answer within two business days.`, and one `mailto:roger.dev.br@gmail.com` link as the action.
- [x] 10.2 Build the footer: horizontal lockup (theme-matched, once), `Porto Alegre, Brazil — UTC−3`, the contact address, a link to `github.com/rogerpoliver`, and `© <year> Tessarion Labs`.
- [x] 10.3 Set the footer year at runtime in `main.ts`, with `2026` written in the markup as the no-JavaScript fallback.

## 11. Components

- [x] 11.1 Write `src/styles/components.css`: buttons (primary Kiln fill with an ink label at rest, `--tl-kiln-300` hover, `--tl-kiln-550` pressed; secondary outlined in `--tl-border-strong`; ghost), 36px tall, 4px radius.
- [x] 11.2 Card: `--tl-bg-surface`, 1px `--tl-border`, 8px radius, 24px padding, `--tl-shadow-1`.
- [x] 11.3 Callout: `--tl-bg-accent` background, 3px left rule in `--tl-accent`, ink body copy, no icon.
- [x] 11.4 Badge: 22px tall, 4px radius, 1px border, ink text, mono 12px, distinguished by a glyph and not by a fill colour.
- [x] 11.5 Header and footer chrome, the segmented theme control, and the mono facts strip.
- [x] 11.6 Write `src/styles/sections.css` for the per-section rules that do not generalise, and import all stylesheets from `src/main.ts` in order: tokens, fonts, base, layout, components, sections.

## 12. Verification

- [x] 12.1 `bun run lint`, `bun run format:check` and `bunx tsc --noEmit` all pass.
- [x] 12.2 Prove the strict-value gate works: temporarily add `color: #E0562D` to `components.css`, confirm stylelint fails, then remove it.
- [x] 12.3 Tab through the whole page in light and dark. Every stop shows a visible ring. The skip link is first.
- [x] 12.4 Measure every text and boundary pair in both themes. Text at or above 4.5:1, control boundaries at or above 3:1.
- [x] 12.5 Load with a stored dark preference on a light OS and confirm the first painted frame is dark.
- [x] 12.6 Set `prefers-reduced-motion: reduce` and confirm every transition and the mark animation resolve immediately with nothing hidden.
- [x] 12.7 View under `forced-colors: active` and confirm marks, focus ring and borders survive.
- [x] 12.8 Disable JavaScript and confirm all content and links work, and only the theme control is absent.
- [x] 12.9 Grep the rendered text for the banned-word list and for `!`. Confirm zero hits.
- [x] 12.10 Count Kiln fills per viewport at 360px, 768px and 1440px. Confirm at most one.
- [x] 12.11 Confirm no request leaves the site's origin and no cookie is set.

## 13. Deployment

- [x] 13.1 Add `.github/workflows/ci.yml`: on pull request and on push to `main`, set up mise and bun, `bun install --frozen-lockfile`, then lint, format check, typecheck and build.
- [x] 13.2 Add `.github/workflows/deploy.yml`: on push to `main`, build, then `actions/configure-pages`, `actions/upload-pages-artifact` with `path: dist`, and `actions/deploy-pages`, with `permissions: { contents: read, pages: write, id-token: write }` and a `github-pages` environment.
- [x] 13.3 Confirm the deploy job depends on a successful build, so a failed build leaves the published site untouched.

## 14. Documentation

- [x] 14.1 Write `README.md`: what the repo is, the stack, the dev commands, the deploy flow, and the exact command to re-copy the vendored brand assets from the brand repo.
- [x] 14.2 State in the README that `src/styles/tokens.css` and `public/brand/**` are vendored copies and are never edited here.
- [x] 14.3 Commit in Conventional Commits, create the public GitHub repository `rogerpoliver/tessarion-labs-site`, push `main`, and enable GitHub Pages with the source set to GitHub Actions.
