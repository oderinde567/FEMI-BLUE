import { Router } from 'express';
import { validateRequest } from '../../middleware/validateRequest.js';
import * as authController from './auth.controller.js';
import {
    signupSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    verifyEmailOtpSchema,
    resendVerificationSchema,
    refreshTokenSchema,
} from './auth.validators.js';

const router = Router();

// POST /api/v1/auth/signup
router.post(
    '/signup',
    validateRequest({ body: signupSchema }),
    authController.signup
);

// POST /api/v1/auth/login
router.post(
    '/login',
    validateRequest({ body: loginSchema }),
    authController.login
);

// POST /api/v1/auth/logout
router.post(
    '/logout',
    validateRequest({ body: refreshTokenSchema }),
    authController.logout
);

// POST /api/v1/auth/refresh
router.post(
    '/refresh',
    validateRequest({ body: refreshTokenSchema }),
    authController.refreshToken
);

// POST /api/v1/auth/forgot-password
router.post(
    '/forgot-password',
    validateRequest({ body: forgotPasswordSchema }),
    authController.forgotPassword
);

// POST /api/v1/auth/reset-password
router.post(
    '/reset-password',
    validateRequest({ body: resetPasswordSchema }),
    authController.resetPassword
);

// POST /api/v1/auth/verify-email/otp
router.post(
    '/verify-email/otp',
    validateRequest({ body: verifyEmailOtpSchema }),
    authController.verifyEmailOtp
);

// GET /api/v1/auth/verify-email/:token
router.get(
    '/verify-email/:token',
    authController.verifyEmailToken
);

// POST /api/v1/auth/resend-verification
router.post(
    '/resend-verification',
    validateRequest({ body: resendVerificationSchema }),
    authController.resendVerification
);

export default router;
