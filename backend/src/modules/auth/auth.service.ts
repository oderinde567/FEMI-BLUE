import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User, EmailVerificationToken, PasswordResetToken, RefreshToken } from '../../database/models/index.js';
import { ApiError } from '../../utils/ApiError.js';
import { env } from '../../config/env.js';
import type { SignupInput, LoginInput, ForgotPasswordInput, ResetPasswordInput, VerifyEmailOtpInput } from './auth.validators.js';

interface TokenPayload {
    userId: string;
    email: string;
    role: string;
}

interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

class AuthService {
    // Generate JWT access token
    private generateAccessToken(payload: TokenPayload): string {
        return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
            expiresIn: env.JWT_ACCESS_EXPIRY,
        } as jwt.SignOptions);
    }

    // Generate JWT refresh token
    private generateRefreshToken(payload: TokenPayload): string {
        return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
            expiresIn: env.JWT_REFRESH_EXPIRY,
        } as jwt.SignOptions);
    }

    // Generate 6-digit OTP
    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Generate secure random token
    private generateToken(): string {
        return crypto.randomBytes(32).toString('hex');
    }

    // Hash a string using SHA-256
    private hashToken(token: string): string {
        return crypto.createHash('sha256').update(token).digest('hex');
    }

    async signup(data: SignupInput) {
        // Check if user already exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw ApiError.conflict('Email already registered');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(data.password, env.BCRYPT_ROUNDS);

        // Create user
        const user = await User.create({
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
        });

        // Generate verification token and OTP
        const token = this.generateToken();
        const otp = this.generateOtp();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await EmailVerificationToken.create({
            userId: user._id,
            token: this.hashToken(token),
            otp,
            expiresAt,
        });

        // TODO: Send verification email with OTP and magic link
        console.log(`📧 Verification OTP for ${user.email}: ${otp}`);
        console.log(`🔗 Magic link token: ${token}`);

        return {
            userId: user._id.toString(),
            email: user.email,
            message: 'Account created. Please verify your email.',
        };
    }

    async login(data: LoginInput, ipAddress?: string, userAgent?: string) {
        // Find user with password
        const user = await User.findOne({ email: data.email }).select('+passwordHash');
        if (!user) {
            throw ApiError.unauthorized('Invalid email or password');
        }

        // Check if account is active
        if (!user.isActive) {
            throw ApiError.forbidden('Account is deactivated');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(data.password, user.passwordHash);
        if (!isValidPassword) {
            throw ApiError.unauthorized('Invalid email or password');
        }

        // Check if email is verified
        if (!user.emailVerified) {
            throw ApiError.forbidden('Please verify your email before logging in');
        }

        // Generate tokens
        const payload: TokenPayload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);

        // Store refresh token
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        await RefreshToken.create({
            userId: user._id,
            tokenHash: this.hashToken(refreshToken),
            deviceInfo: userAgent,
            ipAddress,
            expiresAt,
        });

        // Update last login
        user.lastLoginAt = new Date();
        await user.save();

        return {
            accessToken,
            refreshToken,
            expiresIn: 900, // 15 minutes in seconds
            user: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                avatarUrl: user.avatarUrl,
            },
        };
    }

    async logout(refreshToken: string) {
        const tokenHash = this.hashToken(refreshToken);
        const token = await RefreshToken.findOne({ tokenHash });

        if (token) {
            token.revokedAt = new Date();
            await token.save();
        }

        return { message: 'Logged out successfully' };
    }

    async refreshTokens(refreshToken: string): Promise<AuthTokens> {
        // Verify the refresh token JWT
        let decoded: TokenPayload;
        try {
            decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as TokenPayload;
        } catch {
            throw ApiError.unauthorized('Invalid refresh token');
        }

        // Check if token exists and is valid in database
        const tokenHash = this.hashToken(refreshToken);
        const storedToken = await RefreshToken.findOne({
            tokenHash,
            revokedAt: null,
            expiresAt: { $gt: new Date() },
        });

        if (!storedToken) {
            throw ApiError.unauthorized('Refresh token is invalid or expired');
        }

        // Get user
        const user = await User.findById(decoded.userId);
        if (!user || !user.isActive) {
            throw ApiError.unauthorized('User not found or inactive');
        }

        // Generate new access token
        const payload: TokenPayload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
        };

        const newAccessToken = this.generateAccessToken(payload);

        return {
            accessToken: newAccessToken,
            refreshToken, // Return same refresh token
            expiresIn: 900,
        };
    }

    async forgotPassword(data: ForgotPasswordInput) {
        const user = await User.findOne({ email: data.email });

        // Always return success to prevent email enumeration
        if (!user) {
            return { message: 'If the email exists, a reset link has been sent.' };
        }

        // Invalidate existing tokens
        await PasswordResetToken.updateMany(
            { userId: user._id, usedAt: null },
            { usedAt: new Date() }
        );

        // Generate new reset token
        const token = this.generateToken();
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await PasswordResetToken.create({
            userId: user._id,
            token: this.hashToken(token),
            expiresAt,
        });

        // TODO: Send reset email
        console.log(`🔑 Password reset token for ${user.email}: ${token}`);

        return { message: 'If the email exists, a reset link has been sent.' };
    }

    async resetPassword(data: ResetPasswordInput) {
        const tokenHash = this.hashToken(data.token);

        const resetToken = await PasswordResetToken.findOne({
            token: tokenHash,
            usedAt: null,
            expiresAt: { $gt: new Date() },
        });

        if (!resetToken) {
            throw ApiError.badRequest('Invalid or expired reset token');
        }

        // Find user and update password
        const user = await User.findById(resetToken.userId);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        const passwordHash = await bcrypt.hash(data.password, env.BCRYPT_ROUNDS);
        user.passwordHash = passwordHash;
        await user.save();

        // Mark token as used
        resetToken.usedAt = new Date();
        await resetToken.save();

        // Revoke all refresh tokens for security
        await RefreshToken.updateMany(
            { userId: user._id, revokedAt: null },
            { revokedAt: new Date() }
        );

        return { message: 'Password reset successfully. Please log in with your new password.' };
    }

    async verifyEmailOtp(data: VerifyEmailOtpInput) {
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        if (user.emailVerified) {
            return { message: 'Email already verified' };
        }

        const verificationToken = await EmailVerificationToken.findOne({
            userId: user._id,
            otp: data.otp,
            usedAt: null,
            expiresAt: { $gt: new Date() },
        });

        if (!verificationToken) {
            throw ApiError.badRequest('Invalid or expired OTP');
        }

        // Mark as verified
        user.emailVerified = true;
        await user.save();

        // Mark token as used
        verificationToken.usedAt = new Date();
        await verificationToken.save();

        return { message: 'Email verified successfully. You can now log in.' };
    }

    async verifyEmailToken(token: string) {
        const tokenHash = this.hashToken(token);

        const verificationToken = await EmailVerificationToken.findOne({
            token: tokenHash,
            usedAt: null,
            expiresAt: { $gt: new Date() },
        });

        if (!verificationToken) {
            throw ApiError.badRequest('Invalid or expired verification link');
        }

        const user = await User.findById(verificationToken.userId);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        if (user.emailVerified) {
            return { message: 'Email already verified' };
        }

        // Mark as verified
        user.emailVerified = true;
        await user.save();

        // Mark token as used
        verificationToken.usedAt = new Date();
        await verificationToken.save();

        return { message: 'Email verified successfully. You can now log in.' };
    }

    async resendVerification(email: string) {
        const user = await User.findOne({ email });

        if (!user) {
            // Return success to prevent email enumeration
            return { message: 'If the email exists and is unverified, a new code has been sent.' };
        }

        if (user.emailVerified) {
            throw ApiError.badRequest('Email is already verified');
        }

        // Invalidate existing tokens
        await EmailVerificationToken.updateMany(
            { userId: user._id, usedAt: null },
            { usedAt: new Date() }
        );

        // Generate new verification token and OTP
        const token = this.generateToken();
        const otp = this.generateOtp();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        await EmailVerificationToken.create({
            userId: user._id,
            token: this.hashToken(token),
            otp,
            expiresAt,
        });

        // TODO: Send verification email
        console.log(`📧 New verification OTP for ${user.email}: ${otp}`);
        console.log(`🔗 New magic link token: ${token}`);

        return { message: 'If the email exists and is unverified, a new code has been sent.' };
    }
}

export const authService = new AuthService();
