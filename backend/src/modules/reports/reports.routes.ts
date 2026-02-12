import { Router } from 'express';
import { validateRequest, authenticate, authorize } from '../../middleware/index.js';
import * as reportsController from './reports.controller.js';
import { dateRangeQuerySchema } from './reports.validators.js';

const router = Router();

// All routes require authentication and staff/admin role
router.use(authenticate);
router.use(authorize('staff', 'admin', 'client'));

// GET /api/v1/reports/dashboard
router.get('/dashboard', reportsController.getDashboard);

// GET /api/v1/reports/requests/summary
router.get(
    '/requests/summary',
    validateRequest({ query: dateRangeQuerySchema }),
    reportsController.getRequestsSummary
);

// GET /api/v1/reports/requests/by-status
router.get('/requests/by-status', reportsController.getRequestsByStatus);

// GET /api/v1/reports/requests/by-category
router.get('/requests/by-category', reportsController.getRequestsByCategory);

// GET /api/v1/reports/requests/trends
router.get(
    '/requests/trends',
    validateRequest({ query: dateRangeQuerySchema }),
    reportsController.getRequestTrends
);

// GET /api/v1/reports/users/activity (Admin only)
router.get('/users/activity', authorize('admin'), reportsController.getUsersActivity);

// GET /api/v1/reports/revenue (Admin only)
router.get(
    '/revenue',
    authorize('admin'),
    validateRequest({ query: dateRangeQuerySchema }),
    reportsController.getRevenue
);

export default router;
