"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { DataTable } from "@/components/ui/data-table";
import { SectionCards } from "@/components/ui/section-cards";
import { SiteHeader } from "@/components/ui/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

import data from "./data.json";

type TableData = {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
};

const columns: ColumnDef<TableData>[] = [
  {
    accessorKey: "header",
    header: "Header",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("header")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("type")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusConfig: Record<
        string,
        { variant: "default" | "secondary" | "destructive" | "outline" }
      > = {
        Done: { variant: "default" },
        "In Process": { variant: "secondary" },
      };
      const config = statusConfig[status] || statusConfig["In Process"];
      return <Badge variant={config.variant}>{status}</Badge>;
    },
  },
  {
    accessorKey: "target",
    header: "Target",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("target")}</div>
    ),
  },
  {
    accessorKey: "limit",
    header: "Limit",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("limit")}</div>
    ),
  },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("reviewer")}</div>
    ),
  },
];

export default function Page() {
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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable columns={columns} data={data} showAddButton={false} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
