"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CreditCard,
  Receipt,
  ClipboardCheck,
  Layers,
} from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavSecondary } from "@/components/ui/nav-secondary";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const defaultUser = {
  name: "User",
  email: "",
  avatar: "",
};

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Members",
      url: "/members",
      icon: Users,
    },
    {
      title: "Trainers/Staff",
      url: "/trainers-staff",
      icon: UserCog,
    },
    {
      title: "Membership Plans",
      url: "/membership-plans",
      icon: CreditCard,
    },
    {
      title: "Payments and Invoice",
      url: "/payments",
      icon: Receipt,
    },
    // {
    //   title: "Attendance Tracker",
    //   url: "/attendance",
    //   icon: ClipboardCheck,
    // },
  ],
  navSecondary: [
    // {
    //   title: "Settings",
    //   url: "/settings",
    //   icon: Settings,
    // },
    // {
    //   title: "Help",
    //   url: "/help",
    //   icon: HelpCircle,
    // },
  ],
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user?: {
    id: number;
    name: string;
    email: string;
    role?: string;
    created_at?: Date;
  };
};

export function AppSidebar({ user: userProp, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, setOpenMobile, setOpen } = useSidebar();
  const user = userProp
    ? {
        name: userProp.name,
        email: userProp.email,
        avatar: "",
      }
    : defaultUser;

  const isOnDashboard = pathname === "/dashboard" || pathname === "/";
  const closeSidebar = () => {
    if (isMobile) setOpenMobile(false);
    else setOpen(false);
  };
  const handleLogoClick = () => {
    if (!isOnDashboard) {
      closeSidebar();
      router.push("/dashboard");
    }
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:!p-1.5 cursor-pointer"
              onClick={!isOnDashboard ? handleLogoClick : undefined}
            >
              <Layers className="!size-5" />
              <span className="text-base font-semibold">Acme Inc.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
