"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderOpenIcon,
  HouseIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  PenToolIcon,
  Settings2Icon,
} from "lucide-react";
import type * as React from "react";
import { NavSecondary } from "@/components/nav-secondary";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut } from "@/app/actions";
import { APP_NAV } from "@/lib/nav";
import { STUDIO } from "@/lib/site";

// sidebar-08's inset shell in site code. The block's AppSidebar hardcodes its sample data, its
// NavMain has no current-page state and its NavUser's "Log out" has no handler, so the sections
// and the account footer are composed here from the installed sidebar parts (see FINDINGS.md).

const ICONS: Record<(typeof APP_NAV)[number]["url"], React.ReactNode> = {
  "/app": <LayoutDashboardIcon />,
  "/app/files": <FolderOpenIcon />,
  "/app/settings": <Settings2Icon />,
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function StudioSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  // On a phone the sidebar is a sheet: close it once a section is picked.
  const close = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar variant="inset" collapsible="icon" role="navigation" aria-label="Studio" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip={STUDIO.name}
              render={<Link href="/app" onClick={close} />}
            >
              <Avatar>
                <AvatarFallback>
                  <PenToolIcon className="size-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{STUDIO.name}</span>
                <span className="truncate text-xs">{STUDIO.tagline}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Desk</SidebarGroupLabel>
          <SidebarMenu>
            {APP_NAV.map((item) => {
              const current = pathname === item.url;
              return (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    isActive={current}
                    tooltip={item.title}
                    render={
                      <Link
                        href={item.url}
                        aria-current={current ? "page" : undefined}
                        onClick={close}
                      />
                    }
                  >
                    {ICONS[item.url]}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
        <NavSecondary
          items={[{ title: "Studio home page", url: "/", icon: <HouseIcon /> }]}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 p-2 text-left text-sm group-data-[collapsible=icon]:hidden">
              <Avatar>
                <AvatarFallback>{initials(STUDIO.creator.name)}</AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1 leading-tight">
                <span className="truncate font-medium">{STUDIO.creator.name}</span>
                <span className="truncate text-xs">{STUDIO.creator.email}</span>
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <form action={signOut}>
              <SidebarMenuButton type="submit" tooltip="Log out">
                <LogOutIcon />
                <span>Log out</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
