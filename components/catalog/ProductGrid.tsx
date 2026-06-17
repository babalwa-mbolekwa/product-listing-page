import React from "react"
import { Product } from "@/types/product"
import { Skeleton } from "../ui/skeleton"
import ProductCard from "./ProductCard"
import { Button } from "../ui/button"
import { ChevronDown } from "lucide-react"

interface ProductGridProps {
  products: Product[]
  hasMore: boolean
  onLoadMore: () => void
  isLoading?: boolean
}

const ProductGrid = ({
  products,
  hasMore,
  onLoadMore,
  isLoading = false,
}: ProductGridProps) => {
  if (isLoading) {
    return (
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <li key={index} className="list-none">
            <Skeleton className="aspect-4/3 w-full rounded-xl" />
            <Skeleton className="mt-3 h-3 w-16" />
            <Skeleton className="mt-2 h-4 w-32" />
          </li>
        ))}
      </ul>
    )
  }

  if (products.length === 0) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-1 rounded-xl border border-dashed py-16 text-center"
      >
        <p className="font-medium text-foreground">
          No products match your filters
        </p>
        <p className="text-sm text-muted-foreground">
          Try widening the price range or clearing a category
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} priority={i < 3} />
        ))}
      </ul>
      {hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={onLoadMore} className="gap-2 text-custom-blue border-2 border-[#C3C6D7] text-sm px-10 rounded-sm">
            Load More Products
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
