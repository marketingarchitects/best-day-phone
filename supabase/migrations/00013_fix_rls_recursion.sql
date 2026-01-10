-- Fix infinite recursion in team_members RLS policies
-- The issue: team_members_select_policy was querying team_members from within itself

-- ============================================================================
-- DROP EXISTING PROBLEMATIC POLICIES
-- ============================================================================

DROP POLICY IF EXISTS "team_members_select_policy" ON public.team_members;
DROP POLICY IF EXISTS "team_members_insert_policy" ON public.team_members;
DROP POLICY IF EXISTS "team_members_update_policy" ON public.team_members;
DROP POLICY IF EXISTS "team_members_delete_policy" ON public.team_members;

-- ============================================================================
-- CREATE HELPER FUNCTION TO CHECK TEAM MEMBERSHIP
-- This function uses SECURITY DEFINER to bypass RLS and avoid recursion
-- ============================================================================

CREATE OR REPLACE FUNCTION public.user_team_ids()
RETURNS SETOF UUID AS $$
BEGIN
    RETURN QUERY
    SELECT team_id 
    FROM public.team_members
    WHERE user_id = auth.uid()
    AND joined_at IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

COMMENT ON FUNCTION public.user_team_ids() IS 'Returns team IDs for current user, bypasses RLS to prevent recursion';

-- ============================================================================
-- RECREATE TEAM_MEMBERS POLICIES USING THE HELPER FUNCTION
-- ============================================================================

-- Members can view other members in their teams
CREATE POLICY "team_members_select_policy"
    ON public.team_members
    FOR SELECT
    USING (
        team_id IN (SELECT public.user_team_ids())
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
        -- User can update their own record (e.g., accepting invitation)
        user_id = auth.uid()
        OR
        -- Primary caregiver can update any member in their teams
        team_id IN (
            SELECT tm.team_id 
            FROM public.team_members tm
            JOIN public.roles r ON tm.role_id = r.id
            WHERE tm.user_id = auth.uid()
            AND tm.is_primary = true
            AND tm.joined_at IS NOT NULL
            AND r.name = 'primary_caregiver'
        )
    );

-- Primary caregivers can remove members (except themselves)
CREATE POLICY "team_members_delete_policy"
    ON public.team_members
    FOR DELETE
    USING (
        user_id != auth.uid() -- Cannot delete self
        AND team_id IN (
            SELECT tm.team_id 
            FROM public.team_members tm
            JOIN public.roles r ON tm.role_id = r.id
            WHERE tm.user_id = auth.uid()
            AND tm.is_primary = true
            AND tm.joined_at IS NOT NULL
            AND r.name = 'primary_caregiver'
        )
    );
