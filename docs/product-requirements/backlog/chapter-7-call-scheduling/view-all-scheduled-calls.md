---
wrike_id: MAAAAAEDAUs4
title: "View All Scheduled Calls"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345383736
updated_date: 2026-01-08T21:24:48Z
last_sync: 2026-01-09T14:04:48.390532
authors:
  - "Noah Moss"
---

# View All Scheduled Calls

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345383736)

---

## Description

As a caregiver, I want to view all scheduled calls in a list so that I can manage them.Functional Requirements-  Schedule List PageGiven user on /dashboard/scheduling, When page loads, Then list of scheduled calls displayed
- Given no schedules exist, When page loads, Then empty state shown:Illustration or icon
- &#34;No scheduled calls yet&#34;
- &#34;Create your first scheduled call to get started&#34;
- &#34;Create New Schedule&#34; button
-  Schedule List DisplayGiven schedules exist, When viewing, Then each schedule shown as card:Call name (bold, large)
- Time: &#34;9:00 AM Eastern Time&#34;
- Frequency: &#34;Repeats every Mon, Wed, Fri&#34; or &#34;One-time on Jan 15, 2026&#34;
- Topic (if specified): &#34;Topic: Discuss gardening&#34;
- Status: Enabled/Disabled toggle switch
- Next scheduled call: &#34;Next call: Tomorrow at 9:00 AM&#34; (for repeating) or &#34;Scheduled for: Jan 15 at 9:00 AM&#34; (for one-time)
- Actions: Edit button, Delete button, Test button 
-  Sorting OptionsDefault sort: Next scheduled call (soonest first)
- Sort dropdown: &#34;Next Call&#34;, &#34;Name (A-Z)&#34;, &#34;Recently Created&#34;
- Given user changes sort, When selected, Then list re-orders
-  FilteringFilter by status: &#34;All&#34;, &#34;Enabled&#34;, &#34;Disabled&#34;
- Given filter applied, When selected, Then list shows only matching schedules
Testing Requirements-  E2E test: User with schedules sees list
-  E2E test: Empty state shows when no schedules
-  E2E test: Sort and filter work correctly
-  Unit test: Next call calculation accurate
