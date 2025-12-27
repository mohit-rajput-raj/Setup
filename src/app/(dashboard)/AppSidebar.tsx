"use client";
import { Calendar, CreditCardIcon, Home, Inbox, LogOutIcon, Search, Settings, StarIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { title } from "process";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/dist/client/components/navigation";
import { authClient } from "@/lib/auth-client";
import { Router } from "next/router";

// Menu items.
const items = [
  {
    title: "Workflow",
    url: "/workflows",
    icon: Home,
  },
  {
    title: "Credentials",
    url: "/credentials",
    icon: Inbox,
  },
  {
    title: "executions",
    url: "/executions",
    icon: Calendar,
  },
  
];
const documents = [
  {
    title: "Project Proposal",
    url: "#",
    icon: Home,
  },
  {
    title: "Meeting Notes",
    url: "#",
    icon: Inbox,
  },
];
const menuItems = [
  {
    title: "WorkFlow",
    items: items,
  },
  {
    title: "Documents",
    items: documents,
  },
];
import { useRouter } from 'next/navigation'
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const ptthname = usePathname();
  const router = useRouter();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="gap-x-4 h-10 px-4">
            <Link href="/workflows" prefetch>
              <Image src="/logos/logo.svg" alt="Logo" width={32} height={32} />
              <span className="font-semibold text-lg">Setup</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarContent>
        {menuItems.map((menu) => {
          return (
            <div key={menu.title}>
              <SidebarGroup>
                <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>

                <SidebarGroupContent>
                  <SidebarMenu>
                    {menu.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.title}
                          isActive={
                            item.url === "/"
                              ? ptthname === "/"
                              : ptthname.startsWith(item.url)
                          }
                        >
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
          );
        })}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={()=>{}} tooltip={"upgrage to pro"} className="gap-x-4 h-10 px-4">
              <StarIcon className="h-4 w-4"/>
              <span>Upgrade to Pro</span>

            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={()=>{}} tooltip={"Billing portal"} className="gap-x-4 h-10 px-4">
              <CreditCardIcon className="h-4 w-4"/>
              <span>Billing portal</span>

            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={()=>authClient.signOut({
              fetchOptions:{
                onSuccess: () => {
                router.push("/login")
              }
              }
            })} tooltip={"Sign out"} className="gap-x-4 h-10 px-4">
              <LogOutIcon className="h-4 w-4"/>
              <span>Sign out</span>

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
