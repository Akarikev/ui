import * as React from "react"
import { ArrowUpRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  focusRing,
  pressable,
  softRadius,
  surfaceSoft,
  surfaceSoftHover,
  transitionBase,
} from "@/lib/ui-styles"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export type BenchmarkEntry = {
  label: string
  value: number
  displayValue?: string
  highlighted?: boolean
}

export type BenchmarkCardData = {
  title: string
  entries: BenchmarkEntry[]
  scoreLabel?: string
  actionLabel?: string
  actionHref?: string
  domain?: [number, number]
  ticks?: string[]
}

const benchmarkActionClass = cn(
  "inline-flex h-8 items-center justify-center gap-2 whitespace-nowrap px-3 text-xs font-medium text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
  softRadius,
  surfaceSoft,
  surfaceSoftHover,
  focusRing,
  pressable,
  transitionBase
)

const benchmarkRowClass =
  "grid grid-cols-[minmax(7rem,12rem)_minmax(8rem,1fr)_minmax(3.5rem,4.5rem)] items-center gap-4"

const appBench: BenchmarkCardData = {
  title: "#1 on App Bench",
  actionLabel: "View benchmark",
  actionHref: "#",
  scoreLabel: "Score",
  domain: [0, 100],
  entries: [
    { label: "elorm", value: 76, displayValue: "76%", highlighted: true },
    { label: "Claude Code", value: 68, displayValue: "68%" },
    { label: "v0", value: 64, displayValue: "64%" },
    { label: "Bolt", value: 54, displayValue: "54%" },
    { label: "Google AI Studio", value: 50, displayValue: "50%" },
    { label: "Codex CLI", value: 38, displayValue: "38%" },
    { label: "Replit", value: 34, displayValue: "34%" },
    { label: "Cursor", value: 27, displayValue: "27%" },
  ],
}

const uiBench: BenchmarkCardData = {
  title: "#1 on UI Bench",
  actionLabel: "View benchmark",
  actionHref: "#",
  scoreLabel: "Score",
  domain: [20, 32],
  entries: [
    { label: "elorm", value: 30.08, highlighted: true },
    { label: "Figma Make", value: 27.46 },
    { label: "Lovable", value: 27.14 },
    { label: "Anything", value: 25.46 },
    { label: "Bolt", value: 24.44 },
    { label: "Magic Patterns", value: 24.23 },
    { label: "Same.new", value: 23.57 },
    { label: "Base44", value: 23.47 },
    { label: "v0", value: 22.24 },
    { label: "Replit", value: 20.95 },
  ],
}

function formatScore(entry: BenchmarkEntry) {
  return (
    entry.displayValue ??
    entry.value.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })
  )
}

function getDomain(entries: BenchmarkEntry[], domain?: [number, number]) {
  if (domain) return domain

  const values = entries.map((entry) => entry.value)
  return [0, Math.max(...values, 1)] satisfies [number, number]
}

function getBarWidth(value: number, domain: [number, number]) {
  const [min, max] = domain
  const range = Math.max(max - min, 1)
  return Math.min(Math.max(((value - min) / range) * 100, 3), 100)
}

function BenchmarkCard({
  className,
  title,
  entries,
  scoreLabel = "Score",
  actionLabel = "View benchmark",
  actionHref = "#",
  domain,
  ticks,
  ...props
}: React.ComponentProps<"div"> & BenchmarkCardData) {
  const valueDomain = getDomain(entries, domain)

  return (
    <Card
      data-slot="benchmark-card"
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 p-7 pb-5">
        <CardTitle className="text-3xl font-bold tracking-tight">
          {title}
        </CardTitle>
        {actionHref && (
          <CardAction>
            <a href={actionHref} className={benchmarkActionClass}>
              {actionLabel}
              <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="p-7 pt-0">
        <div className="rounded-2xl border border-border/40 bg-muted/25 p-5 sm:p-6">
          <div className="grid gap-1.5">
            {entries.map((entry) => {
              const highlighted = entry.highlighted
              const width = getBarWidth(entry.value, valueDomain)
              const score = formatScore(entry)

              return (
                <div
                  key={entry.label}
                  className={cn(
                    benchmarkRowClass,
                    "border-b border-border/40 py-2 last:border-b-0"
                  )}
                >
                  <div
                    className={cn(
                      "truncate text-base font-medium sm:text-lg",
                      highlighted ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {entry.label}
                  </div>
                  <div
                    className="h-3 overflow-hidden rounded-full bg-muted-foreground/10"
                    role="progressbar"
                    aria-label={`${entry.label}: ${score}`}
                    aria-valuemin={valueDomain[0]}
                    aria-valuemax={valueDomain[1]}
                    aria-valuenow={entry.value}
                    aria-valuetext={score}
                  >
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-300",
                        highlighted ? "bg-primary" : "bg-muted-foreground/35"
                      )}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <div
                    className={cn(
                      "text-right text-base font-medium tabular-nums sm:text-lg",
                      highlighted ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {score}
                  </div>
                </div>
              )
            })}
          </div>
          {(ticks?.length || scoreLabel) && (
            <div className="mt-3 border-t border-border/40 pt-2">
              {ticks?.length ? (
                <div className={benchmarkRowClass}>
                  <span aria-hidden="true" />
                  <div className="flex min-w-0 justify-between text-xs tabular-nums text-muted-foreground">
                    {ticks.map((tick) => (
                      <span key={tick}>{tick}</span>
                    ))}
                  </div>
                  <span aria-hidden="true" />
                </div>
              ) : null}
              <div className="mt-2 text-center text-xs font-medium text-foreground">
                {scoreLabel}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function BenchmarkGrid({
  className,
  benchmarks = [appBench],
  ...props
}: React.ComponentProps<"section"> & {
  benchmarks?: BenchmarkCardData[]
}) {
  const singleBenchmark = benchmarks.length === 1

  return (
    <section
      data-slot="benchmark-grid"
      className={cn(
        "mx-auto grid w-full gap-6",
        singleBenchmark ? "max-w-2xl" : "max-w-6xl lg:grid-cols-2",
        className
      )}
      {...props}
    >
      {benchmarks.map((benchmark) => (
        <BenchmarkCard key={benchmark.title} {...benchmark} />
      ))}
    </section>
  )
}

export { BenchmarkCard, BenchmarkGrid, appBench, uiBench }
