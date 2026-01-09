---
wrike_id: MAAAAAEDAT5T
title: "Set Call as One-Time or Repeating"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345380435
updated_date: 2026-01-08T21:19:39Z
last_sync: 2026-01-09T14:04:48.389369
authors:
  - "Noah Moss"
---

# Set Call as One-Time or Repeating

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345380435)

---

## Description

As a caregiver, I want to set a call as one-time or repeating so that I can schedule regular check-ins.Functional Requirements- Frequency Selection (Step 2, below time)Given user on step 2, When viewing, Then frequency toggle displayed:
- Radio buttons:&#34;One-time call&#34; (shows date picker)
- &#34;Repeating call&#34; (shows day selector)
- One-Time CallGiven &#34;One-time call&#34; selected, When active, Then date picker shown:Label: &#34;When should this call happen?&#34;
- Date picker (calendar UI): MM/DD/YYYY
- Minimum date: Today
- Maximum date: 1 year from today
- Validation: Date must be in future (or today)
-  Repeating CallGiven &#34;Repeating call&#34; selected, When active, Then day selector shown (see [SCHED-004](https://www.wrike.com/open.htm?id&#61;4345380939))
-  Default SelectionDefault: &#34;Repeating call&#34; selected (most common use case)
Testing Requirements-  E2E test: User selects one-time, picks date, proceeds
-  E2E test: User selects repeating, sees day selector
-  Unit test: Date validation (past dates rejected)
