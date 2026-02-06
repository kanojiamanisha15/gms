import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, postRequest, putRequest, deleteRequest } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { toast } from "sonner";
import type { User } from "@/types/auth";

// Re-export for convenience
export type { User };

/** Hook to fetch all users*/
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getRequest<{ success: boolean; data?: User[]; error?: string }>(
        API_ENDPOINTS.USERS
      );
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch users");
      }
      return response.data as User[];
    },
  });
}

/** Hook to fetch a single user by ID*/
export function useUser(userId: number) {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const response = await getRequest<{ success: boolean; data?: User; error?: string }>(
        `${API_ENDPOINTS.USERS}/${userId}`
      );
      if (!response.success) {
        throw new Error(response.error || "Failed to fetch user");
      }
      return response.data as User;
    },
    enabled: !!userId,
  });
}

/**
 * Hook to create a new user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: { name: string; email: string; role?: string }) => {
      const response = await postRequest<{ success: boolean; data?: User; error?: string }>(
        API_ENDPOINTS.USERS,
        userData
      );
      if (!response.success) {
        throw new Error(response.error || "Failed to create user");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create user");
    },
  });
}

/** Hook to update a user*/
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: number;
      userData: {
        name?: string;
        email?: string;
        role?: string;
        currentPassword: string;
        newPassword?: string;
        confirmPassword?: string;
      };
    }) => {
      const response = await putRequest<{ success: boolean; data?: User; error?: string }>(
        `${API_ENDPOINTS.USERS}/${userId}`,
        userData
      );
      if (!response.success) {
        throw new Error(response.error || "Failed to update user");
      }
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      toast.success("User updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update user");
    },
  });
}

/** Hook to delete a user*/
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      const response = await deleteRequest<{ success: boolean; error?: string }>(
        `${API_ENDPOINTS.USERS}/${userId}`
      );
      if (!response.success) {
        throw new Error(response.error || "Failed to delete user");
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete user");
    },
  });
}
