"use-client"

import React from 'react'
import { ProductFilters } from '@/types/product';
import FilterSidebar, { CatalogView } from './FilterSidebar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { SlidersHorizontal } from 'lucide-react';

interface MobileFiltersProps {
    categories: string[];
    filters: ProductFilters;
    onFiltersChange: (filters: ProductFilters) => void;
    view: CatalogView;
    onViewChange: (view: CatalogView) => void;
    priceBounds: { min: number; max: number };
}

const MobileFilters = (props : MobileFiltersProps) => {
    const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 lg:hidden">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto p-6">
        <SheetHeader className="p-0">
            <SheetTitle className="sr-only">Filter products</SheetTitle>
        </SheetHeader>
        <FilterSidebar {...props} onApply={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileFilters