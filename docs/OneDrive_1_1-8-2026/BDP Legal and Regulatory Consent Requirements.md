To meet **legal and regulatory requirements** for the Best Day Phone---especially in the context of **voice likeness, call recording, and deployment within quality care programs as a potential Class II medical device**---you will need to secure multiple layers of **user consent**, including regulatory-grade disclosures and usage agreements.

Here\'s a breakdown of what is required:

**1. Voice Likeness Consent (Biometric Data)**

**What It Covers:**

- Consent to record, store, and use the **voice** of the user (or caregiver) in a personalized, repeatable ritual.

- Voice messages may be considered **biometric identifiers** or **personally identifiable information (PII)** under HIPAA, CCPA, and BIPA (Illinois), especially if stored, indexed, or analyzed.

**Required Actions:**

- **Explicit written or recorded consent** from the voice contributor.

- Clear disclosure that:

  - Voice likeness is being recorded for playback purposes.

  - The message may be stored for ritual repetition or caregiver dashboards.

  - The voice may be reviewed for quality, safety, or compliance.

**Consent Best Practices:**

- Pre-message consent prompt with "press to confirm" or written checkbox for onboarding.

- Provide a downloadable or printable copy of consent language.

- Include option to **revoke** or delete voice at any time ("right to be forgotten").

**2. Call Recording and Playback Consent**

**What It Covers:**

- Any use of **two-way** voice capture (if implemented), or any system-triggered **call recording** for QA or caregiver response validation.

- **Passive audio logging** (even for compliance or fall detection) triggers elevated scrutiny.

**Applicable Laws:**

- **Federal wiretap laws** (one-party consent at minimum).

- **State-specific laws**: 13 states require **two-party (all-party) consent**, including CA, IL, WA, PA, FL.

- **HIPAA**: if content relates to protected health information (PHI), additional disclosure needed.

**Required Actions:**

- **Real-time notice + opt-in** for any recording: "This interaction will be recorded for quality or care tracking purposes."

- Store consent **audit logs** and timestamps for regulatory audits.

- Surface consent **every time recording is active** unless persistent opt-in is granted in writing.

**3. Medical Device Use Consent (If Classified as Class II)**

If Best Day Phone is classified as a **Class II medical device** (likely if used in **clinical care plans**, **diagnostic monitoring**, or to influence **care outcomes** under a payer contract), then:

**Requirements under FDA, CMS, and HIPAA:**

- **Informed Use Agreement** stating:

  - The product is being used in a healthcare or clinical monitoring context.

  - It may influence care plans, alert caregivers, or submit data to health plans.

- Disclose any **potential risks** (e.g., false sense of security, misinterpretation of messages).

- Device labeling and instructions must include regulatory language and **intended use statements**.

- Include clinical disclaimers ("This product does not diagnose, treat, or cure any condition" unless cleared for that purpose).

**4. Supplemental Consent for Use in Quality Programs (CMS STAR/HEDIS/CAHPS)**

If the device or voice content is used to impact scores, close care gaps, or influence member experience:

**Required Consents:**

- Consent to use interactions for **program measurement** (e.g., CAHPS survey proxy).

- Consent for **data sharing with health plans** or partners.

- Clear distinction that **participation is voluntary**, not mandatory for receiving care.

**Recommended Consent Architecture**

  -------------------------------------------------------------------------------------------------------------------------------------
  **Consent Type**   **Method**                     **Timing**                                        **Storage**
  ------------------ ------------------------------ ------------------------------------------------- ---------------------------------
  Voice Likeness     Written or recorded            At first message setup                            Audit log + user record

  Call Recording     Visual/audio prompt + opt-in   Every session or via persistent toggle            Timestamped, retrievable

  Medical Use        Informed use disclosure        During onboarding and again in clinical context   Part of Terms of Use

  CMS/QI Use         Checkbox or verbal consent     When entering a care program or facility          Shared with payer if applicable
  -------------------------------------------------------------------------------------------------------------------------------------

**Additional Best Practices**

- **Separate user types**: Get consent from both the **recipient (elder)** and **the sender (caregiver)** for clarity and redundancy.

- Use a **Consent Management Layer** within the software stack---linked to user identity, stored for audits.

- Provide **audit logs and revocation paths** that comply with HIPAA, CCPA, and GDPR.

Here is a detailed draft addressing your three-part request regarding consent design for the Best Day Phone, including modular legal language by user type, interface and UX scripting, and legal references aligned to CCPA, HIPAA, BIPA, TCPA, and CMS requirements.

**1. Modular Consent Language by User Type**

These are legally cautious, plain-language templates designed for review by healthcare compliance counsel.

**A. Caregiver (Voice Contributor)**

**Purpose:** Consent to record, store, and replay caregiver's voice messages for a loved one.

**Consent Language (Short-Form):**

I understand that my voice will be recorded and delivered to \[Recipient Name\] through the Best Day Phone. I consent to the recording, storage, and replay of my voice messages. I acknowledge I may revoke this consent at any time by notifying \[Company Name\].

**Consent Language (Expanded, with rights):**

I consent to the capture and storage of my voice for use within the Best Day Phone system. I understand that these messages may be replayed multiple times by the recipient and may be stored on secure servers for this purpose. I further acknowledge that:

- My voice constitutes personally identifiable information (PII)

- I may request deletion or revocation of consent at any time

- My voice will not be used for training, profiling, or any secondary purposes

**Trigger Points:**

- During message setup or mobile app onboarding

- Each time a new voice contributor is added to a user profile

------------------------------------------------------------------------

**B. Patient/User (Message Recipient)**

**Purpose:** Consent to receive pre-recorded voice messages; potential logging of playback timestamps or engagement.

**Consent Language:**

I understand that this device will receive voice messages from people I know and care about. These messages will be played out loud for me, and the system may log when I hear them to help my family or care team know I'm staying connected. I consent to receive these messages and understand how they will be used.

**Accessibility Option (508-Compliant Verbal Consent):**

"To get started, we'll play a message for you. Press the button to say 'yes' if you'd like to continue receiving messages from your loved ones."

**Trigger Points:**

- During device onboarding (voice or tactile interface)

- With staff assistance in facilities or home settings

**C. Facility Staff (Message Administrator, Onboarder, or Proxy)**

**Purpose:** Consent to act as proxy for setup and acknowledgment of user support responsibilities.

**Consent Language:**

As a facility staff member, I acknowledge that I may assist residents with the setup or use of Best Day Phone. I agree to support use in accordance with HIPAA and privacy standards and will not access or manipulate personal messages without explicit user or family consent.

**Trigger Points:**

- During facility deployment setup

- When assigning staff accounts or access to caregiver dashboards

**2. Consent UX Flow & Scripting**

**Key Principles:**

- Tiered disclosure (short upfront + full legal version accessible)

- Voice, visual, and tactile access modes (Section 508 compliant)

- Revocation and audit trail available at any time

**Sample Flow:**

1.  **User/Caregiver App or Portal**

    - Step 1: "Would you like to record a message for your loved one?"

    - Step 2: Before recording, show:

      - "Your voice will be recorded and saved for replay. Do you agree?"

      - Options: \[Yes, I Agree\] \[Learn More\]

    - Link: Full consent document

2.  **Patient Device (Verbal or Button-Driven)**

    - System: "You have a message. Would you like to hear it?"

    - Press button = implicit acceptance

    - Initial onboarding includes: "Your family may send more messages like this. You can stop anytime."

3.  **Facility Setup Admin Panel**

    - Checkbox acknowledgment: "I am authorized to support device setup and have read the staff use terms."

    - Link to printable PDF of consent policy

**3. Legal Reference Mapping**

  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  **Law**                                                 **Applies To**                                                **Relevant Requirements**
  ------------------------------------------------------- ------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------
  **HIPAA**                                               Any use involving PHI or care team communication              Must ensure data storage, playback, and sharing are secure and logged; BAA needed for payer/facility contracts

  **CCPA** (California Consumer Privacy Act)              California caregivers or recipients                           Must allow users to access, delete, or revoke consent for personal data (including voice)

  **BIPA** (Illinois Biometric Information Privacy Act)   Illinois voice contributors                                   Written consent specifically required for **voiceprint/voice likeness** storage; strong deletion rights

  **TCPA** (Telephone Consumer Protection Act)            If device supports inbound/outbound calls or live audio       Consent needed for any auto-dialing, recording, or use of prerecorded voice outside of user-initiated sessions

  **Section 508 / ADA**                                   All public or healthcare device deployments                   Device interface must include accessible modes (voice/tactile); audio prompts and large-print overlays required

  **GDPR** (EU applicability only)                        If data or contributors cross into EU data territory          Explicit opt-in, right to be forgotten, data minimization required; audit trail of consent logs mandatory

  **CMS (Centers for Medicare & Medicaid Services)**      If used in STAR, CAHPS, HEDIS, or as a supplemental benefit   Must follow Medicare Communications and Marketing Guidelines (MCMG); clarify voluntary participation and no penalty for opting out
  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
