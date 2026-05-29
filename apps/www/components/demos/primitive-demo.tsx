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

import { Button as HeroButton } from "@/components/ui-heroui/button"
import { Checkbox as HeroCheckbox } from "@/components/ui-heroui/checkbox"
import { Switch as HeroSwitch } from "@/components/ui-heroui/switch"
import {
  Select as HeroSelect,
  SelectContent as HeroSelectContent,
  SelectItem as HeroSelectItem,
  SelectTrigger as HeroSelectTrigger,
  SelectValue as HeroSelectValue,
} from "@/components/ui-heroui/select"
import {
  Dialog as HeroDialog,
  DialogContent as HeroDialogContent,
  DialogDescription as HeroDialogDescription,
  DialogHeader as HeroDialogHeader,
  DialogTitle as HeroDialogTitle,
  DialogTrigger as HeroDialogTrigger,
} from "@/components/ui-heroui/dialog"
import {
  Tooltip as HeroTooltip,
  TooltipContent as HeroTooltipContent,
  TooltipProvider as HeroTooltipProvider,
  TooltipTrigger as HeroTooltipTrigger,
} from "@/components/ui-heroui/tooltip"

import type { PrimitiveId, UiLibrary } from "@/lib/ui-library"

interface PrimitiveDemoProps {
  component: PrimitiveId
  library: UiLibrary
}

const LIBRARY_LABEL: Record<UiLibrary, string> = {
  "base-ui": "Base UI",
  radix: "Radix UI",
  heroui: "HeroUI",
}

export function PrimitiveDemo({ component, library }: PrimitiveDemoProps) {
  const uid = `${component}-${library}`

  switch (component) {
    case "button": {
      const Button =
        library === "radix"
          ? RadixButton
          : library === "heroui"
            ? HeroButton
            : BaseButton
      return (
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      )
    }
    case "checkbox": {
      const Checkbox =
        library === "radix"
          ? RadixCheckbox
          : library === "heroui"
            ? HeroCheckbox
            : BaseCheckbox
      return (
        <div className="flex items-center gap-2">
          <Checkbox id={uid} defaultChecked />
          <Label htmlFor={uid}>Accept terms and conditions</Label>
        </div>
      )
    }
    case "switch": {
      const Switch =
        library === "radix"
          ? RadixSwitch
          : library === "heroui"
            ? HeroSwitch
            : BaseSwitch
      return (
        <div className="flex items-center gap-2">
          <Switch id={uid} defaultChecked />
          <Label htmlFor={uid}>Airplane mode</Label>
        </div>
      )
    }
    case "select": {
      if (library === "heroui") {
        return (
          <HeroSelect defaultValue="apple">
            <HeroSelectTrigger className="w-[180px]">
              <HeroSelectValue />
            </HeroSelectTrigger>
            <HeroSelectContent>
              <HeroSelectItem value="apple">Apple</HeroSelectItem>
              <HeroSelectItem value="banana">Banana</HeroSelectItem>
              <HeroSelectItem value="orange">Orange</HeroSelectItem>
            </HeroSelectContent>
          </HeroSelect>
        )
      }

      const Select = library === "radix" ? RadixSelect : BaseSelect
      const SelectTrigger =
        library === "radix" ? RadixSelectTrigger : BaseSelectTrigger
      const SelectValue =
        library === "radix" ? RadixSelectValue : BaseSelectValue
      const SelectContent =
        library === "radix" ? RadixSelectContent : BaseSelectContent
      const SelectItem =
        library === "radix" ? RadixSelectItem : BaseSelectItem
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
      const Dialog =
        library === "radix"
          ? RadixDialog
          : library === "heroui"
            ? HeroDialog
            : BaseDialog
      const DialogTrigger =
        library === "radix"
          ? RadixDialogTrigger
          : library === "heroui"
            ? HeroDialogTrigger
            : BaseDialogTrigger
      const DialogContent =
        library === "radix"
          ? RadixDialogContent
          : library === "heroui"
            ? HeroDialogContent
            : BaseDialogContent
      const DialogHeader =
        library === "radix"
          ? RadixDialogHeader
          : library === "heroui"
            ? HeroDialogHeader
            : BaseDialogHeader
      const DialogTitle =
        library === "radix"
          ? RadixDialogTitle
          : library === "heroui"
            ? HeroDialogTitle
            : BaseDialogTitle
      const DialogDescription =
        library === "radix"
          ? RadixDialogDescription
          : library === "heroui"
            ? HeroDialogDescription
            : BaseDialogDescription
      const Button =
        library === "radix"
          ? RadixButton
          : library === "heroui"
            ? HeroButton
            : BaseButton
      return (
        <Dialog>
          <DialogTrigger {...(library === "radix" ? { asChild: true } : {})}>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Same styled output — {LIBRARY_LABEL[library]} under the hood.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
    }
    case "tooltip": {
      const TooltipProvider =
        library === "radix"
          ? RadixTooltipProvider
          : library === "heroui"
            ? HeroTooltipProvider
            : BaseTooltipProvider
      const Tooltip =
        library === "radix"
          ? RadixTooltip
          : library === "heroui"
            ? HeroTooltip
            : BaseTooltip
      const TooltipTrigger =
        library === "radix"
          ? RadixTooltipTrigger
          : library === "heroui"
            ? HeroTooltipTrigger
            : BaseTooltipTrigger
      const TooltipContent =
        library === "radix"
          ? RadixTooltipContent
          : library === "heroui"
            ? HeroTooltipContent
            : BaseTooltipContent
      const Button =
        library === "radix"
          ? RadixButton
          : library === "heroui"
            ? HeroButton
            : BaseButton
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger {...(library === "radix" ? { asChild: true } : {})}>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Built with {LIBRARY_LABEL[library]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }
    default:
      return null
  }
}
