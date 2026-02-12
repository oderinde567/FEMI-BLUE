import apiClient from '../../../lib/api-client';
import type { ApiResponse } from '../../../types/api';
import type { DashboardKpis, RequestSummary, TrendsReport, ReportsFilters } from '../types';

export async function getDashboardKpis(): Promise<DashboardKpis> {
    const response = await apiClient.get<ApiResponse<DashboardKpis>>('/reports/dashboard');
    return response.data.data;
}

export async function getRequestSummary(filters?: ReportsFilters): Promise<RequestSummary> {
    const response = await apiClient.get<ApiResponse<RequestSummary>>('/reports/requests/summary', { params: filters });
    return response.data.data;
}

export async function getTrends(filters?: ReportsFilters): Promise<TrendsReport> {
    const response = await apiClient.get<ApiResponse<TrendsReport>>('/reports/requests/trends', { params: filters });
    return response.data.data;
}
