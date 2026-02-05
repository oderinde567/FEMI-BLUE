import { z } from 'zod';

// Password must be 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const signupSchema = z.object({
    email: z.string().email('Invalid email format').toLowerCase().trim(),
    password: passwordSchema,
    firstName: z.string().min(1, 'First name is required').max(100).trim(),
    lastName: z.string().min(1, 'Last name is required').max(100).trim(),
    phone: z.string().max(20).optional(),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email format').toLowerCase().trim(),
    password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email format').toLowerCase().trim(),
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, 'Token is required'),
    password: passwordSchema,
});

export const verifyEmailOtpSchema = z.object({
    email: z.string().email('Invalid email format').toLowerCase().trim(),
    otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const resendVerificationSchema = z.object({
    email: z.string().email('Invalid email format').toLowerCase().trim(),
});

export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Type exports
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailOtpInput = z.infer<typeof verifyEmailOtpSchema>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
