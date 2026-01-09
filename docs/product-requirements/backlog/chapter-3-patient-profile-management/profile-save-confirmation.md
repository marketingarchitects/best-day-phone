---
wrike_id: MAAAAAEC_JyD
title: "Profile Save Confirmation"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345076867
updated_date: 2026-01-08T16:33:09Z
last_sync: 2026-01-09T14:04:48.381200
authors:
  - "Noah Moss"
---

# Profile Save Confirmation

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345076867)

---

## Description

As a caregiver, I want to save profile changes with confirmation so that I don't lose my edits.Functional Requirements-  Save Button BehaviorGiven user editing profile, When changes made, Then &#34;Save Changes&#34; button enabled (previously disabled if no changes)
- Button text: &#34;Save Changes&#34; with icon
- Given user clicks &#34;Save Changes&#34;, When processing, Then button shows &#34;Saving...&#34; with spinner
- Success ConfirmationGiven save successful, When complete, Then:Show success toast: &#34;✓ Patient profile updated&#34; (3-second duration)
- Button returns to &#34;Save Changes&#34; state
- Form remains open for continued editing
-  Error HandlingGiven save fails, When error occurs, Then:Show error toast: &#34;Failed to save changes. Please try again.&#34;
- Button returns to &#34;Save Changes&#34; state
- User's edits remain in form (not lost)
- Log error to monitoring
-  Unsaved Changes WarningGiven user made changes, When navigating away from page, Then show browser confirmation: &#34;You have unsaved changes. Are you sure you want to leave?&#34;
- Given user clicks &#34;Cancel&#34;, When confirmed, Then remain on profile page
- Given user clicks &#34;OK&#34;, When confirmed, Then navigate away (changes lost)
-  Auto-Save IndicatorGiven auto-save enabled (for long fields), When auto-save triggers, Then show subtle indicator: &#34;Draft saved at 2:45 PM&#34;
Backend Requirements-  Given profile save request, When processing, Then:Validate all fields (same validations as individual stories)
- Update patient_profiles table atomically (transaction)
- Update updated_at timestamp
- Return 200 with full profile object
-  Validation Errors
- Given validation fails, When error detected, Then return 400 with field-specific errors
Testing Requirements-  E2E test: User makes changes, saves, sees success toast
-  E2E test: User makes changes, navigates away, sees warning
-  E2E test: Save fails, user sees error, form data retained
-  Integration test: Profile update transaction succeeds/rolls back correctly
