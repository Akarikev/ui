import Link from "next/link"
import {
  ArrowRightIcon,
  BlocksIcon,
  BrainIcon,
  InboxIcon,
  PanelsTopLeftIcon,
} from "lucide-react"

import { BenchmarkGrid } from "@/components/blocks/benchmark-grid"
import { EmptyState } from "@/components/blocks/empty-state"
import { LoginForm } from "@/components/blocks/login-form"
import { PageHeader } from "@/components/blocks/page-header"
import { PromptComposer } from "@/components/blocks/prompt-composer"
import { StatCard } from "@/components/blocks/stat-card"
import { Button } from "@/components/ui/button"
import { CopyCommand } from "@/components/marketing/copy-command"
import { softRadius, softShadow } from "@/lib/ui-styles"
import { cn } from "@/lib/utils"

export function BlocksShowcase() {
  return (
    <section className="border-t border-border/40 bg-muted/10 px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Blocks
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Product-ready sections for AI interfaces
            </h2>
            <p className="mt-3 text-muted-foreground">
              Drop in full patterns like prompt composers and benchmark cards,
              then keep editing the source in your app.
            </p>
          </div>

          <Link
            href="/docs/components/prompt-composer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Browse blocks
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="grid gap-6">
            <div
              className={cn(
                "overflow-hidden border border-border/60 bg-card/90",
                softRadius,
                softShadow
              )}
            >
              <div className="flex items-center gap-2 border-b border-border/60 px-5 py-4">
                <BrainIcon className="size-4 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Prompt flows</h3>
                  <p className="text-sm text-muted-foreground">
                    Hero prompts and compact follow-ups in one block.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 p-5 sm:p-6">
                <PromptComposer />
                <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                  <PromptComposer
                    variant="follow-up"
                    placeholder="Send follow-up"
                    className="max-w-none"
                  />
                </div>
                <CopyCommand command="elorm add prompt-composer" align="start" />
              </div>
            </div>

            <div
              className={cn(
                "overflow-hidden border border-border/60 bg-card/90",
                softRadius,
                softShadow
              )}
            >
              <div className="flex items-center gap-2 border-b border-border/60 px-5 py-4">
                <PanelsTopLeftIcon className="size-4 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">App screens</h3>
                  <p className="text-sm text-muted-foreground">
                    Combine layout and auth blocks for complete product flows.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-5 p-5 sm:p-6">
                <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                  <PageHeader
                    title="Projects"
                    description="Manage agent workflows and active deployments."
                    actions={<Button size="sm">Create project</Button>}
                  />
                </div>
                <LoginForm
                  className="max-w-none"
                />
                <CopyCommand
                  command="elorm add page-header login-form"
                  align="start"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div
              className={cn(
                "overflow-hidden border border-border/60 bg-card/90",
                softRadius,
                softShadow
              )}
            >
              <div className="flex items-center gap-2 border-b border-border/60 px-5 py-4">
                <BlocksIcon className="size-4 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Benchmark card</h3>
                  <p className="text-sm text-muted-foreground">
                    Show rankings, scores, and launch claims with soft charts.
                  </p>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                <BenchmarkGrid className="max-w-none" />
                <div className="mt-5">
                  <CopyCommand command="elorm add benchmark-grid" align="start" />
                </div>
              </div>
            </div>

            <div
              className={cn(
                "overflow-hidden border border-border/60 bg-card/90",
                softRadius,
                softShadow
              )}
            >
              <div className="flex items-center gap-2 border-b border-border/60 px-5 py-4">
                <InboxIcon className="size-4 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">States and stats</h3>
                  <p className="text-sm text-muted-foreground">
                    Pair metrics with polished empty states for product screens.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  <StatCard
                    title="Prompts shipped"
                    value="2,481"
                    description="+18% this week"
                    trend={{ value: "+18%", positive: true }}
                  />
                  <StatCard
                    title="Success rate"
                    value="98.2%"
                    description="Across agent runs"
                    trend={{ value: "+4%", positive: true }}
                  />
                </div>
                <EmptyState
                  title="No queued runs"
                  description="Your agent queue is clear. Start a new workflow when you're ready."
                  className="bg-background/80 p-8"
                />
                <CopyCommand
                  command="elorm add stat-card empty-state"
                  align="start"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
