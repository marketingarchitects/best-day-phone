/**
 * Utilities for persisting visitor's pricing plan selection
 * Stores selection in localStorage so it can be referenced after sign-up
 */

const STORAGE_KEY = "bdp_selected_plan";

export interface SelectedPlan {
  title: string;
  price: string;
  priceId: string;
  paymentLink: string;
  selectedAt: string;
}

/**
 * Store the selected pricing plan in localStorage
 */
export function setSelectedPlan(plan: {
  title: string;
  price: string;
  priceId: string;
  paymentLink: string;
}): void {
  if (typeof window === "undefined") return;

  const selectedPlan: SelectedPlan = {
    ...plan,
    selectedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedPlan));
  } catch (error) {
    console.error("Failed to save selected plan:", error);
  }
}

/**
 * Retrieve the selected pricing plan from localStorage
 */
export function getSelectedPlan(): SelectedPlan | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const plan = JSON.parse(stored) as SelectedPlan;

    // Clear if older than 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    if (new Date(plan.selectedAt) < thirtyDaysAgo) {
      clearSelectedPlan();
      return null;
    }

    return plan;
  } catch (error) {
    console.error("Failed to retrieve selected plan:", error);
    return null;
  }
}

/**
 * Clear the selected pricing plan from localStorage
 */
export function clearSelectedPlan(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear selected plan:", error);
  }
}

/**
 * Check if a plan is currently selected
 */
export function hasSelectedPlan(): boolean {
  return getSelectedPlan() !== null;
}
