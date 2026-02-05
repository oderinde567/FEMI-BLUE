import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, type IUser } from '../database/models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            userId?: string;
        }
    }
}

export const authenticate = async (
    req: Request,
    _res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith('Bearer ')) {
            throw ApiError.unauthorized('No token provided');
        }

        const token = authHeader.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;

        // Get user from database
        const user = await User.findById(decoded.userId);

        if (!user) {
            throw ApiError.unauthorized('User not found');
        }

        if (!user.isActive) {
            throw ApiError.forbidden('Account is deactivated');
        }

        // Attach user to request
        req.user = user;
        req.userId = user._id.toString();

        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            next(ApiError.unauthorized('Invalid token'));
        } else if (error instanceof jwt.TokenExpiredError) {
            next(ApiError.unauthorized('Token expired'));
        } else {
            next(error);
        }
    }
};

// Role-based authorization middleware
export const authorize = (...allowedRoles: Array<'admin' | 'staff' | 'client'>) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
        if (!req.user) {
            return next(ApiError.unauthorized('Not authenticated'));
        }

        if (!allowedRoles.includes(req.user.role)) {
            return next(ApiError.forbidden('Insufficient permissions'));
        }

        next();
    };
};

// Check if user is accessing own resource or is admin
export const authorizeOwnerOrAdmin = (
    req: Request,
    _res: Response,
    next: NextFunction
): void => {
    if (!req.user) {
        return next(ApiError.unauthorized('Not authenticated'));
    }

    const resourceUserId = req.params.id || req.params.userId;

    if (req.user.role === 'admin' || req.user._id.toString() === resourceUserId) {
        return next();
    }

    next(ApiError.forbidden('You can only access your own resources'));
};
