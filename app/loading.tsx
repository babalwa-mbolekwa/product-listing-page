import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

const loading = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 lg:flex-row lg:gap-10 lg:px-8 lg:py-10">
      <aside className="hidden w-64 shrink-0 lg:block" aria-hidden="true">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-4 h-40 w-full" />
      </aside>
      <main className="flex-1">
        <Skeleton className="mb-5 h-6 w-48" />
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <li key={i} className="list-none">
              <Skeleton className="aspect-4/3 w-full rounded-xl" />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default loading
