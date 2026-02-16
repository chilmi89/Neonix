import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";

/**
 * Role Service - Placeholder
 * TODO: Implement ketika backend API ready
 */

export interface Role {
    id?: number;
    name: string;
    description?: string;
}

export async function getAllRoles(): Promise<any> {
    throw new Error("Get all roles API belum diimplementasikan");
    // return apiGet(API.roles.getAll);
}

export async function getRoleById(id: number): Promise<any> {
    throw new Error("Get role by ID API belum diimplementasikan");
    // return apiGet(API.roles.getById(id));
}

export async function createRole(roleData: Role): Promise<any> {
    throw new Error("Create role API belum diimplementasikan");
    // return apiPost(API.roles.create, roleData);
}

export async function updateRole(id: number, roleData: Partial<Role>): Promise<any> {
    throw new Error("Update role API belum diimplementasikan");
    // return apiPut(API.roles.update(id), roleData);
}

export async function deleteRole(id: number): Promise<any> {
    throw new Error("Delete role API belum diimplementasikan");
    // return apiDelete(API.roles.delete(id));
}
