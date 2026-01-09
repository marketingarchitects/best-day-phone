---
wrike_id: MAAAAAEC_Xqo
title: "Select AI Voice"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345133736
updated_date: 2026-01-08T17:31:01Z
last_sync: 2026-01-09T14:04:48.384854
authors:
  - "Noah Moss"
---

# Select AI Voice

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345133736)

---

## Description

As a caregiver, I want to select an AI voice so that the patient hears a pleasant voice.Functional Requirements-  Voice Selection UIGiven user configuring AI, When viewing voice section, Then voice selector displayed
- Label: &#34;AI Voice&#34; with helper text: &#34;Choose a voice that your patient will find comforting.&#34;
- Voice Options DisplayGiven voice selector shown, Load 5 voice cards that are our best guess as to what this voice should sound like:Voice name
- Gender indicator (Male/Female)
- Age descriptor (e.g., &#34;Middle-aged&#34;, &#34;Elderly&#34;)
- Tone descriptor (e.g., &#34;Warm&#34;, &#34;Calm&#34;, &#34;Friendly&#34;)
- Play button to preview 15-second sample
- &#34;Select this Voice&#34; button
- Voice PreviewGiven user clicks play button, When clicked, Then audio sample plays:Sample text: &#34;Hello, this is [Voice Name]. I'm calling to check in and see how you're doing today. It's always wonderful to hear your voice!&#34;
- Audio player controls: Play/pause, volume
- Only one preview plays at a time (stop others when new one starts)
-  Voice SelectionGiven user clicks &#34;Select this voice&#34; button, When selected, Then card highlighted with border
- Default: System default voice
Testing Requirements-  Integration test: Voice list fetches from ElevenLabs
-  E2E test: User previews voice, hears audio
-  E2E test: User selects voice, saves, selection persists
-  Integration test: Selected voice used in actual conversation
