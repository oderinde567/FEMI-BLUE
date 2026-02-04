import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    forgotPassword,
    resetPassword,
    verifyEmailOtp,
    verifyEmailToken,
    resendVerification,
    logout
} from '../api/auth';
import type {
    ForgotPasswordData,
    ResetPasswordData,
    VerifyEmailOtpData,
    AuthMessageResponse
} from '../types';

export function useForgotPassword() {
    return useMutation<AuthMessageResponse, Error, ForgotPasswordData>({
        mutationFn: forgotPassword,
    });
}

export function useResetPassword() {
    return useMutation<AuthMessageResponse, Error, ResetPasswordData>({
        mutationFn: resetPassword,
    });
}

export function useVerifyEmailOtp() {
    return useMutation<AuthMessageResponse, Error, VerifyEmailOtpData>({
        mutationFn: verifyEmailOtp,
    });
}

export function useVerifyEmailToken() {
    return useMutation<AuthMessageResponse, Error, string>({
        mutationFn: verifyEmailToken,
    });
}

export function useResendVerification() {
    return useMutation<AuthMessageResponse, Error, string>({
        mutationFn: resendVerification,
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation<AuthMessageResponse, Error, string>({
        mutationFn: logout,
        onSuccess: () => {
            // Clear tokens
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            // Clear all queries
            queryClient.clear();
        },
    });
}
