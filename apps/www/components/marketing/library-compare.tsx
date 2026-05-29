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
import { softRadius, softShadow, surfaceSoft } from "@/lib/ui-styles"

export function LibraryCompare() {
  const [library, setLibrary] = useState<UiLibrary>("base-ui")
  const [component, setComponent] = useState<PrimitiveId>("button")

  const libraryMeta = UI_LIBRARIES.find((item) => item.id === library)!

  return (
    <section className="px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
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

        <div
          className={cn(
            "overflow-hidden border border-border/60 bg-card",
            softRadius,
            softShadow
          )}
        >
          <div className="flex flex-wrap gap-2 border-b border-border/60 p-4">
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

          <div className="flex min-h-[220px] items-center justify-center p-8">
            <PrimitiveDemo component={component} library={library} />
          </div>

          <div className={cn("border-t border-border/60 p-4", surfaceSoft)}>
            <CopyCommand command={`elorm init --ui-library ${library}`} />
          </div>
        </div>
      </div>
    </section>
  )
}
