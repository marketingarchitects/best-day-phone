---
wrike_id: MAAAAAEC_JsD
title: "Topics to Avoid"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345076483
updated_date: 2026-01-08T16:36:32Z
last_sync: 2026-01-09T14:04:48.380889
authors:
  - "Noah Moss"
---

# Topics to Avoid

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345076483)

---

## Description

As a caregiver, I want to list sensitive topics to avoid so that the AI doesn't use them and upset the patient.Functional Requirements-  Topics to Avoid Tag InputGiven user on profile form, When viewing sensitive topics section, Then tag input displayed
- Label: &#34;Topics to Avoid&#34; with helper text: &#34;List any subjects that might upset or confuse the patient. We will steer conversations away from these topics.&#34;
-  Tag Entry Type topic, press Enter to add
- Display as pills with × to remove
- Max 15 topics
- Each topic max 50 chars
-  Common SuggestionsGiven field focused, When user types, Then autocomplete shows:Politics, Religion, Death, Deceased family members, Money/finances, Health concerns, Current events, Specific people (can specify), War/violence, Specific locations (can specify)
-  Privacy & SensitivityExplanation text: &#34;We take this seriously. Your system is trained to redirect conversations naturally if these topics arise.&#34;
Backend Requirements-  Given topics saved, When stored, Then:
- Store in patient_avoided_topics table:
AI Context Integration-  Given avoided topics saved, When AI conversation, Then system prompt includes:
- CRITICAL INSTRUCTIONS - Topics to Avoid:
- - Do NOT discuss: Politics, Deceased spouse John, Health problems
- - If patient brings up these topics, acknowledge briefly and gently redirect to positive subjects
- - Example redirect: &#34;I understand. Tell me about [positive interest from PP-005]?&#34;
- - Never refuse to engage, but steer conversation to safer topics
Conversation Monitoring- Given AI detects avoided topic in conversation, When detected, Then log event for caregiver review
- Memory Center shows flag: &#34;⚠️ Sensitive topic discussed&#34; (not shown to patient, only caregiver)
Testing Requirements-  Unit test: Topics validation and storage
-  Integration test: Topics save and retrieve correctly
-  E2E test: User adds topics, sees in list
-  AI test: AI avoids discussing listed topics (manual QA or prompt injection test)
