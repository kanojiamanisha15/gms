"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { PageContent } from "@/components/ui/page-content";
import { DateInput } from "@/components/ui/date-input";
import { getTodayLocal } from "@/lib/helpers";

const AttendanceTable = dynamic(
  () => import("@/components/features/attendance/attendance-table").then((mod) => ({ default: mod.AttendanceTable })),
  { ssr: false }
);

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = React.useState<string>(getTodayLocal());

  return (
    <PageContent
      title="Attendance Tracker"
      description="Track member attendance and check-ins"
      headerAction={
        <DateInput
          label="Date:"
          id="attendance-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-[160px]"
        />
      }
    >
      <AttendanceTable selectedDate={selectedDate} />
    </PageContent>
  );
}
