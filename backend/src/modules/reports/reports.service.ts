import { Request, User } from '../../database/models/index.js';
import type { DateRangeQuery } from './reports.validators.js';

class ReportsService {
    // Dashboard KPIs
    async getDashboardStats(userId?: string) {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        const baseFilter: Record<string, unknown> = {};
        if (userId) {
            baseFilter.requesterId = userId;
        }

        const [
            totalRequests,
            pendingRequests,
            inProgressRequests,
            completedRequests,
            thisMonthRequests,
            lastMonthRequests,
            totalUsers,
            activeUsers,
            totalValue,
        ] = await Promise.all([
            Request.countDocuments(baseFilter),
            Request.countDocuments({ ...baseFilter, status: 'pending' }),
            Request.countDocuments({ ...baseFilter, status: 'in_progress' }),
            Request.countDocuments({ ...baseFilter, status: 'completed' }),
            Request.countDocuments({ ...baseFilter, createdAt: { $gte: startOfMonth } }),
            Request.countDocuments({
                ...baseFilter,
                createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
            }),
            userId ? 0 : User.countDocuments(),
            userId ? 0 : User.countDocuments({ isActive: true }),
            Request.aggregate([
                { $match: { ...baseFilter, status: 'completed' } },
                { $group: { _id: null, total: { $sum: '$valueNgn' } } },
            ]),
        ]);

        // Calculate growth
        const requestGrowth = lastMonthRequests > 0
            ? ((thisMonthRequests - lastMonthRequests) / lastMonthRequests) * 100
            : 0;

        return {
            requests: {
                total: totalRequests,
                pending: pendingRequests,
                inProgress: inProgressRequests,
                completed: completedRequests,
                thisMonth: thisMonthRequests,
                growth: Math.round(requestGrowth * 10) / 10,
            },
            users: {
                total: totalUsers,
                active: activeUsers,
            },
            revenue: {
                total: totalValue[0]?.total || 0,
            },
        };
    }

    // Requests summary with filters
    async getRequestsSummary(query: DateRangeQuery, userId?: string) {
        const filter: Record<string, unknown> = {};

        if (userId) {
            filter.requesterId = userId;
        }

        if (query.fromDate || query.toDate) {
            filter.createdAt = {};
            if (query.fromDate) (filter.createdAt as any).$gte = new Date(query.fromDate);
            if (query.toDate) (filter.createdAt as any).$lte = new Date(query.toDate);
        }

        const [byStatus, byPriority, byCategory] = await Promise.all([
            Request.aggregate([
                { $match: filter },
                { $group: { _id: '$status', count: { $sum: 1 } } },
            ]),
            Request.aggregate([
                { $match: filter },
                { $group: { _id: '$priority', count: { $sum: 1 } } },
            ]),
            Request.aggregate([
                { $match: filter },
                { $group: { _id: '$category', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 },
            ]),
        ]);

        return {
            byStatus: byStatus.map((s) => ({ status: s._id, count: s.count })),
            byPriority: byPriority.map((p) => ({ priority: p._id, count: p.count })),
            byCategory: byCategory.map((c) => ({ category: c._id, count: c.count })),
        };
    }

    // Request trends over time
    async getRequestTrends(query: DateRangeQuery, userId?: string) {
        const filter: Record<string, unknown> = {};
        if (userId) filter.requesterId = userId;

        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        filter.createdAt = {
            $gte: query.fromDate ? new Date(query.fromDate) : thirtyDaysAgo,
            $lte: query.toDate ? new Date(query.toDate) : now,
        };

        const trends = await Request.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
                    },
                    count: { $sum: 1 },
                    completed: {
                        $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
                    },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        return trends.map((t) => ({
            date: t._id,
            total: t.count,
            completed: t.completed,
        }));
    }

    // Requests grouped by status
    async getRequestsByStatus(userId?: string) {
        const match: Record<string, unknown> = {};
        if (userId) match.requesterId = userId;

        const results = await Request.aggregate([
            ...(userId ? [{ $match: match }] : []),
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]);

        return results.map((r) => ({ status: r._id, count: r.count }));
    }

    // Requests grouped by category
    async getRequestsByCategory(userId?: string) {
        const match: Record<string, unknown> = {};
        if (userId) match.requesterId = userId;

        const results = await Request.aggregate([
            ...(userId ? [{ $match: match }] : []),
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        return results.map((r) => ({ category: r._id, count: r.count }));
    }

    // User activity metrics (admin only)
    async getUsersActivity() {
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const [recentLogins, topRequesters, topAssignees] = await Promise.all([
            User.countDocuments({
                lastLoginAt: { $gte: thirtyDaysAgo },
            }),
            Request.aggregate([
                { $group: { _id: '$requesterId', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                { $unwind: '$user' },
                {
                    $project: {
                        _id: 0,
                        userId: '$_id',
                        name: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
                        count: 1,
                    },
                },
            ]),
            Request.aggregate([
                { $match: { assignedTo: { $exists: true } } },
                { $group: { _id: '$assignedTo', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 5 },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                { $unwind: '$user' },
                {
                    $project: {
                        _id: 0,
                        userId: '$_id',
                        name: { $concat: ['$user.firstName', ' ', '$user.lastName'] },
                        count: 1,
                    },
                },
            ]),
        ]);

        return {
            recentLogins,
            topRequesters,
            topAssignees,
        };
    }

    // Revenue metrics (admin only)
    async getRevenueMetrics(query: DateRangeQuery) {
        const filter: Record<string, unknown> = { status: 'completed' };

        if (query.fromDate || query.toDate) {
            filter.completedAt = {};
            if (query.fromDate) (filter.completedAt as any).$gte = new Date(query.fromDate);
            if (query.toDate) (filter.completedAt as any).$lte = new Date(query.toDate);
        }

        const [totalRevenue, revenueByCategory, revenueByMonth] = await Promise.all([
            Request.aggregate([
                { $match: filter },
                { $group: { _id: null, total: { $sum: '$valueNgn' }, count: { $sum: 1 } } },
            ]),
            Request.aggregate([
                { $match: filter },
                { $group: { _id: '$category', total: { $sum: '$valueNgn' }, count: { $sum: 1 } } },
                { $sort: { total: -1 } },
            ]),
            Request.aggregate([
                { $match: filter },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m', date: '$completedAt' } },
                        total: { $sum: '$valueNgn' },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
                { $limit: 12 },
            ]),
        ]);

        return {
            total: totalRevenue[0]?.total || 0,
            completedCount: totalRevenue[0]?.count || 0,
            byCategory: revenueByCategory.map((r) => ({
                category: r._id,
                total: r.total,
                count: r.count,
            })),
            byMonth: revenueByMonth.map((r) => ({
                month: r._id,
                total: r.total,
                count: r.count,
            })),
        };
    }
}

export const reportsService = new ReportsService();
