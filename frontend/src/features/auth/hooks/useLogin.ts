import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../api/login';
import { useAuthStore } from '../../../store/useAuthStore';
import type { LoginCredentials, LoginResponse } from '../types';

export function useLogin() {
    const queryClient = useQueryClient();
    const { login: setAuth } = useAuthStore();

    return useMutation<LoginResponse, Error, LoginCredentials>({
        mutationFn: login,
        onSuccess: (data) => {
            // Store tokens in localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // Update Auth Store
            setAuth(data.user);

            // Invalidate any user-related queries
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => {
            console.error('Login failed:', error.message);
        },
    });
}
