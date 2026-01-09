---
wrike_id: MAAAAAEDAUJr
title: "Specify Call Topic"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345381483
updated_date: 2026-01-08T21:22:44Z
last_sync: 2026-01-09T14:04:48.389970
authors:
  - "Noah Moss"
---

# Specify Call Topic

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345381483)

---

## Description

As a caregiver, I want to specify a call topic so that the AI discusses relevant subjects.Functional Requirements-  Topic Input (Step 3)Given user on step 3, When viewing, Then topic field displayed:Label: &#34;What should this call be about? (Optional)&#34;
- Textarea input (max 500 chars)
- Placeholder: &#34;e.g., Ask about their day, Discuss gardening, Reminisce about their teaching career&#34;
- Character counter: &#34;245 / 500 characters&#34;
-  Topic SuggestionsGiven field empty, When user clicks &#34;Need ideas?&#34;, Then show suggestions:General check-in
- Talk about hobbies 
- Discuss family members 
- Reminisce about life events 
- Discuss the weather and seasons
- Talk about upcoming holidays
-  Optional FieldGiven topic left empty, When saved, Then AI uses general conversation approach
- Helper text: &#34;Leave blank for a general friendly conversation&#34;
AI Context Integration-  Given topic specified, When call initiated, Then AI system prompt includes:
- Call Topic: Discuss gardening
- 
- Conversation Strategy:
- - Start conversation by asking about their garden
- - Inquire about what they're growing this season
- - Discuss gardening memories from their life story
- - Stay focused on this topic but allow natural conversation flow
-  Given no topic, When call initiated, Then AI uses general approach:
- Call Topic: General check-in
- 
- Conversation Strategy:
- - Ask how they're doing today
- - Discuss topics from their interests (hobbies, family)
- - Keep conversation warm, friendly, and engaging
Testing Requirements-  E2E test: User enters topic, saves, topic stored
-  E2E test: Topic suggestions populate field
-  Unit test: Topic validation (max length)
