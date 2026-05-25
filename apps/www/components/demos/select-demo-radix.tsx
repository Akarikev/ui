"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemoRadix() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs text-muted-foreground">Radix preset example</p>
      <Select defaultValue="light">
        <SelectTrigger className="w-[220px]">
          <SelectValue placeholder="Theme (Radix)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
