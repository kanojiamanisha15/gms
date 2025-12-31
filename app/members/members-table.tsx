"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { EditButton } from "@/components/ui/edit-button";
import { DeleteButton } from "@/components/ui/delete-button";

function ActionsCell({ member }: { member: Member }) {
  const handleDelete = (id: string) => {
    // Handle delete action
    console.log("Delete member:", id);
  };

  return (
    <div className="flex items-center gap-2">
      <EditButton
        id={member.id}
        editPath="/members/add-member"
        entityName="member"
      />
      <DeleteButton
        id={member.id}
        onDelete={handleDelete}
        entityName="member"
        itemName={member.name}
      />
    </div>
  );
}

export type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  joinDate: string;
  status: "active" | "inactive" | "expired";
};

const mockMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    membershipType: "Premium",
    joinDate: "2024-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234-567-8901",
    membershipType: "Basic",
    joinDate: "2024-02-20",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "+1 234-567-8902",
    membershipType: "Premium",
    joinDate: "2023-12-10",
    status: "expired",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phone: "+1 234-567-8903",
    membershipType: "Standard",
    joinDate: "2024-03-05",
    status: "active",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "+1 234-567-8904",
    membershipType: "Basic",
    joinDate: "2024-01-28",
    status: "inactive",
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "+1 234-567-8905",
    membershipType: "Premium",
    joinDate: "2024-02-14",
    status: "active",
  },
  {
    id: "7",
    name: "Edward Norton",
    email: "edward.norton@example.com",
    phone: "+1 234-567-8906",
    membershipType: "Standard",
    joinDate: "2023-11-30",
    status: "expired",
  },
  {
    id: "8",
    name: "Fiona Green",
    email: "fiona.green@example.com",
    phone: "+1 234-567-8907",
    membershipType: "Basic",
    joinDate: "2024-03-20",
    status: "active",
  },
  {
    id: "9",
    name: "George White",
    email: "george.white@example.com",
    phone: "+1 234-567-8908",
    membershipType: "Premium",
    joinDate: "2024-01-10",
    status: "active",
  },
  {
    id: "10",
    name: "Hannah Black",
    email: "hannah.black@example.com",
    phone: "+1 234-567-8909",
    membershipType: "Standard",
    joinDate: "2024-02-28",
    status: "inactive",
  },
  {
    id: "11",
    name: "Ian Gray",
    email: "ian.gray@example.com",
    phone: "+1 234-567-8910",
    membershipType: "Basic",
    joinDate: "2023-10-15",
    status: "expired",
  },
  {
    id: "12",
    name: "Julia Red",
    email: "julia.red@example.com",
    phone: "+1 234-567-8911",
    membershipType: "Premium",
    joinDate: "2024-03-12",
    status: "active",
  },
];

const columns: ColumnDef<Member>[] = [
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
    accessorKey: "membershipType",
    header: "Membership Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("membershipType")}</div>
    ),
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("joinDate"));
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
        expired: { variant: "destructive" },
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
      const member = row.original;
      return <ActionsCell member={member} />;
    },
    enableSorting: false,
  },
];

export function MembersTable() {
  return (
    <DataTable
      columns={columns}
      data={mockMembers}
      searchPlaceholder="Search members..."
      addButtonLabel="Add Member"
      addButtonHref="/members/add-member"
      entityName="member"
    />
  );
}
