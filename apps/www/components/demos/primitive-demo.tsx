"use client"

import { Button as BaseButton } from "@/components/ui/button"
import { Checkbox as BaseCheckbox } from "@/components/ui/checkbox"
import { Switch as BaseSwitch } from "@/components/ui/switch"
import {
  Select as BaseSelect,
  SelectContent as BaseSelectContent,
  SelectItem as BaseSelectItem,
  SelectTrigger as BaseSelectTrigger,
  SelectValue as BaseSelectValue,
} from "@/components/ui/select"
import {
  Dialog as BaseDialog,
  DialogContent as BaseDialogContent,
  DialogDescription as BaseDialogDescription,
  DialogHeader as BaseDialogHeader,
  DialogTitle as BaseDialogTitle,
  DialogTrigger as BaseDialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip as BaseTooltip,
  TooltipContent as BaseTooltipContent,
  TooltipProvider as BaseTooltipProvider,
  TooltipTrigger as BaseTooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"

import { Button as RadixButton } from "@/components/ui-radix/button"
import { Checkbox as RadixCheckbox } from "@/components/ui-radix/checkbox"
import { Switch as RadixSwitch } from "@/components/ui-radix/switch"
import {
  Select as RadixSelect,
  SelectContent as RadixSelectContent,
  SelectItem as RadixSelectItem,
  SelectTrigger as RadixSelectTrigger,
  SelectValue as RadixSelectValue,
} from "@/components/ui-radix/select"
import {
  Dialog as RadixDialog,
  DialogContent as RadixDialogContent,
  DialogDescription as RadixDialogDescription,
  DialogHeader as RadixDialogHeader,
  DialogTitle as RadixDialogTitle,
  DialogTrigger as RadixDialogTrigger,
} from "@/components/ui-radix/dialog"
import {
  Tooltip as RadixTooltip,
  TooltipContent as RadixTooltipContent,
  TooltipProvider as RadixTooltipProvider,
  TooltipTrigger as RadixTooltipTrigger,
} from "@/components/ui-radix/tooltip"

import type { PrimitiveId, UiLibrary } from "@/lib/ui-library"

interface PrimitiveDemoProps {
  component: PrimitiveId
  library: UiLibrary
}

export function PrimitiveDemo({ component, library }: PrimitiveDemoProps) {
  const isRadix = library === "radix"
  const uid = `${component}-${library}`

  switch (component) {
    case "button": {
      const Button = isRadix ? RadixButton : BaseButton
      return (
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      )
    }
    case "checkbox": {
      const Checkbox = isRadix ? RadixCheckbox : BaseCheckbox
      return (
        <div className="flex items-center gap-2">
          <Checkbox id={uid} defaultChecked />
          <Label htmlFor={uid}>Accept terms and conditions</Label>
        </div>
      )
    }
    case "switch": {
      const Switch = isRadix ? RadixSwitch : BaseSwitch
      return (
        <div className="flex items-center gap-2">
          <Switch id={uid} defaultChecked />
          <Label htmlFor={uid}>Airplane mode</Label>
        </div>
      )
    }
    case "select": {
      const Select = isRadix ? RadixSelect : BaseSelect
      const SelectTrigger = isRadix ? RadixSelectTrigger : BaseSelectTrigger
      const SelectValue = isRadix ? RadixSelectValue : BaseSelectValue
      const SelectContent = isRadix ? RadixSelectContent : BaseSelectContent
      const SelectItem = isRadix ? RadixSelectItem : BaseSelectItem
      return (
        <Select defaultValue="apple">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Orange</SelectItem>
          </SelectContent>
        </Select>
      )
    }
    case "dialog": {
      const Dialog = isRadix ? RadixDialog : BaseDialog
      const DialogTrigger = isRadix ? RadixDialogTrigger : BaseDialogTrigger
      const DialogContent = isRadix ? RadixDialogContent : BaseDialogContent
      const DialogHeader = isRadix ? RadixDialogHeader : BaseDialogHeader
      const DialogTitle = isRadix ? RadixDialogTitle : BaseDialogTitle
      const DialogDescription = isRadix
        ? RadixDialogDescription
        : BaseDialogDescription
      const Button = isRadix ? RadixButton : BaseButton
      return (
        <Dialog>
          <DialogTrigger {...(isRadix ? { asChild: true } : {})}>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Same styled output — different headless primitive under the hood.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
    }
    case "tooltip": {
      const TooltipProvider = isRadix
        ? RadixTooltipProvider
        : BaseTooltipProvider
      const Tooltip = isRadix ? RadixTooltip : BaseTooltip
      const TooltipTrigger = isRadix ? RadixTooltipTrigger : BaseTooltipTrigger
      const TooltipContent = isRadix ? RadixTooltipContent : BaseTooltipContent
      const Button = isRadix ? RadixButton : BaseButton
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger {...(isRadix ? { asChild: true } : {})}>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Built with {isRadix ? "Radix UI" : "Base UI"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    default:
      return null
  }
}
