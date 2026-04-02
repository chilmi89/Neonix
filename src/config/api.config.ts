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

    // Public API
    public: {
        events: `${API_BASE_URL}/public/events`,
        eventById: (id: number | string) => `${API_BASE_URL}/public/events/${id}`,
        // GET /api/public/tickets/event/{eventId}  — fallback tanpa tenantId
        ticketsByEvent: (eventId: number | string) =>
            `${API_BASE_URL}/public/tickets/event/${eventId}`,
        // GET /api/public/tickets/tenant/{tenantId}/event/{eventId}
        ticketsByTenantAndEvent: (tenantId: number | string, eventId: number | string) =>
            `${API_BASE_URL}/public/tickets/tenant/${tenantId}/event/${eventId}`,
        // GET /api/public/tickets/{ticketId}
        ticketById: (ticketId: number | string) => `${API_BASE_URL}/public/tickets/${ticketId}`,
        // POST /api/public/tickets/{ticketId}/purchase
        purchaseTicket: (ticketId: number | string) => `${API_BASE_URL}/public/tickets/${ticketId}/purchase`,
    },

    // Users
    users: {
        getAll: `${API_BASE_URL}/users`, // Tetap /users, jika backend filter by tenant otomatis
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

    // Admin Events (full data including tenantId)
    adminEvents: {
        getAll: `${API_BASE_URL}/admin/events`,
        getById: (id: number | string) => `${API_BASE_URL}/admin/events/${id}`,
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

    // Tickets
    tickets: {
        getAll: `${API_BASE_URL}/admin/tickets`,
        getById: (id: number | string) => `${API_BASE_URL}/admin/tickets/${id}`,
        create: `${API_BASE_URL}/admin/tickets`,
        update: (id: number | string) => `${API_BASE_URL}/admin/tickets/${id}`,
        delete: (id: number | string) => `${API_BASE_URL}/admin/tickets/${id}`,
        getByEvent: (eventId: number | string) => `${API_BASE_URL}/admin/tickets?eventId=${eventId}`,
    },

    // Transactions
    transactions: {
        getAll: `${API_BASE_URL}/admin/transactions`,
        getByEvent: (eventId: number | string) => `${API_BASE_URL}/admin/transactions?eventId=${eventId}`,
        summary: `${API_BASE_URL}/admin/transactions/summary`,
        getMember: `${API_BASE_URL}/member/transactions`,
    },

    // Subscription Plans
    subscriptionPlans: {
        getAll: `${API_BASE_URL}/subscription-plans`,
        getActive: `${API_BASE_URL}/subscription-plans/active`,
        getById: (id: number | string) => `${API_BASE_URL}/subscription-plans/${id}`,
        create: `${API_BASE_URL}/subscription-plans`,
        update: (id: number | string) => `${API_BASE_URL}/subscription-plans/${id}`,
        delete: (id: number | string) => `${API_BASE_URL}/subscription-plans/${id}`,
    },

    // User Subscriptions (Admin)
    adminUserSubscriptions: {
        getAll: `${API_BASE_URL}/admin/subscriptions`,
        getById: (id: number | string) => `${API_BASE_URL}/admin/subscriptions/${id}`,
        updateStatus: (id: number | string, status: string) => `${API_BASE_URL}/admin/subscriptions/${id}/status?status=${status}`,
        delete: (id: number | string) => `${API_BASE_URL}/admin/subscriptions/${id}`,
        manualCreate: `${API_BASE_URL}/admin/subscriptions`,
    },

    // User Subscriptions (Member Facing)
    userSubscriptions: {
        subscribe: (userId: number | string) => `${API_BASE_URL}/subscriptions/subscribe?userId=${userId}`,
        mySubscriptions: (userId?: number | string, tenantId?: number | string) => {
            let url = `${API_BASE_URL}/subscriptions/my-subscriptions?`;
            const params = [];
            if (userId) params.push(`userId=${userId}`);
            if (tenantId) params.push(`tenantId=${tenantId}`);
            return url + params.join("&");
        },
        myActiveSubscription: (userId: number | string) => `${API_BASE_URL}/subscriptions/my-active-subscription?userId=${userId}`,
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

        // Quietly handle auth errors without cluttering console
        if (response.status !== 401 && response.status !== 403) {
            console.error(`API Error [${url}] Status: ${response.status}:`, errorData);
        }
        
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
 * Helper untuk PATCH request
 */
export async function apiPatch<T>(url: string, data?: any, withAuth = true): Promise<T> {
    const response = await fetch(url, {
        method: "PATCH",
        headers: getHeaders(withAuth),
        body: data ? JSON.stringify(data) : undefined,
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

/**
 * Helper untuk mendapatkan URL gambar yang benar.
 * Jika path dimulai dengan '/', maka akan dipetakan ke proxy lokal (Internal Backend).
 * Jika path adalah URL lengkap, maka akan dikembalikan apa adanya.
 */
export function getImageUrl(path?: string): string {
    if (!path) return "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800";

    if (path.startsWith('http')) {
        return path;
    }

    // Gunakan relative path untuk memanfaatkan Next.js proxy/rewrites di next.config.ts
    // Contoh: /uploads/posters/... akan di-proxy ke Backend IP
    return path.startsWith('/') ? path : `/${path}`;
}
