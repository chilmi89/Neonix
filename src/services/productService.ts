import { API, apiGet, apiPost, apiPut, apiDelete } from "@/config/api.config";

/**
 * Product Service - Placeholder
 * TODO: Implement ketika backend API ready
 */

export interface Product {
    id?: number;
    name: string;
    description?: string;
    price: number;
    category?: string;
    stock?: number;
}

export async function getAllProducts(): Promise<any> {
    throw new Error("Get all products API belum diimplementasikan");
    // return apiGet(API.products.getAll);
}

export async function getProductById(id: number): Promise<any> {
    throw new Error("Get product by ID API belum diimplementasikan");
    // return apiGet(API.products.getById(id));
}

export async function createProduct(productData: Product): Promise<any> {
    throw new Error("Create product API belum diimplementasikan");
    // return apiPost(API.products.create, productData);
}

export async function updateProduct(id: number, productData: Partial<Product>): Promise<any> {
    throw new Error("Update product API belum diimplementasikan");
    // return apiPut(API.products.update(id), productData);
}

export async function deleteProduct(id: number): Promise<any> {
    throw new Error("Delete product API belum diimplementasikan");
    // return apiDelete(API.products.delete(id));
}
