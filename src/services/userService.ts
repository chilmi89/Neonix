import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";

/**
 * ============================================
 * USER SERVICE - CONTOH PENGGUNAAN API
 * ============================================
 */

// ========== TYPES ==========
export interface User {
    id: number;
    name: string;
    email: string;
    roleId?: number;
}

// ========== FUNCTIONS ==========

/**
 * Get all users
 * TODO: Implement ketika backend API ready
 */
export async function getAllUsers(): Promise<any> {
    throw new Error("Get all users API belum diimplementasikan");
    // Nanti implementasinya seperti ini:
    // return apiGet(API.users.getAll);
}

/**
 * Get user by ID
 * TODO: Implement ketika backend API ready
 */
export async function getUserById(id: number): Promise<any> {
    throw new Error("Get user by ID API belum diimplementasikan");
    // Nanti implementasinya seperti ini:
    // return apiGet(API.users.getById(id));
}

/**
 * Create new user
 * TODO: Implement ketika backend API ready
 */
export async function createUser(userData: User): Promise<any> {
    throw new Error("Create user API belum diimplementasikan");
    // Nanti implementasinya seperti ini:
    // return apiPost(API.users.create, userData);
}

/**
 * Update user
 * TODO: Implement ketika backend API ready
 */
export async function updateUser(id: number, userData: Partial<User>): Promise<any> {
    throw new Error("Update user API belum diimplementasikan");
    // Nanti implementasinya seperti ini:
    // return apiPut(API.users.update(id), userData);
}

/**
 * Delete user
 * TODO: Implement ketika backend API ready
 */
export async function deleteUser(id: number): Promise<any> {
    throw new Error("Delete user API belum diimplementasikan");
    // Nanti implementasinya seperti ini:
    // return apiDelete(API.users.delete(id));
}
/**
 * Get user roles by ID
 * Digunakan jika login response tidak menyertakan roles
 */
export async function getUserRoles(id: number): Promise<any> {
    return apiGet(API.users.getRoles(id));
}
