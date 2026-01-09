-- Automatically create team for new users after email confirmation
-- This trigger runs when a user confirms their email and creates a team with them as primary caregiver

CREATE OR REPLACE FUNCTION public.handle_user_team_creation()
RETURNS TRIGGER AS $$
DECLARE
    v_team_name TEXT;
    v_team_id UUID;
    v_primary_role_id UUID;
BEGIN
    -- Only create team if user doesn't already belong to one
    IF EXISTS (
        SELECT 1 FROM public.team_members
        WHERE user_id = NEW.id
    ) THEN
        RETURN NEW;
    END IF;

    -- Get team name from user metadata, or use default
    v_team_name := COALESCE(
        NEW.raw_user_meta_data->>'team_name',
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email) || '''s Family'
    );

    -- Get primary_caregiver role ID
    SELECT id INTO v_primary_role_id
    FROM public.roles
    WHERE name = 'primary_caregiver';

    IF v_primary_role_id IS NULL THEN
        RAISE EXCEPTION 'primary_caregiver role not found';
    END IF;

    -- Create team
    INSERT INTO public.teams (name)
    VALUES (v_team_name)
    RETURNING id INTO v_team_id;

    -- Add user as primary caregiver (already joined)
    INSERT INTO public.team_members (team_id, user_id, role_id, is_primary, joined_at)
    VALUES (v_team_id, NEW.id, v_primary_role_id, true, NOW());

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on user confirmation (when email is verified)
-- Note: This triggers when email_confirmed_at is set
CREATE OR REPLACE TRIGGER on_user_confirmed_create_team
    AFTER UPDATE OF email_confirmed_at ON auth.users
    FOR EACH ROW
    WHEN (NEW.email_confirmed_at IS NOT NULL AND OLD.email_confirmed_at IS NULL)
    EXECUTE FUNCTION public.handle_user_team_creation();

-- Also handle users who sign up with auto-confirm (for development)
CREATE OR REPLACE TRIGGER on_user_created_auto_confirm
    AFTER INSERT ON auth.users
    FOR EACH ROW
    WHEN (NEW.email_confirmed_at IS NOT NULL)
    EXECUTE FUNCTION public.handle_user_team_creation();

COMMENT ON FUNCTION public.handle_user_team_creation() IS 'Automatically creates team and assigns user as primary caregiver on signup';
