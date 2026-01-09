---
wrike_id: MAAAAAEC_UiK
title: "Customize AI Name"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345120906
updated_date: 2026-01-08T17:17:55Z
last_sync: 2026-01-09T14:04:48.383532
authors:
  - "Noah Moss"
---

# Customize AI Name

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345120906)

---

## Description

As a caregiver, I want to customize the AI's first and last name so that the patient recognizes who is calling.Functional Requirements-  AI Configuration SectionGiven user on profile form, When viewing AI section, Then AI configuration fields displayed
- Section title: &#34;AI Companion Configuration&#34; with helper text: &#34;Create a persona for the AI that your patient will find comforting and familiar.&#34;
- AI Name FieldsGiven section loaded, When viewing, Then fields shown:AI First Name (text, max 50 chars, required, default: &#34;Aaron&#34;)
- AI Last Name (text, max 50 chars, required, default: &#34;Smith&#34;)
- Nickname (text, max 50 chars, optional)
- Helper text: &#34;Choose a name your patient will recognize and feel comfortable talking to.&#34;
-  Name ValidationStandard validation (only letters, spaces, hyphens, apostrophes)
AI Context Integration-  Given AI name configured, When conversation starts, Then AI introduces self:&#34;Hello Dorothy, this is Aaron Smith calling to check in on you.&#34;
- AI refers to self as &#34;Aaron&#34; in conversation
- System prompt includes: &#34;You are Aaron Smith, an old friend of the patient.&#34;
Testing Requirements-  Unit test: Name validation works
-  Integration test: AI name saves and retrieves
-  E2E test: User changes AI name, saves, sees updated name
