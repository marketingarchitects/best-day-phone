import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "../logout-button";

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
      <Link href="/" className="text-2xl font-semibold">
        Best Day Phone
      </Link>

      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Button asChild>
              <Link href="/protected">Profile</Link>
            </Button>
            <LogoutButton />
          </>
        ) : (
          <Button asChild>
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
