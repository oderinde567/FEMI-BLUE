import bcrypt from 'bcryptjs';
import { User } from '../../database/models/index.js';
import { ApiError } from '../../utils/ApiError.js';
import { env } from '../../config/env.js';
import type {
    CreateUserInput,
    UpdateUserInput,
    UpdateRoleInput,
    UpdateStatusInput,
    ChangePasswordInput,
    ListUsersQuery,
} from './users.validators.js';

class UsersService {
    async listUsers(query: ListUsersQuery) {
        const { page, limit, role, isActive, search, sortBy, sortOrder } = query;
        const skip = (page - 1) * limit;

        // Build filter
        const filter: Record<string, unknown> = {};
        if (role) filter.role = role;
        if (typeof isActive === 'boolean') filter.isActive = isActive;
        if (search) {
            filter.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        // Build sort
        const sort: Record<string, 1 | -1> = {
            [sortBy]: sortOrder === 'asc' ? 1 : -1,
        };

        const [users, total] = await Promise.all([
            User.find(filter).sort(sort).skip(skip).limit(limit),
            User.countDocuments(filter),
        ]);

        return {
            users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getUserById(id: string) {
        const user = await User.findById(id);
        if (!user) {
            throw ApiError.notFound('User not found');
        }
        return user;
    }

    async createUser(data: CreateUserInput) {
        // Check if email already exists
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw ApiError.conflict('Email already registered');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(data.password, env.BCRYPT_ROUNDS);

        // Create user (admin-created users are pre-verified)
        const user = await User.create({
            email: data.email,
            passwordHash,
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            role: data.role,
            emailVerified: true, // Admin-created users are verified
        });

        return user;
    }

    async updateUser(id: string, data: UpdateUserInput) {
        const user = await User.findById(id);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        // Update fields
        if (data.firstName) user.firstName = data.firstName;
        if (data.lastName) user.lastName = data.lastName;
        if (data.phone !== undefined) user.phone = data.phone;
        if (data.company !== undefined) user.company = data.company;
        if (data.location !== undefined) user.location = data.location;
        if (data.bio !== undefined) user.bio = data.bio;
        if (data.avatarUrl !== undefined) user.avatarUrl = data.avatarUrl;

        await user.save();
        return user;
    }

    async updateRole(id: string, data: UpdateRoleInput) {
        const user = await User.findById(id);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        user.role = data.role;
        await user.save();
        return user;
    }

    async updateStatus(id: string, data: UpdateStatusInput) {
        const user = await User.findById(id);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        user.isActive = data.isActive;
        await user.save();
        return user;
    }

    async deleteUser(id: string) {
        const user = await User.findById(id);
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        // Soft delete by deactivating
        user.isActive = false;
        await user.save();

        return { message: 'User deactivated successfully' };
    }

    async changePassword(userId: string, data: ChangePasswordInput) {
        const user = await User.findById(userId).select('+passwordHash');
        if (!user) {
            throw ApiError.notFound('User not found');
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(data.currentPassword, user.passwordHash);
        if (!isValidPassword) {
            throw ApiError.badRequest('Current password is incorrect');
        }

        // Hash new password
        user.passwordHash = await bcrypt.hash(data.newPassword, env.BCRYPT_ROUNDS);
        await user.save();

        return { message: 'Password changed successfully' };
    }

    async getMe(userId: string) {
        const user = await User.findById(userId);
        if (!user) {
            throw ApiError.notFound('User not found');
        }
        return user;
    }

    async updateMe(userId: string, data: UpdateUserInput) {
        return this.updateUser(userId, data);
    }
}

export const usersService = new UsersService();
