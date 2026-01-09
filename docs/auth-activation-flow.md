# Authentication & Activation Flow

## Overview

New users are guided through a seamless activation flow that leads them from sign-up through subscription completion. The activation page serves as a conversion-focused landing page for authenticated users without active subscriptions.

## User Journey

### New User Sign-Up Flow

```
1. Visitor views pricing → Selects plan (stored in localStorage)
   ↓
2. Clicks "Get Started" → Redirected to /auth/sign-up
   ↓
3. Completes sign-up form → Creates account
   ↓
4. Redirected to /auth/sign-up-success → Sees confirmation message
   ↓
5. Clicks email confirmation link → Verifies account
   ↓
6. Redirected to /auth/activate → Sees activation page
   ↓
7. Views their selected plan → Clicks "Activate Subscription"
   ↓
8. Redirected to Stripe → Completes payment
   ↓
9. Redirected to confirmation → Subscription active
```

### Returning User Login Flow

```
1. User goes to /auth/login
   ↓
2. Enters credentials → Logs in
   ↓
3. Redirected to /auth/activate
   ↓
4. System checks subscription status:
   - No subscription → Shows activation page
   - Has subscription → TODO: Redirect to /dashboard
```

## Pages

### `/auth/activate`

**Purpose:** Primary conversion page for authenticated users without subscriptions

**Features:**
- ✅ Authentication required (redirects to login if not authenticated)
- ✅ Shows selected plan with prominent "Activate" CTA
- ✅ Displays all pricing options if no plan selected
- ✅ Beautiful, conversion-optimized design
- ✅ Clear value proposition and next steps
- ✅ Option to change selected plan

**Access:**
- Authenticated users only
- Intended for users without active subscriptions

**Design:**
- Gradient background for visual appeal
- Centered layout with max-width constraint
- Icon-driven, friendly messaging
- Clear CTAs with strong visual hierarchy
- Trust signals (30-day guarantee, free shipping, etc.)

### `/auth/sign-up-success`

**Purpose:** Confirmation page after sign-up

**Features:**
- Shows success message with icon
- Clear instructions on next steps
- Guides user to check email
- Sets expectations for activation flow

**Changes from previous version:**
- Removed selected plan display (now shown on activate page)
- Simplified to focus on email confirmation
- Better user guidance

### `/auth/confirm/route.ts`

**Purpose:** Email confirmation handler

**Behavior:**
- Verifies email token
- Default redirect: `/auth/activate` (changed from `/`)
- Ensures users land on activation page after email confirmation

## Components Modified

### `components/auth/login-form.tsx`

**Changes:**
- Login now redirects to `/auth/activate` instead of `/dashboard`
- TODO: Add subscription status check to conditionally redirect

### Authentication Check Pattern

The activate page uses client-side authentication checking:

```typescript
useEffect(() => {
  const checkAuth = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    // TODO: Check subscription status
    setIsChecking(false);
  };

  checkAuth();
}, [router]);
```

## Integration with Pricing Selection

The activation page integrates with the pricing selection persistence system:

1. **Selected Plan Display:** If user selected a plan before sign-up, it's prominently displayed
2. **Direct Activation:** One-click path to complete subscription
3. **Plan Flexibility:** Users can change their selection if desired
4. **Fallback Options:** If no plan selected, all options are shown

## Future Enhancements

### Subscription Status Checking

When Stripe integration is complete, add subscription status checking:

```typescript
// In activate page useEffect
const { data: profile } = await supabase
  .from('profiles')
  .select('has_active_subscription')
  .eq('id', user.id)
  .single();

if (profile?.has_active_subscription) {
  // User already has subscription, redirect to dashboard
  router.push('/dashboard');
  return;
}
```

### Smart Routing

Create middleware to intelligently route users:

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return NextResponse.redirect('/auth/login');
  }
  
  // Check subscription status
  const hasSubscription = await checkSubscription(user.id);
  
  if (hasSubscription) {
    return NextResponse.redirect('/dashboard');
  } else {
    return NextResponse.redirect('/auth/activate');
  }
}
```

### Analytics Tracking

Track conversion funnel:

1. Plan selection on marketing page
2. Sign-up completion
3. Email confirmation
4. Activation page view
5. Subscription completion

### A/B Testing Opportunities

- Different hero messaging on activate page
- Plan display order
- CTA button copy
- Trust signals and social proof
- Pricing presentation

## Implementation Notes

### Authentication Pattern

The activate page uses client-side authentication:
- ✅ Shows loading state during auth check
- ✅ Redirects unauthenticated users
- ✅ TODO: Check subscription status
- ✅ SSR-safe implementation

### URL Structure

All auth-related pages live under `/auth/`:
- `/auth/login` - Login page
- `/auth/sign-up` - Registration page
- `/auth/sign-up-success` - Post-registration confirmation
- `/auth/activate` - Subscription activation (NEW)
- `/auth/confirm` - Email confirmation handler
- `/auth/error` - Error handling

### Mobile Responsive

The activate page is fully responsive:
- Stacked layout on mobile
- Side-by-side CTAs on desktop
- Touch-friendly button sizes
- Optimized typography scaling

## Testing Checklist

- [ ] New user can sign up and reach activate page
- [ ] Selected plan persists through sign-up flow
- [ ] Email confirmation redirects to activate page
- [ ] Login redirects to activate page
- [ ] Unauthenticated users are redirected to login
- [ ] Plan selection works on activate page
- [ ] "Choose Different Plan" clears selection
- [ ] Stripe payment links work correctly
- [ ] Mobile layout displays correctly
- [ ] Loading states show properly

## Related Documentation

- [Pricing Selection Persistence](./pricing-selection-persistence.md)
- [MDC Rules](../.cursor/rules/bdp.mdc)
