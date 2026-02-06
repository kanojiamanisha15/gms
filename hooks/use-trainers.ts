import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  doGetTrainers,
  doGetTrainerById,
  doCreateTrainer,
  doUpdateTrainer,
  doDeleteTrainer,
} from "@/lib/services/trainers";
import type { ICreateTrainerData, IUpdateTrainerData } from "@/types";

/** Hook to fetch trainers list with pagination and search */
export function useTrainers(params?: {
  search?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["trainers", params?.search, params?.page, params?.limit],
    queryFn: () =>
      doGetTrainers({
        search: params?.search,
        page: params?.page,
        limit: params?.limit,
      }),
  });
}

/** Hook to fetch a single trainer by ID */
export function useTrainer(trainerId: number | string | undefined) {
  const id = trainerId == null ? undefined : String(trainerId);
  return useQuery({
    queryKey: ["trainers", id],
    queryFn: () => doGetTrainerById(id!),
    enabled: !!id,
  });
}

/** Hook to create a new trainer */
export function useCreateTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateTrainerData) => {
      const response = await doCreateTrainer(data);
      if (!response?.success) {
        throw new Error(response?.error ?? "Failed to add trainer");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Trainer added successfully");
    },
    onError: (error) => {
      console.error("Create trainer error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add trainer. Please try again."
      );
    },
  });
}

/** Hook to update an existing trainer */
export function useUpdateTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      trainerId,
      data,
    }: {
      trainerId: number | string;
      data: IUpdateTrainerData;
    }) => {
      const response = await doUpdateTrainer(trainerId, data);
      if (!response?.success) {
        throw new Error(response?.error ?? "Failed to update trainer");
      }
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["trainers", String(variables.trainerId)] });
      toast.success("Trainer updated successfully");
    },
    onError: (error) => {
      console.error("Update trainer error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update trainer. Please try again."
      );
    },
  });
}

/** Hook to delete a trainer */
export function useDeleteTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trainerId: number | string) => doDeleteTrainer(trainerId),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["trainers"] });
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        toast.success("Trainer deleted successfully");
      } else {
        toast.error(response.error || "Failed to delete trainer");
      }
    },
    onError: (error) => {
      console.error("Error deleting trainer:", error);
      toast.error("Failed to delete trainer. Please try again.");
    },
  });
}
