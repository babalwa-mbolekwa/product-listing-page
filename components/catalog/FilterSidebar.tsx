"use client"

import React from "react"
import { ProductFilters } from "@/types/product"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Slider } from "../ui/slider"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { LayoutGrid, SlidersHorizontal, Sparkles } from "lucide-react"

export type CatalogView = "all" | "new-arrivals"

interface FilterSidebarProps {
  categories: string[]
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  view: CatalogView
  onViewChange: (view: CatalogView) => void
  priceBounds: { min: number; max: number }
  onApply?: () => void
  className?: string
}

const FilterSidebar = ({
  categories,
  filters,
  onFiltersChange,
  view,
  onViewChange,
  priceBounds,
  onApply,
  className,
}: FilterSidebarProps) => {
  function toggleCategory(category: string, checked: boolean) {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category)
    onFiltersChange({ ...filters, categories: newCategories })
  }

  function setMinPrice(value: number) {
    onFiltersChange({ ...filters, minPrice: Math.min(value, filters.maxPrice) })
  }

  function setMaxPrice(value: number) {
    onFiltersChange({ ...filters, maxPrice: Math.max(value, filters.minPrice) })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div>
        <h2 className="text-2xl font-bold text-custom-blue">Shop Catalog</h2>
        <p className="text-sm text-[#434655]">Browse our collection</p>
      </div>
      <nav aria-label="Catalog views">
        <ul className="flex flex-col gap-1 py-2 lg:py-4">
          <li>
            <button
              type="button"
              onClick={() => onViewChange("all")}
              aria-current={view === "all" ? "page" : undefined}
              className={cn(
                "w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer",
                view === "all" ? "bg-[#EFF4FF] text-custom-blue border-r-4 border-custom-blue" : "hover:bg-muted text-[#434655]"
              )}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              All Products
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => onViewChange("new-arrivals")}
              aria-current={view === "new-arrivals" ? "page" : undefined}
              className={cn(
                "w-full rounded-md px-3 py-2 text-left text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer",
                view === "new-arrivals"
                  ? "bg-[#EFF4FF] text-custom-blue border-r-4 border-custom-blue"
                  : "hover:bg-muted text-[#434655]"
              )}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              New Arrivals
            </button>
          </li>
        </ul>
      </nav>
      <Separator />
      <fieldset className="flex flex-col gap-3 space-y-2">
        <legend className="text-xs font-semibold text-[#0B1C30]">
          PRICE RANGE
        </legend>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Label htmlFor="min-price" className="sr-only">
              Minimum Price
            </Label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                id="min-price"
                type="number"
                inputMode="numeric"
                min={priceBounds.min}
                max={filters.maxPrice}
                value={filters.minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="pl-6 rounded-sm"
              />
            </div>
          </div>
          <span className="text-muted-foreground" aria-hidden="true">
            -
          </span>
          <div className="flex-1">
            <Label htmlFor="max-price" className="sr-only">
              Maximum Price
            </Label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                $
              </span>
              <Input
                id="max-price"
                type="number"
                inputMode="numeric"
                min={filters.minPrice}
                max={priceBounds.max}
                value={filters.maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="pl-6 rounded-sm"
              />
            </div>
          </div>
        </div>
        <Slider
          aria-label="Price range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={1}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={([min, max]) =>
            onFiltersChange({ ...filters, minPrice: min, maxPrice: max })
          }
          className="mt-1"
        />
      </fieldset>
      <Separator />
      <fieldset className="flex flex-col gap-3 space-y-2">
        <legend className="text-xs font-semibold text-[#0B1C30]">
          CATEGORY
        </legend>
        <div className="flex flex-col gap-2">
          {categories.map((category, index) => {
            const id = `category-${category}`
            const checked = filters.categories.includes(category)

            return (
              <div key={index} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={checked}
                  onCheckedChange={(value) =>
                    toggleCategory(category, value === true)
                  }
                />
                <Label htmlFor={id} className="font-normal text-[#0B1C30] text-sm">
                  {category}
                </Label>
              </div>
            )
          })}
        </div>
      </fieldset>
      <Button onClick={onApply} className="mt-2 w-full gap-2 bg-custom-blue text-white">
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        Filter Selection
      </Button>
    </div>
  )
}

export default FilterSidebar
