import { ApiResponse, LoginResponseData } from "@/types/auth";

const API_URL = "/api/auth";

export const login = async (email: string, password: string): Promise<ApiResponse<LoginResponseData>> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        return data;
    } catch (error: any) {
        throw new Error(error.message || "An unexpected error occurred during login");
    }
};
