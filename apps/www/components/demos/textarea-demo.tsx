"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TextareaDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="demo-message">Message</Label>
      <Textarea
        id="demo-message"
        rows={5}
        placeholder="Tell us a bit about your project..."
      />
    </div>
  )
}
