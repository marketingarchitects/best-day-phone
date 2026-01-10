# Best Day Phone

Best Day Phone is an AI companion inside a familiar rotary phone, designed specifically for people with Alzheimer's and dementia. The form factor is intentional — people with dementia remember things from childhood most strongly, and rotary phones are iconic to that era.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Git Branching Strategy](#git-branching-strategy)
- [Database Management](#database-management)
  - [Multi-Tenant Architecture](#multi-tenant-architecture)
- [Authentication](#authentication)
  - [Features](#features)
  - [Available Auth Routes](#available-auth-routes)
  - [Dashboard Routes](#dashboard-routes)
  - [Client Usage](#client-usage)
  - [Example: Accessing User Data](#example-accessing-user-data)
  - [Team Context Provider](#team-context-provider)
  - [Server-Side Team Helpers](#server-side-team-helpers)
- [Payment Processing](#payment-processing)
  - [Features](#features-1)
  - [Subscription Confirmation Page](#subscription-confirmation-page)
  - [Customer Portal](#customer-portal)
  - [Stripe Utilities](#stripe-utilities)
  - [Test Mode](#test-mode)
- [HTML Prototypes](#html-prototypes)
  - [Running the Prototype Server](#running-the-prototype-server)
  - [Available Prototypes](#available-prototypes)
- [Project Resources](#project-resources)
- [Design & Messaging](#design--messaging)
- [Learn More](#learn-more)

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

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Run the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Git Branching Strategy

This project follows a structured Git branching strategy for collaborative development. See [docs/git-branching-strategy.md](docs/git-branching-strategy.md) for complete documentation on:

- Branch structure and naming conventions
- Development workflow and processes
- Code review guidelines
- Release and deployment procedures
- Team collaboration practices

## Database Management

Generate TypeScript types from your Supabase database schema:

```bash
npx supabase gen types typescript --project-id sfstxiekmyyvpelokzrt > types/database.types.ts
```

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
- **Authentication-Gated:** Checkout only available to logged-in users
- **Subscription Confirmation:** Detailed post-checkout confirmation page with session details
- **Customer Portal:** Integrated Stripe Customer Portal for self-service subscription management

### Subscription Confirmation Page

After a successful checkout, customers are redirected to `/dashboard/subscriptions/confirmation?session_id=xxx` where they can view:

The confirmation page automatically retrieves session details from Stripe using the session ID.

### Customer Portal

The integrated Stripe Customer Portal allows customers to:

- Update payment methods
- View billing history and download invoices
- Manage subscription (upgrade, downgrade, cancel)
- Update billing information

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
