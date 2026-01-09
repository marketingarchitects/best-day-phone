---
wrike_id: MAAAAAEDAU4z
title: "Edit Scheduled Call"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345384499
updated_date: 2026-01-08T21:12:01Z
last_sync: 2026-01-09T14:04:48.390776
authors:
  - "Noah Moss"
---

# Edit Scheduled Call

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345384499)

---

## Description

As a caregiver, I want to edit or delete existing scheduled calls so that I can adjust the schedule.Functional Requirements-  Edit InteractionGiven schedule card displayed, When user clicks &#34;Edit&#34; button, Then edit modal opens
- Modal shows same multi-step wizard as exists in 'Add a Scheduled Call' with fields pre-filled
- Pre-populationGiven edit modal open, When loaded, Then all saved data populated:Call name
- Time and timezone
- Frequency type (one-time vs repeating)
- Days (if repeating) or date (if one-time)
- Topic
- Retry attempts
-  Save ChangesGiven user edits fields, When clicks &#34;Save Changes&#34;, Then save
- Given save successful, When complete, Then:Modal closes
- Schedule card updates with new data
- Success toast: &#34;Schedule updated&#34;
- Given time/frequency changed, When saved, Then recalculate next call time
Testing Requirements-  E2E test: User edits schedule, changes persist
-  E2E test: Time change recalculates next call
-  Integration test: Partial update works correctly
-  Security test: User cannot edit another user's schedule
