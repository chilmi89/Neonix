import { API, apiGet } from "@/config/api.config";
import { ApiResponse } from "@/types/auth";

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
}

/**
 * Get events for public landing page
 */
export async function getPublicEvents(): Promise<ApiResponse<PublicEvent[]>> {
    return apiGet<ApiResponse<PublicEvent[]>>(API.public.events, false);
}

/**
 * Get single event detail for public
 */
export async function getPublicEventById(id: number | string): Promise<ApiResponse<PublicEvent & { description: string }>> {
    return apiGet<ApiResponse<PublicEvent & { description: string }>>(`${API.public.events}/${id}`, false);
}
