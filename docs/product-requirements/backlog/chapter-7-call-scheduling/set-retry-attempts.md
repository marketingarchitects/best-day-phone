---
wrike_id: MAAAAAEDAUmj
title: "Set Retry Attempts"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345383331
updated_date: 2026-01-08T21:21:42Z
last_sync: 2026-01-09T14:04:48.390250
authors:
  - "Noah Moss"
---

# Set Retry Attempts

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345383331)

---

## Description

As a caregiver, I want to set retry attempts for missed calls so that the patient has another chance to answer.Functional Requirements-  Retry Settings (Step 3)Given user on step 3, When viewing, Then retry selector displayed:Label: &#34;If the patient doesn't answer, how many times should we retry?&#34;
- Dropdown or slider: 0, 1, 2, 3 attempts
- Default: 1 retry
- Helper text: &#34;Retries happen 5 minutes after the previous attempt&#34;
-  Retry ExplanationInfo icon with tooltip: &#34;If the patient doesn't pick up the phone within ~3 minutes (10 rings), we'll mark it as missed. If retries are enabled, we'll call back after a short wait.&#34;
Backend Requirements-  Given retry setting saved, When stored, Then:Store in scheduled_calls.max_retry_attempts (INT, 0-3)
- Store in scheduled_calls.retry_interval_minutes (INT, default: 5)
Call Retry Logic-  Given scheduled call missed, When patient doesn't answer, Then:
- Log in call_attempts table:scheduled_call_id, attempt_number (1), status: 'missed', attempted_at
- Given retries remaining, When checked, Then schedule retry:Wait retry_interval_minutes (5 min)
- Increment attempt_number (2)
- Initiate call again
- Given max retries reached, When all missed, Then:Mark scheduled call execution as fully_missed
- Log to Memory Center as missed call
- Send notification to caregiver
Testing Requirements-  Unit test: Retry logic respects max attempts
-  Integration test: Missed call schedules retry after 5 minutes
-  Integration test: Fully missed call after max retries triggers notification
