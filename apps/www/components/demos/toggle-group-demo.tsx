"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue={["left"]}>
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  )
}
