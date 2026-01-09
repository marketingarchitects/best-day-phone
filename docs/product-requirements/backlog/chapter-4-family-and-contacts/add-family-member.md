---
wrike_id: MAAAAAEC_UY-
title: "Add Family Member"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345120318
updated_date: 2026-01-08T17:04:52Z
last_sync: 2026-01-09T14:04:48.376072
authors:
  - "Noah Moss"
---

# Add Family Member

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345120318)

---

## Description

As a caregiver, I want to add family members to the patient's profile so that the AI can reference them.Functional Requirements-  Family Members SectionGiven user on profile form, When viewing family section, Then &#34;Add Family Member&#34; button displayed
- Label: &#34;Family & Contacts&#34; with helper text: &#34;Help us know who's important in the patient's life.&#34;
- Add Family Member FormGiven user clicks &#34;Add Family Member&#34;, When clicked, Then modal opens with fields:First Name (text, max 50 chars, required)
- Last Name (text, max 50 chars, required)
- Relationship (dropdown, required): Spouse, Partner, Son, Daughter, Grandson, Granddaughter, Sibling, Niece, Nephew, Friend, Caregiver, Other
- Phone Number (tel input, E.164 format, optional)
- Email (email input, optional)
- Notes (textarea, max 500 chars, optional): &#34;e.g., Lives nearby, visits weekly&#34;
- Photo (upload, optional, same as for profile photo rules)
-  Form ValidationGiven required fields empty, When user clicks &#34;Add&#34;, Then show inline errors
- Given phone entered, When validating, Then format as (XXX) XXX-XXXX for display, store as &#43;1XXXXXXXXXX
- Given email entered, When validating, Then check valid email format
- Family Member List DisplayGiven family members added, When viewing, Then display as cards:Photo thumbnail (or initials if no photo)
- Name (bold)
- Relationship (subtitle)
- Phone/Email (if provided)
- &#34;Emergency Contact&#34; badge (if designated)
- Edit/Delete buttons
AI Context Integration-  Given family members saved, When AI conversation, Then context includes:
- Patient's Family:
- - Susan (Daughter) - Lives nearby, visits weekly
- - Michael (Son) - Lives in California
- - Emma and Lily (Granddaughters) - Susan's children, ages 8 and 10
- 
- Conversation Strategy:
- - Ask about family members by name: &#34;Have you heard from Susan this week?&#34;
- - Reference relationships: &#34;How are your granddaughters doing?&#34;
- - Use notes for context: &#34;Is Susan still visiting you every week?&#34;
Testing Requirements-  Unit test: Family member validation logic
-  Integration test: Family member CRUD operations
-  E2E test: User adds family member, sees in list
-  E2E test: Family member with photo displays thumbnail
