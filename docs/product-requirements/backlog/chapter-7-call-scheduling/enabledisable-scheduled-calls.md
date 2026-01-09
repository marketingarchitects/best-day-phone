---
wrike_id: MAAAAAEDAVZl
title: "Enable/Disable Scheduled Calls"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345386597
updated_date: 2026-01-08T21:13:23Z
last_sync: 2026-01-09T14:04:48.391014
authors:
  - "Noah Moss"
---

# Enable/Disable Scheduled Calls

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345386597)

---

## Description

As a caregiver, I want to enable or disable individual calls so that I can pause them without deleting.Functional Requirements-  Enable/Disable ToggleGiven schedule card displayed, When viewing, Then toggle switch shown
- Toggle states:ON (enabled): Green, &#34;Enabled&#34;
- OFF (disabled): Gray, &#34;Disabled&#34;
- Toggle InteractionGiven toggle in enabled state, When user clicks, Then:Toggle switches to disabled
- Confirmation tooltip: &#34;This call is now paused and won't happen until you re-enable it&#34;
- Schedule card visually dimmed or grayed out
- Given toggle in disabled state, When user clicks, Then:Toggle switches to enabled
- Success toast: &#34;Schedule re-enabled&#34;
- Schedule card returns to normal appearance
-  Disabled Schedule BehaviorGiven schedule disabled, When scheduler runs, Then skip this schedule (do not initiate calls)
- Given schedule disabled, When viewing card, Then show: &#34;Paused - No calls will be made until re-enabled&#34;
Testing Requirements-  E2E test: User disables schedule, toggle updates
-  E2E test: Disabled schedule doesn't trigger calls
-  E2E test: User re-enables schedule, calls resume
