import { Notification } from '../../database/models/index.js';
import { ApiError } from '../../utils/ApiError.js';
import type { ListNotificationsQuery } from './notifications.validators.js';

class NotificationsService {
    async listNotifications(query: ListNotificationsQuery, userId: string) {
        const { page, limit, isRead } = query;
        const skip = (page - 1) * limit;

        const filter: Record<string, unknown> = { userId };
        if (isRead !== undefined) {
            filter.readAt = isRead ? { $ne: null } : null;
        }

        const [notifications, total] = await Promise.all([
            Notification.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Notification.countDocuments(filter),
        ]);

        return {
            notifications,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getUnreadCount(userId: string) {
        const count = await Notification.countDocuments({
            userId,
            readAt: null,
        });
        return { unreadCount: count };
    }

    async markAsRead(id: string, userId: string) {
        const notification = await Notification.findOne({ _id: id, userId });

        if (!notification) {
            throw ApiError.notFound('Notification not found');
        }

        if (!notification.readAt) {
            notification.readAt = new Date();
            await notification.save();
        }

        return notification;
    }

    async markAllAsRead(userId: string) {
        await Notification.updateMany(
            { userId, readAt: null },
            { readAt: new Date() }
        );
        return { message: 'All notifications marked as read' };
    }

    async deleteNotification(id: string, userId: string) {
        const notification = await Notification.findOneAndDelete({ _id: id, userId });

        if (!notification) {
            throw ApiError.notFound('Notification not found');
        }

        return { message: 'Notification deleted' };
    }

    // Helper to create notifications (used by other services)
    async createNotification(data: {
        userId: string;
        type: string;
        title: string;
        message: string;
        data?: Record<string, unknown>;
        channels?: string[];
    }) {
        return Notification.create({
            userId: data.userId,
            type: data.type,
            title: data.title,
            message: data.message,
            data: data.data,
            channels: data.channels || ['in_app'],
        });
    }
}

export const notificationsService = new NotificationsService();
