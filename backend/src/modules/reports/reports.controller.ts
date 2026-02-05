import type { Request, Response } from 'express';
import { reportsService } from './reports.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/v1/reports/dashboard
export const getDashboard = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await reportsService.getDashboardStats();
    res.status(200).json({
        success: true,
        data: stats,
    });
});

// GET /api/v1/reports/requests/summary
export const getRequestsSummary = asyncHandler(async (req: Request, res: Response) => {
    const summary = await reportsService.getRequestsSummary(req.query as any);
    res.status(200).json({
        success: true,
        data: summary,
    });
});

// GET /api/v1/reports/requests/by-status
export const getRequestsByStatus = asyncHandler(async (_req: Request, res: Response) => {
    const data = await reportsService.getRequestsByStatus();
    res.status(200).json({
        success: true,
        data,
    });
});

// GET /api/v1/reports/requests/by-category
export const getRequestsByCategory = asyncHandler(async (_req: Request, res: Response) => {
    const data = await reportsService.getRequestsByCategory();
    res.status(200).json({
        success: true,
        data,
    });
});

// GET /api/v1/reports/requests/trends
export const getRequestTrends = asyncHandler(async (req: Request, res: Response) => {
    const trends = await reportsService.getRequestTrends(req.query as any);
    res.status(200).json({
        success: true,
        data: trends,
    });
});

// GET /api/v1/reports/users/activity
export const getUsersActivity = asyncHandler(async (_req: Request, res: Response) => {
    const activity = await reportsService.getUsersActivity();
    res.status(200).json({
        success: true,
        data: activity,
    });
});

// GET /api/v1/reports/revenue
export const getRevenue = asyncHandler(async (req: Request, res: Response) => {
    const revenue = await reportsService.getRevenueMetrics(req.query as any);
    res.status(200).json({
        success: true,
        data: revenue,
    });
});
