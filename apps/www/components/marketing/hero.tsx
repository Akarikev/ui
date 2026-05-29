import Link from "next/link"
import { DocsPreview } from "@/components/marketing/docs-preview"
import { UiPreviewBadge } from "@/components/docs/ui-preview-badge"
import { CopyCommand } from "./copy-command"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-[0.35]"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14 lg:py-20 xl:gap-20">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/docs/get-started/agent-skills"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-foreground/90 transition-colors hover:border-border hover:bg-muted/60"
            >
              <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                New
              </span>
              Agent skills for Cursor, Claude & Codex
            </Link>
            <Link
              href="/#library-compare"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium text-foreground/90 transition-colors hover:border-border hover:bg-muted/60"
            >
              <UiPreviewBadge size="sm" />
              HeroUI at init
            </Link>
          </div>

          <h1 className="max-w-md text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-[1.12] lg:max-w-lg lg:text-[2.625rem] lg:leading-[1.14]">
            Beautiful components
            <br />
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-primary bg-clip-text text-transparent">
              you actually own.
            </span>
          </h1>

          <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            elorm/ui is a copy-paste React component library with accessible
            primitives, OKLCH theming, and an AI-friendly CLI. Add components in
            seconds and keep full control of the source.
          </p>

          <div className="flex w-full max-w-md flex-col gap-4 pt-1">
            <CopyCommand command="elorm init" align="start" />
            <CopyCommand
              command="skills add Akarikev/ui --skill elorm -g -y"
              align="start"
            />
            <p className="text-sm text-muted-foreground">
              Use the{" "}
              <span className="font-medium text-foreground">Theme</span> button
              in the header to preview colors live.
            </p>
          </div>
        </div>

        <div className={cn("min-w-0 lg:pt-2")}>
          <DocsPreview embedded />
        </div>
      </div>
    </section>
  )
}
