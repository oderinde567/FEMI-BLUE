import { z } from 'zod';

export const listNotificationsQuerySchema = z.object({
    page: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1)),
    limit: z.string().optional().transform((v) => Math.min(v ? parseInt(v, 10) : 20, 100)),
    unreadOnly: z.string().optional().transform((v) => v === 'true'),
});

export const notificationIdParamSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid notification ID'),
});

export type ListNotificationsQuery = z.infer<typeof listNotificationsQuerySchema>;
