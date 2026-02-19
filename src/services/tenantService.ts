import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";
import { Tenant, ApiResponse } from "@/types/auth";

/**
 * Tenant Service - handles all Tenant-related API interactions
 */

export async function getAllTenants(): Promise<ApiResponse<Tenant[]>> {
    return apiGet<ApiResponse<Tenant[]>>(API.tenants.getAll);
}

export async function getTenantById(id: number): Promise<ApiResponse<Tenant>> {
    return apiGet<ApiResponse<Tenant>>(API.tenants.getById(id));
}

export async function createTenant(tenantData: Partial<Tenant>): Promise<ApiResponse<Tenant>> {
    return apiPost<ApiResponse<Tenant>>(API.tenants.create, tenantData);
}

export async function updateTenant(id: number, tenantData: Partial<Tenant>): Promise<ApiResponse<Tenant>> {
    return apiPut<ApiResponse<Tenant>>(API.tenants.update(id), tenantData);
}

export async function deleteTenant(id: number): Promise<ApiResponse<any>> {
    return apiDelete<ApiResponse<any>>(API.tenants.delete(id));
}

export async function getTenantBySlug(slug: string): Promise<ApiResponse<Tenant>> {
    return apiGet<ApiResponse<Tenant>>(API.tenants.getBySlug(slug));
}
