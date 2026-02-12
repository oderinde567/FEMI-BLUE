import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authLimiter, apiLimiter } from './middleware/rateLimiter.js';

// Import routes
import authRoutes from './modules/auth/auth.routes.js';
import usersRoutes from './modules/users/users.routes.js';
import requestsRoutes from './modules/requests/requests.routes.js';
import notificationsRoutes from './modules/notifications/notifications.routes.js';
import reportsRoutes from './modules/reports/reports.routes.js';
import activityRoutes from './modules/activity/activity.routes.js';

export const createApp = (): Express => {
    const app = express();

    // Security middleware
    app.use(helmet());
    app.use(cors({
        origin: env.CORS_ORIGINS.split(','),
        credentials: true,
    }));

    // Body parsing
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));

    // RATE LIMITING (DDoS Protection)
    // 1. Apply general limit to all API routes
    app.use(`/api/${env.API_VERSION}`, apiLimiter);
    
    // 2. Apply strict limit to Auth routes
    app.use(`/api/${env.API_VERSION}/auth`, authLimiter);

    // Health check
    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({
            success: true,
            message: 'BlueArnk API is running',
            timestamp: new Date().toISOString(),
            version: env.API_VERSION,
        });
    });

    // API routes
    app.use(`/api/${env.API_VERSION}/auth`, authRoutes);
    app.use(`/api/${env.API_VERSION}/users`, usersRoutes);
    app.use(`/api/${env.API_VERSION}/requests`, requestsRoutes);
    app.use(`/api/${env.API_VERSION}/notifications`, notificationsRoutes);
    app.use(`/api/${env.API_VERSION}/reports`, reportsRoutes);
    app.use(`/api/${env.API_VERSION}/activity`, activityRoutes);

    // 404 handler
    app.use((_req: Request, res: Response) => {
        res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Route not found',
            },
        });
    });

    // Error handler (must be last)
    app.use(errorHandler);

    return app;
};