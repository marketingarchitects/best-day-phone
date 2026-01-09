---
wrike_id: MAAAAAEC_Xlj
title: "AI Fictional Job"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345133411
updated_date: 2026-01-08T17:20:41Z
last_sync: 2026-01-09T14:04:48.384120
authors:
  - "Noah Moss"
---

# AI Fictional Job

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345133411)

---

## Description

As a caregiver, I want to give the AI a fictional job so that it has a believable backstory.Functional Requirements- Job FieldGiven user configuring AI, When viewing, Then field shown:AI's Job/Profession (text, max 100 chars, optional, default: &#34;Retired teacher&#34;)
- Helper text: &#34;What does this AI 'do' for a living? This helps make conversations feel more real.&#34;
- Job SuggestionsPlaceholder text: &#34;e.g., Retired teacher, Volunteer at library, Part-time gardener&#34;
AI Context Integration-  Given job configured, When conversation, Then system prompt includes:
- You are a retired teacher.
- - You can discuss your teaching career if asked
- - You have stories about working with children
- - You might reference your retirement activities
Testing Requirements-  E2E test: User enters job, saves, job stored
