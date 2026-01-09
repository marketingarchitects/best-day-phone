-- Create conversations table
-- Call/conversation logs linked to phone devices

CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_device_id UUID NOT NULL REFERENCES phone_devices(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    ended_at TIMESTAMPTZ,
    duration_seconds INTEGER,
    metadata JSONB DEFAULT '{}'
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_conversations_phone_device_id ON conversations(phone_device_id);
CREATE INDEX IF NOT EXISTS idx_conversations_started_at ON conversations(started_at DESC);

-- Add computed duration trigger
CREATE OR REPLACE FUNCTION compute_conversation_duration()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.ended_at IS NOT NULL AND NEW.started_at IS NOT NULL THEN
        NEW.duration_seconds = EXTRACT(EPOCH FROM (NEW.ended_at - NEW.started_at))::INTEGER;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS compute_duration_on_insert_or_update ON conversations;
CREATE TRIGGER compute_duration_on_insert_or_update
    BEFORE INSERT OR UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION compute_conversation_duration();

-- Enable RLS (policies defined in 00009_rls_policies.sql)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
