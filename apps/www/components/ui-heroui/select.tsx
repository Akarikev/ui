"use client"

import * as React from "react"
import { ListBox, Select } from "@heroui/react"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  focusRing,
  menuItemBase,
  popoverSurface,
  surfaceInput,
  transitionBase,
} from "@/lib/ui-styles"

function SelectRoot({
  className,
  ...props
}: React.ComponentProps<typeof Select.Root>) {
  return (
    <Select.Root
      data-slot="select"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

function SelectGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="select-group" className={cn("p-1", className)} {...props} />
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectValue({ ...props }: React.ComponentProps<typeof Select.Value>) {
  return <Select.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.Trigger>) {
  return (
    <Select.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-9 w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm shadow-xs outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        surfaceInput,
        focusRing,
        transitionBase,
        className
      )}
      {...props}
    >
      {children as React.ReactNode}
      <Select.Indicator>
        <ChevronDownIcon className="size-4 opacity-50" />
      </Select.Indicator>
    </Select.Trigger>
  )
}

function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.Popover>) {
  return (
    <Select.Popover
      data-slot="select-content"
      className={cn(
        "z-[100] max-h-96 min-w-[var(--trigger-width)] overflow-hidden p-0",
        popoverSurface,
        className
      )}
      {...props}
    >
      <ListBox className="p-1">{children}</ListBox>
    </Select.Popover>
  )
}

function SelectItem({
  className,
  children,
  value,
  id,
  ...props
}: Omit<
  React.ComponentProps<typeof ListBox.Item>,
  "id" | "textValue" | "value"
> & {
  value?: string
  id?: string
}) {
  return (
    <ListBox.Item
      data-slot="select-item"
      id={id ?? value}
      textValue={typeof children === "string" ? children : value}
      className={cn(menuItemBase, "pr-8", className)}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <ListBox.ItemIndicator>
          <CheckIcon className="size-4" />
        </ListBox.ItemIndicator>
      </span>
      {children as React.ReactNode}
    </ListBox.Item>
  )
}

export {
  SelectRoot as Select,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
}
