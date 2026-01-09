import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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
import { CheckCircle2 } from "lucide-react";

export default async function SubscriptionConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const supabase = await createClient();

  // Get user data
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/login");
  }

  // Get the session_id from URL params (passed by Stripe)
  const params = await searchParams;
  const sessionId = params.session_id;

  // TODO: Verify the Stripe session and retrieve subscription details
  // const session = await stripe.checkout.sessions.retrieve(sessionId);

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
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard/subscription">
                  Subscriptions
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Confirmation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="container mx-auto max-w-4xl">
          {/* Success Message */}
          <div className="flex flex-col items-center justify-center gap-6 mb-8 mt-8">
            <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-4">
              <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight mb-2">
                Welcome to Best Day Phone!
              </h1>
              <p className="text-muted-foreground text-lg">
                Your subscription has been confirmed
              </p>
            </div>
          </div>

          {/* Subscription Details Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>
                Your subscription information and next steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {sessionId && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="font-medium text-sm text-muted-foreground">
                      Session ID
                    </div>
                    <div className="sm:col-span-2 font-mono text-xs break-all">
                      {sessionId}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="font-medium text-sm text-muted-foreground">
                    Plan
                  </div>
                  <div className="sm:col-span-2 text-sm">
                    <span className="text-muted-foreground">
                      Loading subscription details...
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="font-medium text-sm text-muted-foreground">
                    Status
                  </div>
                  <div className="sm:col-span-2 text-sm">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      Active
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="font-medium text-sm text-muted-foreground">
                    Billing Cycle
                  </div>
                  <div className="sm:col-span-2 text-sm">
                    <span className="text-muted-foreground">
                      Loading billing details...
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What&apos;s Next?</CardTitle>
              <CardDescription>
                Get started with your Best Day Phone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Your device will ship soon
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You&apos;ll receive a confirmation email with tracking
                      information once your Best Day Phone has been shipped.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Set up your loved one&apos;s profile
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      While you wait, you can configure preferences and
                      personalize the experience for your loved one.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">
                      Connect when it arrives
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Simple setup instructions will be included with your
                      device. No technical skills required.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Manage your subscription and get help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard/settings">Manage Settings</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/dashboard/subscription">View Subscription</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
