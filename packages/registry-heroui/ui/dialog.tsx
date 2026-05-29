"use client"

import * as React from "react"
import { Modal } from "@heroui/react"

import { cn } from "@/lib/utils"
import { focusRing, overlayBackdrop, softRadius, softShadow } from "@/lib/ui-styles"

function Dialog({ ...props }: React.ComponentProps<typeof Modal.Root>) {
  return <Modal.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof Modal.Trigger>) {
  return <Modal.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose({ ...props }: React.ComponentProps<typeof Modal.CloseTrigger>) {
  return <Modal.CloseTrigger data-slot="dialog-close" {...props} />
}

function DialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Modal.Backdrop>) {
  return (
    <Modal.Backdrop
      data-slot="dialog-overlay"
      className={cn(overlayBackdrop, className)}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Modal.Dialog>) {
  return (
    <Modal.Backdrop data-slot="dialog-overlay" className={overlayBackdrop}>
      <Modal.Container placement="center">
        <Modal.Dialog
          data-slot="dialog-content"
          className={cn(
            "relative grid w-full max-w-lg gap-4 rounded-2xl border bg-background p-6 ring-1 ring-border/30",
            softShadow,
            className
          )}
          {...props}
        >
          {children as React.ReactNode}
          <Modal.CloseTrigger
            className={cn(
              softRadius,
              "absolute right-4 top-4 text-foreground opacity-70 ring-offset-background transition-opacity hover:bg-muted hover:opacity-100",
              focusRing
            )}
          />
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof Modal.Heading>) {
  return (
    <Modal.Heading
      data-slot="dialog-title"
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
