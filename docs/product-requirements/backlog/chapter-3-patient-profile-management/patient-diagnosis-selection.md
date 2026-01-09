---
wrike_id: MAAAAAEC_HfF
title: "Patient Diagnosis Selection"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345067461
updated_date: 2026-01-08T16:53:58Z
last_sync: 2026-01-09T14:04:48.378426
authors:
  - "Noah Moss"
---

# Patient Diagnosis Selection

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345067461)

---

## Description

As a caregiver, I want to select or enter the patient's diagnosis so that the AI understands their condition.Functional Requirements-  Diagnosis Input UIGiven user on profile form, When viewing diagnosis section, Then multi-select dropdown displayed
- Label: &#34;Diagnosis/Condition(s)&#34; with helper text: &#34;Select all that apply. This helps the AI communicate appropriately.&#34;
-  Common Diagnoses (Pre-populated)Dropdown includes options:Alzheimer's Disease
- Dementia (General)
- Vascular Dementia
- Lewy Body Dementia
- Frontotemporal Dementia
- Mild Cognitive Impairment (MCI)
- Parkinson's Disease
- Memory Loss (Unspecified)
- Anxiety
- Depression
- Loneliness/Social Isolation
- Other (triggers free text field)
-  Multiple SelectionGiven dropdown opened, When user clicks options, Then multiple selections allowed
- Selected items shown as pills/tags below dropdown with × remove button
- Max 5 diagnoses selectable
-  &#34;Other&#34; Free TextGiven &#34;Other&#34; selected, When chosen, Then text input appears: &#34;Please specify&#34;
- Free text max 100 chars
- Validation: Not empty if &#34;Other&#34; selected
-  Optional FieldField not required (some caregivers may skip)
- Given no diagnosis selected, When form saved, Then AI uses generic supportive conversation style
AI Context Integration-  Given Alzheimer's/Dementia selected, When AI conversation, Then context includes:
- Medical Context:
- - Patient has Alzheimer's Disease
- - Be patient with repetition
- - Focus on long-term memories (childhood, early adulthood)
- - Avoid complex or multi-step questions
- - Do not correct patient if they misremember recent events
-  Given Anxiety/Depression selected, When AI conversation, Then context includes:
- Medical Context:
- - Patient experiences anxiety
- - Use calm, reassuring tone
- - Avoid stressful or controversial topics
- - Offer positive, uplifting conversation
Privacy & Compliance-  HIPAA consideration: Diagnosis data encrypted at rest
-  User consent: &#34;This information is used only to personalize conversations and is protected under our Privacy Policy&#34;
Testing Requirements-  Unit test: Multi-select logic handles 0-5 selections
-  Integration test: Diagnoses save and retrieve correctly
-  E2E test: User selects multiple diagnoses, saves, sees pills displayed
-  E2E test: &#34;Other&#34; option shows text field and saves custom value
