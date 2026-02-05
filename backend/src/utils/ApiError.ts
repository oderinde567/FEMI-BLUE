export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly isOperational: boolean;
    public readonly details?: Record<string, unknown>;

    constructor(
        statusCode: number,
        message: string,
        code: string = 'INTERNAL_ERROR',
        details?: Record<string, unknown>
    ) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        this.details = details;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message: string, details?: Record<string, unknown>): ApiError {
        return new ApiError(400, message, 'BAD_REQUEST', details);
    }

    static unauthorized(message: string = 'Unauthorized'): ApiError {
        return new ApiError(401, message, 'UNAUTHORIZED');
    }

    static forbidden(message: string = 'Forbidden'): ApiError {
        return new ApiError(403, message, 'FORBIDDEN');
    }

    static notFound(message: string = 'Resource not found'): ApiError {
        return new ApiError(404, message, 'NOT_FOUND');
    }

    static conflict(message: string): ApiError {
        return new ApiError(409, message, 'CONFLICT');
    }

    static validationError(message: string, details?: Record<string, unknown>): ApiError {
        return new ApiError(400, message, 'VALIDATION_ERROR', details);
    }

    static tooManyRequests(message: string = 'Too many requests'): ApiError {
        return new ApiError(429, message, 'RATE_LIMITED');
    }

    static internal(message: string = 'Internal server error'): ApiError {
        return new ApiError(500, message, 'INTERNAL_ERROR');
    }
}
