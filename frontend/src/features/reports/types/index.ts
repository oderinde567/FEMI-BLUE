// Report types from backend
export interface DashboardKpis {
    totalRequests: number;
    pendingRequests: number;
    inProgressRequests: number;
    completedRequests: number;
    overdueRequests: number;
    avgResolutionTime: number; // in hours
    totalUsers: number;
    activeUsers: number;
}

export interface RequestSummary {
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
    byCategory: Record<string, number>;
}

export interface TrendDataPoint {
    date: string;
    count: number;
}

export interface TrendsReport {
    daily: TrendDataPoint[];
    weekly: TrendDataPoint[];
    monthly: TrendDataPoint[];
}

export interface RevenueDataPoint {
    period: string;
    amount: number;
    count: number;
}

export interface ReportsFilters {
    startDate?: string;
    endDate?: string;
    groupBy?: 'day' | 'week' | 'month';
}
