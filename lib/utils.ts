import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Product, ProductFilters, SortOption } from "@/types/product"

// Function for merging class names and Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((product) => product.category))).sort();
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    const price = Number(product.price);

    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);

    const matchesPrice = price >= filters.minPrice && price <= filters.maxPrice;

    return matchesCategory && matchesPrice;
  });
}

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "recent":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "price-asc":
      return sorted.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return sorted.sort((a, b) => Number(b.price) - Number(a.price));
    case "title-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "title-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return sorted;
  }
}

export function formatPrice(price: string): string {
  const value = Number(price);

  if (isNaN(value)) {
    return price; 
  }
  
  return `$${value.toFixed(2)}`;
}