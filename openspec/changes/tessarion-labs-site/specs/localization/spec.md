## ADDED Requirements

### Requirement: Three complete documents
The site SHALL be published in English, Brazilian Portuguese and Latin American Spanish. Each locale SHALL be a complete, separately addressable HTML document — English at the root, Portuguese at `/pt/`, Spanish at `/es/`. A locale SHALL NOT be produced by swapping strings in the browser.

#### Scenario: Every locale works without JavaScript
- **WHEN** any of the three URLs is loaded with JavaScript disabled
- **THEN** the whole page is present and readable in that language, because the translated text is in the delivered HTML

#### Scenario: The document declares its own language
- **WHEN** a document is inspected
- **THEN** its `<html lang>` is `en`, `pt-BR` or `es-419` to match its content, so a screen reader reads it in the right voice

#### Scenario: Metadata is translated
- **WHEN** a locale's document is inspected
- **THEN** its title, description, Open Graph and Twitter text, image alt text and share image are all in that locale's language

### Requirement: Content is data, markup is a template
All user-visible strings SHALL live in `content/<locale>.json`. The page structure SHALL live in a single template, and the three documents SHALL be generated from that template at build time. No locale SHALL have hand-maintained markup of its own.

#### Scenario: One structural change reaches every locale
- **WHEN** a section is added or reordered in the template
- **THEN** all three documents get it on the next build, with no per-locale edit

#### Scenario: A missing translation is visible, not silent
- **WHEN** a key exists in one dictionary and not another
- **THEN** the build fails rather than emitting a page with an English string in it

#### Scenario: Generated documents are not committed
- **WHEN** the repository is inspected
- **THEN** `index.html`, `pt/` and `es/` are ignored by git, because they are build output and a committed copy would drift from `content/`

### Requirement: Language switcher
Every document SHALL carry a switcher listing all three locales. Each entry SHALL be a plain link to that locale's document, SHALL declare the target language with `hreflang` and `lang`, and the current locale SHALL be marked with `aria-current`.

#### Scenario: Switching needs no JavaScript
- **WHEN** a visitor with JavaScript disabled activates a language link
- **THEN** the browser navigates to that locale's document

#### Scenario: The current locale is not signalled by colour alone
- **WHEN** a screen reader reaches the switcher
- **THEN** the active entry is announced as current, and each entry announces its language name rather than a bare two-letter code

#### Scenario: Links resolve from any depth
- **WHEN** the switcher is used from `/pt/` or `/es/`
- **THEN** every target resolves, because the hrefs are computed from the current document's depth

### Requirement: Search engines are told about the alternates
Each document SHALL declare `rel="alternate"` `hreflang` links for all three locales plus `x-default`, and its own `rel="canonical"`.

#### Scenario: Alternates are absolute and complete
- **WHEN** any document's head is inspected
- **THEN** it lists all three locale URLs as absolute URLs, plus an `x-default` pointing at the English root, and a canonical pointing at itself

### Requirement: The brand voice applies in every language
The voice rules SHALL hold in all three locales: verdict first, numbers over adjectives, sentence case, one claim per sentence. There SHALL be no exclamation mark and no emoji in any locale. Each locale SHALL have its own banned-word list, equivalent in intent to the English one.

#### Scenario: Localized banned words
- **WHEN** the Portuguese page is checked for `revolucionário`, `apaixonado`, `sinergia`, `mágico`, `sem esforço`, `simplesmente` and the Spanish page for their equivalents
- **THEN** none is found

#### Scenario: Translations are not literal where literal is wrong
- **WHEN** a call to action is translated
- **THEN** it reads as something a person would actually say in that language rather than a word-for-word rendering of the English

### Requirement: The endorsement string stays in English
`A Tessarion Labs product` SHALL appear verbatim in every locale, untranslated.

#### Scenario: Endorsement is identical across locales
- **WHEN** the three documents are compared
- **THEN** each product card carries the exact string `A Tessarion Labs product`, because `brand-guidelines.md` specifies it exactly and this repository does not decide whether it is translatable
