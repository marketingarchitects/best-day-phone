"use client";

import { useSelectedPlan } from "@/hooks/use-selected-plan";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export function SelectedPlanCard() {
  const { selectedPlan, clearSelection } = useSelectedPlan();

  if (!selectedPlan) {
    return null;
  }

  return (
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
        <div className="space-y-4">
          <div className="rounded-lg bg-background p-4 border">
            <h3 className="font-bold text-lg">{selectedPlan.title}</h3>
            <p className="text-2xl font-bold text-primary mt-1">
              {selectedPlan.price}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Selected on{" "}
              {new Date(selectedPlan.selectedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <a href={selectedPlan.paymentLink}>Complete Subscription</a>
            </Button>
            <Button
              variant="outline"
              onClick={clearSelection}
              className="flex-1"
            >
              Choose Different Plan
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Your plan selection is saved. You can complete your subscription at
            any time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
