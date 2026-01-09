---
wrike_id: MAAAAAEC_hKq
title: "Enter Device UUID"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345172650
updated_date: 2026-01-08T20:42:50Z
last_sync: 2026-01-09T14:04:48.385770
authors:
  - "Noah Moss"
---

# Enter Device UUID

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345172650)

---

## Description

As a caregiver, I want to enter my device's UUID to link it to my account so that the phone works with my setup.Functional Requirements-  Device Linking PageGiven user with active subscription, When navigating to /dashboard/device-linking, Then device linking form displayed
- Page title: &#34;Link Your Best Day Phone&#34;
- Wizard steps indicator: 1. Enter UUID → 2. Confirm → 3. Complete
- UUID Input FieldGiven step 1 shown, When viewing, Then form displays:Label: &#34;Device UUID&#34; with helper text: &#34;Find this on the bottom of your device or on the screen after connecting to WiFi.&#34;
- Text input (16-character alphanumeric, auto-format with hyphens: XXXX-XXXX-XXXX-XXXX)
- Input uppercase auto-converted
- &#34;Where do I find this?&#34; link (opens [DEV-002](https://www.wrike.com/open.htm?id&#61;4345339882) instructions)
-  UUID ValidationGiven user enters UUID, When typing, Then auto-format with hyphens every 4 characters
- Given UUID complete, When field loses focus, Then validate:Exactly 16 alphanumeric characters (after removing hyphens)
- Not all zeros or obviously invalid (e.g., &#34;0000-0000-0000-0000&#34;)
- Given invalid format, When detected, Then show error: &#34;Please enter a valid 16-character UUID&#34;
-  UUID Availability CheckGiven valid UUID entered, When user clicks &#34;Next&#34;, Then check UUID availability
- Given UUID already linked to another account, When checked, Then show error: &#34;This device is already linked to another account. Please contact support if you believe this is an error.&#34;
- Given UUID not found in system, When checked, Then show error: &#34;Device not found. Please check your UUID and try again.&#34;
- Given UUID available, When checked, Then proceed to [step 2](https://www.wrike.com/open.htm?id&#61;4345340052) 
Backend Requirements-  Given UUID check requested, When processing, Then:GET .../{uuid}/availability
- Check devices table for UUID
- Check if linked_user_id IS NULL
- Return:Available: {&#34;available&#34;: true, &#34;deviceInfo&#34;: {&#34;model&#34;: &#34;5G&#34;, &#34;firmwareVersion&#34;: &#34;1.0.2&#34;}}
- Already linked: {&#34;available&#34;: false, &#34;error&#34;: &#34;already_linked&#34;}
- Not found: {&#34;available&#34;: false, &#34;error&#34;: &#34;not_found&#34;}
Testing Requirements-  Unit test: UUID formatting logic
-  Unit test: UUID validation rules
-  Integration test: UUID availability check queries database correctly
-  E2E test: User enters valid UUID, proceeds to next step
-  E2E test: Already-linked UUID shows error
