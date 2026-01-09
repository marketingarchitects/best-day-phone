---
wrike_id: MAAAAAEDAKGg
title: "View Linked Device Info"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345340320
updated_date: 2026-01-08T20:28:13Z
last_sync: 2026-01-09T14:04:48.386702
authors:
  - "Noah Moss"
---

# View Linked Device Info

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345340320)

---

## Description

As a caregiver, I want to view my currently linked device info so that I can confirm it's connected.Functional Requirements- Device Status PageGiven user has linked device, When navigating to /dashboard/device, Then device info displayed:Device model (e.g., &#34;Best Day Phone 5G&#34;)
- UUID (formatted with hyphens)
- Link date (formatted: &#34;Linked on January 8, 2026&#34;)
- Status indicator (see [DEV-007](https://www.wrike.com/open.htm?id&#61;4345340529))
- Firmware version
- &#34;Unlink Device&#34; button
- No Device Linked StateGiven user has no linked device, When viewing page, Then show:&#34;No device linked&#34;
- &#34;Link a Device&#34; button (goes to [DEV-001](https://www.wrike.com/open.htm?id&#61;4345340052) flow)
Testing Requirements-  E2E test: User with linked device sees device info
-  E2E test: User without linked device sees prompt to link
