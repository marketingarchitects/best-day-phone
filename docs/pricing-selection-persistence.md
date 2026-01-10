# Pricing Plan Selection Persistence

## Overview

This feature persists a visitor's pricing plan selection in localStorage so it can be referenced after they sign up and become a user. This creates a seamless conversion flow from browsing pricing → signing up → completing subscription.

## How It Works

### 1. **Selection Storage**

When a visitor clicks "Get Started" on any pricing plan:

- The plan details (title, price, payment link) are stored in localStorage
- A timestamp is added to track when the selection was made
- Storage key: `bdp_selected_plan`

### 2. **Sign-Up Flow**

- Visitor selects a plan → clicks "Get Started"
- If not authenticated, they're redirected to `/auth/sign-up`
- Their plan selection persists through the sign-up process
- After sign-up, they see their selected plan on the success page

### 3. **Post-Authentication**

- Once authenticated, users can view their selected plan in the dashboard
- The subscriptions page shows a highlighted card with their selection
- Users can complete the subscription or choose a different plan
- Selection is cleared after 30 days or when explicitly cleared

## Files Created

### Core Utilities

- **`lib/utils/pricing-selection.ts`** - Core localStorage utilities
  - `setSelectedPlan()` - Store plan selection
  - `getSelectedPlan()` - Retrieve plan selection
  - `clearSelectedPlan()` - Remove plan selection
  - `hasSelectedPlan()` - Check if selection exists

### React Hook

- **`hooks/use-selected-plan.ts`** - React hook for components
  - Returns: `{ selectedPlan, clearSelection, hasSelection }`
  - Uses lazy initialization for optimal performance
  - Handles SSR safely (returns null on server)
  - Provides convenient access to selection state

### Components

- **`components/marketing/PricingPlans.tsx`** - Updated to store selection
  - Now a client component (`"use client"`)
  - Calls `setSelectedPlan()` on "Get Started" click
- **`components/marketing/SelectedPlanCard.tsx`** - Display selected plan
  - Shows plan details with completion CTA
  - Allows user to change their selection
  - Only renders when a plan is selected

### Pages Updated

- **`app/auth/sign-up-success/page.tsx`** - Shows selected plan after sign-up
- **`app/dashboard/subscriptions/page.tsx`** - Shows selected plan in dashboard

## Usage Examples

### In a React Component

```tsx
"use client";

import { useSelectedPlan } from "@/hooks/use-selected-plan";

export function MyComponent() {
  const { selectedPlan, clearSelection } = useSelectedPlan();

  if (!selectedPlan) {
    return <div>No plan selected</div>;
  }

  return (
    <div>
      <h2>Your Selected Plan: {selectedPlan.title}</h2>
      <p>Price: {selectedPlan.price}</p>
      <a href={selectedPlan.paymentLink}>Complete Purchase</a>
      <button onClick={clearSelection}>Choose Different Plan</button>
    </div>
  );
}
```

### Direct Utility Usage

```typescript
import {
  setSelectedPlan,
  getSelectedPlan,
  clearSelectedPlan,
} from "@/lib/utils/pricing-selection";

// Store a selection
setSelectedPlan({
  title: "Premium 5G",
  price: "$50",
  paymentLink: "https://buy.stripe.com/...",
});

// Retrieve the selection
const plan = getSelectedPlan();
if (plan) {
  console.log(plan.title); // "Premium 5G"
  console.log(plan.selectedAt); // ISO timestamp
}

// Clear the selection
clearSelectedPlan();
```

## Data Structure

```typescript
interface SelectedPlan {
  title: string; // e.g., "Premium 5G"
  price: string; // e.g., "$50"
  paymentLink: string; // Stripe payment URL
  selectedAt: string; // ISO timestamp
}
```

## Storage Details

- **Method**: localStorage (client-side only)
- **Key**: `bdp_selected_plan`
- **Expiration**: 30 days (automatically cleared)
- **Format**: JSON string
- **Size**: ~200 bytes per selection

## User Journey

```
1. Visitor lands on homepage
   ↓
2. Views pricing plans
   ↓
3. Clicks "Get Started" on a plan
   → Plan stored in localStorage
   ↓
4. Redirected to /auth/sign-up
   ↓
5. Completes sign-up form
   ↓
6. Sees success page with selected plan
   ↓
7. Confirms email and logs in
   ↓
8. Dashboard shows selected plan card
   ↓
9. Clicks "Complete Subscription"
   → Redirected to Stripe payment
   ↓
10. After successful payment, selection cleared
```

## Benefits

✅ **Seamless conversion** - No need to re-select plan after sign-up  
✅ **Reduced friction** - One-click path from selection to payment  
✅ **Better UX** - User sees their choice throughout the flow  
✅ **Analytics ready** - Can track which plans drive sign-ups  
✅ **Flexible** - Users can change their mind at any time

## Future Enhancements

### Possible Additions

1. **Analytics tracking** - Log plan selections to analytics
2. **A/B testing** - Test different pricing displays
3. **Discount codes** - Store promo codes with selection
4. **Multi-device sync** - Use cookies or database instead of localStorage
5. **Selection reminders** - Email users who selected but didn't subscribe

### Database Integration

When ready, you could also store selections in the database:

```sql
CREATE TABLE pricing_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  plan_title TEXT NOT NULL,
  plan_price TEXT NOT NULL,
  payment_link TEXT NOT NULL,
  selected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

This would enable:

- Cross-device persistence
- Analytics and reporting
- Abandoned cart emails
- Conversion tracking

## Notes

- Selection persists across browser sessions
- Cleared automatically after 30 days
- Cleared when user explicitly chooses different plan
- Safe for server-side rendering (checks `typeof window`)
- No PII stored (just plan metadata)
