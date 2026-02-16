import { API, apiPost } from "@/config/api.config";

/**
 * ============================================
 * AUTH SERVICE - SIMPLE & REUSABLE
 * ============================================
 */

// ========== TYPES ==========
export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            roles: Array<{ id: number; name: string }>;
        };
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
 * TODO: Implement ketika backend API ready
 */
export async function register(userData: any): Promise<any> {
    throw new Error("Register API belum diimplementasikan");
    // Nanti implementasinya seperti ini:
    // return apiPost(API.auth.register, userData, false);
}
