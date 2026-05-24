"use client"

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="demo-switch" defaultChecked />
      <Label htmlFor="demo-switch">Airplane mode</Label>
    </div>
  )
}
