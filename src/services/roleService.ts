import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";
import { Role, Permission, ApiResponse } from "@/types/auth";

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

export async function getRolePermissions(id: number): Promise<ApiResponse<Permission[]>> {
    return apiGet<ApiResponse<Permission[]>>(API.roles.getPermissions(id));
}

/**
 * Add permission to role
 */
export async function addPermissionToRole(roleId: number, permissionId: number): Promise<ApiResponse<any>> {
    return apiPost<ApiResponse<any>>(API.roles.addPermission(roleId, permissionId), {});
}

/**
 * Remove permission from role
 */
export async function removePermissionFromRole(roleId: number, permissionId: number): Promise<ApiResponse<any>> {
    return apiDelete<ApiResponse<any>>(API.roles.removePermission(roleId, permissionId));
}

/**
 * Update role permissions (Bulk)
 */
export async function updateRolePermissions(roleId: number, permissionIds: number[]): Promise<ApiResponse<any>> {
    return apiPut<ApiResponse<any>>(API.roles.updatePermissions(roleId), permissionIds);
}
