-- Triggers for Data Integrity and Business Logic

-- ============================================================================
-- Enforce single primary caregiver per team
-- ============================================================================
CREATE OR REPLACE FUNCTION public.enforce_single_primary_caregiver()
RETURNS TRIGGER AS $$
BEGIN
    -- If setting is_primary to true, check if another primary exists
    IF NEW.is_primary = true THEN
        IF EXISTS (
            SELECT 1 FROM public.team_members
            WHERE team_id = NEW.team_id
            AND is_primary = true
            AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)
        ) THEN
            RAISE EXCEPTION 'Team already has a primary caregiver';
        END IF;
    END IF;

    -- Prevent removing the last primary caregiver
    IF TG_OP = 'UPDATE' AND OLD.is_primary = true AND NEW.is_primary = false THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.team_members
            WHERE team_id = NEW.team_id
            AND is_primary = true
            AND id != NEW.id
        ) THEN
            RAISE EXCEPTION 'Cannot remove the last primary caregiver';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_single_primary_caregiver_trigger
    BEFORE INSERT OR UPDATE ON public.team_members
    FOR EACH ROW
    EXECUTE FUNCTION public.enforce_single_primary_caregiver();

-- ============================================================================
-- Prevent deleting the last primary caregiver
-- ============================================================================
CREATE OR REPLACE FUNCTION public.prevent_delete_last_primary()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.is_primary = true THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.team_members
            WHERE team_id = OLD.team_id
            AND is_primary = true
            AND id != OLD.id
        ) THEN
            RAISE EXCEPTION 'Cannot delete the last primary caregiver';
        END IF;
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_delete_last_primary_trigger
    BEFORE DELETE ON public.team_members
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_delete_last_primary();

-- ============================================================================
-- Validate phone device status transitions
-- ============================================================================
CREATE OR REPLACE FUNCTION public.validate_device_status_transition()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure subscription fields are set when status is active
    IF NEW.status = 'active' THEN
        IF NEW.subscription_tier IS NULL THEN
            RAISE EXCEPTION 'subscription_tier is required when status is active';
        END IF;
        IF NEW.stripe_subscription_id IS NULL THEN
            RAISE EXCEPTION 'stripe_subscription_id is required when status is active';
        END IF;
        IF NEW.activated_at IS NULL THEN
            NEW.activated_at := NOW();
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_device_status_transition_trigger
    BEFORE INSERT OR UPDATE ON public.phone_devices
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_device_status_transition();

-- ============================================================================
-- Validate care_recipient belongs to same team as phone_device
-- ============================================================================
CREATE OR REPLACE FUNCTION public.validate_care_recipient_team()
RETURNS TRIGGER AS $$
DECLARE
    v_care_recipient_team_id UUID;
BEGIN
    -- If care_recipient_id is set, validate it belongs to the same team
    IF NEW.care_recipient_id IS NOT NULL THEN
        SELECT team_id INTO v_care_recipient_team_id
        FROM public.care_recipients
        WHERE id = NEW.care_recipient_id;

        IF v_care_recipient_team_id IS NULL THEN
            RAISE EXCEPTION 'care_recipient not found';
        END IF;

        IF v_care_recipient_team_id != NEW.team_id THEN
            RAISE EXCEPTION 'care_recipient must belong to the same team as phone_device';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_care_recipient_team_trigger
    BEFORE INSERT OR UPDATE ON public.phone_devices
    FOR EACH ROW
    EXECUTE FUNCTION public.validate_care_recipient_team();

-- Add comments
COMMENT ON FUNCTION public.enforce_single_primary_caregiver() IS 'Ensures each team has exactly one primary caregiver';
COMMENT ON FUNCTION public.prevent_delete_last_primary() IS 'Prevents deletion of the last primary caregiver';
COMMENT ON FUNCTION public.validate_device_status_transition() IS 'Validates phone device status transitions and required fields';
COMMENT ON FUNCTION public.validate_care_recipient_team() IS 'Ensures care recipient belongs to same team as phone device';
