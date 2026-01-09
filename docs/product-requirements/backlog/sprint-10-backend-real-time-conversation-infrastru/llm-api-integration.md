---
wrike_id: MAAAAAEDAoDp
title: "LLM API Integration"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345463017
updated_date: 2026-01-08T22:09:27Z
last_sync: 2026-01-09T14:04:48.395522
authors:
  - "Noah Moss"
---

# LLM API Integration

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345463017)

---

## Description

As a system, I need LLM API integration so that AI conversations are generated.Conversation Memory-  Short-Term Memory (Within Call)Maintain conversation history in messages array
- Keep last 20 turns (patient &#43; AI) in context
- Prune older turns to stay within token limits
-  Long-Term Memory (Across Calls)Given conversation ends, When processing, Then:Generate summary of conversation 
- Store key facts mentioned by patient in patient_memories:&#34;Patient mentioned granddaughter Emma started 3rd grade&#34;
- &#34;Patient's tomatoes are growing well&#34;
- Load relevant memories in next conversation context
Guardrails & Safety-  Content ModerationGiven patient says concerning content, When detected, Then:Flag in conversation log for caregiver review
- AI responds compassionately but doesn't escalate
- Examples: Expressions of sadness, loneliness (normal), vs. self-harm (requires flag)
-  Topic Avoidance EnforcementGiven patient mentions avoided topic, When detected, Then:AI acknowledges briefly
- Gently redirects: &#34;I understand. Tell me about {positive_interest}?&#34;
- Log topic mention for caregiver
-  Medical Advice PreventionGiven patient asks medical question, When detected, Then:AI responds: &#34;I'm not able to provide medical advice. It's best to speak with your doctor about that. How about we talk about {other_topic}?&#34;
Cost Optimization-  Token ManagementMonitor tokens per conversation
- Store in conversations.llm_tokens_used (input &#43; output)
- Alert if conversation exceeds 10,000 tokens (unusually long)
-  Model SelectionA/B test different models for quality difference
Testing Requirements-  Integration test: LLM generates coherent responses
-  Integration test: Context includes all patient profile data
-  Unit test: Avoided topics trigger redirection
-  Unit test: Medical advice requests handled correctly
-  Performance test: LLM response latency < 800ms (p95)
