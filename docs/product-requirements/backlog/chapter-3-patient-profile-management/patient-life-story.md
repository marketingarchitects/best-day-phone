---
wrike_id: MAAAAAEC_HjK
title: "Patient Life Story"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345067722
updated_date: 2026-01-08T16:51:56Z
last_sync: 2026-01-09T14:04:48.378813
authors:
  - "Noah Moss"
---

# Patient Life Story

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345067722)

---

## Description

As a caregiver, I want to write the patient's life story so that the AI can reference their background.Functional Requirements-  Life Story Rich Text EditorGiven user on profile form, When viewing life story section, Then rich text editor displayed
- Label: &#34;Life Story&#34; with helper text: &#34;Share as much or as little as you'd like. The more detail you provide, the more personalized conversations will be.&#34;
-  Editor FeaturesRich text formatting: Bold, italic, bullet lists, numbered lists (all other formatting is unavailable)
- Paragraph breaks preserved
- Max length: 5,000 characters (approximately 800-1000 words)
- Character counter displayed: &#34;2,450 / 5,000 characters&#34;
-  Suggested PromptsGiven editor empty, When user clicks &#34;Need ideas?&#34;, Then expandable section shows prompts:&#34;Where did [Name] grow up?&#34;
- &#34;What did [Name] do for a living?&#34;
- &#34;Tell us about [Name]'s family&#34;
- &#34;What are [Name]'s proudest achievements?&#34;
- &#34;Any military service or significant historical events [Name] lived through?&#34;
-  Auto-SaveGiven user typing, When 5 seconds of inactivity, Then auto-save to backend
- Show indicator: &#34;Saved at 10:45 AM&#34;
- Given save fails, When error occurs, Then show warning: &#34;Changes not saved. Check your connection.&#34;
Backend Requirements-  Given life story content, When saved, Then:Strip unsafe HTML and any links (XSS prevention)
- Preserve basic formatting (paragraphs, lists)
- Return 200 with updated content and timestamp
AI Context Integration-  Given life story saved, When AI conversation, Then context includes:
- Patient Background:
- {full life story text, summarized if > 2000 chars}
- 
- Use this information to:
- - Ask follow-up questions about their past
- - Reference their career, family, hometown in conversation
- - Validate their experiences and memories
-  AI Summarization (Preprocessing)
- Given life story > 2000 chars, When preparing AI context, Then use LLM to summarize into key facts:Birthplace: Tennessee
- Career: Elementary school teacher (30 years)
- Family: Married to John (deceased 2015), 3 children
- Interests: Gardening, church choir
- Summary cached and updated when life story changes
Testing Requirements-  Unit test: Character counter accurate
-  Unit test: HTML sanitization removes unsafe tags
-  Integration test: Auto-save persists content
-  E2E test: User types life story, waits, sees &#34;Saved&#34; indicator
-  E2E test: User exceeds 5000 chars, prevented from typing more
