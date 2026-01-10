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
import { CreditCard, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { SelectedPlanCard } from "@/components/marketing/SelectedPlanCard";

export default async function SubscriptionPage() {
  const supabase = await createClient();

  // Get user data
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/login");
  }

  // TODO: Fetch user's Stripe customer ID from database
  // const { data: profile } = await supabase
  //   .from('profiles')
  //   .select('stripe_customer_id')
  //   .eq('id', user.id)
  //   .single();

  // TODO: Initialize Stripe and fetch subscriptions
  // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  // const subscriptions = await stripe.subscriptions.list({
  //   customer: profile.stripe_customer_id,
  //   limit: 10,
  //   expand: ['data.default_payment_method', 'data.items.data.price.product']
  // });

  // Mock subscription data for display (remove when Stripe is integrated)
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

  const mockSubscriptions = [
    {
      id: "sub_mock_123",
      status: "active",
      planName: "Premium (5G)",
      amount: 15000, // in cents
      currency: "usd",
      interval: "month",
      currentPeriodEnd: thirtyDaysFromNow,
      cancelAtPeriodEnd: false,
      paymentMethod: {
        type: "card",
        last4: "4242",
        brand: "visa",
      },
    },
  ];

  // Helper function to format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  // Helper function to format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Helper function to get status badge
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { icon: React.ReactNode; className: string; label: string }
    > = {
      active: {
        icon: <CheckCircle2 className="h-3 w-3" />,
        className:
          "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        label: "Active",
      },
      trialing: {
        icon: <Clock className="h-3 w-3" />,
        className:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
        label: "Trial",
      },
      past_due: {
        icon: <AlertCircle className="h-3 w-3" />,
        className:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        label: "Past Due",
      },
      canceled: {
        icon: <AlertCircle className="h-3 w-3" />,
        className:
          "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
        label: "Canceled",
      },
      incomplete: {
        icon: <AlertCircle className="h-3 w-3" />,
        className:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
        label: "Incomplete",
      },
    };

    const config = statusConfig[status] || statusConfig.canceled;

    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  const hasActiveSubscription = mockSubscriptions.some(
    (sub) => sub.status === "active" || sub.status === "trialing"
  );

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
                <BreadcrumbPage>Subscriptions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="container mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Subscriptions
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your Best Day Phone subscriptions and billing
                </p>
              </div>
              {!hasActiveSubscription && (
                <Button asChild>
                  <Link href="/#pricing">Subscribe Now</Link>
                </Button>
              )}
            </div>
          </div>

          {mockSubscriptions.length === 0 ? (
            // No subscription state
            <div className="space-y-6">
              {/* Show selected plan card if user has one */}
              <SelectedPlanCard />

              <Card>
                <CardHeader>
                  <CardTitle>No Active Subscription</CardTitle>
                  <CardDescription>
                    You don&apos;t have an active subscription yet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Start Your Journey
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Subscribe to Best Day Phone to bring companionship and
                      connection to your loved one&apos;s daily life.
                    </p>
                    <Button asChild size="lg">
                      <Link href="/#pricing">View Plans</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // List subscriptions
            <div className="space-y-6">
              {mockSubscriptions.map((subscription) => (
                <Card key={subscription.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {subscription.planName}
                          {getStatusBadge(subscription.status)}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {formatCurrency(
                            subscription.amount,
                            subscription.currency
                          )}{" "}
                          per {subscription.interval}
                        </CardDescription>
                      </div>
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Subscription Details */}
                      <div className="grid gap-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="font-medium text-sm text-muted-foreground">
                            Subscription ID
                          </div>
                          <div className="sm:col-span-2 text-xs font-mono">
                            {subscription.id}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="font-medium text-sm text-muted-foreground">
                            Billing Cycle
                          </div>
                          <div className="sm:col-span-2 text-sm capitalize">
                            {subscription.interval}ly
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="font-medium text-sm text-muted-foreground">
                            {subscription.cancelAtPeriodEnd
                              ? "Cancels On"
                              : "Renews On"}
                          </div>
                          <div className="sm:col-span-2 text-sm">
                            {formatDate(subscription.currentPeriodEnd)}
                          </div>
                        </div>

                        {subscription.paymentMethod && (
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div className="font-medium text-sm text-muted-foreground">
                              Payment Method
                            </div>
                            <div className="sm:col-span-2 text-sm capitalize">
                              {subscription.paymentMethod.brand} ending in{" "}
                              {subscription.paymentMethod.last4}
                            </div>
                          </div>
                        )}

                        {subscription.cancelAtPeriodEnd && (
                          <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/10 p-3 border border-yellow-200 dark:border-yellow-900/20">
                            <div className="flex gap-2">
                              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5" />
                              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                                <p className="font-medium mb-1">
                                  Subscription Ending
                                </p>
                                <p className="text-yellow-700 dark:text-yellow-300">
                                  Your subscription will end on{" "}
                                  {formatDate(subscription.currentPeriodEnd)}.
                                  You&apos;ll continue to have access until
                                  then.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <Separator />
                      <div className="flex flex-col sm:flex-row gap-3">
                        {subscription.status === "active" &&
                          !subscription.cancelAtPeriodEnd && (
                            <>
                              <Button variant="outline">Manage Billing</Button>
                              <Button variant="outline">
                                Update Payment Method
                              </Button>
                              <Button variant="outline">
                                Cancel Subscription
                              </Button>
                            </>
                          )}
                        {subscription.cancelAtPeriodEnd && (
                          <Button variant="default">
                            Reactivate Subscription
                          </Button>
                        )}
                        {subscription.status === "past_due" && (
                          <Button variant="default">
                            Update Payment Method
                          </Button>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Note: Subscription management features are coming soon.
                        For assistance, please contact support.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Billing History Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    View your past invoices and payment history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-4">
                      Billing history will be displayed here
                    </p>
                    <Button variant="outline">View All Invoices</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
