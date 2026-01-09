---
wrike_id: MAAAAAEC3_S9
title: "3. User Create Account"
status: Active
importance: Normal
due: 2026-01-20
permalink: https://www.wrike.com/open.htm?id=4343198909
updated_date: 2026-01-09T18:02:49Z
last_sync: 2026-01-09T14:04:48.400387
assignees:
  - "Andrew Aldrich"
  - "Alex Berkowitz"
  - "Jonathon Vargas"
authors:
  - "Noah Moss"
---

# 3. User Create Account

**Status:** 🟢 Active
**Due:** 2026-01-20
**Assignees:** Andrew Aldrich, Alex Berkowitz, Jonathon Vargas
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4343198909)

---

## Description

As a new user, I want to create an account with my first name, last name, and email so that I can access the service.Functional Requirements-  Registration Form -  It doesn't matter if Stripe handles this or we do...So long as we get user contact info, can create an account for them, accept payment, and allow users to log in.
- Given user on /signup page, When page loads, Then form displays fields shown in the designFirst
- Last
- Phone number
- Billing Address
- Shipping Address
- &#34;I agree to Terms of Service&#34; (checkbox, required)
- Then &#34;Create Account&#34; button disabled until all required fields valid
- Client-Side Validation
- Given user enters first name, When field loses focus, Then show error if:Empty: &#34;First name is required&#34;
- Contains numbers/special chars: &#34;First name must contain only letters&#34;
- Exceeds 50 chars: &#34;First name must be 50 characters or less&#34;
- Same validation for last name
- Given user enters email, When field loses focus, Then show error if:Empty: &#34;Email is required&#34;
- Invalid format: &#34;Please enter a valid email address&#34;
- Password validation shown real-time (see below)
-  Form SubmissionGiven successful registration (201), When response received, Then redirect to /verify-email with message &#34;Check your inbox for verification email&#34;
- Given duplicate email (409), When response received, Then show error above form: &#34;An account with this email already exists. <a href&#61;'/login'>Log in instead?</a>&#34;
- Given network error, When request fails, Then show error: &#34;Something went wrong. Please try again.&#34;
- Password Validation RequirementsMinimum 8 characters
- Maximum 128 characters
- Must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number
- Special characters allowed but not required
- Cannot be common passwords (check against top 10k common passwords list)
- Cannot be same as email address
-  Password Strength IndicatorGiven user typing password, When input changes, Then strength meter updates in real-time
- Visual indicator shows: Weak (red) / Fair (yellow) / Good (light green) / Strong (dark green)
- Below meter, checklist shows:✅/❌ At least 8 characters
- ✅/❌ Contains uppercase letter
- ✅/❌ Contains lowercase letter
- ✅/❌ Contains number
- ✅/❌ Not a common password (checked on blur)
-  Password Visibility ToggleGiven password field, When user clicks eye icon, Then password visible as plain text
- When clicked again, Then password masked again
-  Validation ErrorsGiven weak password, When form submitted, Then prevent submission and show: &#34;Password does not meet security requirements&#34;
- Given password same as email, When validated, Then show: &#34;Password cannot be the same as your email&#34;
Security Requirements-  Common passwords list includes top 10,000 breached passwords
-  Password strength calculation uses zxcvbn or similar library
-  Failed password attempts not revealed to user (no &#34;password too common&#34; on failed login)
Testing Requirements-  E2E test: Complete registration flow with valid data
-  E2E test: Duplicate email shows appropriate error
-  Unit test: Password hashing works correctly
-  Integration test: Database transaction rolls back on error
