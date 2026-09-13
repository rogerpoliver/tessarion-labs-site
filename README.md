# Tessarion Labs — site

Tessarion Labs' public landing page. Three static HTML documents — English,
Brazilian Portuguese and Latin American Spanish — built with Vite and
TypeScript, deployed to GitHub Pages.

- English: https://rogerpoliver.github.io/tessarion-labs-site/
- Português: https://rogerpoliver.github.io/tessarion-labs-site/pt/
- Español: https://rogerpoliver.github.io/tessarion-labs-site/es/

## What is here

| Path | What it is |
|------|------------|
| `content/*.json` | **Every user-visible string**, one file per locale. This is where copy is edited. |
| `scripts/template.mjs` | The page structure, once, as a function of a locale dictionary. |
| `scripts/build-pages.mjs` | Renders `index.html`, `pt/index.html` and `es/index.html`. Fails if the dictionaries disagree about their keys. |
| `src/main.ts` | The behaviour on the page: the theme toggle, the photo galleries, the mark's one-per-session animation, and the footer year. Carries no English — every string comes from the markup. |
| `src/styles/tokens.css` | **Vendored.** A copy of the brand repo's hand-authored tokens. Never edited here. |
| `src/styles/fonts.css` | `@font-face` blocks for the self-hosted latin subsets. |
| `src/styles/base.css` | Reset, type scale, focus ring, forced-colors. |
| `src/styles/layout.css` | Content column, section rhythm, card grids. |
| `src/styles/components.css` | Header, theme control, buttons, cards, callout, badges, footer. |
| `src/styles/sections.css` | Per-section rules, including the scoped product accents. |
| `public/brand/` | **Vendored.** Copies of the brand repo's logo masters, plus the generated share image. |
| `public/people/`, `public/crew/` | Photos. Ours. |
| `openspec/` | Specs and change history ([OpenSpec](https://github.com/Fission-AI/OpenSpec)). |

## Development

Toolchain via [mise](https://mise.jdx.dev) (`node 24`, `bun`).

```bash
bun install
bun run pages          # render the three locale documents from content/
bun run dev            # renders pages, then the Vite dev server
bun run lint           # oxlint + stylelint
bun run format:check   # oxfmt
bun run typecheck      # tsc --noEmit
bun run build          # typecheck, then a static bundle in dist/
bun run preview        # serve dist/
```

Commits follow [Conventional Commits](https://www.conventionalcommits.org),
enforced by commitlint and husky.

## The brand is upstream

`src/styles/tokens.css` and everything under `public/brand/logo/`,
`public/brand/taimu/` and `public/brand/mascada/` are **copies** of the
[tessarion-labs-brand](https://github.com/rogerpoliver/tessarion-labs-brand)
repository's masters. They are never edited in this repo. A token value that
needs to change is changed there and re-copied here:

```bash
BRAND_REPO=../../branding ./scripts/sync-brand.sh
```

This is a manual step on purpose. A submodule would make a public site repo
depend on a private brand repo, which breaks clones and CI for anyone without
access to it.

Two rules from the brand are enforced by the build rather than by review:

- **No literal values in CSS.** `stylelint-declaration-strict-value` fails the
  build on a literal colour, font size or duration anywhere except
  `tokens.css` and `fonts.css`. Try adding `color: #E0562D` to a component
  stylesheet and run `bun run lint`.
- **`outline: none` does not appear in this repository.** The focus ring is
  declared once, globally, in `base.css`.

The rest — voice, the banned-word list, one Kiln element per view, sentence
case — is reviewed by reading the diff. The strings are in `index.html` for
exactly that reason.

## Fonts

Inter, Inter Tight and JetBrains Mono are self-hosted as latin-subset woff2 in
`public/fonts/`, copied out of the `@fontsource` packages. No CDN, so the page
makes no third-party request and needs no cookie banner.

```bash
./scripts/sync-fonts.sh   # after bumping any @fontsource dependency
```

## Share image

`public/brand/share.png` is rendered from `scripts/share-card.html` so the
wordmark is set in the real Inter Tight rather than in a rasteriser's
substitute. With the dev server running:

```bash
./scripts/make-share-image.sh
```

## Deployment

Push to `main`. `.github/workflows/deploy.yml` installs, lints, builds and
publishes `dist/` to GitHub Pages with the repository `GITHUB_TOKEN`. A failed
build does not deploy, so the previously published site stays up.

Pages must be enabled once, manually: **Settings → Pages → Source: GitHub
Actions**.

`vite.config.ts` sets `base: './'`, so the same build serves correctly from a
Pages project subpath, from a custom domain root, and from a local static
server. Vite resolves that base per document, so `/pt/` and `/es/` point one
level up at the same hashed assets the root page uses. A third directory depth
would need the language-link helper in `scripts/template.mjs` revisited.
