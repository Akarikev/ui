import Link from "next/link"
import { ArrowRightIcon, Flower2Icon } from "lucide-react"

import { CopyCommand } from "@/components/marketing/copy-command"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Soft surfaces",
    description: "Rounder cards, quiet hairline borders, and calmer elevation.",
  },
  {
    number: "02",
    title: "Smooth feedback",
    description: "Thinner progress tracks with gentle animation variants.",
  },
  {
    number: "03",
    title: "Source-owned",
    description: "Install it through the CLI and keep editing every component.",
  },
]

export function NagomiShowcase() {
  return (
    <section className="border-t border-border/40 bg-muted/10 px-6 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="flex flex-col gap-5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-foreground/90">
            <Flower2Icon className="size-3.5 text-primary" />
            Nagomi beta
          </div>
          <div className="grid gap-3">
            <h2 className="max-w-xl text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              A calmer style system for rounded, smoother interfaces.
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Nagomi is the beta elorm/ui style preset for softer borders,
              larger radii, and smoother component surfaces. 
            </p>
          </div>
          <CopyCommand command="elorm init --style nagomi" align="start" />
          <Link
            href="/docs/get-started/design#nagomi-beta"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Read the style notes
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="rounded-[2rem] border border-border/50 bg-card/80 p-3 shadow-[0_18px_70px_-44px_oklch(0_0_0_/_0.7)] ring-1 ring-foreground/[0.03]">
          <div className="grid overflow-hidden rounded-[1.5rem] border border-border/45 bg-background/70 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  "flex min-h-44 flex-col justify-between gap-6 p-5",
                  index > 0 && "border-t border-border/45 sm:border-l sm:border-t-0"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-xl border border-border/50 bg-muted/40 px-2 py-1 text-xs text-muted-foreground">
                    {step.number}
                  </span>
                  <span className="size-2 rounded-full bg-primary/70" />
                </div>
                <div className="grid gap-2">
                  <h3 className="font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-[1.5rem] border border-border/45 bg-background/70 p-5">
            <Progress
              variant="labeled"
              label="Nagomi readiness"
              value={84}
              className="max-w-none"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
