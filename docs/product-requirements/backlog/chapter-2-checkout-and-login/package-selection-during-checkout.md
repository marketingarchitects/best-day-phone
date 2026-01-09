---
wrike_id: MAAAAAEC2YnN
title: "Package Selection During Checkout"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4342778317
updated_date: 2026-01-09T02:02:22Z
last_sync: 2026-01-09T14:04:48.382891
authors:
  - "Noah Moss"
---

# Package Selection During Checkout

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4342778317)

---

## Description

As a user, I want to select a package during checkout so that I subscribe to my chosen plan.Functional Requirements-  Package Selection UIGiven user on checkout page, When page loads, Then package selector displays all 3 tiers the select package
- Selected tier visually highlighted (border, background color)
- Given user clicks different tier, When selection changes, Then pricing and feature summary update
- Given user clicks on 'Select Plan', direct to the plan tier relative to that plan.
- Use the standard Stripe checkout page with the CSS customized to Best Day Phone Design Tokens
- Right sidebar (desktop) or below selector (mobile) shows the default stripe checkout with styling:Selected plan name
- Monthly price
- First billing date: &#34;Today, [Month DD, YYYY]&#34;
- Recurring billing disclosure: &#34;You'll be charged $XX.XX every month. Cancel anytime.&#34;
-  Plan PersistenceGiven user selects plan, When proceeding to payment form, Then selected plan persists through page reload or navigation back/forward
- Given the user navigate back to landing page (after making an account but before successful checkout) they must login to go to payment. 
- Selected plan stored in session/localStorage until checkout complete
Testing Requirements-  E2E test: URL param pre-selects correct tier
-  E2E test: Plan selection updates pricing summary
-  E2E test: Selected plan persists through page reload
