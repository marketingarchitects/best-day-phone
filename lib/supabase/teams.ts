// Server-side team context helpers
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database.types";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

/**
 * Get all teams for the current user
 */
export async function getUserTeams(supabase: SupabaseClient) {
  const { data, error } = await supabase.rpc("get_user_teams");

  if (error) {
    console.error("Error fetching user teams:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Get the user's primary team (first team they belong to)
 * Most users will only belong to one team
 */
export async function getPrimaryTeam(supabase: SupabaseClient) {
  const { data: teams, error } = await getUserTeams(supabase);

  if (error || !teams || teams.length === 0) {
    return { data: null, error: error || new Error("No teams found") };
  }

  // Return the first team (primary caregiver teams are sorted first)
  const primaryTeam = teams[0];

  // Fetch full team details
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .select("*")
    .eq("id", primaryTeam.team_id)
    .single();

  if (teamError) {
    return { data: null, error: teamError };
  }

  return {
    data: {
      ...team,
      role_name: primaryTeam.role_name,
      is_primary: primaryTeam.is_primary,
    },
    error: null,
  };
}

/**
 * Get user's role in a specific team
 */
export async function getUserRoleInTeam(
  supabase: SupabaseClient,
  teamId: string
) {
  const { data, error } = await supabase.rpc("get_user_role_in_team", {
    p_team_id: teamId,
  });

  if (error) {
    console.error("Error fetching user role:", error);
    return { data: null, error };
  }

  return { data: data?.[0] || null, error: null };
}

/**
 * Check if user is primary caregiver in a team
 */
export async function isPrimaryCaregiver(
  supabase: SupabaseClient,
  teamId: string
): Promise<boolean> {
  const { data, error } = await supabase.rpc("is_primary_caregiver", {
    p_team_id: teamId,
  });

  if (error) {
    console.error("Error checking primary caregiver status:", error);
    return false;
  }

  return data || false;
}

/**
 * Create a new team with the current user as primary caregiver
 */
export async function createTeamWithPrimary(
  supabase: SupabaseClient,
  teamName: string
) {
  const { data: teamId, error } = await supabase.rpc(
    "create_team_with_primary",
    {
      p_team_name: teamName,
    }
  );

  if (error) {
    console.error("Error creating team:", error);
    return { data: null, error };
  }

  // Fetch the created team
  const { data: team, error: fetchError } = await supabase
    .from("teams")
    .select("*")
    .eq("id", teamId)
    .single();

  if (fetchError) {
    return { data: null, error: fetchError };
  }

  return { data: team, error: null };
}

/**
 * Get all phone devices for a team
 */
export async function getTeamPhoneDevices(
  supabase: SupabaseClient,
  teamId: string
) {
  const { data, error } = await supabase.rpc("get_team_phone_devices", {
    p_team_id: teamId,
  });

  if (error) {
    console.error("Error fetching team phone devices:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Get all care recipients for a team
 */
export async function getTeamCareRecipients(
  supabase: SupabaseClient,
  teamId: string
) {
  const { data, error } = await supabase
    .from("care_recipients")
    .select("*")
    .eq("team_id", teamId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching care recipients:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Get all team members for a team
 */
export async function getTeamMembers(supabase: SupabaseClient, teamId: string) {
  const { data, error } = await supabase
    .from("team_members")
    .select(
      `
      *,
      role:roles(*),
      profile:profiles(*)
    `
    )
    .eq("team_id", teamId)
    .order("is_primary", { ascending: false });

  if (error) {
    console.error("Error fetching team members:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Update team details (primary caregiver only)
 */
export async function updateTeam(
  supabase: SupabaseClient,
  teamId: string,
  updates: Partial<Database["public"]["Tables"]["teams"]["Update"]>
) {
  const { data, error } = await supabase
    .from("teams")
    .update(updates)
    .eq("id", teamId)
    .select()
    .single();

  if (error) {
    console.error("Error updating team:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Add a team member (invite)
 */
export async function inviteTeamMember(
  supabase: SupabaseClient,
  teamId: string,
  userId: string,
  roleId: string
) {
  const { data, error } = await supabase
    .from("team_members")
    .insert({
      team_id: teamId,
      user_id: userId,
      role_id: roleId,
      is_primary: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error inviting team member:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Accept team invitation
 */
export async function acceptTeamInvitation(
  supabase: SupabaseClient,
  teamMemberId: string
) {
  const { data, error } = await supabase
    .from("team_members")
    .update({ joined_at: new Date().toISOString() })
    .eq("id", teamMemberId)
    .select()
    .single();

  if (error) {
    console.error("Error accepting invitation:", error);
    return { data: null, error };
  }

  return { data, error: null };
}

/**
 * Get role by name
 */
export async function getRoleByName(
  supabase: SupabaseClient,
  roleName: string
) {
  const { data, error } = await supabase
    .from("roles")
    .select("*")
    .eq("name", roleName)
    .single();

  if (error) {
    console.error("Error fetching role:", error);
    return { data: null, error };
  }

  return { data, error: null };
}
