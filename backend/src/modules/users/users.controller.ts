import type { Request, Response } from 'express';
import { usersService } from './users.service.js';
import { asyncHandler } from '../../utils/asyncHandler.js';

// GET /api/v1/users
export const listUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await usersService.listUsers(req.query as any);
    res.status(200).json({
        success: true,
        data: result.users,
        pagination: result.pagination,
    });
});

// GET /api/v1/users/:id
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = await usersService.getUserById(id);
    res.status(200).json({
        success: true,
        data: user,
    });
});

// POST /api/v1/users
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body);
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
    });
});

// PATCH /api/v1/users/:id
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = await usersService.updateUser(id, req.body);
    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
    });
});

// DELETE /api/v1/users/:id
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const result = await usersService.deleteUser(id);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});

// PATCH /api/v1/users/:id/role
export const updateRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = await usersService.updateRole(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Role updated successfully',
        data: user,
    });
});

// PATCH /api/v1/users/:id/status
export const updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = await usersService.updateStatus(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Status updated successfully',
        data: user,
    });
});

// GET /api/v1/users/me
export const getMe = asyncHandler(async (req: Request, res: Response) => {
    const user = await usersService.getMe(req.userId!);
    res.status(200).json({
        success: true,
        data: user,
    });
});

// PATCH /api/v1/users/me
export const updateMe = asyncHandler(async (req: Request, res: Response) => {
    const user = await usersService.updateMe(req.userId!, req.body);
    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: user,
    });
});

// PATCH /api/v1/users/me/password
export const changeMyPassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await usersService.changePassword(req.userId!, req.body);
    res.status(200).json({
        success: true,
        message: result.message,
    });
});

