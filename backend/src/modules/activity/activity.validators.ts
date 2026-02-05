import { z } from 'zod';

export const listActivityQuerySchema = z.object({
    page: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1)),
    limit: z.string().optional().transform((v) => Math.min(v ? parseInt(v, 10) : 50, 100)),
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
