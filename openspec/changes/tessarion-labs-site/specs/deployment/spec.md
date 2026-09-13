## ADDED Requirements

### Requirement: Build
`bun run build` SHALL typecheck and produce a static bundle in `dist/` that can be served from any static host with no server-side logic.

#### Scenario: Typecheck gates the build
- **WHEN** a TypeScript error exists
- **THEN** `bun run build` fails and writes no output to `dist/`

#### Scenario: Output is portable
- **WHEN** `dist/` is served from a static file server
- **THEN** the site works with no rewrite rules, because there is only one HTML document

### Requirement: Quality gates
The repository SHALL run oxlint, oxfmt and stylelint, and SHALL enforce Conventional Commits through commitlint and husky.

#### Scenario: Format check
- **WHEN** `bun run format:check` runs against unformatted source
- **THEN** it exits non-zero and names the files

#### Scenario: Non-conventional commit is rejected
- **WHEN** a commit message does not match Conventional Commits
- **THEN** the commit-msg hook rejects it

### Requirement: Continuous integration
A GitHub Actions workflow SHALL run the lint, format and build gates on every pull request and on every push to `main`.

#### Scenario: A failing gate blocks the merge
- **WHEN** lint, format check, typecheck or build fails on a pull request
- **THEN** the workflow reports failure

### Requirement: Deployment
A GitHub Actions workflow SHALL deploy `dist/` to GitHub Pages on every push to `main`, using the official Pages actions and the repository's `GITHUB_TOKEN`, with no third-party deploy key.

#### Scenario: Push to main deploys
- **WHEN** a commit lands on `main` and the build succeeds
- **THEN** the workflow publishes `dist/` to GitHub Pages and the live site serves the new build

#### Scenario: Failed build does not deploy
- **WHEN** the build step fails
- **THEN** the deploy job does not run and the previously published site stays up

### Requirement: Base path
The Vite base path SHALL be configured so the site resolves its assets correctly at whatever path GitHub Pages serves it from.

#### Scenario: Assets resolve on Pages
- **WHEN** the site is served from a project subpath rather than the domain root
- **THEN** every stylesheet, script, image and SVG resolves, and no request 404s
