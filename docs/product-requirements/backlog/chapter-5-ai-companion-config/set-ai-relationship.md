---
wrike_id: MAAAAAEC_Xkw
title: "Set AI Relationship"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345133360
updated_date: 2026-01-08T17:19:38Z
last_sync: 2026-01-09T14:04:48.383859
authors:
  - "Noah Moss"
---

# Set AI Relationship

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345133360)

---

## Description

As a caregiver, I want to set the AI's relationship to the patient so that the conversation feels natural.Functional Requirements- Relationship FieldGiven user configuring AI, When viewing, Then field shown:AI's Relationship to Patient (dropdown with custom option, required, default: &#34;Old Friend&#34;)
- Dropdown options: Husband, Wife, Son, Daughter, Old Friend, Neighbor, Church Friend, Former Coworker, Family Friend, Volunteer, Other (text input)
-  Custom RelationshipGiven &#34;Other&#34; selected, When chosen, Then text input appears (max 50 chars)
AI Context Integration-  Given relationship configured, When conversation, Then system prompt includes:
- You are Aaron Smith, an old friend of Dorothy Williams.
- - You've known Dorothy for many years
- - Speak as an old friend would: warm, familiar, caring
- - Reference shared history (general terms, not specific since backstory may not be detailed)
-  Given &#34;Former Coworker&#34; selected, When conversation, Then AI might say:&#34;Remember when we used to work together at the school?&#34;
Testing Requirements-  E2E test: User selects relationship, saves, relationship persists
-  E2E test: &#34;Other&#34; option shows text input
