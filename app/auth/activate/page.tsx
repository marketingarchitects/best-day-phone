"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useSelectedPlan } from "@/hooks/use-selected-plan";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { pricingOptions } from "@/lib/constants/pricing";

export default function ActivatePage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const { selectedPlan, clearSelection } = useSelectedPlan();

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Not authenticated, redirect to login
        router.push("/auth/login");
        return;
      }

      // TODO: Check if user has active subscription
      // If they do, redirect to dashboard instead
      // For now, let them proceed to activation

      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <div className="flex min-h-svh w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-linear-to-b from-background to-muted/20">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col gap-6">
          {/* Welcome Header */}
          <div className="text-center space-y-2 mb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-serif font-bold">
              Welcome to Best Day Phone!
            </h1>
            <p className="text-muted-foreground">
              You&apos;re one step away from bringing daily companionship to
              your loved one
            </p>
          </div>

          {/* Selected Plan Card */}
          {selectedPlan ? (
            <Card className="border-primary bg-primary/5">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Your Selected Plan
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Complete your subscription to get started
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div className="rounded-lg bg-background p-6 border">
                    <h3 className="font-bold text-xl">{selectedPlan.title}</h3>
                    <p className="text-3xl font-bold text-primary mt-2">
                      {selectedPlan.price}
                      <span className="text-base text-muted-foreground font-normal">
                        /month
                      </span>
                    </p>
                    <p className="text-sm text-muted-foreground mt-3">
                      Selected on{" "}
                      {new Date(selectedPlan.selectedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="flex-1">
                      <a href={selectedPlan.paymentLink}>
                        Activate Subscription
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={clearSelection}
                      className="flex-1"
                    >
                      Choose Different Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* No Plan Selected */
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Plan</CardTitle>
                <CardDescription>
                  Select a subscription plan to activate your Best Day Phone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingOptions.map((plan) => (
                    <div
                      key={plan.title}
                      className={`border rounded-lg p-6 hover:border-primary transition-colors ${
                        plan.badge ? "border-primary/50 bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg">{plan.title}</h3>
                            {plan.badge && (
                              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                                {plan.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {plan.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{plan.price}</p>
                          <p className="text-sm text-muted-foreground">
                            {plan.period}
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-4">
                        {plan.features.slice(0, 3).map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-700"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button asChild className="w-full glow" size="lg">
                        <a href={plan.paymentLink}>Select {plan.title}</a>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Need more details before deciding?
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/#pricing">View Full Pricing Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Additional Info */}
          <Card className="bg-muted/30 mt-4">
            <CardContent>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-medium mb-3">What happens next?</h2>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Your device ships free within 3-5 business days</li>
                  <li>✓ Simple setup guide included</li>
                  <li>✓ 30-day money-back guarantee</li>
                  <li>✓ Cancel anytime, no contracts</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Help Link */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Questions?{" "}
              <Link
                href="/contact"
                className="text-primary hover:underline font-medium"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
