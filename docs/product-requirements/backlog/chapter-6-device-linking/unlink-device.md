---
wrike_id: MAAAAAEDAKH7
title: "Unlink Device"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345340411
updated_date: 2026-01-08T20:25:51Z
last_sync: 2026-01-09T14:04:48.386956
authors:
  - "Noah Moss"
---

# Unlink Device

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345340411)

---

## Description

As a caregiver, I want to unlink my device with confirmation so that I can link a different device.Functional Requirements- Unlink ButtonGiven device info displayed, When user clicks &#34;Unlink Device&#34;, Then confirmation modal appears:&#34;Unlink this device from your account?&#34;
- &#34;This will disconnect the device. You can link a different device afterward.&#34;
- &#34;Scheduled calls will be paused until you link a new device.&#34;
- &#34;Cancel&#34; and &#34;Unlink Device&#34; buttons (destructive red style)
- Unlink ActionGiven user confirms unlink, When clicked, Then DELETE to /api/devices/{uuid}/link
- Then show loading spinner
- Success FlowGiven unlink successful, When complete, Then:Show success toast: &#34;Device unlinked&#34;
- Page updates to &#34;No device linked&#34; state
- &#34;Link a Device&#34; button available
- Device NotificationGiven device unlinked, When device next polls, Then device plays audio: &#34;Your device has been unlinked. Please visit the portal to link it again.&#34;
Testing Requirements-  Integration test: Unlink clears device associations
-  Integration test: Scheduled calls paused after unlink
-  E2E test: User unlinks device, sees success message
-  E2E test: Device status updates after unlink
