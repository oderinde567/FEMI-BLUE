import { z } from 'zod';

export const listNotificationsQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(20),
    isRead: z.preprocess((val) => val === 'true' || val === true, z.boolean().optional()),
});

export const notificationIdParamSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid notification ID'),
});

export type ListNotificationsQuery = z.infer<typeof listNotificationsQuerySchema>;
