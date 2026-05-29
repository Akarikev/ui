import { cn } from "@/lib/utils"

export function UiPreviewBadge({
  className,
  label = "Preview",
  variant = "default",
  size = "default",
}: {
  className?: string
  label?: string
  variant?: "default" | "inverse"
  size?: "default" | "sm"
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full font-semibold uppercase",
        size === "sm"
          ? "px-1 py-px text-[8px] tracking-wider"
          : "px-1.5 py-0.5 text-[9px] tracking-wide",
        variant === "inverse"
          ? "border border-amber-400/50 bg-amber-400/25 text-amber-50 dark:border-amber-700/50 dark:bg-amber-500/30 dark:text-amber-950"
          : "border border-amber-500/30 bg-amber-500/15 text-amber-800 dark:text-amber-300",
        className
      )}
    >
      {label}
    </span>
  )
}
