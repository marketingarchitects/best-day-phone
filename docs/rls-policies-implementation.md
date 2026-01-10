# Row Level Security (RLS) Policies Implementation

## Overview

Implemented comprehensive Row Level Security policies to enforce strict data isolation between teams (family/household units). All policies use `auth.uid()` to ensure user-based access control.

## Changes Made

### 1. Consolidated RLS Policies

**Removed duplicate policies from individual table migrations:**
- `00002_create_roles.sql`
- `00003_create_profiles.sql`
- `00004_create_team_members.sql`
- `00005_create_care_recipients.sql`
- `00006_create_phone_devices.sql`
- `00007_create_conversations.sql`

These files now only enable RLS and reference the consolidated policy file.

**Enhanced `00009_rls_policies.sql` with complete policies:**

### 2. Policy Details by Table

#### Roles Table
- **SELECT**: Public read access (roles are system-defined)
- **INSERT/UPDATE/DELETE**: Restricted to service role only

#### Teams Table
- **INSERT**: Allows authenticated users to create new teams (for sign-up)
- **SELECT**: Members can view teams they belong to
- **UPDATE**: Only primary caregivers can update team settings
- **DELETE**: No policy (prevents deletion - soft delete only)

#### Profiles Table
- **INSERT**: Users can create their own profile
- **SELECT**: Users can view their own profile
- **UPDATE**: Users can update their own profile

#### Team Members Table
- **SELECT**: Members can view other members in their teams
- **INSERT**: Primary caregivers can invite new members + allows first member creation
- **UPDATE**: Primary caregivers can change roles; users can update their own records
- **DELETE**: Primary caregivers can remove members (except themselves)

#### Care Recipients Table
- **SELECT/INSERT/UPDATE/DELETE**: Full access for all team members

#### Phone Devices Table
- **SELECT/INSERT/UPDATE/DELETE**: Full access for all team members

#### Conversations Table
- **SELECT/INSERT/UPDATE**: Team members can access conversations for devices in their team
- **DELETE**: No policy (maintains audit trail)

## Key Security Features

1. **Team-based Isolation**: All policies enforce strict data isolation using `team_id`
2. **Active Membership Check**: Policies verify `joined_at IS NOT NULL` to ensure only active members have access
3. **Role Verification**: Primary caregiver checks properly join with roles table to verify permissions
4. **Self-service Restrictions**: Users cannot delete themselves from teams
5. **Audit Trail**: Conversations cannot be deleted to maintain history
6. **First-time Setup**: Policies support initial team and member creation during sign-up

## Testing Checklist

- [ ] Test RLS policies directly in Supabase SQL editor
- [ ] Verify data isolation between teams
- [ ] Test role-based permissions (primary vs secondary caregiver)
- [ ] Validate team creation flow
- [ ] Test member invitation flow
- [ ] Verify users can only access their team's data
- [ ] Test edge cases (trying to access other teams' data should fail)
- [ ] Verify primary caregiver exclusive actions (team updates, member management)

## Migration Status

All RLS policies are defined in migration file:
- `supabase/migrations/00009_rls_policies.sql`

To apply migrations to your Supabase instance:
```bash
supabase db reset  # Reset and reapply all migrations
# OR
supabase db push   # Push to remote instance
```

## Next Steps

1. Run the migrations on your Supabase instance
2. Test the RLS policies using the checklist above
3. Implement application-layer team context helpers
4. Build team switcher UI (if needed for multi-team users)
5. Implement invitation system for secondary caregivers
