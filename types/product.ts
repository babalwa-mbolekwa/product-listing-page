export interface Product {
    createdAt: string;
    title: string;
    image: string;
    category: string;
    price: string;
    id: string;
}

export type SortOption = "recent" | "price-asc" | "price-desc" | "title-asc" | "title-desc";

export interface ProductFilters {
    categories: string[];
    minPrice: number;
    maxPrice: number;
}