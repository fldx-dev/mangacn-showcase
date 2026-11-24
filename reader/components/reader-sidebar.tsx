"use client";

import { FeatherIcon, LampIcon, LibraryIcon, MusicIcon, WindIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
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
} from "@/components/ui/sidebar";
import type { Motif } from "@/lib/covers";

// Inkwell's navigation, built from mangacn's sidebar primitives. sidebar-07's AppSidebar (which
// library-page imports) hardcodes a studio's sample data and takes no props, so the site draws
// its own; see FINDINGS.md.

const MOTIF_ICON: Record<Motif, React.ReactNode> = {
  lighthouse: <LampIcon />,
  kite: <WindIcon />,
  tower: <MusicIcon />,
};

export interface ReaderSidebarProps extends React.ComponentProps<typeof Sidebar> {
  series: { slug: string; title: string; motif: Motif }[];
}

export function ReaderSidebar({ series, ...props }: ReaderSidebarProps) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" role="navigation" aria-label="Inkwell" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" tooltip="Inkwell" render={<Link href="/" />}>
              <FeatherIcon />
              <span className="font-display text-lg uppercase">Inkwell</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Read</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Library"
                isActive={pathname === "/"}
                render={<Link href="/" aria-current={pathname === "/" ? "page" : undefined} />}
              >
                <LibraryIcon />
                <span>Library</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Series</SidebarGroupLabel>
          <SidebarMenu>
            {series.map((item) => {
              const href = `/series/${item.slug}`;
              const active = pathname === href || pathname.startsWith(`${href}/`);
              return (
                <SidebarMenuItem key={item.slug}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={active}
                    render={<Link href={href} aria-current={active ? "page" : undefined} />}
                  >
                    {MOTIF_ICON[item.motif]}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="px-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          Original webcomics. A mangacn showcase.
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
