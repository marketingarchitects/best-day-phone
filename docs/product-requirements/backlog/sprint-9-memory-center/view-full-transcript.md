---
wrike_id: MAAAAAEDAgd2
title: "View Full Transcript"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345431926
updated_date: 2026-01-08T21:37:10Z
last_sync: 2026-01-09T14:04:48.393479
authors:
  - "Noah Moss"
---

# View Full Transcript

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345431926)

---

## Description

As a caregiver, I want to view the full transcript with speaker labels so that I can read the entire conversation.Functional Requirements-  Transcript Section (Detail View)Given conversation detail page, When loaded, Then full transcript section displayed:Section title: &#34;Full Transcript&#34;
- Transcript displayed as turn-by-turn dialogue
- Collapsible: Starts collapsed (summary visible), &#34;Show Transcript&#34; button expands
-  Transcript FormatGiven transcript shown, When viewing, Then each turn displayed:Speaker label (bold): &#34;Dorothy:&#34; or &#34;Aaron:&#34;
- Speaker avatar/icon (patient photo or AI icon)
- Timestamp (relative to call start): &#34;[00:15]&#34; (15 seconds in)
- Turn text (paragraph format)
- Visual distinction between speakers (alternating background colors or indentation)
Example:[00:05] Aaron:Hello Dorothy, this is Aaron Smith calling to check in on you. How are you doing today?[00:12] Dorothy:Oh, hello Aaron! I'm doing just fine, thank you for asking.[00:18] Aaron:That's wonderful to hear. I was hoping we could talk about your garden today. How's everything growing?3 Transcript Search- Given transcript displayed, When user uses search box, Then:Search input above transcript: &#34;Search conversation...&#34;
- Highlight matching text in transcript
- Show match count: &#34;3 matches found&#34;
- &#34;Next&#34; / &#34;Previous&#34; buttons to jump between matches
Testing Requirements-  Integration test: Transcript generation from audio works
-  Integration test: Speaker diarization accurate (>90%)
-  E2E test: User views transcript, sees turns with timestamps
-  E2E test: Search highlights matches
