export interface Permission {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Role {
    id: number;
    name: string;
    tenantId?: number;
    tenantName?: string;
    permissions?: Permission[];
    createdAt: string;
    updatedAt: string;
}

export interface Tenant {
    id: number;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt?: string;
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

export interface EventCategory {
    id: number;
    name: string;
}
