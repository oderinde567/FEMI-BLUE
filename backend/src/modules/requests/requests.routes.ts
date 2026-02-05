import { Router } from 'express';
import { validateRequest, authenticate, authorize } from '../../middleware/index.js';
import * as requestsController from './requests.controller.js';
import {
    createRequestSchema,
    updateRequestSchema,
    updateStatusSchema,
    assignRequestSchema,
    addCommentSchema,
    listRequestsQuerySchema,
    requestIdParamSchema,
} from './requests.validators.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// GET /api/v1/requests
router.get(
    '/',
    validateRequest({ query: listRequestsQuerySchema }),
    requestsController.listRequests
);

// POST /api/v1/requests
router.post(
    '/',
    validateRequest({ body: createRequestSchema }),
    requestsController.createRequest
);

// GET /api/v1/requests/:id
router.get(
    '/:id',
    validateRequest({ params: requestIdParamSchema }),
    requestsController.getRequestById
);

// PATCH /api/v1/requests/:id
router.patch(
    '/:id',
    validateRequest({ params: requestIdParamSchema, body: updateRequestSchema }),
    requestsController.updateRequest
);

// DELETE /api/v1/requests/:id
router.delete(
    '/:id',
    validateRequest({ params: requestIdParamSchema }),
    requestsController.deleteRequest
);

// PATCH /api/v1/requests/:id/status
router.patch(
    '/:id/status',
    validateRequest({ params: requestIdParamSchema, body: updateStatusSchema }),
    requestsController.updateStatus
);

// PATCH /api/v1/requests/:id/assign (Admin only)
router.patch(
    '/:id/assign',
    authorize('admin'),
    validateRequest({ params: requestIdParamSchema, body: assignRequestSchema }),
    requestsController.assignRequest
);

// GET /api/v1/requests/:id/comments
router.get(
    '/:id/comments',
    validateRequest({ params: requestIdParamSchema }),
    requestsController.getComments
);

// POST /api/v1/requests/:id/comments
router.post(
    '/:id/comments',
    validateRequest({ params: requestIdParamSchema, body: addCommentSchema }),
    requestsController.addComment
);

export default router;
