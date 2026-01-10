import Stripe from "stripe";

// Initialize Stripe with your secret key
// Note: The secret key should be stored in environment variables
// You'll need to add STRIPE_SECRET_KEY to your .env.local file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

export default stripe;

/**
 * Retrieve a Stripe Checkout Session by session ID
 * @param sessionId - The Stripe Checkout Session ID
 * @returns The Checkout Session object with expanded data
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "subscription", "customer"],
    });
    return session;
  } catch (error) {
    console.error("Error retrieving Stripe session:", error);
    throw error;
  }
}

/**
 * Retrieve a Stripe Subscription by subscription ID
 * @param subscriptionId - The Stripe Subscription ID
 * @returns The Subscription object
 */
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error("Error retrieving Stripe subscription:", error);
    throw error;
  }
}

/**
 * Create a Stripe Customer Portal session
 * @param customerId - The Stripe Customer ID
 * @param returnUrl - The URL to return to after managing subscription
 * @returns The Customer Portal Session with URL
 */
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });
    return portalSession;
  } catch (error) {
    console.error("Error creating customer portal session:", error);
    throw error;
  }
}
