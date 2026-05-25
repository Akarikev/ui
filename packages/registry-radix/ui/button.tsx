"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { focusRing, pressable, softRadius, softShadow, surfaceSoft, surfaceSoftHover, transitionBase } from "@/lib/ui-styles"

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0",
    focusRing,
    pressable,
    transitionBase
  ),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-border/60 bg-muted/30 text-foreground hover:bg-muted/50 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "text-foreground hover:bg-muted/60 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        soft: cn(
          softRadius,
          softShadow,
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg active:shadow-sm"
        ),
        "soft-outline": cn(
          softRadius,
          surfaceSoft,
          surfaceSoftHover,
          "text-foreground hover:border-border/60"
        ),
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded-lg px-2.5 text-xs",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        soft: cn(softRadius, "h-11 px-6 text-sm"),
        icon: "size-9",
        "icon-sm": "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
