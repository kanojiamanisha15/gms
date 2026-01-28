"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { EditButton } from "@/components/ui/edit-button";
import { DeleteButton } from "@/components/ui/delete-button";

function ActionsCell({ plan }: { plan: MembershipPlan }) {
  const handleDelete = (id: string) => {
    // Handle delete action
    console.log("Delete membership plan:", id);
  };

  return (
    <div className="flex items-center gap-2">
      <EditButton
        id={plan.id}
        editPath="/membership-plans/add-plan"
        entityName="membership plan"
      />
      <DeleteButton
        id={plan.id}
        onDelete={handleDelete}
        entityName="membership plan"
        itemName={plan.name}
      />
    </div>
  );
}

export type MembershipPlan = {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string;
  status: "active" | "inactive";
};

export const mockPlans: MembershipPlan[] = [
  {
    id: "1",
    name: "Basic",
    price: 29.99,
    duration: "1 month",
    features: "Access to gym facilities, Basic equipment",
    status: "active",
  },
  {
    id: "2",
    name: "Standard",
    price: 79.99,
    duration: "3 months",
    features: "Access to gym facilities, All equipment, Group classes",
    status: "active",
  },
  {
    id: "3",
    name: "Premium",
    price: 299.99,
    duration: "1 year",
    features:
      "Access to gym facilities, All equipment, Group classes, Personal trainer sessions, Nutrition consultation",
    status: "active",
  },
  {
    id: "4",
    name: "Student",
    price: 19.99,
    duration: "1 month",
    features: "Access to gym facilities, Basic equipment (Student ID required)",
    status: "active",
  },
  {
    id: "5",
    name: "Senior",
    price: 24.99,
    duration: "1 month",
    features:
      "Access to gym facilities, Basic equipment, Senior-friendly classes",
    status: "active",
  },
  {
    id: "6",
    name: "Corporate",
    price: 249.99,
    duration: "1 year",
    features:
      "Access to gym facilities, All equipment, Group classes, Corporate wellness programs",
    status: "inactive",
  },
];

const columns: ColumnDef<MembershipPlan>[] = [
  {
    accessorKey: "name",
    header: "Plan Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return <div>Rs.{price.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("duration")}</div>
    ),
  },
  {
    accessorKey: "features",
    header: "Features",
    cell: ({ row }) => {
      const features = row.getValue("features") as string;
      return (
        <div className="max-w-md text-sm text-muted-foreground">{features}</div>
      );
    },
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
        active: { variant: "default" },
        inactive: { variant: "secondary" },
      };
      const config = statusConfig[status] || statusConfig.active;
      return (
        <Badge variant={config.variant}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const plan = row.original;
      return <ActionsCell plan={plan} />;
    },
    enableSorting: false,
  },
];

export function MembershipPlansTable() {
  return (
    <DataTable
      columns={columns}
      data={mockPlans}
      searchPlaceholder="Search membership plans..."
      addButtonLabel="Add Membership Plan"
      addButtonHref="/membership-plans/add-plan"
      entityName="membership plan"
    />
  );
}
