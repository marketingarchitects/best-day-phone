"use client";

import * as React from "react";
import { Settings2, Home, CreditCard } from "lucide-react";
import Link from "next/link";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/client";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Subscriptions",
      url: "/dashboard/subscriptions",
      icon: CreditCard,
    },

    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "/dashboard/account",
        },
        {
          title: "System Settings",
          url: "/dashboard/settings",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  React.useEffect(() => {
    const supabase = createClient();

    // Get initial user
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (authUser) {
        // Generate initials for avatar fallback
        const nameParts =
          authUser.user_metadata?.full_name?.split(" ") ||
          authUser.email?.split("@")[0].split(".");
        const initials =
          nameParts
            ?.map((part: string) => part[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) || "U";

        setUser({
          name:
            authUser.user_metadata?.full_name ||
            authUser.email?.split("@")[0] ||
            "User",
          email: authUser.email || "",
          avatar:
            authUser.user_metadata?.avatar_url ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${initials}`,
        });
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const authUser = session.user;
        const nameParts =
          authUser.user_metadata?.full_name?.split(" ") ||
          authUser.email?.split("@")[0].split(".");
        const initials =
          nameParts
            ?.map((part: string) => part[0])
            .join("")
            .toUpperCase()
            .slice(0, 2) || "U";

        setUser({
          name:
            authUser.user_metadata?.full_name ||
            authUser.email?.split("@")[0] ||
            "User",
          email: authUser.email || "",
          avatar:
            authUser.user_metadata?.avatar_url ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${initials}`,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Show loading state or default user while fetching
  const displayUser = user || {
    name: "Loading...",
    email: "",
    avatar: "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium text-sidebar-accent-foreground font-serif text-xl">
                    Best Day Phone
                  </span>
                  <span className="text-xs text-muted-foreground">0.1.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
