'use client'

import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const data = {
    user: {
      name: 'Flow Meter Admin',
      email: 'admin@flowtrack.com',
      avatar: 'https://ui-avatars.com/api/?name=FlowAdmin',
    },
    teams: [
      { name: 'Flow Meter Lab', logo: GalleryVerticalEnd, plan: 'Enterprise' },
      { name: 'Pipeline Ops', logo: AudioWaveform, plan: 'Engineering' },
      { name: 'Research Div.', logo: Command, plan: 'Analytics' },
    ],
    navMain: [
      {
        title: 'Flow Meters',
        url: '/dashboard/flow-meter-form',
        icon: Frame,
        isActive: pathname?.startsWith('/dashboard/flow-meter'),
        items: [
          { title: 'Add Flow Meter', url: '/dashboard/flow-meter-form' },
          { title: 'Manage Meters', url: '/dashboard/Rfp-Compliance' },
        ],
      },
      {
        title: 'Analytics Engine',
        url: '#',
        icon: Bot,
        isActive: pathname === '#',
        items: [
          { title: 'Upload Test Data', url: '#' },
          { title: 'Generate UB Report', url: '#' },
          { title: 'SCADA Insights', url: '#' },
        ],
      },
      {
        title: 'Documentation',
        url: '#',
        icon: BookOpen,
        isActive: pathname === '#',
        items: [
          { title: 'Flow Meter Guide', url: '#' },
          { title: 'Upload Formats', url: '#' },
          { title: 'SCADA Integration', url: '#' },
          { title: 'UB Reports', url: '#' },
        ],
      },
      {
        title: 'Settings',
        url: '#',
        icon: Settings2,
        isActive: pathname === '#',
        items: [
          { title: 'General', url: '#' },
          { title: 'Teams', url: '#' },
          { title: 'API Access', url: '/api-access' },
        ],
      },
    ],
    projects: [
      { name: 'Visualization Tools', url: '#', icon: Frame },
      { name: 'Data Import Pipelines', url: '#', icon: PieChart },
      { name: 'UB AI Monitor', url: '#', icon: Map },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}