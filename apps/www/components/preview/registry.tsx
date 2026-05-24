import type { ReactNode } from "react"
import { ButtonDemo } from "@/components/demos/button-demo"
import { InputDemo } from "@/components/demos/input-demo"
import { CardDemo } from "@/components/demos/card-demo"
import { DialogDemo } from "@/components/demos/dialog-demo"
import { CheckboxDemo } from "@/components/demos/checkbox-demo"
import { SwitchDemo } from "@/components/demos/switch-demo"
import { SelectDemo } from "@/components/demos/select-demo"
import { BadgeDemo } from "@/components/demos/badge-demo"
import { TooltipDemo } from "@/components/demos/tooltip-demo"
import { SkeletonDemo } from "@/components/demos/skeleton-demo"
import { EmptyStateDemo } from "@/components/demos/empty-state-demo"

const demos: Record<string, () => ReactNode> = {
  button: ButtonDemo,
  input: InputDemo,
  textarea: InputDemo,
  label: InputDemo,
  checkbox: CheckboxDemo,
  switch: SwitchDemo,
  select: SelectDemo,
  dialog: DialogDemo,
  sheet: DialogDemo,
  card: CardDemo,
  badge: BadgeDemo,
  separator: CardDemo,
  tooltip: TooltipDemo,
  skeleton: SkeletonDemo,
  "dropdown-menu": ButtonDemo,
  "empty-state": EmptyStateDemo,
  "stat-card": CardDemo,
  "page-header": CardDemo,
}

export function getPreviewDemo(component: string) {
  return demos[component] ?? ButtonDemo
}

export { demos as previewDemos }
