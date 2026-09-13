## ADDED Requirements

### Requirement: The cats are in the family section
Char, Joey and Reginaldo SHALL appear inside the same section as Roger and Alice, not in a section of their own. The household is one thing and the page SHALL show it as one thing.

#### Scenario: Three entries render
- **WHEN** the family section is rendered
- **THEN** three cards appear after the two person cards — Char, Joey and Reginaldo — each with a square photo, a name, a role line of at most twelve words, and a second line of at most sixteen

#### Scenario: There is no separate crew section
- **WHEN** the document's sections are listed
- **THEN** they are hero, about, family, products and contact, and no section exists for the cats alone

#### Scenario: The joke lands once, in the family lead
- **WHEN** the family section's lead is read
- **THEN** it names the division of labour between the two people and closes by stating that the other three are cats — deadpan, once, with no sub-heading re-separating them

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

### Requirement: The second line is more of the job, not a description of an animal
A cat's entry SHALL be a role line and one further line. Both SHALL stay inside the engineering register: the second line SHALL describe the cat's behaviour as something that happens on a software team, using the vocabulary of one. It SHALL NOT drop into pet description.

This requirement replaces an earlier one that forbade a second line entirely. The earlier attempt failed not because it was long but because it left the register — `greets every visitor at the door, supervises from the desk, and narrates the working day out loud` is a cat, described as a cat, under a job title. The joke only works while both halves are written in the same language.

#### Scenario: The second line is still the joke
- **WHEN** a crew card's two lines are read together
- **THEN** the second line extends the job — one-on-ones, severity levels, release history, code review — rather than describing what the animal physically does

#### Scenario: Register check
- **WHEN** a crew line is inspected
- **THEN** every noun in it would be at home in an engineering team's vocabulary, and none of it reads as a caption for a photo of a cat

#### Scenario: Length
- **WHEN** the lines are counted
- **THEN** the role line is at most twelve words and the second at most sixteen, in every locale

#### Scenario: The second line is subordinate
- **WHEN** the card is rendered
- **THEN** the role line carries the page's body colour and the second line is muted, so the title lands first

### Requirement: Crew photos
Each crew photo SHALL be served locally from `public/crew/`, square, with explicit dimensions and a descriptive `alt` attribute naming the cat. Each file SHALL show the cat it is named after.

#### Scenario: The right cat is in the right file
- **WHEN** `public/crew/<name>.jpg` is opened
- **THEN** it shows the cat named `<name>`, and its `alt` text describes that same animal

#### Scenario: Alt text is descriptive
- **WHEN** a screen reader reaches a crew photo
- **THEN** the alt text names the cat and describes the photo, and does not read "image" or "photo of a cat"

### Requirement: The cats are subordinate by size, not by distance
The crew cards SHALL sit after the two person cards, SHALL use a smaller card with no photo gallery, and SHALL NOT carry the page's Kiln element.

#### Scenario: Order within the section
- **WHEN** the family section is read top to bottom
- **THEN** the two people come first and the three cats follow, so the hierarchy is legible without a heading between them

#### Scenario: The cost of moving them up the page
- **WHEN** a reader skims and stops before the products section
- **THEN** they have met the household but not the products — accepted deliberately, because the page is a couple's own site and the family is the point, and mitigated by keeping the cat cards small, unaccented and gallery-free
