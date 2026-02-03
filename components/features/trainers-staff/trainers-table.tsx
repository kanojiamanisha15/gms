"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { EditButton } from "@/components/ui/edit-button";
import { DeleteButton } from "@/components/ui/delete-button";

function ActionsCell({ trainer }: { trainer: Trainer }) {
  const handleDelete = (id: string) => {
    // Handle delete action
    console.log("Delete trainer:", id);
  };

  return (
    <div className="flex items-center gap-2">
      <EditButton
        id={trainer.id}
        editPath="/trainers-staff/add-trainer"
        entityName="trainer"
      />
      <DeleteButton
        id={trainer.id}
        onDelete={handleDelete}
        entityName="trainer"
        itemName={trainer.name}
      />
    </div>
  );
}

export type Trainer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Trainer" | "Staff";
  hireDate: string;
  status: "active" | "inactive";
};

const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 234-567-9000",
    role: "Trainer",
    hireDate: "2023-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 234-567-9001",
    role: "Trainer",
    hireDate: "2023-03-20",
    status: "active",
  },
  {
    id: "3",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 234-567-9002",
    role: "Staff",
    hireDate: "2022-11-10",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 234-567-9003",
    role: "Trainer",
    hireDate: "2024-02-05",
    status: "active",
  },
  {
    id: "5",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    phone: "+1 234-567-9004",
    role: "Staff",
    hireDate: "2023-06-28",
    status: "inactive",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    phone: "+1 234-567-9005",
    role: "Trainer",
    hireDate: "2023-09-14",
    status: "active",
  },
  {
    id: "7",
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "+1 234-567-9006",
    role: "Staff",
    hireDate: "2022-08-30",
    status: "active",
  },
  {
    id: "8",
    name: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    phone: "+1 234-567-9007",
    role: "Trainer",
    hireDate: "2024-01-20",
    status: "active",
  },
  {
    id: "9",
    name: "Christopher Taylor",
    email: "christopher.taylor@example.com",
    phone: "+1 234-567-9008",
    role: "Trainer",
    hireDate: "2023-05-10",
    status: "active",
  },
  {
    id: "10",
    name: "Amanda Thomas",
    email: "amanda.thomas@example.com",
    phone: "+1 234-567-9009",
    role: "Staff",
    hireDate: "2023-12-28",
    status: "inactive",
  },
  {
    id: "11",
    name: "Daniel Jackson",
    email: "daniel.jackson@example.com",
    phone: "+1 234-567-9010",
    role: "Trainer",
    hireDate: "2022-10-15",
    status: "active",
  },
  {
    id: "12",
    name: "Michelle White",
    email: "michelle.white@example.com",
    phone: "+1 234-567-9011",
    role: "Staff",
    hireDate: "2024-03-12",
    status: "active",
  },
];

const columns: ColumnDef<Trainer>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <Badge variant={role === "Trainer" ? "default" : "secondary"}>
          {role}
        </Badge>
      );
    },
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("hireDate"));
      return <div>{date.toLocaleDateString()}</div>;
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
      const trainer = row.original;
      return <ActionsCell trainer={trainer} />;
    },
    enableSorting: false,
  },
];

export function TrainersTable() {
  return (
    <DataTable
      columns={columns}
      data={mockTrainers}
      searchPlaceholder="Search trainers/staff..."
      addButtonLabel="Add Trainer/Staff"
      addButtonHref="/trainers-staff/add-trainer"
      entityName="trainer"
    />
  );
}
