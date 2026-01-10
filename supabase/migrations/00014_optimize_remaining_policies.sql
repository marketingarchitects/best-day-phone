-- Optimize remaining RLS policies to use user_team_ids() helper function
-- This prevents potential recursion issues and improves performance

-- ============================================================================
-- UPDATE TEAMS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "teams_select_policy" ON public.teams;
DROP POLICY IF EXISTS "teams_update_policy" ON public.teams;

-- Members can view their teams
CREATE POLICY "teams_select_policy"
    ON public.teams
    FOR SELECT
    USING (
        id IN (SELECT public.user_team_ids())
    );

-- Only primary caregivers can update team settings
CREATE POLICY "teams_update_policy"
    ON public.teams
    FOR UPDATE
    USING (
        id IN (
            SELECT tm.team_id 
            FROM public.team_members tm
            JOIN public.roles r ON tm.role_id = r.id
            WHERE tm.user_id = auth.uid()
            AND tm.is_primary = true
            AND tm.joined_at IS NOT NULL
            AND r.name = 'primary_caregiver'
        )
    );

-- ============================================================================
-- UPDATE CARE_RECIPIENTS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "care_recipients_select_policy" ON public.care_recipients;
DROP POLICY IF EXISTS "care_recipients_insert_policy" ON public.care_recipients;
DROP POLICY IF EXISTS "care_recipients_update_policy" ON public.care_recipients;
DROP POLICY IF EXISTS "care_recipients_delete_policy" ON public.care_recipients;

CREATE POLICY "care_recipients_select_policy"
    ON public.care_recipients
    FOR SELECT
    USING (
        team_id IN (SELECT public.user_team_ids())
    );

CREATE POLICY "care_recipients_insert_policy"
    ON public.care_recipients
    FOR INSERT
    WITH CHECK (
        team_id IN (SELECT public.user_team_ids())
    );

CREATE POLICY "care_recipients_update_policy"
    ON public.care_recipients
    FOR UPDATE
    USING (
        team_id IN (SELECT public.user_team_ids())
    );

CREATE POLICY "care_recipients_delete_policy"
    ON public.care_recipients
    FOR DELETE
    USING (
        team_id IN (SELECT public.user_team_ids())
    );

-- ============================================================================
-- UPDATE PHONE_DEVICES TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "phone_devices_select_policy" ON public.phone_devices;
DROP POLICY IF EXISTS "phone_devices_insert_policy" ON public.phone_devices;
DROP POLICY IF EXISTS "phone_devices_update_policy" ON public.phone_devices;
DROP POLICY IF EXISTS "phone_devices_delete_policy" ON public.phone_devices;

CREATE POLICY "phone_devices_select_policy"
    ON public.phone_devices
    FOR SELECT
    USING (
        team_id IN (SELECT public.user_team_ids())
    );

CREATE POLICY "phone_devices_insert_policy"
    ON public.phone_devices
    FOR INSERT
    WITH CHECK (
        team_id IN (SELECT public.user_team_ids())
    );

CREATE POLICY "phone_devices_update_policy"
    ON public.phone_devices
    FOR UPDATE
    USING (
        team_id IN (SELECT public.user_team_ids())
    );

CREATE POLICY "phone_devices_delete_policy"
    ON public.phone_devices
    FOR DELETE
    USING (
        team_id IN (SELECT public.user_team_ids())
    );

-- ============================================================================
-- UPDATE CONVERSATIONS TABLE POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "conversations_select_policy" ON public.conversations;
DROP POLICY IF EXISTS "conversations_insert_policy" ON public.conversations;
DROP POLICY IF EXISTS "conversations_update_policy" ON public.conversations;

CREATE POLICY "conversations_select_policy"
    ON public.conversations
    FOR SELECT
    USING (
        phone_device_id IN (
            SELECT id FROM public.phone_devices
            WHERE team_id IN (SELECT public.user_team_ids())
        )
    );

CREATE POLICY "conversations_insert_policy"
    ON public.conversations
    FOR INSERT
    WITH CHECK (
        phone_device_id IN (
            SELECT id FROM public.phone_devices
            WHERE team_id IN (SELECT public.user_team_ids())
        )
    );

CREATE POLICY "conversations_update_policy"
    ON public.conversations
    FOR UPDATE
    USING (
        phone_device_id IN (
            SELECT id FROM public.phone_devices
            WHERE team_id IN (SELECT public.user_team_ids())
        )
    );
