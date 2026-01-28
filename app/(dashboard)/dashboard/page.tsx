"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { SectionCards } from "@/components/ui/section-cards";
import { Badge } from "@/components/ui/badge";
import { mockMembers } from "../members/members-table";
import { mockPlans } from "../membership-plans/membership-plans-table";
import { FinancialChart } from "./financial-chart";

type ExpiringMember = {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  expirationDate: string;
  daysRemaining: number;
};

// Helper function to calculate expiration date based on join date and membership duration
function calculateExpirationDate(
  joinDate: string,
  membershipType: string
): string {
  const join = new Date(joinDate);
  const plan = mockPlans.find(
    (p: { name: string }) => p.name === membershipType
  );

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

// Filter members whose plans expire this month
function getExpiringMembersThisMonth(): ExpiringMember[] {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return mockMembers
    .filter((member: { status: string }) => member.status === "active")
    .map(
      (member: {
        id: string;
        name: string;
        email: string;
        phone: string;
        membershipType: string;
        joinDate: string;
      }) => {
        const expirationDate = calculateExpirationDate(
          member.joinDate,
          member.membershipType
        );
        const expDate = new Date(expirationDate);
        const daysRemaining = Math.ceil(
          (expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          id: member.id,
          name: member.name,
          email: member.email,
          phone: member.phone,
          membershipType: member.membershipType,
          expirationDate,
          daysRemaining,
        };
      }
    )
    .filter((member: ExpiringMember) => {
      const expDate = new Date(member.expirationDate);
      return (
        expDate.getMonth() === currentMonth &&
        expDate.getFullYear() === currentYear &&
        member.daysRemaining >= 0
      );
    })
    .sort(
      (a: ExpiringMember, b: ExpiringMember) =>
        a.daysRemaining - b.daysRemaining
    );
}

const columns: ColumnDef<ExpiringMember>[] = [
  {
    accessorKey: "name",
    header: "Member Name",
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
    accessorKey: "expirationDate",
    header: "Expiration Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("expirationDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "daysRemaining",
    header: "Days Remaining",
    cell: ({ row }) => {
      const days = row.getValue("daysRemaining") as number;
      const variant =
        days <= 7 ? "destructive" : days <= 14 ? "secondary" : "default";
      return (
        <Badge variant={variant}>
          {days === 0 ? "Expires Today" : days === 1 ? "1 Day" : `${days} Days`}
        </Badge>
      );
    },
  },
];

export default function Page() {
  const expiringMembers = React.useMemo(
    () => getExpiringMembersThisMonth(),
    []
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <FinancialChart />
          </div>
          <DataTable
            columns={columns}
            data={expiringMembers}
            searchPlaceholder="Search expiring members..."
            showAddButton={false}
            headerTitle="Members with Plans Expiring This Month"
            headerDescription={`${expiringMembers.length} member${
              expiringMembers.length !== 1 ? "s" : ""
            } with plans expiring this month`}
          />
        </div>
      </div>
    </div>
  );
}
