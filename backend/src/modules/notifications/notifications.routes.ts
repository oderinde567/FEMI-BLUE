import { Router } from 'express';
import { validateRequest, authenticate } from '../../middleware/index.js';
import * as notificationsController from './notifications.controller.js';
import {
    listNotificationsQuerySchema,
    notificationIdParamSchema,
} from './notifications.validators.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/v1/notifications
router.get(
    '/',
    validateRequest({ query: listNotificationsQuerySchema }),
    notificationsController.listNotifications
);

// GET /api/v1/notifications/unread-count
router.get('/unread-count', notificationsController.getUnreadCount);

// PATCH /api/v1/notifications/read-all
router.patch('/read-all', notificationsController.markAllAsRead);

// PATCH /api/v1/notifications/:id/read
router.patch(
    '/:id/read',
    validateRequest({ params: notificationIdParamSchema }),
    notificationsController.markAsRead
);

// DELETE /api/v1/notifications/:id
router.delete(
    '/:id',
    validateRequest({ params: notificationIdParamSchema }),
    notificationsController.deleteNotification
);

export default router;
