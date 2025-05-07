"use client";

import * as React from "react";
import { NavUser } from "@/components/ui/sidenav/nav-user";
import { TeamSwitcher } from "@/components/ui/sidenav/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Projects } from "@/types/projects";
import { NavMain } from "./nav-main";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  user: {
    name: "Neuss_HMI",
    des: "Created By Neuss",
    avatar: "/3896504.png",
  },
  teams: [
    {
      name: "Neuss HMI",
      logo: "",
      plan: "Human-Machine Interface",
    },
  ],
};

export function AppSidebar({
  projects,
  ...props
}: { projects: Projects[] } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const shouldHideNavMain = /^\/Projects\/[^/]+\/edit\/[^/]+$/.test(pathname);


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/Projects" passHref>
          <TeamSwitcher teams={data.teams} />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {!shouldHideNavMain && <NavMain projects={projects} />}
        {/* <NavProjects projects={projects} /> */}
      </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>


      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden"
      >
        <div className="grid flex-1 text-left text-sm leading-tight p-2 ">
          <span className=" text-xs text-custom-green">
            {" "}
            &#169; {data.user.des} 2025
          </span>
        </div>
      </SidebarMenuButton>
      <SidebarRail />
    </Sidebar>
  );
}
