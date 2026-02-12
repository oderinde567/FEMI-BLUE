import apiClient from '../../../lib/api-client';
import type { ApiResponse } from '../../../types/api';
import type { User } from '../../auth/types';

export interface UpdateProfileData {
    firstName?: string;
    lastName?: string;
    phone?: string;
    company?: string;
    location?: string;
    bio?: string;
}

export async function getMe(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>('/users/me');
    return response.data.data;
}

export async function updateMe(data: UpdateProfileData): Promise<User> {
    const response = await apiClient.patch<ApiResponse<User>>('/users/me', data);
    return response.data.data;
}

export async function changePassword(data: any): Promise<{ message: string }> {
    const response = await apiClient.patch<ApiResponse<{ message: string }>>('/users/me/password', data);
    return response.data.data;
}
