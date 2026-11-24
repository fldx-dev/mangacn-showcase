import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ReaderSidebar } from "@/components/reader-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SERIES } from "@/lib/series";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * The app shell every page shares, as library-page lays it out: the sidebar, then the inset (the
 * page's one `main`) with a header holding the trigger and a breadcrumb. The last crumb is the
 * current page.
 */
export function ReaderShell({ crumbs, children }: { crumbs: Crumb[]; children: ReactNode }) {
  return (
    <SidebarProvider>
      <ReaderSidebar
        series={SERIES.map(({ slug, title, motif }) => ({ slug, title, motif }))}
      />
      <SidebarInset className="min-w-0">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex min-w-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb className="min-w-0">
              <BreadcrumbList>
                {crumbs.map((crumb, i) => {
                  const last = i === crumbs.length - 1;
                  return (
                    <Fragment key={crumb.label}>
                      {i > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                      <BreadcrumbItem className={last ? "min-w-0" : "hidden md:block"}>
                        {last || !crumb.href ? (
                          <BreadcrumbPage className="truncate">{crumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink render={<Link href={crumb.href} />}>
                            {crumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
