import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/ApiError.js';

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 login/signup requests per window
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
        next(ApiError.tooManyRequests('Too many login attempts, please try again after 15 minutes'));
    },
});

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
});