"use client"

import { Button } from "@/components/ui-heroui/button"

export function ButtonDemoHeroUi() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="soft" size="soft">
          Request a demo
        </Button>
        <Button variant="soft-outline" size="soft">
          Join waitlist
        </Button>
      </div>
    </div>
  )
}
