"use client";

import dynamic from "next/dynamic";
import { PageContent } from "@/components/ui/page-content";
import { TableSkeleton } from "@/lib/utils/lazy-loading";

// Lazy load the membership plans table
const MembershipPlansTable = dynamic(() => import("@/components/features/membership-plans/membership-plans-table").then(mod => ({ default: mod.MembershipPlansTable })), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default function MembershipPlansPage() {
  return (
    <PageContent
      title="Membership Plans"
      description="Manage membership plans and pricing"
    >
      <MembershipPlansTable />
    </PageContent>
  );
}
