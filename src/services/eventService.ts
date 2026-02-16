import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";

/**
 * Event Service - Placeholder
 * TODO: Implement ketika backend API ready
 */

export interface Event {
    id?: number;
    title: string;
    description?: string;
    location?: string;
    startDate: string;
    endDate: string;
}

export async function getAllEvents(): Promise<any> {
    throw new Error("Get all events API belum diimplementasikan");
    // return apiGet(API.events.getAll);
}

export async function getEventById(id: number): Promise<any> {
    throw new Error("Get event by ID API belum diimplementasikan");
    // return apiGet(API.events.getById(id));
}

export async function getUpcomingEvents(): Promise<any> {
    throw new Error("Get upcoming events API belum diimplementasikan");
    // return apiGet(API.events.upcoming);
}

export async function getPastEvents(): Promise<any> {
    throw new Error("Get past events API belum diimplementasikan");
    // return apiGet(API.events.past);
}

export async function createEvent(eventData: Event): Promise<any> {
    throw new Error("Create event API belum diimplementasikan");
    // return apiPost(API.events.create, eventData);
}

export async function updateEvent(id: number, eventData: Partial<Event>): Promise<any> {
    throw new Error("Update event API belum diimplementasikan");
    // return apiPut(API.events.update(id), eventData);
}

export async function deleteEvent(id: number): Promise<any> {
    throw new Error("Delete event API belum diimplementasikan");
    // return apiDelete(API.events.delete(id));
}
