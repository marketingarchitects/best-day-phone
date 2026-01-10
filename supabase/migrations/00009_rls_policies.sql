-- Row Level Security Policies
-- Implements strict data isolation between teams
-- All policies use auth.uid() to ensure user-based access control

-- ============================================================================
-- ROLES TABLE POLICIES
-- ============================================================================

-- Public can read roles (system-defined)
CREATE POLICY "roles_select_policy"
    ON public.roles
    FOR SELECT
    USING (true);

-- Only service role can modify roles
-- (No INSERT/UPDATE/DELETE policies = only service role can modify)

-- ============================================================================
-- TEAMS TABLE POLICIES
-- ============================================================================

-- Users can insert new teams (for initial team creation during sign-up)
CREATE POLICY "teams_insert_policy"
    ON public.teams
    FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);

-- Members can view their teams
CREATE POLICY "teams_select_policy"
    ON public.teams
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.team_members
            WHERE team_members.team_id = teams.id
            AND team_members.user_id = auth.uid()
            AND team_members.joined_at IS NOT NULL
        )
    );

-- Only primary caregivers can update team settings
CREATE POLICY "teams_update_policy"
    ON public.teams
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.team_members tm
            JOIN public.roles r ON tm.role_id = r.id
            WHERE tm.team_id = teams.id
            AND tm.user_id = auth.uid()
            AND tm.is_primary = true
            AND tm.joined_at IS NOT NULL
            AND r.name = 'primary_caregiver'
        )
    );

-- Prevent deletion (soft delete only via status field if needed)
-- No DELETE policy = no one can delete

-- ============================================================================
-- PROFILES TABLE POLICIES
-- ============================================================================

-- Users can insert their own profile
CREATE POLICY "profiles_insert_policy"
    ON public.profiles
    FOR INSERT
    WITH CHECK (user_id = auth.uid());

-- Users can view their own profile
CREATE POLICY "profiles_select_policy"
    ON public.profiles
    FOR SELECT
    USING (user_id = auth.uid());

-- Users can update their own profile
CREATE POLICY "profiles_update_policy"
    ON public.profiles
    FOR UPDATE
    USING (user_id = auth.uid());

-- ============================================================================
-- TEAM_MEMBERS TABLE POLICIES
-- ============================================================================

-- Members can view other members in their teams
CREATE POLICY "team_members_select_policy"
    ON public.team_members
    FOR SELECT
    USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND joined_at IS NOT NULL
        )
    );

-- Primary caregivers can invite new members
-- Also allow initial team creation (first member)
CREATE POLICY "team_members_insert_policy"
    ON public.team_members
    FOR INSERT
    WITH CHECK (
        -- Allow inserting if user is primary caregiver in this team
        EXISTS (
            SELECT 1 FROM public.team_members tm
            JOIN public.roles r ON tm.role_id = r.id
            WHERE tm.team_id = team_members.team_id
            AND tm.user_id = auth.uid()
            AND tm.is_primary = true
            AND tm.joined_at IS NOT NULL
            AND r.name = 'primary_caregiver'
        )
        OR
        -- Allow first member creation (no existing members in team)
        NOT EXISTS (
            SELECT 1 FROM public.team_members tm
            WHERE tm.team_id = team_members.team_id
        )
    );

-- Primary caregivers can change roles; users can update their own join status
CREATE POLICY "team_members_update_policy"
    ON public.team_members
    FOR UPDATE
    USING (
        -- Primary caregiver can update any member
        EXISTS (
            SELECT 1 FROM public.team_members tm
            JOIN public.roles r ON tm.role_id = r.id
            WHERE tm.team_id = team_members.team_id
            AND tm.user_id = auth.uid()
            AND tm.is_primary = true
            AND tm.joined_at IS NOT NULL
            AND r.name = 'primary_caregiver'
        )
        OR
        -- User can update their own record (e.g., accepting invitation)
        user_id = auth.uid()
    );

-- Primary caregivers can remove members (except themselves)
CREATE POLICY "team_members_delete_policy"
    ON public.team_members
    FOR DELETE
    USING (
        user_id != auth.uid() -- Cannot delete self
        AND EXISTS (
            SELECT 1 FROM public.team_members tm
            JOIN public.roles r ON tm.role_id = r.id
            WHERE tm.team_id = team_members.team_id
            AND tm.user_id = auth.uid()
            AND tm.is_primary = true
            AND tm.joined_at IS NOT NULL
            AND r.name = 'primary_caregiver'
        )
    );

-- ============================================================================
-- CARE_RECIPIENTS TABLE POLICIES
-- ============================================================================

-- Team members have full access to care recipients in their team
CREATE POLICY "care_recipients_select_policy"
    ON public.care_recipients
    FOR SELECT
    USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND joined_at IS NOT NULL
        )
    );

CREATE POLICY "care_recipients_insert_policy"
    ON public.care_recipients
    FOR INSERT
    WITH CHECK (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND joined_at IS NOT NULL
        )
    );

CREATE POLICY "care_recipients_update_policy"
    ON public.care_recipients
    FOR UPDATE
    USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND joined_at IS NOT NULL
        )
    );

CREATE POLICY "care_recipients_delete_policy"
    ON public.care_recipients
    FOR DELETE
    USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND joined_at IS NOT NULL
        )
    );

-- ============================================================================
-- PHONE_DEVICES TABLE POLICIES
-- ============================================================================

-- Team members have full access to phone devices in their team
CREATE POLICY "phone_devices_select_policy"
    ON public.phone_devices
    FOR SELECT
    USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND joined_at IS NOT NULL
        )
    );

CREATE POLICY "phone_devices_insert_policy"
    ON public.phone_devices
    FOR INSERT
    WITH CHECK (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND joined_at IS NOT NULL
        )
    );

CREATE POLICY "phone_devices_update_policy"
    ON public.phone_devices
    FOR UPDATE
    USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND joined_at IS NOT NULL
        )
    );

CREATE POLICY "phone_devices_delete_policy"
    ON public.phone_devices
    FOR DELETE
    USING (
        team_id IN (
            SELECT team_id FROM public.team_members
            WHERE user_id = auth.uid()
            AND joined_at IS NOT NULL
        )
    );

-- ============================================================================
-- CONVERSATIONS TABLE POLICIES
-- ============================================================================

-- Team members can access conversations for phone devices in their team
CREATE POLICY "conversations_select_policy"
    ON public.conversations
    FOR SELECT
    USING (
        phone_device_id IN (
            SELECT id FROM public.phone_devices
            WHERE team_id IN (
                SELECT team_id FROM public.team_members
                WHERE user_id = auth.uid()
                AND joined_at IS NOT NULL
            )
        )
    );

CREATE POLICY "conversations_insert_policy"
    ON public.conversations
    FOR INSERT
    WITH CHECK (
        phone_device_id IN (
            SELECT id FROM public.phone_devices
            WHERE team_id IN (
                SELECT team_id FROM public.team_members
                WHERE user_id = auth.uid()
                AND joined_at IS NOT NULL
            )
        )
    );

CREATE POLICY "conversations_update_policy"
    ON public.conversations
    FOR UPDATE
    USING (
        phone_device_id IN (
            SELECT id FROM public.phone_devices
            WHERE team_id IN (
                SELECT team_id FROM public.team_members
                WHERE user_id = auth.uid()
                AND joined_at IS NOT NULL
            )
        )
    );

-- Note: No DELETE policy for conversations (audit trail)
