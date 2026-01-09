---
wrike_id: MAAAAAEDAdJj
title: "View Past Conversation List"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345418339
updated_date: 2026-01-08T21:30:22Z
last_sync: 2026-01-09T14:04:48.392485
authors:
  - "Noah Moss"
---

# View Past Conversation List

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345418339)

---

## Description

As a caregiver, I want to view a list of past conversations so that I can review what was discussed.Functional Requirements-  Memory Center PageGiven user navigates to /dashboard/memory-center, When page loads, Then conversation history displayed
- Page title: &#34;Memory Center&#34; with subtitle: &#34;Review past conversations with your patient&#34;
-  Conversation List DisplayGiven conversations exist, When viewing, Then each conversation shown as card/row:Date (formatted: &#34;January 8, 2026&#34;)
- Time (formatted: &#34;9:15 AM&#34;)
- Call type icon & label:&#x1f4de; &#34;Scheduled: Morning Check-in&#34; (if from schedule)
- &#x1f4de; &#34;User-initiated call&#34; (if patient lifted handset)
- Duration (formatted: &#34;4m 32s&#34;)
- Status indicator:✅ &#34;Completed&#34; (normal end)
- ⚠️ &#34;Incomplete&#34; (hung up early, connection issue)
- &#x1f4f5; &#34;Missed&#34; (no answer)
- Summary preview (first 100 chars): &#34;Dorothy and Aaron discussed her garden. She mentioned...&#34;
- &#34;View Details&#34; button
-  Empty StateGiven no conversations exist, When viewing, Then show:&#34;No conversations yet&#34;
- &#34;Once your patient has calls, they'll appear here for you to review&#34;
-  PaginationGiven more than 20 conversations, When viewing, Then paginate:Show 20 per page
- &#34;Load More&#34; button or standard pagination controls
- Page numbers: 1, 2, 3...
Testing Requirements-  E2E test: User with conversations sees list
-  E2E test: Empty state shows when no conversations
-  E2E test: Pagination works correctly
-  Integration test: Conversations sorted by date descending
