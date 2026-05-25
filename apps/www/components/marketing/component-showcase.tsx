import Link from "next/link"
import { ArrowRightIcon, BlocksIcon, ComponentIcon } from "lucide-react"
import {
  BLOCK_COUNT,
  COMPONENT_COUNT,
  getBlocks,
  getComponentGroups,
} from "@/lib/registry-catalog"
import { cn } from "@/lib/utils"

export function ComponentShowcase() {
  const componentGroups = getComponentGroups()
  const blocks = getBlocks()

  return (
    <section className="border-t border-border bg-muted/15 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
              Registry
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              A catalog you can browse and own
            </h2>
            <p className="mt-3 text-muted-foreground">
              {COMPONENT_COUNT} components and {BLOCK_COUNT} blocks, all
              copy-paste ready. Pick what you need and add it with one command.
            </p>
          </div>

          <Link
            href="/docs/components/button"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Browse all docs
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-xl border border-border bg-card/60">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <ComponentIcon className="size-4 text-primary" />
                <h3 className="font-semibold text-foreground">Components</h3>
              </div>
              <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {COMPONENT_COUNT}
              </span>
            </div>

            <div className="flex flex-col gap-6 p-5">
              {componentGroups.map((group) => (
                <div key={group.category}>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.name}
                        href={`/docs/components/${item.name}`}
                        className={cn(
                          "rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors",
                          "hover:border-primary/30 hover:text-primary"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-card/60">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-2">
                <BlocksIcon className="size-4 text-primary" />
                <h3 className="font-semibold text-foreground">Blocks</h3>
              </div>
              <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {BLOCK_COUNT}
              </span>
            </div>

            <div className="flex flex-col gap-3 p-5">
              {blocks.map((block) => (
                <Link
                  key={block.name}
                  href={`/docs/components/${block.name}`}
                  className="group rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/30 hover:bg-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-medium text-foreground group-hover:text-primary">
                        {block.title}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {block.description}
                      </p>
                    </div>
                    <ArrowRightIcon className="mt-0.5 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:text-primary group-hover:opacity-100" />
                  </div>
                  <code className="mt-3 block text-xs text-muted-foreground group-hover:text-primary/80">
                    elorm add {block.name}
                  </code>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
