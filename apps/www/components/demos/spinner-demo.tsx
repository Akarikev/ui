"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
      <Button disabled>
        <Spinner data-icon="inline-start" />
        Loading
      </Button>
    </div>
  )
}
