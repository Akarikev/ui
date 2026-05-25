import Image from "next/image"
import Link from "next/link"
import { CopyCommand } from "./copy-command"

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center overflow-hidden px-6 pt-28 pb-48 text-center">
      <Image
        src="/hero-mintlify-anime.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-neutral-950" />

      <div className="relative z-0 flex max-w-3xl flex-col items-center gap-5">
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
          <Link
            href="/docs"
            className="text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            Browse documentation →
          </Link>
        </div>
      </div>
    </section>
  )
}
