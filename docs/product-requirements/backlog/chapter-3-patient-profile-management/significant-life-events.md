---
wrike_id: MAAAAAEC_Hpj
title: "Significant Life Events"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345068131
updated_date: 2026-01-08T16:47:09Z
last_sync: 2026-01-09T14:04:48.379835
authors:
  - "Noah Moss"
---

# Significant Life Events

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345068131)

---

## Description

As a caregiver, I want to record significant life events so that the AI can reference important dates and have richer conversations.Functional Requirements-  Life Events ListGiven user on profile form, When viewing life events section, Then &#34;Add Life Event&#34; button displayed
- Label: &#34;Significant Life Events&#34; with helper text: &#34;Birthdays, anniversaries, important milestones. The AI can reference these in conversation.&#34;
-  Add Event FormGiven user clicks &#34;Add Life Event&#34;, When clicked, Then inline form appears:Event Title (text, max 100 chars, required): e.g., &#34;Wedding Anniversary&#34;
- Event Date (date picker, MM/DD/YYYY, required)
- Event Type (dropdown, optional): Birthday, Anniversary, Graduation, Birth of Child, Career Milestone, Military Service, Loss of Loved One, Other
- Notes (textarea, max 500 chars, optional): Additional context
-  Event List DisplayGiven events saved, When viewing, Then display chronologically (most recent first)
- Each event shows:Event title (bold)
- Date (formatted: &#34;June 15, 1965&#34;)
- Type (if specified): Badge/chip
- Notes preview (first 50 chars)
- Edit/Delete buttons
-  Recurring EventsGiven event type is Birthday or Anniversary, When saved, Then flag as recurring annual event
- AI reminded of upcoming recurring events (within 7 days)
AI Context Integration-  Given events saved, When AI conversation, Then context includes:
- Significant Life Events:
- - Wedding Anniversary: June 15, 1965 (married to John)
- - Daughter Susan born: March 3, 1968
- - Retired from teaching: May 2005
- 
- Conversation Strategy:
- - If near anniversary date, mention: &#34;Your anniversary is coming up on June 15th!&#34;
- - Ask about memories related to these events
- - Show awareness of important milestones
-  Sensitive EventsGiven event type &#34;Loss of Loved One&#34;, When AI references, Then use compassionate language and don't dwell unless patient initiates
Testing Requirements-  Unit test: Event validation (required fields)
-  Integration test: Events CRUD operations work
-  E2E test: User adds event, sees in chronological list
-  E2E test: User edits event, changes persist
-  E2E test: User deletes event with confirmation
