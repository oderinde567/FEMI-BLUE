// User type from backend
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'staff' | 'client';
    avatarUrl?: string;
    emailVerified: boolean;
    isActive: boolean;
    lastLoginAt?: string;
    createdAt: string;
    updatedAt: string;
}

// Auth response types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export interface LoginResponse extends AuthTokens {
    user: Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'role' | 'avatarUrl'>;
}

export interface SignupResponse {
    userId: string;
    email: string;
    message: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    token: string;
    password: string;
}

export interface VerifyEmailOtpData {
    email: string;
    otp: string;
}

export interface AuthMessageResponse {
    message: string;
}
