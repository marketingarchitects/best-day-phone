# Best Day Phone

A companion that's always there — so they're never alone, and you can finally breathe.

## About

Best Day Phone is an AI companion inside a familiar rotary phone, designed specifically for people with Alzheimer's and dementia. The form factor is intentional — people with dementia remember things from childhood most strongly, and rotary phones are iconic to that era.

### Target Audiences

**Buyer (Primary):** Caregivers — adult children, family members, sometimes friends seeking peace of mind and visibility into their loved one's wellbeing.

**User (Secondary):** Elderly people with Alzheimer's or dementia (70+) who need a familiar device with zero learning curve and patient companionship.

## Tech Stack

This is a [Next.js](https://nextjs.org) project built with:

- Next.js 15+ (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui (component library)
- Supabase (authentication & database)
- Stripe (payment processing)
- pnpm package manager

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

- `/dashboard` — Dashboard home
- `/dashboard/account` — User profile and account settings
- `/dashboard/settings` — System settings and preferences
- `/dashboard/subscriptions` — User subscriptions and billing
- `/dashboard/subscriptions/confirmation` — Subscription confirmation page

### Client Usage

The project includes three Supabase client configurations:

- **Browser Client** (`lib/supabase/client.ts`) — Use in Client Components
- **Server Client** (`lib/supabase/server.ts`) — Use in Server Components and API Routes
- **Middleware** (`lib/supabase/proxy.ts`) — Handles session refresh in `middleware.ts`

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

## Payment Processing

This project uses [Stripe](https://stripe.com) for subscription and payment processing.

### Features

- **Stripe Buy Button:** Embedded checkout for phone and subscription services
- **Multiple Pricing Tiers:** Base WiFi (~$75/mo), Mid (~$100/mo), Premium 5G (~$150/mo)
- **Device Included:** All subscriptions include the Best Day Phone device at no extra cost
- **Authentication-Gated:** Payment options only visible to logged-in users

### Setup

To configure Stripe payments:

1. Create a [Stripe account](https://dashboard.stripe.com/register) if you don't have one

2. Create products and pricing in your Stripe Dashboard

3. Generate Stripe Buy Buttons for each pricing tier:

   - Go to **Products** in your Stripe Dashboard
   - Select a product and click **Create payment link** or **Buy button**
   - Copy the buy button ID (starts with `buy_btn_`)

4. Update the pricing options in `app/(marketing)/page.tsx`:

```typescript
const pricingOptions: PricingOption[] = [
  {
    title: "Base WiFi",
    price: "$75",
    stripeBuyButtonId: "buy_btn_YOUR_BUTTON_ID",
    // ... other options
  },
];
```

5. Set your Stripe publishable key in the `STRIPE_PUBLISHABLE_KEY` constant (currently set to test mode)

### Test Mode

The project is currently configured with Stripe test keys. Use [Stripe test cards](https://stripe.com/docs/testing) for development:

- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Project Resources

- **Cortex Documentation:** [cortex.misfitsandmachines.com](https://cortex.misfitsandmachines.com) — PRD, feature specs, user research
- **Figma Designs:** [Best Day Figma](https://www.figma.com/design/zGweAGlA8vZuPj0SQBYuTf/Best-Day)
- **Project Management:** [Wrike Workspace](https://www.wrike.com/workspace.htm?acc=2034463#/folder/4325791241/timeline3)

## Design Principles

- **Tone:** Warm, human, not clinical
- **Colors:** Warm cream backgrounds with rich accent colors (burgundy, forest green)
- **Typography:** Elegant serif for headlines, clean sans for body
- **Spacing:** Generous whitespace

## Messaging Guidelines

- Lead with empathy and emotional outcomes
- Focus on benefits, not features
- Avoid technical jargon and medical claims
- Use gender-neutral language ("they/them" or "loved one")
- Frame as a "wellness companion" not a medical device

## Learn More

To learn more about Next.js:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
