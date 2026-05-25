"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor="demo-username">Username</Label>
      <Input id="demo-username" placeholder="@elorm" />
    </div>
  )
}
