import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";
import { ApiResponse, SubscriptionPlan } from "@/types/auth";

/**
 * Get all subscription plans
 */
export const getAllSubscriptionPlans = async (): Promise<ApiResponse<SubscriptionPlan[]>> => {
    return apiGet<ApiResponse<SubscriptionPlan[]>>(API.subscriptionPlans.getAll);
};

/**
 * Get all active subscription plans (public)
 */
export const getActiveSubscriptionPlans = async (): Promise<ApiResponse<SubscriptionPlan[]>> => {
    return apiGet<ApiResponse<SubscriptionPlan[]>>(API.subscriptionPlans.getActive);
};

/**
 * Get plan by ID
 */
export const getSubscriptionPlanById = async (id: number | string): Promise<ApiResponse<SubscriptionPlan>> => {
    return apiGet<ApiResponse<SubscriptionPlan>>(API.subscriptionPlans.getById(id));
};

/**
 * Create new plan
 */
export const createSubscriptionPlan = async (plan: Partial<SubscriptionPlan>): Promise<ApiResponse<SubscriptionPlan>> => {
    return apiPost<ApiResponse<SubscriptionPlan>>(API.subscriptionPlans.create, plan);
};

/**
 * Update an existing plan
 */
export const updateSubscriptionPlan = async (id: number | string, plan: Partial<SubscriptionPlan>): Promise<ApiResponse<SubscriptionPlan>> => {
    return apiPut<ApiResponse<SubscriptionPlan>>(API.subscriptionPlans.update(id), plan);
};

/**
 * Delete an existing plan
 */
export const deleteSubscriptionPlan = async (id: number | string): Promise<ApiResponse<void>> => {
    return apiDelete<ApiResponse<void>>(API.subscriptionPlans.delete(id));
};
