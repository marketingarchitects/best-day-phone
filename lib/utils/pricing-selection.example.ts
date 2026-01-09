/**
 * EXAMPLE: How to use the pricing selection utilities
 *
 * This file demonstrates how to retrieve and use the stored pricing plan
 * after a visitor becomes a user (e.g., after sign-up or login)
 */

import { getSelectedPlan, clearSelectedPlan } from "./pricing-selection";

// Example 1: Retrieve selected plan after sign-up
export function handleAfterSignUp() {
  const selectedPlan = getSelectedPlan();

  if (selectedPlan) {
    console.log("User selected plan:", selectedPlan.title);
    console.log("Price:", selectedPlan.price);
    console.log("Payment link:", selectedPlan.paymentLink);
    console.log("Selected at:", selectedPlan.selectedAt);

    // Redirect to payment or show confirmation
    // window.location.href = selectedPlan.paymentLink;

    // Or store in database for later reference
    // await saveUserPlanSelection(userId, selectedPlan);
  }
}

// Example 2: Show selected plan on dashboard
export function getSelectedPlanForDisplay() {
  const plan = getSelectedPlan();

  if (plan) {
    return {
      message: `You selected the ${plan.title} plan at ${plan.price}`,
      link: plan.paymentLink,
    };
  }

  return null;
}

// Example 3: Clear selection after successful subscription
export function handleAfterSubscription() {
  // After successful payment, clear the stored selection
  clearSelectedPlan();
  console.log("Pricing plan selection cleared");
}

// Example 4: Use in a React component
export function ExampleComponent() {
  // In a client component:
  // const selectedPlan = getSelectedPlan();
  //
  // return (
  //   <div>
  //     {selectedPlan ? (
  //       <div>
  //         <p>You selected: {selectedPlan.title}</p>
  //         <a href={selectedPlan.paymentLink}>Complete Purchase</a>
  //       </div>
  //     ) : (
  //       <p>No plan selected</p>
  //     )}
  //   </div>
  // );
}
