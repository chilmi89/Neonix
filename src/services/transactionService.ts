import { API, apiGet } from "@/config/api.config";
import { ApiResponse } from "@/types/auth";

export interface TransactionDTO {
    id: number;
    tenantId: number;
    eventId: number;
    eventName: string;
    ticketId: number;
    ticketName: string;
    categoryName: string;
    buyerName: string;
    buyerEmail: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purchasedAt: string;
    eventPoster?: string;
    eventLocation?: string;
}

export const getMemberTransactions = async (): Promise<ApiResponse<TransactionDTO[]>> => {
    return await apiGet<ApiResponse<TransactionDTO[]>>(API.transactions.getMember);
};

export const getAdminTransactions = async (eventId?: number): Promise<ApiResponse<TransactionDTO[]>> => {
    const url = eventId 
        ? API.transactions.getByEvent(eventId)
        : API.transactions.getAll;
    return await apiGet<ApiResponse<TransactionDTO[]>>(url);
};

export const getTransactionSummary = async (): Promise<ApiResponse<any>> => {
    return await apiGet<ApiResponse<any>>(API.transactions.summary);
};
