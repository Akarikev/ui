import Image from "next/image"
import Link from "next/link"
import { CopyCommand } from "./copy-command"

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
          <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            New
          </span>
          Base UI or Radix — your choice
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.1]">
          Beautiful components
          <br />
          <span className="bg-gradient-to-r from-primary via-primary/80 to-chart-2 bg-clip-text text-transparent">
            you actually own.
          </span>
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          elorm/ui is a copy-paste React component library with accessible
          primitives, OKLCH theming, and an AI-friendly CLI. Add components in
          seconds — no npm package lock-in.
        </p>

        <div className="flex w-full max-w-md flex-col items-center gap-4 pt-2">
          <CopyCommand command="elorm init" />
          <p className="text-sm text-muted-foreground">
            Use the{" "}
            <span className="font-medium text-foreground">Theme</span> button
            in the header to preview colors live.
          </p>
          <Link
            href="/docs"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Browse documentation →
          </Link>
        </div>
      </div>
    </section>
  )
}
