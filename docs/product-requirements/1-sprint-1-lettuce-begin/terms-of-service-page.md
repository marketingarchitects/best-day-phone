---
wrike_id: MAAAAAEC2WBq
title: "Terms of Service Page"
status: Active
importance: Normal
due: 2026-01-20
permalink: https://www.wrike.com/open.htm?id=4342767722
updated_date: 2026-01-08T16:21:32Z
last_sync: 2026-01-09T14:04:48.401278
assignees:
  - "Andrew Aldrich"
  - "Alex Berkowitz"
authors:
  - "Noah Moss"
---

# Terms of Service Page

**Status:** 🟢 Active
**Due:** 2026-01-20
**Assignees:** Andrew Aldrich, Alex Berkowitz
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4342767722)

---

## Description

As a visitor, I want to read the Terms of Service so that I understand the legal agreement.Functional Requirements- Terms of Service LinkAdd a link to 'Terms of Service' to the footer
- Terms of Service PageGiven user navigates to /terms, When page loads, Then full Terms of Service displayed
- Page title: &#34;Terms of Service&#34;
- Last updated date displayed prominently at top
- Content organized with section headings (e.g., &#34;1. Acceptance of Terms&#34;, &#34;2. Service Description&#34;)
- Table of contents with anchor links for easy navigation (if document > 1000 words)
-  AccessibilityGiven user clicks ToS link in footer, When navigates, Then page loads in same tab or new tab with clear indicator
- Printable version available (clean print stylesheet)
Content Requirements-  Use Lorem Ipsum for this version
-  Includes sections:Acceptance of terms
- Service description
- User responsibilities
- Payment terms
- Subscription and cancellation
- Privacy and data usage
- Disclaimer of warranties
- Limitation of liability
- Dispute resolution
- Governing law
- Contact information
Backend Requirements-  ToS content stored in database or CMS for easy updates
-  Version control: New ToS versions saved with effective date
-  Users shown ToS acceptance prompt when terms updated (future sprint)
Testing Requirements-  Content test: All sections present and readable
-  Link test: ToS accessible from footer on all pages
