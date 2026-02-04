import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getUserById, createUser, updateUser, deleteUser, getActivityLogs } from '../api/get-users';
import type { User } from '../../auth/types';
import type { UserFilters, CreateUserData, UpdateUserData } from '../types';
import type { PaginationParams } from '../../../types/api';

// Query keys
export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    list: (filters?: UserFilters) => [...userKeys.lists(), filters] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id: string) => [...userKeys.details(), id] as const,
};

export const activityKeys = {
    all: ['activity'] as const,
    logs: (params?: PaginationParams) => [...activityKeys.all, 'logs', params] as const,
};

// User queries
export function useUsers(filters?: UserFilters) {
    return useQuery({
        queryKey: userKeys.list(filters),
        queryFn: () => getUsers(filters),
    });
}

export function useUser(id: string) {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => getUserById(id),
        enabled: !!id,
    });
}

// User mutations
export function useCreateUser() {
    const queryClient = useQueryClient();

    return useMutation<User, Error, CreateUserData>({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation<User, Error, { id: string; data: UpdateUserData }>({
        mutationFn: ({ id, data }) => updateUser(id, data),
        onSuccess: (updatedUser) => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
            queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation<{ message: string }, Error, string>({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
}

// Activity log query
export function useActivityLogs(params?: PaginationParams) {
    return useQuery({
        queryKey: activityKeys.logs(params),
        queryFn: () => getActivityLogs(params),
    });
}
