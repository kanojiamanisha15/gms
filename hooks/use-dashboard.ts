import { useQuery } from "@tanstack/react-query";
import {
  doGetDashboardOverview,
  doGetFinancialChartData,
} from "@/lib/services/dashboard";
import type { TimePeriod } from "@/lib/services/dashboard";

export function useDashboardOverview(period: TimePeriod) {
  return useQuery({
    queryKey: ["dashboard", "overview", period],
    queryFn: () => doGetDashboardOverview(period),
  });
}

export function useFinancialChart() {
  return useQuery({
    queryKey: ["dashboard", "financial-chart"],
    queryFn: () => doGetFinancialChartData(),
  });
}
