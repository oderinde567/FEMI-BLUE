import type { Request, Response } from 'express';
import { requestsService } from './requests.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/v1/requests
export const listRequests = asyncHandler(async (req: Request, res: Response) => {
    const result = await requestsService.listRequests(
        req.query as any,
        req.userId!,
        req.user!.role
    );
    res.status(200).json({
        success: true,
        data: result.requests,
        pagination: result.pagination,
    });
});

// GET /api/v1/requests/:id
export const getRequestById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const request = await requestsService.getRequestById(id, req.userId!, req.user!.role);
    res.status(200).json({
        success: true,
        data: request,
    });
});

// POST /api/v1/requests
export const createRequest = asyncHandler(async (req: Request, res: Response) => {
    const request = await requestsService.createRequest(req.body, req.userId!);
    res.status(201).json({
        success: true,
        message: 'Request created successfully',
        data: request,
    });
});

// PATCH /api/v1/requests/:id
export const updateRequest = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const request = await requestsService.updateRequest(id, req.body, req.userId!, req.user!.role);
    res.status(200).json({
        success: true,
        message: 'Request updated successfully',
        data: request,
    });
});

// DELETE /api/v1/requests/:id
export const deleteRequest = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = await requestsService.deleteRequest(id, req.userId!, req.user!.role);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});

// PATCH /api/v1/requests/:id/status
export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const request = await requestsService.updateStatus(id, req.body, req.userId!, req.user!.role);
    res.status(200).json({
        success: true,
        message: 'Status updated successfully',
        data: request,
    });
});

// PATCH /api/v1/requests/:id/assign
export const assignRequest = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const request = await requestsService.assignRequest(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Request assigned successfully',
        data: request,
    });
});

// GET /api/v1/requests/:id/comments
export const getComments = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const comments = await requestsService.getComments(id, req.userId!, req.user!.role);
    res.status(200).json({
        success: true,
        data: comments,
    });
});

// POST /api/v1/requests/:id/comments
export const addComment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const comment = await requestsService.addComment(id, req.body, req.userId!, req.user!.role);
    res.status(201).json({
        success: true,
        message: 'Comment added successfully',
        data: comment,
    });
});
