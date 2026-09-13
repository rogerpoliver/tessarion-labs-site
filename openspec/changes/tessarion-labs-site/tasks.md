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
- [x] 5.4 Build the header: `<header>` with the horizontal lockup linking to `#top` (both builds as `<img>`, one hidden per theme via CSS, the hidden one `aria-hidden`), a `<nav aria-label="Sections">` with links to `#about`, `#people`, `#products`, `#contact`, and the theme control.
- [x] 5.5 Build the theme control as a `<fieldset>` with a visually hidden `<legend>Theme</legend>` and three radio inputs — system, light, dark — styled as a segmented control with square corners and a 4px radius.
- [x] 5.6 Write `src/main.ts`: read and write `tl-theme` in `localStorage`, reflect it on `document.documentElement`, wire the radio group, and watch `matchMedia('(prefers-color-scheme: dark)')` so the system setting tracks OS changes live.
- [x] 5.7 Add the header mark's one-per-session slip animation: a `transform`-only keyframe at `--tl-motion-slow` gated by a `sessionStorage` flag, disabled under `prefers-reduced-motion`.
- [x] 5.8 Add `<main id="main">` and the six `<section>` elements, each labelled by its own heading via `aria-labelledby`.

## 6. Hero and studio copy

- [x] 6.1 Write the hero. Eyebrow: `Software product studio · Porto Alegre, BR`. H1: `We build software the way a mosaic is built — small precise units, placed on purpose.` Lead: `Tessarion Labs is a two-person studio. We design and engineer systems for teams who will live inside them for years.`
- [x] 6.2 Add the hero actions: primary `Start a conversation` linking to `#contact`, secondary `See what we ship` linking to `#products`. The primary is the page's only Kiln fill.
- [x] 6.3 Write the about section, H2 `What this is`, with these paragraphs: `A software product studio. Two engineers, one backlog, and nobody between you and the people writing the code.` / `We work with founders, CTOs, product and platform teams — technical buyers who have been sold to badly before. The answer to that is specificity, not enthusiasm.` / `What we are not: an agency renting out hours, a consultancy that leaves slides behind, or an AI startup.`
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

## 15. Corrections from review

- [x] 15.1 Swap `public/crew/joey.jpg` and `public/crew/reginaldo.jpg` — the files were on the wrong cats. Joey is the largest of the three; Reginaldo is the long-haired one.
- [x] 15.2 Rewrite the crew roles so each is true of that specific cat rather than a generic IT gag. Char — `Management. Runs the floor, likes everyone, and says so at length.` Joey — `Security. Largest of the three. Hides from anyone he has not met.` Reginaldo — `Principal. Longest tenure, works alone, does not attend the offsite.`
- [x] 15.3 Update the three crew `alt` attributes so each describes the photo now in that file.
- [x] 15.4 Reposition the studio copy: Tessarion Labs is a name, not a company. Hero lead: `Tessarion Labs is not a company. It is the name we put on the software we build together — Roger and Alice, one apartment in Porto Alegre, one shared backlog.`
- [x] 15.5 Rewrite the studio section, H2 `What this is`, with: `A name, not a company. Tessarion Labs is what two people call their own work: the software we build for ourselves first, and the standard we hold it to.` / `There is no office, no payroll and nothing here to sell you. There are two engineers, a shared backlog, and the hours left over after the day job.` / `The brand, the written specs and the design system exist because we would rather build one product properly than five in a hurry. That is the whole plan.`
- [x] 15.6 Rewrite the trade-off callout: `Two people and the hours left over is the entire capacity. One product moves at a time and the other waits. That is the trade, and it is why Taimu and Mascada are both still in development.`
- [x] 15.7 Update the facts strip: `2 people` · `Porto Alegre, BR — UTC−3` · `2 products in development` · `No office, no payroll`.
- [x] 15.8 Retitle the hero actions and the contact section: `Say hello`, `See what we build`. Drop the two-business-day reply promise — there is no payroll behind it.
- [x] 15.9 Update `<title>`, the meta description and the Open Graph and Twitter tags so none of them describes a company.
- [x] 15.10 Add Alice's LinkedIn — `https://www.linkedin.com/in/aliceribeeiro`, tracking parameters stripped.
- [x] 15.11 Update `scripts/share-card.html` and re-render `public/brand/share.png`.
- [x] 15.12 Update the `studio-story`, `crew`, `people`, `contact` and `site-shell` specs, and record in `design.md` that `brand-guidelines.md` section 1 is now wrong and owes a correction upstream.
- [x] 15.13 Re-run every gate: lint, format check, typecheck, build, contrast in both themes, focus ring on every stop, banned words, one Kiln element.
- [x] 15.14 Rename the `#studio` section to `#about` and its nav label to `About` — the word "studio" implies the company this is not.

## 16. Theme control: one icon button

- [x] 16.1 Replace the three-radio segmented control in `index.html` with a single `<button id="theme-toggle">` carrying two inline SVGs — a sun and a moon — both `aria-hidden`, with square stroke caps and mitred joins.
- [x] 16.2 Replace the `.segmented*` rules in `src/styles/components.css` with `.theme-toggle`: 48px square, 4px radius, 1px `--tl-border-strong`, transparent fill, neutral hover. CSS picks the visible glyph from the resolved theme, mirroring the `.mark` rules.
- [x] 16.3 Add `.theme-toggle[hidden] { display: none }` — an author `display` beats the user agent's `[hidden]` rule, so without it the control is visible and inert with JavaScript off.
- [x] 16.4 Rewrite the theme logic in `src/main.ts`: resolve from the stored override or the system query, toggle to the other theme on click, and **clear** the stored value when the chosen theme already matches the OS, so following the system survives the first press.
- [x] 16.5 Set the button's accessible name and `title` to `Switch to <other> theme` on load, on click, and when the OS theme changes.
- [x] 16.6 Point the `forced-colors` rule in `base.css` at `.theme-toggle` instead of `.segmented`.
- [x] 16.7 Update the `site-shell` theme-control requirement and record the decision, the alternatives and the cost in `design.md`.
- [x] 16.8 Re-verify: fresh visit on a light OS and on a dark OS, one press, a second press restoring system-follow, no-JS `display: none`, contrast in both themes, focus ring on every stop, one Kiln element.

## 17. Photos and galleries

- [x] 17.1 Replace the single GitHub avatar per person with real photos, cropped to 4:5 at 640x800: `roger-01` (suit), `roger-02` (beach), `roger-03` (lift), `alice-01` (portrait), `alice-02` (close portrait).
- [x] 17.2 Add the gallery markup to `scripts/template.mjs`: a `scroll-snap` track that is already swipeable and arrow-key scrollable, plus step buttons and a counter that stay `hidden` until JavaScript unhides them.
- [x] 17.3 Add `.gallery*` styles in `components.css` — 4:5 box, square-cut chevrons, disabled state at each end, no auto-advance.
- [x] 17.4 Rewrite `.person` in `sections.css` for a gallery column beside the text, collapsing to one column below 30rem.
- [x] 17.5 Wire the gallery in `main.ts`: read the index back from `scrollLeft` on every scroll so a swipe keeps the counter honest, disable the step buttons at the ends, and jump instead of smooth-scrolling under `prefers-reduced-motion`.

## 18. Localization

- [x] 18.1 Add `content/en.json`, `content/pt-BR.json` and `content/es-419.json` holding every user-visible string, including photo and crew alt text.
- [x] 18.2 Write `scripts/template.mjs` — the page structure as one function of a dictionary, with per-locale escaping and depth-aware language links.
- [x] 18.3 Write `scripts/build-pages.mjs` to render `index.html`, `pt/index.html` and `es/index.html`, and gitignore all three as build output.
- [x] 18.4 Add the key-parity gate: compare the full key shape of every dictionary against English and exit non-zero naming the missing or unexpected key. Prove it by deleting `about.callout` from `pt-BR.json`.
- [x] 18.5 Add the language switcher — three plain links with `hreflang`, `lang` and `aria-current`, neutral fills, no JavaScript.
- [x] 18.6 Emit `hreflang` alternates for all three locales plus `x-default`, and a self-referencing canonical per document.
- [x] 18.7 Give Vite three entry points and confirm in the built output that `/pt/` and `/es/` resolve assets one level up to the same hashed files.
- [x] 18.8 Move the theme toggle's two labels into `data-to-light` / `data-to-dark` so `main.ts` carries no English.
- [x] 18.9 Render one share image per locale from `scripts/build-share-cards.mjs` plus `scripts/make-share-images.sh`.
- [x] 18.10 Extend the voice gate with Portuguese and Spanish banned-word lists and run it against all three built pages.

## 19. Corrections from review

- [x] 19.1 Rewrite the crew roles as real engineering titles: Char — `Engineering manager. Runs the standup. Has an opinion on every ticket.` Joey — `Security engineer. Trusts one origin. Blocks every request from an unknown host.` Reginaldo — `Principal engineer. Longest tenure, owns the legacy system, does not pair.` Translate each into pt-BR and es-419.
- [x] 19.2 Change the contact address to `hello.tessarion@gmail.com` in all three dictionaries.
- [x] 19.3 Reorder the header below 48rem so row one is the mark, the language switcher and the theme toggle, and the section nav takes row two. The switcher was landing on a third row where a reader on a phone did not see it. Header height on a 390px viewport drops from 158px to 106px.

## 20. Rewriting the translations, and who Alice is

- [x] 20.1 Rewrite the Portuguese copy as Brazilian Portuguese rather than a conversion of the English. Out: `colocadas de propósito`, three stacked `não há` where Brazilians say `não tem`, `essa é a troca`, `entrega em TypeScript`, `razão` for a ledger, `contra a sua meta`, `É esse o plano`.
- [x] 20.2 Rewrite the Spanish the same way. Out: `puestas a propósito`, `ese es el intercambio`, `entrega en TypeScript`, `contra tu meta`, and `nómina`, which is peninsular — the page is `es-419`.
- [x] 20.3 Restate the mosaic line per locale instead of translating it word for word: pt `peças pequenas e precisas, cada uma no lugar por um motivo`, es `piezas pequeñas y precisas, cada una en su lugar por una razón`. Regenerate both share images to match.
- [x] 20.4 Retitle the about section per locale — `O que é a Tessarion`, `Qué es Tessarion` — instead of translating "What this is", which reads as a sentence fragment in both languages.
- [x] 20.5 Drop Lydia Sistemas from Alice's bio in all three locales. She does not work there.
- [x] 20.6 Rewrite Alice's role and bio around what she actually does: management, design and social media brought into engineering, and ownership of turning a pile of ideas into a scope, an order and a date. Role becomes `Design · delivery` / `Design · execução` / `Diseño · ejecución`.
- [x] 20.7 Add `people.lead` to the template and all three dictionaries, stating the division of labour: Roger has more ideas than a week holds, Alice decides which one ships and in what order.
- [x] 20.8 Change `two engineers` to `two people` in the about section — the pair is not two of the same thing, and the facts strip already said `2 people`.
- [x] 20.9 Extend the voice gate with the calque list, and re-run every gate across three locales and both themes.
