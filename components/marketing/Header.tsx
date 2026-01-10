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
      className={cn(
        "sticky top-0 z-50 bg-background/90 backdrop-blur-md",
        className
      )}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl w-full py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="Best Day Phone"
            width={56}
            height={56}
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <a
            className="text-lg font-semibold hover:text-primary transition"
            href="#how-it-works"
          >
            How it Works
          </a>
          {/* <a
            className="text-lg font-semibold hover:text-primary transition"
            href="#features"
          >
            Features
          </a> */}
          <a
            className="text-lg font-semibold hover:text-primary transition"
            href="#pricing"
          >
            Pricing
          </a>
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
    </header>
  );
}
