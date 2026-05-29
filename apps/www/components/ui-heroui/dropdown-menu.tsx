"use client"

import * as React from "react"
import { Dropdown, Menu } from "@heroui/react"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { menuItemBase, popoverSurface } from "@/lib/ui-styles"

function DropdownMenu({ ...props }: React.ComponentProps<typeof Dropdown.Root>) {
  return <Dropdown.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof Dropdown.Trigger>) {
  return <Dropdown.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Dropdown.Popover>) {
  return (
    <Dropdown.Popover
      data-slot="dropdown-menu-content"
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden p-1",
        popoverSurface,
        className
      )}
      {...props}
    >
      <Menu className="outline-none">{children}</Menu>
    </Dropdown.Popover>
  )
}

function DropdownMenuItem({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof Menu.Item> & { inset?: boolean }) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-item"
      className={cn(
        menuItemBase,
        "gap-2 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-checkbox-item"
      className={cn(menuItemBase, "py-1.5 pl-8 pr-2", className)}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <Menu.ItemIndicator type="checkmark">
          <CheckIcon className="size-4" />
        </Menu.ItemIndicator>
      </span>
      {children as React.ReactNode}
    </Menu.Item>
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu.Item>) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-radio-item"
      className={cn(menuItemBase, "py-1.5 pl-8 pr-2", className)}
      {...props}
    >
      <span className="absolute left-2 flex size-3.5 items-center justify-center">
        <Menu.ItemIndicator type="dot">
          <CircleIcon className="size-2 fill-current" />
        </Menu.ItemIndicator>
      </span>
      <span>{children as React.ReactNode}</span>
    </Menu.Item>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <div
      data-slot="dropdown-menu-label"
      className={cn(
        "px-2 py-1.5 text-sm font-medium",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border/60", className)}
      {...props}
    />
  )
}

function DropdownMenuSub({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof Menu.Item> & { inset?: boolean }) {
  return (
    <Menu.Item
      data-slot="dropdown-menu-sub-trigger"
      className={cn(menuItemBase, inset && "pl-8", className)}
      {...props}
    >
      {children as React.ReactNode}
      <ChevronRightIcon className="ml-auto size-4" />
    </Menu.Item>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof Dropdown.Popover>) {
  return (
    <Dropdown.Popover
      data-slot="dropdown-menu-sub-content"
      className={cn("z-50 min-w-[8rem] overflow-hidden p-1", popoverSurface, className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
