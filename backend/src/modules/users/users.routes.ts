import { Router } from 'express';
import { validateRequest, authenticate, authorize, authorizeOwnerOrAdmin } from '../../middleware/index.js';
import * as usersController from './users.controller.js';
import {
    createUserSchema,
    updateUserSchema,
    updateRoleSchema,
    updateStatusSchema,
    changePasswordSchema,
    listUsersQuerySchema,
    userIdParamSchema,
} from './users.validators.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// === Current User Routes (must come before /:id routes) ===

// GET /api/v1/users/me
router.get('/me', usersController.getMe);

// PATCH /api/v1/users/me
router.patch(
    '/me',
    validateRequest({ body: updateUserSchema }),
    usersController.updateMe
);

// PATCH /api/v1/users/me/password
router.patch(
    '/me/password',
    validateRequest({ body: changePasswordSchema }),
    usersController.changeMyPassword
);

// === Admin Routes ===

// GET /api/v1/users
router.get(
    '/',
    authorize('admin'),
    validateRequest({ query: listUsersQuerySchema }),
    usersController.listUsers
);

// POST /api/v1/users
router.post(
    '/',
    authorize('admin'),
    validateRequest({ body: createUserSchema }),
    usersController.createUser
);

// GET /api/v1/users/:id
router.get(
    '/:id',
    validateRequest({ params: userIdParamSchema }),
    authorizeOwnerOrAdmin,
    usersController.getUserById
);

// PATCH /api/v1/users/:id
router.patch(
    '/:id',
    validateRequest({ params: userIdParamSchema, body: updateUserSchema }),
    authorizeOwnerOrAdmin,
    usersController.updateUser
);

// DELETE /api/v1/users/:id
router.delete(
    '/:id',
    authorize('admin'),
    validateRequest({ params: userIdParamSchema }),
    usersController.deleteUser
);

// PATCH /api/v1/users/:id/role
router.patch(
    '/:id/role',
    authorize('admin'),
    validateRequest({ params: userIdParamSchema, body: updateRoleSchema }),
    usersController.updateRole
);

// PATCH /api/v1/users/:id/status
router.patch(
    '/:id/status',
    authorize('admin'),
    validateRequest({ params: userIdParamSchema, body: updateStatusSchema }),
    usersController.updateStatus
);

export default router;
