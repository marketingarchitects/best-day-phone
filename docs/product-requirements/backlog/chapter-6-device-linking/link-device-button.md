---
wrike_id: MAAAAAEDAKCU
title: "Link Device Button"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345340052
updated_date: 2026-01-08T20:34:21Z
last_sync: 2026-01-09T14:04:48.386390
authors:
  - "Noah Moss"
---

# Link Device Button

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345340052)

---

## Description

### 
As a caregiver, I want to click a button to link my device so that the connection is established.Functional Requirements- Confirmation Step (Step 2 in the 'Enter Device UUID process')Given UUID validated, When step 2 shown, Then display:&#34;Link this device to your account?&#34;: A clear CTA the user must click on
- Device info: Model, firmware version
- Patient name (from profile)
- Warning: &#34;Once linked, this device can only be used with this Best Day Phone account until unlinked.&#34;
- &#34;Cancel&#34; and &#34;Link Device&#34; buttons
- Given the 'Link this device...' CTA is clicked upon, show loading spinner: &#34;Linking device...&#34;Given user already has linked device, When attempting to link another, Then return 400: &#34;You already have a linked device. Please unlink it first.&#34;
- Success Flow (Step 3)Given link successful, When complete, Then show success screen:&#34;Device linked successfully!&#34;
- &#34;Your Best Day Phone is now connected to your account.&#34;
- Device info summary
- Next steps: &#34;Your device will receive your patient profile within 5 minutes. You can now schedule calls from the dashboard.&#34;
- &#34;Go to Dashboard&#34; button
-  Error FlowGiven link fails, When error occurs, Then show error:&#34;Failed to link device. Please try again or contact support.&#34;
- &#34;Try Again&#34; button returns to step 1
Device Communication-  Given device linked, When device next polls server, Then:Device receives registration status: &#34;registered&#34;
- Device receives patient profile data
- Device ready to make/receive calls
Testing Requirements-  Integration test: Link request creates database records
-  Integration test: Device sync triggered after linking
-  E2E test: User completes link flow, sees success screen
-  E2E test: Second device link attempt shows error
-  Integration test: Email sent after successful link
