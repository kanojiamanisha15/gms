import { useQuery } from "@tanstack/react-query";
import { doGetPaymentsOverview } from "@/lib/services/payments";

export function usePaymentsOverview() {
  return useQuery({
    queryKey: ["payments", "overview"],
    queryFn: () => doGetPaymentsOverview(),
  });
}
