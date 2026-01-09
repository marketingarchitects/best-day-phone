---
wrike_id: MAAAAAEC_Udr
title: "Remove Family Member"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345120619
updated_date: 2026-01-08T17:08:15Z
last_sync: 2026-01-09T14:04:48.376748
authors:
  - "Noah Moss"
---

# Remove Family Member

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345120619)

---

## Description

As a caregiver, I want to remove family members so that the profile stays accurate.Functional Requirements- Delete InteractionGiven family member card displayed, When user clicks &#34;Delete&#34; button (trash icon), Then confirmation modal appears:&#34;Remove [Name] from family list?&#34;
- &#34;This will remove them from the patient's profile. Conversation history will not be affected.&#34;
- &#34;Cancel&#34; / &#34;Remove&#34; buttons
- Confirmation & DeletionGiven user clicks &#34;Remove&#34;, When confirmed, Then DELETE request 
- Given deletion successful, When complete, Then:Card fades out and removes from list
- Success toast: &#34;[Name] removed from family list&#34;
-  Emergency Contact WarningGiven family member is emergency contact, When user clicks &#34;Delete&#34;, Then warning in modal: &#34;⚠️ This person is your emergency contact. You'll need to designate a new emergency contact.&#34;
Testing Requirements-  E2E test: User deletes family member, card removed
-  E2E test: Emergency contact deletion shows warning
-  Integration test: Soft delete works (record marked deleted, not removed)
