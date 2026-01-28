"use client";

import { PageContent } from "@/components/ui/page-content";
import { MembershipPlansTable } from "./membership-plans-table";

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
