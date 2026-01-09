---
wrike_id: MAAAAAEC_H3I
title: "Patient Photo Upload"
status: Active
importance: Normal
permalink: https://www.wrike.com/open.htm?id=4345069000
updated_date: 2026-01-08T16:41:19Z
last_sync: 2026-01-09T14:04:48.380564
authors:
  - "Noah Moss"
---

# Patient Photo Upload

**Status:** 🟢 Active
**Wrike:** [Open in Wrike](https://www.wrike.com/open.htm?id=4345069000)

---

## Description

As a caregiver, I want to upload a patient photo so that the profile feels personalized.Functional Requirements-  Photo Upload UIGiven user on profile form, When viewing photo section, Then circular placeholder displayed with camera icon
- Label: &#34;Patient Photo (Optional)&#34; with helper text: &#34;Help us visualize who we're speaking with.&#34;
-  Upload InteractionGiven user clicks placeholder, When clicked, Then file picker opens
- Accepted formats: .jpg, .jpeg, .png, .heic
- Max file size: 5MB
- Given file selected, When uploaded, Then show loading spinner during upload
-  Image PreviewGiven upload successful, When complete, Then thumbnail displayed in circular frame
- Given image displayed, When hovering, Then show &#34;Change Photo&#34; and &#34;Remove Photo&#34; options
-  Image ValidationGiven file too large, When selected, Then show error: &#34;Photo must be under 5MB. Please choose a smaller file.&#34;
- Given invalid format, When selected, Then show error: &#34;Please upload a JPG or PNG image.&#34;
- Given upload fails, When error occurs, Then show: &#34;Upload failed. Please try again.&#34;
- Image ChangeShow an upload icon.  Follow guidance for image upload.
- Image DeleteShow a delete icon.  
- When clicked, confirm with a popup message &#34;Are you sure you want to delete this image?&#34;
- When confirmed, delete photo and show default image placeholder.
Backend Requirements-  Given photo uploaded, When processing, Then:Validate file type and size on server
- Generate unique filename: patient_photo_{patient_id}_{timestamp}.jpg
- Resize/optimize image: Max 500x500px, 85% quality
- Upload to S3 or equivalent: s3://best-day-phone/patient-photos/{filename}
- Store URL in patient_profiles.photo_url
- Return 200 with photo URL
-  Given photo removed, When delete requested, Then:Delete file from S3
- Set patient_profiles.photo_url &#61; NULL
- Return 200
Security Requirements-  Photos stored in private S3 bucket (not publicly accessible)
-  Signed URLs generated on-demand (expiry: 1 hour)
-  User can only upload/delete photos for their own patient profile
AI Context Integration-  Given photo uploaded, When displayed in portal, Then personalized visual for caregiver
-  Photo NOT passed to AI (visual models not in scope for v1)
Testing Requirements-  Unit test: File validation (type, size)
-  Integration test: Upload creates S3 object and stores URL
-  Integration test: Delete removes S3 object and clears URL
-  E2E test: User uploads photo, sees thumbnail
-  E2E test: User removes photo, placeholder restored
-  Security test: User cannot access another user's photo URL
