import type { SVGProps } from "react"
import { cn } from "@/lib/utils"

export function ElormLogoMark({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("size-7 shrink-0", className)}
      {...props}
    >
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="7"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 22L22 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ElormLogo({
  className,
  markClassName,
  textClassName,
  showText = true,
}: {
  className?: string
  markClassName?: string
  textClassName?: string
  showText?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <ElormLogoMark className={markClassName} />
      {showText ? (
        <span
          className={cn(
            "text-lg font-semibold tracking-tight",
            textClassName
          )}
        >
          elorm<span className="opacity-60">/ui</span>
        </span>
      ) : null}
    </span>
  )
}
