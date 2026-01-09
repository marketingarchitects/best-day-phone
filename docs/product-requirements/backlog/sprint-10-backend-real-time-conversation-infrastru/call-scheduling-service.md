---
wrike_id: MAAAAAEDAojW
title: "Call Scheduling Service"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345465046
updated_date: 2026-01-08T22:14:12Z
last_sync: 2026-01-09T14:04:48.395784
authors:
  - "Noah Moss"
---

# Call Scheduling Service

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345465046)

---

## Description

As a system, I need a call scheduling service so that automated calls trigger on time.AC1: Check for pending calls every 1 minuteAC2: Create a record with the status: pending, ringing, connected, completed, missed, failedOne-Time vs Repeating Logic-  One-Time CallsGiven one-time call, When date/time reached, Then:Trigger call once
- Mark schedule as executed &#61; TRUE or enabled &#61; FALSE (prevent re-trigger)
- Optionally archive schedule
-  Repeating CallsGiven repeating call, When time reached on matching day, Then:Trigger call
- Update last_executed_at timestamp
- Do NOT trigger again until next matching day
-  Duplicate PreventionGiven call already triggered today, When scheduler runs again, Then:Check call_executions for today's date &#43; schedule_id
- Skip if already exists
Timezone Handling-  Given scheduled call in specific timezone, When scheduler runs, Then:Convert call time from local timezone to UTC for comparison
- Account for DST changes automatically
- Example: 9:00 AM ET &#61; 14:00 UTC (standard time) or 13:00 UTC (daylight time)
Monitoring & Alerting-  Scheduler HealthHeartbeat: Scheduler logs &#34;scheduler_run&#34; every minute
- Alert if scheduler hasn't run in 5&#43; minutes (indicates downtime)
- Dashboard shows: Calls triggered today, Calls pending, Scheduler last run time
-  Missed Schedule DetectionGiven call should have triggered, When 30&#43; minutes past scheduled time, Then:Alert admin: &#34;Scheduled call missed: {scheduleName} for {patientName}&#34;
- Mark execution as failed
- Send notification to caregiver
Testing Requirements-  Unit test: Repeating call logic triggers on correct days
-  Unit test: One-time call triggers once and disables
-  Unit test: Duplicate prevention works
-  Integration test: Scheduler creates call executions correctly
-  Integration test: Retry logic respects max attempts
-  E2E test: Scheduled call triggers device ringing at correct time
-  Performance test: Scheduler handles 10,000&#43; active schedules
