import { API, apiPost } from "@/config/api.config";

/**
 * ============================================
 * AUTH SERVICE - SIMPLE & REUSABLE
 * ============================================
 */

// ========== TYPES ==========
export interface LoginResponse {
    status: string; // Adjusted to match the API response structure provided in the prompt
    message: string;
    data: {
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            // roles might be empty or specific if return changed
        };
    };
}

export interface RegisterResponse {
    status: string;
    message: string;
    data: {
        id: number;
        name: string;
        email: string;
        createdAt: string;
        updatedAt: string;
    };
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

        // Simpan token ke localStorage
        if (response.data?.token) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
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
