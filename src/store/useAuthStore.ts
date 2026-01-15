import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    avatar?: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: {
        id: 'u-1',
        name: 'Admin User',
        email: 'admin@bluearnk.com',
        role: 'admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6qhn-Gz6Sko0Iq1z71g1O7UkgYvI0eQG0YP2SbcWslf6QW7AbAG4iyS-gPkHquR4AAj6asXg47XHYG_yVME5yUGQV9KfKtouip5fLHLNXyKTgEJRKnCMnodrAx5EkMn25f-CAeUn2SrTouNd2sQToDsOIB3JJWn2Tpq9eDrWPJa28heFdLkxdSH_T7Bh5YMcUG4UfDJx0JZXckzb6T2iYb4fL8hOmUbQYlq2KAmsSI1oRa6gz9hj4z8GfCb61i2zAlPySZM3shQ'
    },
    isAuthenticated: true, // Auto-logged in for dev
    login: (email) => set({
        isAuthenticated: true,
        user: { id: 'u-1', name: 'Admin', email, role: 'admin' }
    }),
    logout: () => set({ isAuthenticated: false, user: null }),
}));
