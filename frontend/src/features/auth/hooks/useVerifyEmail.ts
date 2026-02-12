import { useMutation } from '@tanstack/react-query';
import { verifyEmailOtp, resendVerification } from '../api/auth';
import type { VerifyEmailOtpData, AuthMessageResponse } from '../types';

export function useVerifyEmail() {
    return useMutation<AuthMessageResponse, Error, VerifyEmailOtpData>({
        mutationFn: verifyEmailOtp,
    });
}

export function useResendVerification() {
    return useMutation<AuthMessageResponse, Error, string>({
        mutationFn: resendVerification,
    });
}
