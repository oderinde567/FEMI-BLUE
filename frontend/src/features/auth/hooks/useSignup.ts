import { useMutation } from '@tanstack/react-query';
import { signup } from '../api/signup';
import type { SignupData, SignupResponse } from '../types';

export function useSignup() {
    return useMutation<SignupResponse, Error, SignupData>({
        mutationFn: signup,
        onSuccess: (data) => {
            console.log('Signup successful:', data.message);
        },
        onError: (error) => {
            console.error('Signup failed:', error.message);
        },
    });
}
