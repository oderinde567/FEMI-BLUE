// Request item from backend
export interface RequestItem {
    id: string;
    referenceNumber: string;
    title: string;
    description: string;
    category: 'facility' | 'it_support' | 'hr' | 'finance' | 'other';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'overdue';
    requesterId: string;
    requesterName?: string;
    requesterEmail?: string;
    assigneeId?: string;
    assigneeName?: string;
    dueDate?: string;
    completedAt?: string;
    attachments?: string[];
    internalNotes?: string;
    createdAt: string;
    updatedAt: string;
}

// Create request payload
export interface CreateRequestData {
    title: string;
    description: string;
    category: RequestItem['category'];
    priority: RequestItem['priority'];
    dueDate?: string;
    attachments?: string[];
}

// Update request payload
export interface UpdateRequestData {
    title?: string;
    description?: string;
    category?: RequestItem['category'];
    priority?: RequestItem['priority'];
    status?: RequestItem['status'];
    assigneeId?: string;
    dueDate?: string;
    internalNotes?: string;
}

// Request filters for listing
export interface RequestFilters {
    status?: RequestItem['status'];
    priority?: RequestItem['priority'];
    category?: RequestItem['category'];
    assigneeId?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
}

// Request list response
export interface RequestsListResponse {
    requests: RequestItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasMore: boolean;
    };
}
