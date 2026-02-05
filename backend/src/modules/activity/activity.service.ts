import { ActivityLog } from '../../database/models/index.js';
import type { ListActivityQuery } from './activity.validators.js';

class ActivityService {
    async listActivity(query: ListActivityQuery) {
        const { page, limit, action, entityType, fromDate, toDate } = query;
        const skip = (page - 1) * limit;

        const filter: Record<string, unknown> = {};

        if (action) filter.action = action;
        if (entityType) filter.entityType = entityType;

        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) (filter.createdAt as any).$gte = new Date(fromDate);
            if (toDate) (filter.createdAt as any).$lte = new Date(toDate);
        }

        const [logs, total] = await Promise.all([
            ActivityLog.find(filter)
                .populate('actorId', 'firstName lastName email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            ActivityLog.countDocuments(filter),
        ]);

        return {
            logs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getActivityByUser(userId: string, query: ListActivityQuery) {
        const { page, limit } = query;
        const skip = (page - 1) * limit;

        const [logs, total] = await Promise.all([
            ActivityLog.find({ actorId: userId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            ActivityLog.countDocuments({ actorId: userId }),
        ]);

        return {
            logs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getActivityByEntity(entityType: string, entityId: string, query: ListActivityQuery) {
        const { page, limit } = query;
        const skip = (page - 1) * limit;

        const filter = { entityType, entityId };

        const [logs, total] = await Promise.all([
            ActivityLog.find(filter)
                .populate('actorId', 'firstName lastName email')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            ActivityLog.countDocuments(filter),
        ]);

        return {
            logs,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // Helper to log activity (used by other services)
    async logActivity(data: {
        actorId?: string;
        action: string;
        entityType?: string;
        entityId?: string;
        description: string;
        metadata?: Record<string, unknown>;
        ipAddress?: string;
        userAgent?: string;
    }) {
        return ActivityLog.create({
            actorId: data.actorId,
            action: data.action,
            entityType: data.entityType,
            entityId: data.entityId,
            description: data.description,
            metadata: data.metadata,
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
        });
    }
}

export const activityService = new ActivityService();
