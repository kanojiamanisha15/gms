"use client";

import dynamic from "next/dynamic";
import { PageContent } from "@/components/ui/page-content";
import { TableSkeleton } from "@/lib/utils/lazy-loading";

// Lazy load the members table
const MembersTable = dynamic(() => import("@/components/features/members/members-table").then(mod => ({ default: mod.MembersTable })), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default function MembersPage() {
  return (
    <PageContent title="Members" description="Manage your gym members">
      <MembersTable />
    </PageContent>
  );
}
