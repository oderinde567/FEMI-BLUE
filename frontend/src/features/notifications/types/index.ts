export interface Notification {
    id: string;
    userId: string;
    type: string;
    title: string;
    message: string;
    data?: Record<string, any>;
    readAt?: string;
    channels: string[];
    createdAt: string;
}

export interface NotificationsListResponse {
    notifications: Notification[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface ListNotificationsQuery {
    page?: number;
    limit?: number;
    isRead?: boolean;
}
