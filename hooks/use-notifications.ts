import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  doGetNotifications,
  doMarkNotificationRead,
  doMarkAllNotificationsRead,
  doDeleteNotification,
} from "@/lib/services/notifications";

export function useNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => doGetNotifications(),
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => doMarkNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => doMarkAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => doDeleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
