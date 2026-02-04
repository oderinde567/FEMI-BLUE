import apiClient from '../../../lib/api-client';
import type { ApiResponse } from '../../../types/api';
import type {
    ForgotPasswordData,
    ResetPasswordData,
    VerifyEmailOtpData,
    AuthMessageResponse,
    AuthTokens
} from '../types';

export async function forgotPassword(data: ForgotPasswordData): Promise<AuthMessageResponse> {
    const response = await apiClient.post<ApiResponse<AuthMessageResponse>>('/auth/forgot-password', data);
    return response.data.data;
}

export async function resetPassword(data: ResetPasswordData): Promise<AuthMessageResponse> {
    const response = await apiClient.post<ApiResponse<AuthMessageResponse>>('/auth/reset-password', data);
    return response.data.data;
}

export async function verifyEmailOtp(data: VerifyEmailOtpData): Promise<AuthMessageResponse> {
    const response = await apiClient.post<ApiResponse<AuthMessageResponse>>('/auth/verify-email/otp', data);
    return response.data.data;
}

export async function verifyEmailToken(token: string): Promise<AuthMessageResponse> {
    const response = await apiClient.get<ApiResponse<AuthMessageResponse>>(`/auth/verify-email/${token}`);
    return response.data.data;
}

export async function resendVerification(email: string): Promise<AuthMessageResponse> {
    const response = await apiClient.post<ApiResponse<AuthMessageResponse>>('/auth/resend-verification', { email });
    return response.data.data;
}

export async function logout(refreshToken: string): Promise<AuthMessageResponse> {
    const response = await apiClient.post<ApiResponse<AuthMessageResponse>>('/auth/logout', { refreshToken });
    return response.data.data;
}

export async function refreshTokens(refreshToken: string): Promise<AuthTokens> {
    const response = await apiClient.post<ApiResponse<AuthTokens>>('/auth/refresh', { refreshToken });
    return response.data.data;
}
