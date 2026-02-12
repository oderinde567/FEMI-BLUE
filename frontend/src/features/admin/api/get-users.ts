import apiClient from '../../../lib/api-client';
import type { ApiResponse, PaginationParams } from '../../../types/api';
import type { User } from '../../auth/types';
import type { UserFilters, UsersListResponse, CreateUserData, UpdateUserData, ActivityLogResponse, ActivityLogEntry } from '../types';

interface GetUsersParams extends PaginationParams, UserFilters { }

export async function getUsers(params?: GetUsersParams): Promise<UsersListResponse> {
    const response = await apiClient.get<ApiResponse<User[]>>('/users', { params });
    // Backend returns data as the array and pagination as a top-level field in the JSON body
    // However, apiClient response.data IS the body.
    const body = response.data as any;
    return {
        users: body.data,
        pagination: body.pagination
    };
}

export async function getUserById(id: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
}

export async function createUser(data: CreateUserData): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>('/users', data);
    return response.data.data;
}

export async function updateUser(id: string, data: UpdateUserData): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
}

export async function deleteUser(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete<ApiResponse<{ message: string }>>(`/users/${id}`);
    return response.data.data;
}

export async function getActivityLogs(params?: PaginationParams): Promise<ActivityLogResponse> {
    const response = await apiClient.get<ApiResponse<ActivityLogEntry[]>>('/activity', { params });
    const body = response.data as any;
    return {
        logs: body.data,
        pagination: body.pagination
    };
}
