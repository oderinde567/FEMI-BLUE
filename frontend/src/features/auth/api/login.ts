import apiClient from '../../../lib/api-client';
import type { ApiResponse } from '../../../types/api';
import type { LoginCredentials, LoginResponse } from '../types';

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    return response.data.data;
}
