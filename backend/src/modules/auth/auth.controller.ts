import type { Request, Response } from 'express';
import { authService } from './auth.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

export const signup = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.signup(req.body);
    res.status(201).json({
        success: true,
        message: result.message,
        data: {
            userId: result.userId,
            email: result.email,
        },
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.get('user-agent');

    const result = await authService.login(req.body, ipAddress, userAgent);

    res.status(200).json({
        success: true,
        data: result,
    });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);

    res.status(200).json({
        success: true,
        message: result.message,
    });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await authService.refreshTokens(refreshToken);

    res.status(200).json({
        success: true,
        data: result,
    });
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.forgotPassword(req.body);

    res.status(200).json({
        success: true,
        message: result.message,
    });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.resetPassword(req.body);

    res.status(200).json({
        success: true,
        message: result.message,
    });
});

export const verifyEmailOtp = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.verifyEmailOtp(req.body);

    res.status(200).json({
        success: true,
        message: result.message,
    });
});

export const verifyEmailToken = asyncHandler(async (req: Request, res: Response) => {
    const token = req.params.token as string;
    const result = await authService.verifyEmailToken(token);

    res.status(200).json({
        success: true,
        message: result.message,
    });
});

export const resendVerification = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const result = await authService.resendVerification(email);

    res.status(200).json({
        success: true,
        message: result.message,
    });
});
