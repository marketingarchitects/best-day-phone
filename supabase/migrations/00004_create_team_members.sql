-- Create team_members table
-- Join table linking users to teams with roles
-- Users can belong to multiple teams with different roles

CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    invited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    joined_at TIMESTAMPTZ,
    UNIQUE(team_id, user_id)
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_role_id ON team_members(role_id);
CREATE INDEX IF NOT EXISTS idx_team_members_is_primary ON team_members(team_id, is_primary) WHERE is_primary = true;

-- Enable RLS (policies defined in 00009_rls_policies.sql)
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
