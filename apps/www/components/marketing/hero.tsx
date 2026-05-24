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
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#050508]" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200 backdrop-blur-sm">
          <span className="rounded bg-indigo-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            New
          </span>
          Built on Base UI + Tailwind v4
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl md:leading-[1.1]">
          Beautiful components
          <br />
          <span className="bg-gradient-to-r from-indigo-200 via-violet-200 to-cyan-200 bg-clip-text text-transparent">
            you actually own.
          </span>
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          elorm/ui is a copy-paste React component library with accessible
          primitives, OKLCH theming, and an AI-friendly CLI. Add components in
          seconds — no npm package lock-in.
        </p>

        <div className="flex flex-col items-center gap-4 pt-2">
          <CopyCommand command="npx elorm init" />
          <Link
            href="/docs"
            className="text-sm text-white/50 transition-colors hover:text-white/80"
          >
            Browse documentation →
          </Link>
        </div>
      </div>
    </section>
  )
}
