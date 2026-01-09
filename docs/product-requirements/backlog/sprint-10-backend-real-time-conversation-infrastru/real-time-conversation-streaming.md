---
wrike_id: MAAAAAEDAlIH
title: "Real-Time Conversation Streaming"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345451015
updated_date: 2026-01-08T21:57:17Z
last_sync: 2026-01-09T14:04:48.394870
authors:
  - "Noah Moss"
---

# Real-Time Conversation Streaming

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345451015)

---

## Description

As a system, I need real-time conversation streaming (WebSocket/WebRTC) so that calls have low latency.Functional Requirements-  WebSocket Connection EstablishmentGiven device initiates conversation, When connection requested, Then WebSocket connection established:Device sends: wss://api.bestdayphone.com/v1/conversations/connect
- Include authentication: Device UUID &#43; API key in headers
- Server responds with 101 Switching Protocols
- Establish a Connection Handshake
- Bidirectional Audio StreamingPatient Audio (Device → Server):Device streams microphone input as raw PCM or Opus codec
- Chunks: 20ms frames (320 bytes for 16kHz PCM)
- WebSocket binary messages
- AI Audio (Server → Device):Server streams AI voice synthesis (from ElevenLabs)
- Format: PCM or Opus
- Device plays immediately (streaming, not buffered)
Technical Requirements-  Low Latency RequirementsTotal latency (user speaks → AI responds): < 2 seconds
- Breakdown:Speech-to-text: < 500ms
- LLM response generation: < 800ms
- Text-to-speech: < 500ms
- Network overhead: < 200ms
-  Audio QualitySample rate: 16kHz (sufficient for voice)
- Bit depth: 16-bit
- Codec: Opus (best quality/compression for voice)
- Packet loss handling: Forward error correction (FEC)
-  Streaming ArchitectureNOT request-response: Continuous bidirectional stream
- Use server-sent events (SSE) for one-way or full WebSocket for bidirectional
- Consider WebRTC for lower latency (peer-to-peer if possible)
Error Handling-  Connection LossGiven WebSocket disconnects, When detected, Then:Server buffers AI response for 30 seconds
- Device attempts reconnection (exponential backoff: 1s, 2s, 4s, 8s)
- Given reconnect succeeds, When within 30s, Then resume conversation
- Given reconnect fails, When 30s elapsed, Then end conversation
-  Audio Stream InterruptionGiven audio packets dropped, When detected, Then use FEC to recover
- Given unrecoverable, When detected, Then play comfort noise (avoid dead air)
Testing Requirements-  Load test: 100 concurrent conversations without degradation
-  Latency test: Measure end-to-end latency < 2 seconds (p95)
-  Stability test: 30-minute conversation without disconnection
-  Network simulation: Test with 5% packet loss, 200ms latency
-  Integration test: Full conversation flow from handshake to termination
