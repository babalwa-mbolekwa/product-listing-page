"use client"

import React from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  <div
    role="alert"
    className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-24 text-center"
  >
    <h2 className="text-lg font-semibold text-foreground">
      Could not load the catalog
    </h2>
    <p className="text-sm text-muted-foreground">{error.message}</p>
    <Button onClick={reset}>Try Again</Button>
  </div>
}
