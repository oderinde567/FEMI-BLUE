import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';

interface ErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
    requestId?: string;
}

export const errorHandler: ErrorRequestHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let statusCode = 500;
    let code = 'INTERNAL_ERROR';
    let message = 'Internal server error';
    let details: unknown = undefined;

    // Handle known error types
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        code = err.code;
        message = err.message;
        details = err.details;
    } else if (err instanceof ZodError) {
        statusCode = 400;
        code = 'VALIDATION_ERROR';
        message = 'Validation failed';
        details = err.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
        }));
    } else if (err.name === 'CastError') {
        statusCode = 400;
        code = 'BAD_REQUEST';
        message = 'Invalid ID format';
    } else if (err.name === 'MongoServerError' && (err as any).code === 11000) {
        statusCode = 409;
        code = 'CONFLICT';
        message = 'Duplicate entry';
    }

    // Log error in development
    if (env.NODE_ENV === 'development') {
        console.error('❌ Error:', err);
    }

    const response: ErrorResponse = {
        success: false,
        error: {
            code,
            message,
            ...(details !== undefined ? { details } : {}),
        },
    };

    res.status(statusCode).json(response);
};
