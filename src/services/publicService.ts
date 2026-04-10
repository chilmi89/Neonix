import { API, apiGet, apiPost } from "@/config/api.config";
import { ApiResponse, Ticket, TicketCategory } from "@/types/auth";

export interface PublicEvent {
    id: number;
    name?: string;
    title?: string;
    posterUrl: string;
    categoryName: string;
    city: string;
    locationName?: string;
    location?: string;
    startDate: string;
    endDate: string;
    startingPrice: number;
    tenantId?: number;
    description?: string;
    address?: string;
    // Additional fields from event detail endpoint
    minPrice?: number;
    ageRestriction?: string;
    durationInfo?: string;
}

export interface AdminEvent {
    id: number;
    tenantId: number;
    categoryId: number;
    categoryName?: string;
    name: string;
    description: string;
    locationName: string;
    city: string;
    address: string;
    posterUrl?: string;
    startDate: string;
    endDate: string;
    isPublished: boolean;
}

export interface TicketPurchaseRequest {
    buyerName: string;
    buyerEmail: string;
    quantity: number;
    attendees?: {
        name: string;
        email: string;
    }[];
}

export interface TicketPurchaseResponse {
    ticketId: number;
    ticketName: string;
    eventName: string;
    categoryName: string;
    buyerName: string;
    buyerEmail: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purchasedAt: string;
    message: string;
}

/**
 * Get events for public landing page
 */
export async function getPublicEvents(): Promise<ApiResponse<PublicEvent[]>> {
    return apiGet<ApiResponse<PublicEvent[]>>(API.public.events, false);
}

/**
 * Get single event detail for public
 * Returns: id, name, description, posterUrl, categoryName, locationName, city, startDate, endDate, etc.
 */
export async function getPublicEventById(id: number | string): Promise<ApiResponse<PublicEvent>> {
    return apiGet<ApiResponse<PublicEvent>>(API.public.eventById(id), false);
}

/**
 * Get admin event detail (with auth) — includes tenantId needed for public ticket fetch
 * GET /api/admin/events/{id}
 */
export async function getAdminEventById(id: number | string): Promise<ApiResponse<AdminEvent>> {
    return apiGet<ApiResponse<AdminEvent>>(API.adminEvents.getById(id), true);
}

/**
 * Get tickets for a specific event under a specific tenant (PUBLIC, no auth required)
 * GET /api/public/tickets/tenant/{tenantId}/event/{eventId}
 */
export async function getPublicTicketsByTenantAndEvent(
    tenantId: number | string,
    eventId: number | string
): Promise<ApiResponse<Ticket[]>> {
    return apiGet<ApiResponse<Ticket[]>>(
        API.public.ticketsByTenantAndEvent(tenantId, eventId),
        false
    );
}

/**
 * Get tickets by event ID only — fallback ketika tenantId tidak diketahui (PUBLIC, no auth required)
 * GET /api/public/tickets/event/{eventId}
 */
export async function getPublicTicketsByEvent(
    eventId: number | string
): Promise<ApiResponse<Ticket[]>> {
    return apiGet<ApiResponse<Ticket[]>>(
        API.public.ticketsByEvent(eventId),
        false
    );
}

/**
 * Get ticket detail by ID (PUBLIC, no auth required)
 * GET /api/public/tickets/{ticketId}
 */
export async function getPublicTicketById(ticketId: number | string): Promise<ApiResponse<Ticket>> {
    return apiGet<ApiResponse<Ticket>>(API.public.ticketById(ticketId), false);
}

/**
 * Purchase a ticket (PUBLIC, no auth required)
 * POST /api/public/tickets/{ticketId}/purchase
 */
export async function purchaseTicket(
    ticketId: number | string,
    data: TicketPurchaseRequest
): Promise<ApiResponse<TicketPurchaseResponse>> {
    return apiPost<ApiResponse<TicketPurchaseResponse>>(
        API.public.purchaseTicket(ticketId),
        data,
        true
    );
}
