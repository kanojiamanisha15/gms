import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  doGetExpenses,
  doGetExpenseById,
  doCreateExpense,
  doUpdateExpense,
  doDeleteExpense,
} from "@/lib/services/expenses";
import type { ICreateExpenseData, IUpdateExpenseData } from "@/types";

/** Hook to fetch expenses list with filters */
export function useExpenses(params?: {
  search?: string;
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
}) {
  return useQuery({
    queryKey: ["expenses", params?.search, params?.page, params?.limit, params?.startDate, params?.endDate],
    queryFn: () => doGetExpenses(params),
  });
}

/** Hook to fetch a single expense by ID */
export function useExpense(expenseId: number | undefined) {
  return useQuery({
    queryKey: ["expenses", expenseId],
    queryFn: () => doGetExpenseById(expenseId!),
    enabled: !!expenseId,
  });
}

/** Hook to create a new expense */
export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ICreateExpenseData) => {
      const response = await doCreateExpense(data);
      if (!response?.success) {
        throw new Error(response?.error ?? "Failed to add expense");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Expense added successfully");
    },
    onError: (error) => {
      console.error("Create expense error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add expense. Please try again."
      );
    },
  });
}

/** Hook to update an existing expense */
export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      expenseId,
      data,
    }: {
      expenseId: number;
      data: IUpdateExpenseData;
    }) => {
      const response = await doUpdateExpense(expenseId, data);
      if (!response?.success) {
        throw new Error(response?.error ?? "Failed to update expense");
      }
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["expenses", variables.expenseId] });
      toast.success("Expense updated successfully");
    },
    onError: (error) => {
      console.error("Update expense error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update expense. Please try again."
      );
    },
  });
}

/** Hook to delete an expense */
export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (expenseId: number) => doDeleteExpense(expenseId),
    onSuccess: (response) => {
      if (response?.success) {
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        toast.success("Expense deleted successfully");
      } else {
        toast.error(response?.error ?? "Failed to delete expense");
      }
    },
    onError: (error) => {
      console.error("Delete expense error:", error);
      toast.error("Failed to delete expense. Please try again.");
    },
  });
}
