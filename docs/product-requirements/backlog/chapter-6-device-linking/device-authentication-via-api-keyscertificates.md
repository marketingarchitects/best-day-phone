---
wrike_id: MAAAAAEC3-M2
title: "Device Authentication via API Keys/Certificates"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4343194422
updated_date: 2026-01-08T23:27:43Z
last_sync: 2026-01-09T14:04:48.387560
authors:
  - "Noah Moss"
---

# Device Authentication via API Keys/Certificates

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4343194422)

---

## Description

As a user, IWT trust the connection between the website and the Phone so that I feel comfortable that my dimentia patient won't be compromisedAs a system, I need device authentication via API keys/certificates so that security is maintained.Functional Requirements-  Certificate-Based Authentication (Optional Enhancement)Given device has provisioned TLS client certificate, When making secure connection, Thenmutual TLS (mTLS) validates device certificate
- Certificate validity period: 2 years
- Certificate revocation list (CRL) checked on connection
-  API Key RotationGiven admin initiates key rotation for device, When rotation triggered, Then new key generated while old key remains valid for 24-hour grace period
- Then device notified via webhook/polling to update key
- Then old key invalidated after grace period
-  Credential Storage SecurityGiven device firmware, When inspecting storage, Then no plain-text API keys stored on device
- API keys stored in secure enclave/TPM if available, otherwise encrypted at rest
Security Requirements-  API keys never logged in plain text
-  API keys transmitted only over TLS 1.3&#43;
-  Failed authentication attempts trigger security alerts after threshold
Documentation-  Device authentication flow diagram created
-  API documentation includes authentication requirements and examples
