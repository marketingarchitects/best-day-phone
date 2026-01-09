---
wrike_id: MAAAAAEDAUBL
title: "Select Days for Repeating Calls"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345380939
updated_date: 2026-01-08T21:15:07Z
last_sync: 2026-01-09T14:04:48.389683
authors:
  - "Noah Moss"
---

# Select Days for Repeating Calls

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345380939)

---

## Description

As a caregiver, I want to select specific days for repeating calls so that the schedule fits the patient's routine.Functional Requirements- Day Selection UIGiven &#34;Repeating call&#34; selected, When viewing, Then day selector displayed:Label: &#34;Which days should calls repeat?&#34;
- 7 toggle buttons (pill style): Sun | Mon | Tue | Wed | Thu | Fri | Sat
- Multiple selection allowed
- At least 1 day required
- Day Selection BehaviorGiven user clicks day button, When clicked, Then toggle state:Unselected → Selected: Button highlighted (primary color)
- Selected → Unselected: Button returns to default style
- Given no days selected, When user clicks &#34;Next&#34;, Then show error: &#34;Please select at least one day for repeating calls&#34;
- Quick Selection OptionsGiven day selector shown, When viewing, Then quick select buttons above:&#34;Every Day&#34; (selects all 7)
- &#34;Weekdays&#34; (selects Mon-Fri)
- &#34;Weekends&#34; (selects Sat-Sun)
- &#34;Clear All&#34; (deselects all)
- Schedule PreviewGiven days selected, When chosen, Then show preview:&#34;Calls will happen every Monday, Wednesday, Friday at 9:00 AM Eastern Time&#34;
Call Scheduling Logic-  Given repeating call configured, When scheduler runs, Then:Check if today's day-of-week in repeat_days
- Check if current time >&#61; call_time_utc (converted to UTC)
- If match and not already triggered today, initiate call
Testing Requirements-  E2E test: User selects multiple days, sees preview
-  E2E test: Quick select &#34;Weekdays&#34; selects Mon-Fri
-  Unit test: Repeat days stored correctly
-  Integration test: Scheduler triggers on correct days
