"use client"

import React, { useMemo, useState } from "react"
import { Product, ProductFilters, SortOption } from "@/types/product"
import FilterSidebar, { CatalogView } from "./FilterSidebar"
import MobileFilters from "./MobileFilters"
import CatalogToolbar from "./CatalogToolbar"
import ProductGrid from "./ProductGrid"
import { filterProducts, getCategories, sortProducts } from "@/lib/products"

const PAGE_SIZE = 9
const NEW_ARRIVALS_WINDOW_DAYS = 30

function isNewArrival(product: Product): boolean {
  const ageInDays =
    (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  return ageInDays <= NEW_ARRIVALS_WINDOW_DAYS
}

interface ProductListingProps {
  products: Product[]
}

const ProductListing = ({ products }: ProductListingProps) => {
  const categories = useMemo(() => getCategories(products), [products])

  const priceBounds = useMemo(() => {
    const prices = products.map((p) => Number(p.price))
    return {
      min: prices.length ? Math.floor(Math.min(...prices)) : 0,
      max: prices.length ? Math.ceil(Math.max(...prices)) : 0,
    }
  }, [products])

  const [view, setView] = useState<CatalogView>("all")
  const [sortBy, setSortBy] = useState<SortOption>("recent")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    minPrice: priceBounds.min,
    maxPrice: priceBounds.max,
  })

  function updateFilters(next: ProductFilters) {
    setFilters(next)
    setVisibleCount(PAGE_SIZE)
  }

  function updateView(next: CatalogView) {
    setView(next)
    setVisibleCount(PAGE_SIZE)
  }

  function updateSort(next: SortOption) {
    setSortBy(next)
    setVisibleCount(PAGE_SIZE)
  }

  const scopedProducts = useMemo(
    () => (view === "new-arrivals" ? products.filter(isNewArrival) : products),
    [products, view]
  )

  const filteredAndSorted = useMemo(
    () => sortProducts(filterProducts(scopedProducts, filters), sortBy),
    [scopedProducts, filters, sortBy]
  )

  const visibleProducts = filteredAndSorted.slice(0, visibleCount)
  const hasMore = visibleCount < filteredAndSorted.length

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-10">
      <aside
        aria-label="Product filters"
        className="hidden w-64 shrink-0 lg:block"
      >
        <FilterSidebar
          categories={categories}
          filters={filters}
          onFiltersChange={updateFilters}
          view={view}
          onViewChange={updateView}
          priceBounds={priceBounds}
        />
      </aside>
      <main className="flex-1">
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <h1 className="text-lg font-bold text-foreground">Shop Catalog</h1>
          <MobileFilters
            categories={categories}
            filters={filters}
            onFiltersChange={updateFilters}
            view={view}
            onViewChange={updateView}
            priceBounds={priceBounds}
          />
        </div>
        <div className="mb-5">
          <CatalogToolbar
            totalCount={filteredAndSorted.length}
            visibleCount={visibleCount}
            sortBy={sortBy}
            onSortChange={updateSort}
          />
        </div>
        <ProductGrid
          products={visibleProducts}
          hasMore={hasMore}
          onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
        />
      </main>
    </div>
  )
}

export default ProductListing
