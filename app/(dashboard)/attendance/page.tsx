"use client";

import * as React from "react";
import { PageContent } from "@/components/ui/page-content";
import { AttendanceTable } from "./attendance-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AttendancePage() {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = React.useState<string>(today);

  return (
    <PageContent
      title="Attendance Tracker"
      description="Track member attendance and check-ins"
      headerAction={
        <div className="flex items-center gap-2">
          <Label htmlFor="attendance-date" className="text-sm font-medium">
            Date:
          </Label>
          <Input
            id="attendance-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-[160px]"
          />
        </div>
      }
    >
      <AttendanceTable selectedDate={selectedDate} />
    </PageContent>
  );
}
