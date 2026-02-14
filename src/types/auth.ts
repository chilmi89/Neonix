export interface Permission {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Role {
    id: number;
    name: string;
    permissions: Permission[];
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponseData {
    token: string;
    user: User;
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}
