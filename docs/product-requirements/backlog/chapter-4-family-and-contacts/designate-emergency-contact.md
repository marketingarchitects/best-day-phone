---
wrike_id: MAAAAAEC_Uf-
title: "Designate Emergency Contact"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345120766
updated_date: 2026-01-08T17:10:42Z
last_sync: 2026-01-09T14:04:48.377049
authors:
  - "Noah Moss"
---

# Designate Emergency Contact

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345120766)

---

## Description

As a caregiver, I want to designate one family member as emergency contact so that they can be reached if needed.Functional Requirements-  Emergency Contact ToggleGiven family member card displayed, When viewing, Then toggle switch shown: &#34;Emergency Contact&#34;
- Given toggle off, When user clicks, Then show modal: &#34;Set [Name] as emergency contact?&#34;
-  Emergency Contact RequirementsGiven user confirms emergency contact, When phone number missing, Then show error: &#34;Emergency contacts must have a phone number. Please add one first.&#34;
- Given phone number exists, When designating, Then show additional T&Cs:&#34;Emergency Contact Terms: By designating [Name] as an emergency contact, you confirm they have agreed to be contacted in case of device issues or concerning conversation content. They must be reachable at [phone] and have consented to these terms.&#34;
- Checkbox: &#34;I confirm [Name] has agreed to be an emergency contact&#34; (required)
-  Single Emergency Contact EnforcementGiven another family member already emergency contact, When user toggles new one, Then show confirmation: &#34;Change emergency contact from [Old Name] to [New Name]?&#34;
- Given user confirms, When saved, Then previous emergency contact toggle turns off
-  Visual IndicatorGiven family member is emergency contact, When displayed, Then prominent badge: &#34;&#x1f6a8; Emergency Contact&#34;
- Card highlighted with distinct border color
Notification Integration-  Given emergency contact designated, When concerning event occurs (future stories), Then send SMS/call to emergency contact phone number
Testing Requirements-  E2E test: User designates emergency contact, sees badge
-  E2E test: Changing emergency contact shows confirmation and switches
-  E2E test: Attempting to designate without phone shows error
-  Integration test: Only one emergency contact allowed at a time
