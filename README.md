# Best Day Phone

A companion that's always there — so they're never alone, and you can finally breathe.

Best Day Phone is an AI companion inside a familiar rotary phone, designed specifically for people with Alzheimer's and dementia. The form factor is intentional — people with dementia remember things from childhood most strongly, and rotary phones are iconic to that era.

## Tech Stack

This is a [Next.js](https://nextjs.org) project built with:

- **Next.js 16** with App Router
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **shadcn/ui** — Radix UI-based component library
- **Supabase** — Authentication, database, and Row Level Security
- **Stripe** — Payment processing and subscription management
- **pnpm** — Package manager

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (install with `npm install -g pnpm`)
- A [Supabase](https://supabase.com) account and project

### Installation

1. Clone the repository

2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables:

Create a `.env.local` file in the root directory with the following:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
SUPABASE_SECRET_KEY=your_supabase_service_role_key
```

You can find these values in your Supabase project settings under **API**.

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Adding UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for UI components. To add a new component:

```bash
pnpm dlx shadcn@latest add button
```

Replace `button` with any available component (e.g., `card`, `dialog`, `accordion`). Components will be added to the `components/ui` directory and can be customized as needed.

## Database Management

This project uses Supabase for database management with local development support via the [Supabase CLI](https://supabase.com/docs/guides/cli).

### Prerequisites

Install the Supabase CLI:

```bash
# macOS (Homebrew)
brew install supabase/tap/supabase

# Other platforms
npm install -g supabase
```

Generate TypeScript types from your Supabase database schema:

```bash
npx supabase gen types typescript --project-id sfstxiekmyyvpelokzrt > types/database.types.ts
```

### Link to Remote Project

Link your local project to your remote Supabase project:

```bash
supabase link --project-ref sfstxiekmyyvpelokzrt
```

You can find your project ref in your Supabase project settings URL.

### Common Commands

**Start Local Development:**

```bash
supabase start
```

Starts a local Supabase stack (Postgres, Auth, Storage, etc.) using Docker. This is useful for local development and testing.

**Stop Local Development:**

```bash
supabase stop
```

Stops the local Supabase stack.

**Check Status:**

```bash
supabase status
```

Shows the status of your local Supabase services including URLs and access keys.

**Reset Local Database:**

```bash
supabase db reset
```

Drops and recreates the local database, then applies all migrations from scratch. Useful when testing migration changes or starting fresh.

**Push Migrations to Remote:**

```bash
supabase db push
```

Pushes any unapplied local migrations to your remote Supabase database. This is how you deploy schema changes to production.

**List Migrations:**

```bash
# List local and remote migration status
supabase migration list --linked

# List local migrations only
supabase migration list --local
```

Shows which migrations have been applied locally and remotely, helping you track deployment status.

**Create New Migration:**

```bash
supabase migration new migration_name
```

Creates a new migration file in `supabase/migrations/` with a timestamp prefix.

**Generate Migration from Schema Diff:**

```bash
supabase db diff -f migration_name
```

Compares your local database schema to the migration history and generates a new migration file with the differences. Useful for capturing manual schema changes.

**Pull Remote Schema:**

```bash
supabase db pull
```

Generates a migration file that represents the current state of your remote database. Useful for syncing your local environment with production changes.

**Repair Migration History:**

```bash
supabase migration repair --status reverted 00001 00002
```

Marks migrations as reverted in the remote database. Useful for fixing migration state mismatches.

### Multi-Tenant Architecture

This project implements a comprehensive multi-tenant architecture:

- **Team-based Tenancy:** Each family/household is an isolated tenant
- **Row Level Security (RLS):** Database-level data isolation enforced by PostgreSQL policies
- **Role-based Access Control:**
  - **Primary Caregiver:** Full access to manage team, devices, and subscriptions
  - **Secondary Caregiver:** Read-only access to team data
- **Per-Device Subscriptions:** Each phone device has its own Stripe subscription
- **Care Recipients Tracking:** Manage multiple care recipients per team
- **Automatic Team Creation:** Teams are automatically created on user signup

The architecture includes:

- 7 database tables with foreign key relationships
- Comprehensive RLS policies on all tables
- Helper functions for common team operations
- Database triggers for data integrity
- React Context provider for client-side team state
- Server-side team utilities for secure data access

See `docs/IMPLEMENTATION_SUMMARY.md` for detailed implementation documentation.

## Authentication

This project uses [Supabase](https://supabase.com) for authentication and user management. The authentication system includes:

### Features

- **Email/Password Authentication:** Sign up and login with email
- **Password Recovery:** Forgot password flow with email confirmation
- **Protected Routes:** Automatic redirection for unauthenticated users
- **Session Management:** Secure cookie-based sessions with middleware
- **Server-Side Rendering:** Full SSR support with Supabase SSR

### Available Auth Routes

- `/auth/login` — User login
- `/auth/sign-up` — New user registration
- `/auth/sign-up-success` — Post-registration confirmation page
- `/auth/forgot-password` — Password recovery request
- `/auth/update-password` — Reset password with token
- `/auth/confirm` — Email confirmation handler
- `/auth/error` — Authentication error page

### Dashboard Routes

Routes under `/dashboard/*` require authentication. Unauthenticated users are automatically redirected to `/auth/login`.

Available dashboard routes:

- `/dashboard` — Dashboard home with team statistics
- `/dashboard/account` — User profile and account settings
- `/dashboard/settings` — System settings and preferences
- `/dashboard/team/settings` — Team management and member roles
- `/dashboard/subscriptions` — Subscription management and billing
- `/dashboard/subscriptions/confirmation` — Post-checkout confirmation page

### Client Usage

The project includes two Supabase client configurations:

- **Browser Client** (`lib/supabase/client.ts`) — Use in Client Components
- **Server Client** (`lib/supabase/server.ts`) — Use in Server Components and API Routes

### Example: Accessing User Data

```typescript
// In a Server Component
import { createClient } from "@/lib/supabase/server";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <div>Welcome, {user?.email}</div>;
}
```

### Team Context Provider

The application includes a React Context provider for managing team state on the client:

```typescript
// In a Client Component
"use client";
import { useTeam } from "@/hooks/use-team";

export function TeamInfo() {
  const { currentTeam, isLoading, switchTeam } = useTeam();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{currentTeam?.name}</h2>
      <p>Role: {currentTeam?.role_name}</p>
    </div>
  );
}
```

### Server-Side Team Helpers

For server-side operations, use the team helper functions in `lib/supabase/teams.ts`:

```typescript
import { createClient } from "@/lib/supabase/server";
import { getPrimaryTeam, getTeamPhoneDevices } from "@/lib/supabase/teams";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: team } = await getPrimaryTeam(supabase);
  const { data: devices } = await getTeamPhoneDevices(supabase, team?.id);

  // Team data is automatically filtered by RLS
  return <div>...</div>;
}
```

## Payment Processing

This project uses [Stripe](https://stripe.com) for subscription and payment processing.

### Features

- **Stripe Checkout:** Embedded buy button checkout flow for subscriptions
- **Two Pricing Tiers:**
  - **Base WiFi:** $25/month — Requires WiFi connection
  - **Premium 5G:** $50/month — Built-in 5G, works anywhere
- **Device Included:** All subscriptions include the Best Day Phone device at no extra cost
- **Authentication-Gated:** Checkout only available to logged-in users
- **Subscription Confirmation:** Detailed post-checkout confirmation page with session details
- **Customer Portal:** Integrated Stripe Customer Portal for self-service subscription management

### Setup

To configure Stripe payments:

1. Create a [Stripe account](https://dashboard.stripe.com/register) if you don't have one

2. Add Stripe keys to your `.env.local` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

3. Create products and pricing in your Stripe Dashboard

4. Generate Stripe payment links for each pricing tier:

   - Go to **Products** in your Stripe Dashboard
   - Select a product and click **Create payment link**
   - Configure the payment link with your product details
   - Copy the payment link URL

5. Update the pricing options in `lib/constants/pricing.ts`:

```typescript
export const pricingOptions: PricingOption[] = [
  {
    title: "Base WiFi",
    price: "$25",
    priceId: "price_YOUR_PRICE_ID",
    paymentLink: "https://buy.stripe.com/YOUR_LINK",
    // ... other options
  },
];
```

### Subscription Confirmation Page

After a successful checkout, customers are redirected to `/dashboard/subscriptions/confirmation?session_id=xxx` where they can view:

- Customer email
- Plan name and pricing
- Payment amount and status
- Payment ID (for reference)
- Subscription status (Active/Trial/etc.)
- Billing cycle frequency
- Next billing date
- Direct link to manage their subscription

The confirmation page automatically retrieves session details from Stripe using the session ID.

### Customer Portal

The integrated Stripe Customer Portal allows customers to:

- Update payment methods
- View billing history and download invoices
- Manage subscription (upgrade, downgrade, cancel)
- Update billing information

Customers can access the portal via the **"Manage Subscription"** button on the confirmation page, which opens Stripe's hosted portal in a new tab.

### Stripe Utilities

The project includes server-side Stripe utilities in `lib/stripe/server.ts`:

- `getCheckoutSession(sessionId)` — Retrieve checkout session details
- `getSubscription(subscriptionId)` — Retrieve subscription information
- `createCustomerPortalSession(customerId, returnUrl)` — Generate customer portal URL

### Test Mode

The project is currently configured with Stripe test keys. Use [Stripe test cards](https://stripe.com/docs/testing) for development:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

## HTML Prototypes

The `docs/design/` directory contains static HTML prototypes for rapid design iteration. These prototypes use the Best Day Phone design system and can be viewed using a live-reload development server.

### Running the Prototype Server

```bash
pnpm docs:design
```

This starts a local server at [http://127.0.0.1:5500](http://127.0.0.1:5500) with hot reload enabled.

### Available Prototypes

- `home-v3.html` — Latest homepage design
- `about.html` — About page
- `mission.html` — Mission and values
- `contact.html` — Contact page
- `style-guide.html` — Design system reference
- `privacy.html` — Privacy policy
- `terms.html` — Terms of service

All prototypes share common components from `docs/design/shared/` including navigation, footer, and the Best Day Phone theme.

## Project Resources

- **Cortex Documentation:** [cortex.misfitsandmachines.com](https://cortex.misfitsandmachines.com) — PRD, feature specs, user research
- **Figma Designs:** [Best Day Figma](https://www.figma.com/design/zGweAGlA8vZuPj0SQBYuTf/Best-Day)
- **Project Management:** [Wrike Workspace](https://www.wrike.com/workspace.htm?acc=2034463#/folder/4325791241/timeline3)

## Design & Messaging

This project follows specific design and messaging guidelines documented in `.cursor/rules/`:

- **Design:** Warm, human aesthetic with generous whitespace
- **Colors:** Warm cream backgrounds with rich accent colors
- **Typography:** Elegant serif headlines, clean sans body text
- **Messaging:** Empathy-first, benefit-focused, gender-neutral language
- **Positioning:** "Wellness companion" (not medical device)

## Learn More

To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
