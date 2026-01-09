import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/server";
import {
  getPrimaryTeam,
  getTeamMembers,
  isPrimaryCaregiver,
} from "@/lib/supabase/teams";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default async function TeamSettingsPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    redirect("/auth/login");
  }

  // Get team data
  const { data: team } = await getPrimaryTeam(supabase);

  if (!team) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4">
        <p>No team found. Please contact support.</p>
      </div>
    );
  }

  const isPrimary = await isPrimaryCaregiver(supabase, team.id);
  const { data: members } = await getTeamMembers(supabase, team.id);

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Team Settings</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="container mx-auto max-w-4xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your team and member permissions
            </p>
          </div>

          {/* Team Information */}
          <Card>
            <CardHeader>
              <CardTitle>Team Information</CardTitle>
              <CardDescription>
                Basic information about your family team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input
                  id="team-name"
                  defaultValue={team.name}
                  disabled={!isPrimary}
                />
                {!isPrimary && (
                  <p className="text-xs text-muted-foreground">
                    Only the primary caregiver can update team settings
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label>Team ID</Label>
                <Input value={team.id} disabled className="font-mono text-xs" />
              </div>
              {isPrimary && <Button disabled>Save Changes</Button>}
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                People who can access and manage this family's devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members && members.length > 0 ? (
                  members.map((member: any) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {member.profile?.full_name ||
                              member.profile?.user_id ||
                              "Unknown"}
                          </p>
                          {member.is_primary && (
                            <Badge variant="default">Primary</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {member.role?.name?.replace("_", " ")}
                        </p>
                        {!member.joined_at && (
                          <Badge variant="outline">Pending Invitation</Badge>
                        )}
                      </div>
                      {isPrimary && !member.is_primary && (
                        <Button variant="outline" size="sm" disabled>
                          Remove
                        </Button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No team members found
                  </p>
                )}
                {isPrimary && (
                  <Button variant="outline" className="w-full" disabled>
                    Invite Team Member
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>
                Manage billing and subscriptions for your devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Each phone device has its own subscription. Manage individual
                device subscriptions from the Subscriptions page.
              </p>
              {team.stripe_customer_id ? (
                <div className="grid gap-2">
                  <Label>Stripe Customer ID</Label>
                  <Input
                    value={team.stripe_customer_id}
                    disabled
                    className="font-mono text-xs"
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No billing information on file
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
