"use client"

import React from "react"
import { SortOption } from "@/types/product"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { LayoutGrid } from "lucide-react"

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Recent" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title-asc", label: "Name: A to Z" },
  { value: "title-desc", label: "Name: Z to A" },
]

interface CatalogToolbarProps {
  totalCount: number
  visibleCount: number
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
}

const CatalogToolbar = ({
  totalCount,
  visibleCount,
  sortBy,
  onSortChange,
}: CatalogToolbarProps) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground" aria-live="polite">
        <span className="sm:hidden">{totalCount} Results</span>
        <span className="hidden sm:inline">
          Showing {Math.min(visibleCount, totalCount)} of {totalCount} products
        </span>
      </p>
      <Select
        value={sortBy}
        onValueChange={(v) => onSortChange(v as SortOption)}
      >
        <SelectTrigger
          aria-label="Sort products"
          className="rounded-full sm:rounded-md"
        >
          <LayoutGrid className="h-4 w-4 sm:hidden" aria-hidden="true" />
          <span className="hidden text-muted-foreground sm:inline">
            Order By:
          </span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CatalogToolbar
