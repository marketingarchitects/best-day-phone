-- Helper Functions for Team Management

-- ============================================================================
-- get_user_teams()
-- Returns all teams the current user belongs to
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_user_teams()
RETURNS TABLE (
    team_id UUID,
    team_name TEXT,
    role_name TEXT,
    is_primary BOOLEAN,
    joined_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.id AS team_id,
        t.name AS team_name,
        r.name AS role_name,
        tm.is_primary,
        tm.joined_at
    FROM public.teams t
    INNER JOIN public.team_members tm ON t.id = tm.team_id
    INNER JOIN public.roles r ON tm.role_id = r.id
    WHERE tm.user_id = auth.uid()
    AND tm.joined_at IS NOT NULL
    ORDER BY tm.is_primary DESC, t.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- get_user_role_in_team(team_id)
-- Returns user's role in a specific team
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_user_role_in_team(p_team_id UUID)
RETURNS TABLE (
    role_id UUID,
    role_name TEXT,
    is_primary BOOLEAN,
    permissions JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        r.id AS role_id,
        r.name AS role_name,
        tm.is_primary,
        r.permissions
    FROM public.team_members tm
    INNER JOIN public.roles r ON tm.role_id = r.id
    WHERE tm.team_id = p_team_id
    AND tm.user_id = auth.uid()
    AND tm.joined_at IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- is_primary_caregiver(team_id)
-- Boolean check for primary caregiver status
-- ============================================================================
CREATE OR REPLACE FUNCTION public.is_primary_caregiver(p_team_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.team_members
        WHERE team_id = p_team_id
        AND user_id = auth.uid()
        AND is_primary = true
        AND joined_at IS NOT NULL
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- create_team_with_primary(team_name, user_id)
-- Atomic team creation with primary caregiver
-- ============================================================================
CREATE OR REPLACE FUNCTION public.create_team_with_primary(
    p_team_name TEXT,
    p_user_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_team_id UUID;
    v_user_id UUID;
    v_primary_role_id UUID;
BEGIN
    -- Use provided user_id or current auth user
    v_user_id := COALESCE(p_user_id, auth.uid());
    
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'User ID is required';
    END IF;

    -- Get primary_caregiver role ID
    SELECT id INTO v_primary_role_id
    FROM public.roles
    WHERE name = 'primary_caregiver';

    IF v_primary_role_id IS NULL THEN
        RAISE EXCEPTION 'primary_caregiver role not found';
    END IF;

    -- Create team
    INSERT INTO public.teams (name)
    VALUES (p_team_name)
    RETURNING id INTO v_team_id;

    -- Add user as primary caregiver
    INSERT INTO public.team_members (team_id, user_id, role_id, is_primary, joined_at)
    VALUES (v_team_id, v_user_id, v_primary_role_id, true, NOW());

    RETURN v_team_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- get_team_phone_devices(team_id)
-- Get all phone devices for a team with care recipient info
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_team_phone_devices(p_team_id UUID)
RETURNS TABLE (
    device_id UUID,
    device_serial TEXT,
    phone_number TEXT,
    status TEXT,
    subscription_tier TEXT,
    care_recipient_id UUID,
    care_recipient_name TEXT,
    activated_at TIMESTAMPTZ,
    subscription_start TIMESTAMPTZ,
    subscription_end TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pd.id AS device_id,
        pd.device_serial,
        pd.phone_number,
        pd.status,
        pd.subscription_tier,
        pd.care_recipient_id,
        cr.name AS care_recipient_name,
        pd.activated_at,
        pd.subscription_start,
        pd.subscription_end
    FROM public.phone_devices pd
    LEFT JOIN public.care_recipients cr ON pd.care_recipient_id = cr.id
    WHERE pd.team_id = p_team_id
    ORDER BY pd.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add comments
COMMENT ON FUNCTION public.get_user_teams() IS 'Returns all teams the current user belongs to';
COMMENT ON FUNCTION public.get_user_role_in_team(UUID) IS 'Returns user role in a specific team';
COMMENT ON FUNCTION public.is_primary_caregiver(UUID) IS 'Checks if current user is primary caregiver';
COMMENT ON FUNCTION public.create_team_with_primary(TEXT, UUID) IS 'Creates team and assigns primary caregiver atomically';
COMMENT ON FUNCTION public.get_team_phone_devices(UUID) IS 'Gets all phone devices for a team with care recipient details';
