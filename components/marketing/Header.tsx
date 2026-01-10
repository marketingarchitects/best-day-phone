import Link from "next/link";
import Image from "next/image";
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
      className={cn("sticky top-0 z-50 bg-background shadow-lg", className)}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl w-full py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Best Day Phone"
            width={56}
            height={56}
            className="h-14 w-auto"
            style={{ width: "auto" }}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#how-it-works"
            className="text-lg font-semibold hover:text-primary transition"
          >
            How it Works
          </Link>
          <Link
            href="#ai-explained"
            className="text-lg font-semibold hover:text-primary transition"
          >
            About AI
          </Link>
          <Link
            href="#pricing"
            className="text-lg font-semibold hover:text-primary transition"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-lg font-semibold hover:text-primary transition"
          >
            FAQ
          </Link>
          <div className="ml-4 flex items-center gap-3">
            {user ? (
              <>
                <Button asChild size={"lg"} variant="outline">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              </>
            ) : (
              <Button asChild className="glow" size={"lg"}>
                <Link href="#pricing">Get Started</Link>
              </Button>
            )}
          </div>
        </nav>
      </div>

      {/* Jagged Edge */}
      <svg
        className="absolute left-0 w-full fill-white z-10 scale-y-[-1] h-[16px]"
        preserveAspectRatio="none"
        viewBox="0 0 1200 16"
      >
        <polygon points="0,16 0,10 180,7 320,11 580,5 750,9 920,6 1080,10 1200,8 1200,16" />
      </svg>
    </header>
  );
}
