import type { Request, Response } from 'express';
import { activityService } from './activity.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/v1/activity
export const listActivity = asyncHandler(async (req: Request, res: Response) => {
    const result = await activityService.listActivity(req.query as any);
    res.status(200).json({
        success: true,
        data: result.logs,
        pagination: result.pagination,
    });
});

// GET /api/v1/activity/user/:userId
export const getActivityByUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params as { userId: string };
    const result = await activityService.getActivityByUser(userId, req.query as any);
    res.status(200).json({
        success: true,
        data: result.logs,
        pagination: result.pagination,
    });
});

// GET /api/v1/activity/entity/:type/:id
export const getActivityByEntity = asyncHandler(async (req: Request, res: Response) => {
    const { type, id } = req.params as { type: string; id: string };
    const result = await activityService.getActivityByEntity(type, id, req.query as any);
    res.status(200).json({
        success: true,
        data: result.logs,
        pagination: result.pagination,
    });
});
