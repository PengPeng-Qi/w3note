"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const data = {
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "笔记中心",
      url: "/notes/center",
      icon: Frame,
    },
    {
      name: "发布笔记",
      url: "/notes/write",
      icon: PieChart,
    },
  ],
};

// 将 user 相关类型定义提取出来
type User = {
  name: string;
  email: string;
  avatar: string;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  const [user, setUser] = useState<User>({
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  });

  useEffect(() => {
    if (session?.user) {
      setUser({
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        avatar: session.user.image ?? "/avatars/shadcn.jpg",
      });
    }
  }, [session]);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
