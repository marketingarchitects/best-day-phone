---
wrike_id: MAAAAAEC2T6B
title: "2. Homepage with Package Tiers"
status: Active
importance: Normal
due: 2026-01-20
permalink: https://www.wrike.com/open.htm?id=4342759041
updated_date: 2026-01-09T19:25:12Z
last_sync: 2026-01-09T14:29:45.144099
assignees:
  - "Andrew Aldrich"
  - "Alex Berkowitz"
  - "Jonathon Vargas"
authors:
  - "Noah Moss"
---

# 2. Homepage with Package Tiers

**Status:** 🟢 Active
**Due:** 2026-01-20
**Assignees:** Andrew Aldrich, Alex Berkowitz, Jonathon Vargas
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4342759041)

---

## Description

## Introduction
This document defines the requirements for the Best Day Phone landing page — a marketing website designed to convert caregivers of people with Alzheimer's and dementia into trial subscribers.## Glossary
- **Landing_Page**: The marketing website presenting the Best Day Phone product
- **Visitor**: A person viewing the landing page
- **Caregiver**: The primary buyer persona — adult children or family members caring for someone with dementia
- **Tier_Card**: UI component displaying a pricing tier
- **CTA_Button**: Call-to-action button initiating signup or checkout
## Marketing Requirements
### Requirement 1: Value Proposition
**User Story:** As a caregiver, I want to immediately understand what Best Day Phone is, so I can decide if it's relevant.- WHEN a Visitor lands on the page, THE Landing_Page SHALL communicate the core value proposition within 5 seconds
- THE Landing_Page SHALL identify the target audience (families caring for loved ones with memory loss)
- THE Landing_Page SHALL differentiate from generic tech by emphasizing familiarity and simplicity
### Requirement 2: Validate Pain Points
**User Story:** As a caregiver, I want to see the company understands my struggles.- THE Landing_Page SHALL acknowledge the emotional burden of caregiving
- THE Landing_Page SHALL address why existing technology fails for dementia patients
- THE Landing_Page SHALL validate that caregivers cannot be present 24/7
### Requirement 3: Explain the Solution
**User Story:** As a caregiver, I want to understand how the product works.- THE Landing_Page SHALL explain the familiar form factor (rotary phone design)
- THE Landing_Page SHALL explain the AI companion's approach (patient, kind, never corrects)
- THE Landing_Page SHALL explain how caregivers stay informed about wellbeing
### Requirement 4: Address AI Concerns
**User Story:** As a caregiver, I want AI concerns addressed honestly.- THE Landing_Page SHALL address skepticism about AI calling a parent
- THE Landing_Page SHALL position AI as a supplement, not replacement
- IF voice cloning is mentioned, THEN THE Landing_Page SHALL present it as optional
### Requirement 5: Social Proof
**User Story:** As a caregiver, I want evidence the product works.- THE Landing_Page SHALL include testimonials demonstrating real usage
- THE Landing_Page SHALL display key metrics (usage statistics)
- THE Landing_Page SHALL communicate the founder's personal connection
### Requirement 6: Clear Pricing
**User Story:** As a caregiver, I want to understand pricing options.- THE Landing_Page SHALL display all pricing tiers with clear differentiation
- THE Landing_Page SHALL highlight the recommended tier
- THE Landing_Page SHALL communicate free device and trial prominently
- THE Landing_Page SHALL address WiFi vs 5G requirements per tier
### Requirement 7: FAQ
**User Story:** As a caregiver, I want answers to common questions.- THE Landing_Page SHALL address usability for dementia patients
- THE Landing_Page SHALL address privacy and data concerns
- THE Landing_Page SHALL address emergency handling
### Requirement 8: Conversions
**User Story:** As an interested visitor, I want clear paths to start a trial.- THE Landing_Page SHALL provide multiple trial opportunities throughout
- THE Landing_Page SHALL reinforce low-risk messaging
- THE Landing_Page SHALL include a final CTA for full-page scrollers
## Functional Requirements
### Requirement 9: Desktop Tier Display
- WHEN viewport width >&#61; 1024px, THE Landing_Page SHALL display all 3 Tier_Cards without scrolling
- THE Landing_Page SHALL display Tier_Cards horizontally: Essential | Complete | Connected
- EACH Tier_Card SHALL include: tier name (h3), price &#34;$XX.XX/month&#34;, tagline, 5  features with checkmarks, CTA_Button
- THE Landing_Page SHALL highlight &#34;Complete&#34; tier as &#34;Most Popular&#34;
### Requirement 10: Mobile Tier Display
- WHEN viewport width <&#61; 375px, THE Landing_Page SHALL stack Tier_Cards vertically
- EACH Tier_Card SHALL occupy 100% viewport width minus padding
- THE Landing_Page SHALL not require horizontal scroll
### Requirement 11: Feature Lists
- THE Landing_Page SHALL display features with green checkmark icons
- THE Landing_Page SHALL render text at minimum 14px mobile, 16px desktop
- FOR higher tiers, THE Tier_Card SHALL show &#34;Everything in [Previous] plus:&#34;
### Requirement 12: CTA Buttons
- WHEN Visitor clicks CTA_Button AND not logged in, THE Landing_Page SHALL redirect to /signup?plan&#61;[tier]
- WHEN Visitor clicks CTA_Button AND logged in, THE Landing_Page SHALL redirect to /checkout?plan&#61;[tier]
- THE CTA_Button SHALL have minimum 44x44px touch target
- THE CTA_Button SHALL use high-contrast styling
### Requirement 13: Responsive Design
- THE Landing_Page SHALL be fully functional on mobile, tablet, and desktop
- THE Landing_Page SHALL maintain readability at all viewport sizes
- THE Landing_Page SHALL support dark mode
## Non-Functional Requirements
### Requirement 14: Performance
- THE Landing_Page SHALL achieve LCP less than 2 seconds
- THE Landing_Page SHALL render text as hardcoded HTML (not JS-rendered) for AEO
### Requirement 15: Accessibility
- THE Landing_Page SHALL support keyboard navigation
- THE Landing_Page SHALL be screen reader compatible
- THE Landing_Page SHALL comply with WCAG 2.1 AA
### Requirement 16: SEO
- THE Landing_Page SHALL include meta title and description
- THE Landing_Page SHALL include structured data (JSON-LD) for pricing
## Testing Requirements
- Visual regression: Verify rendering on desktop (1920x1080, 1440x900) and mobile (375x667, 390x844)
- E2E: Verify CTA navigation with correct query params
- E2E: Verify logged-in vs logged-out redirect behavior
- Accessibility: Verify WCAG 2.1 AA with axe-core
- Accessibility: Verify keyboard navigation flow
