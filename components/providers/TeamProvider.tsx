"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/types/database.types";

type Team = Database["public"]["Tables"]["teams"]["Row"];

interface TeamContextType {
  currentTeam: Team | null;
  teams: Array<{
    team_id: string;
    team_name: string;
    role_name: string;
    is_primary: boolean;
    joined_at: string;
  }>;
  isLoading: boolean;
  error: Error | null;
  switchTeam: (teamId: string) => Promise<void>;
  refreshTeams: () => Promise<void>;
  isPrimaryCaregiver: boolean;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [teams, setTeams] = useState<TeamContextType["teams"]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isPrimaryCaregiver, setIsPrimaryCaregiver] = useState(false);

  const supabase = createClient();

  const loadTeams = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get all user teams
      const { data: userTeams, error: teamsError } = await supabase.rpc(
        "get_user_teams"
      );

      if (teamsError) throw teamsError;

      if (!userTeams || userTeams.length === 0) {
        setTeams([]);
        setCurrentTeam(null);
        setIsPrimaryCaregiver(false);
        return;
      }

      setTeams(userTeams);

      // Load the first team as current (or from localStorage)
      const savedTeamId =
        typeof window !== "undefined"
          ? localStorage.getItem("currentTeamId")
          : null;
      const teamToLoad =
        userTeams.find(
          (t: TeamContextType["teams"][number]) => t.team_id === savedTeamId
        ) || userTeams[0];

      // Fetch full team details
      const { data: team, error: teamError } = await supabase
        .from("teams")
        .select("*")
        .eq("id", teamToLoad.team_id)
        .single();

      if (teamError) throw teamError;

      setCurrentTeam(team);
      setIsPrimaryCaregiver(teamToLoad.is_primary);

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("currentTeamId", team.id);
      }
    } catch (err) {
      console.error("Error loading teams:", err);
      setError(err instanceof Error ? err : new Error("Failed to load teams"));
    } finally {
      setIsLoading(false);
    }
  }, [supabase]);

  const switchTeam = React.useCallback(
    async (teamId: string) => {
      try {
        setIsLoading(true);
        setError(null);

        const teamInfo = teams.find((t) => t.team_id === teamId);
        if (!teamInfo) {
          throw new Error("Team not found");
        }

        const { data: team, error: teamError } = await supabase
          .from("teams")
          .select("*")
          .eq("id", teamId)
          .single();

        if (teamError) throw teamError;

        setCurrentTeam(team);
        setIsPrimaryCaregiver(teamInfo.is_primary);

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("currentTeamId", team.id);
        }
      } catch (err) {
        console.error("Error switching team:", err);
        setError(
          err instanceof Error ? err : new Error("Failed to switch team")
        );
      } finally {
        setIsLoading(false);
      }
    },
    [teams, supabase]
  );

  const refreshTeams = React.useCallback(async () => {
    await loadTeams();
  }, [loadTeams]);

  useEffect(() => {
    loadTeams();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        loadTeams();
      } else if (event === "SIGNED_OUT") {
        setCurrentTeam(null);
        setTeams([]);
        setIsPrimaryCaregiver(false);
        if (typeof window !== "undefined") {
          localStorage.removeItem("currentTeamId");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadTeams, supabase.auth]);

  return (
    <TeamContext.Provider
      value={{
        currentTeam,
        teams,
        isLoading,
        error,
        switchTeam,
        refreshTeams,
        isPrimaryCaregiver,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);
  if (context === undefined) {
    throw new Error("useTeam must be used within a TeamProvider");
  }
  return context;
}
