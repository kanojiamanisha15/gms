"use client";

import { PageContent } from "@/components/ui/page-content";
import { MembersTable } from "./members-table";

export default function MembersPage() {
  return (
    <PageContent title="Members" description="Manage your gym members">
      <MembersTable />
    </PageContent>
  );
}
