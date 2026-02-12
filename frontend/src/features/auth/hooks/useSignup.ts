import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/signup';
import type { SignupData, SignupResponse } from '../types';

export function useSignup() {
    const navigate = useNavigate();

    return useMutation<SignupResponse, Error, SignupData>({
        mutationFn: signup,
        onSuccess: (data) => {
            console.log('Signup successful:', data.message);
            // Navigate to verification page with email in state if needed
            navigate('/verify-email', { state: { email: data.email } });
        },
        onError: (error) => {
            console.error('Signup failed:', error.message);
        },
    });
}
