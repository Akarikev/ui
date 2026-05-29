"use client"

import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function DarkModePreview() {
  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex min-h-[220px] items-center justify-center bg-background/60 p-8">
        <Card className="w-full max-w-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
            <div className="flex flex-col gap-1.5">
              <CardTitle>Theme preview</CardTitle>
              <CardDescription>
                Toggle light, dark, or system to see elorm tokens update.
              </CardDescription>
            </div>
            <ModeToggle />
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button size="sm">Primary</Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
