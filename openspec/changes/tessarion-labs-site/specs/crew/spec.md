## ADDED Requirements

### Requirement: The crew section
The site SHALL carry a section presenting Char, Joey and Reginaldo as the studio's three assistants, with a photo and a one-line role for each. Each is a cat. The section SHALL say so once, in the section's own copy, and SHALL NOT repeat or explain the joke in the individual entries.

#### Scenario: Three entries render
- **WHEN** the crew section is rendered
- **THEN** three cards appear — Char, Joey and Reginaldo — each with a square photo, a name, and a role line of at most twelve words

#### Scenario: The joke lands once
- **WHEN** the section copy is read end to end
- **THEN** the fact that the assistants are cats is stated exactly once, deadpan, in the section's own lead line

#### Scenario: Tone stays inside the brand voice
- **WHEN** the crew copy is reviewed against the banned-word list
- **THEN** no banned word and no exclamation mark appears, and the humour comes from understatement rather than from punctuation or emoji

### Requirement: Crew photos
Each crew photo SHALL be served locally from `public/crew/`, square, with explicit dimensions and a descriptive `alt` attribute naming the cat.

#### Scenario: Alt text is descriptive
- **WHEN** a screen reader reaches a crew photo
- **THEN** the alt text names the cat and describes the photo, and does not read "image" or "photo of a cat"

### Requirement: The crew section is subordinate
The crew section SHALL sit after the people and products sections, SHALL use a smaller card than the people section, and SHALL NOT carry the page's Kiln element.

#### Scenario: Order on the page
- **WHEN** the page is read top to bottom
- **THEN** the crew section appears after products, so a reader who stops early has already seen what the studio builds and who builds it
