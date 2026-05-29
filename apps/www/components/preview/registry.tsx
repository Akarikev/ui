import type { ReactNode } from "react"
import { ButtonDemo } from "@/components/demos/button-demo"
import { InputDemo } from "@/components/demos/input-demo"
import { TextareaDemo } from "@/components/demos/textarea-demo"
import { LabelDemo } from "@/components/demos/label-demo"
import { FieldDemo } from "@/components/demos/field-demo"
import { InputGroupDemo } from "@/components/demos/input-group-demo"
import { SpinnerDemo } from "@/components/demos/spinner-demo"
import { RadioGroupDemo } from "@/components/demos/radio-group-demo"
import { ToggleGroupDemo } from "@/components/demos/toggle-group-demo"
import { CardDemo } from "@/components/demos/card-demo"
import { DialogDemo } from "@/components/demos/dialog-demo"
import { AlertDialogDemo } from "@/components/demos/alert-dialog-demo"
import { SheetDemo } from "@/components/demos/sheet-demo"
import { PopoverDemo } from "@/components/demos/popover-demo"
import { CheckboxDemo } from "@/components/demos/checkbox-demo"
import { SwitchDemo } from "@/components/demos/switch-demo"
import { SelectDemo } from "@/components/demos/select-demo"
import { SelectDemoRadix } from "@/components/demos/select-demo-radix"
import { TabsDemo } from "@/components/demos/tabs-demo"
import { AccordionDemo } from "@/components/demos/accordion-demo"
import { CollapsibleDemo } from "@/components/demos/collapsible-demo"
import { BadgeDemo } from "@/components/demos/badge-demo"
import { AlertDemo } from "@/components/demos/alert-demo"
import { AvatarDemo } from "@/components/demos/avatar-demo"
import { NaviiAvatarDemo } from "@/components/demos/navii-avatar-demo"
import { ProgressDemo } from "@/components/demos/progress-demo"
import { TooltipDemo } from "@/components/demos/tooltip-demo"
import { SkeletonDemo } from "@/components/demos/skeleton-demo"
import { TableDemo } from "@/components/demos/table-demo"
import { PaginationDemo } from "@/components/demos/pagination-demo"
import { BreadcrumbDemo } from "@/components/demos/breadcrumb-demo"
import { EmptyStateDemo } from "@/components/demos/empty-state-demo"
import { SeparatorDemo } from "@/components/demos/separator-demo"
import { DropdownMenuDemo } from "@/components/demos/dropdown-menu-demo"
import { StatCardDemo } from "@/components/demos/stat-card-demo"
import { PageHeaderDemo } from "@/components/demos/page-header-demo"
import { LoginFormDemo } from "@/components/demos/login-form-demo"
import { SettingsSectionDemo } from "@/components/demos/settings-section-demo"
import { DataTableDemo } from "@/components/demos/data-table-demo"
import { SocialLinksDemo } from "@/components/demos/social-links-demo"
import { ModeToggleDemo } from "@/components/demos/mode-toggle-demo"
import { SonnerDemo } from "@/components/demos/sonner-demo"
import { CommandDemo } from "@/components/demos/command-demo"
import { IconNavLinkDemo } from "@/components/demos/icon-nav-link-demo"
import { PageFooterDemo } from "@/components/demos/page-footer-demo"

const demos: Record<
  string,
  {
    base: () => ReactNode
    radix?: () => ReactNode
    heroui?: () => ReactNode
  }
> = {
  button: { base: ButtonDemo },
  input: { base: InputDemo },
  textarea: { base: TextareaDemo },
  label: { base: LabelDemo },
  field: { base: FieldDemo },
  "input-group": { base: InputGroupDemo },
  spinner: { base: SpinnerDemo },
  "radio-group": { base: RadioGroupDemo },
  "toggle-group": { base: ToggleGroupDemo },
  checkbox: { base: CheckboxDemo },
  switch: { base: SwitchDemo },
  select: { base: SelectDemo, radix: SelectDemoRadix },
  dialog: { base: DialogDemo },
  "alert-dialog": { base: AlertDialogDemo },
  sheet: { base: SheetDemo },
  popover: { base: PopoverDemo },
  tabs: { base: TabsDemo },
  accordion: { base: AccordionDemo },
  collapsible: { base: CollapsibleDemo },
  card: { base: CardDemo },
  badge: { base: BadgeDemo },
  "social-links": { base: SocialLinksDemo },
  alert: { base: AlertDemo },
  avatar: { base: AvatarDemo },
  "navii-avatar": { base: NaviiAvatarDemo },
  progress: { base: ProgressDemo },
  separator: { base: SeparatorDemo },
  tooltip: { base: TooltipDemo },
  skeleton: { base: SkeletonDemo },
  table: { base: TableDemo },
  pagination: { base: PaginationDemo },
  breadcrumb: { base: BreadcrumbDemo },
  "dropdown-menu": { base: DropdownMenuDemo },
  "empty-state": { base: EmptyStateDemo },
  "stat-card": { base: StatCardDemo },
  "page-header": { base: PageHeaderDemo },
  "login-form": { base: LoginFormDemo },
  "settings-section": { base: SettingsSectionDemo },
  "data-table": { base: DataTableDemo },
  "mode-toggle": { base: ModeToggleDemo },
  sonner: { base: SonnerDemo },
  command: { base: CommandDemo },
  "icon-nav-link": { base: IconNavLinkDemo },
  "page-footer": { base: PageFooterDemo },
}

export function getPreviewDemo(
  component: string,
  library: "base-ui" | "radix" | "heroui" = "base-ui"
) {
  const entry = demos[component]
  if (!entry) return ButtonDemo
  if (library === "radix") {
    return entry.radix ?? entry.base
  }
  if (library === "heroui") {
    return entry.heroui ?? entry.base
  }
  return entry.base
}

export { demos as previewDemos }
