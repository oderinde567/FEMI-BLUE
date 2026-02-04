import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRequests, getRequestById, getMyRequests } from '../api/get-requests';
import { createRequest, updateRequest, deleteRequest, assignRequest, updateRequestStatus } from '../api/mutate-requests';
import type { RequestItem, RequestFilters, CreateRequestData, UpdateRequestData } from '../types';

// Query keys
export const requestKeys = {
    all: ['requests'] as const,
    lists: () => [...requestKeys.all, 'list'] as const,
    list: (filters: RequestFilters) => [...requestKeys.lists(), filters] as const,
    my: () => [...requestKeys.all, 'my'] as const,
    details: () => [...requestKeys.all, 'detail'] as const,
    detail: (id: string) => [...requestKeys.details(), id] as const,
};

// Queries
export function useRequests(filters?: RequestFilters) {
    return useQuery({
        queryKey: requestKeys.list(filters || {}),
        queryFn: () => getRequests(filters),
    });
}

export function useMyRequests(filters?: RequestFilters) {
    return useQuery({
        queryKey: requestKeys.my(),
        queryFn: () => getMyRequests(filters),
    });
}

export function useRequest(id: string) {
    return useQuery({
        queryKey: requestKeys.detail(id),
        queryFn: () => getRequestById(id),
        enabled: !!id,
    });
}

// Mutations
export function useCreateRequest() {
    const queryClient = useQueryClient();

    return useMutation<RequestItem, Error, CreateRequestData>({
        mutationFn: createRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: requestKeys.lists() });
            queryClient.invalidateQueries({ queryKey: requestKeys.my() });
        },
    });
}

export function useUpdateRequest() {
    const queryClient = useQueryClient();

    return useMutation<RequestItem, Error, { id: string; data: UpdateRequestData }>({
        mutationFn: ({ id, data }) => updateRequest(id, data),
        onSuccess: (updatedRequest) => {
            queryClient.invalidateQueries({ queryKey: requestKeys.lists() });
            queryClient.setQueryData(requestKeys.detail(updatedRequest.id), updatedRequest);
        },
    });
}

export function useDeleteRequest() {
    const queryClient = useQueryClient();

    return useMutation<{ message: string }, Error, string>({
        mutationFn: deleteRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: requestKeys.lists() });
            queryClient.invalidateQueries({ queryKey: requestKeys.my() });
        },
    });
}

export function useAssignRequest() {
    const queryClient = useQueryClient();

    return useMutation<RequestItem, Error, { id: string; assigneeId: string }>({
        mutationFn: ({ id, assigneeId }) => assignRequest(id, assigneeId),
        onSuccess: (updatedRequest) => {
            queryClient.invalidateQueries({ queryKey: requestKeys.lists() });
            queryClient.setQueryData(requestKeys.detail(updatedRequest.id), updatedRequest);
        },
    });
}

export function useUpdateRequestStatus() {
    const queryClient = useQueryClient();

    return useMutation<RequestItem, Error, { id: string; status: RequestItem['status'] }>({
        mutationFn: ({ id, status }) => updateRequestStatus(id, status),
        onSuccess: (updatedRequest) => {
            queryClient.invalidateQueries({ queryKey: requestKeys.lists() });
            queryClient.setQueryData(requestKeys.detail(updatedRequest.id), updatedRequest);
        },
    });
}
