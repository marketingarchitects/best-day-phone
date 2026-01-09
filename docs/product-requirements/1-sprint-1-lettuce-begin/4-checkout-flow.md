---
wrike_id: MAAAAAEC2akt
title: "4. Checkout Flow"
status: Active
importance: Normal
due: 2026-01-20
permalink: https://www.wrike.com/open.htm?id=4342786349
updated_date: 2026-01-09T16:29:44Z
last_sync: 2026-01-09T14:04:48.400741
assignees:
  - "John Ryan Cottam"
  - "Isaiah Britto"
  - "Andrew Aldrich"
  - "Alex Berkowitz"
  - "Jonathon Vargas"
authors:
  - "Noah Moss"
---

# 4. Checkout Flow

**Status:** 🟢 Active
**Due:** 2026-01-20
**Assignees:** John Ryan Cottam, Isaiah Britto, Andrew Aldrich, Alex Berkowitz, Jonathon Vargas
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4342786349)

---

## Description

As a user, I want to complete payment via Stripe Checkout so that my subscription is activated.Note: use the Stripe Sandbox for now.  Jonathan will acquire the account...and eventually the 'real' Stripe Membership.Functional Requirements-  Stripe Checkout IntegrationGiven user on checkout page with plan selected, When user clicks &#34;Continue to Payment&#34;, Then redirect to Stripe Checkout hosted page
- Stripe Checkout configured in &#34;sandbox&#34; mode
- Payment methods enabled: Credit card, debit card (Apple Pay/Google Pay enabled)
- Customer email pre-filled if user logged in
-  Stripe Checkout Session Creation
- Given user clicks &#34;Continue to Payment&#34;, When request sent, Then backend calls stripe.checkout.sessions.create() with:mode: 'subscription'
- Store metadata: {userId: 'uuid', planName: 'Basic'}
-  Payment Success FlowGiven user completes payment, When Stripe redirects to success_url, Then:Verify checkout session with Stripe API
- Display success message: &#34;Welcome! Your subscription is active.&#34;
- Show next steps: &#34;Check your email for setup instructions.&#34;
- Link to dashboard: &#34;Go to Dashboard&#34; button
-  Payment Failure FlowGiven payment fails, When user redirected to Stripe's error page, Then clear error message shown by Stripe
- Given user clicks &#34;Cancel&#34; in Stripe Checkout, When redirected to cancel_url, Then show message: &#34;Checkout canceled. Your card was not charged.&#34;
Backend Requirements - Webhook Handling-  Given Stripe sends checkout.session.completed webhook, When received, Then:Verify webhook signature with Stripe signing secret
- Extract customer_id, subscription_id, metadata.userId
- Create subscription record in database:
-  Given webhook processing fails, When error occurs, Then:Log error with full context
- Return 500 to Stripe (Stripe will retry)
Security Requirements-  Stripe webhook endpoint protected with signature verification
-  Checkout session IDs validated before granting access
-  User cannot access dashboard without active subscription
Testing Requirements-  E2E test: Complete checkout flow from plan selection to success page
-  Integration test: Webhook creates subscription record
-  Integration test: Failed webhook returns 500 and retries
-  Security test: Invalid webhook signature rejected
