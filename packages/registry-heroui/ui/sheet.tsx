"use client"

import * as React from "react"
import { Drawer } from "@heroui/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { focusRing, overlayBackdrop, softRadius, softShadow } from "@/lib/ui-styles"

function Sheet({ ...props }: React.ComponentProps<typeof Drawer.Root>) {
  return <Drawer.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: React.ComponentProps<typeof Drawer.Trigger>) {
  return <Drawer.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: React.ComponentProps<typeof Drawer.CloseTrigger>) {
  return <Drawer.CloseTrigger data-slot="sheet-close" {...props} />
}

function SheetPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Drawer.Backdrop>) {
  return (
    <Drawer.Backdrop
      data-slot="sheet-overlay"
      className={cn(overlayBackdrop, className)}
      {...props}
    />
  )
}

const sheetVariants = cva(
  cn(
    "gap-4 bg-background p-6 ring-1 ring-border/30 transition ease-in-out",
    softShadow
  ),
  {
    variants: {
      side: {
        top: "rounded-b-2xl border-b",
        bottom: "rounded-t-2xl border-t",
        left: "h-full w-3/4 rounded-r-2xl border-r sm:max-w-sm",
        right: "h-full w-3/4 rounded-l-2xl border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

const sidePlacement = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
} as const

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof Drawer.Dialog> &
  VariantProps<typeof sheetVariants>) {
  return (
    <Drawer.Backdrop data-slot="sheet-overlay" className={overlayBackdrop}>
      <Drawer.Content placement={sidePlacement[side ?? "right"]}>
        <Drawer.Dialog
          data-slot="sheet-content"
          className={cn(sheetVariants({ side }), className)}
          {...props}
        >
          {children as React.ReactNode}
          <Drawer.CloseTrigger
            className={cn(
              softRadius,
              "absolute right-4 top-4 text-foreground opacity-70 ring-offset-background transition-opacity hover:bg-muted hover:opacity-100",
              focusRing
            )}
          />
        </Drawer.Dialog>
      </Drawer.Content>
    </Drawer.Backdrop>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof Drawer.Heading>) {
  return (
    <Drawer.Heading
      data-slot="sheet-title"
      className={cn("text-lg font-semibold tracking-tight text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
}
