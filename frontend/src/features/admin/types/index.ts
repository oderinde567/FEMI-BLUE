import type { User } from '../../auth/types';

// Re-export User type for admin context
export type { User };

// User list filters
export interface UserFilters {
    role?: User['role'];
    isActive?: boolean;
    search?: string;
    emailVerified?: boolean;
}

// User list response - aligned with backend PaginatedResponse
export interface UsersListResponse {
    users: User[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
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

// Activity log entry - aligned with backend IActivityLog
export interface ActivityLogEntry {
    id: string;
    _id: string;
    actorId?: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    action: string;
    entityType?: string;
    entityId?: string;
    description: string;
    metadata?: Record<string, unknown>;
    ipAddress?: string;
    userAgent?: string;
    createdAt: string;
}

// Activity log response - aligned with PaginatedResponse
export interface ActivityLogResponse {
    logs: ActivityLogEntry[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
