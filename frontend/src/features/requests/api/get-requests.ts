import apiClient from '../../../lib/api-client';
import type { ApiResponse, PaginationParams } from '../../../types/api';
import type { RequestItem, RequestFilters, RequestsListResponse } from '../types';

interface GetRequestsParams extends PaginationParams, RequestFilters { }

export async function getRequests(params?: GetRequestsParams): Promise<RequestsListResponse> {
    const response = await apiClient.get<ApiResponse<RequestsListResponse>>('/requests', { params });
    return response.data.data;
}

export async function getRequestById(id: string): Promise<RequestItem> {
    const response = await apiClient.get<ApiResponse<RequestItem>>(`/requests/${id}`);
    return response.data.data;
}
