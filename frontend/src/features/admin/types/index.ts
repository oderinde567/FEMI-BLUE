import type { User } from '../auth/types';

// Re-export User type for admin context
export type { User };

// User list filters
export interface UserFilters {
    role?: User['role'];
    isActive?: boolean;
    search?: string;
    emailVerified?: boolean;
}

// User list response
export interface UsersListResponse {
    users: User[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
    };
}

// Create user payload (admin)
export interface CreateUserData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: User['role'];
    phone?: string;
}

// Update user payload (admin)
export interface UpdateUserData {
    firstName?: string;
    lastName?: string;
    role?: User['role'];
    isActive?: boolean;
    phone?: string;
    avatarUrl?: string;
}

// Activity log entry
export interface ActivityLogEntry {
    id: string;
    userId: string;
    userName: string;
    action: string;
    resourceType: string;
    resourceId?: string;
    details?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
    createdAt: string;
}

// Activity log response
export interface ActivityLogResponse {
    logs: ActivityLogEntry[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
    };
}
