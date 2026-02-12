import apiClient from '../../../lib/api-client';
import type { ApiResponse } from '../../../types/api';
import type { NotificationsListResponse, ListNotificationsQuery } from '../types';

export async function getNotifications(params?: ListNotificationsQuery): Promise<NotificationsListResponse> {
    const response = await apiClient.get<ApiResponse<NotificationsListResponse>>('/notifications', { params });
    return response.data.data;
}

export async function getUnreadCount(): Promise<{ count: number }> {
    const response = await apiClient.get<ApiResponse<{ count: number }>>('/notifications/unread-count');
    return response.data.data;
}

export async function markAsRead(id: string): Promise<void> {
    await apiClient.patch<ApiResponse<void>>(`/notifications/${id}/read`);
}

export async function markAllAsRead(): Promise<void> {
    await apiClient.patch<ApiResponse<void>>('/notifications/read-all');
}

export async function deleteNotification(id: string): Promise<void> {
    await apiClient.delete<ApiResponse<void>>(`/notifications/${id}`);
}
