---
wrike_id: MAAAAAEC3_wn
title: "User Login"
status: Active
importance: Normal
due: 2026-01-20
permalink: https://www.wrike.com/open.htm?id=4343200807
updated_date: 2026-01-09T17:12:26Z
last_sync: 2026-01-09T14:04:48.400061
assignees:
  - "John Ryan Cottam"
  - "Isaiah Britto"
  - "Andrew Aldrich"
  - "Alex Berkowitz"
authors:
  - "Noah Moss"
---

# User Login

**Status:** 🟢 Active
**Due:** 2026-01-20
**Assignees:** John Ryan Cottam, Isaiah Britto, Andrew Aldrich, Alex Berkowitz
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4343200807)

---

## Description

As a user, I want to log in with my email and password so that I can access my account.Functional Requirements-  Login FormGiven user on /login page, When page loads, Then form displays:Email (email input, required)
- Password (password input, required)
- &#34;Remember me&#34; (checkbox, optional)
- &#34;Forgot password?&#34; link
- &#34;Log In&#34; button
- &#34;Don't have an account? Sign up&#34; link
- Given successful login (200), When response received, Then:User redirected to /dashboard
- &#34;Remember me&#34; sets cookie expiry to 30 days; otherwise session-only
- Given invalid credentials (401), When response received, Then show error: &#34;Invalid email or password&#34;
- Given unverified email (403), When response received, Then show error: &#34;Please verify your email address. <a href&#61;'/resend-verification'>Resend verification email</a>&#34;
Security Requirements-  Rate limiting: 5 failed login attempts per email per 15 minutes
-  Rate limiting: 10 failed login attempts per IP per 15 minutes
-  Failed login does not reveal if email exists
-  Timing attack mitigation: constant-time password comparison
-  Account locked after 15 failed attempts within 1 hour (unlock after 1 hour or via email)
Testing Requirements-  E2E test: Successful login redirects to dashboard
-  E2E test: Invalid credentials show error
-  E2E test: Unverified email blocks login
-  Security test: Rate limiting enforced
-  Security test: Session token validates correctly
