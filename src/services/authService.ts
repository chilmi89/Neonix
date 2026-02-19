import { API, apiGet, apiPost } from "@/config/api.config";

/**
 * ============================================
 * AUTH SERVICE - SIMPLE & REUSABLE
 * ============================================
 */

// ========== TYPES ==========
export interface User {
    id: number;
    name: string;
    email: string;
    roles?: string[];
    permissions?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface LoginResponse {
    status: string;
    message: string;
    data: {
        token: string;
        user: User;
    };
}

export interface RegisterResponse {
    status: string;
    message: string;
    data: User;
}

export interface MeResponse {
    status: string;
    message: string;
    data: User;
}

// ========== FUNCTIONS ==========

/**
 * Login user
 * Contoh: await authService.login("email@example.com", "password123")
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await apiPost<LoginResponse>(
            API.auth.login,
            { email, password },
            false // tidak perlu auth untuk login
        );

        // Simpan token ke localStorage segera setelah login berhasil
        if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token);
            if (response.data.user) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
            }
        } else {
            console.error("Login response missing token:", response);
        }

        return response;
    } catch (error: any) {
        throw new Error(error.message || "Login failed");
    }
}

/**
 * Logout user
 * Contoh: await authService.logout()
 */
export async function logout(): Promise<void> {
    // Hapus token dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // TODO: Panggil API logout jika backend sudah ready
    // await apiPost(API.auth.logout, {}, true);
}

/**
 * Register user baru
 */
export async function register(userData: any): Promise<RegisterResponse> {
    try {
        return await apiPost<RegisterResponse>(API.auth.register, userData, false);
    } catch (error: any) {
        throw new Error(error.message || "Registration failed");
    }
}

/**
 * Mendapatkan data user yang sedang login (me)
 * @param tokenOverride - Opsional, gunakan token ini jika baru saja login dan localStorage mungkin belum sinkron
 */
export async function getCurrentUser(tokenOverride?: string): Promise<MeResponse> {
    try {
        const response = await apiGet<MeResponse>(API.auth.me, true, tokenOverride);
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response;
    } catch (error: any) {
        // Jika token tidak valid (401/403), hapus dari storage
        if (
            error.message.includes("401") ||
            error.message.includes("403") ||
            error.message.includes("Unauthorized") ||
            error.message.includes("Forbidden")
        ) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
        throw new Error(error.message || "Failed to fetch user profile");
    }
}
