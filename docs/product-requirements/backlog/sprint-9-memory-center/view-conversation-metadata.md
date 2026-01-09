---
wrike_id: MAAAAAEDAd8q
title: "View Conversation Metadata"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345421610
updated_date: 2026-01-08T21:31:24Z
last_sync: 2026-01-09T14:04:48.392806
authors:
  - "Noah Moss"
---

# View Conversation Metadata

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345421610)

---

## Description

As a caregiver, I want to see date, time, duration, and call type for each conversation so that I understand the context.Functional Requirements-  Metadata Display (Covered in MEM-001)Date, time, duration, call type shown in list view
-  Detail View MetadataGiven user clicks &#34;View Details&#34;, When conversation detail page loads, Then full metadata displayed:Call date: &#34;Wednesday, January 8, 2026&#34;
- Call time: &#34;9:15 AM - 9:19 AM Eastern Time&#34;
- Duration: &#34;4 minutes 32 seconds&#34;
- Call type: &#34;Scheduled: Morning Check-in&#34; or &#34;User-initiated&#34;
- Status: &#34;Completed successfully&#34; (with icon)
- Participants: &#34;Dorothy Williams and Aaron Smith (AI Companion)&#34;
-  Additional Context (If Available)Given scheduled call, When viewing, Then show:Scheduled topic: &#34;Topic: Discuss gardening&#34;
- Retry attempt (if applicable): &#34;This was retry #2 (previous attempts missed)&#34;
Testing Requirements-  E2E test: Conversation detail shows all metadata
