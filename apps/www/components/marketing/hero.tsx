import Image from "next/image"
import { CopyCommand } from "./copy-command"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "h-[min(68vh,680px)] sm:h-[min(80vh,820px)] lg:h-[min(92vh,900px)]"
      )}
    >
      <div className="absolute inset-0">
        <Image
          src="/hero-anime-monitor.png"
          alt=""
          fill
          priority
          unoptimized
          className="object-cover object-[center_42%] sm:object-[center_28%] lg:object-[center_20%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-background" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-start px-6 pb-12 pt-24 text-center sm:justify-center sm:py-20">
        <div className="flex max-w-3xl flex-col items-center gap-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
            <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              New
            </span>
            Base UI or Radix — your choice
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl md:leading-[1.08]">
            Beautiful components
            <br />
            <span className="bg-gradient-to-r from-white via-white/95 to-primary/80 bg-clip-text text-transparent">
              you actually own.
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] sm:text-base">
            elorm/ui is a copy-paste React component library with accessible
            primitives, OKLCH theming, and an AI-friendly CLI. Add components in
            seconds — no npm package lock-in.
          </p>

          <div className="flex w-full max-w-md flex-col items-center gap-4 pt-1">
            <CopyCommand command="elorm init" variant="hero" />
            <p className="text-sm text-white/75 drop-shadow-sm">
              Use the{" "}
              <span className="font-medium text-white">Theme</span> button in the
              header to preview colors live.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
