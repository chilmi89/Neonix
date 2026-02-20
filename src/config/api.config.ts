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
        me: `${API_BASE_URL}/auth/me`,
    },

    // Users
    users: {
        getAll: `${API_BASE_URL}/users`,
        getById: (id: number) => `${API_BASE_URL}/users/${id}`,
        create: `${API_BASE_URL}/users`,
        update: (id: number) => `${API_BASE_URL}/users/${id}`,
        delete: (id: number) => `${API_BASE_URL}/users/${id}`,
        getRoles: (id: number) => `${API_BASE_URL}/users/${id}/roles`,
        addRole: (id: number, roleId: number, tenantId?: number) => `${API_BASE_URL}/users/${id}/roles/${roleId}${tenantId ? `?tenantId=${tenantId}` : ""}`,
        removeRole: (id: number, roleId: number, tenantId?: number) => `${API_BASE_URL}/users/${id}/roles/${roleId}${tenantId ? `?tenantId=${tenantId}` : ""}`,
        updateRoles: (id: number, tenantId?: number) => `${API_BASE_URL}/users/${id}/roles${tenantId ? `?tenantId=${tenantId}` : ""}`,
    },

    // Roles & Permissions
    roles: {
        getAll: `${API_BASE_URL}/roles`,
        getById: (id: number) => `${API_BASE_URL}/roles/${id}`,
        create: `${API_BASE_URL}/roles`,
        update: (id: number) => `${API_BASE_URL}/roles/${id}`,
        delete: (id: number) => `${API_BASE_URL}/roles/${id}`,
        getPermissions: (id: number) => `${API_BASE_URL}/roles/${id}/permissions`,
        addPermission: (id: number, permissionId: number) => `${API_BASE_URL}/roles/${id}/permissions/${permissionId}`,
        removePermission: (id: number, permissionId: number) => `${API_BASE_URL}/roles/${id}/permissions/${permissionId}`,
        updatePermissions: (id: number) => `${API_BASE_URL}/roles/${id}/permissions`,
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

    // Tenants
    tenants: {
        getAll: `${API_BASE_URL}/tenants`,
        getById: (id: number) => `${API_BASE_URL}/tenants/${id}`,
        create: `${API_BASE_URL}/tenants`,
        update: (id: number) => `${API_BASE_URL}/tenants/${id}`,
        delete: (id: number) => `${API_BASE_URL}/tenants/${id}`,
        getBySlug: (slug: string) => `${API_BASE_URL}/tenants/slug/${slug}`,
    },

    // Event Categories
    eventCategories: {
        getAll: `${API_BASE_URL}/event-categories`,
        getById: (id: number) => `${API_BASE_URL}/event-categories/${id}`,
        create: `${API_BASE_URL}/event-categories`,
        update: (id: number) => `${API_BASE_URL}/event-categories/${id}`,
        delete: (id: number) => `${API_BASE_URL}/event-categories/${id}`,
    },

    // Ticket Categories
    ticketCategories: {
        getAll: `${API_BASE_URL}/admin/ticket-categories`,
        getById: (id: number | string) => `${API_BASE_URL}/admin/ticket-categories/${id}`,
        create: `${API_BASE_URL}/admin/ticket-categories`,
        update: (id: number | string) => `${API_BASE_URL}/admin/ticket-categories/${id}`,
        delete: (id: number | string) => `${API_BASE_URL}/admin/ticket-categories/${id}`,
    },

};

// ========== HELPER FUNCTIONS ==========

/**
 * Get headers untuk API request
 * @param includeAuth - Apakah menyertakan token
 * @param tokenOverride - Gunakan token ini daripada yang ada di localStorage
 */
export function getHeaders(includeAuth = true, tokenOverride?: string): Record<string, string> {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (includeAuth) {
        const token = tokenOverride || (typeof window !== "undefined" ? localStorage.getItem("token") : null);
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
            console.log("Using Token for Auth:", token.substring(0, 10) + "...");
        } else {
            console.warn("No token found for auth request");
        }
    }

    return headers;
}

/**
 * Helper untuk GET request
 */
export async function apiGet<T>(url: string, withAuth = true, tokenOverride?: string): Promise<T> {
    const headers = getHeaders(withAuth, tokenOverride);
    console.log(`FETCHING GET: ${url}`, { headers });

    const response = await fetch(url, {
        method: "GET",
        headers: headers,
    });

    if (!response.ok) {
        let errorData = {};
        try {
            errorData = await response.json();
        } catch (e) {
            errorData = { message: "Failed to parse error response" };
        }

        console.error(`API Error [${url}] Status: ${response.status}:`, errorData);
        throw new Error((errorData as any).message || `HTTP ${response.status}`);
    }

    return response.json();
}

/**
 * Helper untuk POST request
 */
export async function apiPost<T>(url: string, data: any, withAuth = true, tokenOverride?: string): Promise<T> {
    const response = await fetch(url, {
        method: "POST",
        headers: getHeaders(withAuth, tokenOverride),
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

/**
 * Helper untuk POST Multipart request (File Upload)
 */
export async function apiPostMultipart<T>(url: string, formData: FormData, withAuth = true, tokenOverride?: string): Promise<T> {
    const headers = getHeaders(withAuth, tokenOverride);
    // Remove Content-Type to let browser set boundary automatically for FormData
    delete headers["Content-Type"];

    const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

/**
 * Helper untuk PUT Multipart request (File Upload)
 */
export async function apiPutMultipart<T>(url: string, formData: FormData, withAuth = true): Promise<T> {
    const headers = getHeaders(withAuth);
    // Remove Content-Type to let browser set boundary automatically for FormData
    delete headers["Content-Type"];

    const response = await fetch(url, {
        method: "PUT",
        headers: headers,
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Request failed" }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}
