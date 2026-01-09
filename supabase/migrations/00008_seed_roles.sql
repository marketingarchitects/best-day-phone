-- Seed roles table with initial role definitions
-- These roles define the permissions for team members

INSERT INTO roles (name, description, permissions) VALUES
(
    'primary_caregiver',
    'Primary caregiver with full team management permissions',
    '{
        "team": {
            "update": true,
            "delete": false
        },
        "members": {
            "invite": true,
            "update": true,
            "remove": true
        },
        "care_recipients": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        },
        "phone_devices": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
        },
        "conversations": {
            "read": true
        },
        "billing": {
            "manage": true
        }
    }'::jsonb
),
(
    'secondary_caregiver',
    'Secondary caregiver with view and interact permissions',
    '{
        "team": {
            "update": false,
            "delete": false
        },
        "members": {
            "invite": false,
            "update": false,
            "remove": false
        },
        "care_recipients": {
            "create": false,
            "read": true,
            "update": false,
            "delete": false
        },
        "phone_devices": {
            "create": false,
            "read": true,
            "update": false,
            "delete": false
        },
        "conversations": {
            "read": true
        },
        "billing": {
            "manage": false
        }
    }'::jsonb
)
ON CONFLICT (name) DO NOTHING;
