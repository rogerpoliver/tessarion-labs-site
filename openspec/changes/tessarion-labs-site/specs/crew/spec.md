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

### Requirement: Each role is a real engineering job title, held by the right cat
A crew role line SHALL open with a job title that exists on an actual software team, and the sentence after it SHALL be true of that specific cat. The joke is the collision between the two; neither half is invented. A role SHALL NOT be assignable to a different cat without becoming false.

#### Scenario: The title is an engineering role
- **WHEN** a crew role is read
- **THEN** it names a job someone holds on a software team — engineering manager, security engineer, principal engineer — and not a generic office role

#### Scenario: Char
- **WHEN** Char's role is rendered
- **THEN** it is an engineering management title, and the description reflects that he is in charge, affectionate with everyone, and vocal

#### Scenario: Joey
- **WHEN** Joey's role is rendered
- **THEN** it is a security title, and the description turns "loyal to one person, afraid of strangers" into trusting one origin and blocking unknown hosts

#### Scenario: Reginaldo
- **WHEN** Reginaldo's role is rendered
- **THEN** it is a principal or staff title, and the description turns "oldest, does not play, keeps apart" into longest tenure, owning the legacy system, and not pairing

### Requirement: Crew photos
Each crew photo SHALL be served locally from `public/crew/`, square, with explicit dimensions and a descriptive `alt` attribute naming the cat. Each file SHALL show the cat it is named after.

#### Scenario: The right cat is in the right file
- **WHEN** `public/crew/<name>.jpg` is opened
- **THEN** it shows the cat named `<name>`, and its `alt` text describes that same animal

#### Scenario: Alt text is descriptive
- **WHEN** a screen reader reaches a crew photo
- **THEN** the alt text names the cat and describes the photo, and does not read "image" or "photo of a cat"

### Requirement: The crew section is subordinate
The crew section SHALL sit after the people and products sections, SHALL use a smaller card than the people section, and SHALL NOT carry the page's Kiln element.

#### Scenario: Order on the page
- **WHEN** the page is read top to bottom
- **THEN** the crew section appears after products, so a reader who stops early has already seen what the two of them build and who builds it
