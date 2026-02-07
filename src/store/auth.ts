import { create } from "zustand";

interface UserData {
    id: string;
    email: string;
    name: string;
    role: string;
    department?: string;
    avatar?: string;
    created_at?: string;
}

interface User {
    data: UserData;
}

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));
