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
import {
  getCheckoutSession,
  createCustomerPortalSession,
} from "@/lib/stripe/server";
import Stripe from "stripe";

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

  // Retrieve the Stripe session and subscription details
  let session: Stripe.Checkout.Session | null = null;
  let subscription: Stripe.Subscription | null = null;
  let errorMessage: string | null = null;
  let customerPortalUrl: string | null = null;

  if (sessionId) {
    try {
      session = await getCheckoutSession(sessionId);

      // Extract subscription details if available
      if (session.subscription && typeof session.subscription === "object") {
        subscription = session.subscription as Stripe.Subscription;
      }

      // Create customer portal session for subscription management
      if (session.customer) {
        const customerId =
          typeof session.customer === "string"
            ? session.customer
            : session.customer.id;

        const returnUrl = `${
          process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
        }/dashboard/subscriptions`;
        const portalSession = await createCustomerPortalSession(
          customerId,
          returnUrl
        );
        customerPortalUrl = portalSession.url;
      }
    } catch (error) {
      console.error("Error retrieving Stripe session:", error);
      errorMessage =
        "Unable to retrieve subscription details. Please contact support.";
    }
  }

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
              {errorMessage ? (
                <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                  {errorMessage}
                </div>
              ) : (
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

                  {session?.customer_email && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="font-medium text-sm text-muted-foreground">
                        Email
                      </div>
                      <div className="sm:col-span-2 text-sm">
                        {session.customer_email}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="font-medium text-sm text-muted-foreground">
                      Plan
                    </div>
                    <div className="sm:col-span-2 text-sm">
                      {subscription?.items?.data?.[0]?.price?.nickname ||
                        (typeof subscription?.items?.data?.[0]?.price
                          ?.product === "string"
                          ? subscription.items.data[0].price.product
                          : "Best Day Phone Subscription")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="font-medium text-sm text-muted-foreground">
                      Amount
                    </div>
                    <div className="sm:col-span-2 text-sm">
                      {session?.amount_total ? (
                        <span className="font-semibold">
                          ${(session.amount_total / 100).toFixed(2)}{" "}
                          {session.currency?.toUpperCase()}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="font-medium text-sm text-muted-foreground">
                      Status
                    </div>
                    <div className="sm:col-span-2 text-sm">
                      {subscription?.status === "active" ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                          Active
                        </span>
                      ) : subscription?.status === "trialing" ? (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          Trial
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                          {subscription?.status || "Pending"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="font-medium text-sm text-muted-foreground">
                      Billing Cycle
                    </div>
                    <div className="sm:col-span-2 text-sm">
                      {subscription?.items?.data?.[0]?.price?.recurring
                        ?.interval ? (
                        <span className="capitalize">
                          {subscription.items.data[0].price.recurring.interval}
                          ly
                        </span>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </div>
                  </div>

                  {subscription &&
                    "current_period_end" in subscription &&
                    typeof subscription.current_period_end === "number" && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="font-medium text-sm text-muted-foreground">
                          Next Billing Date
                        </div>
                        <div className="sm:col-span-2 text-sm">
                          {new Date(
                            (subscription.current_period_end as number) * 1000
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    )}

                  {session?.payment_status && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="font-medium text-sm text-muted-foreground">
                        Payment Status
                      </div>
                      <div className="sm:col-span-2 text-sm">
                        {session.payment_status === "paid" ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            Paid
                          </span>
                        ) : (
                          <span className="capitalize">
                            {session.payment_status}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                {customerPortalUrl ? (
                  <Button asChild variant="outline">
                    <a
                      href={customerPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Manage Subscription
                    </a>
                  </Button>
                ) : (
                  <Button asChild variant="outline">
                    <Link href="/dashboard/subscriptions">
                      View Subscription
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
