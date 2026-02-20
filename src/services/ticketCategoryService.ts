import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";
import { ApiResponse, TicketCategory } from "@/types/auth";

/**
 * Get all ticket categories
 */
export async function getAllTicketCategories(): Promise<ApiResponse<TicketCategory[]>> {
    return apiGet<ApiResponse<TicketCategory[]>>(API.ticketCategories.getAll);
}

/**
 * Get ticket category by ID
 */
export async function getTicketCategoryById(id: number | string): Promise<ApiResponse<TicketCategory>> {
    return apiGet<ApiResponse<TicketCategory>>(API.ticketCategories.getById(id));
}

/**
 * Create new ticket category
 */
export async function createTicketCategory(data: { name: string; description: string }): Promise<ApiResponse<TicketCategory>> {
    return apiPost<ApiResponse<TicketCategory>>(API.ticketCategories.create, data);
}

/**
 * Update ticket category
 */
export async function updateTicketCategory(id: number | string, data: { name: string; description: string }): Promise<ApiResponse<TicketCategory>> {
    return apiPut<ApiResponse<TicketCategory>>(API.ticketCategories.update(id), data);
}

/**
 * Delete ticket category
 */
export async function deleteTicketCategory(id: number | string): Promise<ApiResponse<null>> {
    return apiDelete<ApiResponse<null>>(API.ticketCategories.delete(id));
}
