import { Product } from "@/types/product";

const PRODUCTS_API_URL = "https://6a2bc23a3e2b60ab038ec335.mockapi.io/api/v1/Products";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(PRODUCTS_API_URL, {
        next: { revalidate: 300 } // data is cached and revalidated every 300 seconds here
    });

    if(!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    return response.json();
}