import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  InfoIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-xl border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5",
  {
    variants: {
      variant: {
        default: "bg-card text-foreground ring-1 ring-border/50",
        destructive:
          "border-destructive/30 bg-destructive/5 text-destructive [&>svg]:text-destructive",
        success:
          "border-success/30 bg-success/5 text-success [&>svg]:text-success",
        warning:
          "border-warning/30 bg-warning/5 text-warning-foreground [&>svg]:text-warning",
        info: "border-info/30 bg-info/5 text-info [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const alertIcons = {
  default: InfoIcon,
  destructive: AlertCircleIcon,
  success: CheckCircle2Icon,
  warning: TriangleAlertIcon,
  info: InfoIcon,
} as const

function Alert({
  className,
  variant,
  showIcon = true,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & { showIcon?: boolean }) {
  const Icon = alertIcons[variant ?? "default"]
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {showIcon && <Icon />}
      {children}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn("col-start-2 font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "col-start-2 text-sm text-muted-foreground [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, alertVariants }
