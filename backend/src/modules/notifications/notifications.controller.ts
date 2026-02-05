import type { Request, Response } from 'express';
import { notificationsService } from './notifications.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/v1/notifications
export const listNotifications = asyncHandler(async (req: Request, res: Response) => {
    const result = await notificationsService.listNotifications(req.query as any, req.userId!);
    res.status(200).json({
        success: true,
        data: result.notifications,
        pagination: result.pagination,
    });
});

// GET /api/v1/notifications/unread-count
export const getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
    const result = await notificationsService.getUnreadCount(req.userId!);
    res.status(200).json({
        success: true,
        data: result,
    });
});

// PATCH /api/v1/notifications/:id/read
export const markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const notification = await notificationsService.markAsRead(id, req.userId!);
    res.status(200).json({
        success: true,
        data: notification,
    });
});

// PATCH /api/v1/notifications/read-all
export const markAllAsRead = asyncHandler(async (req: Request, res: Response) => {
    const result = await notificationsService.markAllAsRead(req.userId!);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});

// DELETE /api/v1/notifications/:id
export const deleteNotification = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = await notificationsService.deleteNotification(id, req.userId!);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});
