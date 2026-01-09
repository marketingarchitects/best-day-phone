---
wrike_id: MAAAAAEDAKJx
title: "Device Status Indicator"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345340529
updated_date: 2026-01-08T20:23:05Z
last_sync: 2026-01-09T14:04:48.387231
authors:
  - "Noah Moss"
---

# Device Status Indicator

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345340529)

---

## Description

### As a caregiver, I want to see device status (online/offline/last seen) so that I know if it's working.
Functional Requirements- Status Indicator DisplayGiven device linked, When viewing device info, Then status indicator shown with icon and text:Online: &#x1f7e2; &#34;Online&#34; (device pinged within last 5 minutes)
- Offline: &#x1f534; &#34;Offline&#34; (device not pinged in 5&#43; minutes)
- Last seen timestamp: &#34;Last seen: 2 minutes ago&#34; or &#34;Last seen: January 8 at 3:45 PM&#34;
- Status RefreshGiven user viewing device page, When page open, Then status refreshes every 30 seconds automatically
- Manual refresh button available: &#34;Refresh Status&#34;
- Offline AlertGiven device offline > 24 hours, When user views page, Then show alert banner:&#34;⚠️ Your device has been offline for more than 24 hours. Check power and internet connection, or contact support.&#34;
Device Heartbeat-  Given device online, When heartbeat interval reached, Then device sends:POST .../{uuid}/heartbeat
- Updates last_seen_at timestamp
- Returns any pending configuration updates
Testing Requirements-  Integration test: Heartbeat updates last_seen_at
-  E2E test: Online status displays correctly
-  E2E test: Offline status shows when device inactive
-  E2E test: Status auto-refreshes
