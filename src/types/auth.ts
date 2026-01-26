import { User } from './user';

export interface LoginPayload {
    username: string;
    password?: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RegisterPayload {
    email: string;
    username: string;
    password?: string;
    fullName?: string;
}
