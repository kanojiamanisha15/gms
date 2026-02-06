import {
  getRequest,
  putRequest,
  deleteRequest,
} from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/constants/api";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface INotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

type NotificationsListResponse = {
  success: boolean;
  data?: { notifications: INotification[] };
  error?: string;
};

type NotificationResponse = {
  success: boolean;
  data?: { notification: INotification };
  error?: string;
};

export const doGetNotifications = async (): Promise<INotification[]> => {
  const response = await getRequest<NotificationsListResponse>(
    API_ENDPOINTS.NOTIFICATIONS
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to fetch notifications");
  }

  return response.data?.notifications ?? [];
};

export const doMarkNotificationRead = async (
  id: string
): Promise<INotification> => {
  const response = await putRequest<NotificationResponse>(
    `${API_ENDPOINTS.NOTIFICATIONS}/${id}`,
    {}
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to mark as read");
  }

  return response.data!.notification;
};

export const doMarkAllNotificationsRead = async (): Promise<void> => {
  const response = await putRequest<{ success: boolean; error?: string }>(
    API_ENDPOINTS.NOTIFICATIONS_READ_ALL,
    {}
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to mark all as read");
  }
};

export const doDeleteNotification = async (
  id: string
): Promise<{ success: boolean }> => {
  const response = await deleteRequest<{ success: boolean; error?: string }>(
    `${API_ENDPOINTS.NOTIFICATIONS}/${id}`
  );

  if (!response?.success) {
    throw new Error(response?.error ?? "Failed to delete notification");
  }

  return response;
};
