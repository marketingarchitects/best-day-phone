---
wrike_id: MAAAAAEC2b2r
title: "Invoice Webhook Handling"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4342791595
updated_date: 2026-01-08T23:37:02Z
last_sync: 2026-01-09T14:04:48.381491
authors:
  - "Noah Moss"
---

# Invoice Webhook Handling

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4342791595)

---

## Description

As a BDP Company Accountant, I need invoice events handled so that billing history is complete.User-Facing Requirements-  Given user on billing history page, When page loads, Then list shows all paid invoices with:Invoice date
- Amount
- Status (Paid/Failed)
- Download PDF link
Functional Requirements - invoice.created-  Given Stripe sends invoice.created webhook, When received, Then Create invoice record in database with the following information: stripe_invoice_id, subscription_id, customer_id, amount_due, status: 'draft', created_at
Functional Requirements - invoice.finalized-  Given Stripe sends invoice.finalized webhook, When received, Then:Update invoice status to open
- Store invoice PDF URL from Stripe
Functional Requirements - invoice.paid-  Given Stripe sends invoice.paid webhook, When received, Then:Update invoice status to paid
- Store paid_at timestamp
- Make invoice available in user's billing history
Testing Requirements-  Integration test: Invoice lifecycle (created → finalized → paid) syncs correctly
-  E2E test: User can view and download invoice PDF
