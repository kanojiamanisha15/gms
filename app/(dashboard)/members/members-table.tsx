"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import { EditButton } from "@/components/ui/edit-button";
import { DeleteButton } from "@/components/ui/delete-button";
import { mockPlans } from "../membership-plans/membership-plans-table";

// Helper function to calculate expiration date based on join date and membership duration
function calculateExpirationDate(
  joinDate: string,
  membershipType: string
): string {
  const join = new Date(joinDate);
  const plan = mockPlans.find((p) => p.name === membershipType);

  if (!plan) {
    // Default to 1 month if plan not found
    join.setMonth(join.getMonth() + 1);
    return join.toISOString().split("T")[0];
  }

  const duration = plan.duration;
  if (duration.includes("year")) {
    join.setFullYear(join.getFullYear() + 1);
  } else if (duration.includes("month")) {
    const months = parseInt(duration.split(" ")[0]) || 1;
    join.setMonth(join.getMonth() + months);
  }

  return join.toISOString().split("T")[0];
}

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
  expiryDate: string;
  status: "active" | "inactive" | "expired";
  paymentStatus: "paid" | "unpaid";
  paymentAmount: number;
};

export const mockMembers: Member[] = [
  {
    id: "5JA01", // 5JA01 - First member in Jan 2025
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8900",
    membershipType: "Premium",
    joinDate: "2025-01-15",
    expiryDate: calculateExpirationDate("2025-01-15", "Premium"), // Expires Jan 2026
    status: "active",
    paymentStatus: "paid",
    paymentAmount: 299.99,
  },
  {
    id: "5DE01", // 5DE01 - First member in Dec 2025
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234-567-8901",
    membershipType: "Basic",
    joinDate: "2025-12-20",
    expiryDate: calculateExpirationDate("2025-12-20", "Basic"), // Expires Jan 2026
    status: "active",
    paymentStatus: "paid",
    paymentAmount: 29.99,
  },
  {
    id: "3DE01", // 3DE01 - First member in Dec 2023
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "+1 234-567-8902",
    membershipType: "Premium",
    joinDate: "2023-12-10",
    expiryDate: calculateExpirationDate("2023-12-10", "Premium"),
    status: "expired",
    paymentStatus: "unpaid",
    paymentAmount: 299.99,
  },
  {
    id: "5OC01", // 5OC01 - First member in Oct 2025
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phone: "+1 234-567-8903",
    membershipType: "Standard",
    joinDate: "2025-10-05",
    expiryDate: calculateExpirationDate("2025-10-05", "Standard"), // Expires Jan 2026 (3 months)
    status: "active",
    paymentStatus: "paid",
    paymentAmount: 79.99,
  },
  {
    id: "4JA01", // 4JA01 - First member in Jan 2024
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "+1 234-567-8904",
    membershipType: "Basic",
    joinDate: "2024-01-28",
    expiryDate: calculateExpirationDate("2024-01-28", "Basic"),
    status: "inactive",
    paymentStatus: "unpaid",
    paymentAmount: 29.99,
  },
  {
    id: "5JA02", // 5JA02 - Second member in Jan 2025
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "+1 234-567-8905",
    membershipType: "Premium",
    joinDate: "2025-01-10",
    expiryDate: calculateExpirationDate("2025-01-10", "Premium"), // Expires Jan 2026
    status: "active",
    paymentStatus: "paid",
    paymentAmount: 299.99,
  },
  {
    id: "3NO01", // 3NO01 - First member in Nov 2023
    name: "Edward Norton",
    email: "edward.norton@example.com",
    phone: "+1 234-567-8906",
    membershipType: "Standard",
    joinDate: "2023-11-30",
    expiryDate: calculateExpirationDate("2023-11-30", "Standard"),
    status: "expired",
    paymentStatus: "unpaid",
    paymentAmount: 79.99,
  },
  {
    id: "5DE02", // 5DE02 - Second member in Dec 2025
    name: "Fiona Green",
    email: "fiona.green@example.com",
    phone: "+1 234-567-8907",
    membershipType: "Basic",
    joinDate: "2025-12-25",
    expiryDate: calculateExpirationDate("2025-12-25", "Basic"), // Expires Jan 2026
    status: "active",
    paymentStatus: "paid",
    paymentAmount: 29.99,
  },
  {
    id: "4JA02", // 4JA02 - Second member in Jan 2024
    name: "George White",
    email: "george.white@example.com",
    phone: "+1 234-567-8908",
    membershipType: "Premium",
    joinDate: "2024-01-10",
    expiryDate: calculateExpirationDate("2024-01-10", "Premium"),
    status: "active",
    paymentStatus: "paid",
    paymentAmount: 299.99,
  },
  {
    id: "4FE01", // 4FE01 - First member in Feb 2024
    name: "Hannah Black",
    email: "hannah.black@example.com",
    phone: "+1 234-567-8909",
    membershipType: "Standard",
    joinDate: "2024-02-28",
    expiryDate: calculateExpirationDate("2024-02-28", "Standard"),
    status: "inactive",
    paymentStatus: "unpaid",
    paymentAmount: 79.99,
  },
  {
    id: "3OC01", // 3OC01 - First member in Oct 2023
    name: "Ian Gray",
    email: "ian.gray@example.com",
    phone: "+1 234-567-8910",
    membershipType: "Basic",
    joinDate: "2023-10-15",
    expiryDate: calculateExpirationDate("2023-10-15", "Basic"),
    status: "expired",
    paymentStatus: "unpaid",
    paymentAmount: 29.99,
  },
  {
    id: "5OC02", // 5OC02 - Second member in Oct 2025
    name: "Julia Red",
    email: "julia.red@example.com",
    phone: "+1 234-567-8911",
    membershipType: "Standard",
    joinDate: "2025-10-15",
    expiryDate: calculateExpirationDate("2025-10-15", "Standard"), // Expires Jan 2026 (3 months)
    status: "active",
    paymentStatus: "paid",
    paymentAmount: 79.99,
  },
];

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "id",
    header: "Member ID",
    cell: ({ row }) => (
      <div className="font-mono font-medium">{row.getValue("id")}</div>
    ),
  },
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
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("expiryDate"));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const expiryDate = new Date(date);
      expiryDate.setHours(0, 0, 0, 0);
      const daysUntilExpiry = Math.ceil(
        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return (
        <div className="flex flex-col gap-1">
          <div>{date.toLocaleDateString()}</div>
          {daysUntilExpiry >= 0 && daysUntilExpiry <= 30 && (
            <Badge
              variant={daysUntilExpiry <= 7 ? "destructive" : "secondary"}
              className="w-fit"
            >
              {daysUntilExpiry === 0
                ? "Expires Today"
                : daysUntilExpiry === 1
                ? "1 Day Left"
                : `${daysUntilExpiry} Days Left`}
            </Badge>
          )}
        </div>
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
        inactive: { variant: "outline" },
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
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.getValue("paymentStatus") as string;
      const statusConfig: Record<
        string,
        { variant: "default" | "secondary" | "destructive" | "outline" }
      > = {
        paid: { variant: "default" },
        unpaid: { variant: "secondary" },
      };
      const config = statusConfig[paymentStatus] || statusConfig.unpaid;
      return (
        <Badge variant={config.variant}>
          {paymentStatus === "paid" ? "Paid" : "Unpaid"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentAmount",
    header: "Payment Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("paymentAmount"));
      return (
        <div className="font-medium">
          Rs.
          {amount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
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
