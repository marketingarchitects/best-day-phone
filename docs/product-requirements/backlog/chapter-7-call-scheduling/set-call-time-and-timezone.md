---
wrike_id: MAAAAAEDATzj
title: "Set Call Time and Timezone"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345380067
updated_date: 2026-01-08T21:17:13Z
last_sync: 2026-01-09T14:04:48.389050
authors:
  - "Noah Moss"
---

# Set Call Time and Timezone

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345380067)

---

## Description

As a caregiver, I want to set a call time and timezone so that calls happen at the right time.Functional Requirements- Time Selection UI (Step 2)Given user on step 2, When viewing, Then time picker displayed:Label: &#34;What time should the call happen?&#34;
- Time input: 12-hour format with AM/PM selector or dropdown
- 15-minute increment options: 8:00 AM, 8:15 AM, 8:30 AM, etc.
- Suggested times highlighted: 9:00 AM, 12:00 PM, 3:00 PM, 6:00 PM
- Timezone SelectionGiven time picker shown, When viewing, Then timezone dropdown displayed:Label: &#34;Timezone&#34;
- Options: All US timezones with GMT offset:Eastern Time (GMT-5)
- Central Time (GMT-6)
- Mountain Time (GMT-7)
- Pacific Time (GMT-8)
- Alaska Time (GMT-9)
- Hawaii Time (GMT-10)
- Default: Patient's timezone from profile
- Time Display PreviewGiven time and timezone selected, When chosen, Then show preview:&#34;Calls will happen at 9:00 AM Eastern Time&#34;
- If caregiver in different timezone: &#34;That's 6:00 AM in your timezone (Pacific)&#34;
-  ValidationGiven user clicks &#34;Next&#34;, When validating, Then check:Time selected: &#34;Please select a call time&#34;
- Timezone selected: &#34;Please select a timezone&#34;
Testing Requirements-  Unit test: Time conversion to UTC accurate
-  Unit test: DST transitions handled correctly
-  E2E test: User selects time/timezone, sees preview
-  Integration test: Scheduled call time stored in UTC
