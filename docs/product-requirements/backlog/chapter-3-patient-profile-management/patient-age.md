---
wrike_id: MAAAAAEC_HYK
title: "Patient Age"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345067018
updated_date: 2026-01-08T16:57:01Z
last_sync: 2026-01-09T14:04:48.378089
authors:
  - "Noah Moss"
---

# Patient Age

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345067018)

---

## Description

As a caregiver, I want to enter the patient's age or date of birth so that the AI can have age-appropriate conversations.Functional Requirements-  Age/DOB Input OptionsGiven user on profile form, When viewing age section, Then two input options displayed:Radio button: &#34;Enter Date of Birth&#34;
- Radio button: &#34;Enter Age Range&#34;
- Given &#34;Date of Birth&#34; selected, When active, Then show date picker (MM/DD/YYYY format)
- Given &#34;Age Range&#34; selected, When active, Then show dropdown: &#34;60-64&#34;, &#34;65-69&#34;, &#34;70-74&#34;, &#34;75-79&#34;, &#34;80-84&#34;, &#34;85-89&#34;, &#34;90&#43;&#34;
- Date of Birth ValidationGiven DOB entered, When validating, Then check:Date is in the past: &#34;Date of birth must be in the past&#34;
- Date results in age under 18: &#34;Patient must be 18 or older&#34;
- Date results in age > 120: &#34;Please enter a valid date of birth&#34;
- Age automatically calculated from DOB for display: &#34;Age: 78&#34;
-  Age Range ValidationGiven age range selected from dropdown, When saved, Then store range value (not exact age)
- Display age range on profile summary: &#34;Age: 75-79&#34;
-  Privacy ConsiderationHelper text: &#34;We use this for age-appropriate conversations. Your exact date of birth is never shared.&#34;
AI Context Integration-  Given DOB saved, When AI conversation initiated, Then context includes:
- Patient Information:
- - Age: 78 years old
- - Age-appropriate communication: Use references to 1940s-1950s childhood, 1960s young adulthood
-  Given age range saved, When AI conversation, Then context includes:
- Patient Information:
- - Approximate age: 75-79 years old
- - Adjust conversational references accordingly
Testing Requirements-  Unit test: Age calculation from DOB accurate
-  Unit test: Age range validation works
-  Integration test: DOB and age range store correctly
-  E2E test: User selects DOB, saves, sees age displayed
-  E2E test: User selects age range, saves, sees range displayed
