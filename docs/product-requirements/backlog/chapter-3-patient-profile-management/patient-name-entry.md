---
wrike_id: MAAAAAEC_HTp
title: "Patient Name Entry"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345066729
updated_date: 2026-01-08T17:00:05Z
last_sync: 2026-01-09T14:04:48.377733
authors:
  - "Noah Moss"
---

# Patient Name Entry

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345066729)

---

## Description

As a caregiver, I want to enter the patient's first and last name so that the AI knows who it's speaking with.Functional Requirements-  Profile Form AccessGiven authenticated user with active subscription, When navigating to /dashboard/patient-profile, Then patient profile form displayed
- Given new account, When first accessing dashboard, Then onboarding modal prompts: &#34;Let's set up your patient's profile&#34;
- Name Input FieldsGiven user on profile form, When page loads, Then form displays:&#34;Patient's First Name&#34; (text input, max 50 chars, required)
- &#34;Patient's Last Name&#34; (text input, max 50 chars, required)
- Label clarification: &#34;This is the person who will receive calls through the Best Day Phone&#34;
- Client-Side ValidationGiven user enters first name, When field loses focus, Then validate:Not empty: &#34;Patient's first name is required&#34;
- Only letters, spaces, hyphens, apostrophes: &#34;Please use only letters and common punctuation&#34;
- Length 1-50 chars: &#34;Name must be between 1 and 50 characters&#34;
- Same validation for last name
- Form Submission
- Given valid names entered, When user clicks &#34;Save&#34;,Show success toast: &#34;Patient profile updated&#34;
- Then form remains open for additional field entry (age, diagnosis, etc.)
AI Context Integration-  Given patient profile saved, When AI conversation initiated, Then context includes:
- Patient Information:
- - Name: Dorothy Williams
- - Preferred address: Dorothy (or as specified in preferences)
Testing Requirements-  Unit test: Name validation logic (valid/invalid inputs)
-  Integration test: Profile update persists to database
-  E2E test: User enters names, saves, and sees success message
-  Security test: User cannot update another user's profile
