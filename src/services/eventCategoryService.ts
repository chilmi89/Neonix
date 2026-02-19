import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";
import { ApiResponse, EventCategory } from "@/types/auth";

/**
 * Get all event categories
 */
export async function getAllEventCategories(): Promise<ApiResponse<EventCategory[]>> {
    return apiGet<ApiResponse<EventCategory[]>>(API.eventCategories.getAll);
}

/**
 * Get category by ID
 */
export async function getEventCategoryById(id: number): Promise<ApiResponse<EventCategory>> {
    return apiGet<ApiResponse<EventCategory>>(API.eventCategories.getById(id));
}

/**
 * Create new category
 */
export async function createEventCategory(data: { name: string }): Promise<ApiResponse<EventCategory>> {
    return apiPost<ApiResponse<EventCategory>>(API.eventCategories.create, data);
}

/**
 * Update category
 */
export async function updateEventCategory(id: number, data: { name: string }): Promise<ApiResponse<EventCategory>> {
    return apiPut<ApiResponse<EventCategory>>(API.eventCategories.update(id), data);
}

/**
 * Delete category
 */
export async function deleteEventCategory(id: number): Promise<ApiResponse<null>> {
    return apiDelete<ApiResponse<null>>(API.eventCategories.delete(id));
}
