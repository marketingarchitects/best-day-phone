---
wrike_id: MAAAAAEC_Xm7
title: "AI Location"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345133499
updated_date: 2026-01-08T17:22:04Z
last_sync: 2026-01-09T14:04:48.384352
authors:
  - "Noah Moss"
---

# AI Location

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345133499)

---

## Description

As a caregiver, I want to set the AI's location so that it can discuss where it 'lives'.Functional Requirements- Location FieldGiven user configuring AI, When viewing, Then field shown:AI's Location (text, &#34;City, State&#34; format, max 100 chars, optional, default: Same as patient's location)
- Helper text: &#34;Where does the AI 'live'? Often makes sense for them to live nearby.&#34;
- Auto-populate SuggestionGiven patient location saved, When AI config loads, Then default to patient's city/state
- User can change if desired
AI Context Integration-  Given location configured, When conversation, Then system prompt includes:
- You live in Nashville, Tennessee.
- - Discuss local weather, events, landmarks
- - You can mention local places: &#34;Have you been to Centennial Park lately?&#34;
- - Share that you live nearby and are familiar with the area
Testing Requirements-  E2E test: AI location defaults to patient location
-  E2E test: User changes location, saves
