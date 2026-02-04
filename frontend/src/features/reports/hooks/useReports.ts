import { useQuery } from '@tanstack/react-query';
import { getDashboardKpis, getRequestSummary, getTrends } from '../api/get-reports';
import type { ReportsFilters } from '../types';

// Query keys
export const reportKeys = {
    all: ['reports'] as const,
    dashboard: () => [...reportKeys.all, 'dashboard'] as const,
    summary: (filters?: ReportsFilters) => [...reportKeys.all, 'summary', filters] as const,
    trends: (filters?: ReportsFilters) => [...reportKeys.all, 'trends', filters] as const,
};

export function useDashboardKpis() {
    return useQuery({
        queryKey: reportKeys.dashboard(),
        queryFn: getDashboardKpis,
        refetchInterval: 60000, // Refresh every minute
    });
}

export function useRequestSummary(filters?: ReportsFilters) {
    return useQuery({
        queryKey: reportKeys.summary(filters),
        queryFn: () => getRequestSummary(filters),
    });
}

export function useTrends(filters?: ReportsFilters) {
    return useQuery({
        queryKey: reportKeys.trends(filters),
        queryFn: () => getTrends(filters),
    });
}
