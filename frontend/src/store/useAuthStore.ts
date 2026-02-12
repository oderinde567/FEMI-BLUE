import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatarUrl?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null, // DEFAULT MUST BE NULL
            isAuthenticated: false, // DEFAULT MUST BE FALSE
            login: (user) => set({ isAuthenticated: true, user }),
            logout: () => set({ isAuthenticated: false, user: null }),
        }),
        {
            name: 'auth-storage', // Saves login state to browser
        }
    )
);