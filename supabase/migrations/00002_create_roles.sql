-- Create roles table
-- Defines available roles with permissions (e.g., primary_caregiver, secondary_caregiver)

CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    permissions JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add index on name for lookups
CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(name);

-- Enable RLS (policies defined in 00009_rls_policies.sql)
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
