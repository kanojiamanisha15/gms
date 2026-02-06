import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  doGetMembershipPlans,
  doGetMembershipPlanById,
  doCreateMembershipPlan,
  doUpdateMembershipPlan,
  doDeleteMembershipPlan,
} from "@/lib/services/membership-plans";
import type { ICreateMembershipPlanData, IUpdateMembershipPlanData } from "@/types";

/** Hook to fetch membership plans list with pagination and search */
export function useMembershipPlans(params?: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["membership-plans", params?.search, params?.page, params?.limit],
    queryFn: () =>
      doGetMembershipPlans({
        search: params?.search,
        page: params?.page,
        limit: params?.limit,
      }),
  });
}

/** Hook to fetch all membership plans (for dropdowns, etc.) */
export function useAllMembershipPlans() {
  return useQuery({
    queryKey: ["membership-plans", "all"],
    queryFn: () => doGetMembershipPlans({ limit: 100 }),
  });
}

/** Hook to fetch a single plan by ID */
export function useMembershipPlan(planId: number | string | undefined) {
  const id = planId == null ? undefined : String(planId);
  return useQuery({
    queryKey: ["membership-plans", id],
    queryFn: () => doGetMembershipPlanById(id!),
    enabled: !!id,
  });
}

/** Hook to create a new membership plan */
export function useCreateMembershipPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateMembershipPlanData) => {
      const response = await doCreateMembershipPlan(data);
      if (!response?.success) {
        throw new Error(response?.error ?? "Failed to add membership plan");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership-plans"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Membership plan added successfully");
    },
    onError: (error) => {
      console.error("Create membership plan error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add membership plan. Please try again."
      );
    },
  });
}

/** Hook to update an existing membership plan */
export function useUpdateMembershipPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      planId,
      data,
    }: {
      planId: number | string;
      data: IUpdateMembershipPlanData;
    }) => {
      const response = await doUpdateMembershipPlan(planId, data);
      if (!response?.success) {
        throw new Error(response?.error ?? "Failed to update membership plan");
      }
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["membership-plans"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["membership-plans", String(variables.planId)] });
      toast.success("Membership plan updated successfully");
    },
    onError: (error) => {
      console.error("Update membership plan error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update membership plan. Please try again."
      );
    },
  });
}

/** Hook to delete a membership plan */
export function useDeleteMembershipPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (planId: number | string) => doDeleteMembershipPlan(planId),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["membership-plans"] });
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        toast.success("Membership plan deleted successfully");
      } else {
        toast.error(response.error || "Failed to delete membership plan");
      }
    },
    onError: (error) => {
      console.error("Error deleting membership plan:", error);
      toast.error("Failed to delete membership plan. Please try again.");
    },
  });
}
