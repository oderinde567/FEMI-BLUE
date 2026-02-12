import { z } from 'zod';

export const listActivityQuerySchema = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(50),
    action: z.string().optional(),
    entityType: z.string().optional(),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
});

export const userIdParamSchema = z.object({
    userId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid user ID'),
});

export const entityParamsSchema = z.object({
    type: z.string(),
    id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid entity ID'),
});

export type ListActivityQuery = z.infer<typeof listActivityQuerySchema>;
