"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="demo-checkbox" defaultChecked />
      <Label htmlFor="demo-checkbox">Accept terms and conditions</Label>
    </div>
  )
}
