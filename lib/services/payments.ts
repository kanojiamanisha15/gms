import { getRequest } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants/api";

export interface PaymentsOverviewDataPoint {
  month: string;
  received: number;
  due: number;
}

type PaymentsOverviewResponse = {
  success: boolean;
  data?: PaymentsOverviewDataPoint[];
  error?: string;
};

export const doGetPaymentsOverview = async (): Promise<
  PaymentsOverviewDataPoint[]
> => {
  const response = await getRequest<PaymentsOverviewResponse>(
    API_ENDPOINTS.PAYMENTS_OVERVIEW
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to fetch payments overview");
  }

  return response.data ?? [];
};
