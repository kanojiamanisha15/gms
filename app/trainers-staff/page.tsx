import { AppSidebar } from "@/components/ui/app-sidebar";
import { PageContent } from "@/components/ui/page-content";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function TrainersStaffPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <PageContent
          title="Trainers/Staff"
          description="Manage trainers and staff members"
        />
      </SidebarInset>
    </SidebarProvider>
  );
}
