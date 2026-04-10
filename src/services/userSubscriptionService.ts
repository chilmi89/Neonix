import { API, apiGet, apiPost, apiPatch, apiDelete } from "@/config/api.config";
import { ApiResponse, UserSubscription } from "@/types/auth";

/**
 * Get all user subscriptions in the system
 */
export const getAllUserSubscriptions = async (): Promise<ApiResponse<UserSubscription[]>> => {
    return apiGet<ApiResponse<UserSubscription[]>>(API.adminUserSubscriptions.getAll);
};

/**
 * Get a specific subscription detail
 */
export const getUserSubscriptionById = async (id: number | string): Promise<ApiResponse<UserSubscription>> => {
    return apiGet<ApiResponse<UserSubscription>>(API.adminUserSubscriptions.getById(id));
};

/**
 * Update subscription status (ACTIVE, CANCELLED, EXPIRED)
 */
export const updateUserSubscriptionStatus = async (id: number | string, status: string): Promise<ApiResponse<UserSubscription>> => {
    return apiPatch<ApiResponse<UserSubscription>>(API.adminUserSubscriptions.updateStatus(id, status));
};

/**
 * Permanently delete a subscription record
 */
export const deleteUserSubscription = async (id: number | string): Promise<ApiResponse<void>> => {
    return apiDelete<ApiResponse<void>>(API.adminUserSubscriptions.delete(id));
};

/**
 * Manually create a subscription for a user/tenant (Admin only)
 */
export const manualCreateUserSubscription = async (sub: Partial<UserSubscription>): Promise<ApiResponse<UserSubscription>> => {
    return apiPost<ApiResponse<UserSubscription>>(API.adminUserSubscriptions.manualCreate, sub);
};

// ========== MEMBER FACING SERVICES ==========

/**
 * Subscribe to a plan
 */
export const subscribeToPlan = async (userId: number | string, planId: number | string, tenantId?: number | string): Promise<ApiResponse<UserSubscription>> => {
    return apiPost<ApiResponse<UserSubscription>>(API.userSubscriptions.subscribe(userId), { planId, tenantId });
};

/**
 * Get context subscriptions (user or tenant)
 */
export const getMySubscriptions = async (userId?: number | string, tenantId?: number | string): Promise<ApiResponse<UserSubscription[]>> => {
    return apiGet<ApiResponse<UserSubscription[]>>(API.userSubscriptions.mySubscriptions(userId, tenantId));
};

/**
 * Get active subscription for user
 */
export const getMyActiveSubscription = async (userId: number | string): Promise<ApiResponse<UserSubscription>> => {
    return apiGet<ApiResponse<UserSubscription>>(API.userSubscriptions.myActiveSubscription(userId));
};
/**
 * Get public subscription count (Total creators)
 */
export const getPublicSubscriptionCount = async (): Promise<ApiResponse<number>> => {
    return apiGet<ApiResponse<number>>(API.userSubscriptions.publicCount, false);
};
