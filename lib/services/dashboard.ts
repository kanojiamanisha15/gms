import { getRequest } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants/api";

export type TimePeriod = "monthly" | "quarterly" | "half-yearly" | "yearly";

export interface DashboardOverviewData {
  revenue: number;
  newCustomers: number;
  activeAccounts: number;
  growthRate: number;
  revenueChange: number;
  customersChange: number;
  accountsChange: number;
  growthChange: number;
}

type DashboardOverviewResponse = {
  success: boolean;
  data?: DashboardOverviewData;
  error?: string;
};

export const doGetDashboardOverview = async (
  period: TimePeriod
): Promise<DashboardOverviewData> => {
  const response = await getRequest<DashboardOverviewResponse>(
    API_ENDPOINTS.DASHBOARD_OVERVIEW,
    { period }
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to fetch dashboard overview");
  }

  return response.data!;
};

export interface FinancialChartDataPoint {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

type FinancialChartResponse = {
  success: boolean;
  data?: FinancialChartDataPoint[];
  error?: string;
};

export const doGetFinancialChartData = async (): Promise<
  FinancialChartDataPoint[]
> => {
  const response = await getRequest<FinancialChartResponse>(
    API_ENDPOINTS.DASHBOARD_FINANCIAL_CHART
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to fetch financial chart data");
  }

  return response.data ?? [];
};
