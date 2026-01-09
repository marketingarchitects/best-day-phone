import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

export default async function ProfilePage() {
  const supabase = await createClient();

  // Get user data
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/login");
  }

  // Get user metadata
  const userMetadata = user.user_metadata || {};
  const appMetadata = user.app_metadata || {};

  // Helper function to format dates
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get user initials for avatar fallback
  const getInitials = (email: string) => {
    const name = userMetadata.full_name || userMetadata.name || email;
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
              <p className="text-muted-foreground mt-1">
                Manage your account information and settings
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={userMetadata.avatar_url || userMetadata.picture}
                  alt={userMetadata.full_name || user.email || "User"}
                />
                <AvatarFallback className="text-lg">
                  {getInitials(user.email || "U")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-2xl">
                  {userMetadata.full_name || userMetadata.name || "User"}
                </CardTitle>
                <CardDescription className="text-base mt-1">
                  {user.email}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Account Information Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Your account details and authentication information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="font-medium text-sm text-muted-foreground">
                  User ID
                </div>
                <div className="sm:col-span-2 text-sm font-mono break-all">
                  {user.id}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="font-medium text-sm text-muted-foreground">
                  Email
                </div>
                <div className="sm:col-span-2 text-sm">
                  {user.email}
                  {user.email_confirmed_at && (
                    <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="font-medium text-sm text-muted-foreground">
                  Phone
                </div>
                <div className="sm:col-span-2 text-sm">
                  {user.phone || "Not provided"}
                  {user.phone_confirmed_at && (
                    <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="font-medium text-sm text-muted-foreground">
                  Provider
                </div>
                <div className="sm:col-span-2 text-sm capitalize">
                  {appMetadata.provider || "email"}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="font-medium text-sm text-muted-foreground">
                  Account Created
                </div>
                <div className="sm:col-span-2 text-sm">
                  {formatDate(user.created_at)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="font-medium text-sm text-muted-foreground">
                  Last Sign In
                </div>
                <div className="sm:col-span-2 text-sm">
                  {formatDate(user.last_sign_in_at)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="font-medium text-sm text-muted-foreground">
                  Last Updated
                </div>
                <div className="sm:col-span-2 text-sm">
                  {formatDate(user.updated_at)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Metadata Card (if exists) */}
        {Object.keys(userMetadata).length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Profile Metadata</CardTitle>
              <CardDescription>
                Additional information associated with your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {Object.entries(userMetadata)
                  .filter(([key]) => !["avatar_url", "picture"].includes(key))
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2"
                    >
                      <div className="font-medium text-sm text-muted-foreground capitalize">
                        {key.replace(/_/g, " ")}
                      </div>
                      <div className="sm:col-span-2 text-sm wrap-break-word">
                        {typeof value === "object"
                          ? JSON.stringify(value, null, 2)
                          : String(value)}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>
              Manage your account settings and security
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline">
                <Link href="/auth/update-password">Change Password</Link>
              </Button>
              <LogoutButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
