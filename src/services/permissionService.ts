import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";
import { Permission, ApiResponse } from "@/types/auth";

/**
 * Permission Service - handles all Permission-related API interactions
 */

export async function getAllPermissions(): Promise<ApiResponse<Permission[]>> {
    return apiGet<ApiResponse<Permission[]>>(API.permissions.getAll);
}

export async function getPermissionById(id: number): Promise<ApiResponse<Permission>> {
    return apiGet<ApiResponse<Permission>>(API.permissions.getById(id));
}

export async function createPermission(permissionData: Partial<Permission>): Promise<ApiResponse<Permission>> {
    return apiPost<ApiResponse<Permission>>(API.permissions.create, permissionData);
}

export async function updatePermission(id: number, permissionData: Partial<Permission>): Promise<ApiResponse<Permission>> {
    return apiPut<ApiResponse<Permission>>(API.permissions.update(id), permissionData);
}

export async function deletePermission(id: number): Promise<ApiResponse<any>> {
    return apiDelete<ApiResponse<any>>(API.permissions.delete(id));
}
