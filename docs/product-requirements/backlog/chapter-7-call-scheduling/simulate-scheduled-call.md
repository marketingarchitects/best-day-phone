---
wrike_id: MAAAAAEDAXOb
title: "Simulate Scheduled Call"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345394075
updated_date: 2026-01-08T21:10:20Z
last_sync: 2026-01-09T14:04:48.391613
authors:
  - "Noah Moss"
---

# Simulate Scheduled Call

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345394075)

---

## Description

As a caregiver, I want to simulate a scheduled call that demonstrates a scheduled call behavior so that I can preview how the AI will introduce the topic and feel comfortable with it.Functional Requirements-  Test Call ButtonGiven schedule card displayed, When viewing, Then &#34;Test This Call&#34; button shown
-  Test Call InitiationGiven user clicks &#34;Test This Call&#34;, When clicked, use same player as is already present in system
- Test Call FlowGiven test call connected, When AI speaks, Then AI introduces topic:&#34;Hello Dorothy, this is Aaron Smith. I was hoping we could chat about your garden today. How's everything growing?&#34;
- Conversation continues naturally around topic for 2-3 minutes
- AI ends with: &#34;This was just a test of your scheduled call. I'll talk to you again soon!&#34;
-  Test Call Difference from General Test:General test: Generic greeting, no specific topic
- Scheduled call test: Topic-focused greeting, demonstrates actual scheduled call behavior
Backend Suggestions-  Given scheduled test call initiated, When processing, Then:Load full patient profile
- Load AI companion config
- Load scheduled call topic
- Pass all to conversation API in test mode
- Do NOT log to Memory Center
- Do NOT count against usage metrics
Testing Requirements-  E2E test: User tests scheduled call, hears topic-focused greeting
-  Integration test: Test call uses scheduled topic
-  Integration test: Test call not recorded in Memory Center
