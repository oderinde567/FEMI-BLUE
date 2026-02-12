import type { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiError } from '../utils/ApiError.js';

interface ValidationSchemas {
    body?: ZodSchema;
    query?: ZodSchema;
    params?: ZodSchema;
}

export const validateRequest = (schemas: ValidationSchemas): RequestHandler => {
    return (req: Request, _res: Response, next: NextFunction) => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.query) {
                const query = schemas.query.parse(req.query);
                try {
                    req.query = query;
                } catch {
                    Object.defineProperty(req, 'query', { value: query, writable: true });
                }
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params);
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const details = error.errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                }));
                next(ApiError.validationError('Validation failed', { errors: details }));
            } else {
                next(error);
            }
        }
    };
};
