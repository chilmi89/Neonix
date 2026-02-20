import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";
import { ApiResponse, Ticket } from "@/types/auth";

/**
 * Get all tickets
 */
export async function getAllTickets(): Promise<ApiResponse<Ticket[]>> {
    return apiGet<ApiResponse<Ticket[]>>(API.tickets.getAll);
}

/**
 * Get tickets by event ID
 */
export async function getTicketsByEvent(eventId: number | string): Promise<ApiResponse<Ticket[]>> {
    return apiGet<ApiResponse<Ticket[]>>(API.tickets.getByEvent(eventId));
}

/**
 * Get ticket by ID
 */
export async function getTicketById(id: number | string): Promise<ApiResponse<Ticket>> {
    return apiGet<ApiResponse<Ticket>>(API.tickets.getById(id));
}

/**
 * Create new ticket
 */
export async function createTicket(data: any): Promise<ApiResponse<Ticket>> {
    return apiPost<ApiResponse<Ticket>>(API.tickets.create, data);
}

/**
 * Update ticket
 */
export async function updateTicket(id: number | string, data: any): Promise<ApiResponse<Ticket>> {
    return apiPut<ApiResponse<Ticket>>(API.tickets.update(id), data);
}

/**
 * Delete ticket
 */
export async function deleteTicket(id: number | string): Promise<ApiResponse<null>> {
    return apiDelete<ApiResponse<null>>(API.tickets.delete(id));
}
