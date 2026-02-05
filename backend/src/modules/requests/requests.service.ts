import { Request, Comment, User } from '../../database/models/index.js';
import { ApiError } from '../../utils/ApiError.js';
import type {
    CreateRequestInput,
    UpdateRequestInput,
    UpdateStatusInput,
    AssignRequestInput,
    AddCommentInput,
    ListRequestsQuery,
} from './requests.validators.js';

class RequestsService {
    // Generate unique reference number: REQ-YYYYMMDD-XXX
    private async generateReferenceNumber(): Promise<string> {
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');

        // Count today's requests
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const count = await Request.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });

        const sequence = String(count + 1).padStart(3, '0');
        return `REQ-${dateStr}-${sequence}`;
    }

    async listRequests(query: ListRequestsQuery, userId: string, userRole: string) {
        const { page, limit, status, priority, category, assignedTo, requesterId, search, fromDate, toDate, sortBy, sortOrder } = query;
        const skip = (page - 1) * limit;

        // Build filter
        const filter: Record<string, unknown> = {};

        // Role-based filtering
        if (userRole === 'client') {
            // Clients can only see their own requests
            filter.requesterId = userId;
        } else if (requesterId) {
            filter.requesterId = requesterId;
        }

        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (category) filter.category = category;
        if (assignedTo) filter.assignedTo = assignedTo;

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { referenceNumber: { $regex: search, $options: 'i' } },
            ];
        }

        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) (filter.createdAt as any).$gte = new Date(fromDate);
            if (toDate) (filter.createdAt as any).$lte = new Date(toDate);
        }

        // Build sort
        const sort: Record<string, 1 | -1> = {
            [sortBy]: sortOrder === 'asc' ? 1 : -1,
        };

        const [requests, total] = await Promise.all([
            Request.find(filter)
                .populate('requesterId', 'firstName lastName email')
                .populate('assignedTo', 'firstName lastName email')
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Request.countDocuments(filter),
        ]);

        return {
            requests,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getRequestById(id: string, userId: string, userRole: string) {
        const request = await Request.findById(id)
            .populate('requesterId', 'firstName lastName email avatarUrl')
            .populate('assignedTo', 'firstName lastName email avatarUrl');

        if (!request) {
            throw ApiError.notFound('Request not found');
        }

        // Check access for clients
        if (userRole === 'client' && request.requesterId._id.toString() !== userId) {
            throw ApiError.forbidden('You can only view your own requests');
        }

        return request;
    }

    async createRequest(data: CreateRequestInput, userId: string) {
        const referenceNumber = await this.generateReferenceNumber();

        const request = await Request.create({
            ...data,
            referenceNumber,
            requesterId: userId,
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        });

        return request.populate('requesterId', 'firstName lastName email');
    }

    async updateRequest(id: string, data: UpdateRequestInput, userId: string, userRole: string) {
        const request = await Request.findById(id);

        if (!request) {
            throw ApiError.notFound('Request not found');
        }

        // Only admin/staff can update, or owner if pending
        if (userRole === 'client') {
            if (request.requesterId.toString() !== userId) {
                throw ApiError.forbidden('You can only update your own requests');
            }
            if (request.status !== 'pending') {
                throw ApiError.forbidden('You can only update pending requests');
            }
        }

        // Update fields
        if (data.title) request.title = data.title;
        if (data.description) request.description = data.description;
        if (data.category) request.category = data.category;
        if (data.priority) request.priority = data.priority;
        if (data.dueDate !== undefined) {
            request.dueDate = data.dueDate ? new Date(data.dueDate) : undefined;
        }
        if (data.valueNgn !== undefined) request.valueNgn = data.valueNgn;

        await request.save();
        return request.populate(['requesterId', 'assignedTo']);
    }

    async updateStatus(id: string, data: UpdateStatusInput, userId: string, userRole: string) {
        const request = await Request.findById(id);

        if (!request) {
            throw ApiError.notFound('Request not found');
        }

        // Only staff/admin can update status
        if (userRole === 'client') {
            // Clients can only cancel their own pending requests
            if (request.requesterId.toString() !== userId) {
                throw ApiError.forbidden('You can only cancel your own requests');
            }
            if (data.status !== 'cancelled') {
                throw ApiError.forbidden('Clients can only cancel requests');
            }
            if (request.status !== 'pending') {
                throw ApiError.forbidden('You can only cancel pending requests');
            }
        }

        request.status = data.status;

        // Set completedAt if status is completed
        if (data.status === 'completed') {
            request.completedAt = new Date();
        }

        await request.save();
        return request;
    }

    async assignRequest(id: string, data: AssignRequestInput) {
        const request = await Request.findById(id);

        if (!request) {
            throw ApiError.notFound('Request not found');
        }

        // Verify assignee exists and is staff/admin
        const assignee = await User.findById(data.assignedTo);
        if (!assignee) {
            throw ApiError.notFound('Assignee not found');
        }
        if (assignee.role === 'client') {
            throw ApiError.badRequest('Cannot assign requests to clients');
        }

        request.assignedTo = assignee._id;
        if (request.status === 'pending') {
            request.status = 'in_progress';
        }

        await request.save();
        return request.populate('assignedTo', 'firstName lastName email');
    }

    async deleteRequest(id: string, userId: string, userRole: string) {
        const request = await Request.findById(id);

        if (!request) {
            throw ApiError.notFound('Request not found');
        }

        // Admin can delete any, clients can only cancel their pending requests
        if (userRole === 'client') {
            if (request.requesterId.toString() !== userId) {
                throw ApiError.forbidden('You can only cancel your own requests');
            }
            if (request.status !== 'pending') {
                throw ApiError.forbidden('You can only cancel pending requests');
            }
            request.status = 'cancelled';
            await request.save();
        } else {
            // Soft delete by cancelling
            request.status = 'cancelled';
            await request.save();
        }

        return { message: 'Request cancelled successfully' };
    }

    // Comments
    async getComments(requestId: string, userId: string, userRole: string) {
        // Verify request access
        await this.getRequestById(requestId, userId, userRole);

        const filter: Record<string, unknown> = { requestId };

        // Clients can't see internal comments
        if (userRole === 'client') {
            filter.isInternal = false;
        }

        const comments = await Comment.find(filter)
            .populate('authorId', 'firstName lastName avatarUrl role')
            .sort({ createdAt: 1 });

        return comments;
    }

    async addComment(requestId: string, data: AddCommentInput, userId: string, userRole: string) {
        // Verify request access
        await this.getRequestById(requestId, userId, userRole);

        // Clients can't add internal comments
        if (userRole === 'client' && data.isInternal) {
            throw ApiError.forbidden('Clients cannot add internal comments');
        }

        const comment = await Comment.create({
            requestId,
            authorId: userId,
            content: data.content,
            isInternal: data.isInternal,
        });

        return comment.populate('authorId', 'firstName lastName avatarUrl role');
    }
}

export const requestsService = new RequestsService();
