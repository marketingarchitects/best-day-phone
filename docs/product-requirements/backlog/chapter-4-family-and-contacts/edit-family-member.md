---
wrike_id: MAAAAAEC_UbX
title: "Edit Family Member"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345120471
updated_date: 2026-01-08T17:06:34Z
last_sync: 2026-01-09T14:04:48.376463
authors:
  - "Noah Moss"
---

# Edit Family Member

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345120471)

---

## Description

As a caregiver, I want to edit existing family member information so that details stay current.Functional Requirements-  Edit InteractionGiven family member card displayed, When user clicks &#34;Edit&#34; button, Then modal opens with fields pre-filled
-  Form Pre-populationGiven edit modal open, When loaded, Then all saved data populated in fields
- Photo displays if previously uploaded
- Phone formatted for display
- Save ChangesGiven user edits fields, When clicks &#34;Save Changes&#34;, Then save
- Given save successful, When complete, Then:Modal closes
- Card updates with new data
- Success toast: &#34;Family member updated&#34;
Testing Requirements-  E2E test: User edits family member, changes persist
-  Integration test: Partial update works (only changed fields updated)
-  Security test: User cannot edit family member from another patient profile
