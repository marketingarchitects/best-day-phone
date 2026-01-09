---
wrike_id: MAAAAAEC_XrU
title: "Test Call in Browser or app"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345133780
updated_date: 2026-01-08T17:38:50Z
last_sync: 2026-01-09T14:04:48.385120
authors:
  - "Noah Moss"
---

# Test Call in Browser or app

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345133780)

---

## Description

As a caregiver, I want to initiate a test call in my browser so that I can preview the AI's behavior.Functional Requirements- Test Call ButtonGiven user on AI configuration page, When viewing, Then prominent button displayed: &#34;Start Test Call&#34;
- Button placement: Bottom of AI config section or floating action button
- Helper text: &#34;Test the AI conversation in your browser before your patient receives calls.&#34;
-  PermissionsGiven user clicks &#34;Start Test Call&#34;, When clicked, Then browser/app requests microphone permission
- Given permission denied, When user declines, Then show error: &#34;Microphone access required for test calls. Please enable in your settings.&#34;
- Test Call InterfaceGiven permissions granted, When call starts, Then show call UI:Large &#34;On Call&#34; indicator
- Timer showing call duration
- When AI is speaking: Waveform animation (visual indicator AI is speaking)
- When AI is listening: Visual indicator that AI is listening
- &#34;End Call&#34; button (red, prominent)
- Volume slider
- Test Call FlowGiven call connected, When AI speaks, Then AI uses current configuration as has been selected by caregiver:Introduces self with configured name: &#34;Hello, this is Aaron Smith.&#34;
- Uses patient's name: &#34;Is this Dorothy?&#34;
- Short conversation (3-5 turns, max 2 minutes)
- AI says: &#34;This is just a test call. I look forward to our real conversations!&#34;
- Given user speaks, When microphone active, Then AI responds naturally
- End CallGiven user clicks &#34;End Call&#34;, When clicked, Then:Call terminates gracefully
- Option to return to AI config: &#34;Make Changes&#34; or &#34;This Works for Me&#34;If it works for them, Show feedback modal: &#34;How did the test call sound?&#34; (optional survey with thumbs up/down options: Voice clarity, AI responses, Overall impression)
Technical Requirements-  Audio: WebRTC for low-latency audio streaming
-  Latency: < 500ms response time
-  Call duration limit: 5 minutes max (auto-disconnect with warning)
Testing Requirements-  E2E test: User starts test call, hears AI greeting
-  E2E test: Test call uses configured AI name and voice
-  Integration test: Test call does not create Memory Center entry
-  Performance test: Audio latency < 500ms
