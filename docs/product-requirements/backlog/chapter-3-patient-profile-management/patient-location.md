---
wrike_id: MAAAAAEC_Ht5
title: "Patient Location"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345068409
updated_date: 2026-01-08T16:44:22Z
last_sync: 2026-01-09T14:04:48.380225
authors:
  - "Noah Moss"
---

# Patient Location

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345068409)

---

## Description

As a caregiver, I want to input where the patient lives so AI can reference that.Functional Requirements-  Location Input FieldsGiven user on profile form, When viewing location section, Then fields displayed:City (text, max 50 chars, required)
- State (dropdown, US states, required)
- Living Situation (radio buttons, optional):Private home
- Assisted living facility
- Nursing home
- With family member
- Other
- Facility Name (text, max 100 chars, shown if &#34;Assisted living&#34; or &#34;Nursing home&#34; selected, optional)
- Facility website (optional)
-  Location ValidationGiven city entered, When validating, Then check:Not empty
- Only letters, spaces, hyphens
- Given state selected from dropdown, When saved, Then store state abbreviation (e.g., &#34;TN&#34;, &#34;CA&#34;)
-  Privacy NoticeHelper text: &#34;This helps our system discuss local weather, seasons, and regional topics. Your exact address is never stored.&#34;
AI Context Integration-  Given location saved, When AI conversation, Then context includes:
- Patient Location:
- - Lives in Nashville, Tennessee
- - Living situation: Private home
- 
- Conversation Strategy:
- - Reference local weather: &#34;How's the weather in Nashville today?&#34;
- - Discuss regional topics: Tennessee football, country music
- - Seasonal references appropriate for Tennessee climate
-  Weather Integration (Future Enhancement)Given city/state saved, When conversation starts, Then fetch current weather via API
- AI can say: &#34;I see it's 72 and sunny in Nashville today!&#34;
Testing Requirements-  Unit test: Location validation logic
-  Integration test: Location saves and retrieves correctly
-  E2E test: User enters city/state, saves, sees in profile
-  E2E test: Assisted living option shows facility name field
