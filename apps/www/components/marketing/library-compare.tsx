"use client"

import { useState } from "react"
import { PrimitiveDemo } from "@/components/demos/primitive-demo"
import { CopyCommand } from "@/components/marketing/copy-command"
import {
  PRIMITIVE_COMPONENTS,
  UI_LIBRARIES,
  type PrimitiveId,
  type UiLibrary,
} from "@/lib/ui-library"
import { cn } from "@/lib/utils"

export function LibraryCompare() {
  const [library, setLibrary] = useState<UiLibrary>("base-ui")
  const [component, setComponent] = useState<PrimitiveId>("button")

  const current = PRIMITIVE_COMPONENTS.find((item) => item.id === component)!
  const libraryMeta = UI_LIBRARIES.find((item) => item.id === library)!
  const packageName =
    library === "radix" ? current.radixPackage : current.basePackage

  return (
    <section className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
            Primitives
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Base UI or Radix — same look, your choice
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            elorm/ui ships identical styled components on top of either headless
            library. Switch below to compare behavior and pick what fits your
            stack.
          </p>
        </div>

        <div className="mb-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="inline-flex rounded-xl border border-border bg-card p-1">
            {UI_LIBRARIES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLibrary(item.id)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  library === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-8 text-center text-sm text-muted-foreground">
          {libraryMeta.description}
        </p>

        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div className="flex flex-wrap gap-2 border-b border-border p-4">
            {PRIMITIVE_COMPONENTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setComponent(item.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  component === item.id
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
            <div className="flex min-h-[220px] items-center justify-center border-b border-border p-8 lg:border-b-0 lg:border-r">
              <PrimitiveDemo component={component} library={library} />
            </div>

            <div className="flex flex-col justify-center gap-4 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Under the hood
                </p>
                <p className="mt-1 font-mono text-sm text-foreground">
                  {packageName}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Init with
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  uiLibrary: &quot;{library}&quot;
                </p>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Styling and API stay the same — only the headless primitive
                changes. Non-primitive components like Input and Card are
                shared.
              </p>
            </div>
          </div>

          <div className="border-t border-border bg-background/50 p-4">
            <CopyCommand
              command={`elorm init --ui-library ${library}`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
