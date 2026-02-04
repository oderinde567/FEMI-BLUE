import apiClient from '../../../lib/api-client';
import type { ApiResponse } from '../../../types/api';
import type { SignupData, SignupResponse } from '../types';

export async function signup(data: SignupData): Promise<SignupResponse> {
    const response = await apiClient.post<ApiResponse<SignupResponse>>('/auth/signup', data);
    return response.data.data;
}
