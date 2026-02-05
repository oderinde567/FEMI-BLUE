import { z } from 'zod';

export const dateRangeQuerySchema = z.object({
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
});

export const exportReportSchema = z.object({
    type: z.enum(['requests_summary', 'users_activity', 'revenue']),
    format: z.enum(['json', 'csv']).default('json'),
    fromDate: z.string().optional(),
    toDate: z.string().optional(),
});

export type DateRangeQuery = z.infer<typeof dateRangeQuerySchema>;
export type ExportReportInput = z.infer<typeof exportReportSchema>;
