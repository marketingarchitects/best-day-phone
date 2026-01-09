---
wrike_id: MAAAAAEC3_7-
title: "User Logout"
status: Active
importance: Normal
due: 2026-01-20
permalink: https://www.wrike.com/open.htm?id=4343201534
updated_date: 2026-01-09T17:12:33Z
last_sync: 2026-01-09T14:04:48.399663
assignees:
  - "John Ryan Cottam"
  - "Isaiah Britto"
  - "Andrew Aldrich"
  - "Alex Berkowitz"
authors:
  - "Noah Moss"
---

# User Logout

**Status:** 🟢 Active
**Due:** 2026-01-20
**Assignees:** John Ryan Cottam, Isaiah Britto, Andrew Aldrich, Alex Berkowitz
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4343201534)

---

## Description

As a user, I want to log out of my account so that I can secure my session.Functional Requirements-  Logout ButtonGiven authenticated user on any page, When page loads, Then &#34;Log Out&#34; button visible in user menu/nav
- When user clicks &#34;Log Out&#34;, log the user out
- Then user redirected to /login with pop up message &#34;You've been logged out&#34;
Security Requirements-  Logout endpoint does not require CSRF token (GET or POST acceptable)
-  All client-side tokens/sensitive data cleared from localStorage/sessionStorage
Testing Requirements-  E2E test: User logs out and cannot access protected route
-  E2E test: Logged out user redirected to login when accessing dashboard
