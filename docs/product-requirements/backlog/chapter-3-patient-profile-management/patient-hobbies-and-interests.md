---
wrike_id: MAAAAAEC_HmC
title: "Patient Hobbies and Interests"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345067906
updated_date: 2026-01-08T16:49:13Z
last_sync: 2026-01-09T14:04:48.379347
authors:
  - "Noah Moss"
---

# Patient Hobbies and Interests

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345067906)

---

## Description

As a caregiver, I want to list the patient's hobbies and interests so that the AI can discuss enjoyable topics.Functional Requirements-  Interests Tag InputGiven user on profile form, When viewing interests section, Then tag input field displayed
- Label: &#34;Hobbies & Interests&#34; with helper text: &#34;Type an interest and press Enter to add. Add as many as you'd like.&#34;
-  Tag EntryGiven user types interest, When presses Enter or comma, Then tag created and displayed as pill
- Given user types interest, When clicks outside field, Then tag created
- Each tag has × button to remove
- Max 20 tags
- Each tag max 30 chars
-  Common SuggestionsGiven field focused, When user starts typing, Then autocomplete suggestions shown:Gardening, Cooking, Baking, Reading, Music, Singing, Dancing, Painting, Knitting, Sewing, Fishing, Golf, Baseball, Football, Church, Travel, Photography, Birds/Bird watching, Crossword puzzles, Card games, Chess, Walking, Volunteering, Family time, Grandchildren
-  Duplicate PreventionGiven tag already exists, When user tries to add duplicate (case-insensitive), Then show warning: &#34;This interest is already added&#34;
AI Context Integration-  Given interests saved, When AI conversation, Then context includes:
- Patient Interests:
- - Gardening
- - Church choir
- - Cooking
- 
- Conversation Strategy:
- - Ask about their garden: &#34;What are you growing this season?&#34;
- - Discuss favorite hymns or choir memories
- - Talk about favorite recipes or cooking memories
- - Use these as fallback topics if conversation lulls
Testing Requirements-  Unit test: Tag validation (length, duplicates)
-  Integration test: Interests save and retrieve correctly
-  E2E test: User adds multiple interests via Enter key
-  E2E test: Autocomplete suggestions appear and are selectable
-  E2E test: Duplicate interest shows warning
