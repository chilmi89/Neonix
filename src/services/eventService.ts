import { API, apiGet, apiPostMultipart, apiPutMultipart, apiDelete } from "@/config/api.config";
import { ApiResponse, Event, EventCategory } from "@/types/auth";

/**
 * Get all events
 */
export async function getAllEvents(): Promise<ApiResponse<Event[]>> {
    return apiGet<ApiResponse<Event[]>>(API.events.getAll);
}

/**
 * Get event by ID
 */
export async function getEventById(id: number): Promise<ApiResponse<Event>> {
    return apiGet<ApiResponse<Event>>(API.events.getById(id));
}

/**
 * Create new event (Multipart)
 */
export async function createEvent(formData: FormData): Promise<ApiResponse<Event>> {
    return apiPostMultipart<ApiResponse<Event>>(API.events.create, formData);
}

/**
 * Update event (Multipart)
 */
export async function updateEvent(id: number, formData: FormData): Promise<ApiResponse<Event>> {
    return apiPutMultipart<ApiResponse<Event>>(API.events.update(id), formData);
}

/**
 * Delete event
 */
export async function deleteEvent(id: number): Promise<ApiResponse<null>> {
    return apiDelete<ApiResponse<null>>(API.events.delete(id));
}

/**
 * Get all event categories
 */
export async function getEventCategories(): Promise<ApiResponse<EventCategory[]>> {
    return apiGet<ApiResponse<EventCategory[]>>(API.eventCategories.getAll);
}
