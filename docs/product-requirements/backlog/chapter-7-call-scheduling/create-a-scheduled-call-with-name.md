---
wrike_id: MAAAAAEDATvU
title: "Create a Scheduled Call with Name"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345379796
updated_date: 2026-01-09T18:06:51Z
last_sync: 2026-01-09T14:04:48.388735
authors:
  - "Noah Moss"
---

# Create a Scheduled Call with Name

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345379796)

---

## Description

As a caregiver, I want to create a scheduled call with a name (e.g., 'Morning Check-in') so that I can identify it easily.Functional Requirements-  Scheduling Page AccessGiven authenticated user with linked device, When navigating to /dashboard/scheduling, Then scheduling page displayed
- Page title: &#34;Call Schedule&#34; with subtitle: &#34;Set up regular calls for your patient&#34;
- &#34;Create New Schedule&#34; button prominent
- Create Schedule ModalGiven user clicks &#34;Create New Schedule&#34;, When clicked, Then modal opens with form:Call Name (text input, max 50 chars, required)
- Placeholder: &#34;e.g., Morning Check-in, Evening Chat, Weekly Catch-up&#34;
- Helper text: &#34;Give this scheduled call a name you'll recognize&#34;
- Name ValidationGiven user enters call name, When validating, Then check:Not empty: &#34;Call name is required&#34;
- Max 50 chars: &#34;Call name must be 50 characters or less&#34;
- Not duplicate: &#34;You already have a call with this name. Please choose a different name.&#34;
- Form Wizard
- Schedule creation as multi-step wizard:Step 1: Name 
- Step 2: Time & Frequency 
- Step 3: Topic & Settings 
- Step 4: Review & Create
- Progress indicator shows current step
-  Per-Device Rate LimitsGiven authenticated device, When making API requests, Then limit 100 requests per minute per device
- Given limit exceeded, When request received, Then return 429 Too Many Requests with JSON: {&#34;error&#34;: &#34;Rate limit exceeded&#34;, &#34;retryAfter&#34;: 45}
- Given limit exceeded, Call ends gracefully with a canned &#34;Sorry, I need to go, goodbye&#34;, this should never trigger from normal use but if do to logic error it is triggered this wont confuse or upset the user
-  Per-Endpoint Rate LimitsConversation initiation: 30/hour per device
- Profile updates: 50/hour per user account
- Device registration: 5/hour per IP address
Implementation Requirements-  Rate limiting implemented with sliding window algorithm
-  Rate limit counters reset appropriately per time window
-  Rate limits configurable via environment variables without code changes
Monitoring-  Rate limit violations logged with device UUID, endpoint, timestamp
-  Dashboard shows top rate-limited devices and endpoints
-  Alert triggered if single device exceeds limit 3&#43; times in 1 hour
Testing Requirements-  Unit test: Name validation logic (empty, length, duplicates)
-  E2E test: User enters call name, proceeds to next step
-  E2E test: Duplicate name shows error
