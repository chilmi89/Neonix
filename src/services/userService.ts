import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";
import { ApiResponse, User } from "@/types/auth";

/**
 * ============================================
 * USER SERVICE - CONTOH PENGGUNAAN API
 * ============================================
 */

// ========== FUNCTIONS ==========

/**
 * Get all users
 */
export async function getAllUsers(): Promise<ApiResponse<User[]>> {
    return apiGet<ApiResponse<User[]>>(API.users.getAll);
}

/**
 * Get user by ID
 */
export async function getUserById(id: number): Promise<ApiResponse<User>> {
    return apiGet<ApiResponse<User>>(API.users.getById(id));
}

/**
 * Create new user
 */
export async function createUser(userData: any): Promise<ApiResponse<User>> {
    return apiPost<ApiResponse<User>>(API.users.create, userData);
}

/**
 * Update user
 */
export async function updateUser(id: number, userData: any): Promise<ApiResponse<User>> {
    return apiPut<ApiResponse<User>>(API.users.update(id), userData);
}

/**
 * Delete user
 */
export async function deleteUser(id: number): Promise<ApiResponse<any>> {
    return apiDelete<ApiResponse<any>>(API.users.delete(id));
}
/**
 * Get user roles by ID
 */
export async function getUserRoles(id: number): Promise<any> {
    return apiGet(API.users.getRoles(id));
}

/**
 * Add role to user
 */
export async function addRoleToUser(userId: number, roleId: number, tenantId?: number): Promise<any> {
    return apiPost(API.users.addRole(userId, roleId, tenantId), {});
}

/**
 * Remove role from user
 */
export async function removeRoleFromUser(userId: number, roleId: number, tenantId?: number): Promise<any> {
    return apiDelete(API.users.removeRole(userId, roleId, tenantId));
}

/**
 * Update user roles (Bulk)
 */
export async function updateUserRoles(userId: number, roleIds: number[], tenantId?: number): Promise<any> {
    return apiPut(API.users.updateRoles(userId, tenantId), roleIds);
}
