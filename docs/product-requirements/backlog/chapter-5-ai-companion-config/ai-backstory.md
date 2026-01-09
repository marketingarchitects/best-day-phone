---
wrike_id: MAAAAAEC_XoD
title: "AI Backstory"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345133571
updated_date: 2026-01-08T17:23:29Z
last_sync: 2026-01-09T14:04:48.384597
authors:
  - "Noah Moss"
---

# AI Backstory

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345133571)

---

## Description

As a caregiver, I want to write the AI's backstory so that the persona is consistent.Functional Requirements- Backstory Rich Text EditorGiven user configuring AI, When viewing, Then rich text editor shown (see RTE standards from earlier ticket)
- Label: &#34;AI Backstory (Optional)&#34; with helper text: &#34;Give the AI a consistent background. This helps maintain the illusion of speaking with a real person.&#34;
- Max length: 2,000 characters
- Backstory PromptsGiven editor empty, When user clicks &#34;Need ideas?&#34;, Then show prompts:&#34;How did the AI and patient meet?&#34;
- &#34;What shared experiences do they have?&#34;
- &#34;What does the AI like to do in their free time?&#34;
- &#34;Does the AI have family?&#34;
AI Context Integration-  Given backstory saved, When conversation, Then system prompt includes full backstory
-  AI maintains consistency with backstory across conversations
Testing Requirements-  E2E test: User writes backstory, saves, backstory stored
