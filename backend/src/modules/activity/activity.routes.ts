import { Router } from 'express';
import { validateRequest, authenticate, authorize } from '../../middleware/index.js';
import * as activityController from './activity.controller.js';
import {
    listActivityQuerySchema,
    userIdParamSchema,
    entityParamsSchema,
} from './activity.validators.js';

const router = Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize('admin'));

// GET /api/v1/activity
router.get(
    '/',
    validateRequest({ query: listActivityQuerySchema }),
    activityController.listActivity
);

// GET /api/v1/activity/user/:userId
router.get(
    '/user/:userId',
    validateRequest({ params: userIdParamSchema, query: listActivityQuerySchema }),
    activityController.getActivityByUser
);

// GET /api/v1/activity/entity/:type/:id
router.get(
    '/entity/:type/:id',
    validateRequest({ params: entityParamsSchema, query: listActivityQuerySchema }),
    activityController.getActivityByEntity
);

export default router;
