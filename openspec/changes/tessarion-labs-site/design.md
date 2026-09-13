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

### ~~Content lives in the HTML~~ → three documents rendered from three dictionaries

**The original decision.** Every string was written directly in `index.html`. A data file that a script rendered into the DOM would have meant a blank page without JavaScript and a copy review that diffed string literals rather than the page.

**What changed it.** The site now ships in English, Brazilian Portuguese and Latin American Spanish. Three hand-maintained HTML files would drift the first time a section moved, and the reason for writing copy inline — that a diff shows you the page — stops being true once the same paragraph exists three times.

**What replaced it.** `content/en.json`, `content/pt-BR.json` and `content/es-419.json` hold every user-visible string. `scripts/template.mjs` is the structure, once. `scripts/build-pages.mjs` renders `index.html`, `pt/index.html` and `es/index.html` before Vite runs, and those three files are gitignored build output.

Crucially this keeps the property the original decision was protecting: each locale is still a **complete static document**, so every language works with JavaScript off, is indexable, and carries the right `lang` for a screen reader. What was rejected was runtime string swapping, and it is still rejected.

**The parity gate.** A key present in one dictionary and missing from another would ship an English sentence on a Portuguese page, and nothing downstream would notice. `build-pages.mjs` compares the full key shape of every dictionary against English and exits non-zero on any difference, naming the key.

*Alternatives considered.* `data-i18n` attributes swapped in the browser — rejected, non-default languages would need JavaScript and would have the wrong `lang` on first paint. A subdomain or query parameter per language — rejected, directories are the simplest thing that gives each locale a real URL to be indexed and linked.

*The cost.* `index.html` is no longer in the repository, which is surprising in a site repo, and copy changes now happen in JSON rather than in markup. The parity gate and a one-line `bun run pages` are the mitigation.

### A bio is a person, and the credential is the short part

Both bios started as résumés, and Roger's stayed one longest: eleven years, an employer, a percentage, an award, then a list of pipelines and workflows and tooling. Every word was true and none of it told you anything you would want to know about working with him.

The rule now is one professional result at most, and the rest of the words on the person. What replaced the inventory is the part that actually explains him: years in Neovim on the keyboard alone with everything in a terminal, early to AI, and now developing by speaking to a model and arguing with it about once a day. That last detail is also the honest origin of this repository — the site was built the way it describes.

Alice's bio gained the same treatment from the other direction. Hers was already shorter on credentials, so it gained crochet through whole K-dramas, metal shows, and being the only reason either of them leaves the apartment.

Both close on a line a job description could not write — `Grumpy, and the softest heart in the apartment`, `Plays everything for a joke, this bio included`. That is the test the spec now states: if the closing sentence could appear in a CV, it is the wrong sentence.

*Why this is not a loosening of the voice rules.* Warmth is not enthusiasm. The rules ban adjectives standing in for facts, and every one of these details is a fact: a named editor, a named input method, a named craft, a named genre of show. `Adventurous and curious` would have been a violation. `Brazil by motorcycle` is not.

*The mistake worth recording.* The first attempt at this took the notes the two of them wrote about themselves and put them on the page nearly in order — Neovim, then AI, then video games, then the cats, then grumpy. Every fact was theirs and the result was a list. Personal detail handed over by a person is **source material, not copy**: it has to be selected, given a shape, and cut. Roger's bio is now one arc — he perfected a keyboard-only setup, then threw it out the moment something better arrived, and that is the trait that produced this site — and the facts that did not serve that arc are gone. The credential moved into a subordinate clause, because who someone is predicts working with them better than where they worked.

*And the bios are approved before they ship.* Drafts go to the person they describe, who picks one. That is now a scenario in the spec, not a courtesy.

### The product cards sell the idea; the badges carry the facts

The first version of both product cards was a specification: a category name, then a list of what the software does, then the stack. It read like a README, and a README is not a reason to care.

The prose now opens on the reader's situation — billing by the hour and forgetting to write it down; opening a finance app while already worried — and only then says what the product does about it. The exact facts did not disappear: the stack and the release state moved into the badges, where someone who wants them finds them in one glance and the prose never has to carry them.

Mascada's second paragraph is the clearest case of what this buys. "A Rust API, a TypeScript web client, and a Claude Code skill" is three nouns. "An assistant reads and writes the same ledger you do, so recording a purchase can be a sentence instead of a form" is the same fact and it is the reason the skill exists.

*The constraint this runs into.* Selling an idea is exactly where the banned-word list earns its keep — the natural way to write this paragraph uses `seamless`, `effortless` and `simply`, and all three are forbidden. The copy has to be specific instead, which is the point.

### Translations are written, not converted

The first pass rendered English sentences into Portuguese and Spanish word by word. Every word was correct and the result read like a machine: `colocadas de propósito` for "placed on purpose", three stacked `não há` where a Brazilian says `não tem`, `essa é a troca` for "that is the trade", `entrega em TypeScript` for "ships in TypeScript", `razão` for a ledger nobody outside accounting calls that, and `nómina` on a page whose locale is `es-419`.

The rule now: **the dictionary is the unit of translation, not the sentence.** A locale may restate an idea in a different shape if that is how the idea is said there. The mosaic line is the clearest case — English keeps "small precise units, placed on purpose", Portuguese becomes "peças pequenas e precisas, cada uma no lugar por um motivo", and the share image for each locale is regenerated to match rather than being a picture of the English.

This is why the share-card source is generated from the same dictionaries: a locale that rewrites its own headline would otherwise ship a social preview still carrying the old one.

*The cost.* The three files can drift in meaning, not just in wording, and no automated check catches that. The parity gate proves every key exists; it cannot prove the Portuguese says what the English says. That is a review job, and it is why the strings live in three readable JSON files rather than inside markup.

### The copy rules became a build gate

Banned words, exclamation marks, calques and length budgets were checked by hand after every copy change, which means they were checked when someone remembered. Across a dozen rounds of edits that is not a process, it is luck.

`scripts/check-copy.mjs` now reads the dictionaries and fails `bun run lint` — and therefore CI — naming the locale, the rule and the dictionary path for each violation. It reads `content/*.json` rather than `dist/`, so it runs on a checkout with no build.

Writing it surfaced a measurement bug immediately. The hand checks counted whitespace-separated tokens, so a standalone em dash between clauses counted as a word: Roger's English bio was reported at 81 against a cap of 80 when the real count is 77. The fix was in the counter, not the copy — the budget measures prose, and punctuation is not prose.

*What it cannot check.* Whether a sentence is any good, whether the Portuguese means what the English means, and whether a claim is true. Those stay with a reader. The gate covers the rules that are mechanical, which is exactly the set that was being forgotten.

### Language switching is three links, not a control

The switcher is three `<a>` elements, one per document, with `hreflang` and `lang` on each and `aria-current` on the active one. No JavaScript, no menu, no stored preference.

*Why not detect and redirect.* `Accept-Language` redirects need a server this site does not have, and they take the choice away from a reader who deliberately opened the English page. The links are always visible and always work.

*Why not remember the choice.* A stored language preference that silently overrides an explicitly requested URL is a bug the reader cannot see. The URL is the state.

### Photo galleries are scroll-snap, not a slider

Each person has more than one photo, and the galleries are `overflow-x: auto` with `scroll-snap-type: x mandatory`. That is already a working, swipeable, arrow-key scrollable gallery with no JavaScript. `main.ts` adds two step buttons and a position counter and unhides them; without it they stay hidden rather than rendering inert.

The index is read back from `scrollLeft` on every scroll rather than tracked as the source of truth, so a swipe — which never goes through a button — keeps the counter and the disabled states honest.

Nothing auto-advances. A carousel that moves on its own is one nobody finishes reading, and it would violate the motion rules besides. Under `prefers-reduced-motion` the step buttons jump instead of smooth-scrolling.

*Alternatives considered.* A lightbox or a modal gallery — rejected, it is a bio card, not a portfolio. Dots instead of a counter — rejected, `2 / 3` is a number and the brand prefers numbers to shapes.

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

- **Relative bases across two directory depths.** `base: './'` now has to resolve from the root *and* from `/pt/` and `/es/`. Vite rewrites asset references per document, so the nested pages point one level up at the same hashed files — verified in the built output, not assumed. The language links are not assets, so their hrefs are computed from the current locale's depth in the template. A third depth would need that helper revisited.

- **The endorsement string stays English on a Portuguese page.** `brand-guidelines.md` says the string is exactly `A Tessarion Labs product`. Read strictly, that makes it a brand element like the wordmark; read loosely, it is a sentence and sentences get translated. This repo takes the strict reading because it does not own the brand document. The brand repository should decide, and it is listed in Open Questions.

- **The cats moved up the page, ahead of the products.** → They now sit inside the family section with Roger and Alice, because the household is one thing and splitting it across two sections said otherwise. The cost is real: a reader who skims and stops early meets the family before they meet Taimu and Mascada. Accepted, because this is a couple's own site rather than a sales funnel, and mitigated by keeping the cat cards small, unaccented, gallery-free and always after the two person cards. The hierarchy is carried by size, not by distance.

- **A joke explained at length stops being a joke.** → Each cat briefly had a 40-word bio under its role line. It read as filler: the whole joke is a job title landing on an animal, and the second sentence was always weaker than the first. The entries are one line again, and the rule is written into the spec so the next person does not re-derive it.

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

- **Is `A Tessarion Labs product` translatable?** It currently ships in English on all three locales, on the strict reading of `brand-guidelines.md` section 8. If it is a sentence rather than a mark, the brand repository should say so and supply the Portuguese and Spanish forms.

- **`brand-guidelines.md` section 1 is wrong and this repo cannot fix it.** The positioning paragraph describes a product studio selling to technical buyers. The truth is a two-person side project. The correction belongs in the brand repository, not here — but until it lands, the brand document and this site disagree about what Tessarion Labs is, and anyone reading both will notice. Whoever edits the brand repo next should rewrite section 1 and re-run the sync.
