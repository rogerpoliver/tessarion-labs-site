## ADDED Requirements

### Requirement: Token-only styling
Every colour, font size, space, radius, shadow and duration in the site's stylesheets SHALL be a `--tl-*` token or a value derived from one. A literal hex colour, a literal font size or a literal duration in a component stylesheet SHALL fail lint.

#### Scenario: Literal colour fails the build
- **WHEN** a stylesheet under `src/styles/` declares `color: #E0562D`
- **THEN** `stylelint` fails with a `declaration-strict-value` error and the build does not produce output

#### Scenario: The token file is exempt
- **WHEN** `src/styles/tokens.css` declares literal hex values
- **THEN** stylelint does not flag them, because that file is the vendored token source and is the only place literals are legal

### Requirement: Kiln rules
Kiln `#E0562D` SHALL be used as a fill and never as text. Accent text SHALL be Kiln 700 `#A83214` on light and Kiln 400 `#FF7A4D` on dark. A Kiln fill SHALL carry an ink label at rest, on hover and when pressed. Exactly one Kiln element SHALL be visible per viewport.

#### Scenario: Primary button label
- **WHEN** the primary button is at rest, hovered or pressed
- **THEN** its label stays ink, and the fill moves `#E0562D` → `#F0873C` → `#D6502A`

#### Scenario: One Kiln element
- **WHEN** any viewport of the page is inspected
- **THEN** at most one element carries a Kiln fill

### Requirement: Focus
Every focusable element SHALL show a 2px focus ring in `--tl-focus` at a 2px offset on keyboard focus. `outline: none` without a replacement ring SHALL NOT appear anywhere in the codebase.

#### Scenario: Keyboard focus is visible on every control
- **WHEN** a keyboard user tabs through the entire page
- **THEN** every stop shows a visible ring against its own background, including links inside body copy and the theme control

### Requirement: Contrast
All text SHALL meet WCAG AA against its own background, and all non-text boundaries SHALL meet 3:1, in both light and dark themes.

#### Scenario: Both themes pass
- **WHEN** every text and boundary pair on the page is measured in light and in dark
- **THEN** each text pair is at or above 4.5:1 and each control boundary is at or above 3:1

### Requirement: Motion
Motion SHALL use only the tokens `--tl-motion-instant`, `--tl-motion-base` and `--tl-motion-slow` with `--tl-ease`, and SHALL animate only `transform` and `opacity`. There SHALL be no bounce, no overshoot and no spring. No number SHALL animate.

#### Scenario: Reduced motion
- **WHEN** `prefers-reduced-motion: reduce` is set
- **THEN** every animation and transition resolves immediately to its final state, and no content is hidden as a result

#### Scenario: The logo animation is not a loader
- **WHEN** the page loads and the mark's slip animation plays
- **THEN** it plays once per session, does not block content, and does not replay on scroll

### Requirement: Forced colors
The page SHALL remain fully legible and operable under `forced-colors: active`.

#### Scenario: Forced colors
- **WHEN** the page is viewed under `forced-colors: active`
- **THEN** the marks remain readable, the focus ring remains visible, and no meaning is carried by a colour that the mode removes

### Requirement: Voice
Every user-visible string SHALL obey the brand voice rules: verdict first, numbers over adjectives, sentence case, one claim per sentence, active voice in the second person. The banned-word list SHALL NOT appear, and there SHALL be no exclamation mark and no emoji.

#### Scenario: Banned words are absent
- **WHEN** the rendered text of the page is searched for `revolutionary`, `seamless`, `passionate`, `world-class`, `leverage`, `synergy`, `unlock`, `supercharge`, `magic`, `effortless`, `just` as a minimiser, or `simply`
- **THEN** none is found

#### Scenario: Sentence case
- **WHEN** every heading and button label on the page is inspected
- **THEN** each is sentence case, with no title case and no all-caps except the mono eyebrow and the word `LABS` in the lockup

### Requirement: Vendored brand assets
`src/styles/tokens.css` and the SVGs under `public/brand/` SHALL be byte-for-byte copies of the brand repository's masters, and SHALL NOT be edited in this repository. The re-copy procedure SHALL be documented in the README.

#### Scenario: A token needs to change
- **WHEN** a token value needs to change
- **THEN** it is changed in the brand repository and re-copied here, and the change is never made in this repo's copy
