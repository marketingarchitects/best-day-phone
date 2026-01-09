---
wrike_id: MAAAAAEDAeQ4
title: "View AI-Generated Summary"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345422904
updated_date: 2026-01-08T21:33:46Z
last_sync: 2026-01-09T14:04:48.393049
authors:
  - "Noah Moss"
---

# View AI-Generated Summary

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345422904)

---

## Description

As a caregiver, I want to view an AI-generated summary of each conversation so that I can quickly understand what happened.Functional Requirements-  Summary in List ViewGiven conversation card in list, When viewing, Then summary preview shown (first 100 chars)
- &#34;Read Full Summary&#34; link expands summary inline
-  Summary in Detail ViewGiven conversation detail page, When loaded, Then full summary displayed prominently:Section title: &#34;Conversation Summary&#34;
- Summary text (rich formatting preserved)
- Length: 3-5 sentences, ~150-250 words
-  Summary ContentSummary includes:Main topics discussed
- Patient's mood/demeanor
- Notable mentions (family, events, concerns)
- Overall tone of conversation
- Example:*&#34;Dorothy and Aaron had a pleasant conversation about her garden. She mentioned that her tomatoes are doing well this season and shared a memory about teaching her granddaughter to plant flowers. Dorothy seemed in good spirits and was engaged throughout the call. She briefly mentioned missing her late husband John when discussing their old garden together.&#34;*
Backend Suggestion - Summary Generation-  Given conversation completed, When processing, Then generate summary:
- Send full transcript to LLM with prompt:
- Summarize this conversation between {patient_name} and {ai_name}.
- 
- Focus on:
- - Main topics discussed
- - Patient's mood and engagement
- - Any notable mentions of family, events, or concerns
- - Overall quality of the conversation
- 
- Format: 3-5 sentences, written for a caregiver reviewing the conversation.
- Tone: Warm, informative, objective.
- Transcript: {full_transcript}
- Store summary in conversations.ai_summary (TEXT)
-  Summary Generation Timing
- Given conversation ends, When processing, Then:Generate summary asynchronously (background job)
- Mark conversation as summary_pending initially
- Update to summary_completed when done (typically < 30 seconds)
UI Loading States-  Given summary not yet generated, When viewing conversation, Then show:Loading spinner with text: &#34;Generating summary...&#34;
- Auto-refresh when summary ready (polling every 5 seconds)
Testing Requirements-  Integration test: Summary generation produces valid output
-  E2E test: User views conversation, sees summary
-  E2E test: Pending summary shows loading state
