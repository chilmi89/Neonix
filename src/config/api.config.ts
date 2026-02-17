/**
 * ============================================
 * API CONFIGURATION - SIMPLE & REUSABLE
 * ============================================
 * 
 * File ini adalah SATU-SATUNYA tempat untuk konfigurasi backend API.
 * Ubah IP_BACKEND di bawah jika IP WiFi berubah.
 */

// ========== KONFIGURASI UTAMA ==========
// Menggunakan Next.js proxy untuk bypass CORS
// IP backend dikonfigurasi di next.config.ts
const IP_BACKEND = ""; // Kosongkan agar pakai proxy Next.js

// Base URL - menggunakan relative path untuk Next.js proxy
export const API_BASE_URL = "/api";

// ========== ENDPOINT API ==========
// Semua endpoint API ada di sini, terorganisir per fitur

export const API = {
    // Authentication
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
        logout: `${API_BASE_URL}/auth/logout`,
    },

    // Users
    users: {
        getAll: `${API_BASE_URL}/users`,
        getById: (id: number) => `${API_BASE_URL}/users/${id}`,
        create: `${API_BASE_URL}/users`,
        update: (id: number) => `${API_BASE_URL}/users/${id}`,
        delete: (id: number) => `${API_BASE_URL}/users/${id}`,
        getRoles: (id: number) => `${API_BASE_URL}/users/${id}/roles`,
    },

    // Roles & Permissions
    roles: {
        getAll: `${API_BASE_URL}/roles`,
        getById: (id: number) => `${API_BASE_URL}/roles/${id}`,
        create: `${API_BASE_URL}/roles`,
        update: (id: number) => `${API_BASE_URL}/roles/${id}`,
        delete: (id: number) => `${API_BASE_URL}/roles/${id}`,
        assignPermission: (id: number) => `${API_BASE_URL}/roles/${id}/permissions`,
    },

    permissions: {
        getAll: `${API_BASE_URL}/permissions`,
        getById: (id: number) => `${API_BASE_URL}/permissions/${id}`,
        create: `${API_BASE_URL}/permissions`,
        update: (id: number) => `${API_BASE_URL}/permissions/${id}`,
        delete: (id: number) => `${API_BASE_URL}/permissions/${id}`,
    },

    // Products
    products: {
        getAll: `${API_BASE_URL}/products`,
        getById: (id: number) => `${API_BASE_URL}/products/${id}`,
        create: `${API_BASE_URL}/products`,
        update: (id: number) => `${API_BASE_URL}/products/${id}`,
        delete: (id: number) => `${API_BASE_URL}/products/${id}`,
    },

    // Events
    events: {
        getAll: `${API_BASE_URL}/events`,
        getById: (id: number) => `${API_BASE_URL}/events/${id}`,
        create: `${API_BASE_URL}/events`,
        update: (id: number) => `${API_BASE_URL}/events/${id}`,
        delete: (id: number) => `${API_BASE_URL}/events/${id}`,
        upcoming: `${API_BASE_URL}/events/upcoming`,
        past: `${API_BASE_URL}/events/past`,
    },
};

// ========== HELPER FUNCTIONS ==========

/**
 * Get headers untuk API request
 * Otomatis include token JWT jika ada
 */
export function getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (includeAuth && typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }

    return headers;
}

/**
 * Helper untuk GET request
 */
export async function apiGet<T>(url: string, withAuth = true): Promise<T> {
    const response = await fetch(url, {
        method: "GET",
        headers: getHeaders(withAuth),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

/**
 * Helper untuk POST request
 */
export async function apiPost<T>(url: string, data: any, withAuth = true): Promise<T> {
    const response = await fetch(url, {
        method: "POST",
        headers: getHeaders(withAuth),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

/**
 * Helper untuk PUT request
 */
export async function apiPut<T>(url: string, data: any, withAuth = true): Promise<T> {
    const response = await fetch(url, {
        method: "PUT",
        headers: getHeaders(withAuth),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

/**
 * Helper untuk DELETE request
 */
export async function apiDelete<T>(url: string, withAuth = true): Promise<T> {
    const response = await fetch(url, {
        method: "DELETE",
        headers: getHeaders(withAuth),
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}
