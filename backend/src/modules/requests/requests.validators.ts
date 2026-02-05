import { z } from 'zod';

export const createRequestSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200).trim(),
    description: z.string().min(1, 'Description is required').max(5000).trim(),
    category: z.string().min(1, 'Category is required').trim(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    dueDate: z.string().datetime().optional(),
    valueNgn: z.number().min(0).optional(),
});

export const updateRequestSchema = z.object({
    title: z.string().min(1).max(200).trim().optional(),
    description: z.string().min(1).max(5000).trim().optional(),
    category: z.string().trim().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    dueDate: z.string().datetime().optional().nullable(),
    valueNgn: z.number().min(0).optional(),
});

export const updateStatusSchema = z.object({
    status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
});

export const assignRequestSchema = z.object({
    assignedTo: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid user ID'),
});

export const addCommentSchema = z.object({
    content: z.string().min(1, 'Comment is required').max(5000).trim(),
    isInternal: z.boolean().default(false),
});

export const listRequestsQuerySchema = z.object({
    page: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1)),
    limit: z.string().optional().transform((v) => Math.min(v ? parseInt(v, 10) : 20, 100)),
    status: z.enum(['pending', 'in_progress', 'completed', 'cancelled', 'overdue']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    category: z.string().optional(),
    assignedTo: z.string().optional(),
    requesterId: z.string().optional(),
    search: z.string().optional(),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
    sortBy: z.string().optional().default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const requestIdParamSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid request ID'),
});

// Type exports
export type CreateRequestInput = z.infer<typeof createRequestSchema>;
export type UpdateRequestInput = z.infer<typeof updateRequestSchema>;
export type UpdateStatusInput = z.infer<typeof updateStatusSchema>;
export type AssignRequestInput = z.infer<typeof assignRequestSchema>;
export type AddCommentInput = z.infer<typeof addCommentSchema>;
export type ListRequestsQuery = z.infer<typeof listRequestsQuerySchema>;
