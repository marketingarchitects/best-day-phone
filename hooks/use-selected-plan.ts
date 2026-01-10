"use client";

import { useState } from "react";
import {
  getSelectedPlan,
  clearSelectedPlan,
  type SelectedPlan,
} from "@/lib/utils/pricing-selection";

/**
 * React hook to access the visitor's selected pricing plan
 *
 * @returns Object with selectedPlan data and clearSelection function
 *
 * @example
 * ```tsx
 * function SubscriptionPage() {
 *   const { selectedPlan, clearSelection } = useSelectedPlan();
 *
 *   if (selectedPlan) {
 *     return (
 *       <div>
 *         <h2>Complete your {selectedPlan.title} subscription</h2>
 *         <p>Price: {selectedPlan.price}</p>
 *         <button onClick={() => window.location.href = selectedPlan.paymentLink}>
 *           Continue to Payment
 *         </button>
 *       </div>
 *     );
 *   }
 *
 *   return <p>Please select a plan</p>;
 * }
 * ```
 */
export function useSelectedPlan() {
  // Use lazy initialization to avoid setting state in useEffect
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(() => {
    // This only runs once on mount, safe for SSR as getSelectedPlan handles window check
    return getSelectedPlan();
  });

  const clearSelection = () => {
    clearSelectedPlan();
    setSelectedPlan(null);
  };

  return {
    selectedPlan,
    clearSelection,
    hasSelection: selectedPlan !== null,
  };
}
