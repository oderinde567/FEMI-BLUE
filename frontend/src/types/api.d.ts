// Generic API response wrapper
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

// Error response from backend
export interface ApiError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
    requestId?: string;
}

// Pagination metadata
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
}

// Paginated response wrapper
export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: PaginationMeta;
}

// Common query params
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

// Date range filter
export interface DateRangeFilter {
    startDate?: string;
    endDate?: string;
}
