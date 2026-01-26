export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    LOCKED = 'LOCKED',
}

export interface User {
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: UserRole;
    status: UserStatus;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    fullName: string;
    role: UserRole;
    password?: string; // Optional if auto-generated
}

export interface UpdateUserRequest extends Partial<Omit<CreateUserRequest, 'password'>> {
    status?: UserStatus;
}
