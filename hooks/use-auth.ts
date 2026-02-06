import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  login,
  register,
  getCurrentUser,
  logout,
  type LoginCredentials,
  type RegisterData,
} from "@/lib/services/api-client";

/** Hook for user login*/
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Login successful!");
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        router.push("/dashboard");
      } else {
        toast.error(data.error);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });
}

/** Hook for user registration*/
export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterData) => register(userData),
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Account created successfully! Please login.");
        // Invalidate and refetch user data
        queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        router.push("/login");
      } else {
        toast.error(data.error || "Failed to create account");
      }
    },
    onError: (error) => {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    },
  });
}

/** Hook to get current authenticated user*/
export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await getCurrentUser();
      if (!response.success) {
        throw new Error(response.error || "Failed to get user");
      }
      return response.data?.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/** Hook for user logout*/
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    },
  });
}
