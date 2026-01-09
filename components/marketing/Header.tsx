import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";

interface HeaderProps {
  className?: string;
}

export default async function Header({ className }: HeaderProps) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  return (
    <header
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl w-full",
        className
      )}
    >
      <Link href="/" className="text-3xl font-bold font-serif">
        Best Day Phone
      </Link>

      <nav className="hidden md:flex items-center space-x-8">
        <a
          className="text-sm font-medium text-gray-600 hover:text-primary transition"
          href="#how-it-works"
        >
          How it Works
        </a>
        <a
          className="text-sm font-medium text-gray-600 hover:text-primary transition"
          href="#features"
        >
          Features
        </a>
        <a
          className="text-sm font-medium text-gray-600 hover:text-primary transition"
          href="#pricing"
        >
          Pricing
        </a>
        <div className="ml-4 flex items-center gap-3">
          {user ? (
            <>
              <Button asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              {/* <LogoutButton /> */}
            </>
          ) : (
            <Button asChild className="glow">
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}
