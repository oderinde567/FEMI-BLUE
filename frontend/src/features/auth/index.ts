// Auth Feature - Public API
// Types
export type {
    User,
    LoginCredentials,
    LoginResponse,
    SignupData,
    SignupResponse,
    AuthTokens,
    ForgotPasswordData,
    ResetPasswordData,
    VerifyEmailOtpData,
    AuthMessageResponse,
} from './types';

// Hooks
export { useLogin } from './hooks/useLogin';
export { useSignup } from './hooks/useSignup';
export {
    useForgotPassword,
    useResetPassword,
    useVerifyEmailOtp,
    useVerifyEmailToken,
    useResendVerification,
    useLogout,
} from './hooks/useAuth';

// API (for advanced use cases)
export { login } from './api/login';
export { signup } from './api/signup';
export {
    forgotPassword,
    resetPassword,
    verifyEmailOtp,
    verifyEmailToken,
    resendVerification,
    logout,
    refreshTokens,
} from './api/auth';
