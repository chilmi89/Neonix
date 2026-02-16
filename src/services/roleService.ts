import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";
import { Role, ApiResponse } from "@/types/auth";

/**
 * Role Service - handles all Role-related API interactions
 */

export async function getAllRoles(): Promise<ApiResponse<Role[]>> {
    return apiGet<ApiResponse<Role[]>>(API.roles.getAll);
}

export async function getRoleById(id: number): Promise<ApiResponse<Role>> {
    return apiGet<ApiResponse<Role>>(API.roles.getById(id));
}

export async function createRole(roleData: Partial<Role>): Promise<ApiResponse<Role>> {
    return apiPost<ApiResponse<Role>>(API.roles.create, roleData);
}

export async function updateRole(id: number, roleData: Partial<Role>): Promise<ApiResponse<Role>> {
    return apiPut<ApiResponse<Role>>(API.roles.update(id), roleData);
}

export async function deleteRole(id: number): Promise<ApiResponse<any>> {
    return apiDelete<ApiResponse<any>>(API.roles.delete(id));
}

export async function getAllPermissions(): Promise<ApiResponse<any[]>> {
    return apiGet<ApiResponse<any[]>>(API.permissions.getAll);
}

export async function assignPermissionToRole(roleId: number, permissionId: number): Promise<ApiResponse<any>> {
    return apiPost<ApiResponse<any>>(API.roles.assignPermission(roleId), { permissionId });
}
