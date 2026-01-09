---
wrike_id: MAAAAAEDAXM6
title: "Call Topic Moderation"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345393978
updated_date: 2026-01-08T21:06:37Z
last_sync: 2026-01-09T14:04:48.391263
authors:
  - "Noah Moss"
---

# Call Topic Moderation

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345393978)

---

## Description

As a system, I need to moderate call topics to prevent medication compliance discussions so that safety is maintained.Functional Requirements- Topic Moderation (Backend)Given user enters call topic, When submitting, Then send topic to LLM moderation API
- Moderation checks for prohibited topics:Medication reminders
- Medication compliance (&#34;Did you take your pills?&#34;)
- Medical advice
- Health directives
- Emergency instructions
- Prohibited Topic DetectionGiven topic contains prohibited content, When detected, Then return 400 error with message:&#34;This topic includes content we cannot support. Best Day Phone cannot remind patients to take medication or provide medical advice. Please choose a different topic.&#34;
- Examples of prohibited:&#34;Remind mom to take her evening pills&#34;
- &#34;Ask if she took her medication today&#34;
- &#34;Check if he's feeling chest pain&#34;
-  Allowed TopicsGeneral wellness: &#34;Ask how they're feeling today&#34; ✅
- Activities: &#34;Discuss their morning walk&#34; ✅
- Memories: &#34;Talk about their teaching career&#34; ✅
- Hobbies: &#34;Ask about their garden&#34; ✅
Backend Suggestions-  Given topic submitted, When validating, Then:
- Call moderation API (OpenAI Moderation or custom LLM prompt):
- Classify this call topic as SAFE or PROHIBITED.
- 
- PROHIBITED topics:
- - Medication reminders or compliance checks
- - Medical advice or health directives
- - Emergency instructions
- 
- Topic: &#34;{user_entered_topic}&#34;
- 
- Classification: [SAFE/PROHIBITED]Reason: [if prohibited, explain why]
- Given PROHIBITED, When classified, Then reject topic with reason
- Given SAFE, When classified, Then allow topic
-  Moderation LoggingLog all moderation attempts:moderation_logs table: user_id, topic, classification, reason, timestamp
- Alert admin if high volume of prohibited attempts (potential misuse)
Legal/Compliance-  Moderation policy reviewed by legal counsel
-  Disclaimer in UI: &#34;Best Day Phone does not provide medical advice or medication reminders&#34;
Testing Requirements-  Unit test: Prohibited topics correctly classified
-  Unit test: Safe topics correctly classified
-  E2E test: User enters prohibited topic, sees error
-  E2E test: User enters safe topic, proceeds successfully
-  Integration test: Moderation logs created
