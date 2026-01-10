-- Create phone_devices table
-- Physical phone hardware owned by teams with individual Stripe subscriptions
-- Each device has its own subscription tier and can be assigned to a care recipient

CREATE TABLE IF NOT EXISTS phone_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    care_recipient_id UUID REFERENCES care_recipients(id) ON DELETE SET NULL,
    device_serial TEXT NOT NULL UNIQUE,
    phone_number TEXT,
    status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('inactive', 'active', 'suspended', 'cancelled')),
    subscription_tier TEXT CHECK (subscription_tier IN ('base_wifi', 'mid', 'premium_5g')),
    stripe_subscription_id TEXT UNIQUE,
    stripe_price_id TEXT,
    activated_at TIMESTAMPTZ,
    subscription_start TIMESTAMPTZ,
    subscription_end TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_phone_devices_team_id ON phone_devices(team_id);
CREATE INDEX IF NOT EXISTS idx_phone_devices_care_recipient_id ON phone_devices(care_recipient_id);
CREATE INDEX IF NOT EXISTS idx_phone_devices_device_serial ON phone_devices(device_serial);
CREATE INDEX IF NOT EXISTS idx_phone_devices_stripe_subscription_id ON phone_devices(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_phone_devices_status ON phone_devices(status);

-- Enable RLS (policies defined in 00009_rls_policies.sql)
ALTER TABLE phone_devices ENABLE ROW LEVEL SECURITY;
