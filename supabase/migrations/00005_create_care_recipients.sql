-- Create care_recipients table
-- The people receiving care within a team/household

CREATE TABLE IF NOT EXISTS care_recipients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    date_of_birth DATE,
    diagnosis TEXT,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_care_recipients_team_id ON care_recipients(team_id);

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_care_recipients_updated_at ON care_recipients;
CREATE TRIGGER update_care_recipients_updated_at
    BEFORE UPDATE ON care_recipients
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (policies defined in 00009_rls_policies.sql)
ALTER TABLE care_recipients ENABLE ROW LEVEL SECURITY;
