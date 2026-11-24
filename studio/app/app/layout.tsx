import { AppHeader } from "@/components/studio/app-header";
import { StudioSidebar } from "@/components/studio/studio-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// The dashboard shell. proxy.ts keeps it behind the fake session cookie.
export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <SidebarProvider>
      <StudioSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
