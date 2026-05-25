import { cn } from "@/lib/utils"

export function NextMark({
  size = 16,
  className,
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <mask
        id="next-mark-mask"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="180"
        height="180"
      >
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#next-mark-mask)">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#next-mark-gradient-a)"
        />
        <rect
          x="115"
          y="54"
          width="12"
          height="72"
          fill="url(#next-mark-gradient-b)"
        />
      </g>
      <defs>
        <linearGradient
          id="next-mark-gradient-a"
          x1="109"
          y1="116.5"
          x2="144.5"
          y2="160.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="next-mark-gradient-b"
          x1="121"
          y1="54"
          x2="120.799"
          y2="106.875"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function NextJsLogo({ className }: { className?: string }) {
  return <NextMark size={16} className={className} />
}

export function ViteLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("size-4 shrink-0", className)}
    >
      <path d="m20.92 5.1-4.07.74.65-2.25c.11-.38.04-.78-.2-1.09-.23-.31-.6-.5-.99-.5h-.1l-.14.02-6.6 1.29c-.56.11-.97.58-1 1.15l-.09 1.58-5.29-.95a.49.49 0 0 0-.51.72l9.09 15.94c.19.33.66.33.84 0l8.91-15.94c.2-.36-.11-.79-.51-.71ZM9.67 4.3l6.6-1.29h.05c.16 0 .28.15.23.31L15.32 7.6s-.01.08 0 .12c0 .01.01.02.02.03 0 .02.02.05.04.07 0 .01.02.02.03.03.02.01.04.03.06.04.01 0 .03 0 .05.01.02 0 .03.01.05.01h.05l1.889-.36h.1c.02 0 .03 0 .05.01s.04.03.06.05l.03.03c.02.02.02.05.03.08 0 .01.01.03.01.04 0 .04 0 .09-.02.13l-5.38 10.73-.1.15c-.03.05-.08.08-.12.09h-.18a.22.22 0 0 1-.1-.09s-.01-.02-.02-.03c-.02-.04-.04-.09-.02-.15l.87-4.2v-.12c0-.01-.01-.02-.02-.03a.2.2 0 0 0-.04-.06c0-.01-.02-.02-.03-.03-.02-.01-.04-.03-.06-.03-.01 0-.03 0-.04-.01h-.03c-.02 0-.05 0-.07.01l-1.13.34h-.14c-.02 0-.04-.02-.06-.03-.01 0-.02-.02-.03-.03-.02-.02-.03-.04-.04-.06 0-.01-.01-.02-.02-.03-.01-.04-.02-.08 0-.12l.55-2.67c.01-.07 0-.14-.05-.19 0 0 0-.01-.01-.02-.04-.05-.1-.07-.16-.08h-.08l-1.84.42h-.07c-.13 0-.24-.12-.23-.26l.41-6.85c0-.11.09-.2.2-.22Z" />
    </svg>
  )
}
