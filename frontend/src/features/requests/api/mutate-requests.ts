import apiClient from '../../../lib/api-client';
import type { ApiResponse } from '../../../types/api';
import type { RequestItem, CreateRequestData, UpdateRequestData } from '../types';

export async function createRequest(data: CreateRequestData): Promise<RequestItem> {
    const response = await apiClient.post<ApiResponse<RequestItem>>('/requests', data);
    return response.data.data;
}

export async function updateRequest(id: string, data: UpdateRequestData): Promise<RequestItem> {
    const response = await apiClient.patch<ApiResponse<RequestItem>>(`/requests/${id}`, data);
    return response.data.data;
}

export async function deleteRequest(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/requests/${id}`);
    return response.data.data;
}

export async function assignRequest(id: string, assignedTo: string): Promise<RequestItem> {
    const response = await apiClient.patch<ApiResponse<RequestItem>>(`/requests/${id}/assign`, { assignedTo });
    return response.data.data;
}

export async function updateRequestStatus(id: string, status: RequestItem['status']): Promise<RequestItem> {
    const response = await apiClient.patch<ApiResponse<RequestItem>>(`/requests/${id}/status`, { status });
    return response.data.data;
}
